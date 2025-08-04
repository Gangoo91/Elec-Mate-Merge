import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, ArrowLeft, ArrowRight } from "lucide-react";
import { useSwipeable } from "react-swipeable";

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  isRequired?: boolean;
}

interface MobileOptimizedLayoutProps {
  sections: Section[];
  currentSectionIndex: number;
  onSectionChange: (index: number) => void;
}

const MobileOptimizedLayout: React.FC<MobileOptimizedLayoutProps> = ({
  sections,
  currentSectionIndex,
  onSectionChange,
}) => {
  const [openSections, setOpenSections] = useState<string[]>([sections[0]?.id]);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentSectionIndex < sections.length - 1) {
        onSectionChange(currentSectionIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (currentSectionIndex > 0) {
        onSectionChange(currentSectionIndex - 1);
      }
    },
    trackMouse: true,
  });

  // Mobile view (collapsible sections)
  const MobileView = () => (
    <div className="space-y-4 md:hidden">
      {sections.map((section, index) => (
        <Card key={section.id} className="border-elec-yellow/20 bg-elec-card">
          <Collapsible
            open={openSections.includes(section.id)}
            onOpenChange={() => toggleSection(section.id)}
          >
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-elec-yellow/5 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="text-elec-yellow">{section.icon}</div>
                    {section.title}
                    {section.isRequired && (
                      <span className="text-red-400 text-sm">*</span>
                    )}
                  </CardTitle>
                  {openSections.includes(section.id) ? (
                    <ChevronUp className="h-5 w-5 text-elec-yellow" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-elec-yellow" />
                  )}
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                {section.content}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  );

  // Desktop view (swipeable sections)
  const DesktopView = () => (
    <div className="hidden md:block">
      <div {...handlers} className="relative">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-6 p-4 bg-elec-card rounded-lg border border-elec-yellow/20">
          <div className="flex items-center gap-4">
            <div className="text-elec-yellow">{sections[currentSectionIndex]?.icon}</div>
            <h2 className="text-xl font-semibold">{sections[currentSectionIndex]?.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSectionChange(Math.max(0, currentSectionIndex - 1))}
              disabled={currentSectionIndex === 0}
              className="text-elec-yellow hover:bg-elec-yellow/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <div className="flex items-center gap-1 mx-4">
              {sections.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentSectionIndex
                      ? "bg-elec-yellow w-6"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSectionChange(Math.min(sections.length - 1, currentSectionIndex + 1))}
              disabled={currentSectionIndex === sections.length - 1}
              className="text-elec-yellow hover:bg-elec-yellow/10"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Current Section Content */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardContent className="p-6">
            {sections[currentSectionIndex]?.content}
          </CardContent>
        </Card>

        {/* Swipe Hint */}
        <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Swipe or use arrow keys to navigate sections
          <ArrowRight className="h-4 w-4 ml-2" />
        </div>
      </div>
    </div>
  );

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentSectionIndex > 0) {
        onSectionChange(currentSectionIndex - 1);
      } else if (e.key === "ArrowRight" && currentSectionIndex < sections.length - 1) {
        onSectionChange(currentSectionIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentSectionIndex, sections.length, onSectionChange]);

  return (
    <>
      <MobileView />
      <DesktopView />
    </>
  );
};

export default MobileOptimizedLayout;