import { useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  fieldFullCn,
  grid2Cn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { CollegeSectionTitle, chipCn } from '@/components/college/ui/CollegeUi';
import { StatusPill, type Tone } from '@/components/college/quality/QualityKit';
import { QBTN, QLIST } from '@/components/college/quality/QualityHubKit';
import { plural } from '@/components/college/quality/qualityText';
import { useToast } from '@/hooks/use-toast';
import {
  CP_METHOD_LABEL,
  RECEIPT_HOW_LABEL,
  recordCpFileReceipt,
  recordCpFileSent,
  type CpIncoming,
  type CpMethod,
  type CpOutgoing,
  type CpTransfer,
  type ReceiptHow,
} from '@/hooks/useSafeguardingRecords';

/* ==========================================================================
   CpFileTransfersSection (ELE-2043): learners who have left with a
   safeguarding record, and their child protection file. KCSIE 2026 para 150:
   the lead transfers the file to the new school or college as soon as
   possible and within 5 days for an in-year transfer, ensures secure transit,
   and obtains confirmation of receipt. When the new college is on Elec-Mate
   its lead confirms receipt here; otherwise the sending lead records the
   confirmation they were given.
   ========================================================================== */

const fmt = (iso: string | null | undefined) =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'date not recorded';

const nowLocal = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};

function stateOf(o: CpOutgoing): { label: string; tone: Tone } {
  if (!o.transfer)
    return o.overdue
      ? { label: 'File not sent: overdue', tone: 'bad' }
      : { label: 'File to send', tone: 'warn' };
  if (!o.transfer.receipt_at) return { label: 'Sent, receipt not confirmed', tone: 'warn' };
  return { label: 'Receipt confirmed', tone: 'good' };
}

