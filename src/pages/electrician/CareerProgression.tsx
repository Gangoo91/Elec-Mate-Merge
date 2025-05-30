
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import CareerSectionCard from "@/components/apprentice/career/CareerSectionCard";
import CareerPathways from "@/components/apprentice/career/CareerPathways";
import CareerCourses from "@/components/apprentice/career/CareerCourses";
import FurtherEducation from "@/components/apprentice/career/FurtherEducation";
import ProfessionalAccreditation from "@/components/apprentice/career/ProfessionalAccreditation";
import { careerSections } from "@/components/apprentice/career/SectionData";

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
      default:
        return (
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2 text-white">Welcome to Electrician Career Progression</h3>
              <p className="text-muted-foreground mb-4">
                Advance your electrical career with specialized resources designed for qualified electricians.
                Explore advanced certifications, business development opportunities, and leadership roles.
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  // Filter sections to exclude business (since it's handled separately in electrical hub)
  const electricianCareerSections = careerSections.filter(section => section.id !== "business");

  return (
    <div className="space-y-8 animate-fade-in px-2 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
            <GraduationCap className="h-7 w-7 sm:h-8 sm:w-8 text-elec-yellow" />
            Electrician Career Progression
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Advanced career development resources for qualified electricians
          </p>
        </div>
        {activeSection ? (
          <Button 
            variant="outline" 
            className="flex items-center gap-2 w-full sm:w-auto" 
            onClick={handleBackToSections}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Career Sections
          </Button>
        ) : (
          <Link to="/electrician" className="w-full sm:w-auto">
            <Button variant="outline" className="flex items-center gap-2 w-full">
              <ArrowLeft className="h-4 w-4" /> Back to Electrical Hub
            </Button>
          </Link>
        )}
      </div>

      {activeSection === null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {electricianCareerSections.map((section) => (
            <CareerSectionCard 
              key={section.id}
              title={section.title}
              description={section.description}
              icon={section.icon}
              onClick={() => setActiveSection(section.id)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {renderSectionContent()}
        </div>
      )}
    </div>
  );
};

export default CareerProgression;
