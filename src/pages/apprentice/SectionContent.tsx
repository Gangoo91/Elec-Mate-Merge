
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LearningBackButton from "@/components/apprentice/navigation/LearningBackButton";
import { useSectionContent } from "@/hooks/useSectionContent";

const SectionContent = () => {
  const { courseSlug, unitSlug, sectionId } = useParams();
  const { sectionData } = useSectionContent({ courseSlug, unitSlug, sectionId });
  
  const handleResourceClick = (type: string) => {
    // This would typically log or track resource usage
    console.log(`Resource of type ${type} clicked`);
  };
  
  // Default content for when data is missing
  return (
    <div className="space-y-6 animate-fade-in bg-[#121212] px-4 md:px-6">
      <div className="max-w-4xl mx-auto pt-8">
        <LearningBackButton
          currentPath="section"
          courseSlug={courseSlug}
          unitSlug={unitSlug}
          sectionId={sectionId}
        />
        
        <div className="max-w-4xl mx-auto py-12 text-center">
          <h1 className="text-2xl font-bold text-elec-yellow mb-6">Ready for New Content</h1>
          <p className="text-elec-light/80 mb-8">
            This section is ready to be populated with new course materials.
          </p>
          <Link to={`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}`}>
            <Button 
              variant="outline" 
              className="border-elec-yellow/30 hover:bg-elec-yellow/10"
            >
              Return to Unit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SectionContent;
