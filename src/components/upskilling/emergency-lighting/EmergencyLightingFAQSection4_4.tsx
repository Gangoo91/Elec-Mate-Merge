import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export const EmergencyLightingFAQSection4_4 = () => {
  const faqs = [
    {
      question: "Can emergency lighting circuits share containment with general lighting?",
      answer: "No – emergency lighting circuits must be segregated from general electrical services. They cannot share the same containment unless there is a fire-resistant barrier between them. The preferred method is dedicated containment (separate conduits, trunking, or trays) exclusively for emergency circuits. This prevents faults in normal circuits from affecting emergency lighting and ensures circuit integrity during fire conditions."
    },
    {
      question: "Are standard PVC cables acceptable for emergency circuits?",
      answer: "No – standard PVC cables are not permitted for emergency lighting installations. Only fire-resistant LSZH (Low Smoke Zero Halogen) enhanced cables (Category F1) or MICC (Mineral Insulated Copper Clad) cables are acceptable. These cables must survive fire test conditions (842°C for 120 minutes under BS EN 50200) and produce minimal smoke and no toxic halogen gases during fire exposure."
    },
    {
      question: "Do distribution boards for emergency lighting need to be separate?",
      answer: "Yes, in many cases, especially in larger or high-risk buildings, dedicated emergency lighting distribution boards are best practice and often required by Building Control. This ensures complete segregation, allows independent overcurrent protection, provides clear identification for maintenance, and prevents any accidental cross-connection with normal power circuits. In smaller installations, a dedicated section within a distribution board may be acceptable if clearly marked and separately protected."
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2 flex items-start gap-2">
              <span className="text-elec-yellow">Q{index + 1}:</span>
              <span>{faq.question}</span>
            </h4>
            <p className="text-foreground ml-7">{faq.answer}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
