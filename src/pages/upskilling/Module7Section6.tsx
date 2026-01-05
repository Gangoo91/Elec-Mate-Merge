import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import DocumentationBestPracticesContent from '@/components/upskilling/DocumentationBestPracticesContent';
import DocumentationBestPracticesPractical from '@/components/upskilling/DocumentationBestPracticesPractical';
import DocumentationBestPracticesFAQ from '@/components/upskilling/DocumentationBestPracticesFAQ';
import DocumentationBestPracticesQuiz from '@/components/upskilling/quiz/DocumentationBestPracticesQuiz';

const Module7Section6 = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../module-7">
          <Button variant="ghost" className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-yellow-400" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Documentation Best Practices</h1>
          </div>
          <p className="text-lg sm:text-xl text-white max-w-3xl">Professional standards for electrical certification and avoiding common mistakes</p>
          <div className="flex gap-4">
            <Badge variant="secondary" className="bg-yellow-400 text-black">Module 7.6</Badge>
            <Badge variant="outline" className="border-gray-600 text-white">35 minutes</Badge>
          </div>
        </div>
      </header>
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <DocumentationBestPracticesContent />
          <DocumentationBestPracticesPractical />
          <DocumentationBestPracticesFAQ />
          <DocumentationBestPracticesQuiz />
        </div>
      </main>
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link to="module-7/section-5" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200 min-h-[48px]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="text-sm sm:text-base">Previous: Observation Codes</span>
              </Button>
            </Link>
            <Link to="../module-8" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200 min-h-[48px]">
                <span className="text-sm sm:text-base">Next Module: Advanced Testing</span>
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Module7Section6;