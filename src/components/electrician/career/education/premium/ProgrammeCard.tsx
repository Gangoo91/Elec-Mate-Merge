/**
 * ProgrammeCard - Premium swipeable education programme card
 * Native app feel with swipe actions, touch feedback, and smooth animations
 */

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SwipeableCard } from "@/components/ui/SwipeableCard";
import { cn } from "@/lib/utils";
import {
  Star,
  Clock,
  GraduationCap,
  MapPin,
  TrendingUp,
  ChevronRight,
  Bookmark,
  GitCompare,
} from "lucide-react";
import { cardPressSubtleVariants, listItemVariants } from "./animations/variants";
import type { LiveEducationData } from "@/hooks/useLiveEducationData";

interface ProgrammeCardProps {
  programme: LiveEducationData;
  onSelect: (programme: LiveEducationData) => void;
  onBookmark?: (programmeId: string) => void;
  onAddToCompare?: (programme: LiveEducationData) => void;
  isBookmarked?: boolean;
  isInCompare?: boolean;
  compareDisabled?: boolean;
  className?: string;
}

// Category image fallbacks
const getCategoryImage = (category: string) => {
  const images: Record<string, string> = {
    Degree:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop&auto=format",
    Certificate:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop&auto=format",
    Diploma:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop&auto=format",
    Apprenticeship:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=250&fit=crop&auto=format",
    Foundation:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&auto=format",
    Master:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop&auto=format",
    HNC: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop&auto=format",
    HND: "https://images.unsplash.com/photo-1574188041339-3d9d896ce7f8?w=400&h=250&fit=crop&auto=format",
  };
  return (
    images[category] ||
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop&auto=format"
  );
};

// Badge color by category
const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Degree: "bg-blue-500/20 border-blue-500/30 text-blue-300",
    Certificate: "bg-green-500/20 border-green-500/30 text-green-300",
    Diploma: "bg-purple-500/20 border-purple-500/30 text-purple-300",
    Apprenticeship: "bg-orange-500/20 border-orange-500/30 text-orange-300",
    Foundation: "bg-cyan-500/20 border-cyan-500/30 text-cyan-300",
    Master: "bg-red-500/20 border-red-500/30 text-red-300",
    HNC: "bg-yellow-500/20 border-yellow-500/30 text-yellow-300",
    HND: "bg-pink-500/20 border-pink-500/30 text-pink-300",
  };
  return colors[category] || "bg-white/10 border-white/20 text-foreground/80";
};

// Badge color by level
const getLevelColor = (level: string) => {
  const colors: Record<string, string> = {
    "Level 3": "bg-green-500/20 border-green-500/30 text-green-300",
    "Level 4": "bg-blue-500/20 border-blue-500/30 text-blue-300",
    "Level 5": "bg-purple-500/20 border-purple-500/30 text-purple-300",
    "Level 6": "bg-red-500/20 border-red-500/30 text-red-300",
    "Level 7": "bg-yellow-500/20 border-yellow-500/30 text-yellow-300",
  };
  return colors[level] || "bg-white/10 border-white/20 text-foreground/80";
};

// Format duration string
const formatDuration = (duration: string) => {
  const patterns = [
    { regex: /(\d+)\s*years?/i, format: (n: number) => `${n}yr${n > 1 ? "s" : ""}` },
    { regex: /(\d+)\s*months?/i, format: (n: number) => `${n}mo` },
    { regex: /(\d+)\s*weeks?/i, format: (n: number) => `${n}wk${n > 1 ? "s" : ""}` },
  ];

  for (const pattern of patterns) {
    const match = duration.match(pattern.regex);
    if (match) {
      return pattern.format(parseInt(match[1]));
    }
  }
  return duration;
};

