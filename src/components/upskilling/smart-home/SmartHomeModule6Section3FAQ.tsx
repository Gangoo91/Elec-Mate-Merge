import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const SmartHomeModule6Section3FAQ = () => {
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
      question: "How many routines should I set up for a new client?",
      answer: "Start with 3-5 essential routines: 'Good Morning', 'Leaving Home', 'Good Night', and 'All Off'. Add more based on client comfort level and specific needs."
    },
    {
      question: "What if a routine only works sometimes?",
      answer: "Check device connectivity, network stability, and voice recognition accuracy. Ensure device names are clear and test each component individually before troubleshooting the full routine."
    },
    {
      question: "Can routines work without internet?",
      answer: "Basic local routines may work with some hubs (like SmartThings or Hubitat), but cloud-dependent devices and voice assistants require internet connectivity for most functionality."
    },
    {
      question: "How do I handle different family members' preferences?",
      answer: "Create person-specific routines using voice recognition, or use generic routines with manual overrides. Consider time-based variations for different family schedules."
    },
    {
      question: "What's the most common routine programming mistake?",
      answer: "Making routines too complex initially. Start simple and add complexity gradually. Also, failing to test edge cases like device offline scenarios or network interruptions."
    },
    {
      question: "How do I program routines that work with different smart home platforms?",
      answer: "Use platform-specific apps (Alexa App, Google Home App, SmartThings App) or universal platforms like Home Assistant. Each has different capabilities and interfaces."
    },
    {
      question: "Can routines be scheduled to run automatically?",
      answer: "Yes, most platforms support time-based triggers, sunrise/sunset triggers, and sensor-based automatic activation without voice commands."
    },
    {
      question: "What should I do if clients want to modify routines themselves?",
      answer: "Provide clear documentation, show them the basics in their platform's app, and offer ongoing support. Consider using simpler platforms like SmartThings for less technical users."
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-3">
          {faqData.map((item, index) => (
            <Card key={index} className="bg-elec-dark/50 border-gray-600">
              <CardContent className="p-0">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule6Section3FAQ;