/* =========================================================
   小紅帽大冒險 Service Worker (PWA Offline Cache)
   ========================================================= */
const CACHE_NAME = 'rrh-cache-v1';
const PRECACHE_ASSETS = [
  './',
  'index.html',
  'manual.html',
  'manifest.json',
  'q-math.js',
  'q-chinese.js',
  'q-english.js',
  'q-music.js',
  'q-bible.js',
  'assets/poster.jpg',
  'assets/player.png',
  'assets/slime.png',
  'assets/wolf.png',
  'assets/bear.png',
  'assets/eagle.png',
  'assets/lion.png',
  'assets/dragon.png',
  'assets/cost_red.png',
  'assets/cost_tang.png',
  'assets/cost_princess.png',
  'assets/cost_cowboy.png',
  'assets/cost_red_sprite.png',
  'assets/cost_tang_sprite.png',
  'assets/cost_princess_sprite.png',
  'assets/cost_cowboy_sprite.png',
  'assets/crit_piranha.png',
  'assets/crit_bee.png',
  'assets/crit_bat.png',
  'assets/crit_frog.png',
  'assets/crit_snake.png',
  'assets/hydra_body.png',
  'assets/hydra_head.png',
  'assets/hydra_head_fire.png',
  'assets/fonts/YanKaiTC.ttf',
  'assets/parts/parts.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_ASSETS).catch(err => {
        console.warn('PWA Precache warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const toCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, toCache);
        });
        return response;
      }).catch(() => {
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('index.html');
        }
      });
    })
  );
});
