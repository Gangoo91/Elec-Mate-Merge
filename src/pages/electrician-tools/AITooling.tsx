
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Image, FileText, MessageSquare, Code, Book, Zap } from "lucide-react";
import AIToolingHeader from "@/components/electrician-tools/ai-tools/AIToolingHeader";
import AIAssistant from "@/components/electrician-tools/ai-tools/AIAssistant";
import VisualAnalysis from "@/components/electrician-tools/ai-tools/VisualAnalysis";
import ReportWriter from "@/components/electrician-tools/ai-tools/ReportWriter";
import RegulationsAssistant from "@/components/electrician-tools/ai-tools/RegulationsAssistant";
import CircuitDesigner from "@/components/electrician-tools/ai-tools/CircuitDesigner";

const AITooling = () => {
  const [activeTab, setActiveTab] = useState("assistant");

  return (
    <div className="space-y-6 animate-fade-in">
      <AIToolingHeader />

      <Tabs defaultValue="assistant" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid sm:grid-cols-3 lg:grid-cols-5 max-w-full overflow-x-auto">
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

        {/* AI Assistant Tab */}
        <TabsContent value="assistant">
          <AIAssistant />
        </TabsContent>

        {/* Visual Analysis Tab */}
        <TabsContent value="visual">
          <VisualAnalysis />
        </TabsContent>

        {/* Report Writer Tab */}
        <TabsContent value="reports">
          <ReportWriter />
        </TabsContent>

        {/* Regulations Tab */}
        <TabsContent value="regulations">
          <RegulationsAssistant />
        </TabsContent>

        {/* Circuit Design Tab */}
        <TabsContent value="circuit">
          <CircuitDesigner />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AITooling;
