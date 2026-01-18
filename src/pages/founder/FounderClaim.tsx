import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Sparkles,
  AlertTriangle,
  Loader2,
  Calculator,
  FileText,
  MessageSquare,
  Crown,
  Lock,
  Shield,
  CreditCard,
  ArrowRight,
  Zap,
  ClipboardCheck,
} from "lucide-react";

const features = [
  {
    icon: Calculator,
    title: "AI Calculators",
    desc: "Cable sizing, voltage drop & more",
    color: "text-green-400",
  },
  {
    icon: MessageSquare,
    title: "BS7671 AI",
    desc: "Instant regulation answers",
    color: "text-blue-400",
  },
  {
    icon: FileText,
    title: "Quote Builder",
    desc: "Professional docs in seconds",
    color: "text-purple-400",
  },
  {
    icon: ClipboardCheck,
    title: "EICR Generator",
    desc: "Certificates made easy",
    color: "text-amber-400",
  },
  {
    icon: Zap,
    title: "Priority Support",
    desc: "Direct founder access",
    color: "text-yellow-400",
  },
];

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
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Loader2 className="h-10 w-10 animate-spin text-yellow-400 mx-auto mb-4" />
          <p className="text-muted-foreground">Validating your invite...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !valid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="max-w-sm w-full border-red-500/30">
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
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section with Animated Crown */}
      <motion.div
        className="relative pt-12 pb-6 px-4 bg-gradient-to-b from-yellow-500/20 via-yellow-500/10 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-20 h-20 mx-auto mb-4"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
        >
          <Crown className="w-full h-full text-yellow-400 drop-shadow-lg" />
        </motion.div>

        <motion.div
          className="flex justify-center mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-4 py-1.5">
            <Sparkles className="h-3 w-3 mr-1.5" />
            Founder Exclusive
          </Badge>
        </motion.div>

        <motion.h1
          className="text-2xl font-bold text-center text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Welcome, Founder
        </motion.h1>
      </motion.div>

      {/* Price Card - The Hero */}
      <motion.div
        className="px-4 -mt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-2 border-yellow-500/40 bg-gradient-to-br from-yellow-500/10 to-amber-600/5">
          <CardContent className="py-6 text-center">
            {/* Price Lock Badge - Prominent */}
            <motion.div
              className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-1.5 mb-4"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Lock className="h-3.5 w-3.5 text-green-400" />
              <span className="text-sm font-semibold text-green-400">LOCKED FOREVER</span>
            </motion.div>

            {/* Price Display */}
            <div className="mb-2">
              <span className="text-5xl sm:text-6xl font-black text-white">£3.99</span>
              <span className="text-lg text-muted-foreground">/mo</span>
            </div>

            <div className="flex items-center justify-center gap-3 text-sm mb-4">
              <span className="line-through text-muted-foreground">£9.99/mo</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                SAVE 60%
              </Badge>
            </div>

            <p className="text-xs text-muted-foreground">
              This price will <strong className="text-yellow-400">never increase</strong> while you stay subscribed
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Features - Horizontal Scroll */}
      <div className="py-5 overflow-hidden">
        <motion.p
          className="text-sm font-medium text-muted-foreground px-4 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Everything included:
        </motion.p>

        <div className="flex gap-3 px-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="snap-start shrink-0 w-36 p-3 rounded-2xl bg-muted/50 border border-white/10"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
            >
              <feature.icon className={`h-7 w-7 ${feature.color} mb-2`} />
              <p className="font-medium text-sm text-white">{feature.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1 min-h-4" />

      {/* Sticky Bottom CTA */}
      <motion.div
        className="sticky bottom-0 p-4 pb-6 bg-background/95 backdrop-blur-sm border-t border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {email && (
          <p className="text-xs text-center text-muted-foreground mb-3">
            Subscription for: <span className="text-foreground font-medium">{email}</span>
          </p>
        )}

        <Button
          className="w-full h-14 text-lg font-bold bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black rounded-2xl shadow-lg shadow-yellow-500/25 touch-manipulation"
          onClick={handleClaim}
          disabled={checkoutLoading}
        >
          {checkoutLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Claim My Subscription
              <ArrowRight className="h-5 w-5 ml-2" />
            </>
          )}
        </Button>

        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Shield className="h-3 w-3" /> Secure
          </span>
          <span className="flex items-center gap-1">
            <CreditCard className="h-3 w-3" /> Via Stripe
          </span>
          <span>Cancel anytime</span>
        </div>
      </motion.div>
    </div>
  );
}
