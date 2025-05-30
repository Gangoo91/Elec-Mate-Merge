
export interface DocumentTemplate {
  id: string;
  name: string;
  fileType: string;
  category: "invoicing" | "certification" | "reporting" | "contracts" | "health_safety" | "compliance" | "business";
  lastUpdated: string;
  description: string;
  templateUrl: string;
  previewUrl?: string;
  fields?: TemplateField[];
  ukSpecific?: boolean;
  regulationCompliant?: string[];
  difficulty?: "beginner" | "intermediate" | "advanced";
  estimatedTime?: string;
}

export interface TemplateField {
  id: string;
  name: string;
  type: "text" | "number" | "date" | "select" | "textarea" | "currency" | "postcode" | "email" | "phone";
  label: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
  validation?: string;
  helpText?: string;
}

export interface GeneratedDocument {
  id: string;
  templateId: string;
  fileName: string;
  data: Record<string, any>;
  generatedAt: string;
  downloadUrl: string;
}

// Comprehensive UK-specific templates
export const documentTemplates: DocumentTemplate[] = [
  // Invoicing Templates
  {
    id: "invoice-template",
    name: "Professional Invoice",
    fileType: "PDF",
    category: "invoicing",
    lastUpdated: "December 2024",
    description: "VAT-compliant invoice template with itemized billing and payment details.",
    templateUrl: "/templates/invoice-template.json",
    previewUrl: "/templates/previews/invoice-preview.pdf",
    ukSpecific: true,
    regulationCompliant: ["VAT Regulations", "Companies Act 2006"],
    difficulty: "beginner",
    estimatedTime: "5 minutes",
    fields: [
      { id: "companyName", name: "companyName", type: "text", label: "Company Name", required: true, placeholder: "Your Company Ltd" },
      { id: "companyAddress", name: "companyAddress", type: "textarea", label: "Company Address", required: true, placeholder: "123 Business Street\nLondon\nSW1A 1AA" },
      { id: "vatNumber", name: "vatNumber", type: "text", label: "VAT Number", required: false, placeholder: "GB123456789", validation: "GB[0-9]{9}" },
      { id: "clientName", name: "clientName", type: "text", label: "Client Name", required: true, placeholder: "Enter client name" },
      { id: "clientAddress", name: "clientAddress", type: "textarea", label: "Client Address", required: true, placeholder: "Enter client address" },
      { id: "invoiceNumber", name: "invoiceNumber", type: "text", label: "Invoice Number", required: true, placeholder: "INV-2024-001" },
      { id: "invoiceDate", name: "invoiceDate", type: "date", label: "Invoice Date", required: true, placeholder: "" },
      { id: "dueDate", name: "dueDate", type: "date", label: "Due Date", required: true, placeholder: "" },
      { id: "workDescription", name: "workDescription", type: "textarea", label: "Work Description", required: true, placeholder: "Describe the work performed" },
      { id: "netAmount", name: "netAmount", type: "currency", label: "Net Amount (£)", required: true, placeholder: "0.00" },
      { id: "vatRate", name: "vatRate", type: "select", label: "VAT Rate", required: true, placeholder: "", options: ["0%", "5%", "20%"] },
      { id: "paymentTerms", name: "paymentTerms", type: "select", label: "Payment Terms", required: true, placeholder: "", options: ["Net 7 days", "Net 14 days", "Net 30 days"] }
    ]
  },
  {
    id: "quote-template",
    name: "Professional Quote",
    fileType: "PDF",
    category: "invoicing",
    lastUpdated: "December 2024",
    description: "Detailed quote template with materials breakdown and terms.",
    templateUrl: "/templates/quote-template.json",
    previewUrl: "/templates/previews/quote-preview.pdf",
    ukSpecific: true,
    difficulty: "beginner",
    estimatedTime: "10 minutes",
    fields: [
      { id: "companyName", name: "companyName", type: "text", label: "Company Name", required: true, placeholder: "Your Company Ltd" },
      { id: "clientName", name: "clientName", type: "text", label: "Client Name", required: true, placeholder: "Enter client name" },
      { id: "projectDescription", name: "projectDescription", type: "textarea", label: "Project Description", required: true, placeholder: "Describe the electrical work" },
      { id: "quoteNumber", name: "quoteNumber", type: "text", label: "Quote Number", required: true, placeholder: "QUO-2024-001" },
      { id: "validUntil", name: "validUntil", type: "date", label: "Valid Until", required: true, placeholder: "" },
      { id: "totalAmount", name: "totalAmount", type: "currency", label: "Total Amount (£)", required: true, placeholder: "0.00" }
    ]
  },

  // Certification Templates
  {
    id: "eicr-template",
    name: "EICR Certificate",
    fileType: "PDF",
    category: "certification",
    lastUpdated: "December 2024",
    description: "BS 7671 compliant Electrical Installation Condition Report template.",
    templateUrl: "/templates/eicr-template.json",
    previewUrl: "/templates/previews/eicr-preview.pdf",
    ukSpecific: true,
    regulationCompliant: ["BS 7671", "IET Wiring Regulations"],
    difficulty: "advanced",
    estimatedTime: "30 minutes",
    fields: [
      { id: "propertyAddress", name: "propertyAddress", type: "textarea", label: "Property Address", required: true, placeholder: "Enter property address" },
      { id: "clientName", name: "clientName", type: "text", label: "Client Name", required: true, placeholder: "Enter client name" },
      { id: "inspectionDate", name: "inspectionDate", type: "date", label: "Inspection Date", required: true, placeholder: "" },
      { id: "nextInspectionDate", name: "nextInspectionDate", type: "date", label: "Next Inspection Date", required: true, placeholder: "" },
      { id: "overallCondition", name: "overallCondition", type: "select", label: "Overall Condition", required: true, placeholder: "", options: ["Satisfactory", "Unsatisfactory", "Requires Improvement"] },
      { id: "inspectorName", name: "inspectorName", type: "text", label: "Inspector Name", required: true, placeholder: "Your full name" },
      { id: "inspectorSignature", name: "inspectorSignature", type: "text", label: "Inspector Signature", required: true, placeholder: "Digital signature" }
    ]
  },
  {
    id: "eic-template",
    name: "Electrical Installation Certificate",
    fileType: "PDF",
    category: "certification",
    lastUpdated: "December 2024",
    description: "BS 7671 compliant installation certificate for new electrical work.",
    templateUrl: "/templates/eic-template.json",
    previewUrl: "/templates/previews/eic-preview.pdf",
    ukSpecific: true,
    regulationCompliant: ["BS 7671", "Part P Building Regulations"],
    difficulty: "advanced",
    estimatedTime: "25 minutes",
    fields: [
      { id: "propertyAddress", name: "propertyAddress", type: "textarea", label: "Property Address", required: true, placeholder: "Enter property address" },
      { id: "clientName", name: "clientName", type: "text", label: "Client Name", required: true, placeholder: "Enter client name" },
      { id: "installationDate", name: "installationDate", type: "date", label: "Installation Date", required: true, placeholder: "" },
      { id: "workDescription", name: "workDescription", type: "textarea", label: "Work Description", required: true, placeholder: "Describe the electrical installation" },
      { id: "designerName", name: "designerName", type: "text", label: "Designer Name", required: true, placeholder: "Designer's full name" },
      { id: "installerName", name: "installerName", type: "text", label: "Installer Name", required: true, placeholder: "Installer's full name" },
      { id: "testerName", name: "testerName", type: "text", label: "Tester Name", required: true, placeholder: "Tester's full name" }
    ]
  },
  {
    id: "minor-works-template",
    name: "Minor Electrical Works Certificate",
    fileType: "PDF",
    category: "certification",
    lastUpdated: "December 2024",
    description: "Certificate for minor electrical works and alterations.",
    templateUrl: "/templates/minor-works-template.json",
    previewUrl: "/templates/previews/minor-works-preview.pdf",
    ukSpecific: true,
    regulationCompliant: ["BS 7671"],
    difficulty: "intermediate",
    estimatedTime: "15 minutes",
    fields: [
      { id: "propertyAddress", name: "propertyAddress", type: "textarea", label: "Property Address", required: true, placeholder: "Enter property address" },
      { id: "clientName", name: "clientName", type: "text", label: "Client Name", required: true, placeholder: "Enter client name" },
      { id: "workDate", name: "workDate", type: "date", label: "Work Completion Date", required: true, placeholder: "" },
      { id: "workDescription", name: "workDescription", type: "textarea", label: "Work Description", required: true, placeholder: "Describe the minor works performed" },
      { id: "technicianName", name: "technicianName", type: "text", label: "Technician Name", required: true, placeholder: "Technician's full name" }
    ]
  },

  // Health & Safety Templates
  {
    id: "risk-assessment-template",
    name: "Electrical Risk Assessment",
    fileType: "PDF",
    category: "health_safety",
    lastUpdated: "December 2024",
    description: "Comprehensive risk assessment template for electrical work.",
    templateUrl: "/templates/risk-assessment-template.json",
    previewUrl: "/templates/previews/risk-assessment-preview.pdf",
    ukSpecific: true,
    regulationCompliant: ["Health and Safety at Work Act 1974", "CDM Regulations 2015"],
    difficulty: "intermediate",
    estimatedTime: "20 minutes",
    fields: [
      { id: "projectName", name: "projectName", type: "text", label: "Project Name", required: true, placeholder: "Enter project name" },
      { id: "location", name: "location", type: "textarea", label: "Location", required: true, placeholder: "Enter work location" },
      { id: "assessorName", name: "assessorName", type: "text", label: "Assessor Name", required: true, placeholder: "Risk assessor's name" },
      { id: "assessmentDate", name: "assessmentDate", type: "date", label: "Assessment Date", required: true, placeholder: "" },
      { id: "workDescription", name: "workDescription", type: "textarea", label: "Work Description", required: true, placeholder: "Describe the electrical work" },
      { id: "hazardsIdentified", name: "hazardsIdentified", type: "textarea", label: "Hazards Identified", required: true, placeholder: "List potential hazards" },
      { id: "controlMeasures", name: "controlMeasures", type: "textarea", label: "Control Measures", required: true, placeholder: "List control measures" }
    ]
  },
  {
    id: "method-statement-template",
    name: "Method Statement",
    fileType: "PDF",
    category: "health_safety",
    lastUpdated: "December 2024",
    description: "Detailed method statement for safe electrical work procedures.",
    templateUrl: "/templates/method-statement-template.json",
    previewUrl: "/templates/previews/method-statement-preview.pdf",
    ukSpecific: true,
    regulationCompliant: ["CDM Regulations 2015", "HASAWA 1974"],
    difficulty: "intermediate",
    estimatedTime: "25 minutes",
    fields: [
      { id: "projectName", name: "projectName", type: "text", label: "Project Name", required: true, placeholder: "Enter project name" },
      { id: "workActivity", name: "workActivity", type: "text", label: "Work Activity", required: true, placeholder: "Enter work activity" },
      { id: "location", name: "location", type: "textarea", label: "Location", required: true, placeholder: "Enter work location" },
      { id: "preparerName", name: "preparerName", type: "text", label: "Prepared By", required: true, placeholder: "Method statement preparer" },
      { id: "approverName", name: "approverName", type: "text", label: "Approved By", required: true, placeholder: "Method statement approver" },
      { id: "workSequence", name: "workSequence", type: "textarea", label: "Work Sequence", required: true, placeholder: "Step-by-step work sequence" }
    ]
  },

  // Compliance Templates
  {
    id: "pat-testing-template",
    name: "PAT Testing Certificate",
    fileType: "PDF",
    category: "compliance",
    lastUpdated: "December 2024",
    description: "Portable Appliance Testing certificate template.",
    templateUrl: "/templates/pat-testing-template.json",
    previewUrl: "/templates/previews/pat-testing-preview.pdf",
    ukSpecific: true,
    regulationCompliant: ["IET Code of Practice for In-service Testing"],
    difficulty: "intermediate",
    estimatedTime: "10 minutes",
    fields: [
      { id: "clientName", name: "clientName", type: "text", label: "Client Name", required: true, placeholder: "Enter client name" },
      { id: "premises", name: "premises", type: "textarea", label: "Premises", required: true, placeholder: "Enter premises address" },
      { id: "testDate", name: "testDate", type: "date", label: "Test Date", required: true, placeholder: "" },
      { id: "nextTestDate", name: "nextTestDate", type: "date", label: "Next Test Date", required: true, placeholder: "" },
      { id: "testerName", name: "testerName", type: "text", label: "Tester Name", required: true, placeholder: "PAT tester's name" },
      { id: "testResults", name: "testResults", type: "select", label: "Overall Results", required: true, placeholder: "", options: ["Pass", "Fail", "Further Investigation Required"] }
    ]
  },

  // Contract Templates
  {
    id: "electrical-contract-template",
    name: "Electrical Work Contract",
    fileType: "PDF",
    category: "contracts",
    lastUpdated: "December 2024",
    description: "Comprehensive contract template for electrical work projects.",
    templateUrl: "/templates/electrical-contract-template.json",
    previewUrl: "/templates/previews/electrical-contract-preview.pdf",
    ukSpecific: true,
    regulationCompliant: ["Consumer Rights Act 2015", "Supply of Goods and Services Act 1982"],
    difficulty: "advanced",
    estimatedTime: "30 minutes",
    fields: [
      { id: "contractorName", name: "contractorName", type: "text", label: "Contractor Name", required: true, placeholder: "Your company name" },
      { id: "contractorAddress", name: "contractorAddress", type: "textarea", label: "Contractor Address", required: true, placeholder: "Your company address" },
      { id: "clientName", name: "clientName", type: "text", label: "Client Name", required: true, placeholder: "Client's name" },
      { id: "clientAddress", name: "clientAddress", type: "textarea", label: "Client Address", required: true, placeholder: "Client's address" },
      { id: "workDescription", name: "workDescription", type: "textarea", label: "Work Description", required: true, placeholder: "Detailed description of electrical work" },
      { id: "contractValue", name: "contractValue", type: "currency", label: "Contract Value (£)", required: true, placeholder: "0.00" },
      { id: "startDate", name: "startDate", type: "date", label: "Start Date", required: true, placeholder: "" },
      { id: "completionDate", name: "completionDate", type: "date", label: "Completion Date", required: true, placeholder: "" },
      { id: "warrantyPeriod", name: "warrantyPeriod", type: "select", label: "Warranty Period", required: true, placeholder: "", options: ["12 months", "24 months", "36 months"] }
    ]
  },

  // Business Templates
  {
    id: "maintenance-agreement-template",
    name: "Electrical Maintenance Agreement",
    fileType: "PDF",
    category: "business",
    lastUpdated: "December 2024",
    description: "Annual maintenance agreement template for ongoing electrical services.",
    templateUrl: "/templates/maintenance-agreement-template.json",
    previewUrl: "/templates/previews/maintenance-agreement-preview.pdf",
    ukSpecific: true,
    difficulty: "intermediate",
    estimatedTime: "20 minutes",
    fields: [
      { id: "serviceProvider", name: "serviceProvider", type: "text", label: "Service Provider", required: true, placeholder: "Your company name" },
      { id: "clientName", name: "clientName", type: "text", label: "Client Name", required: true, placeholder: "Client's name" },
      { id: "premises", name: "premises", type: "textarea", label: "Premises", required: true, placeholder: "Property to be maintained" },
      { id: "agreementPeriod", name: "agreementPeriod", type: "select", label: "Agreement Period", required: true, placeholder: "", options: ["12 months", "24 months", "36 months"] },
      { id: "annualFee", name: "annualFee", type: "currency", label: "Annual Fee (£)", required: true, placeholder: "0.00" },
      { id: "responseTime", name: "responseTime", type: "select", label: "Emergency Response Time", required: true, placeholder: "", options: ["4 hours", "8 hours", "24 hours", "48 hours"] }
    ]
  }
];

