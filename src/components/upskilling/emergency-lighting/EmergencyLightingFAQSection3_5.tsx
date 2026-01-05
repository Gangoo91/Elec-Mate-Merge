import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export const EmergencyLightingFAQSection3_5 = () => {
  const faqs = [
    {
      question: "Who is responsible for providing layout drawings?",
      answer: "The installing contractor has primary responsibility for providing as-built drawings, though the designer, principal contractor, and building owner all have specific duties under current legislation. Professional certification and handover procedures must be followed."
    },
    {
      question: "Are hand-drawn sketches acceptable for emergency lighting drawings?",
      answer: "Hand-drawn sketches are only acceptable for very small, simple installations. Larger buildings, public premises, and commercial properties require professional CAD-quality drawings for accuracy, compliance verification, and ongoing maintenance."
    },
    {
      question: "Do layout drawings need updating after every small change?",
      answer: "Yes, any modification affecting escape routes, luminaire positions, or circuit arrangements must be documented immediately. Even minor changes can impact compliance and emergency egress effectiveness."
    },
    {
      question: "What file formats should be provided for emergency lighting drawings?",
      answer: "Provide both PDF format for universal viewing and native CAD formats (DWG/IFC) for future modifications. Ensure drawings are accessible to building management teams and emergency services."
    },
    {
      question: "How often should emergency lighting drawings be reviewed?",
      answer: "Drawings should be reviewed annually during full testing procedures and immediately following any building modifications, tenant changes, or system upgrades that could affect emergency lighting performance."
    },
    {
      question: "What happens if drawings don't match the actual installation during an inspection?",
      answer: "Discrepancies between drawings and installations can result in compliance failures, formal notices, operational restrictions, and potential legal liability. Emergency surveys and corrective action may be required."
    },
    {
      question: "Are there specific requirements for BIM integration in emergency lighting drawings?",
      answer: "While not mandatory, BIM integration is increasingly expected for larger projects. It provides better coordination, data management, and lifecycle maintenance capabilities, particularly for complex buildings."
    }
  ];

  return (
    <Card className="bg-slate-200/20 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        {faqs.map((faq, index) => (
          <div key={index}>
            <h4 className="font-semibold text-elec-yellow mb-2">Q{index + 1}: {faq.question}</h4>
            <p className="text-foreground">{faq.answer}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};