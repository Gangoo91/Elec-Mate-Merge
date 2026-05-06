/**
 * ModernCoursesDetailsModal — editorial course detail sheet.
 *
 * Drops the blue/purple gradient hero, the per-stat colour cards, and the
 * coloured demand banner. Type-led: eyebrow + title + provider, fact strip,
 * sticky CTA bar, then numbered collapsible sections with hairline
 * dividers (about / accreditation / content / prerequisites / outcomes /
 * locations / dates / contact).
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { openExternalUrl } from '@/utils/open-external-url';
import { Sheet, SheetContent, SheetClose, SheetTitle } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import type { EnhancedCareerCourse } from '@/components/apprentice/career/courses/enhancedCoursesData';
import {
  Star,
  MapPin,
  ExternalLink,
  ChevronDown,
  Share2,
  X,
  Phone,
  Mail,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Eyebrow } from '@/components/college/primitives';

interface ModernCoursesDetailsModalProps {
  course: EnhancedCareerCourse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEnquire?: (course: EnhancedCareerCourse) => void;
}

const initialsOf = (provider: string): string =>
  provider
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 3)
    .join('')
    .toUpperCase();

const ModernCoursesDetailsModal = ({
  course,
  open,
  onOpenChange,
  onEnquire,
}: ModernCoursesDetailsModalProps) => {
  if (!course) return null;

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
    if (courseUrl) openExternalUrl(courseUrl);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: course.title,
          text: `${course.title} — ${course.provider}`,
          url: course.external_url || window.location.href,
        });
      } catch {
        // user cancelled
      }
    }
  };

  const demandPill: { label: string; tone: string } | null =
    course.industryDemand === 'High'
      ? {
          label: 'High demand',
          tone: 'text-emerald-300 border-emerald-500/40 bg-emerald-500/[0.08]',
        }
      : course.industryDemand === 'Medium'
        ? { label: 'Popular', tone: 'text-blue-300 border-blue-500/40 bg-blue-500/[0.08]' }
        : null;

  type Section = {
    id: string;
    title: string;
    show: boolean;
    defaultOpen?: boolean;
    body: React.ReactNode;
  };

  const sections: Section[] = [
    {
      id: 'about',
      title: 'About this course',
      show: !!course.description,
      defaultOpen: true,
      body: <p className="text-[13.5px] leading-relaxed text-white">{course.description}</p>,
    },
    {
      id: 'accreditation',
      title: 'Accreditation',
      show: !!(course.accreditation && course.accreditation.length > 0),
      body: (
        <ul className="flex flex-wrap gap-1.5">
          {course.accreditation?.map((a, i) => (
            <li
              key={i}
              className="text-[10.5px] uppercase tracking-[0.12em] text-elec-yellow border border-elec-yellow/40 bg-elec-yellow/[0.08] rounded-md px-2 py-1"
            >
              {a}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'content',
      title: `Course content${course.courseOutline?.length ? ` · ${course.courseOutline.length}` : ''}`,
      show: !!(course.courseOutline && course.courseOutline.length > 0),
      body: (
        <ol className="divide-y divide-white/[0.06]">
          {course.courseOutline?.map((item, i) => (
            <li key={i} className="py-2.5 first:pt-0 last:pb-0">
              <div className="flex items-baseline gap-3">
                <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-[13px] leading-relaxed text-white">{item}</p>
              </div>
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: 'prerequisites',
      title: 'Prerequisites',
      show: !!(course.prerequisites && course.prerequisites.length > 0),
      body: (
        <ul className="space-y-2">
          {course.prerequisites?.map((p, i) => (
            <li
              key={i}
              className="flex items-baseline gap-2.5 text-[13px] leading-relaxed text-white"
            >
              <span className="w-1 h-1 rounded-full bg-elec-yellow shrink-0" aria-hidden />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'outcomes',
      title: 'Career outcomes',
      show: !!(course.careerOutcomes && course.careerOutcomes.length > 0),
      body: (
        <ol className="divide-y divide-white/[0.06]">
          {course.careerOutcomes?.map((o, i) => (
            <li key={i} className="py-2.5 first:pt-0 last:pb-0">
              <div className="flex items-baseline gap-3">
                <span className="text-[10.5px] tabular-nums font-semibold text-emerald-300 shrink-0 w-5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-[13px] leading-relaxed text-white">{o}</p>
              </div>
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: 'locations',
      title: `Locations${course.locations?.length ? ` · ${course.locations.length}` : ''}`,
      show: !!(course.locations && course.locations.length > 0),
      body: (
        <ul className="flex flex-wrap gap-1.5">
          {course.locations?.map((l, i) => (
            <li
              key={i}
              className="inline-flex items-center gap-1.5 text-[11px] text-white border border-white/[0.10] rounded-md px-2 py-1"
            >
              <MapPin className="h-3 w-3 text-white/65" aria-hidden />
              {l}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'dates',
      title: 'Upcoming dates',
      show: !!(course.nextDates && course.nextDates.length > 0),
      body: (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {course.nextDates?.slice(0, 6).map((d, i) => (
            <div
              key={i}
              className="text-[11.5px] text-white tabular-nums border border-white/[0.10] rounded-md px-2 py-1.5 text-center"
            >
              {d}
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'contact',
      title: 'Contact provider',
      show: !!(contactPhone || contactEmail),
      defaultOpen: true,
      body: (
        <div className="space-y-2">
          {contactPhone && (
            <a
              href={`tel:${contactPhone}`}
              className="flex items-center gap-3 rounded-xl border border-white/[0.10] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.20] p-3 touch-manipulation transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-elec-yellow shrink-0" aria-hidden />
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-white/65">
                  Phone
                </p>
                <p className="text-[13px] font-semibold text-white truncate">{contactPhone}</p>
              </div>
            </a>
          )}
          {contactEmail && (
            <a
              href={`mailto:${contactEmail}`}
              className="flex items-center gap-3 rounded-xl border border-white/[0.10] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.20] p-3 touch-manipulation transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-elec-yellow shrink-0" aria-hidden />
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-white/65">
                  Email
                </p>
                <p className="text-[13px] font-semibold text-white truncate">{contactEmail}</p>
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
        className="h-[92vh] p-0 rounded-t-3xl overflow-hidden bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border-t border-white/[0.10] [&>button:last-child]:hidden"
      >
        <VisuallyHidden>
          <SheetTitle>Course details</SheetTitle>
        </VisuallyHidden>

        <div className="flex flex-col h-full">
          {/* Drag handle + actions */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-12 h-1.5 rounded-full bg-white/15" />
          </div>
          <div className="flex items-center justify-between px-5 sm:px-6 py-2 border-b border-white/[0.06]">
            <SheetClose
              aria-label="Close"
              className="text-white/65 hover:text-white border border-white/15 hover:border-white/30 rounded-full h-9 w-9 inline-flex items-center justify-center touch-manipulation transition-colors"
            >
              <X className="h-4 w-4" />
            </SheetClose>
            <button
              type="button"
              onClick={handleShare}
              aria-label="Share"
              className="text-white/65 hover:text-white border border-white/15 hover:border-white/30 rounded-full h-9 w-9 inline-flex items-center justify-center touch-manipulation transition-colors"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto pb-32">
            <div className="px-5 sm:px-6 py-5 space-y-7">
              {/* Header */}
              <motion.section
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className="space-y-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center bg-elec-yellow/[0.08] border border-elec-yellow/30 shrink-0">
                    <span className="text-[11px] sm:text-[12px] font-semibold tabular-nums text-elec-yellow">
                      {initialsOf(course.provider)}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <Eyebrow>{course.category}</Eyebrow>
                    <h2 className="mt-1.5 text-[22px] sm:text-[28px] font-semibold tracking-tight leading-tight text-white">
                      {course.title}
                    </h2>
                    <p className="mt-1 text-[13px] text-elec-yellow truncate">{course.provider}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 rounded-md px-1.5 py-0.5">
                        {course.level}
                      </span>
                      {demandPill && (
                        <span
                          className={cn(
                            'inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.14em] border rounded-md px-1.5 py-0.5',
                            demandPill.tone
                          )}
                        >
                          {demandPill.label}
                        </span>
                      )}
                      {(course.locations?.[0] || venuePostcode) && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 rounded-md px-1.5 py-0.5">
                          <MapPin className="h-3 w-3" aria-hidden />
                          {course.locations?.[0]}
                          {venuePostcode ? ` (${venuePostcode})` : ''}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Fact strip */}
                <dl className="pt-4 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 text-[11px]">
                  <Stat
                    label="Rating"
                    value={
                      <span className="inline-flex items-center gap-1">
                        <Star
                          className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                          aria-hidden
                        />
                        {course.rating.toFixed(1)}
                      </span>
                    }
                  />
                  <Stat label="Duration" value={course.duration} />
                  <Stat label="Format" value={course.format || 'Classroom'} />
                  <Stat label="Price" value={course.price} accent />
                </dl>

                {course.salaryImpact && (
                  <p className="text-[11.5px] text-white/85">
                    <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-white/65 mr-2">
                      Salary impact
                    </span>
                    <span className="tabular-nums text-emerald-300 font-semibold">
                      {course.salaryImpact}
                    </span>
                  </p>
                )}
              </motion.section>

              {/* Sections */}
              <ul className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_15%)_0%,hsl(0_0%_11%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] divide-y divide-white/[0.06] overflow-hidden">
                {sections
                  .filter((s) => s.show)
                  .map((section, idx) => (
                    <CollapsibleRow
                      key={section.id}
                      idx={idx + 1}
                      title={section.title}
                      defaultOpen={section.defaultOpen}
                    >
                      {section.body}
                    </CollapsibleRow>
                  ))}
              </ul>
            </div>
          </div>

          {/* Sticky CTA */}
          <div
            className="absolute bottom-0 left-0 right-0 px-5 sm:px-6 py-4 bg-[hsl(0_0%_8%)]/95 backdrop-blur-xl border-t border-white/[0.08]"
            style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
          >
            <div className="flex items-center gap-2">
              {onEnquire && (
                <button
                  type="button"
                  onClick={() => onEnquire(course)}
                  aria-label="Enquire"
                  className="h-11 w-11 rounded-full inline-flex items-center justify-center border border-white/15 hover:border-white/30 text-white/85 touch-manipulation transition-colors shrink-0"
                >
                  <MessageSquare className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={handleExternalLink}
                disabled={!courseUrl}
                className="flex-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-4 py-3 min-h-[44px] inline-flex items-center justify-center gap-2 touch-manipulation transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Visit course
                <ArrowRight className="h-4 w-4" />
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const Stat = ({
  label,
  value,
  accent,
}: {
  label: string;
  value: React.ReactNode;
  accent?: boolean;
}) => (
  <div className="min-w-0">
    <dt className="text-[9.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
      {label}
    </dt>
    <dd
      className={cn(
        'mt-0.5 text-[13.5px] sm:text-[14px] tabular-nums truncate',
        accent ? 'text-elec-yellow font-semibold' : 'text-white font-semibold'
      )}
    >
      {value}
    </dd>
  </div>
);

const CollapsibleRow = ({
  idx,
  title,
  defaultOpen = false,
  children,
}: {
  idx: number;
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 text-left hover:bg-white/[0.02] transition-colors touch-manipulation"
      >
        <div className="flex items-baseline gap-3 min-w-0">
          <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
            {String(idx).padStart(2, '0')}
          </span>
          <span className="text-[13.5px] font-semibold text-white truncate">{title}</span>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-white/65 shrink-0 transition-transform',
            open && 'rotate-180'
          )}
          aria-hidden
        />
      </button>
      {open && <div className="px-4 sm:px-5 pb-4">{children}</div>}
    </li>
  );
};

export default ModernCoursesDetailsModal;
