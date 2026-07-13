const CACHE_NAME = "melosave-cache-v1";
const assets = [
  "/",
  "/index.html",
  "/dashboard.html",
  "/login.html",
  "/signup.html",
  "/profile.html",
  "/style.css",
  "/script.js",
  "/icon-192.png",
  "/icon-512.png"
];

// Install Service Worker and cache assets
self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(assets);
    })
  );
});

// Fetch assets from cache when offline
self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
