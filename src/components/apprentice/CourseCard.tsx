
import { Link } from "react-router-dom";
import { ChevronRight, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  courses: string[];
}

const CourseCard = ({ id, title, description, icon: Icon, courses }: CourseCardProps) => {
  // Determine the correct URL based on the id
  const getUrlForId = (id: string) => {
    if (id === "cityGuilds") return "/apprentice/study/cityGuilds";
    if (id === "eal") return "/apprentice/study/eal";
    if (id === "ealLevel3") return "/apprentice/study/eal-level3";
    return `/apprentice/study/${id}`;
  };
  
  return (
    <Link to={getUrlForId(id)}>
      <Card className="h-full border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-colors shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-elec-yellow/10 p-3 rounded-full">
              <Icon className="h-6 w-6 text-elec-yellow" />
            </div>
            <h3 className="text-lg font-medium">{title}</h3>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          
          <div className="space-y-1">
            {courses.slice(0, 3).map((course, index) => (
              <div key={index} className="flex items-center text-sm">
                <ChevronRight className="h-4 w-4 text-elec-yellow mr-2" />
                <span className="line-clamp-1">{course}</span>
              </div>
            ))}
            {courses.length > 3 && (
              <div className="text-xs text-muted-foreground pl-6">
                +{courses.length - 3} more courses
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;
