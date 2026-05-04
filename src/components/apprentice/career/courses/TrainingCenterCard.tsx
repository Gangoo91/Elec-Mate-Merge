import { Button } from '@/components/ui/button';

interface TrainingCenterCardProps {
  center: {
    id: number;
    name: string;
    location: string;
    address: string;
    contact: string;
    courses: string[];
    facilities: string[];
  };
  onViewDetails: (center: any) => void;
}

const TrainingCenterCard = ({ center, onViewDetails }: TrainingCenterCardProps) => {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            {center.location}
          </span>
          <h3 className="text-[18px] font-semibold text-white leading-tight">{center.name}</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-10 border-white/15 text-white hover:bg-white/[0.05] self-start touch-manipulation"
          onClick={() => onViewDetails(center)}
        >
          View centre details
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Available courses
          </span>
          <ul className="space-y-1.5">
            {center.courses.map((course, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[13px] text-white/85">
                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                <span>{course}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Facilities
          </span>
          <ul className="space-y-1.5">
            {center.facilities.map((facility, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[13px] text-white/85">
                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                <span>{facility}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrainingCenterCard;
