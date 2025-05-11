
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, BookOpen, Users } from "lucide-react";
import { HealthSafetyUnit } from "@/components/apprentice/units";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BackButton from "@/components/common/BackButton";
import { useSectionContent } from "@/hooks/useSectionContent";

const SectionContent = () => {
  const { courseSlug, unitSlug, sectionId } = useParams();
  
  const { sectionData, loading, handleBackClick } = useSectionContent({
    courseSlug,
    unitSlug,
    sectionId
  });
  
  const handleResourceClick = (type: string) => {
    // This would typically log or track resource usage
    console.log(`Resource of type ${type} clicked`);
  };
  
  const renderUnitContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-pulse">Loading section content...</div>
        </div>
      );
    }
    
    if (!sectionData) {
      return (
        <div className="max-w-4xl mx-auto py-12 text-center">
          <h1 className="text-2xl font-bold text-elec-yellow mb-6">Content Being Updated</h1>
          <p className="text-elec-light/80 mb-8">
            This section content is currently being redeveloped. Please check back soon for the updated materials.
          </p>
          <BackButton 
            courseSlug={courseSlug} 
            unitSlug={unitSlug}
          />
        </div>
      );
    }
    
    return (
      <div className="space-y-6 mt-6">
        <h2 className="text-xl md:text-2xl font-bold text-elec-yellow">{sectionData.title}</h2>
        <p className="text-elec-light/80">
          {sectionData.content.introduction}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {sectionData.content.subsections.map((subsection) => (
            <Card 
              key={subsection.id} 
              className="border-elec-yellow/30 bg-elec-gray p-6 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20"
            >
              <Link 
                to={`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/section/${sectionId}/subsection/${subsection.id}`}
                onClick={() => handleResourceClick('learning')}
                className="block h-full"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                      <subsection.icon className="h-6 w-6 text-elec-yellow" />
                    </div>
                    <CardTitle className="text-lg">{subsection.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-elec-light/80">
                    {subsection.description}
                  </CardDescription>
                  <div className="flex justify-end mt-4">
                    <BookOpen className="h-5 w-5 text-elec-yellow opacity-70" />
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-6 animate-fade-in bg-elec-gray/20 px-4 md:px-6 py-6 rounded-lg max-w-7xl mx-auto">
      {/* Back button to go to the unit sections page - making sure props get passed correctly */}
      <div className="max-w-7xl mx-auto">
        <BackButton 
          courseSlug={courseSlug} 
          unitSlug={unitSlug} 
        />
      </div>
      {renderUnitContent()}
    </div>
  );
};

export default SectionContent;
