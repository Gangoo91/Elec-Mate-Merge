import { supabase } from '@/integrations/supabase/client';
import { generateFallbackPDF } from './pdf-fallback-generator';
import { AgentOutputs, ProjectExport, GeneratedPDF } from './project-export';

export async function generateProjectPDFs(
  userId: string,
  agentOutputs: AgentOutputs,
  projectDetails: any,
  projectExport: ProjectExport
): Promise<void> {
  const pdfs: GeneratedPDF[] = [];
  const timestamp = new Date().toISOString();

  // 1. Design Specification
  if (agentOutputs.installer) {
    try {
      const designResult = await supabase.functions.invoke('generate-design-spec-pdf', {
        body: { 
          designData: agentOutputs.installer,
          userId
        }
      });

      if (designResult.data?.success) {
        pdfs.push({
          type: 'design_spec',
          name: 'Design Specification',
          url: designResult.data.downloadUrl,
          generatedAt: timestamp
        });
      } else {
        const fallbackUrl = await generateFallbackPDF('design_spec', agentOutputs.installer, projectDetails);
        pdfs.push({
          type: 'design_spec',
          name: 'Design Specification',
          url: fallbackUrl,
          generatedAt: timestamp
        });
      }
    } catch (error) {
      console.error('Design spec PDF error:', error);
      const fallbackUrl = await generateFallbackPDF('design_spec', agentOutputs.installer, projectDetails);
      pdfs.push({
        type: 'design_spec',
        name: 'Design Specification',
        url: fallbackUrl,
        generatedAt: timestamp
      });
    }
  }

  // 2. Quote
  if (agentOutputs.costEngineer) {
    try {
      const quoteResult = await supabase.functions.invoke('generate-quote-pdf', {
        body: { 
          quoteData: agentOutputs.costEngineer,
          userId
        }
      });

      if (quoteResult.data?.success) {
        pdfs.push({
          type: 'quote',
          name: 'Client Quote',
          url: quoteResult.data.downloadUrl,
          generatedAt: timestamp
        });
      } else {
        const fallbackUrl = await generateFallbackPDF('quote', agentOutputs.costEngineer, projectDetails);
        pdfs.push({
          type: 'quote',
          name: 'Client Quote',
          url: fallbackUrl,
          generatedAt: timestamp
        });
      }
    } catch (error) {
      console.error('Quote PDF error:', error);
      const fallbackUrl = await generateFallbackPDF('quote', agentOutputs.costEngineer, projectDetails);
      pdfs.push({
        type: 'quote',
        name: 'Client Quote',
        url: fallbackUrl,
        generatedAt: timestamp
      });
    }
  }

  // 3. RAMS
  if (agentOutputs.healthSafety) {
    try {
      const ramsResult = await supabase.functions.invoke('generate-rams-pdf', {
        body: { 
          ramsData: agentOutputs.healthSafety,
          userId
        }
      });

      if (ramsResult.data?.success) {
        pdfs.push({
          type: 'rams',
          name: 'Risk Assessment & Method Statement',
          url: ramsResult.data.downloadUrl,
          generatedAt: timestamp
        });
      } else {
        const fallbackUrl = await generateFallbackPDF('rams', agentOutputs.healthSafety, projectDetails);
        pdfs.push({
          type: 'rams',
          name: 'Risk Assessment & Method Statement',
          url: fallbackUrl,
          generatedAt: timestamp
        });
      }
    } catch (error) {
      console.error('RAMS PDF error:', error);
      const fallbackUrl = await generateFallbackPDF('rams', agentOutputs.healthSafety, projectDetails);
      pdfs.push({
        type: 'rams',
        name: 'Risk Assessment & Method Statement',
        url: fallbackUrl,
        generatedAt: timestamp
      });
    }
  }

  projectExport.generatedPDFs = pdfs;
}
