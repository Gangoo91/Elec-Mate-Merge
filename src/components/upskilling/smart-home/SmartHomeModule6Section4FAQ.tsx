import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const SmartHomeModule6Section4FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      question: "How do I know if a legacy system is worth bridging vs replacing?",
      answer: "Consider the system's age, reliability, available bridge options, and total costs. Generally, if bridging costs more than 60% of replacement cost, or the system is over 15 years old with reliability issues, replacement is better."
    },
    {
      question: "What happens if the bridge device fails?",
      answer: "The legacy system typically continues to work in its original mode, but smart features are lost until the bridge is repaired or replaced. This is why we recommend keeping original control methods accessible."
    },
    {
      question: "Can I bridge systems from different manufacturers together?",
      answer: "Yes, but it often requires a universal platform like Home Assistant or SmartThings that supports multiple protocols. Direct manufacturer-to-manufacturer bridging is less common."
    },
    {
      question: "Do bridged systems work during internet outages?",
      answer: "It depends on the bridge type. Local processing bridges (like Hubitat) can maintain basic functions offline, while cloud-dependent systems (like many Wi-Fi bridges) require internet connectivity."
    },
    {
      question: "How do I explain bridging limitations to clients?",
      answer: "Use analogies they understand: 'Like using a translator - you can communicate, but some nuances are lost.' Be specific about what features will and won't work, and always demonstrate the limitations."
    },
    {
      question: "What's the most reliable bridging method?",
      answer: "Hardware bridges from established manufacturers (like Philips Hue Bridge, Lutron Caseta) tend to be most reliable, followed by local processing platforms like Hubitat or SmartThings."
    },
    {
      question: "Can I add more smart features to a bridged system later?",
      answer: "Usually yes, but you're limited by the bridge's capabilities and the legacy system's available interfaces. Plan for future expansion when selecting bridging solutions."
    },
    {
      question: "How do I troubleshoot bridged systems when they stop working?",
      answer: "Start with the bridge device - check power, network connection, and status lights. Then verify the legacy system works independently. Finally, check the smart platform's connection to the bridge."
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-3">
          {faqData.map((item, index) => (
            <div key={index} className="bg-elec-dark/50 border border-gray-600 rounded-lg">
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-elec-gray/30 transition-colors duration-200 rounded"
              >
                <span className="text-foreground font-medium pr-4">{item.question}</span>
                {openItems.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-4 pb-4">
                  <div className="pt-2 border-t border-gray-600">
                    <p className="text-foreground leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule6Section4FAQ;