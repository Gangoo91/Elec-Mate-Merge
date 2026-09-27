import { useState } from 'react';
import { FileText, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { openOrDownloadPdf } from '@/utils/pdf-download';

/**
 * "You've issued the certificate — give the client the matching handout too."
 *
 * ELE-1556. The client handouts already exist (ClientHandoutsPage) and are
 * good, and almost nobody finds them. The moment they are relevant is the
 * moment a certificate has just been generated, so this offers the ONE handout
 * that matches the certificate type, generated through the same edge function
 * the handouts page uses, with the same company branding.
 *
 * Deliberately quiet: one card, one tap, and a per-certificate-type "don't
 * offer this again" that is remembered on this device. Never modal, never
 * blocking — the certificate is already done and this must not get in the
 * way of downloading it.
 */

/**
 * certificate type → handout id (from ClientHandoutsPage's `handouts`).
 * Types with no genuinely matching leaflet are absent on purpose — offering
 * the generic safety guide after every certificate is the nag this is
 * designed not to be.
 */
const HANDOUT_FOR_TYPE: Record<string, { id: string; title: string; filename: string; blurb: string }> = {
  eicr: {
    id: 'eicr-explained',
    title: 'Your EICR Explained',
    filename: 'Your-EICR-Explained',
    blurb: 'What the codes mean, what happens next, and why the report matters — written for the customer.',
  },
  eic: {
    id: 'new-build-handover',
    title: 'New Build Handover',
    filename: 'New-Build-Handover',
    blurb: 'Where everything is, what the RCDs do, and how to look after the new installation.',
  },
  'minor-works': {
    id: 'electrical-safety',
    title: 'Electrical Safety Guide',
    filename: 'Electrical-Safety-Guide',
    blurb: 'Consumer unit, RCD testing, warning signs and what to do in an emergency.',
  },
  'ev-charging': {
    id: 'ev-charging-guide',
    title: 'EV Charging Guide',
    filename: 'EV-Charging-Guide',
    blurb: 'Using and caring for the charge point, tariffs, and what the RCD does.',
  },
  'fire-alarm': { id: 'fire-alarm-guide', title: 'Fire Alarm System Guide', filename: 'Fire-Alarm-System-Guide', blurb: 'Weekly tests, what the panel is telling you, and who to call.' },
  'fire-alarm-commissioning': { id: 'fire-alarm-guide', title: 'Fire Alarm System Guide', filename: 'Fire-Alarm-System-Guide', blurb: 'Weekly tests, what the panel is telling you, and who to call.' },
  'fire-alarm-inspection': { id: 'fire-alarm-guide', title: 'Fire Alarm System Guide', filename: 'Fire-Alarm-System-Guide', blurb: 'Weekly tests, what the panel is telling you, and who to call.' },
  'pat-testing': {
    id: 'pat-testing-explained',
    title: 'PAT Testing Explained',
    filename: 'PAT-Testing-Explained',
    blurb: 'What was tested, what the labels mean, and when it is due again.',
  },
};

const dismissKey = (type: string) => `handout-prompt-dismissed:${type}`;

interface Props {
  /** `reports.report_type` of the certificate that was just generated. */
  reportType: string;
  className?: string;
}

export default function HandoutPrompt({ reportType, className }: Props) {
  const { toast } = useToast();
  const haptic = useHaptic();
  const handout = HANDOUT_FOR_TYPE[(reportType || '').toLowerCase()];
  const [dismissed, setDismissed] = useState(() => {
    try {
      return !!handout && localStorage.getItem(dismissKey(reportType)) === '1';
    } catch {
      return false;
    }
  });
  const [busy, setBusy] = useState(false);

  if (!handout || dismissed) return null;

  const generate = async () => {
    haptic.light();
    setBusy(true);
    try {
      // Same branding payload as ClientHandoutsPage — the two must not drift,
      // or the handout offered here prints differently from the one on the page.
      const { data: cpData } = await supabase.rpc('get_my_company_profile');
      const cp = Array.isArray(cpData) ? cpData[0] : cpData;
      const payload: Record<string, string> = {
        company_name: cp?.company_name || '',
        company_phone: cp?.company_phone || '',
        company_email: cp?.company_email || '',
        company_website: cp?.company_website || '',
        company_address: cp?.company_address || '',
        company_logo: cp?.logo_url || cp?.logo_data_url || '',
        scheme_logo: cp?.scheme_logo_data_url || '',
        registration_scheme: cp?.registration_scheme || '',
        registration_number: cp?.registration_number || '',
      };
      const { data, error } = await supabase.functions.invoke('generate-client-handout-pdf', {
        body: { formData: payload, handoutType: handout.id },
      });
      if (error || !data?.download_url) throw new Error(error?.message || 'No download URL');
      await openOrDownloadPdf(data.download_url, `${handout.filename}.pdf`);
      toast({ title: `${handout.title} ready`, description: 'Send it to the client alongside the certificate.' });
    } catch (err) {
      console.error('[HandoutPrompt] generate failed:', err);
      toast({ title: 'Could not generate the handout', description: 'Try again from Client Handouts.', variant: 'destructive' });
    } finally {
      setBusy(false);
    }
  };

  const dismiss = () => {
    haptic.light();
    try {
      localStorage.setItem(dismissKey(reportType), '1');
    } catch {
      /* private mode — just hide it for now */
    }
    setDismissed(true);
  };

  return (
    <div className={['rounded-2xl border border-white/[0.12] bg-white/[0.04] p-4', className].filter(Boolean).join(' ')}>
      <div className="flex items-start gap-3">
        <FileText className="mt-0.5 h-5 w-5 shrink-0 text-elec-yellow" />
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold text-white">Give the client the matching handout?</p>
          <p className="mt-1 text-[13px] leading-snug text-white">
            <span className="font-medium">{handout.title}</span> — {handout.blurb}
          </p>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={generate}
          disabled={busy}
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[13px] font-semibold text-black touch-manipulation active:scale-[0.98] disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? 'Generating…' : 'Generate handout'}
        </button>
        <button
          type="button"
          onClick={dismiss}
          className="h-11 rounded-xl border border-white/[0.14] px-3 text-[13px] font-medium text-white touch-manipulation active:scale-[0.98]"
        >
          Not for this type
        </button>
      </div>
    </div>
  );
}
