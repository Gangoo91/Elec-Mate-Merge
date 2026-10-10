import { ReactNode } from 'react';

interface StressTechniqueProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const StressTechnique = ({ title, description, icon }: StressTechniqueProps) => {
  return (
    <div className="p-3 bg-white/[0.04] border border-white/[0.10] rounded-lg flex gap-3">
      <div className="mt-1">{icon}</div>
      <div>
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-xs text-white">{description}</p>
      </div>
    </div>
  );
};

export default StressTechnique;
