
import React from 'react';
import { SmartTabs } from '@/components/ui/smart-tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, BookOpen, ArrowLeft } from 'lucide-react';
import WhyIsolateSection from './WhyIsolateSection';
import HowToIsolateSection from './HowToIsolateSection';
import PracticalGuidanceSection from './PracticalGuidanceSection';

interface SafeIsolationCardProps {
  onBack?: () => void;
}

const SafeIsolationCard = ({ onBack }: SafeIsolationCardProps) => {
  const smartTabs = [
    {
      value: "why-isolate",
      label: "Why Isolate?",
      icon: <AlertTriangle className="h-4 w-4" />,
      content: <WhyIsolateSection />
    },
    {
      value: "how-isolate",
      label: "How to Isolate",
      icon: <Shield className="h-4 w-4" />,
      content: <HowToIsolateSection />
    },
    {
      value: "practical",
      label: "Practical Guide",
      icon: <BookOpen className="h-4 w-4" />,
      content: <PracticalGuidanceSection />
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {onBack && (
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-4 border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black min-h-[44px] touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Back to Testing Procedures</span>
          <span className="sm:hidden">Back</span>
        </Button>
      )}
      
      <Card className="bg-gradient-to-br from-neutral-900 to-neutral-800 border-border">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6" />
            Enhanced Safe Isolation Procedure
          </CardTitle>
          <CardDescription className="text-white text-sm sm:text-base">
            Comprehensive guide to BS 7671 compliant safe isolation with practical implementation strategies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SmartTabs 
            tabs={smartTabs}
            defaultValue="why-isolate" 
            className="w-full"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SafeIsolationCard;
