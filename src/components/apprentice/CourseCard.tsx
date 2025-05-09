
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
  baseUrl?: string;
}

const CourseCard = ({ id, title, icon: Icon, baseUrl = "/apprentice/study" }: CourseProps) => {
  const linkPath = `${baseUrl}/${id}`;
  
  return (
    <Link to={linkPath} className="block h-full">
      <Card 
        className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-colors cursor-pointer flex flex-col justify-center items-center py-8"
      >
        <CardHeader className="text-center pb-0 pt-0">
          <div className="flex flex-col items-center justify-center gap-4">
            <Icon className="h-10 w-10 text-elec-yellow mb-2" />
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Empty card content for clean design */}
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;
