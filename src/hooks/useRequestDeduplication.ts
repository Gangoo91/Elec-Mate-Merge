/**
 * Request Deduplication Hook
 * Prevents duplicate concurrent requests with same parameters
 */

import { useRef } from 'react';

interface PendingRequest {
  promise: Promise<any>;
  timestamp: number;
}

export const useRequestDeduplication = () => {
  const pendingRequests = useRef<Map<string, PendingRequest>>(new Map());

  const deduplicatedRequest = async <T>(
    requestKey: string,
    requestFn: () => Promise<T>
  ): Promise<T> => {
    // Check if identical request is in flight
    const pending = pendingRequests.current.get(requestKey);
    
    if (pending) {
      console.log(`🔄 Deduplicating request: ${requestKey}`);
      return pending.promise as Promise<T>;
    }

    // Create new request
    const promise = requestFn();
    
    pendingRequests.current.set(requestKey, {
      promise,
      timestamp: Date.now()
    });

    try {
      const result = await promise;
      return result;
    } finally {
      // Clean up after request completes
      setTimeout(() => {
        pendingRequests.current.delete(requestKey);
      }, 100);
    }
  };

  const clearAll = () => {
    pendingRequests.current.clear();
  };

  const getPendingCount = (): number => {
    // Clean up old entries (>5s)
    const now = Date.now();
    for (const [key, req] of pendingRequests.current.entries()) {
      if (now - req.timestamp > 5000) {
        pendingRequests.current.delete(key);
      }
    }
    return pendingRequests.current.size;
  };

  return {
    deduplicatedRequest,
    clearAll,
    getPendingCount
  };
};
