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
          '--offset': 'calc(env(safe-area-inset-top, 0px) + 0.75rem)',
          '--width': 'calc(100vw - 2rem)',
          '--max-width': '420px',
        } as React.CSSProperties
      }
      icons={{
        success: <CheckCircle2 className="w-5 h-5 text-white" />,
        error: <XCircle className="w-5 h-5 text-white" />,
        warning: <AlertTriangle className="w-5 h-5 text-white" />,
        info: <Info className="w-5 h-5 text-white" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            'group toast !rounded-2xl !border-0 !shadow-[0_8px_40px_rgba(0,0,0,0.35)] !px-4 !py-3.5 !min-h-[60px] !items-start !gap-3 !w-full',
          title: '!text-white !font-semibold !text-[14px] !leading-snug',
          description: '!text-white/80 !text-[12px] !leading-snug !mt-0.5',
          success: '!bg-emerald-600',
          error: '!bg-red-600',
          warning: '!bg-amber-500',
          info: '!bg-blue-600',
          default: '!bg-zinc-800 !border !border-white/10',
          icon: 'self-start mt-0.5',
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
