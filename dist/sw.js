/* =========================================================
   小紅帽大冒險 Service Worker Cleanup
   自動清理舊版巨型緩存，確保首屏秒開極速加載
   ========================================================= */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.claim())
  );
});
