import { useState, useEffect } from "react";
import { User, UserX, Check, Loader2, AlertTriangle, PoundSterling, MapPin, FileText, PartyPopper, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface QuickSubmitFormProps {
  onSuccess?: () => void;
  onNavigateToInsights?: () => void;
  className?: string;
}

const QuickSubmitForm = ({ onSuccess, onNavigateToInsights, className }: QuickSubmitFormProps) => {
  const { toast } = useToast();
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [averagePrice, setAveragePrice] = useState<number | null>(null);
  const [priceWarning, setPriceWarning] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    postcode: "",
    jobDescription: "",
    price: "",
  });

  // Get user name on mount
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata?.full_name) {
        setUserName(user.user_metadata.full_name);
      } else if (user?.email) {
        setUserName(user.email.split('@')[0]);
      }
    };
    getUser();
  }, []);

  // Check price against average
  useEffect(() => {
    if (!formData.price || !averagePrice) {
      setPriceWarning(null);
      return;
    }

    const price = parseFloat(formData.price);
    const percentDiff = ((price - averagePrice) / averagePrice) * 100;

    if (percentDiff < -50) {
      setPriceWarning(`This is ${Math.abs(percentDiff).toFixed(0)}% below average. Are you sure?`);
    } else if (percentDiff > 200) {
      setPriceWarning(`This is ${percentDiff.toFixed(0)}% above average. Please confirm.`);
    } else {
      setPriceWarning(null);
    }
  }, [formData.price, averagePrice]);

  const handleSubmit = async () => {
    if (!formData.postcode || !formData.jobDescription || !formData.price) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      // Extract postcode district
      const postcodeDistrict = formData.postcode.split(' ')[0].toUpperCase();

      const { error } = await supabase
        .from('community_pricing_submissions')
        .insert({
          user_id: isAnonymous ? null : user?.id,
          postcode_district: postcodeDistrict,
          job_type: formData.jobDescription,
          actual_price: parseFloat(formData.price),
          completion_date: new Date().toISOString().split('T')[0],
        });

      if (error) throw error;

      // Show success state
      setShowSuccess(true);
      onSuccess?.();

    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = formData.postcode && formData.jobDescription && formData.price;

  const handleReset = () => {
    setShowSuccess(false);
    setFormData({
      postcode: "",
      jobDescription: "",
      price: "",
    });
  };

  // Success Screen
  if (showSuccess) {
    return (
      <div className={cn("flex flex-col items-center justify-center py-12", className)}>
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center mb-6 animate-in zoom-in duration-300">
          <PartyPopper className="h-12 w-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Price Submitted!</h2>
        <p className="text-white/70 text-center mb-8 max-w-xs">
          Thank you for helping fellow electricians price jobs fairly. Your contribution makes the community stronger.
        </p>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          {onNavigateToInsights && (
            <Button
              onClick={onNavigateToInsights}
              className="w-full h-14 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black font-bold"
            >
              View Your Impact
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          )}
          <Button
            onClick={handleReset}
            variant="outline"
            className="w-full h-14 rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white font-semibold"
          >
            Submit Another Price
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-5", className)}>
      {/* Anonymous Toggle */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-3">
          {isAnonymous ? (
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <UserX className="h-5 w-5 text-white/60" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-yellow-400/20 flex items-center justify-center">
              <User className="h-5 w-5 text-yellow-400" />
            </div>
          )}
          <div>
            <p className="font-semibold text-white">
              {isAnonymous ? "Anonymous" : userName || "Your Name"}
            </p>
            <p className="text-xs text-white/60">
              {isAnonymous ? "Identity not stored" : "Track your contributions"}
            </p>
          </div>
        </div>
        <Switch
          checked={isAnonymous}
          onCheckedChange={setIsAnonymous}
        />
      </div>

      {/* Postcode Field */}
      <div>
        <label className="text-sm font-semibold text-white mb-2 block">
          Job Postcode
        </label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-yellow-400 pointer-events-none" />
          <input
            type="text"
            value={formData.postcode}
            onChange={(e) => setFormData({ ...formData, postcode: e.target.value.toUpperCase() })}
            placeholder="e.g. SW1A 1AA"
            className={cn(
              "w-full h-14 pl-12 pr-4 rounded-xl",
              "bg-neutral-800 border-2 border-white/10",
              "text-white text-lg font-medium placeholder:text-white/30",
              "focus:outline-none focus:border-yellow-400/50",
              "transition-all duration-200"
            )}
          />
        </div>
      </div>

      {/* Job Description Field */}
      <div>
        <label className="text-sm font-semibold text-white mb-2 block">
          Job Description
        </label>
        <div className="relative">
          <FileText className="absolute left-4 top-4 h-5 w-5 text-yellow-400 pointer-events-none" />
          <textarea
            value={formData.jobDescription}
            onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
            placeholder="e.g. Install 3 double sockets in kitchen"
            rows={3}
            className={cn(
              "w-full pl-12 pr-4 py-4 rounded-xl resize-none",
              "bg-neutral-800 border-2 border-white/10",
              "text-white text-base placeholder:text-white/30",
              "focus:outline-none focus:border-yellow-400/50",
              "transition-all duration-200"
            )}
          />
        </div>
      </div>

      {/* Price Field - Big and Clear */}
      <div>
        <label className="text-sm font-semibold text-white mb-2 block">
          Price Charged
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-400/20">
            <PoundSterling className="h-5 w-5 text-yellow-400" />
          </div>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="0"
            className={cn(
              "w-full h-20 pl-20 pr-4 rounded-xl",
              "bg-neutral-800 border-2 border-white/10",
              "text-white text-4xl font-black placeholder:text-white/20",
              "focus:outline-none focus:border-yellow-400/50",
              "transition-all duration-200"
            )}
          />
        </div>

        {/* Price Warning */}
        {priceWarning && (
          <div className="flex items-start gap-2 mt-3 p-3 bg-amber-500/15 border border-amber-500/30 rounded-xl">
            <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-400">{priceWarning}</p>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={!canSubmit || isSubmitting}
        className={cn(
          "w-full h-16 rounded-xl text-lg font-bold",
          "bg-gradient-to-r from-yellow-400 to-yellow-500",
          "hover:from-yellow-300 hover:to-yellow-400",
          "text-black",
          "transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            Submitting...
          </>
        ) : (
          <>
            <Check className="h-6 w-6 mr-2" />
            Submit Price
          </>
        )}
      </Button>

      {/* Helper Text */}
      <p className="text-xs text-white/50 text-center">
        Your data helps other electricians price jobs fairly
      </p>
    </div>
  );
};

export default QuickSubmitForm;
