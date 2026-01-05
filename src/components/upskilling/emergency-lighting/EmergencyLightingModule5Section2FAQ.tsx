import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export const EmergencyLightingModule5Section2FAQ = () => {
  const faqs = [
    {
      question: "Why can't we just do monthly 5-minute tests instead of annual 3-hour tests?",
      answer: "Battery capacity degradation is a gradual process that short tests cannot detect. Aged batteries (typically 3-5 years old) may have sufficient capacity to illuminate for 5 minutes but cannot sustain the load for 3 hours. This is because battery chemistry degrades over time through repeated charge/discharge cycles and chemical ageing. The annual 3-hour duration test is the only way to verify that batteries can perform during the full evacuation period required by BS 5266-1. The Leeds care home case study clearly demonstrates this — batteries passed monthly tests but failed catastrophically during a realistic evacuation scenario. Five-minute tests would have provided the same false confidence as the 30-second tests that were being performed."
    },
    {
      question: "Can we test the entire building's emergency lighting at once during a 3-hour test?",
      answer: "From a technical perspective you can test all systems simultaneously, but from a safety and practical standpoint this is strongly discouraged — especially for occupied buildings. During the 3-hour test period plus the 24-hour recharge period that follows, the building has no emergency lighting protection. If a real emergency occurs during this time, occupants would have no evacuation lighting. Best practice is to test one floor or zone at a time, maintaining emergency lighting coverage in other areas. For high-risk premises (hospitals, care homes, hotels), testing must be scheduled outside occupied hours with alternative lighting arrangements confirmed. Never compromise building safety for testing convenience."
    },
    {
      question: "What do we do if multiple luminaires fail the annual duration test?",
      answer: "Document all failures immediately with reference numbers, times of failure, and symptoms. Take photographs of affected areas. If failures are clustered (e.g., all luminaires from the same installation date), this typically indicates battery end-of-life across that installation batch. Present findings to the client with a clear remedial action plan: immediate battery replacement for all affected units, temporary alternative lighting if building must remain occupied, and re-testing after replacements are completed. Provide cost estimates and realistic timescales. Do not certify the system as compliant until all failures are rectified and a successful 3-hour test is completed. Remember that a failed annual test means the building's emergency lighting cannot be relied upon during a real emergency — this is a critical safety issue requiring urgent attention, not something that can wait for the next budget cycle."
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
          <div key={index} className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <h4 className="font-semibold text-elec-yellow mb-2">{faq.question}</h4>
            <p className="text-foreground text-sm leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
