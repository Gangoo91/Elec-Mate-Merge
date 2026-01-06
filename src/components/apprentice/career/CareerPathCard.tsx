
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import BookmarkButton from "@/components/career/BookmarkButton";

interface CareerPathCardProps {
  title: string;
  requirements: string;
  description: string;
  icon: ReactNode;
  skills: string[];
  salaryRange: string;
  timeToAchieve: string;
}

const CareerPathCard = ({
  title,
  requirements,
  description,
  icon,
  skills,
  salaryRange,
  timeToAchieve
}: CareerPathCardProps) => {
  // Generate a consistent ID from the title
  const careerPathId = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  return (
    <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 hover:border-elec-yellow/40 transition-all h-full flex flex-col overflow-hidden relative animate-fade-in">
      <div className="absolute top-0 right-0 w-48 h-48 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <CardHeader className="flex flex-row items-start gap-4 pb-2 relative">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30 flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <CardTitle className="text-xl text-white">{title}</CardTitle>
            <BookmarkButton careerPathId={careerPathId} />
          </div>
          <p className="text-sm text-amber-400">{requirements}</p>
        </div>
      </CardHeader>
      <CardContent className="pt-2 flex-grow flex flex-col gap-4 relative">
        <p className="text-sm text-white/80">{description}</p>

        <div className="space-y-3 mt-auto">
          <div>
            <h4 className="text-sm font-medium text-elec-yellow">Key Skills:</h4>
            <ul className="text-xs grid grid-cols-2 gap-x-2 gap-y-1 mt-1">
              {skills.map((skill, idx) => (
                <li key={idx} className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow flex-shrink-0"></span>
                  <span className="text-white/80">{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs border-t border-elec-yellow/20 pt-3">
            <div>
              <p className="text-elec-yellow">Salary Range:</p>
              <p className="text-white font-medium">{salaryRange}</p>
            </div>
            <div>
              <p className="text-elec-yellow">Time to Achieve:</p>
              <p className="text-white font-medium">{timeToAchieve}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerPathCard;