export function CpFileTransfersSection({
  outgoing,
  incoming,
  onChanged,
}: {
  outgoing: CpOutgoing[];
  incoming: CpIncoming[];
  onChanged: () => void;
}) {
  // The sheets stay mounted while they animate closed: unmounting an open
  // Radix dialog leaves pointer-events: none on the body.
  const [sending, setSending] = useState<CpOutgoing | null>(null);
  const [sendOpen, setSendOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [receipt, setReceipt] = useState<{ t: CpTransfer; name: string; incoming: boolean } | null>(
    null
  );

  const toSend = outgoing.filter((o) => !o.transfer).length;
  const awaiting =
    outgoing.filter((o) => o.transfer && !o.transfer.receipt_at).length +
    incoming.filter((i) => !i.transfer.receipt_at).length;
  const sub =
    outgoing.length + incoming.length === 0
      ? 'Nobody with a safeguarding record has left'
      : [toSend > 0 ? `${toSend} to send` : '', awaiting > 0 ? `${awaiting} awaiting receipt` : '']
          .filter(Boolean)
          .join(' · ') || 'All sent and confirmed';

  return (
    <section className="space-y-4" data-testid="cp-transfers">
      <CollegeSectionTitle title="Child protection files" sub={sub} />
      {outgoing.length + incoming.length === 0 ? (
        <div className={QLIST}>
          <p className="px-4 py-4 text-[13px] leading-relaxed text-white sm:px-5">
            When a learner with a safeguarding record leaves, they appear here so their file goes to
            the new school or college within 5 days, with the receipt recorded.
          </p>
        </div>
      ) : (
        <div className={QLIST}>
          {outgoing.map((o) => {
            const st = stateOf(o);
            return (
              <div
                key={o.student_id}
                data-testid={`cp-row-${o.student_id}`}
                className="flex flex-col gap-2 px-4 py-3.5 sm:flex-row sm:items-center sm:gap-4 sm:px-5"
              >
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-2">
                    <span className="truncate text-[14.5px] font-semibold text-white">
                      {o.student_name}
                    </span>
                    <StatusPill tone={st.tone}>{st.label}</StatusPill>
                  </p>
                  <p className="mt-0.5 text-[12.5px] leading-snug text-white">
                    {o.status} {fmt(o.left_on)} · {plural(o.concerns, 'concern')}
                    {!o.transfer && o.due_by ? ` · send by ${fmt(o.due_by)}` : ''}
                  </p>
                  {o.transfer && (
                    <p className="mt-0.5 text-[12.5px] leading-snug text-white">
                      Sent to {o.transfer.to_provider_name} by{' '}
                      {CP_METHOD_LABEL[o.transfer.method].toLowerCase()} on{' '}
                      {fmt(o.transfer.sent_at)}
                      {o.transfer.receipt_at
                        ? ` · received ${fmt(o.transfer.receipt_at)} by ${o.transfer.receipt_by_name}${o.transfer.receipt_by_role ? `, ${o.transfer.receipt_by_role}` : ''} (${RECEIPT_HOW_LABEL[o.transfer.receipt_how ?? 'email_confirmation'].toLowerCase()})`
                        : ''}
                    </p>
                  )}
                </div>
                {!o.transfer ? (
                  <button
                    type="button"
                    className={QBTN}
                    onClick={() => {
                      setSending(o);
                      setSendOpen(true);
                    }}
                  >
                    Record file sent
                  </button>
                ) : !o.transfer.receipt_at ? (
                  <button
                    type="button"
                    className={QBTN}
                    onClick={() => {
                      setReceipt({ t: o.transfer!, name: o.student_name, incoming: false });
                      setReceiptOpen(true);
                    }}
                  >
                    Record receipt
                  </button>
                ) : null}
              </div>
            );
          })}
          {incoming.map((i) => (
            <div
              key={i.transfer.id}
              className="flex flex-col gap-2 px-4 py-3.5 sm:flex-row sm:items-center sm:gap-4 sm:px-5"
            >
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-2">
                  <span className="truncate text-[14.5px] font-semibold text-white">
                    {i.student_name}
                  </span>
                  <StatusPill tone={i.transfer.receipt_at ? 'good' : 'warn'}>
                    {i.transfer.receipt_at ? 'Receipt confirmed' : 'Incoming: confirm receipt'}
                  </StatusPill>
                </p>
                <p className="mt-0.5 text-[12.5px] leading-snug text-white">
                  From {i.from_college ?? 'another college'} · sent {fmt(i.transfer.sent_at)} by{' '}
                  {CP_METHOD_LABEL[i.transfer.method].toLowerCase()}
                </p>
              </div>
              {!i.transfer.receipt_at && (
                <button
                  type="button"
                  className={QBTN}
                  onClick={() => {
                    setReceipt({ t: i.transfer, name: i.student_name, incoming: true });
                    setReceiptOpen(true);
                  }}
                >
                  Confirm received
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {sending && (
        <SentSheet
          key={sending.student_id}
          o={sending}
          open={sendOpen}
          onClose={() => setSendOpen(false)}
          onSaved={onChanged}
        />
      )}
      {receipt && (
        <ReceiptSheet
          key={receipt.t.id}
          open={receiptOpen}
          t={receipt.t}
          name={receipt.name}
          incoming={receipt.incoming}
          onClose={() => setReceiptOpen(false)}
          onSaved={onChanged}
        />
      )}
    </section>
  );
}

function SentSheet({
  o,
  open,
  onClose,
  onSaved,
}: {
  o: CpOutgoing;
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const { toast } = useToast();
  const [to, setTo] = useState(o.suggested_provider ?? '');
  const [dsl, setDsl] = useState('');
  const [contact, setContact] = useState('');
  const [method, setMethod] = useState<CpMethod | null>(null);
  const [sentAt, setSentAt] = useState(nowLocal());
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const valid = to.trim().length >= 2 && !!method && !!sentAt;
  const onElecMate = !!o.suggested_college_id && to.trim() === (o.suggested_provider ?? '').trim();

  const save = async () => {
    if (!valid || !method) return;
    setSaving(true);
    const r = await recordCpFileSent({
      studentId: o.student_id,
      toProvider: to.trim(),
      method,
      sentAt: new Date(sentAt).toISOString(),
      toDslName: dsl,
      toDslContact: contact,
      toCollegeId: onElecMate ? o.suggested_college_id : null,
      notes,
    });
    setSaving(false);
    if (r.error) {
      toast({ title: 'Not saved', description: r.error, variant: 'destructive' });
      return;
    }
    toast({
      title: 'File transfer recorded',
      description: 'Now record the receipt when it is confirmed.',
    });
    onSaved();
    onClose();
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={(v) => !v && onClose()}
      width="wide"
      eyebrow={`Child protection file · ${o.student_name}`}
      title="Record the file sent"
      description={`Send it securely to the new school, college or provider${o.due_by ? `, by ${fmt(o.due_by)}` : ''}, then record the confirmation of receipt.`}
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={onClose} className={buttonSecondaryCn}>
            Cancel
          </button>
          <button
            type="button"
            onClick={() => void save()}
            disabled={!valid || saving}
            className={buttonPrimaryCn}
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        <div className={grid2Cn}>
          <div className={fieldFullCn}>
            <label htmlFor="cp-to" className={labelCn}>
              Sent to (school, college or provider)
            </label>
            <input
              id="cp-to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className={inputCn}
            />
            {onElecMate && (
              <p className="mt-1 text-[12px] text-white">
                On Elec-Mate: their safeguarding lead can confirm receipt in the app.
              </p>
            )}
          </div>
          <div>
            <label htmlFor="cp-dsl" className={labelCn}>
              Their safeguarding lead
            </label>
            <input
              id="cp-dsl"
              value={dsl}
              onChange={(e) => setDsl(e.target.value)}
              className={inputCn}
            />
          </div>
          <div>
            <label htmlFor="cp-contact" className={labelCn}>
              Contact
            </label>
            <input
              id="cp-contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className={inputCn}
              placeholder="Email or phone"
            />
          </div>
          <div className={fieldFullCn}>
            <label htmlFor="cp-sent" className={labelCn}>
              Sent on
            </label>
            <input
              id="cp-sent"
              type="datetime-local"
              value={sentAt}
              max={nowLocal()}
              onChange={(e) => setSentAt(e.target.value)}
              className={inputCn}
            />
          </div>
        </div>
        <div>
          <p className={labelCn}>How it was sent securely</p>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Method">
            {(Object.keys(CP_METHOD_LABEL) as CpMethod[]).map((k) => (
              <button
                key={k}
                type="button"
                role="radio"
                aria-checked={method === k}
                onClick={() => setMethod(k)}
                className={chipCn(method === k)}
              >
                {CP_METHOD_LABEL[k]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="cp-notes" className={labelCn}>
            Notes (optional)
          </label>
          <textarea
            id="cp-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className={textareaCn}
          />
        </div>
      </div>
    </FormSheet>
  );
}

function ReceiptSheet({
  open,
  t,
  name,
  incoming,
  onClose,
  onSaved,
}: {
  open: boolean;
  t: CpTransfer;
  name: string;
  incoming: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const { toast } = useToast();
  const [by, setBy] = useState(incoming ? '' : (t.to_dsl_name ?? ''));
  const [role, setRole] = useState(incoming ? 'Designated safeguarding lead' : '');
  const [how, setHow] = useState<ReceiptHow>(incoming ? 'in_app' : 'email_confirmation');
  const [at, setAt] = useState(nowLocal());
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const valid = by.trim().length >= 2 && !!at;

  const save = async () => {
    if (!valid) return;
    setSaving(true);
    const r = await recordCpFileReceipt({
      transferId: t.id,
      byName: by.trim(),
      byRole: role,
      how,
      receivedAt: new Date(at).toISOString(),
      note,
    });
    setSaving(false);
    if (r.error) {
      toast({ title: 'Not saved', description: r.error, variant: 'destructive' });
      return;
    }
    toast({ title: 'Receipt recorded', description: 'Kept with your name and the date.' });
    onSaved();
    onClose();
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={(v) => !v && onClose()}
      width="wide"
      eyebrow={`Child protection file · ${name}`}
      title={incoming ? 'Confirm you received the file' : 'Record the confirmation of receipt'}
      description={
        incoming
          ? 'Confirms to the sending college that the file arrived.'
          : `Sent to ${t.to_provider_name} on ${fmt(t.sent_at)}. Record who confirmed they received it, and how.`
      }
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={onClose} className={buttonSecondaryCn}>
            Cancel
          </button>
          <button
            type="button"
            onClick={() => void save()}
            disabled={!valid || saving}
            className={buttonPrimaryCn}
          >
            {saving ? 'Saving…' : 'Save receipt'}
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        <div className={grid2Cn}>
          <div>
            <label htmlFor="cp-r-by" className={labelCn}>
              {incoming ? 'Received by' : 'Confirmed by'}
            </label>
            <input
              id="cp-r-by"
              value={by}
              onChange={(e) => setBy(e.target.value)}
              className={inputCn}
            />
          </div>
          <div>
            <label htmlFor="cp-r-role" className={labelCn}>
              Role
            </label>
            <input
              id="cp-r-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={inputCn}
            />
          </div>
          <div className={fieldFullCn}>
            <label htmlFor="cp-r-at" className={labelCn}>
              Received on
            </label>
            <input
              id="cp-r-at"
              type="datetime-local"
              value={at}
              max={nowLocal()}
              onChange={(e) => setAt(e.target.value)}
              className={inputCn}
            />
          </div>
        </div>
        {!incoming && (
          <div>
            <p className={labelCn}>How receipt was confirmed</p>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="How confirmed">
              {(['email_confirmation', 'signed_slip', 'portal_confirmation'] as ReceiptHow[]).map(
                (k) => (
                  <button
                    key={k}
                    type="button"
                    role="radio"
                    aria-checked={how === k}
                    onClick={() => setHow(k)}
                    className={chipCn(how === k)}
                  >
                    {RECEIPT_HOW_LABEL[k]}
                  </button>
                )
              )}
            </div>
          </div>
        )}
        <div>
          <label htmlFor="cp-r-note" className={labelCn}>
            Note (optional)
          </label>
          <textarea
            id="cp-r-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className={textareaCn}
          />
        </div>
      </div>
    </FormSheet>
  );
}
