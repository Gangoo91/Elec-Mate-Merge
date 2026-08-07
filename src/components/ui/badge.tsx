import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        // `yellow` and `success` were already being passed by the cash-flow
        // screens but did not exist here, so those badges silently fell back to
        // `default` and rendered grey where the code intended volt or green —
        // five type errors that had been sitting on HEAD.
        //
        // Volt is solid with black text. Never a translucent volt wash: every
        // partial-opacity value goes muddy brown on this ground (see
        // `card-recipe`).
        yellow: 'border-transparent bg-elec-yellow text-black hover:bg-elec-yellow/90',
        success: 'border-emerald-400/30 bg-emerald-500/15 text-emerald-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
