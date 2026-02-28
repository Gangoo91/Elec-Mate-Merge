import { Search, Wrench, AlertTriangle, CheckCircle, Megaphone } from 'lucide-react';

export type ToolCategory = 'visual' | 'text';

export interface ToolOption {
  value: string;
  label: string;
  icon: typeof Search;
  description: string;
  category: ToolCategory;
}

export const toolOptions: ToolOption[] = [
  {
    value: 'component-identify',
    label: 'Component Identification',
    icon: Search,
    description: 'Identify components, specs & BS 7671 requirements',
    category: 'visual',
  },
  {
    value: 'wiring-instruction',
    label: 'Wiring Instructions',
    icon: Wrench,
    description: 'Step-by-step UK wiring guide with terminal diagrams',
    category: 'visual',
  },
  {
    value: 'fault-diagnosis',
    label: 'Fault Diagnosis',
    icon: AlertTriangle,
    description: 'Identify issues, EICR codes & rectification steps',
    category: 'visual',
  },
  {
    value: 'installation-verify',
    label: 'Installation Verification',
    icon: CheckCircle,
    description: 'BS 7671 compliance check with pass/fail assessment',
    category: 'visual',
  },
  {
    value: 'explainer',
    label: 'Client Explainer',
    icon: Megaphone,
    description: 'Convert technical findings into client-friendly explanations',
    category: 'text',
  },
];
