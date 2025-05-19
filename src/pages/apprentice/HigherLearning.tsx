
import BackButton from "@/components/common/BackButton";
import { Card, CardContent } from "@/components/ui/card";
import { School, Award, BookOpen } from "lucide-react";

const HigherLearning = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-4">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Higher Learning</h1>
        <BackButton customUrl="/apprentice/study" label="Back to Study Centre" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <School className="h-12 w-12 text-elec-yellow mb-4" />
            <h2 className="text-xl font-bold mb-2">HNC Electrical Engineering</h2>
            <p className="text-center text-muted-foreground">
              Higher National Certificate in Electrical Engineering
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <Award className="h-12 w-12 text-elec-yellow mb-4" />
            <h2 className="text-xl font-bold mb-2">HND Electrical Engineering</h2>
            <p className="text-center text-muted-foreground">
              Higher National Diploma in Electrical Engineering
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <BookOpen className="h-12 w-12 text-elec-yellow mb-4" />
            <h2 className="text-xl font-bold mb-2">BSc Electrical Engineering</h2>
            <p className="text-center text-muted-foreground">
              Bachelor of Science in Electrical Engineering
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 p-6 border border-elec-yellow/20 rounded-md bg-elec-gray/50">
        <h3 className="text-xl font-bold mb-4">Advanced Qualification Pathways</h3>
        <p className="mb-4">
          Higher learning qualifications provide opportunities to advance your electrical career 
          through formal academic and vocational routes. These qualifications can open doors to 
          senior technical roles, management positions, and specialized engineering fields.
        </p>
        <p>
          Each pathway offers a structured curriculum designed to build on your existing skills 
          while introducing advanced concepts and methodologies relevant to the electrical industry.
        </p>
      </div>
    </div>
  );
};

export default HigherLearning;
