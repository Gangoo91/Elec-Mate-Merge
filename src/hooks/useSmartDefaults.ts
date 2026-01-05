import { useState, useEffect } from 'react';
import { offlineStorage } from '@/utils/offlineStorage';

interface SmartDefaults {
  contractorName?: string;
  contractorAddress?: string;
  supplyVoltage?: string;
  frequency?: string;
  earthingArrangement?: string;
  testInstrument?: string;
}

export const useSmartDefaults = (userId?: string) => {
  const [defaults, setDefaults] = useState<SmartDefaults>({});
  const [hasDefaults, setHasDefaults] = useState(false);

  useEffect(() => {
    const loadDefaults = async () => {
      try {
        const savedDefaults = await offlineStorage.getPreference('minorWorks_smartDefaults');
        if (savedDefaults) {
          setDefaults(savedDefaults);
          setHasDefaults(Object.keys(savedDefaults).length > 0);
        }
      } catch (e) {
        console.error('Failed to load smart defaults:', e);
      }
    };
    
    loadDefaults();
  }, [userId]);

  const saveDefaults = async (formData: any) => {
    const newDefaults: SmartDefaults = {
      contractorName: formData.contractorName,
      contractorAddress: formData.contractorAddress,
      supplyVoltage: formData.supplyVoltage,
      frequency: formData.frequency,
      earthingArrangement: formData.earthingArrangement,
      testInstrument: formData.testInstrument,
    };
    
    await offlineStorage.setPreference('minorWorks_smartDefaults', newDefaults);
    setDefaults(newDefaults);
    setHasDefaults(true);
  };

  const applyDefaults = () => {
    return defaults;
  };

  return {
    defaults,
    hasDefaults,
    applyDefaults,
    saveDefaults,
  };
};
