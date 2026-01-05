import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import BS7671Module8Section2Quiz from '@/components/upskilling/quiz/BS7671Module8Section2Quiz';
import BS7671Module8Section2Intro from '@/components/upskilling/bs7671/BS7671Module8Section2Intro';
import BS7671Module8Section2LearningOutcomes from '@/components/upskilling/bs7671/BS7671Module8Section2LearningOutcomes';
import CertificatesAndFormsSection from '@/components/upskilling/bs7671/CertificatesAndFormsSection';
import QualityControlSection from '@/components/upskilling/bs7671/QualityControlSection';
import ReferenceChartsSection from '@/components/upskilling/bs7671/ReferenceChartsSection';
import DocumentationBestPracticesSection from '@/components/upskilling/bs7671/DocumentationBestPracticesSection';
import BS7671Module8Section2RealWorld from '@/components/upskilling/bs7671/BS7671Module8Section2RealWorld';
import BS7671Module8Section2Summary from '@/components/upskilling/bs7671/BS7671Module8Section2Summary';
import BS7671Module8Section2FAQ from '@/components/upskilling/bs7671/BS7671Module8Section2FAQ';

const BS7671Module8Section2 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div>
        <Link to="../bs7671-module-8">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 8
          </Button>
        </Link>
        
        <div className="space-y-6 max-w-full overflow-hidden">
          {/* Header */}
          <div className="max-w-full">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white break-words">
                  Schedules, Checklists, and Reference Charts
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-white break-words">
                  Module 8, Section 2 - Documentation tools and quality control
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
                Module 8.2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white text-xs sm:text-sm">
                55 minutes
              </Badge>
            </div>
          </div>

          <BS7671Module8Section2Intro />
          <BS7671Module8Section2LearningOutcomes />
          
          <div className="grid gap-6">
            <CertificatesAndFormsSection />
            <QualityControlSection />
            <ReferenceChartsSection />
            <DocumentationBestPracticesSection />
          </div>
          
          <BS7671Module8Section2RealWorld />
          <BS7671Module8Section2Summary />
          <BS7671Module8Section2FAQ />
          
          <BS7671Module8Section2Quiz />
        </div>
      </div>
    </div>
  );
};

export default BS7671Module8Section2;