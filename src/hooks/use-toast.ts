/**
 * Shadcn toast API bridge → Sonner
 *
 * This file preserves the original `useToast()` / `toast()` API that 600+ files depend on,
 * but delegates all rendering to Sonner. The shadcn <Toaster /> is no longer needed in App.tsx.
 *
 * Usage stays the same:
 *   const { toast } = useToast();
 *   toast({ title: 'Saved', description: 'Your changes have been saved.', variant: 'success' });
 *
 * Or standalone:
 *   import { toast } from '@/hooks/use-toast';
 *   toast({ title: 'Error', variant: 'destructive' });
 */

import { toast as sonnerToast } from 'sonner';

type ToastVariant = 'default' | 'success' | 'destructive' | 'warning' | 'info';

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: React.ReactNode;
}

function toast({ title, description, variant = 'default', duration }: ToastOptions) {
  const opts = {
    description,
    ...(duration ? { duration } : {}),
  };

  switch (variant) {
    case 'success':
      sonnerToast.success(title ?? '', opts);
      break;
    case 'destructive':
      sonnerToast.error(title ?? '', opts);
      break;
    case 'warning':
      sonnerToast.warning(title ?? '', opts);
      break;
    case 'info':
      sonnerToast.info(title ?? '', opts);
      break;
    default:
      sonnerToast(title ?? '', opts);
      break;
  }
}

function useToast() {
  return { toast };
}

export { useToast, toast };
