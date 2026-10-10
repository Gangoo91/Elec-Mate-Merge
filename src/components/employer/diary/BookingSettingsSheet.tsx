/**
 * Online booking settings (ELE-2079): what customers can book, how long each
 * takes, where the firm works, how far ahead, and whether a booking waits
 * for the office or is confirmed straight away. Deposits are money, so only
 * the owner and admins see or set them. The links at the bottom are what the
 * firm puts on its website and Google Business Profile.
 */
import { useEffect, useState } from 'react';
import { Copy, Loader2, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  chipBase,
  chipOff,
  chipOn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { panel } from '@/components/employer/pageParts/PageParts';
import { Switch } from '@/components/ui/switch';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { CREW_REQUIREMENTS } from '@/utils/crewCompetence';
import {
  useBookingSettings,
  useSaveBookingSettings,
  type BookingSettings,
  type BookingType,
} from '@/hooks/useSmartScheduling';

const SITE = 'https://www.elec-mate.com';
// The credentials a customer-booked visit can need: the job-type ones.
const TYPE_REQS = CREW_REQUIREMENTS.filter((r) =>
  ['18th', '2391', 'ev', 'solar', 'pat', 'ecs'].includes(r.key)
);

interface Props {
  firm: string | undefined;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

const DURATIONS = [30, 45, 60, 90, 120, 180, 240, 480];
const mins = (m: number) =>
  m < 60 ? `${m} min` : m % 60 === 0 ? `${m / 60}h` : `${Math.floor(m / 60)}h ${m % 60}m`;

/** An on/off setting: a switch, so "off" never looks selected. */
function SwitchRow({
  id,
  label,
  hint,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex min-h-11 cursor-pointer items-center justify-between gap-3 touch-manipulation"
    >
      <span className="min-w-0">
        <span className="block text-[15px] font-semibold text-white">{label}</span>
        {hint && <span className="mt-0.5 block text-[13px] leading-snug text-white">{hint}</span>}
      </span>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </label>
  );
}

export function BookingSettingsSheet({ firm, open, onOpenChange }: Props) {
  const { data, isLoading } = useBookingSettings(open ? firm : undefined);
  const save = useSaveBookingSettings(firm);
  const [draft, setDraft] = useState<BookingSettings | null>(null);
  const [postcodes, setPostcodes] = useState('');

  useEffect(() => {
    if (data && open) {
      setDraft(data);
      setPostcodes((data.area_postcodes ?? []).join(', '));
    }
  }, [data, open]);

  const set = <K extends keyof BookingSettings>(k: K, v: BookingSettings[K]) =>
    setDraft((d) => (d ? { ...d, [k]: v } : d));
  const setType = (i: number, patch: Partial<BookingType>) =>
    setDraft((d) =>
      d ? { ...d, types: d.types.map((t, j) => (j === i ? { ...t, ...patch } : t)) } : d
    );

  const submit = async () => {
    if (!draft) return;
    try {
      const patch: Record<string, unknown> = {
        enabled: draft.enabled,
        auto_confirm: draft.auto_confirm,
        lead_days: draft.lead_days,
        horizon_days: draft.horizon_days,
        area_mode: draft.area_mode,
        base_postcode: draft.base_postcode ?? '',
        radius_miles: draft.radius_miles,
        area_postcodes: postcodes
          .split(/[\s,]+/)
          .map((p) => p.trim().toUpperCase())
          .filter(Boolean),
        intro: draft.intro ?? '',
        types: draft.types,
      };
      if (draft.can_see_money) patch.deposit_enabled = !!draft.deposit_enabled;
      const saved = await save.mutateAsync(patch as Partial<BookingSettings>);
      if (saved.enabled && saved.area_mode === 'radius' && !saved.base_found) {
        toast.warning('Saved, but that base postcode was not found', {
          description:
            'Customers are refused until the area is set. Try the postcode of your office.',
        });
      } else {
        toast.success(saved.enabled ? 'Online booking is on' : 'Settings saved');
      }
    } catch (e) {
      toast.error((e as Error).message || 'Not saved');
    }
  };

  const link = draft?.public_key ? `${SITE}/book-visit/${draft.public_key}` : null;
  const copy = async (text: string, what: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${what} copied`);
    } catch {
      toast.error('Could not copy. Select it and copy by hand.');
    }
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Online booking"
      title="Let customers book a visit"
      description="Customers pick a free half-day from your diary. Only people holding what the visit needs, and free that day, count."
      width="wide"
      footer={
        <div className="grid grid-cols-2 gap-2">
          <button type="button" className={buttonSecondaryCn} onClick={() => onOpenChange(false)}>
            Close
          </button>
          <button
            type="button"
            className={buttonPrimaryCn}
            disabled={!draft || save.isPending}
            onClick={submit}
          >
            {save.isPending ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : 'Save'}
          </button>
        </div>
      }
    >
      {isLoading || !draft ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <section className="min-w-0 space-y-4">
            <SwitchRow
              id="bs-enabled"
              label="Taking bookings online"
              hint={
                draft.enabled
                  ? 'Your booking link and website button are live.'
                  : 'Off: the booking link says you are not taking bookings online.'
              }
              checked={draft.enabled}
              onChange={(v) => set('enabled', v)}
            />

            <h3 className="pt-2 text-[15px] font-semibold text-white">What customers can book</h3>
            <div className="space-y-3">
              {draft.types.map((t, i) => (
                <div key={`${t.key}-${i}`} className={cn(panel, 'space-y-3 p-4 sm:p-5')}>
                  <div className="flex items-end gap-2">
                    <div className="min-w-0 flex-1">
                      <label className={labelCn} htmlFor={`bt-label-${i}`}>
                        Name customers see
                      </label>
                      <input
                        id={`bt-label-${i}`}
                        className={inputCn}
                        value={t.label}
                        maxLength={60}
                        onChange={(e) => setType(i, { label: e.target.value })}
                      />
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${t.label}`}
                      onClick={() =>
                        set(
                          'types',
                          draft.types.filter((_, j) => j !== i)
                        )
                      }
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.14] text-white touch-manipulation hover:border-red-400 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <span className={labelCn}>How long it takes</span>
                    <MobileSelectPicker
                      value={String(t.minutes)}
                      onValueChange={(v) => setType(i, { minutes: Number(v) })}
                      options={(DURATIONS.includes(t.minutes)
                        ? DURATIONS
                        : [...DURATIONS, t.minutes].sort((a, b) => a - b)
                      ).map((m) => ({ value: String(m), label: mins(m) }))}
                      title="How long it takes"
                    />
                    <p className="mt-1.5 text-[12.5px] text-white">
                      {t.minutes <= 270
                        ? 'Booked as a morning or an afternoon.'
                        : 'Booked as a whole day.'}
                    </p>
                  </div>
                  <div>
                    <span className={labelCn}>Whoever goes must hold</span>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {TYPE_REQS.map((r) => {
                        const on = t.required.includes(r.key);
                        return (
                          <button
                            key={r.key}
                            type="button"
                            onClick={() =>
                              setType(i, {
                                required: on
                                  ? t.required.filter((k) => k !== r.key)
                                  : [...t.required, r.key],
                              })
                            }
                            className={cn(chipBase, 'px-2 text-[13px]', on ? chipOn : chipOff)}
                          >
                            {r.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="self-end">
                      <SwitchRow
                        id={`bt-shown-${i}`}
                        label="On the booking page"
                        checked={t.enabled}
                        onChange={(v) => setType(i, { enabled: v })}
                      />
                    </div>
                    {draft.can_see_money && draft.deposit_enabled && (
                      <div>
                        <label className={labelCn} htmlFor={`bt-dep-${i}`}>
                          Deposit (£, blank for none)
                        </label>
                        <input
                          id={`bt-dep-${i}`}
                          className={inputCn}
                          inputMode="decimal"
                          value={t.deposit_pounds ?? ''}
                          onChange={(e) => {
                            const v = e.target.value.replace(/[^\d.]/g, '');
                            setType(i, { deposit_pounds: v === '' ? null : Number(v) });
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {draft.types.length < 12 && (
                <button
                  type="button"
                  onClick={() =>
                    set('types', [
                      ...draft.types,
                      {
                        key: '',
                        label: 'New visit',
                        minutes: 60,
                        required: ['18th'],
                        enabled: true,
                        deposit_pounds: null,
                      },
                    ])
                  }
                  className={cn(
                    buttonSecondaryCn,
                    'inline-flex w-full items-center justify-center gap-1.5'
                  )}
                >
                  <Plus className="h-4 w-4" /> Add a type of visit
                </button>
              )}
            </div>
          </section>

          <section className="min-w-0 space-y-5">
            <div>
              <h3 className="mb-2 text-[15px] font-semibold text-white">Where you work</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className={cn(chipBase, draft.area_mode === 'radius' ? chipOn : chipOff)}
                  onClick={() => set('area_mode', 'radius')}
                >
                  Miles from base
                </button>
                <button
                  type="button"
                  className={cn(chipBase, draft.area_mode === 'postcodes' ? chipOn : chipOff)}
                  onClick={() => set('area_mode', 'postcodes')}
                >
                  Postcode list
                </button>
              </div>
              {draft.area_mode === 'radius' ? (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCn} htmlFor="bs-base">
                      Base postcode
                    </label>
                    <input
                      id="bs-base"
                      className={inputCn}
                      value={draft.base_postcode ?? ''}
                      autoCapitalize="characters"
                      onChange={(e) => set('base_postcode', e.target.value.toUpperCase())}
                    />
                  </div>
                  <div>
                    <label className={labelCn} htmlFor="bs-miles">
                      Up to (miles)
                    </label>
                    <input
                      id="bs-miles"
                      className={inputCn}
                      inputMode="numeric"
                      value={draft.radius_miles}
                      onChange={(e) =>
                        set('radius_miles', Number(e.target.value.replace(/\D/g, '')) || 1)
                      }
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-3">
                  <label className={labelCn} htmlFor="bs-pcs">
                    Postcode areas, comma separated (S10, S11, or S for all of Sheffield)
                  </label>
                  <input
                    id="bs-pcs"
                    className={inputCn}
                    value={postcodes}
                    autoCapitalize="characters"
                    onChange={(e) => setPostcodes(e.target.value.toUpperCase())}
                  />
                </div>
              )}
              <p className="mt-1.5 text-[12.5px] text-white">
                Anyone outside is told politely that you don&rsquo;t cover them, with your phone
                number.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCn} htmlFor="bs-lead">
                  Earliest, days ahead
                </label>
                <input
                  id="bs-lead"
                  className={inputCn}
                  inputMode="numeric"
                  value={draft.lead_days}
                  onChange={(e) =>
                    set('lead_days', Math.min(60, Number(e.target.value.replace(/\D/g, '')) || 0))
                  }
                />
              </div>
              <div>
                <label className={labelCn} htmlFor="bs-horizon">
                  Latest, days ahead
                </label>
                <input
                  id="bs-horizon"
                  className={inputCn}
                  inputMode="numeric"
                  value={draft.horizon_days}
                  onChange={(e) =>
                    set(
                      'horizon_days',
                      Math.min(60, Number(e.target.value.replace(/\D/g, '')) || 3)
                    )
                  }
                />
              </div>
            </div>
            <p className="-mt-2 text-[12.5px] text-white">
              Times also follow the working hours and days off in your Booking availability, and
              your old booking link sends people here while this is on.
            </p>

            <div>
              <h3 className="mb-2 text-[15px] font-semibold text-white">When someone books</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className={cn(
                    chipBase,
                    'px-2 text-[13px]',
                    !draft.auto_confirm ? chipOn : chipOff
                  )}
                  onClick={() => set('auto_confirm', false)}
                >
                  Office accepts it
                </button>
                <button
                  type="button"
                  className={cn(
                    chipBase,
                    'px-2 text-[13px]',
                    draft.auto_confirm ? chipOn : chipOff
                  )}
                  onClick={() => set('auto_confirm', true)}
                >
                  Confirm straight away
                </button>
              </div>
              <p className="mt-1.5 text-[12.5px] text-white">
                {draft.auto_confirm
                  ? 'The person picked is booked and gets a push; the customer gets their confirmation and a reminder the evening before. Bookings with a deposit still wait for you.'
                  : 'It goes in the diary as tentative, holding the slot. Accept or move it under Online bookings.'}
              </p>
            </div>

            {draft.can_see_money && (
              <div>
                <SwitchRow
                  id="bs-deposit"
                  label="Take a deposit"
                  checked={!!draft.deposit_enabled}
                  onChange={(v) => set('deposit_enabled', v)}
                />
                <p className="mt-1.5 text-[12.5px] text-white">
                  Paid by card through your connected Stripe account, the same as an invoice. Set
                  the amount on each visit type. If you are VAT registered, the deposit includes
                  VAT. Not paid within 48 hours, the booking is released and the slot is free again.
                </p>
              </div>
            )}

            <div>
              <label className={labelCn} htmlFor="bs-intro">
                A line for customers (optional)
              </label>
              <textarea
                id="bs-intro"
                className={textareaCn}
                rows={2}
                maxLength={300}
                value={draft.intro ?? ''}
                onChange={(e) => set('intro', e.target.value)}
              />
            </div>

            <div>
              <h3 className="mb-2 text-[15px] font-semibold text-white">Where customers book</h3>
              {!link || !draft.enabled ? (
                <p className="text-[13px] text-white">Switch it on and save to get your links.</p>
              ) : (
                <div className="space-y-2">
                  {draft.quote_page_slug && (
                    <p className="text-[13px] text-white">It shows on your quote page too.</p>
                  )}
                  <LinkRow label="Booking link" value={link} onCopy={() => copy(link, 'Link')} />
                  <LinkRow
                    label="Google Business Profile Book button"
                    value={`${link}?src=google`}
                    onCopy={() => copy(`${link}?src=google`, 'Google link')}
                  />
                  <LinkRow
                    label="Website embed"
                    value={`<iframe src="${link}?embed=1&src=website" style="width:100%;min-height:720px;border:0" title="Book a visit"></iframe>`}
                    onCopy={() =>
                      copy(
                        `<iframe src="${link}?embed=1&src=website" style="width:100%;min-height:720px;border:0" title="Book a visit"></iframe>`,
                        'Embed code'
                      )
                    }
                  />
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </FormSheet>
  );
}

function LinkRow({ label, value, onCopy }: { label: string; value: string; onCopy: () => void }) {
  return (
    <div className={cn(panel, 'flex items-center gap-3 px-4 py-2.5 sm:px-5')}>
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-semibold text-white">{label}</div>
        <div className="line-clamp-2 break-all text-[12.5px] text-white">{value}</div>
      </div>
      <button
        type="button"
        onClick={onCopy}
        aria-label={`Copy ${label}`}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.14] text-white touch-manipulation hover:border-elec-yellow hover:text-elec-yellow"
      >
        <Copy className="h-4 w-4" />
      </button>
    </div>
  );
}
