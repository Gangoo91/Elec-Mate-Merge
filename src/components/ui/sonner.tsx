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
      duration={3500}
      richColors={false}
      gap={8}
      offset={0}
      swipeDirections={['up', 'right']}
      style={
        {
          '--offset': 'calc(env(safe-area-inset-top, 0px) + 2.5rem)',
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
          toast:
            'group toast !rounded-2xl !border !border-white/10 !border-l-[3px] !ring-1 !ring-inset !ring-white/[0.05] !shadow-[0_8px_32px_rgba(0,0,0,0.5)] !px-4 !py-3.5 !min-h-[68px] !items-center !gap-3 !w-full !bg-[#1a1a2e]/95 !backdrop-blur-xl',
          title: '!text-white !font-semibold !text-[14px] !leading-snug',
          description: '!text-white !text-[12px] !leading-snug !mt-0.5',
          success: '!border-l-emerald-500 !shadow-[0_8px_32px_rgba(16,185,129,0.25)]',
          error: '!border-l-red-500 !shadow-[0_8px_32px_rgba(239,68,68,0.25)]',
          warning: '!border-l-amber-500 !shadow-[0_8px_32px_rgba(245,158,11,0.25)]',
          info: '!border-l-blue-500 !shadow-[0_8px_32px_rgba(59,130,246,0.25)]',
          default: '!border-l-zinc-400',
          icon: 'self-center !w-8 !h-8 !mr-0',
          closeButton:
            '!bg-white/15 !border-white/10 !text-white hover:!bg-white/25 !rounded-full !w-7 !h-7 !top-1.5 !right-1.5',
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
