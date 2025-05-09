
import { Dumbbell, Brain, Lightbulb, LifeBuoy } from "lucide-react";
import StressTechnique from "./StressTechnique";

const QuickTips = () => {
  const tips = [
    {
      title: "Take regular breaks",
      description: "Step away from tasks for 5-10 minutes when feeling overwhelmed",
      icon: <Dumbbell className="h-5 w-5 text-elec-yellow" />
    },
    {
      title: "Practise mindfulness",
      description: "Focus on the present moment rather than worrying about future tasks",
      icon: <Brain className="h-5 w-5 text-elec-yellow" /> 
    },
    {
      title: "Set realistic goals",
      description: "Break down large projects into manageable daily tasks",
      icon: <Lightbulb className="h-5 w-5 text-elec-yellow" />
    },
    {
      title: "Ask for help",
      description: "Reach out to colleagues or supervisors when feeling overwhelmed",
      icon: <LifeBuoy className="h-5 w-5 text-elec-yellow" />
    }
  ];

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Quick Tips</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <StressTechnique
            key={index}
            title={tip.title}
            description={tip.description}
            icon={tip.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickTips;
