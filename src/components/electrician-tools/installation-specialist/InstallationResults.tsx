import { useState, useRef, useEffect } from 'react';
import {
  Plus,
  RotateCcw,
  Download,
  AlertCircle,
  Wrench,
  CheckCircle2,
  FileText,
  Database,
  TrendingUp,
  BookOpen,
  ChevronUp,
} from 'lucide-react';
import { InstallationStepCard } from './InstallationStepCard';
import {
  InstallationStep,
  InstallationMethodSummary,
  InstallationProjectDetails,
} from '@/types/installation-method';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { openOrDownloadPdf } from '@/utils/pdf-download';
import { ProjectMetadataForm } from './ProjectMetadataForm';
import { InstallationHeroSummary } from './InstallationHeroSummary';
import { TestingProceduresSection } from './TestingProceduresSection';
import { EquipmentScheduleSection } from './EquipmentScheduleSection';
import { SiteLogisticsSection } from './SiteLogisticsSection';
import { ConditionalProceduresSection } from './ConditionalProceduresSection';
import { MobileButton } from '@/components/ui/mobile-button';
import { RAGExtractionBreakdown } from './RAGExtractionBreakdown';
import { CompetencyRequirementsCard } from './CompetencyRequirementsCard';
import { SiteLogisticsCard } from './SiteLogisticsCard';
import { RegulatoryCitationsPanel } from './RegulatoryCitationsPanel';
import { ExecutiveSummaryCard } from './ExecutiveSummaryCard';
import { RegulatoryComplianceSection } from './RegulatoryComplianceSection';
import { MaterialsListTable } from './MaterialsListTable';
import { TestingRequirementsTable } from './TestingRequirementsTable';
import { JSONSchemaViewer } from './JSONSchemaViewer';
import { ProjectMetadataCard } from './ProjectMetadataCard';
import { useMobileEnhanced } from '@/hooks/use-mobile-enhanced';
import { SectionNavigationTabs } from './SectionNavigationTabs';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';

interface ProjectMetadata {
  documentRef: string;
  issueDate: string;
  reviewDate: string;
  companyName: string;
  contractor: string;
  siteManagerName: string;
  siteManagerPhone: string;
  firstAiderName: string;
  firstAiderPhone: string;
  safetyOfficerName: string;
  safetyOfficerPhone: string;
  assemblyPoint: string;
  startDate: string;
  completionDate: string;
  siteSupervisor: string;
  clientContact: string;
  preparedByName: string;
  preparedByPosition: string;
  preparedDate: string;
  authorisedByName: string;
  authorisedByPosition: string;
  authorisedDate: string;
}

interface InstallationResultsProps {
  originalQuery?: string;
  jobTitle?: string;
  installationType?: string;
  installationGuide: string;
  steps: InstallationStep[];
  summary: InstallationMethodSummary;
  projectDetails?: InstallationProjectDetails;
  projectMetadata?: ProjectMetadata;
  fullMethodStatement?: any;
  qualityMetrics?: {
    overallScore: number;
    ragExtractionRate: number;
    stepsWithCompleteData: number;
    ragDataUsed: {
      practicalProcedures: number;
      regulations: number;
      avgRelevance: number;
    };
    extractionBreakdown?: {
      practicalWork: {
        documentsUsed: number;
        toolsExtracted: number;
        materialsExtracted: number;
        regulationsExtracted: number;
        avgConfidence: number;
      };
      bs7671: {
        documentsUsed: number;
        regulationsExtracted: number;
        avgRelevance: number;
      };
    };
  };
  testingProcedures?: Array<{
    testName: string;
    standard: string;
    acceptanceCriteria: string;
    certificateRequired?: string;
    regulationRef?: string;
  }>;
  competencyRequirements?: {
    minimumQualifications: string[];
    supervision?: string;
    additionalTraining?: string[];
  };
  siteLogistics?: {
    isolationPoints: string[];
    accessRequirements: string;
    permitsRequired: string[];
    workingHours?: string;
  };
  regulatoryCitations?: Array<{
    regulation: string;
    applicableToStep: number;
    requirement: string;
  }>;
  onStartOver: () => void;
}

