/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { copyToClipboard } from '@/utils/clipboard';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Drawer } from 'vaul';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useElecIdProfile } from '@/hooks/useElecIdProfile';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  getExpiryStatus,
  calculateProfileCompleteness,
  isExpiringWithin,
} from '@/utils/elecIdGenerator';
import { getECSCardType, UK_JOB_TITLES, ECS_CARD_TYPES } from '@/data/uk-electrician-constants';
import { TrainingRequestsCard } from './TrainingRequestsCard';
import { toast } from '@/hooks/use-toast';
import {
  getQualificationsByProfileId,
  getSkillsByProfileId,
  getWorkHistoryByProfileId,
  getTrainingByProfileId,
} from '@/services/elecIdService';
import {
  Eyebrow,
  Dot,
  Arrow,
  ListCard,
  ListRow,
  SectionHeader,
  toneText,
  type Tone,
} from '@/components/college/primitives';

interface ElecIdOverviewProps {
  onNavigate?: (tabId: string) => void;
}

type VerificationTier = 'basic' | 'verified' | 'premium';

const TIER_META: Record<VerificationTier, { label: string; tone: Tone; description: string }> = {
  basic: { label: 'Basic', tone: 'cyan', description: 'Profile created' },
  verified: { label: 'Verified', tone: 'blue', description: 'ECS Card + 1 qualification verified' },
  premium: {
    label: 'Premium',
    tone: 'yellow',
    description: 'Fully verified professional',
  },
};

