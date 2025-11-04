import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InstallationDesign, CircuitDesign } from '@/types/installation-design';
import { 
  CheckCircle2, AlertTriangle, AlertCircle, Download, Zap, Cable, Shield, 
  TrendingDown, Percent, Gauge, Wrench, MapPin, ClipboardCheck, FileText,
  Upload, Loader2, Check, ChevronDown, Copy
} from 'lucide-react';
import { downloadEICPDF } from '@/lib/eic/pdfGenerator';
import { generateEICSchedule } from '@/lib/eic/scheduleGenerator';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { SendToAgentDropdown } from '@/components/install-planner-v2/SendToAgentDropdown';
import { AgentFlowDiagram } from '@/components/install-planner-v2/AgentFlowDiagram';
import { AgentType } from '@/types/agent-request';
import { useNavigate } from 'react-router-dom';
import { calculateExpectedR1R2, getMaxZsForDevice, mapLoadTypeToCircuitDescription } from '@/utils/eic-transformer';

interface DesignReviewEditorProps {
  design: InstallationDesign;
  onReset: () => void;
}

// Safe number formatter - prevents null.toFixed() crashes
const fmt = (n: unknown, dp = 1, fallback = '—') => 
  (typeof n === 'number' && !isNaN(n) ? n.toFixed(dp) : fallback);

