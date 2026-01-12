import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, BarChart3, Zap, Camera, LayoutGrid, Table2, Shield, X, PenTool, FileText, Wrench, ClipboardList, ClipboardCheck, Wand2, Sparkles, MoreVertical, Layout, Table, Trash2, Grid, Pen, ChevronDown, TestTube, Mic } from 'lucide-react';
import { toast } from 'sonner';
import { TestResult } from '@/types/testResult';
import EnhancedTestResultDesktopTable from './EnhancedTestResultDesktopTable';
import MobileOptimizedTestTable from './mobile/MobileOptimizedTestTable';
import { MobileHorizontalScrollTable } from './mobile/MobileHorizontalScrollTable';
import { CircuitList } from './testing/ScheduleOfTests/CircuitList';
import MobileSmartAutoFill from './mobile/MobileSmartAutoFill';
import QuickRcdPresets from './QuickRcdPresets';
import QuickFillRcdPanel from './QuickFillRcdPanel';
import TestInstrumentInfo from './TestInstrumentInfo';
import TestMethodInfo from './TestMethodInfo';
import TestAnalytics from './TestAnalytics';
import DistributionBoardVerificationSection from './testing/DistributionBoardVerificationSection';
import SmartAutoFillPromptDialog from './SmartAutoFillPromptDialog';
import { ThreePhaseScheduleOfTests } from './eicr/ThreePhaseScheduleOfTests';

import { BoardPhotoCapture } from './testing/BoardPhotoCapture';
import { SimpleCircuitTable } from './testing/SimpleCircuitTable';
import TestResultsPhotoCapture from './testing/TestResultsPhotoCapture';
import TestResultsReviewDialog from './testing/TestResultsReviewDialog';
import ScribbleToTableDialog from './mobile/ScribbleToTableDialog';
import BulkInfillDialog from './BulkInfillDialog';
import { useOrientation } from '@/hooks/useOrientation';
import { twinAndEarthCpcFor, normaliseCableSize } from '@/utils/twinAndEarth';
import { getTableViewPreference, setTableViewPreference } from '@/utils/mobileTableUtils';
import { calculatePointsServed } from '@/types/autoFillTypes';
import { getMaxZsFromDeviceDetails } from '@/utils/zsCalculations';
import { getDefaultBsStandard } from '@/types/protectiveDeviceTypes';

interface EICRScheduleOfTestsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  onOpenBoardScan?: () => void;
}

