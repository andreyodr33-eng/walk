 const CACHE_NAME = "notebook-v1";
 const FILES_TO_CACHE = [
   "./",
   "./блокнот.html",
   "./manifest.json",
   "./icon-192.png",
   "./icon-512.png" 
 ];
// Установка Service Worker
 self.addEventListener("install", function(event) {
   event.waitUntil(

     caches.open(CACHE_NAME)
        .then(function(cache) {

            return cache.addAll(FILES_TO_CACHE);

        })

 );

  self.skipWaiting();
 });
// Активация новой версии 
 self.addEventListener("activate", function(event) {
     event.waitUntil(

     caches.keys()
        .then(function(cacheNames) {

            return Promise.all(

                cacheNames.map(function(cacheName) {

                    if (cacheName !== CACHE_NAME) {

                        return caches.delete(cacheName);

                    }

                })

            );

        })

 );

 self.clients.claim();
 });
 // Работа с запросами
 self.addEventListener("fetch", function(event) {
    event.respondWith(

      caches.match(event.request)
        .then(function(response) {

            // Есть в кэше — используем кэш
            if (response) {

                return response;

            }

            // Нет в кэше — пробуем интернет
            return fetch(event.request);

        })

   );
});
