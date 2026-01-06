import { useState, useEffect, useCallback, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

interface QueuedMessage {
  id: string;
  conversationId: string;
  content: string;
  senderType: 'employer' | 'electrician';
  senderId: string;
  messageType: string;
  metadata?: Record<string, unknown>;
  queuedAt: number;
  retryCount: number;
}

const STORAGE_KEY = 'elecmate_offline_message_queue';
const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds

/**
 * Hook to manage offline message queue
 */
export function useOfflineQueue() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [queue, setQueue] = useState<QueuedMessage[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const processingRef = useRef(false);
  const queryClient = useQueryClient();

  // Load queue from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setQueue(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading offline queue:', error);
    }
  }, []);

  // Save queue to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
    } catch (error) {
      console.error('Error saving offline queue:', error);
    }
  }, [queue]);

  // Track online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: 'Back Online',
        description: 'Syncing pending messages...',
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: 'You\'re Offline',
        description: 'Messages will be sent when you reconnect.',
        variant: 'destructive',
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Process queue when coming back online
  useEffect(() => {
    if (isOnline && queue.length > 0 && !processingRef.current) {
      processQueue();
    }
  }, [isOnline, queue.length]);

  /**
   * Add message to offline queue
   */
  const addToQueue = useCallback((message: Omit<QueuedMessage, 'id' | 'queuedAt' | 'retryCount'>) => {
    const queuedMessage: QueuedMessage = {
      ...message,
      id: `offline-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      queuedAt: Date.now(),
      retryCount: 0,
    };

    setQueue(prev => [...prev, queuedMessage]);
    return queuedMessage.id;
  }, []);

  /**
   * Remove message from queue
   */
  const removeFromQueue = useCallback((id: string) => {
    setQueue(prev => prev.filter(m => m.id !== id));
  }, []);

  /**
   * Process the offline queue
   */
  const processQueue = useCallback(async () => {
    if (processingRef.current || !isOnline || queue.length === 0) return;

    processingRef.current = true;
    setIsSyncing(true);

    const { sendMessage } = await import('@/services/conversationService');
    const toRemove: string[] = [];
    const toRetry: QueuedMessage[] = [];

    for (const message of queue) {
      try {
        await sendMessage({
          conversation_id: message.conversationId,
          sender_type: message.senderType,
          sender_id: message.senderId,
          content: message.content,
          message_type: message.messageType as any,
          metadata: message.metadata,
        });

        toRemove.push(message.id);

        // Invalidate queries to refresh the UI
        queryClient.invalidateQueries({
          queryKey: ['messages', message.conversationId],
        });
      } catch (error) {
        console.error('Failed to send queued message:', error);

        if (message.retryCount < MAX_RETRIES) {
          toRetry.push({
            ...message,
            retryCount: message.retryCount + 1,
          });
        } else {
          // Max retries exceeded, remove from queue
          toRemove.push(message.id);
          toast({
            title: 'Message Failed',
            description: 'A message couldn\'t be sent after multiple attempts.',
            variant: 'destructive',
          });
        }
      }
    }

    // Update queue
    setQueue(prev => {
      const remaining = prev.filter(m => !toRemove.includes(m.id));
      // Update retry counts
      return remaining.map(m => {
        const retry = toRetry.find(r => r.id === m.id);
        return retry || m;
      });
    });

    if (toRemove.length > 0 && toRetry.length === 0) {
      toast({
        title: 'Messages Synced',
        description: `${toRemove.length} message(s) sent successfully.`,
      });
    }

    setIsSyncing(false);
    processingRef.current = false;

    // Retry remaining messages after delay
    if (toRetry.length > 0) {
      setTimeout(() => {
        processQueue();
      }, RETRY_DELAY);
    }
  }, [isOnline, queue, queryClient]);

  /**
   * Clear the entire queue
   */
  const clearQueue = useCallback(() => {
    setQueue([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  /**
   * Get queue status for a specific conversation
   */
  const getConversationQueueStatus = useCallback((conversationId: string) => {
    const conversationQueue = queue.filter(m => m.conversationId === conversationId);
    return {
      count: conversationQueue.length,
      messages: conversationQueue,
      hasPending: conversationQueue.length > 0,
    };
  }, [queue]);

  return {
    isOnline,
    isSyncing,
    queue,
    queueLength: queue.length,
    addToQueue,
    removeFromQueue,
    processQueue,
    clearQueue,
    getConversationQueueStatus,
  };
}

/**
 * Hook to wrap message sending with offline support
 */
export function useOfflineSendMessage(
  sendMessageFn: (params: any) => Promise<any>,
  offlineQueue: ReturnType<typeof useOfflineQueue>
) {
  const [pendingMessages, setPendingMessages] = useState<Map<string, string>>(new Map());

  const send = useCallback(async (params: {
    conversation_id: string;
    sender_type: 'employer' | 'electrician';
    sender_id: string;
    content: string;
    message_type?: string;
    metadata?: Record<string, unknown>;
  }) => {
    const tempId = `temp-${Date.now()}`;

    if (!offlineQueue.isOnline) {
      // Queue for later
      const queuedId = offlineQueue.addToQueue({
        conversationId: params.conversation_id,
        content: params.content,
        senderType: params.sender_type,
        senderId: params.sender_id,
        messageType: params.message_type || 'text',
        metadata: params.metadata,
      });

      setPendingMessages(prev => new Map(prev).set(queuedId, params.conversation_id));

      return {
        id: queuedId,
        conversation_id: params.conversation_id,
        content: params.content,
        sender_type: params.sender_type,
        sender_id: params.sender_id,
        message_type: params.message_type || 'text',
        metadata: params.metadata || {},
        sent_at: new Date().toISOString(),
        delivered_at: null,
        read_at: null,
        created_at: new Date().toISOString(),
        _isQueued: true,
      };
    }

    // Online - send immediately
    try {
      const result = await sendMessageFn(params);
      return result;
    } catch (error) {
      // Failed to send - queue for retry
      const queuedId = offlineQueue.addToQueue({
        conversationId: params.conversation_id,
        content: params.content,
        senderType: params.sender_type,
        senderId: params.sender_id,
        messageType: params.message_type || 'text',
        metadata: params.metadata,
      });

      setPendingMessages(prev => new Map(prev).set(queuedId, params.conversation_id));

      throw error;
    }
  }, [offlineQueue, sendMessageFn]);

  return {
    send,
    pendingMessages,
  };
}

/**
 * Offline indicator component props
 */
export interface OfflineIndicatorProps {
  isOnline: boolean;
  queueLength: number;
  isSyncing: boolean;
}
