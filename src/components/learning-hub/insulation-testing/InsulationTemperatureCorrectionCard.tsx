
import React from 'react';
import { Thermometer, Calculator } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InsulationTestResult } from './types';

interface InsulationTemperatureCorrectionCardProps {
  currentTest: InsulationTestResult;
}

const InsulationTemperatureCorrectionCard = ({ currentTest }: InsulationTemperatureCorrectionCardProps) => {
  const calculateCorrection = (temperature: number) => {
    const factor = Math.pow(1.07, -(temperature - 20));
    return factor;
  };

  const temp = parseFloat(currentTest.temperature);
  const correctionFactor = !isNaN(temp) ? calculateCorrection(temp) : 1;

  return (
    <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
      <CardHeader>
        <CardTitle className="text-blue-400 flex items-center gap-2">
          <Thermometer className="h-5 w-5" />
          Temperature Correction for Insulation Resistance
        </CardTitle>
        <CardDescription className="text-gray-300">
          Apply temperature corrections to ensure accurate assessment of insulation condition
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="h-4 w-4 text-blue-400" />
            <h4 className="font-medium text-blue-400">Current Test Temperature Correction</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-300 mb-2">Test Temperature: <span className="text-foreground">{currentTest.temperature}°C</span></p>
              <p className="text-gray-300 mb-2">Correction Factor: <span className="text-foreground">{correctionFactor.toFixed(3)}</span></p>
              <p className="text-xs text-gray-400">
                Formula: Factor = 1.07^(20-T_measured)
              </p>
            </div>
            <div>
              <p className="text-gray-300 mb-2">Temperature Effect:</p>
              <div className="text-xs space-y-1">
                {temp < 20 && <p className="text-blue-400">• Cold conditions: Higher resistance readings</p>}
                {temp === 20 && <p className="text-green-400">• Standard conditions: No correction needed</p>}
                {temp > 20 && <p className="text-red-400">• Warm conditions: Lower resistance readings</p>}
                <p className="text-gray-400">• 7% change per °C temperature difference</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
          <h4 className="font-medium text-purple-400 mb-3">Temperature Correction Examples</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-card rounded p-3">
              <p className="font-medium text-blue-400 mb-2">Cold Weather (5°C)</p>
              <p className="text-gray-300">Reading: 500MΩ</p>
              <p className="text-gray-300">Factor: 2.105</p>
              <p className="text-foreground">Corrected: 238MΩ</p>
            </div>
            <div className="bg-card rounded p-3">
              <p className="font-medium text-green-400 mb-2">Standard (20°C)</p>
              <p className="text-gray-300">Reading: 300MΩ</p>
              <p className="text-gray-300">Factor: 1.000</p>
              <p className="text-foreground">Corrected: 300MΩ</p>
            </div>
            <div className="bg-card rounded p-3">
              <p className="font-medium text-red-400 mb-2">Hot Weather (35°C)</p>
              <p className="text-gray-300">Reading: 150MΩ</p>
              <p className="text-gray-300">Factor: 0.475</p>
              <p className="text-foreground">Corrected: 316MΩ</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h4 className="font-medium text-yellow-400 mb-2">Why Temperature Correction Matters</h4>
          <div className="text-sm text-gray-300 space-y-1">
            <p>• <strong>Fair Assessment:</strong> Ensures consistent evaluation regardless of weather</p>
            <p>• <strong>Accurate Diagnosis:</strong> Reveals true insulation condition, not just temperature effects</p>
            <p>• <strong>Trending Analysis:</strong> Allows meaningful comparison of tests taken at different times</p>
            <p>• <strong>Compliance:</strong> BS 7671 requires consideration of temperature effects</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsulationTemperatureCorrectionCard;
