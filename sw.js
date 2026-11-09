/* Juegos IPE I (José, 9-11-2026): SOLO EN LÍNEA. No guarda copias (borra las que hubiera de la versión anterior):
   siempre carga de internet, para que el juego sepa en todo momento los intentos reales. Se mantiene solo para que los
   juegos se puedan seguir instalando como app. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(k => Promise.all(k.map(x => caches.delete(x)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(fetch(r));
});
