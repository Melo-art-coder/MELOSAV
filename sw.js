const CACHE_NAME = "melosave-cache-v3";

const assets = [
  "/MELOSAV/",
  "/MELOSAV/index.html",
  "/MELOSAV/home.html",
  "/MELOSAV/login.html",
  "/MELOSAV/signup.html",
  "/MELOSAV/profile.html",

  "/MELOSAV/style.css",
  "/MELOSAV/home.css",
  "/MELOSAV/dashboard-v3.css",

  "/MELOSAV/storage.js",
  "/MELOSAV/profile.js",
  "/MELOSAV/notifications.js",
  "/MELOSAV/welcome.js",
  "/MELOSAV/theme.js",
  "/MELOSAV/auth.js",
  "/MELOSAV/home.js",
  "/MELOSAV/transactions.js",
  "/MELOSAV/budget.js",
  "/MELOSAV/transfer.js",

  "/MELOSAV/icon-192.png",
  "/MELOSAV/icon-512.png"
];


// Install
self.addEventListener("install", event => {

  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(assets))
  );

});


// Delete old cache
self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(keys => {

      return Promise.all(

        keys.map(key => {

          if(key !== CACHE_NAME){

            return caches.delete(key);

          }

        })

      );

    })

  );

});


// Fetch
self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request)
    .then(response => {

      return response || fetch(event.request);

    })

  );

});