import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Calculator, RotateCcw, TrendingUp, AlertCircle, Zap, Shield, BookOpen, Target } from "lucide-react";
import { calculatePowerQuality, type PowerQualityInputs, type PowerQualityResults } from "@/lib/powerquality";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import InfoBox from "@/components/common/InfoBox";

const PowerQualityCalculator = () => {
  const [fundamentalCurrent, setFundamentalCurrent] = useState<string>("");
  const [fundamentalVoltage, setFundamentalVoltage] = useState<string>("230");
  const [systemType, setSystemType] = useState<'single-phase' | 'three-phase'>('single-phase');
  const [loadType, setLoadType] = useState<'linear' | 'non-linear' | 'mixed'>('non-linear');
  const [frequency, setFrequency] = useState<string>("50");
  
  // Individual harmonic inputs
  const [harmonic3, setHarmonic3] = useState<string>("");
  const [harmonic5, setHarmonic5] = useState<string>("");
  const [harmonic7, setHarmonic7] = useState<string>("");
  const [harmonic9, setHarmonic9] = useState<string>("");
  const [harmonic11, setHarmonic11] = useState<string>("");
  const [harmonic13, setHarmonic13] = useState<string>("");
  const [harmonic15, setHarmonic15] = useState<string>("");
  const [harmonic17, setHarmonic17] = useState<string>("");
  
  const [result, setResult] = useState<PowerQualityResults | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!fundamentalCurrent || parseFloat(fundamentalCurrent) <= 0) {
      newErrors.fundamentalCurrent = "Fundamental current is required";
    }
    
    if (!fundamentalVoltage || parseFloat(fundamentalVoltage) <= 0) {
      newErrors.fundamentalVoltage = "Fundamental voltage is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePQ = () => {
    if (!validateInputs()) return;
    
    const I1 = parseFloat(fundamentalCurrent);
    const V1 = parseFloat(fundamentalVoltage);
    const freq = parseFloat(frequency) || 50;
    
    // Build harmonics array from inputs
    const harmonics = [
      { order: 3, current: parseFloat(harmonic3) || 0 },
      { order: 5, current: parseFloat(harmonic5) || 0 },
      { order: 7, current: parseFloat(harmonic7) || 0 },
      { order: 9, current: parseFloat(harmonic9) || 0 },
      { order: 11, current: parseFloat(harmonic11) || 0 },
      { order: 13, current: parseFloat(harmonic13) || 0 },
      { order: 15, current: parseFloat(harmonic15) || 0 },
      { order: 17, current: parseFloat(harmonic17) || 0 },
    ].filter(h => h.current > 0);
    
    const inputs: PowerQualityInputs = {
      fundamentalCurrent: I1,
      fundamentalVoltage: V1,
      harmonics,
      systemType,
      frequency: freq,
      loadType
    };
    
    const results = calculatePowerQuality(inputs);
    setResult(results);
  };

  const reset = () => {
    setFundamentalCurrent("");
    setFundamentalVoltage("230");
    setSystemType('single-phase');
    setLoadType('non-linear');
    setFrequency("50");
    setHarmonic3("");
    setHarmonic5("");
    setHarmonic7("");
    setHarmonic9("");
    setHarmonic11("");
    setHarmonic13("");
    setHarmonic15("");
    setHarmonic17("");
    setResult(null);
    setErrors({});
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "excellent": return "text-green-400 bg-green-500/20";
      case "good": return "text-blue-400 bg-blue-500/20";
      case "fair": return "text-yellow-400 bg-yellow-500/20";
      case "poor": return "text-orange-400 bg-orange-500/20";
      case "critical": return "text-red-400 bg-red-500/20";
      default: return "text-muted-foreground bg-muted/20";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-green-400";
      case "medium": return "text-yellow-400";
      case "high": return "text-orange-400";
      case "critical": return "text-red-400";
      default: return "text-muted-foreground";
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case "compliant": return "text-green-400";
      case "borderline": return "text-yellow-400";
      case "non-compliant": return "text-red-400";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-elec-yellow" />
            <CardTitle>Power Quality & THD Calculator</CardTitle>
          </div>
          <CardDescription>
            Comprehensive harmonic analysis for BS 7671 18th Edition compliance and power quality assessment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* System Configuration */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-elec-yellow">System Configuration</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">System Type</label>
                  <Select value={systemType} onValueChange={(value: 'single-phase' | 'three-phase') => setSystemType(value)}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single-phase">Single Phase</SelectItem>
                      <SelectItem value="three-phase">Three Phase</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Load Type</label>
                  <Select value={loadType} onValueChange={(value: 'linear' | 'non-linear' | 'mixed') => setLoadType(value)}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="linear">Linear Loads</SelectItem>
                      <SelectItem value="non-linear">Non-Linear Loads</SelectItem>
                      <SelectItem value="mixed">Mixed Loads</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Fundamental Values */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-elec-yellow">Fundamental Values</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <MobileInput
                  label="Fundamental Current"
                  type="number"
                  step="0.1"
                  value={fundamentalCurrent}
                  onChange={(e) => setFundamentalCurrent(e.target.value)}
                  placeholder="10.0"
                  unit="A"
                  error={errors.fundamentalCurrent}
                />

                <MobileInput
                  label="Fundamental Voltage"
                  type="number"
                  step="0.1"
                  value={fundamentalVoltage}
                  onChange={(e) => setFundamentalVoltage(e.target.value)}
                  placeholder="230"
                  unit="V"
                  error={errors.fundamentalVoltage}
                />

                <MobileInput
                  label="Frequency"
                  type="number"
                  step="0.1"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  placeholder="50"
                  unit="Hz"
                />
              </div>
            </div>

            {/* Harmonic Components */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-elec-yellow">Harmonic Current Components</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <MobileInput
                  label="3rd Harmonic"
                  type="number"
                  step="0.01"
                  value={harmonic3}
                  onChange={(e) => setHarmonic3(e.target.value)}
                  placeholder="0.5"
                  unit="A"
                />

                <MobileInput
                  label="5th Harmonic"
                  type="number"
                  step="0.01"
                  value={harmonic5}
                  onChange={(e) => setHarmonic5(e.target.value)}
                  placeholder="0.8"
                  unit="A"
                />

                <MobileInput
                  label="7th Harmonic"
                  type="number"
                  step="0.01"
                  value={harmonic7}
                  onChange={(e) => setHarmonic7(e.target.value)}
                  placeholder="0.3"
                  unit="A"
                />

                <MobileInput
                  label="9th Harmonic"
                  type="number"
                  step="0.01"
                  value={harmonic9}
                  onChange={(e) => setHarmonic9(e.target.value)}
                  placeholder="0.2"
                  unit="A"
                />

                <MobileInput
                  label="11th Harmonic"
                  type="number"
                  step="0.01"
                  value={harmonic11}
                  onChange={(e) => setHarmonic11(e.target.value)}
                  placeholder="0.15"
                  unit="A"
                />

                <MobileInput
                  label="13th Harmonic"
                  type="number"
                  step="0.01"
                  value={harmonic13}
                  onChange={(e) => setHarmonic13(e.target.value)}
                  placeholder="0.1"
                  unit="A"
                />

                <MobileInput
                  label="15th Harmonic"
                  type="number"
                  step="0.01"
                  value={harmonic15}
                  onChange={(e) => setHarmonic15(e.target.value)}
                  placeholder="0.05"
                  unit="A"
                />

                <MobileInput
                  label="17th Harmonic"
                  type="number"
                  step="0.01"
                  value={harmonic17}
                  onChange={(e) => setHarmonic17(e.target.value)}
                  placeholder="0.03"
                  unit="A"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <MobileButton 
                onClick={calculatePQ}
                variant="elec"
                size="wide"
                disabled={!fundamentalCurrent}
                className="sm:flex-1"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Analyse Power Quality
              </MobileButton>
              <MobileButton 
                onClick={reset} 
                variant="outline" 
                size="default"
                className="sm:w-auto"
              >
                <RotateCcw className="h-4 w-4" />
              </MobileButton>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Header with Overall Assessment */}
              <div className="text-center space-y-3">
                <h3 className="text-xl font-semibold text-elec-yellow">Power Quality Analysis Results</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  <Badge className={getRatingColor(result.powerQualityRating)} variant="secondary">
                    {result.powerQualityRating.toUpperCase()}
                  </Badge>
                  <Badge className={getRiskColor(result.riskLevel)} variant="outline">
                    {result.riskLevel.toUpperCase()} RISK
                  </Badge>
                  <Badge className={getComplianceColor(result.complianceStatus)} variant="outline">
                    {result.complianceStatus.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <Separator />

               {/* Key Metrics Grid - Optimized for Mobile */}
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                 <div className="text-center p-3 bg-background/40 rounded-lg border border-elec-yellow/10">
                   <div className="text-xs text-muted-foreground mb-1">THDi Current</div>
                   <div className={`text-lg sm:text-xl font-bold ${
                     result.thdiCurrent > 15 ? 'text-red-400' :
                     result.thdiCurrent > 10 ? 'text-orange-400' :
                     result.thdiCurrent > 5 ? 'text-yellow-400' : 'text-green-400'
                   }`}>
                     {result.thdiCurrent.toFixed(2)}%
                   </div>
                   <div className="text-xs text-muted-foreground">Limit: 5%</div>
                 </div>
                 
                 <div className="text-center p-3 bg-background/40 rounded-lg border border-elec-yellow/10">
                   <div className="text-xs text-muted-foreground mb-1">RMS Current</div>
                   <div className="text-lg sm:text-xl font-bold text-elec-yellow">{result.rmsCurrentTotal.toFixed(2)}A</div>
                   <div className="text-xs text-muted-foreground">Total RMS</div>
                 </div>

                 <div className="text-center p-3 bg-background/40 rounded-lg border border-elec-yellow/10">
                   <div className="text-xs text-muted-foreground mb-1">Crest Factor</div>
                   <div className={`text-lg sm:text-xl font-bold ${
                     result.crestFactorCurrent > 2.5 ? 'text-orange-400' :
                     result.crestFactorCurrent > 2.0 ? 'text-yellow-400' : 'text-green-400'
                   }`}>
                     {result.crestFactorCurrent.toFixed(2)}
                   </div>
                   <div className="text-xs text-muted-foreground">Typical: 1.41</div>
                 </div>

                 <div className="text-center p-3 bg-background/40 rounded-lg border border-elec-yellow/10">
                   <div className="text-xs text-muted-foreground mb-1">K-Factor</div>
                   <div className={`text-lg sm:text-xl font-bold ${
                     result.kFactor > 13 ? 'text-red-400' :
                     result.kFactor > 9 ? 'text-orange-400' :
                     result.kFactor > 4 ? 'text-yellow-400' : 'text-green-400'
                   }`}>
                     {result.kFactor.toFixed(1)}
                   </div>
                   <div className="text-xs text-muted-foreground">Transformer</div>
                 </div>
               </div>

               {/* Top Offenders - Show worst harmonics */}
               {result.harmonicSpectrum.filter(h => h.compliance === 'fail').length > 0 && (
                 <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                   <div className="flex items-center gap-2 mb-2">
                     <AlertCircle className="h-5 w-5 text-red-400" />
                     <span className="font-medium text-red-300">Critical Harmonic Violations</span>
                   </div>
                   <div className="space-y-1">
                     {result.harmonicSpectrum
                       .filter(h => h.compliance === 'fail')
                       .sort((a, b) => (b.currentPercentage / b.limit) - (a.currentPercentage / a.limit))
                       .slice(0, 3)
                       .map((harmonic) => {
                         const getOrdinal = (num: number) => {
                           if (num === 1) return "1st";
                           if (num === 2) return "2nd";
                           if (num === 3) return "3rd";
                           return `${num}th`;
                         };
                         const violation = ((harmonic.currentPercentage / harmonic.limit) - 1) * 100;
                         return (
                           <div key={harmonic.order} className="text-sm">
                             <span className="font-medium">{getOrdinal(harmonic.order)} harmonic:</span>
                             <span className="text-red-300 ml-2">{harmonic.currentPercentage.toFixed(2)}% ({violation.toFixed(0)}% over limit)</span>
                           </div>
                         );
                       })}
                   </div>
                 </div>
               )}

              {/* System-specific metrics */}
              {systemType === 'three-phase' && result.neutralCurrent > 0 && (
                <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-orange-400" />
                    <span className="font-medium text-orange-300">Neutral Current Analysis</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Neutral Current: </span>
                    <span className="font-mono text-orange-300">{result.neutralCurrent.toFixed(2)}A</span>
                    {result.neutralCurrent > parseFloat(fundamentalCurrent) && (
                      <span className="text-orange-400 ml-2">⚠ Exceeds line current</span>
                    )}
                  </div>
                </div>
              )}

              {/* Harmonic Spectrum Analysis */}
              {result.harmonicSpectrum.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                    <h4 className="font-medium">Individual Harmonic Analysis</h4>
                  </div>
                  <div className="space-y-2">
                     {result.harmonicSpectrum.map((harmonic) => {
                       const getOrdinal = (num: number) => {
                         if (num === 1) return "1st";
                         if (num === 2) return "2nd";
                         if (num === 3) return "3rd";
                         return `${num}th`;
                       };
                       
                       return (
                         <div key={harmonic.order} className="flex items-center justify-between p-2 bg-background/30 rounded">
                           <div className="flex items-center gap-3">
                             <span className="font-medium">{getOrdinal(harmonic.order)}</span>
                             <div className={`w-3 h-3 rounded-full ${
                               harmonic.compliance === 'pass' ? 'bg-green-500' :
                               harmonic.compliance === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                             }`}></div>
                           </div>
                           <div className="text-right">
                             <div className="font-mono text-sm">{harmonic.currentPercentage.toFixed(2)}%</div>
                             <div className="text-xs text-muted-foreground">Limit: {harmonic.limit}%</div>
                           </div>
                         </div>
                       );
                     })}
                  </div>
                </div>
              )}

              {/* Regulatory Compliance */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-green-400" />
                  <h4 className="font-medium">Regulatory Compliance</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className={`p-3 rounded border ${result.bs7671Compliance ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
                    <div className="font-medium">BS 7671 (G5/5)</div>
                    <div className={result.bs7671Compliance ? 'text-green-400' : 'text-red-400'}>
                      {result.bs7671Compliance ? '✓ Compliant' : '✗ Non-compliant'}
                    </div>
                  </div>
                  <div className={`p-3 rounded border ${result.ieeeCompliance ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
                    <div className="font-medium">IEEE 519</div>
                    <div className={result.ieeeCompliance ? 'text-green-400' : 'text-red-400'}>
                      {result.ieeeCompliance ? '✓ Compliant' : '✗ Non-compliant'}
                    </div>
                  </div>
                  <div className={`p-3 rounded border ${result.gCode5Compliance ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
                    <div className="font-medium">G5/5 Code</div>
                    <div className={result.gCode5Compliance ? 'text-green-400' : 'text-red-400'}>
                      {result.gCode5Compliance ? '✓ Compliant' : '✗ Non-compliant'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary Concerns & Immediate Actions */}
              {(result.primaryConcerns.length > 0 || result.immediateActions.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.primaryConcerns.length > 0 && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-5 w-5 text-red-400" />
                        <span className="font-medium text-red-300">Primary Concerns</span>
                      </div>
                      <ul className="space-y-1 text-sm">
                        {result.primaryConcerns.map((concern, index) => (
                          <li key={index} className="text-red-200">• {concern}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.immediateActions.length > 0 && (
                    <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-5 w-5 text-orange-400" />
                        <span className="font-medium text-orange-300">Immediate Actions</span>
                      </div>
                      <ul className="space-y-1 text-sm">
                        {result.immediateActions.map((action, index) => (
                          <li key={index} className="text-orange-200">• {action}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

               {/* Technical Recommendations */}
               {result.recommendations.length > 0 && (
                 <div>
                   <div className="flex items-center gap-2 mb-3">
                     <BookOpen className="h-5 w-5 text-blue-400" />
                     <h4 className="font-medium">Technical Solutions</h4>
                   </div>
                   <div className="space-y-2">
                     {result.recommendations.map((rec, index) => (
                       <div key={index} className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                         <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
                         <span className="text-sm leading-relaxed">{rec}</span>
                       </div>
                     ))}
                   </div>
                 </div>
               )}

               {/* Practical Guidance */}
               {result.practicalGuidance && result.practicalGuidance.length > 0 && (
                 <div>
                   <div className="flex items-center gap-2 mb-3">
                     <Zap className="h-5 w-5 text-elec-yellow" />
                     <h4 className="font-medium">Practical Implementation Guide</h4>
                   </div>
                   <div className="space-y-2">
                     {result.practicalGuidance.map((guidance, index) => (
                       <div key={index} className="flex items-start gap-3 p-3 bg-background/40 border border-elec-yellow/10 rounded-lg">
                         <div className="w-2 h-2 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
                         <span className="text-sm leading-relaxed">{guidance}</span>
                       </div>
                     ))}
                   </div>
                 </div>
               )}

               {/* Equipment Risks */}
               {result.equipmentRisks.length > 0 && (
                 <div>
                   <div className="flex items-center gap-2 mb-3">
                     <AlertCircle className="h-5 w-5 text-yellow-400" />
                     <h4 className="font-medium">Equipment Risk Assessment</h4>
                   </div>
                   <div className="space-y-2">
                     {result.equipmentRisks.map((risk, index) => (
                       <div key={index} className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                         <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0"></div>
                         <span className="text-sm leading-relaxed">{risk}</span>
                       </div>
                     ))}
                   </div>
                 </div>
               )}

               {/* Equipment Impact Assessment */}
               <div className="p-4 bg-background/30 border border-elec-yellow/20 rounded-lg">
                 <h4 className="font-medium mb-3 text-elec-yellow">Equipment Impact Assessment</h4>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                   <div>
                     <div className="font-medium mb-2 text-muted-foreground">Transformers</div>
                     <div className={`${result.kFactor > 13 ? 'text-red-400' : result.kFactor > 9 ? 'text-orange-400' : 'text-green-400'}`}>
                       {result.kFactor > 13 ? 'Critical overheating risk' :
                        result.kFactor > 9 ? 'Elevated temperature operation' : 'Normal operation expected'}
                     </div>
                   </div>
                   <div>
                     <div className="font-medium mb-2 text-muted-foreground">Neutral Conductor</div>
                     <div className={`${systemType === 'three-phase' && result.neutralCurrent > parseFloat(fundamentalCurrent) ? 'text-orange-400' : 'text-green-400'}`}>
                       {systemType === 'three-phase' && result.neutralCurrent > parseFloat(fundamentalCurrent) ? 
                        'Oversizing required' : 'Standard sizing adequate'}
                     </div>
                   </div>
                   <div>
                     <div className="font-medium mb-2 text-muted-foreground">Protection Devices</div>
                     <div className={`${result.crestFactorCurrent > 2.5 ? 'text-orange-400' : 'text-green-400'}`}>
                       {result.crestFactorCurrent > 2.5 ? 'RMS-sensing devices recommended' : 'Standard devices suitable'}
                     </div>
                   </div>
                   <div>
                     <div className="font-medium mb-2 text-muted-foreground">Power Factor Correction</div>
                     <div className={`${result.thdiCurrent > 8 ? 'text-orange-400' : 'text-green-400'}`}>
                       {result.thdiCurrent > 8 ? 'Detuned capacitors required' : 'Standard capacitors acceptable'}
                     </div>
                   </div>
                 </div>
               </div>
            </div>
          </CardContent>
        </Card>
      )}

       {/* Enhanced Information Sections - More Content */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <WhyThisMatters
           title="Why Power Quality Analysis Matters"
           points={[
             "Prevents costly equipment failures and reduces maintenance costs",
             "Harmonics cause 15-25% increase in energy consumption",
             "Non-compliance with BS 7671 18th Edition creates legal liability",
             "Poor power quality reduces equipment lifespan by up to 50%",
             "Harmonic currents cause neutral conductor overheating in 3-phase systems"
           ]}
         />

         <InfoBox
           title="BS 7671 18th Edition & Standards"
           icon={<Shield className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />}
           points={[
             "Section 331.1: Assessment of general characteristics",
             "Regulation 515.2: Harmonic distortion considerations",
             "IEEE 519: Recommended practice for harmonic control",
             "G5/5: Engineering Recommendation for harmonic limits",
             "BS EN 61000-3-2: Equipment harmonic current limits"
           ]}
         >
           <p className="text-sm text-elec-light/80 mb-2">
             The 18th Edition requires electrical installers to assess and manage power quality, particularly where harmonics may affect safety or equipment operation. This includes LED lighting installations, data centres, and industrial facilities with variable frequency drives.
           </p>
         </InfoBox>

         <InfoBox
           title="Understanding Power Quality Metrics"
           icon={<Activity className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />}
           points={[
             "THDi < 5%: Excellent power quality",
             "K-Factor: K-4 (office), K-13 (industrial), K-20 (data centre)",
             "Crest Factor > 2.5: High peak currents may cause nuisance tripping",
             "Neutral current in 3-phase systems should not exceed line current",
             "Individual harmonics limited by G5/5 Engineering Recommendation"
           ]}
         >
           <p className="text-sm text-elec-light/80 mb-2">
             This calculator evaluates current harmonics against IEEE 519 and BS 7671 standards, providing actionable insights for maintaining electrical system integrity and compliance with UK electrical safety regulations.
           </p>
          </InfoBox>
        </div>
    </div>
  );
};

export default PowerQualityCalculator;