import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
import { getExpiryStatus, calculateProfileCompleteness } from "@/utils/elecIdGenerator";
import { getECSCardType, UK_JOB_TITLES, ECS_CARD_TYPES } from "@/data/uk-electrician-constants";
import { TrainingRequestsCard } from "./TrainingRequestsCard";
import { toast } from "@/hooks/use-toast";

interface ElecIdOverviewProps {
  onNavigate?: (tabId: string) => void;
}

// Verification tier configuration
const VERIFICATION_TIERS = {
  basic: {
    label: "Basic",
    color: "text-muted-foreground",
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
  };

  const [editFormData, setEditFormData] = useState({
    jobTitle: elecIdData.jobTitle,
    ecsCardType: elecIdData.ecsCardType,
    ecsCardExpiry: elecIdData.ecsCardExpiry,
    bio: elecIdData.bio,
  });

  const profileStats = {
    qualificationsCount: 5,
    experienceCount: 3,
    skillsCount: 12,
    expiringItems: 2,
  };

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

      {/* Bio */}
      <div className="space-y-2">
        <Label className="text-foreground text-sm">
          Professional Bio
          <span className="text-muted-foreground ml-2">(optional)</span>
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
                <p className="text-sm text-muted-foreground">Update your Elec-ID information</p>
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

      {/* Premium Elec-ID Card - Mobile Optimized */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />

          <CardContent className="relative p-0">
            {/* Mobile Layout */}
            <div className="sm:hidden">
              {/* Top section with photo and basic info */}
              <div className="p-4 pb-0">
                <div className="flex items-start gap-4">
                  {/* Photo */}
                  <div className="relative">
                    {elecIdData.photoUrl ? (
                      <img
                        src={elecIdData.photoUrl}
                        alt="Profile"
                        className="w-20 h-20 rounded-2xl object-cover ring-2 ring-elec-yellow/50"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-elec-yellow to-amber-500 flex items-center justify-center text-elec-dark font-bold text-2xl ring-2 ring-elec-yellow/50 shadow-lg shadow-elec-yellow/20">
                        {userInitials}
                      </div>
                    )}
                    <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                      <Camera className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Name and title */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-white truncate">{userName}</h3>
                        <p className="text-elec-yellow text-sm font-medium">{elecIdData.jobTitleLabel}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-xl bg-white/5 hover:bg-white/10 shrink-0"
                        onClick={() => isMobile ? setIsEditSheetOpen(true) : handleOpenEdit()}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Verification Badge */}
                    <div className="mt-2">
                      <Badge className={cn(
                        "text-xs font-medium",
                        VERIFICATION_TIERS[verificationTier].bgColor,
                        VERIFICATION_TIERS[verificationTier].color,
                        VERIFICATION_TIERS[verificationTier].borderColor
                      )}>
                        {React.createElement(VERIFICATION_TIERS[verificationTier].icon, {
                          className: "h-3 w-3 mr-1",
                        })}
                        {VERIFICATION_TIERS[verificationTier].label}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Elec-ID Number - Prominent display */}
              <div className="px-4 py-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={copyElecId}
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/10 active:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-elec-yellow/20 flex items-center justify-center">
                        <IdCard className="h-5 w-5 text-elec-yellow" />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Elec-ID</p>
                        <p className="font-mono font-bold text-white text-lg tracking-wide">
                          {elecIdData.elecIdNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {elecIdData.isVerified && (
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      )}
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </motion.button>
              </div>

              {/* ECS Card Info */}
              <div className="px-4 pb-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  {ecsCard && (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded"
                        style={{ backgroundColor: ecsCard.color }}
                      />
                      <span className="text-white font-medium text-sm">{ecsCard.label}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Clock className={cn(
                      "h-4 w-4",
                      expiryStatus.status === "expired" ? "text-red-400" :
                      expiryStatus.status === "expiring" ? "text-orange-400" : "text-muted-foreground"
                    )} />
                    <span className={cn(
                      "text-xs font-medium",
                      expiryStatus.status === "expired" ? "text-red-400" :
                      expiryStatus.status === "expiring" ? "text-orange-400" : "text-muted-foreground"
                    )}>
                      {new Date(elecIdData.ecsCardExpiry).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:flex">
              {/* Left: Photo Section */}
              <div className="relative p-6 flex items-center justify-center bg-white/5 w-48">
                <div className="relative">
                  {elecIdData.photoUrl ? (
                    <img
                      src={elecIdData.photoUrl}
                      alt="Profile"
                      className="w-28 h-28 rounded-xl object-cover border-2 border-elec-yellow"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-elec-yellow to-elec-yellow/70 flex items-center justify-center text-elec-dark font-bold text-3xl border-2 border-elec-yellow">
                      {userInitials}
                    </div>
                  )}
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center hover:bg-elec-yellow/90 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Right: Info Section */}
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{userName}</h3>
                    <p className="text-elec-yellow font-medium">{elecIdData.jobTitleLabel}</p>
                    {elecIdData.bio && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{elecIdData.bio}</p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 hover:bg-white/10"
                    onClick={handleOpenEdit}
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>

                {/* Elec-ID Number */}
                <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-white/5 border border-white/10">
                  <IdCard className="h-5 w-5 text-elec-yellow" />
                  <div>
                    <p className="text-xs text-muted-foreground">Elec-ID Number</p>
                    <p className="font-mono font-bold text-foreground text-lg">
                      {elecIdData.elecIdNumber}
                    </p>
                  </div>
                  {elecIdData.isVerified && (
                    <Badge className="ml-auto bg-green-500/20 text-green-400 border-green-500/30">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                {/* ECS Card Info */}
                <div className="flex items-center gap-4 flex-wrap">
                  {ecsCard && (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: ecsCard.color }}
                      />
                      <span className="text-foreground font-medium">{ecsCard.label}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span
                      className={`text-sm ${
                        expiryStatus.status === "expired"
                          ? "text-red-400"
                          : expiryStatus.status === "expiring"
                          ? "text-orange-400"
                          : "text-muted-foreground"
                      }`}
                    >
                      Expires: {new Date(elecIdData.ecsCardExpiry).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Verification Tier & Talent Pool Settings - Mobile Optimized */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* Verification Tier Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className={cn(
            "border overflow-hidden",
            VERIFICATION_TIERS[verificationTier].bgColor,
            VERIFICATION_TIERS[verificationTier].borderColor
          )}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={cn(
                  "p-2.5 rounded-xl shrink-0",
                  verificationTier === "premium" ? "bg-elec-yellow/20" :
                  verificationTier === "verified" ? "bg-blue-500/20" : "bg-white/10"
                )}>
                  {React.createElement(VERIFICATION_TIERS[verificationTier].icon, {
                    className: cn("h-6 w-6", VERIFICATION_TIERS[verificationTier].color),
                  })}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className={cn("font-semibold", VERIFICATION_TIERS[verificationTier].color)}>
                      {VERIFICATION_TIERS[verificationTier].label} Tier
                    </h4>
                    {verificationTier === "premium" && (
                      <Badge className="bg-elec-yellow text-elec-dark text-[10px] px-1.5">TOP</Badge>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    {VERIFICATION_TIERS[verificationTier].description}
                  </p>
                </div>
              </div>

              {/* Tier progress */}
              {verificationTier !== "premium" && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Progress to next tier</span>
                    <span className={VERIFICATION_TIERS[verificationTier].color}>
                      {verificationTier === "basic" ? "1/2 docs" : "3/4 docs"}
                    </span>
                  </div>
                  <Progress value={verificationTier === "basic" ? 50 : 75} className="h-1.5" />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2 h-9 text-xs bg-white/5 hover:bg-white/10"
                    onClick={() => onNavigate?.("documents")}
                  >
                    <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                    Upgrade Tier
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Talent Pool Settings Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className={cn(
            "border overflow-hidden",
            availableForHire && !isOptedOut
              ? "bg-emerald-500/10 border-emerald-500/30"
              : "bg-white/5 border-white/10"
          )}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={cn(
                  "p-2.5 rounded-xl shrink-0",
                  availableForHire && !isOptedOut ? "bg-emerald-500/20" : "bg-white/10"
                )}>
                  <Users className={cn(
                    "h-6 w-6",
                    availableForHire && !isOptedOut ? "text-emerald-400" : "text-muted-foreground"
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground">Talent Pool</h4>
                    <Switch
                      checked={availableForHire && !isOptedOut}
                      onCheckedChange={handleAvailabilityChange}
                      disabled={isOptedOut || isSaving}
                      className="data-[state=checked]:bg-emerald-500"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    {isOptedOut
                      ? "Elec-ID disabled"
                      : availableForHire
                      ? "Visible to employers"
                      : "Hidden from employers"}
                  </p>
                </div>
              </div>

              {availableForHire && !isOptedOut && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <Label className="text-xs text-muted-foreground mb-2 block">Profile Visibility</Label>
                  <Select
                    value={profileVisibility}
                    onValueChange={handleVisibilityChange}
                    disabled={isSaving}
                  >
                    <SelectTrigger className="h-10 text-xs bg-white/5 border-white/10 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-gray border-white/20">
                      <SelectItem value="public">
                        <div className="flex items-center gap-2">
                          <Eye className="h-3 w-3" />
                          Public - Anyone can view
                        </div>
                      </SelectItem>
                      <SelectItem value="employers_only">
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3" />
                          Employers Only
                        </div>
                      </SelectItem>
                      <SelectItem value="private">
                        <div className="flex items-center gap-2">
                          <EyeOff className="h-3 w-3" />
                          Private - Share link only
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                <p className="text-sm text-muted-foreground mt-1">
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
                  <Power className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Disable Elec-ID</h4>
                  <p className="text-xs text-muted-foreground">
                    Remove yourself from the Talent Pool completely
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-muted-foreground hover:text-red-400 hover:border-red-500/30"
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
            <DialogDescription className="text-muted-foreground">
              This will hide your profile from the Talent Pool. Employers will not be able
              to discover you through search.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm text-foreground font-medium mb-2">What happens:</p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
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
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            </div>

            <Progress value={completeness.percentage} className="h-2 sm:h-3 mb-3 sm:mb-4" />

            {completeness.missingItems.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-muted-foreground">To improve your profile:</p>
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
                    <p className="text-xs text-muted-foreground text-center pt-1">
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
        {[
          { id: "qualifications", icon: GraduationCap, count: profileStats.qualificationsCount, label: "Qualifications", shortLabel: "Quals", color: "from-purple-500/20 to-pink-500/20", iconColor: "text-purple-400", borderColor: "hover:border-purple-500/50 active:border-purple-500/50" },
          { id: "experience", icon: Briefcase, count: profileStats.experienceCount, label: "Work History", shortLabel: "Work", color: "from-blue-500/20 to-cyan-500/20", iconColor: "text-blue-400", borderColor: "hover:border-blue-500/50 active:border-blue-500/50" },
          { id: "skills", icon: Wrench, count: profileStats.skillsCount, label: "Skills", shortLabel: "Skills", color: "from-emerald-500/20 to-teal-500/20", iconColor: "text-emerald-400", borderColor: "hover:border-emerald-500/50 active:border-emerald-500/50" },
          { id: "compliance", icon: Shield, count: profileStats.expiringItems, label: "Expiring Soon", shortLabel: "Expiry", color: "from-orange-500/20 to-red-500/20", iconColor: "text-orange-400", borderColor: "hover:border-orange-500/50 active:border-orange-500/50" },
        ].map((stat, index) => (
          <motion.button
            key={stat.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleStatClick(stat.id)}
            className={cn(
              "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4 text-left transition-all",
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
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:hidden">{stat.shortLabel}</p>
              <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">{stat.label}</p>
            </div>

            {/* Chevron indicator */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Training Requests from Employers */}
      <TrainingRequestsCard />
    </div>
  );
};

export default ElecIdOverview;
