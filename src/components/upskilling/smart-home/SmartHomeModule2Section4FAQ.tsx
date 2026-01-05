import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule2Section4FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: "Can I use the same channel for Wi-Fi and Zigbee?",
      answer: "It's not recommended. Wi-Fi and Zigbee operating on the same channel will interfere with each other, causing dropped connections and poor performance. Always separate them by at least 5 channels."
    },
    {
      question: "Why do smart devices work during the day but fail at night?",
      answer: "Evening hours typically see higher network usage as family members come home and use streaming services, video calls, and other bandwidth-intensive applications, increasing interference and congestion."
    },
    {
      question: "Do microwave ovens really affect smart home devices?",
      answer: "Yes, microwave ovens operate at 2.45 GHz and can cause significant interference with Wi-Fi and Zigbee devices on the 2.4 GHz band, especially when the devices are nearby."
    },
    {
      question: "Is 5 GHz Wi-Fi always better than 2.4 GHz?",
      answer: "5 GHz offers higher speeds and less congestion but has shorter range and worse wall penetration. Use 5 GHz for high-bandwidth devices close to the router, and 2.4 GHz for IoT devices that need better range."
    },
    {
      question: "How many smart devices can one Wi-Fi network handle?",
      answer: "This depends on the router quality and device types. Most home routers can handle 50-100 low-bandwidth IoT devices, but only 10-20 high-bandwidth devices like cameras. Consider mesh protocols for sensor-heavy installations."
    },
    {
      question: "Should I use different networks for different device types?",
      answer: "Yes, network segmentation is often beneficial. Use Wi-Fi for high-bandwidth devices, Zigbee/Z-Wave for sensors and switches, and consider separate IoT VLANs for security and performance."
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-foreground mb-4">
          Common questions about wireless interference, channel planning, and bandwidth management.
        </p>
        {faqs.map((faq, index) => (
          <div key={index}>
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full flex items-center justify-between p-4 text-left bg-elec-dark border border-gray-600 rounded-lg hover:bg-[#323232]/50 transition-colors"
            >
              <span className="font-medium text-foreground pr-4">{faq.question}</span>
              {openQuestion === index ? (
                <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
              )}
            </button>
            {openQuestion === index && (
              <div className="mt-2 p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
                <p className="text-foreground">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};