const EICRScheduleOfTests = ({ formData, onUpdate, onOpenBoardScan }: EICRScheduleOfTestsProps) => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showAutoFillPrompt, setShowAutoFillPrompt] = useState(false);
  const [newCircuitNumber, setNewCircuitNumber] = useState('');
  
  const [showBoardCapture, setShowBoardCapture] = useState(false);
  const [detectedCircuits, setDetectedCircuits] = useState<any>(null);
  const [showAIReview, setShowAIReview] = useState(false);
  const [showTestResultsScan, setShowTestResultsScan] = useState(false);
  const [extractedTestResults, setExtractedTestResults] = useState<any>(null);
  const [showTestResultsReview, setShowTestResultsReview] = useState(false);
  const [mobileViewType, setMobileViewType] = useState<'table' | 'card'>('card'); // Default to modern card view
  const [isBulkUpdating, setIsBulkUpdating] = useState(false);
  const [showSmartAutoFillDialog, setShowSmartAutoFillDialog] = useState(false);
  const [showRcdPresetsDialog, setShowRcdPresetsDialog] = useState(false);
  const [showScribbleDialog, setShowScribbleDialog] = useState(false);
  const [showBulkInfillDialog, setShowBulkInfillDialog] = useState(false);
  const [showQuickFillPanel, setShowQuickFillPanel] = useState(false);
  const [lastDeleted, setLastDeleted] = useState<{ circuit: TestResult; index: number } | null>(null);
  const [activeToolPanel, setActiveToolPanel] = useState<'ai' | 'smart' | null>(null);
  const orientation = useOrientation();

  // Calculate completion stats for progress indicator
  const { completedCount, progressPercent, pendingCount } = useMemo(() => {
    const completed = testResults.filter(r =>
      r.zs && r.polarity && (r.insulationLiveEarth || r.insulationResistance)
    ).length;
    const percent = testResults.length > 0
      ? Math.round((completed / testResults.length) * 100)
      : 0;
    return {
      completedCount: completed,
      progressPercent: percent,
      pendingCount: testResults.length - completed
    };
  }, [testResults]);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const lastSavedHashRef = useRef('');
  const computeResultsHash = (results: TestResult[]) =>
    results
      .map((r) => `${r.id}:${r.circuitDesignation}:${r.zs}:${r.maxZs}:${r.protectiveDeviceRating}`)
      .join('|');
  
  
  // Load mobile view preference
  useEffect(() => {
    const loadViewPref = async () => {
      const pref = await getTableViewPreference();
      setMobileViewType(pref);
    };
    loadViewPref();
  }, []);
  
  // Use mobile optimized view on mobile devices in portrait mode
  const useMobileView = orientation.isMobile && !orientation.isLandscape;
  
  const toggleMobileView = () => {
    const newView = mobileViewType === 'table' ? 'card' : 'table';
    setMobileViewType(newView);
    setTableViewPreference(newView);
  };
  
  // Helper functions for intelligent defaults based on BS 7671
  const getDefaultReferenceMethod = (circuitType: string, cableSize: string): string => {
    if (!circuitType) return '';
    const type = circuitType.toLowerCase();
    if (type.includes('lighting')) return 'C';
    if (type.includes('socket') || type.includes('ring')) return 'C';
    if (type.includes('cooker') || type.includes('shower')) return 'B';
    if (type.includes('immersion')) return 'C';
    return 'C'; // Default reference method
  };

  // NOTE: We no longer use getDefaultCpcSize - replaced by twinAndEarthCpcFor utility

  // Initialize test results from form data
  useEffect(() => {
    if (formData.scheduleOfTests && formData.scheduleOfTests.length > 0) {
      setTestResults(formData.scheduleOfTests);
    } else {
      // Initial result with basic defaults
      const initialResult: TestResult = {
        id: '1',
        circuitDesignation: 'C1',
        circuitNumber: '1',
        circuitDescription: '',
        circuitType: '',
        type: '',
        referenceMethod: '',
        liveSize: '',
        cpcSize: '',
        protectiveDeviceType: '',
        protectiveDeviceRating: '',
        protectiveDeviceKaRating: '',
        protectiveDeviceLocation: '',
        bsStandard: '',
        cableSize: '',
        protectiveDevice: '',
        r1r2: '',
        r2: '',
        ringContinuityLive: '',
        ringContinuityNeutral: '',
        ringR1: '',
        ringRn: '',
        ringR2: '',
        insulationTestVoltage: '',
        insulationResistance: '',
        insulationLiveNeutral: '',
        insulationLiveEarth: '',
        insulationNeutralEarth: '',
        polarity: '',
        zs: '',
        maxZs: '',
        pointsServed: '',
        rcdRating: '',
        rcdOneX: '',
        rcdTestButton: '',
        afddTest: '',
        pfc: '',
        pfcLiveNeutral: '',
        pfcLiveEarth: '',
        functionalTesting: '',
        notes: '',
        typeOfWiring: '',
        rcdBsStandard: '',
        rcdType: '',
        rcdRatingA: ''
      };
      setTestResults([initialResult]);
      // Write initial result to formData so voice updates can apply immediately
      onUpdate('scheduleOfTests', [initialResult]);
    }
  }, []);

  // Load initial data from formData on mount only (like EIC pattern)
  useEffect(() => {
    if (Array.isArray(formData.scheduleOfTests) && formData.scheduleOfTests.length > 0) {
      const incoming = formData.scheduleOfTests as TestResult[];
      setTestResults(incoming);
    }
  }, []);

  const addTestResult = () => {
    const nextCircuitNumber = (testResults.length + 1).toString();
    setNewCircuitNumber(nextCircuitNumber);
    setShowAutoFillPrompt(true);
  };

  const handleCreateCircuit = (useAutoFill: boolean = false, circuitType?: string, suggestions?: Partial<TestResult>) => {
    const baseResult: TestResult = {
      id: crypto.randomUUID(),
      circuitDesignation: `C${newCircuitNumber}`,
      circuitNumber: newCircuitNumber,
      circuitDescription: circuitType || '',
      circuitType: circuitType || '',
      type: circuitType || '',
      referenceMethod: '',
      liveSize: '',
      cpcSize: '',
      protectiveDeviceType: '',
      protectiveDeviceRating: '',
      protectiveDeviceKaRating: '',
      protectiveDeviceLocation: '',
      bsStandard: '',
      cableSize: '',
      protectiveDevice: '',
      r1r2: '',
      r2: '',
      ringContinuityLive: '',
      ringContinuityNeutral: '',
      ringR1: '',
      ringRn: '',
      ringR2: '',
      insulationTestVoltage: '',
      insulationResistance: '',
      insulationLiveNeutral: '',
      insulationLiveEarth: '',
      insulationNeutralEarth: '',
      polarity: '',
      zs: '',
      maxZs: '',
      pointsServed: '',
      rcdRating: '',
      rcdOneX: '',
      rcdTestButton: '',
      afddTest: '',
      pfc: '',
      pfcLiveNeutral: '',
      pfcLiveEarth: '',
      functionalTesting: '',
      notes: '',
      typeOfWiring: '',
      rcdBsStandard: '',
      rcdType: '',
      rcdRatingA: ''
    };

    // Apply auto-fill suggestions if provided
    const newResult = suggestions ? {
      ...baseResult,
      ...suggestions,
      circuitDescription: circuitType || '',
      type: circuitType || '',
      autoFilled: true
    } : baseResult;

    const updatedResults = [...testResults, newResult];
    setTestResults(updatedResults);
    onUpdate('scheduleOfTests', updatedResults);
    setShowAutoFillPrompt(false);
    
    // If user chose to use auto-fill, we'll scroll to the auto-fill section
    if (useAutoFill) {
      setTimeout(() => {
        const autoFillSection = document.querySelector('[data-autofill-section]');
        if (autoFillSection) {
          autoFillSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const undoDelete = useCallback(() => {
    if (!lastDeleted) return;
    
    setTestResults(prev => {
      const updatedResults = [...prev];
      updatedResults.splice(lastDeleted.index, 0, lastDeleted.circuit);
      onUpdate('scheduleOfTests', updatedResults);
      return updatedResults;
    });
    
    setLastDeleted(null);
    toast.success('Circuit restored');
  }, [lastDeleted, onUpdate]);

  const removeTestResult = useCallback((id: string) => {
    setTestResults(prev => {
      const index = prev.findIndex(result => result.id === id);
      if (index === -1) return prev;
      
      const deletedCircuit = prev[index];
      setLastDeleted({ circuit: deletedCircuit, index });
      
      const updatedResults = prev.filter(result => result.id !== id);
      onUpdate('scheduleOfTests', updatedResults);
      
      toast.success('Circuit deleted', {
        description: `Circuit ${deletedCircuit.circuitNumber || deletedCircuit.circuitDesignation} removed`,
        action: {
          label: 'Undo',
          onClick: () => {
            setTestResults(current => {
              const restored = [...current];
              restored.splice(index, 0, deletedCircuit);
              onUpdate('scheduleOfTests', restored);
              return restored;
            });
            setLastDeleted(null);
          },
        },
      });
      
      return updatedResults;
    });
  }, [onUpdate]);


  // Auto-save after user stops typing (1 second debounce) with save loop guard
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      const nextHash = computeResultsHash(testResults);
      if (nextHash === lastSavedHashRef.current) return;
      onUpdate('scheduleOfTests', testResults);
      lastSavedHashRef.current = nextHash;
    }, 1000);
    
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [testResults, onUpdate]);

  // Save immediately when component unmounts
  useEffect(() => {
    return () => {
      onUpdate('scheduleOfTests', testResults);
    };
  }, [testResults, onUpdate]);

  const removeAllTestResults = () => {
    if (window.confirm('Are you sure you want to remove all test results? This action cannot be undone.')) {
      setTestResults([]);
      onUpdate('scheduleOfTests', []);
    }
  };

  const updateTestResult = useCallback((id: string, field: keyof TestResult, value: string) => {
    setTestResults(prev => {
      const updatedResults = prev.map(result => {
        if (result.id === id) {
          const updatedResult = { ...result, [field]: value };
          
          // Clear autoFilled flag when user manually edits
          if (result.autoFilled && field !== 'autoFilled') {
            updatedResult.autoFilled = false;
          }
          
          // Basic auto-update logic for circuit designation
          if (field === 'circuitNumber' && value) {
            updatedResult.circuitDesignation = `C${value}`;
          }
          
          // Maintain legacy field synchronisation for backward compatibility
          if (field === 'liveSize') {
            updatedResult.cableSize = value;
          } else if (field === 'protectiveDeviceRating') {
            updatedResult.protectiveDevice = value;
          } else if (field === 'cableSize') {
            updatedResult.liveSize = value;
          } else if (field === 'protectiveDevice') {
            updatedResult.protectiveDeviceRating = value.replace(/\D/g, '');
          }
          
          return updatedResult;
        }
        return result;
      });
      return updatedResults;
    });
  }, []);

  // Bulk infill handler
  const handleBulkInfill = (value: string, mode: 'all' | 'empty') => {
    const fillableFields: (keyof TestResult)[] = [
      'typeOfWiring', 'referenceMethod', 'pointsServed',
      'liveSize', 'cpcSize',
      'bsStandard', 'protectiveDeviceType', 'protectiveDeviceCurve', 
      'protectiveDeviceRating', 'protectiveDeviceKaRating', 'maxZs',
      'rcdBsStandard', 'rcdType', 'rcdRating', 'rcdRatingA',
      'ringR1', 'ringRn', 'ringR2',
      'r1r2', 'r2',
      'insulationTestVoltage', 'insulationLiveNeutral', 'insulationLiveEarth',
      'polarity', 'zs',
      'rcdOneX', 'rcdTestButton', 'afddTest',
      'pfc', 'notes'
    ];

    let updatedCount = 0;
    
    // Build updated results in a single pass
    const updatedResults = testResults.map(result => {
      let updatedResult = { ...result };
      let hasChanges = false;
      
      fillableFields.forEach(field => {
        const currentValue = result[field];
        const isEmpty = !currentValue || currentValue.toString().trim() === '';
        
        if (mode === 'all' || (mode === 'empty' && isEmpty)) {
          (updatedResult as any)[field] = value;
          updatedCount++;
          hasChanges = true;
        }
      });
      
      // Clear autoFilled flag if any changes made
      if (hasChanges && result.autoFilled) {
        updatedResult.autoFilled = false;
      }
      
      return updatedResult;
    });
    
    // Single state update
    setTestResults(updatedResults);
    onUpdate('scheduleOfTests', updatedResults);

    toast.success(`Filled ${updatedCount} fields with "${value}"`);
    setShowBulkInfillDialog(false);
  };

  // Enhanced bulk update handler for desktop auto-fill
  const handleBulkUpdate = useCallback((id: string, updates: Partial<TestResult>) => {
    setTestResults(prev => {
      const updatedResults = prev.map(result => {
        if (result.id === id) {
          const updatedResult = { ...result, ...updates };
          
          // Apply the same auto-update logic as in updateTestResult
          if (updates.circuitNumber) {
            updatedResult.circuitDesignation = `C${updates.circuitNumber}`;
          }
          
          // Maintain legacy field synchronisation for backward compatibility
          if (updates.liveSize) {
            updatedResult.cableSize = updates.liveSize;
          }
          if (updates.protectiveDeviceRating) {
            updatedResult.protectiveDevice = updates.protectiveDeviceRating;
          }
          if (updates.cableSize) {
            updatedResult.liveSize = updates.cableSize;
          }
          if (updates.protectiveDevice) {
            updatedResult.protectiveDeviceRating = updates.protectiveDevice.replace(/\D/g, '');
          }
          
          return updatedResult;
        }
        return result;
      });
      onUpdate('scheduleOfTests', updatedResults);
      return updatedResults;
    });
  }, [onUpdate]);

  // Bulk field update - sets a single field to the same value for all test results
  const handleBulkFieldUpdate = (field: keyof TestResult, value: string) => {
    setIsBulkUpdating(true);
    setTestResults(prev => {
      const updatedResults = prev.map(result => ({
        ...result,
        [field]: value,
        // Clear autoFilled flag when user makes bulk changes
        autoFilled: result.autoFilled ? false : result.autoFilled
      }));
      onUpdate('scheduleOfTests', updatedResults);
      return updatedResults;
    });
    setTimeout(() => setIsBulkUpdating(false), 100);
  };

  // Quick Fill RCD handlers
  const handleFillAllRcdBsStandard = (value: string) => {
    setIsBulkUpdating(true);
    const updatedResults = testResults.map(result => ({
      ...result,
      rcdBsStandard: value
    }));
    setTestResults(updatedResults);
    onUpdate('scheduleOfTests', updatedResults);
    setTimeout(() => setIsBulkUpdating(false), 100);
    toast.success(`Applied RCD BS Standard "${value}" to all circuits`);
  };

  const handleFillAllRcdType = (value: string) => {
    setIsBulkUpdating(true);
    const updatedResults = testResults.map(result => ({
      ...result,
      rcdType: value
    }));
    setTestResults(updatedResults);
    onUpdate('scheduleOfTests', updatedResults);
    setTimeout(() => setIsBulkUpdating(false), 100);
    toast.success(`Applied RCD Type "${value}" to all circuits`);
  };

  const handleFillAllRcdRating = (value: string) => {
    setIsBulkUpdating(true);
    const updatedResults = testResults.map(result => ({
      ...result,
      rcdRating: value
    }));
    setTestResults(updatedResults);
    onUpdate('scheduleOfTests', updatedResults);
    setTimeout(() => setIsBulkUpdating(false), 100);
    toast.success(`Applied RCD IΔn "${value}" to all circuits`);
  };

  const handleFillAllRcdRatingA = (value: string) => {
    setIsBulkUpdating(true);
    const updatedResults = testResults.map(result => ({
      ...result,
      rcdRatingA: value
    }));
    setTestResults(updatedResults);
    onUpdate('scheduleOfTests', updatedResults);
    setTimeout(() => setIsBulkUpdating(false), 100);
    toast.success(`Applied RCD Rating "${value}A" to all circuits`);
  };

  // Utility function to fix protective device terminology
  const fixProtectiveDeviceType = (type: string): string => {
    if (!type) return type;
    
    // Map Type 1/2/3 to Type B/C/D (UK standard)
    if (type.includes('Type 1') || type.includes('Type1')) {
      return type.replace(/Type ?1/gi, 'Type B');
    }
    if (type.includes('Type 2') || type.includes('Type2')) {
      return type.replace(/Type ?2/gi, 'Type C');
    }
    if (type.includes('Type 3') || type.includes('Type3')) {
      return type.replace(/Type ?3/gi, 'Type D');
    }
    return type;
  };

  // AI Photo Analysis Handlers
  const handleAIAnalysisComplete = (data: any) => {
    setDetectedCircuits(data);
    setShowBoardCapture(false);
    setShowAIReview(true);
  };

  // Test Results Scanner Handlers
  const handleTestResultsAnalysisComplete = (data: any) => {
    setExtractedTestResults(data);
    setShowTestResultsScan(false);
    setShowTestResultsReview(true);
  };

  const handleAcceptTestResults = (selectedCircuits: any[]) => {
    // Transform extracted test results to TestResult format
    const transformedResults = selectedCircuits.map((circuit, index) => {
      const nextId = (testResults.length + index + 1).toString();
      // Use the circuit_reference from AI if available, otherwise generate one
      const circuitRef = circuit.circuit_reference || `C${testResults.length + index + 1}`;

      // Derive combined BS Standard (e.g., "MCB (BS EN 60898)")
      const incomingType: string = circuit.protective_device?.type || '';
      const upper = incomingType.toUpperCase();
      const baseType = upper.includes('RCBO') ? 'RCBO' : upper.includes('RCD') ? 'RCD' : upper.includes('MCB') ? 'MCB' : upper.includes('FUSE') ? 'Fuse' : incomingType;
      const incomingBs: string = circuit.protective_device?.bs_standard || '';
      const bsFromType = getDefaultBsStandard(baseType || 'MCB');
      const finalBs = incomingBs && incomingBs.includes('(') ? incomingBs : (bsFromType || incomingBs);

      return {
        id: nextId,
        circuitNumber: circuitRef,
        circuitDesignation: circuitRef,
        circuitDescription: circuit.circuit_description || '',
        circuitType: circuit.circuit_type || '',
        type: circuit.circuit_type || '',
        referenceMethod: '',
        liveSize: circuit.conductor_sizes?.live || '',
        cpcSize: circuit.conductor_sizes?.cpc || '',
        protectiveDeviceType: circuit.protective_device?.type || '',
        protectiveDeviceRating: circuit.protective_device?.rating || '',
        protectiveDeviceCurve: circuit.protective_device?.curve || '',
        protectiveDeviceKaRating: circuit.protective_device?.ka_rating || '',
        protectiveDeviceLocation: circuit.protective_device?.location || '',
        bsStandard: finalBs,
        rcdBsStandard: circuit.protective_device?.rcd_details?.bs_standard || '',
        rcdType: circuit.protective_device?.rcd_details?.rcd_type || '',
        rcdRatingA: circuit.protective_device?.rcd_details?.rating_a || '',
        cableSize: circuit.conductor_sizes?.live || '',
        protectiveDevice: circuit.protective_device?.rating || '',
        r1r2: circuit.tests?.r1_r2?.value || '',
        r2: '',
        ringContinuityLive: circuit.tests?.ring_continuity_live?.value || '',
        ringContinuityNeutral: circuit.tests?.ring_continuity_neutral?.value || '',
        ringR1: circuit.tests?.ring_r1_live?.value || '',
        ringRn: circuit.tests?.ring_rn_neutral?.value || '',
        ringR2: circuit.tests?.ring_r2_cpc?.value || '',
        insulationTestVoltage: circuit.tests?.insulation_resistance?.test_voltage || '500',
        insulationResistance: circuit.tests?.insulation_resistance?.value || '',
        insulationLiveNeutral: circuit.tests?.insulation_live_neutral?.value || '',
        insulationLiveEarth: circuit.tests?.insulation_live_earth?.value || '',
        insulationNeutralEarth: circuit.tests?.insulation_neutral_earth?.value || '',
        polarity: circuit.tests?.polarity?.result || '',
        zs: circuit.tests?.zs?.value || '',
        maxZs: circuit.tests?.zs?.max_zs || '',
        pointsServed: circuit.points_served || '',
        rcdRating: circuit.tests?.rcd_rating || '',
        rcdOneX: circuit.tests?.rcd_trip_time?.value || '',
        rcdTestButton: circuit.tests?.rcd_test_button || '',
        afddTest: circuit.tests?.afdd_test || '',
        pfc: circuit.tests?.pfc?.value || '',
        pfcLiveNeutral: circuit.tests?.pfc_live_neutral?.value || '',
        pfcLiveEarth: circuit.tests?.pfc_live_earth?.value || '',
        functionalTesting: circuit.tests?.functional_testing || '',
        notes: `AI detected from test results (${circuit.confidence} confidence) - Please verify. ${circuit.notes || ''}`.trim(),
        autoFilled: true
      };
    });

    // Add to existing test results
    const updatedResults = [...testResults, ...transformedResults];
    setTestResults(updatedResults);
    onUpdate('scheduleOfTests', updatedResults);
    setShowTestResultsReview(false);
    setExtractedTestResults(null);
  };


  // Helper to check if a row is blank
  const isBlankRow = (result: TestResult): boolean => {
    return !result.circuitDescription && 
           !result.protectiveDeviceType && 
           !result.protectiveDeviceRating &&
           !result.liveSize;
  };

  // Normalise AI circuit values to match UI Select options
  const normaliseAICircuit = (circuit: any) => {

    // Normalise reference method to single letter
    const normaliseReferenceMethod = (method: string): string => {
      if (!method) return 'C';
      if (method.includes('103') || method.toLowerCase().includes('stud wall')) return 'B';
      if (method.includes('C') || method.toLowerCase().includes('clipped')) return 'C';
      if (method.includes('A')) return 'A';
      return 'C'; // Default
    };

    // Extract base protective device type (MCB Type B → MCB)
    const getDeviceBaseType = (type: string): string => {
      if (!type) return '';
      const upper = type.toUpperCase();
      if (upper.includes('RCBO')) return 'RCBO';
      if (upper.includes('RCD')) return 'RCD';
      if (upper.includes('MCB')) return 'MCB';
      if (upper.includes('FUSE')) return 'Fuse';
      return type;
    };

    // Get BS Standard based on device type
    const getBsStandard = (deviceType: string): string => {
      const upper = deviceType.toUpperCase();
      if (upper.includes('MCB')) return 'BS EN 60898';
      if (upper.includes('RCBO')) return 'BS EN 61009';
      if (upper.includes('RCD')) return 'BS EN 61008';
      if (upper.includes('FUSE')) return 'BS 1361';
      return 'BS EN 60898';
    };

    // Extract numeric rating: 6A → 6, 16A → 16
    const normaliseRating = (rating: string): string => {
      if (!rating) return '';
      return rating.replace(/[^\d]/g, '');
    };

    const deviceType = fixProtectiveDeviceType(circuit.protectiveDeviceType || '');
    const baseDeviceType = getDeviceBaseType(deviceType);
    
    // Normalise live size and ALWAYS apply correct T&E CPC sizing
    const canonicalLiveSize = normaliseCableSize(circuit.liveSize || '');
    const correctCpcSize = twinAndEarthCpcFor(canonicalLiveSize);
    const combinedBs = getDefaultBsStandard(baseDeviceType);
    
    return {
      ...circuit,
      liveSize: canonicalLiveSize,
      cpcSize: correctCpcSize, // Always use correct T&E CPC, ignoring AI's value
      referenceMethod: normaliseReferenceMethod(circuit.referenceMethod || ''),
      protectiveDeviceType: baseDeviceType,
      protectiveDeviceCurve: circuit.protectiveDeviceCurve || circuit.curve || '',
      protectiveDeviceRating: normaliseRating(circuit.protectiveDeviceRating || ''),
      protectiveDeviceKaRating: circuit.protectiveDeviceKaRating || '6kA',
      bsStandard: circuit.bsStandard && circuit.bsStandard.includes('(') ? circuit.bsStandard : combinedBs
    };
  };

  // Calculate maxZs from device details (with 80% derating applied)
  const calculateMaxZsForCircuit = (
    bsStandard: string, 
    curve: string, 
    rating: string
  ): string => {
    if (!bsStandard || !rating) return '';
    
    const maxZs = getMaxZsFromDeviceDetails(bsStandard, curve, rating);
    return maxZs !== null ? maxZs.toFixed(2) : '';
  };

  // Convert Circuit[] format from SimpleCircuitTable to TestResult format
  const convertCircuitsToTestResults = (circuits: any[]): any[] => {
    return circuits.map(circuit => {
      // Use helper function to get correct full BS standard format
      const bsStandard = getDefaultBsStandard(circuit.device || 'MCB');

      return {
        circuitDescription: circuit.label || '',
        protectiveDeviceType: circuit.device || 'MCB',
        protectiveDeviceCurve: circuit.curve || '',
        protectiveDeviceRating: circuit.rating?.toString() || '',
        bsStandard: bsStandard,
        circuitType: circuit.label?.toLowerCase().includes('socket') ? 'Sockets' : 
                     circuit.label?.toLowerCase().includes('light') ? 'Lighting' : '',
        liveSize: circuit.liveConductorSize || (circuit.rating && circuit.rating <= 10 ? '1.5' :
                  circuit.rating && circuit.rating <= 20 ? '2.5' :
                  circuit.rating && circuit.rating <= 32 ? '4.0' : '2.5'),
        cpcSize: circuit.cpcSize || '',
        referenceMethod: 'C',
        protectiveDeviceKaRating: circuit.kaRating || '6kA',
        confidence: circuit.confidence,
      };
    });
  };

  const handleApplyAICircuitsFromTable = (circuits: any[]) => {
    const converted = convertCircuitsToTestResults(circuits);
    handleApplyAICircuits(converted);
  };

  const handleApplyAICircuits = (selectedCircuits: any[]) => {
    // Find blank rows to fill first
    const blankIndices: number[] = [];
    testResults.forEach((result, idx) => {
      if (isBlankRow(result)) {
        blankIndices.push(idx);
      }
    });

    const updatedResults = [...testResults];
    const remainingCircuits: any[] = [];

    selectedCircuits.forEach((circuit, circuitIdx) => {
      const normalisedCircuit = normaliseAICircuit(circuit);
      
      // If we have a blank slot, fill it
      if (blankIndices.length > 0) {
        const blankIdx = blankIndices.shift()!;
        const existingResult = updatedResults[blankIdx];
        const circuitNumber = existingResult.circuitNumber;
        
        const liveSize = normalisedCircuit.liveSize;
        const circuitType = normalisedCircuit.circuitType || '';
        const circuitDesc = normalisedCircuit.circuitDescription || '';
        
        // Circuit type detection
        const isRingCircuit = circuitType.toLowerCase().includes('ring');
        const isLightingCircuit = circuitType.toLowerCase().includes('lighting') || 
                                   circuitDesc.toLowerCase().includes('light');
        const isSocketCircuit = circuitType.toLowerCase().includes('socket');
        const isBathroomCircuit = circuitDesc.toLowerCase().includes('bathroom');
        const isOutdoorCircuit = circuitDesc.toLowerCase().includes('outdoor') || 
                                  circuitDesc.toLowerCase().includes('garden');
        
        const isRCBOOrRCD = normalisedCircuit.protectiveDeviceType.toUpperCase().includes('RCD') || 
                            normalisedCircuit.protectiveDeviceType.toUpperCase().includes('RCBO');
        const requiresRCD = isSocketCircuit || isBathroomCircuit || isOutdoorCircuit || isRCBOOrRCD;
        
        updatedResults[blankIdx] = {
          ...existingResult,
          circuitDescription: circuitDesc,
          circuitType: circuitType,
          type: circuitType,
          referenceMethod: normalisedCircuit.referenceMethod,
          liveSize: liveSize,
          cpcSize: normalisedCircuit.cpcSize, // Already corrected by normaliseAICircuit
          protectiveDeviceType: normalisedCircuit.protectiveDeviceType,
          protectiveDeviceCurve: normalisedCircuit.protectiveDeviceCurve || '',
          protectiveDeviceRating: normalisedCircuit.protectiveDeviceRating,
          protectiveDeviceKaRating: normalisedCircuit.protectiveDeviceKaRating,
          protectiveDeviceLocation: 'Consumer Unit',
          bsStandard: normalisedCircuit.bsStandard,
          cableSize: liveSize,
          protectiveDevice: `${normalisedCircuit.protectiveDeviceType} ${normalisedCircuit.protectiveDeviceRating}`.trim(),
          maxZs: calculateMaxZsForCircuit(
            normalisedCircuit.bsStandard,
            normalisedCircuit.protectiveDeviceCurve,
            normalisedCircuit.protectiveDeviceRating
          ),
          ringContinuityLive: isRingCircuit ? '' : 'N/A',
          ringContinuityNeutral: isRingCircuit ? '' : 'N/A',
          insulationTestVoltage: '500V',
          polarity: 'Satisfactory',
          pointsServed: calculatePointsServed(circuitDesc, circuitType, normalisedCircuit.protectiveDeviceType),
          rcdRating: requiresRCD ? '30mA' : '',
          functionalTesting: 'Satisfactory',
          notes: `AI detected (${circuit.confidence || 'unknown'} confidence) - Please verify all values`,
          autoFilled: true
        };
      } else {
        // No blank slots, add to remaining
        remainingCircuits.push(normalisedCircuit);
      }
    });

    // Append remaining circuits that didn't fit in blank slots
    remainingCircuits.forEach((circuit, index) => {
      const circuitNumber = (updatedResults.length + 1).toString();
      const liveSize = circuit.liveSize;
      const circuitType = circuit.circuitType || '';
      const circuitDesc = circuit.circuitDescription || '';
      
      const isRingCircuit = circuitType.toLowerCase().includes('ring');
      const isLightingCircuit = circuitType.toLowerCase().includes('lighting') || 
                                 circuitDesc.toLowerCase().includes('light');
      const isSocketCircuit = circuitType.toLowerCase().includes('socket');
      const isBathroomCircuit = circuitDesc.toLowerCase().includes('bathroom');
      const isOutdoorCircuit = circuitDesc.toLowerCase().includes('outdoor') || 
                                circuitDesc.toLowerCase().includes('garden');
      
      const isRCBOOrRCD = circuit.protectiveDeviceType.toUpperCase().includes('RCD') || 
                          circuit.protectiveDeviceType.toUpperCase().includes('RCBO');
      const requiresRCD = isSocketCircuit || isBathroomCircuit || isOutdoorCircuit || isRCBOOrRCD;
      
      const newResult: TestResult = {
        id: crypto.randomUUID(),
        circuitNumber: circuitNumber,
        circuitDesignation: `C${circuitNumber}`,
        circuitDescription: circuitDesc,
        circuitType: circuitType,
        type: circuitType,
        referenceMethod: circuit.referenceMethod,
        liveSize: liveSize,
        cpcSize: circuit.cpcSize, // Already corrected by normaliseAICircuit
        protectiveDeviceType: circuit.protectiveDeviceType,
        protectiveDeviceCurve: circuit.protectiveDeviceCurve || '',
        protectiveDeviceRating: circuit.protectiveDeviceRating,
        protectiveDeviceKaRating: circuit.protectiveDeviceKaRating,
        protectiveDeviceLocation: 'Consumer Unit',
        bsStandard: circuit.bsStandard,
        cableSize: liveSize,
        protectiveDevice: `${circuit.protectiveDeviceType} ${circuit.protectiveDeviceRating}`.trim(),
        r1r2: '',
        r2: '',
        ringContinuityLive: isRingCircuit ? '' : 'N/A',
        ringContinuityNeutral: isRingCircuit ? '' : 'N/A',
        ringR1: isRingCircuit ? '' : 'N/A',
        ringRn: isRingCircuit ? '' : 'N/A',
        ringR2: isRingCircuit ? '' : 'N/A',
        insulationTestVoltage: '500V',
        insulationResistance: '',
        insulationLiveNeutral: '',
        insulationLiveEarth: '',
        insulationNeutralEarth: '',
        polarity: 'Satisfactory',
        zs: '',
        maxZs: calculateMaxZsForCircuit(
          circuit.bsStandard,
          circuit.protectiveDeviceCurve,
          circuit.protectiveDeviceRating
        ),
        pointsServed: calculatePointsServed(circuitDesc, circuitType, circuit.protectiveDeviceType),
        rcdRating: requiresRCD ? '30mA' : '',
        rcdOneX: '',
        rcdTestButton: '',
        afddTest: '',
        pfc: '',
        pfcLiveNeutral: '',
        pfcLiveEarth: '',
        functionalTesting: 'Satisfactory',
        notes: `AI detected (${circuit.confidence || 'unknown'} confidence) - Please verify all values`,
        autoFilled: true,
        typeOfWiring: '',
        rcdBsStandard: '',
        rcdType: '',
        rcdRatingA: ''
      };
      updatedResults.push(newResult);
    });

    setTestResults(updatedResults);
    onUpdate('scheduleOfTests', updatedResults);
    setShowAIReview(false);
    setDetectedCircuits([]);
  };

  return (
    <div className="pb-20 lg:pb-4">
      {/* MOBILE FULL-WIDTH LAYOUT - Native iOS Feel */}
      {useMobileView ? (
        <div className="min-h-screen bg-background">
          {/* Hero Section with Progress */}
          <div className="testing-hero mx-2 mt-2 p-4">
            <div className="relative z-10">
              {/* Title Row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-elec-yellow/20 border border-elec-yellow/30">
                    <TestTube className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Circuit Testing</h2>
                    <p className="text-xs text-white/50">
                      {testResults.length} circuits • {completedCount} complete
                    </p>
                  </div>
                </div>
                {/* Settings Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-white/60 hover:text-white hover:bg-white/10">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-card border-border">
                    <DropdownMenuItem onClick={() => setShowQuickFillPanel(true)}>
                      <Zap className="mr-2 h-4 w-4" />
                      Quick Fill RCD
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={removeAllTestResults} className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear All Circuits
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Progress Bar */}
              <div className="testing-progress-bar mt-3">
                <div className="testing-progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>
              <div className="flex justify-between mt-1.5 text-xs">
                <span className="text-white/40">Progress</span>
                <span className="font-semibold text-elec-yellow">{progressPercent}%</span>
              </div>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="px-4 py-3 space-y-2">
            {/* Main Action Row */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                className="testing-action-primary"
                onClick={() => onOpenBoardScan ? onOpenBoardScan() : setShowBoardCapture(true)}
              >
                <Camera className="h-4 w-4 mr-2" />
                AI Scan
              </Button>
              <Button className="testing-action-secondary" onClick={addTestResult}>
                <Plus className="h-4 w-4 mr-2" />
                Add Circuit
              </Button>
            </div>
            {/* Voice Assistant - Prominent */}
            <Button
              className="w-full h-12 rounded-lg font-medium transition-all duration-200 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/30 border border-purple-400/30"
              onClick={() => toast.info('Voice assistant coming soon', { description: 'Eleven Labs integration in progress', duration: 2000 })}
            >
              <Mic className="h-5 w-5 mr-2" />
              Voice Assistant
            </Button>
          </div>

          {/* Segmented Control for Tools */}
          <div className="px-4 pb-3">
            <div className="testing-segment-control">
              <button
                className="testing-segment-button"
                data-active={activeToolPanel === 'ai'}
                onClick={() => setActiveToolPanel(activeToolPanel === 'ai' ? null : 'ai')}
              >
                <Wand2 className="h-3.5 w-3.5" />
                AI
              </button>
              <button
                className="testing-segment-button"
                data-active={activeToolPanel === 'smart'}
                onClick={() => setActiveToolPanel(activeToolPanel === 'smart' ? null : 'smart')}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Smart
              </button>
              <button
                className="testing-segment-button"
                data-active={showAnalytics}
                onClick={() => setShowAnalytics(!showAnalytics)}
              >
                <BarChart3 className="h-3.5 w-3.5" />
                Stats
              </button>
            </div>

            {/* AI Tools Panel */}
            {activeToolPanel === 'ai' && (
              <div className="testing-tool-panel">
                <Button
                  variant="ghost"
                  className="testing-tool-button"
                  onClick={() => { setShowTestResultsScan(true); setActiveToolPanel(null); }}
                >
                  <FileText className="h-4 w-4 mr-3" />
                  AI Scan Test Results
                </Button>
                <Button
                  variant="ghost"
                  className="testing-tool-button"
                  onClick={() => { setShowScribbleDialog(true); setActiveToolPanel(null); }}
                >
                  <Pen className="h-4 w-4 mr-3" />
                  Scribble to Table
                </Button>
              </div>
            )}

            {/* Smart Tools Panel */}
            {activeToolPanel === 'smart' && (
              <div className="testing-tool-panel">
                <Button
                  variant="ghost"
                  className="testing-tool-button"
                  onClick={() => { setShowSmartAutoFillDialog(true); setActiveToolPanel(null); }}
                >
                  <Zap className="h-4 w-4 mr-3" />
                  Smart Auto-Fill
                </Button>
                <Button
                  variant="ghost"
                  className="testing-tool-button"
                  onClick={() => { setShowRcdPresetsDialog(true); setActiveToolPanel(null); }}
                >
                  <Shield className="h-4 w-4 mr-3" />
                  Quick RCD Presets
                </Button>
                <Button
                  variant="ghost"
                  className="testing-tool-button"
                  onClick={() => { setShowBulkInfillDialog(true); setActiveToolPanel(null); }}
                >
                  <Grid className="h-4 w-4 mr-3" />
                  Bulk Infill
                </Button>
              </div>
            )}

            {/* Analytics Panel */}
            {showAnalytics && testResults.length > 0 && (
              <div className="testing-tool-panel">
                <TestAnalytics testResults={testResults} />
              </div>
            )}
          </div>

          {/* View Toggle + Circuit Count */}
          <div className="px-4 pb-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {testResults.length} {testResults.length === 1 ? 'circuit' : 'circuits'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileView}
              className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
            >
              {mobileViewType === 'table' ? <Layout className="h-3.5 w-3.5" /> : <Table className="h-3.5 w-3.5" />}
              {mobileViewType === 'table' ? 'Cards' : 'Table'}
            </Button>
          </div>

          {/* Circuit List/Table */}
          <div className="px-2 pb-4">
            {mobileViewType === 'table' ? (
              <MobileHorizontalScrollTable
                testResults={testResults}
                onUpdate={updateTestResult}
                onRemove={removeTestResult}
                onBulkUpdate={handleBulkUpdate}
                onBulkFieldUpdate={handleBulkFieldUpdate}
              />
            ) : (
              <CircuitList
                circuits={testResults}
                onUpdate={updateTestResult}
                onRemove={removeTestResult}
                onBulkUpdate={handleBulkUpdate}
                viewMode="card"
                className="px-0"
              />
            )}
          </div>
        </div>
      ) : (
        /* DESKTOP LAYOUT - Premium Professional Dashboard */
        <div className="w-full space-y-6 py-6">
          {/* Hero Card */}
          <div className="testing-hero p-6">
            <div className="relative z-10">
              {/* Header Row */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-elec-yellow/20 border border-elec-yellow/30">
                    <TestTube className="h-8 w-8 text-elec-yellow" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Schedule of Tests</h2>
                    <p className="text-sm text-white/60">
                      BS 7671 compliant circuit testing & verification
                    </p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="flex gap-3">
                  <div className="testing-stat-card min-w-[80px]">
                    <span className="text-2xl font-bold text-white">{testResults.length}</span>
                    <span className="text-xs text-white/50">Circuits</span>
                  </div>
                  <div className="testing-stat-card min-w-[80px]">
                    <span className="text-2xl font-bold text-green-400">{completedCount}</span>
                    <span className="text-xs text-white/50">Complete</span>
                  </div>
                  <div className="testing-stat-card min-w-[80px]">
                    <span className="text-2xl font-bold text-amber-400">{pendingCount}</span>
                    <span className="text-xs text-white/50">Pending</span>
                  </div>
                  <div className="testing-stat-card min-w-[80px]">
                    <span className="text-2xl font-bold text-elec-yellow">{progressPercent}%</span>
                    <span className="text-xs text-white/50">Progress</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-6 gap-3">
                <Button
                  className="testing-action-primary col-span-2"
                  onClick={() => onOpenBoardScan ? onOpenBoardScan() : setShowBoardCapture(true)}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  AI Board Scan
                </Button>
                <Button
                  className="col-span-2 h-11 rounded-lg font-medium transition-all duration-200 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20 border border-purple-400/30"
                  onClick={() => toast.info('Voice assistant coming soon', { description: 'Eleven Labs integration in progress', duration: 2000 })}
                >
                  <Mic className="h-4 w-4 mr-2" />
                  Voice Assistant
                </Button>
                <Button className="testing-action-secondary col-span-2" onClick={addTestResult}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Circuit
                </Button>
              </div>

              {/* Secondary Tools Row */}
              <div className="grid grid-cols-4 gap-2 mt-3">
                <Button className="testing-action-secondary" onClick={() => setShowTestResultsScan(true)}>
                  <FileText className="h-4 w-4 mr-2" />
                  Scan Results
                </Button>
                <Button className="testing-action-secondary" onClick={() => setShowScribbleDialog(true)}>
                  <PenTool className="h-4 w-4 mr-2" />
                  Text to Circuits
                </Button>
                <Button className="testing-action-secondary" onClick={() => setShowSmartAutoFillDialog(true)}>
                  <Zap className="h-4 w-4 mr-2" />
                  Smart Fill
                </Button>
                <Button className="testing-action-secondary" onClick={() => setShowBulkInfillDialog(true)}>
                  <ClipboardCheck className="h-4 w-4 mr-2" />
                  Bulk Infill
                </Button>
              </div>

              {/* Secondary Actions Row */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 text-white/60 hover:text-white hover:bg-white/10"
                    onClick={() => setShowRcdPresetsDialog(true)}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    RCD Presets
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 text-white/60 hover:text-white hover:bg-white/10"
                    onClick={() => setShowAnalytics(!showAnalytics)}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics
                  </Button>
                </div>
                {testResults.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    onClick={removeAllTestResults}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Analytics Section */}
          {showAnalytics && testResults.length > 0 && (
            <div className="testing-table-container p-4">
              <TestAnalytics testResults={testResults} />
            </div>
          )}

          {/* Table Container */}
          <div className="testing-table-container" data-autofill-section>
            <EnhancedTestResultDesktopTable
              testResults={testResults}
              onUpdate={updateTestResult}
              onRemove={removeTestResult}
              allResults={testResults}
              onBulkUpdate={handleBulkUpdate}
              onAddCircuit={addTestResult}
              onBulkFieldUpdate={handleBulkFieldUpdate}
            />
          </div>
        </div>
      )}

      {/* THREE-PHASE ANALYSIS SECTION - Shows when 3P circuits detected */}
      {(formData.phases === 'three' || formData.phases === '3' || formData.supplyPhases === 'three' || testResults.some(r => r.phaseType === '3P')) && (
        <div className="w-full mt-6">
          <ThreePhaseScheduleOfTests
            testResults={testResults}
            onUpdateResult={updateTestResult}
            autoDetect={true}
          />
        </div>
      )}

      {/* SHARED INFO SECTIONS - Responsive Layout */}
      {useMobileView ? (
        /* Mobile: Collapsible Accordions */
        <div className="px-4 pb-24 space-y-2 mt-4">
          {/* Test Instrument Info */}
          <div className="testing-info-section">
            <Collapsible>
              <CollapsibleTrigger asChild>
                <button className="testing-info-header">
                  <span className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-elec-yellow" />
                    Test Instruments
                  </span>
                  <ChevronDown className="h-4 w-4 text-white/50 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4">
                <TestInstrumentInfo formData={formData} onUpdate={onUpdate} />
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Distribution Board Verification */}
          <div className="testing-info-section">
            <Collapsible>
              <CollapsibleTrigger asChild>
                <button className="testing-info-header">
                  <span className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-elec-yellow" />
                    Distribution Board
                  </span>
                  <ChevronDown className="h-4 w-4 text-white/50 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4">
                <DistributionBoardVerificationSection
                  data={{
                    dbReference: formData.dbReference || '',
                    zdb: formData.zdb || '',
                    ipf: formData.ipf || '',
                    confirmedCorrectPolarity: formData.confirmedCorrectPolarity || false,
                    confirmedPhaseSequence: formData.confirmedPhaseSequence || false,
                    spdOperationalStatus: formData.spdOperationalStatus || false,
                    spdNA: formData.spdNA || false,
                  }}
                  onUpdate={(field, value) => onUpdate(field, value)}
                />
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Test Method & Notes */}
          <div className="testing-info-section">
            <Collapsible>
              <CollapsibleTrigger asChild>
                <button className="testing-info-header">
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-elec-yellow" />
                    Test Method & Notes
                  </span>
                  <ChevronDown className="h-4 w-4 text-white/50 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4">
                <TestMethodInfo formData={formData} onUpdate={onUpdate} />
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      ) : (
        /* Desktop: Horizontal Card Grid */
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="testing-info-section p-4">
            <h3 className="text-sm font-semibold text-white/90 flex items-center gap-2 mb-4">
              <Wrench className="h-4 w-4 text-elec-yellow" />
              Test Instruments
            </h3>
            <TestInstrumentInfo formData={formData} onUpdate={onUpdate} />
          </div>

          <div className="testing-info-section p-4">
            <h3 className="text-sm font-semibold text-white/90 flex items-center gap-2 mb-4">
              <Zap className="h-4 w-4 text-elec-yellow" />
              Distribution Board
            </h3>
            <DistributionBoardVerificationSection
              data={{
                dbReference: formData.dbReference || '',
                zdb: formData.zdb || '',
                ipf: formData.ipf || '',
                confirmedCorrectPolarity: formData.confirmedCorrectPolarity || false,
                confirmedPhaseSequence: formData.confirmedPhaseSequence || false,
                spdOperationalStatus: formData.spdOperationalStatus || false,
                spdNA: formData.spdNA || false,
              }}
              onUpdate={(field, value) => onUpdate(field, value)}
            />
          </div>

          <div className="testing-info-section p-4">
            <h3 className="text-sm font-semibold text-white/90 flex items-center gap-2 mb-4">
              <FileText className="h-4 w-4 text-elec-yellow" />
              Test Method & Notes
            </h3>
            <TestMethodInfo formData={formData} onUpdate={onUpdate} />
          </div>
        </div>
      )}

      {/* Quick Fill RCD Panel Dialog */}
      {showQuickFillPanel && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Quick Fill RCD Details</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowQuickFillPanel(false)}
              className="h-9 w-9 p-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <QuickFillRcdPanel
              onFillAllRcdBsStandard={handleFillAllRcdBsStandard}
              onFillAllRcdType={handleFillAllRcdType}
              onFillAllRcdRating={handleFillAllRcdRating}
              onFillAllRcdRatingA={handleFillAllRcdRatingA}
            />
          </div>
        </div>
      )}

      {/* SHARED DIALOGS - Tool Sheet Pattern */}
      {/* AI Board Photo Capture */}
      {showBoardCapture && (
        <>
          <div className="tool-sheet-overlay" onClick={() => setShowBoardCapture(false)} />
          <div className="tool-sheet-container">
            <div className="tool-sheet-handle md:hidden" />
            <div className="tool-sheet-header">
              <div className="tool-sheet-title">
                <Camera className="h-5 w-5 text-elec-yellow" />
                AI Board Scanner
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowBoardCapture(false)} className="text-white/70 hover:text-white hover:bg-white/10">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="tool-sheet-content">
              <BoardPhotoCapture
                onAnalysisComplete={handleAIAnalysisComplete}
                onClose={() => setShowBoardCapture(false)}
                renderContentOnly={true}
              />
            </div>
          </div>
        </>
      )}

      {/* Test Results Photo Capture */}
      {showTestResultsScan && (
        <>
          <div className="tool-sheet-overlay" onClick={() => setShowTestResultsScan(false)} />
          <div className="tool-sheet-container">
            <div className="tool-sheet-handle md:hidden" />
            <div className="tool-sheet-header">
              <div className="tool-sheet-title">
                <FileText className="h-5 w-5 text-elec-yellow" />
                AI Test Results Scanner
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowTestResultsScan(false)} className="text-white/70 hover:text-white hover:bg-white/10">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="tool-sheet-content">
              <TestResultsPhotoCapture
                onAnalysisComplete={handleTestResultsAnalysisComplete}
                onClose={() => setShowTestResultsScan(false)}
              />
            </div>
          </div>
        </>
      )}

      {/* AI Circuit Review */}
      {showAIReview && detectedCircuits && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="max-h-[90vh] overflow-auto w-full">
            <SimpleCircuitTable
              circuits={detectedCircuits.circuits || []}
              board={detectedCircuits.board || { make: 'Unknown', model: 'Unknown', mainSwitch: 'Unknown', spd: 'Unknown', totalWays: 0 }}
              onApply={handleApplyAICircuitsFromTable}
              onClose={() => {
                setShowAIReview(false);
                setDetectedCircuits(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Test Results Review Dialog */}
      {showTestResultsReview && extractedTestResults && (
        <TestResultsReviewDialog
          open={showTestResultsReview}
          onClose={() => {
            setShowTestResultsReview(false);
            setExtractedTestResults(null);
          }}
          extractedData={extractedTestResults}
          onAccept={handleAcceptTestResults}
        />
      )}

      {/* Smart Auto-Fill Prompt Dialog */}
      <SmartAutoFillPromptDialog
        open={showAutoFillPrompt}
        onOpenChange={setShowAutoFillPrompt}
        onUseAutoFill={(circuitType, suggestions) => handleCreateCircuit(true, circuitType, suggestions)}
        onSkip={() => handleCreateCircuit(false)}
        circuitNumber={newCircuitNumber}
      />

      {/* Smart Auto-Fill Dialog */}
      {showSmartAutoFillDialog && (
        <>
          <div className="tool-sheet-overlay" onClick={() => setShowSmartAutoFillDialog(false)} />
          <div className="tool-sheet-container">
            <div className="tool-sheet-handle md:hidden" />
            <div className="tool-sheet-header">
              <div className="tool-sheet-title">
                <Sparkles className="h-5 w-5 text-elec-yellow" />
                Smart Circuit Auto-Fill
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowSmartAutoFillDialog(false)} className="text-white/70 hover:text-white hover:bg-white/10">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="tool-sheet-content">
              <MobileSmartAutoFill
                testResults={testResults}
                onUpdate={handleBulkUpdate}
              />
            </div>
          </div>
        </>
      )}

      {/* RCD Presets Dialog */}
      {showRcdPresetsDialog && (
        <>
          <div className="tool-sheet-overlay" onClick={() => setShowRcdPresetsDialog(false)} />
          <div className="tool-sheet-container">
            <div className="tool-sheet-handle md:hidden" />
            <div className="tool-sheet-header">
              <div className="tool-sheet-title">
                <Zap className="h-5 w-5 text-elec-yellow" />
                Quick RCD Presets
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowRcdPresetsDialog(false)} className="text-white/70 hover:text-white hover:bg-white/10">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="tool-sheet-content">
              <QuickRcdPresets
                testResults={testResults.map(r => ({ id: r.id, circuitDesignation: r.circuitDesignation }))}
                onApplyToCircuits={(circuitIds, preset) => {
                  // Batch update all circuits at once
                  const updatedResults = testResults.map(result => {
                    if (circuitIds.includes(result.id)) {
                      return {
                        ...result,
                        rcdBsStandard: preset.bsStandard,
                        rcdType: preset.type,
                        rcdRating: preset.rating,
                        rcdRatingA: preset.ratingA,
                      };
                    }
                    return result;
                  });

                  setTestResults(updatedResults);
                  onUpdate('scheduleOfTests', updatedResults);
                  setShowRcdPresetsDialog(false);

                  // Show success toast
                  toast.success(`✓ ${preset.label} Applied`, {
                    description: `RCD details set for ${circuitIds.length} circuit${circuitIds.length > 1 ? 's' : ''}`,
                    duration: 2000,
                  });
                }}
              />
            </div>
          </div>
        </>
      )}

      {/* Scribble to Table Dialog - Mobile Only */}
      {showScribbleDialog && (
        <ScribbleToTableDialog
          onCircuitsAdded={(newCircuits) => {
            const updatedResults = [...testResults, ...newCircuits];
            setTestResults(updatedResults);
            onUpdate('scheduleOfTests', updatedResults);
            setShowScribbleDialog(false);
            toast.success('Circuits Added', {
              description: `Successfully added ${newCircuits.length} circuit(s) from text`,
              duration: 2000,
            });
          }}
          onClose={() => setShowScribbleDialog(false)}
        />
      )}

      {/* Bulk Infill Dialog */}
      <BulkInfillDialog
        open={showBulkInfillDialog}
        onOpenChange={setShowBulkInfillDialog}
        testResults={testResults}
        onApply={handleBulkInfill}
      />
    </div>
  );
};

export default EICRScheduleOfTests;
