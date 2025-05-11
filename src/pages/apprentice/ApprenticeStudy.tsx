
import StudyHeader from "@/components/apprentice/StudyHeader";
import CourseCardGrid from "@/components/apprentice/CourseCardGrid";
import OffJobTrainingInfo from "@/components/apprentice/OffJobTrainingInfo";
import { courseCategories } from "@/data/courseCategories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { GraduationCap, Shield, FileText } from "lucide-react";

const ApprenticeStudy = () => {
  return (
    <div className="space-y-8 animate-fade-in px-2 md:px-0">
      <StudyHeader />
      
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-elec-yellow">Electrical Courses</h2>
        <p className="text-muted-foreground">Industry-standard qualifications for electrical professionals</p>
      </div>

      <CourseCardGrid courses={courseCategories} baseUrl="/apprentice/study" />
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link to="/apprentice/study/ai-learning" className="block h-full">
          <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-colors cursor-pointer flex flex-col justify-center items-center py-8">
            <CardHeader className="text-center pb-0 pt-0">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="bg-elec-yellow/10 p-4 rounded-full">
                  <GraduationCap className="h-8 w-8 text-elec-yellow" />
                </div>
                <CardTitle className="text-xl font-bold">AI Learning Tools</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {/* Empty card content for clean design */}
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/apprentice/study/mock-exams" className="block h-full">
          <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-colors cursor-pointer flex flex-col justify-center items-center py-8">
            <CardHeader className="text-center pb-0 pt-0">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="bg-elec-yellow/10 p-4 rounded-full">
                  <FileText className="h-8 w-8 text-elec-yellow" />
                </div>
                <CardTitle className="text-xl font-bold">Mock Exams</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {/* Empty card content for clean design */}
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/apprentice/safety-fundamentals" className="block h-full">
          <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-colors cursor-pointer flex flex-col justify-center items-center py-8">
            <CardHeader className="text-center pb-0 pt-0">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="bg-elec-yellow/10 p-4 rounded-full">
                  <Shield className="h-8 w-8 text-elec-yellow" />
                </div>
                <CardTitle className="text-xl font-bold">Safety Fundamentals</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {/* Empty card content for clean design */}
            </CardContent>
          </Card>
        </Link>
      </div>
      
      <OffJobTrainingInfo />
    </div>
  );
};

export default ApprenticeStudy;
