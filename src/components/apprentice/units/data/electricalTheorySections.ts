
import { 
  Zap, 
  FileText, 
  Cable, 
  Box, 
  Lightbulb, 
  Settings, 
  Wrench, 
  ShieldCheck, 
  Bolt, 
  BookOpen 
} from "lucide-react";

export interface TheorySection {
  sectionNumber: string;
  title: string;
  description: string;
  icon: any;
}

export const electricalTheorySections: TheorySection[] = [
  {
    sectionNumber: "1",
    title: "Basic Electrical Theory",
    description: "Learn the fundamentals of electrical theory including voltage, current, resistance, and circuit principles that form the foundation of electrical work.",
    icon: Zap
  },
  {
    sectionNumber: "2",
    title: "Technical Information",
    description: "Understand how to interpret technical information, diagrams, and electrical drawings essential for electrical installation work.",
    icon: FileText
  },
  {
    sectionNumber: "3",
    title: "Wiring Systems",
    description: "Explore different wiring systems, cable types, and wiring methods used in electrical installations for various applications.",
    icon: Cable
  },
  {
    sectionNumber: "4",
    title: "Service Positions",
    description: "Learn about consumer units, distribution boards, and service positions used in domestic and commercial electrical installations.",
    icon: Box
  },
  {
    sectionNumber: "5",
    title: "Lighting Circuits",
    description: "Understand lighting circuits design, installation methods, and control systems for domestic and commercial applications.",
    icon: Lightbulb
  },
  {
    sectionNumber: "6",
    title: "Power Circuits",
    description: "Study ring and radial circuits for power distribution in domestic and commercial electrical installations.",
    icon: Settings
  },
  {
    sectionNumber: "7",
    title: "Special Installation Requirements",
    description: "Explore special installation requirements for specific locations and conditions according to BS 7671 standards.",
    icon: Wrench
  },
  {
    sectionNumber: "8",
    title: "Earthing and Bonding",
    description: "Learn about earthing arrangements, protective bonding, and equipotential bonding principles for electrical safety.",
    icon: ShieldCheck
  },
  {
    sectionNumber: "9",
    title: "Overcurrent Protection",
    description: "Study overcurrent protective devices, their selection, and application in electrical installations for safety and compliance.",
    icon: Bolt
  },
  {
    sectionNumber: "10",
    title: "Circuit Design",
    description: "Learn principles of electrical circuit design, load calculation, and installation planning according to regulations and best practices.",
    icon: BookOpen
  }
];
