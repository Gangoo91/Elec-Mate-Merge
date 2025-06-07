
import { useState } from "react";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import CareerSectionCard from "@/components/apprentice/career/CareerSectionCard";
import CareerPathways from "@/components/apprentice/career/CareerPathways";
import CareerCourses from "@/components/apprentice/career/CareerCourses";
import EnhancedFurtherEducation from "@/components/apprentice/career/EnhancedFurtherEducation";
import ProfessionalAccreditation from "@/components/apprentice/career/ProfessionalAccreditation";
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
      default:
        return null;
    }
  };

  // Filter sections to exclude business (since it's handled separately in electrical hub)
  const electricianCareerSections = careerSections.filter(section => section.id !== "business");

  return (
    <div className="space-y-8 animate-fade-in px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
            <GraduationCap className="h-7 w-7 sm:h-8 sm:w-8 text-elec-yellow" />
            Electrician Career Progression
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
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
        <>
          {/* Welcome Section */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-semibold mb-3 text-white">
                Advance Your Electrical Career
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Take your electrical career to the next level with specialised resources designed for qualified electricians. 
                Explore advanced certifications, leadership opportunities, and business development pathways to achieve 
                your professional goals and maximise your earning potential.
              </p>
            </CardContent>
          </Card>

          {/* Career Sections Grid */}
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

          {/* Professional Development Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-elec-yellow/20 bg-elec-gray/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-elec-yellow">10+</div>
                <div className="text-sm text-muted-foreground">Advanced Pathways</div>
              </CardContent>
            </Card>
            <Card className="border-elec-yellow/20 bg-elec-gray/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-elec-yellow">30+</div>
                <div className="text-sm text-muted-foreground">Professional Courses</div>
              </CardContent>
            </Card>
            <Card className="border-elec-yellow/20 bg-elec-gray/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-elec-yellow">£35k-£80k+</div>
                <div className="text-sm text-muted-foreground">Professional Range</div>
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
