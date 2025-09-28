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

    // For now, download the LaTeX source file
    // In production, this would be the compiled PDF
    const latexBlob = new Blob([data.latexSource], { type: 'text/plain' });
    const url = URL.createObjectURL(latexBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename.replace('.pdf', '.tex');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log('LaTeX source downloaded successfully');

    // Also create a simple fallback PDF using current system
    // This is temporary until we have full LaTeX compilation
    await generateFallbackPDF(markdown, filename.replace('.tex', '.pdf'), options);

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
  const { generateProfessionalElectricalPDF } = await import('./professional-electrical-pdf');
  
  await generateProfessionalElectricalPDF(
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