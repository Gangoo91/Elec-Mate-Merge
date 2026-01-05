import { ArrowLeft, ArrowRight, Cable } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { TwistedPairLearningOutcomes } from '@/components/upskilling/TwistedPairLearningOutcomes';
import { TwistedPairIntro } from '@/components/upskilling/TwistedPairIntro';
import { TwistedPairContent } from '@/components/upskilling/TwistedPairContent';
import { TwistedPairScenario } from '@/components/upskilling/TwistedPairScenario';
import { TwistedPairTakeaways } from '@/components/upskilling/TwistedPairTakeaways';
import { DataCablingFAQs } from '@/components/upskilling/DataCablingFAQs';
import { Quiz } from '@/components/upskilling/Quiz';
import { dataCablingModule2Section1QuizData } from '@/data/upskilling/dataCablingModule2Section1QuizData';

const DataCablingModule2Section1 = () => {
  const faqs = [
    {
      question: "What's the difference between UTP and STP cables?",
      answer: "UTP (Unshielded Twisted Pair) relies solely on wire twisting for interference protection, whilst STP (Shielded Twisted Pair) includes additional metallic shielding around pairs or the entire cable. STP provides better performance in high-interference environments but is more expensive and requires proper grounding."
    },
    {
      question: "Can I use Cat6 cables with Cat5e patch panels?",
      answer: "Whilst physically compatible, this creates a performance bottleneck. The connection will only perform to the lowest category standard (Cat5e). For optimal performance, all components in the channel should be the same category or higher."
    },
    {
      question: "Why is Cat6A cable thicker than Cat6?",
      answer: "Cat6A includes additional insulation and often an internal spline or cross-filler to maintain pair separation and reduce alien crosstalk. This construction is necessary to achieve 500 MHz bandwidth and full 10 Gbps performance over 100 metres."
    },
    {
      question: "How do I know if my installation meets category requirements?",
      answer: "Proper certification testing using a qualified cable tester is essential. The tester must verify all performance parameters including insertion loss, return loss, NEXT, FEXT, and alien crosstalk for the specific category. Simply having category-rated components doesn't guarantee channel performance."
    },
    {
      question: "What's the maximum pulling tension for twisted pair cables?",
      answer: "The maximum pulling tension is typically 25 pounds (110 Newtons) for 4-pair cables. Exceeding this can stretch the conductors, alter the twist rates, and permanently degrade performance. Always use proper pulling techniques and lubricants when necessary."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../data-cabling-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Cable className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Twisted Pair Basics and Categories
                </h1>
                <p className="text-xl text-gray-400">
                  Understanding twisted pair cable construction and performance categories
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Section 1
              </Badge>
            </div>
          </div>

          {/* Content sections */}
          <TwistedPairIntro />
          <TwistedPairLearningOutcomes />
          <TwistedPairContent />
          <TwistedPairScenario />
          <TwistedPairTakeaways />
          <DataCablingFAQs faqs={faqs} />
          <Quiz 
            questions={dataCablingModule2Section1QuizData}
            title="Twisted Pair Knowledge Check"
            description="Test your understanding of twisted pair cable basics and categories"
          />

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <div></div>
            <Link to="../data-cabling-module-2-section-2">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCablingModule2Section1;