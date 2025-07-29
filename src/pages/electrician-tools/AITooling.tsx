
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Image, FileText, Book, Zap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AIAssistant from "@/components/electrician-tools/ai-tools/AIAssistant";
import VisualAnalysis from "@/components/electrician-tools/ai-tools/VisualAnalysis";
import ReportWriter from "@/components/electrician-tools/ai-tools/ReportWriter";
import RegulationsAssistant from "@/components/electrician-tools/ai-tools/RegulationsAssistant";
import CircuitDesigner from "@/components/electrician-tools/ai-tools/CircuitDesigner";

const AITooling = () => {
  const [activeTool, setActiveTool] = useState("assistant");

  const toolOptions = [
    { value: "assistant", label: "AI Assistant", icon: Brain },
    { value: "visual", label: "Visual Analysis", icon: Image },
    { value: "reports", label: "Report Writer", icon: FileText },
    { value: "regulations", label: "Regulations", icon: Book },
    { value: "circuit", label: "Circuit Design", icon: Zap }
  ];

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
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/electrician-tools">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Brain className="h-8 w-8 text-elec-yellow" />
            AI Tooling Suite
          </h1>
          <p className="text-muted-foreground mt-1">
            AI-powered tools for electrical work efficiency
          </p>
        </div>
      </div>

      {/* AI Tool Selector Dropdown */}
      <div className="mb-6">
        <Select value={activeTool} onValueChange={setActiveTool}>
          <SelectTrigger className="w-full max-w-md mx-auto bg-background/80 backdrop-blur-sm border-elec-yellow/20">
            <div className="flex items-center gap-3">
              {(() => {
                const currentTool = toolOptions.find(tool => tool.value === activeTool);
                const IconComponent = currentTool?.icon || Brain;
                return (
                  <>
                    <IconComponent className="h-4 w-4 text-elec-yellow" />
                    <SelectValue placeholder="Select an AI tool" />
                  </>
                );
              })()}
            </div>
          </SelectTrigger>
          <SelectContent className="bg-background/95 backdrop-blur-sm border-elec-yellow/20 z-50">
            {toolOptions.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <SelectItem key={tool.value} value={tool.value} className="cursor-pointer">
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-4 w-4" />
                    <span>{tool.label}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Content Area */}
      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default AITooling;
