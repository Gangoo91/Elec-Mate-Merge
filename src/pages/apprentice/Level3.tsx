
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const Level3 = () => {
  return (
    <div className="bg-background text-foreground">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 pb-8 sm:pb-12 space-y-4 sm:space-y-6 animate-fade-in">
        <div className="flex flex-col items-center justify-center mb-2 sm:mb-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">Level 3 Electrical Installation</h1>
          <SmartBackButton />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 auto-rows-fr">
          <Card className="bg-card border-border/30 hover:border-primary/40 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col active:scale-[0.98]">
            <CardContent className="text-center space-y-2 sm:space-y-3 p-3 sm:p-4 flex-grow flex flex-col justify-center">
              <div className="flex justify-center">
                <div className="p-2 sm:p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-primary" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                Inspection, testing, and commissioning
              </h3>
              <p className="text-white text-[10px] sm:text-xs leading-relaxed">
                Advanced inspection and testing procedures
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
                Fault diagnosis and rectification
              </h3>
              <p className="text-white text-[10px] sm:text-xs leading-relaxed">
                Identifying and fixing electrical system faults
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
                Electrical systems design
              </h3>
              <p className="text-white text-[10px] sm:text-xs leading-relaxed">
                Designing efficient and safe electrical systems
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
                Understanding environmental technologies
              </h3>
              <p className="text-white text-[10px] sm:text-xs leading-relaxed">
                Sustainable and renewable electrical systems
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
                Electrical science (advanced)
              </h3>
              <p className="text-white text-[10px] sm:text-xs leading-relaxed">
                Advanced electrical theory and principles
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
                Regulations and legislation
              </h3>
              <p className="text-white text-[10px] sm:text-xs leading-relaxed">
                Advanced regulatory knowledge and compliance
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Level3;
