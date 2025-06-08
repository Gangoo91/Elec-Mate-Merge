
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Clock, Brain, Target } from "lucide-react";

const StudyTipsCard = () => {
  const tips = [
    {
      category: "Effective Study Techniques",
      icon: Brain,
      tips: [
        "Review cards regularly for better retention",
        "Focus on cards you find challenging",
        "Use spaced repetition for long-term memory",
        "Test yourself without looking at answers first"
      ]
    },
    {
      category: "Time Management",
      icon: Clock,
      tips: [
        "5-10 minutes between tasks on site",
        "During breaks or lunch periods",
        "Before starting your shift",
        "Perfect for mobile learning"
      ]
    },
    {
      category: "Learning Strategies",
      icon: Target,
      tips: [
        "Create mental associations with real work examples",
        "Practice explaining concepts out loud",
        "Group related cards together",
        "Review mistakes immediately"
      ]
    }
  ];

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          Study Tips & Best Practices
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {tips.map((section, index) => (
          <div key={index}>
            <div className="flex items-center gap-2 mb-3">
              <section.icon className="h-4 w-4 text-elec-yellow" />
              <h3 className="font-semibold text-white text-sm">{section.category}</h3>
            </div>
            <ul className="space-y-1">
              {section.tips.map((tip, tipIndex) => (
                <li key={tipIndex} className="text-sm text-elec-light/80 flex items-start">
                  <span className="text-elec-yellow mr-2">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default StudyTipsCard;
