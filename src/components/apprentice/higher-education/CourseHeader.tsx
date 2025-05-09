
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface CourseHeaderProps {
  title: string;
  subtitle: string;
}

const CourseHeader = ({ title, subtitle }: CourseHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <div>
        <Link to="/apprentice/study/higher" className="flex items-center text-muted-foreground hover:text-elec-yellow mb-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Higher Education
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-1">{subtitle}</p>
      </div>
    </div>
  );
};

export default CourseHeader;
