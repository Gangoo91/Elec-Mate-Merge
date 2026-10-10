import { useSyncExternalStore } from 'react';
import { getOutboxState, subscribeOutbox, type OutboxState } from '@/lib/workerOutbox';

/** Live view of the Worker Tools outbox (ELE-1828): what's waiting, what needs a look. */
export function useWorkerOutbox(): OutboxState {
  return useSyncExternalStore(subscribeOutbox, getOutboxState, getOutboxState);
}
