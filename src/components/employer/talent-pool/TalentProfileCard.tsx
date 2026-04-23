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
} from 'lucide-react';
import type { VerificationTier } from '@/components/employer/SparkProfileSheet';

export interface TalentProfileCardProps {
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
  isSaved: boolean;
  isInLabourBank: boolean;
  labourBankRate?: number;
  onClick: () => void;
  onSave: () => void;
  onMessage: () => void;
  onBook: () => void;
}

// Elec-ID verification tier configuration
const tierConfig: Record<
  VerificationTier,
  { label: string; color: string; bg: string; border: string }
> = {
  basic: {
    label: 'Basic',
    color: 'text-white',
    bg: 'bg-white/[0.06]',
    border: 'border-white/[0.08]',
  },
  verified: {
    label: 'Verified',
    color: 'text-blue-500',
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    border: 'border-blue-500/30',
  },
  premium: {
    label: 'Premium',
    color: 'text-elec-yellow',
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    border: 'border-elec-yellow/30',
  },
};

export function TalentProfileCard({
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
  isSaved,
  isInLabourBank,
  labourBankRate,
  onClick,
  onSave,
  onMessage,
  onBook,
}: TalentProfileCardProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('');
  const tier = tierConfig[verificationTier];
  const isAvailableNow = availability === 'Immediate';

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
        bg-[hsl(0_0%_12%)]
        border border-white/[0.06]
        rounded-2xl overflow-hidden transition-colors
        hover:bg-[hsl(0_0%_14%)]
        active:scale-[0.99] touch-manipulation cursor-pointer
        ${isInLabourBank ? 'border-l-[3px] border-l-green-400' : ''}
      `}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Avatar with tier badge and availability indicator */}
          <div className="relative shrink-0">
            <Avatar className="w-12 h-12 ring-2 ring-white/[0.08]">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>

            {/* Elec-ID Verification Badge */}
            {verificationTier !== 'basic' && (
              <div
                className={`absolute -bottom-0.5 -right-0.5 ${tier.bg} p-0.5 rounded-full ring-2 ring-[hsl(0_0%_12%)]`}
              >
                {verificationTier === 'premium' ? (
                  <Award className={`h-3 w-3 ${tier.color}`} />
                ) : (
                  <Shield className={`h-3 w-3 ${tier.color}`} />
                )}
              </div>
            )}

            {/* Available now indicator */}
            {isAvailableNow && (
              <div className="absolute -top-0.5 -left-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[hsl(0_0%_12%)] animate-pulse" />
            )}
          </div>

          {/* Core Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white truncate">{name}</h3>
              {isInLabourBank && <Zap className="h-3.5 w-3.5 text-green-400 shrink-0" />}
            </div>

            <div className="flex items-center gap-2 text-sm text-white mt-0.5">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-elec-yellow fill-elec-yellow" />
                <span className="font-medium text-white">{rating.toFixed(1)}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{distance}mi</span>
              </div>
            </div>

            {/* Tier Badge + Verified Docs */}
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <Badge
                variant="outline"
                className={`text-xs px-1.5 py-0 ${tier.bg} ${tier.color} border-0`}
              >
                {tier.label}
              </Badge>
              {verifiedDocsCount > 0 && (
                <span className="text-xs text-white flex items-center gap-1">
                  <FileCheck className="h-3 w-3" />
                  {verifiedDocsCount} verified
                </span>
              )}
              {isAvailableNow && (
                <span className="text-xs text-green-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Available now
                </span>
              )}
            </div>
          </div>

          {/* Rate */}
          <div className="text-right shrink-0">
            {labourBankRate ? (
              <p className="font-bold text-green-400 text-lg">£{labourBankRate}</p>
            ) : (
              <p className="font-bold text-white text-lg">£{dayRate}</p>
            )}
            <p className="text-xs text-white">/day</p>
          </div>
        </div>

        {/* Specialisms (show first 3) */}
        {specialisms.length > 0 && (
          <div className="flex gap-1.5 mt-3 flex-wrap">
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
                +{specialisms.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-2 mt-3 pt-3 border-t border-white/[0.06]">
          <button
            type="button"
            className={`flex-1 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] text-[12px] font-medium hover:bg-white/[0.08] transition-colors touch-manipulation inline-flex items-center justify-center ${isSaved ? 'text-elec-yellow' : 'text-white'}`}
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
            className="flex-1 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] text-[12px] font-medium text-white hover:bg-white/[0.08] transition-colors touch-manipulation inline-flex items-center justify-center"
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
              className="flex-1 h-9 rounded-full bg-green-500 hover:bg-green-500/90 text-white text-[12px] font-semibold touch-manipulation inline-flex items-center justify-center"
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
              className="flex-1 h-9 rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-black text-[12px] font-semibold touch-manipulation inline-flex items-center justify-center"
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
