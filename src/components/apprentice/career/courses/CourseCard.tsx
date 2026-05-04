import { Button } from '@/components/ui/button';

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    provider: string;
    description: string;
    duration: string;
    level: string;
    price: string;
    format: string;
    nextDates: string[];
    rating: number;
    locations: string[];
  };
  onViewDetails: (course: any) => void;
}

const CourseCard = ({ course, onViewDetails }: CourseCardProps) => {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 h-full flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            {course.provider}
          </span>
          <h3 className="text-[17px] font-semibold text-white leading-tight">{course.title}</h3>
        </div>
        <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono">
          {course.rating}★
        </span>
      </div>

      <p className="text-[14px] text-white/85 leading-relaxed line-clamp-2">{course.description}</p>

      <div className="mt-auto space-y-3">
        <div className="grid grid-cols-2 gap-2 text-[12px] text-white/85">
          <div className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5">
            <span className="text-white/55">Duration: </span>
            {course.duration}
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5">
            <span className="text-white/55">Level: </span>
            {course.level}
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5 col-span-2">
            <span className="text-white/55">Format: </span>
            {course.format}
          </div>
        </div>

        <div className="text-[12px] text-white/70 line-clamp-1">
          <span className="text-white/55">Locations: </span>
          {course.locations.slice(0, 3).join(', ')}
          {course.locations.length > 3 ? `, +${course.locations.length - 3}` : ''}
        </div>

        <div className="border-t border-white/[0.06] pt-3 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Upcoming dates
          </span>
          <div className="flex flex-wrap gap-1.5">
            {course.nextDates.map((date, idx) => (
              <span
                key={idx}
                className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
              >
                {date}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="text-[14px] text-white font-mono">{course.price}</span>
            <Button
              variant="outline"
              size="sm"
              className="h-9 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
              onClick={() => onViewDetails(course)}
            >
              View details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
