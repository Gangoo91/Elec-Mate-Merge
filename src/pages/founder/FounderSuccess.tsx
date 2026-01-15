import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, PartyPopper, Crown, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

export default function FounderSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    completeInvite();
    triggerConfetti();
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#fbbf24", "#f59e0b", "#22c55e"],
    });
  };

  const completeInvite = async () => {
    if (!token) {
      setLoading(false);
      setCompleted(true);
      return;
    }

    try {
      await supabase.functions.invoke("founder-checkout", {
        body: { action: "complete", token },
      });
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

  const goToSignIn = () => {
    navigate("/auth/signin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-yellow-400 mx-auto mb-4" />
          <p className="text-muted-foreground">Setting up your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="border-green-500/30 bg-gradient-to-br from-green-500/5 to-transparent">
          <CardContent className="pt-8 pb-8 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircle className="h-10 w-10 text-green-400" />
            </div>

            {/* Heading */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <PartyPopper className="h-6 w-6 text-yellow-400" />
              <h1 className="text-2xl font-bold">You're In!</h1>
              <PartyPopper className="h-6 w-6 text-yellow-400 scale-x-[-1]" />
            </div>

            <p className="text-muted-foreground mb-6">
              Welcome to the Elec-Mate founder family
            </p>

            {/* Founder Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-6">
              <Crown className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">Founder Member</span>
            </div>

            {/* What's Next */}
            <div className="bg-muted/50 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm font-medium mb-3">What's next:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                  <span>Your £3.99/month subscription is now active</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                  <span>All features unlocked - explore the app!</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                  <span>You'll receive a receipt via email shortly</span>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Button
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black touch-manipulation"
                onClick={goToDashboard}
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              <Button
                variant="outline"
                className="w-full h-11 touch-manipulation"
                onClick={goToSignIn}
              >
                Sign In to Existing Account
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Questions? Email founder@elec-mate.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
