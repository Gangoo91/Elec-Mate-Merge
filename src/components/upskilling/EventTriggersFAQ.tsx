import { HelpCircle, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

const EventTriggersFAQ = () => {
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
      question: "How do I prevent automation from causing equipment cycling or rapid switching?",
      answer: "Implement appropriate time delays (hysteresis) in your trigger logic. For example, add a minimum 10-15 minute delay between start/stop commands for HVAC equipment. Use deadband settings around setpoints and include 'enable/disable' conditions to prevent rapid cycling during marginal conditions."
    },
    {
      question: "What's the best way to handle conflicting automation rules or priorities?",
      answer: "Establish a clear priority hierarchy: Safety override > Energy emergency > Occupant comfort > Energy optimization. Use priority levels in your logic (1=highest) and ensure higher priority events can override lower priority ones. Document priority rules clearly and test conflict scenarios."
    },
    {
      question: "How often should automated reports be generated to be useful without overwhelming users?",
      answer: "Tailor frequency to user needs: Daily operational summaries for facility managers, weekly energy reports for energy managers, monthly compliance reports for executives. Use exception reporting for immediate issues and allow users to request ad-hoc reports when needed."
    },
    {
      question: "What backup plans should exist if the automated notification system fails?",
      answer: "Implement multiple notification channels (email, SMS, mobile app), use both internal and cloud-based notification services, maintain local alarm panels for critical alarms, establish manual check procedures for critical systems, and include escalation to backup contacts if primary notifications aren't acknowledged."
    },
    {
      question: "How can I test event triggers without disrupting normal building operations?",
      answer: "Use simulation mode where possible, test during non-occupied hours, create test-only logic branches, use override switches to isolate test events, start with non-critical systems, and always inform affected parties before testing. Document all tests and results."
    },
    {
      question: "What level of complexity is appropriate for event trigger logic?",
      answer: "Keep individual triggers simple and readable. Complex scenarios should be broken into multiple simpler triggers rather than one complex rule. Limit conditions to 3-4 per trigger when possible. Use descriptive names for triggers and document the intended behaviour clearly."
    },
    {
      question: "How do I handle seasonal or schedule-based automation changes?",
      answer: "Use calendar-based scheduling functions, create separate automation profiles for different seasons/schedules, implement smooth transitions between profiles, allow manual override of automatic schedule changes, and test schedule transitions thoroughly before deployment."
    },
    {
      question: "What data should be included in automated reports for maximum value?",
      answer: "Include key performance indicators relevant to the audience, trend comparisons (vs. yesterday/last week/year), exception highlights, cost implications where relevant, actionable recommendations, and clear visualizations. Avoid data overload by focusing on what drives decisions."
    },
    {
      question: "How can I ensure automated systems continue working during system updates or maintenance?",
      answer: "Design redundant automation paths for critical functions, use separate processors for critical automation, implement graceful degradation modes, maintain manual override capabilities, schedule maintenance during low-impact periods, and thoroughly test automation after any system changes."
    },
    {
      question: "What security considerations apply to event triggers and automated notifications?",
      answer: "Secure all communication channels with encryption, implement user authentication for automation changes, log all automated actions with timestamps, restrict automation modification to authorized personnel, use secure protocols for external notifications, and regularly audit automation rules and access permissions."
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

export default EventTriggersFAQ;