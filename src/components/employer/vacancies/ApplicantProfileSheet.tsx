/**
 * ApplicantProfileSheet - Full profile view for employers viewing applicants
 * Shows complete Elec-ID data: qualifications, skills, work history, training
 */

import { useState } from 'react';
import { Drawer } from 'vaul';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
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
  MessageSquare,
  FileText,
  AlertCircle,
} from 'lucide-react';
import type { EmployerVacancyApplication } from '@/services/vacancyService';
import { CandidateNotesSection } from './CandidateNotesSection';
import { useUpdateApplicationNotes } from '@/hooks/useVacancyApplications';
import { toast } from '@/hooks/use-toast';
import {
  Eyebrow,
  FormCard,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  IconButton,
} from '@/components/employer/editorial';

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
      label: 'Basic',
      color: 'bg-white/[0.06] text-white border-white/[0.08]',
      icon: <Shield className="h-4 w-4" />,
    },
    verified: {
      label: 'Verified',
      color: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
      icon: <BadgeCheck className="h-4 w-4" />,
    },
    premium: {
      label: 'Premium',
      color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
      icon: <Award className="h-4 w-4" />,
    },
  };

  const config = tierConfig[tier] || tierConfig.basic;

  return (
    <Badge className={cn('text-[13px] font-medium gap-1.5 px-3 py-1', config.color)}>
      {config.icon}
      {config.label}
    </Badge>
  );
};

// Skill level indicator
const SkillLevelBadge = ({ level }: { level: string }) => {
  const levelConfig: Record<string, { color: string; width: string }> = {
    beginner: { color: 'bg-blue-500', width: 'w-1/4' },
    intermediate: { color: 'bg-emerald-500', width: 'w-2/4' },
    advanced: { color: 'bg-purple-500', width: 'w-3/4' },
    expert: { color: 'bg-elec-yellow', width: 'w-full' },
  };

  const config = levelConfig[level.toLowerCase()] || levelConfig.intermediate;

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
        <div className={cn('h-full rounded-full transition-all', config.color, config.width)} />
      </div>
      <span className="text-[11px] text-white capitalize w-20">{level}</span>
    </div>
  );
};

