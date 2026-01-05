import { HelpCircle, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

const faqData = [
  {
    question: "What are the legal consequences of not providing electrical certificates?",
    answer: "Failure to provide appropriate certificates can result in criminal prosecution under the Electricity at Work Regulations 1989, civil liability for accidents, building control enforcement action, insurance policy invalidation, and professional disciplinary measures. In rental properties, it may also breach Housing Act requirements."
  },
  {
    question: "Who can legally sign electrical certificates?",
    answer: "Only competent persons can sign electrical certificates. This requires appropriate qualifications (typically City & Guilds 2391 or equivalent), practical experience, current knowledge of BS 7671, professional indemnity insurance, and understanding of legal responsibilities. The person signing accepts full liability for the accuracy of all information."
  },
  {
    question: "What's the difference between an EIC and MEIWC?",
    answer: "An EIC (Electrical Installation Certificate) is required for new installations, complete rewires, new consumer units, and addition of new circuits. A MEIWC (Minor Electrical Installation Works Certificate) is for minor additions like extra socket outlets, lighting points, or accessory replacements that don't require new circuits."
  },
  {
    question: "How long should electrical certificates be retained?",
    answer: "Certificates should be retained for the life of the electrical installation. Building owners must keep copies and provide them to subsequent owners, tenants, or their representatives. For rental properties, certificates must be provided to tenants and local authorities upon request."
  },
  {
    question: "Can electronic certificates be used instead of paper copies?",
    answer: "Yes, electronic certificates are acceptable provided they maintain security, authenticity, and accessibility. They must be completed using approved software, include digital signatures where appropriate, be stored securely with backup copies, and be easily printable when required."
  },
  {
    question: "What happens if defects are found during inspection and testing?",
    answer: "All defects must be documented and coded appropriately (C1, C2, or C3). Dangerous defects (C1) require immediate action before energising. Potentially dangerous defects (C2) need urgent attention. Improvement recommendations (C3) should be addressed during next maintenance. The certificate must clearly identify all non-compliances."
  },
  {
    question: "Is Building Regulations notification always required for electrical work?",
    answer: "Building Regulations Part P notification is required for most electrical work in dwellings unless performed by a registered competent person scheme member. Work in kitchens, bathrooms, outdoors, and new circuits always requires notification. Non-notifiable work still requires appropriate certification."
  },
  {
    question: "Can certificates be issued for work not witnessed during installation?",
    answer: "Certificates should only cover work that has been properly inspected and tested. If the certifier didn't witness installation, they must conduct thorough inspection to verify compliance. Any limitations in inspection scope must be clearly documented. Never sign certificates for work you cannot verify."
  },
  {
    question: "What should be done if a certificate contains errors after completion?",
    answer: "Minor errors can be corrected with clearly initialled amendments if discovered immediately. Significant errors require a new certificate to be issued. The original should be marked as superseded and withdrawn. Never alter certificates fraudulently or backdate corrections."
  },
  {
    question: "How does certification relate to insurance and warranties?",
    answer: "Proper certification is often essential for insurance validity and warranty claims. Insurers may require certificates for new installations or after electrical incidents. Product warranties frequently require certified installation by competent persons. Missing or incorrect certificates can void coverage and claims."
  },
  {
    question: "What are the requirements for competent person scheme membership?",
    answer: "Scheme membership requires relevant qualifications, insurance coverage, regular assessment visits, continuing professional development, adherence to scheme rules, and payment of fees. Members can self-certify compliance with Building Regulations Part P without local authority notification."
  },
  {
    question: "How should remedial work recommendations be prioritised?",
    answer: "C1 (danger present) requires immediate action - installation should not be energised. C2 (potentially dangerous) requires urgent remedial action. C3 (improvement recommended) should be addressed at next review. FI (further investigation) requires additional inspection before coding. All recommendations should include timeframes and priority levels."
  }
];

const CertificationPurposeFAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (value: string) => {
    setOpenItems(current =>
      current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value]
    );
  };

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqData.map((faq, index) => (
          <Collapsible 
            key={index}
            open={openItems.includes(index.toString())}
            onOpenChange={() => toggleItem(index.toString())}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-[#323232] rounded-lg hover:bg-[#3a3a3a] transition-colors group">
              <span className="text-left text-foreground font-medium group-hover:text-elec-yellow">
                {faq.question}
              </span>
              <ChevronDown className={`h-4 w-4 text-foreground transition-transform ${
                openItems.includes(index.toString()) ? 'rotate-180' : ''
              }`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 py-3 bg-[#2a2a2a] rounded-b-lg">
              <p className="text-foreground text-sm leading-relaxed">
                {faq.answer}
              </p>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
};

export default CertificationPurposeFAQ;