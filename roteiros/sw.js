export default function sw() {
  if (navigator.onLine) {
    navigator.serviceWorker.register('serviceWorker.js')
      .then(function (registration) {
        if (registration.active) {
          registration.unregister().then(function () {
            console.info('Service Worker removido');
          });
        }
      })
      .catch(function (error) {
        console.error('Erro ao registrar o Service Worker:', error);
      });
  }
}