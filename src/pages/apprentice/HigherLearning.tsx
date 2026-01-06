
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Card, CardContent } from "@/components/ui/card";
import { School, Award, BookOpen } from "lucide-react";

const HigherLearning = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 pb-8 sm:pb-12 space-y-4 sm:space-y-6 animate-fade-in">
        <div className="flex flex-col items-center justify-center mb-2 sm:mb-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">Higher Learning</h1>
          <SmartBackButton />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 auto-rows-fr">
          <Card className="bg-card border-border/30 hover:border-primary/40 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col active:scale-[0.98]">
            <CardContent className="text-center space-y-2 sm:space-y-3 p-3 sm:p-4 flex-grow flex flex-col justify-center">
              <div className="flex justify-center">
                <div className="p-2 sm:p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <School className="h-6 w-6 sm:h-8 sm:w-8 text-primary" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                HNC Electrical Engineering
              </h3>
              <p className="text-muted-foreground text-[10px] sm:text-xs leading-relaxed">
                Higher National Certificate in Electrical Engineering
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/30 hover:border-primary/40 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col active:scale-[0.98]">
            <CardContent className="text-center space-y-2 sm:space-y-3 p-3 sm:p-4 flex-grow flex flex-col justify-center">
              <div className="flex justify-center">
                <div className="p-2 sm:p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Award className="h-6 w-6 sm:h-8 sm:w-8 text-primary" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                HND Electrical Engineering
              </h3>
              <p className="text-muted-foreground text-[10px] sm:text-xs leading-relaxed">
                Higher National Diploma in Electrical Engineering
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/30 hover:border-primary/40 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col active:scale-[0.98]">
            <CardContent className="text-center space-y-2 sm:space-y-3 p-3 sm:p-4 flex-grow flex flex-col justify-center">
              <div className="flex justify-center">
                <div className="p-2 sm:p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-primary" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                BSc Electrical Engineering
              </h3>
              <p className="text-muted-foreground text-[10px] sm:text-xs leading-relaxed">
                Bachelor of Science in Electrical Engineering
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border-border/30 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-foreground">Advanced Qualification Pathways</h3>
          <p className="mb-3 sm:mb-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Higher learning qualifications provide opportunities to advance your electrical career
            through formal academic and vocational routes. These qualifications can open doors to
            senior technical roles, management positions, and specialized engineering fields.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Each pathway offers a structured curriculum designed to build on your existing skills
            while introducing advanced concepts and methodologies relevant to the electrical industry.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default HigherLearning;
