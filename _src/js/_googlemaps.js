// Loads the Google Maps JS API once per page; shared by Places and LocationsMap so the script is only added once
let loader;

export function loadGoogleMaps(apiKey) {
  loader ??= new Promise((resolve, reject) => {
    if (window.google?.maps) return resolve();
    // Script onload fires before google.maps is ready; Google's callback param doesn't
    window.__swiftGoogleMapsLoaded = resolve;
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&loading=async&callback=__swiftGoogleMapsLoaded`;
    script.onerror = reject;
    document.head.appendChild(script);
  }).catch((error) => {
    // Don't cache a failed load (network, adblock); the next call retries
    loader = null;
    throw error;
  });
  return loader;
}
