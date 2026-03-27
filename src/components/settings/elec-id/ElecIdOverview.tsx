/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
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
import {
  IdCard,
  GraduationCap,
  Briefcase,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Edit2,
  Camera,
  Shield,
  ChevronRight,
  Users,
  Eye,
  EyeOff,
  Crown,
  Power,
  AlertCircle,
  Copy,
  Link2,
  QrCode,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';
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

interface ElecIdOverviewProps {
  onNavigate?: (tabId: string) => void;
}

// Verification tier configuration
const VERIFICATION_TIERS = {
  basic: {
    label: 'Basic',
    color: 'text-white',
    bgColor: 'bg-white/10',
    borderColor: 'border-white/20',
    icon: Shield,
    description: 'Profile created',
  },
  verified: {
    label: 'Verified',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30',
    icon: CheckCircle2,
    description: 'ECS Card + 1 qualification verified',
  },
  premium: {
    label: 'Premium',
    color: 'text-elec-yellow',
    bgColor: 'bg-elec-yellow/20',
    borderColor: 'border-elec-yellow/30',
    icon: Crown,
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

  // Local state synced with profile
  const [availableForHire, setAvailableForHire] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState<
    'public' | 'employers_only' | 'private'
  >('employers_only');
  const [verificationTier, setVerificationTier] = useState<'basic' | 'verified' | 'premium'>(
    'basic'
  );

  // Copy Elec-ID to clipboard
  const copyElecId = async () => {
    const id = elecIdProfile?.elec_id_number || 'EM-XXXXXX';
    try {
      await navigator.clipboard.writeText(id);
      toast({ title: 'Copied!', description: 'Elec-ID copied to clipboard' });
    } catch {
      toast({ title: 'Your Elec-ID', description: id });
    }
  };

  // Sync local state with profile data
  useEffect(() => {
    if (elecIdProfile) {
      setAvailableForHire(elecIdProfile.available_for_hire);
      setProfileVisibility(elecIdProfile.profile_visibility);
      setVerificationTier(elecIdProfile.verification_tier);
    }
  }, [elecIdProfile]);

  // Handle availability toggle
  const handleAvailabilityChange = async (checked: boolean) => {
    setAvailableForHire(checked);
    setIsSaving(true);
    await updateProfile({ available_for_hire: checked });
    setIsSaving(false);
  };

  // Handle visibility change
  const handleVisibilityChange = async (value: 'public' | 'employers_only' | 'private') => {
    setProfileVisibility(value);
    setIsSaving(true);
    await updateProfile({ profile_visibility: value });
    setIsSaving(false);
  };

  // Handle opt-out
  const handleOptOut = async () => {
    setIsSaving(true);
    await setOptOut(true);
    setIsSaving(false);
    setIsOptOutDialogOpen(false);
  };

  // Handle opt back in
  const handleOptIn = async () => {
    setIsSaving(true);
    await setOptOut(false);
    setIsSaving(false);
  };

  // Handle photo upload
  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !profile?.id) return;

    // Validate file type and size
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
      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${profile.id}/avatar-${Date.now()}.${fileExt}`;

      // Upload to Supabase storage
      const { data, error: uploadError } = await supabase.storage
        .from('elec-id-photos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) {
        // If bucket doesn't exist, try avatars bucket as fallback
        const { data: fallbackData, error: fallbackError } = await supabase.storage
          .from('avatars')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: true,
          });

        if (fallbackError) throw fallbackError;

        const {
          data: { publicUrl },
        } = supabase.storage.from('avatars').getPublicUrl(fallbackData.path);

        setPhotoUrl(publicUrl);

        // Update user profile with new avatar URL
        await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', profile.id);
      } else {
        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from('elec-id-photos').getPublicUrl(data.path);

        setPhotoUrl(publicUrl);

        // Update user profile with new avatar URL
        await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', profile.id);
      }

      toast({
        title: 'Photo uploaded',
        description: 'Your profile photo has been updated',
      });
    } catch (error: any) {
      console.error('Error uploading photo:', error);
      toast({
        title: 'Upload failed',
        description: error.message || 'Failed to upload photo. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploadingPhoto(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Get job title label from value
  const getJobTitleLabelFromValue = (value: string | null | undefined): string => {
    if (!value) return 'Not Set';
    const title = UK_JOB_TITLES.find((t) => t.value === value);
    return title?.label || value || 'Electrician';
  };

  // Use actual profile data (no fallbacks) for completeness calculation
  const actualJobTitle = (elecIdProfile as any)?.job_title || null;
  const actualEcsCardType = elecIdProfile?.ecs_card_type || null;
  const actualEcsCardExpiry = elecIdProfile?.ecs_expiry_date || null;
  const actualBio = elecIdProfile?.bio || null;

  // Display data with fallbacks for UI rendering
  const elecIdData = {
    elecIdNumber: elecIdProfile?.elec_id_number || 'EM-XXXXXX',
    jobTitle: actualJobTitle || 'approved', // Fallback for display only
    jobTitleLabel: getJobTitleLabelFromValue(actualJobTitle || 'approved'), // Fallback for display only
    ecsCardType: actualEcsCardType || 'gold', // Fallback for display only
    ecsCardExpiry: actualEcsCardExpiry || '2026-12-15', // Fallback for display only
    isVerified: elecIdProfile?.is_verified || false,
    photoUrl: photoUrl || profile?.avatar_url || null,
    bio: actualBio || '',
    rateType: elecIdProfile?.rate_type || 'daily',
    rateAmount: elecIdProfile?.rate_amount || null,
  };

  // Sync photoUrl with profile on load
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

  // Real stats from backend
  const [profileStats, setProfileStats] = useState({
    qualificationsCount: 0,
    experienceCount: 0,
    skillsCount: 0,
    expiringItems: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  // Fetch real stats from backend
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

      // Count items expiring within 90 days
      let expiringCount = 0;

      // Check ECS card expiry
      if (elecIdProfile.ecs_expiry_date && isExpiringWithin(elecIdProfile.ecs_expiry_date, 90)) {
        expiringCount++;
      }

      // Check qualifications with expiry dates
      qualifications.forEach((q) => {
        if (q.expiry_date && isExpiringWithin(q.expiry_date, 90)) {
          expiringCount++;
        }
      });

      // Check training with expiry dates
      training.forEach((t) => {
        if (t.expiry_date && isExpiringWithin(t.expiry_date, 90)) {
          expiringCount++;
        }
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

  // Use actual values (without fallbacks) for completeness calculation
  const completeness = calculateProfileCompleteness({
    jobTitle: actualJobTitle || undefined, // Use actual value, not display fallback
    bio: actualBio || profile?.bio || undefined, // Use actual value
    qualificationsCount: profileStats.qualificationsCount,
    experienceCount: profileStats.experienceCount,
    skillsCount: profileStats.skillsCount,
    ecsCardType: actualEcsCardType || undefined, // Use actual value
    ecsCardExpiry: actualEcsCardExpiry || undefined, // Use actual value
  });

  // Use display values for UI rendering
  const ecsCard = getECSCardType(elecIdData.ecsCardType);
  const expiryStatus = actualEcsCardExpiry
    ? getExpiryStatus(actualEcsCardExpiry)
    : { status: 'valid' as const, label: 'Not Set', color: 'gray' };

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
    if (onNavigate) {
      onNavigate(tabId);
    }
  };

  // Group job titles by category
  const jobTitlesByCategory = UK_JOB_TITLES.reduce(
    (acc, title) => {
      if (!acc[title.category]) acc[title.category] = [];
      acc[title.category].push(title);
      return acc;
    },
    {} as Record<string, typeof UK_JOB_TITLES>
  );

  // Edit form content (shared between dialog and sheet)
  const EditFormContent = () => (
    <div className="space-y-4">
      {/* Job Title */}
      <div className="space-y-2">
        <Label className="text-foreground text-sm">Job Title</Label>
        <Select
          value={editFormData.jobTitle}
          onValueChange={(value) => setEditFormData({ ...editFormData, jobTitle: value })}
        >
          <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl">
            <SelectValue placeholder="Select job title" />
          </SelectTrigger>
          <SelectContent className="bg-elec-gray border-white/20 max-h-60">
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

      {/* ECS Card Type */}
      <div className="space-y-2">
        <Label className="text-foreground text-sm">ECS Card Type</Label>
        <Select
          value={editFormData.ecsCardType}
          onValueChange={(value) => setEditFormData({ ...editFormData, ecsCardType: value })}
        >
          <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl">
            <SelectValue placeholder="Select card type" />
          </SelectTrigger>
          <SelectContent className="bg-elec-gray border-white/20">
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

      {/* ECS Card Expiry */}
      <div className="space-y-2">
        <Label className="text-foreground text-sm">ECS Card Expiry Date</Label>
        <Input
          type="date"
          value={editFormData.ecsCardExpiry}
          onChange={(e) => setEditFormData({ ...editFormData, ecsCardExpiry: e.target.value })}
          className="h-12 bg-white/5 border-white/10 rounded-xl"
        />
      </div>

      {/* Rate Settings */}
      <div className="space-y-2">
        <Label className="text-foreground text-sm">
          Your Rate
          <span className="text-white ml-2">(shown in Talent Pool)</span>
        </Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white">£</span>
            <Input
              type="number"
              inputMode="decimal"
              min="0"
              value={editFormData.rateAmount}
              onChange={(e) => setEditFormData({ ...editFormData, rateAmount: e.target.value })}
              placeholder="Amount"
              className="h-12 bg-white/5 border-white/10 rounded-xl pl-8"
            />
          </div>
          <Select
            value={editFormData.rateType}
            onValueChange={(value) => setEditFormData({ ...editFormData, rateType: value })}
          >
            <SelectTrigger className="w-28 h-12 bg-white/5 border-white/10 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-elec-gray border-white/20">
              <SelectItem value="hourly">/hour</SelectItem>
              <SelectItem value="daily">/day</SelectItem>
              <SelectItem value="weekly">/week</SelectItem>
              <SelectItem value="yearly">/year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label className="text-foreground text-sm">
          Professional Bio
          <span className="text-white ml-2">(optional)</span>
        </Label>
        <Textarea
          value={editFormData.bio}
          onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
          placeholder="Brief description of your experience and specialisations..."
          className="bg-white/5 border-white/10 rounded-xl min-h-[100px] resize-none"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Mobile: Bottom Sheet Edit Dialog */}
      {isMobile ? (
        <Drawer.Root
          open={isEditSheetOpen}
          onOpenChange={setIsEditSheetOpen}
          shouldScaleBackground={false}
          noBodyStyles
        >
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col max-h-[90vh] bg-background rounded-t-[20px] border-t border-border">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
              </div>
              <div className="px-4 pb-2">
                <h3 className="text-lg font-bold text-foreground">Edit Profile</h3>
                <p className="text-sm text-white">Update your Elec-ID information</p>
              </div>
              <div className="flex-1 overflow-y-auto px-4 pb-4">{EditFormContent()}</div>
              <div className="p-4 border-t border-border bg-background/95 backdrop-blur-sm">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 h-12 rounded-xl border-white/10"
                    onClick={() => setIsEditSheetOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 h-12 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold"
                    onClick={handleSaveEdit}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      ) : (
        /* Desktop: Dialog Edit */
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-elec-gray border-white/20 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground">Edit Elec-ID Profile</DialogTitle>
            </DialogHeader>
            <div className="pt-4">
              {EditFormContent()}
              <div className="flex gap-3 pt-6">
                <Button
                  variant="outline"
                  className="flex-1 border-white/20"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark"
                  onClick={handleSaveEdit}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Premium ELEC-iD Card - Clean Professional Design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <Card className="relative overflow-hidden border border-white/10 rounded-3xl bg-gradient-to-b from-[#1a1a2e] to-[#12121f]">
          {/* Subtle top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow" />

          <CardContent className="p-0">
            {/* Header - Compact on mobile */}
            <div className="flex items-center justify-between px-4 pt-4 pb-3 sm:px-5 sm:pt-5 sm:pb-4">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-elec-yellow to-amber-500 flex items-center justify-center">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-elec-dark" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                    ELEC-iD
                  </h2>
                  <p className="text-[10px] sm:text-[11px] text-white tracking-wider uppercase">
                    Verified Professional
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 touch-manipulation active:scale-95"
                onClick={() => (isMobile ? setIsEditSheetOpen(true) : handleOpenEdit())}
              >
                <Edit2 className="h-4 w-4 text-white" />
              </Button>
            </div>

            {/* Main Content Row */}
            <div className="px-4 pb-4 sm:px-5 sm:pb-5">
              <div className="flex gap-3 sm:gap-4">
                {/* Photo Column */}
                <div className="relative flex-shrink-0">
                  {photoUrl || elecIdData.photoUrl ? (
                    <img
                      src={photoUrl || elecIdData.photoUrl || ''}
                      alt="Profile"
                      className="w-[72px] h-[90px] sm:w-[100px] sm:h-[120px] rounded-xl sm:rounded-2xl object-cover border-2 border-white/20"
                    />
                  ) : (
                    <div className="w-[72px] h-[90px] sm:w-[100px] sm:h-[120px] rounded-xl sm:rounded-2xl bg-gradient-to-br from-elec-yellow via-amber-400 to-amber-500 flex items-center justify-center border-2 border-white/20">
                      <span className="text-elec-dark font-bold text-2xl sm:text-4xl">
                        {userInitials}
                      </span>
                    </div>
                  )}

                  {/* Hidden file input for photo upload */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />

                  {/* Camera overlay */}
                  <button
                    onClick={handlePhotoClick}
                    disabled={isUploadingPhoto}
                    className="absolute -bottom-1.5 -right-1.5 sm:-bottom-2 sm:-right-2 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center shadow-lg active:scale-95 transition-transform touch-manipulation border-2 border-[#1a1a2e] disabled:opacity-50"
                  >
                    {isUploadingPhoto ? (
                      <div className="h-3 w-3 sm:h-4 sm:w-4 border-2 border-elec-dark border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Camera className="h-3 w-3 sm:h-4 sm:w-4" />
                    )}
                  </button>

                  {/* Verified badge */}
                  {elecIdData.isVerified && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-[#1a1a2e]">
                      <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Details Column */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  {/* Name & Job */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white truncate">{userName}</h3>
                    <p className="text-elec-yellow font-medium text-xs sm:text-sm mt-0.5">
                      {elecIdData.jobTitleLabel}
                    </p>
                  </div>

                  {/* Info Grid */}
                  <div className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
                    {/* ECS Card Row */}
                    {ecsCard && (
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div
                          className="w-7 h-4 sm:w-8 sm:h-5 rounded flex items-center justify-center text-[6px] sm:text-[7px] font-bold text-white"
                          style={{ backgroundColor: ecsCard.color }}
                        >
                          ECS
                        </div>
                        <span className="text-white text-[11px] sm:text-xs font-medium truncate">
                          {ecsCard.label}
                        </span>
                        <span
                          className={cn(
                            'text-[9px] sm:text-[10px] font-medium ml-auto shrink-0',
                            expiryStatus.status === 'expired'
                              ? 'text-red-400'
                              : expiryStatus.status === 'expiring'
                                ? 'text-orange-400'
                                : 'text-white'
                          )}
                        >
                          {expiryStatus.status === 'expired'
                            ? 'EXPIRED'
                            : expiryStatus.status === 'expiring' &&
                                expiryStatus.daysRemaining != null
                              ? `${expiryStatus.daysRemaining}d`
                              : elecIdData.ecsCardExpiry
                                ? new Date(elecIdData.ecsCardExpiry).toLocaleDateString('en-GB', {
                                    month: 'short',
                                    year: '2-digit',
                                  })
                                : ''}
                        </span>
                      </div>
                    )}

                    {/* Tier Badge Row */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Badge
                        className={cn(
                          'text-[9px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 border',
                          VERIFICATION_TIERS[verificationTier].bgColor,
                          VERIFICATION_TIERS[verificationTier].color,
                          VERIFICATION_TIERS[verificationTier].borderColor
                        )}
                      >
                        {React.createElement(VERIFICATION_TIERS[verificationTier].icon, {
                          className: 'h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1',
                        })}
                        {VERIFICATION_TIERS[verificationTier].label}
                      </Badge>
                      <span className="text-[9px] sm:text-[10px] text-white">Verification</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ID Number Bar */}
            <div className="border-t border-white/10 bg-white/[0.02]">
              <motion.button
                whileTap={{ scale: 0.99 }}
                onClick={copyElecId}
                className="w-full px-4 py-3 sm:px-5 sm:py-4 flex items-center justify-between touch-manipulation active:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white flex items-center justify-center">
                    <QrCode className="h-5 w-5 sm:h-6 sm:w-6 text-[#1a1a2e]" />
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white font-medium">
                      ELEC-iD
                    </p>
                    <p className="font-mono font-bold text-white text-base sm:text-lg tracking-wider">
                      {elecIdData.elecIdNumber}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-white">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wide hidden xs:inline">
                    Tap to copy
                  </span>
                  <Copy className="h-4 w-4" />
                </div>
              </motion.button>
            </div>

            {/* Footer Status */}
            <div className="px-4 py-2 sm:px-5 sm:py-2.5 border-t border-white/[0.06] bg-white/[0.01] flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] text-white">
                <Shield className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                <span>VERIFIED BY ELEC-MATE</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] sm:text-[10px] text-emerald-400 font-medium">
                  ACTIVE
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Verification & Talent Pool */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-white/10 rounded-2xl overflow-hidden bg-white/[0.03]">
          {/* Verification Tier Row */}
          <div
            className={cn(
              'p-4 flex items-center gap-3',
              verificationTier === 'premium'
                ? 'bg-gradient-to-r from-elec-yellow/15 to-transparent'
                : verificationTier === 'verified'
                  ? 'bg-gradient-to-r from-blue-500/15 to-transparent'
                  : ''
            )}
          >
            <div
              className={cn(
                'w-11 h-11 rounded-xl flex items-center justify-center shrink-0',
                verificationTier === 'premium'
                  ? 'bg-elec-yellow/20'
                  : verificationTier === 'verified'
                    ? 'bg-blue-500/20'
                    : 'bg-white/10'
              )}
            >
              {React.createElement(VERIFICATION_TIERS[verificationTier].icon, {
                className: cn('h-5 w-5', VERIFICATION_TIERS[verificationTier].color),
              })}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className={cn('font-bold text-sm', VERIFICATION_TIERS[verificationTier].color)}>
                  {VERIFICATION_TIERS[verificationTier].label}
                </h4>
                <Badge
                  className={cn(
                    'text-[10px] px-1.5 py-0 border',
                    VERIFICATION_TIERS[verificationTier].bgColor,
                    VERIFICATION_TIERS[verificationTier].color,
                    VERIFICATION_TIERS[verificationTier].borderColor
                  )}
                >
                  Tier
                </Badge>
              </div>
              <p className="text-xs text-white mt-0.5">
                {VERIFICATION_TIERS[verificationTier].description}
              </p>
            </div>
            {verificationTier !== 'premium' ? (
              <Button
                size="sm"
                className="h-11 px-4 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold rounded-xl touch-manipulation active:scale-[0.97] shrink-0"
                onClick={() => onNavigate?.('documents')}
              >
                <Sparkles className="h-4 w-4 mr-1.5" />
                Upgrade
              </Button>
            ) : (
              <div className="flex items-center gap-1.5 text-elec-yellow shrink-0">
                <Crown className="h-4 w-4" />
                <span className="text-xs font-semibold">Max</span>
              </div>
            )}
          </div>

          {verificationTier !== 'premium' && (
            <div className="px-4 pb-3">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-white">
                  Progress to {verificationTier === 'basic' ? 'Verified' : 'Premium'}
                </span>
                <span className={cn('font-semibold', VERIFICATION_TIERS[verificationTier].color)}>
                  {verificationTier === 'basic' ? '50%' : '75%'}
                </span>
              </div>
              <Progress value={verificationTier === 'basic' ? 50 : 75} className="h-2" />
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-white/[0.06]" />

          {/* Talent Pool Row */}
          <div className="p-4 flex items-center gap-3">
            <div
              className={cn(
                'w-11 h-11 rounded-xl flex items-center justify-center shrink-0',
                availableForHire && !isOptedOut ? 'bg-emerald-500/20' : 'bg-white/10'
              )}
            >
              <Users
                className={cn(
                  'h-5 w-5',
                  availableForHire && !isOptedOut ? 'text-emerald-400' : 'text-white'
                )}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-white">Talent Pool</h4>
              <p
                className={cn(
                  'text-xs mt-0.5',
                  isOptedOut
                    ? 'text-orange-400'
                    : availableForHire
                      ? 'text-emerald-400'
                      : 'text-white'
                )}
              >
                {isOptedOut
                  ? 'Disabled'
                  : availableForHire
                    ? 'Visible to employers'
                    : 'Hidden from search'}
              </p>
            </div>
            <Switch
              checked={availableForHire && !isOptedOut}
              onCheckedChange={isOptedOut ? handleOptIn : handleAvailabilityChange}
              disabled={isSaving}
              className="data-[state=checked]:bg-emerald-500 shrink-0"
            />
          </div>

          {/* Visibility Selector */}
          {availableForHire && !isOptedOut && (
            <div className="px-4 pb-4">
              <Select
                value={profileVisibility}
                onValueChange={handleVisibilityChange}
                disabled={isSaving}
              >
                <SelectTrigger className="h-11 text-sm bg-white/5 border-white/10 rounded-xl w-full touch-manipulation">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-white/20 z-50">
                  <SelectItem value="public" className="text-sm py-3 touch-manipulation">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Public
                    </div>
                  </SelectItem>
                  <SelectItem value="employers_only" className="text-sm py-3 touch-manipulation">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Employers Only
                    </div>
                  </SelectItem>
                  <SelectItem value="private" className="text-sm py-3 touch-manipulation">
                    <div className="flex items-center gap-2">
                      <EyeOff className="h-4 w-4" />
                      Private
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Disable link - subtle at bottom */}
          {!isOptedOut && (
            <div className="px-4 pb-3 pt-1 border-t border-white/[0.04]">
              <button
                onClick={() => setIsOptOutDialogOpen(true)}
                className="text-xs text-white touch-manipulation active:opacity-70"
              >
                Disable Elec-ID
              </button>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Opted-Out Banner */}
      {isOptedOut && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="bg-orange-500/10 border-orange-500/30 rounded-2xl">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
                <Power className="h-5 w-5 text-orange-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-orange-400 text-sm">Elec-ID Disabled</h4>
                <p className="text-xs text-white mt-0.5">
                  Hidden from Talent Pool. Your data is still saved.
                </p>
              </div>
              <Button
                size="sm"
                className="h-11 px-4 border-orange-500/30 text-orange-400 hover:bg-orange-500/10 rounded-xl touch-manipulation active:scale-[0.97] shrink-0"
                variant="outline"
                onClick={handleOptIn}
                disabled={isSaving}
              >
                Re-enable
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Opt-Out Confirmation Dialog */}
      <Dialog open={isOptOutDialogOpen} onOpenChange={setIsOptOutDialogOpen}>
        <DialogContent className="bg-elec-gray border-white/20 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-400" />
              Disable Elec-ID?
            </DialogTitle>
            <DialogDescription className="text-white">
              This will hide your profile from the Talent Pool. Employers will not be able to
              discover you through search.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm text-foreground font-medium mb-2">What happens:</p>
              <ul className="space-y-1.5 text-sm text-white">
                <li className="flex items-center gap-2">
                  <EyeOff className="h-4 w-4" />
                  Hidden from employer searches
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Your data remains saved
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  You can re-enable anytime
                </li>
              </ul>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-white/20"
                onClick={() => setIsOptOutDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleOptOut}
                disabled={isSaving}
              >
                Disable Elec-ID
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile Strength — Circular Ring */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-white/10 rounded-2xl overflow-hidden bg-white/[0.03]">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-4">
              {/* Circular Progress Ring */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0">
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
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    {completeness.percentage}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-white font-medium -mt-0.5">
                    %
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm sm:text-base text-white">Profile Strength</h4>
                <p className="text-xs text-white mt-1">
                  {completeness.percentage >= 80
                    ? 'Looking great! Your profile is strong.'
                    : completeness.percentage >= 50
                      ? 'Good progress — a few more items to stand out.'
                      : 'Add more details to attract employers.'}
                </p>
              </div>
            </div>

            {/* Missing items */}
            {completeness.missingItems.length > 0 && (
              <div className="mt-4 space-y-1.5">
                {completeness.missingItems.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 text-xs sm:text-sm text-white touch-manipulation"
                  >
                    <Zap className="h-3.5 w-3.5 text-elec-yellow shrink-0" />
                    <span className="truncate">{item}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-white ml-auto shrink-0" />
                  </div>
                ))}
                {completeness.missingItems.length > 3 && (
                  <p className="text-xs text-white text-center pt-1">
                    +{completeness.missingItems.length - 3} more items
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid — Clean Row Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <Card className="border-white/10 rounded-2xl overflow-hidden bg-white/[0.03]">
          {statsLoading ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="w-11 h-11 rounded-xl bg-white/10 shrink-0" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-20 mb-1 bg-white/10" />
                    <Skeleton className="h-3 w-12 bg-white/10" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {[
                {
                  id: 'qualifications',
                  icon: GraduationCap,
                  count: profileStats.qualificationsCount,
                  label: 'Qualifications',
                  iconBg: 'bg-purple-500/20',
                  iconColor: 'text-purple-400',
                  countColor: 'text-purple-400',
                },
                {
                  id: 'experience',
                  icon: Briefcase,
                  count: profileStats.experienceCount,
                  label: 'Work History',
                  iconBg: 'bg-blue-500/20',
                  iconColor: 'text-blue-400',
                  countColor: 'text-blue-400',
                },
                {
                  id: 'skills',
                  icon: Wrench,
                  count: profileStats.skillsCount,
                  label: 'Skills',
                  iconBg: 'bg-emerald-500/20',
                  iconColor: 'text-emerald-400',
                  countColor: 'text-emerald-400',
                },
                {
                  id: 'compliance',
                  icon: Shield,
                  count: profileStats.expiringItems,
                  label: 'Expiring Soon',
                  iconBg: profileStats.expiringItems > 0 ? 'bg-orange-500/20' : 'bg-white/10',
                  iconColor: profileStats.expiringItems > 0 ? 'text-orange-400' : 'text-white',
                  countColor: profileStats.expiringItems > 0 ? 'text-orange-400' : 'text-white',
                },
                {
                  id: 'share',
                  icon: Eye,
                  count: profile?.profile_views ?? 0,
                  label: 'Profile Views',
                  iconBg: 'bg-yellow-500/20',
                  iconColor: 'text-yellow-400',
                  countColor: 'text-yellow-400',
                },
              ].map((stat, index, arr) => (
                <motion.button
                  key={stat.id}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleStatClick(stat.id)}
                  className={cn(
                    'w-full flex items-center gap-3 p-4 text-left touch-manipulation active:bg-white/[0.04] transition-colors',
                    index < arr.length - 1 && 'border-b border-white/[0.06]'
                  )}
                >
                  <div
                    className={cn(
                      'w-11 h-11 rounded-xl flex items-center justify-center shrink-0',
                      stat.iconBg
                    )}
                  >
                    <stat.icon className={cn('h-5 w-5', stat.iconColor)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{stat.label}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={cn('text-xl font-bold', stat.countColor)}>{stat.count}</span>
                    <ChevronRight className="h-4 w-4 text-white" />
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </Card>
      </motion.div>

      {/* ── Your profile is live — share CTA ─────────────────────────────── */}
      {elecIdProfile?.elec_id_number && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="relative overflow-hidden rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/8 via-transparent to-transparent p-4 sm:p-5"
        >
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            {/* Header */}
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-sm shadow-yellow-500/20">
                <Link2 className="h-3.5 w-3.5 text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-sm leading-none">Your profile is live</p>
                <p className="text-[11px] text-white mt-0.5">
                  Share with employers, clients, or anyone who needs to verify your credentials
                </p>
              </div>
            </div>

            {/* URL row */}
            <div className="flex items-center gap-2">
              <div className="flex-1 min-w-0 px-3 py-2 rounded-xl bg-black/30 border border-white/[0.07]">
                <p className="text-xs text-white font-mono truncate">
                  elec-mate.com/verify/
                  <span className="text-yellow-400 font-bold">{elecIdProfile.elec_id_number}</span>
                </p>
              </div>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      `https://elec-mate.com/verify/${elecIdProfile.elec_id_number}`
                    );
                  } catch {
                    // iOS WKWebView fallback — still show copied state
                  }
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-[#0a0a14] text-xs font-bold transition-all touch-manipulation min-h-[36px]"
              >
                {copiedLink ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {copiedLink ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {/* Create QR / share link button */}
            <button
              onClick={() => onNavigate?.('share')}
              className="mt-2.5 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] text-white text-xs font-medium transition-all touch-manipulation"
            >
              <QrCode className="h-3.5 w-3.5" />
              Create QR code or timed share link
              <ChevronRight className="h-3.5 w-3.5 ml-auto" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Training Requests from Employers */}
      <TrainingRequestsCard />
    </div>
  );
};

export default ElecIdOverview;
