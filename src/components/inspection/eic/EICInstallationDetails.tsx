import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import EICClientDetailsSection from './EICClientDetailsSection';
import EICSupplyCharacteristicsSection from './EICSupplyCharacteristicsSection';
import EICElectricalInstallationSection from './EICElectricalInstallationSection';
import EarthingAndBondingSection from './EarthingAndBondingSection';
import StandardsComplianceSection from './StandardsComplianceSection';
import SmartFieldDependencies from './SmartFieldDependencies';

interface EICInstallationDetailsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  onQuickSave?: () => void;
}

const EICInstallationDetails: React.FC<EICInstallationDetailsProps> = ({
  formData,
  onUpdate,
}) => {
  return (
    <div className="space-y-4 pb-20 lg:pb-4">
      {/* Smart Field Dependencies - invisible component that handles auto-fills */}
      <SmartFieldDependencies formData={formData} onUpdate={onUpdate} />

      {/* Global N/A toggle */}
      <div className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.08] bg-white/[0.03]">
        <Checkbox
          id="renderBlankAsNA"
          checked={formData.renderBlankAsNA || false}
          onCheckedChange={(checked) => onUpdate('renderBlankAsNA', checked)}
          className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
        />
        <Label htmlFor="renderBlankAsNA" className="text-xs text-white cursor-pointer leading-relaxed">
          Render blank optional fields as <strong>N/A</strong> on the PDF
        </Label>
      </div>

      <EICClientDetailsSection formData={formData} onUpdate={onUpdate} />
      <EICSupplyCharacteristicsSection formData={formData} onUpdate={onUpdate} />
      <EICElectricalInstallationSection formData={formData} onUpdate={onUpdate} />
      <EarthingAndBondingSection formData={formData} onUpdate={onUpdate} />
      <StandardsComplianceSection formData={formData} onUpdate={onUpdate} />
    </div>
  );
};

export default EICInstallationDetails;
