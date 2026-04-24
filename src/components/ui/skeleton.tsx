import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

// forwardRef so framer-motion's AnimatePresence can measure the element when
// it's rendered as a direct child (otherwise React logs a "Function components
// cannot be given refs" warning during the exit animation).
const Skeleton = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  )
);
Skeleton.displayName = 'Skeleton';

export { Skeleton };
