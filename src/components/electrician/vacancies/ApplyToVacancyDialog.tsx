import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  FileText,
  Plus,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { useApplyToVacancy } from '@/hooks/useInternalVacancies';
import { useElecIdProfile } from '@/hooks/useElecIdProfile';
import { getUserCVs, UserCV } from '@/services/elecIdService';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import type { InternalVacancy } from './InternalVacancyCard';

interface ApplyToVacancyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vacancy: InternalVacancy | null;
  onSuccess?: () => void;
}

// Verification tier badge component — editorial chip
const VerificationBadge = ({ tier }: { tier: string }) => {
  const tierConfig: Record<string, { label: string; tone: string; icon: React.ReactNode }> = {
    basic: {
      label: 'Basic',
      tone: 'text-white/85 border-white/15 bg-transparent',
      icon: <Shield className="h-3 w-3" />,
    },
    verified: {
      label: 'Verified',
      tone: 'text-blue-300 border-blue-500/40 bg-blue-500/[0.08]',
      icon: <BadgeCheck className="h-3 w-3" />,
    },
    premium: {
      label: 'Premium',
      tone: 'text-emerald-300 border-emerald-500/40 bg-emerald-500/[0.08]',
      icon: <Award className="h-3 w-3" />,
    },
  };

  const config = tierConfig[tier] || tierConfig.basic;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] border rounded-md px-1.5 py-0.5',
        config.tone
      )}
    >
      {config.icon}
      {config.label}
    </span>
  );
};

