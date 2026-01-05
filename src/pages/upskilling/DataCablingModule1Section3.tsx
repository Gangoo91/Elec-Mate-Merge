import { ArrowLeft, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { PassiveActiveLearningOutcomes } from '@/components/upskilling/PassiveActiveLearningOutcomes';
import { PassiveActiveIntro } from '@/components/upskilling/PassiveActiveIntro';
import { PassiveActiveContent } from '@/components/upskilling/PassiveActiveContent';
import { PassiveActiveScenario } from '@/components/upskilling/PassiveActiveScenario';
import { PassiveActiveTakeaways } from '@/components/upskilling/PassiveActiveTakeaways';
import { DataCablingFAQs } from '@/components/upskilling/DataCablingFAQs';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { dataCablingModule1Section3Quiz } from '@/data/upskilling/dataCablingModule1Section3and4QuizData';

const DataCablingModule1Section3 = () => {
  const faqs = [
    {
      question: "When should I choose passive components over active ones?",
      answer: "Choose passive components when you need maximum reliability, minimal maintenance, operation without power, or deployment in harsh environments. They're ideal for the foundational infrastructure that needs to last 15-25 years."
    },
    {
      question: "What are the ongoing costs of active vs passive components?",
      answer: "Passive components have minimal ongoing costs after installation. Active components require power, cooling, firmware updates, monitoring, and periodic replacement every 3-7 years, making their total cost of ownership higher."
    },
    {
      question: "Can I mix passive and active approaches in the same network?",
      answer: "Yes, and this is recommended. Most modern networks use passive infrastructure (cables, connectors) as the foundation with active components (switches, routers) strategically placed where intelligence and management are needed."
    },
    {
      question: "How do I determine the right balance of passive vs active components?",
      answer: "Consider your environment, reliability requirements, budget, and management needs. Harsh environments favour passive, whilst networks needing traffic management, security, or remote monitoring require active components."
    },
    {
      question: "What happens if active components fail?",
      answer: "Active component failures can disrupt network operations. This is why redundancy planning, backup power, and spare equipment are important. The underlying passive infrastructure usually remains intact and functional."
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
              <Cpu className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Passive vs Active Hardware
                </h1>
                <p className="text-xl text-gray-400">
                  Understanding passive and active network components
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 1.3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Network Infrastructure
              </Badge>
            </div>
          </div>

          <PassiveActiveIntro />
          
          <PassiveActiveLearningOutcomes />
          
          <PassiveActiveContent />
          
          <PassiveActiveScenario />
          
          <PassiveActiveTakeaways />
          
          <DataCablingFAQs faqs={faqs} />
          
          <SingleQuestionQuiz 
            questions={dataCablingModule1Section3Quiz}
            title="Section 1.3 Quiz: Passive vs Active Hardware"
          />
        </div>
      </div>
    </div>
  );
};

export default DataCablingModule1Section3;