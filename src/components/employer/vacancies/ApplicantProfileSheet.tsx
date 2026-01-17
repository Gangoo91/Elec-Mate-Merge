/**
 * ApplicantProfileSheet - Full profile view for employers viewing applicants
 * Shows complete Elec-ID data: qualifications, skills, work history, training
 */

import { useState } from "react";
import { Drawer } from "vaul";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  X,
  Shield,
  BadgeCheck,
  Award,
  CreditCard,
  Briefcase,
  GraduationCap,
  Wrench,
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  XCircle,
  Star,
  Building2,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  FileText,
  AlertCircle,
} from "lucide-react";
import type { EmployerVacancyApplication, FullElecIdProfile } from "@/services/vacancyService";
import { CandidateNotesSection } from "./CandidateNotesSection";
import { useUpdateApplicationNotes } from "@/hooks/useVacancyApplications";
import { toast } from "@/hooks/use-toast";

interface ApplicantProfileSheetProps {
  application: EmployerVacancyApplication | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus?: (status: EmployerVacancyApplication['status']) => void;
  onMessage?: () => void;
}

// Verification tier badge
const VerificationBadge = ({ tier }: { tier: string }) => {
  const tierConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    basic: {
      label: "Basic",
      color: "bg-slate-500/20 text-slate-300 border-slate-500/30",
      icon: <Shield className="h-4 w-4" />
    },
    verified: {
      label: "Verified",
      color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      icon: <BadgeCheck className="h-4 w-4" />
    },
    premium: {
      label: "Premium",
      color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      icon: <Award className="h-4 w-4" />
    },
  };

  const config = tierConfig[tier] || tierConfig.basic;

  return (
    <Badge className={cn("text-sm font-medium gap-1.5 px-3 py-1", config.color)}>
      {config.icon}
      {config.label}
    </Badge>
  );
};

// Skill level indicator
const SkillLevelBadge = ({ level }: { level: string }) => {
  const levelConfig: Record<string, { color: string; width: string }> = {
    beginner: { color: "bg-blue-500", width: "w-1/4" },
    intermediate: { color: "bg-emerald-500", width: "w-2/4" },
    advanced: { color: "bg-purple-500", width: "w-3/4" },
    expert: { color: "bg-amber-500", width: "w-full" },
  };

  const config = levelConfig[level.toLowerCase()] || levelConfig.intermediate;

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full transition-all", config.color, config.width)} />
      </div>
      <span className="text-xs text-muted-foreground capitalize w-20">{level}</span>
    </div>
  );
};

// Format date helper
const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Calculate duration helper
const calculateDuration = (startDate: string, endDate: string | null, isCurrent: boolean) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const months = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years > 0) {
    return `${years}y ${remainingMonths}m`;
  }
  return `${remainingMonths}m`;
};

