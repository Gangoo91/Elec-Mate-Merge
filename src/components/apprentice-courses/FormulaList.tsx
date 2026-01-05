import React from "react";
import { cn } from "@/lib/utils";

export interface FormulaItem {
  text: string;
}

interface FormulaListProps {
  items: FormulaItem[];
}

// Simple, non-interactive list of formulas (no copy UI)
export const FormulaList: React.FC<FormulaListProps> = ({ items }) => {
  return (
    <ul className="grid gap-2">
      {items.map((it, idx) => (
        <li key={idx}>
          <div
            className={cn(
              "w-full rounded-md border px-3 py-2",
              "border-border/30 bg-card"
            )}
          >
            <span className="text-sm text-foreground">{it.text}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FormulaList;
