
import { Card, CardContent } from "@/components/ui/card";
import { School, GraduationCap } from "lucide-react";
import { courseCategories } from "@/data/courseCategories";
import EnhancedFurtherEducation from "@/components/apprentice/career/EnhancedFurtherEducation";
import { SmartBackButton } from "@/components/ui/smart-back-button";

const HigherLearningCourses = () => {
  // Find the higher learning courses category
  const higherCategory = courseCategories.find(category => category.id === "higher");
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            <span className="gradient-text">Higher Learning Courses</span>
          </h1>
          <p className="text-white/70 text-sm sm:text-base">
            Advanced qualification pathways for electrical professionals
          </p>
        </div>
<SmartBackButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {higherCategory?.courses.map((course, index) => (
          <Card 
            key={index}
            className="border-elec-yellow/30 bg-gradient-to-b from-elec-yellow/10 to-elec-yellow/5 hover:from-elec-yellow/15 hover:to-elec-yellow/10 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full"
          >
            <CardContent className="flex flex-col items-center justify-center p-6 h-full">
              {course.includes("HNC") ? (
                <School className="h-8 w-8 text-elec-yellow mb-4 opacity-80" />
              ) : (
                <GraduationCap className="h-8 w-8 text-elec-yellow mb-4 opacity-80" />
              )}
              <h3 className="text-base sm:text-lg font-medium text-centre">
                {course}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Display detailed information about higher education options */}
      <div className="mt-12 pt-8 border-t border-elec-yellow/20">
        <h2 className="text-2xl font-bold mb-6">Further Education Pathways</h2>
        <EnhancedFurtherEducation />
      </div>
    </div>
  );
};

export default HigherLearningCourses;
