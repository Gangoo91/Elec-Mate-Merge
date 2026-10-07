/**
 * Worker Tools › My jobs: "On my way" (ELE-1822).
 *
 * One tap from the van. The phone's location and the job's address give a
 * drive time (google-travel-time, the same server key the diary uses); the
 * sparky can nudge it, then WhatsApp or a text opens with the message
 * written, from their own number, so the customer can answer. It is logged on
 * the job so the office knows the customer was told.
 */
import { useEffect, useState } from 'react';
import { Loader2, Navigation2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { FormSheet } from '@/components/forms/FormSheet';
import { chipBase, chipOn, chipOff } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { openExternalUrl } from '@/utils/open-external-url';
import { useLogCustomerContact, waLink, smsLink } from '@/hooks/useCustomerMessages';
import { greetingName } from '@/components/calendar/confirmationMessage';

const QUICK = [10, 15, 20, 30, 45, 60];

interface Props {
  jobId: string;
  /** Who to tell: the customer or the site contact the job names. */
  contactName: string | null;
  phone: string;
  /** Fallback destination when the job has a pin but no typed address. */
  lat?: number | null;
  lng?: number | null;
}

const firstName = (name: string | null) => greetingName(name);

export function OnMyWayButton(props: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        data-help="wt-jobs.on-my-way"
        onClick={() => setOpen(true)}
        className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.18] bg-white/[0.06] text-[16px] font-semibold text-white touch-manipulation active:scale-[0.99]"
      >
        <Navigation2 className="h-5 w-5 text-elec-yellow" />
        On my way
      </button>
      {open && <OnMyWaySheet {...props} open={open} onOpenChange={setOpen} />}
    </>
  );
}

function OnMyWaySheet({
  jobId,
  contactName,
  phone,
  lat,
  lng,
  open,
  onOpenChange,
}: Props & { open: boolean; onOpenChange: (o: boolean) => void }) {
  const log = useLogCustomerContact();
  const [minutes, setMinutes] = useState<number | null>(null);
  const [eta, setEta] = useState<{ state: 'locating' | 'ok' | 'none'; text?: string }>({ state: 'locating' });

  const { data: who } = useQuery({
    queryKey: ['on-my-way', jobId],
    staleTime: 10 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_on_my_way' as never, { p_job: jobId } as never);
      if (error) throw error;
      return data as unknown as { me: string | null; business: string | null; destination: string | null } | null;
    },
  });

  // Drive time from here. Any failure (no permission, no signal, no address)
  // just leaves the quick picks: the message never waits on it.
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    const destination = who?.destination?.trim() || (lat != null && lng != null ? `${lat},${lng}` : '');
    if (!destination || !('geolocation' in navigator)) {
      setEta({ state: 'none' });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { data, error } = await supabase.functions.invoke('google-travel-time', {
            body: { origin: `${pos.coords.latitude},${pos.coords.longitude}`, destination },
          });
          const d = data as { minutes?: number; text?: string; distanceText?: string | null } | null;
          if (cancelled) return;
          if (error || !d?.minutes) return setEta({ state: 'none' });
          // Round up to the next 5: "about 23 minutes" reads like a sat-nav, not a person.
          const rounded = Math.max(5, Math.ceil(d.minutes / 5) * 5);
          setMinutes((m) => m ?? rounded);
          setEta({ state: 'ok', text: `${d.text || `${d.minutes} mins`}${d.distanceText ? `, ${d.distanceText}` : ''} from here` });
        } catch {
          if (!cancelled) setEta({ state: 'none' });
        }
      },
      () => !cancelled && setEta({ state: 'none' }),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 120000 }
    );
    return () => {
      cancelled = true;
    };
  }, [open, who?.destination, lat, lng]);

  const n = minutes ?? 20;
  const hi = firstName(contactName);
  const from = [who?.me, who?.business].filter(Boolean);
  const intro =
    from.length === 2 ? `it's ${from[0]} from ${from[1]}. ` : from.length === 1 ? `it's ${from[0]}. ` : '';
  const message = `${hi ? `Hi ${hi}, ` : 'Hi, '}${intro}I'm on my way and should be with you in about ${n} minutes.`;

  const send = async (channel: 'whatsapp' | 'sms') => {
    await openExternalUrl(channel === 'whatsapp' ? waLink(phone, message) : smsLink(phone, message));
    log.mutate({ jobId, kind: 'on_my_way', channel, text: `About ${n} minutes` });
    onOpenChange(false);
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="On my way"
      title={`Tell ${hi || 'them'} you're coming`}
      description="It opens WhatsApp or your messages with this written, from your own number. The office sees you sent it."
    >
      <div>
        <p className="mb-2 text-[12px] font-medium text-white">How long</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {QUICK.map((q) => (
            <button key={q} type="button" onClick={() => setMinutes(q)} className={cn(chipBase, n === q ? chipOn : chipOff)}>
              {q} min
            </button>
          ))}
        </div>
        <p className="mt-2 flex min-h-5 items-center gap-1.5 text-[12.5px] text-white">
          {eta.state === 'locating' ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Working out the drive from here…
            </>
          ) : eta.state === 'ok' ? (
            eta.text
          ) : (
            'Pick roughly how long. Location or the address wasn’t available for a drive time.'
          )}
        </p>
      </div>

      <pre className="whitespace-pre-wrap rounded-2xl border border-white/[0.12] border-l-[3px] border-l-elec-yellow bg-white/[0.04] px-4 py-3.5 font-sans text-[15px] leading-relaxed text-white">
        {message}
      </pre>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => send('whatsapp')}
          className="flex h-14 items-center justify-center rounded-2xl bg-[#25D366] text-[16px] font-semibold text-black touch-manipulation active:scale-[0.99]"
        >
          WhatsApp
        </button>
        <button
          type="button"
          onClick={() => send('sms')}
          className="flex h-14 items-center justify-center rounded-2xl border border-white/[0.18] bg-white/[0.06] text-[16px] font-semibold text-white touch-manipulation active:scale-[0.99]"
        >
          Text
        </button>
      </div>
    </FormSheet>
  );
}
