import { Brain, Search, Wrench, AlertTriangle, CheckCircle, Megaphone, Calendar } from "lucide-react";

export const toolOptions = [
  { 
    value: "assistant", 
    label: "AI Assistant", 
    icon: Brain,
    description: "Your personal AI assistant for electrical queries and advice"
  },
  { 
    value: "component-identify", 
    label: "Component Identification", 
    icon: Search,
    description: "Identify components, specs & BS 7671 requirements"
  },
  { 
    value: "wiring-instruction", 
    label: "Wiring Instructions", 
    icon: Wrench,
    description: "Step-by-step UK wiring guide with terminal diagrams"
  },
  { 
    value: "fault-diagnosis", 
    label: "Fault Diagnosis", 
    icon: AlertTriangle,
    description: "Identify issues, EICR codes & rectification steps"
  },
  { 
    value: "installation-verify", 
    label: "Installation Verification", 
    icon: CheckCircle,
    description: "BS 7671 compliance check with pass/fail assessment"
  },
  { 
    value: "maintenance-advisor", 
    label: "Maintenance Advisor", 
    icon: Calendar,
    description: "Generate equipment-specific maintenance schedules from GN3 guidance"
  },
  { 
    value: "explainer", 
    label: "Client Explainer", 
    icon: Megaphone,
    description: "Convert technical findings into client-friendly explanations"
  }
];
