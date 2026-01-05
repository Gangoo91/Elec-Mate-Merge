import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import {
  Zap,
  Clock,
  Lock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  BookOpen,
  ClipboardCheck,
  Calculator
} from 'lucide-react';

const TrialExpiredPaywall = () => {
  const navigate = useNavigate();
  const { trialEndsAt, signOut } = useAuth();

  const features = [
    { icon: BookOpen, label: 'Study Centre & Training Materials' },
    { icon: ClipboardCheck, label: 'Inspection & Testing Tools' },
    { icon: Calculator, label: 'Electrical Calculators' },
    { icon: Shield, label: 'BS7671 Compliance Resources' },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-card rounded-full blur-[120px] opacity-20 pointer-events-none" />

      {/* Header */}
      <header className="relative w-full px-4 pt-6 pb-4 sm:pt-8">
        <div className="flex items-center justify-center gap-2">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-yellow-400 flex items-center justify-center">
            <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-white">
            Elec-<span className="text-yellow-400">Mate</span>
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-4 pb-8">
        <div className="w-full max-w-md animate-fade-in">
          {/* Trial Ended Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30 flex items-center justify-center">
                <Clock className="h-10 w-10 text-amber-400" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                <Lock className="h-4 w-4 text-red-400" />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-white">
              Your Free Trial Has Ended
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-sm mx-auto">
              Your 7-day free trial expired
              {trialEndsAt && (
                <span className="text-amber-400">
                  {' '}on {new Date(trialEndsAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              )}
              . Subscribe to continue using Elec-Mate.
            </p>
          </div>

          {/* Locked Features Card */}
          <Card className="border-white/10 bg-neutral-900/80 backdrop-blur-xl shadow-xl mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium text-white/80">You had access to:</span>
              </div>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/5">
                    <div className="p-1.5 rounded-lg bg-yellow-400/10 border border-yellow-400/20">
                      <feature.icon className="h-4 w-4 text-yellow-400" />
                    </div>
                    <span className="text-sm text-white/70">{feature.label}</span>
                    <Lock className="h-3.5 w-3.5 text-white/30 ml-auto" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Button
              className="w-full h-12 text-base font-semibold bg-yellow-400 hover:bg-yellow-300 text-black transition-all duration-200 hover:scale-[1.02]"
              onClick={() => navigate('/subscriptions')}
            >
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Subscribe Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              className="w-full h-11 border-white/10 hover:bg-white/5 text-white/70 hover:text-white transition-all"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </div>

          {/* Reassurance */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-green-500" />
                Cancel anytime
              </span>
              <span>30-day money back</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrialExpiredPaywall;
