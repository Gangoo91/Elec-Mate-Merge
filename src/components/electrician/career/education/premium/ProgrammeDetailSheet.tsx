/**
 * ProgrammeDetailSheet - Bottom sheet with programme details
 * Parallax hero, collapsible sections, sticky CTA bar
 */

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Drawer,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  X,
  Star,
  Clock,
  GraduationCap,
  MapPin,
  ChevronDown,
  ChevronRight,
  Calendar,
  PoundSterling,
  TrendingUp,
  BookOpen,
  Award,
  Users,
  ExternalLink,
  Bookmark,
  Share2,
  GitCompare,
} from "lucide-react";
import { fadeUpVariants } from "./animations/variants";
import type { LiveEducationData } from "@/hooks/useLiveEducationData";

interface ProgrammeDetailSheetProps {
  programme: LiveEducationData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookmark?: (programmeId: string) => void;
  onAddToCompare?: (programme: LiveEducationData) => void;
  isBookmarked?: boolean;
  isInCompare?: boolean;
  similarProgrammes?: LiveEducationData[];
  onSelectSimilar?: (programme: LiveEducationData) => void;
}

// Collapsible section component
const Section = ({
  title,
  icon: Icon,
  defaultOpen = false,
  children,
}: {
  title: string;
  icon: typeof BookOpen;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Icon className="h-4 w-4 text-purple-400" />
          </div>
          <span className="font-medium text-white">{title}</span>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-white/40 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-3 mt-2"
        >
          {children}
        </motion.div>
      </CollapsibleContent>
    </Collapsible>
  );
};

// Stat item component
const StatItem = ({
  icon: Icon,
  label,
  value,
  iconColor = "text-purple-400",
}: {
  icon: typeof Star;
  label: string;
  value: string | number;
  iconColor?: string;
}) => (
  <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
    <Icon className={cn("h-5 w-5 mx-auto mb-1", iconColor)} />
    <div className="text-sm font-semibold text-white">{value}</div>
    <div className="text-[10px] text-white/50 uppercase">{label}</div>
  </div>
);

// Category image fallbacks
const getCategoryImage = (category: string) => {
  const images: Record<string, string> = {
    Degree: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop&auto=format",
    Certificate: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop&auto=format",
    Diploma: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=400&fit=crop&auto=format",
    Apprenticeship: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&h=400&fit=crop&auto=format",
    Foundation: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&auto=format",
    Master: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&auto=format",
    HNC: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop&auto=format",
    HND: "https://images.unsplash.com/photo-1574188041339-3d9d896ce7f8?w=800&h=400&fit=crop&auto=format",
  };
  return images[category] || images.Degree;
};

