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

  // Get top 3 credentials to show
  const topCredentials = qualifications.slice(0, 3);

  return (
    <Card
      className={`
        group relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-white/[0.03] to-transparent
        border-2 backdrop-blur-sm
        transition-all duration-500
        hover:scale-[1.01] hover:shadow-2xl
        active:scale-[0.99]
        ${tier.border}
        ${isInLabourBank
          ? 'ring-2 ring-success/40 shadow-lg shadow-success/10 hover:shadow-success/20'
          : 'hover:shadow-elec-yellow/10'
        }
      `}
      onClick={onClick}
    >
      {/* Tier Gradient Header */}
      <div className={`
        relative h-20 sm:h-24 bg-gradient-to-br ${tier.gradient}
        overflow-hidden
      `}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />

        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />

        {/* Header Content */}
        <div className="relative z-10 h-full p-4 flex items-center gap-4">
          {/* Avatar with badges */}
          <div className="relative shrink-0">
            <Avatar className="w-14 h-14 sm:w-16 sm:h-16 ring-3 ring-background shadow-lg">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback className={`${tier.iconBg} ${tier.color} font-bold text-lg`}>
                {initials}
              </AvatarFallback>
            </Avatar>

            {/* Tier Badge */}
            {verificationTier !== 'basic' && (
              <div className={`absolute -bottom-1 -right-1 ${tier.bg} p-1 rounded-full ring-2 ring-background shadow-md`}>
                {verificationTier === 'premium' ? (
                  <Award className={`h-3.5 w-3.5 ${tier.color}`} />
                ) : (
                  <Shield className={`h-3.5 w-3.5 ${tier.color}`} />
                )}
              </div>
            )}

            {/* Available Now Pulse */}
            {isAvailableNow && (
              <div className="absolute -top-1 -left-1 w-4 h-4 bg-success rounded-full border-2 border-background animate-pulse shadow-lg shadow-success/50" />
            )}
          </div>

          {/* Core Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-foreground text-lg truncate">{name}</h3>
              {isInLabourBank && (
                <div className="shrink-0 p-1 bg-success/20 rounded-full">
                  <Zap className="h-3.5 w-3.5 text-success" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground/80">{ecsCardType}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{distance}mi</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-1.5">
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 text-warning fill-warning" />
                <span className="font-semibold text-foreground text-sm">{rating.toFixed(1)}</span>
                {completedJobs > 0 && (
                  <span className="text-xs text-muted-foreground">({completedJobs})</span>
                )}
              </div>

              {isAvailableNow && (
                <span className="text-xs text-success font-medium flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Available now
                </span>
              )}
            </div>
          </div>

          {/* Rate Display */}
          <div className="text-right shrink-0">
            {labourBankRate ? (
              <>
                <p className="font-bold text-success text-xl">£{labourBankRate}</p>
                <p className="text-[10px] text-success/70 uppercase tracking-wide">Labour Bank</p>
              </>
            ) : (
              <>
                <p className="font-bold text-foreground text-xl">£{dayRate}</p>
                <p className="text-xs text-muted-foreground">/day</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <CardContent className="p-4 space-y-3">
        {/* Elec-ID + Verified Docs Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`text-xs px-2 py-0.5 ${tier.bg} ${tier.color} border-0`}>
              {tier.label}
            </Badge>
            {elecIdNumber && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <IdCard className="h-3 w-3" />
                {elecIdNumber}
              </span>
            )}
          </div>
          {verifiedDocsCount > 0 && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <FileCheck className="h-3 w-3 text-success" />
              {verifiedDocsCount} verified docs
            </span>
          )}
        </div>

        {/* Specialisms */}
        {specialisms.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {specialisms.slice(0, 4).map((spec) => (
              <Badge
                key={spec}
                variant="secondary"
                className="text-xs bg-white/5 border border-white/10 hover:bg-white/10"
              >
                {spec}
              </Badge>
            ))}
            {specialisms.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{specialisms.length - 4}
              </Badge>
            )}
          </div>
        )}

        {/* Credentials Row */}
        {topCredentials.length > 0 && (
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs text-muted-foreground shrink-0">Credentials:</span>
            <div className="flex gap-2 flex-wrap">
              {topCredentials.map((qual) => (
                <span key={qual} className="text-xs text-foreground/80 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-success" />
                  {qual.length > 20 ? qual.substring(0, 18) + '...' : qual}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 border-t border-border/50">
          <Button
            variant="ghost"
            size="sm"
            className={`flex-1 h-10 ${isSaved ? 'text-elec-yellow' : ''}`}
            onClick={(e) => { e.stopPropagation(); onSave(); }}
          >
            <Heart className={`h-4 w-4 mr-1.5 ${isSaved ? 'fill-elec-yellow' : ''}`} />
            {isSaved ? 'Saved' : 'Save'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 h-10"
            onClick={(e) => { e.stopPropagation(); onMessage(); }}
          >
            <MessageSquare className="h-4 w-4 mr-1.5" />
            Message
          </Button>
          {isInLabourBank ? (
            <Button
              size="sm"
              className="flex-1 h-10 bg-success hover:bg-success/90 text-success-foreground font-medium"
              onClick={(e) => { e.stopPropagation(); onBook(); }}
            >
              <Calendar className="h-4 w-4 mr-1.5" />
              Book
            </Button>
          ) : (
            <Button
              size="sm"
              className="flex-1 h-10 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-yellow-foreground font-medium"
              onClick={(e) => { e.stopPropagation(); onBook(); }}
            >
              <Briefcase className="h-4 w-4 mr-1.5" />
              Hire
            </Button>
          )}
        </div>
      </CardContent>

      {/* Labour Bank Special Indicator */}
      {isInLabourBank && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-success via-success to-success/50" />
      )}

      {/* Bottom Glow on Hover */}
      <div className={`
        absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px
        bg-gradient-to-r from-transparent via-current to-transparent
        ${tier.color} opacity-0 group-hover:opacity-50 transition-opacity duration-500
      `} />
    </Card>
  );
}

export default PremiumTalentCard;
