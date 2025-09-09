import { useState, useCallback } from 'react';
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

interface IdentificationResult {
  object: string;
  confidence: number;
  isElectrical: boolean;
}

export const useInstantIdentification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<IdentificationResult | null>(null);

  const identifyObject = useCallback(async (imageFile: File): Promise<IdentificationResult | null> => {
    setIsLoading(true);
    setResult(null);

    try {
      // Use a fast image classification model
      const classifier = await pipeline(
        'image-classification',
        'microsoft/resnet-50',
        { device: 'webgpu' }
      );

      const results = await classifier(imageFile);
      
      if (results && Array.isArray(results) && results.length > 0) {
        const topResult = results[0] as any; // Type assertion for flexibility
        
        // Electrical object mapping
        const electricalKeywords = [
          'outlet', 'socket', 'plug', 'switch', 'wire', 'cable', 'fuse', 'circuit',
          'electrical', 'power', 'voltage', 'panel', 'breaker', 'junction',
          'light', 'lamp', 'fixture', 'bulb', 'connector', 'adapter'
        ];
        
        const isElectrical = electricalKeywords.some(keyword => 
          (topResult.label || '').toLowerCase().includes(keyword)
        );

        // Clean up the label for better readability
        let cleanLabel = (topResult.label || 'electrical component')
          .replace(/_/g, ' ')
          .replace(/([a-z])([A-Z])/g, '$1 $2')
          .toLowerCase();

        // Map common electrical objects
        if (cleanLabel.includes('socket') || cleanLabel.includes('outlet')) {
          cleanLabel = 'electrical socket';
        } else if (cleanLabel.includes('plug')) {
          cleanLabel = 'electrical plug';
        } else if (cleanLabel.includes('switch')) {
          cleanLabel = 'light switch';
        } else if (cleanLabel.includes('panel') || cleanLabel.includes('box')) {
          cleanLabel = 'electrical panel';
        }

        const identification: IdentificationResult = {
          object: cleanLabel,
          confidence: topResult.score || 0.7,
          isElectrical
        };

        setResult(identification);
        return identification;
      }
    } catch (error) {
      console.warn('Object identification failed:', error);
      // Fallback to generic identification
      const fallback: IdentificationResult = {
        object: 'electrical installation',
        confidence: 0.7,
        isElectrical: true
      };
      setResult(fallback);
      return fallback;
    } finally {
      setIsLoading(false);
    }

    return null;
  }, []);

  return {
    identifyObject,
    isLoading,
    result
  };
};