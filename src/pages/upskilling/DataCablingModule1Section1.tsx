import { ArrowLeft, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { DataCablingLearningOutcomes } from '@/components/upskilling/DataCablingLearningOutcomes';
import { DataCablingIntro } from '@/components/upskilling/DataCablingIntro';
import { DataCablingContent } from '@/components/upskilling/DataCablingContent';
import { DataCablingScenario } from '@/components/upskilling/DataCablingScenario';
import { DataCablingTakeaways } from '@/components/upskilling/DataCablingTakeaways';
import { DataCablingFAQs } from '@/components/upskilling/DataCablingFAQs';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { dataCablingModule1Section1Quiz } from '@/data/upskilling/dataCablingModule1QuizData';

const DataCablingModule1Section1 = () => {
  const faqs = [
    {
      question: "What's the difference between structured and unstructured cabling?",
      answer: "Structured cabling follows standardised design principles with organised cable runs, proper labelling, and standardised components. Unstructured cabling is typically point-to-point connections without standardisation, making it harder to manage and expand."
    },
    {
      question: "How long does structured cabling typically last?",
      answer: "A well-designed structured cabling system typically lasts 15-20 years or more. The infrastructure often outlasts multiple generations of active equipment, making it a cost-effective long-term investment."
    },
    {
      question: "What are the main standards for structured cabling?",
      answer: "The primary standards are TIA/EIA-568 (North America), ISO/IEC 11801 (International), and EN 50173 (Europe). These standards define cable types, performance requirements, installation practices, and testing procedures."
    },
    {
      question: "Can structured cabling support different types of services?",
      answer: "Yes, structured cabling is designed to be service-independent. The same infrastructure can support voice, data, video, building automation, security systems, and emerging technologies without requiring rewiring."
    },
    {
      question: "What's the difference between horizontal and backbone cabling?",
      answer: "Horizontal cabling runs from work area outlets to telecommunications rooms (typically within 90 metres). Backbone cabling connects between telecommunications rooms, equipment rooms, and buildings, often using higher-performance cables."
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
              <Network className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  What is Structured Cabling?
                </h1>
                <p className="text-xl text-gray-400">
                  Introduction to structured cabling systems and principles
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 1.1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Structured Cabling Basics
              </Badge>
            </div>
          </div>

          <DataCablingIntro />
          
          <DataCablingLearningOutcomes />
          
          <DataCablingContent />
          
          <DataCablingScenario />
          
          <DataCablingTakeaways />
          
          <DataCablingFAQs faqs={faqs} />
          
          <SingleQuestionQuiz 
            questions={dataCablingModule1Section1Quiz}
            title="Section 1.1 Quiz: Structured Cabling Basics"
          />
        </div>
      </div>
    </div>
  );
};

export default DataCablingModule1Section1;