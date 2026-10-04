import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Capacitor } from '@capacitor/core';
import { EmailCaptureForm } from './EmailCaptureForm';
import { storageGetSync, storageSetSync } from '@/utils/storage';
import { trackLeadMagnetDownloaded } from '@/lib/analytics-events';

const EXIT_SHOWN_KEY = 'elec-mate-exit-intent-shown';
const CAPTURED_KEY = 'elec-mate-email-captured';
const COOLDOWN_MS = 1000 * 60 * 60 * 24 * 7; // once per week per browser

/**
 * Desktop-only exit-intent modal — fires when the cursor leaves the top of
 * the viewport (the classic signal of a user heading for the address bar or
 * tab close). Shown at most once per week per browser.
 *
 * Mobile has no reliable exit-intent equivalent (no hover signal) and the
 * UX is disruptive, so we skip it there entirely.
 */
export function ExitIntentModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) return;
    if (window.matchMedia('(max-width: 767px)').matches) return;

    // Skip if the user already gave us their email elsewhere (lead magnet,
    // newsletter). No point nagging someone who just converted.
    if (storageGetSync(CAPTURED_KEY)) return;

    const lastShown = storageGetSync(EXIT_SHOWN_KEY);
    if (lastShown) {
      const ts = parseInt(lastShown, 10);
      if (Number.isFinite(ts) && Date.now() - ts < COOLDOWN_MS) return;
    }

    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, 10_000); // give the user 10s before we can trigger

    const onMouseOut = (e: MouseEvent) => {
      if (!armed) return;
      if (e.clientY > 0) return;
      if (e.relatedTarget || (e as MouseEvent & { toElement?: Element }).toElement) return;
      setOpen(true);
      storageSetSync(EXIT_SHOWN_KEY, String(Date.now()));
      document.removeEventListener('mouseout', onMouseOut);
    };

    document.addEventListener('mouseout', onMouseOut);
    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  const handleSuccess = ({ downloadUrl }: { downloadUrl: string | null }) => {
    if (downloadUrl) {
      trackLeadMagnetDownloaded({ magnet: 'cheatsheet_exit_intent' });
      window.open(downloadUrl, '_blank', 'noopener,noreferrer');
    }
    window.setTimeout(() => setOpen(false), 2500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.12] bg-[hsl(0_0%_9%)] p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 inline-flex h-11 items-center px-3 text-[13px] font-semibold text-white touch-manipulation hover:text-elec-yellow"
            >
              Not now
            </button>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
              Before you go
            </p>
            <h2 className="mt-2 text-[26px] font-bold leading-tight tracking-[-0.02em] text-white">
              The <span className="text-elec-yellow">BS 7671 A4:2026</span> cheat sheet, free
            </h2>
            <p className="mb-6 mt-2 text-[15px] leading-relaxed text-white">
              Every amendment change on one page — AFDDs, TN-C-S, new schedule columns, model forms.
            </p>

            <EmailCaptureForm
              source="exit_intent"
              placeholder="Your email"
              buttonLabel="Send it"
              successMessage="Check your inbox — the PDF is on its way."
              onSuccess={handleSuccess}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
