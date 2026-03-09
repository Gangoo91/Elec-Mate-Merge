/**
 * Sonner Toaster — best-in-class native mobile design
 *
 * - Bottom-center on mobile (matches native iOS/Android UX patterns)
 * - Top-right on desktop (conventional web placement)
 * - Full safe-area awareness: env(safe-area-inset-bottom/top) so toasts
 *   never overlap the Dynamic Island, notch, or home indicator
 * - Frosted glass dark design with coloured left accent per type
 * - Swipe-down on mobile to dismiss
 */

import { useEffect, useState } from 'react';
import { Toaster as Sonner, toast } from 'sonner';
import { CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : true
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(!e.matches);
    mq.addEventListener('change', handler);
    setIsMobile(!mq.matches);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const position = isMobile ? 'bottom-center' : 'top-right';

  // On mobile: sit just above the home indicator / bottom bar
  // On desktop: sit just below the nav bar / top edge with some breathing room
  const offset = isMobile
    ? 'calc(env(safe-area-inset-bottom, 0px) + 8px)'
    : 'calc(env(safe-area-inset-top, 0px) + 16px)';

  return (
    <Sonner
      theme="dark"
      className="toaster group"
      position={position}
      expand={false}
      closeButton={true}
      duration={4000}
      richColors={false}
      gap={8}
      offset={offset}
      swipeDirections={isMobile ? ['down'] : ['right']}
      style={
        {
          '--width': isMobile ? 'calc(100vw - 2rem)' : 'min(420px, calc(100vw - 2rem))',
          // On desktop, pin to the right edge with some padding
          ...(!isMobile && { right: '1rem', left: 'auto', transform: 'none' }),
        } as React.CSSProperties
      }
      icons={{
        success: (
          <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-emerald-500/20 flex-shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
        ),
        error: (
          <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-red-500/20 flex-shrink-0">
            <XCircle className="w-4 h-4 text-red-400" />
          </div>
        ),
        warning: (
          <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-amber-500/20 flex-shrink-0">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
        ),
        info: (
          <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-blue-500/20 flex-shrink-0">
            <Info className="w-4 h-4 text-blue-400" />
          </div>
        ),
      }}
      toastOptions={{
        classNames: {
          toast: [
            'group toast',
            '!rounded-2xl !border !border-white/10 !border-l-[3px]',
            '!ring-1 !ring-inset !ring-white/[0.04]',
            '!shadow-[0_8px_40px_rgba(0,0,0,0.6),0_2px_8px_rgba(0,0,0,0.4)]',
            '!px-4 !py-3.5 !min-h-[64px] !items-center !gap-3 !w-full',
            // Frosted glass — darker on mobile for legibility over app content
            '!bg-[#141420]/96 !backdrop-blur-2xl',
          ].join(' '),
          title: '!text-white !font-semibold !text-[14px] !leading-snug',
          description: '!text-white/70 !text-[12px] !leading-snug !mt-0.5',
          success:
            '!border-l-emerald-500 !shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(16,185,129,0.15)]',
          error:
            '!border-l-red-500 !shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(239,68,68,0.15)]',
          warning:
            '!border-l-amber-500 !shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(245,158,11,0.15)]',
          info: '!border-l-blue-500 !shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(59,130,246,0.15)]',
          default: '!border-l-white/20',
          icon: 'self-center !w-8 !h-8 !mr-0 !flex-shrink-0',
          closeButton:
            '!bg-white/10 !border-white/10 !text-white/60 hover:!bg-white/20 hover:!text-white !rounded-full !w-6 !h-6 !top-2 !right-2 !transition-colors',
        },
        style: { opacity: 1 },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
