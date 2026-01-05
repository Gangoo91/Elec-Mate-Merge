import { ArrowLeft, ArrowRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TestEquipmentContent } from '@/components/upskilling/TestEquipmentContent';
import { TestEquipmentPractical } from '@/components/upskilling/TestEquipmentPractical';
import { TestEquipmentFAQ } from '@/components/upskilling/TestEquipmentFAQ';
import { TestEquipmentSummary } from '@/components/upskilling/TestEquipmentSummary';
import { TestEquipmentQuiz } from '@/components/upskilling/quiz/TestEquipmentQuiz';

const Module5Section6 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../module-5">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Eye className="h-8 w-8 text-yellow-400" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Test Equipment Setup & Safety
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-white max-w-3xl leading-relaxed">
            Proper setup of test equipment and essential safety procedures for impedance and fault current testing
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <TestEquipmentContent />
          <TestEquipmentPractical />
          <TestEquipmentFAQ />
          <TestEquipmentSummary />
          <TestEquipmentQuiz />
        </div>
      </main>

      {/* Navigation */}
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link to="module-5/section-5" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200 py-3 px-6 text-sm sm:text-base"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Fault Current Testing
              </Button>
            </Link>
            
            <Link to="module-5/section-7" className="w-full sm:w-auto">
              <Button 
                className="w-full sm:w-auto bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200 py-3 px-6 text-sm sm:text-base"
              >
                Next: Documenting Results
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Module5Section6;