export function ApplyToVacancyDialog({
  open,
  onOpenChange,
  vacancy,
  onSuccess,
}: ApplyToVacancyDialogProps) {
  const navigate = useNavigate();
  const { profile: elecIdProfile, isLoading: profileLoading } = useElecIdProfile();
  const [coverLetter, setCoverLetter] = useState('');
  const [shareProfile, setShareProfile] = useState(true);
  const [showProfilePreview, setShowProfilePreview] = useState(false);
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);

  // CV selection state
  const [userCVs, setUserCVs] = useState<UserCV[]>([]);
  const [selectedCvId, setSelectedCvId] = useState<string>('');
  const [loadingCVs, setLoadingCVs] = useState(false);

  const applyMutation = useApplyToVacancy();

  // Fetch user's CVs when dialog opens
  useEffect(() => {
    if (open) {
      setLoadingCVs(true);
      getUserCVs()
        .then((cvs) => {
          setUserCVs(cvs);
          // Auto-select primary CV if available
          const primaryCv = cvs.find((cv) => cv.is_primary);
          if (primaryCv) {
            setSelectedCvId(primaryCv.id);
          } else if (cvs.length > 0) {
            setSelectedCvId(cvs[0].id);
          }
        })
        .catch((err) => {
          console.error('Failed to load CVs:', err);
        })
        .finally(() => setLoadingCVs(false));
    }
  }, [open]);

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
          title: 'Cover Letter Generated',
          description: 'AI has written a personalised cover letter for you. Feel free to edit it!',
        });
      }
    } catch (error: any) {
      console.error('Error generating cover letter:', error);
      toast({
        title: 'Generation Failed',
        description: 'Could not generate cover letter. Please try again or write your own.',
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingCoverLetter(false);
    }
  };

  const handleApply = async () => {
    if (!vacancy) return;

    // Get the selected CV's PDF URL if available
    const selectedCv = userCVs.find((cv) => cv.id === selectedCvId);
    const cvUrl = selectedCv?.pdf_url || undefined;

    try {
      await applyMutation.mutateAsync({
        vacancyId: vacancy.id,
        coverLetter: coverLetter.trim() || undefined,
        cvUrl,
      });

      toast({
        title: 'Application Submitted',
        description: `Your application for "${vacancy.title}" has been sent to ${vacancy.employer?.company_name || 'the employer'}.${selectedCv ? ' Your CV was attached.' : ''}`,
      });

      setCoverLetter('');
      setSelectedCvId('');
      onOpenChange(false);
      onSuccess?.();
    } catch (error: any) {
      console.error('Error applying:', error);
      toast({
        title: 'Application Failed',
        description: error.message || 'Failed to submit your application. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (!vacancy) return null;

  const companyInitials =
    vacancy.employer?.company_name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'EM';

  const formatSalary = () => {
    if (!vacancy.salary_min && !vacancy.salary_max) return null;

    const period = vacancy.salary_period === 'annual' ? '/yr' : '/hr';

    if (vacancy.salary_min && vacancy.salary_max) {
      const min =
        vacancy.salary_period === 'annual'
          ? `£${(vacancy.salary_min / 1000).toFixed(0)}k`
          : `£${vacancy.salary_min}`;
      const max =
        vacancy.salary_period === 'annual'
          ? `£${(vacancy.salary_max / 1000).toFixed(0)}k`
          : `£${vacancy.salary_max}`;
      return `${min} - ${max}${period}`;
    }

    if (vacancy.salary_min) {
      const val =
        vacancy.salary_period === 'annual'
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
        className="h-[85vh] p-0 rounded-t-3xl overflow-hidden flex flex-col bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border-t border-white/[0.10]"
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-1 touch-manipulation">
          <div className="w-12 h-1.5 rounded-full bg-white/15" />
        </div>

        {/* Header */}
        <SheetHeader className="px-5 sm:px-6 pt-2 pb-4 border-b border-white/[0.06] text-left">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-emerald-300 inline-flex items-center gap-1.5">
            <Shield className="h-3 w-3" />
            Direct application
          </span>
          <SheetTitle className="text-[22px] sm:text-[24px] font-semibold tracking-tight leading-tight text-white mt-1.5">
            Apply with Elec-ID.
          </SheetTitle>
          <p className="text-[12.5px] text-white/85 mt-0.5">
            Your verified profile gets shared directly with the hiring team.
          </p>
        </SheetHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-5">
          {/* Vacancy Info Card */}
          <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_15%)_0%,hsl(0_0%_11%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <Avatar className="h-12 w-12 rounded-xl">
                <AvatarImage src={vacancy.employer?.logo_url || undefined} />
                <AvatarFallback className="rounded-xl bg-emerald-500/[0.08] border border-emerald-500/30 text-emerald-300 font-semibold text-[11px] tabular-nums">
                  {companyInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-emerald-300 inline-flex items-center gap-1">
                  <Building2 className="h-3 w-3" aria-hidden />
                  {vacancy.employer?.company_name || 'Employer'}
                </p>
                <h3 className="mt-1 text-[15px] sm:text-[16px] font-semibold tracking-tight text-white leading-snug">
                  {vacancy.title}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.12em] font-semibold text-white/85 border border-white/15 rounded-md px-1.5 py-0.5">
                    <MapPin className="h-3 w-3" />
                    {vacancy.location}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.12em] font-semibold text-white/85 border border-white/15 rounded-md px-1.5 py-0.5">
                    <Briefcase className="h-3 w-3" />
                    {vacancy.type}
                  </span>
                  {salaryDisplay && (
                    <span className="inline-flex items-center text-[10px] uppercase tracking-[0.12em] font-semibold text-elec-yellow border border-elec-yellow/40 bg-elec-yellow/[0.08] rounded-md px-1.5 py-0.5 tabular-nums">
                      {salaryDisplay}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Elec-ID Profile Preview */}
          {profileLoading ? (
            <div className="flex items-center gap-3 p-4 rounded-2xl border border-white/[0.10] bg-white/[0.02]">
              <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />
              <span className="text-[13px] text-white/85">Loading your Elec-ID…</span>
            </div>
          ) : elecIdProfile ? (
            <div className="space-y-3">
              {/* Profile Header */}
              <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_15%)_0%,hsl(0_0%_11%)_100%)] border border-emerald-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <Shield className="h-4 w-4 text-emerald-300" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                          Elec-ID
                        </p>
                        <VerificationBadge tier={elecIdProfile.verification_tier} />
                      </div>
                      <p className="mt-0.5 text-[13px] text-white font-mono tabular-nums truncate">
                        {elecIdProfile.elec_id_number}
                      </p>
                    </div>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0 self-center" aria-hidden />
                </div>

                {/* Toggle to show preview */}
                <button
                  type="button"
                  onClick={() => setShowProfilePreview(!showProfilePreview)}
                  className="mt-4 pt-3 border-t border-white/[0.06] w-full flex items-center justify-between text-[11px] uppercase tracking-[0.14em] font-semibold text-emerald-300 hover:text-emerald-200 transition-colors touch-manipulation"
                >
                  <span>What gets shared with the employer</span>
                  <ChevronDown
                    className={cn(
                      'h-3.5 w-3.5 transition-transform',
                      showProfilePreview && 'rotate-180'
                    )}
                  />
                </button>

                {/* Profile Preview */}
                <AnimatePresence>
                  {showProfilePreview && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-emerald-500/20 space-y-3">
                        {/* ECS Card */}
                        {elecIdProfile.ecs_card_type && (
                          <div className="flex items-center gap-2 text-sm">
                            <CreditCard className="h-4 w-4 text-emerald-400" />
                            <span className="text-white">ECS Card:</span>
                            <span className="text-foreground font-medium">
                              {elecIdProfile.ecs_card_type}
                            </span>
                          </div>
                        )}

                        {/* Specialisations */}
                        {elecIdProfile.specialisations &&
                          elecIdProfile.specialisations.length > 0 && (
                            <div className="flex items-start gap-2 text-sm">
                              <Wrench className="h-4 w-4 text-emerald-400 mt-0.5" />
                              <div>
                                <span className="text-white">Specialisations:</span>
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
                              <span className="text-white">Bio:</span>
                              <p className="text-foreground line-clamp-2 mt-0.5">
                                {elecIdProfile.bio}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* What's included */}
                        <div className="mt-2 pt-2 border-t border-emerald-500/10">
                          <p className="text-xs text-white mb-2">Also includes:</p>
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
            <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_15%)_0%,hsl(0_0%_11%)_100%)] border border-red-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-4 w-4 text-red-300 shrink-0 self-center" aria-hidden />
                <div className="min-w-0">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-red-300">
                    Elec-ID Required
                  </p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-white/85">
                    Complete your Elec-ID profile before applying — employers use it to verify your
                    credentials.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CV Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Attach CV (Optional)
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  onOpenChange(false);
                  navigate('/electrician/cv-builder');
                }}
                className="gap-1.5 h-9 text-sm touch-manipulation"
              >
                <Plus className="h-4 w-4" />
                Create CV
              </Button>
            </div>

            {loadingCVs ? (
              <div className="flex items-center gap-2 p-3 bg-muted rounded-xl">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-white">Loading your CVs...</span>
              </div>
            ) : userCVs.length > 0 ? (
              <Select value={selectedCvId} onValueChange={setSelectedCvId}>
                <SelectTrigger className="h-12 touch-manipulation">
                  <SelectValue placeholder="Select a CV to attach" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No CV attached</SelectItem>
                  {userCVs.map((cv) => (
                    <SelectItem key={cv.id} value={cv.id}>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>{cv.title}</span>
                        {cv.is_primary && (
                          <Badge variant="secondary" className="text-xs ml-1">
                            Primary
                          </Badge>
                        )}
                        <span className="text-xs text-white ml-1">
                          ({cv.template_id})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="p-3 bg-muted/50 rounded-xl">
                <p className="text-sm text-white">
                  No CVs saved yet. Create one to attach to your application.
                </p>
              </div>
            )}

            {selectedCvId && (
              <p className="text-xs text-emerald-400">
                Your CV will be shared with the employer along with your Elec-ID.
              </p>
            )}
          </div>

          {/* Cover Letter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="cover-letter" className="text-sm font-medium">
                Cover Letter (Optional)
              </Label>
              {elecIdProfile && (
                <button
                  type="button"
                  onClick={generateCoverLetter}
                  disabled={isGeneratingCoverLetter}
                  className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-elec-yellow border border-elec-yellow/40 bg-elec-yellow/[0.08] hover:bg-elec-yellow/[0.12] rounded-full px-3 py-1.5 min-h-[36px] touch-manipulation transition-colors disabled:opacity-50"
                >
                  {isGeneratingCoverLetter ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Writing…
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5" />
                      AI write
                    </>
                  )}
                </button>
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
            <p className="text-xs text-white">
              {elecIdProfile
                ? 'Use AI to write a personalised cover letter based on your Elec-ID, or write your own.'
                : 'A personalised cover letter can help you stand out from other applicants.'}
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
              <p className="text-xs text-white">
                This includes your certifications, work history, and verification status.
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Footer - Action Buttons */}
        <div
          className="border-t border-white/[0.08] bg-[hsl(0_0%_8%)]/95 backdrop-blur-xl px-5 py-4 flex gap-2"
          style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
        >
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={applyMutation.isPending}
            className="flex-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 hover:border-white/30 rounded-full px-4 py-3 min-h-[44px] inline-flex items-center justify-center gap-2 touch-manipulation transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            disabled={applyMutation.isPending || !elecIdProfile || !shareProfile}
            className="flex-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-black bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-300/90 rounded-full px-4 py-3 min-h-[44px] inline-flex items-center justify-center gap-2 touch-manipulation transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {applyMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Applying…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Apply with Elec-ID
              </>
            )}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
