import { useTheme } from 'next-themes';
import { Toaster as Sonner, toast } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      position="bottom-center"
      expand={false}
      closeButton={false}
      duration={3500}
      richColors
      style={
        {
          '--offset': 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
          '--width': 'calc(100vw - 2rem)',
          '--max-width': '400px',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-zinc-900 group-[.toaster]:backdrop-blur-2xl group-[.toaster]:text-white group-[.toaster]:border group-[.toaster]:border-white/10 group-[.toaster]:shadow-[0_8px_32px_rgba(0,0,0,0.4)] group-[.toaster]:rounded-2xl group-[.toaster]:px-4 group-[.toaster]:py-3.5',
          title: 'group-[.toast]:text-white group-[.toast]:font-semibold group-[.toast]:text-sm',
          description: 'group-[.toast]:text-white/60 group-[.toast]:text-xs group-[.toast]:mt-0.5',
          actionButton:
            'group-[.toast]:bg-elec-yellow group-[.toast]:text-black group-[.toast]:font-semibold group-[.toast]:rounded-xl group-[.toast]:h-9 group-[.toast]:px-4 group-[.toast]:text-sm group-[.toast]:touch-manipulation',
          cancelButton:
            'group-[.toast]:bg-white/5 group-[.toast]:text-white/70 group-[.toast]:border group-[.toast]:border-white/10 group-[.toast]:rounded-xl group-[.toast]:h-9 group-[.toast]:px-4 group-[.toast]:text-sm group-[.toast]:touch-manipulation',
          success:
            'group-[.toaster]:border-elec-yellow/40 group-[.toaster]:bg-zinc-900',
          error:
            'group-[.toaster]:border-red-500/40 group-[.toaster]:bg-zinc-900',
          warning:
            'group-[.toaster]:border-amber-500/40 group-[.toaster]:bg-zinc-900',
          info:
            'group-[.toaster]:border-blue-400/40 group-[.toaster]:bg-zinc-900',
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
