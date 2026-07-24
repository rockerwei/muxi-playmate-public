// Runs inside Workbox SW — must not depend on the React bundle (iOS PWA can ignore client.navigate).
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: 'window', includeUncontrolled: true }))
      .then((clients) =>
        Promise.all(
          clients.map((client) => {
            try {
              client.postMessage({ type: 'SW_ACTIVATED_RELOAD' })
            } catch {
              // ignore
            }
            try {
              const nextUrl = new URL(client.url)
              nextUrl.searchParams.set('_sw', String(Date.now()))
              return client.navigate(nextUrl.toString())
            } catch {
              return client.navigate(client.url)
            }
          }),
        ),
      ),
  )
})
