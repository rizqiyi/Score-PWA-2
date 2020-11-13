importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) {
  console.log("Workbox Siap");
  workbox.precaching.precacheAndRoute(
    [
      { url: "/", revision: 1 },
      { url: "/index.html", revision: 1 },
      { url: "/details.html", revision: 1 },
      { url: "/service-worker.js", revision: 1 },
      { url: "/details.js", revision: 1 },
      { url: "/index.js", revision: 1 },
      { url: "/manifest.json", revision: 1 },
      { url: "/js/main/idb.js", revision: 1 },
      { url: "/components/footer.html", revision: 1 },
      { url: "/components/nav.html", revision: 1 },
      { url: "/js/api/api.js", revision: 1 },
      { url: "/js/api/baseURL.js", revision: 1 },
      { url: "/js/api/fetchAPI.js", revision: 1 },
      { url: "/js/api/getDetails.js", revision: 1 },
      { url: "/js/api/getSaved.js", revision: 1 },
      { url: "/js/components/footer.js", revision: 1 },
      { url: "/js/components/nav.js", revision: 1 },
      { url: "/js/data/loadDetailPage.js", revision: 1 },
      { url: "/js/data/loadPage.js", revision: 1 },
      { url: "/js/idb/idb.js", revision: 1 },
      { url: "/js/main/aos.js", revision: 1 },
      { url: "/js/main/materialize.min.js", revision: 1 },
      { url: "/js/main/moment.js", revision: 1 },
      { url: "/css/fonts.css", revision: 1 },
      { url: "/css/poster.css", revision: 1 },
      { url: "/css/index.css", revision: 1 },
      { url: "/css/aos.css", revision: 1 },
      { url: "/css/favorit.css", revision: 1 },
      { url: "/css/details.css", revision: 1 },
      { url: "/css/materialize.min.css", revision: 1 },
      { url: "/pages/details-team.html", revision: 1 },
      { url: "/pages/favorit.html", revision: 1 },
      { url: "/pages/jadwal.html", revision: 1 },
      { url: "/pages/klasemen.html", revision: 1 },
      { url: "/pages/tim.html", revision: 1 },
      { url: "/assets/images/score-72x72.png", revision: 1 },
      { url: "/assets/images/score-512x512.png", revision: 1 },
      { url: "/assets/images/score-192x192.png", revision: 1 },
    ],
    {
      ignoreUrlParametersMatching: [/.*/],
    }
  );

  workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
    workbox.strategies.cacheFirst({
      cacheName: "images-cache",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/v2/"),
    workbox.strategies.staleWhileRevalidate()
  );

  workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "static-resources",
    })
  );

  workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: "google-fonts-stylesheets",
    })
  );

  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
      cacheName: "google-fonts-webfonts",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    new RegExp("/pages/"),
    workbox.strategies.staleWhileRevalidate({
      cacheName: "pages",
    })
  );
  workbox.routing.registerRoute(
    new RegExp("/js/api/"),
    workbox.strategies.staleWhileRevalidate({
      cacheName: "js-api",
    })
  );
} else {
  console.log("Workbox gagal");
}

self.addEventListener("push", (event) => {
  let body;

  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }

  let options = {
    body,
    icon: "./assets/images/score.png",
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
