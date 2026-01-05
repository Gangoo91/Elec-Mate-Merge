import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeFAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the difference between a smart home and a connected home?",
      answer: "A connected home simply has devices that can connect to the internet, while a smart home has interconnected devices that can communicate with each other and be automated to work together as an integrated system. Smart homes feature automation, learning capabilities, and centralised control, whereas connected homes typically require manual control of individual devices."
    },
    {
      question: "Do I need to rewire my entire house to make it smart?",
      answer: "No, most smart home devices can be retrofitted into existing homes using wireless protocols like Zigbee, Z-Wave, or Wi-Fi. Basic smart home functionality can be achieved without any rewiring. However, some advanced features like smart switches or integrated systems may require additional wiring, but this is typically minimal and focused on specific areas."
    },
    {
      question: "Are smart homes secure from cyber attacks?",
      answer: "Smart homes can be secure when properly configured with strong, unique passwords, regular firmware updates, and network segmentation. However, they do introduce new security considerations that homeowners need to address. Best practices include using WPA3 Wi-Fi encryption, enabling two-factor authentication, keeping devices updated, and creating a separate network for IoT devices."
    },
    {
      question: "What happens to my smart home if the internet goes down?",
      answer: "Many smart home systems have local processing capabilities and can continue basic functions during internet outages. Systems using Zigbee, Z-Wave, or local hubs can maintain automation between connected devices. However, remote access, cloud-dependent features, voice assistants, and smartphone notifications will be unavailable until connectivity is restored."
    },
    {
      question: "How much does it cost to convert a home to a smart home?",
      answer: "Costs vary widely depending on the scope of automation. Basic smart lighting and thermostat installations can start from £500-1000, while comprehensive whole-home automation systems can cost £5000-15000 or more. A phased approach allows spreading costs over time, and many systems pay for themselves through energy savings within 3-5 years."
    },
    {
      question: "Which smart home protocol should I choose?",
      answer: "The choice depends on your specific needs: Zigbee is excellent for battery-powered sensors with its low power consumption and mesh networking. Z-Wave offers good range and less interference with Wi-Fi. Wi-Fi provides high bandwidth and easy setup but consumes more power. For future compatibility, look for devices supporting Matter/Thread standards."
    },
    {
      question: "Can smart homes help elderly or disabled users?",
      answer: "Yes, smart homes offer significant accessibility benefits including voice control for users with mobility limitations, automated lighting for those with vision impairments, medication reminders, fall detection systems, emergency notifications to caregivers, and simplified control interfaces. Many systems can be customised for specific accessibility needs."
    },
    {
      question: "How do I ensure different smart devices work together?",
      answer: "Choose devices that support common standards like Zigbee, Z-Wave, or the emerging Matter standard. Use a central hub that can communicate with multiple protocols. Check compatibility before purchasing, and consider staying within one manufacturer's ecosystem for critical functions while using open standards for flexibility."
    },
    {
      question: "What maintenance do smart home systems require?",
      answer: "Smart home systems require regular firmware updates, battery replacements for wireless devices (typically annually), network security monitoring, and periodic testing of automation routines. Most systems can be configured for automatic updates, and many devices provide low-battery alerts through smartphone apps."
    },
    {
      question: "Will smart home technology become obsolete quickly?",
      answer: "While individual devices may become outdated, the underlying protocols (Zigbee, Z-Wave, Wi-Fi) have been stable for years. The emerging Matter standard aims to provide long-term compatibility. Choose devices from established manufacturers with good update support, and focus on open standards rather than proprietary systems to ensure longevity."
    }
  ];

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
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-4 bg-elec-gray hover:bg-[#323232] transition-colors flex justify-between items-center"
            >
              <span className="font-semibold text-foreground pr-4">{faq.question}</span>
              <ChevronDown 
                className={`h-5 w-5 text-gray-400 transition-transform flex-shrink-0 ${
                  openFAQ === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openFAQ === index && (
              <div className="p-4 bg-elec-dark border-t border-gray-600">
                <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};