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
} from "lucide-react";
import type { VerificationTier } from "@/components/employer/SparkProfileSheet";

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
const tierConfig: Record<VerificationTier, { label: string; color: string; bg: string; border: string }> = {
  basic: {
    label: 'Basic',
    color: 'text-muted-foreground',
    bg: 'bg-muted',
    border: 'border-border/50'
  },
  verified: {
    label: 'Verified',
    color: 'text-blue-500',
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    border: 'border-blue-500/30'
  },
  premium: {
    label: 'Premium',
    color: 'text-elec-yellow',
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    border: 'border-elec-yellow/30'
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
  const initials = name.split(' ').map(n => n[0]).join('');
  const tier = tierConfig[verificationTier];
  const isAvailableNow = availability === 'Immediate';

  return (
    <Card
      className={`
        bg-gradient-to-br from-elec-gray/50 via-background to-elec-yellow/5
        border-2 ${tier.border}
        overflow-hidden transition-all duration-200
        hover:shadow-lg hover:shadow-elec-yellow/5 hover:border-elec-yellow/30
        active:scale-[0.99]
        ${isInLabourBank ? 'border-l-4 border-l-success' : ''}
      `}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Avatar with tier badge and availability indicator */}
          <div className="relative shrink-0">
            <Avatar className="w-12 h-12 ring-2 ring-border">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>

            {/* Elec-ID Verification Badge */}
            {verificationTier !== 'basic' && (
              <div className={`absolute -bottom-0.5 -right-0.5 ${tier.bg} p-0.5 rounded-full ring-2 ring-background`}>
                {verificationTier === 'premium' ? (
                  <Award className={`h-3 w-3 ${tier.color}`} />
                ) : (
                  <Shield className={`h-3 w-3 ${tier.color}`} />
                )}
              </div>
            )}

            {/* Available now indicator */}
            {isAvailableNow && (
              <div className="absolute -top-0.5 -left-0.5 w-3.5 h-3.5 bg-success rounded-full border-2 border-background animate-pulse" />
            )}
          </div>

          {/* Core Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground truncate">{name}</h3>
              {isInLabourBank && (
                <Zap className="h-3.5 w-3.5 text-success shrink-0" />
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-warning fill-warning" />
                <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{distance}mi</span>
              </div>
            </div>

            {/* Tier Badge + Verified Docs */}
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <Badge variant="outline" className={`text-xs px-1.5 py-0 ${tier.bg} ${tier.color} border-0`}>
                {tier.label}
              </Badge>
              {verifiedDocsCount > 0 && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <FileCheck className="h-3 w-3" />
                  {verifiedDocsCount} verified
                </span>
              )}
              {isAvailableNow && (
                <span className="text-xs text-success flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Available now
                </span>
              )}
            </div>
          </div>

          {/* Rate */}
          <div className="text-right shrink-0">
            {labourBankRate ? (
              <p className="font-bold text-success text-lg">£{labourBankRate}</p>
            ) : (
              <p className="font-bold text-foreground text-lg">£{dayRate}</p>
            )}
            <p className="text-xs text-muted-foreground">/day</p>
          </div>
        </div>

        {/* Specialisms (show first 3) */}
        {specialisms.length > 0 && (
          <div className="flex gap-1.5 mt-3 flex-wrap">
            {specialisms.slice(0, 3).map((spec) => (
              <Badge key={spec} variant="secondary" className="text-xs">
                {spec}
              </Badge>
            ))}
            {specialisms.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{specialisms.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-2 mt-3 pt-3 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 h-9"
            onClick={(e) => { e.stopPropagation(); onSave(); }}
          >
            <Heart className={`h-4 w-4 mr-1.5 ${isSaved ? 'fill-primary text-elec-yellow' : ''}`} />
            {isSaved ? 'Saved' : 'Save'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 h-9"
            onClick={(e) => { e.stopPropagation(); onMessage(); }}
          >
            <MessageSquare className="h-4 w-4 mr-1.5" />
            Message
          </Button>
          {isInLabourBank ? (
            <Button
              size="sm"
              className="flex-1 h-9 bg-success hover:bg-success/90"
              onClick={(e) => { e.stopPropagation(); onBook(); }}
            >
              <Calendar className="h-4 w-4 mr-1.5" />
              Book
            </Button>
          ) : (
            <Button
              size="sm"
              className="flex-1 h-9"
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
