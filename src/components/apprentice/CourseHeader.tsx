
import { Link } from "react-router-dom";
import { ArrowLeft, Book } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseHeaderProps {
  courseTitle?: string;
  courseSlug?: string;
  unitSlug?: string;
  selectedUnitData?: any;
}

const CourseHeader = ({ courseTitle, courseSlug, unitSlug, selectedUnitData }: CourseHeaderProps) => {
  const title = selectedUnitData ? selectedUnitData.title : courseTitle;
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          <span className="gradient-text">{title}</span>
        </h1>
        <p className="text-muted-foreground">
          EAL Level 2 course materials and learning resources
        </p>
      </div>
      <Link to="/apprentice/study/eal" className="flex-shrink-0 w-full sm:w-auto">
        <Button 
          variant="outline" 
          className="border-elec-yellow/30 hover:bg-elec-yellow/10 w-full sm:w-auto"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to EAL Courses
        </Button>
      </Link>
    </div>
  );
};

export default CourseHeader;
