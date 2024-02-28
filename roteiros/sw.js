export default function sw() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register('serviceWorker.js')
      .catch(function (error) {
        console.error('Erro ao registrar o Service Worker:', error);
      });
  }
}