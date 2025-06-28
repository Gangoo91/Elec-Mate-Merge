
import { useState } from 'react';
import { cableSizes, CableSizeOption } from './cableSizeData';

export interface CableSizingInputs {
  current: string;
  length: string;
  installationType: string;
  cableType: string;
  voltage: string;
  voltageDrop: string;
  ambientTemp?: string;
  cableGrouping?: string;
  loadType?: string;
  diversityFactor?: string;
}

export interface CableSizingErrors {
  current?: string;
  length?: string;
  voltage?: string;
  voltageDrop?: string;
  installationType?: string;
  ambientTemp?: string;
  diversityFactor?: string;
  calculation?: string;
  general?: string;
}

export interface CableSizingResult {
  recommendedCable: CableSizeOption | null;
  alternativeCables: CableSizeOption[];
  errors: CableSizingErrors | null;
}

export const useCableSizing = () => {
  const [inputs, setInputs] = useState<CableSizingInputs>({
    current: '',
    length: '',
    installationType: '',
    cableType: 'pvc',
    voltage: '230',
    voltageDrop: '5',
    ambientTemp: '30',
    cableGrouping: '1',
    loadType: 'resistive',
    diversityFactor: '1.0'
  });

  const [result, setResult] = useState<CableSizingResult>({
    recommendedCable: null,
    alternativeCables: [],
    errors: null
  });

  const updateInput = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const setInstallationType = (type: string) => {
    setInputs(prev => ({ ...prev, installationType: type }));
  };

  const setCableType = (type: string) => {
    setInputs(prev => ({ ...prev, cableType: type }));
  };

  const validateInputs = (): CableSizingErrors | null => {
    const errors: CableSizingErrors = {};

    if (!inputs.current || parseFloat(inputs.current) <= 0) {
      errors.current = 'Current must be greater than 0';
    }

    if (!inputs.length || parseFloat(inputs.length) <= 0) {
      errors.length = 'Length must be greater than 0';
    }

    if (!inputs.voltage || parseFloat(inputs.voltage) <= 0) {
      errors.voltage = 'Voltage must be greater than 0';
    }

    if (!inputs.voltageDrop || parseFloat(inputs.voltageDrop) <= 0 || parseFloat(inputs.voltageDrop) > 10) {
      errors.voltageDrop = 'Voltage drop must be between 0.1% and 10%';
    }

    if (!inputs.installationType) {
      errors.installationType = 'Please select installation type';
    }

    const ambientTemp = parseFloat(inputs.ambientTemp || '30');
    if (ambientTemp < -20 || ambientTemp > 80) {
      errors.ambientTemp = 'Ambient temperature must be between -20°C and 80°C';
    }

    const diversityFactor = parseFloat(inputs.diversityFactor || '1.0');
    if (diversityFactor < 0.1 || diversityFactor > 1.0) {
      errors.diversityFactor = 'Diversity factor must be between 0.1 and 1.0';
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };

  const calculateCableSize = () => {
    const validationErrors = validateInputs();
    if (validationErrors) {
      setResult({
        recommendedCable: null,
        alternativeCables: [],
        errors: validationErrors
      });
      return;
    }

    const current = parseFloat(inputs.current);
    const length = parseFloat(inputs.length);
    const voltage = parseFloat(inputs.voltage);
    const maxVoltageDropPercent = parseFloat(inputs.voltageDrop);
    const ambientTemp = parseFloat(inputs.ambientTemp || '30');
    const cableGrouping = parseInt(inputs.cableGrouping || '1');
    const diversityFactor = parseFloat(inputs.diversityFactor || '1.0');

    // Calculate temperature derating factor
    const tempDerating = ambientTemp > 30 ? 
      Math.max(0.5, 1 - ((ambientTemp - 30) * 0.01)) : 1.0;

    // Calculate grouping factor
    const groupingFactors: Record<number, number> = {
      1: 1.0, 2: 0.8, 3: 0.7, 4: 0.65, 5: 0.6, 7: 0.55, 10: 0.5
    };
    const groupingFactor = groupingFactors[cableGrouping] || 0.45;

    // Apply diversity factor to design current
    const adjustedCurrent = current * diversityFactor;

    // Calculate required current rating with safety factors
    const requiredRating = adjustedCurrent / (tempDerating * groupingFactor);

    // Find suitable cables
    const suitableCables = cableSizes.filter(cable => {
      const rating = cable.currentRating[inputs.cableType as keyof typeof cable.currentRating] || 0;
      
      // Calculate voltage drop
      const voltageDrop = (adjustedCurrent * length * cable.voltageDropPerAmpereMeter) / 1000;
      const voltageDropPercentage = (voltageDrop / voltage) * 100;
      
      cable.calculatedVoltageDrop = voltageDrop;
      cable.meetsVoltageDrop = voltageDropPercentage <= maxVoltageDropPercent;
      
      return rating >= requiredRating && cable.meetsVoltageDrop;
    });

    if (suitableCables.length === 0) {
      setResult({
        recommendedCable: null,
        alternativeCables: [],
        errors: { calculation: 'No suitable cable found for these conditions' }
      });
      return;
    }

    // Sort by size (smallest first) and pick the smallest suitable cable
    suitableCables.sort((a, b) => {
      const aSize = parseFloat(a.size.match(/[\d.]+/)?.[0] || '0');
      const bSize = parseFloat(b.size.match(/[\d.]+/)?.[0] || '0');
      return aSize - bSize;
    });

    setResult({
      recommendedCable: suitableCables[0],
      alternativeCables: suitableCables.slice(1, 4), // Show up to 3 alternatives
      errors: null
    });
  };

  const resetCalculator = () => {
    setInputs({
      current: '',
      length: '',
      installationType: '',
      cableType: 'pvc',
      voltage: '230',
      voltageDrop: '5',
      ambientTemp: '30',
      cableGrouping: '1',
      loadType: 'resistive',
      diversityFactor: '1.0'
    });
    setResult({
      recommendedCable: null,
      alternativeCables: [],
      errors: null
    });
  };

  return {
    inputs,
    result,
    updateInput,
    setInstallationType,
    setCableType,
    calculateCableSize,
    resetCalculator
  };
};
