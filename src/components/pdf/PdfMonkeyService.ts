import axios from 'axios';

interface PdfMonkeyConfig {
  apiKey: string;
  templateId: string;
}

interface MinorWorksTemplateData {
  // Certificate details
  certificateNumber: string;
  workDate: string;
  
  // Client information
  clientName: string;
  propertyAddress: string;
  postcode: string;
  
  // Work description
  workDescription: string;
  workType: string;
  
  // Supply & earthing
  supplyVoltage: string;
  earthingArrangement: string;
  
  // Circuit details
  circuitDesignation: string;
  protectiveDeviceType: string;
  protectiveDeviceRating: string;
  
  // Test results
  continuityR1R2: string;
  earthFaultLoopImpedance: string;
  maxPermittedZs: string;
  polarity: string;
  
  // Declaration
  electricianName: string;
  position: string;
  signatureDate: string;
  
  // Additional fields
  [key: string]: any;
}

export class PdfMonkeyService {
  private config: PdfMonkeyConfig | null = null;
  private baseUrl = 'https://api.pdfmonkey.io/api/v1';

  setConfig(apiKey: string, templateId: string) {
    this.config = { apiKey, templateId };
  }

  isConfigured(): boolean {
    return this.config !== null && this.config.apiKey !== '' && this.config.templateId !== '';
  }

  async generatePdf(formData: any): Promise<{ success: boolean; pdfUrl?: string; error?: string }> {
    if (!this.config) {
      return { success: false, error: 'PDF Monkey not configured' };
    }

    try {
      const templateData = this.mapFormDataToTemplate(formData);
      
      const response = await axios.post(
        `${this.baseUrl}/documents`,
        {
          document: {
            document_template_id: this.config.templateId,
            payload: templateData,
            status: 'pending'
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data && response.data.document) {
        const documentId = response.data.document.id;
        
        // Poll for completion
        const pdfUrl = await this.waitForPdfGeneration(documentId);
        
        if (pdfUrl) {
          return { success: true, pdfUrl };
        } else {
          return { success: false, error: 'PDF generation timed out' };
        }
      }

      return { success: false, error: 'Invalid response from PDF Monkey' };
    } catch (error: any) {
      console.error('PDF Monkey error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'PDF generation failed' 
      };
    }
  }

  private async waitForPdfGeneration(documentId: string, maxAttempts = 30): Promise<string | null> {
    if (!this.config) return null;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const response = await axios.get(
          `${this.baseUrl}/documents/${documentId}`,
          {
            headers: {
              'Authorization': `Bearer ${this.config.apiKey}`
            }
          }
        );

        const document = response.data.document;
        
        if (document.status === 'success' && document.download_url) {
          return document.download_url;
        } else if (document.status === 'failure') {
          console.error('PDF generation failed:', document.failure_cause);
          return null;
        }

        // Wait before next attempt
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error('Error polling PDF status:', error);
      }
    }

    return null;
  }

  private mapFormDataToTemplate(formData: any): MinorWorksTemplateData {
    // Map form data to PDF template fields
    // This mapping should be customisable based on the template structure
    return {
      certificateNumber: formData.certificateNumber || '',
      workDate: formData.workDate || '',
      clientName: formData.clientName || '',
      propertyAddress: formData.propertyAddress || '',
      postcode: formData.postcode || '',
      workDescription: formData.workDescription || '',
      workType: formData.workType || '',
      supplyVoltage: formData.supplyVoltage || '',
      earthingArrangement: formData.earthingArrangement || '',
      circuitDesignation: formData.circuitDesignation || '',
      protectiveDeviceType: formData.protectiveDeviceType || '',
      protectiveDeviceRating: formData.protectiveDeviceRating || '',
      continuityR1R2: formData.continuityR1R2 || '',
      earthFaultLoopImpedance: formData.earthFaultLoopImpedance || '',
      maxPermittedZs: formData.maxPermittedZs || '',
      polarity: formData.polarity || '',
      electricianName: formData.electricianName || '',
      position: formData.position || '',
      signatureDate: formData.signatureDate || '',
      
      // Map all other fields
      ...formData
    };
  }

  async testConnection(): Promise<{ success: boolean; error?: string }> {
    if (!this.config) {
      return { success: false, error: 'No configuration provided' };
    }

    try {
      const response = await axios.get(
        `${this.baseUrl}/document_templates/${this.config.templateId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`
          }
        }
      );

      if (response.status === 200) {
        return { success: true };
      }

      return { success: false, error: 'Template not found' };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Connection failed' 
      };
    }
  }
}

export const pdfMonkeyService = new PdfMonkeyService();