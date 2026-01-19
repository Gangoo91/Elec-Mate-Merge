import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Star,
  MapPin,
  Heart,
  MessageSquare,
  Award,
  Zap,
  Calendar,
  Briefcase,
  Shield,
  Clock,
  FileCheck,
  CheckCircle2,
  IdCard,
  Check,
} from "lucide-react";
import type { VerificationTier } from "@/components/employer/SparkProfileSheet";

export interface PremiumTalentCardProps {
  id: string;
  elecIdProfileId: string;
  name: string;
  avatar?: string;
  verificationTier: VerificationTier;
  ecsCardType: string;
  rating: number;
  distance: number;
  location: string;
  dayRate: number;
  availability: 'Immediate' | '1 week notice' | 'Limited';
  verifiedDocsCount: number;
  specialisms: string[];
  qualifications?: string[];
  skills?: string[];
  currentRole?: string;
  totalYearsExperience?: number;
  completedJobs?: number;
  elecIdNumber?: string;
  isSaved: boolean;
  isInLabourBank: boolean;
  labourBankRate?: number;
  onClick: () => void;
  onSave: () => void;
  onMessage: () => void;
  onBook: () => void;
}

// ECS Card type configuration with industry colours
const ecsCardConfig: Record<string, { label: string; color: string; bg: string }> = {
  gold: { label: 'Gold Card', color: 'text-amber-400', bg: 'bg-amber-500/20' },
  blue: { label: 'Blue Card', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  green: { label: 'Green Card', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  white: { label: 'White Card', color: 'text-slate-300', bg: 'bg-slate-500/20' },
  apprentice: { label: 'Apprentice', color: 'text-purple-400', bg: 'bg-purple-500/20' },
};

// Elec-ID verification tier configuration with premium gradients
const tierConfig: Record<VerificationTier, {
  label: string;
  color: string;
  bg: string;
  border: string;
  gradient: string;
  iconBg: string;
}> = {
  basic: {
    label: 'Basic',
    color: 'text-slate-400',
    bg: 'bg-slate-500/20',
    border: 'border-slate-500/30',
    gradient: 'from-slate-500/20 via-slate-600/15 to-slate-700/10',
    iconBg: 'bg-slate-500/20',
  },
  verified: {
    label: 'Verified',
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/40',
    gradient: 'from-blue-500/25 via-blue-600/15 to-blue-700/10',
    iconBg: 'bg-blue-500/20',
  },
  premium: {
    label: 'Premium',
    color: 'text-amber-400',
    bg: 'bg-amber-500/20',
    border: 'border-amber-500/40',
    gradient: 'from-amber-500/30 via-yellow-500/20 to-amber-600/10',
    iconBg: 'bg-amber-500/20',
  },
};

export function PremiumTalentCard({
  id,
  elecIdProfileId,
  name,
  avatar,
  verificationTier,
  ecsCardType,
  rating,
  distance,
  location,
  dayRate,
  availability,
  verifiedDocsCount,
  specialisms,
  qualifications = [],
  skills = [],
  currentRole,
  totalYearsExperience,
  completedJobs = 0,
  elecIdNumber,
  isSaved,
  isInLabourBank,
  labourBankRate,
  onClick,
  onSave,
  onMessage,
  onBook,
}: PremiumTalentCardProps) {
  const initials = name.split(' ').map(n => n[0]).join('');
  const tier = tierConfig[verificationTier];
  const isAvailableNow = availability === 'Immediate';
  const ecsCard = ecsCardConfig[ecsCardType.toLowerCase()] || ecsCardConfig.gold;

  // Get top items to show
  const topCredentials = qualifications.slice(0, 3);
  const topSkills = skills.slice(0, 3);

  return (
    <Card
      className={`
        group relative overflow-hidden rounded-xl
        bg-card/80 backdrop-blur-sm
        border transition-all duration-300
        hover:shadow-lg active:scale-[0.99]
        touch-manipulation
        ${tier.border}
        ${isInLabourBank
          ? 'ring-2 ring-success/40 shadow-success/10'
          : 'hover:border-elec-yellow/30'
        }
      `}
      onClick={onClick}
    >
      {/* Labour Bank Indicator */}
      {isInLabourBank && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-success via-success to-success/50" />
      )}

      {/* Compact Status Bar */}
      <div className={`px-4 py-2 flex items-center justify-between border-b border-border/50 bg-gradient-to-r ${tier.gradient}`}>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className={`text-xs px-2 py-0.5 ${tier.bg} ${tier.color} border-0`}>
            {verificationTier === 'premium' && <Award className="h-3 w-3 mr-1" />}
            {verificationTier === 'verified' && <Shield className="h-3 w-3 mr-1" />}
            {tier.label}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-foreground/70">
            <Star className="h-3.5 w-3.5 text-warning fill-warning" />
            <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
            {completedJobs > 0 && <span className="text-xs">({completedJobs})</span>}
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-foreground/70">
          <MapPin className="h-3.5 w-3.5" />
          <span>{distance}mi away</span>
        </div>
      </div>

      {/* Main Content */}
      <CardContent className="p-4 space-y-3">
        {/* Worker Info Row */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative shrink-0">
            <Avatar className="w-12 h-12 ring-2 ring-border">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback className={`${tier.iconBg} ${tier.color} font-bold`}>
                {initials}
              </AvatarFallback>
            </Avatar>
            {isAvailableNow && (
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-success rounded-full border-2 border-background flex items-center justify-center">
                <Check className="h-2.5 w-2.5 text-success-foreground" />
              </div>
            )}
          </div>

          {/* Name & Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground truncate">{name}</h3>
              {isInLabourBank && (
                <div className="shrink-0 p-1 bg-success/20 rounded-full">
                  <Zap className="h-3 w-3 text-success" />
                </div>
              )}
            </div>
            {currentRole && (
              <p className="text-sm text-foreground/80 truncate">{currentRole}</p>
            )}
            <div className="flex items-center gap-2 text-xs text-foreground/70 mt-0.5">
              {totalYearsExperience !== undefined && totalYearsExperience > 0 && (
                <>
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {totalYearsExperience} yrs exp
                  </span>
                  <span>•</span>
                </>
              )}
              {labourBankRate ? (
                <span className="font-semibold text-success">£{labourBankRate}/day</span>
              ) : (
                <span className="font-semibold text-foreground">£{dayRate}/day</span>
              )}
            </div>
          </div>

          {/* Availability Badge */}
          {isAvailableNow && (
            <Badge className="shrink-0 bg-success/10 text-success border-success/30 text-xs">
              <Clock className="h-3 w-3 mr-1" />
              Available
            </Badge>
          )}
        </div>

        {/* Skills Row */}
        {topSkills.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {topSkills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="text-xs bg-primary/10 text-primary border border-primary/20"
              >
                {skill}
              </Badge>
            ))}
            {skills.length > 3 && (
              <Badge variant="outline" className="text-xs text-foreground/70">
                +{skills.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Specialisms - Collapsed */}
        {specialisms.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {specialisms.slice(0, 3).map((spec) => (
              <Badge
                key={spec}
                variant="secondary"
                className="text-xs bg-white/5 border border-white/10"
              >
                {spec}
              </Badge>
            ))}
            {specialisms.length > 3 && (
              <Badge variant="outline" className="text-xs text-foreground/70">
                +{specialisms.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* ECS Card & Credentials Row */}
        <div className="flex items-center justify-between text-xs text-foreground/70 pt-1 border-t border-border/30">
          <div className="flex items-center gap-2">
            {/* ECS Card Badge */}
            <Badge variant="secondary" className={`text-xs px-2 py-0.5 ${ecsCard.bg} ${ecsCard.color} border-0`}>
              <IdCard className="h-3 w-3 mr-1" />
              {ecsCard.label}
            </Badge>
            {topCredentials.length > 0 && (
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-success" />
                {topCredentials.length} quals
              </span>
            )}
            {verifiedDocsCount > 0 && (
              <span className="flex items-center gap-1">
                <FileCheck className="h-3 w-3 text-success" />
                {verifiedDocsCount} docs
              </span>
            )}
          </div>
          {elecIdNumber && (
            <span className="flex items-center gap-1 font-mono text-xs">
              {elecIdNumber}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="ghost"
            size="sm"
            className={`flex-1 h-11 touch-manipulation ${isSaved ? 'text-elec-yellow' : ''}`}
            onClick={(e) => { e.stopPropagation(); onSave(); }}
          >
            <Heart className={`h-4 w-4 mr-1.5 ${isSaved ? 'fill-elec-yellow' : ''}`} />
            {isSaved ? 'Saved' : 'Save'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 h-11 touch-manipulation"
            onClick={(e) => { e.stopPropagation(); onMessage(); }}
          >
            <MessageSquare className="h-4 w-4 mr-1.5" />
            Message
          </Button>
          {isInLabourBank ? (
            <Button
              size="sm"
              className="flex-1 h-11 bg-success hover:bg-success/90 text-success-foreground font-medium touch-manipulation"
              onClick={(e) => { e.stopPropagation(); onBook(); }}
            >
              <Calendar className="h-4 w-4 mr-1.5" />
              Book
            </Button>
          ) : (
            <Button
              size="sm"
              className="flex-1 h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-yellow-foreground font-medium touch-manipulation"
              onClick={(e) => { e.stopPropagation(); onBook(); }}
            >
              <Briefcase className="h-4 w-4 mr-1.5" />
              Hire
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default PremiumTalentCard;
