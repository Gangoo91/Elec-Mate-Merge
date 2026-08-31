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
import { CARD_SURFACE } from '@/components/ui/card-recipe';

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
        /*
         * The surface was `bg-[hsl(0_0%_10%)]` — one point darker than the
         * 11%-lightness page behind it, so a panel read as a slightly different
         * shade of black rather than as a panel. That is the "page back is very
         * dark" complaint. It now uses the same lit ramp as every card in the
         * app (`card-recipe.ts`): a diagonal white-alpha gradient with an inset
         * top highlight, so a panel looks lit from the top-left.
         *
         * `highlight` keeps the volt EDGE and takes the same neutral surface —
         * a translucent volt FILL goes muddy brown on this ground.
         */
        /*
         * `plain` is the section wrapper: no surface, no border, no padding —
         * just a grouping element. Panels use it for the outer block that holds
         * a heading and a grid, so the grid items are the only boxes on screen
         * instead of boxes inside a box. Note it cannot be done from the call
         * site with `bg-transparent`: the surface is a background-IMAGE
         * gradient, and a background-COLOR utility does not override it.
         */
        variant === 'plain'
          ? 'border-0 bg-none shadow-none'
          : cn(
              CARD_SURFACE,
              variant === 'highlight' ? 'border-elec-yellow/50' : 'border-white/[0.12]'
            ),
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
