
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, BookOpen, Users } from "lucide-react";
import { HealthSafetyUnit } from "@/components/apprentice/units";
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
  
  const renderUnitContent = () => {
    if (unitSlug === 'elec2-01-health-and-safety-in-electrical-installations' && sectionId === "1") {
      // For Health and Safety Unit Section 1 - specific content for this section only
      return (
        <div className="space-y-6 mt-6">
          <h2 className="text-xl md:text-2xl font-bold text-elec-yellow">
            {sectionData?.title || "Health and Safety in Electrical Work"}
          </h2>
          <p className="text-elec-light/80">
            This section covers the key legislation and regulations that govern health and safety in electrical work, 
            along with the roles and responsibilities of different stakeholders in maintaining a safe work environment.
          </p>
          
          {/* Subsections for Section 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {sectionData?.content?.subsections?.map((subsection) => (
              <Card key={subsection.id} className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20">
                <Link 
                  to={`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/section/${sectionId}/subsection/${subsection.id}`}
                  onClick={() => handleResourceClick('learning')}
                  className="block h-full"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow flex items-center justify-center">
                        {subsection.id === "1.1" ? (
                          <Shield className="h-5 w-5 text-elec-dark" />
                        ) : (
                          <Users className="h-5 w-5 text-elec-dark" />
                        )}
                      </div>
                      <CardTitle className="text-lg">{subsection.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-elec-light/80">
                      {subsection.id === "1.1" ? 
                        "Study of key health and safety laws relevant to electrical work, including the Health and Safety at Work Act, Electricity at Work Regulations, and COSHH." : 
                        "Identification of duties for employers, employees, and other stakeholders in maintaining a safe working environment."}
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
    } else if (unitSlug && unitSlug.includes('elec2-01') && sectionData) {
      // For other Health and Safety sections, show subsections in a grid
      return (
        <div className="space-y-6 mt-6">
          <h2 className="text-xl md:text-2xl font-bold text-elec-yellow">{sectionData.title}</h2>
          <p className="text-elec-light/80">{sectionData.description || "Section content"}</p>
          
          {/* Display subsections in a grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {sectionData?.content?.subsections?.map((subsection) => (
              <Card key={subsection.id} className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20">
                <Link 
                  to={`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/section/${sectionId}/subsection/${subsection.id}`}
                  onClick={() => handleResourceClick('learning')}
                  className="block h-full"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{subsection.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-elec-light/80">
                      {subsection.description || "Click to view this subsection's content"}
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
    }
    
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold text-elec-yellow mb-6">Content Being Updated</h1>
        <p className="text-elec-light/80 mb-8">
          This section content is currently being redeveloped. Please check back soon for the updated materials.
        </p>
        <Link to={`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}`}>
          <Button 
            variant="outline" 
            className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          >
            Return to Unit Sections
          </Button>
        </Link>
      </div>
    );
  };
  
  return (
    <div className="space-y-6 animate-fade-in bg-[#121212] px-4 md:px-6">
      <div className="max-w-4xl mx-auto pt-8">
        <LearningBackButton
          currentPath="section"
          courseSlug={courseSlug}
          unitSlug={unitSlug}
          sectionId={sectionId}
        />
        {renderUnitContent()}
      </div>
    </div>
  );
};

export default SectionContent;
