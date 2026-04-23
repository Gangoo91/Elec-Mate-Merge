import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
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
} from 'lucide-react';
import type { VerificationTier } from '@/components/employer/SparkProfileSheet';

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
const tierConfig: Record<
  VerificationTier,
  {
    label: string;
    color: string;
    bg: string;
    border: string;
    gradient: string;
    iconBg: string;
  }
> = {
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
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('');
  const tier = tierConfig[verificationTier];
  const isAvailableNow = availability === 'Immediate';
  const ecsCard = ecsCardConfig[ecsCardType.toLowerCase()] || ecsCardConfig.gold;

  // Get top items to show
  const topCredentials = qualifications.slice(0, 3);
  const topSkills = skills.slice(0, 3);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={`
        group relative overflow-hidden rounded-2xl
        bg-[hsl(0_0%_12%)]
        border border-white/[0.06] transition-colors
        hover:bg-[hsl(0_0%_14%)] active:scale-[0.99]
        touch-manipulation cursor-pointer
        ${
          isInLabourBank
            ? 'ring-2 ring-green-400/40'
            : ''
        }
      `}
    >
      {/* Labour Bank Indicator */}
      {isInLabourBank && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-green-400/70 via-emerald-400/70 to-green-400/30" />
      )}

      {/* Compact Status Bar */}
      <div
        className={`px-4 py-2 flex items-center justify-between border-b border-white/[0.06] bg-gradient-to-r ${tier.gradient}`}
      >
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={`text-xs px-2 py-0.5 ${tier.bg} ${tier.color} border-0`}
          >
            {verificationTier === 'premium' && <Award className="h-3 w-3 mr-1" />}
            {verificationTier === 'verified' && <Shield className="h-3 w-3 mr-1" />}
            {tier.label}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-white">
            <Star className="h-3.5 w-3.5 text-elec-yellow fill-elec-yellow" />
            <span className="font-medium text-white">{rating.toFixed(1)}</span>
            {completedJobs > 0 && <span className="text-xs text-white">({completedJobs})</span>}
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-white">
          <MapPin className="h-3.5 w-3.5" />
          <span>{distance}mi away</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-3">
        {/* Worker Info Row */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative shrink-0">
            <Avatar className="w-12 h-12 ring-2 ring-white/[0.08]">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback className={`${tier.iconBg} ${tier.color} font-bold`}>
                {initials}
              </AvatarFallback>
            </Avatar>
            {isAvailableNow && (
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-[hsl(0_0%_12%)] flex items-center justify-center">
                <Check className="h-2.5 w-2.5 text-white" />
              </div>
            )}
          </div>

          {/* Name & Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white truncate">{name}</h3>
              {isInLabourBank && (
                <div className="shrink-0 p-1 bg-green-500/20 rounded-full">
                  <Zap className="h-3 w-3 text-green-400" />
                </div>
              )}
            </div>
            {currentRole && <p className="text-sm text-white truncate">{currentRole}</p>}
            <div className="flex items-center gap-2 text-xs text-white mt-0.5">
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
                <span className="font-semibold text-green-400">£{labourBankRate}/day</span>
              ) : (
                <span className="font-semibold text-white">£{dayRate}/day</span>
              )}
            </div>
          </div>

          {/* Availability Badge */}
          {isAvailableNow && (
            <Badge className="shrink-0 bg-green-500/10 text-green-400 border-green-500/30 text-xs">
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
                className="text-xs bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/20"
              >
                {skill}
              </Badge>
            ))}
            {skills.length > 3 && (
              <Badge variant="outline" className="text-xs text-white border-white/[0.1]">
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
                className="text-xs bg-white/[0.04] text-white border border-white/[0.08]"
              >
                {spec}
              </Badge>
            ))}
            {specialisms.length > 3 && (
              <Badge variant="outline" className="text-xs text-white border-white/[0.1]">
                +{specialisms.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* ECS Card & Credentials Row */}
        <div className="flex items-center justify-between text-xs text-white pt-1 border-t border-white/[0.06]">
          <div className="flex items-center gap-2">
            {/* ECS Card Badge */}
            <Badge
              variant="secondary"
              className={`text-xs px-2 py-0.5 ${ecsCard.bg} ${ecsCard.color} border-0`}
            >
              <IdCard className="h-3 w-3 mr-1" />
              {ecsCard.label}
            </Badge>
            {topCredentials.length > 0 && (
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-green-400" />
                {topCredentials.length} quals
              </span>
            )}
            {verifiedDocsCount > 0 && (
              <span className="flex items-center gap-1">
                <FileCheck className="h-3 w-3 text-green-400" />
                {verifiedDocsCount} docs
              </span>
            )}
          </div>
          {elecIdNumber && (
            <span className="flex items-center gap-1 font-mono text-xs text-white">{elecIdNumber}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            type="button"
            className={`flex-1 h-11 rounded-full bg-white/[0.04] border border-white/[0.08] text-[12.5px] font-medium hover:bg-white/[0.08] transition-colors touch-manipulation inline-flex items-center justify-center ${isSaved ? 'text-elec-yellow' : 'text-white'}`}
            onClick={(e) => {
              e.stopPropagation();
              onSave();
            }}
          >
            <Heart className={`h-4 w-4 mr-1.5 ${isSaved ? 'fill-elec-yellow' : ''}`} />
            {isSaved ? 'Saved' : 'Save'}
          </button>
          <button
            type="button"
            className="flex-1 h-11 rounded-full bg-white/[0.04] border border-white/[0.08] text-[12.5px] font-medium text-white hover:bg-white/[0.08] transition-colors touch-manipulation inline-flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              onMessage();
            }}
          >
            <MessageSquare className="h-4 w-4 mr-1.5" />
            Message
          </button>
          {isInLabourBank ? (
            <button
              type="button"
              className="flex-1 h-11 rounded-full bg-green-500 hover:bg-green-500/90 text-white text-[12.5px] font-semibold touch-manipulation inline-flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                onBook();
              }}
            >
              <Calendar className="h-4 w-4 mr-1.5" />
              Book
            </button>
          ) : (
            <button
              type="button"
              className="flex-1 h-11 rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-black text-[12.5px] font-semibold touch-manipulation inline-flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                onBook();
              }}
            >
              <Briefcase className="h-4 w-4 mr-1.5" />
              Hire
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PremiumTalentCard;
