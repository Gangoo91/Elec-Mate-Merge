import React from 'react';
import { Link } from 'react-router-dom';
import { CARD_BASE, CARD_NEUTRAL, CARD_DISABLED } from '@/components/ui/card-recipe';
import { cn } from '@/lib/utils';

type CourseLevel =
  'Essential' | 'Foundation' | 'Intermediate' | 'Advanced' | 'Specialist' | 'Expert';

interface CourseCardProps {
  to: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  level: CourseLevel;
  duration: string;
  index?: number;
  comingSoon?: boolean;
}

/**
 * The course card. Matched to the Study Centre dashboard card in
 * `BrowseCoursesPage` — same surface, same `p-4`, same type rhythm, same
 * eyebrow with a hairline between the two bits of meta, same footer with no
 * rule above it, and the same rule about volt: it appears only where there is
 * something to say, never as decoration.
 *
 * `LEVEL_ACCENT` is gone. It mapped the six levels to six gradient strips —
 * Foundation green, Intermediate blue, Advanced violet, Expert red — which were
 * the only blues and violets in the Study Centre and belonged to no palette.
 * The level is still shown, as the eyebrow, in words. Nobody was decoding
 * "this card is violet, so it must be Advanced".
 */
export const CourseCard: React.FC<CourseCardProps> = ({
  to,
  title,
  description,
  icon: Icon,
  level,
  duration,
  index: _index = 0,
  comingSoon = false,
}) => {
  const inner = (
    <>
      {/* A 1px volt line, not a volt surface — the same treatment HubKpi uses.
          A translucent volt FILL goes muddy brown on this ground; a hairline
          stays yellow because there is nothing behind it to muddy. */}
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 to-elec-yellow/0',
          'via-elec-yellow/55'
        )}
      />

      <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
        <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />
        {level}
        <span className="h-2.5 w-px bg-white/20" aria-hidden />
        {duration}
      </span>

      <span className="mt-1.5 text-[15px] font-semibold leading-tight tracking-tight text-white">
        {title}
      </span>

      <span className="mt-1.5 line-clamp-2 text-[12.5px] leading-snug text-white">
        {description}
      </span>

      <span className="mt-3 flex items-center justify-between gap-2 text-[11.5px]">
        <span className="text-white">{comingSoon ? 'Not yet available' : 'Course'}</span>
        <span className="font-semibold text-white">{comingSoon ? 'Coming soon' : 'Open'}</span>
      </span>
    </>
  );

  if (comingSoon) {
    return (
      <div
        className={cn(
          CARD_BASE,
          CARD_DISABLED,
          'relative cursor-default overflow-hidden px-4 py-3.5 active:scale-100 sm:p-5'
        )}
      >
        {inner}
      </div>
    );
  }

  return (
    <Link
      to={to}
      aria-label={`View ${title} course`}
      className={cn(
        CARD_BASE,
        CARD_NEUTRAL,
        'relative overflow-hidden px-4 py-3.5 sm:p-5 lg:hover:-translate-y-0.5'
      )}
    >
      {inner}
    </Link>
  );
};

export default CourseCard;
