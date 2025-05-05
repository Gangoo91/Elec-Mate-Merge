
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { TrainingEvidenceItem } from "@/types/time-tracking";

// Mock data for evidence
const mockEvidence = [
  {
    id: "ev1",
    title: "Site Visit - Commercial Installation",
    type: "Site Visit",
    date: "2024-04-02",
    description: "Accompanied senior electrician on a commercial site to observe three-phase distribution board installation.",
    files: ["site-visit-1.jpg", "site-visit-2.jpg"]
  },
  {
    id: "ev2",
    title: "College Workshop - Motor Controls",
    type: "Workshop",
    date: "2024-03-15",
    description: "Practical session on motor starter circuits and controls at college.",
    files: ["motor-controls-workshop.pdf"]
  }
];

export const useTrainingEvidence = () => {
  const { toast } = useToast();
  const [evidenceItems, setEvidenceItems] = useState<TrainingEvidenceItem[]>(mockEvidence);
  const [isUploading, setIsUploading] = useState(false);

  const addEvidence = (evidence: Omit<TrainingEvidenceItem, 'id'>) => {
    const newEvidence = {
      ...evidence,
      id: `ev${Date.now()}`,
    };
    
    setEvidenceItems(prev => [newEvidence, ...prev]);
    
    toast({
      title: "Evidence uploaded",
      description: "Your training evidence has been successfully added to your records.",
    });
  };

  const deleteEvidence = (id: string) => {
    setEvidenceItems(evidenceItems.filter(item => item.id !== id));
    toast({
      title: "Evidence deleted",
      description: "The evidence has been removed from your records.",
    });
  };

  return {
    evidenceItems,
    addEvidence,
    deleteEvidence,
    isUploading,
    setIsUploading
  };
};
