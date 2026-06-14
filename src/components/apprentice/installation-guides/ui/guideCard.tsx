/**
 * guideCard — editorial re-skin of the shadcn Card for the installation guides.
 *
 * Same exported API as `@/components/ui/card` (Card, CardHeader, CardContent,
 * CardTitle, CardDescription, CardFooter), so a single import swap on a panel
 * re-skins ALL of its cards to the apprentice-hub editorial language at once —
 * neutral hsl surfaces, white/[0.08] hairline borders, rounded-2xl, no gradient
 * chrome. The rainbow `variant` values collapse to the neutral surface; only
 * `highlight` is honoured, mapped to the house elec-yellow emphasis. `variant`
 * and `interactive` props are still accepted so existing call sites type-check.
 */
import * as React from 'react';
import { cn } from '@/lib/utils';

// The sub-components are already neutral (padding + white text) — reuse them.
export {
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

interface GuideCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: string;
  interactive?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, GuideCardProps>(
  ({ className, variant, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl border overflow-hidden transition-colors',
        variant === 'highlight'
          ? 'border-elec-yellow/25 bg-elec-yellow/[0.05]'
          : 'border-white/[0.08] bg-[hsl(0_0%_10%)]',
        interactive &&
          'cursor-pointer touch-manipulation hover:border-white/[0.18] active:scale-[0.99]',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'GuideCard';

export { Card };
