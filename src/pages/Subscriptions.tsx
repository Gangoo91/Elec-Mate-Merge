import { ArrowLeft, Lock, RotateCcw, Zap, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SubscriptionStatus from '@/components/subscriptions/SubscriptionStatus';
import PlanSelection from '@/components/subscriptions/PlanSelection';
import SubscriptionFAQ from '@/components/subscriptions/SubscriptionFAQ';
import SupportSection from '@/components/subscriptions/SupportSection';
import FeatureComparison from '@/components/subscriptions/FeatureComparison';
import { useRevenueCat } from '@/hooks/useRevenueCat';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Capacitor } from '@capacitor/core';

const Subscriptions = () => {
  const { user } = useAuth();
  const { isNative, restorePurchases, isPurchasing } = useRevenueCat(user?.id);
  const { toast } = useToast();

  const handleRestore = async () => {
    const restored = await restorePurchases();
    toast({
      title: restored ? 'Purchases restored' : 'No purchases found',
      description: restored
        ? 'Your subscription has been restored successfully.'
        : "We couldn't find any previous purchases for this account.",
      variant: restored ? 'default' : 'destructive',
    });
  };

  const trustItems = [
    {
      icon: Lock,
      text: isNative
        ? `Secure payment via ${Capacitor.getPlatform() === 'ios' ? 'Apple' : 'Google Play'}`
        : 'Secure payment via Stripe',
    },
    { icon: RotateCcw, text: 'Cancel anytime' },
    { icon: Zap, text: 'Instant access' },
  ];

  return (
    <div className="animate-fade-in relative min-h-screen">
      {/* Ambient background — subtle gradient only */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-elec-yellow/[0.03] via-transparent to-transparent" />
      </div>

      {/* Top bar */}
      <div className="relative z-20 px-4 pt-4 pb-2">
        <Link to="/dashboard">
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] active:scale-[0.98] -ml-2 h-11 touch-manipulation transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center px-4 pt-2 pb-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Choose your plan
        </h1>
        <p className="text-sm text-white mt-1.5">7-day free trial on all plans. Cancel anytime.</p>
        <div className="flex justify-center mt-3">
          <SubscriptionStatus />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 max-w-5xl mx-auto pb-20 space-y-8 sm:space-y-10">
        {/* Plans */}
        <section>
          <PlanSelection />
        </section>

        {/* Trust strip — platform-aware */}
        <section>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 sm:gap-x-8">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-white">
                <item.icon className="h-3.5 w-3.5" />
                <span className="text-xs">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Restore Purchases — native only (required by Apple) */}
        {isNative && (
          <section className="flex justify-center -mt-4">
            <Button
              variant="ghost"
              onClick={handleRestore}
              disabled={isPurchasing}
              className="text-sm text-white hover:text-white hover:bg-white/5 h-11 touch-manipulation"
            >
              {isPurchasing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Restoring...
                </>
              ) : (
                <>
                  <RotateCcw className="mr-2 h-4 w-4" /> Restore Purchases
                </>
              )}
            </Button>
          </section>
        )}

        {/* Feature comparison */}
        <section>
          <FeatureComparison />
        </section>

        {/* FAQ */}
        <section>
          <SubscriptionFAQ />
        </section>

        {/* Support */}
        <section>
          <SupportSection />
        </section>
      </div>
    </div>
  );
};

export default Subscriptions;
