
import { ReactNode } from "react";

interface StressTechniqueProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const StressTechnique = ({ title, description, icon }: StressTechniqueProps) => {
  return (
    <div className="p-3 bg-elec-yellow/5 border border-elec-yellow/20 rounded-lg flex gap-3">
      <div className="mt-1">{icon}</div>
      <div>
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default StressTechnique;
