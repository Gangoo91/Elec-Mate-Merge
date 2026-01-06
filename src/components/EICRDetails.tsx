
import React from 'react';
import ClientDetailsSection from './ClientDetailsSection';
import InspectionDetailsSection from './InspectionDetailsSection';
import SupplyCharacteristicsSection from './SupplyCharacteristicsSection';
import ElectricalInstallationSection from './ElectricalInstallationSection';
import EarthingBondingSection from './eicr/EarthingBondingSection';

interface EICRDetailsProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
}

const EICRDetails = ({ formData, onUpdate }: EICRDetailsProps) => {
  return (
    <div className="md:max-w-5xl mx-auto space-y-3 pb-20 lg:pb-4">
      <ClientDetailsSection formData={formData} onUpdate={onUpdate} />
      <InspectionDetailsSection formData={formData} onUpdate={onUpdate} />
      <SupplyCharacteristicsSection formData={formData} onUpdate={onUpdate} />
      <EarthingBondingSection formData={formData} onUpdate={onUpdate} />
      <ElectricalInstallationSection formData={formData} onUpdate={onUpdate} />
    </div>
  );
};

export default EICRDetails;
