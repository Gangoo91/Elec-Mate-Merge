
export const calculateTemperatureCorrection = (resistance: number, measuredTemp: number, referenceTemp: number = 20): number => {
  const tempDifference = measuredTemp - referenceTemp;
  const correctionFactor = Math.pow(1.07, -tempDifference);
  return resistance * correctionFactor;
};

export const updateCorrectedValues = (test: any) => {
  const temp = parseFloat(test.temperature);
  const corrected = { ...test.correctedValues };

  if (test.liveNeutral && !isNaN(temp)) {
    const value = parseFloat(test.liveNeutral.replace('>', ''));
    if (!isNaN(value)) {
      const correctedValue = calculateTemperatureCorrection(value, temp);
      corrected.liveNeutral = correctedValue > 999 ? '>999' : correctedValue.toFixed(1);
    }
  }

  if (test.liveEarth && !isNaN(temp)) {
    const value = parseFloat(test.liveEarth.replace('>', ''));
    if (!isNaN(value)) {
      const correctedValue = calculateTemperatureCorrection(value, temp);
      corrected.liveEarth = correctedValue > 999 ? '>999' : correctedValue.toFixed(1);
    }
  }

  if (test.neutralEarth && !isNaN(temp)) {
    const value = parseFloat(test.neutralEarth.replace('>', ''));
    if (!isNaN(value)) {
      const correctedValue = calculateTemperatureCorrection(value, temp);
      corrected.neutralEarth = correctedValue > 999 ? '>999' : correctedValue.toFixed(1);
    }
  }

  return corrected;
};
