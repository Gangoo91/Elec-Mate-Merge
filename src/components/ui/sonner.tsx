/**
 * Sonner Toaster — best-in-class design, safe-area aware
 *
 * Position: top-center, sitting just below the iOS status bar / Dynamic Island.
 * Uses env(safe-area-inset-top) so toasts never overlap the time/battery.
 * Frosted glass dark design with coloured left accent per type.
 */

import { Toaster as Sonner, toast } from 'sonner';
import { CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      position="top-center"
      expand={false}
      closeButton={true}
      duration={4000}
      richColors={false}
      gap={8}
      // Sit just below the iOS status bar / Dynamic Island / notch.
      // env(safe-area-inset-top) = status bar height (44–59px on iPhone).
      // Extra 6px gives a small breathing gap below it.
      // NOTE: Sonner uses --mobile-offset-top on screens <600px (separate from --offset-top).
      // Both props must be set or the mobile override CSS variable stays at its default (0).
      offset="calc(env(safe-area-inset-top, 44px) + 6px)"
      mobileOffset="calc(env(safe-area-inset-top, 44px) + 6px)"
      swipeDirections={['up', 'right']}
      style={
        {
          '--width': 'min(calc(100vw - 2rem), 420px)',
          left: '50%',
          transform: 'translateX(-50%)',
        } as React.CSSProperties
      }
      icons={{
        success: (
          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-emerald-500/20 flex-shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
        ),
        error: (
          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-red-500/20 flex-shrink-0">
            <XCircle className="w-4 h-4 text-red-400" />
          </div>
        ),
        warning: (
          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-amber-500/20 flex-shrink-0">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
        ),
        info: (
          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-blue-500/20 flex-shrink-0">
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
