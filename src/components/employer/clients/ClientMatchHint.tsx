/**
 * ELE-2065 §3A #14: "This looks like an existing client".
 *
 * Shown under a client name, email or phone wherever one is typed (new
 * invoice, new job, add client). It asks the server for the firm's clients
 * that look the same (same email, same phone, same name once tidied, or a
 * close spelling) and lets the person pick one or keep this as a new client.
 * Nothing is merged: picking one only links the new record to that client.
 */
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { rowBtnSecondary } from '@/components/employer/pageParts/PageParts';
import {
  findClientMatches,
  type ClientMatch,
  type ClientMatchReason,
} from '@/services/employerClientService';

const REASON: Record<ClientMatchReason, string> = {
  email: 'Same email',
  phone: 'Same phone number',
  name: 'Same name',
  similar: 'Similar name',
};

function useDebounced<T>(value: T, ms: number): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = window.setTimeout(() => setV(value), ms);
    return () => window.clearTimeout(t);
  }, [value, ms]);
  return v;
}

/** The firm's clients that look like the one being typed (debounced). */
export function useClientMatches(
  input: { name?: string; email?: string; phone?: string },
  enabled = true
) {
  const name = useDebounced((input.name ?? '').trim(), 450);
  const email = useDebounced((input.email ?? '').trim(), 450);
  const phone = useDebounced((input.phone ?? '').trim(), 450);
  const worth =
    enabled &&
    (name.length >= 3 ||
      /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ||
      phone.replace(/\D/g, '').length >= 10);
  return useQuery({
    queryKey: ['client-matches', name.toLowerCase(), email.toLowerCase(), phone],
    enabled: worth,
    staleTime: 30_000,
    queryFn: () => findClientMatches({ name, email, phone }),
  });
}

function detailOf(m: ClientMatch) {
  return [m.company_name, m.email, m.phone].filter(Boolean).join(' · ') || 'No contact details yet';
}

export function ClientMatchHint({
  name,
  email,
  phone,
  pickedId,
  onPick,
  useLabel = 'Use this client',
  intro = 'Use their record so their quotes, jobs and invoices stay together.',
  className,
}: {
  name: string;
  email?: string;
  phone?: string;
  /** The existing client this record is linked to, once picked. */
  pickedId: string | null;
  /** A match picked (fill in what's blank), 'new' for "it's a new client",
   *  or null to undo either. */
  onPick: (choice: ClientMatch | 'new' | null) => void;
  /** The pick button's label (Add client says "Open their record"). */
  useLabel?: string;
  intro?: string;
  className?: string;
}) {
  const [keptNew, setKeptNew] = useState(false);
  const { data: matches = [] } = useClientMatches({ name, email, phone }, !pickedId);
  const [picked, setPicked] = useState<ClientMatch | null>(null);

  // Typing a different name or contact asks again.
  useEffect(() => {
    setKeptNew(false);
  }, [name, email, phone]);
  useEffect(() => {
    if (!pickedId) setPicked(null);
  }, [pickedId]);

  if (pickedId && picked) {
    return (
      <div
        className={cn(
          'flex items-center gap-3 rounded-xl border border-white/[0.12] bg-white/[0.04] px-3.5 py-3',
          className
        )}
      >
        <Check className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
        <p className="min-w-0 flex-1 text-[13px] leading-snug text-white">
          Linked to {picked.name}, already on your client list.
        </p>
        <button
          type="button"
          onClick={() => onPick(null)}
          className="h-11 shrink-0 rounded-xl px-3 text-[13px] font-semibold text-white underline-offset-4 hover:underline touch-manipulation"
        >
          Change
        </button>
      </div>
    );
  }

  if (keptNew || matches.length === 0) return null;
  const strong = matches.filter((m) => m.reason !== 'similar');
  const shown = (strong.length ? strong : matches).slice(0, 3);

  return (
    <div
      role="group"
      aria-label="This looks like an existing client"
      className={cn(
        'rounded-xl border border-white/[0.14] bg-white/[0.04] p-3.5 sm:p-4',
        className
      )}
    >
      <p className="text-[14px] font-semibold text-white">This looks like an existing client</p>
      <p className="mt-0.5 text-[13px] leading-snug text-white">{intro}</p>
      <div className="mt-3 divide-y divide-white/[0.08]">
        {shown.map((m) => (
          <div
            key={m.id}
            className="flex flex-col gap-2.5 py-2.5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:gap-3"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold text-white">{m.name}</p>
              <p className="truncate text-[13px] text-white">
                {REASON[m.reason]} · {detailOf(m)}
              </p>
            </div>
            <button
              type="button"
              className={cn(rowBtnSecondary, 'w-full sm:w-auto')}
              onClick={() => {
                setPicked(m);
                onPick(m);
              }}
            >
              {useLabel}
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className={cn(rowBtnSecondary, 'mt-3 w-full sm:w-auto')}
        onClick={() => {
          setKeptNew(true);
          onPick('new');
        }}
      >
        No, it's a new client
      </button>
    </div>
  );
}
