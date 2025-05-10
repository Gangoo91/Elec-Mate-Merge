
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useStudyPlanner = () => {
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

  return {
    isModalOpen,
    topic,
    setTopic,
    duration,
    setDuration,
    goals,
    setGoals,
    plan,
    isLoading,
    handleGeneratePlan,
    toggleModal
  };
};
