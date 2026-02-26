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
      style={
        {
          '--offset': 'calc(env(safe-area-inset-top, 44px) + 2.5rem)',
          '--width': 'calc(100vw - 2rem)',
          '--max-width': '420px',
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
          toast:
            'group toast !rounded-2xl !border !border-white/[0.07] !border-l-[3px] !shadow-[0_8px_32px_rgba(0,0,0,0.5)] !px-4 !py-3.5 !min-h-[64px] !items-center !gap-3 !w-full !bg-zinc-900/95 !backdrop-blur-xl',
          title: '!text-white !font-semibold !text-[14px] !leading-snug',
          description: '!text-white/55 !text-[12px] !leading-snug !mt-0.5',
          success:
            '!border-l-emerald-400 !shadow-[0_8px_32px_rgba(16,185,129,0.18)]',
          error:
            '!border-l-red-400 !shadow-[0_8px_32px_rgba(239,68,68,0.18)]',
          warning:
            '!border-l-amber-400 !shadow-[0_8px_32px_rgba(245,158,11,0.18)]',
          info:
            '!border-l-blue-400 !shadow-[0_8px_32px_rgba(59,130,246,0.18)]',
          default: '!border-l-zinc-400',
          icon: 'self-center !w-8 !h-8 !mr-0',
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
