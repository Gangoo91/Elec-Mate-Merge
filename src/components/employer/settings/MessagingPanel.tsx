/**
 * Settings › Customer messaging (ELE-2070): test mode or live, this month's
 * message credits, which channels are on, the sender name, whether crew see
 * their job's messages, and the five templates.
 *
 * The provider, the firm's numbers and the monthly allowance are set by
 * Elec-Mate (they belong to Elec-Mate's provider account), so they show here
 * read-only. Owner and admins change the rest; office managers see it.
 */
import { Fragment, useEffect, useRef, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import {
  FigureStrip,
  KeyValue,
  PanelHead,
  StatusPill,
  panelShellClass,
} from '@/components/employer/pageParts/PageParts';
import {
  LoadingBlocks,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
} from '@/components/employer/editorial';
import {
  TEMPLATE_LABEL,
  useFirmMessaging,
  useSaveMessageTemplate,
  useSaveMessagingSettings,
  type FirmMessaging,
  type TemplateKey,
} from '@/hooks/useCustomerInbox';

// What each placeholder fills in, in the order people reach for them.
const PLACEHOLDERS: { token: string; label: string }[] = [
  { token: '{first_name}', label: 'first name' },
  { token: '{firm_name}', label: 'your firm' },
  { token: '{job_title}', label: 'job' },
  { token: '{job_date}', label: 'job date' },
  { token: '{sender_first_name}', label: 'your first name' },
  { token: '{invoice_number}', label: 'invoice number' },
  { token: '{link}', label: 'link' },
];
const LABEL = Object.fromEntries(PLACEHOLDERS.map((p) => [p.token, p.label]));

/** A template as the customer will read it, with the fill-ins marked. */
function Wording({ body }: { body: string }) {
  return (
    <>
      {body.split(/(\{[a-z_]+\})/g).map((part, i) =>
        LABEL[part] ? (
          <span
            key={i}
            className="mx-0.5 inline-block whitespace-nowrap rounded-md border border-white/[0.14] px-1.5 text-[12.5px] font-medium leading-6 text-white"
          >
            {LABEL[part]}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

function Line({
  title,
  body,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  body: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-4 px-4 py-3.5 sm:px-5">
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold text-white">{title}</p>
        <p className="mt-0.5 text-[13px] leading-snug text-white">{body}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} disabled={disabled} aria-label={title} />
    </div>
  );
}

export function MessagingPanel() {
  const { data: m, isLoading } = useFirmMessaging();
  const save = useSaveMessagingSettings();
  const saveTemplate = useSaveMessageTemplate();
  const [sender, setSender] = useState('');
  const [editing, setEditing] = useState<TemplateKey | null>(null);
  const [draft, setDraft] = useState('');
  const draftRef = useRef<HTMLTextAreaElement>(null);

  // Put a placeholder where the cursor is.
  const insert = (token: string) => {
    const el = draftRef.current;
    const at = el ? el.selectionStart : draft.length;
    const end = el ? el.selectionEnd : draft.length;
    const next = draft.slice(0, at) + token + draft.slice(end);
    setDraft(next.slice(0, 1000));
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(at + token.length, at + token.length);
    });
  };

  useEffect(() => {
    if (m) setSender(m.sender_name ?? '');
  }, [m?.sender_name]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading || !m) {
    return (
      <div className={panelShellClass}>
        <PanelHead title="Customer messaging" />
        <div className="p-4 sm:p-5">
          <LoadingBlocks />
        </div>
      </div>
    );
  }

  const can = m.can_manage;
  const patch = async (p: Parameters<typeof save.mutateAsync>[0]) => {
    try {
      await save.mutateAsync(p);
    } catch (e) {
      toast({
        title: "Couldn't save",
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };
  const pct =
    m.monthly_allowance > 0 ? Math.round((m.used_this_month / m.monthly_allowance) * 100) : 0;
  const senderOk = !sender.trim() || /^(?=.*[A-Za-z])[A-Za-z0-9 ]{3,11}$/.test(sender.trim());

  const saveDraft = async (key: TemplateKey, body: string) => {
    try {
      await saveTemplate.mutateAsync({ key, body });
      setEditing(null);
      toast({ title: body ? 'Template saved' : 'Template reset' });
    } catch (e) {
      toast({
        title: "Couldn't save the template",
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className={panelShellClass}>
        <PanelHead
          title="Customer messaging"
          meta={
            m.live ? <StatusPill tone="green">Live</StatusPill> : <StatusPill>Test mode</StatusPill>
          }
        />
        <p className="px-4 py-3.5 text-[14px] leading-relaxed text-white sm:px-5">
          {m.live
            ? `Texts and WhatsApp go to customers from your firm's number. Replies land in the Customer inbox and ring the office bell.`
            : `Messages are saved in each customer's conversation and counted, but nothing is sent. Elec-Mate switches texting on for your firm.`}
        </p>
        <div className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
          <KeyValue label="Texting number" value={m.sms_number ?? 'Set by Elec-Mate'} />
          <KeyValue label="WhatsApp number" value={m.whatsapp_number ?? 'Set by Elec-Mate'} />
        </div>
        <p className="border-t border-white/[0.07] px-4 py-3 text-[12.5px] leading-relaxed text-white sm:px-5">
          One credit is one text of up to 160 characters (longer texts use more) or one WhatsApp
          message. Email is free. At 80% the owner gets a bell; at 100% texts stop until next month.
        </p>
      </div>

      <FigureStrip
        title="This month"
        figures={[
          {
            label: 'Credits used',
            value: `${m.used_this_month} of ${m.monthly_allowance}`,
            sub:
              pct >= 100
                ? 'Messages stop until next month'
                : pct >= 80
                  ? 'Nearly used up'
                  : `${Math.max(0, m.monthly_allowance - m.used_this_month)} left`,
            tone: pct >= 100 ? 'red' : pct >= 80 ? 'volt' : undefined,
          },
          { label: 'Sent', value: m.sent_this_month },
          { label: 'Replies', value: m.received_this_month },
          { label: 'Opted out', value: m.opt_outs },
        ]}
      />

      <div className={panelShellClass}>
        <PanelHead title="Channels and access" />
        <div className="divide-y divide-white/[0.07]">
          <Line
            title="Texts"
            body="Send and receive texts with customers."
            checked={m.sms_enabled}
            disabled={!can || save.isPending}
            onChange={(v) => patch({ sms_enabled: v })}
          />
          <Line
            title="WhatsApp"
            body="Templates until the customer replies, then free text for 24 hours."
            checked={m.whatsapp_enabled}
            disabled={!can || save.isPending}
            onChange={(v) => patch({ whatsapp_enabled: v })}
          />
          <Line
            title="Email"
            body="Sent from your company name, replies go to your company email."
            checked={m.email_enabled}
            disabled={!can || save.isPending}
            onChange={(v) => patch({ email_enabled: v })}
          />
          <Line
            title="Crew see their job's messages"
            body="The team on a job can read the customer messages about that job. They cannot reply."
            checked={m.crew_can_see_job_messages}
            disabled={!can || save.isPending}
            onChange={(v) => patch({ crew_can_see_job_messages: v })}
          />
          <div className="px-4 py-3.5 sm:px-5">
            <p className="text-[15px] font-semibold text-white">Sender name</p>
            <p className="mt-0.5 text-[13px] leading-snug text-white">
              Shown instead of a number on texts that need no reply. 3 to 11 letters or numbers.
              Leave blank to always use your number.
            </p>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
              <Input
                value={sender}
                onChange={(e) => setSender(e.target.value.slice(0, 11))}
                placeholder="SmithElec"
                disabled={!can}
                className={`${inputClass} sm:max-w-xs`}
              />
              <SecondaryButton
                onClick={() => patch({ sender_name: sender.trim() })}
                disabled={
                  !can || !senderOk || sender.trim() === (m.sender_name ?? '') || save.isPending
                }
              >
                Save name
              </SecondaryButton>
            </div>
            {!senderOk && (
              <p className="mt-1 text-[12.5px] text-red-400">
                Use 3 to 11 letters or numbers, with at least one letter.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className={panelShellClass}>
        <PanelHead title="Templates" />
        <p className="px-4 py-3 text-[13px] leading-relaxed text-white sm:px-5">
          The marked words fill in from the client and job when you pick a template. Review requests
          always end with “Reply STOP to opt out.”
        </p>
        <div className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
          {m.templates.map((t: FirmMessaging['templates'][number]) => (
            <div key={t.key} className="px-4 py-3.5 sm:px-5">
              <div className="flex items-center gap-2">
                <p className="text-[15px] font-semibold text-white">{TEMPLATE_LABEL[t.key]}</p>
                {t.custom && <StatusPill>Yours</StatusPill>}
                {can && editing !== t.key && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(t.key);
                      setDraft(t.body);
                    }}
                    className="ml-auto h-11 px-2 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                  >
                    Edit
                  </button>
                )}
              </div>
              {editing === t.key ? (
                <div className="mt-2 space-y-2">
                  <textarea
                    ref={draftRef}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    rows={3}
                    maxLength={1000}
                    className={textareaClass}
                  />
                  <div className="flex flex-wrap items-center gap-2" aria-label="Fill-ins">
                    <span className="text-[12.5px] text-white">Add</span>
                    {PLACEHOLDERS.map((p) => (
                      <button
                        key={p.token}
                        type="button"
                        onClick={() => insert(p.token)}
                        className="h-11 rounded-full border border-white/[0.14] px-3 text-[12.5px] font-medium text-white touch-manipulation hover:bg-white/[0.06]"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <PrimaryButton
                      onClick={() => saveDraft(t.key, draft)}
                      disabled={!draft.trim() || saveTemplate.isPending}
                    >
                      Save
                    </PrimaryButton>
                    {t.custom && (
                      <SecondaryButton
                        onClick={() => saveDraft(t.key, '')}
                        disabled={saveTemplate.isPending}
                      >
                        Use the standard wording
                      </SecondaryButton>
                    )}
                    <SecondaryButton onClick={() => setEditing(null)}>Cancel</SecondaryButton>
                  </div>
                </div>
              ) : (
                <p className="mt-1 text-[13.5px] leading-7 text-white">
                  <Wording body={t.body} />
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MessagingPanel;
