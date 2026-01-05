import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SmartHomeModule5Section4FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: "What happens if my internet connection fails while I'm away from home?",
      answer: "Most smart home systems have local functionality that continues to work during internet outages. Critical security features often have cellular backup connections. However, remote access and notifications will be unavailable until connectivity is restored. Consider systems with 4G backup modules for critical applications.",
      category: "Connectivity"
    },
    {
      question: "How secure is remote access to my smart home system?",
      answer: "Security depends on proper configuration. Use strong, unique passwords, enable two-factor authentication, keep firmware updated, and choose systems with end-to-end encryption. Avoid systems that store unencrypted data or use default passwords. Regular security audits are recommended.",
      category: "Security"
    },
    {
      question: "Can I control my smart home when travelling internationally?",
      answer: "Yes, remote access works globally as long as you have internet connectivity. However, check that your mobile data plan covers international usage to avoid excessive charges. Some countries may restrict certain cloud services, so verify compatibility before travelling.",
      category: "Travel"
    },
    {
      question: "How do I prevent false alerts from triggering constantly?",
      answer: "Configure motion sensors properly to avoid pet detection zones, adjust sensitivity settings, use intelligent filtering algorithms, and set up notification schedules. Many systems offer 'smart alerts' that learn normal patterns and reduce false positives over time.",
      category: "Configuration"
    },
    {
      question: "What should I do if I lose my smartphone with the smart home app?",
      answer: "Immediately log into your account from another device and revoke access for the lost phone. Change your account password and enable two-factor authentication if not already active. Most systems allow remote device management to prevent unauthorised access.",
      category: "Security"
    },
    {
      question: "How much mobile data does remote monitoring typically use?",
      answer: "Basic monitoring uses minimal data (10-50MB per month). Video streaming significantly increases usage - live viewing can use 100-200MB per hour. Push notifications and status updates use very little data. Consider unlimited data plans for heavy video monitoring usage.",
      category: "Data Usage"
    },
    {
      question: "Can multiple family members have access to the same smart home system?",
      answer: "Yes, most systems support multiple user accounts with different permission levels. You can grant full access to adults, limited access to children, and temporary access to guests. Each user typically gets their own login credentials and personalised dashboard.",
      category: "User Management"
    },
    {
      question: "What backup options exist if the cloud service provider goes out of business?",
      answer: "Choose systems that support local storage and processing, maintain device configuration backups, and avoid proprietary protocols when possible. Look for systems with data export capabilities and open standards compatibility to enable migration to alternative platforms.",
      category: "Reliability"
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