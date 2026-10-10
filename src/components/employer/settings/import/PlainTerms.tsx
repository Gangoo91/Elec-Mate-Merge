/**
 * ELE-2067 — No lock-in: four plain promises, each backed by the Terms of
 * Service (src/content/legal/terms.md). Approved by Andrew 10 Oct 2026 ("no
 * lock in"). Change a line here only if the Terms say the same thing.
 * - No contract: terms.md "Cancel any time" + "Renewal" + section 4.
 * - Price changes: terms.md "Price changes" (30 days' notice).
 * - Your data: terms.md "Exporting" + the full export in Settings.
 * - Bring it across: the self-serve import in Settings (free, can be undone).
 */
import { cn } from '@/lib/utils';
import { PanelHead, panelShellClass } from '@/components/employer/pageParts/PageParts';

export const PLAIN_TERMS: { title: string; body: string }[] = [
  {
    title: 'No contract',
    body: 'Pay monthly or yearly. No minimum term and no exit fee. Cancel any time and keep access to the end of the period you have paid for.',
  },
  {
    title: 'No surprise prices',
    body: 'If your price ever changes, we tell you at least 30 days before, and you can cancel first.',
  },
  {
    title: 'Your data is yours',
    body: 'Export everything, records and PDFs, any time and free. If you leave, it all goes with you.',
  },
  {
    title: 'Bring it across',
    body: 'Import your customers, jobs, quotes and invoices from Tradify, Fergus, Powered Now, simPRO and more, free. Not right? Undo the whole import.',
  },
];

/** Kept for callers: the promises are live, so always shown. */
export function usePlainTermsVisibility(): { show: boolean; draft: boolean } {
  return { show: true, draft: false };
}

/** Settings → Plain terms. */
export function PlainTermsPanel() {
  return (
    <div className={panelShellClass}>
      <PanelHead
        title="Plain terms"
        meta={<span className="text-[13px] text-white">No lock-in</span>}
      />
      <div className="space-y-4 px-4 py-4 sm:px-5">
        <div className="grid gap-4 sm:grid-cols-2">
          {PLAIN_TERMS.map((t) => (
            <div key={t.title}>
              <p className="text-[15px] font-semibold text-white">{t.title}</p>
              <p className="mt-0.5 text-[13.5px] leading-snug text-white">{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Pricing page strip: the four promises under the plans, for everyone. */
export function PlainTermsStrip({ className }: { className?: string }) {
  return (
    <div className={cn('w-full', className)}>
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
        {PLAIN_TERMS.map((t) => (
          <div key={t.title} className="bg-[hsl(0_0%_8%)] px-4 py-4">
            <p className="text-[15px] font-semibold text-white">{t.title}</p>
            <p className="mt-1 text-[13px] leading-snug text-white">{t.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
