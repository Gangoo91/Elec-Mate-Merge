
import StudyHeader from "@/components/apprentice/StudyHeader";
import CourseCardGrid from "@/components/apprentice/CourseCardGrid";
import OffJobTrainingInfo from "@/components/apprentice/OffJobTrainingInfo";
import { courseCategories } from "@/data/courseCategories";
import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ApprenticeStudy = () => {
  return (
    <div className="space-y-8 animate-fade-in px-2 md:px-0">
      <StudyHeader />
      
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-elec-yellow">Electrical Courses</h2>
        <p className="text-muted-foreground">Industry-standard qualifications for electrical professionals</p>
      </div>

      <CourseCardGrid courses={courseCategories} />
      
      <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-colors p-6 my-10">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="bg-elec-yellow/10 p-4 rounded-full">
            <GraduationCap className="h-8 w-8 text-elec-yellow" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-semibold mb-2">AI Learning Tools</h3>
            <p className="text-muted-foreground mb-4">
              Access AI-powered learning tools tailored for UK electrical apprentices
            </p>
          </div>
          <Button asChild className="w-full sm:w-auto">
            <Link to="/apprentice/study/ai-learning">
              Explore AI Tools
            </Link>
          </Button>
        </div>
      </Card>
      
      <OffJobTrainingInfo />
    </div>
  );
};

export default ApprenticeStudy;
