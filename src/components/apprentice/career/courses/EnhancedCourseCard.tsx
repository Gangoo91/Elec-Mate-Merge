import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { EnhancedCareerCourse } from './enhancedCoursesData';

interface EnhancedCourseCardProps {
  course: EnhancedCareerCourse;
  onViewDetails: (course: EnhancedCareerCourse) => void;
}

const EnhancedCourseCard = ({ course, onViewDetails }: EnhancedCourseCardProps) => {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 h-full flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          {course.category}
        </span>
        <span className="text-[12px] text-white px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono">
          {course.rating}★
        </span>
      </div>

      <div className="space-y-1">
        <h3 className="text-[17px] font-semibold text-white leading-tight">{course.title}</h3>
        <p className="text-[12px] text-white">{course.provider}</p>
      </div>

      <p className="text-[14px] text-white leading-relaxed line-clamp-4">
        {course.description}
      </p>

      <div className="grid grid-cols-2 gap-2 text-[12px] text-white">
        <div className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5">
          <span className="text-white">Duration: </span>
          {course.duration}
        </div>
        <div className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5">
          <span className="text-white">Level: </span>
          {course.level}
        </div>
        <div className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5">
          <span className="text-white">Format: </span>
          {course.format.split(',')[0]}
        </div>
        <div className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5">
          <span className="text-white">Future-proof: </span>
          {course.futureProofing || 3}/5
        </div>
      </div>

      <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1.5 text-[13px] text-white">
        <div className="flex items-center justify-between">
          <span className="text-white">Industry demand</span>
          <span>{course.industryDemand}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white">Salary impact</span>
          <span>{course.salaryImpact}</span>
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Career outcomes
        </span>
        <div className="space-y-1">
          {course.careerOutcomes?.length > 0 ? (
            <>
              {course.careerOutcomes.slice(0, 2).map((outcome, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-[13px] text-white"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{outcome}</span>
                </div>
              ))}
              {course.careerOutcomes.length > 2 && (
                <p className="text-[12px] text-white">
                  +{course.careerOutcomes.length - 2} more outcomes
                </p>
              )}
            </>
          ) : (
            <p className="text-[12px] text-white">Contact provider for details</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Available locations
        </span>
        <div className="flex flex-wrap gap-1.5">
          {course.locations?.length > 0 ? (
            <>
              {course.locations.slice(0, 4).map((location, idx) => (
                <span
                  key={idx}
                  className="text-[12px] text-white px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                >
                  {location}
                </span>
              ))}
              {course.locations.length > 4 && (
                <span className="text-[12px] text-white">
                  +{course.locations.length - 4} more
                </span>
              )}
            </>
          ) : (
            <span className="text-[12px] text-white">Contact provider for details</span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Accreditations
        </span>
        <div className="flex flex-wrap gap-1.5">
          {course.accreditation?.length > 0 ? (
            <>
              {course.accreditation.slice(0, 2).map((acc, idx) => (
                <span
                  key={idx}
                  className="text-[12px] text-white px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                >
                  {acc}
                </span>
              ))}
              {course.accreditation.length > 2 && (
                <span className="text-[12px] text-white">
                  +{course.accreditation.length - 2} more
                </span>
              )}
            </>
          ) : (
            <span className="text-[12px] text-white">Not specified by provider</span>
          )}
        </div>
      </div>

      <div className="border-t border-white/[0.06] pt-3 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Upcoming dates
        </span>
        <div className="flex flex-wrap gap-1.5">
          {course.nextDates?.length > 0 ? (
            <>
              {course.nextDates.slice(0, 3).map((date, idx) => (
                <span
                  key={idx}
                  className="text-[12px] text-white px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                >
                  {date}
                </span>
              ))}
              {course.nextDates.length > 3 && (
                <span className="text-[12px] text-white">
                  +{course.nextDates.length - 3} more
                </span>
              )}
            </>
          ) : (
            <span className="text-[12px] text-white">Contact provider for dates</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-auto pt-3 border-t border-white/[0.06]">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[14px] text-white font-mono">{course.price}</p>
            {course.employerSupport && (
              <p className="text-[11px] text-white">Employer support available</p>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex h-10 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
            onClick={() => onViewDetails(course)}
          >
            View details
          </Button>
        </div>
        <Button
          className="sm:hidden w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
          onClick={() => onViewDetails(course)}
        >
          View details
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default EnhancedCourseCard;
