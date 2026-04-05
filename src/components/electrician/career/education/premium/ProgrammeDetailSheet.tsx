/**
 * ProgrammeDetailSheet - Bottom sheet with programme details
 * Parallax hero, collapsible sections, sticky CTA bar
 */

import { useState, useRef } from 'react';
import { openExternalUrl } from '@/utils/open-external-url';
import { motion } from 'framer-motion';
import { Drawer, DrawerContent, DrawerClose } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
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
} from 'lucide-react';
import { fadeUpVariants } from './animations/variants';
import type { LiveEducationData } from '@/hooks/useLiveEducationData';

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
      <CollapsibleTrigger className="w-full flex items-center justify-between p-3.5 bg-white/[0.04] rounded-xl border border-white/[0.08] hover:bg-white/[0.06] transition-colors touch-manipulation">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-elec-yellow/10 flex items-center justify-center">
            <Icon className="h-3.5 w-3.5 text-elec-yellow" />
          </div>
          <span className="font-medium text-white text-sm">{title}</span>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-white transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-3.5 py-3 mt-1.5"
        >
          {children}
        </motion.div>
      </CollapsibleContent>
    </Collapsible>
  );
};

// Category image fallbacks
const getCategoryImage = (category: string) => {
  const images: Record<string, string> = {
    Degree:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop&auto=format',
    Certificate:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop&auto=format',
    Diploma:
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=400&fit=crop&auto=format',
    Apprenticeship:
      'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&h=400&fit=crop&auto=format',
    Foundation:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&auto=format',
    Master:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&auto=format',
    HNC: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop&auto=format',
    HND: 'https://images.unsplash.com/photo-1574188041339-3d9d896ce7f8?w=800&h=400&fit=crop&auto=format',
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
      } catch {
        // User cancelled
      }
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[95vh] rounded-t-3xl overflow-hidden">
        {/* Custom scroll area with parallax */}
        <div ref={scrollRef} onScroll={handleScroll} className="h-full overflow-y-auto">
          {/* Hero Image with Parallax */}
          <div className="relative h-52 sm:h-60 overflow-hidden">
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
            <DrawerClose className="absolute top-3 right-3 h-9 w-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors touch-manipulation">
              <X className="h-4 w-4 text-white" />
            </DrawerClose>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-1.5">
              <Badge className="bg-elec-yellow/90 text-elec-dark border-elec-yellow/90 backdrop-blur-sm text-xs font-semibold">
                {programme.category}
              </Badge>
              <Badge className="bg-white/20 text-white border-white/20 backdrop-blur-sm text-xs">
                {programme.level}
              </Badge>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-3 left-3 right-3">
              <h1 className="text-lg sm:text-xl font-bold text-white leading-tight">
                {programme.title}
              </h1>
              <p className="text-elec-yellow font-medium text-sm mt-1">{programme.institution}</p>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 py-4 space-y-4 pb-28">
            {/* Stats — 2x2 grid on mobile, clean and readable */}
            <motion.div
              variants={fadeUpVariants}
              initial="initial"
              animate="animate"
              className="grid grid-cols-2 gap-2"
            >
              <div className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-3.5 w-3.5 text-amber-400" />
                  <span className="text-[11px] text-white uppercase tracking-wide">Rating</span>
                </div>
                <span className="text-lg font-bold text-white">
                  {(programme.rating || 0).toFixed(1)}
                </span>
              </div>
              <div className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-[11px] text-white uppercase tracking-wide">Employed</span>
                </div>
                <span className="text-lg font-bold text-white">
                  {programme.employmentRate || 0}%
                </span>
              </div>
              <div className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-[11px] text-white uppercase tracking-wide">Duration</span>
                </div>
                <span className="text-sm font-semibold text-white">{programme.duration}</span>
              </div>
              <div className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="h-3.5 w-3.5 text-elec-yellow" />
                  <span className="text-[11px] text-white uppercase tracking-wide">Mode</span>
                </div>
                <span className="text-sm font-semibold text-white">{programme.studyMode}</span>
              </div>
            </motion.div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-2">
              {programme.locations.length > 0 && (
                <Badge variant="outline" className="bg-white/[0.04] border-white/10 text-white">
                  <MapPin className="h-3 w-3 mr-1" />
                  {programme.locations[0]}
                  {programme.locations.length > 1 && ` +${programme.locations.length - 1}`}
                </Badge>
              )}
              {programme.nextIntake && (
                <Badge variant="outline" className="bg-white/[0.04] border-white/10 text-white">
                  <Calendar className="h-3 w-3 mr-1" />
                  {programme.nextIntake}
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {onBookmark && (
                <Button
                  variant="outline"
                  onClick={() => onBookmark(programme.id)}
                  className={cn(
                    'flex-1 h-10 border-white/15 hover:bg-white/10 text-white hover:text-white rounded-xl touch-manipulation',
                    isBookmarked &&
                      'bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:text-elec-yellow'
                  )}
                >
                  <Bookmark className={cn('h-4 w-4 mr-1.5', isBookmarked && 'fill-current')} />
                  {isBookmarked ? 'Saved' : 'Save'}
                </Button>
              )}
              {onAddToCompare && (
                <Button
                  variant="outline"
                  onClick={() => onAddToCompare(programme)}
                  className={cn(
                    'flex-1 h-10 border-white/15 hover:bg-white/10 text-white hover:text-white rounded-xl touch-manipulation',
                    isInCompare &&
                      'bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:text-elec-yellow'
                  )}
                >
                  <GitCompare className="h-4 w-4 mr-1.5" />
                  {isInCompare ? 'Added' : 'Compare'}
                </Button>
              )}
              <Button
                variant="outline"
                size="icon"
                onClick={handleShare}
                className="h-10 w-10 border-white/15 hover:bg-white/10 text-white hover:text-white rounded-xl touch-manipulation"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Collapsible Sections */}
            <div className="space-y-2.5">
              {/* Overview */}
              <Section title="Programme Overview" icon={BookOpen} defaultOpen>
                <p className="text-white text-sm leading-relaxed">{programme.description}</p>
              </Section>

              {/* Key Topics */}
              {programme.keyTopics && programme.keyTopics.length > 0 && (
                <Section title="Key Topics" icon={Award}>
                  <div className="flex flex-wrap gap-1.5">
                    {programme.keyTopics.map((topic, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-elec-yellow/10 border-elec-yellow/20 text-elec-yellow text-xs"
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
                      <li key={index} className="flex items-start gap-2 text-sm text-white">
                        <ChevronRight className="h-3.5 w-3.5 mt-0.5 text-elec-yellow flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {/* Funding & Fees */}
              <Section title="Funding & Fees" icon={PoundSterling}>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                    <span className="text-sm text-white">Tuition Fees</span>
                    <span className="text-sm font-semibold text-white">
                      {programme.tuitionFees}
                    </span>
                  </div>
                  {programme.averageStartingSalary && (
                    <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                      <span className="text-sm text-white">Avg Starting Salary</span>
                      <span className="text-sm font-semibold text-emerald-400">
                        {programme.averageStartingSalary}
                      </span>
                    </div>
                  )}
                  {programme.fundingOptions && programme.fundingOptions.length > 0 && (
                    <div className="pt-1">
                      <p className="text-xs text-white mb-2">Funding Options:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {programme.fundingOptions.map((option, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-emerald-500/10 border-emerald-500/20 text-emerald-400 text-xs"
                          >
                            {option}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Section>

              {/* Progression Options */}
              {programme.progressionOptions && programme.progressionOptions.length > 0 && (
                <Section title="Progression Options" icon={TrendingUp}>
                  <ul className="space-y-2">
                    {programme.progressionOptions.map((option, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-white">
                        <ChevronRight className="h-3.5 w-3.5 mt-0.5 text-emerald-400 flex-shrink-0" />
                        <span>{option}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {/* Career Outcomes */}
              {programme.careerOutcomes && (programme.careerOutcomes as string[]).length > 0 && (
                <Section title="Career Outcomes" icon={Users}>
                  <ul className="space-y-2">
                    {(programme.careerOutcomes as string[]).map(
                      (outcome: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-white">
                          <TrendingUp className="h-3.5 w-3.5 mt-0.5 text-emerald-400 flex-shrink-0" />
                          <span>{outcome}</span>
                        </li>
                      )
                    )}
                  </ul>
                </Section>
              )}
            </div>

            {/* Similar Programmes */}
            {similarProgrammes.length > 0 && onSelectSimilar && (
              <div className="pt-2">
                <h3 className="text-xs font-medium text-white uppercase tracking-wider mb-2.5">
                  Similar Programmes
                </h3>
                <div className="flex gap-2.5 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
                  {similarProgrammes.slice(0, 4).map((similar) => (
                    <button
                      key={similar.id}
                      onClick={() => onSelectSimilar(similar)}
                      className="min-w-[180px] bg-white/[0.04] rounded-xl border border-white/[0.08] overflow-hidden hover:border-elec-yellow/30 transition-colors text-left touch-manipulation active:scale-[0.98]"
                    >
                      <div className="h-20 overflow-hidden">
                        <img
                          src={similar.imageUrl || getCategoryImage(similar.category)}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2.5">
                        <h4 className="text-xs font-medium text-white line-clamp-1">
                          {similar.title}
                        </h4>
                        <p className="text-[11px] text-elec-yellow mt-0.5">{similar.institution}</p>
                        <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-white">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
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
        <div
          className="absolute bottom-0 left-0 right-0 p-4 bg-elec-dark/95 backdrop-blur-xl border-t border-white/10"
          style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
        >
          <div className="flex gap-2.5">
            <Button
              variant="outline"
              className="flex-1 h-12 border-white/15 hover:bg-white/10 text-white hover:text-white rounded-xl touch-manipulation font-medium"
              onClick={() => {
                if (programme.courseUrl) {
                  openExternalUrl(programme.courseUrl);
                }
              }}
            >
              Enquire
            </Button>
            <Button
              className="flex-1 h-12 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 rounded-xl touch-manipulation font-semibold shadow-lg shadow-elec-yellow/15"
              onClick={() => {
                if (programme.courseUrl) {
                  openExternalUrl(programme.courseUrl);
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
