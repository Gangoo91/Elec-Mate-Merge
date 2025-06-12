
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Image, FileText, Book, Zap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AIAssistant from "@/components/electrician-tools/ai-tools/AIAssistant";
import VisualAnalysis from "@/components/electrician-tools/ai-tools/VisualAnalysis";
import ReportWriter from "@/components/electrician-tools/ai-tools/ReportWriter";
import RegulationsAssistant from "@/components/electrician-tools/ai-tools/RegulationsAssistant";
import CircuitDesigner from "@/components/electrician-tools/ai-tools/CircuitDesigner";

const AITooling = () => {
  const [activeTab, setActiveTab] = useState("assistant");

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

      <Tabs defaultValue="assistant" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="assistant" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">AI Assistant</span>
            <span className="inline sm:hidden">Assistant</span>
          </TabsTrigger>
          <TabsTrigger value="visual" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            <span className="hidden sm:inline">Visual Analysis</span>
            <span className="inline sm:hidden">Visual</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Report Writer</span>
            <span className="inline sm:hidden">Reports</span>
          </TabsTrigger>
          <TabsTrigger value="regulations" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span className="hidden sm:inline">Regulations</span>
            <span className="inline sm:hidden">Regs</span>
          </TabsTrigger>
          <TabsTrigger value="circuit" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Circuit Design</span>
            <span className="inline sm:hidden">Circuits</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assistant">
          <AIAssistant />
        </TabsContent>

        <TabsContent value="visual">
          <VisualAnalysis />
        </TabsContent>

        <TabsContent value="reports">
          <ReportWriter />
        </TabsContent>

        <TabsContent value="regulations">
          <RegulationsAssistant />
        </TabsContent>

        <TabsContent value="circuit">
          <CircuitDesigner />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AITooling;
