// ============================================================
// INDAHOUSE — Service Worker (PWA)
// Handles offline support, caching, and push notifications
// ============================================================

const CACHE_NAME = 'indahouse-v1';
const OFFLINE_URL = '/offline.html';

const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
];

// ── Install: cache static assets ─────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// ── Activate: clean old caches ───────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── Fetch: serve from cache or network ───────────────────────
self.addEventListener('fetch', event => {
  // Skip non-GET and API requests
  if (event.request.method !== 'GET') return;
  if (event.request.url.includes('/api/')) return;
  if (event.request.url.includes('supabase')) return;
  if (event.request.url.includes('stripe')) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful responses
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        // Offline: try cache first
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          // For navigation requests, show offline page
          if (event.request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }
          return new Response('Offline', { status: 503 });
        });
      })
  );
});

// ── Push notifications ────────────────────────────────────────
self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  const title = data.title || 'Indahouse 🎧';
  const options = {
    body: data.body || 'You have a new notification',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/' },
    actions: data.action ? [{ action: 'open', title: data.action }] : [],
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// ── Notification click ────────────────────────────────────────
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      const existing = list.find(c => c.url === url);
      if (existing) return existing.focus();
      return clients.openWindow(url);
    })
  );
});
