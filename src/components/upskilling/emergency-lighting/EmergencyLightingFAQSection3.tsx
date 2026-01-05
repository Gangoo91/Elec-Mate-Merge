import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const EmergencyLightingFAQSection3 = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "When should I choose a central battery system over self-contained units?",
      answer: "Central battery systems are typically better for larger installations (>1000m²), buildings with high maintenance requirements, or where centralised monitoring is essential. They offer longer battery life (10-25 years vs 3-5 years), reduced maintenance visits, and better system oversight. However, they require higher initial capital investment and dedicated plant room space."
    },
    {
      id: 2,
      question: "What's the difference between maintained and non-maintained emergency lighting?",
      answer: "Non-maintained emergency lighting only operates during mains power failure - this is the most common type for general applications. Maintained emergency lighting operates continuously, providing illumination during normal operation and switching to emergency supply during power failure. Maintained systems are required in premises like cinemas and theatres where normal lighting may be dimmed."
    },
    {
      id: 3,
      question: "How do I determine the appropriate battery duration for my installation?",
      answer: "Standard duration is 1 hour for most applications, but this can vary: 3 hours for places of entertainment, 2 hours for sleeping accommodation, and potentially longer for high-risk processes. Consider factors like building occupancy, evacuation time, fire service response time, and specific operational requirements when determining duration."
    },
    {
      id: 4,
      question: "What are the advantages of LED emergency lighting over fluorescent systems?",
      answer: "LED emergency lighting offers longer luminaire life (50,000+ hours), lower power consumption (extending battery duration), instant start-up, better low-temperature performance, and reduced maintenance requirements. While initial costs may be higher, the total cost of ownership is typically lower due to reduced energy consumption and maintenance needs."
    },
    {
      id: 5,
      question: "Can I mix different system types within the same building?",
      answer: "Yes, it's common to use different system types for different areas based on their specific requirements. For example, you might use central battery systems for main circulation routes and self-contained units for individual rooms or small areas. However, ensure consistent design standards, testing procedures, and clear documentation of system boundaries."
    },
    {
      id: 6,
      question: "What factors should influence my choice of battery technology?",
      answer: "Consider battery life expectancy, environmental conditions (temperature range), maintenance requirements, initial cost vs total cost of ownership, charging characteristics, and disposal/recycling requirements. Lithium Iron Phosphate offers longest life but higher initial cost, while Lead Acid is cheaper initially but requires more frequent replacement."
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <Card className="bg-elec-gray border-gray-600 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-cyan-400 drop-shadow-md" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-2">
        {faqs.map((faq) => (
          <div key={faq.id} className="border border-gray-600 rounded-lg">
            <Button
              variant="ghost"
              className="w-full p-4 text-left justify-between hover:bg-gray-700/50"
              onClick={() => toggleFAQ(faq.id)}
            >
              <span className="font-medium">{faq.question}</span>
              {openFAQ === faq.id ? (
                <ChevronUp className="h-4 w-4 text-cyan-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-cyan-400" />
              )}
            </Button>
            {openFAQ === faq.id && (
              <div className="px-4 pb-4">
                <p className="text-sm text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};