const CACHE_NAME = 'gb-v7';

self.addEventListener('install', function (event) {
  event.waitUntil(
    self.skipWaiting()
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  )
  recaregarComCache();
});

function recaregarComCache() {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({ action: 'reload' });
    });
  });
}

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.match(event.request).then(function (response) {
          return response || fetch(event.request).then(function (networkResponse) {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
  );
});
