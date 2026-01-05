import React, { useState } from 'react';
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
  onQuickSave 
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
