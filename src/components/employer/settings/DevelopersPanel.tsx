/**
 * Settings › Integrations and API (ELE-2077).
 *
 *  - Accounting packages: Xero, QuickBooks, Sage and FreeAgent connect in
 *    Finance › Accounting (one connection, shared with the Electrical Hub).
 *  - API keys: owner only, read-only, scoped per resource, revocable. The key
 *    is shown once.
 *  - Webhooks: an https address per set of events, signed with a secret shown
 *    once.
 *  - The API guide, in a sheet.
 */
import { useState, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { format, formatDistanceToNowStrict, parseISO } from 'date-fns';
import { ChevronRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { FormSheet } from '@/components/forms/FormSheet';
import { chipBase, chipOff, chipOn } from '@/components/forms/fieldStyles';
import { copyToClipboard } from '@/utils/clipboard';
import {
  PanelHead,
  Row,
  StatusPill,
  panelShellClass,
} from '@/components/employer/pageParts/PageParts';
import {
  LoadingBlocks,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  inputClass,
} from '@/components/employer/editorial';
import {
  API_BASE,
  API_SCOPES,
  EVENT_LABEL,
  SCOPE_LABEL,
  WEBHOOK_EVENTS,
  useApiKeys,
  useMintApiKey,
  useRevokeApiKey,
  useSaveWebhook,
  useWebhookAction,
  useWebhooks,
  type ApiScope,
  type WebhookEvent,
  type WebhookRow,
} from '@/hooks/useFirmDevelopers';
import { firmApiDocs } from '@/components/employer/settings/firmApiDocs';

const ago = (d: string | null) =>
  d ? formatDistanceToNowStrict(parseISO(d), { addSuffix: true }) : 'Never';

function Chips<T extends string>({
  all,
  label,
  value,
  onChange,
}: {
  all: readonly T[];
  label: (v: T) => string;
  value: T[];
  onChange: (v: T[]) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {all.map((v) => {
        const on = value.includes(v);
        return (
          <button
            key={v}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(on ? value.filter((x) => x !== v) : [...value, v])}
            className={cn(
              chipBase,
              'h-11 rounded-full px-4 touch-manipulation',
              on ? chipOn : chipOff
            )}
          >
            {label(v)}
          </button>
        );
      })}
    </div>
  );
}

/** A settings row whose detail wraps in full (no clamped text). */
function InfoRow({
  title,
  detail,
  meta,
  trailing,
  onClick,
  breakTitle,
}: {
  title: string;
  detail: string;
  meta?: string;
  trailing?: ReactNode;
  onClick?: () => void;
  /** Addresses: break anywhere rather than run off the edge. */
  breakTitle?: boolean;
}) {
  const body = (
    <>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'text-[15px] font-semibold leading-snug text-white',
            breakTitle && 'break-all'
          )}
        >
          {title}
        </p>
        <p className="mt-0.5 text-[13px] leading-relaxed text-white [overflow-wrap:anywhere]">
          {detail}
        </p>
        {meta && <p className="mt-0.5 text-[12.5px] font-medium text-white">{meta}</p>}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
      {onClick && <ChevronRight aria-hidden className="h-4 w-4 shrink-0 text-white" />}
    </>
  );
  const cls = 'flex w-full min-h-[60px] items-center gap-3 px-4 py-3.5 text-left sm:px-5';
  return onClick ? (
    <button
      type="button"
      onClick={onClick}
      className={cn(cls, 'touch-manipulation transition-colors hover:bg-white/[0.04]')}
    >
      {body}
    </button>
  ) : (
    <div className={cls}>{body}</div>
  );
}

function SecretBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2 rounded-xl border border-white/[0.14] p-3">
      <p className="text-[13px] font-semibold text-white">{label}</p>
      <code className="block break-all rounded-lg bg-black/40 p-2.5 font-mono text-[12.5px] text-white">
        {value}
      </code>
      <SecondaryButton
        onClick={async () => {
          await copyToClipboard(value);
          toast({ title: 'Copied' });
        }}
      >
        Copy
      </SecondaryButton>
      <p className="text-[12.5px] text-white">
        Store it somewhere safe now. It will not be shown again.
      </p>
    </div>
  );
}

