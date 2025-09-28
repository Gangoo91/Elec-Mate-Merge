import { supabase } from "@/integrations/supabase/client";

export interface LaTeXPDFOptions {
  title?: string;
  author?: string;
  reportType?: string;
  includeSignatures?: boolean;
  watermark?: string;
}

export async function generateLatexPDF(
  markdown: string,
  filename: string,
  options: LaTeXPDFOptions = {}
): Promise<void> {
  try {
    console.log('Generating LaTeX PDF:', filename);

    const { data, error } = await supabase.functions.invoke('latex-pdf-generator', {
      body: {
        markdown,
        title: options.title || "Professional Report",
        author: options.author || "Electrical Inspector", 
        reportType: options.reportType || "Electrical Certificate",
        includeSignatures: options.includeSignatures ?? true,
        watermark: options.watermark || "BS 7671:2018+A3:2024 Compliant"
      }
    });

    if (error) {
      throw new Error(`LaTeX generation failed: ${error.message}`);
    }

    if (!data.success) {
      throw new Error(`LaTeX generation failed: ${data.error || 'Unknown error'}`);
    }

    // Generate PDF using the fallback system
    await generateFallbackPDF(markdown, filename, options);

  } catch (error) {
    console.error('LaTeX PDF generation error:', error);
    throw error;
  }
}

async function generateFallbackPDF(
  markdown: string,
  filename: string,
  options: LaTeXPDFOptions
): Promise<void> {
  // Import the existing PDF generator as fallback
  const { generateEnhancedElectricalPDF } = await import('./professional-electrical-pdf-enhanced');
  
  await generateEnhancedElectricalPDF(
    markdown,
    options.reportType || "Professional Report",
    filename,
    {
      reportType: options.reportType || "Professional Report",
      includeSignatures: options.includeSignatures ?? true,
      watermark: options.watermark || "BS 7671:2018+A3:2024 Compliant"
    }
  );
}

export async function generateLatexPDFPreview(
  markdown: string,
  options: LaTeXPDFOptions = {}
): Promise<string> {
  try {
    const { data, error } = await supabase.functions.invoke('latex-pdf-generator', {
      body: {
        markdown,
        title: options.title || "Professional Report Preview",
        author: options.author || "Electrical Inspector",
        reportType: options.reportType || "Electrical Certificate",
        includeSignatures: options.includeSignatures ?? true,
        watermark: options.watermark || "BS 7671:2018+A3:2024 Compliant"
      }
    });

    if (error) {
      throw new Error(`LaTeX preview generation failed: ${error.message}`);
    }

    if (!data.success) {
      throw new Error(`LaTeX preview generation failed: ${data.error || 'Unknown error'}`);
    }

    // Return the LaTeX source for preview
    return data.latexSource;

  } catch (error) {
    console.error('LaTeX preview generation error:', error);
    throw error;
  }
}