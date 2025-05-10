
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useConceptExplainer = () => {
  const [query, setQuery] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConceptExplain = async () => {
    if (query.trim() === "") {
      toast({
        title: "Empty Query",
        description: "Please enter a question about an electrical concept first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setExplanation("");
    
    try {
      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant', {
        body: { 
          prompt: query,
          type: "concept" 
        },
      });
      
      if (error) {
        throw new Error(error.message || 'Error connecting to the Concept Explainer');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setExplanation(data.response || "");
      
      toast({
        title: "Explanation Generated",
        description: "Your concept has been explained.",
      });
    } catch (error) {
      console.error('Concept Explanation Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get concept explanation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      setQuery("");
      setExplanation("");
    }
  };

  return {
    query,
    setQuery,
    explanation,
    isLoading,
    isModalOpen,
    handleConceptExplain,
    toggleModal,
  };
};
