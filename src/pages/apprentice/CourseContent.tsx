
import BackButton from "@/components/common/BackButton";
import { Card, CardContent } from "@/components/ui/card";
import { Book, GraduationCap, FileText } from "lucide-react";

const CourseContent = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-4">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Course Content</h1>
        <BackButton customUrl="/apprentice/study" label="Back to Study Centre" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <Book className="h-12 w-12 text-elec-yellow mb-4" />
            <h2 className="text-xl font-bold mb-2">Core Modules</h2>
            <p className="text-centre text-muted-foreground">
              Essential electrical theory and practice
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <GraduationCap className="h-12 w-12 text-elec-yellow mb-4" />
            <h2 className="text-xl font-bold mb-2">Technical Certifications</h2>
            <p className="text-centre text-muted-foreground">
              Specialised certification paths for electrical professionals
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <FileText className="h-12 w-12 text-elec-yellow mb-4" />
            <h2 className="text-xl font-bold mb-2">Study Materials</h2>
            <p className="text-centre text-muted-foreground">
              Comprehensive resources and learning guides
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 p-6 border border-elec-yellow/20 rounded-md bg-elec-gray/50">
        <h3 className="text-xl font-bold mb-4">Getting Started with Your Course</h3>
        <p>
          Welcome to your electrical coursework! This section provides access to your core curriculum,
          technical certification paths, and supplementary study materials designed to support your
          learning journey. Select a category above to explore the available content.
        </p>
      </div>
    </div>
  );
};

export default CourseContent;
