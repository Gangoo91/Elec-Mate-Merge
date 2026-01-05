import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export const EmergencyLightingFAQSection4_1 = () => {
  const faqs = [
    {
      question: "Can normal twin & earth cable be used for emergency lighting?",
      answer: "No — only fire-resistant cable types are permitted for emergency lighting circuits. Standard PVC twin & earth cables (6242Y, 6243Y) do not meet BS 5266-1 or BS 7671 fire-resistance requirements. These cables melt and fail within minutes at fire temperatures (160-200°C), far below the required survival duration. Always use cables complying with BS 7629-1 with appropriate fire rating classification (minimum Category F2, preferably F1 for critical installations)."
    },
    {
      question: "What's the difference between standard and enhanced fire-resistant cable?",
      answer: "Standard fire-resistant cable (Category F2) resists fire for 30 minutes under test conditions per BS EN 50200 (PH30 classification). Enhanced fire-resistant cable (Category F1) provides up to 120 minutes survival under identical test conditions (PH120 classification), maintaining circuit integrity at 950°C flame temperatures with mechanical shock and water spray applied. Enhanced cables use superior insulation materials and construction methods. The performance difference is critical for complex buildings, high-rise premises, and buildings where evacuation takes longer than 30 minutes."
    },
    {
      question: "Why must cables be supported with metal fixings?",
      answer: "Plastic clips melt at 120-180°C in fire conditions, causing cables to collapse and block escape routes or damage other circuits. This typically occurs within 2-3 minutes of fire exposure — long before the cable itself would fail. Metal fixings (steel saddle clips, metal cable trays, steel trunking) maintain structural integrity throughout fire exposure. BS 7671 Regulation 521.10.202 explicitly requires emergency lighting cables to be supported by non-combustible materials. Cable collapse is the most common failure mode in emergency lighting systems, not cable degradation."
    },
    {
      question: "How long must emergency lighting circuits remain operational in most public buildings?",
      answer: "Minimum 1 hour for standard commercial and public buildings with rapid evacuation capability. However, 3-hour duration is required for: (1) premises where occupants sleep — hospitals, hotels, care homes; (2) buildings where immediate evacuation is not possible — high-rise buildings, complex layouts; (3) premises used by people unfamiliar with escape routes — shopping centres, entertainment venues. BS 5266-1:2025 specifies exact durations based on building use and occupancy characteristics. Duration requirement affects both battery capacity and cable fire-resistance rating selection."
    },
    {
      question: "What problem occurred in the London shopping centre case study?",
      answer: "The shopping centre used standard PVC cables instead of fire-resistant cables for emergency lighting circuits, and cables were supported with plastic clips. During London Fire Brigade inspection, engineers determined the system would fail within 8-12 minutes of fire exposure (plastic clips failing in 2-3 minutes), well below the 1-hour requirement. Complete system rewiring was necessary using enhanced F1 fire-resistant LSZH cables with metal support systems. Total cost impact: £80,700 for rework plus £95,000 lost revenue — demonstrating why correct cable specification from the outset is essential."
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
            <p className="text-foreground text-sm leading-relaxed ml-4">
              {faq.answer}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
