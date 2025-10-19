/**
 * Parallel Processing Utilities for Circuit Design
 * Handles batching and deduplication for faster processing
 */

/**
 * Split array into chunks of specified size
 */
export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

/**
 * Request deduplication for RAG searches
 * Prevents duplicate concurrent requests with same parameters
 */
export class RequestDeduplicator {
  private pendingRequests: Map<string, Promise<any>> = new Map();
  
  async deduplicate<T>(
    requestKey: string,
    requestFn: () => Promise<T>
  ): Promise<T> {
    // Check if identical request is in flight
    const pending = this.pendingRequests.get(requestKey);
    
    if (pending) {
      console.log(`🔄 Deduplicating request: ${requestKey}`);
      return pending as Promise<T>;
    }

    // Create new request
    const promise = requestFn();
    
    this.pendingRequests.set(requestKey, promise);

    try {
      const result = await promise;
      return result;
    } finally {
      // Clean up after request completes
      setTimeout(() => {
        this.pendingRequests.delete(requestKey);
      }, 100);
    }
  }

  clear() {
    this.pendingRequests.clear();
  }

  getPendingCount(): number {
    return this.pendingRequests.size;
  }
}

/**
 * Generate request key for deduplication
 */
export function generateRequestKey(prefix: string, ...params: any[]): string {
  const normalized = params.map(p => {
    if (typeof p === 'object') {
      return JSON.stringify(p);
    }
    return String(p).toLowerCase();
  }).join(':');
  
  return `${prefix}:${normalized}`;
}
