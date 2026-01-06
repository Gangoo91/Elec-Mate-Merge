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
} from "lucide-react";
import { useApplyToVacancy } from "@/hooks/useInternalVacancies";
import { useElecIdProfile } from "@/hooks/useElecIdProfile";
import { toast } from "@/hooks/use-toast";
import type { InternalVacancy } from "./InternalVacancyCard";

interface ApplyToVacancyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vacancy: InternalVacancy | null;
  onSuccess?: () => void;
}

export function ApplyToVacancyDialog({
  open,
  onOpenChange,
  vacancy,
  onSuccess,
}: ApplyToVacancyDialogProps) {
  const { profile: elecIdProfile, isLoading: profileLoading } = useElecIdProfile();
  const [coverLetter, setCoverLetter] = useState("");
  const [shareProfile, setShareProfile] = useState(true);

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

          {/* Profile Status */}
          {profileLoading ? (
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Checking your profile...</span>
            </div>
          ) : elecIdProfile ? (
            <div className="flex gap-2 p-3 bg-green-500/10 rounded-lg text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Profile Ready</p>
                <p className="text-muted-foreground">
                  Your Elec-ID ({elecIdProfile.elec_id_number}) will be shared with the employer.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex gap-2 p-3 bg-destructive/10 rounded-lg text-sm">
              <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-destructive">Profile Required</p>
                <p className="text-muted-foreground">
                  Please complete your Elec-ID profile before applying to vacancies.
                </p>
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
              className="flex-1 h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90"
              onClick={handleApply}
              disabled={applyMutation.isPending || !elecIdProfile || !shareProfile}
            >
              {applyMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Application
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
