import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { scrollToTop } from '@/utils/scroll';
import { useHaptic } from '@/hooks/useHaptic';

/**
 * Floating "back to top" for the long certificate forms — ELE-1532.
 *
 * An EICR's inspection step is dozens of sections deep. The step tabs live in
 * the sticky header, so getting back to them from the bottom meant scrolling
 * the whole thing by hand — "especially painful on a trackpad". This appears
 * once the page is a screen or so down and sends the viewport back to the
 * header with the same `scrollToTop` the step change uses, so both respect
 * reduced-motion the same way.
 *
 * Sits above the fixed CertShellFooter (z-40, ~6rem tall on a phone) and
 * inside the safe area, so it never covers the Continue button.
 */
const SHOW_AFTER_PX = 600;

export default function BackToTopButton() {
  const haptic = useHaptic();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible((window.scrollY || window.pageYOffset || 0) > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => {
        haptic.light();
        scrollToTop();
      }}
      className={cn(
        'fixed right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.14]',
        'bg-background/95 text-white shadow-lg backdrop-blur-md touch-manipulation transition-all duration-200 active:scale-95',
        'bottom-[calc(6.5rem+env(safe-area-inset-bottom))] lg:bottom-24',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