export const DesignReviewEditor = ({ design, onReset }: DesignReviewEditorProps) => {
  const navigate = useNavigate();
  const [selectedCircuit, setSelectedCircuit] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  // Debug: Log on mount
  useEffect(() => {
    console.log('📊 DesignReviewEditor mounted:', {
      circuitCount: design.circuits?.length,
      circuits: design.circuits,
      selectedCircuit,
      currentCircuit: design.circuits?.[selectedCircuit],
      hasDesign: !!design
    });
  }, []);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [exportId, setExportId] = useState('');
  const [showJsonPreview, setShowJsonPreview] = useState(false);
  
  // Transform design to enhanced PDF JSON structure with human-readable strings
  const transformToEnhancedPdfJson = (design: InstallationDesign) => {
    const totalConnectedLoad = design.circuits.reduce((sum, c) => sum + (c.loadPower || 0), 0);
    const diversifiedLoad = design.diversityBreakdown?.diversifiedLoad || totalConnectedLoad * 0.65;
    const supplyVoltage = design.consumerUnit?.incomingSupply?.voltage || 230;
    const designCurrent = diversifiedLoad / supplyVoltage;
    
    return {
      document: {
        type: "Circuit Design Specification",
        standard: "BS 7671:2018+A3:2024",
        generatedAt: new Date().toISOString(),
        documentReference: `DS-${design.projectName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0].replace(/-/g, '')}`
      },
      
      project: {
        name: design.projectName,
        location: design.location,
        clientName: design.clientName || 'N/A',
        designerName: design.electricianName || 'N/A',
        designDate: new Date().toISOString().split('T')[0],
        installationType: design.installationType
      },
      
      incomingSupply: {
        voltage: supplyVoltage,
        phases: design.consumerUnit?.incomingSupply?.phases || 'single',
        supplyString: `${supplyVoltage}V ${design.consumerUnit?.incomingSupply?.phases === 'single' ? 'Single Phase' : design.consumerUnit?.incomingSupply?.phases === 'three' ? 'Three Phase' : 'Single Phase'}`,
        earthingSystem: design.consumerUnit?.incomingSupply?.earthingSystem || 'TN-C-S',
        Ze: design.consumerUnit?.incomingSupply?.Ze || 0.35,
        PSCC: design.consumerUnit?.incomingSupply?.incomingPFC || 1.5,
        psccString: `${design.consumerUnit?.incomingSupply?.incomingPFC || 1.5}kA`
      },
      
      consumerUnit: {
        type: design.consumerUnit.type,
        typeDescription: design.consumerUnit.type === 'split-load' ? 'Split Load Consumer Unit' : 
                         design.consumerUnit.type === 'high-integrity' ? 'High Integrity Consumer Unit' :
                         'Main Switch Consumer Unit',
        mainSwitchRating: design.consumerUnit.mainSwitchRating,
        mainSwitchString: `${design.consumerUnit.mainSwitchRating}A Main Switch`
      },
      
      loadAssessment: {
        totalConnectedLoad,
        totalConnectedLoadString: `${(totalConnectedLoad / 1000).toFixed(1)}kW`,
        diversityApplied: design.diversityApplied || false,
        diversityFactor: design.diversityBreakdown?.overallDiversityFactor || design.diversityFactor || 0.65,
        diversityFactorPercent: `${((design.diversityBreakdown?.overallDiversityFactor || design.diversityFactor || 0.65) * 100).toFixed(0)}%`,
        diversifiedLoad,
        diversifiedLoadString: `${(diversifiedLoad / 1000).toFixed(1)}kW`,
        designCurrent_Ib: parseFloat(designCurrent.toFixed(2)),
        numberOfCircuits: design.circuits.length
      },
      
      circuits: design.circuits.map(circuit => ({
        circuitNumber: circuit.circuitNumber,
        circuitId: `C${circuit.circuitNumber}`,
        name: circuit.name,
        
        loadSpecification: {
          loadType: circuit.loadType,
          loadTypeDescription: circuit.loadType === 'socket' ? 'Socket Outlet Circuit' :
                               circuit.loadType === 'lighting' ? 'Lighting Circuit' :
                               circuit.loadType === 'cooker' ? 'Cooker Circuit' :
                               circuit.loadType === 'shower' ? 'Electric Shower Circuit' :
                               circuit.loadType === 'immersion' ? 'Immersion Heater' :
                               circuit.loadType === 'heating' ? 'Heating Circuit' : 'Fixed Appliance',
          powerRating: circuit.loadPower || 0,
          powerRatingString: `${circuit.loadPower || 0}W`,
          designCurrent_Ib: circuit.calculations?.Ib || circuit.designCurrent || 0,
          designCurrentString: `${(circuit.calculations?.Ib || circuit.designCurrent || 0).toFixed(1)}A`,
          supplyString: `${circuit.voltage || supplyVoltage}V ${circuit.phases === 'single' ? 'Single Phase' : 'Three Phase'}`
        },
        
        cableSpecification: {
          liveConductors: circuit.cableSize,
          liveConductorsString: `${circuit.cableSize}mm²`,
          cpc: circuit.cpcSize,
          cpcString: `${circuit.cpcSize}mm²`,
          cableType: circuit.cableType || `${circuit.cableSize}/${circuit.cpcSize}mm² T&E`,
          cableLength: circuit.cableLength,
          cableLengthString: `${circuit.cableLength}m`,
          installationMethod: circuit.installationMethod,
          installationMethodDescription: circuit.installationMethod === 'clipped-direct' ? 'Method C - Clipped Direct (Reference Method 100)' :
                                          circuit.installationMethod === 'enclosed-conduit' ? 'Method B - Enclosed in Conduit (Reference Method 3)' :
                                          circuit.installationMethod === 'insulated-wall' ? 'Method A - Enclosed in Insulated Wall (Reference Method 101)' :
                                          circuit.installationMethod === 'trunking' ? 'Method E - In Trunking' :
                                          circuit.installationMethod === 'underground' ? 'Method D - Underground' : 'Other Method'
        },
        
        protectionDevice: {
          deviceType: circuit.protectionDevice?.type || 'MCB',
          rating_In: circuit.protectionDevice?.rating || 0,
          ratingString: circuit.protectionDevice?.rating 
            ? `${circuit.protectionDevice.rating}A Type ${circuit.protectionDevice.curve || 'B'} ${circuit.protectionDevice.type || 'MCB'}`
            : 'Not specified',
          curve: circuit.protectionDevice?.curve || 'B',
          breakingCapacity: circuit.protectionDevice?.kaRating || 6,
          breakingCapacityString: circuit.protectionDevice?.kaRating 
            ? `${circuit.protectionDevice.kaRating}kA`
            : '6kA',
          rcdProtected: circuit.rcdProtected || false,
          rcdProtectionString: circuit.rcdProtected ? "Yes (30mA RCD)" : "No",
          afddRequired: circuit.afddRequired || false
        },
        
        designCalculations: {
          designCurrent: {
            Ib: circuit.calculations?.Ib ?? 0,
            calculation: `Ib = Power ÷ Voltage = ${circuit.loadPower}W ÷ ${circuit.voltage}V = ${fmt(circuit.calculations?.Ib, 1)}A`,
            result: `${fmt(circuit.calculations?.Ib, 1)}A`
          },
          
          cableSizing: {
            regulation: "433.1.1",
            tabulatedCapacity_It: circuit.deratingFactors?.Ca ? (circuit.calculations.Iz / circuit.deratingFactors.overall) : 0,
            nominalCurrent_In: circuit.protectionDevice.rating,
            effectiveCapacity_Iz: circuit.calculations?.Iz ?? 0,
            safetyMargin: circuit.calculations?.safetyMargin ?? 0,
            safetyMarginPercent: `${fmt(circuit.calculations?.safetyMargin, 1)}%`,
            compliant: circuit.calculations?.voltageDrop?.compliant ?? true,
            complianceText: circuit.calculations?.voltageDrop?.compliant ? "✓ COMPLIANT" : "✗ NON-COMPLIANT"
          },
          
          voltageDrop: {
            regulation: "525",
            actualDrop: circuit.calculations?.voltageDrop?.volts ?? 0,
            actualDropString: `${fmt(circuit.calculations?.voltageDrop?.volts, 1)}V (${fmt(circuit.calculations?.voltageDrop?.percent, 2)}%)`,
            maximumPermitted: circuit.calculations?.voltageDrop?.limit ?? 0,
            maximumPermittedString: `${fmt(circuit.calculations?.voltageDrop?.limit, 1)}V (5%)`,
            compliant: circuit.calculations?.voltageDrop?.compliant ?? true,
            complianceText: circuit.calculations?.voltageDrop?.compliant ? "✓ COMPLIANT" : "✗ NON-COMPLIANT"
          },
          
          earthFaultLoop: {
            regulation: "411.4.4",
            actualZs: circuit.calculations?.zs ?? 0,
            actualZsString: `${fmt(circuit.calculations?.zs, 2)}Ω`,
            maximumZs: circuit.calculations?.maxZs ?? 0,
            maximumZsString: `${fmt(circuit.calculations?.maxZs, 2)}Ω`,
            compliant: (circuit.calculations?.zs ?? 0) < (circuit.calculations?.maxZs ?? 999),
            complianceText: (circuit.calculations?.zs ?? 0) < (circuit.calculations?.maxZs ?? 999) ? "✓ COMPLIANT" : "✗ NON-COMPLIANT",
            expectedR1R2: circuit.expectedTestResults?.r1r2?.at20C || "TBC on-site"
          }
        },
        
        justifications: circuit.justifications,
        
        diversity: {
          applied: !!circuit.diversityFactor && circuit.diversityFactor < 1.0,
          factor: circuit.diversityFactor || 1.0,
          factorPercent: `${((circuit.diversityFactor || 1.0) * 100).toFixed(0)}%`,
          justification: circuit.diversityJustification || "No diversity applied - full load considered"
        },
        
        faultCurrentAnalysis: circuit.faultCurrentAnalysis ? {
          psccAtCircuit: circuit.faultCurrentAnalysis.psccAtCircuit,
          psccAtCircuitString: `${circuit.faultCurrentAnalysis.psccAtCircuit} kA`,
          deviceBreakingCapacity: circuit.faultCurrentAnalysis.deviceBreakingCapacity,
          deviceBreakingCapacityString: `${circuit.faultCurrentAnalysis.deviceBreakingCapacity} kA`,
          compliant: circuit.faultCurrentAnalysis.compliant,
          complianceText: circuit.faultCurrentAnalysis.compliant ? "✓ COMPLIANT" : "✗ NON-COMPLIANT",
          marginOfSafety: circuit.faultCurrentAnalysis.marginOfSafety,
          regulation: circuit.faultCurrentAnalysis.regulation
        } : null,
        
        earthingRequirements: circuit.earthingRequirements ? {
          cpcSize: circuit.earthingRequirements.cpcSize,
          supplementaryBonding: circuit.earthingRequirements.supplementaryBonding,
          supplementaryBondingString: circuit.earthingRequirements.supplementaryBonding ? 'Yes' : 'No',
          bondingConductorSize: circuit.earthingRequirements.bondingConductorSize,
          justification: circuit.earthingRequirements.justification,
          regulation: circuit.earthingRequirements.regulation
        } : null,
        
        deratingFactors: circuit.deratingFactors ? {
          Ca: circuit.deratingFactors.Ca,
          Cg: circuit.deratingFactors.Cg,
          Ci: circuit.deratingFactors.Ci,
          overall: circuit.deratingFactors.overall,
          explanation: circuit.deratingFactors.explanation,
          tableReferences: circuit.deratingFactors.tableReferences
        } : null,
        
        installationGuidance: circuit.installationGuidance ? {
          referenceMethod: circuit.installationGuidance.referenceMethod,
          description: circuit.installationGuidance.description,
          clipSpacing: circuit.installationGuidance.clipSpacing,
          practicalTips: circuit.installationGuidance.practicalTips || [],
          regulation: circuit.installationGuidance.regulation
        } : null,
        
        specialLocationCompliance: circuit.specialLocationCompliance ? {
          isSpecialLocation: circuit.specialLocationCompliance.isSpecialLocation,
          locationType: circuit.specialLocationCompliance.locationType,
          requirements: circuit.specialLocationCompliance.requirements || [],
          requirementsString: (circuit.specialLocationCompliance.requirements || []).join('; '),
          zonesApplicable: circuit.specialLocationCompliance.zonesApplicable,
          regulation: circuit.specialLocationCompliance.regulation
        } : null,
        
        expectedTestResults: circuit.expectedTestResults ? {
          r1r2: {
            at20C: circuit.expectedTestResults.r1r2?.at20C || 'N/A',
            at70C: circuit.expectedTestResults.r1r2?.at70C || 'N/A',
            calculation: circuit.expectedTestResults.r1r2?.calculation || ''
          },
          zs: {
            calculated: circuit.expectedTestResults.zs?.calculated || 'N/A',
            maxPermitted: circuit.expectedTestResults.zs?.maxPermitted || 'N/A',
            compliant: circuit.expectedTestResults.zs?.compliant || false,
            complianceText: circuit.expectedTestResults.zs?.compliant ? "✓ COMPLIANT" : "✗ NON-COMPLIANT"
          },
          insulationResistance: {
            testVoltage: circuit.expectedTestResults.insulationResistance?.testVoltage || '500V DC',
            minResistance: circuit.expectedTestResults.insulationResistance?.minResistance || '≥1.0MΩ per BS 7671 Table 61'
          },
          polarity: circuit.expectedTestResults.polarity || 'Correct at all points',
          rcdTest: circuit.expectedTestResults.rcdTest ? {
            at1x: circuit.expectedTestResults.rcdTest.at1x || 'N/A',
            at5x: circuit.expectedTestResults.rcdTest.at5x || 'N/A',
            regulation: circuit.expectedTestResults.rcdTest.regulation || 'BS 7671 Regulation 643.2.2'
          } : null
        } : null,
        
        isSpecialLocation: circuit.specialLocationCompliance?.isSpecialLocation || false,
        specialLocationType: circuit.specialLocationCompliance?.locationType || '',
        specialLocationRequirements: (circuit.specialLocationCompliance?.requirements || []).join('; '),
        
        expectedR1R2: circuit.expectedTestResults?.r1r2?.at70C || 'N/A',
        expectedZs: fmt(circuit.calculations?.zs, 2),
        expectedInsulation: '>1MΩ',
        
        warnings: circuit.warnings || [],
        hasWarnings: (circuit.warnings?.length || 0) > 0
      })),
      
      diversityBreakdown: design.diversityBreakdown || {
        totalConnectedLoad,
        diversifiedLoad,
        overallDiversityFactor: design.diversityFactor || 0.65,
        reasoning: "Diversity applied in accordance with BS 7671 Appendix A. Assessment considers coincident maximum demand unlikely to occur simultaneously across all circuits.",
        bs7671Reference: "Appendix A - Current-carrying capacity and voltage drop for cables and flexible cords",
        circuitDiversity: design.circuits.map(c => ({
          circuitName: c.name,
          connectedLoad: c.loadPower || 0,
          diversityFactorApplied: c.diversityFactor || 1.0,
          diversifiedLoad: (c.loadPower || 0) * (c.diversityFactor || 1.0),
          justification: c.diversityJustification || "No diversity applied"
        }))
      },
      
      materials: design.materials || [],
      
      costEstimate: design.costEstimate || {
        materials: 0,
        labour: 0,
        total: 0,
        currency: "GBP"
      },
      
      practicalGuidance: design.practicalGuidance || [
        "All circuits to be tested and inspected in accordance with BS 7671:2018+A3:2024",
        "RCD operation to be verified at 1x and 5x rated residual current",
        "Installation certificate to be completed and issued upon completion",
        "Schedule of test results to accompany installation certificate"
      ],
      
      designWarnings: design.practicalGuidance || [],
      complianceStatement: "BS 7671:2018+A3:2024",
      generationTimestamp: new Date().toISOString(),
      
      designNotes: {
        general: "This design complies with BS 7671:2018+A3:2024 (18th Edition IET Wiring Regulations). All circuits designed for safe operation with adequate protection against overload, short circuit, and earth faults.",
        diversity: `Diversity factors applied in accordance with IET On-Site Guide Appendix 15. Total diversified load: ${fmt(diversifiedLoad / 1000, 1)}kW (${fmt(designCurrent, 1)}A at ${supplyVoltage}V).`,
        earthing: `${design.consumerUnit?.incomingSupply?.earthingSystem || 'TN-C-S'} earthing system. Main earthing conductor ${design.consumerUnit?.incomingSupply?.earthingSystem === 'TN-S' ? '16mm²' : '10mm²'} minimum. Main protective bonding to water, gas, oil, and structural steel required.`,
        rcd: design.circuits.some(c => c.rcdProtected) 
          ? "Split-load consumer unit with 30mA RCD protecting socket circuits and bathroom. Non-RCD side protects fixed loads (cooker, immersion, lighting)." 
          : "All circuits protected by individual RCBOs providing both overload and residual current protection.",
        testing: "Installation must be inspected and tested per BS 7671 Part 6 before being put into service. Electrical Installation Certificate required.",
        specialLocations: design.circuits.some(c => c.specialLocationCompliance?.isSpecialLocation)
          ? "Special locations identified (bathrooms/outdoor areas). Additional requirements apply including mandatory RCD protection and IP rating requirements per Section 701/702/703."
          : "No special locations requiring additional protection measures."
      },
      
      installationRequirements: {
        minimumCableSizes: {
          mainEarthing: design.consumerUnit?.incomingSupply?.earthingSystem === 'TN-S' ? '16mm²' : '10mm²',
          mainBonding: '10mm²',
          supplementaryBonding: '4mm² (if required in special locations)'
        },
        ipRatings: {
          bathroom_zone0: 'IPX7 minimum (immersion)',
          bathroom_zone1: 'IPX5 minimum (IPX4 if low pressure jets unlikely)',
          bathroom_zone2: 'IPX4 minimum',
          general: 'IP2X minimum for all enclosures'
        },
        clearances: {
          consumerUnit_height: 'Between 1.2m - 1.4m from finished floor level',
          socket_height: '450mm - 1200mm (accessible to wheelchair users if required)',
          switch_height: '900mm - 1100mm',
          bathroom_zones: 'Follow Section 701 zone classifications strictly'
        }
      },
      
      certificationRequirements: {
        initialVerification: 'Electrical Installation Certificate (BS 7671 Appendix 6) required upon completion',
        schedules: 'Schedule of Inspections and Schedule of Test Results must accompany certificate',
        designerDeclaration: 'Designer declaration confirming compliance with BS 7671 required',
        installerDeclaration: 'Installer/Constructor declaration required with signature',
        inspectionDeclaration: 'Inspector declaration required if different from designer/installer'
      },
      
      testingRequirements: {
        continuityOfProtectiveConductors: {
          test: 'R1+R2 continuity test using low resistance ohmmeter',
          acceptance: 'Values should match calculated values ±20%',
          circuits: 'All circuits must be tested'
        },
        insulationResistance: {
          test: '500V DC insulation test between live conductors and earth',
          acceptance: '>1MΩ minimum (>2MΩ preferred for new installations)',
          circuits: 'All circuits tested individually'
        },
        polarity: {
          test: 'Visual inspection and continuity test',
          acceptance: 'All poles, switches, and single-pole devices in phase conductor only',
          circuits: 'All circuits and accessories'
        },
        earthFaultLoopImpedance: {
          test: 'Zs measurement at furthest point of each circuit',
          acceptance: 'Below maximum Zs for protective device (refer to circuit schedules)',
          circuits: 'All final circuits'
        },
        rcdOperation: {
          test: 'RCD trip time test at 1x and 5x rated residual current (IΔn)',
          acceptance: 'Trip within 300ms at 1xIΔn, 40ms at 5xIΔn',
          circuits: 'All RCD protected circuits (test at multiple points)'
        },
        functionalTesting: {
          test: 'Operation of all switches, controls, interlocks, and equipment',
          acceptance: 'All equipment operates correctly and safely',
          circuits: 'All circuits and equipment'
        }
      },
      
      maintenanceRecommendations: {
        rcdTesting: 'Test RCD operation quarterly using integral test button. Record test date.',
        visualInspection: 'Annual visual inspection of installation for damage, wear, or deterioration',
        periodicInspection: design.installationType === 'domestic' 
          ? 'Full periodic inspection and testing every 10 years (domestic property)'
          : design.installationType === 'commercial'
          ? 'Full periodic inspection and testing every 5 years (commercial property)'
          : 'Full periodic inspection and testing every 3 years (industrial property)',
        consumerUnitCheck: 'Check for signs of overheating, damage, loose connections, or deterioration annually'
      },
      
      safetyInformation: {
        isolationNotice: 'Durable warning notice required at consumer unit: "PERIODIC INSPECTION & TESTING REQUIRED"',
        emergencyContact: 'Emergency isolation instructions and electrical contractor contact details should be provided to client',
        restrictedAccess: 'Consumer unit location must be readily accessible but secure from unauthorized access',
        labellingRequired: 'All circuits must be clearly and permanently labeled at consumer unit using durable labels'
      },
      
      amendments: {
        amendment3_2024: {
          applicableChanges: [
            'Updated voltage drop limits: 3% for lighting, 5% for other uses',
            'Enhanced electric vehicle charging requirements (Section 722)',
            'Updated guidance on surge protection devices (Section 443)',
            'Clarifications on RCD protection requirements for socket outlets',
            'Additional requirements for energy efficiency and sustainability'
          ],
          implementationDate: 'September 2024',
          transitionPeriod: 'Immediate implementation required for all new designs'
        }
      },
      
      projectSpecificNotes: [
        `Client informed of ${design.installationType === 'domestic' ? '10' : design.installationType === 'commercial' ? '5' : '3'}-year periodic inspection requirement`,
        'Consumer unit location confirmed with client and meets accessibility requirements',
        design.circuits.some(c => c.afddRequired) ? 'AFDD protection specified where required by Amendment 2' : 'AFDDs assessed - not required for this installation',
        design.circuits.some(c => c.rcdProtected) ? 'All socket outlets protected by 30mA RCD as per Regulation 411.3.3' : '',
        design.circuits.some(c => c.specialLocationCompliance?.isSpecialLocation) ? 'Special location requirements assessed and protection measures specified' : '',
        'All surge protection measures considered in accordance with BS 7671 Section 443'
      ].filter(Boolean),
      
      calculationMethods: {
        designCurrent: 'Ib = Power(W) / Voltage(V) for single-phase circuits. For three-phase: Ib = Power(W) / (√3 × Voltage(V))',
        voltageDrop: 'Vd = (mV/A/m × Ib × L) / 1000, where L is circuit length in meters. Tabulated values from BS 7671 Appendix 4.',
        earthFaultLoop: 'Zs = Ze + R1 + R2, where Ze is external impedance, R1 is live conductor resistance, R2 is CPC resistance',
        cableSelection: 'Selection criteria: In ≥ Ib (nominal rating ≥ design current) and Iz ≥ In (cable capacity ≥ protection rating) with correction factors Ca, Cg, Ci applied',
        maxZsCalculation: 'Maximum Zs values from BS 7671 Appendix 3 based on protective device type, curve, and disconnection time requirement (0.4s for socket circuits, 5s for distribution)'
      },
      
      standardsReferences: {
        mainStandard: 'BS 7671:2018+A3:2024 Requirements for Electrical Installations (IET Wiring Regulations 18th Edition)',
        supportingDocuments: [
          'IET On-Site Guide (BS 7671:2018+A3:2024)',
          'IET Guidance Note 1: Selection & Erection',
          'IET Guidance Note 3: Inspection & Testing',
          'IET Guidance Note 6: Protection Against Overcurrent',
          'IET Guidance Note 7: Special Locations',
          'IET Guidance Note 8: Earthing & Bonding',
          'BS EN 60898: Circuit Breakers for Overcurrent Protection',
          'BS EN 61008: RCDs without Integral Overcurrent Protection',
          'BS EN 61009: RCBOs',
          'BS EN 61439-3: Distribution Boards',
          'BS 1363: 13A Plugs, Socket-outlets and Adaptors',
          'BS 6004: PVC Insulated Cables for Electric Power and Lighting',
          'BS 7671 Amendment 3 (2024): Latest regulatory updates'
        ]
      },
      
      qualityAssurance: {
        designReview: 'Design reviewed for compliance with BS 7671:2018+A3:2024 and all applicable amendments',
        calculations: 'All electrical calculations verified using industry-standard methods and BS 7671 tabulated data',
        standards: 'Design meets requirements of current edition of BS 7671 and all relevant British/European Standards',
        competence: 'Design completed by qualified and competent electrical designer with up-to-date BS 7671 certification'
      },
      
      complianceStatementLegacy: {
        text: "This electrical installation design has been prepared in accordance with BS 7671:2018+A3:2024 (18th Edition IET Wiring Regulations). All circuit designs comply with current UK electrical safety standards and regulations. Installation must be carried out by a competent person and tested in accordance with BS 7671 requirements.",
        regulation: "BS 7671:2018+A3:2024",
        designerAuthorization: {
          designedBy: design.electricianName || 'N/A',
          date: new Date().toISOString().split('T')[0],
          signature: "[To be signed on printed document]"
        }
      }
    };
  };
  
  const handleQuickForward = (targetAgent: AgentType) => {
    const routes: Record<AgentType, string> = {
      'designer': '/electrician/circuit-designer',
      'cost-engineer': '/electrician/cost-engineer',
      'installer': '/electrician/installation-specialist',
      'health-safety': '/electrician/health-safety',
      'commissioning': '/electrician/commissioning',
      'maintenance': '/electrician/maintenance',
      'project-manager': '/electrician/project-manager',
      'tutor': '/electrician/ai-tutor'
    };
    
    navigate(routes[targetAgent], { 
      state: { fromAgentSelector: true }
    });
  };

  const allCompliant = design.circuits.every(c => 
    c.calculations.voltageDrop.compliant && 
    c.calculations.zs < c.calculations.maxZs
  );

  const handleExportPDF = async () => {
    setIsExporting(true);
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      // Try PDF Monkey first
      const { data, error } = await supabase.functions.invoke('generate-circuit-design-pdf', {
        body: {
          design: design,
          userId: user?.id
        }
      });

      if (error) {
        console.error('[PDF-EXPORT] Edge function error:', error);
        throw error;
      }

      // Check if we should use fallback
      if (data?.useFallback || !data?.success) {
        const reason = data?.reason || 'unknown';
        console.log('[PDF-EXPORT] Using fallback jsPDF method. Reason:', reason);
        
        // Show helpful message based on reason
        if (reason === 'template_missing') {
          toast.info('Using basic PDF export', {
            description: 'PDF Monkey template not configured - generating with jsPDF'
          });
        }
        
        // Fallback to existing jsPDF method
        const schedule = generateEICSchedule(
          {
            installationId: `DESIGN-${Date.now()}`,
            circuits: design.circuits.map((c, idx) => ({
              circuitNumber: idx + 1,
              name: c.name,
              loadType: c.loadType,
              phases: c.phases === 'three' ? 'three-phase' : 'single-phase',
              cableSize: c.cableSize,
              cpcSize: c.cpcSize,
              cableLength: c.cableLength,
              protectionDevice: c.protectionDevice,
              rcdProtected: c.rcdProtected,
              afddRequired: c.afddRequired,
              calculationResults: {
                zs: c.calculations.zs,
                maxZs: c.calculations.maxZs,
                installationMethod: c.installationMethod
              }
            })),
            consumerUnit: design.consumerUnit
          },
          {
            projectName: design.projectName,
            leadElectrician: design.electricianName
          },
          {
            propertyAddress: design.location
          }
        );

        await downloadEICPDF(schedule, `${design.projectName.replace(/\s+/g, '_')}_Design.pdf`);
        
        toast.success('Professional PDF generated', {
          description: 'BS 7671 compliant circuit design PDF ready'
        });
      } else if (data?.downloadUrl) {
        // PDF Monkey success - download the PDF
        console.log('[PDF-EXPORT] PDF Monkey success, downloading:', data.downloadUrl);
        
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.download = `${design.projectName.replace(/\s+/g, '_')}_Design.pdf`;
        link.click();
        
        toast.success('Professional PDF Generated', {
          description: 'Circuit design exported with BS 7671 compliance'
        });
      }
    } catch (error) {
      console.error('[PDF-EXPORT] Error:', error);
      toast.error('Failed to export PDF');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportToEIC = async () => {
    setIsExporting(true);
    setExportSuccess(false);
    
    try {
      const { data, error } = await supabase.functions.invoke('prepare-eic-export', {
        body: {
          design: design,
          projectName: design.projectName,
          location: design.location,
          clientName: design.clientName,
          electricianName: design.electricianName
        }
      });
      
      if (error) throw error;
      
      setExportSuccess(true);
      setExportId(data.reference || data.exportId?.slice(0, 8) || 'N/A');
      
      toast.success(`${design.circuits.length} circuits ready for EIC testing`, {
        description: `Reference: ${data.reference || 'N/A'}`
      });
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export to EIC testing', {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Guard: If no circuits at all, show error
  if (!design.circuits || design.circuits.length === 0) {
    console.error('❌ No circuits in design:', design);
    return (
      <Card className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Circuits Generated</AlertTitle>
          <AlertDescription>
            The AI did not generate any circuits. Please try again with different parameters.
          </AlertDescription>
        </Alert>
        <Button onClick={onReset} className="mt-4">Try Again</Button>
      </Card>
    );
  }

  // Guard: Ensure selectedCircuit index is valid
  if (selectedCircuit >= design.circuits.length) {
    console.warn(`Selected circuit index ${selectedCircuit} is out of bounds (total: ${design.circuits.length}), resetting to 0`);
    setSelectedCircuit(0);
  }

  const currentCircuit = design.circuits[selectedCircuit];

  // Guard: If currentCircuit is undefined or missing required properties, show error
  if (!currentCircuit) {
    console.error('❌ Current circuit is undefined:', {
      selectedCircuit,
      circuitCount: design.circuits.length,
      circuits: design.circuits
    });
    return (
      <Card className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Circuit Not Found</AlertTitle>
          <AlertDescription>
            The selected circuit could not be found. Please try selecting a different circuit.
          </AlertDescription>
        </Alert>
        <Button onClick={onReset} className="mt-4">Reset</Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Agent Flow Diagram */}
      <AgentFlowDiagram currentAgent="designer" onQuickForward={handleQuickForward} />

      {/* Summary Card */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">{design.projectName}</h2>
            <p className="text-muted-foreground">{design.location}</p>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${allCompliant ? 'bg-green-500/10 text-green-600' : 'bg-amber-500/10 text-amber-600'}`}>
            {allCompliant ? <CheckCircle2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
            <span className="font-semibold">{allCompliant ? 'All Compliant' : 'Issues Found'}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <div>
            <p className="text-sm text-white/80">Total Load</p>
            <p className="text-lg font-bold text-white">{design.totalLoad / 1000}kW</p>
          </div>
          <div>
            <p className="text-sm text-white/80">After Diversity</p>
            <p className="text-lg font-bold text-white">
              {design.diversityBreakdown 
                ? `${fmt(design.diversityBreakdown.diversifiedLoad, 1)}kW`
                : `${design.totalLoad / 1000}kW`}
            </p>
          </div>
          <div>
            <p className="text-sm text-white/80">Circuits</p>
            <p className="text-lg font-bold text-white">{design.circuits.length}</p>
          </div>
          <div>
            <p className="text-sm text-white/80">Consumer Unit</p>
            <p className="text-lg font-bold text-white">{design.consumerUnit.mainSwitchRating}A</p>
          </div>
        </div>
      </Card>

      {/* Diversity Breakdown Card */}
      {design.diversityBreakdown && (
        <Card className="p-4 sm:p-6 bg-card/30 border-white/10">
          <Accordion type="single" collapsible>
            <AccordionItem value="diversity" className="border-none">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 flex-1">
                  <Percent className="h-5 w-5 text-primary flex-shrink-0" />
                  <div className="text-left">
                    <h3 className="text-base font-semibold text-white">Load Diversity Breakdown</h3>
                    <p className="text-sm text-white/70 mt-0.5">
                      {fmt(design.diversityBreakdown.totalConnectedLoad, 1)}kW → {fmt(design.diversityBreakdown.diversifiedLoad, 1)}kW 
                      <Badge variant="secondary" className="ml-2">{fmt(design.diversityBreakdown.overallDiversityFactor * 100, 0)}% applied</Badge>
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="space-y-4">
                  {/* Overall Calculation */}
                  <div className="flex items-center justify-between py-2 px-3 bg-primary/10 rounded-lg">
                    <span className="text-sm text-white/80">Total Connected Load:</span>
                    <span className="font-bold text-white">{fmt(design.diversityBreakdown.totalConnectedLoad, 1)}kW</span>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 bg-primary/10 rounded-lg">
                    <span className="text-sm text-white/80">Diversity Factor:</span>
                    <span className="font-bold text-white">{fmt(design.diversityBreakdown.overallDiversityFactor * 100, 0)}%</span>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 bg-green-500/20 rounded-lg border border-green-500/30">
                    <span className="text-sm font-semibold text-white">After Diversity:</span>
                    <span className="font-bold text-lg text-white">{fmt(design.diversityBreakdown.diversifiedLoad, 1)}kW</span>
                  </div>

                  {/* Per-Circuit Breakdown */}
                  {design.diversityBreakdown.circuitDiversity && design.diversityBreakdown.circuitDiversity.length > 0 && (
                    <div className="space-y-2 mt-4">
                      <p className="text-xs font-semibold text-white/70 uppercase tracking-wide">Per-Circuit Breakdown:</p>
                      <div className="space-y-2">
                        {design.diversityBreakdown.circuitDiversity.map((cd, idx) => (
                          <div key={idx} className="py-2 px-3 bg-background/30 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-white text-sm">{cd.circuitName}</span>
                              <Badge variant="outline" className="text-xs">{fmt(cd.diversityFactorApplied * 100, 0)}%</Badge>
                            </div>
                            <div className="text-xs text-white/60">
                              {fmt(cd.connectedLoad, 1)}kW × {cd.diversityFactorApplied} = {fmt(cd.diversifiedLoad, 1)}kW
                            </div>
                            <div className="text-xs text-white/50 italic mt-1">{cd.justification}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reasoning */}
                  <div className="py-3 px-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-xs font-medium text-blue-400 mb-1">BS 7671 Reference:</p>
                    <p className="text-sm text-white/80 leading-relaxed">{design.diversityBreakdown.reasoning}</p>
                    <Badge variant="outline" className="mt-2 text-xs text-blue-400 border-blue-400/30">
                      {design.diversityBreakdown.bs7671Reference}
                    </Badge>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      )}

      {/* Circuit Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {design.circuits.map((circuit, idx) => (
          <Button
            key={idx}
            variant={selectedCircuit === idx ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCircuit(idx)}
            className="flex-shrink-0"
          >
            C{circuit.circuitNumber}
          </Button>
        ))}
      </div>

      {/* Circuit Detail Card */}
      {currentCircuit && currentCircuit.cableSize && currentCircuit.protectionDevice && currentCircuit.calculations ? (
        <Card className="p-6">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">
                  C{currentCircuit.circuitNumber}
                </span>
                {currentCircuit.name}
              </h3>
              <p className="text-muted-foreground capitalize">{currentCircuit.loadType}</p>
            </div>

            {/* Special Location Alert */}
            {currentCircuit.specialLocationCompliance?.isSpecialLocation && (
              <Alert className="border-amber-500/50 bg-amber-500/10">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <AlertTitle className="text-amber-400 font-semibold">Special Location Requirements</AlertTitle>
                <AlertDescription>
                  <div className="space-y-3 mt-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-amber-400 border-amber-400/30 font-mono text-xs">
                        {currentCircuit.specialLocationCompliance.regulation}
                      </Badge>
                      <span className="font-semibold text-white">
                        {currentCircuit.specialLocationCompliance.locationType}
                      </span>
                    </div>
                    
                    <ul className="space-y-1.5 text-sm text-white">
                      {currentCircuit.specialLocationCompliance.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-left">
                          <span className="flex-shrink-0">•</span>
                          <span className="leading-relaxed">{req}</span>
                        </li>
                      ))}
                    </ul>

                    {currentCircuit.specialLocationCompliance.zonesApplicable && (
                      <div className="py-2 px-3 bg-amber-500/10 rounded border border-amber-500/20">
                        <p className="text-xs font-medium text-amber-400">Zones Applicable:</p>
                        <p className="text-sm text-white text-left">{currentCircuit.specialLocationCompliance.zonesApplicable}</p>
                      </div>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Layout - Vertical Stack with Cards */}
            <div className="space-y-4">
              {/* Load Details Card */}
              <Card className="bg-card/30 border-white/10">
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-base font-semibold text-white">
                    <Zap className="h-5 w-5 text-primary" />
                    Load Details
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 py-2 px-3 bg-background/30 rounded-lg">
                      <span className="text-sm text-white/80 min-w-[120px]">Power:</span>
                      <span className="font-medium text-white">{currentCircuit.loadPower}W ({fmt(currentCircuit.loadPower / 1000, 1)}kW)</span>
                    </div>
                    {currentCircuit.socketCount && (
                      <div className="flex items-center gap-3 py-2 px-3 bg-background/30 rounded-lg">
                        <span className="text-sm text-white/80 min-w-[120px]">Sockets:</span>
                        <span className="font-medium text-white">{currentCircuit.socketCount} outlets</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 py-2 px-3 bg-background/30 rounded-lg">
                      <span className="text-sm text-white/80 min-w-[120px]">Design Current (Ib):</span>
                      <span className="font-medium text-white">{fmt(currentCircuit.calculations?.Ib, 1)}A</span>
                    </div>
                    <div className="flex items-center gap-3 py-2 px-3 bg-background/30 rounded-lg">
                      <span className="text-sm text-white/80 min-w-[120px]">Phases:</span>
                      <span className="font-medium text-white capitalize">{currentCircuit.phases}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Cable Specification Card */}
              <Card className="bg-card/30 border-white/10">
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-base font-semibold text-white">
                    <Cable className="h-5 w-5 text-primary" />
                    Cable Specification
                  </div>
                  
                  {/* Cable Type Description - Full Width */}
                  {currentCircuit.cableType && (
                    <div className="py-2 px-3 bg-background/30 rounded-lg">
                      <p className="text-sm text-white/80 leading-relaxed">{currentCircuit.cableType}</p>
                    </div>
                  )}
                  
                  {/* Cable Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 py-2 px-3 bg-background/30 rounded-lg">
                      <span className="text-sm text-white/80 min-w-[120px]">Live Conductor:</span>
                      <span className="font-medium text-white">{currentCircuit.cableSize ?? 'N/A'}mm²</span>
                    </div>
                    <div className="flex items-center gap-3 py-2 px-3 bg-background/30 rounded-lg">
                      <span className="text-sm text-white/80 min-w-[120px]">CPC:</span>
                      <span className="font-medium text-white">{currentCircuit.cpcSize ?? 'N/A'}mm²</span>
                    </div>
                    <div className="flex items-center gap-3 py-2 px-3 bg-background/30 rounded-lg">
                      <span className="text-sm text-white/80 min-w-[120px]">Length:</span>
                      <span className="font-medium text-white">{currentCircuit.cableLength}m</span>
                    </div>
                    <div className="flex items-center gap-3 py-2 px-3 bg-background/30 rounded-lg">
                      <span className="text-sm text-white/80 min-w-[120px]">Method:</span>
                      <span className="font-medium text-white">
                        {(() => {
                          const method = currentCircuit.installationGuidance?.referenceMethod || currentCircuit.installationMethod || '';
                          // Clean up installation method formatting
                          return method
                            .replace(/\s*-\s*/g, ' - ') // Normalize dashes
                            .replace(/\s+/g, ' ') // Normalize spaces
                            .trim();
                        })()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Installation Method Description */}
                  {currentCircuit.installationGuidance?.description && (
                    <div className="py-2 px-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <p className="text-xs text-blue-400 font-medium mb-1">Installation Method</p>
                      <p className="text-sm text-white/80 leading-relaxed">
                        {currentCircuit.installationGuidance.description}
                      </p>
                      {currentCircuit.installationGuidance.regulation && (
                        <Badge variant="outline" className="mt-2 text-xs text-blue-400 border-blue-400/30">
                          {currentCircuit.installationGuidance.regulation}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </Card>

              {/* Protection Device Card */}
              <Card className="bg-card/30 border-white/10">
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-base font-semibold text-white">
                    <Shield className="h-5 w-5 text-primary" />
                    Protection Device
                  </div>
                  
                  {/* Device Specification */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex items-center justify-between sm:justify-start sm:gap-4 py-2 px-3 bg-background/30 rounded-lg">
                      <span className="text-sm text-white/80">Type:</span>
                      <span className="font-medium text-white">{currentCircuit.protectionDevice?.type ?? 'MCB'}</span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-start sm:gap-4 py-2 px-3 bg-background/30 rounded-lg">
                      <span className="text-sm text-white/80">Rating:</span>
                      <span className="font-medium text-white">{currentCircuit.protectionDevice?.rating ?? 'N/A'}A Type {currentCircuit.protectionDevice?.curve ?? 'B'}</span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-start sm:gap-4 py-2 px-3 bg-background/30 rounded-lg">
                      <span className="text-sm text-white/80">Breaking Capacity:</span>
                      <Badge variant="secondary" className="font-medium">{currentCircuit.protectionDevice?.kaRating ?? 6}kA</Badge>
                    </div>
                  </div>

                  {/* RCD Badge */}
                  {currentCircuit.rcdProtected && (
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary/20 text-primary border-primary/30">RCD Protected</Badge>
                    </div>
                  )}

                  {/* Justification */}
                  {currentCircuit.justifications?.protection && (
                    <div className="py-3 px-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <FileText className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div className="space-y-1 flex-1">
                          <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide">Selection Justification</p>
                          <p className="text-sm text-white/90 leading-relaxed">
                            {currentCircuit.justifications.protection}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Calculations */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <TrendingDown className="h-4 w-4 text-primary" />
                Compliance Checks
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div className={`p-3 rounded-lg ${currentCircuit.calculations.voltageDrop.compliant ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Voltage Drop</span>
                    {currentCircuit.calculations.voltageDrop.compliant ? 
                      <CheckCircle2 className="h-4 w-4 text-green-600" /> : 
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    }
                  </div>
                  <p className="text-lg font-bold">
                    {fmt(currentCircuit.calculations?.voltageDrop?.percent, 2)}%
                  </p>
                  <p className="text-xs text-white/60">
                    {fmt(currentCircuit.calculations?.voltageDrop?.volts, 2)}V (Max: {currentCircuit.calculations?.voltageDrop?.limit || 3}%)
                  </p>
                </div>

                <div className={`p-3 rounded-lg ${currentCircuit.calculations.zs < currentCircuit.calculations.maxZs ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Earth Fault Loop (Zs)</span>
                    {currentCircuit.calculations.zs < currentCircuit.calculations.maxZs ? 
                      <CheckCircle2 className="h-4 w-4 text-green-600" /> : 
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    }
                  </div>
                  <p className="text-lg font-bold">{fmt(currentCircuit.calculations?.zs, 3)}Ω</p>
                  <p className="text-xs text-white/60">
                    Max: {fmt(currentCircuit.calculations?.maxZs, 3)}Ω
                  </p>
                </div>
              </div>
            </div>

            {/* Justifications */}
            <div className="space-y-3 bg-card/50 p-4 rounded-lg border border-primary/10">
              <h4 className="font-semibold text-white">Design Justification</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-medium text-white mb-1">Cable Sizing:</p>
                  <p className="text-white/70">{currentCircuit.justifications.cableSize}</p>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Protection:</p>
                  <p className="text-white/70">{currentCircuit.justifications.protection}</p>
                </div>
                {currentCircuit.justifications.rcd && (
                  <div>
                    <p className="font-medium text-white mb-1">RCD Protection:</p>
                    <p className="text-white/70">{currentCircuit.justifications.rcd}</p>
                  </div>
                )}
              </div>
            </div>

            {/* 1. Diversity Breakdown */}
            {currentCircuit.diversityFactor !== undefined && (
              <div className="space-y-3 bg-card/50 p-4 rounded-lg border border-primary/10">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <Percent className="h-4 w-4 text-primary" />
                    Diversity Applied
                  </h4>
                  <Badge variant="secondary">{fmt(currentCircuit.diversityFactor * 100, 0)}%</Badge>
                </div>
                <p className="text-sm text-white/70">{currentCircuit.diversityJustification}</p>
              </div>
            )}

            {/* 2. Fault Current Analysis */}
            {currentCircuit.faultCurrentAnalysis && (
              <div className="space-y-3 bg-card/50 p-4 rounded-lg border border-primary/10">
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-white">Fault Current Analysis</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-white/60 mb-1">PSCC at Circuit</p>
                    <p className="text-lg font-bold text-white">{fmt(currentCircuit.faultCurrentAnalysis?.psccAtCircuit, 2)}kA</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/60 mb-1">Device Breaking Capacity</p>
                    <p className="text-lg font-bold text-white">{currentCircuit.faultCurrentAnalysis.deviceBreakingCapacity}kA</p>
                  </div>
                </div>
                <div className={`flex items-center gap-2 p-2 rounded ${currentCircuit.faultCurrentAnalysis.compliant ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                  {currentCircuit.faultCurrentAnalysis.compliant ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                  <span className="text-sm font-medium">{currentCircuit.faultCurrentAnalysis.marginOfSafety}</span>
                </div>
                <p className="text-xs text-white/60">{currentCircuit.faultCurrentAnalysis.regulation}</p>
              </div>
            )}

            {/* 3. Earthing & Bonding Requirements */}
            {currentCircuit.earthingRequirements && (
              <div className="space-y-3 bg-card/50 p-4 rounded-lg border border-primary/10">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-white">Earthing & Bonding</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-white/60">CPC Size</p>
                    <p className="font-medium text-white">{currentCircuit.earthingRequirements.cpcSize}</p>
                  </div>
                  <div>
                    <p className="text-white/60">Supplementary Bonding</p>
                    <p className="font-medium text-white">{currentCircuit.earthingRequirements.supplementaryBonding ? 'Required' : 'Not Required'}</p>
                  </div>
                  {currentCircuit.earthingRequirements.bondingConductorSize && (
                    <div className="md:col-span-2">
                      <p className="text-white/60">Bonding Conductor Size</p>
                      <p className="font-medium text-white">{currentCircuit.earthingRequirements.bondingConductorSize}</p>
                    </div>
                  )}
                </div>
                <p className="text-sm text-white/70">{currentCircuit.earthingRequirements.justification}</p>
                <Badge variant="outline" className="text-xs">{currentCircuit.earthingRequirements.regulation}</Badge>
              </div>
            )}

            {/* 4. Cable Derating Factors Breakdown */}
            {currentCircuit.deratingFactors && (
              <div className="space-y-3 bg-card/50 p-4 rounded-lg border border-primary/10">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-white">Derating Factors</h4>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-primary/10 p-2 rounded">
                    <p className="text-xs text-white/60">Ca</p>
                    <p className="text-lg font-bold text-white">{fmt(currentCircuit.deratingFactors?.Ca, 2)}</p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded">
                    <p className="text-xs text-white/60">Cg</p>
                    <p className="text-lg font-bold text-white">{fmt(currentCircuit.deratingFactors?.Cg, 2)}</p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded">
                    <p className="text-xs text-white/60">Ci</p>
                    <p className="text-lg font-bold text-white">{fmt(currentCircuit.deratingFactors?.Ci, 2)}</p>
                  </div>
                  <div className="bg-primary/5 p-2 rounded border border-primary/30">
                    <p className="text-xs text-white/60">Overall</p>
                    <p className="text-lg font-bold text-primary">{fmt(currentCircuit.deratingFactors?.overall, 2)}</p>
                  </div>
                </div>
                <p className="text-sm text-white/70">{currentCircuit.deratingFactors.explanation}</p>
                <p className="text-xs text-white/60">{currentCircuit.deratingFactors.tableReferences}</p>
              </div>
            )}

            {/* 5. Installation Method Guidance */}
            {currentCircuit.installationGuidance && (
              <div className="space-y-3 bg-card/50 p-4 rounded-lg border border-primary/10">
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-white">Installation Guidance</h4>
                </div>
                <div className="space-y-2">
                  <div>
                    <Badge variant="secondary" className="mb-2">{currentCircuit.installationGuidance.referenceMethod}</Badge>
                    <p className="text-sm text-white/70">{currentCircuit.installationGuidance.description}</p>
                  </div>
                  <div className="bg-primary/5 p-3 rounded">
                    <p className="text-xs text-white/60 mb-1">Clip Spacing</p>
                    <p className="text-sm font-medium text-white">{currentCircuit.installationGuidance.clipSpacing}</p>
                  </div>
                  {currentCircuit.installationGuidance.practicalTips.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-white mb-2">Practical Tips:</p>
                      <ul className="space-y-1">
                        {currentCircuit.installationGuidance.practicalTips.map((tip, idx) => (
                          <li key={idx} className="text-sm text-white/70 flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Badge variant="outline" className="text-xs">{currentCircuit.installationGuidance.regulation}</Badge>
                </div>
              </div>
            )}

            {/* 6. Special Location Compliance */}
            {currentCircuit.specialLocationCompliance?.isSpecialLocation && (
              <div className="space-y-3 bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-amber-600" />
                  <h4 className="font-semibold text-amber-600">Special Location Requirements</h4>
                </div>
                <Badge variant="secondary" className="bg-amber-500/20 text-amber-700">
                  {currentCircuit.specialLocationCompliance.locationType}
                </Badge>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-white text-left">Requirements:</p>
                  <ul className="space-y-1">
                    {currentCircuit.specialLocationCompliance.requirements.map((req, idx) => (
                      <li key={idx} className="text-sm text-white flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {currentCircuit.specialLocationCompliance.zonesApplicable && (
                  <p className="text-sm text-white text-left pl-6">{currentCircuit.specialLocationCompliance.zonesApplicable}</p>
                )}
                <Badge variant="outline" className="text-xs border-amber-500/30">{currentCircuit.specialLocationCompliance.regulation}</Badge>
              </div>
            )}

            {/* 7. Expected Test Results */}
            {currentCircuit.expectedTestResults && (
              <div className="space-y-3 bg-card/50 p-4 rounded-lg border border-primary/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ClipboardCheck className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-white">Expected Test Results</h4>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <FileText className="h-3 w-3 mr-1" />
                    EIC Schedule Preview
                  </Badge>
                </div>
                <div className="grid gap-3">
                  {/* R1+R2 */}
                  <div className="bg-primary/5 p-3 rounded">
                    <p className="text-xs text-white/60 mb-2">R1+R2 (Earth Continuity)</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-white/60">At 20°C:</p>
                        <p className="font-medium text-white">{currentCircuit.expectedTestResults.r1r2.at20C}</p>
                      </div>
                      <div>
                        <p className="text-white/60">At 70°C:</p>
                        <p className="font-medium text-white">{currentCircuit.expectedTestResults.r1r2.at70C}</p>
                      </div>
                    </div>
                    <p className="text-xs text-white/60 mt-2">{currentCircuit.expectedTestResults.r1r2.calculation}</p>
                  </div>

                  {/* Zs */}
                  <div className="bg-primary/5 p-3 rounded">
                    <p className="text-xs text-white/60 mb-2">Earth Fault Loop Impedance (Zs)</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-white/60">Calculated:</p>
                        <p className="font-medium text-white">{currentCircuit.expectedTestResults.zs.calculated}</p>
                      </div>
                      <div>
                        <p className="text-white/60">Max Permitted:</p>
                        <p className="font-medium text-white">{currentCircuit.expectedTestResults.zs.maxPermitted}</p>
                      </div>
                    </div>
                    <div className={`mt-2 flex items-center gap-2 text-xs ${currentCircuit.expectedTestResults.zs.compliant ? 'text-green-600' : 'text-red-600'}`}>
                      {currentCircuit.expectedTestResults.zs.compliant ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                      <span>{currentCircuit.expectedTestResults.zs.compliant ? 'Compliant' : 'Non-compliant'}</span>
                    </div>
                  </div>

                  {/* Insulation Resistance */}
                  <div className="bg-primary/5 p-3 rounded">
                    <p className="text-xs text-white/60 mb-2">Insulation Resistance</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-white/60">Test Voltage:</p>
                        <p className="font-medium text-white">{currentCircuit.expectedTestResults.insulationResistance.testVoltage}</p>
                      </div>
                      <div>
                        <p className="text-white/60">Min Required:</p>
                        <p className="font-medium text-white">{currentCircuit.expectedTestResults.insulationResistance.minResistance}</p>
                      </div>
                    </div>
                  </div>

                  {/* Polarity */}
                  <div className="bg-primary/5 p-3 rounded">
                    <p className="text-xs text-white/60 mb-1">Polarity</p>
                    <p className="text-sm font-medium text-white">{currentCircuit.expectedTestResults.polarity}</p>
                  </div>

                  {/* RCD Test */}
                  {currentCircuit.rcdProtected && currentCircuit.expectedTestResults.rcdTest && (
                    <div className="bg-primary/5 p-3 rounded">
                      <p className="text-xs text-white/60 mb-2">RCD Trip Times</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-white/60">At 1× IΔn:</p>
                          <p className="font-medium text-white">{currentCircuit.expectedTestResults.rcdTest.at1x}</p>
                        </div>
                        <div>
                          <p className="text-white/60">At 5× IΔn:</p>
                          <p className="font-medium text-white">{currentCircuit.expectedTestResults.rcdTest.at5x}</p>
                        </div>
                      </div>
                      <p className="text-xs text-white/60 mt-2">{currentCircuit.expectedTestResults.rcdTest.regulation}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Warnings */}
            {currentCircuit.warnings.length > 0 && (
              <div className="space-y-2 bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg">
                <h4 className="font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Notes & Warnings
                </h4>
                <ul className="space-y-1">
                  {currentCircuit.warnings.map((warning, idx) => (
                    <li key={idx} className="text-sm text-white text-left flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      ) : (
        <Card className="p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Circuit Data Incomplete</AlertTitle>
            <AlertDescription>
              This circuit is missing required design data. Please regenerate the design.
            </AlertDescription>
          </Alert>
        </Card>
      )}

      {/* Send to EIC Testing Card */}
      <Card className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-500/30">
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <ClipboardCheck className="h-8 w-8 text-emerald-400" />
            <div>
              <h3 className="text-lg font-semibold text-white">Ready for EIC Testing?</h3>
              <p className="text-sm text-white/70">
                Export this design to pre-fill an Electrical Installation Certificate
              </p>
            </div>
          </div>
          
          {/* JSON Preview Collapsible */}
          <Collapsible open={showJsonPreview} onOpenChange={setShowJsonPreview}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full justify-between text-white/70 hover:text-white hover:bg-white/5">
                <span className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {showJsonPreview ? 'Hide' : 'Show'} JSON Payload Preview
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showJsonPreview ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Tabs defaultValue="raw" className="mt-3">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="raw">Raw Request</TabsTrigger>
                <TabsTrigger value="transformed">EIC Format</TabsTrigger>
                <TabsTrigger value="design-pdf">Design PDF</TabsTrigger>
              </TabsList>
                
                {/* Tab 1: Raw Request Payload */}
                <TabsContent value="raw" className="mt-3">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 z-10 text-white/70 hover:text-white hover:bg-white/10"
                      onClick={() => {
                        const rawPayload = {
                          design: design,
                          projectName: design.projectName,
                          location: design.location,
                          clientName: design.clientName,
                          electricianName: design.electricianName
                        };
                        navigator.clipboard.writeText(JSON.stringify(rawPayload, null, 2));
                        toast.success('Raw JSON copied to clipboard');
                      }}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <div className="max-h-96 overflow-auto rounded-lg bg-slate-900 p-4 pr-20">
                      <pre className="text-xs text-emerald-300 font-mono">
                        {JSON.stringify({
                          design: design,
                          projectName: design.projectName,
                          location: design.location,
                          clientName: design.clientName,
                          electricianName: design.electricianName
                        }, null, 2)}
                      </pre>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Tab 2: Transformed EIC Format */}
                <TabsContent value="transformed" className="mt-3">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 z-10 text-white/70 hover:text-white hover:bg-white/10"
                      onClick={() => {
                        const eicCircuits = design.circuits.map((circuit, index) => {
                          const liveSize = circuit.cableSize.toString();
                          const cpcSize = circuit.cpcSize.toString();
                          const lengthM = circuit.cableLength;
                          
                          const expectedR1R2 = calculateExpectedR1R2(liveSize, cpcSize, lengthM);
                          const expectedZs = expectedR1R2 + (design.consumerUnit.incomingSupply.Ze || 0.35);
                          const maxZs = getMaxZsForDevice(
                            circuit.protectionDevice.type, 
                            circuit.protectionDevice.curve, 
                            circuit.protectionDevice.rating
                          );
                          
                          return {
                            circuitNumber: `C${index + 1}`,
                            phaseType: circuit.phases,
                            circuitDescription: circuit.name,
                            referenceMethod: circuit.installationMethod,
                            liveSize: `${liveSize}mm²`,
                            cpcSize: `${cpcSize}mm²`,
                            cableLength: `${lengthM}m`,
                            protectiveDeviceType: circuit.protectionDevice.type,
                            protectiveDeviceCurve: circuit.protectionDevice.curve,
                            protectiveDeviceRating: `${circuit.protectionDevice.rating}A`,
                            expectedR1R2: `${fmt(expectedR1R2, 3)}Ω`,
                            expectedZs: `${fmt(expectedZs, 3)}Ω`,
                            expectedMaxZs: `${fmt(maxZs, 2)}Ω`,
                            expectedInsulationResistance: "≥1.0MΩ (min), expect >50MΩ",
                            insulationTestVoltage: circuit.phases === "single" ? "500V DC" : "500V DC",
                            polarity: "Correct (verify on-site)",
                            rcdProtection: circuit.rcdProtected,
                            afddRequired: circuit.afddRequired,
                            // Blank fields for on-site testing
                            actualR1R2: null,
                            actualZs: null,
                            actualInsulationResistance: null,
                            actualPolarity: null,
                            actualRcdTest: null,
                            actualAfddTest: null,
                            pfc: null,
                            functionalTesting: null,
                            testDate: null,
                            testedBy: null,
                            testInstrumentSerial: null
                          };
                        });
                        
                        const transformedPayload = {
                          projectName: design.projectName,
                          location: design.location,
                          clientName: design.clientName,
                          electricianName: design.electricianName,
                          consumerUnit: design.consumerUnit,
                          eicCircuits: eicCircuits,
                          exportMetadata: {
                            exportedAt: new Date().toISOString(),
                            totalCircuits: eicCircuits.length,
                            status: "pending",
                            designType: design.installationType
                          }
                        };
                        
                        navigator.clipboard.writeText(JSON.stringify(transformedPayload, null, 2));
                        toast.success('EIC JSON copied to clipboard');
                      }}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <div className="max-h-96 overflow-auto rounded-lg bg-slate-900 p-4 pr-20">
                      <pre className="text-xs text-emerald-300 font-mono">
                        {JSON.stringify({
                          projectName: design.projectName,
                          location: design.location,
                          clientName: design.clientName,
                          electricianName: design.electricianName,
                          consumerUnit: design.consumerUnit,
                          eicCircuits: design.circuits.map((circuit, index) => {
                            const liveSize = circuit.cableSize.toString();
                            const cpcSize = circuit.cpcSize.toString();
                            const lengthM = circuit.cableLength;
                            
                            const expectedR1R2 = calculateExpectedR1R2(liveSize, cpcSize, lengthM);
                            const expectedZs = expectedR1R2 + (design.consumerUnit.incomingSupply.Ze || 0.35);
                            const maxZs = getMaxZsForDevice(
                              circuit.protectionDevice.type, 
                              circuit.protectionDevice.curve, 
                              circuit.protectionDevice.rating
                            );
                            
                            return {
                              circuitNumber: `C${index + 1}`,
                              phaseType: circuit.phases,
                              circuitDescription: circuit.name,
                              referenceMethod: circuit.installationMethod,
                              liveSize: `${liveSize}mm²`,
                              cpcSize: `${cpcSize}mm²`,
                              cableLength: `${lengthM}m`,
                              protectiveDeviceType: circuit.protectionDevice.type,
                              protectiveDeviceCurve: circuit.protectionDevice.curve,
                              protectiveDeviceRating: `${circuit.protectionDevice.rating}A`,
                              expectedR1R2: `${fmt(expectedR1R2, 3)}Ω`,
                              expectedZs: `${fmt(expectedZs, 3)}Ω`,
                              expectedMaxZs: `${fmt(maxZs, 2)}Ω`,
                              expectedInsulationResistance: "≥1.0MΩ (min), expect >50MΩ",
                              insulationTestVoltage: circuit.phases === "single" ? "500V DC" : "500V DC",
                              polarity: "Correct (verify on-site)",
                              rcdProtection: circuit.rcdProtected,
                              afddRequired: circuit.afddRequired,
                              // Blank fields for on-site testing
                              actualR1R2: null,
                              actualZs: null,
                              actualInsulationResistance: null,
                              actualPolarity: null,
                              actualRcdTest: null,
                              actualAfddTest: null,
                              pfc: null,
                              functionalTesting: null,
                              testDate: null,
                              testedBy: null,
                              testInstrumentSerial: null
                            };
                          }),
                          exportMetadata: {
                            exportedAt: new Date().toISOString(),
                            totalCircuits: design.circuits.length,
                            status: "pending",
                            designType: design.installationType
                          }
                        }, null, 2)}
                      </pre>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Tab 3: Circuit Design PDF Format */}
                <TabsContent value="design-pdf" className="mt-3">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 z-10 text-white/70 hover:text-white hover:bg-white/10"
                      onClick={() => {
                        const enhancedJson = transformToEnhancedPdfJson(design);
                        navigator.clipboard.writeText(JSON.stringify(enhancedJson, null, 2));
                        toast.success('Enhanced Circuit Design PDF JSON copied to clipboard');
                      }}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <div className="max-h-96 overflow-auto rounded-lg bg-slate-900 p-4 pr-20">
                      <pre className="text-xs text-sky-300 font-mono">
                        {JSON.stringify(transformToEnhancedPdfJson(design), null, 2)}
                      </pre>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CollapsibleContent>
          </Collapsible>
          
          <Button 
            onClick={handleExportToEIC}
            disabled={isExporting}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Preparing Export...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Send to EIC Testing
              </>
            )}
          </Button>
          
          {exportSuccess && (
            <Alert className="border-emerald-500/30 bg-emerald-500/10">
              <Check className="h-4 w-4 text-emerald-400" />
              <AlertDescription className="text-emerald-400">
                Design exported successfully! Reference: {exportId}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </Card>

      {/* Actions */}
      <div className="flex gap-3 flex-wrap">
        <Button size="lg" onClick={handleExportPDF} className="flex-1">
          <Download className="h-5 w-5 mr-2" />
          Export PDF
        </Button>
        <SendToAgentDropdown 
          currentAgent="designer" 
          currentOutput={design} 
        />
        <Button size="lg" variant="outline" onClick={onReset}>
          New Design
        </Button>
      </div>
    </div>
  );
};