export function ApplicantProfileSheet({
  application,
  open,
  onOpenChange,
  onUpdateStatus,
  onMessage,
}: ApplicantProfileSheetProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const updateNotes = useUpdateApplicationNotes();

  const handleSaveNotes = async (notes: string) => {
    if (!application) return;
    try {
      await updateNotes.mutateAsync({ id: application.id, notes });
      toast({
        title: "Notes saved",
        description: "Candidate notes have been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save notes. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  if (!application) return null;

  const profile = application.elec_id_profile;
  const initials = application.applicant_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const totalExperience = profile?.work_history?.reduce((total, job) => {
    const start = new Date(job.start_date);
    const end = job.end_date ? new Date(job.end_date) : new Date();
    return total + (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365);
  }, 0) || 0;

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      New: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      Reviewing: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      Shortlisted: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      Interviewed: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      Offered: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      Hired: "bg-green-500/20 text-green-400 border-green-500/30",
      Rejected: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return colors[status] || colors.New;
  };

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col max-h-[92vh] bg-background rounded-t-[20px] border-t border-border">
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
          </div>

          {/* Header */}
          <div className="px-4 pb-4 border-b border-border">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16 rounded-xl border-2 border-emerald-500/30">
                  <AvatarFallback className="rounded-xl bg-emerald-500/20 text-emerald-400 text-xl font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{application.applicant_name}</h2>
                  {profile && (
                    <div className="flex items-center gap-2 mt-1">
                      <VerificationBadge tier={profile.verification_tier} />
                      <Badge className={cn("text-xs", getStatusColor(application.status))}>
                        {application.status}
                      </Badge>
                    </div>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                    {application.applicant_email && (
                      <span className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" />
                        {application.applicant_email}
                      </span>
                    )}
                    {application.applicant_phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" />
                        {application.applicant_phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Quick Stats */}
            {profile && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                <div className="p-2 rounded-lg bg-muted/50 text-center">
                  <div className="text-lg font-bold text-foreground">
                    {profile.qualifications?.length || 0}
                  </div>
                  <div className="text-xs text-muted-foreground">Qualifications</div>
                </div>
                <div className="p-2 rounded-lg bg-muted/50 text-center">
                  <div className="text-lg font-bold text-foreground">
                    {profile.skills?.length || 0}
                  </div>
                  <div className="text-xs text-muted-foreground">Skills</div>
                </div>
                <div className="p-2 rounded-lg bg-muted/50 text-center">
                  <div className="text-lg font-bold text-foreground">
                    {Math.round(totalExperience)}y
                  </div>
                  <div className="text-xs text-muted-foreground">Experience</div>
                </div>
                <div className="p-2 rounded-lg bg-muted/50 text-center">
                  <div className="text-lg font-bold text-foreground">
                    {profile.training?.length || 0}
                  </div>
                  <div className="text-xs text-muted-foreground">Training</div>
                </div>
              </div>
            )}
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
            <TabsList className="w-full justify-start px-4 pt-2 bg-transparent border-b border-border rounded-none h-auto">
              <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-emerald-500/20">
                Overview
              </TabsTrigger>
              <TabsTrigger value="qualifications" className="text-xs data-[state=active]:bg-emerald-500/20">
                Qualifications
              </TabsTrigger>
              <TabsTrigger value="experience" className="text-xs data-[state=active]:bg-emerald-500/20">
                Experience
              </TabsTrigger>
              <TabsTrigger value="skills" className="text-xs data-[state=active]:bg-emerald-500/20">
                Skills
              </TabsTrigger>
              <TabsTrigger value="notes" className="text-xs data-[state=active]:bg-amber-500/20">
                Notes
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1">
              {/* Overview Tab */}
              <TabsContent value="overview" className="p-4 space-y-4 m-0">
                {/* Elec-ID Card */}
                {profile && (
                  <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-emerald-400" />
                            <span className="font-semibold text-foreground">Elec-ID</span>
                          </div>
                          <p className="text-lg font-mono text-emerald-400 mt-1">
                            {profile.elec_id_number}
                          </p>
                        </div>
                        {profile.is_verified && (
                          <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                        )}
                      </div>

                      {/* ECS Card Info */}
                      {profile.ecs_card_type && (
                        <div className="mt-4 p-3 rounded-lg bg-background/50">
                          <div className="flex items-center gap-2 text-sm">
                            <CreditCard className="h-4 w-4 text-emerald-400" />
                            <span className="text-muted-foreground">ECS Card:</span>
                            <span className="font-semibold text-foreground">{profile.ecs_card_type}</span>
                          </div>
                          {profile.ecs_expiry_date && (
                            <div className="flex items-center gap-2 text-sm mt-1">
                              <Calendar className="h-4 w-4 text-emerald-400" />
                              <span className="text-muted-foreground">Expires:</span>
                              <span className="text-foreground">{formatDate(profile.ecs_expiry_date)}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Bio */}
                {profile?.bio && (
                  <Card className="bg-card border-border">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-2">About</h3>
                      <p className="text-sm text-muted-foreground">{profile.bio}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Specialisations */}
                {profile?.specialisations && profile.specialisations.length > 0 && (
                  <Card className="bg-card border-border">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Wrench className="h-4 w-4 text-emerald-400" />
                        Specialisations
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.specialisations.map((spec, i) => (
                          <Badge key={i} variant="outline" className="bg-emerald-500/10 border-emerald-500/20 text-emerald-300">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Cover Letter */}
                {application.cover_letter && (
                  <Card className="bg-card border-border">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-400" />
                        Cover Letter
                      </h3>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {application.cover_letter}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Applied Position */}
                {application.vacancy && (
                  <Card className="bg-card border-border">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-blue-400" />
                        Applied For
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">{application.vacancy.title}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {application.vacancy.location}
                          </p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <p>Applied: {formatDate(application.applied_at)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Qualifications Tab */}
              <TabsContent value="qualifications" className="p-4 space-y-3 m-0">
                {profile?.qualifications && profile.qualifications.length > 0 ? (
                  profile.qualifications.map((qual) => (
                    <Card key={qual.id} className="bg-card border-border">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                              <GraduationCap className="h-5 w-5 text-purple-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground">{qual.qualification_name}</h4>
                              <p className="text-sm text-muted-foreground">{qual.awarding_body}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {qual.qualification_type}
                                </Badge>
                                {qual.grade && (
                                  <Badge variant="outline" className="text-xs bg-emerald-500/10 border-emerald-500/20 text-emerald-300">
                                    {qual.grade}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            {qual.is_verified ? (
                              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-muted-foreground" />
                            )}
                            {qual.date_achieved && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {formatDate(qual.date_achieved)}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">No qualifications added</p>
                  </div>
                )}
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent value="experience" className="p-4 space-y-3 m-0">
                {profile?.work_history && profile.work_history.length > 0 ? (
                  profile.work_history.map((job, index) => (
                    <Card key={job.id} className="bg-card border-border relative">
                      {/* Timeline connector */}
                      {index < (profile.work_history?.length || 0) - 1 && (
                        <div className="absolute left-7 top-16 bottom-0 w-0.5 bg-border" />
                      )}
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                            job.is_current
                              ? "bg-emerald-500/20"
                              : "bg-blue-500/20"
                          )}>
                            <Building2 className={cn(
                              "h-5 w-5",
                              job.is_current ? "text-emerald-400" : "text-blue-400"
                            )} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-foreground">{job.job_title}</h4>
                                <p className="text-sm text-muted-foreground">{job.employer_name}</p>
                              </div>
                              {job.is_current && (
                                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                                  Current
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>
                                {formatDate(job.start_date)} - {job.is_current ? "Present" : formatDate(job.end_date)}
                              </span>
                              <span className="text-emerald-400">
                                ({calculateDuration(job.start_date, job.end_date, job.is_current)})
                              </span>
                            </div>
                            {job.description && (
                              <p className="text-sm text-muted-foreground mt-2">{job.description}</p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              {job.is_verified && (
                                <Badge variant="outline" className="text-xs bg-emerald-500/10 border-emerald-500/20 text-emerald-300">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Building2 className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">No work history added</p>
                  </div>
                )}
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills" className="p-4 space-y-3 m-0">
                {profile?.skills && profile.skills.length > 0 ? (
                  profile.skills.map((skill) => (
                    <Card key={skill.id} className="bg-card border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Wrench className="h-4 w-4 text-emerald-400" />
                            <span className="font-medium text-foreground">{skill.skill_name}</span>
                            {skill.is_verified && (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {skill.years_experience}y exp
                          </span>
                        </div>
                        <SkillLevelBadge level={skill.skill_level} />
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Wrench className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">No skills added</p>
                  </div>
                )}

                {/* Training Section */}
                {profile?.training && profile.training.length > 0 && (
                  <>
                    <h3 className="font-semibold text-foreground flex items-center gap-2 pt-4">
                      <BookOpen className="h-4 w-4 text-blue-400" />
                      Training & Certifications
                    </h3>
                    {profile.training.map((training) => (
                      <Card key={training.id} className="bg-card border-border">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-foreground">{training.training_name}</h4>
                              {training.provider && (
                                <p className="text-sm text-muted-foreground">{training.provider}</p>
                              )}
                              <div className="flex items-center gap-2 mt-2">
                                {training.completed_date && (
                                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {formatDate(training.completed_date)}
                                  </span>
                                )}
                                {training.expiry_date && (
                                  <span className="text-xs text-amber-400 flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    Expires: {formatDate(training.expiry_date)}
                                  </span>
                                )}
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs",
                                training.status === "completed"
                                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                                  : "bg-amber-500/10 border-amber-500/20 text-amber-300"
                              )}
                            >
                              {training.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </>
                )}
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes" className="p-4 m-0">
                <CandidateNotesSection
                  notes={application.notes}
                  updatedAt={application.updated_at}
                  onSave={handleSaveNotes}
                  isLoading={updateNotes.isPending}
                />
              </TabsContent>
            </ScrollArea>
          </Tabs>

          {/* Footer Actions */}
          <div className="p-4 border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="flex gap-2">
              {application.status === "New" && (
                <>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => onUpdateStatus?.("Rejected")}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    className="flex-1 bg-purple-500 hover:bg-purple-400 text-white"
                    onClick={() => onUpdateStatus?.("Shortlisted")}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Shortlist
                  </Button>
                </>
              )}
              {application.status === "Shortlisted" && (
                <Button
                  className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-white"
                  onClick={() => onUpdateStatus?.("Interviewed")}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Mark Interviewed
                </Button>
              )}
              {application.status === "Interviewed" && (
                <Button
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white"
                  onClick={() => onUpdateStatus?.("Offered")}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Make Offer
                </Button>
              )}
              {application.status === "Offered" && (
                <Button
                  className="flex-1 bg-green-500 hover:bg-green-400 text-white"
                  onClick={() => onUpdateStatus?.("Hired")}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark Hired
                </Button>
              )}
              {onMessage && (
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={onMessage}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
              )}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default ApplicantProfileSheet;
