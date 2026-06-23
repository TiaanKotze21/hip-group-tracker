self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  self.clients.claim();
});

self.addEventListener('message', function(e) {
  if (!e.data || e.data.type !== 'SCHEDULE_NOTIF') return;
  var delayMs = e.data.delayMs;
  var body = e.data.body || 'Reminder: Complete your tracker for today!';
  setTimeout(function() {
    self.registration.showNotification('HIP Group', {
      body: body,
      tag: 'hip-daily',
      renotify: true,
      requireInteraction: false
    });
  }, delayMs);
});

self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  e.waitUntil(clients.openWindow(self.registration.scope));
});
