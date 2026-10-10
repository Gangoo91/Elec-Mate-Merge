import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  panel,
  PanelTitle,
  PlainEmpty,
  Row,
  RowList,
  StatusPill,
  type PillTone,
} from '@/components/employer/pageParts/PageParts';
import { usePersonContracts, type PersonContract } from '@/hooks/usePersonContracts';
import {
  SendContractSheet,
  type ContractPerson,
} from '@/components/employer/contracts/SendContractSheet';

/* ==========================================================================
   PersonContractsCard — ELE-1982. The contract status on a person's record.

   Reads person_contracts (status only, never the document or the pay), so an
   office manager sees "Waiting for Sam to sign" too. Sending and opening the
   contract are owner/admin only, because a contract carries pay.
   ========================================================================== */

const d = (iso?: string | null) => (iso ? format(parseISO(iso), 'd MMM yyyy') : '');

function statusLine(
  c: PersonContract,
  first: string
): { text: string; pill: string; tone: PillTone } {
  if (c.sign_status === 'Signed') {
    return c.employer_signed_at
      ? { text: `Signed by both · ${d(c.signed_at)}`, pill: 'Signed', tone: 'green' }
      : {
          text: `${first} signed ${d(c.signed_at)}. Countersign it`,
          pill: 'Countersign',
          tone: 'volt',
        };
  }
  if (c.sign_status === 'Declined')
    return { text: `${first} declined it`, pill: 'Declined', tone: 'red' };
  if (c.sign_status === 'Expired')
    return { text: 'Link expired. Send it again', pill: 'Expired', tone: 'red' };
  if (c.sign_status === 'Viewed')
    return { text: `${first} has opened it, not signed yet`, pill: 'Opened', tone: 'neutral' };
  if (c.sign_status)
    return {
      text: `Waiting for ${first} to sign · sent ${d(c.sent_at)}`,
      pill: 'Waiting',
      tone: 'neutral',
    };
  return { text: 'On file, not sent for signing', pill: 'Not sent', tone: 'neutral' };
}

export function PersonContractsCard({
  person,
  canSeeMoney,
  onNavigateAway,
}: {
  person: ContractPerson;
  canSeeMoney: boolean;
  /** Close the person sheet before leaving for the Contracts page. */
  onNavigateAway?: () => void;
}) {
  const navigate = useNavigate();
  const { data: contracts = [], isLoading } = usePersonContracts(person.id);
  const [sendOpen, setSendOpen] = useState(false);
  const first = person.name.split(' ')[0] || 'They';

  return (
    <section>
      <PanelTitle
        title="Contract"
        action={canSeeMoney ? 'Send contract' : undefined}
        onAction={canSeeMoney ? () => setSendOpen(true) : undefined}
      />

      {isLoading ? (
        <div className={cn(panel, 'h-[60px] animate-pulse')} />
      ) : contracts.length === 0 ? (
        <PlainEmpty
          text={
            canSeeMoney
              ? `No contract on file. Send ${first} an employment or subcontractor contract. They sign on their phone and keep a copy.`
              : 'No contract on file. The owner or an admin sends contracts, because they carry pay. The status will show here.'
          }
        />
      ) : (
        <RowList>
          {contracts.map((c) => {
            const s = statusLine(c, first);
            return (
              <Row
                key={c.id}
                title={c.title}
                detail={s.text}
                trailing={<StatusPill tone={s.tone}>{s.pill}</StatusPill>}
                onClick={
                  canSeeMoney
                    ? () => {
                        onNavigateAway?.();
                        navigate(`/employer?section=contracts&contract=${c.id}`);
                      }
                    : undefined
                }
              />
            );
          })}
        </RowList>
      )}

      {canSeeMoney && (
        <SendContractSheet open={sendOpen} onOpenChange={setSendOpen} person={person} />
      )}
    </section>
  );
}
