
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import all the component files
import CareerSectionCard from "@/components/apprentice/career/CareerSectionCard";
import CareerPathways from "@/components/apprentice/career/CareerPathways";
import CareerCourses from "@/components/apprentice/career/CareerCourses";
import FurtherEducation from "@/components/apprentice/career/FurtherEducation";
import ProfessionalAccreditation from "@/components/apprentice/career/ProfessionalAccreditation";
import BusinessBuilder from "@/components/electrician/business/BusinessBuilder";
import CareerWelcomeState from "@/components/apprentice/career/CareerWelcomeState";
import CareerPageHeader from "@/components/apprentice/career/CareerPageHeader";
import InteractiveCareerRoadmap from "@/components/career/InteractiveCareerRoadmap";
import FavoritesPanel from "@/components/career/FavoritesPanel";
import { careerSections } from "@/components/apprentice/career/SectionData";
import { useIsMobile } from "@/hooks/use-mobile";

const CareerProgression = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Handle back to sections
  const handleBackToSections = () => {
    setActiveSection(null);
  };

  // Render active section content
  const renderSectionContent = () => {
    switch (activeSection) {
      case "pathways":
        return <CareerPathways />;
      case "courses":
        return <CareerCourses />;
      case "education":
        return <FurtherEducation />;
      case "accreditation":
        return <ProfessionalAccreditation />;
      case "business":
        return <BusinessBuilder />;
      default:
        return <CareerWelcomeState />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in px-2 sm:px-0">
      <CareerPageHeader 
        activeSection={activeSection} 
        onBackToSections={handleBackToSections} 
      />

      {activeSection === null ? (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-elec-dark border border-elec-yellow/20">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <CareerWelcomeState />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InteractiveCareerRoadmap />
              <FavoritesPanel onSelectPath={(pathId) => console.log('Navigate to:', pathId)} />
            </div>
          </TabsContent>

          <TabsContent value="roadmap">
            <InteractiveCareerRoadmap />
          </TabsContent>

          <TabsContent value="sections">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {careerSections.map((section) => (
                <CareerSectionCard 
                  key={section.id}
                  title={section.title}
                  description={section.description}
                  icon={section.icon}
                  onClick={() => setActiveSection(section.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <FavoritesPanel onSelectPath={(pathId) => console.log('Navigate to:', pathId)} />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="space-y-4">
          {renderSectionContent()}
        </div>
      )}
    </div>
  );
};

export default CareerProgression;
