import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, CheckCircle, Calculator, Info, Clock, Shield, Zap, BookOpen, RotateCcw, XCircle, AlertCircle } from "lucide-react";
import WhyThisMatters from "@/components/common/WhyThisMatters";

interface RCDConfig {
  rating: string;
  type: string;
  installationLocation: string;
  circuitType: string;
  loadCurrent: string;
  cableLength: string;
  earthingSystem: string;
  hasTimeDelay: boolean;
  customTripTime: string;
  manufacturer: string;
}

interface DiscriminationResult {
  discriminates: boolean;
  timeDifference: number;
  currentRatio: number;
  recommendation: string;
  complianceStatus: 'compliant' | 'non-compliant' | 'marginal';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  practicalGuidance: string[];
  regulatoryReference: string;
  improvements: string[];
}

const RCDDiscriminationCalculator = () => {
  const [upstreamRCD, setUpstreamRCD] = useState<RCDConfig>({
    rating: "",
    type: "",
    installationLocation: "",
    circuitType: "",
    loadCurrent: "",
    cableLength: "",
    earthingSystem: "",
    hasTimeDelay: false,
    customTripTime: "",
    manufacturer: ""
  });
  
  const [downstreamRCD, setDownstreamRCD] = useState<RCDConfig>({
    rating: "",
    type: "",
    installationLocation: "",
    circuitType: "",
    loadCurrent: "",
    cableLength: "",
    earthingSystem: "",
    hasTimeDelay: false,
    customTripTime: "",
    manufacturer: ""
  });
  
  const [result, setResult] = useState<DiscriminationResult | null>(null);

  const rcdTypes = [
    { 
      value: "type-ac", 
      label: "Type AC (Standard)", 
      trippingTime: 300, 
      description: "Detects AC residual currents only" 
    },
    { 
      value: "type-a", 
      label: "Type A (Enhanced)", 
      trippingTime: 300, 
      description: "Detects AC and pulsating DC currents" 
    },
    { 
      value: "type-f", 
      label: "Type F (Frequency)", 
      trippingTime: 300, 
      description: "Enhanced detection for mixed frequencies" 
    },
    { 
      value: "type-b", 
      label: "Type B (Universal)", 
      trippingTime: 300, 
      description: "Detects all types of residual currents" 
    },
    { 
      value: "s-type", 
      label: "S-Type (Selective)", 
      trippingTime: 500, 
      description: "Time-delayed for discrimination" 
    },
    { 
      value: "g-type", 
      label: "G-Type (General Use)", 
      trippingTime: 10, 
      description: "Ultra-fast response for specific applications" 
    }
  ];

  const rcdRatings = [
    { value: "10", label: "10mA", application: "Medical/Special locations" },
    { value: "30", label: "30mA", application: "Personal protection (standard)" },
    { value: "100", label: "100mA", application: "Fire protection (small installations)" },
    { value: "300", label: "300mA", application: "Fire protection (large installations)" },
    { value: "500", label: "500mA", application: "Fire protection (industrial)" },
    { value: "1000", label: "1000mA", application: "Fire protection (very large loads)" }
  ];

  const installationLocations = [
    { value: "consumer-unit", label: "Consumer Unit (Main)" },
    { value: "distribution-board", label: "Distribution Board" },
    { value: "local-db", label: "Local Distribution Board" },
    { value: "socket-outlet", label: "Socket Outlet RCD" },
    { value: "rcbo", label: "RCBO in Board" },
    { value: "external", label: "External Installation" }
  ];

  const circuitTypes = [
    { value: "lighting", label: "Lighting Circuit" },
    { value: "power-sockets", label: "Power & Socket Outlets" },
    { value: "immersion", label: "Immersion Heater" },
    { value: "shower", label: "Electric Shower" },
    { value: "cooker", label: "Electric Cooker" },
    { value: "heating", label: "Electric Heating" },
    { value: "motor", label: "Motor Circuit" },
    { value: "outdoor", label: "Outdoor/Garden Circuit" },
    { value: "ev-charging", label: "EV Charging Point" },
    { value: "special-location", label: "Special Location (Bathroom/Pool)" }
  ];

  const earthingSystems = [
    { value: "tn-s", label: "TN-S (Separate earth)" },
    { value: "tn-c-s", label: "TN-C-S (PME)" },
    { value: "tt", label: "TT (Earth electrode)" },
    { value: "it", label: "IT (Isolated/impedance)" }
  ];

  const calculateDiscrimination = () => {
    if (!upstreamRCD.rating || !downstreamRCD.rating || !upstreamRCD.type || !downstreamRCD.type) {
      return;
    }

    const upstreamType = rcdTypes.find(type => type.value === upstreamRCD.type);
    const downstreamType = rcdTypes.find(type => type.value === downstreamRCD.type);
    
    if (!upstreamType || !downstreamType) return;

    // Calculate trip times (including custom delays)
    const upstreamTime = upstreamRCD.hasTimeDelay && upstreamRCD.customTripTime 
      ? parseInt(upstreamRCD.customTripTime) 
      : upstreamType.trippingTime;
    
    const downstreamTime = downstreamRCD.hasTimeDelay && downstreamRCD.customTripTime 
      ? parseInt(downstreamRCD.customTripTime) 
      : downstreamType.trippingTime;

    const timeDifference = upstreamTime - downstreamTime;

    // Calculate current ratio
    const upstreamRating = parseInt(upstreamRCD.rating);
    const downstreamRating = parseInt(downstreamRCD.rating);
    const currentRatio = upstreamRating / downstreamRating;

    // Determine discrimination status
    let discriminates = false;
    let complianceStatus: 'compliant' | 'non-compliant' | 'marginal' = 'non-compliant';
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'critical';
    let recommendation = "";
    let practicalGuidance: string[] = [];
    let regulatoryReference = "";
    let improvements: string[] = [];

    // BS 7671 Requirements Analysis
    if (upstreamRCD.type === "s-type" && downstreamRCD.type !== "s-type") {
      // S-type discrimination rules
      discriminates = timeDifference >= 200 && currentRatio >= 3;
      
      if (discriminates) {
        complianceStatus = 'compliant';
        riskLevel = 'low';
        recommendation = "Excellent discrimination achieved. S-type upstream provides reliable selective operation per BS 7671 requirements.";
        regulatoryReference = "BS 7671:2018 Regulation 531.2.9 - Coordination of protective devices";
      } else if (timeDifference >= 150 && currentRatio >= 2) {
        complianceStatus = 'marginal';
        riskLevel = 'medium';
        recommendation = "Marginal discrimination. Consider increasing upstream rating or using longer time delay.";
        improvements.push("Increase upstream RCD rating to achieve minimum 3:1 ratio");
        improvements.push("Consider S-type RCD with longer time delay (minimum 200ms)");
      } else {
        complianceStatus = 'non-compliant';
        riskLevel = 'high';
        recommendation = "Poor discrimination. Risk of simultaneous tripping during earth faults.";
        improvements.push("Replace upstream with higher rated S-type RCD");
        improvements.push("Ensure minimum 200ms time delay difference");
        improvements.push("Achieve minimum 3:1 current rating ratio");
      }
    } else if (upstreamRCD.type === "g-type") {
      // G-type analysis
      discriminates = true;
      complianceStatus = 'compliant';
      riskLevel = 'low';
      recommendation = "G-type RCD provides instantaneous earth fault protection. Suitable for specific applications only.";
      regulatoryReference = "BS 7671:2018 Section 531 - Overcurrent protective devices";
    } else {
      // Standard RCD discrimination
      discriminates = timeDifference > 0 && currentRatio >= 3;
      
      if (discriminates && currentRatio >= 5) {
        complianceStatus = 'compliant';
        riskLevel = 'low';
        recommendation = "Good discrimination achieved with adequate current ratio separation.";
      } else if (discriminates && currentRatio >= 3) {
        complianceStatus = 'marginal';
        riskLevel = 'medium';
        recommendation = "Basic discrimination achieved but current ratio could be improved.";
        improvements.push("Consider increasing upstream RCD rating for better discrimination");
      } else {
        complianceStatus = 'non-compliant';
        riskLevel = 'critical';
        recommendation = "No effective discrimination. High risk of nuisance tripping and loss of selectivity.";
        improvements.push("Use S-type RCD upstream for time delay");
        improvements.push("Increase upstream current rating (minimum 3:1 ratio)");
        improvements.push("Consider alternative protection scheme");
      }
    }

    // Additional checks based on installation details
    if (upstreamRating <= downstreamRating) {
      discriminates = false;
      complianceStatus = 'non-compliant';
      riskLevel = 'critical';
      recommendation += " | CRITICAL: Upstream RCD rating must be higher than downstream for any discrimination.";
      improvements.unshift("IMMEDIATE: Increase upstream RCD rating above downstream rating");
    }

    // Circuit-specific guidance
    if (downstreamRCD.circuitType === "special-location" && downstreamRating > 30) {
      practicalGuidance.push("⚠️ Special locations (bathrooms, pools) require 30mA RCD protection maximum");
      riskLevel = 'high';
    }

    if (downstreamRCD.circuitType === "ev-charging" && downstreamRating !== 30) {
      practicalGuidance.push("⚠️ EV charging points require 30mA RCD protection per BS 7671");
      improvements.push("Install 30mA Type A RCD for EV charging circuit");
    }

    if (upstreamRCD.earthingSystem === "tt" && upstreamRating > 100) {
      practicalGuidance.push("⚠️ TT earthing systems typically require 100mA maximum RCD for fire protection");
    }

    // Load current considerations
    if (downstreamRCD.loadCurrent) {
      const loadCurrent = parseFloat(downstreamRCD.loadCurrent);
      const leakageCurrent = loadCurrent * 0.001; // Estimate 1mA per amp of load
      
      if (leakageCurrent > downstreamRating * 0.5) {
        practicalGuidance.push(`⚠️ High leakage current risk (≈${leakageCurrent.toFixed(1)}mA) may cause nuisance tripping`);
        improvements.push("Consider higher rated RCD or reduce circuit loading");
      }
    }

    // Practical installation guidance
    practicalGuidance.push(
      "✓ Test both RCDs at commissioning with appropriate test equipment",
      "✓ Document actual trip times on electrical installation certificate",
      "✓ Ensure proper labelling of RCD functions and circuits protected",
      "✓ Regular testing required: monthly for critical circuits, quarterly for others"
    );

    if (upstreamRCD.type === "s-type") {
      practicalGuidance.push("✓ S-type RCDs require specific test procedures - do not use standard RCD testers");
    }

    setResult({
      discriminates,
      timeDifference,
      currentRatio,
      recommendation,
      complianceStatus,
      riskLevel,
      practicalGuidance,
      regulatoryReference,
      improvements
    });
  };

  const resetCalculator = () => {
    setUpstreamRCD({
      rating: "",
      type: "",
      installationLocation: "",
      circuitType: "",
      loadCurrent: "",
      cableLength: "",
      earthingSystem: "",
      hasTimeDelay: false,
      customTripTime: "",
      manufacturer: ""
    });
    setDownstreamRCD({
      rating: "",
      type: "",
      installationLocation: "",
      circuitType: "",
      loadCurrent: "",
      cableLength: "",
      earthingSystem: "",
      hasTimeDelay: false,
      customTripTime: "",
      manufacturer: ""
    });
    setResult(null);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'border-green-500/50 bg-green-500/20';
      case 'marginal': return 'border-yellow-500/50 bg-yellow-500/20';
      case 'non-compliant': return 'border-red-500/50 bg-red-500/20';
      default: return 'border-gray-500/50 bg-gray-500/20';
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-elec-yellow" />
          <CardTitle className="text-elec-light">RCD Discrimination Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Comprehensive analysis of RCD discrimination for selective operation per BS 7671 requirements
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Configuration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upstream RCD Configuration */}
          <Card className="border-blue-500/40 bg-blue-500/10">
            <CardHeader>
              <CardTitle className="text-blue-300 text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Upstream RCD (Main Protection)
              </CardTitle>
              <p className="text-xs text-blue-200">Main incomer or distribution board RCD</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-elec-light text-sm">Rating (IΔn)</Label>
                  <Select value={upstreamRCD.rating} onValueChange={(value) => 
                    setUpstreamRCD(prev => ({ ...prev, rating: value }))
                  }>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20 h-10">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      {rcdRatings.map(rating => (
                        <SelectItem key={rating.value} value={rating.value}>
                          <div className="flex flex-col">
                            <span>{rating.label}</span>
                            <span className="text-xs text-muted-foreground">{rating.application}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-elec-light text-sm">RCD Type</Label>
                  <Select value={upstreamRCD.type} onValueChange={(value) => 
                    setUpstreamRCD(prev => ({ ...prev, type: value }))
                  }>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20 h-10">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      {rcdTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex flex-col">
                            <span>{type.label}</span>
                            <span className="text-xs text-muted-foreground">{type.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-elec-light text-sm">Installation Location</Label>
                  <Select value={upstreamRCD.installationLocation} onValueChange={(value) => 
                    setUpstreamRCD(prev => ({ ...prev, installationLocation: value }))
                  }>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20 h-10">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      {installationLocations.map(location => (
                        <SelectItem key={location.value} value={location.value}>
                          {location.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-elec-light text-sm">Earthing System</Label>
                  <Select value={upstreamRCD.earthingSystem} onValueChange={(value) => 
                    setUpstreamRCD(prev => ({ ...prev, earthingSystem: value }))
                  }>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20 h-10">
                      <SelectValue placeholder="Select system" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      {earthingSystems.map(system => (
                        <SelectItem key={system.value} value={system.value}>
                          {system.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="upstream-delay"
                  checked={upstreamRCD.hasTimeDelay}
                  onCheckedChange={(checked) => 
                    setUpstreamRCD(prev => ({ ...prev, hasTimeDelay: !!checked }))
                  }
                />
                <Label htmlFor="upstream-delay" className="text-elec-light text-sm">
                  Custom time delay
                </Label>
              </div>

              {upstreamRCD.hasTimeDelay && (
                <div className="space-y-2">
                  <Label className="text-elec-light text-sm">Custom Trip Time (ms)</Label>
                  <Input
                    type="number"
                    value={upstreamRCD.customTripTime}
                    onChange={(e) => setUpstreamRCD(prev => ({ ...prev, customTripTime: e.target.value }))}
                    placeholder="e.g. 500"
                    className="bg-elec-dark border-elec-yellow/20 h-10"
                    min="10"
                    max="10000"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Downstream RCD Configuration */}
          <Card className="border-green-500/40 bg-green-500/10">
            <CardHeader>
              <CardTitle className="text-green-300 text-lg flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Downstream RCD (Circuit Protection)
              </CardTitle>
              <p className="text-xs text-green-200">Final circuit or local RCD protection</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-elec-light text-sm">Rating (IΔn)</Label>
                  <Select value={downstreamRCD.rating} onValueChange={(value) => 
                    setDownstreamRCD(prev => ({ ...prev, rating: value }))
                  }>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20 h-10">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      {rcdRatings.map(rating => (
                        <SelectItem key={rating.value} value={rating.value}>
                          <div className="flex flex-col">
                            <span>{rating.label}</span>
                            <span className="text-xs text-muted-foreground">{rating.application}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-elec-light text-sm">RCD Type</Label>
                  <Select value={downstreamRCD.type} onValueChange={(value) => 
                    setDownstreamRCD(prev => ({ ...prev, type: value }))
                  }>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20 h-10">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      {rcdTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex flex-col">
                            <span>{type.label}</span>
                            <span className="text-xs text-muted-foreground">{type.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-elec-light text-sm">Circuit Type</Label>
                <Select value={downstreamRCD.circuitType} onValueChange={(value) => 
                  setDownstreamRCD(prev => ({ ...prev, circuitType: value }))
                }>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20 h-10">
                    <SelectValue placeholder="Select circuit type" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/20">
                    {circuitTypes.map(circuit => (
                      <SelectItem key={circuit.value} value={circuit.value}>
                        {circuit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-elec-light text-sm">Load Current (A)</Label>
                  <Input
                    type="number"
                    value={downstreamRCD.loadCurrent}
                    onChange={(e) => setDownstreamRCD(prev => ({ ...prev, loadCurrent: e.target.value }))}
                    placeholder="e.g. 16"
                    className="bg-elec-dark border-elec-yellow/20 h-10"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-elec-light text-sm">Cable Length (m)</Label>
                  <Input
                    type="number"
                    value={downstreamRCD.cableLength}
                    onChange={(e) => setDownstreamRCD(prev => ({ ...prev, cableLength: e.target.value }))}
                    placeholder="e.g. 25"
                    className="bg-elec-dark border-elec-yellow/20 h-10"
                    min="0"
                    max="1000"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="downstream-delay"
                  checked={downstreamRCD.hasTimeDelay}
                  onCheckedChange={(checked) => 
                    setDownstreamRCD(prev => ({ ...prev, hasTimeDelay: !!checked }))
                  }
                />
                <Label htmlFor="downstream-delay" className="text-elec-light text-sm">
                  Custom time delay
                </Label>
              </div>

              {downstreamRCD.hasTimeDelay && (
                <div className="space-y-2">
                  <Label className="text-elec-light text-sm">Custom Trip Time (ms)</Label>
                  <Input
                    type="number"
                    value={downstreamRCD.customTripTime}
                    onChange={(e) => setDownstreamRCD(prev => ({ ...prev, customTripTime: e.target.value }))}
                    placeholder="e.g. 300"
                    className="bg-elec-dark border-elec-yellow/20 h-10"
                    min="10"
                    max="10000"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-3">
          <Button 
            onClick={calculateDiscrimination} 
            className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90 h-11"
            disabled={!upstreamRCD.rating || !downstreamRCD.rating || !upstreamRCD.type || !downstreamRCD.type}
          >
            <Calculator className="mr-2 h-4 w-4" />
            Analyse Discrimination
          </Button>
          <Button variant="outline" onClick={resetCalculator} className="h-11">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Results Section */}
        {result && (
          <>
            {/* Main Results Card */}
            <Card className={`border-2 ${getComplianceColor(result.complianceStatus)}`}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-elec-light">
                  {result.discriminates ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )}
                  Discrimination Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-elec-light">Compliance Status</Label>
                    <Badge 
                      variant={result.complianceStatus === 'compliant' ? "default" : "destructive"} 
                      className="w-fit text-sm"
                    >
                      {result.complianceStatus.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-elec-light">Risk Level</Label>
                    <div className={`text-lg font-semibold ${getRiskColor(result.riskLevel)}`}>
                      {result.riskLevel.toUpperCase()}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-elec-light">Current Ratio</Label>
                    <div className="text-lg font-mono text-elec-light">
                      {result.currentRatio.toFixed(1)}:1
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-elec-light">Time Difference</Label>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-elec-yellow" />
                      <span className="text-lg font-mono text-elec-light">{result.timeDifference}ms</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-elec-light">Discrimination Status</Label>
                    <div className="flex items-center gap-2">
                      {result.discriminates ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                      )}
                      <span className={`font-medium ${result.discriminates ? 'text-green-300' : 'text-red-300'}`}>
                        {result.discriminates ? 'DISCRIMINATES' : 'NO DISCRIMINATION'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Separator className="border-elec-yellow/20" />
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-elec-light">Analysis Summary</Label>
                  <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20">
                    <p className="text-sm text-elec-light leading-relaxed">
                      {result.recommendation}
                    </p>
                  </div>
                </div>

                {result.regulatoryReference && (
                  <div className="bg-blue-500/20 border border-blue-500/40 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <BookOpen className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-blue-200 font-medium text-sm">Regulatory Reference</p>
                        <p className="text-blue-100 text-sm">{result.regulatoryReference}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Improvements Required */}
            {result.improvements.length > 0 && (
              <Card className="border-orange-500/40 bg-orange-500/10">
                <CardHeader>
                  <CardTitle className="text-orange-300 text-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Required Improvements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-orange-100">
                        <span className="text-orange-400 font-bold mt-0.5">•</span>
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Practical Guidance */}
            <Card className="border-green-500/30 bg-green-500/10">
              <CardHeader>
                <CardTitle className="text-green-300 text-lg flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Practical Installation Guidance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.practicalGuidance.map((guidance, index) => (
                    <li key={index} className="text-sm text-green-100 leading-relaxed">
                      {guidance}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </>
        )}

        {/* Educational Information */}
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardHeader>
            <CardTitle className="text-amber-300 text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Understanding RCD Discrimination
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-amber-200 text-base">Why Discrimination Matters</h4>
                <ul className="space-y-2 text-sm text-amber-100">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Selective Operation:</strong> Only the faulty circuit trips, maintaining power to healthy circuits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Reduced Downtime:</strong> Minimises disruption to essential services and equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Easier Fault Finding:</strong> Clearly identifies which circuit has the fault</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Safety Compliance:</strong> Meets BS 7671 requirements for protective device coordination</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-amber-200 text-base">BS 7671 Requirements</h4>
                <ul className="space-y-2 text-sm text-amber-100">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Regulation 531.2.9:</strong> Coordination between protective devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Time-Current Characteristics:</strong> Upstream devices must have higher settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>S-Type RCDs:</strong> Provide time delay for selective operation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Testing Requirements:</strong> Verify discrimination during commissioning</span>
                  </li>
                </ul>
              </div>
            </div>

            <Separator className="border-amber-500/20" />

            <div className="space-y-3">
              <h4 className="font-semibold text-amber-200 text-base">Common Installation Scenarios</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded">
                  <h5 className="text-blue-300 font-medium text-sm mb-2">Domestic Installation</h5>
                  <p className="text-xs text-blue-100">Main: 100mA S-Type<br/>Circuits: 30mA Type AC/A</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 p-3 rounded">
                  <h5 className="text-green-300 font-medium text-sm mb-2">Commercial Building</h5>
                  <p className="text-xs text-green-100">Main: 300mA S-Type<br/>Sub-mains: 100mA<br/>Final: 30mA</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded">
                  <h5 className="text-purple-300 font-medium text-sm mb-2">Industrial Site</h5>
                  <p className="text-xs text-purple-100">Main: 500mA S-Type<br/>Motors: 100mA<br/>Sockets: 30mA</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why This Matters */}
        <WhyThisMatters
          points={[
            "Prevents unnecessary loss of power to healthy circuits during earth faults",
            "Enables rapid identification and isolation of faulty circuits",
            "Reduces business disruption and maintains critical services",
            "Ensures compliance with BS 7671 protective device coordination requirements",
            "Improves overall electrical safety through selective protection",
            "Facilitates effective maintenance and fault rectification procedures"
          ]}
          className="mb-0"
        />
      </CardContent>
    </Card>
  );
};

export default RCDDiscriminationCalculator;