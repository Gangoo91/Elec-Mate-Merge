
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import ResourceCard from "@/components/mental-health/ResourceCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Clock, BookOpen, CheckCircle, Laptop, Home } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const WorkLifeBalance = () => {
  const [checklist, setChecklist] = useState({
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
  });

  const resources = [
    {
      title: "Setting Work Boundaries",
      description: "Learn how to create healthy limits between work and personal life",
      type: "document" as const,
      url: "https://www.mind.org.uk/information-support/tips-for-everyday-living/work-life-balance/"
    },
    {
      title: "Time Management for Apprentices",
      description: "Strategies for balancing on-job training with study requirements",
      type: "video" as const,
      url: "https://www.youtube.com/watch?v=VUk6LXRZMMk"
    },
    {
      title: "Rest and Recovery Workshop",
      description: "Understanding the importance of downtime for productivity and wellbeing",
      type: "article" as const,
      url: "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/five-steps-to-mental-wellbeing/"
    }
  ];

  const handleChecklistChange = (key: keyof typeof checklist) => {
    setChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }));

    if (!checklist[key]) {
      toast.success("Item added to your balance checklist");
    }
  };

  const completedItems = Object.values(checklist).filter(Boolean).length;
  const totalItems = Object.keys(checklist).length;

  return (
    <MentalHealthPageLayout
      title="Work-Life Balance"
      description="Strategies for maintaining balance during your apprenticeship"
      icon={<Clock className="h-6 w-6 text-green-500" />}
      color="green"
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium">Balance Checklist</h3>
            <span className="text-sm text-muted-foreground">
              {completedItems} of {totalItems} complete
            </span>
          </div>
          <Card className="border-green-500/20">
            <CardContent className="p-4 space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="item1" 
                    checked={checklist.item1} 
                    onCheckedChange={() => handleChecklistChange("item1")}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="item1">Establish a consistent work routine</Label>
                    <p className="text-sm text-muted-foreground">
                      Create a predictable schedule for workdays
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="item2" 
                    checked={checklist.item2} 
                    onCheckedChange={() => handleChecklistChange("item2")}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="item2">Schedule dedicated study time</Label>
                    <p className="text-sm text-muted-foreground">
                      Block out specific hours for coursework and learning
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="item3" 
                    checked={checklist.item3} 
                    onCheckedChange={() => handleChecklistChange("item3")}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="item3">Plan leisure activities</Label>
                    <p className="text-sm text-muted-foreground">
                      Make time for hobbies, exercise, and social connections
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="item4" 
                    checked={checklist.item4} 
                    onCheckedChange={() => handleChecklistChange("item4")}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="item4">Set device boundaries</Label>
                    <p className="text-sm text-muted-foreground">
                      Limit work emails and calls during personal time
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="item5" 
                    checked={checklist.item5} 
                    onCheckedChange={() => handleChecklistChange("item5")}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="item5">Prioritize sufficient sleep</Label>
                    <p className="text-sm text-muted-foreground">
                      Aim for 7-9 hours of quality sleep each night
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                size="sm"
                onClick={() => toast.success("Your balance checklist has been saved")}
              >
                Save Progress
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="border-green-500/20 bg-elec-gray">
            <CardContent className="p-4 space-y-3">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-500" />
                Study Balance
              </h3>
              <p className="text-sm text-muted-foreground">
                Manage your coursework effectively alongside on-site training to prevent burnout.
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Create a realistic study schedule that accounts for energy levels</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Use the 25/5 Pomodoro technique (25 min study + 5 min break)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Find a dedicated study space free from distractions</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-green-500/20 bg-elec-gray">
            <CardContent className="p-4 space-y-3">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Home className="h-5 w-5 text-green-500" />
                Home & Family
              </h3>
              <p className="text-sm text-muted-foreground">
                Maintain healthy relationships and personal time during your apprenticeship.
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Communicate your schedule clearly with family members</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Designate device-free quality time with loved ones</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Plan activities that help you disconnect from work stress</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Balance Resources</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

export default WorkLifeBalance;
