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
      closeButton={false}
      duration={3500}
      richColors={false}
      gap={8}
      offset={0}
      swipeDirections={['up', 'right']}
      style={
        {
          '--offset': 'calc(env(safe-area-inset-top, 0px) + 8px)',
          '--width': 'min(calc(100vw - 2rem), 380px)',
          left: '50%',
          transform: 'translateX(-50%)',
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
          toast:
            'group toast !rounded-2xl !border !border-white/15 !border-l-[3px] !shadow-[0_4px_24px_rgba(0,0,0,0.4)] !px-4 !py-3 !min-h-[52px] !items-center !gap-3 !w-full !bg-white/[0.12] !backdrop-blur-xl',
          title: '!text-white !font-semibold !text-[13px] !leading-snug',
          description: '!text-white !text-[12px] !leading-snug !mt-0.5',
          success: '!border-l-emerald-500 !shadow-[0_4px_24px_rgba(16,185,129,0.15)]',
          error: '!border-l-red-500 !shadow-[0_4px_24px_rgba(239,68,68,0.15)]',
          warning: '!border-l-amber-500 !shadow-[0_4px_24px_rgba(245,158,11,0.15)]',
          info: '!border-l-blue-500 !shadow-[0_4px_24px_rgba(59,130,246,0.15)]',
          default: '!border-l-zinc-500',
          icon: 'self-center !w-7 !h-7 !mr-0',
        },
        style: {
          opacity: 1,
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
