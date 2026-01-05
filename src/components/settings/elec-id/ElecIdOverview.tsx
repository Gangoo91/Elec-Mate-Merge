import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getExpiryStatus, calculateProfileCompleteness } from "@/utils/elecIdGenerator";
import { getECSCardType, UK_JOB_TITLES, ECS_CARD_TYPES } from "@/data/uk-electrician-constants";

interface ElecIdOverviewProps {
  onNavigate?: (tabId: string) => void;
}

const ElecIdOverview = ({ onNavigate }: ElecIdOverviewProps) => {
  const { profile } = useAuth();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Mock data - will be replaced with real Elec-ID data from hooks
  const [elecIdData, setElecIdData] = useState({
    elecIdNumber: "EM-ABC123",
    jobTitle: "approved",
    jobTitleLabel: "Approved Electrician",
    ecsCardType: "gold",
    ecsCardExpiry: "2026-12-15",
    isVerified: true,
    photoUrl: null as string | null,
    bio: "",
  });

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
    </div>
  );
};

export default ElecIdOverview;
