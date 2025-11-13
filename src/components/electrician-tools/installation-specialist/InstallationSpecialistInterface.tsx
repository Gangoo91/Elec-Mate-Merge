import { useState, useRef } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";
import { InstallationInput } from "./InstallationInput";
import { InstallationProcessingView } from "./InstallationProcessingView";
import { InstallationResults } from "./InstallationResults";
import InstallationSuccess from "./InstallationSuccess";
import { InstallationProjectDetails as ProjectDetailsType } from "@/types/installation-method";
import { generateMethodStatement } from "./methodStatementHandler";
import { useSimpleAgent } from "@/hooks/useSimpleAgent";

interface InstallationSpecialistInterfaceProps {
  designerContext?: any;
}

const InstallationSpecialistInterface = ({ designerContext }: InstallationSpecialistInterfaceProps) => {
  const [showResults, setShowResults] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationShown, setCelebrationShown] = useState(false);
  const [methodData, setMethodData] = useState<any>(null);
  const [generationStartTime, setGenerationStartTime] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [originalQuery, setOriginalQuery] = useState<string>('');
  const [projectInfo, setProjectInfo] = useState<ProjectDetailsType>({
    projectName: '',
    location: '',
    installationType: 'domestic'
  });
  
  const { callAgent, isLoading, progress } = useSimpleAgent();
  const [fullModeProgress, setFullModeProgress] = useState<{
    stage: 'initializing' | 'rag' | 'ai' | 'generation' | 'validation' | 'complete';
    message: string;
  } | null>(null);
  const [qualityMetrics, setQualityMetrics] = useState<{
    overallConfidence: number;
    ragDataQuality: 'excellent' | 'good' | 'fair' | 'poor';
    bs7671Coverage: number;
    practicalWorkCoverage: number;
    stage: 'initializing' | 'rag' | 'ai' | 'generation' | 'validation' | 'complete';
  } | null>(null);
  const lastProjectRef = useRef<{details: ProjectDetailsType, description: string} | null>(null);

  const handleGenerate = async (projectDetails: ProjectDetailsType, description: string, useFullMode: boolean) => {
    setGenerationStartTime(Date.now());
    setShowResults(true);
    setCelebrationShown(false);
    setIsGenerating(true);
    setOriginalQuery(description);
    setProjectInfo(projectDetails);
    lastProjectRef.current = { details: projectDetails, description };

    try {
      if (useFullMode) {
        // 3-AGENT PARALLEL METHOD STATEMENT MODE
        const query = `Create a comprehensive method statement for: ${description}

Project Context:
- Installation Type: ${projectDetails.installationType}
- Project Name: ${projectDetails.projectName}
- Location: ${projectDetails.location}
${projectDetails.clientName ? `- Client: ${projectDetails.clientName}` : ''}
${projectDetails.electricianName ? `- Electrician: ${projectDetails.electricianName}` : ''}`;

        // Initialize quality metrics
        setQualityMetrics({
          overallConfidence: 30,
          ragDataQuality: 'fair',
          bs7671Coverage: 0,
          practicalWorkCoverage: 0,
          stage: 'initializing'
        });

        const mergedResult = await generateMethodStatement(
          query,
          projectDetails,
          'ms-' + Date.now(),
          designerContext,
          (message: string) => {
            // Map stage markers to progress stages
            if (message === 'STAGE_1_START') {
              setFullModeProgress({ stage: 'initializing', message: 'Starting up...' });
              setQualityMetrics(prev => prev ? { ...prev, stage: 'initializing', overallConfidence: 10 } : null);
            } else if (message === 'STAGE_2_START') {
              setFullModeProgress({ stage: 'rag', message: 'Searching BS 7671 regulations...' });
              setQualityMetrics(prev => prev ? { ...prev, stage: 'rag', overallConfidence: 30 } : null);
            } else if (message.startsWith('RAG_METRICS:')) {
              // Parse RAG metrics from edge function
              try {
                const metricsStr = message.replace('RAG_METRICS:', '');
                const parsedMetrics = JSON.parse(metricsStr);
                setQualityMetrics(prev => prev ? {
                  ...prev,
                  bs7671Coverage: parsedMetrics.bs7671Count || 0,
                  practicalWorkCoverage: parsedMetrics.practicalWorkCount || 0,
                  ragDataQuality: parsedMetrics.bs7671Count >= 20 && parsedMetrics.practicalWorkCount >= 30 ? 'excellent' :
                                  parsedMetrics.bs7671Count >= 15 && parsedMetrics.practicalWorkCount >= 20 ? 'good' :
                                  parsedMetrics.bs7671Count >= 10 && parsedMetrics.practicalWorkCount >= 10 ? 'fair' : 'poor',
                  overallConfidence: Math.min(95, 40 + (parsedMetrics.bs7671Count * 1.5) + (parsedMetrics.practicalWorkCount * 0.8))
                } : null);
              } catch (e) {
                console.warn('Failed to parse RAG metrics:', e);
              }
            } else if (message === 'STAGE_3_START') {
              setFullModeProgress({ stage: 'ai', message: 'Calculating cable sizes...' });
              setQualityMetrics(prev => prev ? { ...prev, stage: 'ai', overallConfidence: Math.max(prev.overallConfidence, 50) } : null);
            } else if (message === 'STAGE_3_5_START') {
              setFullModeProgress({ stage: 'generation', message: 'Generating step-by-step procedures...' });
              setQualityMetrics(prev => prev ? { ...prev, stage: 'generation', overallConfidence: Math.max(prev.overallConfidence, 70) } : null);
            } else if (message === 'STAGE_4_START') {
              setFullModeProgress({ stage: 'validation', message: 'Validating compliance...' });
              setQualityMetrics(prev => prev ? { ...prev, stage: 'validation', overallConfidence: Math.max(prev.overallConfidence, 85) } : null);
            } else if (message === 'STAGE_5_COMPLETE') {
              setFullModeProgress({ stage: 'complete', message: 'Method statement ready!' });
              setQualityMetrics(prev => prev ? { ...prev, stage: 'complete', overallConfidence: Math.max(prev.overallConfidence, 90) } : null);
            } else if (message.startsWith('🔍') || message.startsWith('⚡') || message.startsWith('🤖') || message.startsWith('✅')) {
              // Preserve current stage but update message
              setFullModeProgress(prev => prev ? { ...prev, message } : null);
            }
          }
        );

        // Transform merged result for UI display
        const installationSteps = mergedResult.installationSteps.map((step: any) => ({
          stepNumber: step.stepNumber,
          title: step.title,
          content: step.description,
          safety: step.safetyRequirements,
          toolsRequired: step.equipmentNeeded,
          materialsNeeded: [],
          estimatedDuration: step.estimatedDuration,
          riskLevel: step.riskLevel,
          inspectionCheckpoints: step.inspectionCheckpoints,
          linkedHazards: step.linkedHazards
        }));

        const allTools = [...new Set(installationSteps.flatMap((s: any) => s.toolsRequired || []))];
        const riskLevels = installationSteps.map((s: any) => s.riskLevel);
        const overallRisk = riskLevels.includes('high') ? 'high' : 
                           riskLevels.includes('medium') ? 'medium' : 'low';

        const totalMinutes = installationSteps.reduce((sum: number, step: any) => {
          const stepTime = typeof step.estimatedDuration === 'number' 
            ? step.estimatedDuration 
            : parseInt(step.estimatedDuration) || 20;
          return sum + stepTime;
        }, 0);

        const formatDuration = (mins: number): string => {
          if (mins < 60) return `${mins} minutes`;
          const hours = Math.floor(mins / 60);
          const remainingMins = mins % 60;
          return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours} hours`;
        };

        const summary = {
          totalSteps: installationSteps.length,
          estimatedDuration: formatDuration(totalMinutes),
          requiredQualifications: [mergedResult.competencyRequirements.competencyRequirements],
          toolsRequired: allTools,
          materialsRequired: [],
          overallRiskLevel: overallRisk as 'low' | 'medium' | 'high'
        };

        const today = new Date().toISOString().split('T')[0];
        const nextYear = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        
        const defaultMetadata = {
          documentRef: `MS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
          issueDate: today,
          reviewDate: nextYear,
          companyName: projectDetails.electricianName || 'Your Company Ltd',
          contractor: 'Main Contractor Ltd',
          siteManagerName: '',
          siteManagerPhone: '',
          firstAiderName: '',
          firstAiderPhone: '',
          safetyOfficerName: '',
          safetyOfficerPhone: '',
          assemblyPoint: 'Main Car Park',
          startDate: projectDetails.expectedStartDate || today,
          completionDate: '',
          siteSupervisor: projectDetails.electricianName || '',
          clientContact: projectDetails.clientName || '',
          preparedByName: projectDetails.electricianName || '',
          preparedByPosition: 'Electrician',
          preparedDate: today,
          authorisedByName: '',
          authorisedByPosition: 'Contracts Manager',
          authorisedDate: today
        };

        setMethodData({
          jobTitle: description,
          installationType: projectDetails.installationType,
          steps: installationSteps,
          summary,
          projectDetails,
          projectMetadata: defaultMetadata,
          _fullMethodStatement: mergedResult
        });

        toast.success("Method Statement Generated", {
          description: `Complete with ${summary.totalSteps} steps, testing procedures, and step-specific hazards`
        });

      } else {
        // QUICK MODE - Just installer agent
        const query = `Create a detailed step-by-step installation method for: ${description}

Project Context:
- Installation Type: ${projectDetails.installationType}
- Project Name: ${projectDetails.projectName}
- Location: ${projectDetails.location}
${projectDetails.clientName ? `- Client: ${projectDetails.clientName}` : ''}
${projectDetails.electricianName ? `- Electrician: ${projectDetails.electricianName}` : ''}`;

        // Initialize quality metrics for quick mode
        setQualityMetrics({
          overallConfidence: 40,
          ragDataQuality: 'fair',
          bs7671Coverage: 0,
          practicalWorkCoverage: 0,
          stage: 'initializing'
        });

        setQualityMetrics(prev => prev ? { ...prev, stage: 'rag' } : null);
        
        const response = await callAgent('installer', {
          query,
          projectContext: {
            projectType: projectDetails.installationType as 'domestic' | 'commercial' | 'industrial',
            buildingAge: 'modern',
          },
          // Pass designer context if available
          previousAgentOutputs: designerContext?.previousOutputs || [],
          currentDesign: designerContext?.design || null,
          sharedRegulations: designerContext?.regulations || []
        });

        // Update quality metrics based on response (✅ Fixed path)
        const qm = (response as any)?.qualityMetrics;
        if (qm) {
          setQualityMetrics({
            overallConfidence: qm.overallScore || 70,
            ragDataQuality: qm.overallScore >= 85 ? 'excellent' : 
                           qm.overallScore >= 70 ? 'good' : 
                           qm.overallScore >= 50 ? 'fair' : 'poor',
            bs7671Coverage: qm.ragDataUsed?.regulations || 0,
            practicalWorkCoverage: qm.ragDataUsed?.practicalProcedures || 0,
            stage: 'complete'
          });
          
          console.log('📊 Quality Metrics:', {
            score: qm.overallScore,
            ragDocs: qm.ragDataUsed?.totalDocs,
            toolsExtracted: qm.extractionBreakdown?.toolsExtracted,
            materialsExtracted: qm.extractionBreakdown?.materialsExtracted
          });
        }

        if (!response?.success) throw new Error(response?.error || 'Failed to generate installation method');

        const steps = response.data?.steps || [];

        // 🔍 DEBUG: Log first step to verify field names
        if (steps.length > 0) {
          console.log('📊 First step structure:', {
            hasEquipmentNeeded: !!steps[0].equipmentNeeded,
            hasTools: !!steps[0].tools,
            equipmentCount: (steps[0].equipmentNeeded || []).length,
            toolsCount: (steps[0].tools || []).length,
            materialCount: (steps[0].materialsNeeded || []).length
          });
        }

        const installationSteps = steps.map((step: any, index: number) => ({
          stepNumber: step.stepNumber || index + 1,
          title: step.title || `Step ${index + 1}`,
          content: step.description || '',
          safety: step.safetyRequirements || [],
          toolsRequired: step.equipmentNeeded || step.tools || [],  // ✅ Primary: equipmentNeeded
          materialsNeeded: step.materialsNeeded || step.materials || [],  // ✅ Primary: materialsNeeded
          estimatedDuration: step.estimatedDuration || step.estimatedTime || 'Not specified',  // ✅ Swap order
          riskLevel: (step.riskLevel || 'medium') as 'low' | 'medium' | 'high',
          qualifications: step.qualifications || [],
          linkedHazards: step.linkedHazards || [],
          notes: step.notes || step.criticalPoints?.join('; ') || ''
        }));

        const allTools = [...new Set(installationSteps.flatMap((s: any) => s.toolsRequired || []))];
        const riskLevels = installationSteps.map((s: any) => s.riskLevel);
        const overallRisk = riskLevels.includes('high') ? 'high' : 
                           riskLevels.includes('medium') ? 'medium' : 'low';

        const totalMinutes = installationSteps.reduce((sum: number, step: any) => {
          const stepTime = typeof step.estimatedDuration === 'number' 
            ? step.estimatedDuration 
            : parseInt(step.estimatedDuration) || 20;
          return sum + stepTime;
        }, 0);

        const formatDuration = (mins: number): string => {
          if (mins < 60) return `${mins} minutes`;
          const hours = Math.floor(mins / 60);
          const remainingMins = mins % 60;
          return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours} hours`;
        };

        const summary = {
          totalSteps: installationSteps.length,
          estimatedDuration: formatDuration(totalMinutes),
          requiredQualifications: ['18th Edition BS 7671:2018+A3:2024'],
          toolsRequired: allTools,
          materialsRequired: [],
          overallRiskLevel: overallRisk as 'low' | 'medium' | 'high'
        };

        const today = new Date().toISOString().split('T')[0];
        const defaultMetadata = {
          documentRef: `MS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
          issueDate: today,
          reviewDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          companyName: projectDetails.electricianName || 'Your Company Ltd',
          contractor: 'Main Contractor Ltd',
          siteManagerName: '',
          siteManagerPhone: '',
          firstAiderName: '',
          firstAiderPhone: '',
          safetyOfficerName: '',
          safetyOfficerPhone: '',
          assemblyPoint: 'Main Car Park',
          startDate: projectDetails.expectedStartDate || today,
          completionDate: '',
          siteSupervisor: projectDetails.electricianName || '',
          clientContact: projectDetails.clientName || '',
          preparedByName: projectDetails.electricianName || '',
          preparedByPosition: 'Electrician',
          preparedDate: today,
          authorisedByName: '',
          authorisedByPosition: 'Contracts Manager',
          authorisedDate: today
        };
        
        setMethodData({
          jobTitle: description,
          installationType: projectDetails.installationType,
          steps: installationSteps,
          summary,
          projectDetails,
          projectMetadata: defaultMetadata,
          qualityMetrics: response.metadata?.qualityMetrics,
          testingProcedures: response.data?.testingProcedures || [],
          competencyRequirements: response.data?.competencyRequirements,
          siteLogistics: response.data?.siteLogistics,
          regulatoryCitations: response.data?.regulatoryCitations || []
        });
      }

      // Show celebration if first time
      if (!celebrationShown) {
        setShowCelebration(true);
        setCelebrationShown(true);
      }

    } catch (error) {
      console.error('Installation guide generation error:', error);
      
      let errorMessage = "Could not generate installation guide. Please try again.";
      
      if (error instanceof Error) {
        if (error.message.includes('timeout')) {
          errorMessage = "Request timed out. Please try again or use Quick Mode.";
        } else if (error.message.includes('rate limit')) {
          errorMessage = "Rate limit exceeded. Please wait a moment and try again.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast.error("Generation Failed", {
        description: errorMessage
      });
      
      setShowResults(false);
    } finally {
      setIsGenerating(false);
      setTimeout(() => setFullModeProgress(null), 2000);
    }
  };

  const handleStartOver = () => {
    setShowResults(false);
    setShowCelebration(false);
    setMethodData(null);
    setCelebrationShown(false);
  };

  const handleViewResults = () => {
    setShowCelebration(false);
  };

  const generationTime = generationStartTime > 0 
    ? Math.round((Date.now() - generationStartTime) / 1000) 
    : 0;

  // VIEW LOGIC
  if (!showResults) {
    return (
      <>
        {/* Phase 5: Context Indicator UI */}
        {designerContext?.selectedCircuits && designerContext.selectedCircuits.length > 0 && (
          <Alert className="mb-4 bg-emerald-500/10 border-emerald-500/30">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <AlertTitle>Using Circuit Design Context</AlertTitle>
            <AlertDescription>
              {designerContext.selectedCircuits.length} circuit(s) from AI Designer loaded:
              <ul className="mt-2 space-y-1">
                {designerContext.selectedCircuits.map((c: any, idx: number) => (
                  <li key={idx} className="text-xs">
                    • <strong>{c.name}</strong>: {c.cableSize}mm² cable, {c.protectionSummary}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
        <InstallationInput onGenerate={handleGenerate} isProcessing={isLoading} />
      </>
    );
  }

  if (isLoading || isGenerating) {
    return (
      <InstallationProcessingView 
        originalQuery={originalQuery}
        projectDetails={projectInfo}
        progress={fullModeProgress || progress}
        startTime={generationStartTime}
        qualityMetrics={qualityMetrics || undefined}
        onCancel={() => {
          setShowResults(false);
          setIsGenerating(false);
          setFullModeProgress(null);
          setQualityMetrics(null);
        }}
        onQuickMode={() => {
          if (lastProjectRef.current) {
            handleGenerate(
              lastProjectRef.current.details,
              lastProjectRef.current.description,
              false
            );
          }
        }}
      />
    );
  }

  if (methodData) {
    return (
      <>
        <InstallationResults
          originalQuery={originalQuery}
          jobTitle={methodData.jobTitle}
          installationType={methodData.installationType}
          installationGuide=""
          steps={methodData.steps}
          summary={methodData.summary}
          projectDetails={methodData.projectDetails}
          projectMetadata={methodData.projectMetadata}
          fullMethodStatement={methodData._fullMethodStatement}
          qualityMetrics={methodData.qualityMetrics}
          testingProcedures={methodData.testingProcedures}
          competencyRequirements={methodData.competencyRequirements}
          siteLogistics={methodData.siteLogistics}
          regulatoryCitations={methodData.regulatoryCitations}
          onStartOver={handleStartOver}
        />
        
        <InstallationSuccess 
          results={methodData}
          onViewResults={handleViewResults}
          generationTime={generationTime}
          open={showCelebration}
          onOpenChange={setShowCelebration}
        />
      </>
    );
  }

  return <InstallationInput onGenerate={handleGenerate} isProcessing={isLoading} />;
};

export default InstallationSpecialistInterface;
