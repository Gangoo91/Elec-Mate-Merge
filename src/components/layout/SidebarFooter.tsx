/**
 * Sidebar footer — the subscription state, and the upgrade prompt when there
 * isn't one.
 *
 * Three things were wrong with what this replaced:
 *
 *   IT PRINTED THE DATABASE. `{subscriptionTier || 'Pro'}` rendered
 *   `profiles.subscription_tier` raw, and that column is not a label — it holds
 *   `employer`, `electrician_yearly`, `Electrician`, `apprentice`, `founder`
 *   and null, with the casing inconsistent between rows written by different
 *   code paths. So the badge said "employer" in lower case to sixty-one people
 *   and "electrician_yearly" to ten. TIER_LABELS normalises before display.
 *
 *   IT WAS GREEN. A green card with a green crown and green text, in an app
 *   whose accent is volt. Nothing else in the product is green, so the one
 *   element that says "you are a paying customer" looked like it belonged to a
 *   different product.
 *
 *   THE VOLT WAS A WASH. The upgrade variant used `bg-elec-yellow/10` behind
 *   `bg-elec-yellow/20` — translucent volt over near-black, which is the exact
 *   thing that goes muddy brown. Volt fills are solid or they are text.
 *
 * Both states are now built from the shared card recipe, so the last thing in
 * the sidebar is made of the same material as everything it sits under.
 */
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Crown, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

/**
 * `subscription_tier` values seen in production, mapped to something a
 * customer should read. Keyed lower-case because the same tier is stored both
 * capitalised and not.
 */
const TIER_LABELS: Record<string, string> = {
  electrician: 'Electrician',
  electrician_yearly: 'Electrician · yearly',
  apprentice: 'Apprentice',
  apprentice_yearly: 'Apprentice · yearly',
  employer: 'Employer',
  founder: 'Founder',
};

/** Falls back to "Pro" rather than showing an unmapped slug to a customer. */
function tierLabel(tier?: string | null): string {
  if (!tier) return 'Pro';
  return TIER_LABELS[tier.trim().toLowerCase()] ?? 'Pro';
}

const SidebarFooter = () => {
  const { isTrialActive, isSubscribed, profile, subscriptionTier } = useAuth();

  // For production, remove the "true ||" to restore conditional visibility
  const showUpgradeButton = (isTrialActive || !isSubscribed) && profile;

  if (!profile) {
    return null;
  }

  if (isSubscribed) {
    return (
      <div
        className="border-t border-white/10 p-3"
        style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <div
          className={cn(
            'relative flex items-center gap-3 overflow-hidden rounded-xl border border-elec-yellow/35 px-3 py-2.5',
            CARD_SURFACE
          )}
        >
          {/* The same volt hairline every card in the app now carries. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/55 to-elec-yellow/0"
          />
          <Crown className="h-[18px] w-[18px] shrink-0 text-elec-yellow" aria-hidden />
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold leading-tight text-white">
              {tierLabel(subscriptionTier)}
            </p>
            <p className="mt-0.5 truncate text-[11px] leading-tight text-white">
              Active subscription
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!showUpgradeButton) {
    return null;
  }

  return (
    <div
      className="border-t border-white/10 p-3"
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-xl border border-elec-yellow/35 p-3',
          CARD_SURFACE
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/55 to-elec-yellow/0"
        />
        <p className="text-[13px] font-semibold leading-tight text-white">Upgrade to Pro</p>
        <p className="mt-0.5 text-[11px] leading-tight text-white">Unlock every tool</p>

        {/* Solid volt, not a two-stop gradient into amber — and h-11 so it
            clears the 44px touch target the rest of the app holds to. */}
        <Button
          asChild
          className="mt-2.5 h-11 w-full rounded-lg bg-elec-yellow font-semibold text-black hover:bg-elec-yellow/90 active:bg-elec-yellow/85"
        >
          <Link to="/subscriptions" className="flex items-center justify-center gap-1.5">
            <Star className="h-4 w-4" />
            <span className="text-sm">Upgrade</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SidebarFooter;
