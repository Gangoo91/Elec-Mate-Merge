
import { BookOpen } from "lucide-react";

const CourseInfoBox = () => {
  return (
    <div className="text-sm text-muted-foreground bg-elec-gray border border-elec-yellow/20 rounded-md p-4">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="h-4 w-4 text-elec-yellow" />
        <p className="font-medium">Off-the-Job Training Info</p>
      </div>
      <p>
        EAL Level 2 electrical courses require a minimum of 20% off-the-job training, equating to at least 278 hours over a 12-month period. 
        Your time spent learning on this app is automatically tracked in the Off-the-Job Time Keeping section.
      </p>
    </div>
  );
};

export default CourseInfoBox;
