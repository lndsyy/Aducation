const CACHE_NAME = "aducation-cache-v1";
const urlsToCache = [
  "./index.html",
  "./manifest.json",
  "./style.css",   // optional if you separate CSS
  "./script.js",   // optional if you separate JS
  "./icon-192.png",
  "./icon-512.png"
];

// Install the service worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Caching files...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate the service worker
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

// Fetch files from cache if offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
