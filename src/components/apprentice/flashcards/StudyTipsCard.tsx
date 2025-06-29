
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Clock, Brain, Target, RotateCcw, CheckCircle } from "lucide-react";

const StudyTipsCard = () => {
  const tips = [
    {
      icon: Clock,
      title: "Little and Often",
      description: "Study for 10-15 minutes daily rather than long cramming sessions"
    },
    {
      icon: Brain,
      title: "Use Spaced Repetition",
      description: "Review difficult cards more frequently to improve retention"
    },
    {
      icon: Target,
      title: "Focus on Weak Areas",
      description: "Spend extra time on cards you find challenging"
    },
    {
      icon: RotateCcw,
      title: "Mix Up Your Study",
      description: "Alternate between different flashcard sets for better learning"
    },
    {
      icon: CheckCircle,
      title: "Test Yourself",
      description: "Try to recall the answer before flipping the card"
    }
  ];

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Study Tips for Better Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-elec-dark/30">
              <div className="p-2 rounded-full bg-elec-yellow/10 flex-shrink-0">
                <tip.icon className="h-4 w-4 text-elec-yellow" />
              </div>
              <div>
                <h4 className="font-medium text-elec-light mb-1">{tip.title}</h4>
                <p className="text-sm text-elec-light/70">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyTipsCard;
