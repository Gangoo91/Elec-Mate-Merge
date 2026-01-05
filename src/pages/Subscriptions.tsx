import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Zap, Shield, CreditCard, Clock, Star, Users } from "lucide-react";
import SubscriptionStatus from "@/components/subscriptions/SubscriptionStatus";
import PlanSelection from "@/components/subscriptions/PlanSelection";
import SubscriptionFAQ from "@/components/subscriptions/SubscriptionFAQ";
import SupportSection from "@/components/subscriptions/SupportSection";
import FeatureComparison from "@/components/subscriptions/FeatureComparison";

const Subscriptions = () => {
  const { checkSubscriptionStatus, isSubscribed } = useAuth();

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/5 via-transparent to-elec-dark/50" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-elec-yellow/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl" />

        <div className="relative z-10 text-center pt-8 md:pt-12 pb-8 px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-6">
            <Zap className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm text-elec-yellow font-medium">Power Up Your Career</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white">
            Simple, Transparent
            <span className="block text-elec-yellow">Pricing</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Everything you need to succeed in your electrical career.
            No hidden fees, cancel anytime.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 md:gap-8">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-sm text-white/80">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
              <CreditCard className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm text-white/80">Cancel Anytime</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-white/80">Instant Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 max-w-7xl mx-auto pb-16 space-y-16">
        {/* Current Subscription Status */}
        {isSubscribed && (
          <section>
            <SubscriptionStatus />
          </section>
        )}

        {/* Plan Selection */}
        <section>
          <PlanSelection />
        </section>

        {/* Social Proof */}
        <section className="py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-elec-yellow mb-1">5,000+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-elec-yellow mb-1">4.9</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <Star className="h-3 w-3 fill-elec-yellow text-elec-yellow" />
                Rating
              </div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-elec-yellow mb-1">500+</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <Users className="h-3 w-3" />
                Companies
              </div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-elec-yellow mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section>
          <FeatureComparison />
        </section>

        {/* FAQ Section */}
        <section>
          <SubscriptionFAQ />
        </section>

        {/* Support Section */}
        <section>
          <SupportSection />
        </section>

        {/* Money Back Guarantee */}
        <section className="text-center py-8">
          <div className="inline-flex flex-col items-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
              <Shield className="h-8 w-8 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">30-Day Money Back Guarantee</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Not satisfied? Get a full refund within 30 days, no questions asked.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Subscriptions;
