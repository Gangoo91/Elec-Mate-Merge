import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export const EmergencyLightingModule5Section5FAQ = () => {
  const faqs = [
    {
      question: "Who is responsible for issuing the emergency lighting certificate?",
      answer: "The commissioning engineer or qualified person who carried out the verification and final testing is responsible for issuing the emergency lighting certificate. This individual must be competent to verify compliance with BS 5266-1 and BS EN 50172, and should hold appropriate qualifications or certifications demonstrating their expertise in emergency lighting systems."
    },
    {
      question: "Are commissioning certificates legally required?",
      answer: "Yes — under BS 5266 and fire safety legislation (specifically the Regulatory Reform (Fire Safety) Order 2005), certification is essential to demonstrate compliance. Without proper certification, an emergency lighting system is considered non-verified, even if it is physically operational. The Responsible Person for the building must ensure all required certificates are in place and retained for inspection by fire authorities."
    },
    {
      question: "How long should certificates be retained?",
      answer: "Certificates should be retained for the life of the installation — and not less than six years. This retention period aligns with professional liability timelines and ensures documentation is available for insurance claims, fire authority inspections, building sales, or legal disputes. Both the building owner and the contractor should maintain copies of all certificates for their own records."
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
      <CardContent className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4 border-l-4 border-elec-yellow">
            <h4 className="font-semibold text-foreground mb-3 text-sm sm:text-base lg:text-lg">
              Q{index + 1}: {faq.question}
            </h4>
            <p className="text-foreground text-sm sm:text-base lg:text-lg">
              {faq.answer}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
