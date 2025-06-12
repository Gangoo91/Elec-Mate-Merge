
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Image, FileText, Book, Zap, Bot, ArrowLeft } from "lucide-react";
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
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Link to="/electrician-tools" className="flex-shrink-0">
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
              Advanced AI-powered tools to enhance your electrical work efficiency and accuracy with UK standards compliance
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-elec-yellow/20 to-orange-500/20 px-4 py-2 rounded-lg border border-elec-yellow/30">
          <Bot className="h-4 w-4 text-elec-yellow" />
          <span className="text-sm font-semibold text-elec-yellow">AI Enhanced</span>
        </div>
      </div>

      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-orange-500/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Professional AI Tools</CardTitle>
          <p className="text-muted-foreground">
            Leverage cutting-edge artificial intelligence to streamline your electrical work, ensure compliance, 
            and enhance professional efficiency across all project types.
          </p>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Professional AI Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            These AI tools are designed to complement your professional expertise and enhance productivity. 
            Always verify AI-generated recommendations against current UK electrical standards (BS 7671, Part P) 
            and use your professional judgement when implementing suggestions. These tools support, but do not replace, 
            qualified electrical work and certification requirements.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AITooling;
