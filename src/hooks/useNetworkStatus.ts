import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { Network, ConnectionStatus } from '@capacitor/network';

export type ConnectionType = 'wifi' | 'cellular' | 'none' | 'unknown';

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [connectionType, setConnectionType] = useState<ConnectionType>('unknown');

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      // Use Capacitor Network plugin for reliable native detection
      Network.getStatus().then((status: ConnectionStatus) => {
        setIsOnline(status.connected);
        setConnectionType(status.connectionType as ConnectionType);
      });

      const handle = Network.addListener('networkStatusChange', (status: ConnectionStatus) => {
        setIsOnline(status.connected);
        setConnectionType(status.connectionType as ConnectionType);
      });

      return () => {
        handle.then((h) => h.remove());
      };
    }

    // Web fallback
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return { isOnline, connectionType };
}
