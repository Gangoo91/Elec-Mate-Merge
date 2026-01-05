import { ArrowLeft, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import BS7671EmbeddedQuiz from '@/components/upskilling/BS7671EmbeddedQuiz';
import BS7671Module5Section6Intro from '@/components/upskilling/bs7671/BS7671Module5Section6Intro';
import BS7671Module5Section6Environmental from '@/components/upskilling/bs7671/BS7671Module5Section6Environmental';
import BS7671Module5Section6Practical from '@/components/upskilling/bs7671/BS7671Module5Section6Practical';
import BS7671Module5Section6FAQ from '@/components/upskilling/bs7671/BS7671Module5Section6FAQ';
import BS7671Module5Section6Summary from '@/components/upskilling/bs7671/BS7671Module5Section6Summary';

const BS7671Module5Section6 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What does IP65 protection provide against?",
      options: [
        "Dust ingress only",
        "Water jets from any direction and complete dust protection",
        "Water immersion only",
        "Basic splash protection"
      ],
      correct: 1,
      explanation: "IP65 provides complete protection against dust ingress (first digit 6) and protection against water jets from any direction (second digit 5)."
    },
    {
      id: 2,
      question: "According to BS7671, which cable type is required for fire alarm circuits in escape routes?",
      options: [
        "Standard PVC cable",
        "Fire resistant cable with enhanced fire performance",
        "Armoured cable only",
        "Any cable with IP65 rating"
      ],
      correct: 1,
      explanation: "Fire alarm circuits in escape routes must use fire resistant cables that maintain circuit integrity during fire conditions to ensure continued operation."
    },
    {
      id: 3,
      question: "What environmental factor must be considered when selecting outdoor electrical equipment?",
      options: [
        "Temperature range only",
        "UV radiation only", 
        "Temperature range, UV radiation, moisture, and corrosive atmospheres",
        "Aesthetic appearance"
      ],
      correct: 2,
      explanation: "All environmental factors including temperature extremes, UV radiation, moisture ingress, and potential corrosive atmospheres must be considered for outdoor installations."
    },
    {
      id: 4,
      question: "Which IP rating is typically required for bathroom Zone 1 installations?",
      options: [
        "IP20",
        "IP44",
        "IPX4 minimum",
        "IP65"
      ],
      correct: 2,
      explanation: "Bathroom Zone 1 requires IPX4 minimum protection against water splashing from any direction, with higher ratings acceptable."
    },
    {
      id: 5,
      question: "What is the primary purpose of cable fire resistance ratings?",
      options: [
        "To prevent electrical faults",
        "To maintain circuit integrity during fire conditions",
        "To reduce installation costs",
        "To improve cable flexibility"
      ],
      correct: 1,
      explanation: "Fire resistance ratings ensure cables maintain circuit integrity during fire conditions, allowing critical systems like fire alarms and emergency lighting to continue operating."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../bs7671-module-5">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-yellow-400" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Environmental Protection Requirements
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            IP ratings, fire resistance, and environmental considerations per BS7671
          </p>
          <div className="flex flex-wrap gap-4">
            <Badge variant="secondary" className="bg-yellow-400 text-black">
              Module 5.6
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              Section 6
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              25 minutes
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          <BS7671Module5Section6Intro />
          <BS7671Module5Section6Environmental />
          <BS7671Module5Section6Practical />

          <BS7671Module5Section6FAQ />
          <BS7671Module5Section6Summary />
          
          {/* Enhanced Quiz Section */}
          <div className="bg-card border-transparent rounded-lg p-6">
            <h2 className="text-white text-2xl font-bold mb-4">Section Assessment</h2>
            <BS7671EmbeddedQuiz
              questions={quizQuestions}
              title="Environmental Protection Requirements"
              description="Test your understanding of IP ratings, fire resistance, and environmental considerations"
            />
          </div>
        </div>
      </main>

      {/* Navigation */}
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex justify-between items-center">
            <Link to="../bs7671-module-5-section-5">
              <Button 
                variant="outline" 
                className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Isolation & Switching
              </Button>
            </Link>
            
            <Link to="../bs7671-module-6">
              <Button 
                className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200"
              >
                Next: Module 6
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BS7671Module5Section6;