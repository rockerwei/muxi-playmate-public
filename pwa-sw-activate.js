// Loaded by Workbox SW on activate — reloads open clients without relying on the JS bundle.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) =>
      Promise.all(
        clients.map((client) => {
          try {
            client.postMessage({ type: 'SW_ACTIVATED_RELOAD' })
          } catch {
            // ignore
          }
          return client.navigate(client.url)
        }),
      ),
    ),
  )
})
