import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import EICClientDetailsSection from './EICClientDetailsSection';
import EICSupplyCharacteristicsSection from './EICSupplyCharacteristicsSection';
import EICElectricalInstallationSection from './EICElectricalInstallationSection';
import EarthingAndBondingSection from './EarthingAndBondingSection';
import StandardsComplianceSection from './StandardsComplianceSection';
import SmartFieldDependencies from './SmartFieldDependencies';
import KeyboardNavigationProvider from './KeyboardNavigationProvider';

interface EICInstallationDetailsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  onQuickSave?: () => void;
}

const EICInstallationDetails: React.FC<EICInstallationDetailsProps> = ({
  formData,
  onUpdate,
  onQuickSave,
}) => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    client: true,
    supply: true,
    electrical: true,
    earthing: true,
    standards: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <KeyboardNavigationProvider onQuickSave={onQuickSave}>
      <div className="space-y-6">
        {/* Smart Field Dependencies - invisible component that handles auto-fills */}
        <SmartFieldDependencies formData={formData} onUpdate={onUpdate} />

        {/* Global N/A toggle */}
        <div className="flex items-center gap-3 p-3 rounded-lg border border-amber-500/30 bg-amber-500/5">
          <Checkbox
            id="renderBlankAsNA"
            checked={formData.renderBlankAsNA || false}
            onCheckedChange={(checked) => onUpdate('renderBlankAsNA', checked)}
            className="border-amber-500/40 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 data-[state=checked]:text-black"
          />
          <Label htmlFor="renderBlankAsNA" className="text-sm cursor-pointer leading-relaxed">
            Render blank optional fields as <strong>N/A</strong> on the PDF
          </Label>
        </div>

        {/* Client & Installation Information */}
        <EICClientDetailsSection
          formData={formData}
          onUpdate={onUpdate}
          isOpen={openSections.client}
          onToggle={() => toggleSection('client')}
        />

        {/* Supply Characteristics */}
        <EICSupplyCharacteristicsSection
          formData={formData}
          onUpdate={onUpdate}
          isOpen={openSections.supply}
          onToggle={() => toggleSection('supply')}
        />

        {/* Electrical Installation Details */}
        <EICElectricalInstallationSection
          formData={formData}
          onUpdate={onUpdate}
          isOpen={openSections.electrical}
          onToggle={() => toggleSection('electrical')}
        />

        {/* Earthing and Bonding */}
        <EarthingAndBondingSection
          formData={formData}
          onUpdate={onUpdate}
          isOpen={openSections.earthing}
          onToggle={() => toggleSection('earthing')}
        />

        {/* Standards and Compliance */}
        <StandardsComplianceSection
          formData={formData}
          onUpdate={onUpdate}
          isOpen={openSections.standards}
          onToggle={() => toggleSection('standards')}
        />
      </div>
    </KeyboardNavigationProvider>
  );
};

export default EICInstallationDetails;
