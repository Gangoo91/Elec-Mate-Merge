
import { ReactNode } from "react";
import CourseCard from "./CourseCard";
import { LucideIcon } from "lucide-react";

export interface Course {
  id: string;
  title: string;
  description?: string;
}

export interface CourseWithSubcourses {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  courses: Course[];
  baseUrl: string;
}

interface CourseCardGridProps {
  courses: CourseWithSubcourses[];
  baseUrl?: string;
  emptyState?: ReactNode;
}

const CourseCardGrid = ({ courses, baseUrl = "", emptyState }: CourseCardGridProps) => {
  if (courses.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard 
          key={course.id} 
          id={course.id} 
          title={course.title} 
          description={course.description} 
          icon={course.icon} 
          courses={course.courses}
          baseUrl={course.baseUrl || baseUrl}
        />
      ))}
    </div>
  );
};

export default CourseCardGrid;
