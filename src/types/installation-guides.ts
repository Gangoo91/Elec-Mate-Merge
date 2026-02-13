import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface ToggleCardDef {
  id: string;
  label: string;
  icon: LucideIcon;
  colour: string; // Tailwind colour stem e.g. "blue"
  borderColour: string; // e.g. "border-blue-500"
  bgColour: string; // e.g. "bg-blue-500/20"
  textColour: string; // e.g. "text-blue-400"
  ringColour: string; // e.g. "ring-blue-500/40"
}

export interface SafetyNotice {
  title: string;
  points: { title: string; content: string }[];
}
