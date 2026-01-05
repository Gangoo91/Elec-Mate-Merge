import { ArrowLeft, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { NetworkSpeedLearningOutcomes } from '@/components/upskilling/NetworkSpeedLearningOutcomes';
import { NetworkSpeedIntro } from '@/components/upskilling/NetworkSpeedIntro';
import { NetworkSpeedContent } from '@/components/upskilling/NetworkSpeedContent';
import { NetworkSpeedScenario } from '@/components/upskilling/NetworkSpeedScenario';
import { NetworkSpeedTakeaways } from '@/components/upskilling/NetworkSpeedTakeaways';
import { DataCablingFAQs } from '@/components/upskilling/DataCablingFAQs';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { dataCablingModule1Section4Quiz } from '@/data/upskilling/dataCablingModule1Section3and4QuizData';

const DataCablingModule1Section4 = () => {
  const faqs = [
    {
      question: "What's the difference between bandwidth and speed?",
      answer: "Bandwidth is the maximum amount of data that can be transmitted (like the width of a motorway), whilst speed refers to how fast individual data packets travel. Higher bandwidth allows more data to flow simultaneously."
    },
    {
      question: "How do I calculate how much bandwidth my organisation needs?",
      answer: "Add up bandwidth requirements for all applications, multiply by the number of concurrent users, add 20-40% overhead for protocols, then add growth margin. Consider peak usage periods, not averages."
    },
    {
      question: "Is wireless fast enough to replace wired connections?",
      answer: "Modern Wi-Fi 6 can achieve high speeds, but wired connections still offer more consistent performance, lower latency, and higher reliability. Use wireless for mobility, wired for critical applications and infrastructure."
    },
    {
      question: "How often should I upgrade my network infrastructure?",
      answer: "Passive cabling infrastructure lasts 15-25 years, whilst active equipment typically needs replacement every 3-7 years. Plan upgrades based on capacity needs, equipment lifecycle, and technology advancement."
    },
    {
      question: "What future technologies should I plan for?",
      answer: "Consider IoT device proliferation, edge computing, AI workloads, 8K video, VR/AR applications, and increased cloud dependency. These trends generally require higher bandwidth and lower latency."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../data-cabling-module-1">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Network Speed, Bandwidth, and Future Proofing
                </h1>
                <p className="text-xl text-gray-400">
                  Performance requirements and planning ahead
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 1.4
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Performance Planning
              </Badge>
            </div>
          </div>

          <NetworkSpeedIntro />
          
          <NetworkSpeedLearningOutcomes />
          
          <NetworkSpeedContent />
          
          <NetworkSpeedScenario />
          
          <NetworkSpeedTakeaways />
          
          <DataCablingFAQs faqs={faqs} />
          
          <SingleQuestionQuiz 
            questions={dataCablingModule1Section4Quiz}
            title="Section 1.4 Quiz: Network Speed and Future Proofing"
          />
        </div>
      </div>
    </div>
  );
};

export default DataCablingModule1Section4;