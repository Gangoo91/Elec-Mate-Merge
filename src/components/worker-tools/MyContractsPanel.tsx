import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { FileSignature } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Eyebrow, Pill } from '@/components/employer/editorial';
import { useMyContracts, type MyContract } from '@/hooks/usePersonContracts';

/* ==========================================================================
   MyContractsPanel — ELE-1982, the worker's side.

   Contracts the firm sent this person (employment or subcontractor). "Read
   and sign" opens the signing page for that contract (the same evidence
   trail as every signature: name, time, device, the exact version signed).
   Once signed, "Your signed copy" opens it again with a Download button, so
   they always keep a copy. Renders nothing when there are none.
   ========================================================================== */

const d = (iso?: string | null) => (iso ? format(parseISO(iso), 'd MMM yyyy') : '');

function state(c: MyContract): {
  text: string;
  tone: 'amber' | 'emerald' | 'red' | 'blue';
  open: boolean;
} {
  switch (c.status) {
    case 'Signed':
      return {
        text: c.employer_signed ? `Signed by you and ${c.firm}` : `You signed on ${d(c.signed_at)}`,
        tone: 'emerald',
        open: true,
      };
    case 'Declined':
      return { text: 'You declined this one', tone: 'red', open: false };
    case 'Expired':
      return {
        text: 'The link has expired. Ask the office to send it again.',
        tone: 'red',
        open: false,
      };
    default:
      return {
        text: `Sent ${d(c.sent_at)}${c.expires_at ? ` · sign by ${d(c.expires_at)}` : ''}`,
        tone: 'amber',
        open: true,
      };
  }
}

export function MyContractsPanel({ className }: { className?: string }) {
  const navigate = useNavigate();
  const { data: contracts = [] } = useMyContracts();
  if (contracts.length === 0) return null;

  const toSign = contracts.filter(
    (c) => !['Signed', 'Declined', 'Expired'].includes(c.status)
  ).length;

  return (
    <section className={cn('space-y-3', className)} aria-label="Your contracts">
      <div className="flex items-center gap-2">
        <Eyebrow className={toSign > 0 ? 'text-amber-400' : undefined}>
          {toSign > 0 ? 'Contract to sign' : 'Your contracts'}
        </Eyebrow>
        {toSign > 0 && <Pill tone="amber">{toSign}</Pill>}
      </div>
      <div
        className={cn(
          'grid grid-cols-1 gap-3',
          contracts.length > 1 && 'sm:grid-cols-2 xl:grid-cols-3'
        )}
      >
        {contracts.map((c) => {
          const s = state(c);
          const isSigned = c.status === 'Signed';
          // A single contract on a wide screen reads as one row, button right
          const wide = contracts.length === 1;
          return (
            <div
              key={c.contract_id}
              className={cn(
                'rounded-2xl border bg-white/[0.04] p-4',
                wide && 'sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-5',
                s.tone === 'amber' ? 'border-amber-500/40' : 'border-white/[0.08]'
              )}
            >
              <div className="flex items-start gap-3">
                <FileSignature className="mt-0.5 h-5 w-5 shrink-0 text-elec-yellow" aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                    {c.firm}
                  </p>
                  <p className="mt-1 text-[15px] font-semibold leading-snug text-white">
                    {c.title}
                  </p>
                  <p className="mt-1 text-[12.5px] text-white">{s.text}</p>
                  {c.start_date && (
                    <p className="text-[12.5px] text-white">Starts {d(c.start_date)}</p>
                  )}
                </div>
              </div>
              {s.open && c.token && (
                <button
                  type="button"
                  onClick={() => navigate(`/sign/${c.token}`)}
                  className={cn(
                    wide && 'sm:mt-0 sm:w-auto sm:min-w-[180px] sm:shrink-0',
                    'mt-4 inline-flex h-11 w-full items-center justify-center rounded-full px-4 text-[13.5px] font-semibold touch-manipulation active:scale-[0.98]',
                    isSigned
                      ? 'border border-white/[0.14] bg-white/[0.06] text-white'
                      : 'bg-elec-yellow text-black'
                  )}
                >
                  {isSigned ? 'Your signed copy' : 'Read and sign'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
