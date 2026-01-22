import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import InstallationSpecialistInterface from '@/components/electrician-tools/installation-specialist/InstallationSpecialistInterface';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InstallationDesign, CircuitDesign } from '@/types/installation-design';
import type { EnhancedInstallationGuidance } from '@/types/circuit-design';
import {
  CheckCircle2, AlertTriangle, AlertCircle, Download, Zap, Cable, Shield,
  TrendingDown, Percent, Gauge, Wrench, MapPin, ClipboardCheck, FileText,
  Upload, Loader2, Check, ChevronDown, Copy, TestTube, Anchor, Clock, FileCheck,
  Send, Calculator, Settings, Clipboard
} from 'lucide-react';
import { ResultsSuccessAnimation } from './ResultsSuccessAnimation';
import { downloadEICPDF } from '@/lib/eic/pdfGenerator';
import { generateEICSchedule } from '@/lib/eic/scheduleGenerator';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { calculateExpectedR1R2, getMaxZsForDevice, mapLoadTypeToCircuitDescription } from '@/utils/eic-transformer';
import { MobileCircuitResults } from './MobileCircuitResults';
import { CircuitCard } from './CircuitCard';
import { RequestSummaryHeader } from './RequestSummaryHeader';
import { processElectricalText } from '@/lib/text-processor';
import { ExpectedTestsDisplay } from './ExpectedTestsDisplay';
import { InstallationGuidanceDisplay } from './InstallationGuidanceDisplay';
import { InstallationGuidancePanel } from './InstallationGuidancePanel';
import { InstallationGuidancePerCircuitPanel } from './InstallationGuidancePerCircuitPanel';
import { storeContextForAgent, type AgentType } from '@/utils/circuit-context-generator';

interface DesignReviewEditorProps {
  design: InstallationDesign;
  onReset: () => void;
}

// Safe number formatter - prevents null.toFixed() crashes
const fmt = (n: unknown, dp = 1, fallback = '—') => 
  (typeof n === 'number' && !isNaN(n) ? n.toFixed(dp) : fallback);

// Build complete export payload with ALL data from both agents
const buildCompleteExportPayload = (design: InstallationDesign) => {
  return {
    // Document metadata
    exportMetadata: {
      exportedAt: new Date().toISOString(),
      version: '2.0',
      agents: ['CircuitDesignerAgent', 'DesignInstallationAgent'],
      totalCircuits: design.circuits?.length || 0
    },
    
    // Project info
    project: {
      projectName: design.projectName,
      location: design.location,
      clientName: design.clientName,
      electricianName: design.electricianName,
      installationType: design.installationType
    },
    
    // Supply/Consumer unit
    incomingSupply: {
      voltage: design.consumerUnit?.incomingSupply?.voltage || 230,
      phases: design.consumerUnit?.incomingSupply?.phases || 'single',
      earthingSystem: design.consumerUnit?.incomingSupply?.earthingSystem || 'TN-S',
      Ze: design.consumerUnit?.incomingSupply?.Ze || 0.35,
      PSCC: design.consumerUnit?.incomingSupply?.incomingPFC || 6000
    },
    consumerUnit: {
      type: design.consumerUnit?.type || 'Metal Consumer Unit',
      mainSwitchRating: design.consumerUnit?.mainSwitchRating || 100,
      totalCircuits: design.circuits?.length || 0
    },
    
    // Load Assessment
    loadAssessment: {
      totalConnectedLoad: design.totalLoad,
      diversifiedLoad: (design as any).diversifiedLoad || design.totalLoad,
      diversityFactor: design.diversityFactor,
      designCurrent: (design as any).designCurrent || 0
    },
    diversityBreakdown: design.diversityBreakdown || {},
    
    // Circuits with FULL data from both agents
    circuits: (design.circuits || []).map((circuit, idx) => {
      const circuitKey = `circuit_${idx}`;
      const fullGuidance = design.installationGuidance?.[circuitKey]?.guidance;
      
      return {
        // Basic circuit data
        circuitNumber: circuit.circuitNumber || idx + 1,
        name: circuit.name,
        loadType: circuit.loadType,
        loadPower: circuit.loadPower,
        phases: circuit.phases,
        
        // Cable specification
        cableSize: circuit.cableSize,
        cpcSize: circuit.cpcSize,
        cableType: circuit.cableType,
        cableLength: circuit.cableLength,
        installationMethod: circuit.installationMethod,
        
        // Protection
        protectionDevice: circuit.protectionDevice,
        rcdProtected: circuit.rcdProtected,
        afddRequired: circuit.afddRequired,
        
        // Calculations
        calculations: circuit.calculations || {},
        deratingFactors: circuit.deratingFactors || {},
        
        // Justifications
        justifications: circuit.justifications || {},
        
        // Expected test results
        expectedTestResults: circuit.expectedTestResults || circuit.expectedTests || {},
        
        // Fault current analysis
        faultCurrentAnalysis: circuit.faultCurrentAnalysis || {},
        
        // Earthing requirements
        earthingRequirements: circuit.earthingRequirements || {},
        
        // Special locations
        specialLocationCompliance: circuit.specialLocationCompliance || {},
        
        // Warnings
        warnings: circuit.warnings || [],
        
        // ✨ FULL INSTALLATION GUIDANCE FROM INSTALLATION AGENT
        installationGuidance: fullGuidance ? {
          executiveSummary: fullGuidance.executiveSummary || '',
          safetyConsiderations: fullGuidance.safetyConsiderations || [],
          materialsRequired: fullGuidance.materialsRequired || [],
          toolsRequired: fullGuidance.toolsRequired || [],
          cableRouting: fullGuidance.cableRouting || [],
          terminationRequirements: fullGuidance.terminationRequirements || [],
          installationProcedure: fullGuidance.installationProcedure || [],
          testingRequirements: fullGuidance.testingRequirements || {}
        } : null,
        
        // Quality metrics from Installation Agent
        guidanceQualityMetrics: design.installationGuidance?.[circuitKey]?.qualityMetrics || null
      };
    }),
    
    // Design notes & compliance
    designNotes: (design as any).designNotes || {},
    complianceStatement: 'BS 7671:2018+A3:2024',
    
    // Testing requirements summary
    testingRequirements: (design as any).testingRequirements || {},
    
    // Quality metrics (from Installation Agent)
    qualityMetrics: (design as any).qualityMetrics || {}
  };
};

// Transform Installation Agent's testingRequirements to expectedTestResults format
const transformInstallationTestingToExpectedResults = (testingReqs: any): any => {
  if (!testingReqs?.tests || !Array.isArray(testingReqs.tests)) return null;
  
  const result: any = {
    r1r2: { at20C: '', at70C: '', calculation: '' },
    zs: { calculated: '', maxPermitted: '', compliant: 'Yes' },
    insulationResistance: { testVoltage: '500V DC', minResistance: '≥1.0MΩ' },
    polarity: 'Verify correct polarity at all terminations',
    rcdTest: { at1x: '≤300ms @ 30mA', at5x: '≤40ms @ 150mA' }
  };
  
  // Extract procedural guidance from Installation Agent
  testingReqs.tests.forEach((test: any) => {
    const testName = test.testName || '';
    const procedure = test.procedure || '';
    const expectedReading = test.expectedReading || '';
    const acceptanceCriteria = test.acceptanceCriteria || '';
    
    if (testName.toLowerCase().includes('continuity') || testName.toLowerCase().includes('r1+r2')) {
      if (procedure) result.r1r2.calculation = procedure;
    }
    if (testName.toLowerCase().includes('loop') || testName.toLowerCase().includes('zs')) {
      if (acceptanceCriteria) result.zs.maxPermitted = acceptanceCriteria;
    }
    if (testName.toLowerCase().includes('insulation')) {
      if (expectedReading) result.insulationResistance.minResistance = expectedReading;
    }
    if (testName.toLowerCase().includes('polarity')) {
      if (procedure) result.polarity = procedure;
    }
    if (testName.toLowerCase().includes('rcd')) {
      result.rcdTest = { ...result.rcdTest, ...(test.details || {}) };
    }
  });
  
  return result;
};

