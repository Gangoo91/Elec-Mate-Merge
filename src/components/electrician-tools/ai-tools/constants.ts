
import { Brain, Image, Megaphone } from "lucide-react";

export const toolOptions = [
  { 
    value: "assistant", 
    label: "AI Assistant", 
    icon: Brain,
    description: "Your personal AI assistant for electrical queries and advice"
  },
  { 
    value: "visual", 
    label: "Visual Analysis", 
    icon: Image,
    description: "Analyse electrical components and identify potential issues"
  },
  { 
    value: "explainer", 
    label: "Client Explainer", 
    icon: Megaphone,
    description: "Convert technical findings into client-friendly explanations"
  }
];
