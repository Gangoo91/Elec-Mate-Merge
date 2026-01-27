import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Crown,
  Loader2,
  AlertTriangle,
  User,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  Shield,
  CreditCard,
  ChevronLeft,
  Sparkles,
} from "lucide-react";

const PASSWORD_REQUIREMENTS = [
  { id: "length", label: "8+", test: (p: string) => p.length >= 8 },
  { id: "uppercase", label: "A-Z", test: (p: string) => /[A-Z]/.test(p) },
  { id: "lowercase", label: "a-z", test: (p: string) => /[a-z]/.test(p) },
  { id: "number", label: "0-9", test: (p: string) => /[0-9]/.test(p) },
];

// InputField component
interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: React.ComponentType<{ className?: string }>;
  field: string;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
  showToggle?: boolean;
  isVisible?: boolean;
  onToggle?: () => void;
  showSuccess?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  field,
  focusedField,
  setFocusedField,
  showToggle = false,
  isVisible = false,
  onToggle = () => {},
  showSuccess = false,
  disabled = false,
  readOnly = false,
}: InputFieldProps) => (
  <div className="space-y-2">
    <label className="block text-[13px] font-medium text-white/70 ml-1">
      {label}
    </label>
    <div className="relative">
      <div
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200",
          focusedField === field ? "text-yellow-400" : "text-white/40"
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <input
        type={showToggle ? (isVisible ? "text" : "password") : type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocusedField(field)}
        onBlur={() => setFocusedField(null)}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        autoComplete={
          type === "email"
            ? "email"
            : type === "password"
            ? "new-password"
            : "off"
        }
        className={cn(
          "w-full h-14 pl-14 pr-12 rounded-2xl",
          "bg-white/[0.06] border-2 text-white placeholder:text-white/30",
          "text-[16px] outline-none transition-all duration-200",
          disabled || readOnly
            ? "opacity-70 cursor-not-allowed border-white/5 bg-white/[0.03]"
            : focusedField === field
            ? "border-yellow-400/50 bg-white/[0.08] shadow-[0_0_0_4px_rgba(250,204,21,0.1)]"
            : "border-white/10 hover:border-white/20"
        )}
      />
      {showToggle && !disabled && !readOnly && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 active:text-white transition-colors h-11 w-11 flex items-center justify-center touch-manipulation rounded-xl"
        >
          {isVisible ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      )}
      {showSuccess && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
          </div>
        </motion.div>
      )}
    </div>
  </div>
);

