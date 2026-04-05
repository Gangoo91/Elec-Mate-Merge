import { openExternalUrl } from '@/utils/open-external-url';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetClose, SheetTitle } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import type { EnhancedCareerCourse } from '@/components/apprentice/career/courses/enhancedCoursesData';
import {
  Star,
  Clock,
  MapPin,
  ExternalLink,
  Calendar,
  TrendingUp,
  Award,
  CheckCircle,
  GraduationCap,
  Building,
  Share2,
  X,
  PoundSterling,
  Phone,
  Mail,
  BookOpen,
  MessageSquare,
  Flame,
  Monitor,
  AlertTriangle,
  Info,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModernCoursesDetailsModalProps {
  course: EnhancedCareerCourse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEnquire?: (course: EnhancedCareerCourse) => void;
}

const demandConfig: Record<
  string,
  { color: string; bg: string; gradient: string; label: string; desc: string }
> = {
  High: {
    color: 'text-red-400',
    bg: 'bg-red-500/15',
    gradient: 'from-red-500/20 to-orange-500/10',
    label: 'High Demand',
    desc: 'Employers actively recruiting',
  },
  Medium: {
    color: 'text-amber-400',
    bg: 'bg-amber-500/15',
    gradient: 'from-amber-500/20 to-yellow-500/10',
    label: 'Moderate Demand',
    desc: 'Steady employer demand',
  },
  Low: {
    color: 'text-green-400',
    bg: 'bg-green-500/15',
    gradient: 'from-green-500/20 to-emerald-500/10',
    label: 'Specialist',
    desc: 'Niche opportunities',
  },
};

const ModernCoursesDetailsModal = ({
  course,
  open,
  onOpenChange,
  onEnquire,
}: ModernCoursesDetailsModalProps) => {
  if (!course) return null;

  const demandStyle = demandConfig[course.industryDemand] || demandConfig.Medium;

  // Extra fields passed through from TrainingCourse
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contactPhone = (course as any).contact_phone as string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contactEmail = (course as any).contact_email as string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookingUrl = (course as any).booking_url as string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const venuePostcode = (course as any).venue_postcode as string | undefined;
  const courseUrl = course.external_url || bookingUrl;

  const handleExternalLink = () => {
    if (courseUrl) {
      openExternalUrl(courseUrl);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: course.title,
          text: `Check out this course: ${course.title} by ${course.provider}`,
          url: course.external_url || window.location.href,
        });
      } catch {
        // cancelled
      }
    }
  };

  const stats = [
    { icon: Clock, label: 'Duration', value: course.duration, color: 'blue' },
    { icon: GraduationCap, label: 'Level', value: course.level, color: 'purple' },
    { icon: Monitor, label: 'Format', value: course.format || 'In-Person', color: 'green' },
    { icon: PoundSterling, label: 'Price', value: course.price, color: 'yellow' },
  ];

  const colorMap: Record<string, { icon: string; bg: string; border: string }> = {
    blue: { icon: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    purple: { icon: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    green: { icon: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    yellow: { icon: 'text-elec-yellow', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  };

  // Collapsible sections data
  const sections = [
    {
      id: 'description',
      icon: BookOpen,
      iconColor: 'text-blue-400',
      title: 'About This Course',
      show: !!course.description,
      defaultOpen: true,
      content: <p className="text-sm text-white leading-relaxed">{course.description}</p>,
    },
    {
      id: 'accreditation',
      icon: Award,
      iconColor: 'text-elec-yellow',
      title: 'Accreditation',
      show: !!(course.accreditation && course.accreditation.length > 0),
      content: (
        <div className="flex flex-wrap gap-2">
          {course.accreditation?.map((a, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-500/15 to-amber-500/10 border border-yellow-500/25 rounded-lg px-3 py-2"
            >
              <Award className="h-3.5 w-3.5 text-elec-yellow shrink-0" />
              <span className="text-sm text-white font-medium">{a}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'content',
      icon: CheckCircle,
      iconColor: 'text-green-400',
      title: `Course Content${course.courseOutline?.length ? ` (${course.courseOutline.length})` : ''}`,
      show: !!(course.courseOutline && course.courseOutline.length > 0),
      content: (
        <div className="space-y-1.5">
          {course.courseOutline?.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 py-1.5">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-green-400">{i + 1}</span>
              </div>
              <span className="text-sm text-white">{item}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'prerequisites',
      icon: Info,
      iconColor: 'text-purple-400',
      title: 'Prerequisites',
      show: !!(course.prerequisites && course.prerequisites.length > 0),
      content: (
        <div className="space-y-2">
          {course.prerequisites?.map((p, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <AlertTriangle className="h-3.5 w-3.5 text-purple-400 mt-0.5 shrink-0" />
              <span className="text-sm text-white">{p}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'outcomes',
      icon: TrendingUp,
      iconColor: 'text-green-400',
      title: 'Career Outcomes',
      show: !!(course.careerOutcomes && course.careerOutcomes.length > 0),
      content: (
        <div className="space-y-2">
          {course.careerOutcomes?.map((o, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
              <span className="text-sm text-white">{o}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'locations',
      icon: MapPin,
      iconColor: 'text-red-400',
      title: `Locations${course.locations?.length ? ` (${course.locations.length})` : ''}`,
      show: !!(course.locations && course.locations.length > 0),
      content: (
        <div className="flex flex-wrap gap-2">
          {course.locations?.map((l, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5"
            >
              <MapPin className="h-3 w-3 text-red-400 shrink-0" />
              <span className="text-xs text-white font-medium">{l}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'dates',
      icon: Calendar,
      iconColor: 'text-orange-400',
      title: 'Upcoming Dates',
      show: !!(course.nextDates && course.nextDates.length > 0),
      content: (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {course.nextDates?.slice(0, 6).map((d, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-center"
            >
              <span className="text-xs text-white font-medium">{d}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'contact',
      icon: Building,
      iconColor: 'text-blue-400',
      title: 'Contact Provider',
      show: !!(contactPhone || contactEmail),
      defaultOpen: true,
      content: (
        <div className="space-y-2.5">
          {contactPhone && (
            <a
              href={`tel:${contactPhone}`}
              className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 touch-manipulation active:bg-white/10"
            >
              <div className="h-8 w-8 rounded-full bg-green-500/15 flex items-center justify-center shrink-0">
                <Phone className="h-4 w-4 text-green-400" />
              </div>
              <div>
                <p className="text-xs text-white font-medium">Phone</p>
                <p className="text-sm text-white font-semibold">{contactPhone}</p>
              </div>
            </a>
          )}
          {contactEmail && (
            <a
              href={`mailto:${contactEmail}`}
              className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 touch-manipulation active:bg-white/10"
            >
              <div className="h-8 w-8 rounded-full bg-blue-500/15 flex items-center justify-center shrink-0">
                <Mail className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-white font-medium">Email</p>
                <p className="text-sm text-white font-semibold">{contactEmail}</p>
              </div>
            </a>
          )}
        </div>
      ),
    },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[92vh] p-0 rounded-t-2xl overflow-hidden bg-[#111113] [&>button:last-child]:hidden"
      >
        <VisuallyHidden>
          <SheetTitle>Course Details</SheetTitle>
        </VisuallyHidden>

        <div className="flex flex-col h-full">
          {/* Fixed header */}
          <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
            <SheetClose className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 touch-manipulation active:scale-95">
              <X className="h-4 w-4 text-white" />
            </SheetClose>
            <button
              onClick={handleShare}
              className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 touch-manipulation active:scale-95"
            >
              <Share2 className="h-4 w-4 text-white" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
              {/* === HERO CARD — gradient background with key info === */}
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent border border-white/[0.08]">
                <div className="p-4 space-y-3">
                  {/* Category + Rating */}
                  <div className="flex items-center justify-between">
                    <Badge className="bg-white/15 text-white border-0 text-[11px] font-semibold backdrop-blur-sm">
                      {course.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-elec-yellow fill-elec-yellow" />
                      <span className="text-sm font-bold text-white">
                        {course.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-white leading-tight">{course.title}</h2>

                  {/* Provider */}
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Building className="h-3.5 w-3.5 text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-blue-400">{course.provider}</span>
                  </div>

                  {/* Location */}
                  {(course.locations?.[0] || venuePostcode) && (
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-red-500/20 flex items-center justify-center">
                        <MapPin className="h-3.5 w-3.5 text-red-400" />
                      </div>
                      <span className="text-sm text-white">
                        {course.locations?.[0]}
                        {venuePostcode ? ` (${venuePostcode})` : ''}
                      </span>
                    </div>
                  )}

                  {/* Price highlight */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">{course.price}</span>
                    {course.duration && (
                      <span className="text-sm text-white">/ {course.duration}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* === CTA BUTTONS === */}
              <div className="flex gap-3">
                <Button
                  onClick={handleExternalLink}
                  disabled={!courseUrl}
                  className="flex-1 h-13 bg-gradient-to-r from-elec-yellow to-amber-400 text-black hover:from-elec-yellow/90 hover:to-amber-400/90 font-bold text-sm gap-2 touch-manipulation rounded-xl shadow-lg shadow-yellow-500/20"
                >
                  Visit Course
                  <ExternalLink className="h-4 w-4" />
                </Button>
                {onEnquire && (
                  <Button
                    onClick={() => onEnquire(course)}
                    variant="outline"
                    className="h-13 px-5 bg-white/5 border-white/15 text-white hover:text-white hover:bg-white/10 font-semibold gap-2 touch-manipulation rounded-xl"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* === STATS GRID — 2x2 coloured cards === */}
              <div className="grid grid-cols-2 gap-2.5">
                {stats.map((stat) => {
                  const c = colorMap[stat.color];
                  return (
                    <div key={stat.label} className={cn('rounded-xl p-3 border', c.bg, c.border)}>
                      <div className="flex items-center gap-2 mb-1">
                        <stat.icon className={cn('h-4 w-4', c.icon)} />
                        <span className="text-[10px] font-medium text-white uppercase tracking-wider">
                          {stat.label}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-white">{stat.value}</p>
                    </div>
                  );
                })}
              </div>

              {/* === DEMAND BANNER === */}
              <div
                className={cn(
                  'rounded-xl p-3.5 bg-gradient-to-r border border-white/[0.06]',
                  demandStyle.gradient
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        'h-8 w-8 rounded-full flex items-center justify-center',
                        demandStyle.bg
                      )}
                    >
                      <Flame className={cn('h-4 w-4', demandStyle.color)} />
                    </div>
                    <div>
                      <p className={cn('text-sm font-bold', demandStyle.color)}>
                        {demandStyle.label}
                      </p>
                      <p className="text-xs text-white">{demandStyle.desc}</p>
                    </div>
                  </div>
                  {course.salaryImpact && (
                    <div className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <TrendingUp className="h-3.5 w-3.5 text-green-400" />
                        <span className="text-xs font-bold text-green-400">Salary</span>
                      </div>
                      <p className="text-xs text-white font-semibold">{course.salaryImpact}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* === DETAIL SECTIONS — collapsible accordion === */}
              <div className="rounded-xl border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
                {sections
                  .filter((s) => s.show)
                  .map((section) => (
                    <details key={section.id} className="group" open={section.defaultOpen}>
                      <summary className="flex items-center justify-between px-4 py-3.5 cursor-pointer touch-manipulation list-none [&::-webkit-details-marker]:hidden select-none active:bg-white/5">
                        <div className="flex items-center gap-2.5">
                          <section.icon className={cn('h-4 w-4', section.iconColor)} />
                          <span className="text-sm font-semibold text-white">{section.title}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-white transition-transform group-open:rotate-90" />
                      </summary>
                      <div className="px-4 pb-4">{section.content}</div>
                    </details>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ModernCoursesDetailsModal;
