
import { useState } from "react";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CareerSectionCard from "@/components/apprentice/career/CareerSectionCard";
import CareerPathways from "@/components/apprentice/career/CareerPathways";
import CareerCourses from "@/components/apprentice/career/CareerCourses";
import EnhancedFurtherEducation from "@/components/apprentice/career/EnhancedFurtherEducation";
import ProfessionalAccreditation from "@/components/apprentice/career/ProfessionalAccreditation";
import CPDTracker from "@/components/apprentice/career/cpd/CPDTracker";
import BusinessBuilder from "@/components/electrician/business/BusinessBuilder";
import { careerSections } from "@/components/apprentice/career/SectionData";

const CareerProgression = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  const handleBackToSections = () => {
    setActiveSection(null);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "pathways":
        return <CareerPathways />;
      case "courses":
        return <CareerCourses />;
      case "education":
        return <EnhancedFurtherEducation />;
      case "accreditation":
        return <ProfessionalAccreditation />;
      case "cpd":
        return <CPDTracker />;
      case "business":
        return <BusinessBuilder />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
            <GraduationCap className="h-7 w-7 sm:h-8 sm:w-8 text-elec-yellow" />
            Career Progression
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            Explore career advancement opportunities and build your professional development pathway
          </p>
        </div>
        {activeSection && (
          <Button 
            variant="outline" 
            className="flex items-center gap-2 w-full sm:w-auto" 
            onClick={handleBackToSections}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Career Sections
          </Button>
        )}
      </div>

      {activeSection === null ? (
        <>
          {/* Welcome Section */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-6 text-centre">
              <h2 className="text-xl font-semibold mb-3 text-white">
                Welcome to Your Career Development Hub
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The electrical industry offers diverse career paths with excellent opportunities for advancement. 
                Explore our comprehensive resources to help you navigate your professional journey, from apprentice 
                to specialist roles and beyond. Each section provides targeted guidance to support your career goals.
              </p>
            </CardContent>
          </Card>

          {/* Career Sections Grid */}
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

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-elec-yellow/20 bg-elec-gray/50">
              <CardContent className="p-4 text-centre">
                <div className="text-2xl font-bold text-elec-yellow">12+</div>
                <div className="text-sm text-muted-foreground">Career Pathways</div>
              </CardContent>
            </Card>
            <Card className="border-elec-yellow/20 bg-elec-gray/50">
              <CardContent className="p-4 text-centre">
                <div className="text-2xl font-bold text-elec-yellow">50+</div>
                <div className="text-sm text-muted-foreground">Training Courses</div>
              </CardContent>
            </Card>
            <Card className="border-elec-yellow/20 bg-elec-gray/50">
              <CardContent className="p-4 text-centre">
                <div className="text-2xl font-bold text-elec-yellow">£25k-£80k+</div>
                <div className="text-sm text-muted-foreground">Salary Range</div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          {renderSectionContent()}
        </div>
      )}
    </div>
  );
};

export default CareerProgression;
