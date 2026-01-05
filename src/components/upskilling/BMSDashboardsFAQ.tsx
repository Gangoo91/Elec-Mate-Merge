import { HelpCircle, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

const BMSDashboardsFAQ = () => {
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
      question: "What's the optimal screen refresh rate for BMS dashboards?",
      answer: "For most applications, 10-30 seconds is optimal. Critical alarms should update immediately, trending data every 1-5 minutes, and energy consumption data every 15 minutes. Too frequent updates can cause screen flicker and overwhelm users."
    },
    {
      question: "How do I determine the right dashboard layout for different user types?",
      answer: "Conduct user interviews to understand daily tasks. Operators need real-time system status, supervisors need performance analytics, and managers need summary reports. Create role-specific views with appropriate detail levels and control access."
    },
    {
      question: "What colour coding standards should I follow for BMS displays?",
      answer: "Use universal standards: Red for alarms/critical, Amber for warnings/maintenance needed, Green for normal operation, Grey for offline/disabled, Blue for manual mode. Ensure adequate contrast for accessibility and avoid relying solely on colour to convey information."
    },
    {
      question: "How can I handle too many alarms overwhelming the dashboard?",
      answer: "Implement alarm prioritisation (critical, high, medium, low), use alarm grouping for related equipment, enable alarm filtering, and consider alarm suppression during maintenance. Display only actionable alarms prominently."
    },
    {
      question: "What's the best way to display historical trends on dashboards?",
      answer: "Use line charts for continuous data, bar charts for discrete values, and overlay multiple parameters with different Y-axes when relevant. Provide zoom capabilities and the ability to change time ranges (1 hour, 24 hours, 7 days, etc.)."
    },
    {
      question: "How do I ensure dashboards work well on mobile devices?",
      answer: "Use responsive design principles, prioritise the most critical information for small screens, implement touch-friendly controls, and consider creating mobile-specific layouts. Test on actual devices, not just browser simulation."
    },
    {
      question: "What security considerations apply to BMS dashboards?",
      answer: "Implement role-based access control, use secure authentication, enable session timeouts, log all user actions, and ensure encrypted communications. Consider read-only access for general users and full control only for authorised personnel."
    },
    {
      question: "How often should dashboard designs be reviewed and updated?",
      answer: "Conduct formal reviews annually or when systems change significantly. Monitor user feedback continuously and make minor adjustments as needed. Technology updates may require more frequent reviews every 2-3 years."
    },
    {
      question: "What backup plans should exist if the primary dashboard fails?",
      answer: "Maintain local HMI panels for critical systems, implement dashboard redundancy on separate servers, ensure mobile access as backup, and train staff on manual operation procedures. Document emergency contact procedures."
    },
    {
      question: "How do I integrate third-party systems into unified dashboards?",
      answer: "Use standard protocols (BACnet, Modbus, OPC), implement middleware for protocol translation, ensure data normalisation for consistent display, and maintain separate system access for troubleshooting. Plan for varying update rates between systems."
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-3">
          {faqs.map((faq, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger 
                className="w-full text-left"
                onClick={() => toggleItem(index)}
              >
                <div className="bg-elec-dark p-4 rounded-md border border-gray-600 hover:border-elec-yellow/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground">{faq.question}</h4>
                    <ChevronRight 
                      className={`h-4 w-4 text-elec-yellow transition-transform ${
                        openItems.includes(index) ? 'rotate-90' : ''
                      }`} 
                    />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="bg-elec-dark/50 p-4 rounded-b-md border-l border-r border-b border-gray-600 -mt-1">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default BMSDashboardsFAQ;