export default function sw() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register('serviceWorker.js')
      .then(function (registration) {
        if (registration.active && navigator.onLine) {
          registration.unregister().then(function () {
            navigator.serviceWorker.register('serviceWorker.js')
            .catch((eh)=>{
              console.error('Registro Falhou', eh);
            });
          });
        }
      })
      .catch(function (error) {
        console.error('Erro ao registrar o Service Worker:', error);
      });
  }
}