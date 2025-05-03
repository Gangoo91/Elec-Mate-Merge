
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface CourseProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  courses: string[];
}

const CourseCard = ({ id, title, description, icon: Icon, courses }: CourseProps) => {
  return (
    <Card 
      className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-colors cursor-pointer"
    >
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <Icon className="h-6 w-6 text-elec-yellow" />
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 mt-2">
          {courses.map((course, index) => (
            <div 
              key={index}
              className="text-sm p-2 rounded-md bg-elec-dark flex justify-between items-center"
            >
              <span>{course}</span>
              <span className="text-xs text-elec-yellow">Off-the-job eligible</span>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button variant="default" size="sm" className="w-full">
            View All {title}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
