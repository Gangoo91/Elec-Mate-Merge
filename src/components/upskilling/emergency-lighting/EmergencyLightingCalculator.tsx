import { useState } from 'react';
import { Calculator, Lightbulb, AlertTriangle, CheckCircle, Info, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LuminaireData {
  type: string;
  lumens: number;
  spacing: number; // Maximum spacing at 2.5m mounting height
  description: string;
}

const luminaireTypes: LuminaireData[] = [
  { type: 'standard-bulkhead', lumens: 200, spacing: 5, description: 'Standard LED Bulkhead (200 lumens)' },
  { type: 'high-output-bulkhead', lumens: 400, spacing: 7, description: 'High Output LED Bulkhead (400 lumens)' },
  { type: 'twin-spot', lumens: 300, spacing: 6, description: 'Twin Spot Emergency Light (300 lumens)' },
  { type: 'maintained-diffuser', lumens: 450, spacing: 7.5, description: 'Maintained Diffuser Panel (450 lumens)' },
  { type: 'high-bay', lumens: 600, spacing: 9, description: 'High Bay Emergency Fitting (600 lumens)' },
];

export const EmergencyLightingCalculator = () => {
  const [areaType, setAreaType] = useState<string>('escape-route');
  const [roomLength, setRoomLength] = useState<string>('');
  const [roomWidth, setRoomWidth] = useState<string>('');
  const [mountingHeight, setMountingHeight] = useState<string>('2.5');
  const [luminaireType, setLuminaireType] = useState<string>('standard-bulkhead');
  const [reflectance, setReflectance] = useState<string>('medium');
  const [results, setResults] = useState<any>(null);

  const getRequiredLux = (type: string): number => {
    switch(type) {
      case 'escape-route': return 1.0;
      case 'open-area-15': return 0.5;
      case 'open-area-60': return 0.5;
      case 'high-risk': return 15.0;
      default: return 1.0;
    }
  };

  const getReflectanceFactor = (ref: string): number => {
    switch(ref) {
      case 'high': return 1.0; // Light walls, clean surfaces
      case 'medium': return 0.85; // Normal conditions
      case 'low': return 0.7; // Dark walls, industrial
      default: return 0.85;
    }
  };

  const getAreaName = (type: string): string => {
    switch(type) {
      case 'escape-route': return 'Escape Route (1.0 lux)';
      case 'open-area-15': return 'Open Area <15m² (0.5 lux)';
      case 'open-area-60': return 'Open Area >15m² <60m² (0.5 lux)';
      case 'high-risk': return 'High Risk Area (15 lux)';
      default: return 'Unknown';
    }
  };

  const calculateLighting = () => {
    const length = parseFloat(roomLength);
    const width = parseFloat(roomWidth);
    const height = parseFloat(mountingHeight);

    if (!length || !width || !height) return;

    const area = length * width;
    const requiredLux = getRequiredLux(areaType);
    const reflectanceFactor = getReflectanceFactor(reflectance);
    
    // Get selected luminaire data
    const luminaire = luminaireTypes.find(l => l.type === luminaireType);
    if (!luminaire) return;

    // Adjust spacing for mounting height (reference is 2.5m)
    const heightFactor = 2.5 / height;
    const adjustedSpacing = luminaire.spacing * heightFactor;

    // Calculate number of luminaires needed (spacing method)
    const lengthFittings = Math.ceil(length / adjustedSpacing);
    const widthFittings = Math.ceil(width / adjustedSpacing);
    const fittingsNeeded = lengthFittings * widthFittings;

    // Calculate average lux level
    const totalLumens = luminaire.lumens * fittingsNeeded;
    const utilisationFactor = 0.4; // Typical for emergency lighting
    const maintenanceFactor = 0.8; // Account for degradation
    
    const averageLux = (totalLumens * utilisationFactor * maintenanceFactor * reflectanceFactor) / area;

    // Compliance check
    const compliant = averageLux >= requiredLux;
    const margin = ((averageLux - requiredLux) / requiredLux) * 100;

    // Cost estimation (£40 per fitting average)
    const estimatedCost = fittingsNeeded * 40;

    // Generate warnings and recommendations
    const warnings: string[] = [];
    const recommendations: string[] = [];

    if (!compliant) {
      warnings.push(`Calculated lux level (${averageLux.toFixed(2)}) is below BS 5266-1 requirement (${requiredLux} lux)`);
      recommendations.push('Increase number of fittings or use higher output luminaires');
    } else if (margin < 20) {
      warnings.push(`Limited safety margin - only ${margin.toFixed(0)}% above minimum`);
      recommendations.push('Consider adding 1-2 additional fittings for safety margin');
    }

    if (height > 3.5) {
      warnings.push('Mounting height >3.5m may reduce effective illumination at floor level');
      recommendations.push('Consider high-output luminaires or reduce spacing between fittings');
    }

    if (reflectance === 'low') {
      recommendations.push('Dark surfaces reduce effectiveness - consider surface treatments or additional fittings');
    }

    if (areaType === 'high-risk' && luminaireType === 'standard-bulkhead') {
      warnings.push('Standard bulkheads may not provide adequate illumination for high-risk areas');
      recommendations.push('Specify high-output or high-bay fittings for high-risk task areas');
    }

    if (area > 60 && areaType.includes('open-area')) {
      recommendations.push('Large open area - consider subdividing or using higher output fittings');
    }

    // Best practices
    const bestPractices: string[] = [
      'Always conduct on-site lux testing after installation',
      'Position luminaires to avoid shadowing from equipment/furniture',
      'Document all calculations in the emergency lighting logbook',
      'Allow for 20% safety margin to account for real-world conditions',
      'Review spacing if ceiling obstructions are present'
    ];

    setResults({
      area,
      requiredLux,
      averageLux,
      fittingsNeeded,
      lengthFittings,
      widthFittings,
      adjustedSpacing,
      compliant,
      margin,
      estimatedCost,
      warnings,
      recommendations,
      bestPractices,
      luminaireDescription: luminaire.description,
      reflectanceFactor
    });
  };

  const clearResults = () => {
    setRoomLength('');
    setRoomWidth('');
    setMountingHeight('2.5');
    setAreaType('escape-route');
    setLuminaireType('standard-bulkhead');
    setReflectance('medium');
    setResults(null);
  };

  const exportReport = () => {
    if (!results) return;
    
    const report = `
EMERGENCY LIGHTING CALCULATION REPORT
Generated: ${new Date().toLocaleDateString('en-GB')}

PROJECT DETAILS
================
Area Type: ${getAreaName(areaType)}
Room Dimensions: ${roomLength}m × ${roomWidth}m
Total Area: ${results.area.toFixed(2)}m²
Mounting Height: ${mountingHeight}m

DESIGN PARAMETERS
==================
Required Illuminance: ${results.requiredLux} lux
Luminaire Type: ${results.luminaireDescription}
Adjusted Spacing: ${results.adjustedSpacing.toFixed(2)}m
Surface Reflectance: ${reflectance} (${(results.reflectanceFactor * 100).toFixed(0)}%)

CALCULATION RESULTS
====================
Fittings Required: ${results.fittingsNeeded}
Layout: ${results.lengthFittings} × ${results.widthFittings}
Average Lux Level: ${results.averageLux.toFixed(2)} lux
Compliance: ${results.compliant ? 'PASS ✓' : 'FAIL ✗'}
Safety Margin: ${results.margin.toFixed(1)}%
Estimated Cost: £${results.estimatedCost}

${results.warnings.length > 0 ? `WARNINGS
=========
${results.warnings.map((w, i) => `${i + 1}. ${w}`).join('\n')}
` : ''}
${results.recommendations.length > 0 ? `RECOMMENDATIONS
================
${results.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}
` : ''}
BEST PRACTICES
===============
${results.bestPractices.map((bp, i) => `${i + 1}. ${bp}`).join('\n')}

COMPLIANCE STATEMENT
=====================
This calculation is based on BS 5266-1:2025 guidelines.
Physical lux testing must be conducted after installation.
Results assume clean luminaires and typical utilisation factors.

Designer: _______________  Date: _______________
`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Emergency_Lighting_Calculation_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="bg-elec-gray border-elec-yellow/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-elec-yellow" />
          Emergency Lighting Calculator
        </CardTitle>
        <p className="text-gray-300 text-sm mt-2">
          Calculate required emergency lighting based on BS 5266-1:2025
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="area-type" className="text-foreground">Area Type</Label>
            <Select value={areaType} onValueChange={setAreaType}>
              <SelectTrigger className="bg-elec-dark border-gray-600 text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-gray-600">
                <SelectItem value="escape-route" className="text-foreground hover:bg-elec-gray hover:text-foreground">Escape Route (1.0 lux)</SelectItem>
                <SelectItem value="open-area-15" className="text-foreground hover:bg-elec-gray hover:text-foreground">Open Area &lt;15m² (0.5 lux)</SelectItem>
                <SelectItem value="open-area-60" className="text-foreground hover:bg-elec-gray hover:text-foreground">Open Area 15-60m² (0.5 lux)</SelectItem>
                <SelectItem value="high-risk" className="text-foreground hover:bg-elec-gray hover:text-foreground">High Risk Area (15 lux)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="length" className="text-foreground">Room Length (m)</Label>
            <Input
              id="length"
              type="number"
              step="0.1"
              placeholder="e.g., 10.0"
              value={roomLength}
              onChange={(e) => setRoomLength(e.target.value)}
              className="bg-elec-dark border-gray-600 text-foreground placeholder-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="width" className="text-foreground">Room Width (m)</Label>
            <Input
              id="width"
              type="number"
              step="0.1"
              placeholder="e.g., 8.0"
              value={roomWidth}
              onChange={(e) => setRoomWidth(e.target.value)}
              className="bg-elec-dark border-gray-600 text-foreground placeholder-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="height" className="text-foreground">Mounting Height (m)</Label>
            <Input
              id="height"
              type="number"
              step="0.1"
              placeholder="e.g., 2.5"
              value={mountingHeight}
              onChange={(e) => setMountingHeight(e.target.value)}
              className="bg-elec-dark border-gray-600 text-foreground placeholder-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="luminaire" className="text-foreground">Luminaire Type</Label>
            <Select value={luminaireType} onValueChange={setLuminaireType}>
              <SelectTrigger className="bg-elec-dark border-gray-600 text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-gray-600">
                {luminaireTypes.map(lum => (
                  <SelectItem key={lum.type} value={lum.type} className="text-foreground hover:bg-elec-gray hover:text-foreground">
                    {lum.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reflectance" className="text-foreground">Surface Reflectance</Label>
            <Select value={reflectance} onValueChange={setReflectance}>
              <SelectTrigger className="bg-elec-dark border-gray-600 text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-gray-600">
                <SelectItem value="high" className="text-foreground hover:bg-elec-gray hover:text-foreground">High (Light walls/ceilings)</SelectItem>
                <SelectItem value="medium" className="text-foreground hover:bg-elec-gray hover:text-foreground">Medium (Standard)</SelectItem>
                <SelectItem value="low" className="text-foreground hover:bg-elec-gray hover:text-foreground">Low (Dark surfaces)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={calculateLighting}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
            disabled={!roomLength || !roomWidth}
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Requirements
          </Button>
          <Button 
            variant="outline" 
            onClick={clearResults}
            className="border-gray-600 text-gray-300 hover:bg-elec-gray"
          >
            Clear
          </Button>
        </div>

        {results && (
          <div className="space-y-6 mt-6">
            {/* Compliance Status */}
            <div className={`p-4 rounded-lg border-2 ${results.compliant ? 'bg-green-900/30 border-green-500' : 'bg-red-900/30 border-red-500'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {results.compliant ? (
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  ) : (
                    <AlertTriangle className="h-8 w-8 text-red-400" />
                  )}
                  <div>
                    <p className={`text-xl font-bold ${results.compliant ? 'text-green-300' : 'text-red-300'}`}>
                      {results.compliant ? 'COMPLIANT' : 'NOT COMPLIANT'}
                    </p>
                    <p className={`text-sm ${results.compliant ? 'text-green-200' : 'text-red-200'}`}>
                      {results.compliant 
                        ? `${results.margin.toFixed(0)}% above minimum requirement`
                        : 'Additional luminaires required'
                      }
                    </p>
                  </div>
                </div>
                <Badge className={results.compliant ? 'bg-green-600' : 'bg-red-600'}>
                  {results.averageLux.toFixed(2)} lux
                </Badge>
              </div>
            </div>

            {/* Key Results */}
            <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-elec-yellow" />
                Calculation Results
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-gray-300"><strong className="text-foreground">Total Area:</strong> {results.area.toFixed(2)}m²</p>
                  <p className="text-gray-300"><strong className="text-foreground">Required Lux:</strong> {results.requiredLux} lux</p>
                  <p className="text-gray-300"><strong className="text-foreground">Calculated Lux:</strong> {results.averageLux.toFixed(2)} lux</p>
                  <p className="text-gray-300"><strong className="text-foreground">Adjusted Spacing:</strong> {results.adjustedSpacing.toFixed(2)}m</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300"><strong className="text-foreground">Luminaires Required:</strong> {results.fittingsNeeded}</p>
                  <p className="text-gray-300"><strong className="text-foreground">Layout:</strong> {results.lengthFittings} × {results.widthFittings}</p>
                  <p className="text-gray-300"><strong className="text-foreground">Estimated Cost:</strong> £{results.estimatedCost}</p>
                  <p className="text-gray-300"><strong className="text-foreground">Safety Margin:</strong> {results.margin.toFixed(1)}%</p>
                </div>
              </div>
            </div>

            {/* Warnings */}
            {results.warnings.length > 0 && (
              <div className="bg-amber-900/30 border border-amber-500/50 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-400 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Warnings
                </h4>
                <ul className="space-y-2">
                  {results.warnings.map((warning: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-amber-200 text-sm">
                      <span className="text-amber-400">⚠</span>
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {results.recommendations.length > 0 && (
              <div className="bg-blue-900/30 border border-blue-500/50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Recommendations
                </h4>
                <ul className="space-y-2">
                  {results.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-blue-200 text-sm">
                      <span className="text-blue-400">💡</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Best Practices */}
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
              <h4 className="font-semibold text-elec-yellow mb-3">Best Practice Reminders</h4>
              <ul className="space-y-1.5">
                {results.bestPractices.map((practice: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-foreground text-sm">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Export Button */}
            <Button 
              onClick={exportReport}
              className="w-full bg-elec-yellow text-elec-dark hover:bg-yellow-600"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Calculation Report
            </Button>
          </div>
        )}

        {/* Information Panel */}
        <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg mt-6">
          <h4 className="text-blue-300 font-semibold mb-2 flex items-center gap-2">
            <Info className="h-4 w-4" />
            About This Calculator
          </h4>
          <p className="text-blue-200 text-sm leading-relaxed">
            This calculator uses the lumen method to estimate emergency lighting requirements based on BS 5266-1:2025. 
            Results are indicative only and should be verified using professional lighting design software (DIALux, Relux) 
            and confirmed with on-site lux testing after installation. Always apply engineering judgement and account for 
            site-specific conditions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
