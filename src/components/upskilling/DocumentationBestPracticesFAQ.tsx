import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const DocumentationBestPracticesFAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const faqData = [
    {
      id: "documentation-accuracy",
      question: "How can I ensure accuracy when transferring test results from instruments to certificates?",
      answer: "Use direct digital recording where possible to eliminate transcription errors. When manual recording is necessary, implement double-checking procedures: record results immediately, verify readings before moving to next test, use structured recording sheets with clear formatting, and cross-reference critical values. Consider using mobile apps or voice recording for complex observations, then transcribe carefully in controlled environment."
    },
    {
      id: "digital-vs-handwritten",
      question: "Are digitally completed certificates as legally valid as handwritten ones?",
      answer: "Yes, digital certificates have the same legal validity as handwritten ones, provided they include appropriate electronic signatures and meet industry standards. However, ensure your digital system produces certificates that comply with current format requirements, maintain audit trails for changes, include competent person identification, and provide secure backup procedures. Some clients may prefer physical copies, so establish clear distribution procedures."
    },
    {
      id: "incomplete-testing",
      question: "How should I document situations where complete testing wasn't possible due to operational constraints?",
      answer: "Use the limitations section to clearly document what couldn't be tested and why. Specify exact circuits or areas not inspected, explain operational constraints (e.g., 'IT server room circuits not de-energised due to business requirements'), describe potential implications of uninspected areas, recommend future investigation during planned shutdowns, and ensure client acknowledges these limitations in writing. Consider using FI codes where appropriate for uninspected areas."
    },
    {
      id: "client-pressure",
      question: "What should I do when clients pressure me to modify technical findings for commercial reasons?",
      answer: "Maintain professional integrity regardless of commercial pressure. Your professional judgment and legal liability require honest, accurate reporting. Explain the technical rationale clearly, reference relevant standards and regulations, document any client disagreements, offer to arrange second opinions if client remains concerned, but never compromise technical accuracy for commercial convenience. Professional indemnity insurance won't protect against deliberate misrepresentation."
    },
    {
      id: "documentation-storage",
      question: "How long should I retain copies of electrical certificates and what backup procedures are recommended?",
      answer: "Retain certificates for the life of the installation plus reasonable period for legal purposes (typically minimum 6-10 years). Implement robust backup procedures: maintain both digital and physical copies where possible, use cloud storage with appropriate security, ensure backup systems are regularly tested, maintain clear indexing for easy retrieval, comply with Data Protection Act requirements for client information, and ensure certificates remain accessible if business circumstances change."
    },
    {
      id: "error-correction",
      question: "What's the correct procedure if I discover an error in a certificate after it's been issued?",
      answer: "Act promptly to correct errors: assess whether the error affects safety conclusions (if so, notify client immediately), issue corrected certificate with clear version control, document the error and correction process, notify all parties who received the original certificate, explain the correction to the client, and learn from the error to prevent recurrence. For safety-critical errors, consider whether immediate action is needed at the installation."
    },
    {
      id: "multiple-inspectors",
      question: "How can I maintain consistency when multiple inspectors work on the same project?",
      answer: "Establish clear procedures and standards: develop standardised templates and decision-making criteria, provide consistent training on observation code application, implement peer review processes for complex decisions, use collaborative documentation systems where possible, hold regular calibration meetings to discuss challenging scenarios, maintain decision precedent records, and ensure clear communication channels between team members throughout the project."
    },
    {
      id: "technical-language",
      question: "How technical should my documentation be for different types of clients?",
      answer: "Adapt communication style while maintaining technical accuracy. For technical clients (other electricians, engineers), use standard electrical terminology and detailed technical descriptions. For non-technical clients, provide clear explanations of safety implications and required actions, use plain English summaries alongside technical details, include diagrams or photos where helpful, and ensure recommendations are clearly prioritised. Always maintain full technical documentation regardless of client type."
    },
    {
      id: "observation-descriptions",
      question: "What level of detail is required when describing observations and defects?",
      answer: "Provide sufficient detail for effective remedial action: include precise location information, describe the specific defect clearly, explain safety implications, reference applicable standards, specify exact remedial action required, include supporting measurements where relevant, and estimate urgency timeframes. Avoid vague terms like 'needs attention' or 'poor condition' - be specific about what's wrong and what needs to be done."
    },
    {
      id: "certificate-distribution",
      question: "Who should receive copies of electrical certificates and in what format?",
      answer: "Distribution depends on certificate type and project requirements. Generally provide: original to installation owner/responsible person, copy retained by certifying electrician, copies to relevant contractors where required, copies to building control where notification required, and copies to client's insurer if requested. Establish clear distribution procedures, maintain records of who received certificates, use tracked delivery for important certificates, and confirm receipt where safety-critical issues are involved."
    },
    {
      id: "international-work",
      question: "Are UK electrical certificates recognised for international projects or offshore installations?",
      answer: "UK certificates may not be automatically recognised internationally. Check specific requirements for the jurisdiction: some countries require local certification, others accept UK certificates with additional documentation, offshore installations may follow flag state regulations, and international projects often require specific certification schemes. Consult relevant authorities early in project planning and consider obtaining local professional advice for international work."
    },
    {
      id: "quality-improvement",
      question: "How can I systematically improve my documentation quality over time?",
      answer: "Implement structured improvement processes: regularly review recent documentation for common errors, seek client feedback on certificate clarity and usefulness, participate in peer review exercises, attend relevant training and professional development, benchmark against industry best practices, maintain error logs to identify improvement areas, update templates and procedures based on experience, and consider professional mentoring or coaching for complex technical decisions."
    }
  ];

  const toggleItem = (value: string) => {
    setOpenItems(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
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
      <CardContent>
        <div className="space-y-4">
          {faqData.map((faq) => (
            <Collapsible
              key={faq.id}
              open={openItems.includes(faq.id)}
              onOpenChange={() => toggleItem(faq.id)}
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-[#323232] border border-gray-600 p-4 text-left hover:bg-[#2a2a2a] transition-colors">
                <span className="text-foreground font-medium">{faq.question}</span>
                <ChevronDown 
                  className={`h-4 w-4 text-elec-yellow transition-transform ${
                    openItems.includes(faq.id) ? 'rotate-180' : ''
                  }`} 
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <div className="rounded-lg bg-[#2a2a2a] border border-gray-600 p-4">
                  <p className="text-foreground text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentationBestPracticesFAQ;