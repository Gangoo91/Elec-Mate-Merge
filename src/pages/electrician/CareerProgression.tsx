
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import SimpleCareerCard from "@/components/electrician/career/SimpleCareerCard";
import CareerPathways from "@/components/electrician/career/CareerPathways";
import CareerCourses from "@/components/electrician/career/CareerCourses";
import EnhancedFurtherEducation from "@/components/electrician/career/EnhancedFurtherEducation";
import ProfessionalAccreditation from "@/components/electrician/career/ProfessionalAccreditation";
import CPDTracker from "@/components/electrician/career/CPDTracker";
import { electricianCareerSections } from "@/components/electrician/career/SectionData";

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
      default:
        return null;
    }
  };

  // Use electrician-specific career sections

  return (
    <div className="space-y-8 animate-fade-in px-2 sm:px-0">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="sr-only">Electrician Career Progression</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Advanced career development resources for qualified electricians
        </p>
        {!activeSection && (
          <Link to="/electrician" className="w-full sm:w-auto">
            <Button variant="outline" className="flex items-center gap-2 w-full">
              <ArrowLeft className="h-4 w-4" /> Back to Electrical Hub
            </Button>
          </Link>
        )}
      </div>

      {activeSection === null ? (
        <>
          {/* Career Sections Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {electricianCareerSections.map((section) => (
              <SimpleCareerCard 
                key={section.id}
                title={section.title}
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
