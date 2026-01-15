import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Check,
  AlertTriangle,
  Loader2,
  Zap,
  Calculator,
  FileText,
  MessageSquare,
  Crown,
} from "lucide-react";

export default function FounderClaim() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    validateToken();
  }, [token]);

  const validateToken = async () => {
    if (!token) {
      setError("No invite token provided");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke("founder-checkout", {
        body: { action: "validate", token },
      });

      if (error) throw error;

      if (data?.valid) {
        setValid(true);
        setEmail(data.email);
      } else {
        setError(data?.reason || "Invalid invite");
      }
    } catch (err: any) {
      setError(err.message || "Failed to validate invite");
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async () => {
    setCheckoutLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("founder-checkout", {
        body: { action: "create_checkout", token },
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err: any) {
      setError(err.message || "Failed to create checkout");
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-yellow-400 mx-auto mb-4" />
          <p className="text-muted-foreground">Validating your invite...</p>
        </div>
      </div>
    );
  }

  if (error || !valid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
            <h1 className="text-xl font-bold mb-2">Invalid Invite</h1>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button
              variant="outline"
              className="h-11 touch-manipulation"
              onClick={() => navigate("/")}
            >
              Go to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-yellow-500/10 to-transparent pt-12 pb-8 px-4">
        <div className="max-w-md mx-auto text-center">
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 mb-4">
            <Crown className="h-3 w-3 mr-1" />
            Founder Access
          </Badge>
          <h1 className="text-3xl font-bold mb-2">Welcome, Founder</h1>
          <p className="text-muted-foreground">
            Thank you for being an early supporter of Elec-Mate
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pb-8">
        {/* Price Card */}
        <Card className="mb-6 border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-transparent">
          <CardContent className="pt-6 pb-6">
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground mb-1">Your exclusive founder price</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-green-400">£3.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="line-through">£9.99/month</span>
                <span className="text-green-400 ml-2">Save 60%</span>
              </p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-center">
              <Sparkles className="h-4 w-4 text-yellow-400 inline mr-2" />
              <span className="text-sm text-yellow-400">
                Locked in forever - price will never increase
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="mb-6">
          <CardContent className="pt-6 pb-6">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-400" />
              What's Included
            </h2>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                  <Calculator className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">All AI Tools & Calculators</p>
                  <p className="text-xs text-muted-foreground">Cable sizing, voltage drop, and more</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">BS7671 AI Assistant</p>
                  <p className="text-xs text-muted-foreground">Instant regulation answers</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                  <FileText className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">Quote & Invoice Builder</p>
                  <p className="text-xs text-muted-foreground">Professional documents in seconds</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0">
                  <Crown className="h-4 w-4 text-yellow-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">Priority Support</p>
                  <p className="text-xs text-muted-foreground">Direct access to the founder</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email confirmation */}
        {email && (
          <p className="text-sm text-center text-muted-foreground mb-4">
            Subscription will be linked to: <span className="text-foreground">{email}</span>
          </p>
        )}

        {/* CTA Button */}
        <Button
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black touch-manipulation"
          onClick={handleClaim}
          disabled={checkoutLoading}
        >
          {checkoutLoading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Setting up checkout...
            </>
          ) : (
            <>
              <Check className="h-5 w-5 mr-2" />
              Claim My Subscription
            </>
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground mt-4">
          Secure payment via Stripe. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
