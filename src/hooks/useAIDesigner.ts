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
      { stage: 1, message: 'Understanding your requirements...', percent: 5 },
      { stage: 2, message: 'Checking BS 7671 requirements for each circuit...', percent: 20 },
      { stage: 3, message: 'Calculating cable sizes and derating factors...', percent: 40 },
      { stage: 4, message: 'Determining protection devices...', percent: 60 },
      { stage: 5, message: 'Verifying voltage drop compliance...', percent: 75 },
      { stage: 6, message: 'Calculating earth fault loop impedance...', percent: 85 },
      { stage: 7, message: 'Generating materials list and cost estimate...', percent: 95 },
      { stage: 8, message: 'Finalising design documentation...', percent: 100 }
    ];

    try {
      // Simulate progress stages
      let currentStage = 0;
      const progressInterval = setInterval(() => {
        if (currentStage < stages.length) {
          setProgress(stages[currentStage]);
          currentStage++;
        }
      }, 2000);

      console.log('🔧 Generating installation design', {
        circuits: inputs.circuits.length,
        projectName: inputs.projectName
      });

      const { data, error: invokeError } = await supabase.functions.invoke('designer-agent', {
        body: {
          mode: 'batch-design',
          projectInfo: {
            name: inputs.projectName,
            location: inputs.location,
            clientName: inputs.clientName,
            electricianName: inputs.electricianName,
            installationType: inputs.propertyType,
            propertyAge: inputs.propertyAge,
            existingInstallation: inputs.existingInstallation,
            budgetLevel: inputs.budgetLevel
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
          })),
          additionalContext: inputs.additionalPrompt
        }
      });

      clearInterval(progressInterval);
      setProgress({ stage: 8, message: 'Design complete!', percent: 100 });

      if (invokeError) {
        throw invokeError;
      }

      if (!data.success) {
        throw new Error(data.error || 'Design generation failed');
      }

      console.log('✅ Design generated successfully', data.design);
      setDesignData(data.design);

      toast.success('Design generated successfully', {
        description: `${data.design.circuits.length} circuits designed and verified`
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('❌ Design generation failed:', errorMessage);
      setError(errorMessage);

      toast.error('Design generation failed', {
        description: errorMessage
      });
    } finally {
      setIsProcessing(false);
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
