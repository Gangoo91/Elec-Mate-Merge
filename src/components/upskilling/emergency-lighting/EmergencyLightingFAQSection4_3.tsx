import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export const EmergencyLightingFAQSection4_3 = () => {
  const faqs = [
    {
      question: "Can a 1-hour battery ever be used in a hospital?",
      answer: "No, hospitals always require at least 3-hour autonomy due to extended evacuation times and critical operations. In some cases, even longer durations may be specified based on risk assessment."
    },
    {
      question: "Do LED luminaires reduce battery size requirements?",
      answer: "Yes, but only if the driver and battery efficiency are factored in. LED drivers may consume more power than expected, particularly in emergency mode, so always verify the total emergency load including driver losses."
    },
    {
      question: "How often should batteries be replaced?",
      answer: "Typically every 3–5 years for self-contained systems, and 5–10 years (or more) for central battery systems, depending on battery technology. Lithium-ion batteries generally last longer than NiCd or NiMH."
    },
    {
      question: "What happens if batteries are undersized?",
      answer: "Undersized batteries will fail to provide the required autonomy duration during an emergency, potentially leaving occupants in darkness before evacuation is complete. This represents a serious safety risk and non-compliance with BS 5266-1."
    },
    {
      question: "Can I use standard automotive batteries for emergency lighting?",
      answer: "No. Emergency lighting requires deep-cycle batteries designed for regular discharge/recharge cycles. Automotive batteries are designed for high current starting applications and will fail quickly in emergency lighting service."
    },
    {
      question: "How do I account for voltage drop in large central battery systems?",
      answer: "Calculate the voltage drop using cable length, current, and cable resistance. Ensure the voltage at the furthest luminaire is within 5% of nominal voltage. This may require larger cable sizes or higher battery voltage to compensate."
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
      <CardContent className="text-foreground space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
            <h4 className="font-semibold text-elec-yellow mb-2">
              Q{index + 1}: {faq.question}
            </h4>
            <p className="text-sm text-foreground">
              {faq.answer}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