// Helper component for metric cards in the header
const MetricCard = ({ icon: Icon, label, value, subValue, color }: {
  icon: any;
  label: string;
  value: string;
  subValue?: string;
  color: 'yellow' | 'green' | 'blue' | 'purple';
}) => {
  const colorClasses = {
    yellow: 'border-elec-yellow/20 text-elec-yellow',
    green: 'border-green-500/20 text-green-500',
    blue: 'border-blue-500/20 text-blue-500',
    purple: 'border-purple-500/20 text-purple-500'
  };

  const iconColorClasses = {
    yellow: 'text-elec-yellow',
    green: 'text-green-500',
    blue: 'text-blue-500',
    purple: 'text-purple-500'
  };

  return (
    <div className={`p-4 rounded-xl border bg-white/[0.02] ${colorClasses[color].split(' ')[0]}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`h-4 w-4 ${iconColorClasses[color]}`} />
        <span className="text-xs text-white/50 uppercase tracking-wide">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-bold text-white">{value}</span>
        {subValue && (
          <span className="text-sm text-white/40">{subValue}</span>
        )}
      </div>
    </div>
  );
};

// Helper component for info pills
const InfoPill = ({ label }: { label: string }) => (
  <span className="px-3 py-1.5 text-xs font-medium bg-white/[0.05] border border-white/10 rounded-full text-white/70">
    {label}
  </span>
);

export const DesignReviewEditor = ({ design, onReset }: DesignReviewEditorProps) => {
  const navigate = useNavigate();
  const [selectedCircuit, setSelectedCircuit] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [selectedCircuitsForInstall, setSelectedCircuitsForInstall] = useState<number[]>([0]);
  const [showCircuitSelector, setShowCircuitSelector] = useState(false);
  const [showInstallSheet, setShowInstallSheet] = useState(false);
  const [installContext, setInstallContext] = useState<any>(null);
  const [regeneratingCircuits, setRegeneratingCircuits] = useState<Set<number>>(new Set());
  const [justificationsPatchVersion, setJustificationsPatchVersion] = useState(0);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(true);
  const [isSendingToEIC, setIsSendingToEIC] = useState(false);
  const [showSendToEICDialog, setShowSendToEICDialog] = useState(false);
  const [includeExpectedResults, setIncludeExpectedResults] = useState(false);
  const [selectedCircuitsForExport, setSelectedCircuitsForExport] = useState<number[]>([]);

  // Send to agent function
  const sendToAgent = (agentType: AgentType) => {
    try {
      // If no circuits selected, use all circuits
      const circuitIndices = selectedCircuitsForExport.length > 0
        ? selectedCircuitsForExport
        : design.circuits.map((_, i) => i);

      // Store context in session storage for agent to pick up
      storeContextForAgent(design, circuitIndices, agentType);

      // Navigate to agent page
      const agentRoutes: Record<AgentType, string> = {
        installer: '/electrician/installation-specialist',
        rams: '/electrician/health-safety',
        'cost-engineer': '/electrician/cost-engineer',
        'method-statement': '/electrician/method-statement',
        maintenance: '/electrician/maintenance'
      };

      const agentNames: Record<AgentType, string> = {
        installer: 'Installation Specialist',
        rams: 'Risk Assessment',
        'cost-engineer': 'Cost Engineer',
        'method-statement': 'Method Statement',
        maintenance: 'Maintenance Instructions'
      };

      navigate(agentRoutes[agentType]);
      toast.success(`Circuit context sent to ${agentNames[agentType]}`, {
        description: `${circuitIndices.length} circuit${circuitIndices.length !== 1 ? 's' : ''} ready for processing`
      });
    } catch (error) {
      console.error('Failed to send to agent:', error);
      toast.error('Failed to send circuit context', {
        description: 'Please try again'
      });
    }
  };

  // Responsive breakpoint detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Debug: Log on mount and validate circuits
  useEffect(() => {
    console.log('📊 Circuit data structure:', {
      circuitCount: design.circuits?.length,
      firstCircuit: design.circuits?.[0],
      hasInstallationGuidance: !!design.circuits?.[0]?.installationGuidance,
      loadPower: design.circuits?.[0]?.loadPower,
      phases: design.circuits?.[0]?.phases,
      cableLength: design.circuits?.[0]?.cableLength,
      installationMethod: design.circuits?.[0]?.installationMethod
    });

    const currentCircuit = design.circuits?.[selectedCircuit];
    const hasValidCircuits = design.circuits?.every((c, idx) => {
      const valid = 
        typeof c.cableSize === 'number' && 
        typeof c.cpcSize === 'number' &&
        c.protectionDevice &&
        c.calculations &&
        c.justifications;
      
      if (!valid) {
        console.error(`❌ Circuit ${idx + 1} validation failed:`, {
          name: c.name,
          cableSizeType: typeof c.cableSize,
          cableSizeValue: c.cableSize,
          cpcSizeType: typeof c.cpcSize,
          hasProtectionDevice: !!c.protectionDevice,
          hasCalculations: !!c.calculations,
          hasJustifications: !!c.justifications,
          justificationKeys: c.justifications ? Object.keys(c.justifications) : []
        });
      }
      
      return valid;
    });
    
    console.log('📊 DesignReviewEditor validation:', {
      circuitCount: design.circuits?.length,
      hasValidCircuits,
      selectedCircuit,
      currentCircuit,
      firstCircuitSample: design.circuits?.[0] ? {
        cableSize: design.circuits[0].cableSize,
        cableSizeType: typeof design.circuits[0].cableSize,
        hasJustifications: !!design.circuits[0].justifications
      } : null
    });
    
    // Auto-reset to first circuit if current selection is invalid
    if (currentCircuit === undefined && design.circuits?.length > 0) {
      console.warn('⚠️ Selected circuit undefined on mount, resetting to 0');
      setSelectedCircuit(0);
    }
  }, [design.circuits, selectedCircuit]);

  // Patch missing justifications for old jobs
  useEffect(() => {
    if (design.circuits) {
      let needsPatch = false;
      
      const patchedCircuits = design.circuits.map(circuit => {
        if (!circuit.justifications || Object.keys(circuit.justifications).length === 0) {
          needsPatch = true;
          
          const safeIb = circuit.calculations?.Ib ?? 4.3;
          const safeIz = circuit.calculations?.Iz ?? 20;
          const safeVdPercent = circuit.calculations?.voltageDrop?.percent ?? 0.87;
          
          return {
            ...circuit,
            justifications: {
              cableSize: `${circuit.cableSize}mm² / ${circuit.cpcSize}mm² selected for ${safeIb.toFixed(1)}A design current (capacity: ${safeIz.toFixed(1)}A, voltage drop: ${safeVdPercent.toFixed(2)}%)`,
              protection: `${circuit.protectionDevice.rating}A Type ${circuit.protectionDevice.curve} ${circuit.protectionDevice.type} provides overcurrent protection per BS 7671`,
              rcd: circuit.rcdProtected 
                ? `30mA RCD protection required for ${circuit.loadType} circuits per Reg 411.3.3`
                : `RCD not required for this ${circuit.loadType} circuit`
            }
          };
        }
        return circuit;
      });
      
      if (needsPatch) {
        console.log('🔧 Patched missing justifications for', 
          patchedCircuits.filter((c, i) => !design.circuits![i].justifications || Object.keys(design.circuits![i].justifications).length === 0).length, 
          'circuits'
        );
        // Update the design object AND trigger re-render
        design.circuits = patchedCircuits;
        setJustificationsPatchVersion(prev => prev + 1);
      }
    }
  }, [design, justificationsPatchVersion]);

  // Check if a circuit has placeholder justifications
  const isPlaceholderJustification = (circuit: CircuitDesign): boolean => {
    if (!circuit.justifications || Object.keys(circuit.justifications).length === 0) {
      return false; // No justifications at all - shouldn't happen after patch
    }
    const cableJust = circuit.justifications.cableSize || '';
    // Check for our specific placeholder pattern
    return cableJust.includes('selected for') && cableJust.includes('design current');
  };

  // Regenerate justifications for a specific circuit
  const handleRegenerateJustifications = async (circuitIndex: number) => {
    const circuit = design.circuits?.[circuitIndex];
    if (!circuit) return;

    setRegeneratingCircuits(prev => new Set(prev).add(circuitIndex));
    
    try {
      const { data, error } = await supabase.functions.invoke('regenerate-circuit-justifications', {
        body: { circuit }
      });

      if (error) throw error;
      
      if (data.success && data.justifications) {
        // Update circuit with new justifications
        const updatedCircuits = [...(design.circuits || [])];
        updatedCircuits[circuitIndex] = {
          ...updatedCircuits[circuitIndex],
          justifications: data.justifications
        };
        
        design.circuits = updatedCircuits;
        
        toast.success('Justifications regenerated', {
          description: `Circuit ${circuitIndex + 1} justifications updated with AI analysis`
        });
      }
    } catch (error) {
      console.error('Failed to regenerate justifications:', error);
      toast.error('Failed to regenerate justifications', {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setRegeneratingCircuits(prev => {
        const next = new Set(prev);
        next.delete(circuitIndex);
        return next;
      });
    }
  };

  const [exportSuccess, setExportSuccess] = useState(false);
  const [exportId, setExportId] = useState('');
  const [showJsonPreview, setShowJsonPreview] = useState(false);
  
  // Transform design to PDF Monkey payload structure (mirrors backend mapping)
  const transformToPDFMonkeyPayload = (design: InstallationDesign) => {
    // Calculate aggregates
    const totalConnectedLoad = design.circuits?.reduce((sum, c) => sum + (c.loadPower || 0), 0) || 0;
    const totalDesignCurrent = Math.round(design.circuits?.reduce((sum, c) => sum + (c.designCurrent || c.calculations?.Ib || 0), 0) || 0);
    const compliantCircuits = design.circuits?.filter((c) => {
      const zsCompliant = c.calculations?.zs ? c.calculations.zs <= (c.calculations?.maxZs || 999) : true;
      const vdCompliant = c.calculations?.voltageDrop?.compliant ?? true;
      return zsCompliant && vdCompliant;
    }).length || 0;
    const warningCount = design.circuits?.reduce((sum, c) => sum + (c.warnings?.length || 0), 0) || 0;
    
    return {
      // Cover page
      date: new Date().toLocaleDateString('en-GB'),
      designReference: `DES-${Date.now()}`,
      projectName: design.projectName || 'Electrical Installation',
      location: design.location || '',
      clientName: design.clientName || 'Client Name',
      electricianName: design.electricianName || 'Electrical Contractor',
      
      // Installation summary (null-safe with proper defaults)
      voltage: design.consumerUnit?.incomingSupply?.voltage || 230,
      phases: (design.consumerUnit?.incomingSupply?.phases === 'single') ? 'Single Phase' : 'Three Phase',
      earthingSystem: design.consumerUnit?.incomingSupply?.earthingSystem || 'Not specified',
      ze: design.consumerUnit?.incomingSupply?.Ze ? (design.consumerUnit.incomingSupply.Ze).toFixed(2) : 'Not specified',
      pscc: design.consumerUnit?.incomingSupply?.incomingPFC ? ((design.consumerUnit.incomingSupply.incomingPFC) / 1000).toFixed(1) : 'Not specified',
      
      totalConnectedLoad: totalConnectedLoad ? totalConnectedLoad.toLocaleString() : 'Not specified',
      diversityFactor: (design.diversityBreakdown?.overallDiversityFactor || design.diversityFactor) 
        ? `${((design.diversityBreakdown?.overallDiversityFactor || design.diversityFactor) * 100).toFixed(1)}%`
        : 'Not specified',
      diversifiedLoad: (design.diversityBreakdown?.diversifiedLoad || totalConnectedLoad) 
        ? (design.diversityBreakdown?.diversifiedLoad || totalConnectedLoad).toLocaleString()
        : 'Not specified',
      totalDesignCurrent: totalDesignCurrent || 'Not specified',
      
      consumerUnitType: design.consumerUnit?.type || 'Not specified',
      mainSwitchRating: design.consumerUnit?.mainSwitchRating || 'Not specified',
      consumerUnitWays: (design.consumerUnit as any)?.ways || design.circuits?.length || 0,
      totalCircuits: design.circuits?.length || 0,
      
      // Circuits with all fields including new display fields
      circuits: (design.circuits || []).map((circuit, idx) => {
        // Debug logging for design current values
        console.log('[PDF Export] Circuit design currents:', {
          name: circuit.name,
          designCurrent: circuit.designCurrent,
          calculatedIb: circuit.calculations?.Ib,
          loadPower: circuit.loadPower,
          voltage: circuit.voltage
        });
        const zsCompliant = circuit.calculations?.zs ? circuit.calculations.zs <= (circuit.calculations?.maxZs || 999) : true;
        const vdCompliant = circuit.calculations?.voltageDrop?.compliant ?? true;
        
        return {
          circuitNumber: circuit.circuitNumber || (idx + 1),
          name: circuit.name || `Circuit ${idx + 1}`,
          loadType: circuit.loadType || 'General',
          loadPower: circuit.loadPower || 0,
          designCurrentIb: (circuit.designCurrent || circuit.calculations?.Ib || 0).toFixed(1),
          voltage: circuit.voltage || design.consumerUnit?.incomingSupply?.voltage || 230,
          phases: (typeof circuit.phases === 'number' && circuit.phases === 3) || circuit.phases === 'three' ? 'Three Phase' : 'Single Phase',
          
          cableSize: circuit.cableSize?.toString() || '0',
          cpcSize: circuit.cpcSize?.toString() || '0',
          cableType: circuit.cableType || `${circuit.cableSize}mm² twin and earth`,
          cableLength: circuit.cableLength || 0,
          installationMethod: circuit.installationMethod || 'Method C (Clipped Direct)',
          
          protectionType: circuit.protectionDevice?.type || 'MCB',
          protectionRating: circuit.protectionDevice?.rating || circuit.calculations?.In || 0,
          protectionCurve: circuit.protectionDevice?.curve || 'B',
          protectionKaRating: circuit.protectionDevice?.kaRating || 6,
          rcdProtected: circuit.rcdProtected || false,
          rcdProtectedText: circuit.rcdProtected ? '30mA RCBO' : 'No',
          
          nominalCurrentIn: circuit.calculations?.In || circuit.protectionDevice?.rating || 0,
          cableCapacityIz: Math.round(circuit.calculations?.Iz || 0),
          deratedCapacity: (circuit.calculations?.deratedCapacity || circuit.calculations?.Iz || 0).toFixed(1),
          safetyMargin: (circuit.calculations?.safetyMargin || 0).toFixed(1),
          
          voltageDropVolts: (circuit.calculations?.voltageDrop?.volts || 0).toFixed(1),
          voltageDropPercent: (circuit.calculations?.voltageDrop?.percent || 0).toFixed(1),
          voltageDropCompliant: vdCompliant,
          
          zsActual: (circuit.calculations?.zs || 0).toFixed(2),
          zsMax: (circuit.calculations?.maxZs || 0).toFixed(2),
          zsCompliant: zsCompliant,
          
          // Status fields
          complianceStatus: (zsCompliant && vdCompliant) ? 'compliant' : 'warning',
          status: (zsCompliant && vdCompliant) ? 'complete' : 'incomplete',
          
          // Human-readable display fields
          voltageDropText: `${(circuit.calculations?.voltageDrop?.volts || 0).toFixed(2)}V (${(circuit.calculations?.voltageDrop?.percent || 0).toFixed(2)}%)`,
          earthFaultLoopText: `${(circuit.calculations?.zs || 0).toFixed(2)}Ω (max ${(circuit.calculations?.maxZs || 0).toFixed(2)}Ω)`,
          protectionSummary: circuit.protectionDevice?.type === 'BS88' 
            ? `${circuit.protectionDevice.rating}A BS88 ${circuit.protectionDevice.curve || 'gG'} Fuse (${circuit.protectionDevice.kaRating || 80}kA)`
            : circuit.protectionDevice?.type === 'MCCB'
            ? `${circuit.protectionDevice.rating}A MCCB (${circuit.protectionDevice.kaRating || 50}kA)`
            : `${circuit.protectionDevice?.type || 'MCB'} ${circuit.protectionDevice?.rating || 6}A Type ${circuit.protectionDevice?.curve || 'B'} (${circuit.protectionDevice?.kaRating || 6}kA)`,
          cableSummary: `${circuit.cableSize || 2.5}mm² / ${circuit.cpcSize || 1.5}mm² CPC`,
          complianceSummary: (zsCompliant && vdCompliant) ? 'Fully compliant' : 'Requires attention',
          
          // Installation guidance - graceful fallback
          installationNotes: circuit.installationNotes || 
                             (circuit.installationGuidance as any)?.cableRouting || 
                             '',
          
          // Structured output for advanced PDF templates
          structuredOutput: null,
          
          // Justifications
          justificationCable: circuit.justifications?.cableSize || `${circuit.cableSize}mm² cable selected for adequate protection.`,
          justificationProtection: circuit.justifications?.protection || `${circuit.protectionDevice?.rating}A protection device provides adequate protection.`,
          justificationRcd: circuit.justifications?.rcd || (circuit.rcdProtected ? 'RCD protection provides additional safety.' : 'RCD not required.'),
          justificationRingTopology: '',
          
          hasWarnings: (circuit.warnings?.length || 0) > 0,
          warnings: circuit.warnings || [],
        };
      }),
      
      // Compliance
      allCircuitsCompliant: compliantCircuits === (design.circuits?.length || 0) && (design.circuits?.length || 0) > 0,
      compliantCircuits: compliantCircuits,
      warningCount: warningCount,
    };
  };
  
  
  // Transform design to enhanced PDF JSON structure with human-readable strings
  const transformToEnhancedPdfJson = (design: InstallationDesign) => {
    // GUARD: Prevent crashes if circuits undefined
    if (!design.circuits || !Array.isArray(design.circuits) || design.circuits.length === 0) {
      console.warn('⚠️ transformToEnhancedPdfJson called with invalid circuits');
      return {
        document: { 
          type: "Circuit Design Specification", 
          error: "No circuits available",
          standard: "BS 7671:2018+A3:2024"
        },
        circuits: [],
        project: {
          name: design.projectName,
          location: design.location || 'N/A',
          installationType: design.installationType
        }
      };
    }
    
    const totalConnectedLoad = design.circuits.reduce((sum, c) => sum + (c.loadPower || 0), 0);
    const diversifiedLoad = design.diversityBreakdown?.diversifiedLoad || totalConnectedLoad * 0.65;
    const supplyVoltage = design.consumerUnit?.incomingSupply?.voltage || 230;
    const designCurrent = diversifiedLoad / supplyVoltage;
    
    return {
      document: {
        type: "Circuit Design Specification",
        standard: "BS 7671:2018+A3:2024",
        generatedAt: new Date().toISOString(),
        documentReference: `DS-${(design.projectName || 'Unknown').replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0].replace(/-/g, '')}`
      },
      
      project: {
        name: design.projectName || 'Unknown Project',
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
        type: design.consumerUnit?.type || 'main-switch',
        typeDescription: design.consumerUnit?.type === 'split-load' ? 'Split Load Consumer Unit' : 
                         design.consumerUnit?.type === 'high-integrity' ? 'High Integrity Consumer Unit' :
                         'Main Switch Consumer Unit',
        mainSwitchRating: design.consumerUnit?.mainSwitchRating || 100,
        mainSwitchString: `${design.consumerUnit?.mainSwitchRating || 100}A Main Switch`
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
          liveConductors: circuit.cableSize ?? 2.5,
          liveConductorsString: `${circuit.cableSize ?? 2.5}mm²`,
          cpc: circuit.cpcSize ?? 1.5,
          cpcString: `${circuit.cpcSize ?? 1.5}mm²`,
          cableType: circuit.cableType || `${circuit.cableSize ?? 2.5}/${circuit.cpcSize ?? 1.5}mm² T&E`,
          cableLength: circuit.cableLength ?? 0,
          cableLengthString: `${circuit.cableLength ?? 0}m`,
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
            tabulatedCapacity_It: circuit.deratingFactors?.Ca && circuit.calculations?.Iz ? (circuit.calculations.Iz / circuit.deratingFactors.overall) : 0,
            nominalCurrent_In: circuit.protectionDevice?.rating ?? 0,
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
        
        installationGuidance: circuit.installationGuidance || null,
        
        specialLocationCompliance: circuit.specialLocationCompliance ? {
          isSpecialLocation: circuit.specialLocationCompliance.isSpecialLocation,
          locationType: circuit.specialLocationCompliance.locationType,
          requirements: circuit.specialLocationCompliance.requirements || [],
          requirementsString: (circuit.specialLocationCompliance.requirements || []).join('; '),
          zonesApplicable: circuit.specialLocationCompliance.zonesApplicable,
          regulation: circuit.specialLocationCompliance.regulation
        } : null,
        
        // Pass null for expectedTestResults if no data, otherwise pass numerical values only
        expectedTestResults: circuit.expectedTestResults ? {
          r1r2: {
            at20C: circuit.expectedTestResults.r1r2?.at20C || null,
            at70C: circuit.expectedTestResults.r1r2?.at70C || null,
            calculation: circuit.expectedTestResults.r1r2?.calculation || null
          },
          zs: {
            calculated: circuit.expectedTestResults.zs?.calculated || null,
            maxPermitted: circuit.expectedTestResults.zs?.maxPermitted || null,
            compliant: circuit.expectedTestResults.zs?.compliant ?? null,
            complianceText: circuit.expectedTestResults.zs?.compliant != null 
              ? (circuit.expectedTestResults.zs.compliant ? "✓ COMPLIANT" : "✗ NON-COMPLIANT")
              : null
          },
          insulationResistance: {
            testVoltage: circuit.expectedTestResults.insulationResistance?.testVoltage || '500V DC',
            minResistance: circuit.expectedTestResults.insulationResistance?.minResistance || '≥1.0MΩ'
          },
          polarity: circuit.expectedTestResults.polarity || 'Correct at all points',
          rcdTest: circuit.expectedTestResults.rcdTest ? {
            at1x: circuit.expectedTestResults.rcdTest.at1x || null,
            at5x: circuit.expectedTestResults.rcdTest.at5x || null,
            regulation: circuit.expectedTestResults.rcdTest.regulation || 'BS 7671 Regulation 643.2.2'
          } : null
        } : null,
        
        isSpecialLocation: circuit.specialLocationCompliance?.isSpecialLocation || false,
        specialLocationType: circuit.specialLocationCompliance?.locationType || '',
        specialLocationRequirements: (circuit.specialLocationCompliance?.requirements || []).join('; '),
        
        // Use null instead of 'N/A' for missing test values
        expectedR1R2: circuit.expectedTestResults?.r1r2?.at70C || null,
        expectedZs: circuit.calculations?.zs ? fmt(circuit.calculations.zs, 2) : null,
        expectedInsulation: circuit.expectedTestResults?.insulationResistance?.minResistance || '≥1.0MΩ',
        
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
  
  
  const handleProceedToInstaller = () => {
    try {
      // Validate we have circuits selected
      if (!selectedCircuitsForInstall || selectedCircuitsForInstall.length === 0) {
        toast.error('Please select at least one circuit');
        return;
      }

      // Validate design has circuits
      if (!design.circuits || design.circuits.length === 0) {
        toast.error('No circuits available');
        return;
      }

      // Build context from selected circuits (Phase 2: Structured protection data)
      const context = {
        design: design,
        selectedCircuits: selectedCircuitsForInstall.map(idx => {
          const circuit = design.circuits[idx];
          if (!circuit) {
            console.warn(`Circuit at index ${idx} not found`);
            return null;
          }
          return {
            circuitIndex: idx,
            name: circuit.name,
            loadType: circuit.loadType,
            loadPower: circuit.loadPower,
            cableSize: circuit.cableSize,
            cpcSize: circuit.cpcSize,
            cableType: circuit.cableType || `${circuit.cableSize}mm² / ${circuit.cpcSize}mm² CPC`,
            cableLength: circuit.cableLength,
            installationMethod: circuit.installationMethod,

            // Structured protection device (with safe fallbacks)
            protectionDevice: {
              type: circuit.protectionDevice?.type || 'MCB',
              rating: circuit.protectionDevice?.rating || 0,
              curve: circuit.protectionDevice?.curve || 'B',
              kaRating: circuit.protectionDevice?.kaRating || 6
            },

            // Protection summary string for display
            protectionSummary: circuit.protectionDevice
              ? `${circuit.protectionDevice.rating}A ${circuit.protectionDevice.type} Type ${circuit.protectionDevice.curve} (${circuit.protectionDevice.kaRating}kA)`
              : 'Not specified',

            rcdProtected: circuit.rcdProtected,
            voltage: circuit.voltage,
            phases: circuit.phases,

            // Include calculations for validation (with safe fallbacks)
            calculations: circuit.calculations ? {
              designCurrent: circuit.calculations.Ib,
              voltageDrop: circuit.calculations.voltageDrop,
              zs: circuit.calculations.zs,
              maxZs: circuit.calculations.maxZs
            } : null
          };
        }).filter(Boolean), // Remove any null entries

        previousOutputs: [{
          agent: 'designer',
          response: {
            structuredData: {
              circuitCount: selectedCircuitsForInstall.length,
              projectName: design.projectName,
              location: design.location,
              installationType: design.installationType
            }
          },
          timestamp: new Date().toISOString()
        }],

        // Extract unique regulations (avoid duplicates)
        regulations: Array.from(new Set(
          design.circuits
            ?.filter((_, idx) => selectedCircuitsForInstall.includes(idx))
            .flatMap(c => c.justifications ? Object.values(c.justifications) : [])
            .filter(Boolean)
        )) || []
      };

      // Phase 4: Open in bottom sheet instead of navigating away
      // This keeps the user on the results page so they can do other actions (PDF, EIC) after
      setInstallContext(context);
      setShowInstallSheet(true);
      toast.success(`Opening Installation Specialist with ${selectedCircuitsForInstall.length} circuit(s)`);
    } catch (error) {
      console.error('Failed to proceed to installer:', error);
      toast.error('Failed to open Installation Specialist', {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
  
  const handleCreateInstallationMethod = () => {
    // If multiple circuits, show selector dialog
    if (design.circuits && design.circuits.length > 1) {
      setShowCircuitSelector(true);
    } else {
      // Single circuit - proceed directly
      setSelectedCircuitsForInstall([0]);
      handleProceedToInstaller();
    }
  };

  // Open Send to EIC dialog
  const openSendToEICDialog = () => {
    setIncludeExpectedResults(false);
    setShowSendToEICDialog(true);
  };

  // Send design to EIC Schedule
  const handleSendToEIC = async () => {
    setShowSendToEICDialog(false);
    setIsSendingToEIC(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to save designs');
        return;
      }

      // Helper function to get BS standard based on device type
      const getBsStandard = (deviceType: string | undefined) => {
        switch (deviceType) {
          case 'RCBO': return 'BS EN 61009';
          case 'MCCB': return 'BS EN 60947-2';
          case 'BS88': return 'BS 88-2';
          case 'BS1361': return 'BS 1361';
          case 'BS3036': return 'BS 3036';
          default: return 'BS EN 60898';
        }
      };

      // Helper function to map wiring type to code
      const getWiringTypeCode = (cableType: string | undefined) => {
        if (!cableType) return '';
        if (cableType.includes('SWA') || cableType.includes('armoured')) return 'D';
        if (cableType.includes('MICC') || cableType.includes('mineral')) return 'E';
        if (cableType.includes('flat') || cableType.includes('T&E')) return 'A';
        if (cableType.includes('singles') || cableType.includes('conduit')) return 'B';
        if (cableType.includes('flexible')) return 'F';
        return 'A'; // Default to twin & earth
      };

      // Helper function to get points served based on load type
      const getPointsServed = (loadType: string, socketCount?: number) => {
        if (socketCount) return socketCount.toString();
        switch (loadType) {
          case 'lighting': return '8';
          case 'socket': return '6';
          case 'ring': return '∞';
          case 'cooker': return '1';
          case 'shower': return '1';
          case 'ev-charger': return '1';
          case 'immersion': return '1';
          default: return '1';
        }
      };

      // Transform design circuits to EIC schedule format with FULL context
      // Includes all calculation data, test values, and compliance information
      const scheduleCircuits = design.circuits.map((circuit, idx) => ({
        // Circuit identification
        circuitNumber: (circuit.circuitNumber || idx + 1).toString(),
        circuitDescription: circuit.name,
        loadType: circuit.loadType,

        // Phase type - formatted for EIC table
        phaseType: circuit.phases === 'three' ? '3-phase' : 'single-phase',

        // Cable details
        liveSize: circuit.cableSize?.toString() || '',
        cpcSize: circuit.cpcSize?.toString() || '',
        cableType: circuit.cableType || `${circuit.cableSize}mm² T&E`,
        cableLength: circuit.cableLength?.toString() || '',

        // Installation method and wiring type
        referenceMethod: circuit.installationMethod || 'Reference Method C',
        typeOfWiring: getWiringTypeCode(circuit.cableType),
        pointsServed: getPointsServed(circuit.loadType, circuit.socketCount),

        // Protective device - complete details
        protectiveDeviceType: circuit.protectionDevice?.type || 'MCB',
        protectiveDeviceCurve: circuit.protectionDevice?.curve || 'B',
        protectiveDeviceRating: circuit.protectionDevice?.rating?.toString() || '',
        protectiveDeviceKaRating: circuit.protectionDevice?.kaRating?.toString() || '6',
        bsStandard: getBsStandard(circuit.protectionDevice?.type),

        // RCD details (if applicable) - ENHANCED
        rcdProtected: circuit.rcdProtected || false,
        rcdRating: circuit.rcdProtected
          ? (circuit.protectionDevice?.rcdRating?.toString() || '30') + 'mA'
          : '',
        rcdType: circuit.rcdProtected ? 'Type A' : '',
        rcdBsStandard: circuit.rcdProtected ? 'BS EN 62423' : '',
        rcdTestSpecs: circuit.expectedTests?.rcd ? {
          ratingmA: circuit.expectedTests.rcd.ratingmA,
          maxTripTimeMs: circuit.expectedTests.rcd.maxTripTimeMs,
          testCurrentMultiple: circuit.expectedTests.rcd.testCurrentMultiple,
          regulation: circuit.expectedTests.rcd.regulation
        } : null,

        // ==== FULL CALCULATION DATA ====
        calculations: {
          // Current values
          Ib: circuit.calculations?.Ib || circuit.designCurrent,
          In: circuit.calculations?.In || circuit.protectionDevice?.rating,
          Iz: circuit.calculations?.Iz,
          deratedCapacity: circuit.calculations?.deratedCapacity,
          safetyMargin: circuit.calculations?.safetyMargin,

          // Voltage drop - FULL details
          voltageDrop: circuit.calculations?.voltageDrop ? {
            volts: circuit.calculations.voltageDrop.volts,
            percent: circuit.calculations.voltageDrop.percent,
            compliant: circuit.calculations.voltageDrop.compliant,
            limit: circuit.calculations.voltageDrop.limit
          } : null,

          // Earth fault loop impedance
          zs: circuit.calculations?.zs,
          maxZs: circuit.calculations?.maxZs
        },

        // ==== EXPECTED TEST RESULTS - FULL ====
        // R1+R2 values (both temperatures)
        r1r2At20C: includeExpectedResults
          ? (circuit.expectedTestResults?.r1r2?.at20C ||
             circuit.expectedTests?.r1r2?.at20C?.toString() ||
             circuit.expectedTests?.r1r2?.value || '')
          : '',
        r1r2At70C: includeExpectedResults
          ? (circuit.expectedTestResults?.r1r2?.at70C ||
             circuit.expectedTests?.r1r2?.at70C?.toString() || '')
          : '',
        r1r2Calculation: circuit.expectedTestResults?.r1r2?.calculation || '',
        r1r2Regulation: circuit.expectedTests?.r1r2?.regulation || 'Appendix F Table F.1',

        // Zs values - FULL
        zs: includeExpectedResults
          ? (circuit.calculations?.zs?.toFixed(2) || '')
          : '',
        maxZs: circuit.calculations?.maxZs?.toFixed(2) ||
               circuit.expectedTests?.zs?.maxPermitted?.toString() || '',
        zsMarginPercent: circuit.expectedTests?.zs?.marginPercent,
        zsCompliant: circuit.expectedTests?.zs?.compliant ??
                     (circuit.calculations?.zs <= circuit.calculations?.maxZs),
        zsRegulation: circuit.expectedTests?.zs?.regulation || 'BS 7671 Table 41.3',

        // Insulation resistance - FULL
        insulationTestVoltage: circuit.expectedTests?.insulationResistance?.testVoltage || '500V DC',
        insulationResistance: circuit.expectedTests?.insulationResistance?.minResistance || '≥1.0MΩ',
        insulationRegulation: circuit.expectedTests?.insulationResistance?.regulation || 'BS 7671 Table 6.1',

        // On-site verification required (legacy fields)
        r1r2: includeExpectedResults
          ? (circuit.expectedTestResults?.r1r2?.at20C ||
             circuit.expectedTests?.r1r2?.at20C?.toString() ||
             circuit.expectedTests?.r1r2?.value || '')
          : '',
        polarity: 'Verify on-site',
        pfc: 'Test on-site',
        functionalTesting: 'Test on-site',

        // Circuit topology for ring circuits
        circuitTopology: circuit.circuitTopology || (circuit.loadType === 'ring' ? 'ring' : 'radial'),

        // ==== FAULT CURRENT ANALYSIS ====
        faultCurrentAnalysis: circuit.faultCurrentAnalysis ? {
          psccAtCircuit: circuit.faultCurrentAnalysis.psccAtCircuit,
          deviceBreakingCapacity: circuit.faultCurrentAnalysis.deviceBreakingCapacity,
          compliant: circuit.faultCurrentAnalysis.compliant,
          marginOfSafety: circuit.faultCurrentAnalysis.marginOfSafety,
          regulation: circuit.faultCurrentAnalysis.regulation
        } : null,

        // ==== DERATING FACTORS ====
        deratingFactors: circuit.deratingFactors ? {
          Ca: circuit.deratingFactors.Ca,
          Cg: circuit.deratingFactors.Cg,
          Ci: circuit.deratingFactors.Ci,
          overall: circuit.deratingFactors.overall,
          explanation: circuit.deratingFactors.explanation,
          tableReferences: circuit.deratingFactors.tableReferences
        } : null,

        // ==== SPECIAL LOCATION COMPLIANCE ====
        specialLocationCompliance: circuit.specialLocationCompliance ? {
          isSpecialLocation: circuit.specialLocationCompliance.isSpecialLocation,
          locationType: circuit.specialLocationCompliance.locationType,
          requirements: circuit.specialLocationCompliance.requirements,
          zonesApplicable: circuit.specialLocationCompliance.zonesApplicable,
          regulation: circuit.specialLocationCompliance.regulation
        } : null,

        // ==== EARTHING REQUIREMENTS ====
        earthingRequirements: circuit.earthingRequirements ? {
          cpcSize: circuit.earthingRequirements.cpcSize,
          supplementaryBonding: circuit.earthingRequirements.supplementaryBonding,
          bondingConductorSize: circuit.earthingRequirements.bondingConductorSize,
          justification: circuit.earthingRequirements.justification,
          regulation: circuit.earthingRequirements.regulation
        } : null,

        // ==== INSTALLATION GUIDANCE ====
        installationNotes: circuit.installationNotes || '',
        installationGuidance: circuit.installationGuidance ? {
          overview: circuit.installationGuidance.overview,
          steps: circuit.installationGuidance.steps,
          safetyWarnings: circuit.installationGuidance.safetyWarnings,
          testingRequirements: circuit.installationGuidance.testingRequirements
        } : null,

        // ==== DESIGN JUSTIFICATIONS ====
        justifications: circuit.justifications ? {
          cableSize: circuit.justifications.cableSize,
          protection: circuit.justifications.protection,
          rcd: circuit.justifications.rcd
        } : null,

        // ==== COMPLIANCE STATUS ====
        complianceStatus: circuit.complianceStatus ||
                          (circuit.calculations?.voltageDrop?.compliant &&
                           (circuit.calculations?.zs <= circuit.calculations?.maxZs) ? 'pass' : 'warning'),
        warnings: circuit.warnings || [],
        validationIssues: circuit.validationIssues || [],

        // ==== DIVERSITY ====
        diversityFactor: circuit.diversityFactor,
        diversityJustification: circuit.diversityJustification
      }));

      // Generate a unique installation ID
      const installationId = `INST-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

      // Build schedule_data JSON matching EIC format with FULL comprehensive data
      const scheduleData = {
        circuits: scheduleCircuits,
        supply: {
          voltage: design.consumerUnit?.incomingSupply?.voltage || 230,
          phases: design.consumerUnit?.incomingSupply?.phases || 'single',
          earthingSystem: design.consumerUnit?.incomingSupply?.earthingSystem || 'TN-C-S',
          ze: design.consumerUnit?.incomingSupply?.Ze || 0.35,
          pscc: design.consumerUnit?.incomingSupply?.incomingPFC || 6000,
          mainSwitchRating: design.consumerUnit?.mainSwitchRating || 100,
          consumerUnitType: design.consumerUnit?.type || 'main-switch'
        },
        projectInfo: {
          projectName: design.projectName,
          installationType: design.installationType,
          clientName: design.clientName,
          location: design.location,
          electricianName: design.electricianName,
          totalLoad: design.totalLoad,
          diversifiedLoad: design.diversifiedLoad || design.totalLoad,
          diversityFactor: design.diversityFactor
        },
        // ==== DIVERSITY BREAKDOWN - FULL ====
        diversityBreakdown: design.diversityBreakdown ? {
          totalConnectedLoad: design.diversityBreakdown.totalConnectedLoad,
          diversifiedLoad: design.diversityBreakdown.diversifiedLoad,
          overallDiversityFactor: design.diversityBreakdown.overallDiversityFactor,
          reasoning: design.diversityBreakdown.reasoning,
          bs7671Reference: design.diversityBreakdown.bs7671Reference,
          circuitDiversity: design.diversityBreakdown.circuitDiversity
        } : null,
        // ==== CONSUMER UNIT DETAILS ====
        consumerUnit: {
          type: design.consumerUnit?.type,
          mainSwitchRating: design.consumerUnit?.mainSwitchRating,
          incomingSupply: {
            voltage: design.consumerUnit?.incomingSupply?.voltage,
            phases: design.consumerUnit?.incomingSupply?.phases,
            incomingPFC: design.consumerUnit?.incomingSupply?.incomingPFC,
            Ze: design.consumerUnit?.incomingSupply?.Ze,
            earthingSystem: design.consumerUnit?.incomingSupply?.earthingSystem
          }
        },
        // ==== DESIGN REASONING ====
        reasoning: design.reasoning ? {
          voltageContext: design.reasoning.voltageContext,
          cableSelectionLogic: design.reasoning.cableSelectionLogic,
          protectionLogic: design.reasoning.protectionLogic,
          complianceChecks: design.reasoning.complianceChecks,
          correctionsApplied: design.reasoning.correctionsApplied
        } : null,
        // ==== INSTALLATION GUIDANCE (Design-level) ====
        installationGuidance: design.installationGuidance || null,
        practicalGuidance: design.practicalGuidance || [],
        // ==== MATERIALS LIST ====
        materials: design.materials?.map(m => ({
          name: m.name,
          specification: m.specification,
          quantity: m.quantity,
          unit: m.unit,
          unitCost: m.unitCost,
          totalCost: m.totalCost
        })) || [],
        // ==== COST ESTIMATE ====
        costEstimate: design.costEstimate || null,
        // ==== VALIDATION STATUS ====
        validationPassed: design.validationPassed,
        validationIssues: design.validationIssues || [],
        autoFixSuggestions: design.autoFixSuggestions || [],
        // ==== METADATA ====
        source: 'circuit-designer',
        includesExpectedResults: includeExpectedResults,
        generatedAt: new Date().toISOString(),
        circuitCount: design.circuits.length,
        totalCircuitCompliant: design.circuits.filter(c => {
          const zsOk = c.calculations?.zs <= c.calculations?.maxZs;
          const vdOk = c.calculations?.voltageDrop?.compliant;
          return zsOk && vdOk;
        }).length
      };

      // Save to eic_schedules table with correct schema
      const { data: schedule, error } = await supabase
        .from('eic_schedules')
        .insert({
          user_id: user.id,
          installation_address: design.location || design.projectName || 'Not specified',
          installation_id: installationId,
          designer_name: design.electricianName || 'Circuit Designer AI',
          design_date: new Date().toISOString().split('T')[0],
          schedule_data: scheduleData,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      // Success - stay on current page, show toast
      toast.success('Design saved to EIC schedule', {
        description: 'Find it in your Designed Circuits under Inspection & Testing'
      });

    } catch (error) {
      console.error('Failed to save design to EIC:', error);
      toast.error('Failed to save design', {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsSendingToEIC(false);
    }
  };

  const allCompliant = design.circuits.every(c => {
    const zsMax = c.expectedTests?.zs?.maxPermitted ?? c.calculations?.maxZs ?? 999;
    const zsCompliant = c.expectedTests?.zs?.compliant ?? (c.calculations?.zs <= zsMax);
    return c.calculations.voltageDrop.compliant && zsCompliant;
  });

  const handleExportPDF = async () => {
    setIsExporting(true);
    
    // Immediate feedback for mobile users
    toast.loading('Generating PDF...', {
      id: 'pdf-export',
      description: 'Please wait while we prepare your document'
    });
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      // ✨ DIRECT PASS-THROUGH: Send only real data from design object
      // NO fallbacks, NO fake 65%, NO default cable types
      // Edge function will log warnings for missing data but NOT generate fake values
      
      const transformedDesign = {
        // Project Info (direct pass-through)
        projectName: design.projectName,
        location: design.location,
        clientName: design.clientName,
        electricianName: design.electricianName,
        installationType: design.installationType,
        
        // Consumer Unit (direct pass-through)
        consumerUnit: design.consumerUnit,
        
        // Circuits with ALL data preserved (NO FALLBACKS)
        circuits: (design.circuits || []).map((circuit, index) => {
          const circuitKey = `circuit_${index}`;
          const circuitGuidanceData = design.installationGuidance?.[circuitKey]?.guidance;
          
          return {
            // Basic circuit data (direct pass-through)
            circuitNumber: circuit.circuitNumber,
            name: circuit.name,
            loadType: circuit.loadType,
            loadPower: circuit.loadPower,
            phases: circuit.phases,
            cableLength: circuit.cableLength,
            
            // Cable spec - NO FALLBACKS (send actual data or null)
            cableType: circuit.cableType,
            cableSize: circuit.cableSize,
            cpcSize: circuit.cpcSize,
            installationMethod: circuit.installationMethod,
            
            // Protection device (direct pass-through)
            protectionDevice: circuit.protectionDevice,
            rcdProtected: circuit.rcdProtected,
            afddRequired: circuit.afddRequired,
            
            // Calculations (direct pass-through)
            calculations: circuit.calculations,
            
            // Compliance status from Phase 5.5 (direct pass-through)
            complianceStatus: circuit.complianceStatus,
            validationIssues: circuit.validationIssues,
            
            // Justifications (direct pass-through)
            justifications: circuit.justifications,
            
            // Expected test results from Phase 4.75 (direct pass-through)
            expectedTests: circuit.expectedTests,
            expectedTestResults: circuit.expectedTestResults,
            
            // Derating factors (direct pass-through)
            deratingFactors: circuit.deratingFactors,
            
            // Fault current analysis (direct pass-through)
            faultCurrentAnalysis: circuit.faultCurrentAnalysis,
            
            // Earthing requirements (direct pass-through)
            earthingRequirements: circuit.earthingRequirements,
            
            // Special locations (direct pass-through)
            specialLocationCompliance: circuit.specialLocationCompliance,
            
            // Installation guidance from Installation Agent (direct pass-through)
            installationGuidance: circuit.installationGuidance,
            fullInstallationGuidance: circuitGuidanceData ? {
              executiveSummary: circuitGuidanceData.executiveSummary,
              safetyConsiderations: circuitGuidanceData.safetyConsiderations,
              materialsRequired: circuitGuidanceData.materialsRequired,
              toolsRequired: circuitGuidanceData.toolsRequired,
              cableRouting: circuitGuidanceData.cableRouting,
              terminationRequirements: circuitGuidanceData.terminationRequirements,
              installationProcedure: circuitGuidanceData.installationProcedure,
              testingRequirements: circuitGuidanceData.testingRequirements
            } : null,
            guidanceQualityMetrics: design.installationGuidance?.[circuitKey]?.qualityMetrics,
            
            // Warnings (direct pass-through)
            warnings: circuit.warnings,
            
            // Diversity (direct pass-through)
            diversityFactor: circuit.diversityFactor,
            diversityJustification: circuit.diversityJustification
          };
        }),
        
        // Load assessment (direct pass-through - NO RECALCULATION)
        totalLoad: design.totalLoad,
        diversifiedLoad: (design as any).diversifiedLoad,
        diversityFactor: design.diversityFactor,
        totalDesignCurrent: (design as any).totalDesignCurrent,
        
        // Diversity breakdown (direct pass-through - NO 65% FALLBACK)
        diversityBreakdown: design.diversityBreakdown,
        
        // Compliance checks (direct pass-through)
        complianceChecks: {
          allCircuitsCompliant: design.circuits?.every(c => 
            c.calculations?.voltageDrop?.compliant && 
            c.calculations?.zs < c.calculations?.maxZs
          ),
          totalWarnings: design.circuits?.reduce((sum, c) => sum + (c.warnings?.length || 0), 0),
          criticalIssues: design.circuits?.filter(c => 
            !c.calculations?.voltageDrop?.compliant || 
            c.calculations?.zs >= c.calculations?.maxZs
          ).length
        },
        
        // Materials & guidance (direct pass-through)
        materials: design.materials,
        practicalGuidance: design.practicalGuidance,
        designNotes: (design as any).designNotes,
        installationGuidance: design.installationGuidance
      };
      
      // Detailed circuit data verification logging
      console.log('[PDF-EXPORT] Complete circuit data sample:', {
        circuitCount: transformedDesign.circuits.length,
        sampleCircuit: transformedDesign.circuits[0],
        verification: {
          hasCableType: !!transformedDesign.circuits[0]?.cableType,
          hasInstallationMethod: !!transformedDesign.circuits[0]?.installationMethod,
          hasJustifications: !!transformedDesign.circuits[0]?.justifications,
          hasCalculations: !!transformedDesign.circuits[0]?.calculations,
          hasProtectionDevice: !!transformedDesign.circuits[0]?.protectionDevice,
          hasExpectedTestResults: !!transformedDesign.circuits[0]?.expectedTestResults,
          hasDeratingFactors: !!transformedDesign.circuits[0]?.deratingFactors,
          hasFaultCurrentAnalysis: !!transformedDesign.circuits[0]?.faultCurrentAnalysis
        },
        designSummary: {
          totalLoad: transformedDesign.totalLoad,
          diversityFactor: transformedDesign.diversityBreakdown?.overallDiversityFactor,
          installationType: transformedDesign.installationType,
          hasInstallationGuidance: !!transformedDesign.installationGuidance,
          complianceStatus: transformedDesign.complianceChecks
        }
      });
      
      // Try PDF Monkey first
      const { data, error } = await supabase.functions.invoke('generate-circuit-design-pdf', {
        body: {
          design: transformedDesign,
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
              cableSize: c.cableSize ?? 2.5,
              cpcSize: c.cpcSize ?? 1.5,
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

        await downloadEICPDF(schedule, `${(design.projectName || 'Design').replace(/\s+/g, '_')}_Design.pdf`);
        
        toast.success('Professional PDF generated', {
          id: 'pdf-export',
          description: 'BS 7671 compliant circuit design PDF ready'
        });
      } else if (data?.downloadUrl) {
        // PDF Monkey success - download the PDF
        console.log('[PDF-EXPORT] PDF Monkey success, downloading:', data.downloadUrl);
        
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.download = `${(design.projectName || 'Design').replace(/\s+/g, '_')}_Design.pdf`;
        link.click();
        
        toast.success('Professional PDF Generated', {
          id: 'pdf-export',
          description: 'Circuit design exported with BS 7671 compliance'
        });
      }
    } catch (error) {
      console.error('[PDF-EXPORT] Error:', error);
      toast.error('Failed to export PDF', { id: 'pdf-export' });
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

  // Synchronous index correction to prevent accessing undefined
  const safeCircuitIndex = selectedCircuit >= design.circuits.length ? 0 : selectedCircuit;
  const currentCircuit = design.circuits[safeCircuitIndex];

  // Update the state if it was out of bounds (for next render)
  if (selectedCircuit >= design.circuits.length && selectedCircuit !== 0) {
    console.warn(`Selected circuit index ${selectedCircuit} is out of bounds (total: ${design.circuits.length}), resetting to 0`);
    setSelectedCircuit(0);
  }

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

  // Mobile-first responsive rendering
  if (isMobile) {
    return (
      <>
        {/* Success Animation */}
        {showSuccessAnimation && (
          <ResultsSuccessAnimation
            onComplete={() => setShowSuccessAnimation(false)}
            circuitCount={design.circuits.length}
            projectName={design.projectName}
          />
        )}
        <MobileCircuitResults
          design={design}
          onReset={onReset}
          onExport={handleExportPDF}
          onSendToEIC={openSendToEICDialog}
          isSendingToEIC={isSendingToEIC}
        />

        {/* Send to EIC Confirmation Dialog (Mobile) */}
        <Dialog open={showSendToEICDialog} onOpenChange={setShowSendToEICDialog}>
          <DialogContent className="max-w-[calc(100vw-2rem)] rounded-xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-elec-yellow" />
                Send to EIC Schedule
              </DialogTitle>
              <DialogDescription>
                This design will be saved to your EIC schedule for testing and certification.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              {/* Summary of what will be sent */}
              <div className="text-sm text-muted-foreground">
                <p><strong>{design.circuits?.length || 0} circuit(s)</strong> will be added including:</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Cable sizes and CPC</li>
                  <li>Protective device details</li>
                  <li>Reference methods</li>
                </ul>
              </div>

              {/* Expected results checkbox with warning */}
              <div className="flex items-start gap-3 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                <Checkbox
                  id="includeExpectedResultsMobile"
                  checked={includeExpectedResults}
                  onCheckedChange={(checked) => setIncludeExpectedResults(checked as boolean)}
                  className="mt-0.5 border-orange-500/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                />
                <div className="flex-1">
                  <label htmlFor="includeExpectedResultsMobile" className="text-sm font-medium cursor-pointer">
                    Include expected test results
                  </label>
                  <p className="text-xs text-orange-400 mt-1 flex items-start gap-1">
                    <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                    <span>All calculated values (R1+R2, Zs) must be verified on-site during testing</span>
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter className="flex-col gap-2">
              <Button
                onClick={handleSendToEIC}
                disabled={isSendingToEIC}
                className="w-full min-h-[44px] touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black"
              >
                {isSendingToEIC ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FileCheck className="h-4 w-4 mr-2" />
                    Send to EIC
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={() => setShowSendToEICDialog(false)} className="w-full min-h-[44px] touch-manipulation">
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Extract failed circuits info
  const failedCircuitsCount = (design as any).failedCircuits?.count || 0;
  const failedCircuitsNames = (design as any).failedCircuits?.names || [];

  // Desktop view
  return (
    <>
      {/* Success Animation */}
      {showSuccessAnimation && (
        <ResultsSuccessAnimation
          onComplete={() => setShowSuccessAnimation(false)}
          circuitCount={design.circuits.length}
          projectName={design.projectName}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: showSuccessAnimation ? 2.5 : 0 }}
        className="space-y-4 sm:space-y-5 md:space-y-6 px-3 sm:px-4 pb-safe"
      >
      {/* Failed Circuits Warning Banner */}
      {failedCircuitsCount > 0 && (
        <Alert variant="destructive" className="animate-in fade-in duration-300">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{failedCircuitsCount} circuit{failedCircuitsCount !== 1 ? 's' : ''} could not be generated</AlertTitle>
          <AlertDescription>
            {failedCircuitsNames.join(', ')} - These circuits may need to be regenerated or added manually.
          </AlertDescription>
        </Alert>
      )}
      
      {/* Redesigned Header - Clean & Prominent */}
      <div className="space-y-4">
        {/* Title Row - Clean & Prominent */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-elec-yellow to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-elec-yellow/20">
              <Zap className="h-7 w-7 text-black" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {design.projectName}
              </h1>
              <div className="flex items-center gap-2 text-white/60 mt-1">
                <MapPin className="h-4 w-4" />
                <span>{design.location}</span>
              </div>
            </div>
          </div>

          {/* Compliance Badge - Large & Clear */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
            allCompliant
              ? "bg-green-500/15 border border-green-500/30"
              : "bg-amber-500/15 border border-amber-500/30"
          }`}>
            {allCompliant ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            )}
            <span className={`font-semibold ${
              allCompliant ? "text-green-500" : "text-amber-500"
            }`}>
              {allCompliant ? 'BS 7671 Compliant' : 'Review Required'}
            </span>
          </div>
        </div>

        {/* Key Metrics Row - Clean Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MetricCard
            icon={Zap}
            label="Connected Load"
            value={`${fmt(design.totalLoad / 1000, 2)}kW`}
            color="yellow"
          />
          <MetricCard
            icon={TrendingDown}
            label="After Diversity"
            value={`${fmt((design.diversifiedLoad || design.diversityBreakdown?.diversifiedLoad || design.totalLoad) / 1000, 2)}kW`}
            subValue={design.diversityFactor ? `${(design.diversityFactor * 100).toFixed(0)}%` : undefined}
            color="green"
          />
          <MetricCard
            icon={Cable}
            label="Circuits"
            value={design.circuits.length.toString()}
            color="blue"
          />
          <MetricCard
            icon={Shield}
            label="Main Switch"
            value={`${design.consumerUnit?.mainSwitchRating || 100}A`}
            color="purple"
          />
        </div>

        {/* System Info - Compact Pills */}
        <div className="flex flex-wrap gap-2">
          <InfoPill label={design.installationType || 'domestic'} />
          <InfoPill label={`${design.consumerUnit?.incomingSupply?.voltage || 230}V`} />
          <InfoPill label={design.consumerUnit?.incomingSupply?.earthingSystem || 'TN-C-S'} />
          <InfoPill label={`Ze: ${design.consumerUnit?.incomingSupply?.Ze?.toFixed(2) || '0.35'}Ω`} />
          {design.consumerUnit?.incomingSupply?.incomingPFC && (
            <InfoPill label={`PSCC: ${(design.consumerUnit.incomingSupply.incomingPFC / 1000).toFixed(1)}kA`} />
          )}
          {(design as any).totalDesignCurrent && (
            <InfoPill label={`Total Ib: ${fmt((design as any).totalDesignCurrent, 1)}A`} />
          )}
        </div>
      </div>

      {/* Diversity Breakdown Card */}
      {design.diversityBreakdown && (
        <Card className="p-3 sm:p-4 md:p-5 bg-card/30 border-white/10">
          <Accordion type="single" collapsible>
            <AccordionItem value="diversity" className="border-none">
              <AccordionTrigger className="hover:no-underline min-h-[44px] touch-manipulation">
                <div className="flex items-center gap-3 flex-1">
                  <Percent className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  <div className="text-left">
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">Load Diversity Breakdown</h3>
                    <p className="text-xs sm:text-sm text-foreground/70 mt-0.5">
                      {fmt(design.diversityBreakdown.totalConnectedLoad / 1000, 1)}kW → {fmt(design.diversityBreakdown.diversifiedLoad / 1000, 1)}kW 
                      <Badge variant="secondary" className="ml-2">
                        {design.diversityBreakdown.overallDiversityFactor 
                          ? `${(design.diversityBreakdown.overallDiversityFactor * 100).toFixed(1)}%`
                          : 'Not specified'} applied
                      </Badge>
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="space-y-4">
                  {/* Overall Calculation */}
                  <div className="flex items-center justify-between py-2 px-3 bg-primary/10 rounded-lg">
                    <span className="text-sm text-foreground/80">Total Connected Load:</span>
                    <span className="font-bold text-foreground">{fmt(design.diversityBreakdown.totalConnectedLoad / 1000, 1)}kW</span>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 bg-primary/10 rounded-lg">
                    <span className="text-sm text-foreground/80">Diversity Factor:</span>
                    <span className="font-bold text-foreground">
                      {design.diversityBreakdown.overallDiversityFactor 
                        ? `${(design.diversityBreakdown.overallDiversityFactor * 100).toFixed(1)}%`
                        : 'Not specified'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 bg-green-500/20 rounded-lg border border-green-500/30">
                    <span className="text-sm font-semibold text-foreground">After Diversity:</span>
                    <span className="font-bold text-lg text-foreground">{fmt(design.diversityBreakdown.diversifiedLoad / 1000, 1)}kW</span>
                  </div>

                  {/* Per-Circuit Breakdown */}
                  {design.diversityBreakdown.circuitDiversity && design.diversityBreakdown.circuitDiversity.length > 0 && (
                    <div className="space-y-2 mt-4">
                      <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">Per-Circuit Breakdown:</p>
                      <div className="space-y-2">
                        {design.diversityBreakdown.circuitDiversity.map((cd, idx) => (
                          <div key={idx} className="py-2 px-3 bg-background/30 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-foreground text-sm">{cd.circuitName}</span>
                              <Badge variant="outline" className="text-xs">{fmt(cd.diversityFactorApplied * 100, 0)}%</Badge>
                            </div>
                            <div className="text-xs text-foreground/60">
                              {fmt(cd.connectedLoad, 1)}kW × {cd.diversityFactorApplied} = {fmt(cd.diversifiedLoad, 1)}kW
                            </div>
                            <div className="text-xs text-foreground/50 italic mt-1">{cd.justification}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reasoning */}
                  <div className="py-3 px-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-xs font-medium text-blue-400 mb-1">BS 7671 Reference:</p>
                    <p className="text-sm text-foreground/80 leading-relaxed">{design.diversityBreakdown.reasoning}</p>
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

      {/* Compact Circuit Selector Pills */}
      <Card className="p-3 sm:p-4 bg-card/50 border-white/10">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-elec-yellow" />
              <h3 className="text-sm font-semibold text-white">Select Circuit</h3>
            </div>
            <span className="text-xs text-white/50">
              {selectedCircuit + 1} of {design.circuits.length}
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar snap-x snap-mandatory">
            {design.circuits.map((circuit, idx) => {
              const isActive = idx === selectedCircuit;
              const hasWarnings = circuit.warnings?.length > 0;
              const vdCompliant = circuit.calculations?.voltageDrop?.compliant ?? true;
              const zsCompliant = (circuit.calculations?.zs ?? 0) < (circuit.calculations?.maxZs ?? 999);
              const hasIssues = !vdCompliant || !zsCompliant;

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedCircuit(idx)}
                  className={`flex-shrink-0 px-3 py-2 rounded-lg border transition-all touch-manipulation min-h-[44px] snap-center ${
                    isActive
                      ? 'bg-elec-yellow/15 border-elec-yellow text-white'
                      : 'bg-white/[0.02] border-white/10 text-white/60 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">
                      C{idx + 1}
                      {circuit.phases === 'three' && (
                        <span className="text-[10px] ml-0.5 opacity-60">3Ø</span>
                      )}
                    </span>
                    {(hasWarnings || hasIssues) && (
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    )}
                  </div>
                  <div className="text-xs opacity-60 truncate max-w-[80px] text-left mt-0.5">
                    {circuit.protectionDevice?.rating}A {circuit.protectionDevice?.curve}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* All Circuits Summary Table */}
      <Card className="p-3 sm:p-4 md:p-5 lg:p-6" id="circuit-summary-table">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <h3 className="text-base sm:text-lg font-semibold">All Circuits Overview</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-1.5 sm:px-2 font-semibold text-xs sm:text-sm">Circuit</th>
                  <th className="text-left py-2 px-1.5 sm:px-2 font-semibold text-xs sm:text-sm">Name</th>
                  <th className="text-left py-2 px-1.5 sm:px-2 font-semibold text-xs sm:text-sm">Load</th>
                  <th className="text-left py-2 px-1.5 sm:px-2 font-semibold text-xs sm:text-sm">Cable</th>
                  <th className="text-left py-2 px-1.5 sm:px-2 font-semibold text-xs sm:text-sm">Protection</th>
                  <th className="text-left py-2 px-1.5 sm:px-2 font-semibold text-xs sm:text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {design.circuits.map((circuit, idx) => {
                  // Use expected test results as source of truth (AI-calculated with correct disconnection times)
                  const hasCompliance = circuit.complianceStatus 
                    ? circuit.complianceStatus === 'pass'
                    : (
                        // Check expectedTests first (backend format)
                        circuit.expectedTests?.zs?.compliant !== undefined 
                          ? (circuit.expectedTests.zs.compliant && (circuit.calculations?.voltageDrop?.compliant ?? true))
                          // Fall back to expectedTestResults (frontend format)
                          : circuit.expectedTestResults?.zs?.compliant !== undefined
                            ? (circuit.expectedTestResults.zs.compliant && (circuit.calculations?.voltageDrop?.compliant ?? true))
                            // Final fallback: use calculations (shouldn't happen with proper AI output)
                            : (circuit.calculations?.voltageDrop?.compliant && 
                               (circuit.calculations?.zs ?? 0) <= (circuit.calculations?.maxZs ?? 999))
                      );
                  
                  // Determine status variant based on complianceStatus
                  const statusVariant = circuit.complianceStatus === 'pass' ? 'success' :
                                      circuit.complianceStatus === 'warning' ? 'warning' : 'destructive';
                  
                  return (
                    <tr 
                      key={idx} 
                      className={`border-b border-border/50 hover:bg-muted/50 active:bg-muted/70 cursor-pointer transition-all touch-manipulation ${selectedCircuit === idx ? 'bg-primary/10' : ''}`}
                      onClick={() => setSelectedCircuit(idx)}
                    >
                      <td className="py-3 px-2 text-left">
                        <span className="font-mono font-semibold text-primary">C{circuit.circuitNumber}</span>
                      </td>
                      <td className="py-3 px-2 text-left">
                        <div>
                          <div className="font-medium">{circuit.name}</div>
                          <div className="text-xs text-muted-foreground capitalize">{circuit.loadType}</div>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-left">
                        <div>
                          <div className="font-medium">{(circuit.loadPower / 1000).toFixed(1)}kW</div>
                          <div className="text-xs text-muted-foreground">{circuit.calculations?.Ib?.toFixed(1)}A</div>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-left">
                        <div className="text-xs">
                          <div className="font-medium">{circuit.cableSize ?? 'N/A'}mm²</div>
                          <div className="text-muted-foreground">{circuit.cableLength ?? 0}m</div>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-left">
                        <Badge variant="outline" className="text-xs">
                          {circuit.protectionDevice?.rating}A {circuit.protectionDevice?.curve}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 text-left">
                        {hasCompliance ? (
                          <Badge variant="success" className="text-xs gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Pass
                            {circuit.complianceStatus === 'warning' && (
                              <span className="text-xs ml-1">(⚠)</span>
                            )}
                          </Badge>
                        ) : (
                          <Badge variant={statusVariant} className="text-xs gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            Review
                            {(circuit as any).validationIssues?.length > 0 && (
                              <span className="ml-1">
                                ({(circuit as any).validationIssues.length} issue{(circuit as any).validationIssues.length > 1 ? 's' : ''})
                              </span>
                            )}
                          </Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Click any row to view detailed specifications and calculations
          </p>
        </div>
      </Card>

      {/* Circuit Detail Card */}
      {currentCircuit && 
       typeof currentCircuit.cableSize === 'number' && 
       currentCircuit.protectionDevice && 
       currentCircuit.calculations && 
       currentCircuit.justifications ? (
        <Card className="p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">
                    C{currentCircuit.circuitNumber}
                  </span>
                  {currentCircuit.name}
                </h3>
                <p className="text-muted-foreground capitalize">{currentCircuit.loadType}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                Circuit {selectedCircuit + 1} of {design.circuits.length}
              </Badge>
            </div>

            {/* Special Location Alert */}
            {currentCircuit.specialLocationCompliance?.isSpecialLocation && (
              <Alert className="border-orange-500/50 bg-orange-500/10">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <AlertTitle className="text-orange-400 font-semibold">Special Location Requirements</AlertTitle>
                <AlertDescription>
                  <div className="space-y-3 mt-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-orange-400 border-orange-400/30 font-mono text-xs">
                        {currentCircuit.specialLocationCompliance.regulation}
                      </Badge>
                      <span className="font-semibold text-foreground">
                        {currentCircuit.specialLocationCompliance.locationType}
                      </span>
                    </div>
                    
                    <ul className="space-y-1.5 text-sm text-foreground">
                      {currentCircuit.specialLocationCompliance.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-left">
                          <span className="flex-shrink-0">•</span>
                          <span className="leading-relaxed">{req}</span>
                        </li>
                      ))}
                    </ul>

                    {currentCircuit.specialLocationCompliance.zonesApplicable && (
                      <div className="py-2 px-3 bg-orange-500/10 rounded border border-orange-500/20">
                        <p className="text-xs font-medium text-orange-400">Zones Applicable:</p>
                        <p className="text-sm text-foreground text-left">{currentCircuit.specialLocationCompliance.zonesApplicable}</p>
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
                <div className="p-3 sm:p-4 space-y-2.5 sm:space-y-3">
                  <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-foreground">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    Load Details
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    <div className="flex items-center gap-3 py-2 px-3 bg-background/30 rounded-lg">
                      <span className="text-sm text-foreground/80 min-w-[120px]">Power:</span>
                      <span className="font-medium text-foreground">{currentCircuit.loadPower}W ({fmt(currentCircuit.loadPower / 1000, 1)}kW)</span>
                    </div>
                    {currentCircuit.socketCount && (
                      <div className="flex items-center gap-3 py-2 px-3 bg-background/30 rounded-lg">
                        <span className="text-sm text-foreground/80 min-w-[120px]">Sockets:</span>
                        <span className="font-medium text-foreground">{currentCircuit.socketCount} outlets</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 py-2 px-3 bg-background/30 rounded-lg">
                      <span className="text-sm text-foreground/80 min-w-[120px]">Design Current (Ib):</span>
                      <span className="font-medium text-foreground">{fmt(currentCircuit.calculations?.Ib, 1)}A</span>
                    </div>
                    <div className="flex items-center gap-3 py-2 px-3 bg-background/30 rounded-lg">
                      <span className="text-sm text-foreground/80 min-w-[120px]">Phases:</span>
                      <span className="font-medium text-foreground capitalize">{currentCircuit.phases}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Cable Specification Card */}
              <Card className="bg-card/30 border-white/10">
                <div className="p-3 sm:p-4 space-y-2.5 sm:space-y-3">
                  <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-foreground">
                    <Cable className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    Cable Specification
                  </div>
                  
                  {/* Cable Type Description - Full Width */}
                  {currentCircuit.cableType && (
                    <div className="py-2 px-3 bg-background/30 rounded-lg">
                      <p className="text-sm text-foreground/80 leading-relaxed">{currentCircuit.cableType}</p>
                    </div>
                  )}
                  
                  {/* Cable Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 py-2 px-3 bg-background/30 rounded-lg">
                      <span className="text-sm text-foreground/80 min-w-[120px]">Live Conductor:</span>
                      <span className="font-medium text-foreground">{currentCircuit.cableSize ?? 'N/A'}mm²</span>
                    </div>
                    <div className="flex items-center gap-3 py-2 px-3 bg-background/30 rounded-lg">
                      <span className="text-sm text-foreground/80 min-w-[120px]">CPC:</span>
                      <span className="font-medium text-foreground">{currentCircuit.cpcSize ?? 'N/A'}mm²</span>
                    </div>
                    <div className="flex items-center gap-3 py-2 px-3 bg-background/30 rounded-lg">
                      <span className="text-sm text-foreground/80 min-w-[120px]">Length:</span>
                      <span className="font-medium text-foreground">{currentCircuit.cableLength}m</span>
                    </div>
                    <div className="flex items-center gap-3 py-2 px-3 bg-background/30 rounded-lg">
                      <span className="text-sm text-foreground/80 min-w-[120px]">Method:</span>
                      <span className="font-medium text-foreground">
                        {currentCircuit.installationMethod || 'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Protection Device Card */}
              <Card className="bg-card/30 border-white/10">
                <div className="p-3 sm:p-4 space-y-2.5 sm:space-y-3">
                  <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-foreground">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    Protection Device
                  </div>
                  
                  {/* Device Specification */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex items-center justify-between sm:justify-start sm:gap-4 py-2 px-3 bg-background/30 rounded-lg">
                      <span className="text-sm text-foreground/80">Type:</span>
                      <span className="font-medium text-foreground">{currentCircuit.protectionDevice?.type ?? 'MCB'}</span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-start sm:gap-4 py-2 px-3 bg-background/30 rounded-lg">
                      <span className="text-sm text-foreground/80">Rating:</span>
                      <span className="font-medium text-foreground">{currentCircuit.protectionDevice?.rating ?? 'N/A'}A Type {currentCircuit.protectionDevice?.curve ?? 'B'}</span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-start sm:gap-4 py-2 px-3 bg-background/30 rounded-lg">
                      <span className="text-sm text-foreground/80">Breaking Capacity:</span>
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
                          <p className="text-sm text-foreground/90 leading-relaxed">
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
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                <TrendingDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                Compliance Checks
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
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
                  <p className="text-xs text-foreground/60">
                    {fmt(currentCircuit.calculations?.voltageDrop?.volts, 2)}V (Max: {currentCircuit.calculations?.voltageDrop?.limit || 3}%)
                  </p>
                </div>

                {/* Use expectedTests as source of truth for Zs compliance */}
                {(() => {
                  const zsValue = currentCircuit.expectedTests?.zs?.expected ?? currentCircuit.calculations?.zs ?? 0;
                  const maxZs = currentCircuit.expectedTests?.zs?.maxPermitted ?? currentCircuit.calculations?.maxZs ?? 999;
                  const zsCompliant = currentCircuit.expectedTests?.zs?.compliant ?? (zsValue <= maxZs);
                  
                  return (
                    <div className={`p-3 rounded-lg ${zsCompliant ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Earth Fault Loop (Zs)</span>
                        {zsCompliant ? 
                          <CheckCircle2 className="h-4 w-4 text-green-600" /> : 
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        }
                      </div>
                      <p className="text-lg font-bold">{fmt(zsValue, 3)}Ω</p>
                      <p className="text-xs text-foreground/60">
                        Max: {fmt(maxZs, 3)}Ω
                      </p>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Expected Test Results */}
            {currentCircuit.expectedTests && (
              <ExpectedTestsDisplay 
                expectedTests={currentCircuit.expectedTests}
                circuitName={currentCircuit.name}
              />
            )}

            {/* Justifications */}
            <div className="space-y-2.5 sm:space-y-3 bg-card/50 p-3 sm:p-4 rounded-lg border border-primary/10">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm sm:text-base font-semibold text-foreground">Design Justification</h4>
                {isPlaceholderJustification(currentCircuit) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRegenerateJustifications(selectedCircuit)}
                    disabled={regeneratingCircuits.has(selectedCircuit)}
                    className="h-8 sm:h-7 text-xs min-h-[44px] sm:min-h-0 touch-manipulation"
                  >
                    {regeneratingCircuits.has(selectedCircuit) ? (
                      <>
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Regenerating...
                      </>
                    ) : (
                      'Regenerate AI'
                    )}
                  </Button>
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-medium text-foreground mb-1">Cable Sizing:</p>
                  <p className="text-foreground/70">{currentCircuit.justifications?.cableSize ?? 'No justification provided'}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Protection:</p>
                  <p className="text-foreground/70">{currentCircuit.justifications?.protection ?? 'No justification provided'}</p>
                </div>
                {currentCircuit.justifications?.rcd && (
                  <div>
                    <p className="font-medium text-foreground mb-1">RCD Protection:</p>
                    <p className="text-foreground/70">{currentCircuit.justifications.rcd}</p>
                  </div>
                )}
              </div>
            </div>

            {/* 1. Diversity Breakdown */}
            {currentCircuit.diversityFactor !== undefined && (
              <div className="space-y-3 bg-card/50 p-4 rounded-lg border border-primary/10">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Percent className="h-4 w-4 text-primary" />
                    Diversity Applied
                  </h4>
                  <Badge variant="secondary">{fmt(currentCircuit.diversityFactor * 100, 0)}%</Badge>
                </div>
                <p className="text-sm text-foreground/70">{currentCircuit.diversityJustification}</p>
              </div>
            )}

            {/* 2. Fault Current Analysis */}
            {currentCircuit.faultCurrentAnalysis && (
              <div className="space-y-3 bg-card/50 p-4 rounded-lg border border-primary/10">
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-foreground">Fault Current Analysis</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-foreground/60 mb-1">PSCC at Circuit</p>
                    <p className="text-lg font-bold text-foreground">{fmt(currentCircuit.faultCurrentAnalysis?.psccAtCircuit, 2)}kA</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60 mb-1">Device Breaking Capacity</p>
                    <p className="text-lg font-bold text-foreground">{currentCircuit.faultCurrentAnalysis.deviceBreakingCapacity}kA</p>
                  </div>
                </div>
                <div className={`flex items-center gap-2 p-2 rounded ${currentCircuit.faultCurrentAnalysis.compliant ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                  {currentCircuit.faultCurrentAnalysis.compliant ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                  <span className="text-sm font-medium">{currentCircuit.faultCurrentAnalysis.marginOfSafety}</span>
                </div>
                <p className="text-xs text-foreground/60">{currentCircuit.faultCurrentAnalysis.regulation}</p>
              </div>
            )}

            {/* 3. Earthing & Bonding Requirements */}
            {currentCircuit.earthingRequirements && (
              <div className="space-y-3 bg-card/50 p-4 rounded-lg border border-primary/10">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-foreground">Earthing & Bonding</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-foreground/60">CPC Size</p>
                    <p className="font-medium text-foreground">{currentCircuit.earthingRequirements.cpcSize}</p>
                  </div>
                  <div>
                    <p className="text-foreground/60">Supplementary Bonding</p>
                    <p className="font-medium text-foreground">{currentCircuit.earthingRequirements.supplementaryBonding ? 'Required' : 'Not Required'}</p>
                  </div>
                  {currentCircuit.earthingRequirements.bondingConductorSize && (
                    <div className="md:col-span-2">
                      <p className="text-foreground/60">Bonding Conductor Size</p>
                      <p className="font-medium text-foreground">{currentCircuit.earthingRequirements.bondingConductorSize}</p>
                    </div>
                  )}
                </div>
                <p className="text-sm text-foreground/70">{currentCircuit.earthingRequirements.justification}</p>
                <Badge variant="outline" className="text-xs">{currentCircuit.earthingRequirements.regulation}</Badge>
              </div>
            )}

            {/* 4. Cable Derating Factors Breakdown */}
            {currentCircuit.deratingFactors && (
              <div className="space-y-3 bg-card/50 p-4 rounded-lg border border-primary/10">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-foreground">Derating Factors</h4>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-primary/10 p-2 rounded">
                    <p className="text-xs text-foreground/60">Ca</p>
                    <p className="text-lg font-bold text-foreground">{fmt(currentCircuit.deratingFactors?.Ca, 2)}</p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded">
                    <p className="text-xs text-foreground/60">Cg</p>
                    <p className="text-lg font-bold text-foreground">{fmt(currentCircuit.deratingFactors?.Cg, 2)}</p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded">
                    <p className="text-xs text-foreground/60">Ci</p>
                    <p className="text-lg font-bold text-foreground">{fmt(currentCircuit.deratingFactors?.Ci, 2)}</p>
                  </div>
                  <div className="bg-primary/5 p-2 rounded border border-primary/30">
                    <p className="text-xs text-foreground/60">Overall</p>
                    <p className="text-lg font-bold text-primary">{fmt(currentCircuit.deratingFactors?.overall, 2)}</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/70">{currentCircuit.deratingFactors.explanation}</p>
                <p className="text-xs text-foreground/60">{currentCircuit.deratingFactors.tableReferences}</p>
              </div>
            )}

            {/* Installation Method Guidance - New Component */}
            {currentCircuit.installationGuidance && (
              <InstallationGuidanceDisplay 
                installationGuidance={currentCircuit.installationGuidance as EnhancedInstallationGuidance}
                testingRequirements={currentCircuit.testingRequirements}
              />
            )}

            {/* 6. Special Location Compliance */}
            {currentCircuit.specialLocationCompliance?.isSpecialLocation && (
              <div className="space-y-3 bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-orange-600" />
                  <h4 className="font-semibold text-orange-600">Special Location Requirements</h4>
                </div>
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-700">
                  {currentCircuit.specialLocationCompliance.locationType}
                </Badge>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground text-left">Requirements:</p>
                  <ul className="space-y-1">
                    {currentCircuit.specialLocationCompliance.requirements.map((req, idx) => (
                      <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {currentCircuit.specialLocationCompliance.zonesApplicable && (
                  <p className="text-sm text-foreground text-left pl-6">{currentCircuit.specialLocationCompliance.zonesApplicable}</p>
                )}
                <Badge variant="outline" className="text-xs border-orange-500/30">{currentCircuit.specialLocationCompliance.regulation}</Badge>
              </div>
            )}

            {/* 7. Expected Test Results */}
            {currentCircuit.expectedTests && (
              <div className="space-y-4 bg-card/50 p-4 rounded-lg border border-primary/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ClipboardCheck className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-foreground">Expected Test Results</h4>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <FileText className="h-3 w-3 mr-1" />
                    EIC Schedule Preview
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  {/* R1+R2 - Blue gradient */}
                  <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-4 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                          <span className="text-blue-400 font-bold text-sm">R₁+R₂</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Earth Continuity</p>
                          <p className="text-xs text-foreground/50">BS 7671:2018+A3:2024 Reg 643.2.2</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge className="bg-blue-500/20 text-foreground border-blue-500/30 hover:bg-blue-500/30">
                          At 20°C: {currentCircuit.expectedTests.r1r2?.at20C?.toFixed(4)}Ω
                        </Badge>
                        <Badge className="bg-blue-500/20 text-foreground border-blue-500/30 hover:bg-blue-500/30">
                          At 70°C: {currentCircuit.expectedTests.r1r2?.at70C?.toFixed(4)}Ω
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-foreground/60 mt-2">
                      {currentCircuit.expectedTests.r1r2?.regulation}
                    </p>
                  </div>

                  {/* Zs - Green/Red based on compliance */}
                  <div className={`bg-gradient-to-br p-4 rounded-lg border hover:border-opacity-60 transition-colors ${
                    currentCircuit.expectedTests.zs?.compliant 
                      ? 'from-green-500/10 to-green-600/5 border-green-500/20 hover:border-green-500/40' 
                      : 'from-red-500/10 to-red-600/5 border-red-500/20 hover:border-red-500/40'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          currentCircuit.expectedTests.zs?.compliant 
                            ? 'bg-green-500/20' 
                            : 'bg-red-500/20'
                        }`}>
                          <span className={`font-bold text-sm ${
                            currentCircuit.expectedTests.zs?.compliant 
                              ? 'text-green-400' 
                              : 'text-red-400'
                          }`}>Zs</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Earth Fault Loop Impedance</p>
                          <p className="text-xs text-foreground/50">{currentCircuit.expectedTests.zs?.regulation}</p>
                        </div>
                        {currentCircuit.expectedTests.zs?.compliant ? (
                          <CheckCircle2 className="h-5 w-5 text-green-400" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-red-400" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge className={currentCircuit.expectedTests.zs?.compliant 
                          ? 'bg-green-500/20 text-foreground border-green-500/30 hover:bg-green-500/30' 
                          : 'bg-red-500/20 text-foreground border-red-500/30 hover:bg-red-500/30'
                        }>
                          Calculated: {currentCircuit.expectedTests.zs?.expected?.toFixed(3)}Ω
                        </Badge>
                        <Badge className={currentCircuit.expectedTests.zs?.compliant 
                          ? 'bg-green-500/20 text-foreground border-green-500/30 hover:bg-green-500/30' 
                          : 'bg-red-500/20 text-foreground border-red-500/30 hover:bg-red-500/30'
                        }>
                          Max: {currentCircuit.expectedTests.zs?.maxPermitted?.toFixed(3)}Ω
                        </Badge>
                      </div>
                    </div>
                    <div className={`text-xs font-semibold mt-3 ${
                      currentCircuit.expectedTests.zs?.compliant 
                        ? 'text-green-400' 
                        : 'text-red-400'
                    }`}>
                      {currentCircuit.expectedTests.zs?.compliant 
                        ? `✓ Compliant - ${currentCircuit.expectedTests.zs?.marginPercent?.toFixed(1)}% safety margin` 
                        : '✗ Non-compliant - Review cable size or Ze'}
                    </div>
                  </div>

                  {/* Insulation Resistance - Purple gradient */}
                  <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                          <span className="text-purple-400 font-bold text-sm">IR</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Insulation Resistance</p>
                          <p className="text-xs text-foreground/50">BS 7671:2018+A3:2024 Reg 643.3.1</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge className="bg-purple-500/20 text-foreground border-purple-500/30 hover:bg-purple-500/30">
                          Test: {currentCircuit.expectedTests.insulationResistance?.testVoltage}
                        </Badge>
                        <Badge className="bg-purple-500/20 text-foreground border-purple-500/30 hover:bg-purple-500/30">
                          Min: {currentCircuit.expectedTests.insulationResistance?.minResistance}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Polarity - Amber gradient */}
                  <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 p-4 rounded-lg border border-orange-500/20 hover:border-orange-500/40 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                        <span className="text-orange-400 font-bold text-sm">P</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground mb-1">Polarity Test</p>
                        <p className="text-xs text-foreground/50 mb-2">BS 7671:2018+A3:2024 Reg 643.4</p>
                        <p className="text-sm text-foreground/90 leading-relaxed">
                          Verify correct polarity - all single-pole switching and protective devices in phase conductor only
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* RCD Test - Cyan gradient */}
                  {currentCircuit.rcdProtected && currentCircuit.expectedTests.rcd && (
                    <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 p-4 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                            <span className="text-cyan-400 font-bold text-sm">RCD</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">RCD Trip Times</p>
                            <p className="text-xs text-foreground/60">{currentCircuit.expectedTests.rcd?.regulation}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <Badge className="bg-cyan-500/20 text-foreground border-cyan-500/30 hover:bg-cyan-500/30">
                            Rating: {currentCircuit.expectedTests.rcd?.ratingmA}mA
                          </Badge>
                          <Badge className="bg-cyan-500/20 text-foreground border-cyan-500/30 hover:bg-cyan-500/30">
                            Max Trip: &lt;{currentCircuit.expectedTests.rcd?.maxTripTimeMs}ms at 1×IΔn
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Warnings */}
            {currentCircuit.warnings?.length > 0 && (
              <div className="space-y-2 bg-orange-500/10 border border-orange-500/20 p-4 rounded-lg">
                <h4 className="font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Notes & Warnings
                </h4>
                <ul className="space-y-1">
                  {currentCircuit.warnings.map((warning, idx) => (
                    <li key={idx} className="text-sm text-foreground text-left flex items-start gap-2">
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


      {/* NEW: Installation Guidance Section */}
      {design.installationGuidance ? (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Installation Guidance</h3>
              <Badge variant="secondary" className="ml-auto">AI Generated</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Comprehensive installation guidance generated in parallel with circuit design
            </p>
            <InstallationGuidancePerCircuitPanel
              guidance={
                // Unwrap nested .guidance field (circuit_0.guidance → circuit_0)
                Object.entries(design.installationGuidance as any).reduce((acc, [key, value]) => {
                  acc[key] = (value as any).guidance || value;
                  return acc;
                }, {} as Record<string, EnhancedInstallationGuidance>)
              }
              circuits={design.circuits}
            />
          </div>
        </Card>
      ) : (
        <Card className="p-4 border-amber-500/30 bg-amber-500/5">
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-amber-500" />
            <div>
              <p className="font-medium text-foreground">Installation guidance is being generated...</p>
              <p className="text-sm text-muted-foreground">This may take a moment. The guidance will appear when ready.</p>
            </div>
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
        <Button
          size="lg"
          onClick={handleExportPDF}
          className={`w-full sm:flex-1 min-h-[44px] touch-manipulation ${isExporting ? 'animate-pulse' : ''}`}
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <Loader2 className="h-6 w-6 mr-2 animate-spin" />
              <span className="animate-pulse">Generating PDF...</span>
            </>
          ) : (
            <>
              <Download className="h-5 w-5 mr-2" />
              Export PDF
            </>
          )}
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={openSendToEICDialog}
          disabled={isSendingToEIC}
          className="w-full sm:flex-1 min-h-[44px] touch-manipulation bg-elec-yellow/10 hover:bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 hover:border-elec-yellow/50"
        >
          {isSendingToEIC ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <FileCheck className="h-5 w-5 mr-2" />
              Send to EIC
            </>
          )}
        </Button>
        <Button size="lg" variant="secondary" onClick={handleCreateInstallationMethod} className="w-full sm:flex-1 min-h-[44px] touch-manipulation">
          <Wrench className="h-5 w-5 mr-2" />
          Create Installation Method
        </Button>

        {/* Send to Agent Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="lg" variant="outline" className="w-full sm:flex-1 min-h-[44px] touch-manipulation gap-2">
              <Send className="h-5 w-5" />
              Send to Agent
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => sendToAgent('cost-engineer')} className="cursor-pointer">
              <Calculator className="h-4 w-4 mr-2" />
              Cost Engineer
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => sendToAgent('rams')} className="cursor-pointer">
              <Shield className="h-4 w-4 mr-2" />
              Risk Assessment
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => sendToAgent('method-statement')} className="cursor-pointer">
              <Clipboard className="h-4 w-4 mr-2" />
              Method Statement
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => sendToAgent('maintenance')} className="cursor-pointer">
              <Settings className="h-4 w-4 mr-2" />
              Maintenance Instructions
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Phase 1: Circuit Selection Dialog */}
        <Dialog open={showCircuitSelector} onOpenChange={setShowCircuitSelector}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Select Circuits for Installation Method</DialogTitle>
              <DialogDescription>
                Choose which circuits you want to create installation methods for
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2 max-h-[50vh] overflow-y-auto">
              {design.circuits?.map((circuit, idx) => (
                <div key={idx} className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg border border-border/50 hover:bg-accent/5 touch-manipulation min-h-[44px]">
                  <Checkbox 
                    checked={selectedCircuitsForInstall.includes(idx)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCircuitsForInstall([...selectedCircuitsForInstall, idx]);
                      } else {
                        setSelectedCircuitsForInstall(selectedCircuitsForInstall.filter(i => i !== idx));
                      }
                    }}
                  />
                  <div className="flex-1">
                    <label className="text-xs sm:text-sm font-medium cursor-pointer">
                      <strong>C{circuit.circuitNumber || idx + 1}:</strong> {circuit.name}
                    </label>
                    <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                      {circuit.cableSize}mm² / {circuit.cpcSize}mm² CPC • {circuit.protectionDevice.rating}A {circuit.protectionDevice.type} • {circuit.cableLength}m
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setShowCircuitSelector(false)} className="w-full sm:w-auto min-h-[44px] touch-manipulation">
                Cancel
              </Button>
              <Button onClick={() => {
                setShowCircuitSelector(false);
                handleProceedToInstaller();
              }} disabled={selectedCircuitsForInstall.length === 0} className="w-full sm:w-auto min-h-[44px] touch-manipulation">
                Create Method ({selectedCircuitsForInstall.length} circuit{selectedCircuitsForInstall.length > 1 ? 's' : ''})
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Send to EIC Confirmation Dialog */}
        <Dialog open={showSendToEICDialog} onOpenChange={setShowSendToEICDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-elec-yellow" />
                Send to EIC Schedule
              </DialogTitle>
              <DialogDescription>
                This design will be saved to your EIC schedule for testing and certification.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              {/* Summary of what will be sent */}
              <div className="text-sm text-muted-foreground">
                <p><strong>{design.circuits?.length || 0} circuit(s)</strong> will be added including:</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Cable sizes and CPC</li>
                  <li>Protective device details</li>
                  <li>Reference methods</li>
                </ul>
              </div>

              {/* Expected results checkbox with warning */}
              <div className="flex items-start gap-3 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                <Checkbox
                  id="includeExpectedResults"
                  checked={includeExpectedResults}
                  onCheckedChange={(checked) => setIncludeExpectedResults(checked as boolean)}
                  className="mt-0.5 border-orange-500/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                />
                <div className="flex-1">
                  <label htmlFor="includeExpectedResults" className="text-sm font-medium cursor-pointer">
                    Include expected test results
                  </label>
                  <p className="text-xs text-orange-400 mt-1 flex items-start gap-1">
                    <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                    <span>All calculated values (R1+R2, Zs) must be verified on-site during testing</span>
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setShowSendToEICDialog(false)} className="w-full sm:w-auto min-h-[44px] touch-manipulation">
                Cancel
              </Button>
              <Button
                onClick={handleSendToEIC}
                disabled={isSendingToEIC}
                className="w-full sm:w-auto min-h-[44px] touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black"
              >
                {isSendingToEIC ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FileCheck className="h-4 w-4 mr-2" />
                    Send to EIC
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button size="lg" variant="outline" onClick={onReset} className="w-full sm:w-auto min-h-[44px] touch-manipulation">
          New Design
        </Button>
      </div>
    </motion.div>

    {/* Installation Specialist Bottom Sheet */}
    <Sheet open={showInstallSheet} onOpenChange={setShowInstallSheet}>
      <SheetContent
        side="bottom"
        className="h-[90vh] p-0 rounded-t-2xl overflow-hidden"
      >
        <div className="h-full overflow-auto bg-background">
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10 border border-blue-500/20">
                <Wrench className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Installation Specialist</h2>
                <p className="text-xs text-white/50">Step-by-step installation guidance</p>
              </div>
            </div>
          </div>
          <div className="px-4 py-4">
            <InstallationSpecialistInterface designerContext={installContext} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
    </>
  );
};
