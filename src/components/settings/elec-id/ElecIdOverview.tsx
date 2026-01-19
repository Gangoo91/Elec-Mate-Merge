import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Drawer } from "vaul";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
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
  Award,
  Eye,
  EyeOff,
  Crown,
  Star,
  Power,
  AlertCircle,
  Copy,
  QrCode,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useElecIdProfile } from "@/hooks/useElecIdProfile";
import { useIsMobile } from "@/hooks/use-mobile";
import { getExpiryStatus, calculateProfileCompleteness, isExpiringWithin } from "@/utils/elecIdGenerator";
import { getECSCardType, UK_JOB_TITLES, ECS_CARD_TYPES } from "@/data/uk-electrician-constants";
import { TrainingRequestsCard } from "./TrainingRequestsCard";
import { toast } from "@/hooks/use-toast";
import {
  getQualificationsByProfileId,
  getSkillsByProfileId,
  getWorkHistoryByProfileId,
  getTrainingByProfileId,
} from "@/services/elecIdService";

interface ElecIdOverviewProps {
  onNavigate?: (tabId: string) => void;
}

// Verification tier configuration
const VERIFICATION_TIERS = {
  basic: {
    label: "Basic",
    color: "text-foreground/80",
    bgColor: "bg-white/10",
    borderColor: "border-white/20",
    icon: Shield,
    description: "Profile created",
  },
  verified: {
    label: "Verified",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    borderColor: "border-blue-500/30",
    icon: CheckCircle2,
    description: "ECS Card + 1 qualification verified",
  },
  premium: {
    label: "Premium",
    color: "text-elec-yellow",
    bgColor: "bg-elec-yellow/20",
    borderColor: "border-elec-yellow/30",
    icon: Crown,
    description: "Fully verified professional",
  },
};

