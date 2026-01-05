
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Calculator, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { getCableCapacity, getCableSizeForRating, installationMethods } from '@/utils/regulationChecker/cableCapacityCalculator';
import { cableSizeOptions } from '@/types/cableTypes';

export const CableSelectionGuidance = () => {
  const [loadCurrent, setLoadCurrent] = useState('');
  const [protectionRating, setProtectionRating] = useState('');
  const [installationMethod, setInstallationMethod] = useState('method_c');
  const [isRingCircuit, setIsRingCircuit] = useState(false);
  const [ambientTemp, setAmbientTemp] = useState('40');
  const [groupingFactor, setGroupingFactor] = useState('1.0');
  
  const [recommendation, setRecommendation] = useState<{
    minimumSize: string;
    recommendedSize: string;
    capacity: number;
    compliance: boolean;
    reasoning: string[];
  } | null>(null);

  const handleCalculateRecommendation = () => {
    const load = parseFloat(loadCurrent) || 0;
    const protection = parseFloat(protectionRating) || 0;
    const grouping = parseFloat(groupingFactor) || 1.0;
    const ambient = parseFloat(ambientTemp) || 40;
    
    // Apply correction factors
    const ambientFactor = ambient <= 30 ? 1.15 : ambient <= 40 ? 1.0 : 0.91;
    const correctedLoad = Math.max(load, protection) / (ambientFactor * grouping);
    
    const minimumSize = getCableSizeForRating(correctedLoad, installationMethod, isRingCircuit);
    
    // Find next size up for safety margin
    const minIndex = cableSizeOptions.findIndex(cable => cable.label === minimumSize);
    const recommendedIndex = Math.min(minIndex + 1, cableSizeOptions.length - 1);
    const recommendedSize = cableSizeOptions[recommendedIndex]?.label || minimumSize;
    
    const capacity = getCableCapacity(
      cableSizeOptions.find(c => c.label === recommendedSize)?.value || '2.5mm', 
      installationMethod, 
      isRingCircuit
    );
    
    const reasoning = [];
    if (load > 0) reasoning.push(`Load current: ${load}A`);
    if (protection > 0) reasoning.push(`Protection rating: ${protection}A`);
    if (ambientFactor !== 1.0) reasoning.push(`Ambient temperature correction: ${ambientFactor}`);
    if (grouping !== 1.0) reasoning.push(`Grouping factor: ${grouping}`);
    if (isRingCircuit) reasoning.push('Ring circuit configuration doubles effective capacity');
    
    setRecommendation({
      minimumSize,
      recommendedSize,
      capacity: capacity * ambientFactor * grouping,
      compliance: capacity * ambientFactor * grouping >= Math.max(load, protection),
      reasoning
    });
  };

  return (
    <div className="space-y-6">
      {/* Cable Selection Tool */}
      <Card className="bg-muted border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            Smart Cable Selection Tool
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label className="text-foreground">Load Current (A)</Label>
              <Input
                type="number"
                placeholder="e.g. 20"
                value={loadCurrent}
                onChange={(e) => setLoadCurrent(e.target.value)}
                className="bg-card border-border text-foreground"
              />
            </div>
            
            <div>
              <Label className="text-foreground">Protection Rating (A)</Label>
              <Input
                type="number"
                placeholder="e.g. 32"
                value={protectionRating}
                onChange={(e) => setProtectionRating(e.target.value)}
                className="bg-card border-border text-foreground"
              />
            </div>
            
            <div>
              <Label className="text-foreground">Installation Method</Label>
              <Select value={installationMethod} onValueChange={setInstallationMethod}>
                 <SelectTrigger className="bg-elec-gray border-elec-gray text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(installationMethods).map(([key, method]) => (
                    <SelectItem key={key} value={key}>{method.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-foreground">Ambient Temperature (°C)</Label>
              <Select value={ambientTemp} onValueChange={setAmbientTemp}>
                 <SelectTrigger className="bg-elec-gray border-elec-gray text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25°C</SelectItem>
                  <SelectItem value="30">30°C</SelectItem>
                  <SelectItem value="40">40°C (Standard)</SelectItem>
                  <SelectItem value="50">50°C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-foreground">Grouping Factor</Label>
              <Select value={groupingFactor} onValueChange={setGroupingFactor}>
                <SelectTrigger className="bg-elec-gray border-elec-gray text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.0">1.0 (Single circuit)</SelectItem>
                  <SelectItem value="0.8">0.8 (Two circuits)</SelectItem>
                  <SelectItem value="0.7">0.7 (Three circuits)</SelectItem>
                  <SelectItem value="0.65">0.65 (Four circuits)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="ringCircuit"
                checked={isRingCircuit}
                onChange={(e) => setIsRingCircuit(e.target.checked)}
                className="w-4 h-4 text-elec-yellow bg-muted border-border rounded focus:ring-elec-yellow"
              />
              <Label htmlFor="ringCircuit" className="text-foreground">Ring Final Circuit</Label>
            </div>
          </div>
          
          <Button 
            onClick={handleCalculateRecommendation}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 font-bold"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Get Cable Recommendation
          </Button>
          
          {recommendation && (
            <div className="mt-6 p-6 bg-card rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                {recommendation.compliance ? (
                  <CheckCircle className="h-6 w-6 text-green-400" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                )}
                <h3 className="text-xl font-bold text-foreground">
                  {recommendation.compliance ? 'Compliant Design' : 'Non-Compliant Design'}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <h4 className="font-semibold text-blue-400 mb-2">Minimum Size</h4>
                  <p className="text-2xl font-bold text-foreground">{recommendation.minimumSize}</p>
                </div>
                
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-2">Recommended Size</h4>
                  <p className="text-2xl font-bold text-foreground">{recommendation.recommendedSize}</p>
                </div>
                
                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                  <h4 className="font-semibold text-yellow-400 mb-2">Effective Capacity</h4>
                  <p className="text-2xl font-bold text-foreground">{Math.round(recommendation.capacity)}A</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Design Considerations:</h4>
                {recommendation.reasoning.map((reason, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                    <ArrowRight className="h-3 w-3 text-elec-yellow" />
                    {reason}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Design Guidelines */}
      <Card className="bg-muted border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Professional Design Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2">✓ Best Practices</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Always apply appropriate correction factors</li>
                <li>• Consider future load growth (10-20% margin)</li>
                <li>• Account for voltage drop limitations</li>
                <li>• Use next size up for critical circuits</li>
                <li>• Consider cost vs performance trade-offs</li>
              </ul>
            </div>
            
            <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
              <h4 className="font-semibold text-red-400 mb-2">✗ Common Mistakes</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Ignoring ambient temperature effects</li>
                <li>• Overlooking cable grouping factors</li>
                <li>• Using tabulated values without corrections</li>
                <li>• Undersizing for protective device rating</li>
                <li>• Not considering thermal insulation</li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
            <h4 className="font-semibold text-blue-400 mb-2">Key Regulations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <strong>BS 7671 Section 433:</strong> Protection against overload current
              </div>
              <div>
                <strong>BS 7671 Section 523:</strong> Current-carrying capacity
              </div>
              <div>
                <strong>BS 7671 Section 525:</strong> Voltage drop requirements
              </div>
              <div>
                <strong>BS 7671 Appendix 4:</strong> Current-carrying capacity tables
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
