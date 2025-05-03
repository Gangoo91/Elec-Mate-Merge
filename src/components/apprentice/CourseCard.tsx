
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface CourseProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  courses: string[];
}

const CourseCard = ({ id, title, icon: Icon }: CourseProps) => {
  return (
    <Link to={`/apprentice/study/${id}`}>
      <Card 
        className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-colors cursor-pointer"
      >
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3 justify-center">
            <Icon className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          {/* Empty card content for clean design */}
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;
