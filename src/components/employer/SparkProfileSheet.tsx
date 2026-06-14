import { useQuery } from '@tanstack/react-query';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PrimaryButton, SecondaryButton } from './editorial';
import { supabase } from '@/integrations/supabase/client';
import {
  CheckCircle,
  Heart,
  MessageSquare,
  Award,
  Shield,
  FileText,
  GraduationCap,
  Send,
} from 'lucide-react';
import type { TalentPoolWorker } from '@/hooks/useTalentPool';

/* ==========================================================================
   SparkProfileSheet — a candidate's profile, built ONLY from what they
   declared and what Elec-ID actually verified. No ratings, reviews,
   availability calendars or distances — none of that data exists yet.
   ========================================================================== */

// Elec-ID verification tiers aligned with database schema
export type VerificationTier = 'basic' | 'verified' | 'premium';

interface SparkProfileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  worker: TalentPoolWorker | null;
  isSaved: boolean;
  onSave: () => void;
  onContact: () => void;
  onInvite?: () => void;
}

const tierConfig: Record<
  VerificationTier,
  { label: string; color: string; icon: typeof Shield; bg: string; description: string }
> = {
  basic: {
    label: 'Basic',
    color: 'text-white',
    icon: Shield,
    bg: 'bg-white/[0.06]',
    description: 'Profile created — documents not yet verified',
  },
  verified: {
    label: 'Verified',
    color: 'text-blue-400',
    icon: Shield,
    bg: 'bg-blue-500/20',
    description: 'ECS Card + qualification verified',
  },
  premium: {
    label: 'Premium',
    color: 'text-elec-yellow',
    icon: Award,
    bg: 'bg-elec-yellow/20',
    description: 'Fully verified profile',
  },
};

const DOC_LABELS: Record<string, string> = {
  ecs_card: 'ECS Card',
  qualification: 'Qualifications',
  training: 'Training',
  driving_licence: 'Driving licence',
  insurance: 'Insurance',
};

