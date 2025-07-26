
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseCard from "./CourseCard";

interface Course {
  id: number;
  title: string;
  progress?: number;
  students?: number;
  category: string;
  image: string;
}

interface CourseTabsProps {
  recentCourses: Course[];
  popularCourses: Course[];
}

const CourseTabs = ({ recentCourses, popularCourses }: CourseTabsProps) => {
  return (
    <Tabs defaultValue="recent" className="space-y-3 md:space-y-4">
      <TabsList className="bg-elec-gray border border-elec-yellow/20 w-full">
        <TabsTrigger value="recent" className="flex-1 text-xs sm:text-sm">Recently Added</TabsTrigger>
        <TabsTrigger value="popular" className="flex-1 text-xs sm:text-sm">Most Popular</TabsTrigger>
      </TabsList>
      
      <TabsContent value="recent" className="space-y-3 md:space-y-4">
        <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {recentCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              progress={course.progress}
              category={course.category}
              image={course.image}
            />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="popular" className="space-y-3 md:space-y-4">
        <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {popularCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              students={course.students}
              category={course.category}
              image={course.image}
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default CourseTabs;
