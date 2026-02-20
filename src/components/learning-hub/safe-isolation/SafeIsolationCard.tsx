import React from 'react';
import { SmartTabs } from '@/components/ui/smart-tabs';
import { Button } from '@/components/ui/button';
import { Shield, ListChecks, Zap, Wrench, BookOpen, ArrowLeft } from 'lucide-react';
import ProcedureTab from './ProcedureTab';
import ProveDeadTab from './ProveDeadTab';
import EquipmentTab from './EquipmentTab';
import ReferenceTab from './ReferenceTab';

interface SafeIsolationCardProps {
  onBack?: () => void;
}

const SafeIsolationCard = ({ onBack }: SafeIsolationCardProps) => {
  const smartTabs = [
    {
      value: 'procedure',
      label: 'Procedure',
      shortLabel: 'Procedure',
      icon: <ListChecks className="h-4 w-4" />,
      content: <ProcedureTab />,
    },
    {
      value: 'prove-dead',
      label: 'Prove Dead',
      shortLabel: 'Prove Dead',
      icon: <Zap className="h-4 w-4" />,
      content: <ProveDeadTab />,
    },
    {
      value: 'equipment',
      label: 'Equipment',
      shortLabel: 'Equipment',
      icon: <Wrench className="h-4 w-4" />,
      content: <EquipmentTab />,
    },
    {
      value: 'reference',
      label: 'Reference',
      shortLabel: 'Reference',
      icon: <BookOpen className="h-4 w-4" />,
      content: <ReferenceTab />,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {onBack && (
        <Button
          variant="outline"
          onClick={onBack}
          className="mb-2 border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black min-h-[44px] touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Back to Testing Procedures</span>
          <span className="sm:hidden">Back</span>
        </Button>
      )}

      <div className="bg-card rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Safe Isolation Procedure
            </h2>
            <p className="text-sm text-white">
              BS 7671 compliant &mdash; verified against GN3, GS38, and EAW Regulations 1989
            </p>
          </div>
        </div>

        <SmartTabs tabs={smartTabs} defaultValue="procedure" className="w-full" />
      </div>
    </div>
  );
};

export default SafeIsolationCard;
