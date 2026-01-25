// Elec-Mate Service Worker for Push Notifications
// Handles push events, notification clicks, and background sync

const CACHE_NAME = 'elec-mate-v1';

// Type-specific notification configuration
const NOTIFICATION_CONFIG = {
  peer: {
    icon: '/icons/peer.svg',
    badge: '/icons/badge.svg',
    color: '#EC4899',
    vibrate: [100, 50, 100, 50, 100],
    requireInteraction: true,
    actions: [
      { action: 'reply', title: 'Reply' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  },
  job: {
    icon: '/icons/message.svg',
    badge: '/icons/badge.svg',
    color: '#FACC15',
    vibrate: [100, 50, 100],
    requireInteraction: true,
    actions: [
      { action: 'view', title: 'View Message' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  },
  team: {
    icon: '/icons/team.svg',
    badge: '/icons/badge.svg',
    color: '#6366F1',
    vibrate: [100, 50, 100],
    requireInteraction: false,
    actions: [
      { action: 'reply', title: 'Reply' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  },
  college: {
    icon: '/icons/message.svg',
    badge: '/icons/badge.svg',
    color: '#3B82F6',
    vibrate: [100, 50, 100],
    requireInteraction: false,
    actions: [
      { action: 'view', title: 'View' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  },
  quote: {
    icon: '/icons/quote.svg',
    badge: '/icons/badge.svg',
    color: '#3B82F6',
    vibrate: [200, 100, 200],
    requireInteraction: true,
    actions: [
      { action: 'view', title: 'View Quote' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  },
  invoice: {
    icon: '/icons/invoice.svg',
    badge: '/icons/badge.svg',
    color: '#22C55E',
    vibrate: [200, 100, 200],
    requireInteraction: true,
    actions: [
      { action: 'view', title: 'View Invoice' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  },
  application: {
    icon: '/icons/application.svg',
    badge: '/icons/badge.svg',
    color: '#F59E0B',
    vibrate: [200, 100, 200, 100, 200],
    requireInteraction: true,
    actions: [
      { action: 'view', title: 'View Application' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  },
  vacancy: {
    icon: '/icons/vacancy.svg',
    badge: '/icons/badge.svg',
    color: '#8B5CF6',
    vibrate: [150, 75, 150],
    requireInteraction: false,
    actions: [
      { action: 'view', title: 'View Job' },
      { action: 'dismiss', title: 'Later' },
    ],
  },
  certificate: {
    icon: '/icons/certificate.svg',
    badge: '/icons/badge.svg',
    color: '#10B981',
    vibrate: [100, 50, 100],
    requireInteraction: false,
    actions: [
      { action: 'view', title: 'View Certificate' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  },
  default: {
    icon: '/pwa-192x192.png',
    badge: '/icons/badge.svg',
    color: '#FACC15',
    vibrate: [100, 50, 100],
    requireInteraction: false,
    actions: [
      { action: 'view', title: 'View' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  },
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(clients.claim());
});

// Push event - handle incoming push notifications
self.addEventListener('push', (event) => {
  console.log('[SW] Push received:', event);

  let payload = {
    title: 'Elec-Mate',
    body: 'You have a new notification',
    type: 'default',
    data: {},
  };

  if (event.data) {
    try {
      const jsonPayload = event.data.json();
      payload = {
        title: jsonPayload.title || payload.title,
        body: jsonPayload.body || payload.body,
        type: jsonPayload.type || jsonPayload.data?.type || 'default',
        data: jsonPayload.data || {},
        image: jsonPayload.image,
      };
    } catch (e) {
      payload.body = event.data.text();
    }
  }

  // Get type-specific config
  const type = payload.type || 'default';
  const config = NOTIFICATION_CONFIG[type] || NOTIFICATION_CONFIG.default;

  // Check for overdue invoice (special case with different icon)
  const isOverdue = type === 'invoice' && payload.data?.status === 'overdue';
  const icon = isOverdue ? '/icons/invoice-overdue.svg' : config.icon;

  const options = {
    body: payload.body,
    icon: icon,
    badge: config.badge,
    tag: `${type}-${payload.data?.conversationId || payload.data?.invoiceId || payload.data?.applicationId || Date.now()}`,
    vibrate: config.vibrate,
    renotify: true,
    requireInteraction: config.requireInteraction,
    data: {
      type: type,
      ...payload.data,
    },
    actions: config.actions,
    // Add timestamp for when the event happened
    timestamp: payload.data?.timestamp || Date.now(),
    // Silent for less urgent notifications
    silent: type === 'vacancy' || type === 'college',
  };

  // Add image for certain notification types if provided
  if (payload.image) {
    options.image = payload.image;
  }

  event.waitUntil(
    self.registration.showNotification(payload.title, options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event);

  event.notification.close();

  const data = event.notification.data || {};
  const action = event.action;

  // Handle dismiss action
  if (action === 'dismiss') {
    return;
  }

  // Determine URL based on message type
  let url = '/';
  switch (data.type) {
    case 'peer':
      url = `/electrician/mental-health?tab=mates&conversation=${data.conversationId || ''}`;
      break;
    case 'job':
      url = data.isEmployer
        ? `/employer/messages?conversation=${data.conversationId || ''}`
        : `/electrician/messages?conversation=${data.conversationId || ''}`;
      break;
    case 'team':
      url = `/employer/team?channel=${data.channelId || ''}&dm=${data.dmId || ''}`;
      break;
    case 'college':
      url = `/college/messages?conversation=${data.conversationId || ''}`;
      break;
    case 'quote':
      url = `/employer/finance?tab=quotes&id=${data.quoteId || ''}`;
      break;
    case 'invoice':
      url = `/employer/finance?tab=invoices&id=${data.invoiceId || ''}`;
      break;
    case 'application':
      url = data.isEmployer
        ? `/employer/recruitment?tab=applications&id=${data.applicationId || ''}`
        : `/electrician/jobs?tab=applications&id=${data.applicationId || ''}`;
      break;
    case 'vacancy':
      url = `/electrician/jobs?vacancy=${data.vacancyId || ''}`;
      break;
    case 'certificate':
      url = `/electrician/certificates?id=${data.certificateId || ''}`;
      break;
    default:
      url = '/';
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If a window is already open, focus it and navigate
      for (const client of clientList) {
        if ('focus' in client) {
          return client.focus().then((focusedClient) => {
            if ('navigate' in focusedClient) {
              return focusedClient.navigate(url);
            }
          });
        }
      }
      // Otherwise, open a new window
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// Notification close event (for analytics)
self.addEventListener('notificationclose', (event) => {
  console.log('[SW] Notification closed:', event);
  // Could send analytics here
});

// Background sync for offline messages
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);

  if (event.tag === 'send-message') {
    event.waitUntil(sendQueuedMessages());
  }
});

// Send queued messages when back online
async function sendQueuedMessages() {
  try {
    const db = await openDB();
    const tx = db.transaction('outbox', 'readonly');
    const store = tx.objectStore('outbox');
    const messages = await store.getAll();

    for (const message of messages) {
      try {
        await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(message),
        });

        // Remove from outbox after successful send
        const deleteTx = db.transaction('outbox', 'readwrite');
        await deleteTx.objectStore('outbox').delete(message.id);
      } catch (error) {
        console.error('[SW] Failed to send queued message:', error);
      }
    }
  } catch (error) {
    console.error('[SW] Error processing message queue:', error);
  }
}

// Simple IndexedDB helper for message queue
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('elec-mate-offline', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('outbox')) {
        db.createObjectStore('outbox', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

// Listen for messages from the main app
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
