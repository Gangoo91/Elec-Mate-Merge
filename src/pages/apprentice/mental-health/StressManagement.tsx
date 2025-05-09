
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import ResourceCard from "@/components/mental-health/ResourceCard";
import { Brain, Dumbbell, Lightbulb, LifeBuoy, Clock, Heart, PhoneCall, ShieldCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const StressManagement = () => {
  const [progressValue] = useState(65);
  const [showAllTechniques, setShowAllTechniques] = useState(false);

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
    },
    {
      title: "Stress Management for Apprentices",
      description: "Tailored advice for managing stress during your apprenticeship",
      type: "document" as const,
      url: "https://www.electricalcommunity.co.uk/mental-health-resources"
    },
    {
      title: "Building Resilience in the Trades",
      description: "Learn techniques to develop mental toughness on the job",
      type: "video" as const, 
      url: "https://www.youtube.com/watch?v=1FDqYQjHtMo"
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

  const handleCallSupport = () => {
    toast.info("Calling this number will connect you with a trained mental health professional");
  };

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

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-3">Common Apprentice Stressors</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-elec-yellow"></div>
                <p className="text-sm">Learning complex technical skills while on the job</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-elec-yellow"></div>
                <p className="text-sm">Balancing study requirements with workplace demands</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-elec-yellow"></div>
                <p className="text-sm">Adapting to workplace expectations and culture</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-elec-yellow"></div>
                <p className="text-sm">Pressure from evaluations and assessments</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-elec-yellow"></div>
                <p className="text-sm">Financial concerns while earning an apprentice wage</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-3">Physical Signs of Stress</h3>
              <ul className="space-y-1 text-sm">
                <li>• Headaches and muscle tension</li>
                <li>• Disrupted sleep patterns</li>
                <li>• Changes in appetite</li>
                <li>• Fatigue and low energy</li>
                <li>• Rapid heartbeat and breathing</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-3">Mental Signs of Stress</h3>
              <ul className="space-y-1 text-sm">
                <li>• Difficulty concentrating on tasks</li>
                <li>• Increased worry or anxiety</li>
                <li>• Feeling overwhelmed</li>
                <li>• Irritability with colleagues</li>
                <li>• Loss of motivation</li>
              </ul>
            </CardContent>
          </Card>
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
              <div 
                key={index} 
                className="p-3 bg-elec-yellow/5 border border-elec-yellow/20 rounded-lg flex gap-3"
              >
                <div className="mt-1">{technique.icon}</div>
                <div>
                  <h4 className="font-medium text-sm">{technique.title}</h4>
                  <p className="text-xs text-muted-foreground">{technique.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium mb-1">Need immediate support?</h3>
              <p className="text-sm text-muted-foreground">Talk to someone who understands workplace stress</p>
            </div>
            <a href="tel:116123" onClick={handleCallSupport}>
              <Button className="bg-elec-yellow hover:bg-elec-yellow/90 text-black flex items-center gap-2">
                <PhoneCall className="h-4 w-4" />
                Call Samaritans: 116 123
              </Button>
            </a>
          </CardContent>
        </Card>
        
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
