import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BusinessAIFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function BusinessAIFeatureCard({
  icon: Icon,
  title,
  description,
}: BusinessAIFeatureCardProps) {
  return (
    <div className="relative overflow-hidden glass-premium rounded-xl p-4">
      <div className="flex items-start gap-3">
        <div className="shrink-0 p-2 rounded-xl bg-amber-500/10">
          <Icon className="h-5 w-5 text-amber-400" />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-white mb-1">{title}</h4>
          <p className="text-sm text-white">{description}</p>
        </div>
      </div>
    </div>
  );
}
