
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { User, Shield, TestTube, FileText } from 'lucide-react';

type Phase = 'customer' | 'procedure' | 'testing' | 'completion';

interface PhaseNavigationProps {
  currentPhase: Phase;
}

const PhaseNavigation = ({ currentPhase }: PhaseNavigationProps) => {
  const phases = [
    { phase: 'customer' as Phase, label: 'Customer Details', icon: User },
    { phase: 'procedure' as Phase, label: 'Isolation Steps', icon: Shield },
    { phase: 'testing' as Phase, label: 'Testing Phase', icon: TestTube },
    { phase: 'completion' as Phase, label: 'Completion', icon: FileText }
  ];

  return (
    <Card className="bg-card border-border mb-8">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          {phases.map(({ phase, label, icon: Icon }, index) => (
            <div key={phase} className="flex items-center gap-2">
              <div className={`p-2 rounded-lg ${currentPhase === phase ? 'bg-elec-yellow text-black' : 'bg-muted text-gray-400'}`}>
                <Icon className="h-4 w-4" />
              </div>
              <span className={`text-sm font-medium ${currentPhase === phase ? 'text-elec-yellow' : 'text-gray-400'}`}>
                {label}
              </span>
              {index < phases.length - 1 && (
                <div className="w-8 h-px bg-neutral-600 mx-2" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseNavigation;
