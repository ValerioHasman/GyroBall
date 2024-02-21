self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open('gbv1')
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
