import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export const EmergencyLightingFAQSection3_1 = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "Do all luminaires need to be 3-hour rated?",
      answer: "Not always — 1-hour duration is permitted in some small buildings, but 3 hours is the standard for most commercial and public premises. The decision should be based on evacuation time assessment, building complexity, and regulatory requirements. When in doubt, choose 3-hour fittings for future-proofing."
    },
    {
      question: "Are lux levels the same for maintained and non-maintained fittings?",
      answer: "Yes, the same minimum levels apply regardless of whether the light is normally on (maintained) or only comes on during failure (non-maintained). The key requirement is that the specified lux levels are achieved during emergency operation."
    },
    {
      question: "How is lux measured in practice?",
      answer: "Using a calibrated lux meter, placed at floor level along escape routes and across open areas. Measurements should be taken at multiple points to verify both minimum levels and uniformity ratios. Always ensure meters are properly calibrated and certified."
    },
    {
      question: "What happens if battery performance degrades over time?",
      answer: "Systems must still meet lux requirements at end of battery life. This is why initial calculations should include degradation factors (typically 80% of new performance). Regular testing identifies when batteries need replacement before they fall below compliance levels."
    },
    {
      question: "Can LED emergency lighting use lower lux levels due to better light quality?",
      answer: "No, the minimum lux requirements in BS 5266-1 remain the same regardless of light source technology. However, LED systems may provide better uniformity and maintain output better over the operating period, potentially reducing the number of luminaires needed."
    },
    {
      question: "How often should lux levels be tested?",
      answer: "Initial commissioning requires full lux testing, then annual testing of duration and light output is required. If any modifications are made to the building or lighting system, re-testing is necessary to confirm continued compliance."
    },
    {
      question: "What's the difference between task area lighting and escape route lighting?",
      answer: "Task area lighting (15 lux minimum) is for areas where people need to safely shut down processes or equipment before evacuation. Escape route lighting (1 lux minimum) is for guiding people to exits. Task areas have much higher requirements due to the critical work that must be performed."
    }
  ];

  return (
    <Card className="bg-slate-200/20 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p className="text-lg text-foreground leading-relaxed mb-6">
          Common questions about minimum illumination levels and operating durations:
        </p>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-slate-200/20 hover:bg-slate-200/30 rounded-lg border border-gray-600 transition-colors"
            >
              <button
                className="w-full p-4 text-left flex items-center justify-between"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                {openFAQ === index ? (
                  <ChevronUp className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                )}
              </button>
              
              {openFAQ === index && (
                <div className="px-4 pb-4">
                  <div className="bg-elec-dark/40 p-4 rounded border border-gray-600">
                    <p className="text-foreground text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-elec-dark/60 p-4 rounded-lg border border-gray-600 mt-6">
          <h4 className="text-elec-yellow font-semibold mb-2">Need More Help?</h4>
          <p className="text-sm text-foreground">
            For complex installations or unusual building configurations, always consult BS 5266-1 directly 
            and consider seeking advice from emergency lighting specialists or approved inspectors.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};