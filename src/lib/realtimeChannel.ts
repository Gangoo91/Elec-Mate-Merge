/**
 * realtimeChannelName
 *
 * Returns a process-unique name for a Supabase `postgres_changes` realtime
 * channel.
 *
 * Why: a FIXED channel name lets the Supabase client hand back a channel that
 * is already subscribed when the same hook mounts in two places at once, or
 * remounts during navigation / Vite HMR. Calling `.on('postgres_changes', …)`
 * on an already-subscribed channel throws:
 *
 *   "cannot add `postgres_changes` callbacks for realtime:<name> after `subscribe()`."
 *
 * For a `postgres_changes` subscription the channel name is only a local
 * identifier — the rows you receive are decided by the filter, not the name —
 * so a unique suffix is always safe and never changes what is streamed.
 *
 * IMPORTANT: do NOT use this for `presence` or `broadcast` channels. Those rely
 * on a SHARED name so multiple clients join the same room; a unique name would
 * break them.
 */
let channelSeq = 0;

export function realtimeChannelName(base: string): string {
  channelSeq += 1;
  return `${base}-rt${channelSeq}`;
}
