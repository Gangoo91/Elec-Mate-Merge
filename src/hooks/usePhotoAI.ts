import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface PhotoClassification {
  photoType: string;
  description: string;
  tags: string[];
  confidence: number;
  issues: Array<{
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    regulation?: string;
  }>;
}

export interface ProjectSummary {
  summary: string;
  photoCount: number;
  typeCounts: Record<string, number>;
}

/**
 * Hook for AI-powered photo classification and project summaries.
 */
export function usePhotoAI() {
  const [isClassifying, setIsClassifying] = useState(false);
  const [isSummarising, setIsSummarising] = useState(false);
  const [classification, setClassification] = useState<PhotoClassification | null>(null);
  const [projectSummary, setProjectSummary] = useState<ProjectSummary | null>(null);

  /**
   * Classify a photo using AI vision.
   * Returns the classification result for the caller to accept/edit.
   */
  const classifyPhoto = useCallback(
    async (photoId: string, imageUrl?: string): Promise<PhotoClassification | null> => {
      setIsClassifying(true);
      setClassification(null);

      try {
        const { data, error } = await supabase.functions.invoke('classify-photo', {
          body: { photoId, imageUrl },
        });

        if (error) throw error;

        if (data?.success && data.classification) {
          setClassification(data.classification);

          // Show toast with summary
          const c = data.classification as PhotoClassification;
          const issueCount = c.issues?.length || 0;

          toast({
            title: `AI: ${c.description.slice(0, 60)}${c.description.length > 60 ? '...' : ''}`,
            description: `Type: ${c.photoType}${issueCount > 0 ? ` | ${issueCount} issue${issueCount !== 1 ? 's' : ''} detected` : ''}`,
          });

          return data.classification;
        }

        throw new Error(data?.message || 'Classification failed');
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Classification failed';
        console.error('AI classify error:', message);
        toast({
          title: 'AI classification failed',
          description: message,
          variant: 'destructive',
        });
        return null;
      } finally {
        setIsClassifying(false);
      }
    },
    []
  );

  /**
   * Apply an AI classification to a photo (user accepted the suggestion).
   */
  const applyClassification = useCallback(
    async (photoId: string, classification: PhotoClassification) => {
      try {
        const { error } = await supabase
          .from('safety_photos')
          .update({
            photo_type: classification.photoType,
            description: classification.description,
            tags: classification.tags,
          })
          .eq('id', photoId);

        if (error) throw error;

        toast({ title: 'AI classification applied' });
        return true;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to apply';
        toast({
          title: 'Failed to apply classification',
          description: message,
          variant: 'destructive',
        });
        return false;
      }
    },
    []
  );

  /**
   * Generate an AI summary for a project.
   */
  const summariseProject = useCallback(
    async (projectId: string): Promise<ProjectSummary | null> => {
      setIsSummarising(true);
      setProjectSummary(null);

      try {
        const { data, error } = await supabase.functions.invoke('summarise-photo-project', {
          body: { projectId },
        });

        if (error) throw error;

        if (data?.success) {
          const summary: ProjectSummary = {
            summary: data.summary,
            photoCount: data.photoCount,
            typeCounts: data.typeCounts,
          };
          setProjectSummary(summary);
          return summary;
        }

        throw new Error(data?.message || 'Summary generation failed');
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Summary failed';
        console.error('AI summary error:', message);
        toast({
          title: 'AI summary failed',
          description: message,
          variant: 'destructive',
        });
        return null;
      } finally {
        setIsSummarising(false);
      }
    },
    []
  );

  return {
    // Classification
    classifyPhoto,
    applyClassification,
    isClassifying,
    classification,

    // Summary
    summariseProject,
    isSummarising,
    projectSummary,
  };
}
