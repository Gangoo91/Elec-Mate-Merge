
import BackButton from "@/components/common/BackButton";
import { Card, CardContent } from "@/components/ui/card";
import { Library } from "lucide-react";

const EighteenthEdition = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-4">
        <h1 className="text-3xl font-bold tracking-tight mb-4">18th Edition (BS 7671)</h1>
        <BackButton customUrl="/apprentice/study" label="Back to Study Centre" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <Library className="h-12 w-12 text-elec-yellow mb-4" />
            <h2 className="text-xl font-bold mb-2">Part 1: Scope, object and fundamental principles</h2>
            <p className="text-center text-muted-foreground">
              Understanding the purpose and core principles of BS 7671
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <Library className="h-12 w-12 text-elec-yellow mb-4" />
            <h2 className="text-xl font-bold mb-2">Part 2: Definitions</h2>
            <p className="text-center text-muted-foreground">
              Key terminology and definitions in the regulations
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <Library className="h-12 w-12 text-elec-yellow mb-4" />
            <h2 className="text-xl font-bold mb-2">Parts 4–7: Protection, selection, special installations</h2>
            <p className="text-center text-muted-foreground">
              Specific requirements for different installation types
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <Library className="h-12 w-12 text-elec-yellow mb-4" />
            <h2 className="text-xl font-bold mb-2">Appendices and tables</h2>
            <p className="text-center text-muted-foreground">
              Reference materials and calculation tables
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EighteenthEdition;
