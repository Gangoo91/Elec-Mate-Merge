import { Search, Wrench, AlertTriangle, CheckCircle, Megaphone } from "lucide-react";

export const toolOptions = [
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
    value: "explainer", 
    label: "Client Explainer", 
    icon: Megaphone,
    description: "Convert technical findings into client-friendly explanations"
  }
];