const ElecIdOverview = ({ onNavigate }: ElecIdOverviewProps) => {
  const { profile } = useAuth();
  const {
    profile: elecIdProfile,
    isOptedOut,
    setOptOut,
    updateProfile
  } = useElecIdProfile();
  const isMobile = useIsMobile();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isOptOutDialogOpen, setIsOptOutDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Local state synced with profile
  const [availableForHire, setAvailableForHire] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState<"public" | "employers_only" | "private">("employers_only");
  const [verificationTier, setVerificationTier] = useState<"basic" | "verified" | "premium">("basic");

  // Copy Elec-ID to clipboard
  const copyElecId = () => {
    const id = elecIdProfile?.elec_id_number || "EM-XXXXXX";
    navigator.clipboard.writeText(id);
    toast({
      title: "Copied!",
      description: "Elec-ID copied to clipboard",
    });
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
  const handleVisibilityChange = async (value: "public" | "employers_only" | "private") => {
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

  // Use profile data or fallbacks
  const elecIdData = {
    elecIdNumber: elecIdProfile?.elec_id_number || "EM-XXXXXX",
    jobTitle: "approved",
    jobTitleLabel: "Approved Electrician",
    ecsCardType: elecIdProfile?.ecs_card_type || "gold",
    ecsCardExpiry: elecIdProfile?.ecs_expiry_date || "2026-12-15",
    isVerified: elecIdProfile?.is_verified || false,
    photoUrl: null as string | null,
    bio: elecIdProfile?.bio || "",
    rateType: elecIdProfile?.rate_type || "daily",
    rateAmount: elecIdProfile?.rate_amount || null,
  };

  const [editFormData, setEditFormData] = useState({
    jobTitle: elecIdData.jobTitle,
    ecsCardType: elecIdData.ecsCardType,
    ecsCardExpiry: elecIdData.ecsCardExpiry,
    bio: elecIdData.bio,
    rateType: elecIdData.rateType,
    rateAmount: elecIdData.rateAmount?.toString() || "",
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
      qualifications.forEach(q => {
        if (q.expiry_date && isExpiringWithin(q.expiry_date, 90)) {
          expiringCount++;
        }
      });

      // Check training with expiry dates
      training.forEach(t => {
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
      console.error("Error loading profile stats:", err);
    } finally {
      setStatsLoading(false);
    }
  }, [elecIdProfile?.id, elecIdProfile?.ecs_expiry_date]);

  useEffect(() => {
    loadProfileStats();
  }, [loadProfileStats]);

  const completeness = calculateProfileCompleteness({
    jobTitle: elecIdData.jobTitleLabel,
    bio: elecIdData.bio || profile?.bio,
    qualificationsCount: profileStats.qualificationsCount,
    experienceCount: profileStats.experienceCount,
    skillsCount: profileStats.skillsCount,
    ecsCardType: elecIdData.ecsCardType,
    ecsCardExpiry: elecIdData.ecsCardExpiry,
  });

  const ecsCard = getECSCardType(elecIdData.ecsCardType);
  const expiryStatus = getExpiryStatus(elecIdData.ecsCardExpiry);

  const userName = profile?.full_name || profile?.username || "Electrician";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleOpenEdit = () => {
    setEditFormData({
      jobTitle: elecIdData.jobTitle,
      ecsCardType: elecIdData.ecsCardType,
      ecsCardExpiry: elecIdData.ecsCardExpiry,
      bio: elecIdData.bio,
      rateType: elecIdData.rateType,
      rateAmount: elecIdData.rateAmount?.toString() || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    setIsSaving(true);
    try {
      await updateProfile({
        ecs_card_type: editFormData.ecsCardType,
        ecs_expiry_date: editFormData.ecsCardExpiry,
        bio: editFormData.bio,
        rate_type: editFormData.rateType as "hourly" | "daily" | "weekly" | "yearly",
        rate_amount: editFormData.rateAmount ? parseFloat(editFormData.rateAmount) : null,
      });
      setIsEditDialogOpen(false);
      setIsEditSheetOpen(false);
      toast({
        title: "Profile updated",
        description: "Your Elec-ID profile has been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive",
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
  const jobTitlesByCategory = UK_JOB_TITLES.reduce((acc, title) => {
    if (!acc[title.category]) acc[title.category] = [];
    acc[title.category].push(title);
    return acc;
  }, {} as Record<string, typeof UK_JOB_TITLES>);

  // Edit form content (shared between dialog and sheet)
  const EditFormContent = () => (
    <div className="space-y-4">
      {/* Job Title */}
      <div className="space-y-2">
        <Label className="text-foreground text-sm">Job Title</Label>
        <Select
          value={editFormData.jobTitle}
          onValueChange={(value) =>
            setEditFormData({ ...editFormData, jobTitle: value })
          }
        >
          <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl">
            <SelectValue placeholder="Select job title" />
          </SelectTrigger>
          <SelectContent className="bg-elec-gray border-white/20 max-h-60">
            {Object.entries(jobTitlesByCategory).map(([category, titles]) => (
              <React.Fragment key={category}>
                <div className="px-2 py-1.5 text-xs font-semibold text-elec-yellow">
                  {category}
                </div>
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
          onValueChange={(value) =>
            setEditFormData({ ...editFormData, ecsCardType: value })
          }
        >
          <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl">
            <SelectValue placeholder="Select card type" />
          </SelectTrigger>
          <SelectContent className="bg-elec-gray border-white/20">
            {ECS_CARD_TYPES.map((card) => (
              <SelectItem key={card.value} value={card.value}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: card.color }}
                  />
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
          onChange={(e) =>
            setEditFormData({ ...editFormData, ecsCardExpiry: e.target.value })
          }
          className="h-12 bg-white/5 border-white/10 rounded-xl"
        />
      </div>

      {/* Rate Settings */}
      <div className="space-y-2">
        <Label className="text-foreground text-sm">
          Your Rate
          <span className="text-foreground/70 ml-2">(shown in Talent Pool)</span>
        </Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/70">£</span>
            <Input
              type="number"
              inputMode="decimal"
              min="0"
              value={editFormData.rateAmount}
              onChange={(e) =>
                setEditFormData({ ...editFormData, rateAmount: e.target.value })
              }
              placeholder="Amount"
              className="h-12 bg-white/5 border-white/10 rounded-xl pl-8"
            />
          </div>
          <Select
            value={editFormData.rateType}
            onValueChange={(value) =>
              setEditFormData({ ...editFormData, rateType: value })
            }
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
          <span className="text-foreground/70 ml-2">(optional)</span>
        </Label>
        <Textarea
          value={editFormData.bio}
          onChange={(e) =>
            setEditFormData({ ...editFormData, bio: e.target.value })
          }
          placeholder="Brief description of your experience and specializations..."
          className="bg-white/5 border-white/10 rounded-xl min-h-[100px] resize-none"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Mobile: Bottom Sheet Edit Dialog */}
      {isMobile ? (
        <Drawer.Root open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col max-h-[90vh] bg-background rounded-t-[20px] border-t border-border">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
              </div>
              <div className="px-4 pb-2">
                <h3 className="text-lg font-bold text-foreground">Edit Profile</h3>
                <p className="text-sm text-foreground/70">Update your Elec-ID information</p>
              </div>
              <div className="flex-1 overflow-y-auto px-4 pb-4">
                <EditFormContent />
              </div>
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
                    {isSaving ? "Saving..." : "Save Changes"}
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
              <EditFormContent />
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
                  {isSaving ? "Saving..." : "Save Changes"}
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
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Card className="relative overflow-hidden border border-white/10 rounded-3xl bg-gradient-to-b from-[#1a1a2e] to-[#12121f]">
          {/* Subtle top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow" />

          <CardContent className="p-0">
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-elec-yellow to-amber-500 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-elec-dark" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-wide">ELEC-iD</h2>
                  <p className="text-[11px] text-white/40 tracking-wider uppercase">Verified Professional</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 touch-manipulation active:scale-95"
                onClick={() => isMobile ? setIsEditSheetOpen(true) : handleOpenEdit()}
              >
                <Edit2 className="h-4 w-4 text-white/60" />
              </Button>
            </div>

            {/* Main Content Row */}
            <div className="px-5 pb-5">
              <div className="flex gap-4">
                {/* Photo Column */}
                <div className="relative flex-shrink-0">
                  {elecIdData.photoUrl ? (
                    <img
                      src={elecIdData.photoUrl}
                      alt="Profile"
                      className="w-[100px] h-[120px] sm:w-[110px] sm:h-[132px] rounded-2xl object-cover border-2 border-white/20"
                    />
                  ) : (
                    <div className="w-[100px] h-[120px] sm:w-[110px] sm:h-[132px] rounded-2xl bg-gradient-to-br from-elec-yellow via-amber-400 to-amber-500 flex items-center justify-center border-2 border-white/20">
                      <span className="text-elec-dark font-bold text-4xl">{userInitials}</span>
                    </div>
                  )}

                  {/* Camera overlay */}
                  <button className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center shadow-lg active:scale-95 transition-transform touch-manipulation border-2 border-[#1a1a2e]">
                    <Camera className="h-4 w-4" />
                  </button>

                  {/* Verified badge */}
                  {elecIdData.isVerified && (
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-[#1a1a2e]">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Details Column */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  {/* Name & Job */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white truncate">{userName}</h3>
                    <p className="text-elec-yellow font-semibold text-sm mt-1">{elecIdData.jobTitleLabel}</p>
                  </div>

                  {/* Info Grid */}
                  <div className="mt-3 space-y-2">
                    {/* ECS Card Row */}
                    {ecsCard && (
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-5 rounded flex items-center justify-center text-[7px] font-bold text-white"
                          style={{ backgroundColor: ecsCard.color }}
                        >
                          ECS
                        </div>
                        <span className="text-white/80 text-xs font-medium">{ecsCard.label}</span>
                        <span className={cn(
                          "text-[10px] font-medium ml-auto",
                          expiryStatus.status === "expired" ? "text-red-400" :
                          expiryStatus.status === "expiring" ? "text-orange-400" : "text-white/50"
                        )}>
                          {expiryStatus.status === "expired" ? "EXPIRED" :
                           expiryStatus.status === "expiring" && expiryStatus.daysRemaining != null ? `${expiryStatus.daysRemaining}d` :
                           elecIdData.ecsCardExpiry ? new Date(elecIdData.ecsCardExpiry).toLocaleDateString("en-GB", { month: "short", year: "2-digit" }) : ""}
                        </span>
                      </div>
                    )}

                    {/* Tier Badge Row */}
                    <div className="flex items-center gap-2">
                      <Badge className={cn(
                        "text-[10px] font-semibold px-2 py-0.5 border",
                        VERIFICATION_TIERS[verificationTier].bgColor,
                        VERIFICATION_TIERS[verificationTier].color,
                        VERIFICATION_TIERS[verificationTier].borderColor
                      )}>
                        {React.createElement(VERIFICATION_TIERS[verificationTier].icon, { className: "h-3 w-3 mr-1" })}
                        {VERIFICATION_TIERS[verificationTier].label}
                      </Badge>
                      <span className="text-[10px] text-white/30">Verification</span>
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
                className="w-full px-5 py-4 flex items-center justify-between touch-manipulation active:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
                    <QrCode className="h-6 w-6 text-[#1a1a2e]" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-medium">ELEC-iD</p>
                    <p className="font-mono font-bold text-white text-lg tracking-wider">{elecIdData.elecIdNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/40">
                  <span className="text-[10px] uppercase tracking-wide">Tap to copy</span>
                  <Copy className="h-4 w-4" />
                </div>
              </motion.button>
            </div>

            {/* Footer Status */}
            <div className="px-5 py-2.5 border-t border-white/[0.06] bg-white/[0.01] flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] text-white/25">
                <Shield className="h-3 w-3" />
                <span>VERIFIED BY ELEC-MATE</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-emerald-400/60 font-medium">ACTIVE</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Settings Cards - Responsive Grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {/* Verification Tier Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className={cn(
            "h-full border overflow-hidden rounded-xl",
            verificationTier === "premium"
              ? "bg-elec-yellow/[0.05] border-elec-yellow/20"
              : verificationTier === "verified"
              ? "bg-blue-500/[0.05] border-blue-500/20"
              : "bg-white/[0.03] border-white/10"
          )}>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={cn(
                  "w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0",
                  verificationTier === "premium" ? "bg-elec-yellow/20" :
                  verificationTier === "verified" ? "bg-blue-500/20" : "bg-white/10"
                )}>
                  {React.createElement(VERIFICATION_TIERS[verificationTier].icon, {
                    className: cn("h-4 w-4 sm:h-5 sm:w-5", VERIFICATION_TIERS[verificationTier].color),
                  })}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className={cn("font-semibold text-sm truncate", VERIFICATION_TIERS[verificationTier].color)}>
                    {VERIFICATION_TIERS[verificationTier].label}
                  </h4>
                  <p className="text-[10px] text-foreground/60 truncate">Verification Tier</p>
                </div>
              </div>

              {verificationTier !== "premium" ? (
                <div>
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="text-foreground/60">Progress</span>
                    <span className={VERIFICATION_TIERS[verificationTier].color}>
                      {verificationTier === "basic" ? "50%" : "75%"}
                    </span>
                  </div>
                  <Progress value={verificationTier === "basic" ? 50 : 75} className="h-1" />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2 h-9 text-[10px] sm:text-[11px] bg-white/5 hover:bg-white/10 touch-manipulation active:scale-[0.98]"
                    onClick={() => onNavigate?.("documents")}
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    Upgrade
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[10px] text-elec-yellow/70">
                  <Crown className="h-3 w-3" />
                  <span>Max tier</span>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Talent Pool Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className={cn(
            "h-full border overflow-hidden rounded-xl",
            availableForHire && !isOptedOut
              ? "bg-emerald-500/[0.08] border-emerald-500/30"
              : "bg-white/[0.03] border-white/10"
          )}>
            <CardContent className="p-3 sm:p-4">
              {/* Header with toggle */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className={cn(
                    "w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0",
                    availableForHire && !isOptedOut ? "bg-emerald-500/20" : "bg-white/10"
                  )}>
                    <Users className={cn(
                      "h-4 w-4 sm:h-5 sm:w-5",
                      availableForHire && !isOptedOut ? "text-emerald-400" : "text-foreground/70"
                    )} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-sm text-foreground truncate">Talent Pool</h4>
                    <p className={cn(
                      "text-[10px] truncate",
                      availableForHire && !isOptedOut ? "text-emerald-400" : "text-foreground/60"
                    )}>
                      {isOptedOut ? "Disabled" : availableForHire ? "Visible to employers" : "Hidden"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={availableForHire && !isOptedOut}
                  onCheckedChange={handleAvailabilityChange}
                  disabled={isOptedOut || isSaving}
                  className="data-[state=checked]:bg-emerald-500 shrink-0"
                />
              </div>

              {/* Visibility selector - shown when active */}
              {availableForHire && !isOptedOut && (
                <Select
                  value={profileVisibility}
                  onValueChange={handleVisibilityChange}
                  disabled={isSaving}
                >
                  <SelectTrigger className="h-9 text-[10px] sm:text-[11px] bg-white/5 border-white/10 rounded-lg w-full touch-manipulation">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-gray border-white/20 z-50">
                    <SelectItem value="public" className="text-xs py-2.5 touch-manipulation">
                      <div className="flex items-center gap-2">
                        <Eye className="h-3 w-3" />
                        Public
                      </div>
                    </SelectItem>
                    <SelectItem value="employers_only" className="text-xs py-2.5 touch-manipulation">
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3" />
                        Employers Only
                      </div>
                    </SelectItem>
                    <SelectItem value="private" className="text-xs py-2.5 touch-manipulation">
                      <div className="flex items-center gap-2">
                        <EyeOff className="h-3 w-3" />
                        Private
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}

              {/* Hint text when inactive */}
              {(!availableForHire || isOptedOut) && (
                <p className="text-[10px] text-foreground/60">
                  {isOptedOut ? "Re-enable to join" : "Turn on to be discovered"}
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Opt-Out Banner (when opted out) */}
      {isOptedOut && (
        <Card className="bg-orange-500/10 border-orange-500/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-orange-500/20">
                <Power className="h-5 w-5 text-orange-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-orange-400">Elec-ID Disabled</h4>
                <p className="text-sm text-foreground/70 mt-1">
                  Your Elec-ID is hidden from the Talent Pool. Employers cannot discover your profile.
                  Your credentials and data are still saved.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                onClick={handleOptIn}
                disabled={isSaving}
              >
                Re-enable
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Opt-Out Section (when not opted out) */}
      {!isOptedOut && (
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/10">
                  <Power className="h-5 w-5 text-foreground/70" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Disable Elec-ID</h4>
                  <p className="text-xs text-foreground/70">
                    Remove yourself from the Talent Pool completely
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-foreground/70 hover:text-red-400 hover:border-red-500/30"
                onClick={() => setIsOptOutDialogOpen(true)}
              >
                Disable
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Opt-Out Confirmation Dialog */}
      <Dialog open={isOptOutDialogOpen} onOpenChange={setIsOptOutDialogOpen}>
        <DialogContent className="bg-elec-gray border-white/20 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-400" />
              Disable Elec-ID?
            </DialogTitle>
            <DialogDescription className="text-foreground/70">
              This will hide your profile from the Talent Pool. Employers will not be able
              to discover you through search.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm text-foreground font-medium mb-2">What happens:</p>
              <ul className="space-y-1.5 text-sm text-foreground/70">
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

      {/* Profile Completeness - Mobile Optimized */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-white/5 to-transparent border-white/10 overflow-hidden">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-elec-yellow/20">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
                </div>
                <h4 className="text-sm sm:text-lg font-semibold text-foreground">Profile Strength</h4>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xl sm:text-2xl font-bold text-elec-yellow">{completeness.percentage}</span>
                <span className="text-sm text-foreground/70">%</span>
              </div>
            </div>

            <Progress value={completeness.percentage} className="h-2 sm:h-3 mb-3 sm:mb-4" />

            {completeness.missingItems.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-foreground/70">To improve your profile:</p>
                <div className="grid grid-cols-1 gap-1.5">
                  {completeness.missingItems.slice(0, 3).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white/5 text-xs sm:text-sm text-foreground/80"
                    >
                      <Zap className="h-3 w-3 text-elec-yellow shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                  {completeness.missingItems.length > 3 && (
                    <p className="text-xs text-foreground/70 text-center pt-1">
                      +{completeness.missingItems.length - 3} more items
                    </p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid - Mobile Optimized with Tap Animations */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4"
      >
        {statsLoading ? (
          // Loading skeletons
          <>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 min-h-[120px]">
                <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl mb-2 sm:mb-3 bg-white/10" />
                <Skeleton className="h-8 w-12 mb-1 bg-white/10" />
                <Skeleton className="h-3 w-16 bg-white/10" />
              </div>
            ))}
          </>
        ) : (
          [
            { id: "qualifications", icon: GraduationCap, count: profileStats.qualificationsCount, label: "Qualifications", shortLabel: "Quals", color: "from-purple-500/20 to-pink-500/20", iconColor: "text-purple-400", borderColor: "hover:border-purple-500/50 active:border-purple-500/50" },
            { id: "experience", icon: Briefcase, count: profileStats.experienceCount, label: "Work History", shortLabel: "Work", color: "from-blue-500/20 to-cyan-500/20", iconColor: "text-blue-400", borderColor: "hover:border-blue-500/50 active:border-blue-500/50" },
            { id: "skills", icon: Wrench, count: profileStats.skillsCount, label: "Skills", shortLabel: "Skills", color: "from-emerald-500/20 to-teal-500/20", iconColor: "text-emerald-400", borderColor: "hover:border-emerald-500/50 active:border-emerald-500/50" },
            { id: "compliance", icon: Shield, count: profileStats.expiringItems, label: "Expiring Soon", shortLabel: "Expiry", color: "from-orange-500/20 to-red-500/20", iconColor: "text-orange-400", borderColor: "hover:border-orange-500/50 active:border-orange-500/50" },
          ].map((stat, index) => (
            <motion.button
              key={stat.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleStatClick(stat.id)}
              className={cn(
                "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 text-left transition-all touch-manipulation min-h-[120px]",
                stat.borderColor
              )}
            >
              {/* Gradient background */}
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", stat.color)} />

              <div className="relative">
                <div className={cn("w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2 sm:mb-3", stat.color.replace("from-", "bg-gradient-to-br from-").replace("/20", "/30"))}>
                  <stat.icon className={cn("h-5 w-5 sm:h-6 sm:w-6", stat.iconColor)} />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">{stat.count}</p>
                <p className="text-[10px] sm:text-xs text-foreground/70 mt-0.5 sm:hidden">{stat.shortLabel}</p>
                <p className="text-xs text-foreground/70 mt-0.5 hidden sm:block">{stat.label}</p>
              </div>

              {/* Chevron indicator */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                <ChevronRight className="h-4 w-4 text-foreground/70/50" />
              </div>
            </motion.button>
          ))
        )}
      </motion.div>

      {/* Training Requests from Employers */}
      <TrainingRequestsCard />
    </div>
  );
};

export default ElecIdOverview;
