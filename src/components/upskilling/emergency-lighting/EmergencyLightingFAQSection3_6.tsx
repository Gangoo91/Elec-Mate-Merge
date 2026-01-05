import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export const EmergencyLightingFAQSection3_6 = () => {
  const faqs = [
    {
      question: "Do software results guarantee BS 5266-1 compliance?",
      answer: "No - software provides design predictions, but compliance must be proven through physical lux testing after installation using calibrated equipment. Software models ideal conditions that may not reflect site reality (obstructions, surface degradation, installation variations). Always treat software as a design tool, not a compliance certificate. BS 5266-1 requires on-site verification and ongoing testing documented in the emergency lighting logbook."
    },
    {
      question: "What's the difference between IES and LDT photometric files?",
      answer: "Both formats contain luminaire photometric test data, but differ in origin and detail level. IES (Illuminating Engineering Society) is the North American standard, widely supported globally, and uses imperial or metric units. LDT (Luminaire Data Transfer) is the European standard with slightly different data structure. DIALux and Relux accept both formats. Always use the latest files from manufacturers - outdated files may reference discontinued LED versions with different output."
    },
    {
      question: "Can I use DIALux/Relux for Building Control submissions?",
      answer: "Yes - software-generated lux plots, calculation reports, and luminaire schedules are widely accepted by UK Building Control as design documentation. Export reports to PDF, include project details (designer name, date, client, address), reference BS 5266-1:2025, and clearly show minimum, average, and maximum lux values. Combine with physical test results post-installation for complete compliance documentation."
    },
    {
      question: "Why do my software predictions not match on-site lux measurements?",
      answer: "Common causes: (1) Mounting height differences - contractors often install higher/lower than design due to services; (2) Incorrect surface reflectances in model - dark walls or dusty ceilings significantly reduce actual lux; (3) Obstructions added after design - cable trays, ductwork, racking not modelled; (4) Wrong luminaires installed - product substitutions with different photometry; (5) Commissioning errors - LED drivers not set to full output. Always allow 20-30% safety margin in design to account for real-world variations."
    },
    {
      question: "Should I model future obstructions like racking and equipment?",
      answer: "Absolutely. If you know racking, machinery, or storage will be installed, model it in 3D within the software. Obstructions cast shadows and block light distribution, often reducing lux levels by 30-50% in affected areas. For warehouses and industrial spaces, this is critical - failure to model obstructions is the leading cause of non-compliance after installation. If future layout is uncertain, design for worst-case scenario with obstructions present."
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
          <div key={index} className="space-y-2">
            <h3 className="text-foreground font-semibold text-sm">
              Q{index + 1}: {faq.question}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed ml-4">
              {faq.answer}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};