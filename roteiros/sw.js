export default function sw() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register('serviceWorker.js')
      .catch(function (error) {
        console.error('Erro ao registrar o Service Worker:', error);
      });
    navigator.serviceWorker.addEventListener('message', (event) => {
      if(event.data && event.data.action === 'reload'){
        window.location.reload(true);
      }
    });
  }
}