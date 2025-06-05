
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator, BookOpen, Database, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import VoltageDropCalculator from "@/components/electrician-tools/VoltageDropCalculator";
import LoadCalculator from "@/components/electrician-tools/LoadCalculator";
import { PowerFactorCalculator } from "@/components/electrician-tools/PowerFactorCalculator";
import OhmsLawCalculator from "@/components/electrician-tools/OhmsLawCalculator";
import CalculatorCards from "@/components/electrician-tools/CalculatorCards";
import CalculatorSelector from "@/components/apprentice/calculators/CalculatorSelector";
import CalculatorManager from "@/components/electrician-tools/calculators/CalculatorManager";
import EnhancedCalculatorInterface from "@/components/electrician-tools/calculators/EnhancedCalculatorInterface";
import LumenCalculator from "@/components/apprentice/calculators/LumenCalculator";
import InstrumentationCalculator from "@/components/apprentice/calculators/InstrumentationCalculator";
import ZsValuesCalculator from "@/components/apprentice/calculators/ZsValuesCalculator";
import AdiabaticCalculator from "@/components/apprentice/calculators/AdiabaticCalculator";
import ConduitFillCalculator from "@/components/apprentice/calculators/ConduitFillCalculator";
import ResistorColourCodeCalculator from "@/components/apprentice/calculators/ResistorColourCodeCalculator";
import RingCircuitCalculator from "@/components/apprentice/calculators/RingCircuitCalculator";
import DiversityFactorCalculator from "@/components/apprentice/calculators/DiversityFactorCalculator";
import EarthFaultLoopCalculator from "@/components/apprentice/calculators/EarthFaultLoopCalculator";
import MaximumDemandCalculator from "@/components/apprentice/calculators/MaximumDemandCalculator";
import RCDTripTimeCalculator from "@/components/apprentice/calculators/RCDTripTimeCalculator";
import SolarPVCalculator from "@/components/apprentice/calculators/SolarPVCalculator";
import BatteryBackupCalculator from "@/components/apprentice/calculators/BatteryBackupCalculator";
import BS7671ZsLookupCalculator from "@/components/apprentice/calculators/BS7671ZsLookupCalculator";
import ComingSoonCalculator from "@/components/apprentice/calculators/ComingSoonCalculator";
import R1R2Calculator from "@/components/apprentice/calculators/R1R2Calculator";
import PFCCalculator from "@/components/apprentice/calculators/PFCCalculator";
import RCDDiscriminationCalculator from "@/components/apprentice/calculators/RCDDiscriminationCalculator";
import CableDeratingCalculator from "@/components/apprentice/calculators/CableDeratingCalculator";
import { RotateCw, Zap, Activity, PlugZap, Cable, Variable, Gauge, Sigma, Wrench, Shield, Clock, Sun, Battery } from "lucide-react";

