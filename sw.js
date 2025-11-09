const CACHE_NAME = 'h2one-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/products.html',
  '/about.html',
  '/contact.html',
  '/css/styles.css',
  '/js/script.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
