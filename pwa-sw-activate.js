// Runs inside Workbox SW — must not depend on the React bundle.
// Only skipWaiting when the app explicitly requests an update (SKIP_WAITING).
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    event.waitUntil(self.skipWaiting())
  }
})
