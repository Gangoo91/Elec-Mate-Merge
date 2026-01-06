import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EmergencyLightingIntroSection6_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingIntroSection6_4';
import { EmergencyLightingLearningOutcomesSection6_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingLearningOutcomesSection6_4';
import { EmergencyLightingTechnicalSection6_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingTechnicalSection6_4';
import { EmergencyLightingPracticalSection6_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingPracticalSection6_4';
import { EmergencyLightingRealWorldSection6_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingRealWorldSection6_4';
import { EmergencyLightingFAQSection6_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingFAQSection6_4';
import { EmergencyLightingSummary6_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingSummary6_4';
import { DocumentationAuditsQuiz } from '@/components/upskilling/emergency-lighting/DocumentationAuditsQuiz';

const EmergencyLightingModule6Section4 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Section 4: Documentation for Audits and Fire Authorities | Module 6 | Emergency Lighting Course';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Learn the critical documentation requirements for emergency lighting audits and Fire Authority inspections. Understand BS 5266-1 record-keeping obligations, common audit failures, and compliance best practices under UK fire safety regulations.'
      );
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', window.location.href);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/emergency-lighting-module-6')}
          className="mb-6 border-elec-yellow text-white hover:bg-elec-yellow hover:text-black"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Module 6
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Section 4: Documentation for Audits and Fire Authorities
          </h1>
          <p className="text-xl text-white mb-4">
            Understanding documentation requirements, audit expectations, and maintaining compliance records
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-elec-yellow/10 text-elec-yellow rounded-full text-sm font-medium border border-elec-yellow/30">
              Module 6
            </span>
            <span className="px-3 py-1 bg-elec-yellow/20 text-elec-yellow rounded-full text-sm font-medium border border-blue-600/30">
              30 minutes
            </span>
          </div>
        </div>

        <div className="space-y-8">
          <EmergencyLightingIntroSection6_4 />
          <EmergencyLightingLearningOutcomesSection6_4 />
          <EmergencyLightingTechnicalSection6_4 />
          <EmergencyLightingPracticalSection6_4 />
          <EmergencyLightingRealWorldSection6_4 />
          <EmergencyLightingFAQSection6_4 />
          <EmergencyLightingSummary6_4 />
          <DocumentationAuditsQuiz />
        </div>

        <div className="flex justify-between mt-12">
          <Button 
            variant="outline" 
            onClick={() => navigate('/emergency-lighting-module-6-section-3')}
            className="border-gray-600 text-white hover:bg-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous Section
          </Button>
          
          <Button 
            onClick={() => navigate('/emergency-lighting-module-6')}
            className="bg-elec-yellow text-black hover:bg-yellow-600"
          >
            Complete Module 6
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyLightingModule6Section4;
