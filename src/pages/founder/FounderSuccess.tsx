import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, PartyPopper, Crown, ArrowRight, Lock } from "lucide-react";
import confetti from "canvas-confetti";

export default function FounderSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const { session } = useAuth();

  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    completeInvite();
    triggerConfetti();
  }, []);

  const triggerConfetti = () => {
    // Initial burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#fbbf24", "#f59e0b", "#22c55e"],
    });

    // Second burst after delay
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#fbbf24", "#f59e0b"],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#fbbf24", "#f59e0b"],
      });
    }, 300);
  };

  const completeInvite = async () => {
    if (!token) {
      setLoading(false);
      setCompleted(true);
      return;
    }

    try {
      const { data } = await supabase.functions.invoke("founder-checkout", {
        body: { action: "complete", token },
      });
      setEmail(data?.email || null);
      setCompleted(true);
    } catch (err) {
      console.error("Error completing invite:", err);
      // Still show success - payment went through
      setCompleted(true);
    } finally {
      setLoading(false);
    }
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const goToSignUp = () => {
    const url = email
      ? `/auth/signup?email=${encodeURIComponent(email)}`
      : "/auth/signup";
    navigate(url);
  };

  const goToSignIn = () => {
    const url = email
      ? `/auth/signin?email=${encodeURIComponent(email)}`
      : "/auth/signin";
    navigate(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Loader2 className="h-10 w-10 animate-spin text-yellow-400 mx-auto mb-4" />
          <p className="text-muted-foreground">Setting up your account...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        className="max-w-sm w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-green-500/30 bg-gradient-to-br from-green-500/5 to-transparent overflow-hidden">
          <CardContent className="pt-8 pb-8 text-center">
            {/* Success Icon */}
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <CheckCircle className="h-10 w-10 text-green-400" />
            </motion.div>

            {/* Heading */}
            <motion.div
              className="flex items-center justify-center gap-2 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <PartyPopper className="h-6 w-6 text-yellow-400" />
              <h1 className="text-2xl font-bold text-white">You're In!</h1>
              <PartyPopper className="h-6 w-6 text-yellow-400 scale-x-[-1]" />
            </motion.div>

            <motion.p
              className="text-muted-foreground mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Welcome to the Elec-Mate founder family
            </motion.p>

            {/* Founder Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Crown className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">Founder Member</span>
            </motion.div>

            {/* What's Next */}
            <motion.div
              className="bg-muted/50 rounded-xl p-4 mb-6 text-left"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm font-medium mb-3 text-white">What's next:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                  <span>Your £3.99/month subscription is now active</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                  <span>Price <strong className="text-yellow-400">locked forever</strong> - will never increase</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                  <span>Receipt sent to your email</span>
                </li>
              </ul>
            </motion.div>

            {/* CTA Buttons - Auth-aware */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {session ? (
                // User is logged in - go to dashboard
                <Button
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black rounded-2xl touch-manipulation"
                  onClick={goToDashboard}
                >
                  Go to Dashboard
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              ) : (
                // User is NOT logged in - prompt to sign in (account already created via founder signup)
                <>
                  <Button
                    className="w-full h-14 text-lg font-bold bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black rounded-2xl touch-manipulation"
                    onClick={goToSignIn}
                  >
                    Sign In to Get Started
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>

                  {email && (
                    <p className="text-xs text-muted-foreground">
                      Sign in with: <span className="text-white font-medium">{email}</span>
                    </p>
                  )}
                </>
              )}
            </motion.div>

            <motion.p
              className="text-xs text-muted-foreground mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Questions? Email founder@elec-mate.com
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
