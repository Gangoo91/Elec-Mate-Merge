
import { useState } from "react";
import { Calendar, Loader } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const StudyPlanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("4");
  const [goals, setGoals] = useState("");
  const [plan, setPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePlan = async () => {
    if (topic.trim() === "") {
      toast({
        title: "Missing Topic",
        description: "Please enter a study topic to generate a plan.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setPlan("");
    
    try {
      const prompt = `Create a detailed study plan for the following topic in UK electrical apprenticeship: "${topic}". 
                      The study plan should cover ${duration} weeks and include these specific goals: ${goals || "general understanding and skill development"}. 
                      Include weekly objectives, recommended resources, and practical exercises.`;
      
      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant', {
        body: { 
          prompt: prompt,
          type: "study_plan" 
        },
      });
      
      if (error) {
        throw new Error(error.message || 'Error generating study plan');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setPlan(data.response || "");
      
      toast({
        title: "Study Plan Generated",
        description: `Your ${duration}-week study plan has been created.`,
      });
    } catch (error) {
      console.error('Study Plan Generation Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate study plan",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      setTopic("");
      setDuration("4");
      setGoals("");
      setPlan("");
    }
  };
  
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-elec-yellow" />
          Study Planner
        </CardTitle>
        <CardDescription>
          Create personalised study plans for exam preparation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Generate customised study schedules based on your learning goals, available time, and specific topics
          you need to cover for your electrical qualifications.
        </p>
        
        {isModalOpen ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Study Topic</Label>
              <Input
                id="topic"
                placeholder="e.g., Three-phase electrical systems, RCD protection, BS 7671 regulations"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Study Duration (weeks)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                max="12"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="goals">Learning Goals (optional)</Label>
              <Textarea
                id="goals"
                placeholder="e.g., Prepare for AM2 assessment, understand wiring regulations for domestic installations"
                className="min-h-[80px]"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button 
                className="flex-1"
                onClick={handleGeneratePlan}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Generating Plan...
                  </>
                ) : (
                  'Generate Study Plan'
                )}
              </Button>
              <Button variant="outline" onClick={toggleModal}>
                Close
              </Button>
            </div>
            
            {isLoading && (
              <div className="mt-4 p-4 bg-elec-dark rounded-md animate-pulse">
                <Skeleton className="h-6 w-40 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-5/6 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            )}
            
            {plan && !isLoading && (
              <div className="mt-4 p-4 bg-elec-dark rounded-md">
                <h3 className="text-lg font-semibold mb-2 text-elec-yellow">Your Study Plan:</h3>
                <div className="text-sm whitespace-pre-wrap">
                  {plan.split('\n').map((line, index) => (
                    <p 
                      key={index}
                      className={
                        line.match(/^(Week \d+:|WEEK \d+:|Goals:|Resources:|Exercises:|Assessments:|Summary:)/) ?
                        'text-elec-yellow font-semibold mt-3 mb-1' :
                        line.startsWith('- ') ?
                        'pl-4 my-1' :
                        'my-1'
                      }
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Button className="w-full" onClick={toggleModal}>
            Create Study Plan
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default StudyPlanner;
