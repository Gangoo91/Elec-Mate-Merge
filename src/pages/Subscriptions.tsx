import { Zap, Shield, Clock, Sparkles, CheckCircle2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SubscriptionStatus from "@/components/subscriptions/SubscriptionStatus";
import PlanSelection from "@/components/subscriptions/PlanSelection";
import SubscriptionFAQ from "@/components/subscriptions/SubscriptionFAQ";
import SupportSection from "@/components/subscriptions/SupportSection";
import FeatureComparison from "@/components/subscriptions/FeatureComparison";

// Value propositions for hero
const valueProps = [
  { icon: Zap, text: "AI-Powered Tools", color: "from-yellow-500 to-amber-500" },
  { icon: Shield, text: "BS7671 Compliant", color: "from-green-500 to-emerald-500" },
  { icon: Clock, text: "Save 10+ Hours/Week", color: "from-blue-500 to-cyan-500" },
];

// Note: Subscription status is automatically checked by useSubscriptionStatus hook when profile loads
// No need to call checkSubscriptionStatus here - it would cause duplicate API calls and re-renders

const Subscriptions = () => {

  return (
    <div className="animate-fade-in relative">
      {/* Back Button */}
      <div className="relative z-20 px-4 pt-4">
        <Link to="/dashboard">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] active:scale-[0.98] -ml-2 h-11 touch-manipulation transition-all"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-elec-yellow/[0.05] via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-elec-yellow/10 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="text-center pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
            bg-gradient-to-r from-elec-yellow/20 to-elec-yellow/10
            border border-elec-yellow/40 mb-4 sm:mb-6
            backdrop-blur-xl shadow-lg shadow-elec-yellow/10"
          >
            <Sparkles className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-semibold bg-gradient-to-r from-elec-yellow to-amber-400 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 sm:mb-4 leading-[1.1]">
            <span className="text-white">Power Up Your</span>
            <br />
            <span className="bg-gradient-to-r from-elec-yellow via-yellow-400 to-amber-400 bg-clip-text text-transparent">
              Electrical Career
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-xl mx-auto mb-5 sm:mb-6 leading-relaxed">
            Everything you need to succeed. No hidden fees.
            <span className="hidden sm:inline"> Cancel anytime.</span>
          </p>

          {/* Value Props */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-5 sm:mb-6">
            {valueProps.map((prop, i) => (
              <div
                key={i}
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full
                  bg-gradient-to-br from-white/[0.08] to-white/[0.02]
                  border border-white/10 backdrop-blur-sm
                  hover:border-white/20 hover:bg-white/[0.1]
                  transition-all duration-300"
              >
                <div className={`p-1 rounded-full bg-gradient-to-br ${prop.color}`}>
                  <prop.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  {prop.text}
                </span>
              </div>
            ))}
          </div>

          {/* Subscription Status Badge */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <SubscriptionStatus />
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            {[
              { text: "Secure Payment" },
              { text: "Cancel Anytime" },
              { text: "Instant Access" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/60">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span className="text-xs sm:text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 max-w-6xl mx-auto pb-16 space-y-12 sm:space-y-16">
        {/* Plan Selection */}
        <section>
          <PlanSelection />
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
        <section className="text-center py-6 sm:py-8">
          <div className="group inline-flex flex-col items-center gap-4 p-6 sm:p-8 rounded-3xl
            bg-gradient-to-br from-green-500/15 via-green-500/5 to-transparent
            border border-green-500/20 backdrop-blur-xl max-w-md mx-auto
            hover:border-green-500/30 hover:shadow-xl hover:shadow-green-500/10
            transition-all duration-500"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-green-500/30 to-green-500/10 flex items-center justify-center
              group-hover:scale-110 transition-transform duration-500">
              <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">30-Day Money Back Guarantee</h3>
              <p className="text-sm text-white/70 leading-relaxed">
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
