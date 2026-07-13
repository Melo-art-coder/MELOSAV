const CACHE_NAME = "melosave-cache-v1";
const assets = [
  "/MELOSAV/",
  "/MELOSAV/index.html",
  "/MELOSAV/dashboard.html",
  "/MELOSAV/login.html",
  "/MELOSAV/signup.html",
  "/MELOSAV/profile.html",
  "/MELOSAV/style.css",
  "/MELOSAV/script.js",
  "/MELOSAV/icon-192.png",
  "/MELOSAV/icon-512.png"
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
