
import { Card } from "@/components/ui/card";
import { Book, Clock } from "lucide-react";

interface CourseInfoCardProps {
  duration: string;
  credits: string;
  assessment: string;
  studyMode: string;
}

const CourseInfoCard = ({ duration, credits, assessment, studyMode }: CourseInfoCardProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray/50 p-6 mb-8">
      <div className="flex gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-elec-yellow" />
          <div>
            <p className="text-sm font-medium">Duration</p>
            <p className="text-xs text-muted-foreground">{duration}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Book className="h-5 w-5 text-elec-yellow" />
          <div>
            <p className="text-sm font-medium">Credits</p>
            <p className="text-xs text-muted-foreground">{credits}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">Assessment</p>
          <p className="text-xs text-muted-foreground">{assessment}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Study Mode</p>
          <p className="text-xs text-muted-foreground">{studyMode}</p>
        </div>
      </div>
    </Card>
  );
};

export default CourseInfoCard;
