
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ShieldAlert, Info, CheckCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/common/BackButton";
import { electricalSafetySection } from "@/data/healthAndSafety/section3-electrical";

const SafetyFundamentals = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  
  const handleCardClick = (cardId: string) => {
    setActiveCard(activeCard === cardId ? null : cardId);
  };
  
  // Extract safety content from the data
  const { subsections } = electricalSafetySection.content;

  // Icons mapping for safety cards
  const getIconForCard = (index: number) => {
    switch (index) {
      case 0: return <ShieldAlert className="h-8 w-8 text-red-500" />;
      case 1: return <AlertTriangle className="h-8 w-8 text-amber-500" />;
      case 2: return <Info className="h-8 w-8 text-blue-500" />;
      default: return <HelpCircle className="h-8 w-8 text-elec-yellow" />;
    }
  };

  return (
    <div className="flex flex-col flex-1 animate-fade-in">
      <div className="px-4 py-3 bg-elec-dark/80 border-b border-elec-yellow/20">
        <h1 className="text-lg font-semibold text-elec-yellow">
          Electrical Safety Tips
        </h1>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto py-4 px-4 md:px-8">
          <BackButton />
          
          <div className="mt-6">
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-elec-yellow">Essential Safety Information</h2>
              <p className="text-elec-light/80 mt-2">
                Electrical safety is crucial for preventing accidents and ensuring personal wellbeing. 
                Review these important safety guidelines for working with electrical systems.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {subsections.map((section, index) => (
                <Card 
                  key={section.id}
                  className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all cursor-pointer shadow-lg shadow-black/20"
                  onClick={() => handleCardClick(section.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-elec-dark/50 flex items-center justify-center border border-elec-yellow/30">
                        {getIconForCard(index)}
                      </div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-elec-light/80 line-clamp-2">
                      {section.content.split('.')[0]}...
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {activeCard && subsections.find(s => s.id === activeCard) && (
              <Card className="border-elec-yellow/30 bg-elec-gray/90 mb-6">
                <CardHeader>
                  <CardTitle className="text-elec-yellow">
                    {subsections.find(s => s.id === activeCard)?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-elec-light/90">
                    {subsections.find(s => s.id === activeCard)?.content}
                  </p>
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-elec-yellow mb-2">Key Safety Points:</h4>
                    <ul className="space-y-2">
                      {subsections.find(s => s.id === activeCard)?.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-elec-light/80">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button 
                      variant="outline" 
                      className="border-elec-yellow/30 hover:bg-elec-yellow/10"
                      onClick={() => setActiveCard(null)}
                    >
                      Close
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-4 mt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-elec-yellow mb-1">Remember</h3>
                  <p className="text-elec-light/80 text-sm">
                    Always follow the essential steps of safe isolation: Identify, Isolate, Prove the tester, 
                    Test dead, Reprove the tester, Lock off and tag, Issue permit. Never compromise on safety procedures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyFundamentals;
