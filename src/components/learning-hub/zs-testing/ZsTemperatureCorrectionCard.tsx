
import React from 'react';
import { Calculator } from 'lucide-react';
import { ZsTestResult } from './types';

interface ZsTemperatureCorrectionCardProps {
  currentTest: ZsTestResult;
}

const ZsTemperatureCorrectionCard = ({ currentTest }: ZsTemperatureCorrectionCardProps) => (
  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
    <div className="flex items-center gap-2 mb-3">
      <Calculator className="h-4 w-4 text-orange-400" />
      <h4 className="font-medium text-orange-400">Temperature Correction Calculation</h4>
    </div>
    <div className="space-y-2 text-sm text-white">
      <p>Zs values must be corrected to maximum conductor operating temperature (70°C)</p>
      <p><strong>Formula:</strong> Zs(corrected) = Zs(measured) × (230 + 70) / (230 + test temp)</p>
      {currentTest.zsReading && currentTest.temperature && (
        <div className="mt-3 p-2 bg-card rounded">
          <p><strong>Measured Zs:</strong> {currentTest.zsReading}Ω at {currentTest.temperature}°C</p>
          <p><strong>Corrected Zs:</strong> {currentTest.correctedZs}Ω (at 70°C)</p>
        </div>
      )}
    </div>
  </div>
);

export default ZsTemperatureCorrectionCard;
