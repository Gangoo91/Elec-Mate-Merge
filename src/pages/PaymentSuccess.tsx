import { CheckCircle, ArrowRight, Zap, Shield, BookOpen, Wrench, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

// Plan display info
const planInfo: Record<string, { name: string; icon: React.ElementType; color: string; features: string[] }> = {
  'electrician-monthly': {
    name: 'Electrician Pro',
    icon: Zap,
    color: 'from-yellow-500 to-amber-500',
    features: ['Unlimited certificates', 'AI tools & calculators', 'Invoice management', 'Cloud storage']
  },
  'electrician-annual': {
    name: 'Electrician Pro',
    icon: Zap,
    color: 'from-yellow-500 to-amber-500',
    features: ['Unlimited certificates', 'AI tools & calculators', 'Invoice management', 'Cloud storage']
  },
  'apprentice-monthly': {
    name: 'Apprentice',
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500',
    features: ['Full study centre access', 'Practice exams', 'Progress tracking', 'Tutor support']
  },
  'apprentice-annual': {
    name: 'Apprentice',
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500',
    features: ['Full study centre access', 'Practice exams', 'Progress tracking', 'Tutor support']
  },
  'contractor-monthly': {
    name: 'Contractor',
    icon: Wrench,
    color: 'from-purple-500 to-pink-500',
    features: ['Team management', 'Multi-user access', 'Advanced reporting', 'Priority support']
  },
  'contractor-annual': {
    name: 'Contractor',
    icon: Wrench,
    color: 'from-purple-500 to-pink-500',
    features: ['Team management', 'Multi-user access', 'Advanced reporting', 'Priority support']
  },
};

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const planId = searchParams.get("plan") || 'electrician-monthly';
  const { checkSubscriptionStatus } = useAuth();
  const [showContent, setShowContent] = useState(false);

  const plan = planInfo[planId] || planInfo['electrician-monthly'];
  const PlanIcon = plan.icon;

  // Update subscription status when payment completes
  useEffect(() => {
    // Give Stripe some time to process the payment before checking
    const timer = setTimeout(() => {
      checkSubscriptionStatus();
    }, 2000);

    // Delay content reveal for animation
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    return () => {
      clearTimeout(timer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10">
        <div className="w-full max-w-lg">
          {/* Success Icon with animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                <CheckCircle className="h-12 w-12 sm:h-14 sm:w-14 text-white" strokeWidth={2.5} />
              </div>
              {/* Sparkle decorations */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="h-6 w-6 text-yellow-400" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="absolute -bottom-1 -left-3"
              >
                <Sparkles className="h-5 w-5 text-green-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Welcome to Elec-Mate!
            </h1>
            <p className="text-white/60 text-[15px] sm:text-base">
              Your <span className="text-white font-medium">{plan.name}</span> subscription is now active
            </p>
          </motion.div>

          {/* Plan Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`rounded-2xl bg-gradient-to-br ${plan.color} p-[1px] mb-6`}
          >
            <div className="rounded-2xl bg-slate-900/95 p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                  <PlanIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-white">{plan.name} Plan</h3>
                  <p className="text-[12px] text-green-400 flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Subscription active
                  </p>
                </div>
              </div>

              {/* Features list */}
              <div className="grid grid-cols-2 gap-2">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[13px] text-white/70">
                    <CheckCircle className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            <Button
              asChild
              className="w-full h-12 text-[15px] font-medium bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg shadow-green-500/20"
            >
              <Link to="/">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              variant="outline"
              asChild
              className="w-full h-11 text-[14px] bg-white/[0.03] border-white/10 hover:bg-white/[0.06] text-white/80 rounded-xl"
            >
              <Link to="/settings">
                Manage Subscription
              </Link>
            </Button>
          </motion.div>

          {/* Help text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-6 space-y-2"
          >
            <p className="text-[12px] text-white/40">
              A confirmation email has been sent to your inbox.
            </p>
            <p className="text-[12px] text-white/40">
              Need help? Email{' '}
              <a href="mailto:info@elec-mate.com" className="text-white/60 hover:text-white underline">
                info@elec-mate.com
              </a>
              {' '}or use the chat icon in the top right corner.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