export function DevelopersPanel({
  isOwner,
  onOpenAccounting,
}: {
  isOwner: boolean;
  onOpenAccounting?: () => void;
}) {
  const [, setSearchParams] = useSearchParams();
  const openAccounting = onOpenAccounting ?? (() => setSearchParams({ section: 'accounting' }));
  const keys = useApiKeys(isOwner);
  const hooks = useWebhooks(isOwner);
  const mint = useMintApiKey();
  const revoke = useRevokeApiKey();
  const saveHook = useSaveWebhook();
  const hookAction = useWebhookAction();

  const [keyOpen, setKeyOpen] = useState(false);
  const [keyLabel, setKeyLabel] = useState('');
  const [keyScopes, setKeyScopes] = useState<ApiScope[]>(['jobs', 'customers']);
  const [keyRate, setKeyRate] = useState(60);
  const [newKey, setNewKey] = useState<string | null>(null);

  const [hookOpen, setHookOpen] = useState(false);
  const [hookUrl, setHookUrl] = useState('');
  const [hookEvents, setHookEvents] = useState<WebhookEvent[]>(['job.completed', 'invoice.paid']);
  const [hookNote, setHookNote] = useState('');
  const [newSecret, setNewSecret] = useState<string | null>(null);
  const [detail, setDetail] = useState<WebhookRow | null>(null);
  const [docsOpen, setDocsOpen] = useState(false);
  const [confirm, setConfirm] = useState<{
    kind: 'revoke' | 'delete';
    id: string;
    label: string;
  } | null>(null);

  const fail = (title: string) => (e: unknown) =>
    toast({
      title,
      description: e instanceof Error ? e.message : 'Please try again.',
      variant: 'destructive',
    });

  const live = (keys.data ?? []).filter((k) => !k.revoked_at);

  return (
    <div className="space-y-6">
      <div className={panelShellClass}>
        <PanelHead title="Connected apps" />
        <div className="divide-y divide-white/[0.07]">
          <InfoRow
            title="Accounting"
            detail="Xero, QuickBooks, Sage and FreeAgent. Invoices, payments and contacts sync, and payroll leaves as a file. Connect in Finance."
            onClick={openAccounting}
          />
          <InfoRow
            title="Zapier and Make"
            detail="Connect other apps today with an API key or a webhook below. The ready-made Zapier app is on its way."
            trailing={<StatusPill>Coming soon</StatusPill>}
          />
          <InfoRow
            title="Making Tax Digital for Income Tax"
            detail="Elec-Mate does not file with HMRC. Send your quarterly updates from your accounting package, and check it is on HMRC's list of software for Making Tax Digital for Income Tax."
          />
        </div>
      </div>

      <div className={panelShellClass}>
        <PanelHead
          title="API keys"
          meta={isOwner && live.length ? <StatusPill>{live.length} live</StatusPill> : undefined}
          action="API guide"
          onAction={() => setDocsOpen(true)}
        />
        {!isOwner ? (
          <p className="px-4 py-4 text-[14px] text-white sm:px-5">
            Only the owner can create API keys and webhooks, because a key can read the whole firm.
            Anyone can read the API guide.
          </p>
        ) : keys.isLoading ? (
          <div className="p-4 sm:p-5">
            <LoadingBlocks />
          </div>
        ) : (
          <>
            {(keys.data ?? []).length === 0 ? (
              <p className="px-4 py-4 text-[14px] leading-relaxed text-white sm:px-5">
                No keys yet. A key lets your own software read your jobs, customers, quotes,
                invoices, timesheets and certificates.
              </p>
            ) : (
              <div className="divide-y divide-white/[0.07]">
                {(keys.data ?? []).map((k) => (
                  <Row
                    key={k.id}
                    title={k.label}
                    detail={`${k.key_prefix}… · ${k.scopes.map((s) => SCOPE_LABEL[s]).join(', ')}`}
                    meta={
                      k.revoked_at
                        ? `Revoked ${format(parseISO(k.revoked_at), 'd MMM yyyy')}`
                        : `Last used ${ago(k.last_used_at)} · ${k.calls_24h} calls in 24 hours · ${k.rate_limit_per_minute} a minute`
                    }
                    trailing={
                      k.revoked_at ? (
                        <StatusPill>Revoked</StatusPill>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirm({ kind: 'revoke', id: k.id, label: k.label })}
                          className="h-11 rounded-full px-3 text-[13px] font-semibold text-red-400 touch-manipulation hover:bg-white/[0.06]"
                        >
                          Revoke
                        </button>
                      )
                    }
                  />
                ))}
              </div>
            )}
            <div className="flex justify-end border-t border-white/[0.07] px-4 py-3 sm:px-5">
              <PrimaryButton
                onClick={() => {
                  setNewKey(null);
                  setKeyLabel('');
                  setKeyOpen(true);
                }}
                className="w-full sm:w-auto"
              >
                New key
              </PrimaryButton>
            </div>
          </>
        )}
      </div>

      {isOwner && (
        <div className={panelShellClass}>
          <PanelHead title="Webhooks" />
          {hooks.isLoading ? (
            <div className="p-4 sm:p-5">
              <LoadingBlocks />
            </div>
          ) : (hooks.data ?? []).length === 0 ? (
            <p className="px-4 py-4 text-[14px] leading-relaxed text-white sm:px-5">
              No webhooks yet. A webhook tells your own system the moment a job is completed, an
              invoice is paid or a certificate is added.
            </p>
          ) : (
            <div className="divide-y divide-white/[0.07]">
              {(hooks.data ?? []).map((h) => (
                <InfoRow
                  key={h.id}
                  breakTitle
                  title={h.url.replace(/^https:\/\//, '')}
                  detail={h.events.map((e) => EVENT_LABEL[e] ?? e).join(', ')}
                  meta={
                    h.last_failure_at &&
                    (!h.last_success_at || h.last_failure_at > h.last_success_at)
                      ? `Last try failed ${ago(h.last_failure_at)}`
                      : `Last delivered ${ago(h.last_success_at)}`
                  }
                  trailing={
                    !h.active ? (
                      <StatusPill>Off</StatusPill>
                    ) : h.consecutive_failures > 0 ? (
                      <StatusPill tone="red">Failing</StatusPill>
                    ) : h.pending > 0 ? (
                      <StatusPill>{h.pending} waiting</StatusPill>
                    ) : (
                      <StatusPill tone="green">On</StatusPill>
                    )
                  }
                  onClick={() => setDetail(h)}
                />
              ))}
            </div>
          )}
          <div className="flex justify-end border-t border-white/[0.07] px-4 py-3 sm:px-5">
            <PrimaryButton
              onClick={() => {
                setNewSecret(null);
                setHookUrl('');
                setHookNote('');
                setHookOpen(true);
              }}
              className="w-full sm:w-auto"
            >
              Add webhook
            </PrimaryButton>
          </div>
        </div>
      )}

      {/* New key */}
      <FormSheet
        open={keyOpen}
        onOpenChange={setKeyOpen}
        title={newKey ? 'Your new key' : 'New API key'}
        description={newKey ? undefined : 'Read-only. Pick what it can read.'}
        width="wide"
        footer={
          newKey ? (
            <PrimaryButton onClick={() => setKeyOpen(false)} className="w-full sm:w-auto">
              Done
            </PrimaryButton>
          ) : (
            <PrimaryButton
              disabled={!keyLabel.trim() || keyScopes.length === 0 || mint.isPending}
              onClick={() =>
                mint.mutate(
                  { label: keyLabel.trim(), scopes: keyScopes, rate: keyRate },
                  { onSuccess: (r) => setNewKey(r.key), onError: fail("Couldn't create the key") }
                )
              }
              className="w-full sm:w-auto"
            >
              {mint.isPending ? 'Creating…' : 'Create key'}
            </PrimaryButton>
          )
        }
      >
        {newKey ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <SecretBox label="API key" value={newKey} />
            <div className="space-y-2">
              <p className="text-[13px] font-semibold text-white">Try it</p>
              <code className="block whitespace-pre-wrap break-all rounded-lg bg-black/40 p-3 font-mono text-[12.5px] text-white">
                {`curl -H "Authorization: Bearer ${newKey.slice(0, 12)}…" ${API_BASE}/jobs`}
              </code>
              <p className="text-[12.5px] leading-relaxed text-white">
                Send the key as a Bearer token. It reads only what you ticked, only for your firm,
                and you can revoke it here at any time.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <label className="block">
                <span className="mb-1 block text-[12px] font-medium text-white">Name</span>
                <Input
                  value={keyLabel}
                  onChange={(e) => setKeyLabel(e.target.value.slice(0, 80))}
                  placeholder="Office dashboard"
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[12px] font-medium text-white">
                  Calls a minute
                </span>
                <Input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={600}
                  value={keyRate}
                  onChange={(e) =>
                    setKeyRate(Math.min(600, Math.max(1, Number(e.target.value) || 60)))
                  }
                  className={inputClass}
                />
              </label>
            </div>
            <div className="space-y-2">
              <span className="block text-[12px] font-medium text-white">It can read</span>
              <Chips
                all={API_SCOPES}
                label={(s) => SCOPE_LABEL[s]}
                value={keyScopes}
                onChange={setKeyScopes}
              />
              <p className="text-[12.5px] text-white">
                Invoices and quotes include amounts. Give a key only what it needs.
              </p>
            </div>
          </div>
        )}
      </FormSheet>

      {/* New webhook */}
      <FormSheet
        open={hookOpen}
        onOpenChange={setHookOpen}
        title={newSecret ? 'Webhook added' : 'Add a webhook'}
        description={newSecret ? undefined : 'Elec-Mate sends a signed event to this address.'}
        width="wide"
        footer={
          newSecret ? (
            <PrimaryButton onClick={() => setHookOpen(false)} className="w-full sm:w-auto">
              Done
            </PrimaryButton>
          ) : (
            <PrimaryButton
              disabled={
                !/^https:\/\/\S+\.\S+/.test(hookUrl.trim()) ||
                hookEvents.length === 0 ||
                saveHook.isPending
              }
              onClick={() =>
                saveHook.mutate(
                  { url: hookUrl.trim(), events: hookEvents, description: hookNote },
                  {
                    onSuccess: (r) => setNewSecret(r.secret ?? null),
                    onError: fail("Couldn't add the webhook"),
                  }
                )
              }
              className="w-full sm:w-auto"
            >
              {saveHook.isPending ? 'Adding…' : 'Add webhook'}
            </PrimaryButton>
          )
        }
      >
        {newSecret ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <SecretBox label="Signing secret" value={newSecret} />
            <div className="space-y-2">
              <p className="text-[13px] font-semibold text-white">Check every event with it</p>
              <p className="text-[12.5px] leading-relaxed text-white">
                Each event carries an Elec-Mate-Signature header. Work out HMAC-SHA256 of the
                timestamp, a dot and the raw body with this secret, and compare. The API guide has
                the code.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <label className="block">
                <span className="mb-1 block text-[12px] font-medium text-white">
                  Address (https)
                </span>
                <Input
                  value={hookUrl}
                  onChange={(e) => setHookUrl(e.target.value)}
                  placeholder="https://hooks.zapier.com/…"
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[12px] font-medium text-white">
                  Note (optional)
                </span>
                <Input
                  value={hookNote}
                  onChange={(e) => setHookNote(e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
            <div className="space-y-2">
              <span className="block text-[12px] font-medium text-white">Send these events</span>
              <Chips
                all={WEBHOOK_EVENTS}
                label={(e) => EVENT_LABEL[e]}
                value={hookEvents}
                onChange={setHookEvents}
              />
            </div>
          </div>
        )}
      </FormSheet>

      {/* One webhook */}
      <FormSheet
        open={!!detail}
        onOpenChange={(o) => !o && setDetail(null)}
        title="Webhook"
        description={detail?.description ?? detail?.url.replace(/^https:\/\//, '')}
        width="wide"
        footer={
          detail && (
            <div className="flex w-full flex-wrap justify-end gap-2">
              <SecondaryButton
                onClick={() =>
                  hookAction.mutate(
                    { id: detail.id, action: 'test' },
                    {
                      onSuccess: () => toast({ title: 'Test event queued' }),
                      onError: fail("Couldn't queue a test"),
                    }
                  )
                }
              >
                Send a test
              </SecondaryButton>
              <SecondaryButton
                onClick={() =>
                  saveHook.mutate(
                    {
                      id: detail.id,
                      url: detail.url,
                      events: detail.events,
                      description: detail.description ?? '',
                      active: !detail.active,
                    },
                    { onSuccess: () => setDetail(null), onError: fail("Couldn't change it") }
                  )
                }
              >
                {detail.active ? 'Turn off' : 'Turn on'}
              </SecondaryButton>
              <SecondaryButton
                onClick={() =>
                  hookAction.mutate(
                    { id: detail.id, action: 'rotate' },
                    {
                      onSuccess: (r) => {
                        setDetail(null);
                        setNewSecret((r as { secret: string }).secret);
                        setHookOpen(true);
                      },
                      onError: fail("Couldn't make a new secret"),
                    }
                  )
                }
              >
                New secret
              </SecondaryButton>
              <DestructiveButton
                onClick={() =>
                  setConfirm({
                    kind: 'delete',
                    id: detail.id,
                    label: detail.url.replace(/^https:\/\//, ''),
                  })
                }
              >
                Delete
              </DestructiveButton>
            </div>
          )
        }
      >
        {detail && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
            <div className="space-y-3">
              <h3 className="text-[15px] font-semibold text-white">This webhook</h3>
              <div className="divide-y divide-white/[0.07] rounded-xl border border-white/[0.1]">
                <InfoRow title="Address" detail={detail.url.replace(/^https:\/\//, '')} />
                <InfoRow
                  title="Events"
                  detail={detail.events.map((e) => EVENT_LABEL[e] ?? e).join(', ')}
                />
                {detail.description && <InfoRow title="Note" detail={detail.description} />}
                <InfoRow
                  title="Status"
                  detail={
                    !detail.active
                      ? 'Off. Nothing is sent.'
                      : detail.consecutive_failures > 0
                        ? `${detail.consecutive_failures} failed tries in a row. Retries continue for 24 hours.`
                        : `On. Last delivered ${ago(detail.last_success_at)}.`
                  }
                />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-[15px] font-semibold text-white">Recent deliveries</h3>
              {detail.recent.length === 0 ? (
                <p className="text-[14px] text-white">Nothing sent yet.</p>
              ) : (
                <div className="divide-y divide-white/[0.07] rounded-xl border border-white/[0.1]">
                  {detail.recent.map((d) => (
                    <Row
                      key={d.id}
                      title={
                        d.event === 'ping'
                          ? 'Test event'
                          : (EVENT_LABEL[d.event as WebhookEvent] ?? d.event)
                      }
                      detail={
                        d.status === 'delivered'
                          ? `Delivered ${ago(d.delivered_at)}`
                          : d.last_error
                            ? d.last_error
                            : `Queued ${ago(d.created_at)}`
                      }
                      meta={`${d.attempts} attempt${d.attempts === 1 ? '' : 's'}${d.last_status_code ? ` · HTTP ${d.last_status_code}` : ''}`}
                      trailing={
                        <StatusPill
                          tone={
                            d.status === 'delivered'
                              ? 'green'
                              : d.status === 'dead'
                                ? 'red'
                                : 'neutral'
                          }
                        >
                          {d.status === 'delivered'
                            ? 'Delivered'
                            : d.status === 'dead'
                              ? 'Gave up'
                              : d.status === 'failed'
                                ? 'Retrying'
                                : 'Waiting'}
                        </StatusPill>
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </FormSheet>

      {/* Revoke a key / delete a webhook */}
      <FormSheet
        open={!!confirm}
        onOpenChange={(o) => !o && setConfirm(null)}
        title={confirm?.kind === 'revoke' ? `Revoke ${confirm.label}?` : 'Delete this webhook?'}
        description={
          confirm?.kind === 'revoke'
            ? 'Anything using this key stops working at once. This cannot be undone; make a new key if you need one.'
            : `Events stop going to ${confirm?.label ?? 'it'} at once.`
        }
        width="wide"
        footer={
          confirm && (
            <div className="flex w-full flex-wrap justify-end gap-2">
              <SecondaryButton onClick={() => setConfirm(null)}>Keep it</SecondaryButton>
              <DestructiveButton
                disabled={revoke.isPending || hookAction.isPending}
                onClick={() => {
                  if (confirm.kind === 'revoke') {
                    revoke.mutate(confirm.id, {
                      onSuccess: () => setConfirm(null),
                      onError: fail("Couldn't revoke the key"),
                    });
                  } else {
                    hookAction.mutate(
                      { id: confirm.id, action: 'delete' },
                      {
                        onSuccess: () => {
                          setConfirm(null);
                          setDetail(null);
                        },
                        onError: fail("Couldn't delete it"),
                      }
                    );
                  }
                }}
              >
                {confirm.kind === 'revoke' ? 'Revoke key' : 'Delete webhook'}
              </DestructiveButton>
            </div>
          )
        }
      >
        <p className="text-[14px] leading-relaxed text-white">
          {confirm?.kind === 'revoke'
            ? 'The key stays in the list, marked revoked, so you can see when it was last used.'
            : 'Deliveries still waiting are dropped with it.'}
        </p>
      </FormSheet>

      {/* API guide */}
      <FormSheet
        open={docsOpen}
        onOpenChange={setDocsOpen}
        title="API guide"
        description={API_BASE}
        width="wide"
      >
        <div className="gap-10 lg:columns-2 [&>section]:mb-7 [&>section]:break-inside-avoid">
          {firmApiDocs(API_BASE).map((b) => (
            <section key={b.title} className="space-y-2">
              <h3 className="text-[15px] font-semibold text-white">{b.title}</h3>
              {b.body.map((p, i) => (
                <p key={i} className="text-[14px] leading-relaxed text-white">
                  {p}
                </p>
              ))}
              {b.code && (
                <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-black/40 p-3 font-mono text-[12px] text-white">
                  {b.code}
                </pre>
              )}
            </section>
          ))}
        </div>
      </FormSheet>
    </div>
  );
}

export default DevelopersPanel;
