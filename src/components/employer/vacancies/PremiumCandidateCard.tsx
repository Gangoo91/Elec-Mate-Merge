import { motion } from 'framer-motion';
import {
  Briefcase,
  MapPin,
  Clock,
  Shield,
  Award,
  CheckCircle,
  XCircle,
  Calendar,
  Star,
  MessageSquare,
  ChevronRight,
  Check,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
} from '@/components/employer/editorial';

type ApplicationStatus =
  | 'New'
  | 'Reviewing'
  | 'Shortlisted'
  | 'Interviewed'
  | 'Offered'
  | 'Hired'
  | 'Rejected';

interface PremiumCandidateCardProps {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  status: ApplicationStatus;
  appliedAt: string;
  vacancyTitle: string;
  experience?: string;
  location?: string;
  elecIdTier?: 'basic' | 'verified' | 'premium';
  ecsCardType?: string;
  rating?: number;
  // Selection mode props
  selectionMode?: boolean;
  isSelected?: boolean;
  onSelectionChange?: (selected: boolean) => void;
  // Action handlers
  onShortlist?: () => void;
  onReject?: () => void;
  onInterview?: () => void;
  onOffer?: () => void;
  onHire?: () => void;
  onMessage?: () => void;
  onClick?: () => void;
}

const statusConfig: Record<
  ApplicationStatus,
  { bg: string; text: string; border: string; label: string }
> = {
  New: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/25',
    label: 'New',
  },
  Reviewing: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/25',
    label: 'Reviewing',
  },
  Shortlisted: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/25',
    label: 'Shortlisted',
  },
  Interviewed: {
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    border: 'border-cyan-500/25',
    label: 'Interviewed',
  },
  Offered: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/25',
    label: 'Offered',
  },
  Hired: {
    bg: 'bg-green-500/10',
    text: 'text-green-400',
    border: 'border-green-500/25',
    label: 'Hired',
  },
  Rejected: {
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    border: 'border-red-500/25',
    label: 'Rejected',
  },
};

const tierConfig = {
  basic: {
    bg: 'bg-white/[0.06]',
    text: 'text-white',
    border: 'border-white/[0.08]',
    icon: Shield,
  },
  verified: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/25',
    icon: Shield,
  },
  premium: {
    bg: 'bg-elec-yellow/10',
    text: 'text-elec-yellow',
    border: 'border-elec-yellow/25',
    icon: Award,
  },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            'h-3 w-3',
            star <= rating ? 'text-elec-yellow fill-elec-yellow' : 'text-white'
          )}
        />
      ))}
    </div>
  );
}

