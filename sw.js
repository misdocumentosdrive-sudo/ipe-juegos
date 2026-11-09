/* Juegos IPE I: guarda una copia de cada juego para abrirlo sin internet (9-11-2026).
   Siempre pide primero la versión de internet (así llegan los cambios); la copia solo se usa sin conexión. */
const CACHE = 'ipe-juegos-1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;   // formulario y ranking: directos
  e.respondWith(fetch(r).then(res => {
    if (res.ok) { const c = res.clone(); caches.open(CACHE).then(k => k.put(r, c)) }
    return res;
  }).catch(() => caches.match(r, { ignoreSearch: true })));
});
