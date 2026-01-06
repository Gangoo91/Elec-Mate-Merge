import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useElecIdProfile } from "@/hooks/useElecIdProfile";
import { getExpiryStatus, calculateProfileCompleteness } from "@/utils/elecIdGenerator";
import { getECSCardType, UK_JOB_TITLES, ECS_CARD_TYPES } from "@/data/uk-electrician-constants";
import { TrainingRequestsCard } from "./TrainingRequestsCard";

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

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isOptOutDialogOpen, setIsOptOutDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Local state synced with profile
  const [availableForHire, setAvailableForHire] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState<"public" | "employers_only" | "private">("employers_only");
  const [verificationTier, setVerificationTier] = useState<"basic" | "verified" | "premium">("basic");

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

  const handleSaveEdit = () => {
    const selectedJobTitle = UK_JOB_TITLES.find(t => t.value === editFormData.jobTitle);
    setElecIdData({
      ...elecIdData,
      jobTitle: editFormData.jobTitle,
      jobTitleLabel: selectedJobTitle?.label || editFormData.jobTitle,
      ecsCardType: editFormData.ecsCardType,
      ecsCardExpiry: editFormData.ecsCardExpiry,
      bio: editFormData.bio,
    });
    setIsEditDialogOpen(false);
    // TODO: Save to database
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

  return (
    <div className="space-y-6">
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-elec-gray border-white/20 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">Edit Elec-ID Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            {/* Job Title */}
            <div className="space-y-2">
              <Label className="text-foreground">Job Title</Label>
              <Select
                value={editFormData.jobTitle}
                onValueChange={(value) =>
                  setEditFormData({ ...editFormData, jobTitle: value })
                }
              >
                <SelectTrigger className="bg-white/5 border-white/20">
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
              <Label className="text-foreground">ECS Card Type</Label>
              <Select
                value={editFormData.ecsCardType}
                onValueChange={(value) =>
                  setEditFormData({ ...editFormData, ecsCardType: value })
                }
              >
                <SelectTrigger className="bg-white/5 border-white/20">
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
              <Label className="text-foreground">ECS Card Expiry Date</Label>
              <Input
                type="date"
                value={editFormData.ecsCardExpiry}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, ecsCardExpiry: e.target.value })
                }
                className="bg-white/5 border-white/20"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label className="text-foreground">
                Professional Bio
                <span className="text-muted-foreground ml-2">(optional)</span>
              </Label>
              <Textarea
                value={editFormData.bio}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, bio: e.target.value })
                }
                placeholder="Brief description of your experience and specializations..."
                className="bg-white/5 border-white/20 min-h-[80px]"
              />
            </div>

            <div className="flex gap-3 pt-4">
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
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Elec-ID Card */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-dark border-white/10 overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Left: Photo Section */}
            <div className="relative p-6 flex items-center justify-center bg-white/5 md:w-48">
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

      {/* Verification Tier & Talent Pool Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Verification Tier Card */}
        <Card className={`${VERIFICATION_TIERS[verificationTier].bgColor} ${VERIFICATION_TIERS[verificationTier].borderColor} border`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              {React.createElement(VERIFICATION_TIERS[verificationTier].icon, {
                className: `h-8 w-8 ${VERIFICATION_TIERS[verificationTier].color}`,
              })}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className={`font-semibold ${VERIFICATION_TIERS[verificationTier].color}`}>
                    {VERIFICATION_TIERS[verificationTier].label} Tier
                  </h4>
                  {verificationTier === "premium" && (
                    <Badge className="bg-elec-yellow text-elec-dark text-[10px] px-1.5">TOP</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {VERIFICATION_TIERS[verificationTier].description}
                </p>
              </div>
              {verificationTier !== "premium" && (
                <Button
                  variant="outline"
                  size="sm"
                  className={`${VERIFICATION_TIERS[verificationTier].borderColor} text-xs`}
                  onClick={() => onNavigate?.("qualifications")}
                >
                  <Award className="h-3 w-3 mr-1" />
                  Upgrade Tier
                </Button>
              )}
            </div>
            {/* Tier progress */}
            {verificationTier !== "premium" && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Progress to next tier</span>
                  <span className={VERIFICATION_TIERS[verificationTier].color}>
                    {verificationTier === "basic" ? "1/2 documents" : "3/4 documents"}
                  </span>
                </div>
                <Progress
                  value={verificationTier === "basic" ? 50 : 75}
                  className="h-1.5"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Talent Pool Settings Card */}
        <Card className={`border ${availableForHire && !isOptedOut ? "bg-green-500/10 border-green-500/30" : "bg-white/5 border-white/10"}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${availableForHire && !isOptedOut ? "bg-green-500/20" : "bg-white/10"}`}>
                <Users className={`h-5 w-5 ${availableForHire && !isOptedOut ? "text-green-400" : "text-muted-foreground"}`} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">Talent Pool</h4>
                <p className="text-sm text-muted-foreground">
                  {isOptedOut
                    ? "Elec-ID disabled"
                    : availableForHire
                    ? "Visible to employers"
                    : "Hidden from employers"}
                </p>
              </div>
              <Switch
                checked={availableForHire && !isOptedOut}
                onCheckedChange={handleAvailabilityChange}
                disabled={isOptedOut || isSaving}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
            {availableForHire && !isOptedOut && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <Label className="text-xs text-muted-foreground mb-2 block">Profile Visibility</Label>
                <Select
                  value={profileVisibility}
                  onValueChange={handleVisibilityChange}
                  disabled={isSaving}
                >
                  <SelectTrigger className="h-8 text-xs bg-white/5 border-white/20">
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

      {/* Profile Completeness */}
      <Card className="bg-elec-gray/50 border-white/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-foreground">Profile Completeness</h4>
            <span className="text-2xl font-bold text-elec-yellow">{completeness.percentage}%</span>
          </div>
          <Progress value={completeness.percentage} className="h-3 mb-4" />
          {completeness.missingItems.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">To improve your profile:</p>
              <ul className="space-y-1">
                {completeness.missingItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-foreground/80">
                    <AlertTriangle className="h-3 w-3 text-orange-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Grid - Clickable */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card
          className="bg-elec-gray/50 border-white/10 cursor-pointer hover:border-elec-yellow/50 transition-colors"
          onClick={() => handleStatClick("qualifications")}
        >
          <CardContent className="p-4 text-center">
            <GraduationCap className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{profileStats.qualificationsCount}</p>
            <p className="text-sm text-muted-foreground">Qualifications</p>
            <ChevronRight className="h-4 w-4 text-muted-foreground mx-auto mt-2" />
          </CardContent>
        </Card>
        <Card
          className="bg-elec-gray/50 border-white/10 cursor-pointer hover:border-elec-yellow/50 transition-colors"
          onClick={() => handleStatClick("experience")}
        >
          <CardContent className="p-4 text-center">
            <Briefcase className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{profileStats.experienceCount}</p>
            <p className="text-sm text-muted-foreground">Work History</p>
            <ChevronRight className="h-4 w-4 text-muted-foreground mx-auto mt-2" />
          </CardContent>
        </Card>
        <Card
          className="bg-elec-gray/50 border-white/10 cursor-pointer hover:border-elec-yellow/50 transition-colors"
          onClick={() => handleStatClick("skills")}
        >
          <CardContent className="p-4 text-center">
            <Wrench className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{profileStats.skillsCount}</p>
            <p className="text-sm text-muted-foreground">Skills</p>
            <ChevronRight className="h-4 w-4 text-muted-foreground mx-auto mt-2" />
          </CardContent>
        </Card>
        <Card
          className="bg-elec-gray/50 border-white/10 cursor-pointer hover:border-orange-500/50 transition-colors"
          onClick={() => handleStatClick("compliance")}
        >
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 text-orange-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{profileStats.expiringItems}</p>
            <p className="text-sm text-muted-foreground">Expiring Soon</p>
            <ChevronRight className="h-4 w-4 text-muted-foreground mx-auto mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Training Requests from Employers */}
      <TrainingRequestsCard />
    </div>
  );
};

export default ElecIdOverview;
