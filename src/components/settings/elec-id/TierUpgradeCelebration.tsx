import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Confetti, StarBurst } from '@/components/ui/confetti';
import { cn } from '@/lib/utils';

type VerificationTier = 'basic' | 'verified' | 'premium';

interface TierUpgradeCelebrationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  previousTier: VerificationTier;
  newTier: VerificationTier;
  onContinue: () => void;
}

const TIER_CONFIG: Record<
  VerificationTier,
  { label: string; color: string; benefits: string[] }
> = {
  basic: {
    label: 'Basic',
    color: 'text-white',
    benefits: ['Listed in Talent Pool', 'Profile visible to employers'],
  },
  verified: {
    label: 'Verified',
    color: 'text-blue-400',
    benefits: [
      'Verified badge on profile',
      'Priority in search results',
      'Employer notifications',
    ],
  },
  premium: {
    label: 'Premium',
    color: 'text-elec-yellow',
    benefits: [
      'Premium badge & top listing',
      'Instant employer alerts',
      'QR code verification',
      'Direct employer access',
    ],
  },
};

export function TierUpgradeCelebration({
  open,
  onOpenChange,
  previousTier,
  newTier,
  onContinue,
}: TierUpgradeCelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  const tier = TIER_CONFIG[newTier];

  useEffect(() => {
    if (open) {
      setAnimationStep(0);
      setShowConfetti(false);

      const confettiTimer = setTimeout(() => setShowConfetti(true), 300);
      const step1 = setTimeout(() => setAnimationStep(1), 400);
      const step2 = setTimeout(() => setAnimationStep(2), 800);
      const step3 = setTimeout(() => setAnimationStep(3), 1200);

      return () => {
        clearTimeout(confettiTimer);
        clearTimeout(step1);
        clearTimeout(step2);
        clearTimeout(step3);
      };
    }
  }, [open]);

  return (
    <>
      <Confetti active={showConfetti} duration={4000} particleCount={80} />

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
          <DialogHeader className="relative z-10 text-center pt-4">
            <div className="relative mx-auto mb-4">
              <div
                className={cn(
                  'relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 bg-white/[0.04] border border-white/[0.06]',
                  animationStep >= 1 ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                )}
              >
                <span
                  className={cn(
                    'text-3xl font-semibold transition-all duration-500',
                    tier.color,
                    animationStep >= 2 ? 'scale-100' : 'scale-0'
                  )}
                >
                  {tier.label.slice(0, 1)}
                </span>
                <StarBurst active={animationStep >= 2} count={12} />
              </div>
            </div>

            <DialogTitle className="text-2xl font-semibold text-white">
              <span
                className={cn(
                  'transition-all duration-500',
                  animationStep >= 2 ? 'opacity-100' : 'opacity-0'
                )}
              >
                Congratulations!
              </span>
            </DialogTitle>

            <p className="text-white mt-2">
              <span
                className={cn(
                  'transition-all duration-500',
                  animationStep >= 2 ? 'opacity-100' : 'opacity-0'
                )}
              >
                You've unlocked <span className={cn('font-semibold', tier.color)}>{tier.label}</span>{' '}
                status
              </span>
            </p>
          </DialogHeader>

          <div
            className={cn(
              'flex items-center justify-center gap-3 py-4 transition-all duration-500',
              animationStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <span
              className={cn(
                'inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full border bg-white/[0.04] border-white/[0.06]',
                TIER_CONFIG[previousTier].color
              )}
            >
              {TIER_CONFIG[previousTier].label}
            </span>
            <span aria-hidden className="text-white">
              →
            </span>
            <span
              className={cn(
                'inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full border animate-pulse',
                tier.color,
                newTier === 'premium'
                  ? 'bg-elec-yellow/10 border-elec-yellow/20'
                  : 'bg-blue-500/10 border-blue-500/20'
              )}
            >
              {tier.label}
            </span>
          </div>

          <div
            className={cn(
              'space-y-2 transition-all duration-500',
              animationStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <p className="text-sm font-medium text-center text-white mb-3">New benefits unlocked</p>
            <div className="space-y-2">
              {tier.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]"
                >
                  <span
                    aria-hidden
                    className={cn(
                      'inline-block h-2 w-2 rounded-full shrink-0',
                      newTier === 'premium' ? 'bg-elec-yellow' : 'bg-blue-400'
                    )}
                  />
                  <span className="text-sm text-white">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <Button
            className={cn(
              'w-full h-11 mt-4 rounded-xl font-semibold transition-all duration-500 touch-manipulation',
              newTier === 'premium'
                ? 'bg-elec-yellow hover:bg-elec-yellow/90 text-black'
                : 'bg-blue-500 hover:bg-blue-600 text-white',
              animationStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
            onClick={onContinue}
          >
            Continue
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TierUpgradeCelebration;
