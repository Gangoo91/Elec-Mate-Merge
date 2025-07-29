
import { useState } from "react";
import { Brain, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { toolOptions } from "@/components/electrician-tools/ai-tools/constants";
import AIAssistant from "@/components/electrician-tools/ai-tools/AIAssistant";
import VisualAnalysis from "@/components/electrician-tools/ai-tools/VisualAnalysis";
import ReportWriter from "@/components/electrician-tools/ai-tools/ReportWriter";
import RegulationsAssistant from "@/components/electrician-tools/ai-tools/RegulationsAssistant";
import CircuitDesigner from "@/components/electrician-tools/ai-tools/CircuitDesigner";

const AITooling = () => {
  const [activeTool, setActiveTool] = useState("assistant");

  const renderContent = () => {
    switch (activeTool) {
      case "assistant":
        return <AIAssistant />;
      case "visual":
        return <VisualAnalysis />;
      case "reports":
        return <ReportWriter />;
      case "regulations":
        return <RegulationsAssistant />;
      case "circuit":
        return <CircuitDesigner />;
      default:
        return <AIAssistant />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-elec-yellow/10 via-transparent to-elec-yellow/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,193,7,0.1),transparent_70%)]" />
        
        <div className="relative px-4 py-8 md:py-12">
          <div className="max-w-7xl mx-auto">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-8">
              <Link to="/electrician-tools">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Tools
                </Button>
              </Link>
              
              <div className="flex items-center gap-2 text-elec-yellow/60">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Powered by AI</span>
              </div>
            </div>

            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-elec-yellow to-yellow-400 rounded-2xl mb-6 shadow-lg shadow-elec-yellow/20">
                <Brain className="h-10 w-10 text-elec-dark" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-elec-yellow via-yellow-400 to-elec-yellow bg-clip-text text-transparent">
                  AI Tooling Suite
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-elec-light/80 max-w-2xl mx-auto leading-relaxed">
                Revolutionise your electrical work with intelligent AI assistants designed specifically for UK electricians and BS 7671 compliance.
              </p>
            </div>

            {/* Tool Selection */}
            <div className="mb-8">
              <DropdownTabs
                tabs={toolOptions.map(tool => ({
                  value: tool.value,
                  label: tool.label,
                  icon: tool.icon,
                  content: renderContent()
                }))}
                defaultValue={activeTool}
                onValueChange={setActiveTool}
                placeholder="Select an AI tool"
                className="max-w-4xl mx-auto"
                triggerClassName="w-full max-w-md mx-auto bg-elec-gray/50 backdrop-blur-sm border-elec-yellow/20 hover:border-elec-yellow/40 text-elec-light"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="animate-fade-in">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITooling;
