import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { AddTrainingRequestDialog } from './dialogs/AddTrainingRequestDialog';
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
  Plus,
  Minus,
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
  const [trainingDialogOpen, setTrainingDialogOpen] = useState(false);

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
  const memberYear = worker.memberSince ? new Date(worker.memberSince).getFullYear() : null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[90vh] p-0 rounded-t-3xl bg-[hsl(0_0%_8%)] border-t border-white/[0.06]"
      >
        <ScrollArea className="h-full">
          <div className="pb-32">
            {/* Header */}
            <div className="relative bg-gradient-to-b from-elec-yellow/5 to-transparent px-4 pt-6 pb-4">
              <SheetHeader className="text-left">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[hsl(0_0%_8%)] shadow-lg">
                      <AvatarFallback className="bg-elec-yellow text-black text-xl font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 ${tier.bg} p-1.5 rounded-full`}>
                      <TierIcon className={`h-4 w-4 ${tier.color}`} />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <SheetTitle className="text-xl truncate text-white">{worker.name}</SheetTitle>
                      {worker.isVerified && (
                        <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-white">{worker.jobTitle || 'Electrician'}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className={`${tier.bg} ${tier.color} border-0`}>
                        {tier.label}
                      </Badge>
                      {worker.ecsCardType && (
                        <span className="text-[12px] text-white/60">
                          ECS: {worker.ecsCardType}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="shrink-0 h-10 w-10 flex items-center justify-center rounded-full text-white hover:bg-white/[0.06] touch-manipulation"
                    onClick={onSave}
                  >
                    <Heart
                      className={`h-6 w-6 ${isSaved ? 'fill-elec-yellow text-elec-yellow' : ''}`}
                    />
                  </button>
                </div>
              </SheetHeader>
            </div>

            {/* Quick stats — declared/verified data only */}
            <div className="grid grid-cols-4 gap-2 px-4 py-3 bg-white/[0.04]">
              <div className="text-center">
                <p className="text-lg font-bold text-emerald-400">
                  {worker.dayRate != null ? `£${worker.dayRate}` : '—'}
                </p>
                <p className="text-xs text-white">{worker.dayRate != null ? '/day' : 'Rate on request'}</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-white">
                  {worker.yearsExperience != null ? worker.yearsExperience : '—'}
                </p>
                <p className="text-xs text-white">Years declared</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-white">{worker.verifiedDocuments.length}</p>
                <p className="text-xs text-white">Docs verified</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-white">{memberYear ?? '—'}</p>
                <p className="text-xs text-white">Member since</p>
              </div>
            </div>

            {/* Bio */}
            {worker.bio && (
              <>
                <div className="px-4 py-4">
                  <h3 className="font-semibold mb-2 text-white">About</h3>
                  <p className="text-white">{worker.bio}</p>
                </div>
                <Separator className="bg-white/[0.06]" />
              </>
            )}

            {/* Specialisms */}
            {worker.specialisms.length > 0 && (
              <>
                <div className="px-4 py-4">
                  <h3 className="font-semibold mb-3 text-white">Specialisms</h3>
                  <div className="flex flex-wrap gap-2">
                    {worker.specialisms.map((spec) => (
                      <Badge
                        key={spec}
                        variant="secondary"
                        className="px-3 py-1 bg-white/[0.06] text-white"
                      >
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator className="bg-white/[0.06]" />
              </>
            )}

            {/* Skills with declared experience */}
            {worker.skills.length > 0 && (
              <>
                <div className="px-4 py-4">
                  <h3 className="font-semibold mb-3 text-white">Skills</h3>
                  <div className="space-y-2">
                    {worker.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-white">{skill.name}</span>
                        <span className="text-white/60 text-[12px]">
                          {[skill.level, skill.years ? `${skill.years} yrs` : null]
                            .filter(Boolean)
                            .join(' · ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator className="bg-white/[0.06]" />
              </>
            )}

            {/* Qualifications — real records */}
            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white">Qualifications</h3>
                <button
                  type="button"
                  className="h-8 text-elec-yellow flex items-center gap-1 text-[12.5px] font-medium px-3 rounded-full hover:bg-white/[0.06] touch-manipulation"
                  onClick={() => setTrainingDialogOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Training
                </button>
              </div>
              {qualifications.length > 0 ? (
                <div className="space-y-2">
                  {qualifications.map((qual) => (
                    <div key={qual.id} className="flex items-center gap-2 text-sm text-white">
                      <GraduationCap className="h-4 w-4 text-white/60 shrink-0" />
                      <span className="flex-1 min-w-0">
                        {qual.qualification_name}
                        {qual.awarding_body && (
                          <span className="text-white/50"> · {qual.awarding_body}</span>
                        )}
                      </span>
                      {qual.is_verified && (
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/50">No qualifications added yet.</p>
              )}
            </div>

            <Separator className="bg-white/[0.06]" />

            {/* Elec-ID verification — ONLY what was actually verified */}
            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white">Elec-ID Verification</h3>
                <Badge variant="outline" className={`${tier.bg} ${tier.color} border-0`}>
                  {tier.label}
                </Badge>
              </div>
              <div className="space-y-2">
                {Object.entries(DOC_LABELS).map(([type, label]) => {
                  const verified = worker.verifiedDocuments.includes(type);
                  return (
                    <div key={type} className="flex items-center justify-between">
                      <span className="text-sm text-white">{label}</span>
                      {verified ? (
                        <div className="flex items-center gap-1 text-sm text-emerald-400">
                          <CheckCircle className="h-4 w-4" />
                          Verified
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-sm text-white/40">
                          <Minus className="h-4 w-4" />
                          Not verified
                        </div>
                      )}
                    </div>
                  );
                })}
                {worker.workHistoryCount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white">Work history</span>
                    <span className="flex items-center gap-1 text-sm text-white/70">
                      <FileText className="h-4 w-4" />
                      {worker.workHistoryCount} record{worker.workHistoryCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-xs text-white mt-3 pt-3 border-t border-white/[0.06]">
                {tier.description}
              </p>
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

        <AddTrainingRequestDialog
          open={trainingDialogOpen}
          onOpenChange={setTrainingDialogOpen}
          worker={{
            id: worker.profileId,
            name: worker.name,
            elecIdProfileId: worker.profileId,
          }}
        />
      </SheetContent>
    </Sheet>
  );
}
