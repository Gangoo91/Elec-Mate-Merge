/**
 * The supervisor confirmation link for a diary day's training — the same
 * /attest-ojt/:id link the OTJ hub sends. The supervisor opens it, adds their
 * name and email, and the time becomes employer-attested. For a learner with
 * no college this link is the ONLY way the time reaches a signer.
 */
import { toast } from 'sonner';
import { formatMinutes } from '@/hooks/site-diary/useSiteDiaryEntries';

export async function shareAttestLink(otjId: string, minutes: number, siteName: string) {
  const url = `${window.location.origin}/attest-ojt/${otjId}`;
  const nav = navigator as Navigator & {
    share?: (d: { title?: string; text?: string; url?: string }) => Promise<void>;
  };
  try {
    if (typeof nav.share === 'function') {
      await nav.share({
        title: 'Confirm my training time',
        text: `${formatMinutes(minutes)} of training on ${siteName}. Tap to confirm:`,
        url,
      });
      return;
    }
    await navigator.clipboard.writeText(url);
    toast.success('Link copied — send it to your supervisor to confirm');
  } catch (err) {
    // The share sheet being closed is not an error worth a toast.
    if (err instanceof Error && err.name === 'AbortError') return;
    toast.info('Send this link to your supervisor', { description: url });
  }
}
