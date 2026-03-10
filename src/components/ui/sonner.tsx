/**
 * Sonner Toaster — Elec-Mate branded
 *
 * Dark app-matched background, yellow accent for success/default,
 * type-specific left border, no close button.
 * Safe-area aware: clears iOS status bar on all viewports.
 */

import { Toaster as Sonner, toast } from 'sonner';
import { CheckCircle2, XCircle, AlertTriangle, Info, Zap } from 'lucide-react';

type ToasterProps = React.ComponentProps<typeof Sonner>;

// Elec-Mate brand yellow
const YELLOW = '#FFC800';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      position="top-center"
      expand={false}
      closeButton={false}
      duration={4000}
      richColors={false}
      gap={8}
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
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: 'rgba(255,200,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Zap style={{ width: 16, height: 16, color: YELLOW, fill: YELLOW }} />
          </div>
        ),
        error: (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: 'rgba(239,68,68,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <XCircle style={{ width: 16, height: 16, color: '#ef4444' }} />
          </div>
        ),
        warning: (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: 'rgba(245,158,11,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <AlertTriangle style={{ width: 16, height: 16, color: '#f59e0b' }} />
          </div>
        ),
        info: (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: 'rgba(59,130,246,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Info style={{ width: 16, height: 16, color: '#3b82f6' }} />
          </div>
        ),
      }}
      toastOptions={{
        style: {
          background: 'rgba(18, 18, 30, 0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderLeft: `3px solid ${YELLOW}`,
          borderRadius: 16,
          padding: '12px 16px',
          minHeight: 64,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
          color: '#ffffff',
          width: '100%',
          opacity: 1,
        },
        classNames: {
          title: '!text-white !font-semibold !text-[14px] !leading-snug',
          description: '!text-white/60 !text-[12px] !leading-snug !mt-0.5',
          // Type-specific left border colours
          error: '!border-l-[#ef4444]',
          warning: '!border-l-[#f59e0b]',
          info: '!border-l-[#3b82f6]',
          icon: '!self-center !shrink-0',
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
