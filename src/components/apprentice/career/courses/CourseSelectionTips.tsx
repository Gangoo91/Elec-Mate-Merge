
import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const CourseSelectionTips = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray/50 p-4">
      <div className="flex gap-3 items-start">
        <BookOpen className="h-6 w-6 text-elec-yellow mt-1" />
        <div>
          <h3 className="font-medium text-lg mb-1">Course Selection Tips</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Choose courses that are accredited by recognised industry bodies</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Look for courses with hands-on practical components to build real-world skills</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Consider your career goals when selecting courses - focus on areas that align with your desired specialisation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Ask your employer about funding opportunities or if they offer time off for professional development</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Industry safety courses like MEWP and PASMA are valuable qualifications that can set you apart from other candidates</span>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default CourseSelectionTips;