export const InstallationResults = ({
  originalQuery,
  jobTitle,
  installationType,
  installationGuide,
  steps: initialSteps,
  summary,
  projectDetails,
  projectMetadata: initialMetadata,
  fullMethodStatement,
  qualityMetrics,
  testingProcedures: propTestingProcedures,
  competencyRequirements: propCompetencyRequirements,
  siteLogistics: propSiteLogistics,
  regulatoryCitations,
  onStartOver,
}: InstallationResultsProps) => {
  const [steps, setSteps] = useState<InstallationStep[]>(initialSteps);
  const [showMetadataForm, setShowMetadataForm] = useState(false);
  const [projectMetadata, setProjectMetadata] = useState<ProjectMetadata | undefined>(
    initialMetadata
  );
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { isMobile } = useMobileEnhanced();
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for "scroll to top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToStep = (index: number) => {
    const stepElement = document.getElementById(`step-${index}`);
    if (stepElement) {
      stepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setCurrentStepIndex(index);
    }
  };

  // Extract comprehensive data - prioritize props over fullMethodStatement
  const testingProcedures = propTestingProcedures || fullMethodStatement?.testingProcedures || [];
  const competencyRequirements =
    propCompetencyRequirements || fullMethodStatement?.competencyRequirements || {};
  const siteLogistics = propSiteLogistics || fullMethodStatement?.siteLogistics || {};
  const equipmentSchedule = fullMethodStatement?.equipmentSchedule || [];
  const conditionalFlags = fullMethodStatement?.conditionalFlags || {};
  const workAtHeightEquipment = fullMethodStatement?.workAtHeightEquipment || [];

  // Count hazards and regulations
  const totalHazards = steps.reduce((count, step) => {
    const linkedHazards = (step as any).linkedHazards || [];
    return count + linkedHazards.length;
  }, 0);

  const totalRegulations = steps.reduce((count, step) => {
    const bsReferences = (step as any).bsReferences || [];
    return count + bsReferences.length;
  }, 0);

  // Aggregate all unique BS references from steps
  const allStepBsReferences = steps.flatMap((step: any) => step.bsReferences || []);
  const uniqueStepBsReferences = [...new Set(allStepBsReferences)];

  const updateStep = (index: number, updated: InstallationStep) => {
    const newSteps = [...steps];
    newSteps[index] = updated;
    setSteps(newSteps);
    toast({
      title: 'Step Updated',
      description: 'Your changes have been saved.',
    });
  };

  const deleteStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    const renumberedSteps = newSteps.map((step, i) => ({
      ...step,
      stepNumber: i + 1,
    }));
    setSteps(renumberedSteps);
    toast({
      title: 'Step Deleted',
      description: 'The step has been removed.',
    });
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newSteps = [...steps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];
    const renumberedSteps = newSteps.map((step, i) => ({
      ...step,
      stepNumber: i + 1,
    }));
    setSteps(renumberedSteps);
  };

  const addNewStep = () => {
    const newStep: InstallationStep = {
      stepNumber: steps.length + 1,
      title: 'New Step',
      content: 'Enter step description here...',
      safety: [],
      riskLevel: 'low',
    };
    setSteps([...steps, newStep]);
    toast({
      title: 'Step Added',
      description: 'New step created. Click edit to customise it.',
    });
  };

  const handleExportPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      toast({
        title: 'Generating PDF',
        description: 'Creating your installation method document...',
      });

      // Parse step bsReferences into structured format
      // Format: "BS 7671 Reg 132.10 - Safe isolation" → { number: "132.10", description: "Safe isolation" }
      const parsedStepReferences = uniqueStepBsReferences
        .map((ref) => {
          const match = ref.match(
            /(?:BS 7671 Reg |Regulation )?(\d+\.?\d*\.?\d*\.?\d*)\s*[-–—]\s*(.+)/i
          );
          if (match) {
            return { number: match[1], description: match[2].trim() };
          }
          return null;
        })
        .filter(Boolean) as Array<{ number: string; description: string }>;

      // Merge with existing regulatoryReferences and deduplicate by number
      const existingRefs =
        fullMethodStatement?.regulatoryReferences ||
        regulatoryCitations?.map((ref) => ({
          number: ref.regulation || '',
          description: ref.requirement || '',
        })) ||
        [];

      const allRefs = [...existingRefs, ...parsedStepReferences];
      const mergedRegulatoryReferences = Array.from(
        new Map(allRefs.map((ref) => [ref.number, ref])).values()
      ).sort((a, b) => {
        const aNum = parseFloat(a.number) || 0;
        const bNum = parseFloat(b.number) || 0;
        return aNum - bNum;
      });

      // ✅ ALIGNED TO JSON SCHEMA - All fields in camelCase
      const methodStatementPayload = {
        // Project Metadata (exact schema match)
        projectMetadata: fullMethodStatement?.projectMetadata || {
          documentRef: projectMetadata?.documentRef || `MS-${Date.now()}`,
          issueDate: projectMetadata?.issueDate || new Date().toISOString().split('T')[0],
          reviewDate:
            projectMetadata?.reviewDate ||
            new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          companyName: projectMetadata?.companyName || projectDetails?.clientName || 'Company Name',
          contractor:
            projectMetadata?.contractor || projectDetails?.electricianName || 'Contractor',
          siteManagerName: projectMetadata?.siteManagerName || '',
          siteManagerPhone: projectMetadata?.siteManagerPhone || '',
          firstAiderName: projectMetadata?.firstAiderName || '',
          firstAiderPhone: projectMetadata?.firstAiderPhone || '',
          safetyOfficerName: projectMetadata?.safetyOfficerName || '',
          safetyOfficerPhone: projectMetadata?.safetyOfficerPhone || '',
          assemblyPoint: projectMetadata?.assemblyPoint || 'Main Car Park',
          startDate: projectMetadata?.startDate || new Date().toISOString().split('T')[0],
          completionDate: projectMetadata?.completionDate || '',
          siteSupervisor:
            projectMetadata?.siteSupervisor || projectDetails?.electricianName || 'Site Supervisor',
          clientContact: projectMetadata?.clientContact || projectDetails?.clientName || '',
          preparedByName: projectMetadata?.preparedByName || projectDetails?.electricianName || '',
          preparedByPosition: projectMetadata?.preparedByPosition || 'Lead Electrician',
          preparedDate: projectMetadata?.preparedDate || new Date().toISOString().split('T')[0],
          authorisedByName: projectMetadata?.authorisedByName || '',
          authorisedByPosition: projectMetadata?.authorisedByPosition || '',
          authorisedDate: projectMetadata?.authorisedDate || '',
        },

        // Executive Summary (exact schema match)
        executiveSummary: fullMethodStatement?.executiveSummary || {
          cableType: '',
          cableSize: '',
          runLength: '',
          installationMethod: '',
          supplyType: '',
          protectiveDevice: '',
          voltageDrop: '',
          zsRequirement: '',
          purpose: projectDetails?.projectName || '',
        },

        // Materials List (exact schema match)
        materialsList:
          fullMethodStatement?.materialsList ||
          summary.materialsRequired?.map((m: any) => ({
            description: typeof m === 'string' ? m : m?.description || '',
            specification: typeof m === 'string' ? '' : m?.specification || '',
            quantity: typeof m === 'string' ? '' : m?.quantity || '',
            unit: typeof m === 'string' ? '' : m?.unit || '',
            notes: typeof m === 'string' ? '' : m?.notes || '',
          })) ||
          [],

        // Installation Steps (exact schema match)
        steps: steps.map((step: any, index: number) => ({
          step: step.stepNumber || index + 1,
          title: step.title,
          description: step.content || step.description || '',
          tools: step.toolsRequired || step.tools || [],
          materials: step.materialsNeeded || step.materials || [],
          safetyNotes: step.safety || step.safetyNotes || [],
          duration: step.estimatedDuration || 'Not specified',
          personnel: summary.requiredQualifications?.[0] || '1-2 qualified electricians',
          bsReferences: step.bsReferences || [],
          linkedHazards: step.linkedHazards || [],
          inspectionCheckpoints: step.inspectionCheckpoints || [],
          riskLevel: (step.riskLevel || 'medium').toUpperCase(),
        })),

        // Testing Requirements (exact schema match)
        testingRequirements:
          fullMethodStatement?.testingRequirements ||
          testingProcedures?.map((test) => ({
            description: test.testName || '',
            regulation: test.regulationRef || test.standard || '',
            expectedReading: test.acceptanceCriteria || '',
            passRange: test.certificateRequired || '',
          })) ||
          [],

        // Testing Procedures (backward compatibility)
        testingProcedures: fullMethodStatement?.testingProcedures || testingProcedures || [],

        // Regulatory References (exact schema match) - merged from AI + per-step references
        regulatoryReferences: mergedRegulatoryReferences,

        // Installation Hazards (NEW - Section 5)
        installationHazards: fullMethodStatement?.installationHazards || null,

        // Scope of Work (exact schema match)
        scopeOfWork: fullMethodStatement?.scopeOfWork || {
          description: projectDetails?.projectName || 'Electrical installation work',
          keyDeliverables: [
            `Complete installation of ${projectDetails?.installationType || 'electrical circuits'}`,
          ],
          exclusions: '',
        },

        // Schedule Details (exact schema match)
        scheduleDetails: fullMethodStatement?.scheduleDetails || {
          workingHours: '08:00 - 17:00',
          teamSize: '1-2 qualified electricians',
          weatherDependency: 'Indoor work - not weather dependent',
          accessRequirements: 'Standard site access required',
          estimatedDuration: summary.estimatedDuration || 'Variable',
        },

        // Practical Tips (exact schema match)
        practicalTips: fullMethodStatement?.practicalTips || [],

        // Common Mistakes (exact schema match)
        commonMistakes: fullMethodStatement?.commonMistakes || [],

        // RAG Citations (exact schema match)
        ragCitations: fullMethodStatement?.ragCitations || [],

        // Legacy fields for backward compatibility
        jobTitle: `Installation Method: ${projectDetails?.installationType || 'General Installation'}`,
        projectName: projectDetails?.projectName || 'N/A',
        location: projectDetails?.location || 'Site Location',
        workType: projectDetails?.installationType || 'Electrical Installation',
        overallRiskLevel: (summary.overallRiskLevel || 'medium').toUpperCase(),
        toolsRequired: summary.toolsRequired || [],
        materialsRequired: summary.materialsRequired || [],
        competencyRequirements:
          fullMethodStatement?.competencyRequirements || competencyRequirements || {},
        siteLogistics: fullMethodStatement?.siteLogistics || siteLogistics || {},
        conditionalFlags: fullMethodStatement?.conditionalFlags || conditionalFlags || {},
        equipmentSchedule: fullMethodStatement?.equipmentSchedule || equipmentSchedule || [],
        workAtHeightEquipment:
          fullMethodStatement?.workAtHeightEquipment || workAtHeightEquipment || [],
      };

      const { data, error } = await supabase.functions.invoke('generate-method-statement-pdf', {
        body: { methodStatement: methodStatementPayload },
      });

      if (error) throw new Error(error.message || 'Failed to generate PDF');
      if (!data || !data.publicUrl) throw new Error('PDF generation returned no URL');

      await openOrDownloadPdf(
        data.publicUrl,
        `installation-method-${(projectDetails?.projectName?.replace(/\s+/g, '-') || Date.now())}.pdf`
      );

      toast({
        title: 'PDF Generated Successfully',
        description: 'Your installation method document has been downloaded.',
      });
    } catch (error) {
      console.error('PDF export error:', error);
      toast({
        title: 'PDF Export Failed',
        description:
          error instanceof Error ? error.message : 'Could not generate PDF. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div ref={contentRef} className="space-y-6 animate-fade-in pb-24 sm:pb-6">
      {/* Inline Header */}
      {jobTitle && (
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
            <Wrench className="h-5 w-5 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-white leading-tight">{jobTitle}</h2>
            <p className="text-sm text-white">Installation guide</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => {
                navigator.clipboard.writeText(installationGuide || '');
                toast({ title: 'Copied', description: 'Method statement copied to clipboard.' });
              }}
              className="h-9 px-3 rounded-lg bg-white/[0.06] text-white ring-1 ring-white/[0.08] text-sm font-medium touch-manipulation active:scale-95 transition-all"
            >
              Copy
            </button>
            <button
              onClick={onStartOver}
              className="h-9 px-3 rounded-lg bg-white/[0.06] text-white ring-1 ring-white/[0.08] text-sm font-medium touch-manipulation active:scale-95 transition-all"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Original Request Display */}
      {originalQuery && (
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <FileText className="h-5 w-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5 mb-2">Original Request</h2>
              <p className="text-base text-white font-medium leading-relaxed mb-3">
                {originalQuery}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {projectDetails?.projectName && (
                  <div className="flex items-center gap-2 bg-white/[0.04] rounded px-3 py-2">
                    <span className="text-white">Project:</span>
                    <span className="font-semibold text-white">
                      {projectDetails.projectName}
                    </span>
                  </div>
                )}
                {projectDetails?.location && (
                  <div className="flex items-center gap-2 bg-white/[0.04] rounded px-3 py-2">
                    <span className="text-white">Location:</span>
                    <span className="font-semibold text-white">
                      {projectDetails.location}
                    </span>
                  </div>
                )}
                {projectDetails?.installationType && (
                  <div className="flex items-center gap-2 bg-white/[0.04] rounded px-3 py-2">
                    <span className="text-white">Type:</span>
                    <span className="font-semibold text-white">
                      {projectDetails.installationType}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ NEW: Project Metadata Card */}
      {fullMethodStatement?.projectMetadata && (
        <ProjectMetadataCard metadata={fullMethodStatement.projectMetadata} />
      )}

      {/* Quality Metrics Display */}
      {qualityMetrics && (
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Database className="h-5 w-5 text-blue-400" />
              </div>
              <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Generation Quality</h2>
            </div>
            <span className="inline-flex items-center rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-base font-bold text-blue-400">
              {qualityMetrics.overallScore}/100
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white/[0.04] rounded-lg p-3 border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-blue-400" />
                <span className="text-xs text-white font-medium">
                  RAG Extraction Rate
                </span>
              </div>
              <p className="text-2xl font-bold text-white">
                {qualityMetrics.ragExtractionRate}%
              </p>
              <p className="text-xs text-white mt-1">
                {qualityMetrics.stepsWithCompleteData}/{steps.length} steps with complete data
              </p>
            </div>

            <div className="bg-white/[0.04] rounded-lg p-3 border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-1">
                <Wrench className="h-4 w-4 text-blue-400" />
                <span className="text-xs text-white font-medium">
                  Practical Procedures
                </span>
              </div>
              <p className="text-2xl font-bold text-white">
                {qualityMetrics.ragDataUsed.practicalProcedures}
              </p>
              <p className="text-xs text-white mt-1">Real-world installation guides</p>
            </div>

            <div className="bg-white/[0.04] rounded-lg p-3 border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="h-4 w-4 text-blue-400" />
                <span className="text-xs text-white font-medium">
                  BS 7671 Regulations
                </span>
              </div>
              <p className="text-2xl font-bold text-white">
                {qualityMetrics.ragDataUsed.regulations}
              </p>
              <p className="text-xs text-white mt-1">
                Regulatory references ({qualityMetrics.ragDataUsed.avgRelevance}% avg relevance)
              </p>
            </div>
          </div>

          <div className="mt-3 text-xs text-white bg-blue-500/5 rounded p-2 border border-blue-500/20">
            <strong>Quality Indicators:</strong> Based on tools specificity, materials
            completeness, hazard identification, and description richness extracted from{' '}
            {qualityMetrics.ragDataUsed.practicalProcedures +
              qualityMetrics.ragDataUsed.regulations}{' '}
            knowledge base entries.
          </div>
        </div>
      )}

      {/* 📊 Detailed RAG Extraction Breakdown */}
      {qualityMetrics?.extractionBreakdown && (
        <RAGExtractionBreakdown extractionBreakdown={qualityMetrics.extractionBreakdown} />
      )}

      {/* 🎯 NEW: Executive Summary - Installation At-A-Glance */}
      {fullMethodStatement?.executiveSummary && (
        <ExecutiveSummaryCard executiveSummary={fullMethodStatement.executiveSummary} />
      )}

      {/* Hero Summary */}
      <InstallationHeroSummary
        steps={steps.length}
        duration={summary.estimatedDuration}
        riskLevel={summary.overallRiskLevel}
        toolsCount={summary.toolsRequired?.length || 0}
        hazardsCount={totalHazards}
        regulationsCount={totalRegulations}
      />

      {/* Metadata Call-to-Action */}
      {!projectMetadata?.siteManagerName && (
        <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <AlertCircle className="h-6 w-6 text-amber-400" />
            </div>
            <div className="flex-1 w-full text-center sm:text-left">
              <h4 className="font-bold text-lg text-white mb-2">
                Complete Project Details for Professional PDF
              </h4>
              <p className="text-sm text-white mb-4 leading-relaxed">
                Add emergency contacts and site information to generate a comprehensive,
                regulation-compliant method statement
              </p>
              <MobileButton
                onClick={() => setShowMetadataForm(true)}
                variant="elec"
                size="default"
                className="shadow-lg hover:shadow-xl transition-all"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Complete Form Now
              </MobileButton>
            </div>
          </div>
        </div>
      )}

      {/* Project Metadata Form */}
      {showMetadataForm && (
        <ProjectMetadataForm
          metadata={
            projectMetadata || {
              documentRef: '',
              issueDate: '',
              reviewDate: '',
              companyName: '',
              contractor: '',
              siteManagerName: '',
              siteManagerPhone: '',
              firstAiderName: '',
              firstAiderPhone: '',
              safetyOfficerName: '',
              safetyOfficerPhone: '',
              assemblyPoint: '',
              startDate: '',
              completionDate: '',
              siteSupervisor: '',
              clientContact: '',
              preparedByName: '',
              preparedByPosition: '',
              preparedDate: '',
              authorisedByName: '',
              authorisedByPosition: '',
              authorisedDate: '',
            }
          }
          onChange={setProjectMetadata}
        />
      )}

      {/* Conditional Procedures */}
      <ConditionalProceduresSection
        flags={conditionalFlags}
        workAtHeightEquipment={workAtHeightEquipment}
      />

      {/* Installation Steps */}
      <div id="steps">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
            Installation Procedure ({steps.length} Steps)
          </h2>
          <MobileButton
            onClick={addNewStep}
            variant="outline"
            size="sm"
            icon={<Plus className="h-4 w-4" />}
          >
            Add Step
          </MobileButton>
        </div>
        <div className="space-y-3">
          {steps.map((step, index) => (
            <InstallationStepCard
              key={step.stepNumber}
              step={step}
              onUpdate={(updated) => updateStep(index, updated)}
              onDelete={() => deleteStep(index)}
              onMoveUp={index > 0 ? () => moveStep(index, 'up') : undefined}
              onMoveDown={index < steps.length - 1 ? () => moveStep(index, 'down') : undefined}
            />
          ))}
        </div>
      </div>

      {/* 📦 NEW: Enhanced Materials List with Quantities */}
      <div id="materials">
        {fullMethodStatement?.materialsList && fullMethodStatement.materialsList.length > 0 && (
          <MaterialsListTable materialsList={fullMethodStatement.materialsList} />
        )}
      </div>

      {/* 🎓 Competency Requirements */}
      {competencyRequirements &&
        competencyRequirements.minimumQualifications &&
        competencyRequirements.minimumQualifications.length > 0 && (
          <CompetencyRequirementsCard competencyRequirements={competencyRequirements} />
        )}

      {/* 🗺️ Site Logistics & Planning */}
      {siteLogistics &&
        (siteLogistics.isolationPoints?.length > 0 || siteLogistics.accessRequirements) && (
          <SiteLogisticsCard siteLogistics={siteLogistics} />
        )}

      {/* 🆕 JSON Schema & Output Data Viewer */}
      {fullMethodStatement && (
        <JSONSchemaViewer fullMethodStatement={fullMethodStatement} mode="full" />
      )}

      {/* ✅ NEW: AI-Generated Testing Requirements */}
      <div id="testing">
        {fullMethodStatement?.testingRequirements &&
          fullMethodStatement.testingRequirements.length > 0 && (
            <TestingRequirementsTable
              testingRequirements={fullMethodStatement.testingRequirements}
            />
          )}

        {/* Testing & Commissioning (Fallback for legacy data) */}
        {!fullMethodStatement?.testingRequirements &&
          testingProcedures &&
          testingProcedures.length > 0 && (
            <TestingProceduresSection procedures={testingProcedures} />
          )}
      </div>

      {/* 📖 BS 7671 Regulatory Compliance Section */}
      <RegulatoryComplianceSection
        regulatoryReferences={fullMethodStatement?.regulatoryReferences}
        stepBsReferences={uniqueStepBsReferences}
        sectionNumber={6}
      />

      {/* Equipment Schedule */}
      <EquipmentScheduleSection equipment={equipmentSchedule} />

      {/* Site Logistics (Old Component - Keep for backward compatibility) */}
      <SiteLogisticsSection logistics={siteLogistics} competency={competencyRequirements} />

      {/* Section Navigation Tabs */}
      <SectionNavigationTabs
        onNavigate={(sectionId) => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      />

      {/* Action Buttons - Inline at bottom */}
      <div className="mt-8 space-y-3">
        {/* Primary CTA - Download PDF */}
        <button
          onClick={handleExportPDF}
          disabled={isGeneratingPDF}
          className="w-full h-14 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-base flex items-center justify-center gap-2 touch-manipulation active:scale-95 transition-all disabled:opacity-50"
        >
          <Download className="h-5 w-5" />
          {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
        </button>

        {/* Secondary Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowMetadataForm(!showMetadataForm)}
            className="flex-1 h-11 rounded-lg bg-white/[0.06] text-white ring-1 ring-white/[0.08] font-semibold text-sm touch-manipulation active:scale-95 transition-all"
          >
            {showMetadataForm ? 'Hide' : 'Edit'} Metadata
          </button>
          <button
            onClick={onStartOver}
            className="flex-1 h-11 rounded-lg bg-white/[0.06] text-white ring-1 ring-white/[0.08] font-semibold text-sm flex items-center justify-center gap-2 touch-manipulation active:scale-95 transition-all"
          >
            <RotateCcw className="h-4 w-4" />
            Start Over
          </button>
        </div>
      </div>

      {/* Metadata Form as Bottom Sheet on Mobile */}
      {isMobile ? (
        <Drawer open={showMetadataForm} onOpenChange={setShowMetadataForm}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Project Metadata</DrawerTitle>
              <DrawerDescription>Update project information and contacts</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 pb-4 max-h-[80vh] overflow-y-auto">
              {showMetadataForm && projectMetadata && (
                <ProjectMetadataForm
                  metadata={projectMetadata}
                  onChange={(updated) => setProjectMetadata(updated)}
                />
              )}
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        showMetadataForm &&
        projectMetadata && (
          <ProjectMetadataForm
            metadata={projectMetadata}
            onChange={(updated) => setProjectMetadata(updated)}
          />
        )
      )}
      {/* Mobile Bottom Action Bar - Sticky */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-white/[0.06] p-3 z-40 flex gap-2 shadow-lg">
          <button
            onClick={handleExportPDF}
            disabled={isGeneratingPDF}
            className="flex-1 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-sm flex items-center justify-center gap-2 touch-manipulation active:scale-95 transition-all disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
          </button>
          <button
            onClick={addNewStep}
            className="h-12 w-12 rounded-xl bg-white/[0.06] text-white ring-1 ring-white/[0.08] flex items-center justify-center touch-manipulation active:scale-95 transition-all"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 rounded-full w-12 h-12 shadow-lg z-40 bg-blue-500 text-white flex items-center justify-center touch-manipulation active:scale-95 transition-all"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};
