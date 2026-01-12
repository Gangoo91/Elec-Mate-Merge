import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
  Sparkles,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);

  const applyMutation = useApplyToVacancy();

  // AI Cover Letter Generation
  const generateCoverLetter = async () => {
    if (!vacancy || !elecIdProfile) return;

    setIsGeneratingCoverLetter(true);
    try {
      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant', {
        body: {
          type: 'cover_letter_generation',
          prompt: 'Generate a cover letter for this job application',
          context: {
            vacancy: {
              title: vacancy.title,
              company: vacancy.employer?.company_name || 'the employer',
              location: vacancy.location,
              description: vacancy.description?.replace(/<[^>]*>/g, ' ').substring(0, 500),
              requirements: vacancy.requirements,
              type: vacancy.type,
            },
            profile: {
              bio: elecIdProfile.bio,
              specialisations: elecIdProfile.specialisations,
              ecs_card_type: elecIdProfile.ecs_card_type,
              verification_tier: elecIdProfile.verification_tier,
            },
          },
        },
      });

      if (error) throw error;

      if (data?.content) {
        setCoverLetter(data.content);
        toast({
          title: "Cover Letter Generated",
          description: "AI has written a personalised cover letter for you. Feel free to edit it!",
        });
      }
    } catch (error: any) {
      console.error('Error generating cover letter:', error);
      toast({
        title: "Generation Failed",
        description: "Could not generate cover letter. Please try again or write your own.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingCoverLetter(false);
    }
  };

  const handleApply = async () => {
    if (!vacancy) return;

    try {
      await applyMutation.mutateAsync({
        vacancyId: vacancy.id,
        coverLetter: coverLetter.trim() || undefined,
      });

      toast({
        title: "Application Submitted",
        description: `Your application for "${vacancy.title}" has been sent to ${vacancy.employer?.company_name || 'the employer'}.`,
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
    .slice(0, 2) || 'EM';

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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden flex flex-col"
      >
        {/* Drag Handle - Native App Feel */}
        <div className="flex justify-center pt-3 pb-2 touch-manipulation">
          <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
        </div>

        {/* Header */}
        <SheetHeader className="px-4 pb-3 border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-lg">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <Send className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <span className="block">Apply to Vacancy</span>
              <span className="text-sm font-normal text-muted-foreground">
                Submit your application
              </span>
            </div>
          </SheetTitle>
        </SheetHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Vacancy Info Card */}
          <Card className="bg-muted/50 border-border">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-14 w-14 rounded-xl">
                  <AvatarImage src={vacancy.employer?.logo_url || undefined} />
                  <AvatarFallback className="rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-lg">
                    {companyInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-base">{vacancy.title}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                    <Building2 className="h-4 w-4" />
                    {vacancy.employer?.company_name || 'Employer'}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs h-6">
                      <MapPin className="h-3 w-3 mr-1" />
                      {vacancy.location}
                    </Badge>
                    <Badge variant="outline" className="text-xs h-6">
                      <Briefcase className="h-3 w-3 mr-1" />
                      {vacancy.type}
                    </Badge>
                    {salaryDisplay && (
                      <Badge className="text-xs h-6 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
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
            <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Loading your Elec-ID...</span>
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
                  className="mt-3 w-full h-11 flex items-center justify-between text-sm text-emerald-300 active:text-emerald-200 transition-colors touch-manipulation rounded-lg px-2 -mx-2 active:bg-emerald-500/10"
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
                      <div className="mt-3 pt-3 border-t border-emerald-500/20 space-y-3">
                        {/* ECS Card */}
                        {elecIdProfile.ecs_card_type && (
                          <div className="flex items-center gap-2 text-sm">
                            <CreditCard className="h-4 w-4 text-emerald-400" />
                            <span className="text-muted-foreground">ECS Card:</span>
                            <span className="text-foreground font-medium">{elecIdProfile.ecs_card_type}</span>
                          </div>
                        )}

                        {/* Specialisations */}
                        {elecIdProfile.specialisations && elecIdProfile.specialisations.length > 0 && (
                          <div className="flex items-start gap-2 text-sm">
                            <Wrench className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <div>
                              <span className="text-muted-foreground">Specialisations:</span>
                              <div className="flex flex-wrap gap-1.5 mt-1.5">
                                {elecIdProfile.specialisations.slice(0, 4).map((spec, i) => (
                                  <Badge key={i} variant="outline" className="text-xs h-6">
                                    {spec}
                                  </Badge>
                                ))}
                                {elecIdProfile.specialisations.length > 4 && (
                                  <Badge variant="outline" className="text-xs h-6">
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
                            <Badge variant="outline" className="text-xs h-6 bg-background/50">
                              <Award className="h-3 w-3 mr-1" />
                              Qualifications
                            </Badge>
                            <Badge variant="outline" className="text-xs h-6 bg-background/50">
                              <Clock className="h-3 w-3 mr-1" />
                              Work History
                            </Badge>
                            <Badge variant="outline" className="text-xs h-6 bg-background/50">
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
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="cover-letter" className="text-sm font-medium">
                Cover Letter (Optional)
              </Label>
              {elecIdProfile && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={generateCoverLetter}
                  disabled={isGeneratingCoverLetter}
                  className="gap-2 h-10 text-sm bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 text-purple-400 active:bg-purple-500/20 active:text-purple-300 touch-manipulation"
                >
                  {isGeneratingCoverLetter ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Writing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      AI Write
                    </>
                  )}
                </Button>
              )}
            </div>
            <Textarea
              id="cover-letter"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Introduce yourself and explain why you're a great fit for this role..."
              rows={5}
              className="resize-none text-base touch-manipulation"
              disabled={isGeneratingCoverLetter}
            />
            <p className="text-xs text-muted-foreground">
              {elecIdProfile
                ? "Use AI to write a personalised cover letter based on your Elec-ID, or write your own."
                : "A personalised cover letter can help you stand out from other applicants."
              }
            </p>
          </div>

          {/* Share Profile Consent */}
          <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-xl touch-manipulation">
            <Checkbox
              id="share-profile"
              checked={shareProfile}
              onCheckedChange={(checked) => setShareProfile(checked as boolean)}
              className="mt-0.5 h-5 w-5"
            />
            <div className="space-y-1">
              <Label htmlFor="share-profile" className="text-sm font-medium">
                Share my Elec-ID profile with the employer
              </Label>
              <p className="text-xs text-muted-foreground">
                This includes your certifications, work history, and verification status.
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Footer - Action Buttons */}
        <div className="border-t border-border bg-background p-4 pb-6 flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 text-base touch-manipulation active:scale-[0.98] transition-transform"
            onClick={() => onOpenChange(false)}
            disabled={applyMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 h-12 text-base bg-emerald-500 active:bg-emerald-400 text-white touch-manipulation active:scale-[0.98] transition-transform"
            onClick={handleApply}
            disabled={applyMutation.isPending || !elecIdProfile || !shareProfile}
          >
            {applyMutation.isPending ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Applying...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Apply with Elec-ID
              </>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
