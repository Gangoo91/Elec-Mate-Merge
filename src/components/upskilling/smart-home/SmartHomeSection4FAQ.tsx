import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const SmartHomeSection4FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: "Can a smart home run without the internet?",
      answer: "Yes, but it depends on the architecture. Local systems can operate completely offline, maintaining all automation functions. Cloud systems become non-functional without internet. Hybrid systems continue critical local functions whilst losing cloud-dependent features like voice control and remote access.",
      category: "connectivity"
    },
    {
      question: "Which architecture is most secure?",
      answer: "Local architecture is generally most secure since data never leaves the home network. However, this requires proper network security configuration. Cloud systems depend on the provider's security measures and encryption. Hybrid systems have mixed security - local data stays private whilst cloud features share data externally.",
      category: "security"
    },
    {
      question: "Why would someone choose cloud over local systems?",
      answer: "Cloud systems offer significant advantages for many users: extremely easy setup (often plug-and-play), extensive third-party integrations, automatic updates, professional support, and no need for technical expertise. They're ideal for renters, first-time users, or those prioritising convenience over control.",
      category: "convenience"
    },
    {
      question: "How much does each architecture typically cost?",
      answer: "Local systems have higher upfront costs (£200-£800+ for quality hubs) but no ongoing fees. Cloud systems have lower initial costs (£50-£200) but may include subscription fees (£5-£20/month). Hybrid systems combine both cost structures, making them the most expensive overall but offering maximum flexibility.",
      category: "cost"
    },
    {
      question: "Can I migrate between different architectures later?",
      answer: "Migration is possible but complexity varies. Moving from cloud to local requires compatible devices and technical setup. Cloud to cloud migration depends on device compatibility. Adding hybrid capabilities to existing systems is often the easiest upgrade path. Planning for future migration when choosing initial devices saves significant effort.",
      category: "migration"
    },
    {
      question: "What happens to my smart home during power outages?",
      answer: "All architectures are affected by power outages, but differently. Local systems with battery backup (UPS) can continue operating critical functions. Cloud systems lose all functionality. Hybrid systems with local backup maintain essential operations. Consider UPS systems for critical hubs and internet equipment to maintain functionality.",
      category: "reliability"
    },
    {
      question: "How important is internet speed for different architectures?",
      answer: "Local systems require minimal internet (only for updates and remote access). Cloud systems need reliable, fast internet (minimum 10Mbps recommended) for responsive operation. Hybrid systems need moderate internet for cloud features but can function with slower speeds since critical operations are local.",
      category: "connectivity"
    },
    {
      question: "Which architecture works best for renters?",
      answer: "Cloud systems are typically best for renters due to easy installation/removal, no permanent modifications needed, and portability to new locations. Battery-powered devices and plug-in controllers avoid wiring changes. Some hybrid solutions using portable hubs can also work well for tech-savvy renters.",
      category: "housing"
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'connectivity': return 'text-blue-400';
      case 'security': return 'text-red-400';
      case 'convenience': return 'text-green-400';
      case 'cost': return 'text-yellow-400';
      case 'migration': return 'text-purple-400';
      case 'reliability': return 'text-orange-400';
      case 'housing': return 'text-cyan-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 mb-6">
          Common questions about smart home architectures and their practical implications:
        </p>
        
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-600 rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                onClick={() => toggleQuestion(index)}
                className="w-full p-3 sm:p-4 text-left hover:bg-[#323232] justify-between min-h-0"
              >
                <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 flex-1">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${getCategoryColor(faq.category)} bg-current/20 flex-shrink-0`}>
                    {faq.category.toUpperCase()}
                  </span>
                  <span className="text-foreground font-medium text-sm sm:text-base">{faq.question}</span>
                </div>
                {openQuestion === index ? (
                  <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1 sm:mt-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1 sm:mt-0" />
                )}
              </Button>
              
              {openQuestion === index && (
                <div className="px-3 sm:px-4 pb-3 sm:pb-4 border-t border-gray-600 bg-[#1a1a1a]">
                  <p className="text-gray-300 text-sm leading-relaxed pt-3">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FAQ Categories Legend */}
        <div className="mt-6 p-3 sm:p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-3">Question Categories</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400/20 rounded border border-blue-400 flex-shrink-0"></div>
              <span className="text-blue-400">Connectivity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400/20 rounded border border-red-400 flex-shrink-0"></div>
              <span className="text-red-400">Security</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400/20 rounded border border-green-400 flex-shrink-0"></div>
              <span className="text-green-400">Convenience</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400/20 rounded border border-yellow-400 flex-shrink-0"></div>
              <span className="text-yellow-400">Cost</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-400/20 rounded border border-purple-400 flex-shrink-0"></div>
              <span className="text-purple-400">Migration</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-400/20 rounded border border-orange-400 flex-shrink-0"></div>
              <span className="text-orange-400">Reliability</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-400/20 rounded border border-cyan-400 flex-shrink-0"></div>
              <span className="text-cyan-400">Housing</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};