
import { GraduationCap } from "lucide-react";

const CareerWelcomeState = () => {
  return (
    <div className="text-center p-4 sm:p-8 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
      <GraduationCap className="h-12 w-12 sm:h-16 sm:w-16 text-elec-yellow mx-auto mb-4" />
      <h3 className="text-xl font-medium mb-2">Choose a Career Path Section</h3>
      <p className="text-muted-foreground px-2 sm:px-0">
        Click on one of the boxes above to explore different aspects of your electrical career progression.
      </p>
    </div>
  );
};

export default CareerWelcomeState;
