<#
.SYNOPSIS
  Captures the focused Chrome window to C:\Users\<user>\Pictures\Screenshots\<PrId>-<N>.png

.DESCRIPTION
  The Claude-in-Chrome `computer` tool's `save_to_disk` flag does not produce a locatable file on
  this machine (verified: capture, then full scan of the profile, Windows\Temp and ProgramData for
  new images -> nothing). This script captures the same pixels from the OS side instead, so the
  output path and filename are known and verifiable.

  The browser window is raised to the foreground, given a moment to repaint, and only that window's
  rectangle is captured -- not the whole desktop. The tab you want must already be the ACTIVE tab in
  that window, and the window must not be obscured. The script prints the window title it captured
  so the caller can confirm it grabbed the right one; always read the saved PNG back to verify.

  "Claude in Chrome" does not necessarily run in Chrome -- on this machine it runs in Brave. The
  script therefore auto-detects across Chrome, Brave and Edge rather than assuming chrome.exe.

.PARAMETER PrId
  Pull request id. Used as the filename prefix.

.PARAMETER Number
  Screenshot sequence number within this PR, starting at 1. If omitted, the next free number for
  this PrId is chosen automatically.

.PARAMETER TitleMatch
  Substring of the browser window title to target when several browser windows are open.

.PARAMETER Process
  Browser process name to target (chrome / brave / msedge). Default: auto-detect.

.EXAMPLE
  powershell -File save-screenshot.ps1 -PrId 23241
  powershell -File save-screenshot.ps1 -PrId 23241 -Number 2 -TitleMatch "Products"
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)][string]$PrId,
    [int]$Number,
    [string]$TitleMatch,
    [string]$Process
)

$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing
Add-Type @'
using System;
using System.Runtime.InteropServices;
public class Win32Capture {
    [StructLayout(LayoutKind.Sequential)] public struct RECT { public int Left, Top, Right, Bottom; }
    [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
    [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
    [DllImport("user32.dll")] public static extern bool IsIconic(IntPtr hWnd);
    [DllImport("dwmapi.dll")] public static extern int DwmGetWindowAttribute(IntPtr hWnd, int attr, out RECT r, int size);
    [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT r);
}
'@

# --- locate the browser window ------------------------------------------------
# Claude in Chrome may be hosted by Chrome, Brave or Edge -- do not assume chrome.exe.
$names = if ($Process) { @($Process) } else { @('chrome', 'brave', 'msedge') }
$candidates = @(Get-Process -Name $names -ErrorAction SilentlyContinue |
    Where-Object { $_.MainWindowHandle -ne 0 -and $_.MainWindowTitle })
if ($TitleMatch) {
    $candidates = @($candidates | Where-Object { $_.MainWindowTitle -like "*$TitleMatch*" })
}
$target = $candidates | Select-Object -First 1
if (-not $target) {
    $open = @(Get-Process -Name @('chrome', 'brave', 'msedge') -ErrorAction SilentlyContinue |
        Where-Object { $_.MainWindowHandle -ne 0 -and $_.MainWindowTitle } |
        ForEach-Object { "$($_.ProcessName): $($_.MainWindowTitle)" })
    $detail = if ($open) { " Windows open: $($open -join ' | ')" } else { " No Chrome/Brave/Edge window is open." }
    throw "No browser window found$(if ($TitleMatch) { " matching '$TitleMatch'" }).$detail"
}
$hwnd = $target.MainWindowHandle

if ([Win32Capture]::IsIconic($hwnd)) { [void][Win32Capture]::ShowWindow($hwnd, 9) }  # SW_RESTORE
[void][Win32Capture]::SetForegroundWindow($hwnd)
Start-Sleep -Milliseconds 600   # let the window raise and repaint before capturing

# DWM bounds exclude the invisible resize border that GetWindowRect includes.
$rect = New-Object Win32Capture+RECT
if ([Win32Capture]::DwmGetWindowAttribute($hwnd, 9, [ref]$rect, 16) -ne 0) {
    [void][Win32Capture]::GetWindowRect($hwnd, [ref]$rect)
}
$width  = $rect.Right - $rect.Left
$height = $rect.Bottom - $rect.Top
if ($width -le 0 -or $height -le 0) { throw "Chrome window has no visible area ($width x $height)." }

# --- resolve the output path --------------------------------------------------
$dir = Join-Path $env:USERPROFILE 'Pictures\Screenshots'
if (-not (Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }

if (-not $PSBoundParameters.ContainsKey('Number')) {
    $used = Get-ChildItem -LiteralPath $dir -Filter "$PrId-*.png" -File -ErrorAction SilentlyContinue |
        ForEach-Object { if ($_.BaseName -match "^$([regex]::Escape($PrId))-(\d+)$") { [int]$Matches[1] } }
    $Number = if ($used) { ([int[]]$used | Measure-Object -Maximum).Maximum + 1 } else { 1 }
}
$path = Join-Path $dir "$PrId-$Number.png"

# --- capture ------------------------------------------------------------------
# A window on a display that is not currently rendering -- a monitor asleep, a disconnected or virtual
# second screen -- captures as a uniform black rectangle, with every other sign of success. Sample the
# result and say so, rather than handing back a blank PNG that reads as evidence.
$blank = $true
$bmp = New-Object System.Drawing.Bitmap $width, $height
try {
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    try {
        $g.CopyFromScreen($rect.Left, $rect.Top, 0, 0, $bmp.Size)
    } finally { $g.Dispose() }

    $first = $bmp.GetPixel(0, 0)
    foreach ($fx in 1..16) {
        foreach ($fy in 1..16) {
            $px = $bmp.GetPixel([int](($width - 1) * $fx / 17), [int](($height - 1) * $fy / 17))
            if ($px -ne $first) { $blank = $false; break }
        }
        if (-not $blank) { break }
    }

    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
} finally { $bmp.Dispose() }

if (-not (Test-Path -LiteralPath $path)) { throw "Capture reported success but $path does not exist." }
$saved = Get-Item -LiteralPath $path
[PSCustomObject]@{
    Path    = $saved.FullName
    Size    = "$([math]::Round($saved.Length / 1KB)) KB"
    Pixels  = "$width x $height"
    Browser = $target.ProcessName
    Window  = $target.MainWindowTitle
} | Format-List

if ($blank) {
    Write-Error @"
$path is a single flat colour -- the capture is blank, not evidence.
Window '$($target.MainWindowTitle)' is at $($rect.Left),$($rect.Top) $($width)x$($height). Most often
that rectangle is on a display that is not currently rendering (a sleeping monitor, a disconnected or
virtual second screen); the primary display usually still captures fine. Move the browser window to the
primary display and run this again.
"@
    exit 1
}
