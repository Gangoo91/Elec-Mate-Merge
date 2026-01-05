import { MessageCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const EmergencyLightingFAQSection3_3 = () => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const faqs = [
    {
      id: 'faq1',
      question: 'Can any luminaire be mounted at any height?',
      answer: 'No, each unit is designed for a specific mounting range. Outside this range, lux levels may fall below standards and the light distribution pattern will not perform as intended. Always consult manufacturer specifications for recommended mounting heights.'
    },
    {
      id: 'faq2',
      question: 'Why are spacing tables provided by manufacturers?',
      answer: 'Spacing tables ensure correct luminaire placement for achieving the required lux levels and uniformity. They are based on photometric testing and account for the specific beam pattern and light output of each luminaire model at different mounting heights.'
    },
    {
      id: 'faq3',
      question: 'Do reflective surfaces affect emergency lighting performance?',
      answer: 'Yes, significantly. Lighter walls and ceilings improve light distribution by reflecting more light back into the space, while dark finishes absorb light and reduce overall performance. This can affect spacing calculations and may require additional luminaires.'
    },
    {
      id: 'faq4',
      question: 'How do I know if a luminaire is suitable for high ceiling mounting?',
      answer: 'Check the manufacturer\'s specifications for maximum mounting height and photometric data. High-bay luminaires typically have narrower beam angles, higher light output, and are specifically designed for mounting heights above 6 metres.'
    },
    {
      id: 'faq5',
      question: 'What\'s the difference between mains and emergency mode photometric data?',
      answer: 'Emergency mode typically produces 10-20% lower light output due to reduced power from battery operation. Always use emergency mode data for calculations to ensure compliance during actual power failures when the system is needed most.'
    },
    {
      id: 'faq6',
      question: 'Why is uniformity important in emergency lighting?',
      answer: 'Poor uniformity creates bright and dark patches that can impair visibility and cause confusion during evacuation. BS 5266 specifies maximum uniformity ratios to ensure consistent lighting levels across escape routes.'
    },
    {
      id: 'faq7',
      question: 'How often should photometric performance be verified?',
      answer: 'Initial verification is required during commissioning. Ongoing verification depends on the maintenance schedule, but any significant changes to the space (new equipment, changed layout, different surface finishes) should trigger a review of photometric performance.'
    },
    {
      id: 'faq8',
      question: 'Can I use general lighting photometric data for emergency lighting calculations?',
      answer: 'No, emergency lighting has different requirements for duration, output levels, and operating conditions. Always use photometric data specifically provided for emergency operation, which accounts for battery operation and reduced output.'
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/10 border border-blue-500/40 shadow-lg">
      <CardHeader>
        <CardTitle className="text-blue-300 flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-blue-400 drop-shadow-md" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {faqs.map((faq) => (
          <Collapsible key={faq.id} open={openItems[faq.id]} onOpenChange={() => toggleItem(faq.id)}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-between p-4 h-auto text-left bg-gradient-to-r from-gray-700/50 to-gray-800/30 border border-gray-600/50 hover:bg-gray-600/30"
              >
                <span className="text-foreground font-medium">{faq.question}</span>
                {openItems[faq.id] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <p className="text-foreground text-sm leading-relaxed">{faq.answer}</p>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
};