import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule5Section2FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "Do higher resolution cameras always mean better security?",
      answer: "Not always — they provide clearer images but may reduce system performance if storage or bandwidth is inadequate. The key is balancing resolution with your specific needs and infrastructure capabilities. Higher resolution requires more storage space and bandwidth, so ensure your system can handle it before upgrading."
    },
    {
      question: "Can I mix wired and wireless cameras in the same system?",
      answer: "Yes, hybrid setups are very common and often recommended. Wired cameras (typically PoE) for main coverage areas provide reliability and consistent power, whilst wireless cameras offer flexibility for hard-to-reach locations or temporary installations. Most modern NVR systems support both connection types."
    },
    {
      question: "Is cloud storage safe for CCTV footage?",
      answer: "Cloud storage can be very secure when properly implemented with end-to-end encryption and reputable providers. Always verify the provider's security certifications, encryption methods, data location policies, and compliance with UK GDPR requirements. Consider hybrid approaches with local backup for critical footage."
    },
    {
      question: "What's the difference between NVR and cloud storage costs?",
      answer: "NVR systems have higher upfront costs but lower ongoing expenses, whilst cloud storage has lower initial costs but recurring monthly/yearly fees. For long-term storage (30+ days), NVR is typically more cost-effective. Cloud storage offers remote access and offsite backup benefits that may justify the ongoing costs."
    },
    {
      question: "How long should I keep CCTV footage?",
      answer: "This depends on your purpose and legal requirements. For general security, 30 days is common. Commercial properties might need 90+ days. Always check local regulations and your insurance requirements. GDPR requires you to only keep footage as long as necessary for your stated purpose and delete it afterwards."
    },
    {
      question: "Do PTZ cameras need special installation considerations?",
      answer: "Yes, PTZ cameras require more power (often PoE+ or 12V), structured cable management for movement, and careful positioning to avoid obstacles in their rotation path. They also need proper configuration of preset positions and patrol patterns. Consider environmental factors like wind loading for outdoor installations."
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
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
              <div className="p-4 bg-[#1a1a1a] border-t border-gray-600">
                <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};