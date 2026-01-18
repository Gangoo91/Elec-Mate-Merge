import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

export const EmergencyLightingFAQSection2_3 = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "Is high-risk task area lighting needed in offices?",
      answer: "No, high-risk task area lighting is only required where hazardous tasks or dangerous machinery are present. Standard offices typically only need escape route and open area (anti-panic) lighting. However, server rooms, electrical switch rooms, or workshops within office buildings may require high-risk task lighting if they contain equipment that needs controlled shutdown.",
      category: "Application"
    },
    {
      question: "How bright should high-risk task area lighting be?",
      answer: "The lighting must provide at least 15 lux or 10% of normal working illuminance, whichever is greater. For example, if normal task lighting is 500 lux, emergency lighting must provide 50 lux. This higher level allows operators to read control panels, see equipment status, and safely complete shutdown procedures.",
      category: "Technical"
    },
    {
      question: "How is this different from anti-panic lighting?",
      answer: "Anti-panic lighting (0.5 lux minimum) allows safe movement through open spaces during evacuation. High-risk task lighting (15+ lux minimum) enables completion of dangerous processes before evacuation. The purposes are completely different: movement vs. task completion. You cannot use one to substitute for the other.",
      category: "Design"
    },
    {
      question: "Who determines if high-risk task lighting is needed?",
      answer: "A formal risk assessment must be conducted by competent persons, typically involving safety managers, electrical engineers, and equipment operators. This assessment evaluates what could happen if lighting fails during dangerous processes and determines whether additional emergency lighting is needed beyond standard escape/anti-panic lighting.",
      category: "Assessment"
    },
    {
      question: "Can I use standard emergency escape fittings for high-risk areas?",
      answer: "Not usually. High-risk task lighting requires significantly higher lux levels (15+ lux vs 1 lux), longer duration (often 3+ hours vs 1 hour), and better light distribution. You need luminaires specifically designed for task lighting with higher battery capacity and appropriate beam patterns for the work area.",
      category: "Equipment"
    },
    {
      question: "How long must the lighting stay on?",
      answer: "The minimum is 1 hour per BS 5266, but industrial applications often require 3 hours or more. The duration should be based on: time needed for safe shutdown procedures, complexity of equipment, availability of maintenance staff, and time for safe evacuation after shutdown. Complex chemical processes might need 8+ hours.",
      category: "Duration"
    },
    {
      question: "What happens if the emergency lighting fails during an incident?",
      answer: "This creates a serious safety risk and potential legal liability. Equipment damage, product loss, and worker injury could result. That's why the testing regime is so important - monthly functional tests and annual duration tests. Some critical applications use redundant lighting systems or backup generators as additional protection.",
      category: "Safety"
    },
    {
      question: "Do I need separate circuits for high-risk task lighting?",
      answer: "Yes, it's highly recommended. High-risk task lighting should be on dedicated emergency circuits, clearly labelled at the distribution board. This allows maintenance without affecting other emergency lighting, easier testing, and better fault diagnosis. Some installations use sub-circuit monitoring to detect failures immediately.",
      category: "Installation"
    },
    {
      question: "Can anti-panic lighting be used instead of high-risk task area lighting?",
      answer: "No, absolutely not. Anti-panic lighting provides only 0.5-1 lux, which is insufficient for operating machinery or reading control panels. High-risk areas need 15+ lux to allow safe task completion. Using the wrong type of lighting creates serious safety risks and fails to meet BS 5266 requirements.",
      category: "Compliance"
    },
    {
      question: "How often should lux levels be measured in high-risk areas?",
      answer: "Lux levels should be measured during commissioning, then periodically as part of maintenance (typically annually). However, if you notice reduced light output, changes in equipment layout, or after any significant maintenance, immediate re-measurement is required. Some facilities with critical processes measure quarterly.",
      category: "Testing"
    },
    {
      question: "Who should be consulted when planning lighting around machinery?",
      answer: "Always involve machine operators, supervisors, and maintenance staff. They understand shutdown procedures, critical viewing angles, and potential hazards. Safety managers provide risk assessment expertise, while electrical engineers ensure technical compliance. Equipment manufacturers may also provide specific lighting recommendations.",
      category: "Planning"
    },
    {
      question: "What about areas with explosive atmospheres (ATEX zones)?",
      answer: "ATEX zones require certified emergency lighting equipment suitable for the specific zone classification (Zone 0, 1, or 2 for gas; Zone 20, 21, or 22 for dust). Equipment must be intrinsically safe or explosion-proof as appropriate. Higher lux levels may be needed to safely shut down equipment that could create ignition sources.",
      category: "Special"
    }
  ];

  return (
    <Card className="bg-[#323232] border-elec-yellow/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-400" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {faqs.map((faq, index) => (
          <Collapsible key={index} open={openItems.includes(index)} onOpenChange={() => toggleItem(index)}>
            <CollapsibleTrigger asChild>
              <div className="bg-elec-gray/40 rounded-lg p-4 cursor-pointer hover:bg-elec-gray/60 active:bg-elec-gray/70 transition-all touch-manipulation border border-gray-600/30 hover:border-elec-yellow/30">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge 
                        variant="outline" 
                        className="text-xs border-elec-yellow/50 text-elec-yellow bg-elec-yellow/10"
                      >
                        {faq.category}
                      </Badge>
                    </div>
                    <h4 className="text-foreground font-medium text-sm text-left">{faq.question}</h4>
                  </div>
                  <div className="flex-shrink-0">
                    {openItems.includes(index) ? (
                      <ChevronUp className="h-4 w-4 text-elec-yellow" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-elec-yellow" />
                    )}
                  </div>
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="bg-elec-gray/20 rounded-lg p-4 border-l-4 border-elec-yellow/50">
                <p className="text-foreground text-sm leading-relaxed">{faq.answer}</p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}

        {/* Additional Resources */}
        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mt-6">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="h-4 w-4 text-elec-yellow" />
            <Badge variant="outline" className="border-elec-yellow/50 text-elec-yellow bg-elec-yellow/20">
              Need More Help?
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-foreground font-medium mb-2">Technical Standards:</p>
               <ul className="space-y-1 text-foreground text-xs">
                <li>• BS 5266-1: Emergency lighting code of practice</li>
                <li>• BS EN 1838: Application of lighting principles</li>
                <li>• IET Code of Practice for emergency lighting</li>
                <li>• HSE HSG38: Lighting at work guidance</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-medium mb-2">Professional Support:</p>
              <ul className="space-y-1 text-foreground text-xs">
                <li>• Consult qualified emergency lighting designers</li>
                <li>• Contact equipment manufacturers for guidance</li>
                <li>• Engage specialist risk assessment consultants</li>
                <li>• Seek advice from insurance providers</li>
              </ul>
            </div>
          </div>
        </div>
        
      </CardContent>
    </Card>
  );
};