
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import ResourceCard from "@/components/mental-health/ResourceCard";
import { Brain, Dumbbell, Lightbulb, LifeBuoy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const StressManagement = () => {
  const [progressValue] = useState(65);

  const resources = [
    {
      title: "Recognizing Workplace Stressors",
      description: "Learn to identify common sources of stress in electrical work environments",
      type: "document" as const,
      url: "https://www.mind.org.uk/information-support/tips-for-everyday-living/workplace-mental-health/"
    },
    {
      title: "5-Minute Breathing Techniques",
      description: "Quick exercises you can do on site to reduce stress and anxiety",
      type: "video" as const,
      url: "https://www.youtube.com/watch?v=aNXKjGFUlMs"
    },
    {
      title: "Managing On-Job Pressure",
      description: "Strategies for handling tight deadlines and demanding situations",
      type: "article" as const,
      url: "https://www.hse.gov.uk/stress/what-to-do.htm"
    },
    {
      title: "Sleep and Stress Connection",
      description: "How improving sleep quality can reduce workplace stress",
      type: "article" as const,
      url: "https://www.nhs.uk/every-mind-matters/mental-wellbeing-tips/how-to-fall-asleep-faster-and-sleep-better/"
    }
  ];

  const tips = [
    {
      title: "Take regular breaks",
      description: "Step away from tasks for 5-10 minutes when feeling overwhelmed",
      icon: <Dumbbell className="h-5 w-5 text-elec-yellow" />
    },
    {
      title: "Practice mindfulness",
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
    <MentalHealthPageLayout
      title="Managing Workplace Stress"
      description="Techniques and resources for handling stress on job sites and during training"
      icon={<Brain className="h-6 w-6 text-elec-yellow" />}
      color="yellow"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Your Stress Management Progress</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Advanced</span>
            </div>
            <Progress value={progressValue} className="h-2" />
            <p className="text-sm text-muted-foreground">
              You've completed {progressValue}% of stress management techniques
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Quick Tips</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tips.map((tip, index) => (
              <div 
                key={index} 
                className="p-3 bg-elec-yellow/5 border border-elec-yellow/20 rounded-lg flex gap-3"
              >
                <div className="mt-1">{tip.icon}</div>
                <div>
                  <h4 className="font-medium text-sm">{tip.title}</h4>
                  <p className="text-xs text-muted-foreground">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Helpful Resources</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {resources.map((resource, index) => (
              <ResourceCard 
                key={index}
                title={resource.title}
                description={resource.description}
                type={resource.type}
                url={resource.url}
              />
            ))}
          </div>
        </div>
      </div>
    </MentalHealthPageLayout>
  );
};

export default StressManagement;