export function PremiumCandidateCard({
  id,
  name,
  email,
  phone,
  avatarUrl,
  status,
  appliedAt,
  vacancyTitle,
  experience,
  location,
  elecIdTier,
  ecsCardType,
  rating,
  selectionMode = false,
  isSelected = false,
  onSelectionChange,
  onShortlist,
  onReject,
  onInterview,
  onOffer,
  onHire,
  onMessage,
  onClick,
}: PremiumCandidateCardProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const config = statusConfig[status];
  const tier = elecIdTier ? tierConfig[elecIdTier] : null;
  const TierIcon = tier?.icon || Shield;

  const getTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}mo ago`;
  };

  // Determine which action buttons to show based on status
  const renderActions = () => {
    switch (status) {
      case 'New':
        return (
          <>
            <DestructiveButton
              fullWidth
              onClick={(e) => {
                e.stopPropagation();
                onReject?.();
              }}
            >
              <XCircle className="h-3.5 w-3.5 mr-1.5" />
              Reject
            </DestructiveButton>
            <PrimaryButton
              fullWidth
              onClick={(e) => {
                e.stopPropagation();
                onShortlist?.();
              }}
            >
              <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
              Shortlist
            </PrimaryButton>
          </>
        );
      case 'Shortlisted':
        return (
          <>
            <SecondaryButton
              onClick={(e) => {
                e.stopPropagation();
                onMessage?.();
              }}
            >
              <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
              Message
            </SecondaryButton>
            <PrimaryButton
              fullWidth
              onClick={(e) => {
                e.stopPropagation();
                onInterview?.();
              }}
            >
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              Mark Interviewed
            </PrimaryButton>
          </>
        );
      case 'Interviewed':
        return (
          <>
            <DestructiveButton
              onClick={(e) => {
                e.stopPropagation();
                onReject?.();
              }}
            >
              <XCircle className="h-3.5 w-3.5 mr-1.5" />
              Reject
            </DestructiveButton>
            <PrimaryButton
              fullWidth
              onClick={(e) => {
                e.stopPropagation();
                onOffer?.();
              }}
            >
              <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
              Make Offer
            </PrimaryButton>
          </>
        );
      case 'Offered':
        return (
          <PrimaryButton
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              onHire?.();
            }}
          >
            <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
            Mark as Hired
          </PrimaryButton>
        );
      case 'Hired':
      case 'Rejected':
        return (
          <SecondaryButton
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            View Details
            <ChevronRight className="h-3.5 w-3.5 ml-1.5" />
          </SecondaryButton>
        );
      default:
        return null;
    }
  };

  const handleCardClick = () => {
    if (selectionMode && onSelectionChange) {
      onSelectionChange(!isSelected);
    } else {
      onClick?.();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-[hsl(0_0%_12%)]',
        'border border-white/[0.06]',
        'hover:bg-[hsl(0_0%_15%)]',
        'transition-colors duration-200',
        'group cursor-pointer',
        isSelected && 'border-elec-yellow/50 bg-elec-yellow/5'
      )}
      onClick={handleCardClick}
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Selection checkbox */}
          {selectionMode && (
            <div
              className="shrink-0 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                onSelectionChange?.(!isSelected);
              }}
            >
              <div
                className={cn(
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                  isSelected
                    ? 'bg-elec-yellow border-elec-yellow'
                    : 'border-white/[0.15] hover:border-white/[0.3]'
                )}
              >
                {isSelected && <Check className="h-4 w-4 text-black" />}
              </div>
            </div>
          )}

          {/* Avatar */}
          <Avatar className="w-14 h-14 shrink-0 border-2 border-white/[0.08]">
            {avatarUrl ? <AvatarImage src={avatarUrl} alt={name} /> : null}
            <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow font-semibold text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* Main info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white text-lg leading-tight truncate">
                    {name}
                  </h3>
                  {rating && <StarRating rating={rating} />}
                </div>

                {/* Badges row */}
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  {tier && (
                    <Badge
                      variant="outline"
                      className={cn('text-[11px]', tier.bg, tier.text, tier.border)}
                    >
                      <TierIcon className="h-3 w-3 mr-1" />
                      {elecIdTier === 'premium'
                        ? 'Premium'
                        : elecIdTier === 'verified'
                          ? 'Verified'
                          : 'Basic'}
                    </Badge>
                  )}
                  {ecsCardType && (
                    <Badge
                      variant="outline"
                      className="text-[11px] bg-elec-yellow/10 text-elec-yellow border-elec-yellow/25"
                    >
                      <Award className="h-3 w-3 mr-1" />
                      {ecsCardType}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Status badge */}
              <Badge
                variant="outline"
                className={cn(
                  'text-[11px] font-medium shrink-0',
                  config.bg,
                  config.text,
                  config.border
                )}
              >
                {config.label}
              </Badge>
            </div>

            {/* Job applied for */}
            <div className="flex items-center gap-1.5 mt-3 text-[13px] text-white">
              <Briefcase className="h-3.5 w-3.5 text-elec-yellow/70" />
              <span className="truncate">Applied: {vacancyTitle}</span>
            </div>

            {/* Meta info */}
            <div className="flex items-center gap-4 mt-2 text-[11px] text-white">
              {experience && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {experience}
                </span>
              )}
              {location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {location}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {getTimeAgo(appliedAt)}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 mt-4">{renderActions()}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