const Calculations = () => {
  const [calculatorType, setCalculatorType] = useState<string>("ohms-law");
  const [viewMode, setViewMode] = useState<'enhanced' | 'classic'>('enhanced');

  // Define calculator metadata for the enhanced manager
  const calculatorItems = [
    {
      id: "ohms-law",
      name: "Ohm's Law",
      category: "basic",
      description: "Calculate voltage, current, resistance, and power relationships",
      icon: Zap,
      difficulty: 'beginner' as const,
      isFavourite: false,
      usageCount: 156,
      estimatedTime: "2 min",
      regulation: "BS 7671"
    },
    {
      id: "voltage-drop",
      name: "Voltage Drop",
      category: "distribution",
      description: "Calculate voltage drop in electrical circuits and cable runs",
      icon: Activity,
      difficulty: 'intermediate' as const,
      isFavourite: true,
      usageCount: 89,
      estimatedTime: "5 min",
      regulation: "BS 7671"
    },
    {
      id: "power-factor",
      name: "Power Factor",
      category: "power",
      description: "Calculate power factor, reactive power, and apparent power",
      icon: PlugZap,
      difficulty: 'intermediate' as const,
      isFavourite: false,
      usageCount: 67,
      estimatedTime: "3 min"
    },
    {
      id: "load",
      name: "Load Calculator",
      category: "power",
      description: "Calculate total load requirements for electrical installations",
      icon: Calculator,
      difficulty: 'beginner' as const,
      isFavourite: false,
      usageCount: 34,
      estimatedTime: "4 min"
    },
    {
      id: "cable-size",
      name: "Enhanced Cable Sizing",
      category: "distribution",
      description: "Advanced cable sizing with industry templates and compliance checking",
      icon: Cable,
      difficulty: 'advanced' as const,
      isFavourite: true,
      usageCount: 123,
      estimatedTime: "8 min",
      regulation: "BS 7671"
    },
    // ... continue with other calculators
  ];

  const renderCalculator = () => {
    // Redirect cable sizing to dedicated page
    if (calculatorType === 'cable-size') {
      return (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-8 text-center">
            <Cable className="h-16 w-16 text-elec-yellow mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Enhanced Cable Sizing Calculator</h3>
            <p className="text-muted-foreground mb-4">
              Advanced cable sizing with industry templates, compliance checking, and comprehensive analysis.
            </p>
            <Link to="/electrician-tools/cable-sizing">
              <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                Open Enhanced Calculator
              </Button>
            </Link>
          </CardContent>
        </Card>
      );
    }

    // For demonstration, we'll show the enhanced interface for Ohm's Law
    if (viewMode === 'enhanced' && calculatorType === 'ohms-law') {
      return (
        <EnhancedCalculatorInterface
          calculatorType="ohms-law"
          title="Ohm's Law Calculator"
          description="Calculate voltage, current, resistance, and power using Ohm's Law principles"
          fields={[
            {
              id: 'voltage',
              label: 'Voltage',
              type: 'number',
              unit: 'V',
              helpText: 'Enter voltage in volts',
              validation: [
                { field: 'voltage', rule: 'min', value: 0, message: 'Voltage must be positive' }
              ]
            },
            {
              id: 'current',
              label: 'Current',
              type: 'number',
              unit: 'A',
              helpText: 'Enter current in amperes',
              validation: [
                { field: 'current', rule: 'min', value: 0, message: 'Current must be positive' }
              ]
            },
            {
              id: 'resistance',
              label: 'Resistance',
              type: 'number',
              unit: 'Ω',
              helpText: 'Enter resistance in ohms',
              validation: [
                { field: 'resistance', rule: 'min', value: 0, message: 'Resistance must be positive' }
              ]
            }
          ]}
          onCalculate={(inputs) => {
            const { voltage, current, resistance } = inputs;
            let results: any = {};
            
            if (voltage && current) {
              results.resistance = voltage / current;
              results.power = voltage * current;
            } else if (voltage && resistance) {
              results.current = voltage / resistance;
              results.power = (voltage * voltage) / resistance;
            } else if (current && resistance) {
              results.voltage = current * resistance;
              results.power = current * current * resistance;
            }
            
            return results;
          }}
        />
      );
    }

    // Classic calculator rendering
    switch (calculatorType) {
      case "ohms-law":
        return <OhmsLawCalculator />;
      case "voltage-drop":
        return <VoltageDropCalculator />;
      case "power-factor":
        return <PowerFactorCalculator />;
      case "load":
        return <LoadCalculator />;
      case "lumen":
        return <LumenCalculator />;
      case "instrumentation":
        return <InstrumentationCalculator />;
      case "zs-values":
        return <ZsValuesCalculator />;
      case "adiabatic":
        return <AdiabaticCalculator />;
      case "conduit-fill":
        return <ConduitFillCalculator />;
      case "resistor-colour-code":
        return <ResistorColourCodeCalculator />;
      case "ring-circuit":
        return <RingCircuitCalculator />;
      case "diversity-factor":
        return <DiversityFactorCalculator />;
      case "earth-fault-loop":
        return <EarthFaultLoopCalculator />;
      case "maximum-demand":
        return <MaximumDemandCalculator />;
      case "rcd-trip-time":
        return <RCDTripTimeCalculator />;
      case "solar-pv":
        return <SolarPVCalculator />;
      case "battery-backup":
        return <BatteryBackupCalculator />;
      case "bs7671-zs-lookup":
        return <BS7671ZsLookupCalculator />;
      case "r1r2":
        return <R1R2Calculator />;
      case "pfc":
        return <PFCCalculator />;
      case "rcd-discrimination":
        return <RCDDiscriminationCalculator />;
      case "cable-derating":
        return <CableDeratingCalculator />;
      case "phase-rotation":
        return <ComingSoonCalculator 
          title="Phase Rotation" 
          icon={RotateCw} 
          description="Determine correct phase sequence for 3-phase motor connections and installations." 
        />;
      default:
        return <OhmsLawCalculator />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Calculator className="h-8 w-8 text-elec-yellow" />
            Professional Calculator Suite
          </h1>
          <p className="text-muted-foreground">
            Enhanced electrical calculations with educational content, data management, and BS 7671 compliance checking.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'enhanced' ? 'default' : 'outline'}
            onClick={() => setViewMode('enhanced')}
            className={viewMode === 'enhanced' ? 'bg-elec-yellow text-black' : ''}
          >
            Enhanced
          </Button>
          <Button
            variant={viewMode === 'classic' ? 'default' : 'outline'}
            onClick={() => setViewMode('classic')}
            className={viewMode === 'classic' ? 'bg-elec-yellow text-black' : ''}
          >
            Classic
          </Button>
          <Link to="/electrician-tools">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Tools
            </Button>
          </Link>
        </div>
      </div>

      {/* Calculator Suite Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-elec-yellow">24+</div>
            <div className="text-sm text-muted-foreground">Calculators</div>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-elec-yellow">100%</div>
            <div className="text-sm text-muted-foreground">BS 7671 Compliant</div>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-elec-yellow">Smart</div>
            <div className="text-sm text-muted-foreground">Validation</div>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-elec-yellow">Export</div>
            <div className="text-sm text-muted-foreground">Ready</div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Calculator Manager */}
      {viewMode === 'enhanced' ? (
        <CalculatorManager
          calculators={calculatorItems}
          currentCalculator={calculatorType}
          onCalculatorSelect={setCalculatorType}
        />
      ) : (
        <CalculatorSelector calculatorType={calculatorType} setCalculatorType={setCalculatorType} />
      )}
      
      {/* Dynamic Calculator Content */}
      {renderCalculator()}

      {/* Enhanced Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Educational Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Learn while you calculate with contextual theory, regulations, and practical examples integrated into each calculator.
            </p>
            <div className="flex gap-2 mt-3">
              <Badge variant="outline" className="border-blue-500/30 text-blue-400">Theory</Badge>
              <Badge variant="outline" className="border-blue-500/30 text-blue-400">Examples</Badge>
              <Badge variant="outline" className="border-blue-500/30 text-blue-400">BS 7671</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/20 bg-green-500/5">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Save, export, and manage your calculations with full history tracking and project organisation capabilities.
            </p>
            <div className="flex gap-2 mt-3">
              <Badge variant="outline" className="border-green-500/30 text-green-400">Save & Load</Badge>
              <Badge variant="outline" className="border-green-500/30 text-green-400">Export</Badge>
              <Badge variant="outline" className="border-green-500/30 text-green-400">History</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-purple-500/5">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Smart Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Advanced validation, compliance checking, and intelligent recommendations based on your calculations and standards.
            </p>
            <div className="flex gap-2 mt-3">
              <Badge variant="outline" className="border-purple-500/30 text-purple-400">Validation</Badge>
              <Badge variant="outline" className="border-purple-500/30 text-purple-400">Compliance</Badge>
              <Badge variant="outline" className="border-purple-500/30 text-purple-400">AI Tips</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Calculator Cards - Only in classic mode */}
      {viewMode === 'classic' && (
        <div className="mt-8">
          <CalculatorCards />
        </div>
      )}
    </div>
  );
};

export default Calculations;
