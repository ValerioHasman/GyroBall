const cacheName = "gbv1";

const recursosPreCache = [
  './',
  './index.html',
  './estilos/estilo.css',
  './icones/GyroBallA.png',
  './icones/GyroBallAR.png',
  './icones/GyroBallM.png',
  './icones/GyroBallMR.png',
  './roteiros/classes/ArmazenamentoLocal.js',
  './roteiros/classes/BDIndexado.js',
  './roteiros/classes/GyroBall.js',
  './roteiros/classes/Modais.js',
  './roteiros/paginas/conquistas/aualizarTabela.js',
  './roteiros/paginas/conquistas/gerarTabela.js',
  './roteiros/paginas/praticar/DeduzirRPM.js',
  './roteiros/paginas/praticar/exercicioPraticado.js',
  './roteiros/paginas/configuracao.js',
  './roteiros/paginas/conquistas.js',
  './roteiros/paginas/praticar.js',
  './roteiros/bd.js',
  './roteiros/main.js',
  './roteiros/paginas.js',
  './roteiros/utilitarios/stringEmElemento.js',
  './roteiros/utilitarios/tema.js',
  './roteiros/utilitarios/tempoDecorrido.js',
  './manifest.json'
]

self.addEventListener('install', evento => {
  evento.waitUntil(
    caches
      .open(cacheName)
      .then( cache => (cache.addAll(recursosPreCache)))
  );
  console.log('install ServiceWorker');
});

self.addEventListener('fetch', evento => {
  evento.respondWith(
    caches
      .match(evento.request)
      .then( cacheResposta => ( cacheResposta || fetch(evento.request) ))
  );
  console.log('fetch Service Worker');
});
