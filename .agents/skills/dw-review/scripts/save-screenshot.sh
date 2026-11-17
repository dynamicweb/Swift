#!/usr/bin/env bash
# Captures the front browser window to ~/Pictures/Screenshots/<prId>-<n>.png (macOS).
#
# macOS twin of save-screenshot.ps1, with the same contract: raise the browser, capture only that
# window's rectangle (not the desktop), pick the next free <n> for the PR, print the path and the
# window title it captured. The tab you want must be the ACTIVE tab in the front window of that
# browser, and nothing may cover it. Always read the saved PNG back before citing it.
#
# Needs Screen Recording permission for the app that runs it (Terminal, iTerm, Claude):
# System Settings > Privacy & Security > Screen & System Audio Recording. Without it the capture
# shows the wallpaper and menu bar instead of the browser contents, with no error.
#
#   bash .agents/skills/dw-review/scripts/save-screenshot.sh 23241
#   bash .agents/skills/dw-review/scripts/save-screenshot.sh 23241 --number 2 --app "Brave Browser"
set -euo pipefail

usage() { echo "usage: save-screenshot.sh <prId> [--number N] [--app \"Google Chrome\"]" >&2; exit 2; }

[[ $# -ge 1 ]] || usage
pr_id="$1"; shift
number=""
app=""
while [[ $# -gt 0 ]]; do
    case "$1" in
        --number) number="${2:-}"; shift 2 ;;
        --app) app="${2:-}"; shift 2 ;;
        *) usage ;;
    esac
done

# "Claude in Chrome" does not necessarily run in Chrome, so try the Chromium browsers in turn.
if [[ -z "$app" ]]; then
    for candidate in "Google Chrome" "Brave Browser" "Microsoft Edge"; do
        if pgrep -xq "$candidate"; then app="$candidate"; break; fi
    done
fi
[[ -n "$app" ]] || { echo "No running browser found (Google Chrome, Brave Browser, Microsoft Edge). Pass --app." >&2; exit 1; }

# Bounds come back as left, top, right, bottom in points, which is what screencapture -R takes.
# The app name is spliced into the script text: a `tell application <variable>` block cannot
# resolve Chromium terms such as `active tab` at compile time.
app_literal="${app//\"/}"
title_and_bounds="$(osascript <<APPLESCRIPT
tell application "$app_literal"
    if (count of windows) is 0 then error "no open window"
    activate
    set b to bounds of front window
    set t to title of active tab of front window
end tell
return ((item 1 of b) as text) & "," & ((item 2 of b) as text) & "," & ((item 3 of b) as text) & "," & ((item 4 of b) as text) & "|" & t
APPLESCRIPT
)" || { echo "Could not read the front window of $app (is a window open, and is Automation allowed?)." >&2; exit 1; }

bounds="${title_and_bounds%%|*}"
title="${title_and_bounds#*|}"
IFS=, read -r left top right bottom <<<"$bounds"
width=$((right - left))
height=$((bottom - top))
(( width > 0 && height > 0 )) || { echo "Window of $app has no size ($bounds); is it minimised?" >&2; exit 1; }

out_dir="$HOME/Pictures/Screenshots"
mkdir -p "$out_dir"
if [[ -z "$number" ]]; then
    number=1
    while [[ -e "$out_dir/$pr_id-$number.png" ]]; do number=$((number + 1)); done
fi
out="$out_dir/$pr_id-$number.png"

sleep 0.6  # let the raised window repaint before grabbing it
if ! screencapture -x -R"$left,$top,$width,$height" "$out" || [[ ! -s "$out" ]]; then
    echo "screencapture failed for $app at $bounds. Check Screen Recording permission for the app running this script." >&2
    exit 1
fi

echo "Captured \"$title\" ($app, ${width}x${height})"
echo "$out"
