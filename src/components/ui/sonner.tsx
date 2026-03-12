/**
 * Sonner Toaster — Elec-Mate premium design
 *
 * Dark zinc (no blue tint), thick yellow left accent with glow,
 * no icon, no close button. Safe-area aware.
 */

import { Toaster as Sonner, toast } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

// Shared base style — zinc-900 background, no blue tint
const baseStyle: React.CSSProperties = {
  background: 'rgba(24, 24, 27, 0.97)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderLeft: '4px solid #FFC800',
  borderRadius: 14,
  padding: '13px 14px',
  minHeight: 62,
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  // Yellow left glow — makes the accent pop
  boxShadow:
    '0 0 0 1px rgba(255,200,0,0.05), -6px 0 24px rgba(255,200,0,0.14), 0 20px 60px rgba(0,0,0,0.65)',
  color: '#ffffff',
  width: '100%',
  opacity: 1,
};

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
        success: <span />,
        error: <span />,
        warning: <span />,
        info: <span />,
      }}
      toastOptions={{
        style: baseStyle,
        classNames: {
          title: '!text-white !font-semibold !text-[15px] !leading-snug',
          description: '!text-white/60 !text-[13px] !leading-snug !mt-0.5',
          icon: '!hidden',
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
