import { Mail, ArrowRight } from 'lucide-react';

/**
 * Support strip under the plans. One honest action — email — in the page's
 * quiet card language. (A "Live Chat" link used to live here but the product
 * has no live chat; it was a disguised mailto and got removed 2026-07-20.)
 */
const SupportSection = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-6 border-t border-white/[0.06]">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
          Need help?
        </p>
        <p className="mt-1 text-sm text-white/75 leading-relaxed">
          Questions about plans or billing — email us and a real person replies.
        </p>
      </div>

      <a
        href="mailto:info@elec-mate.com?subject=Subscription%20Support"
        className="sm:ml-auto inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg text-sm font-medium touch-manipulation bg-white/[0.06] border border-white/[0.1] text-white hover:bg-white/[0.1] active:scale-[0.99] transition-colors shrink-0"
      >
        <Mail className="h-4 w-4 text-white/60" />
        Email support
        <ArrowRight className="h-3.5 w-3.5 text-white/45" />
      </a>
    </div>
  );
};

export default SupportSection;
