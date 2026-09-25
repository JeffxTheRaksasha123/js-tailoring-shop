self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("tailoring-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/manifest.json",
        "/jstailoring_192x192.png",
        "/jstailoring_512x512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});