import { motion, useReducedMotion } from 'framer-motion';
import { FileText, ShieldCheck, Zap } from 'lucide-react';
import { EmailCaptureForm } from './EmailCaptureForm';

/**
 * Lead magnet section — offers the BS 7671 A4:2026 cheat sheet in exchange
 * for an email. Goes on the landing page between feature sections.
 *
 * The actual PDF URL is set via the LEAD_MAGNET_CHEATSHEET_URL env var on
 * the newsletter-subscribe edge function. Returned to the client in the
 * subscribe response so we can trigger a download immediately on success.
 */
export function LeadMagnetSection() {
  const prefersReducedMotion = useReducedMotion();

  const handleSuccess = ({ downloadUrl }: { downloadUrl: string | null }) => {
    if (!downloadUrl) return;
    // Open in a new tab so the user stays on the landing page
    window.open(downloadUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative isolate overflow-hidden border-y border-white/[0.08] bg-gradient-to-br from-[#0f0f0f] via-[#0a0a0a] to-[#0f0f0f] py-16 sm:py-20">
      <div
        className="absolute inset-0 -z-10 opacity-[0.12]"
        style={{
          background:
            'radial-gradient(600px circle at 80% 20%, #facc15, transparent 50%), radial-gradient(800px circle at 10% 90%, #3b82f6, transparent 50%)',
        }}
      />
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/[0.08] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-yellow-300">
            <Zap className="h-3 w-3" />
            Free download
          </div>
          <h2 className="mb-4 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
            BS 7671 A4:2026 <span className="text-yellow-400">Cheat Sheet</span>
          </h2>
          <p className="mb-6 text-base leading-relaxed text-white sm:text-lg">
            Every change in the 2026 amendment on one page. AFDDs, TN-C-S protection, new schedule
            columns, updated model forms. Pinned on your van dash.
          </p>
          <ul className="mb-6 space-y-3">
            {[
              'AFDD requirements — where they are now mandatory',
              'TN-C-S (PNB) changes and bonding implications',
              'New columns on the Schedule of Test Results',
              'Model form updates — what changed vs. 18th ed. A3',
            ].map((line) => (
              <li
                key={line}
                className="flex items-start gap-2.5 text-[15px] font-medium text-white"
              >
                <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-400" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400/15 text-yellow-400 ring-1 ring-yellow-400/30">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-semibold text-white">Get the PDF</p>
              <p className="text-sm text-white">We'll email it — takes 30 seconds.</p>
            </div>
          </div>
          <EmailCaptureForm
            source="lead_magnet_cheatsheet"
            buttonLabel="Send it"
            placeholder="Your email"
            successMessage="Check your inbox — the PDF is on its way."
            onSuccess={handleSuccess}
          />
        </motion.div>
      </div>
    </section>
  );
}
