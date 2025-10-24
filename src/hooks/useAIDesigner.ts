import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { DesignInputs, InstallationDesign } from '@/types/installation-design';

// Client-side timeout for edge function calls (3 minutes safety limit)
const CLIENT_TIMEOUT_MS = 180000; // 180s (3 minutes max - realistic limit for parallel batches)

/**
 * Timeout wrapper for promises
 */
function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    ),
  ]);
}

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
  const [retryMessage, setRetryMessage] = useState('');

  const generateDesign = async (inputs: DesignInputs): Promise<boolean> => {
    setIsProcessing(true);
    setError(null);
    setDesignData(null);
    setProgress({ stage: 1, message: 'Initialising...', percent: 0 });

    // Validate inputs
    if ((!inputs.circuits || inputs.circuits.length === 0) && !inputs.additionalPrompt?.trim()) {
      toast.error('No circuits or description provided', {
        description: 'Please either add circuits manually or describe your requirements in the AI prompt.'
      });
      setIsProcessing(false);
      return false;
    }

    try {
      const SUPABASE_URL = 'https://jtwygbeceundfgnkirof.supabase.co';
      const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8';
      
      const requestBody = {
        mode: 'batch-design',
        aiConfig: {
          model: 'openai/gpt-5-mini',
          maxTokens: 24000,
          timeoutMs: CLIENT_TIMEOUT_MS,
          noMemory: true,
          ragPriority: { design: 95, bs7671: 85, installation: 75 }
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
      };

      // Streaming SSE request
      const response = await fetch(`${SUPABASE_URL}/functions/v1/designer-agent-v2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response stream available');
      }

      const decoder = new TextDecoder();
      let buffer = '';
      let latestDesign: InstallationDesign | null = null;

      setProgress({ stage: 2, message: 'Searching BS 7671...', percent: 10 });

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          
          const data = line.slice(6).trim();
          if (data === '[DONE]') continue;

          try {
            const chunk = JSON.parse(data);
            
            if (chunk.type === 'token') {
              const content = chunk.content || '';
              
              // Try to parse as batch progress
              try {
                const partialData = JSON.parse(content);
                
                if (partialData.circuits) {
                  const progressPercent = partialData.progress || 50;
                  const batchNum = partialData.batchComplete || 0;
                  const totalBatches = partialData.totalBatches || 1;
                  
                  setProgress({
                    percent: progressPercent,
                    stage: 3,
                    message: `Designing batch ${batchNum}/${totalBatches} (${partialData.circuits.length} circuits)...`
                  });
                  
                  // Build partial design
                  latestDesign = {
                    projectName: inputs.projectName,
                    location: inputs.location,
                    clientName: inputs.clientName,
                    electricianName: inputs.electricianName,
                    installationType: inputs.propertyType,
                    totalLoad: partialData.circuits.reduce((sum: number, c: any) => sum + (c.loadPower || 0), 0),
                    circuits: partialData.circuits,
                    materials: (partialData.materials || []).map((m: any) => 
                      typeof m === 'string' 
                        ? { name: m, specification: '', quantity: '1', unit: 'item' }
                        : m
                    ),
                    consumerUnit: {
                      type: 'split-load',
                      mainSwitchRating: inputs.mainSwitchRating || 100,
                      incomingSupply: {
                        voltage: inputs.voltage,
                        phases: inputs.phases,
                        incomingPFC: inputs.pscc || 3500,
                        Ze: inputs.ze,
                        earthingSystem: inputs.earthingSystem
                      }
                    },
                    diversityApplied: true,
                    diversityFactor: 0.7,
                    practicalGuidance: []
                  };
                  
                  // Show partial results in real-time
                  setDesignData(latestDesign);
                }
              } catch {
                // Not batch progress, just a message
                console.log('🌊 Stream:', content);
              }
            } else if (chunk.type === 'done') {
              // Final complete design
              if (chunk.data?.design) {
                latestDesign = chunk.data.design;
                setDesignData(latestDesign);
              }
              
              setProgress({ percent: 100, stage: 5, message: 'Design complete!' });
              
              toast.success('Design Generated!', {
                description: `${latestDesign?.circuits?.length || 0} circuits designed successfully`
              });
            } else if (chunk.type === 'error') {
              throw new Error(chunk.content || 'Design generation failed');
            }
          } catch (parseError) {
            console.warn('Failed to parse SSE chunk:', parseError);
          }
        }
      }

      if (!latestDesign) {
        throw new Error('No design data received - please check that you have added circuits or provided a project description');
      }

      setTimeout(() => setProgress(null), 800);
      return true;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('❌ Design generation failed:', errorMessage);
      setError(errorMessage);
      setProgress(null);

      toast.error('Design Failed', {
        description: errorMessage,
        duration: 6000
      });

      return false;
    } finally {
      setIsProcessing(false);
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