export function SparkProfileSheet({
  open,
  onOpenChange,
  worker,
  isSaved,
  onSave,
  onContact,
  onInvite,
}: SparkProfileSheetProps) {
  // Real qualification records — readable by employers under RLS
  const { data: qualifications = [] } = useQuery({
    queryKey: ['talent-profile-quals', worker?.profileId],
    enabled: open && !!worker?.profileId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employer_elec_id_qualifications')
        .select('id, qualification_name, awarding_body, date_achieved, is_verified')
        .eq('profile_id', worker!.profileId)
        .order('date_achieved', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  if (!worker) return null;

  const tier = tierConfig[worker.verificationTier];
  const TierIcon = tier.icon;
  const initials = worker.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[90vh] p-0 rounded-t-3xl bg-[hsl(0_0%_8%)] border-t border-white/[0.06]"
      >
        {/* Grab handle */}
        <div className="flex justify-center pt-2.5 pb-1 shrink-0">
          <div className="h-1 w-10 rounded-full bg-white/20" />
        </div>
        <ScrollArea className="h-full">
          <div className="pb-32">
            {/* Header */}
            <div className="px-5 pt-3 pb-5">
              <SheetHeader className="text-left space-y-0">
                <SheetDescription className="sr-only">
                  Candidate profile for {worker.name}
                </SheetDescription>
                <div className="flex items-start gap-3.5">
                  <Avatar className="w-[72px] h-[72px] rounded-2xl border border-white/[0.08] shadow-lg">
                    {worker.photoUrl && (
                      <AvatarImage
                        src={worker.photoUrl}
                        alt={worker.name}
                        className="object-cover"
                      />
                    )}
                    <AvatarFallback className="rounded-2xl bg-elec-yellow/10 text-elec-yellow text-xl font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center gap-1.5">
                      <SheetTitle className="text-[19px] font-semibold truncate text-white leading-tight">
                        {worker.name}
                      </SheetTitle>
                      {worker.isVerified && (
                        <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[13px] text-white mt-0.5">
                      {worker.jobTitle || 'Electrician'}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1 h-6 px-2.5 rounded-full text-[11px] font-medium ${tier.bg} ${tier.color}`}
                      >
                        <TierIcon className="h-3 w-3" />
                        {tier.label}
                      </span>
                      {worker.ecsCardType && (
                        <span className="h-6 px-2.5 inline-flex items-center rounded-full bg-white/[0.05] border border-white/[0.08] text-[11px] text-white">
                          {worker.ecsCardType} ECS card
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onSave}
                    aria-label={isSaved ? 'Remove from saved' : 'Save candidate'}
                    className="shrink-0 h-9 w-9 flex items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] touch-manipulation"
                  >
                    <Heart
                      className={`h-[18px] w-[18px] ${isSaved ? 'fill-elec-yellow text-elec-yellow' : 'text-white'}`}
                    />
                  </button>
                </div>
              </SheetHeader>

              {/* Key facts — declared/verified only */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2.5">
                  <p className="text-[18px] font-semibold text-elec-yellow tabular-nums leading-none">
                    {worker.dayRate != null ? `£${worker.dayRate}` : '—'}
                  </p>
                  <p className="text-[11px] text-white mt-1.5">
                    {worker.dayRate != null ? 'Day rate' : 'On request'}
                  </p>
                </div>
                <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2.5">
                  <p className="text-[18px] font-semibold text-white tabular-nums leading-none">
                    {worker.yearsExperience != null ? worker.yearsExperience : '—'}
                  </p>
                  <p className="text-[11px] text-white mt-1.5">Years exp</p>
                </div>
                <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2.5">
                  <p className="text-[18px] font-semibold text-white tabular-nums leading-none">
                    {worker.verifiedDocuments.length}
                  </p>
                  <p className="text-[11px] text-white mt-1.5">Verified</p>
                </div>
              </div>
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* About */}
            {worker.bio && (
              <div className="px-5 py-4">
                <p className="text-[11px] uppercase tracking-[0.16em] font-medium text-white mb-2">
                  About
                </p>
                <p className="text-[13.5px] text-white leading-relaxed">{worker.bio}</p>
              </div>
            )}

            {/* Specialisms */}
            {worker.specialisms.length > 0 && (
              <div className="px-5 py-4 border-t border-white/[0.04]">
                <p className="text-[11px] uppercase tracking-[0.16em] font-medium text-white mb-2.5">
                  Specialisms
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {worker.specialisms.map((spec) => (
                    <span
                      key={spec}
                      className="h-7 px-3 inline-flex items-center rounded-full bg-white/[0.05] border border-white/[0.08] text-[12px] text-white"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Skills with declared experience */}
            {worker.skills.length > 0 && (
              <div className="px-5 py-4 border-t border-white/[0.04]">
                <p className="text-[11px] uppercase tracking-[0.16em] font-medium text-white mb-2.5">
                  Skills
                </p>
                <div className="space-y-2">
                  {worker.skills.map((skill) => (
                    <div key={skill.name} className="flex items-center justify-between gap-3">
                      <span className="text-[13.5px] text-white">{skill.name}</span>
                      {(skill.level || skill.years) && (
                        <span className="text-[12px] text-white tabular-nums shrink-0">
                          {[skill.level, skill.years ? `${skill.years} yrs` : null]
                            .filter(Boolean)
                            .join(' · ')}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Qualifications — read-only (a candidate, not your team) */}
            <div className="px-5 py-4 border-t border-white/[0.04]">
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-[11px] uppercase tracking-[0.16em] font-medium text-white">
                  Qualifications
                </p>
                {qualifications.length > 0 && (
                  <span className="text-[11px] text-white">{qualifications.length} on file</span>
                )}
              </div>
              {qualifications.length > 0 ? (
                <div className="space-y-2">
                  {qualifications.map((qual) => (
                    <div
                      key={qual.id}
                      className="flex items-center gap-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-2.5"
                    >
                      <GraduationCap className="h-4 w-4 text-white shrink-0" />
                      <span className="flex-1 min-w-0 text-[13px] text-white truncate">
                        {qual.qualification_name}
                        {qual.awarding_body && (
                          <span className="text-white"> · {qual.awarding_body}</span>
                        )}
                      </span>
                      {qual.is_verified && (
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] text-white">No qualifications on file.</p>
              )}
            </div>

            {/* Verified credentials — show what Elec-ID actually verified (positive framing) */}
            <div className="px-5 py-4 border-t border-white/[0.04]">
              <p className="text-[11px] uppercase tracking-[0.16em] font-medium text-white mb-2.5">
                Verified credentials
              </p>
              {worker.verifiedDocuments.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {worker.verifiedDocuments.map((doc) => (
                    <span
                      key={doc}
                      className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[12px] text-emerald-400"
                    >
                      <CheckCircle className="h-3.5 w-3.5" />
                      {DOC_LABELS[doc] || doc}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] text-white">
                  Profile created — credentials not yet verified.
                </p>
              )}
              {worker.workHistoryCount > 0 && (
                <p className="mt-3 inline-flex items-center gap-1.5 text-[12px] text-white">
                  <FileText className="h-3.5 w-3.5" />
                  {worker.workHistoryCount} work-history record
                  {worker.workHistoryCount !== 1 ? 's' : ''}
                </p>
              )}
              <p className="text-[11.5px] text-white mt-3">{tier.description}</p>
            </div>
          </div>
        </ScrollArea>

        {/* Sticky action bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-[hsl(0_0%_8%)] border-t border-white/[0.06] safe-area-pb">
          <div className="flex gap-2">
            <SecondaryButton size="lg" className="flex-1 h-14" onClick={onContact}>
              <MessageSquare className="h-5 w-5 mr-2" />
              Message
            </SecondaryButton>
            {onInvite && (
              <PrimaryButton size="lg" className="flex-1 h-14" onClick={onInvite}>
                <Send className="h-5 w-5 mr-2" />
                Invite to apply
              </PrimaryButton>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