const ProgrammeCard = ({
  programme,
  onSelect,
  onBookmark,
  onAddToCompare,
  isBookmarked = false,
  isInCompare = false,
  compareDisabled = false,
  className,
}: ProgrammeCardProps) => {
  const isHighDemand = (programme.employmentRate || 0) >= 90;
  const isTopRated = (programme.rating || 0) >= 4.5;
  const isFunded = programme.fundingOptions?.some(f => f.toLowerCase().includes('funded') || f.toLowerCase().includes('levy'));

  const cardContent = (
    <motion.div
      variants={listItemVariants}
      whileTap={cardPressSubtleVariants.tap}
      onClick={() => onSelect(programme)}
      className={cn(
        "group relative bg-card/80 backdrop-blur-sm",
        "rounded-2xl border border-white/10 overflow-hidden cursor-pointer",
        "hover:border-purple-500/40 transition-all duration-300",
        "hover:shadow-2xl hover:shadow-purple-500/20",
        "hover:-translate-y-1",
        "active:scale-[0.98]",
        className
      )}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Image section */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={programme.imageUrl || getCategoryImage(programme.category)}
          alt={programme.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = getCategoryImage(programme.category);
          }}
        />
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        {/* Glowing accent line at top */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Category badge - top left */}
        <Badge
          className={cn(
            "absolute top-3 left-3 text-[11px] font-semibold backdrop-blur-md",
            getCategoryColor(programme.category)
          )}
        >
          {programme.category}
        </Badge>

        {/* Level badge - top right */}
        <Badge
          className={cn(
            "absolute top-3 right-3 text-[11px] font-semibold backdrop-blur-md",
            getLevelColor(programme.level)
          )}
        >
          {programme.level}
        </Badge>

        {/* Special indicators - bottom left */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          {isHighDemand && (
            <Badge className="bg-gradient-to-r from-amber-500/30 to-orange-500/30 border-amber-400/40 text-amber-300 text-[10px] font-semibold backdrop-blur-sm">
              <TrendingUp className="h-3 w-3 mr-1" />
              High Demand
            </Badge>
          )}
          {isTopRated && !isHighDemand && (
            <Badge className="bg-gradient-to-r from-emerald-500/30 to-green-500/30 border-emerald-400/40 text-emerald-300 text-[10px] font-semibold backdrop-blur-sm">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Top Rated
            </Badge>
          )}
          {isFunded && !isHighDemand && !isTopRated && (
            <Badge className="bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border-blue-400/40 text-blue-300 text-[10px] font-semibold backdrop-blur-sm">
              Funding Available
            </Badge>
          )}
        </div>

        {/* Bookmark indicator - bottom right */}
        {isBookmarked && (
          <div className="absolute bottom-3 right-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Bookmark className="h-4 w-4 text-white fill-current" />
            </div>
          </div>
        )}
      </div>

      {/* Content section */}
      <div className="relative p-4 space-y-3">
        {/* Stats row - premium styled */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-500/10">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-amber-300">{(programme.rating || 0).toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
            <span className="font-semibold text-emerald-300">{programme.employmentRate || 0}%</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 ml-auto">
            <Clock className="h-3.5 w-3.5 text-white/60" />
            <span className="text-white/70">{formatDuration(programme.duration)}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-white line-clamp-2 leading-snug text-base group-hover:text-purple-200 transition-colors">
          {programme.title}
        </h3>

        {/* Institution with icon */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="h-3.5 w-3.5 text-purple-400" />
          </div>
          <p className="text-purple-400 text-sm font-medium line-clamp-1">
            {programme.institution}
          </p>
        </div>

        {/* Study details */}
        <div className="flex items-center justify-between text-xs text-white/50">
          <span className="bg-white/5 px-2 py-1 rounded">{programme.studyMode}</span>
          {programme.locations.length > 0 && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span className="line-clamp-1 max-w-[100px]">
                {programme.locations[0]}
              </span>
              {programme.locations.length > 1 && (
                <span className="text-purple-400 font-medium">
                  +{programme.locations.length - 1}
                </span>
              )}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div>
            <span className="text-xs text-white/40 block">From</span>
            <span className="text-base font-bold text-white">
              {programme.tuitionFees}
            </span>
          </div>
          <Button
            size="sm"
            className="h-9 px-4 bg-purple-500 hover:bg-purple-400 text-white font-medium shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all touch-manipulation active:scale-[0.95]"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(programme);
            }}
          >
            <span className="text-sm">View Details</span>
            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.div>
  );

  // If no swipe actions, return card directly
  if (!onBookmark && !onAddToCompare) {
    return cardContent;
  }

  // Wrap in SwipeableCard for swipe actions
  return (
    <SwipeableCard
      leftAction={
        onAddToCompare && !compareDisabled
          ? {
              icon: <GitCompare className="h-5 w-5" />,
              bgColor: isInCompare ? "bg-purple-600" : "bg-purple-500",
              label: isInCompare ? "Added" : "Compare",
              onAction: () => onAddToCompare(programme),
            }
          : undefined
      }
      rightAction={
        onBookmark
          ? {
              icon: (
                <Bookmark
                  className={cn("h-5 w-5", isBookmarked && "fill-current")}
                />
              ),
              bgColor: "bg-elec-yellow",
              label: isBookmarked ? "Saved" : "Save",
              onAction: () => onBookmark(programme.id),
            }
          : undefined
      }
      disabled={!onBookmark && (!onAddToCompare || compareDisabled)}
      className={className}
    >
      {cardContent}
    </SwipeableCard>
  );
};

export default ProgrammeCard;
