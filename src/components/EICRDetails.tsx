import React from 'react';
import ClientDetailsSection from './ClientDetailsSection';
import InspectionDetailsSection from './InspectionDetailsSection';
import SupplyCharacteristicsSection from './SupplyCharacteristicsSection';
import ElectricalInstallationSection from './ElectricalInstallationSection';
import EarthingBondingSection from './eicr/EarthingBondingSection';

interface EICRDetailsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  onUpdate: (field: string, value: string) => void;
}

const EICRDetails = ({ formData, onUpdate }: EICRDetailsProps) => {
  return (
    // Footer clearance lives on the shell's <main> — no extra pb here.
    <div className="space-y-4">
      <ClientDetailsSection formData={formData} onUpdate={onUpdate} certType="eicr" />
      <InspectionDetailsSection formData={formData} onUpdate={onUpdate} />
      <SupplyCharacteristicsSection formData={formData} onUpdate={onUpdate} />
      <EarthingBondingSection formData={formData} onUpdate={onUpdate} />
      <ElectricalInstallationSection formData={formData} onUpdate={onUpdate} />
    </div>
  );
};

export default EICRDetails;
