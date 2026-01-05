import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SmartHomeModule5Section5FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: "Do smart lighting systems meet official emergency lighting standards?",
      answer: "Smart lighting can supplement but not replace official emergency lighting systems. BS 5266 compliance requires dedicated emergency circuits with battery backup. Smart systems can enhance evacuation guidance but must work alongside, not replace, certified emergency lighting installations.",
      category: "Compliance"
    },
    {
      question: "How reliable are lighting scenes during power outages?",
      answer: "Scene reliability depends on backup power design. Critical emergency scenes should have battery backup or UPS systems. Smart hubs typically include battery backup, but individual smart switches may lose functionality without mains power unless specifically designed with backup capabilities.",
      category: "Reliability"
    },
    {
      question: "Can lighting scenes accidentally trigger and cause problems?",
      answer: "Yes, poorly configured scenes can trigger inappropriately. Use proper sensor calibration, avoid oversensitive motion detection, implement scene priorities, and always include manual override capabilities. Test thoroughly under different conditions to prevent false activations.",
      category: "Configuration"
    },
    {
      question: "What happens if the smart home hub fails during an emergency?",
      answer: "Critical emergency lighting should have manual override switches and be designed to fail-safe (lights on). Consider distributed control systems or hybrid approaches that don't rely solely on central hub functionality for life safety systems.",
      category: "Safety"
    },
    {
      question: "How do you prevent lighting scenes from interfering with sleep?",
      answer: "Use appropriate colour temperatures (warm white/red) for night scenes, implement motion sensor timeouts, create 'sleep mode' that disables certain triggers, and use gradual dimming transitions. Consider bedroom-specific scenes that minimize sleep disruption.",
      category: "Comfort"
    },
    {
      question: "Can intruders disable smart security lighting systems?",
      answer: "Multiple protection layers help: use tamper-resistant devices, employ mesh networks that route around failed nodes, include cellular backup communication, and combine with traditional wired security lighting. Never rely solely on wireless systems for perimeter security.",
      category: "Security"
    },
    {
      question: "How often should emergency lighting scenes be tested?",
      answer: "Test monthly for basic functionality, annually for full duration testing. Document all tests as required by regulations. Include smart system integration in testing protocols and verify manual override functionality regularly.",
      category: "Maintenance"
    },
    {
      question: "Do smart lights consume more energy than traditional lighting?",
      answer: "LED smart lights typically use less energy than traditional bulbs, but standby power for wireless communication and smart features adds some consumption. Overall energy use usually decreases due to automated scheduling and dimming capabilities.",
      category: "Energy"
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-500" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-600 rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              className="w-full text-left p-4 hover:bg-elec-dark text-foreground justify-between"
              onClick={() => toggleQuestion(index)}
            >
              <div className="flex items-start gap-3">
                <span className="bg-elec-yellow text-elec-dark text-xs font-bold px-2 py-1 rounded mt-1">
                  Q{index + 1}
                </span>
                <span className="text-sm font-medium">{faq.question}</span>
              </div>
              {openQuestion === index ? (
                <ChevronUp className="h-4 w-4 text-elec-yellow" />
              ) : (
                <ChevronDown className="h-4 w-4 text-elec-yellow" />
              )}
            </Button>
            {openQuestion === index && (
              <div className="p-4 bg-elec-dark border-t border-gray-600">
                <div className="flex items-start gap-2 mb-2">
                  <span className="bg-blue-600/20 text-blue-400 text-xs font-semibold px-2 py-1 rounded">
                    {faq.category}
                  </span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};