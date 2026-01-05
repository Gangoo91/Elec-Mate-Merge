import { HelpCircle, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface DataCablingFAQsProps {
  faqs: FAQ[];
}

export const DataCablingFAQs = ({ faqs }: DataCablingFAQsProps) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
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
      <CardContent className="space-y-3">
        {faqs.map((faq, index) => (
          <Collapsible
            key={index}
            open={openItems.includes(index)}
            onOpenChange={() => toggleItem(index)}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors text-left">
              <span className="text-gray-200 font-medium">{faq.question}</span>
              <ChevronDown 
                className={`h-4 w-4 text-elec-yellow transition-transform ${
                  openItems.includes(index) ? 'rotate-180' : ''
                }`} 
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
};