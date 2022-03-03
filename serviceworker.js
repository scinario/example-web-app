self.addEventListener('fetch', e => {
    e.respondWith(
      fetch(e.request).catch(() => {
        return new Response("You're offline");
      })
    );
  });