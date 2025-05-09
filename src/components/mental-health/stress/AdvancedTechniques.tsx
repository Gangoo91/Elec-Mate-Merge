
import { useState } from "react";
import { Clock, Heart, ShieldCheck, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import StressTechnique from "./StressTechnique";

const AdvancedTechniques = () => {
  const [showAllTechniques, setShowAllTechniques] = useState(false);
  
  const advancedTechniques = [
    {
      title: "Time blocking",
      description: "Allocate specific time periods for difficult tasks when your energy is highest",
      icon: <Clock className="h-5 w-5 text-elec-yellow" />
    },
    {
      title: "Progressive muscle relaxation",
      description: "Tense and then release each muscle group to reduce physical tension",
      icon: <Heart className="h-5 w-5 text-elec-yellow" />
    },
    {
      title: "Establish boundaries",
      description: "Learn to say no to additional tasks when your workload is already full",
      icon: <ShieldCheck className="h-5 w-5 text-elec-yellow" />
    },
    {
      title: "Stress journal",
      description: "Track stressful situations to identify patterns and potential solutions",
      icon: <Lightbulb className="h-5 w-5 text-elec-yellow" />
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium">Advanced Techniques</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowAllTechniques(!showAllTechniques)}
          className="border-elec-yellow/20 hover:bg-elec-yellow/10"
        >
          {showAllTechniques ? "Show Less" : "Show More"}
        </Button>
      </div>
      
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${!showAllTechniques && "max-h-[150px] overflow-hidden"}`}>
        {advancedTechniques.map((technique, index) => (
          <StressTechnique
            key={index}
            title={technique.title}
            description={technique.description}
            icon={technique.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default AdvancedTechniques;
