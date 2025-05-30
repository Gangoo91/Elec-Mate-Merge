
export interface DocumentTemplate {
  id: string;
  name: string;
  fileType: string;
  category: "invoicing" | "certification" | "reporting" | "contracts";
  lastUpdated: string;
  description: string;
  templateUrl: string;
  previewUrl?: string;
  fields?: TemplateField[];
}

export interface TemplateField {
  id: string;
  name: string;
  type: "text" | "number" | "date" | "select";
  label: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export interface GeneratedDocument {
  id: string;
  templateId: string;
  fileName: string;
  data: Record<string, any>;
  generatedAt: string;
  downloadUrl: string;
}

// Mock templates with actual template structure
export const documentTemplates: DocumentTemplate[] = [
  {
    id: "invoice-template",
    name: "Invoice Template",
    fileType: "PDF",
    category: "invoicing",
    lastUpdated: "May 2023",
    description: "Standard invoice template with itemized billing and payment details.",
    templateUrl: "/templates/invoice-template.json",
    previewUrl: "/templates/previews/invoice-preview.pdf",
    fields: [
      { id: "clientName", name: "clientName", type: "text", label: "Client Name", required: true, placeholder: "Enter client name" },
      { id: "clientAddress", name: "clientAddress", type: "text", label: "Client Address", required: true, placeholder: "Enter client address" },
      { id: "invoiceNumber", name: "invoiceNumber", type: "text", label: "Invoice Number", required: true, placeholder: "INV-001" },
      { id: "invoiceDate", name: "invoiceDate", type: "date", label: "Invoice Date", required: true, placeholder: "" },
      { id: "dueDate", name: "dueDate", type: "date", label: "Due Date", required: true, placeholder: "" },
      { id: "workDescription", name: "workDescription", type: "text", label: "Work Description", required: true, placeholder: "Describe the work performed" },
      { id: "totalAmount", name: "totalAmount", type: "number", label: "Total Amount (£)", required: true, placeholder: "0.00" }
    ]
  },
  {
    id: "eicr-template",
    name: "EICR Template",
    fileType: "PDF", 
    category: "certification",
    lastUpdated: "July 2023",
    description: "Electrical Installation Condition Report template with industry standard checks.",
    templateUrl: "/templates/eicr-template.json",
    previewUrl: "/templates/previews/eicr-preview.pdf",
    fields: [
      { id: "propertyAddress", name: "propertyAddress", type: "text", label: "Property Address", required: true, placeholder: "Enter property address" },
      { id: "clientName", name: "clientName", type: "text", label: "Client Name", required: true, placeholder: "Enter client name" },
      { id: "inspectionDate", name: "inspectionDate", type: "date", label: "Inspection Date", required: true, placeholder: "" },
      { id: "nextInspectionDate", name: "nextInspectionDate", type: "date", label: "Next Inspection Date", required: true, placeholder: "" },
      { id: "overallCondition", name: "overallCondition", type: "select", label: "Overall Condition", required: true, placeholder: "", options: ["Satisfactory", "Unsatisfactory", "Requires Improvement"] }
    ]
  }
];

export class DocumentTemplateService {
  static async getTemplates(): Promise<DocumentTemplate[]> {
    // In a real app, this would fetch from an API
    return documentTemplates;
  }

  static async getTemplate(id: string): Promise<DocumentTemplate | null> {
    return documentTemplates.find(template => template.id === id) || null;
  }

  static async generateDocument(templateId: string, data: Record<string, any>): Promise<GeneratedDocument> {
    const template = await this.getTemplate(templateId);
    if (!template) {
      throw new Error("Template not found");
    }

    // In a real app, this would call a backend service to generate the document
    const generatedDoc: GeneratedDocument = {
      id: `doc-${Date.now()}`,
      templateId,
      fileName: `${template.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.pdf`,
      data,
      generatedAt: new Date().toISOString(),
      downloadUrl: `/generated-docs/doc-${Date.now()}.pdf`
    };

    return generatedDoc;
  }

  static async downloadTemplate(templateId: string): Promise<void> {
    const template = await this.getTemplate(templateId);
    if (!template) {
      throw new Error("Template not found");
    }

    // Create a downloadable link for the template
    const link = document.createElement('a');
    link.href = template.templateUrl;
    link.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}.${template.fileType.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
