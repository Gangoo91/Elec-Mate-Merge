import { motion } from "framer-motion";
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
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ApplicationStatus =
  | "New"
  | "Reviewing"
  | "Shortlisted"
  | "Interviewed"
  | "Offered"
  | "Hired"
  | "Rejected";

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
  elecIdTier?: "basic" | "verified" | "premium";
  ecsCardType?: string;
  rating?: number;
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
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/30",
    label: "New",
  },
  Reviewing: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
    label: "Reviewing",
  },
  Shortlisted: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "border-purple-500/30",
    label: "Shortlisted",
  },
  Interviewed: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    border: "border-cyan-500/30",
    label: "Interviewed",
  },
  Offered: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    label: "Offered",
  },
  Hired: {
    bg: "bg-green-500/10",
    text: "text-green-400",
    border: "border-green-500/30",
    label: "Hired",
  },
  Rejected: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/30",
    label: "Rejected",
  },
};

const tierConfig = {
  basic: {
    bg: "bg-gray-500/10",
    text: "text-gray-400",
    border: "border-gray-500/30",
    icon: Shield,
  },
  verified: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/30",
    icon: Shield,
  },
  premium: {
    bg: "bg-elec-yellow/10",
    text: "text-elec-yellow",
    border: "border-elec-yellow/30",
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
            "h-3 w-3",
            star <= rating ? "text-elec-yellow fill-elec-yellow" : "text-white/20"
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
  onShortlist,
  onReject,
  onInterview,
  onOffer,
  onHire,
  onMessage,
  onClick,
}: PremiumCandidateCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
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

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}mo ago`;
  };

  // Determine which action buttons to show based on status
  const renderActions = () => {
    switch (status) {
      case "New":
        return (
          <>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-11 text-xs bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
              onClick={(e) => {
                e.stopPropagation();
                onReject?.();
              }}
            >
              <XCircle className="h-3.5 w-3.5 mr-1.5" />
              Reject
            </Button>
            <Button
              size="sm"
              className="flex-1 h-11 text-xs bg-purple-500 hover:bg-purple-500/90 text-white"
              onClick={(e) => {
                e.stopPropagation();
                onShortlist?.();
              }}
            >
              <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
              Shortlist
            </Button>
          </>
        );
      case "Shortlisted":
        return (
          <>
            <Button
              variant="outline"
              size="sm"
              className="h-11 text-xs bg-white/5 border-white/10 text-white/80"
              onClick={(e) => {
                e.stopPropagation();
                onMessage?.();
              }}
            >
              <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
              Message
            </Button>
            <Button
              size="sm"
              className="flex-1 h-11 text-xs bg-cyan-500 hover:bg-cyan-500/90 text-white"
              onClick={(e) => {
                e.stopPropagation();
                onInterview?.();
              }}
            >
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              Mark Interviewed
            </Button>
          </>
        );
      case "Interviewed":
        return (
          <>
            <Button
              variant="outline"
              size="sm"
              className="h-11 text-xs bg-red-500/10 border-red-500/20 text-red-400"
              onClick={(e) => {
                e.stopPropagation();
                onReject?.();
              }}
            >
              <XCircle className="h-3.5 w-3.5 mr-1.5" />
              Reject
            </Button>
            <Button
              size="sm"
              className="flex-1 h-11 text-xs bg-emerald-500 hover:bg-emerald-500/90 text-white"
              onClick={(e) => {
                e.stopPropagation();
                onOffer?.();
              }}
            >
              <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
              Make Offer
            </Button>
          </>
        );
      case "Offered":
        return (
          <Button
            size="sm"
            className="w-full h-11 text-xs bg-green-500 hover:bg-green-500/90 text-white"
            onClick={(e) => {
              e.stopPropagation();
              onHire?.();
            }}
          >
            <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
            Mark as Hired
          </Button>
        );
      case "Hired":
      case "Rejected":
        return (
          <Button
            variant="outline"
            size="sm"
            className="w-full h-11 text-xs bg-white/5 border-white/10 text-white/60"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            View Details
            <ChevronRight className="h-3.5 w-3.5 ml-1.5" />
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-elec-gray/80 backdrop-blur-sm",
        "border border-white/10",
        "hover:border-white/20",
        "transition-all duration-300",
        "group cursor-pointer"
      )}
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <Avatar className="w-14 h-14 shrink-0 border-2 border-white/10">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={name} />
            ) : null}
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
                      className={cn("text-xs", tier.bg, tier.text, tier.border)}
                    >
                      <TierIcon className="h-3 w-3 mr-1" />
                      {elecIdTier === "premium"
                        ? "Premium"
                        : elecIdTier === "verified"
                        ? "Verified"
                        : "Basic"}
                    </Badge>
                  )}
                  {ecsCardType && (
                    <Badge
                      variant="outline"
                      className="text-xs bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30"
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
                className={cn("text-xs font-medium shrink-0", config.bg, config.text, config.border)}
              >
                {config.label}
              </Badge>
            </div>

            {/* Job applied for */}
            <div className="flex items-center gap-1.5 mt-3 text-sm text-white/60">
              <Briefcase className="h-3.5 w-3.5 text-elec-yellow/70" />
              <span className="truncate">Applied: {vacancyTitle}</span>
            </div>

            {/* Meta info */}
            <div className="flex items-center gap-4 mt-2 text-xs text-white/50">
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
