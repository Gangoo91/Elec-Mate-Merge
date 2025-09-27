export interface EmergencyContact {
  name: string;
  phone: string;
  hours: string;
  description: string;
  type: "immediate" | "urgent" | "general" | "specialist";
  priority: number;
}

export interface EmergencyProcedure {
  id: string;
  title: string;
  category: "electrical" | "fire" | "medical" | "evacuation" | "general";
  icon: string;
  steps: string[];
  priority: "critical" | "high" | "medium";
  timeframe: string;
  specialRequirements?: string[];
}

export const emergencyContacts: EmergencyContact[] = [
  {
    name: "Emergency Services",
    phone: "999",
    hours: "24/7",
    description: "Life-threatening emergencies, fires, serious accidents requiring immediate response",
    type: "immediate",
    priority: 1
  },
  {
    name: "NHS 111",
    phone: "111",
    hours: "24/7",
    description: "Urgent healthcare advice when it's not life-threatening",
    type: "urgent",
    priority: 2
  },
  {
    name: "Health & Safety Executive",
    phone: "0300 003 1747",
    hours: "Mon-Fri 8:30-17:00",
    description: "Report serious workplace accidents, incidents, and safety concerns",
    type: "general",
    priority: 3
  },
  {
    name: "Electrical Safety First",
    phone: "020 3463 5100",
    hours: "Mon-Fri 9:00-17:00",
    description: "Electrical safety advice and guidance for professionals",
    type: "specialist",
    priority: 4
  },
  {
    name: "NICEIC Technical Helpline",
    phone: "0333 015 6626",
    hours: "Mon-Fri 8:30-17:00",
    description: "Technical advice on electrical installations and regulations",
    type: "specialist",
    priority: 5
  },
  {
    name: "Gas Emergency",
    phone: "0800 111 999",
    hours: "24/7",
    description: "Gas leaks or suspected carbon monoxide poisoning",
    type: "immediate",
    priority: 1
  }
];

export const emergencyProcedures: EmergencyProcedure[] = [
  {
    id: "electrical-shock",
    title: "Electrical Shock Response",
    category: "electrical",
    icon: "Zap",
    priority: "critical",
    timeframe: "Immediate action required",
    steps: [
      "DO NOT touch the casualty if still in contact with electricity",
      "Switch off power at source if safely possible",
      "Use non-conductive material to move casualty from source",
      "Check for consciousness and breathing",
      "If unconscious or not breathing, call 999 immediately",
      "Begin CPR if trained and no pulse detected",
      "Monitor for burns at entry/exit points",
      "Keep casualty warm and still until help arrives"
    ],
    specialRequirements: ["Insulated rescue hook", "First aid trained personnel"]
  },
  {
    id: "electrical-fire",
    title: "Electrical Fire Emergency",
    category: "fire",
    icon: "Flame",
    priority: "critical",
    timeframe: "Immediate action required",
    steps: [
      "Raise alarm immediately",
      "Switch off electricity supply if safely possible",
      "Never use water on electrical fires",
      "Use CO2 or dry powder fire extinguisher only",
      "If fire cannot be controlled, evacuate area",
      "Call 999 for fire service",
      "Ensure all personnel are accounted for",
      "Do not re-enter until declared safe"
    ],
    specialRequirements: ["CO2 fire extinguisher", "Electrical isolation knowledge"]
  },
  {
    id: "site-evacuation",
    title: "Site Evacuation Procedure",
    category: "evacuation",
    icon: "Users",
    priority: "high",
    timeframe: "Complete within 5 minutes",
    steps: [
      "Sound evacuation alarm",
      "Stop all work immediately",
      "Secure equipment quickly if safe",
      "Use nearest marked exit route",
      "Walk quickly, do not run",
      "Assist anyone who needs help",
      "Go directly to assembly point",
      "Report to fire warden for headcount",
      "Remain at assembly point until all clear"
    ]
  },
  {
    id: "arc-flash",
    title: "Arc Flash Incident",
    category: "electrical",
    icon: "Shield",
    priority: "critical",
    timeframe: "Immediate response required",
    steps: [
      "Ensure your own safety first",
      "Do not approach until power is confirmed off",
      "Call 999 immediately",
      "Check casualty for burns and consciousness",
      "Remove from hazard area if safe to do so",
      "Cool burns with clean water for 20 minutes",
      "Cover burns with clean, non-fluffy material",
      "Monitor breathing and be ready to resuscitate",
      "Keep casualty warm and still"
    ],
    specialRequirements: ["Arc flash PPE", "Burn treatment supplies"]
  },
  {
    id: "working-at-height-fall",
    title: "Fall from Height Response",
    category: "medical",
    icon: "AlertTriangle",
    priority: "critical",
    timeframe: "Immediate assessment required",
    steps: [
      "Ensure area is safe before approaching",
      "Call 999 immediately",
      "Do not move casualty unless in immediate danger",
      "Check consciousness and breathing",
      "Look for obvious injuries without moving casualty",
      "Keep casualty warm and comfortable",
      "Monitor vital signs continuously",
      "Prepare for spinal injury precautions",
      "Guide emergency services to location"
    ],
    specialRequirements: ["Spinal immobilisation equipment", "First aid training"]
  }
];