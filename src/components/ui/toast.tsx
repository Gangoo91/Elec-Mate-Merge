import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { X, CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';

import { cn } from '@/lib/utils';

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'fixed left-1/2 -translate-x-1/2 z-[200] flex max-h-screen w-[calc(100%-2rem)] max-w-[420px] flex-col gap-2',
      className
    )}
    style={{
      top: 'calc(env(safe-area-inset-top, 0px) + 0.75rem)',
    }}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center gap-3 overflow-hidden rounded-2xl px-4 py-3.5 min-h-[64px] transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-top-full data-[state=open]:slide-in-from-top-full bg-zinc-900/95 backdrop-blur-xl border border-white/[0.07] border-l-[3px] text-white',
  {
    variants: {
      variant: {
        default:
          'border-l-zinc-400 shadow-[0_8px_32px_rgba(0,0,0,0.5)]',
        success:
          'border-l-emerald-400 shadow-[0_8px_32px_rgba(16,185,129,0.18)]',
        destructive:
          'border-l-red-400 shadow-[0_8px_32px_rgba(239,68,68,0.18)]',
        warning:
          'border-l-amber-400 shadow-[0_8px_32px_rgba(245,158,11,0.18)]',
        info:
          'border-l-blue-400 shadow-[0_8px_32px_rgba(59,130,246,0.18)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const iconMap = {
  destructive: XCircle,
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
  default: Info,
} as const;

const iconBubbleMap = {
  default: 'bg-white/10 text-white/80',
  success: 'bg-emerald-500/20 text-emerald-400',
  destructive: 'bg-red-500/20 text-red-400',
  warning: 'bg-amber-500/20 text-amber-400',
  info: 'bg-blue-500/20 text-blue-400',
} as const;

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, children, ...props }, ref) => {
  const Icon = iconMap[variant ?? 'default'];
  const bubbleClass = iconBubbleMap[variant ?? 'default'];

  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    >
      <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0', bubbleClass)}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0 pr-8">{children}</div>
    </ToastPrimitives.Root>
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'inline-flex h-11 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10 px-4 text-sm font-medium text-white transition-colors hover:bg-white/20 focus:outline-none disabled:pointer-events-none disabled:opacity-50 touch-manipulation',
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'absolute right-2 top-1/2 -translate-y-1/2 rounded-lg h-7 w-7 flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/10 transition-all touch-manipulation',
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-3.5 w-3.5" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('text-[14px] font-semibold text-white leading-snug', className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-[12px] text-white/55 leading-snug mt-0.5 line-clamp-2', className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
