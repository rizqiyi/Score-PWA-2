const CACHE_NAME = "score-v2";
var urlsToCache = [
  "/",
  "/index.html",
  "/details.html",
  "/service-worker.js",
  "/details.js",
  "/index.js",
  "/manifest.json",
  "/idb-2.1.3/lib/idb.js",
  "/components/footer.html",
  "/components/nav.html",
  "/js/api/api.js",
  "/js/api/baseURL.js",
  "/js/api/fetchAPI.js",
  "/js/api/getDetails.js",
  "/js/api/getSaved.js",
  "/js/components/footer.js",
  "/js/components/nav.js",
  "/js/data/loadDetailPage.js",
  "/js/data/loadPage.js",
  "/js/idb/idb.js",
  "/js/main/aos.js",
  "/js/main/materialize.min.js",
  "/js/main/moment.js",
  "/css/fonts.css",
  "/css/poster.css",
  "/css/index.css",
  "/css/aos.css",
  "/css/favorit.css",
  "/css/details.css",
  "/css/materialize.min.css",
  "/pages/details-team.html",
  "/pages/favorit.html",
  "/pages/jadwal.html",
  "/pages/klasemen.html",
  "/pages/tim.html",
  "/assets/images/score.png",
  "/assets/fonts/NotoSansJP/NotoSansJP-Bold.otf",
  "/assets/fonts/NotoSansJP/NotoSansJP-Light.otf",
  "/assets/fonts/NotoSansJP/NotoSansJP-Regular.otf",
  "/assets/icons/MaterialIcons-Regular.ttf",
  "/assets/icons/MaterialIcons-Regular.woff",
  "/assets/icons/MaterialIcons-Regular.woff2",
  "/js/notifications/push-notification.js",
];

let base_url = "https://api.football-data.org/";
let base_url2 = "https://crests.football-data.org";

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  if (
    event.request.url.indexOf(base_url) > -1 ||
    event.request.url.indexOf(base_url2) > -1
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
      })
    );
  }
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("push", (event) => {
  let body;

  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }

  let options = {
    body,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
