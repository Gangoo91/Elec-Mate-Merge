import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

export const SmartHomeModule5Section6FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  
  const faqs = [
    {
      question: "How often should smart device passwords be changed?",
      answer: "Device passwords should be changed immediately upon installation and then every 6-12 months, or immediately if there's any suspicion of compromise. Use unique, strong passwords for each device."
    },
    {
      question: "What's the difference between WPA2 and WPA3?",
      answer: "WPA3 is the newer, more secure encryption standard. It provides better protection against password cracking attacks and offers improved security even with weaker passwords. Always use WPA3 if available, or WPA2 as a minimum."
    },
    {
      question: "Should smart devices be on the same network as computers?",
      answer: "Ideally, no. Smart devices should be on a separate network or VLAN to limit potential security breaches. Many routers allow guest networks that can be used for IoT devices."
    },
    {
      question: "What happens if a client refuses security recommendations?",
      answer: "Document their refusal in writing and explain the risks clearly. You may want to consider whether to proceed with installation if basic security measures are rejected, as this could affect your professional liability."
    },
    {
      question: "How can clients check if their devices have been compromised?",
      answer: "Look for unusual device behaviour, unexpected data usage, unfamiliar devices on the network, or devices operating when they shouldn't be. Regular security audits and monitoring network traffic can help identify issues."
    },
    {
      question: "Are firmware updates really that important?",
      answer: "Yes, absolutely. Firmware updates often contain critical security patches that fix newly discovered vulnerabilities. Enable automatic updates where possible, or establish a regular update schedule."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {faqs.map((faq, index) => (
          <Collapsible key={index} open={openItems.includes(index)} onOpenChange={() => toggleItem(index)}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-elec-dark rounded-lg border border-gray-600 hover:bg-[#323232] transition-colors">
              <span className="text-foreground font-medium text-left">{faq.question}</span>
              <ChevronRight className={`h-4 w-4 text-elec-yellow transition-transform ${openItems.includes(index) ? 'rotate-90' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3 py-2">
              <p className="text-gray-300 text-sm">{faq.answer}</p>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
};