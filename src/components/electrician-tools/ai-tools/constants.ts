
import { Brain, Image, FileText, Book, Zap } from "lucide-react";

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
    value: "reports", 
    label: "Report Writer", 
    icon: FileText,
    description: "Generate professional electrical reports and documentation"
  },
  { 
    value: "regulations", 
    label: "Regulations", 
    icon: Book,
    description: "Access BS 7671 information and compliance guidance"
  },
  { 
    value: "circuit", 
    label: "Circuit Design", 
    icon: Zap,
    description: "Design circuits, calculate loads, and size cables"
  }
];
