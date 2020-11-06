const CACHE_NAME = "score-v2";
var urlsToCache = [
  "/",
  "/index.html",
  "/details.html",
  "/service-worker.js",
  "/details.js",
  "/index.js",
  "/manifest.json",
  "/js/main/idb.js",
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

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((response) => {
      if (response) {
        return response;
      }
      let requestToCache = event.request.clone();

      return fetch(requestToCache).then((response) => {
        if (!response) {
          return response;
        }

        let responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(requestToCache, responseToCache);
        });
        return response;
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName != CACHE_NAME) {
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
