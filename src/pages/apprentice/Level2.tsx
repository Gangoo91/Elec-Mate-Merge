
import BackButton from "@/components/common/BackButton";
import { Card, CardContent } from "@/components/ui/card";
import { Book, BookOpen, FileText, Library, GraduationCap } from "lucide-react";

const Level2 = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-4 px-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 sm:mb-4">Level 2 Electrical Installation</h1>
        <BackButton customUrl="/apprentice/study" label="Back to Study Centre" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6 h-full">
            <Book className="h-10 w-10 sm:h-12 sm:w-12 text-elec-yellow mb-3 sm:mb-4" />
            <h2 className="text-lg sm:text-xl font-bold mb-2 text-center">Health and safety in electrical installation</h2>
            <p className="text-center text-muted-foreground">
              Core safety principles and practices for electrical work
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6 h-full">
            <Book className="h-10 w-10 sm:h-12 sm:w-12 text-elec-yellow mb-3 sm:mb-4" />
            <h2 className="text-lg sm:text-xl font-bold mb-2 text-center">Electrical science and principles</h2>
            <p className="text-center text-muted-foreground text-sm">
              Fundamental electrical theory and concepts
            </p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6 h-full">
            <Book className="h-10 w-10 sm:h-12 sm:w-12 text-elec-yellow mb-3 sm:mb-4" />
            <h2 className="text-lg sm:text-xl font-bold mb-2 text-center">Installation practices and theory</h2>
            <p className="text-center text-muted-foreground text-sm">
              Practical installation techniques and methods
            </p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6 h-full">
            <Book className="h-10 w-10 sm:h-12 sm:w-12 text-elec-yellow mb-3 sm:mb-4" />
            <h2 className="text-lg sm:text-xl font-bold mb-2 text-center">Wiring systems and enclosures</h2>
            <p className="text-center text-muted-foreground text-sm">
              Understanding different wiring systems and applications
            </p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6 h-full">
            <Book className="h-10 w-10 sm:h-12 sm:w-12 text-elec-yellow mb-3 sm:mb-4" />
            <h2 className="text-lg sm:text-xl font-bold mb-2 text-center">Communicating with others</h2>
            <p className="text-center text-muted-foreground text-sm">
              Professional communication in the building services industry
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Level2;