export default function FounderSignup() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const cancelled = searchParams.get("cancelled");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [valid, setValid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [hasExistingAccount, setHasExistingAccount] = useState(false);
  const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false);

  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const allPasswordRequirementsMet = PASSWORD_REQUIREMENTS.every((req) =>
    req.test(password)
  );
  const passwordsMatch =
    password === confirmPassword && confirmPassword.length > 0;

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
      const { data, error } = await supabase.functions.invoke(
        "founder-checkout",
        {
          body: { action: "validate", token },
        }
      );

      if (error) throw error;

      if (data?.valid) {
        setValid(true);
        setEmail(data.email);
        setHasExistingAccount(data.hasExistingAccount || false);
      } else if (data?.isAlreadySubscribed) {
        // User is already a founder subscriber - show friendly message
        setIsAlreadySubscribed(true);
        setError(data?.reason || "You're already subscribed as a Founder!");
      } else {
        setError(data?.reason || "Invalid invite");
      }
    } catch (err: any) {
      setError(err.message || "Failed to validate invite");
    } finally {
      setLoading(false);
    }
  };

  // Handle existing user checkout (just redirect to Stripe)
  const handleExistingUserCheckout = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke(
        "founder-checkout",
        {
          body: {
            action: "create_checkout",
            token,
          },
        }
      );

      if (error) throw error;

      // Handle already subscribed response
      if (data?.alreadySubscribed) {
        setIsAlreadySubscribed(true);
        setValid(false);
        setError(data.message || "You're already subscribed as a Founder!");
        setSubmitting(false);
        return;
      }

      if (data?.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err: any) {
      setError(err.message || "Failed to start checkout");
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError("Please enter your full name");
      return;
    }

    if (!allPasswordRequirementsMet) {
      setError("Password needs: 8+ chars, uppercase, lowercase, number");
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match");
      return;
    }

    setSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        "founder-checkout",
        {
          body: {
            action: "create_account",
            token,
            password,
            fullName: fullName.trim(),
            role: "Electrician",
          },
        }
      );

      if (error) throw error;

      // Handle already subscribed response
      if (data?.alreadySubscribed) {
        setIsAlreadySubscribed(true);
        setValid(false);
        setError(data.message || "You're already subscribed as a Founder!");
        setSubmitting(false);
        return;
      }

      if (data?.checkoutUrl) {
        // Redirect to Stripe checkout
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err: any) {
      setError(err.message || "Failed to create account");
      setSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black flex items-center justify-center p-4">
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

  // Error state - but show friendly message for already subscribed users
  if (error && !valid) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-sm w-full"
        >
          <div className={`p-8 rounded-3xl bg-white/[0.04] border ${isAlreadySubscribed ? 'border-green-500/30' : 'border-red-500/30'} text-center`}>
            <div className={`w-16 h-16 rounded-full ${isAlreadySubscribed ? 'bg-green-500/10' : 'bg-red-500/10'} flex items-center justify-center mx-auto mb-4`}>
              {isAlreadySubscribed ? (
                <CheckCircle2 className="h-8 w-8 text-green-400" />
              ) : (
                <AlertTriangle className="h-8 w-8 text-red-400" />
              )}
            </div>
            <h1 className="text-xl font-bold text-white mb-2">
              {isAlreadySubscribed ? "You're Already a Founder!" : "Invalid Invite"}
            </h1>
            <p className="text-muted-foreground mb-6">{error}</p>
            {isAlreadySubscribed ? (
              <div className="space-y-3">
                <Button
                  className="w-full h-11 touch-manipulation bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold"
                  onClick={() => navigate("/auth/signin")}
                >
                  Sign In to Your Account
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-11 touch-manipulation"
                  onClick={() => navigate("/")}
                >
                  Go to Homepage
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="h-11 touch-manipulation"
                onClick={() => navigate("/")}
              >
                Go to Homepage
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black flex flex-col safe-top safe-bottom overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-yellow-400/20 blur-[150px]"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full px-4 pt-4 pb-2 z-10"
      >
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Link
            to="/"
            className="flex items-center gap-1 text-white/70 hover:text-white transition-colors p-2 -ml-2 rounded-xl"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="text-[15px] font-medium">Back</span>
          </Link>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-400/30">
              <Crown className="h-5 w-5 text-black" />
            </div>
          </motion.div>

          <div className="w-16" />
        </div>
      </motion.header>

      {/* Main content */}
      <main className="relative flex-1 flex flex-col px-5 py-4 z-10 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md mx-auto"
        >
          {/* Title */}
          <div className="text-center mb-4">
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
            <motion.h1 className="text-[28px] font-bold text-white tracking-tight mb-2">
              Join as Founder
            </motion.h1>
            <p className="text-[15px] text-white/50">
              Create your account and subscribe
            </p>
          </div>

          {/* Price Card */}
          <motion.div
            className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-amber-600/5 border-2 border-yellow-500/40"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Founder Price
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">£3.99</span>
                  <span className="text-sm text-muted-foreground">/mo</span>
                </div>
              </div>
              <div className="text-right">
                <span className="line-through text-sm text-muted-foreground">
                  £9.99
                </span>
                <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30">
                  60% OFF
                </Badge>
                <p className="text-[10px] text-yellow-400 mt-1">
                  Locked forever
                </p>
              </div>
            </div>
          </motion.div>

          {/* Cancelled message */}
          {cancelled && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 rounded-2xl bg-yellow-400/10 border border-yellow-400/20"
            >
              <div className="flex gap-3 items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <p className="text-[14px] text-yellow-400 font-medium">
                  Payment cancelled. Please try again.
                </p>
              </div>
            </motion.div>
          )}

          {/* Error */}
          <AnimatePresence>
            {error && valid && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/20"
              >
                <div className="flex gap-3 items-center">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
                  <p className="text-[14px] text-red-400 font-medium">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Existing Account - Simplified checkout flow */}
          {hasExistingAccount ? (
            <div className="space-y-6">
              {/* Email - Read Only */}
              <div className="space-y-2">
                <label className="block text-[13px] font-medium text-white/70 ml-1">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    readOnly
                    className="w-full h-14 pl-14 pr-4 rounded-2xl bg-white/[0.03] border-2 border-green-500/30 text-white/70 text-[16px] outline-none cursor-not-allowed"
                  />
                </div>
                <p className="text-[11px] text-green-400 ml-1">
                  Account found - ready to claim your offer
                </p>
              </div>

              {/* Existing Account Notice */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20"
              >
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[14px] text-blue-400 font-medium">
                      You already have an account!
                    </p>
                    <p className="text-[13px] text-white/50 mt-1">
                      Click below to proceed directly to checkout and activate your founder pricing.
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="pt-2">
                <Button
                  type="button"
                  onClick={handleExistingUserCheckout}
                  disabled={submitting}
                  className={cn(
                    "w-full h-14 rounded-2xl text-[16px] font-bold",
                    "bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black",
                    "shadow-lg shadow-yellow-500/25 transition-all duration-200",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Preparing Checkout...
                    </>
                  ) : (
                    <>
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Shield className="h-3 w-3" /> Secure
                </span>
                <span className="flex items-center gap-1">
                  <CreditCard className="h-3 w-3" /> Via Stripe
                </span>
                <span>Cancel anytime</span>
              </div>
            </div>
          ) : (
            <>
              {/* Signup Form - For new accounts */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email - Read Only */}
                <div className="space-y-2">
                  <label className="block text-[13px] font-medium text-white/70 ml-1">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      readOnly
                      className="w-full h-14 pl-14 pr-4 rounded-2xl bg-white/[0.03] border-2 border-green-500/30 text-white/70 text-[16px] outline-none cursor-not-allowed"
                    />
                  </div>
                  <p className="text-[11px] text-green-400 ml-1">
                    Email verified from your invite
                  </p>
                </div>

                <InputField
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Smith"
                  icon={User}
                  field="name"
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                  disabled={submitting}
                />

                <div>
                  <InputField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create password"
                    icon={Lock}
                    field="password"
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    showToggle
                    isVisible={showPassword}
                    onToggle={() => setShowPassword(!showPassword)}
                    disabled={submitting}
                  />
                  {password && (
                    <div className="flex gap-1.5 mt-2">
                      {PASSWORD_REQUIREMENTS.map((req) => (
                        <div
                          key={req.id}
                          className={cn(
                            "flex-1 py-1.5 rounded-lg text-center text-[11px] font-medium transition-all",
                            req.test(password)
                              ? "bg-green-500/20 text-green-400"
                              : "bg-white/5 text-white/40"
                          )}
                        >
                          {req.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <InputField
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  icon={Lock}
                  field="confirmPassword"
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                  showToggle
                  isVisible={showConfirmPassword}
                  onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                  showSuccess={passwordsMatch}
                  disabled={submitting}
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={submitting || !fullName || !allPasswordRequirementsMet || !passwordsMatch}
                    className={cn(
                      "w-full h-14 rounded-2xl text-[16px] font-bold",
                      "bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black",
                      "shadow-lg shadow-yellow-500/25 transition-all duration-200",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account & Subscribe
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Shield className="h-3 w-3" /> Secure
                  </span>
                  <span className="flex items-center gap-1">
                    <CreditCard className="h-3 w-3" /> Via Stripe
                  </span>
                  <span>Cancel anytime</span>
                </div>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[12px] text-white/30 uppercase tracking-wider">
                  or
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Sign in link */}
              <div className="text-center pb-8">
                <p className="text-[14px] text-white/40 mb-3">
                  Already have an account?
                </p>
                <Link to="/auth/signin">
                  <Button
                    variant="outline"
                    className="w-full h-13 rounded-2xl text-[15px] font-semibold bg-transparent border-2 border-white/10 text-white hover:bg-white/5"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative px-6 pb-6 z-10"
      >
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center gap-4 text-[11px] text-white/30">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-500/70" />
              Secure
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>BS7671 Compliant</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>UK Based</span>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
