import { useMemo } from 'react';

interface FormData {
  [key: string]: any;
}

export const useSectionCompletion = (formData: FormData) => {
  const getSectionCompletion = useMemo(() => {
    const calculateCompletion = (fields: string[]) => {
      const filledFields = fields.filter(field => {
        const value = formData[field];
        if (typeof value === 'boolean') {
          return value === true;
        }
        return value?.toString().trim();
      }).length;
      
      return fields.length > 0 ? Math.round((filledFields / fields.length) * 100) : 0;
    };

    return {
      client: calculateCompletion([
        'propertyAddress',
        'postcode',
        'clientName',
        'workDate',
        'contractorName'
      ]),
      work: calculateCompletion([
        'workDescription',
        'workType',
        'workLocation'
      ]),
      supply: calculateCompletion([
        'earthingArrangement',
        'mainEarthingConductorSize',
        'mainBondingConductorSize'
      ]),
      circuit: calculateCompletion([
        'distributionBoard',
        'circuitDesignation',
        'protectiveDeviceType',
        'protectiveDeviceRating',
        'liveConductorSize',
        'cpcSize',
        'cableType'
      ]),
      tests: (() => {
        const baseTests = [
          'continuityR1R2',
          'ringFinalContinuity',
          'insulationLiveNeutral',
          'insulationLiveEarth',
          'insulationNeutralEarth',
          'polarity',
          'earthFaultLoopImpedance',
          'prospectiveFaultCurrent',
          'functionalTesting'
        ];
        
        // Add conditional tests based on selected protection devices
        const conditionalTests = [];
        
        // RCD/RCBO testing
        if (formData.protectionRcd || formData.protectionRcbo) {
          conditionalTests.push('rcdRating', 'rcdOneX');
        }
        
        // AFDD testing
        if (formData.protectionAfdd) {
          conditionalTests.push('afddTestButton');
        }
        
        // SPD testing
        if (formData.protectionSpd) {
          conditionalTests.push('spdIndicatorStatus', 'spdVisualInspection');
        }
        
        // Always include Earth Electrode and Phase Rotation (can be N/A)
        conditionalTests.push('earthElectrodeResistance', 'phaseRotation');
        
        return calculateCompletion([...baseTests, ...conditionalTests]);
      })(),
      equipment: calculateCompletion([
        'testEquipmentModel',
        'testEquipmentSerial',
        'testEquipmentCalDate'
      ]),
      declaration: calculateCompletion([
        'electricianName',
        'position',
        'qualificationLevel',
        'signatureDate',
        'bs7671Compliance',
        'testResultsAccurate',
        'workSafety'
      ])
    };
  }, [formData]);

  return getSectionCompletion;
};
