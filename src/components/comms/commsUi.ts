/** Shared Team comms helpers (ELE-1959) — kept out of component files for fast refresh. */
import { format, isThisWeek, isToday, isYesterday, parseISO } from 'date-fns';
import { AlertTriangle, Megaphone, MessageSquare } from 'lucide-react';
import type { CommsRecipient, CommsType } from '@/services/teamCommsService';

export const typeMeta: Record<CommsType, { label: string; Icon: typeof Megaphone; chip: string }> = {
  announcement: {
    label: 'Announcement',
    Icon: Megaphone,
    chip: 'bg-purple-500/15 border-purple-400/30 text-white',
  },
  message: {
    label: 'Job message',
    Icon: MessageSquare,
    chip: 'bg-blue-500/15 border-blue-400/30 text-white',
  },
  alert: {
    label: 'Safety alert',
    Icon: AlertTriangle,
    chip: 'bg-red-500/15 border-red-400/40 text-white',
  },
};

export const listTime = (iso: string) => {
  const d = parseISO(iso);
  if (isToday(d)) return format(d, 'HH:mm');
  if (isYesterday(d)) return 'Yesterday';
  if (isThisWeek(d, { weekStartsOn: 1 })) return format(d, 'EEE');
  return format(d, 'd MMM');
};

export function chaseTargets(people: CommsRecipient[], requiresAck: boolean) {
  return people.filter(
    (p) =>
      (p.status ?? '').toLowerCase() === 'active' &&
      p.has_app &&
      (requiresAck ? !p.acknowledged_at : !p.read_at)
  );
}

export function chaseLockedUntil(lastChasedAt: string | null): Date | null {
  if (!lastChasedAt) return null;
  const until = new Date(parseISO(lastChasedAt).getTime() + 60 * 60 * 1000);
  return until > new Date() ? until : null;
}
