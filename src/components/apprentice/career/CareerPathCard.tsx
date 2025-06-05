
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
    <Card className="border-elec-yellow/20 bg-elec-gray h-full flex flex-col">
      <CardHeader className="flex flex-row items-start gap-4 pb-2">
        {icon}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <CardTitle className="text-xl">{title}</CardTitle>
            <BookmarkButton careerPathId={careerPathId} />
          </div>
          <p className="text-sm text-amber-400">{requirements}</p>
        </div>
      </CardHeader>
      <CardContent className="pt-2 flex-grow flex flex-col gap-4">
        <p className="text-sm">{description}</p>
        
        <div className="space-y-3 mt-auto">
          <div>
            <h4 className="text-sm font-medium text-elec-yellow">Key Skills:</h4>
            <ul className="text-xs grid grid-cols-2 gap-x-2 gap-y-1 mt-1">
              {skills.map((skill, idx) => (
                <li key={idx} className="flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-elec-yellow"></span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs border-t border-elec-yellow/10 pt-3">
            <div>
              <p className="text-elec-yellow/80">Salary Range:</p>
              <p>{salaryRange}</p>
            </div>
            <div>
              <p className="text-elec-yellow/80">Time to Achieve:</p>
              <p>{timeToAchieve}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerPathCard;
