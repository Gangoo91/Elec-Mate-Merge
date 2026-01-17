
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

const CareerWelcomeState = () => {
  return (
    <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative animate-fade-in">
      <div className="absolute top-0 right-0 w-48 h-48 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <CardContent className="text-center p-6 sm:p-8 relative">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30 w-fit mx-auto mb-4">
          <GraduationCap className="h-10 w-10 sm:h-12 sm:w-12 text-elec-yellow" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Choose a Career Path Section</h3>
        <p className="text-white/70 px-4 sm:px-0 max-w-xl mx-auto">
          Click on one of the boxes above to explore different aspects of your electrical career progression.
        </p>
      </CardContent>
    </Card>
  );
};

export default CareerWelcomeState;
