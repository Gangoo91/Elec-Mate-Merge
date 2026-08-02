import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import EICClientDetailsSection from './EICClientDetailsSection';
import EICSupplyCharacteristicsSection from './EICSupplyCharacteristicsSection';
import EICElectricalInstallationSection from './EICElectricalInstallationSection';
import EarthingAndBondingSection from './EarthingAndBondingSection';
import StandardsComplianceSection from './StandardsComplianceSection';
import SmartFieldDependencies from './SmartFieldDependencies';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

interface EICInstallationDetailsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const EICInstallationDetails: React.FC<EICInstallationDetailsProps> = ({
  formData,
  onUpdate,
}) => {
  // No bottom padding on the tab root — EICForm's <main> already carries the
  // sticky footer clearance (pb-32 sm:pb-24); stacking another pb-20 on top
  // left ~200px of dead scroll under the last field.
  return (
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      <SmartFieldDependencies formData={formData} onUpdate={onUpdate} />
      {/* Client details spans both columns — it holds the address blocks */}
      <EICClientDetailsSection formData={formData} onUpdate={onUpdate} />
      <EICSupplyCharacteristicsSection formData={formData} onUpdate={onUpdate} />
      <EICElectricalInstallationSection formData={formData} onUpdate={onUpdate} />
      <EarthingAndBondingSection formData={formData} onUpdate={onUpdate} />
      <StandardsComplianceSection formData={formData} onUpdate={onUpdate} />

      {/* Comments on Existing Installation — BS 7671 Reg 644.1.2.
          workType is comma-separated multi-select (ELE-1315) — a DB upgrade is
          an alteration to the existing installation, so it needs comments too. */}
      {['addition', 'alteration', 'db-upgrade'].some((t) =>
        String(formData.workType || '')
          .split(',')
          .includes(t)
      ) && (
        <div className={`${cardCn} lg:col-span-2`}>
          <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">
            Comments on existing installation
          </h2>
          <p className="text-[11px] text-white">
            In the case of an addition or alteration, see Regulation 644.1.2
          </p>
          <Textarea
            value={formData.existingInstallationComments || ''}
            onChange={(e) => onUpdate('existingInstallationComments', e.target.value)}
            placeholder="Record any comments on the condition of the existing installation..."
            className={textareaCn}
          />
        </div>
      )}

    </div>
  );
};

export default EICInstallationDetails;
