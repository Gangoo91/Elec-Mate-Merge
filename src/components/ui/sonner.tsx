import { useTheme } from 'next-themes';
import { Toaster as Sonner, toast } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      position="top-center"
      expand={false}
      closeButton
      duration={3000}
      richColors
      style={
        {
          // Push toasts below the native status bar / Android spacer
          '--offset':
            'calc(1rem + var(--native-header-offset, 0px) + env(safe-area-inset-top, 0px))',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-zinc-900/95 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-white group-[.toaster]:border group-[.toaster]:border-white/10 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl',
          description: 'group-[.toast]:text-white',
          actionButton:
            'group-[.toast]:bg-elec-yellow group-[.toast]:text-black group-[.toast]:font-medium group-[.toast]:h-11 group-[.toast]:touch-manipulation',
          cancelButton:
            'group-[.toast]:bg-white/5 group-[.toast]:text-white group-[.toast]:border group-[.toast]:border-white/10 group-[.toast]:h-11 group-[.toast]:touch-manipulation',
          closeButton:
            'group-[.toast]:text-white group-[.toast]:hover:bg-white/10 group-[.toast]:touch-manipulation',
          success: 'group-[.toaster]:border-elec-yellow/30',
          error: 'group-[.toaster]:border-red-500/30',
          warning: 'group-[.toaster]:border-amber-500/30',
          info: 'group-[.toaster]:border-blue-500/30',
        },
        style: {
          opacity: 1,
          backdropFilter: 'blur(16px)',
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
