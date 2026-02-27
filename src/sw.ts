/// <reference lib="webworker" />

import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

declare const self: ServiceWorkerGlobalScope;

// Background Sync API types (not in standard TS lib)
interface SyncEvent extends ExtendableEvent {
  tag: string;
}

// ─── Workbox: Precaching ─────────────────────────────────────────
// VitePWA injects the precache manifest at build time
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

// ─── Workbox: SPA Navigation Fallback ────────────────────────────
// All navigation requests serve the precached index.html (standard SPA pattern).
// This ensures ANY route works offline — not just previously visited URLs.
// New deploys are picked up via SW update (autoUpdate + PWAUpdatePrompt).
registerRoute(new NavigationRoute(createHandlerBoundToURL('/index.html')));

// ─── Workbox: Runtime Caching ────────────────────────────────────

// JS chunks: NetworkFirst with 24hr cache
registerRoute(
  /\.js$/,
  new NetworkFirst({
    cacheName: 'js-cache',
    networkTimeoutSeconds: 5,
    plugins: [new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 24 * 60 * 60 })],
  })
);

// Supabase API: NetworkFirst with 60s cache, only cache successful responses
registerRoute(
  /^https:\/\/.*supabase\.co\/.*/i,
  new NetworkFirst({
    cacheName: 'supabase-cache',
    networkTimeoutSeconds: 8,
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 }),
    ],
  })
);

// ─── Push Notifications ──────────────────────────────────────────

interface NotificationTypeConfig {
  icon: string;
  badge: string;
  color: string;
  vibrate: number[];
  requireInteraction: boolean;
  actions: NotificationAction[];
}

const NOTIFICATION_CONFIG: Record<string, NotificationTypeConfig> = {
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

// ─── SW Lifecycle ────────────────────────────────────────────────

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      // Clean up orphaned cache from the old manual service worker
      caches.delete('elec-mate-v1'),
      caches.delete('html-cache'),
    ])
  );
});

// ─── Push Event Handler ──────────────────────────────────────────

self.addEventListener('push', (event: PushEvent) => {
  let payload = {
    title: 'Elec-Mate',
    body: 'You have a new notification',
    type: 'default',
    data: {} as Record<string, unknown>,
    image: undefined as string | undefined,
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
    } catch {
      payload.body = event.data.text();
    }
  }

  const type = payload.type || 'default';
  const config = NOTIFICATION_CONFIG[type] || NOTIFICATION_CONFIG.default;

  // Overdue invoice gets a different icon
  const isOverdue = type === 'invoice' && payload.data?.status === 'overdue';
  const icon = isOverdue ? '/icons/invoice-overdue.svg' : config.icon;

  const options: NotificationOptions & { actions?: NotificationAction[] } = {
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
    timestamp: payload.data?.timestamp || Date.now(),
    silent: type === 'vacancy' || type === 'college',
  };

  if (payload.image) {
    options.image = payload.image;
  }

  event.waitUntil(self.registration.showNotification(payload.title, options));
});

// ─── Notification Click Handler ──────────────────────────────────

self.addEventListener('notificationclick', (event: NotificationEvent) => {
  event.notification.close();

  const data = event.notification.data || {};
  const action = event.action;

  if (action === 'dismiss') {
    return;
  }

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
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          return (client as WindowClient).focus().then((focusedClient) => {
            if ('navigate' in focusedClient) {
              return focusedClient.navigate(url);
            }
          });
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(url);
      }
    })
  );
});

// ─── Notification Close (analytics hook) ─────────────────────────

self.addEventListener('notificationclose', () => {
  // Could send analytics here
});

// ─── Background Sync ─────────────────────────────────────────────

self.addEventListener('sync', ((event: SyncEvent) => {
  if (event.tag === 'send-message') {
    event.waitUntil(sendQueuedMessages());
  }
}) as EventListener);

async function sendQueuedMessages(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction('outbox', 'readonly');
    const store = tx.objectStore('outbox');
    const messages = (await idbRequest(store.getAll())) as {
      id: IDBValidKey;
      [key: string]: unknown;
    }[];

    for (const message of messages) {
      try {
        await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(message),
        });

        const deleteTx = db.transaction('outbox', 'readwrite');
        await idbRequest(deleteTx.objectStore('outbox').delete(message.id));
      } catch (error) {
        console.error('[SW] Failed to send queued message:', error);
      }
    }
  } catch (error) {
    console.error('[SW] Error processing message queue:', error);
  }
}

// ─── IndexedDB Helpers ───────────────────────────────────────────

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('elec-mate-offline', 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('outbox')) {
        db.createObjectStore('outbox', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

function idbRequest<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ─── Message Handler (PWA update + client comms) ─────────────────

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