// Format date helper
const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
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
  const [activeTab, setActiveTab] = useState('overview');
  const updateNotes = useUpdateApplicationNotes();

  const handleSaveNotes = async (notes: string) => {
    if (!application) return;
    try {
      await updateNotes.mutateAsync({ id: application.id, notes });
      toast({
        title: 'Notes saved',
        description: 'Candidate notes have been updated.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save notes. Please try again.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  if (!application) return null;

  const profile = application.elec_id_profile;
  const initials = application.applicant_name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const totalExperience =
    profile?.work_history?.reduce((total, job) => {
      const start = new Date(job.start_date);
      const end = job.end_date ? new Date(job.end_date) : new Date();
      return total + (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365);
    }, 0) || 0;

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      New: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
      Reviewing: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
      Shortlisted: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
      Interviewed: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
      Offered: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
      Hired: 'bg-green-500/15 text-green-400 border-green-500/25',
      Rejected: 'bg-red-500/15 text-red-400 border-red-500/25',
    };
    return colors[status] || colors.New;
  };

  return (
    <Drawer.Root shouldScaleBackground={false} noBodyStyles open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col max-h-[92vh] bg-[hsl(0_0%_8%)] rounded-t-[20px] border-t border-white/[0.06]">
          {/* Handle */}
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <div className="px-5 pb-4 border-b border-white/[0.06]">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16 rounded-xl border-2 border-emerald-500/30">
                  <AvatarFallback className="rounded-xl bg-emerald-500/15 text-emerald-400 text-xl font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Eyebrow>Applicant</Eyebrow>
                  <h2 className="text-[20px] font-semibold text-white leading-tight mt-1">
                    {application.applicant_name}
                  </h2>
                  {profile && (
                    <div className="flex items-center gap-2 mt-1.5">
                      <VerificationBadge tier={profile.verification_tier} />
                      <Badge className={cn('text-[11px]', getStatusColor(application.status))}>
                        {application.status}
                      </Badge>
                    </div>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-[13px] text-white">
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
              <IconButton aria-label="Close" onClick={() => onOpenChange(false)}>
                <X className="h-5 w-5" />
              </IconButton>
            </div>

            {/* Quick Stats */}
            {profile && (
              <div className="grid grid-cols-4 gap-px mt-4 bg-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden">
                <div className="bg-[hsl(0_0%_10%)] p-3 text-center">
                  <div className="text-lg font-semibold text-white tabular-nums">
                    {profile.qualifications?.length || 0}
                  </div>
                  <div className="text-[10px] text-white uppercase tracking-[0.14em] font-medium mt-1">
                    Quals
                  </div>
                </div>
                <div className="bg-[hsl(0_0%_10%)] p-3 text-center">
                  <div className="text-lg font-semibold text-white tabular-nums">
                    {profile.skills?.length || 0}
                  </div>
                  <div className="text-[10px] text-white uppercase tracking-[0.14em] font-medium mt-1">
                    Skills
                  </div>
                </div>
                <div className="bg-[hsl(0_0%_10%)] p-3 text-center">
                  <div className="text-lg font-semibold text-white tabular-nums">
                    {Math.round(totalExperience)}y
                  </div>
                  <div className="text-[10px] text-white uppercase tracking-[0.14em] font-medium mt-1">
                    Exp
                  </div>
                </div>
                <div className="bg-[hsl(0_0%_10%)] p-3 text-center">
                  <div className="text-lg font-semibold text-white tabular-nums">
                    {profile.training?.length || 0}
                  </div>
                  <div className="text-[10px] text-white uppercase tracking-[0.14em] font-medium mt-1">
                    Training
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col min-h-0"
          >
            <TabsList className="w-full justify-start px-5 pt-2 bg-transparent border-b border-white/[0.06] rounded-none h-auto">
              <TabsTrigger
                value="overview"
                className="text-[11px] text-white data-[state=active]:bg-elec-yellow/15 data-[state=active]:text-elec-yellow"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="qualifications"
                className="text-[11px] text-white data-[state=active]:bg-elec-yellow/15 data-[state=active]:text-elec-yellow"
              >
                Qualifications
              </TabsTrigger>
              <TabsTrigger
                value="experience"
                className="text-[11px] text-white data-[state=active]:bg-elec-yellow/15 data-[state=active]:text-elec-yellow"
              >
                Experience
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="text-[11px] text-white data-[state=active]:bg-elec-yellow/15 data-[state=active]:text-elec-yellow"
              >
                Skills
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="text-[11px] text-white data-[state=active]:bg-elec-yellow/15 data-[state=active]:text-elec-yellow"
              >
                Notes
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1">
              {/* Overview Tab */}
              <TabsContent value="overview" className="p-5 space-y-4 m-0">
                {/* Elec-ID Card */}
                {profile && (
                  <FormCard eyebrow="Elec-ID">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-emerald-400" />
                          <span className="font-semibold text-white">Elec-ID</span>
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
                      <div className="mt-4 p-3 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06]">
                        <div className="flex items-center gap-2 text-[13px]">
                          <CreditCard className="h-4 w-4 text-emerald-400" />
                          <span className="text-white">ECS Card:</span>
                          <span className="font-semibold text-white">
                            {profile.ecs_card_type}
                          </span>
                        </div>
                        {profile.ecs_expiry_date && (
                          <div className="flex items-center gap-2 text-[13px] mt-1">
                            <Calendar className="h-4 w-4 text-emerald-400" />
                            <span className="text-white">Expires:</span>
                            <span className="text-white">
                              {formatDate(profile.ecs_expiry_date)}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </FormCard>
                )}

                {/* Bio */}
                {profile?.bio && (
                  <FormCard eyebrow="About">
                    <p className="text-[13px] text-white">{profile.bio}</p>
                  </FormCard>
                )}

                {/* Specialisations */}
                {profile?.specialisations && profile.specialisations.length > 0 && (
                  <FormCard eyebrow="Specialisations">
                    <div className="flex flex-wrap gap-2">
                      {profile.specialisations.map((spec, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
                        >
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </FormCard>
                )}

                {/* Cover Letter */}
                {application.cover_letter && (
                  <FormCard eyebrow="Cover Letter">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-blue-400" />
                      <span className="text-[13px] font-medium text-white">Cover Letter</span>
                    </div>
                    <p className="text-[13px] text-white whitespace-pre-wrap">
                      {application.cover_letter}
                    </p>
                  </FormCard>
                )}

                {/* Applied Position */}
                {application.vacancy && (
                  <FormCard eyebrow="Applied For">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-blue-400" />
                          <p className="font-medium text-white">{application.vacancy.title}</p>
                        </div>
                        <p className="text-[13px] text-white flex items-center gap-1 mt-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {application.vacancy.location}
                        </p>
                      </div>
                      <div className="text-right text-[13px] text-white">
                        <p>Applied: {formatDate(application.applied_at)}</p>
                      </div>
                    </div>
                  </FormCard>
                )}
              </TabsContent>

              {/* Qualifications Tab */}
              <TabsContent value="qualifications" className="p-5 space-y-3 m-0">
                {profile?.qualifications && profile.qualifications.length > 0 ? (
                  profile.qualifications.map((qual) => (
                    <FormCard key={qual.id}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-purple-500/15 flex items-center justify-center shrink-0">
                            <GraduationCap className="h-5 w-5 text-purple-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">{qual.qualification_name}</h4>
                            <p className="text-[13px] text-white">{qual.awarding_body}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                variant="outline"
                                className="text-[11px] bg-white/[0.06] border-white/[0.08] text-white"
                              >
                                {qual.qualification_type}
                              </Badge>
                              {qual.grade && (
                                <Badge
                                  variant="outline"
                                  className="text-[11px] bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
                                >
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
                            <AlertCircle className="h-5 w-5 text-white" />
                          )}
                          {qual.date_achieved && (
                            <p className="text-[11px] text-white mt-1">
                              {formatDate(qual.date_achieved)}
                            </p>
                          )}
                        </div>
                      </div>
                    </FormCard>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <GraduationCap className="h-12 w-12 mx-auto text-white mb-3" />
                    <p className="text-white">No qualifications added</p>
                  </div>
                )}
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent value="experience" className="p-5 space-y-3 m-0">
                {profile?.work_history && profile.work_history.length > 0 ? (
                  profile.work_history.map((job, index) => (
                    <FormCard key={job.id} className="relative">
                      {index < (profile.work_history?.length || 0) - 1 && (
                        <div className="absolute left-7 top-16 bottom-0 w-0.5 bg-white/[0.06]" />
                      )}
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                            job.is_current ? 'bg-emerald-500/15' : 'bg-blue-500/15'
                          )}
                        >
                          <Building2
                            className={cn(
                              'h-5 w-5',
                              job.is_current ? 'text-emerald-400' : 'text-blue-400'
                            )}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-white">{job.job_title}</h4>
                              <p className="text-[13px] text-white">{job.employer_name}</p>
                            </div>
                            {job.is_current && (
                              <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/25 text-[11px]">
                                Current
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-2 text-[11px] text-white">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>
                              {formatDate(job.start_date)} -{' '}
                              {job.is_current ? 'Present' : formatDate(job.end_date)}
                            </span>
                            <span className="text-emerald-400">
                              ({calculateDuration(job.start_date, job.end_date, job.is_current)})
                            </span>
                          </div>
                          {job.description && (
                            <p className="text-[13px] text-white mt-2">{job.description}</p>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            {job.is_verified && (
                              <Badge
                                variant="outline"
                                className="text-[11px] bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
                              >
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </FormCard>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Building2 className="h-12 w-12 mx-auto text-white mb-3" />
                    <p className="text-white">No work history added</p>
                  </div>
                )}
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills" className="p-5 space-y-3 m-0">
                {profile?.skills && profile.skills.length > 0 ? (
                  profile.skills.map((skill) => (
                    <FormCard key={skill.id}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Wrench className="h-4 w-4 text-emerald-400" />
                          <span className="font-medium text-white">{skill.skill_name}</span>
                          {skill.is_verified && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          )}
                        </div>
                        <span className="text-[11px] text-white">
                          {skill.years_experience}y exp
                        </span>
                      </div>
                      <SkillLevelBadge level={skill.skill_level} />
                    </FormCard>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Wrench className="h-12 w-12 mx-auto text-white mb-3" />
                    <p className="text-white">No skills added</p>
                  </div>
                )}

                {/* Training Section */}
                {profile?.training && profile.training.length > 0 && (
                  <>
                    <h3 className="font-semibold text-white flex items-center gap-2 pt-4">
                      <BookOpen className="h-4 w-4 text-blue-400" />
                      Training & Certifications
                    </h3>
                    {profile.training.map((training) => (
                      <FormCard key={training.id}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-white">{training.training_name}</h4>
                            {training.provider && (
                              <p className="text-[13px] text-white">{training.provider}</p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              {training.completed_date && (
                                <span className="text-[11px] text-white flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {formatDate(training.completed_date)}
                                </span>
                              )}
                              {training.expiry_date && (
                                <span className="text-[11px] text-amber-400 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  Expires: {formatDate(training.expiry_date)}
                                </span>
                              )}
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={cn(
                              'text-[11px]',
                              training.status === 'completed'
                                ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
                                : 'bg-amber-500/10 border-amber-500/25 text-amber-400'
                            )}
                          >
                            {training.status}
                          </Badge>
                        </div>
                      </FormCard>
                    ))}
                  </>
                )}
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes" className="p-5 m-0">
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
          <div className="p-4 border-t border-white/[0.06] bg-[hsl(0_0%_8%)]">
            <div className="flex gap-2">
              {application.status === 'New' && (
                <>
                  <DestructiveButton
                    fullWidth
                    onClick={() => onUpdateStatus?.('Rejected')}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </DestructiveButton>
                  <PrimaryButton
                    fullWidth
                    onClick={() => onUpdateStatus?.('Shortlisted')}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Shortlist
                  </PrimaryButton>
                </>
              )}
              {application.status === 'Shortlisted' && (
                <PrimaryButton
                  fullWidth
                  onClick={() => onUpdateStatus?.('Interviewed')}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Mark Interviewed
                </PrimaryButton>
              )}
              {application.status === 'Interviewed' && (
                <PrimaryButton
                  fullWidth
                  onClick={() => onUpdateStatus?.('Offered')}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Make Offer
                </PrimaryButton>
              )}
              {application.status === 'Offered' && (
                <PrimaryButton
                  fullWidth
                  onClick={() => onUpdateStatus?.('Hired')}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark Hired
                </PrimaryButton>
              )}
              {onMessage && (
                <SecondaryButton fullWidth onClick={onMessage}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </SecondaryButton>
              )}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default ApplicantProfileSheet;
