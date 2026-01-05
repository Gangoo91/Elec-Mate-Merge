import { ArrowLeft, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { TopologiesLearningOutcomes } from '@/components/upskilling/TopologiesLearningOutcomes';
import { TopologiesIntro } from '@/components/upskilling/TopologiesIntro';
import { TopologiesContent } from '@/components/upskilling/TopologiesContent';
import { TopologiesScenario } from '@/components/upskilling/TopologiesScenario';
import { TopologiesTakeaways } from '@/components/upskilling/TopologiesTakeaways';
import { DataCablingFAQs } from '@/components/upskilling/DataCablingFAQs';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { dataCablingModule1Section2Quiz } from '@/data/upskilling/dataCablingModule1Section2QuizData';

const DataCablingModule1Section2 = () => {
  const faqs = [
    {
      question: "What's the difference between physical and logical topology?",
      answer: "Physical topology refers to the actual physical layout of cables and devices, whilst logical topology describes how data flows through the network. For example, a network might be physically wired in a star configuration but logically operate as a ring."
    },
    {
      question: "Can I mix different topologies in the same network?",
      answer: "Yes, this is called a hybrid topology. Most modern networks combine different topologies to optimise performance, cost, and reliability. For example, using star topology within buildings and mesh topology for inter-building connections."
    },
    {
      question: "Why is star topology preferred over bus topology?",
      answer: "Star topology offers better fault isolation (one cable failure doesn't affect others), easier troubleshooting, dedicated bandwidth per connection, and simpler maintenance. Bus topology is more cost-effective but has performance and reliability limitations."
    },
    {
      question: "When would I choose mesh topology despite its high cost?",
      answer: "Mesh topology is chosen for mission-critical applications where downtime is unacceptable, such as financial trading networks, emergency services communications, or data centre interconnections where redundancy is essential."
    },
    {
      question: "How does network size affect topology choice?",
      answer: "Small networks often use simple star topology, medium networks may use hierarchical star or tree structures, and large networks typically employ hybrid approaches combining multiple topologies to balance performance, cost, and management complexity."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
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
              <Wifi className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Topologies: Star, Bus, Ring, Mesh
                </h1>
                <p className="text-xl text-gray-400">
                  Network topology types and configurations
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 1.2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Network Topologies
              </Badge>
            </div>
          </div>

          <TopologiesIntro />
          
          <TopologiesLearningOutcomes />
          
          <TopologiesContent />
          
          <TopologiesScenario />
          
          <TopologiesTakeaways />
          
          <DataCablingFAQs faqs={faqs} />
          
          <SingleQuestionQuiz 
            questions={dataCablingModule1Section2Quiz}
            title="Section 1.2 Quiz: Network Topologies"
          />
        </div>
      </div>
    </div>
  );
};

export default DataCablingModule1Section2;