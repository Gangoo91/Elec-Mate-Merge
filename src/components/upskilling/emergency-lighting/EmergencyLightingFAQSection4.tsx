import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const EmergencyLightingFAQSection4 = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "What is the legal status of BS 5266-1, and do I have to follow it?",
      answer: "BS 5266-1 is not legally mandatory, but it represents best practice and is widely referenced in legal proceedings. Following BS 5266-1 provides a robust defence against claims of inadequate emergency lighting provision. Courts and enforcement authorities typically expect compliance with relevant British Standards unless alternative approaches can demonstrate equivalent safety levels."
    },
    {
      id: 2,
      question: "How does BS 5266-1 relate to Building Regulations and the Fire Safety Order?",
      answer: "Building Regulations (Approved Document B) and the Fire Safety Order 2005 create legal requirements for emergency lighting. BS 5266-1 provides detailed technical guidance on how to achieve compliance with these legal requirements. The regulations set the 'what' and BS 5266-1 provides the 'how' - offering practical methods for design, installation, and maintenance."
    },
    {
      id: 3,
      question: "What's the difference between BS 5266-1 and BS EN 1838?",
      answer: "BS 5266-1 is the comprehensive code of practice covering all aspects from risk assessment to maintenance. BS EN 1838 is specifically focused on photometric requirements - it defines the light levels, uniformity ratios, and measurement methods needed for emergency lighting. BS 5266-1 references BS EN 1838 for technical lighting criteria."
    },
    {
      id: 4,
      question: "How often do I need to test emergency lighting, and which standard covers this?",
      answer: "Testing requirements are covered by BS 5266-8:2004 and BS EN 50172:2004. Daily visual checks, monthly functional tests (brief switch test), and annual full-duration tests are required. The frequency may vary based on system type and criticality, but these standards provide the baseline requirements for maintaining system reliability."
    },
    {
      id: 5,
      question: "Do I need different standards for different building types?",
      answer: "BS 5266-1 covers all non-domestic premises, but some building types have additional requirements. Healthcare facilities may reference HTM guidance, schools have specific DfE requirements, and hazardous areas need ATEX considerations. However, BS 5266-1 remains the foundational standard, with sector-specific guidance providing additional requirements."
    },
    {
      id: 6,
      question: "What documentation do I need to keep for compliance purposes?",
      answer: "Maintain comprehensive records throughout the system lifecycle: risk assessments, design calculations (following BS 5266-1 methodology), installation certificates, commissioning records, test results (as per BS 5266-8), maintenance logs, fault records, and any modifications. These records demonstrate ongoing compliance and due diligence in legal situations."
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <Card className="bg-elec-gray border-gray-600 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-cyan-400 drop-shadow-md" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-2">
        {faqs.map((faq) => (
          <div key={faq.id} className="border border-gray-600 rounded-lg">
            <Button
              variant="ghost"
              className="w-full p-4 text-left justify-between hover:bg-gray-700/50"
              onClick={() => toggleFAQ(faq.id)}
            >
              <span className="font-medium">{faq.question}</span>
              {openFAQ === faq.id ? (
                <ChevronUp className="h-4 w-4 text-cyan-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-cyan-400" />
              )}
            </Button>
            {openFAQ === faq.id && (
              <div className="px-4 pb-4">
                <p className="text-sm text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};