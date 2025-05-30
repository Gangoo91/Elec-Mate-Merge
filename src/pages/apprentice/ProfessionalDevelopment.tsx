
import BackButton from "@/components/common/BackButton";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Award, BookOpen, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const ProfessionalDevelopment = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-4">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Professional Development</h1>
        <BackButton customUrl="/apprentice" label="Back to Apprentice Hub" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/apprentice/professional-development/career-pathways" className="group">
          <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20 h-full">
            <CardContent className="flex flex-col items-center justify-center p-6 h-full">
              <GraduationCap className="h-12 w-12 text-elec-yellow mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-xl font-bold mb-2 text-center">Career Progression Paths</h2>
              <p className="text-center text-muted-foreground text-sm">
                Explore different career advancement routes from apprentice to specialised electrician roles, including management and contracting opportunities
              </p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/apprentice/professional-development/certifications" className="group">
          <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20 h-full">
            <CardContent className="flex flex-col items-center justify-center p-6 h-full">
              <Award className="h-12 w-12 text-elec-yellow mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-xl font-bold mb-2 text-center">Professional Certifications</h2>
              <p className="text-center text-muted-foreground text-sm">
                Discover additional qualifications and certifications to enhance your electrical career, including inspection and testing qualifications
              </p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/apprentice/professional-development/continuing-education" className="group">
          <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20 h-full">
            <CardContent className="flex flex-col items-center justify-center p-6 h-full">
              <BookOpen className="h-12 w-12 text-elec-yellow mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-xl font-bold mb-2 text-center">Continuing Education</h2>
              <p className="text-center text-muted-foreground text-sm">
                Ongoing training opportunities to keep your skills current with industry standards and emerging technologies
              </p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/apprentice/professional-development/industry-networking" className="group">
          <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20 h-full">
            <CardContent className="flex flex-col items-center justify-center p-6 h-full">
              <Briefcase className="h-12 w-12 text-elec-yellow mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-xl font-bold mb-2 text-center">Industry Networking</h2>
              <p className="text-center text-muted-foreground text-sm">
                Connect with industry professionals and build your professional network through trade associations and events
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default ProfessionalDevelopment;
