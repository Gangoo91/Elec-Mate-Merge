import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Send,
  Loader2,
  Building2,
  MapPin,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Shield,
  Award,
  Clock,
  Wrench,
  CreditCard,
  BadgeCheck,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApplyToVacancy } from "@/hooks/useInternalVacancies";
import { useElecIdProfile } from "@/hooks/useElecIdProfile";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { InternalVacancy } from "./InternalVacancyCard";

interface ApplyToVacancyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vacancy: InternalVacancy | null;
  onSuccess?: () => void;
}

// Verification tier badge component
const VerificationBadge = ({ tier }: { tier: string }) => {
  const tierConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    basic: { label: "Basic", color: "bg-slate-500/20 text-slate-300 border-slate-500/30", icon: <Shield className="h-3 w-3" /> },
    verified: { label: "Verified", color: "bg-blue-500/20 text-blue-300 border-blue-500/30", icon: <BadgeCheck className="h-3 w-3" /> },
    premium: { label: "Premium", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", icon: <Award className="h-3 w-3" /> },
  };

  const config = tierConfig[tier] || tierConfig.basic;

  return (
    <Badge className={cn("text-xs", config.color)}>
      {config.icon}
      <span className="ml-1">{config.label}</span>
    </Badge>
  );
};

export function ApplyToVacancyDialog({
  open,
  onOpenChange,
  vacancy,
  onSuccess,
}: ApplyToVacancyDialogProps) {
  const { profile: elecIdProfile, isLoading: profileLoading } = useElecIdProfile();
  const [coverLetter, setCoverLetter] = useState("");
  const [shareProfile, setShareProfile] = useState(true);
  const [showProfilePreview, setShowProfilePreview] = useState(false);

  const applyMutation = useApplyToVacancy();

  const handleApply = async () => {
    if (!vacancy) return;

    try {
      await applyMutation.mutateAsync({
        vacancyId: vacancy.id,
        coverLetter: coverLetter.trim() || undefined,
      });

      toast({
        title: "Application Submitted",
        description: `Your application for "${vacancy.title}" has been sent to ${vacancy.employer?.company_name}.`,
      });

      setCoverLetter("");
      onOpenChange(false);
      onSuccess?.();
    } catch (error: any) {
      console.error("Error applying:", error);
      toast({
        title: "Application Failed",
        description: error.message || "Failed to submit your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!vacancy) return null;

  const companyInitials = vacancy.employer?.company_name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '??';

  const formatSalary = () => {
    if (!vacancy.salary_min && !vacancy.salary_max) return null;

    const period = vacancy.salary_period === 'annual' ? '/yr' : '/hr';

    if (vacancy.salary_min && vacancy.salary_max) {
      const min = vacancy.salary_period === 'annual'
        ? `£${(vacancy.salary_min / 1000).toFixed(0)}k`
        : `£${vacancy.salary_min}`;
      const max = vacancy.salary_period === 'annual'
        ? `£${(vacancy.salary_max / 1000).toFixed(0)}k`
        : `£${vacancy.salary_max}`;
      return `${min} - ${max}${period}`;
    }

    if (vacancy.salary_min) {
      const val = vacancy.salary_period === 'annual'
        ? `£${(vacancy.salary_min / 1000).toFixed(0)}k`
        : `£${vacancy.salary_min}`;
      return `From ${val}${period}`;
    }

    return null;
  };

  const salaryDisplay = formatSalary();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-elec-yellow" />
            Apply to Vacancy
          </DialogTitle>
          <DialogDescription>
            Submit your application for this position
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Vacancy Info */}
          <Card className="bg-muted/50">
            <CardContent className="p-3">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12 rounded-lg">
                  <AvatarImage src={vacancy.employer?.logo_url || undefined} />
                  <AvatarFallback className="rounded-lg bg-elec-yellow/20 text-elec-yellow font-bold">
                    {companyInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{vacancy.title}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" />
                    {vacancy.employer?.company_name}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      <MapPin className="h-3 w-3 mr-1" />
                      {vacancy.location}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Briefcase className="h-3 w-3 mr-1" />
                      {vacancy.type}
                    </Badge>
                    {salaryDisplay && (
                      <Badge variant="outline" className="text-xs text-green-600">
                        {salaryDisplay}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Elec-ID Profile Preview */}
          {profileLoading ? (
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Loading your Elec-ID...</span>
            </div>
          ) : elecIdProfile ? (
            <div className="space-y-3">
              {/* Profile Header */}
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground">Elec-ID</p>
                        <VerificationBadge tier={elecIdProfile.verification_tier} />
                      </div>
                      <p className="text-sm text-emerald-400 font-mono">
                        {elecIdProfile.elec_id_number}
                      </p>
                    </div>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                </div>

                {/* Toggle to show preview */}
                <button
                  type="button"
                  onClick={() => setShowProfilePreview(!showProfilePreview)}
                  className="mt-3 w-full flex items-center justify-between text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
                >
                  <span>What will be shared with employer</span>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform",
                    showProfilePreview && "rotate-180"
                  )} />
                </button>

                {/* Profile Preview */}
                <AnimatePresence>
                  {showProfilePreview && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-emerald-500/20 space-y-2">
                        {/* ECS Card */}
                        {elecIdProfile.ecs_card_type && (
                          <div className="flex items-center gap-2 text-sm">
                            <CreditCard className="h-4 w-4 text-emerald-400" />
                            <span className="text-muted-foreground">ECS Card:</span>
                            <span className="text-foreground font-medium">{elecIdProfile.ecs_card_type}</span>
                            {elecIdProfile.ecs_expiry_date && (
                              <span className="text-xs text-muted-foreground">
                                (Expires: {new Date(elecIdProfile.ecs_expiry_date).toLocaleDateString()})
                              </span>
                            )}
                          </div>
                        )}

                        {/* Specialisations */}
                        {elecIdProfile.specialisations && elecIdProfile.specialisations.length > 0 && (
                          <div className="flex items-start gap-2 text-sm">
                            <Wrench className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <div>
                              <span className="text-muted-foreground">Specialisations:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {elecIdProfile.specialisations.slice(0, 4).map((spec, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {spec}
                                  </Badge>
                                ))}
                                {elecIdProfile.specialisations.length > 4 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{elecIdProfile.specialisations.length - 4} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Bio */}
                        {elecIdProfile.bio && (
                          <div className="flex items-start gap-2 text-sm">
                            <Briefcase className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <div>
                              <span className="text-muted-foreground">Bio:</span>
                              <p className="text-foreground line-clamp-2 mt-0.5">{elecIdProfile.bio}</p>
                            </div>
                          </div>
                        )}

                        {/* What's included */}
                        <div className="mt-2 pt-2 border-t border-emerald-500/10">
                          <p className="text-xs text-muted-foreground mb-2">Also includes:</p>
                          <div className="flex flex-wrap gap-1.5">
                            <Badge variant="outline" className="text-xs bg-background/50">
                              <Award className="h-3 w-3 mr-1" />
                              Qualifications
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-background/50">
                              <Clock className="h-3 w-3 mr-1" />
                              Work History
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-background/50">
                              <Wrench className="h-3 w-3 mr-1" />
                              Skills
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-destructive">Elec-ID Required</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Please complete your Elec-ID profile before applying. Your profile helps employers verify your credentials.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Cover Letter */}
          <div className="space-y-2">
            <Label htmlFor="cover-letter">Cover Letter (Optional)</Label>
            <Textarea
              id="cover-letter"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Introduce yourself and explain why you're a great fit for this role..."
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              A personalized cover letter can help you stand out from other applicants.
            </p>
          </div>

          {/* Share Profile Consent */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="share-profile"
              checked={shareProfile}
              onCheckedChange={(checked) => setShareProfile(checked as boolean)}
            />
            <div className="space-y-1">
              <Label htmlFor="share-profile" className="text-sm font-normal cursor-pointer">
                Share my Elec-ID profile with the employer
              </Label>
              <p className="text-xs text-muted-foreground">
                This includes your certifications, work history, and verification status.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1 h-11"
              onClick={() => onOpenChange(false)}
              disabled={applyMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 h-11 bg-emerald-500 hover:bg-emerald-400 text-white"
              onClick={handleApply}
              disabled={applyMutation.isPending || !elecIdProfile || !shareProfile}
            >
              {applyMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Applying...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Apply with Elec-ID
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
