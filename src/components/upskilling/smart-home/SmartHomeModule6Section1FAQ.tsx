import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const SmartHomeModule6Section1FAQ = () => {
  const faqs = [
    {
      question: "Can I use multiple hubs in the same home?",
      answer: "Yes, you can use multiple hubs, but it creates complexity with separate apps and limited cross-system automation. It's generally better to choose one primary hub that can integrate with other systems, like SmartThings connecting to Philips Hue or Nest devices."
    },
    {
      question: "Do I need internet connectivity for smart home hubs to work?",
      answer: "It depends on the hub. Home Assistant can work completely offline once configured. SmartThings requires internet for most features and app access. Proprietary hubs like Philips Hue can control local devices without internet, but lose app control and automation features."
    },
    {
      question: "How do I know which devices will work with which hub?",
      answer: "Check the hub's compatibility list on the manufacturer's website. Look for protocol support (Zigbee, Z-Wave, Wi-Fi). Most modern hubs support multiple protocols, but always verify specific device compatibility before purchasing."
    },
    {
      question: "What's the difference between Zigbee and Z-Wave?",
      answer: "Both are mesh network protocols for smart devices. Zigbee operates on 2.4GHz (like Wi-Fi) and is more common globally. Z-Wave uses different frequencies by region (868MHz in Europe) and has less interference with Wi-Fi. Both create strong mesh networks for device communication."
    },
    {
      question: "Can I migrate devices from one hub to another?",
      answer: "Yes, but the process varies. Zigbee and Z-Wave devices can usually be reset and re-paired to new hubs. However, you'll lose existing automation rules and may need to reconfigure device settings. Always backup configurations when possible."
    },
    {
      question: "Which hub is most future-proof?",
      answer: "Hubs supporting multiple protocols (Zigbee, Z-Wave, Wi-Fi) and Matter/Thread standards are most future-proof. SmartThings and Home Assistant offer broad compatibility. Look for hubs that receive regular updates and have strong manufacturer backing."
    },
    {
      question: "How many devices can a hub handle?",
      answer: "Capacity varies significantly. Home Assistant can handle hundreds of devices with adequate hardware. SmartThings officially supports 200+ devices. Proprietary hubs have smaller limits (Philips Hue: 50 bulbs per bridge). Always check specifications for your project size."
    },
    {
      question: "Do smart hubs work during power outages?",
      answer: "Most hubs require power and will stop working during outages unless connected to UPS (Uninterruptible Power Supply). However, some battery-powered devices may continue basic functions, and systems typically resume automatically when power returns."
    }
  ];

  return (
    <Card className="bg-elec-gray border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
          <HelpCircle className="h-7 w-7 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-elec-dark/50 border border-gray-600/30 rounded-lg px-4"
            >
              <AccordionTrigger className="text-foreground hover:text-elec-yellow text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground text-sm leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};