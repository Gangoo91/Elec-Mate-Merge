
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Image, FileText, Book, Zap, ArrowLeft, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">AI Tooling</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Advanced AI tools to enhance your electrical work efficiency and accuracy with UK standards compliance
        </p>
        <Link to="/electrician-tools">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Electrician Tools
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="assistant" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
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

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            AI Tools Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            These AI tools are designed to complement your professional expertise, not replace it. 
            Always verify AI-generated recommendations against current UK electrical standards and 
            use your professional judgement when implementing suggestions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AITooling;