const ProgrammeDetailSheet = ({
  programme,
  open,
  onOpenChange,
  onBookmark,
  onAddToCompare,
  isBookmarked = false,
  isInCompare = false,
  similarProgrammes = [],
  onSelectSimilar,
}: ProgrammeDetailSheetProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll for parallax effect
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setScrollY(target.scrollTop);
  };

  if (!programme) return null;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: programme.title,
          text: `Check out this programme: ${programme.title} at ${programme.institution}`,
          url: programme.courseUrl || window.location.href,
        });
      } catch (error) {
        // User cancelled or error
      }
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[95vh] rounded-t-3xl overflow-hidden">
        {/* Custom scroll area with parallax */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-full overflow-y-auto"
        >
          {/* Hero Image with Parallax */}
          <div className="relative h-56 sm:h-64 overflow-hidden">
            <motion.img
              src={programme.imageUrl || getCategoryImage(programme.category)}
              alt={programme.title}
              className="w-full h-full object-cover"
              style={{
                transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0005})`,
              }}
              onError={(e) => {
                e.currentTarget.src = getCategoryImage(programme.category);
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

            {/* Close button */}
            <DrawerClose className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors">
              <X className="h-5 w-5 text-white" />
            </DrawerClose>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className="bg-purple-500/80 text-white border-purple-500/80 backdrop-blur-sm">
                {programme.category}
              </Badge>
              <Badge className="bg-white/20 text-white border-white/20 backdrop-blur-sm">
                {programme.level}
              </Badge>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {programme.title}
              </h1>
              <p className="text-purple-300 font-medium mt-1">
                {programme.institution}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4 pb-28">
            {/* Stats Grid */}
            <motion.div
              variants={fadeUpVariants}
              initial="initial"
              animate="animate"
              className="grid grid-cols-4 gap-2"
            >
              <StatItem
                icon={Star}
                label="Rating"
                value={(programme.rating || 0).toFixed(1)}
                iconColor="text-yellow-400"
              />
              <StatItem
                icon={TrendingUp}
                label="Employed"
                value={`${programme.employmentRate || 0}%`}
                iconColor="text-green-400"
              />
              <StatItem
                icon={Clock}
                label="Duration"
                value={programme.duration}
                iconColor="text-blue-400"
              />
              <StatItem
                icon={BookOpen}
                label="Mode"
                value={programme.studyMode}
                iconColor="text-purple-400"
              />
            </motion.div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-2">
              {programme.locations.length > 0 && (
                <Badge variant="outline" className="bg-white/5 border-white/10">
                  <MapPin className="h-3 w-3 mr-1" />
                  {programme.locations[0]}
                  {programme.locations.length > 1 && ` +${programme.locations.length - 1}`}
                </Badge>
              )}
              {programme.nextIntakes && programme.nextIntakes.length > 0 && (
                <Badge variant="outline" className="bg-white/5 border-white/10">
                  <Calendar className="h-3 w-3 mr-1" />
                  Next: {programme.nextIntakes[0]}
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {onBookmark && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onBookmark(programme.id)}
                  className={cn(
                    "flex-1 border-white/20 hover:bg-white/10",
                    isBookmarked && "bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow"
                  )}
                >
                  <Bookmark className={cn("h-4 w-4 mr-2", isBookmarked && "fill-current")} />
                  {isBookmarked ? "Saved" : "Save"}
                </Button>
              )}
              {onAddToCompare && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAddToCompare(programme)}
                  className={cn(
                    "flex-1 border-white/20 hover:bg-white/10",
                    isInCompare && "bg-purple-500/10 border-purple-500/30 text-purple-400"
                  )}
                >
                  <GitCompare className="h-4 w-4 mr-2" />
                  {isInCompare ? "Added" : "Compare"}
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="border-white/20 hover:bg-white/10"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Collapsible Sections */}
            <div className="space-y-3">
              {/* Overview */}
              <Section title="Programme Overview" icon={BookOpen} defaultOpen>
                <p className="text-white/70 leading-relaxed">
                  {programme.description}
                </p>
              </Section>

              {/* Key Topics */}
              {programme.keyTopics && programme.keyTopics.length > 0 && (
                <Section title="Key Topics" icon={Award}>
                  <div className="flex flex-wrap gap-2">
                    {programme.keyTopics.map((topic, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-purple-500/10 border-purple-500/30 text-purple-300"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </Section>
              )}

              {/* Entry Requirements */}
              {programme.entryRequirements && programme.entryRequirements.length > 0 && (
                <Section title="Entry Requirements" icon={GraduationCap}>
                  <ul className="space-y-2">
                    {programme.entryRequirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-white/70">
                        <ChevronRight className="h-4 w-4 mt-0.5 text-purple-400 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {/* Funding & Fees */}
              <Section title="Funding & Fees" icon={PoundSterling}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-white/10">
                    <span className="text-white/60">Tuition Fees</span>
                    <span className="font-semibold text-white">{programme.tuitionFees}</span>
                  </div>
                  {programme.averageStartingSalary && (
                    <div className="flex items-center justify-between py-2 border-b border-white/10">
                      <span className="text-white/60">Avg Starting Salary</span>
                      <span className="font-semibold text-green-400">
                        {programme.averageStartingSalary}
                      </span>
                    </div>
                  )}
                  {programme.fundingOptions && programme.fundingOptions.length > 0 && (
                    <div className="pt-2">
                      <p className="text-sm text-white/60 mb-2">Funding Options:</p>
                      <div className="flex flex-wrap gap-2">
                        {programme.fundingOptions.map((option, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-green-500/10 border-green-500/30 text-green-300"
                          >
                            {option}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Section>

              {/* Career Outcomes */}
              {programme.careerOutcomes && programme.careerOutcomes.length > 0 && (
                <Section title="Career Outcomes" icon={Users}>
                  <ul className="space-y-2">
                    {programme.careerOutcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-2 text-white/70">
                        <TrendingUp className="h-4 w-4 mt-0.5 text-green-400 flex-shrink-0" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}
            </div>

            {/* Similar Programmes */}
            {similarProgrammes.length > 0 && onSelectSimilar && (
              <div className="pt-4">
                <h3 className="font-semibold text-white mb-3">Similar Programmes</h3>
                <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
                  {similarProgrammes.slice(0, 4).map((similar) => (
                    <button
                      key={similar.id}
                      onClick={() => onSelectSimilar(similar)}
                      className="min-w-[200px] bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:border-purple-500/30 transition-colors text-left"
                    >
                      <div className="h-24 overflow-hidden">
                        <img
                          src={similar.imageUrl || getCategoryImage(similar.category)}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h4 className="text-sm font-medium text-white line-clamp-1">
                          {similar.title}
                        </h4>
                        <p className="text-xs text-purple-400 mt-0.5">{similar.institution}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-white/50">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {similar.rating?.toFixed(1)}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sticky CTA Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-lg border-t border-white/10 safe-area-inset-bottom">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-white/20 hover:bg-white/10"
              onClick={() => {
                if (programme.courseUrl) {
                  window.open(programme.courseUrl, "_blank");
                }
              }}
            >
              Enquire
            </Button>
            <Button
              className="flex-1 bg-purple-500 text-white hover:bg-purple-600"
              onClick={() => {
                if (programme.courseUrl) {
                  window.open(programme.courseUrl, "_blank");
                }
              }}
            >
              Apply Now
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ProgrammeDetailSheet;
