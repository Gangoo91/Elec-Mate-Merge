import { MessageCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const EmergencyLightingFAQSection3_4 = () => {
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
      question: 'Do I always need to exceed BS 5266 lux levels?',
      answer: 'Not always — but where a risk assessment shows additional needs, you must adapt the design. The standard provides minimum levels that may not be suitable for all occupancy types or building risks. Care homes, hospitals, and buildings with vulnerable occupants often require enhanced lighting levels.'
    },
    {
      id: 'faq2',
      question: 'Who carries out the risk assessment?',
      answer: 'Typically the building\'s Responsible Person under the Fire Safety Order, but electricians should use its findings to inform design. The FRA should identify specific risks, vulnerable occupants, and evacuation procedures that affect emergency lighting requirements.'
    },
    {
      id: 'faq3',
      question: 'Is 3-hour duration always mandatory?',
      answer: 'No, but it is the default for most public and complex buildings. 1-hour systems are only suitable for smaller, low-risk premises where evacuation can be completed quickly. High-rise buildings, healthcare facilities, and buildings with vulnerable occupants typically require 3-hour duration.'
    },
    {
      id: 'faq4',
      question: 'How do I justify exceeding minimum standards to clients?',
      answer: 'Reference the Fire Risk Assessment findings, highlight specific occupant vulnerabilities, explain liability implications, and demonstrate how enhanced safety can reduce insurance premiums and improve business reputation. Document all decisions clearly.'
    },
    {
      id: 'faq5',
      question: 'What if the Fire Risk Assessment doesn\'t mention emergency lighting specifically?',
      answer: 'Extract relevant information about occupant profiles, evacuation procedures, building hazards, and vulnerable persons. Even if lighting isn\'t explicitly discussed, these factors should inform your lighting design decisions.'
    },
    {
      id: 'faq6',
      question: 'Can risk-based adjustments affect maintenance requirements?',
      answer: 'Yes, enhanced systems may require more frequent testing, particularly in critical areas. Higher lux levels and longer durations may also affect component lifespan. Plan maintenance schedules accordingly and brief clients on ongoing requirements.'
    },
    {
      id: 'faq7',
      question: 'How do I handle buildings with mixed occupancy types?',
      answer: 'Design to the highest risk area requirements, or zone the system to provide appropriate levels for different areas. Document the rationale clearly and ensure the system can operate effectively for all occupancy scenarios.'
    },
    {
      id: 'faq8',
      question: 'What documentation should I provide for risk-based designs?',
      answer: 'Include design rationale referencing FRA findings, justification for deviations from minimum standards, occupant profiles considered, evacuation scenarios planned for, and maintenance requirements. This protects both you and the client.'
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