const ElecIdOverview = ({ onNavigate }: ElecIdOverviewProps) => {
  const { profile } = useAuth();
  const { profile: elecIdProfile, isOptedOut, setOptOut, updateProfile } = useElecIdProfile();
  const isMobile = useIsMobile();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isOptOutDialogOpen, setIsOptOutDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [availableForHire, setAvailableForHire] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState<
    'public' | 'employers_only' | 'private'
  >('employers_only');
  const [verificationTier, setVerificationTier] = useState<VerificationTier>('basic');

  const copyElecId = async () => {
    const id = elecIdProfile?.elec_id_number || 'EM-XXXXXX';
    try {
      const ok = await copyToClipboard(id);
      if (ok) {
        toast({ title: 'Copied!', description: 'Elec-ID copied to clipboard' });
      } else {
        toast({ title: 'Your Elec-ID', description: id });
      }
    } catch {
      toast({ title: 'Your Elec-ID', description: id });
    }
  };

  useEffect(() => {
    if (elecIdProfile) {
      setAvailableForHire(elecIdProfile.available_for_hire);
      setProfileVisibility(elecIdProfile.profile_visibility);
      setVerificationTier(elecIdProfile.verification_tier);
    }
  }, [elecIdProfile]);

  const handleAvailabilityChange = async (checked: boolean) => {
    setAvailableForHire(checked);
    setIsSaving(true);
    await updateProfile({ available_for_hire: checked });
    setIsSaving(false);
  };

  const handleVisibilityChange = async (value: 'public' | 'employers_only' | 'private') => {
    setProfileVisibility(value);
    setIsSaving(true);
    await updateProfile({ profile_visibility: value });
    setIsSaving(false);
  };

  const handleOptOut = async () => {
    setIsSaving(true);
    await setOptOut(true);
    setIsSaving(false);
    setIsOptOutDialogOpen(false);
  };

  const handleOptIn = async () => {
    setIsSaving(true);
    await setOptOut(false);
    setIsSaving(false);
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !profile?.id) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a JPG, PNG, or WebP image',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 5MB',
        variant: 'destructive',
      });
      return;
    }

    setIsUploadingPhoto(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${profile.id}/avatar-${Date.now()}.${fileExt}`;

      const { data, error: uploadError } = await supabase.storage
        .from('elec-id-photos')
        .upload(fileName, file, { cacheControl: '3600', upsert: true });

      if (uploadError) {
        const { data: fallbackData, error: fallbackError } = await supabase.storage
          .from('avatars')
          .upload(fileName, file, { cacheControl: '3600', upsert: true });

        if (fallbackError) throw fallbackError;

        const {
          data: { publicUrl },
        } = supabase.storage.from('avatars').getPublicUrl(fallbackData.path);

        setPhotoUrl(publicUrl);
        await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', profile.id);
      } else {
        const {
          data: { publicUrl },
        } = supabase.storage.from('elec-id-photos').getPublicUrl(data.path);

        setPhotoUrl(publicUrl);
        await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', profile.id);
      }

      toast({ title: 'Photo uploaded', description: 'Your profile photo has been updated' });
    } catch (error: any) {
      console.error('Error uploading photo:', error);
      toast({
        title: 'Upload failed',
        description: error.message || 'Failed to upload photo. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const getJobTitleLabelFromValue = (value: string | null | undefined): string => {
    if (!value) return 'Not set';
    const title = UK_JOB_TITLES.find((t) => t.value === value);
    return title?.label || value || 'Electrician';
  };

  const actualJobTitle = (elecIdProfile as any)?.job_title || null;
  const actualEcsCardType = elecIdProfile?.ecs_card_type || null;
  const actualEcsCardExpiry = elecIdProfile?.ecs_expiry_date || null;
  const actualBio = elecIdProfile?.bio || null;

  const elecIdData = {
    elecIdNumber: elecIdProfile?.elec_id_number || 'EM-XXXXXX',
    jobTitle: actualJobTitle || 'approved',
    jobTitleLabel: getJobTitleLabelFromValue(actualJobTitle || 'approved'),
    ecsCardType: actualEcsCardType || 'gold',
    ecsCardExpiry: actualEcsCardExpiry || '2026-12-15',
    isVerified: elecIdProfile?.is_verified || false,
    photoUrl: photoUrl || profile?.avatar_url || null,
    bio: actualBio || '',
    rateType: elecIdProfile?.rate_type || 'daily',
    rateAmount: elecIdProfile?.rate_amount || null,
  };

  useEffect(() => {
    if (profile?.avatar_url && !photoUrl) {
      setPhotoUrl(profile.avatar_url);
    }
  }, [profile?.avatar_url]);

  const [editFormData, setEditFormData] = useState({
    jobTitle: elecIdData.jobTitle,
    ecsCardType: elecIdData.ecsCardType,
    ecsCardExpiry: elecIdData.ecsCardExpiry,
    bio: elecIdData.bio,
    rateType: elecIdData.rateType,
    rateAmount: elecIdData.rateAmount?.toString() || '',
  });

  const [profileStats, setProfileStats] = useState({
    qualificationsCount: 0,
    experienceCount: 0,
    skillsCount: 0,
    expiringItems: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  const loadProfileStats = useCallback(async () => {
    if (!elecIdProfile?.id) {
      setStatsLoading(false);
      return;
    }

    try {
      const [qualifications, skills, workHistory, training] = await Promise.all([
        getQualificationsByProfileId(elecIdProfile.id),
        getSkillsByProfileId(elecIdProfile.id),
        getWorkHistoryByProfileId(elecIdProfile.id),
        getTrainingByProfileId(elecIdProfile.id),
      ]);

      let expiringCount = 0;

      if (elecIdProfile.ecs_expiry_date && isExpiringWithin(elecIdProfile.ecs_expiry_date, 90)) {
        expiringCount++;
      }

      qualifications.forEach((q) => {
        if (q.expiry_date && isExpiringWithin(q.expiry_date, 90)) expiringCount++;
      });

      training.forEach((t) => {
        if (t.expiry_date && isExpiringWithin(t.expiry_date, 90)) expiringCount++;
      });

      setProfileStats({
        qualificationsCount: qualifications.length,
        experienceCount: workHistory.length,
        skillsCount: skills.length,
        expiringItems: expiringCount,
      });
    } catch (err) {
      console.error('Error loading profile stats:', err);
    } finally {
      setStatsLoading(false);
    }
  }, [elecIdProfile?.id, elecIdProfile?.ecs_expiry_date]);

  useEffect(() => {
    loadProfileStats();
  }, [loadProfileStats]);

  const completeness = calculateProfileCompleteness({
    jobTitle: actualJobTitle || undefined,
    bio: actualBio || profile?.bio || undefined,
    qualificationsCount: profileStats.qualificationsCount,
    experienceCount: profileStats.experienceCount,
    skillsCount: profileStats.skillsCount,
    ecsCardType: actualEcsCardType || undefined,
    ecsCardExpiry: actualEcsCardExpiry || undefined,
  });

  const ecsCard = getECSCardType(elecIdData.ecsCardType);
  const expiryStatus = actualEcsCardExpiry
    ? getExpiryStatus(actualEcsCardExpiry)
    : ({ status: 'valid' as const, label: 'Not set', color: 'gray' } as ReturnType<
        typeof getExpiryStatus
      >);

  const userName = profile?.full_name || profile?.username || 'Electrician';
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleOpenEdit = () => {
    setEditFormData({
      jobTitle: elecIdData.jobTitle,
      ecsCardType: elecIdData.ecsCardType,
      ecsCardExpiry: elecIdData.ecsCardExpiry,
      bio: elecIdData.bio,
      rateType: elecIdData.rateType,
      rateAmount: elecIdData.rateAmount?.toString() || '',
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    setIsSaving(true);
    try {
      await updateProfile({
        job_title: editFormData.jobTitle,
        ecs_card_type: editFormData.ecsCardType,
        ecs_expiry_date: editFormData.ecsCardExpiry,
        bio: editFormData.bio,
        rate_type: editFormData.rateType as 'hourly' | 'daily' | 'weekly' | 'yearly',
        rate_amount: editFormData.rateAmount ? parseFloat(editFormData.rateAmount) : null,
      } as any);
      setIsEditDialogOpen(false);
      setIsEditSheetOpen(false);
      toast({
        title: 'Profile updated',
        description: 'Your Elec-ID profile has been saved',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatClick = (tabId: string) => {
    if (onNavigate) onNavigate(tabId);
  };

  const jobTitlesByCategory = UK_JOB_TITLES.reduce(
    (acc, title) => {
      if (!acc[title.category]) acc[title.category] = [];
      acc[title.category].push(title);
      return acc;
    },
    {} as Record<string, typeof UK_JOB_TITLES>
  );

  const EditFormContent = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-white text-sm">Job title</Label>
        <Select
          value={editFormData.jobTitle}
          onValueChange={(value) => setEditFormData({ ...editFormData, jobTitle: value })}
        >
          <SelectTrigger className="h-11 bg-white/[0.04] border-white/[0.06] rounded-xl text-white">
            <SelectValue placeholder="Select job title" />
          </SelectTrigger>
          <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.06] max-h-60">
            {Object.entries(jobTitlesByCategory).map(([category, titles]) => (
              <React.Fragment key={category}>
                <div className="px-2 py-1.5 text-xs font-semibold text-elec-yellow">{category}</div>
                {titles.map((title) => (
                  <SelectItem key={title.value} value={title.value}>
                    {title.label}
                  </SelectItem>
                ))}
              </React.Fragment>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-white text-sm">ECS card type</Label>
        <Select
          value={editFormData.ecsCardType}
          onValueChange={(value) => setEditFormData({ ...editFormData, ecsCardType: value })}
        >
          <SelectTrigger className="h-11 bg-white/[0.04] border-white/[0.06] rounded-xl text-white">
            <SelectValue placeholder="Select card type" />
          </SelectTrigger>
          <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.06]">
            {ECS_CARD_TYPES.map((card) => (
              <SelectItem key={card.value} value={card.value}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: card.color }} />
                  {card.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-white text-sm">ECS card expiry date</Label>
        <Input
          type="date"
          value={editFormData.ecsCardExpiry}
          onChange={(e) => setEditFormData({ ...editFormData, ecsCardExpiry: e.target.value })}
          className="h-11 bg-white/[0.04] border-white/[0.06] rounded-xl text-white"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-white text-sm">
          Your rate <span className="text-white/55">(shown in Talent Pool)</span>
        </Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/55">£</span>
            <Input
              type="number"
              inputMode="decimal"
              min="0"
              value={editFormData.rateAmount}
              onChange={(e) => setEditFormData({ ...editFormData, rateAmount: e.target.value })}
              placeholder="Amount"
              className="h-11 bg-white/[0.04] border-white/[0.06] rounded-xl pl-8 text-white placeholder:text-white/40"
            />
          </div>
          <Select
            value={editFormData.rateType}
            onValueChange={(value) => setEditFormData({ ...editFormData, rateType: value })}
          >
            <SelectTrigger className="w-28 h-11 bg-white/[0.04] border-white/[0.06] rounded-xl text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.06]">
              <SelectItem value="hourly">/hour</SelectItem>
              <SelectItem value="daily">/day</SelectItem>
              <SelectItem value="weekly">/week</SelectItem>
              <SelectItem value="yearly">/year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-white text-sm">
          Professional bio <span className="text-white/55">(optional)</span>
        </Label>
        <Textarea
          value={editFormData.bio}
          onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
          placeholder="Brief description of your experience and specialisations…"
          className="bg-white/[0.04] border-white/[0.06] rounded-xl min-h-[100px] resize-none text-white placeholder:text-white/40"
        />
      </div>
    </div>
  );

  const tierMeta = TIER_META[verificationTier];

  const expiryLabel =
    expiryStatus.status === 'expired'
      ? 'Expired'
      : expiryStatus.status === 'expiring' && expiryStatus.daysRemaining != null
        ? `${expiryStatus.daysRemaining}d`
        : elecIdData.ecsCardExpiry
          ? new Date(elecIdData.ecsCardExpiry).toLocaleDateString('en-GB', {
              month: 'short',
              year: '2-digit',
            })
          : '';
  const expiryTone: Tone =
    expiryStatus.status === 'expired'
      ? 'red'
      : expiryStatus.status === 'expiring'
        ? 'orange'
        : 'emerald';

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Edit drawer / dialog */}
      {isMobile ? (
        <Drawer.Root
          open={isEditSheetOpen}
          onOpenChange={setIsEditSheetOpen}
          shouldScaleBackground={false}
          noBodyStyles
        >
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col max-h-[90vh] bg-[hsl(0_0%_12%)] rounded-t-2xl border-t border-white/[0.06]">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 rounded-full bg-white/[0.15]" />
              </div>
              <div className="px-5 pb-2">
                <h3 className="text-lg font-semibold text-white">Edit profile</h3>
                <p className="text-sm text-white/65">Update your Elec-ID information</p>
              </div>
              <div className="flex-1 overflow-y-auto px-5 pb-4">{EditFormContent()}</div>
              <div className="p-5 border-t border-white/[0.06]">
                <div className="flex gap-3">
                  <button
                    className="flex-1 h-11 rounded-xl border border-white/[0.06] text-white touch-manipulation"
                    onClick={() => setIsEditSheetOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 h-11 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation disabled:opacity-60"
                    onClick={handleSaveEdit}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving…' : 'Save changes'}
                  </button>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      ) : (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-[hsl(0_0%_12%)] border-white/[0.06] rounded-2xl max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Elec-ID profile</DialogTitle>
            </DialogHeader>
            <div className="pt-4">
              {EditFormContent()}
              <div className="flex gap-3 pt-6">
                <button
                  className="flex-1 h-11 rounded-xl border border-white/[0.06] text-white touch-manipulation"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 h-11 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation disabled:opacity-60"
                  onClick={handleSaveEdit}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving…' : 'Save changes'}
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* ── ID CARD HERO ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative overflow-hidden bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/80 via-amber-400/70 to-orange-400/70" />

        <div className="p-5 sm:p-6 lg:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Eyebrow>Elec-ID · Verified professional</Eyebrow>
              <h2 className="mt-1.5 text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-[1.05]">
                {userName}
              </h2>
              <p className="mt-1 text-sm text-elec-yellow font-medium">{elecIdData.jobTitleLabel}</p>
            </div>
            <button
              onClick={() => (isMobile ? setIsEditSheetOpen(true) : handleOpenEdit())}
              className="shrink-0 h-11 px-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[12px] font-medium text-elec-yellow hover:bg-white/[0.08] touch-manipulation"
            >
              Edit →
            </button>
          </div>

          <div className="mt-6 flex gap-4 sm:gap-5">
            <div className="relative shrink-0">
              {photoUrl || elecIdData.photoUrl ? (
                <img
                  src={photoUrl || elecIdData.photoUrl || ''}
                  alt="Profile"
                  className="w-[88px] h-[110px] sm:w-[104px] sm:h-[132px] rounded-2xl object-cover border border-white/[0.08]"
                />
              ) : (
                <div className="w-[88px] h-[110px] sm:w-[104px] sm:h-[132px] rounded-2xl bg-gradient-to-br from-elec-yellow via-amber-400 to-orange-400 flex items-center justify-center border border-white/[0.08]">
                  <span className="text-black font-semibold text-2xl sm:text-3xl">
                    {userInitials}
                  </span>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoUpload}
                className="hidden"
              />

              <button
                onClick={handlePhotoClick}
                disabled={isUploadingPhoto}
                className="absolute -bottom-1.5 -right-1.5 h-8 min-w-[52px] px-2 rounded-full bg-elec-yellow text-black font-semibold text-[10px] uppercase tracking-[0.1em] border-2 border-[hsl(0_0%_12%)] touch-manipulation"
              >
                {isUploadingPhoto ? '…' : 'Photo'}
              </button>

              {elecIdData.isVerified && (
                <div className="absolute -top-2 -right-2 h-6 px-2 rounded-full bg-emerald-500 text-white text-[10px] font-semibold uppercase tracking-[0.1em] flex items-center border-2 border-[hsl(0_0%_12%)]">
                  Verified
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 space-y-3">
              {ecsCard && (
                <div className="flex items-center gap-2">
                  <div
                    className="h-5 px-1.5 rounded text-[10px] font-semibold tracking-[0.1em] flex items-center text-white"
                    style={{ backgroundColor: ecsCard.color }}
                  >
                    ECS
                  </div>
                  <span className="text-sm font-medium text-white truncate">{ecsCard.label}</span>
                  <span
                    className={cn(
                      'ml-auto shrink-0 text-[11px] font-medium uppercase tracking-[0.15em]',
                      toneText[expiryTone]
                    )}
                  >
                    {expiryLabel}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'text-[11px] font-medium uppercase tracking-[0.15em]',
                    toneText[tierMeta.tone]
                  )}
                >
                  {tierMeta.label}
                </span>
                <span className="text-xs text-white/65 truncate">{tierMeta.description}</span>
              </div>

              <button
                onClick={copyElecId}
                className="group w-full text-left rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-3 touch-manipulation hover:bg-white/[0.08] transition-colors"
              >
                <Eyebrow>Your Elec-ID number</Eyebrow>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="font-mono font-semibold text-lg sm:text-xl text-white tracking-wider">
                    {elecIdData.elecIdNumber}
                  </span>
                  <span className="text-[12px] font-medium text-elec-yellow shrink-0">
                    Tap to copy
                  </span>
                </div>
              </button>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 text-[11px] text-white/65">
            <div className="flex items-center gap-2">
              <Dot tone="emerald" />
              <span>Active · Verified by Elec-Mate</span>
            </div>
            <span className="tabular-nums">{completeness.percentage}% complete</span>
          </div>
        </div>
      </motion.div>

      {/* ── STATUS & TALENT POOL ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
      >
        <ListCard>
          <ListRow
            accent={tierMeta.tone}
            title={
              <span className="flex items-center gap-2">
                Verification tier
                <span
                  className={cn(
                    'text-[10px] font-medium uppercase tracking-[0.15em]',
                    toneText[tierMeta.tone]
                  )}
                >
                  {tierMeta.label}
                </span>
              </span>
            }
            subtitle={tierMeta.description}
            trailing={
              verificationTier !== 'premium' ? (
                <button
                  onClick={() => onNavigate?.('documents')}
                  className="h-11 px-4 rounded-xl bg-elec-yellow text-black text-[12px] font-semibold touch-manipulation"
                >
                  Upgrade →
                </button>
              ) : (
                <span className="text-[12px] font-medium text-elec-yellow">Max tier</span>
              )
            }
          />

          {verificationTier !== 'premium' && (
            <div className="px-5 sm:px-6 py-4 bg-[hsl(0_0%_12%)]">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-white/65">
                  Progress to {verificationTier === 'basic' ? 'Verified' : 'Premium'}
                </span>
                <span className="font-semibold text-elec-yellow tabular-nums">
                  {verificationTier === 'basic' ? '50%' : '75%'}
                </span>
              </div>
              <Progress value={verificationTier === 'basic' ? 50 : 75} className="h-2" />
            </div>
          )}

          <ListRow
            accent={availableForHire && !isOptedOut ? 'emerald' : 'cyan'}
            title="Talent Pool"
            subtitle={
              isOptedOut
                ? 'Disabled'
                : availableForHire
                  ? 'Visible to employers'
                  : 'Hidden from search'
            }
            trailing={
              <Switch
                checked={availableForHire && !isOptedOut}
                onCheckedChange={isOptedOut ? handleOptIn : handleAvailabilityChange}
                disabled={isSaving}
                className="data-[state=checked]:bg-emerald-500 shrink-0"
              />
            }
          />

          {availableForHire && !isOptedOut && (
            <div className="px-5 sm:px-6 py-4 bg-[hsl(0_0%_12%)]">
              <Select
                value={profileVisibility}
                onValueChange={handleVisibilityChange}
                disabled={isSaving}
              >
                <SelectTrigger className="h-11 text-sm bg-white/[0.04] border-white/[0.06] rounded-xl w-full touch-manipulation text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.06] z-50">
                  <SelectItem value="public" className="text-sm py-3 touch-manipulation">
                    Public
                  </SelectItem>
                  <SelectItem value="employers_only" className="text-sm py-3 touch-manipulation">
                    Employers only
                  </SelectItem>
                  <SelectItem value="private" className="text-sm py-3 touch-manipulation">
                    Private
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {!isOptedOut && (
            <ListRow
              title={<span className="text-white">Disable Elec-ID</span>}
              subtitle="Hide profile from all searches"
              trailing={
                <button
                  onClick={() => setIsOptOutDialogOpen(true)}
                  className="h-11 px-3 rounded-xl text-[12px] font-medium text-red-400 hover:bg-red-500/10 touch-manipulation"
                >
                  Disable →
                </button>
              }
            />
          )}
        </ListCard>
      </motion.div>

      {/* Opted-Out Banner */}
      {isOptedOut && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 flex items-center gap-3">
            <div className="flex-1">
              <p className="font-semibold text-orange-400 text-sm">Elec-ID disabled</p>
              <p className="text-xs text-white/70 mt-0.5">
                Hidden from Talent Pool. Your data is still saved.
              </p>
            </div>
            <button
              onClick={handleOptIn}
              disabled={isSaving}
              className="h-11 px-4 rounded-xl border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 text-[12px] font-medium touch-manipulation disabled:opacity-60"
            >
              Re-enable
            </button>
          </div>
        </motion.div>
      )}

      <Dialog open={isOptOutDialogOpen} onOpenChange={setIsOptOutDialogOpen}>
        <DialogContent className="bg-[hsl(0_0%_12%)] border-white/[0.06] rounded-2xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">Disable Elec-ID?</DialogTitle>
            <DialogDescription className="text-white/70">
              This will hide your profile from the Talent Pool. Employers will not be able to
              discover you through search.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              <p className="text-sm text-white font-medium mb-2">What happens</p>
              <ul className="space-y-1.5 text-sm text-white/70">
                <li>· Hidden from employer searches</li>
                <li>· Your data remains saved</li>
                <li>· You can re-enable anytime</li>
              </ul>
            </div>
            <div className="flex gap-3">
              <button
                className="flex-1 h-11 rounded-xl border border-white/[0.06] text-white touch-manipulation"
                onClick={() => setIsOptOutDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 h-11 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold touch-manipulation disabled:opacity-60"
                onClick={handleOptOut}
                disabled={isSaving}
              >
                Disable Elec-ID
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── PROFILE STRENGTH ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6"
      >
        <div className="flex items-center gap-5">
          <div className="relative w-20 h-20 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={
                  completeness.percentage >= 80
                    ? '#22c55e'
                    : completeness.percentage >= 50
                      ? '#eab308'
                      : '#f97316'
                }
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - completeness.percentage / 100)}`}
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-semibold text-white tabular-nums">
                {completeness.percentage}%
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <Eyebrow>Profile strength</Eyebrow>
            <p className="mt-1 text-sm text-white/70">
              {completeness.percentage >= 80
                ? 'Looking great — your profile is strong.'
                : completeness.percentage >= 50
                  ? 'Good progress — a few more items to stand out.'
                  : 'Add more details to attract employers.'}
            </p>
          </div>
        </div>

        {completeness.missingItems.length > 0 && (
          <div className="mt-4 space-y-1.5">
            {completeness.missingItems.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-xs text-white/80"
              >
                <Dot tone="yellow" />
                <span className="truncate flex-1">{item}</span>
                <Arrow />
              </div>
            ))}
            {completeness.missingItems.length > 3 && (
              <p className="text-xs text-white/55 text-center pt-1">
                +{completeness.missingItems.length - 3} more items
              </p>
            )}
          </div>
        )}
      </motion.div>

      {/* ── STATS ROWS ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16 }}
      >
        <SectionHeader eyebrow="At a glance" title="Your credentials" />
        <div className="mt-4">
          <ListCard>
            {statsLoading ? (
              [1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="px-5 sm:px-6 py-4 sm:py-5 bg-white/[0.02] animate-pulse h-[68px]"
                />
              ))
            ) : (
              <>
                <ListRow
                  accent="purple"
                  title="Qualifications"
                  subtitle="Certs and training"
                  trailing={
                    <span className="flex items-center gap-3">
                      <span className="text-xl font-semibold text-purple-400 tabular-nums">
                        {profileStats.qualificationsCount}
                      </span>
                      <Arrow />
                    </span>
                  }
                  onClick={() => handleStatClick('qualifications')}
                />
                <ListRow
                  accent="blue"
                  title="Work history"
                  subtitle="Previous positions"
                  trailing={
                    <span className="flex items-center gap-3">
                      <span className="text-xl font-semibold text-blue-400 tabular-nums">
                        {profileStats.experienceCount}
                      </span>
                      <Arrow />
                    </span>
                  }
                  onClick={() => handleStatClick('experience')}
                />
                <ListRow
                  accent="emerald"
                  title="Skills"
                  subtitle="Competencies"
                  trailing={
                    <span className="flex items-center gap-3">
                      <span className="text-xl font-semibold text-emerald-400 tabular-nums">
                        {profileStats.skillsCount}
                      </span>
                      <Arrow />
                    </span>
                  }
                  onClick={() => handleStatClick('skills')}
                />
                <ListRow
                  accent={profileStats.expiringItems > 0 ? 'orange' : 'cyan'}
                  title="Expiring soon"
                  subtitle="Within 90 days"
                  trailing={
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          'text-xl font-semibold tabular-nums',
                          profileStats.expiringItems > 0 ? 'text-orange-400' : 'text-white'
                        )}
                      >
                        {profileStats.expiringItems}
                      </span>
                      <Arrow />
                    </span>
                  }
                  onClick={() => handleStatClick('compliance')}
                />
                <ListRow
                  accent="yellow"
                  title="Profile views"
                  subtitle="All time"
                  trailing={
                    <span className="flex items-center gap-3">
                      <span className="text-xl font-semibold text-elec-yellow tabular-nums">
                        {profile?.profile_views ?? 0}
                      </span>
                      <Arrow />
                    </span>
                  }
                  onClick={() => handleStatClick('share')}
                />
              </>
            )}
          </ListCard>
        </div>
      </motion.div>

      {/* ── PUBLIC SHARE ────────────────────────────────────── */}
      {elecIdProfile?.elec_id_number && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[hsl(0_0%_12%)] border border-elec-yellow/20 rounded-2xl p-5 sm:p-6"
        >
          <Eyebrow>Your profile is live</Eyebrow>
          <p className="mt-1 text-sm text-white/70">
            Share with employers, clients, or anyone who needs to verify your credentials.
          </p>

          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 min-w-0 px-3 py-2 rounded-xl bg-black/30 border border-white/[0.06]">
              <p className="text-xs text-white/70 font-mono truncate">
                elec-mate.com/verify/
                <span className="text-elec-yellow font-semibold">
                  {elecIdProfile.elec_id_number}
                </span>
              </p>
            </div>
            <button
              onClick={async () => {
                await copyToClipboard(
                  `https://elec-mate.com/verify/${elecIdProfile.elec_id_number}`
                );
                setCopiedLink(true);
                setTimeout(() => setCopiedLink(false), 2000);
              }}
              className="shrink-0 h-11 px-3 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black text-xs font-semibold transition-all touch-manipulation"
            >
              {copiedLink ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <button
            onClick={() => onNavigate?.('share')}
            className="mt-3 w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-white text-xs font-medium transition-all touch-manipulation"
          >
            Create QR code or timed share link →
          </button>
        </motion.div>
      )}

      <TrainingRequestsCard />
    </div>
  );
};

export default ElecIdOverview;
