import { HelpCircle, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

const faqData = [
  {
    question: "How do I systematically locate an earth fault causing RCD tripping?",
    answer: "Start by isolating circuits one by one to identify the faulty circuit. Use insulation resistance testing at 500V DC to measure between conductors and earth. Test each section of the faulty circuit systematically, checking junction boxes, accessories, and cable runs. Use a cable locator for buried cables. The fault will show as low insulation resistance, typically below 0.5MΩ."
  },
  {
    question: "What should I do if an RCD trips immediately after reset with no obvious load?",
    answer: "This indicates a permanent earth fault. Disconnect all loads from the RCD-protected circuits and test for insulation resistance. If the RCD still trips with no load connected, check for neutral-earth faults in the wiring. Look for water ingress, damaged cables, or incorrect connections. Never repeatedly reset an RCD that continues to trip."
  },
  {
    question: "How can I identify and resolve nuisance tripping issues?",
    answer: "Monitor the installation during typical operation to identify patterns. Check for: equipment with high earth leakage currents, switching transients from motors or transformers, accumulated earth leakage from multiple circuits, and environmental factors like moisture. Use a current clamp to measure earth leakage currents and consider using time-delayed RCDs or improved earthing arrangements."
  },
  {
    question: "What diagnostic equipment is essential for RCD troubleshooting?",
    answer: "Essential equipment includes: calibrated RCD tester for performance verification, insulation resistance tester (500V DC minimum), digital multimeter for basic measurements, earth leakage clamp meter for current measurement, oscilloscope for transient analysis, and thermal imaging camera for connection assessment. Ensure all equipment is regularly calibrated."
  },
  {
    question: "How do I troubleshoot an RCD that won't trip during testing?",
    answer: "First verify your test equipment is working correctly by testing a known good RCD. Check the test connections are correct and making good contact. Try the manual test button - if this works but electrical testing fails, the issue may be with test equipment or connections. If the test button also fails, the RCD has failed internally and must be replaced immediately."
  },
  {
    question: "What causes RCDs to develop slower trip times over time?",
    answer: "Trip time degradation usually results from: contact oxidation reducing sensitivity, magnetic circuit deterioration, component aging in electronic RCDs, environmental contamination affecting mechanisms, and mechanical wear in the trip mechanism. Regular maintenance and testing can identify gradual deterioration before it becomes dangerous."
  },
  {
    question: "How do I handle RCD problems in installations with borrowed neutrals?",
    answer: "Borrowed neutral circuits create complex fault scenarios. Map all neutral connections carefully and use circuit identification tools. When testing, ensure all circuits sharing neutrals are isolated together. Consider rewiring to eliminate borrowed neutrals or install RCBOs for individual circuit protection. Document all shared neutral arrangements clearly."
  },
  {
    question: "What documentation should I maintain during troubleshooting?",
    answer: "Document: initial symptoms and conditions, environmental factors present, all test results and readings, photographs of damage or connections, timeline of fault development, corrective actions taken, and recommendations for prevention. This documentation supports warranty claims, incident investigations, and helps identify recurring issues."
  },
  {
    question: "How do I identify electromagnetic interference causing RCD problems?",
    answer: "EMI-related problems often correlate with operation of specific equipment. Use an oscilloscope to capture switching transients and noise. Check for: inadequate screening of sensitive circuits, poor earthing arrangements, high-frequency switching equipment nearby, and radio transmitter interference. Solutions include improved screening, filtering, and earth bonding."
  },
  {
    question: "What should I do if multiple RCDs trip simultaneously?",
    answer: "Simultaneous tripping suggests a common cause such as: supply-side disturbance, earthing system problems, lightning strike effects, or major fault upstream. Check the main earthing arrangements, supply authority issues, and neutral-earth voltage. Contact the electricity supplier if supply-side problems are suspected."
  },
  {
    question: "How do I troubleshoot RCD discrimination failures?",
    answer: "Discrimination failure occurs when upstream RCDs trip instead of downstream devices. Check: correct RCD types (use S-type upstream), adequate time delays between devices, proper current grading, and that fault currents are within discrimination limits. Test each RCD individually to verify operating characteristics and replace if performance has degraded."
  },
  {
    question: "What are the signs that an RCD needs immediate replacement?",
    answer: "Replace immediately if: RCD completely fails to trip at any test current, test button doesn't work, visible damage or burning, trip times exceed regulatory limits by >50%, frequent nuisance tripping at half rated current, or age exceeds 20 years with performance degradation. Any safety-critical failure requires immediate action."
  }
];

const RCDTroubleshootingFAQ = () => {
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
              <p className="text-foreground text-sm sm:text-base leading-relaxed">
                {faq.answer}
              </p>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
};

export default RCDTroubleshootingFAQ;