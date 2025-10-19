import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { DesignInputs, InstallationDesign } from '@/types/installation-design';

export interface DesignProgress {
  stage: number;
  message: string;
  percent: number;
}

export const useAIDesigner = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [designData, setDesignData] = useState<InstallationDesign | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<DesignProgress | null>(null);

  const generateDesign = async (inputs: DesignInputs) => {
    setIsProcessing(true);
    setError(null);
    setDesignData(null);

    const stages = [
      { stage: 1, message: 'Understanding your requirements...', duration: 15000, targetPercent: 5 },
      { stage: 2, message: 'Checking BS 7671 requirements for each circuit...', duration: 25000, targetPercent: 20 },
      { stage: 3, message: 'Calculating cable sizes and derating factors...', duration: 35000, targetPercent: 40 },
      { stage: 4, message: 'Determining protection devices...', duration: 30000, targetPercent: 60 },
      { stage: 5, message: 'Verifying voltage drop compliance...', duration: 25000, targetPercent: 75 },
      { stage: 6, message: 'Calculating earth fault loop impedance...', duration: 20000, targetPercent: 85 },
      { stage: 7, message: 'Generating materials list and cost estimate...', duration: 20000, targetPercent: 93 },
      { stage: 8, message: 'Finalising design documentation...', duration: 60000, targetPercent: 99 }
    ];

    let progressInterval: ReturnType<typeof setInterval> | null = null;
    let currentStage = 0;
    let currentPercent = 0;

    try {
      // Realistic progress controller - gradually advances through stages
      const startTime = Date.now();
      let accumulatedDuration = 0;

      progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        
        // Find which stage we should be in based on elapsed time
        let targetStage = 0;
        let stageStartTime = 0;
        
        for (let i = 0; i < stages.length; i++) {
          if (elapsed < accumulatedDuration + stages[i].duration) {
            targetStage = i;
            stageStartTime = accumulatedDuration;
            break;
          }
          accumulatedDuration += stages[i].duration;
          targetStage = i;
        }
        
        // Cap at stage 7 (99%) until backend completes
        if (targetStage >= 7) targetStage = 7;
        
        // Update current stage and smoothly interpolate percent
        if (targetStage !== currentStage) {
          currentStage = targetStage;
        }
        
        const stage = stages[currentStage];
        const stageElapsed = Math.min(elapsed - stageStartTime, stage.duration);
        const stageProgress = stageElapsed / stage.duration;
        
        const prevPercent = currentStage > 0 ? stages[currentStage - 1].targetPercent : 0;
        currentPercent = Math.floor(prevPercent + (stage.targetPercent - prevPercent) * stageProgress);
        
        setProgress({
          stage: currentStage + 1,
          message: stage.message,
          percent: currentPercent
        });
      }, 1000);

      console.log('🔧 Generating installation design', {
        circuits: inputs.circuits.length,
        projectName: inputs.projectName
      });

      const { data, error: invokeError } = await supabase.functions.invoke('designer-agent', {
        body: {
          mode: 'batch-design',
          aiConfig: {
            model: 'openai/gpt-5', // Use GPT-5 for best results
            maxTokens: 15000,
            timeoutMs: 280000, // 4 min 40 sec (like RAMS)
            noMemory: true, // No conversation history
            ragPriority: {
              design: 95,      // High priority for design docs
              bs7671: 85,      // High priority for regulations
              installation: 75 // Medium-high for installation guides
            }
          },
          projectInfo: {
            name: inputs.projectName,
            location: inputs.location,
            clientName: inputs.clientName,
            electricianName: inputs.electricianName,
            installationType: inputs.propertyType,
            propertyAge: inputs.propertyAge,
            existingInstallation: inputs.existingInstallation,
            budgetLevel: inputs.budgetLevel,
            additionalPrompt: inputs.additionalPrompt
          },
          incomingSupply: {
            voltage: inputs.voltage,
            phases: inputs.phases,
            Ze: inputs.ze,
            earthingSystem: inputs.earthingSystem,
            pscc: inputs.pscc || 3500,
            mainSwitchRating: inputs.mainSwitchRating || 100,
            ambientTemp: inputs.ambientTemp || 30,
            installationMethod: inputs.installationMethod || 'clipped-direct',
            groupingFactor: inputs.groupingFactor || 1
          },
          circuits: inputs.circuits.map(c => ({
            name: c.name,
            loadType: c.loadType,
            loadPower: c.loadPower,
            cableLength: c.cableLength,
            phases: c.phases,
            specialLocation: c.specialLocation,
            notes: c.notes
          }))
        }
      });

      if (progressInterval) clearInterval(progressInterval);

      if (invokeError) {
        // Map specific error codes
        let errorMessage = invokeError.message || 'Unknown error occurred';
        
        if (invokeError.message?.includes('429')) {
          errorMessage = 'Too many requests. Please wait a moment and try again.';
        } else if (invokeError.message?.includes('402')) {
          errorMessage = 'Payment required. Please add Lovable AI credits to continue.';
        } else if (invokeError.message?.includes('No tool call')) {
          errorMessage = 'AI did not return a structured design. Please try again.';
        }
        
        throw new Error(errorMessage);
      }

      if (!data.success) {
        throw new Error(data.error || 'Design generation failed');
      }

      // Complete progress smoothly to 100%
      setProgress({ stage: 8, message: 'Design complete!', percent: 100 });
      
      console.log('✅ Design generated successfully', data.design);
      setDesignData(data.design);

      toast.success('Design generated successfully', {
        description: `${data.design.circuits.length} circuits designed and verified`
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('❌ Design generation failed:', errorMessage);
      setError(errorMessage);

      // Stop progress at current stage on error (don't show 100%)
      if (progressInterval) clearInterval(progressInterval);

      toast.error('Design generation failed', {
        description: errorMessage
      });
    } finally {
      setIsProcessing(false);
      if (progressInterval) clearInterval(progressInterval);
      setTimeout(() => setProgress(null), 2000);
    }
  };

  const resetDesign = () => {
    setDesignData(null);
    setError(null);
    setProgress(null);
  };

  return {
    generateDesign,
    resetDesign,
    isProcessing,
    designData,
    error,
    progress
  };
};