export class DocumentTemplateService {
  static async getTemplates(): Promise<DocumentTemplate[]> {
    return documentTemplates;
  }

  static async getTemplate(id: string): Promise<DocumentTemplate | null> {
    return documentTemplates.find(template => template.id === id) || null;
  }

  static async getTemplatesByCategory(category: string): Promise<DocumentTemplate[]> {
    if (category === "all") return documentTemplates;
    return documentTemplates.filter(template => template.category === category);
  }

  static async searchTemplates(query: string): Promise<DocumentTemplate[]> {
    const searchTerm = query.toLowerCase();
    return documentTemplates.filter(template => 
      template.name.toLowerCase().includes(searchTerm) ||
      template.description.toLowerCase().includes(searchTerm) ||
      template.category.toLowerCase().includes(searchTerm)
    );
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

  static getTemplateCategories(): Array<{id: string, label: string, count: number}> {
    const categories = [
      { id: "all", label: "All Templates" },
      { id: "invoicing", label: "Invoicing & Quotes" },
      { id: "certification", label: "Certificates" },
      { id: "health_safety", label: "Health & Safety" },
      { id: "compliance", label: "Compliance" },
      { id: "contracts", label: "Contracts" },
      { id: "business", label: "Business" }
    ];

    return categories.map(cat => ({
      ...cat,
      count: cat.id === "all" 
        ? documentTemplates.length 
        : documentTemplates.filter(t => t.category === cat.id).length
    }));
  }
}
