
export interface DocumentTemplate {
  id: number;
  title: string;
  description: string;
  type: string;
  downloadUrl: string;
  previewUrl: string;
  fileName: string;
}

export const documentTemplates: DocumentTemplate[] = [
  {
    id: 1,
    title: "Electrical Installation Certificate",
    description: "Standard certificate for completed electrical installations",
    type: "PDF Form",
    downloadUrl: "/documents/electrical-installation-certificate.pdf",
    previewUrl: "/documents/electrical-installation-certificate.pdf",
    fileName: "electrical-installation-certificate.pdf"
  },
  {
    id: 2,
    title: "Minor Works Certificate",
    description: "For small-scale electrical work and alterations",
    type: "PDF Form",
    downloadUrl: "/documents/minor-works-certificate.pdf",
    previewUrl: "/documents/minor-works-certificate.pdf",
    fileName: "minor-works-certificate.pdf"
  },
  {
    id: 3,
    title: "Electrical Condition Report",
    description: "For reporting on the condition of existing electrical installations",
    type: "PDF Form",
    downloadUrl: "/documents/electrical-condition-report.pdf",
    previewUrl: "/documents/electrical-condition-report.pdf",
    fileName: "electrical-condition-report.pdf"
  },
  {
    id: 4,
    title: "Risk Assessment Template",
    description: "Template for documenting potential hazards and control measures",
    type: "Word Document",
    downloadUrl: "/documents/risk-assessment-template.docx",
    previewUrl: "/documents/risk-assessment-template-preview.pdf",
    fileName: "risk-assessment-template.docx"
  },
  {
    id: 5,
    title: "Method Statement Template",
    description: "Step-by-step guide for carrying out work safely",
    type: "Word Document",
    downloadUrl: "/documents/method-statement-template.docx", 
    previewUrl: "/documents/method-statement-template-preview.pdf",
    fileName: "method-statement-template.docx"
  },
  {
    id: 6,
    title: "Client Handover Checklist",
    description: "Checklist for ensuring all aspects of work are complete before handover",
    type: "Excel Sheet",
    downloadUrl: "/documents/client-handover-checklist.xlsx",
    previewUrl: "/documents/client-handover-checklist-preview.pdf",
    fileName: "client-handover-checklist.xlsx"
  },
  {
    id: 7,
    title: "Site Inspection Form",
    description: "Comprehensive form for site inspections and compliance checks",
    type: "PDF Form",
    downloadUrl: "/documents/site-inspection-form.pdf",
    previewUrl: "/documents/site-inspection-form.pdf",
    fileName: "site-inspection-form.pdf"
  },
  {
    id: 8,
    title: "Electrical Test Results Sheet",
    description: "Template for recording electrical testing results",
    type: "Excel Sheet",
    downloadUrl: "/documents/electrical-test-results.xlsx",
    previewUrl: "/documents/electrical-test-results-preview.pdf",
    fileName: "electrical-test-results.xlsx"
  },
  {
    id: 9,
    title: "RAMS Document Template",
    description: "Risk Assessment and Method Statement combined template",
    type: "Word Document",
    downloadUrl: "/documents/rams-template.docx",
    previewUrl: "/documents/rams-template-preview.pdf",
    fileName: "rams-template.docx"
  }
];
