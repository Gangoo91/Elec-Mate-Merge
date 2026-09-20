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

/** A button on the toast — Sonner's own shape, e.g. `{ label: 'Undo', onClick }`. */
export interface ToastActionSpec {
  label: string;
  onClick: () => void;
}

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  /**
   * `{ label, onClick }` is forwarded to Sonner and renders a button.
   *
   * A React element is still accepted for the two legacy callers that pass a
   * Radix `<ToastAction>`, but it is NOT forwarded: there is no Radix toast
   * provider mounted, so rendering it would throw. (It never rendered before
   * either — this option was silently dropped.)
   */
  action?: React.ReactNode | ToastActionSpec;
}

const isActionSpec = (a: ToastOptions['action']): a is ToastActionSpec =>
  !!a && typeof a === 'object' && 'label' in a && 'onClick' in a;

function toast({ title, description, variant = 'default', duration, action }: ToastOptions) {
  const opts = {
    description,
    ...(duration ? { duration } : {}),
    ...(isActionSpec(action) ? { action } : {}),
  };

  // Sonner returns the toast id, so a caller can take a toast down early —
  // the calendar's "Moved to…" toast is dismissed when its move is undone.
  switch (variant) {
    case 'success':
      return sonnerToast.success(title ?? '', opts);
    case 'destructive':
      return sonnerToast.error(title ?? '', opts);
    case 'warning':
      return sonnerToast.warning(title ?? '', opts);
    case 'info':
      return sonnerToast.info(title ?? '', opts);
    default:
      return sonnerToast(title ?? '', opts);
  }
}

function dismiss(id?: string | number) {
  sonnerToast.dismiss(id);
}

function useToast() {
  return { toast, dismiss };
}

export { useToast, toast, dismiss };
