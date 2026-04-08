import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import EICClientDetailsSection from './EICClientDetailsSection';
import EICSupplyCharacteristicsSection from './EICSupplyCharacteristicsSection';
import EICElectricalInstallationSection from './EICElectricalInstallationSection';
import EarthingAndBondingSection from './EarthingAndBondingSection';
import StandardsComplianceSection from './StandardsComplianceSection';
import SmartFieldDependencies from './SmartFieldDependencies';

const SectionTitle = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const FormField = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>
    {children}
  </div>
);

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
      <SmartFieldDependencies formData={formData} onUpdate={onUpdate} />
      <EICClientDetailsSection formData={formData} onUpdate={onUpdate} />
      <EICSupplyCharacteristicsSection formData={formData} onUpdate={onUpdate} />
      <EICElectricalInstallationSection formData={formData} onUpdate={onUpdate} />
      <EarthingAndBondingSection formData={formData} onUpdate={onUpdate} />
      <StandardsComplianceSection formData={formData} onUpdate={onUpdate} />

      {/* Comments on Existing Installation — BS 7671 Reg 644.1.2 */}
      {(formData.workType === 'addition' || formData.workType === 'alteration') && (
        <div className="space-y-4">
          <SectionTitle title="Comments on Existing Installation" />
          <p className="text-[10px] text-white">
            In the case of an addition or alteration, see Regulation 644.1.2
          </p>
          <Textarea
            value={formData.existingInstallationComments || ''}
            onChange={(e) => onUpdate('existingInstallationComments', e.target.value)}
            placeholder="Record any comments on the condition of the existing installation..."
            className="min-h-[100px] text-base touch-manipulation resize-none bg-white/[0.06] border-white/[0.08] placeholder:text-white"
          />
        </div>
      )}

    </div>
  );
};

export default EICInstallationDetails;
