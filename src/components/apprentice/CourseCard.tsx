
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Course } from "./CourseCardGrid";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  courses: Course[];
  baseUrl: string;
}

const CourseCard = ({ id, title, description, icon: Icon, courses, baseUrl }: CourseCardProps) => {
  return (
    <Link to={`${baseUrl}/${id}`} className="block">
      <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-colors h-full">
        <CardHeader className="pb-2">
          <div className="flex items-start space-x-4">
            <div className="bg-elec-dark/60 p-2 rounded-md">
              <Icon className="h-5 w-5 text-elec-yellow" />
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">{description}</p>
          {courses.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-elec-yellow/70 mb-2">
                Available Courses
              </p>
              <ul className="text-sm space-y-1">
                {courses.map((course) => (
                  <li key={course.id} className="text-muted-foreground">
                    • {course.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;
