import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { CableShieldingLearningOutcomes } from '@/components/upskilling/CableShieldingLearningOutcomes';
import { CableShieldingIntro } from '@/components/upskilling/CableShieldingIntro';
import { CableShieldingContent } from '@/components/upskilling/CableShieldingContent';
import { CableShieldingScenario } from '@/components/upskilling/CableShieldingScenario';
import { CableShieldingTakeaways } from '@/components/upskilling/CableShieldingTakeaways';
import { DataCablingFAQs } from '@/components/upskilling/DataCablingFAQs';
import { Quiz } from '@/components/upskilling/Quiz';
import { dataCablingModule2Section2QuizData } from '@/data/upskilling/dataCablingModule2Section2QuizData';

const DataCablingModule2Section2 = () => {
  const faqs = [
    {
      question: "How do I know if I need shielded cables in my environment?",
      answer: "Conduct an EMI assessment. Look for electrical equipment like motors, VFDs, welding machines, or heavy machinery. If you can hear electrical humming, see fluorescent lights flickering, or have experienced network issues near electrical equipment, consider shielded cables. A simple EMI meter can help quantify interference levels."
    },
    {
      question: "Can I use FTP cable with standard unshielded patch panels?",
      answer: "No, this breaks the shield continuity and negates the EMI protection. All components in the channel must be shielded - cables, connectors, patch panels, and outlets. The shield must be continuous from end to end with proper termination."
    },
    {
      question: "What's the difference between F/UTP and S/FTP cable designations?",
      answer: "F/UTP means foiled/unshielded twisted pair (overall foil shield only). S/FTP means screened/foiled twisted pair (individual pair shields plus overall screen). The format is (overall shield)/(pair shield)TP, where F=foil, S=braid screen, U=unshielded."
    },
    {
      question: "Why do shielded cables cost more to install?",
      answer: "Beyond higher cable costs, shielded installations require: specialised shielded connectors and panels, expert installation knowledge, comprehensive grounding infrastructure, more complex testing procedures, and often additional metallic conduit protection. The labour component significantly increases total cost."
    },
    {
      question: "Can I retrofit shielding to an existing UTP installation?",
      answer: "No, you cannot add shielding to existing UTP cables. However, you can selectively upgrade problem areas to shielded cables whilst keeping UTP in clean environments. This hybrid approach can be cost-effective when properly planned and implemented."
    }
  ];

  const title = "UTP, FTP, STP Explained | Data Cabling Shielding";
  const description = "Learn differences and installation of UTP, FTP, and STP shielding types, grounding, and EMI mitigation.";
  useEffect(() => {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    } else {
      const m = document.createElement('meta');
      m.name = 'description';
      m.content = description;
      document.head.appendChild(m);
    }
    const existingCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const href = window.location.origin + "/data-cabling-module-2-section-2";
    if (existingCanonical) {
      existingCanonical.href = href;
    } else {
      const l = document.createElement('link');
      l.rel = 'canonical';
      l.href = href;
      document.head.appendChild(l);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../data-cabling-module-2">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>

        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-yellow-400" />
            <Badge variant="secondary" className="bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/10 font-semibold">
              Section 2
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            UTP, FTP, and STP Explained
          </h1>
          <p className="text-base text-gray-400 max-w-3xl">
            Different cable shielding types and applications
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="space-y-4 sm:space-y-6">
          {/* Content sections */}
          <CableShieldingIntro />
          <CableShieldingLearningOutcomes />
          <CableShieldingContent />
          <CableShieldingScenario />
          <CableShieldingTakeaways />
          <DataCablingFAQs faqs={faqs} />
          <Quiz 
            questions={dataCablingModule2Section2QuizData}
            title="Cable Shielding Knowledge Check"
            description="Test your understanding of UTP, FTP, and STP cable types and applications"
          />

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <Link to="../data-cabling-module-2-section-1">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card/80">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../data-cabling-module-2-section-3">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataCablingModule2Section2;