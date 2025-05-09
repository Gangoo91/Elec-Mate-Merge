
import StudyHeader from "@/components/apprentice/StudyHeader";
import CourseCard from "@/components/apprentice/CourseCard";
import OffJobTrainingInfo from "@/components/apprentice/OffJobTrainingInfo";
import { courseCategories } from "@/data/courseCategories";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { School, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const ApprenticeStudy = () => {
  return (
    <div className="space-y-8 animate-fade-in px-2 md:px-0">
      <StudyHeader />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseCategories.map((category) => (
          <CourseCard 
            key={category.id}
            id={category.id}
            title={category.title}
            description={category.description}
            icon={category.icon}
            courses={category.courses}
          />
        ))}
        
        {/* Higher Education Card */}
        <Link to="/apprentice/study/higher" className="focus:outline-none">
          <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-colors cursor-pointer">
            <CardHeader className="flex flex-col items-center justify-center text-center">
              <School className="h-8 w-8 text-elec-yellow mb-2" />
              <CardTitle className="text-xl">Higher Education</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                HNC, HND and degree level courses to advance your career
              </p>
              <Button variant="default" className="w-full">
                View Courses
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>
      
      <OffJobTrainingInfo />
    </div>
  );
};

export default ApprenticeStudy;
