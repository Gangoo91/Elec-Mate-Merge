
import BackButton from "@/components/common/BackButton";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Camera, FileText, Clock } from "lucide-react";

const OnSiteSkills = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-4">
        <h1 className="text-3xl font-bold tracking-tight mb-4">On-Site Apprenticeship Skills</h1>
        <BackButton customUrl="/apprentice/study" label="Back to Study Centre" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <Clock className="h-12 w-12 text-elec-yellow mb-4" />
            <h2 className="text-xl font-bold mb-2">How to log off-the-job learning properly</h2>
            <p className="text-center text-muted-foreground">
              Best practices for tracking and documenting your off-the-job learning hours
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <Camera className="h-12 w-12 text-elec-yellow mb-4" />
            <h2 className="text-xl font-bold mb-2">Evidence gathering tips</h2>
            <p className="text-center text-muted-foreground">
              Photos, logs, witness statements and other portfolio evidence techniques
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <FileText className="h-12 w-12 text-elec-yellow mb-4" />
            <h2 className="text-xl font-bold mb-2">Common mistakes in portfolios</h2>
            <p className="text-center text-muted-foreground">
              How to avoid typical portfolio errors and ensure assessment success
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <Briefcase className="h-12 w-12 text-elec-yellow mb-4" />
            <h2 className="text-xl font-bold mb-2">Soft skills development</h2>
            <p className="text-center text-muted-foreground">
              Client communication, timekeeping, and workplace professionalism
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnSiteSkills;
