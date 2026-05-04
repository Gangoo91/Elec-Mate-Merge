import { Button } from '@/components/ui/button';
import { EnhancedTrainingCenter } from './enhancedCoursesData';

interface EnhancedTrainingCenterCardProps {
  center: EnhancedTrainingCenter;
  onViewDetails: (center: EnhancedTrainingCenter) => void;
}

const EnhancedTrainingCenterCard = ({ center, onViewDetails }: EnhancedTrainingCenterCardProps) => {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            {center.location}
          </span>
          <h3 className="text-[18px] font-semibold text-white leading-tight">{center.name}</h3>
        </div>
        <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono self-start">
          {center.rating}★
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Established
          </span>
          <div className="text-[14px] font-semibold text-white">{center.establishedYear}</div>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Success rate
          </span>
          <div className="text-[14px] font-semibold text-white">{center.successRate}%</div>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Employment
          </span>
          <div className="text-[14px] font-semibold text-white">{center.employmentRate}%</div>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Capacity
          </span>
          <div className="text-[14px] font-semibold text-white">{center.studentCapacity}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Key courses offered
          </span>
          <ul className="space-y-1.5">
            {center.courses.slice(0, 4).map((course, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[13px] text-white/85">
                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                <span>{course}</span>
              </li>
            ))}
            {center.courses.length > 4 && (
              <li className="text-[12px] text-white/55">
                +{center.courses.length - 4} additional courses
              </li>
            )}
          </ul>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Specialisations
          </span>
          <div className="flex flex-wrap gap-1.5">
            {center.specialisations.map((spec, idx) => (
              <span
                key={idx}
                className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Accreditations
          </span>
          <div className="flex flex-wrap gap-1.5">
            {center.accreditations.map((acc, idx) => (
              <span
                key={idx}
                className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
              >
                {acc}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Support services
          </span>
          <ul className="space-y-1.5">
            {center.supportServices.slice(0, 3).map((service, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[13px] text-white/85">
                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                <span>{service}</span>
              </li>
            ))}
            {center.supportServices.length > 3 && (
              <li className="text-[12px] text-white/55">
                +{center.supportServices.length - 3} more services
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Contact
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[13px] text-white/85">
          <div className="space-y-1">
            <p>{center.address}</p>
            <p>{center.contact}</p>
          </div>
          <div className="space-y-2">
            <p>{center.website}</p>
            <Button
              variant="outline"
              size="sm"
              className="h-10 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
              onClick={() => onViewDetails(center)}
            >
              View full details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTrainingCenterCard;
