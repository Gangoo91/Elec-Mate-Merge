import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export const EmergencyLightingModule5Section6FAQ = () => {
  const faqs = [
    {
      question: "Who is responsible for emergency lighting after handover?",
      answer: "The building's Responsible Person, as defined under the Regulatory Reform (Fire Safety) Order 2005. This is typically the building owner, landlord, employer, or designated facilities manager. They are legally responsible for ensuring monthly and annual tests are carried out, results are recorded in the logbook, and any faults are rectified promptly."
    },
    {
      question: "What should be included in the client's emergency lighting logbook?",
      answer: "The logbook must include: test schedules (monthly and annual), test results with pass/fail status, date and time of each test, name and signature of person carrying out the test, details of any defects found, remedial action taken, and maintenance records including battery replacements. The logbook becomes part of the building's permanent fire safety record."
    },
    {
      question: "How long must handover documentation be kept?",
      answer: "For the life of the installation — handover documentation becomes part of the building's permanent fire safety record. Contractors should retain their own copies for a minimum of six years for professional liability protection. Clients must keep their copies indefinitely as they may be requested during fire authority inspections, insurance audits, or property transactions."
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-gray-800 p-5 rounded-lg border-l-4 border-elec-yellow space-y-3">
            <h3 className="font-semibold text-foreground text-base sm:text-lg">
              Q{index + 1}: {faq.question}
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-foreground leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
