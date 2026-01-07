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

  const cardContent = (
    <motion.div
      variants={listItemVariants}
      whileTap={cardPressSubtleVariants.tap}
      onClick={() => onSelect(programme)}
      className={cn(
        "bg-gradient-to-br from-white/10 via-white/5 to-transparent",
        "rounded-xl border border-white/10 overflow-hidden cursor-pointer",
        "hover:border-purple-500/30 transition-all duration-300",
        "hover:shadow-xl hover:shadow-purple-500/10",
        "active:scale-[0.99]",
        className
      )}
    >
      {/* Image section */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={programme.imageUrl || getCategoryImage(programme.category)}
          alt={programme.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = getCategoryImage(programme.category);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Category badge - top left */}
        <Badge
          className={cn(
            "absolute top-2 left-2 text-xs font-medium",
            getCategoryColor(programme.category)
          )}
        >
          {programme.category}
        </Badge>

        {/* Level badge - top right */}
        <Badge
          className={cn(
            "absolute top-2 right-2 text-xs font-medium",
            getLevelColor(programme.level)
          )}
        >
          {programme.level}
        </Badge>

        {/* Special indicators - bottom left */}
        <div className="absolute bottom-2 left-2 flex gap-1.5">
          {isHighDemand && (
            <Badge className="bg-elec-yellow/20 border-elec-yellow/30 text-elec-yellow text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              High Demand
            </Badge>
          )}
          {isTopRated && !isHighDemand && (
            <Badge className="bg-green-500/20 border-green-500/30 text-green-300 text-xs">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Top Rated
            </Badge>
          )}
        </div>

        {/* Bookmark indicator - bottom right */}
        {isBookmarked && (
          <div className="absolute bottom-2 right-2">
            <div className="w-7 h-7 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <Bookmark className="h-4 w-4 text-elec-yellow fill-current" />
            </div>
          </div>
        )}
      </div>

      {/* Content section */}
      <div className="p-4 space-y-3">
        {/* Stats row */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {(programme.rating || 0).toFixed(1)}
            </span>
            <span className="flex items-center gap-1">
              <GraduationCap className="h-3 w-3" />
              {programme.employmentRate || 0}%
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDuration(programme.duration)}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-foreground line-clamp-2 leading-tight text-sm sm:text-base">
          {programme.title}
        </h3>

        {/* Institution */}
        <p className="text-elec-yellow text-sm font-medium line-clamp-1">
          {programme.institution}
        </p>

        {/* Study details */}
        <div className="text-muted-foreground text-xs space-y-1">
          <div className="flex items-center justify-between">
            <span>{programme.studyMode}</span>
            {programme.locations.length > 0 && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span className="line-clamp-1 max-w-[120px]">
                  {programme.locations[0]}
                </span>
                {programme.locations.length > 1 && (
                  <span className="text-purple-400">
                    +{programme.locations.length - 1}
                  </span>
                )}
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <span className="text-sm font-medium text-foreground">
            {programme.tuitionFees}
          </span>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 px-3 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(programme);
            }}
          >
            <span className="text-xs">View</span>
            <ChevronRight className="h-4 w-4 ml-1" />
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
