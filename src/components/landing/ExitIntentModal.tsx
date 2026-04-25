import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Zap } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { EmailCaptureForm } from './EmailCaptureForm';
import { storageGetSync, storageSetSync } from '@/utils/storage';

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
    if (downloadUrl) window.open(downloadUrl, '_blank', 'noopener,noreferrer');
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
            className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/5 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/[0.08] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-yellow-300">
              <Zap className="h-3 w-3" />
              Before you go
            </div>
            <h2 className="mb-2 text-2xl font-bold leading-tight text-white">
              Grab the <span className="text-yellow-400">BS 7671 A4:2026</span> cheat sheet
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-white">
              Every amendment change on one page — AFDDs, TN-C-S, new schedule columns, model forms.
              Free. No signup.
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
