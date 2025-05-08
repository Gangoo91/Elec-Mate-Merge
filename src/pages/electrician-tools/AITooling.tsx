
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, Image, FileText, MessageSquare, Code, Loader, Zap, Lightbulb, Book } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AITooling = () => {
  const [activeTab, setActiveTab] = useState("assistant");
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imagePrompt, setImagePrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [reportType, setReportType] = useState("eicr");
  const [reportPrompt, setReportPrompt] = useState("");
  const [isReportLoading, setIsReportLoading] = useState(false);
  const [reportOutput, setReportOutput] = useState("");
  const [regulationQuery, setRegulationQuery] = useState("");
  const [isRegulationLoading, setIsRegulationLoading] = useState(false);
  const [regulationResponse, setRegulationResponse] = useState("");
  const [circuitPrompt, setCircuitPrompt] = useState("");
  const [isCircuitLoading, setIsCircuitLoading] = useState(false);
  const [circuitResponse, setCircuitResponse] = useState("");
  
  const handleAIQuery = async () => {
    if (prompt.trim() === "") {
      toast({
        title: "Empty Query",
        description: "Please enter a question or description first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setAiResponse("");
    
    try {
      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant', {
        body: { prompt: prompt },
      });
      
      if (error) {
        throw new Error(error.message || 'Error connecting to the AI assistant');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setAiResponse(data.response);
      
      toast({
        title: "Response Generated",
        description: "AI has provided an answer to your query.",
      });
    } catch (error) {
      console.error('AI Query Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response from AI assistant",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageGeneration = async () => {
    if (imagePrompt.trim() === "") {
      toast({
        title: "Empty Prompt",
        description: "Please enter an image description first.",
        variant: "destructive",
      });
      return;
    }

    setIsImageLoading(true);
    setGeneratedImage("");

    try {
      // Simulate image generation (in a real implementation, this would call an edge function)
      setTimeout(() => {
        // This is a placeholder. In production, you would call a real image generation API
        setGeneratedImage("https://placehold.co/600x400/EAEAEA/31304D?text=Generated+Image+Based+On+Prompt");
        
        toast({
          title: "Image Generated",
          description: "AI has created an image based on your description.",
        });
        setIsImageLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Image Generation Error:', error);
      toast({
        title: "Error",
        description: "Failed to generate image",
        variant: "destructive",
      });
      setIsImageLoading(false);
    }
  };

  const handleReportGeneration = async () => {
    if (reportPrompt.trim() === "") {
      toast({
        title: "Incomplete Information",
        description: "Please provide details for the report.",
        variant: "destructive",
      });
      return;
    }

    setIsReportLoading(true);
    setReportOutput("");

    try {
      // In a real implementation, this would call an edge function to generate the report
      const response = await generateReport(reportType, reportPrompt);
      setReportOutput(response);
      
      toast({
        title: "Report Generated",
        description: `Your ${reportType.toUpperCase()} report has been created.`,
      });
    } catch (error) {
      console.error('Report Generation Error:', error);
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive",
      });
    } finally {
      setIsReportLoading(false);
    }
  };

  // This function simulates report generation - in production this would call an AI API
  const generateReport = async (type: string, details: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const reports: Record<string, string> = {
          eicr: `# Electrical Installation Condition Report\n\nBased on the details provided, I've generated the following EICR:\n\n## Property Details\n- Address: ${details.includes("address") ? details.split("address:")[1]?.split("\n")[0] || "Not specified" : "Not specified"}\n\n## Assessment\nThe electrical installation has been assessed and appears to be in ${details.includes("poor") ? "UNSATISFACTORY" : "SATISFACTORY"} condition.\n\n## Recommendations\n1. Next inspection recommended: 5 years\n2. ${details.includes("poor") ? "Immediate remedial action is required for circuits C1-C3" : "No immediate remedial work is required"}\n\n## Declaration\nI certify that this document represents an accurate assessment of the condition of the electrical installation based on the information provided.`,
          minorworks: `# Minor Electrical Works Certificate\n\nBased on the details provided, I've generated the following certificate:\n\n## Work Details\n- Description: ${details.split("\n")[0] || "Electrical modifications"}\n- Date of work: ${new Date().toLocaleDateString()}\n\n## Declaration\nThe electrical work described above has been designed, constructed, inspected and tested in accordance with BS 7671:2018 (18th Edition of the IEE Wiring Regulations).\n\n## Results\nAll appropriate tests have been carried out and the results confirm that the modified circuit meets the requirements of BS 7671:2018.`,
          nic: `# NIC EIC Certificate\n\nBased on the details provided, I've generated the following NIC EIC certificate:\n\n## Installation Details\n- Description: ${details.split("\n")[0] || "New electrical installation"}\n- Address: ${details.includes("address") ? details.split("address:")[1]?.split("\n")[0] || "Not specified" : "Not specified"}\n\n## Tests Conducted\n- Continuity of protective conductors: PASS\n- Insulation resistance: PASS\n- Earth fault loop impedance: PASS\n- Operation of RCDs: PASS\n\n## Declaration\nI certify that the electrical installation work described above has been designed, constructed, inspected and tested in accordance with BS 7671:2018 and no defects were identified.`
        };
        
        resolve(reports[type] || "Report could not be generated with the given information.");
      }, 2000);
    });
  };

  const handleRegulationQuery = async () => {
    if (regulationQuery.trim() === "") {
      toast({
        title: "Empty Query",
        description: "Please enter a regulation question first.",
        variant: "destructive",
      });
      return;
    }

    setIsRegulationLoading(true);
    setRegulationResponse("");

    try {
      // In a real implementation, this would call the electrician-ai-assistant with a focused prompt
      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant', {
        body: { 
          prompt: `I need specific information about UK electrical regulations (BS 7671) regarding: ${regulationQuery}. Please provide the exact regulation references and explain the requirements in detail.` 
        },
      });
      
      if (error) {
        throw new Error(error.message || 'Error connecting to the AI assistant');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setRegulationResponse(data.response);
      
      toast({
        title: "Regulations Information Retrieved",
        description: "AI has provided regulation details for your query.",
      });
    } catch (error) {
      console.error('Regulation Query Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get regulation information",
        variant: "destructive",
      });
    } finally {
      setIsRegulationLoading(false);
    }
  };

  const handleCircuitDesign = async () => {
    if (circuitPrompt.trim() === "") {
      toast({
        title: "Empty Description",
        description: "Please enter circuit requirements first.",
        variant: "destructive",
      });
      return;
    }

    setIsCircuitLoading(true);
    setCircuitResponse("");

    try {
      // In a real implementation, this would call the electrician-ai-assistant with a specialized prompt
      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant', {
        body: { 
          prompt: `I need to design an electrical circuit based on these requirements: ${circuitPrompt}. Please provide a detailed circuit design including cable specifications, protective devices, load calculations, and any relevant diagrams or schematics. The design should comply with UK regulations BS 7671.` 
        },
      });
      
      if (error) {
        throw new Error(error.message || 'Error connecting to the AI assistant');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setCircuitResponse(data.response);
      
      toast({
        title: "Circuit Design Generated",
        description: "AI has provided a circuit design based on your requirements.",
      });
    } catch (error) {
      console.error('Circuit Design Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate circuit design",
        variant: "destructive",
      });
    } finally {
      setIsCircuitLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Tooling</h1>
          <p className="text-muted-foreground">
            Advanced AI tools to enhance your electrical work efficiency and accuracy.
          </p>
        </div>
        <Link to="/electrician-tools">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Tools
          </Button>
        </Link>
      </div>

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
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Brain className="h-5 w-5 text-elec-yellow" />
                ElectricalMate AI Assistant
              </CardTitle>
              <CardDescription>
                Your personal AI assistant for electrical queries and advice based on UK standards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Ask about UK regulations, installation best practices, troubleshooting, or get help with calculations.
              </p>
              
              <Textarea
                placeholder="e.g., What's the recommended cable size for a 32A circuit with 25m run length according to BS 7671?"
                className="min-h-[100px]"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              
              <Button 
                className="w-full" 
                onClick={handleAIQuery} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" /> 
                    Generating Response...
                  </>
                ) : (
                  'Generate Response'
                )}
              </Button>

              {aiResponse && (
                <div className="mt-6 p-4 bg-elec-dark rounded-md">
                  <h3 className="text-lg font-semibold mb-2 text-elec-yellow">AI Response:</h3>
                  <div className="text-sm whitespace-pre-wrap">
                    {aiResponse.split('\n').map((line, index) => (
                      <p key={index} className={line.startsWith('#') ? 'text-elec-yellow font-semibold mt-3' : 'my-2'}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Visual Analysis Tab */}
        <TabsContent value="visual">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Image className="h-5 w-5 text-elec-yellow" />
                Visual Fault Analyser
              </CardTitle>
              <CardDescription>
                Upload or describe an electrical component to identify potential faults
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Describe the electrical component or system you want to analyze. Our AI will generate a visual representation and identify potential issues.
              </p>
              
              <Textarea
                placeholder="e.g., A consumer unit with signs of overheating on the main switch and discoloration on several breakers"
                className="min-h-[100px]"
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
              />
              
              <Button 
                className="w-full" 
                onClick={handleImageGeneration} 
                disabled={isImageLoading}
              >
                {isImageLoading ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" /> 
                    Generating Image...
                  </>
                ) : (
                  'Generate Visual Analysis'
                )}
              </Button>

              {generatedImage && (
                <div className="mt-6 p-4 bg-elec-dark rounded-md">
                  <h3 className="text-lg font-semibold mb-2 text-elec-yellow">Analysis Result:</h3>
                  <div className="flex flex-col items-center">
                    <img 
                      src={generatedImage} 
                      alt="AI-generated visual analysis" 
                      className="max-w-full h-auto rounded-md mt-2 mb-4"
                    />
                    <div className="text-sm text-muted-foreground p-3 bg-elec-gray rounded-md w-full">
                      <p className="font-semibold text-elec-yellow mb-2">Identified Issues:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Signs of thermal damage on the main switch indicating potential loose connection</li>
                        <li>Discoloration on MCB terminals suggests overloading or poor connection</li>
                        <li>RCD shows no visible damage but testing is recommended</li>
                      </ul>
                      <p className="font-semibold text-elec-yellow mt-4 mb-2">Recommendations:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Immediate inspection of the main switch and replacement if necessary</li>
                        <li>Check and tighten all connections in the consumer unit</li>
                        <li>Perform load testing on circuits with discolored MCBs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Report Writer Tab */}
        <TabsContent value="reports">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <FileText className="h-5 w-5 text-elec-yellow" />
                Report Writer
              </CardTitle>
              <CardDescription>
                AI-powered tool to generate professional electrical reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3 mb-4">
                <Button 
                  variant={reportType === "eicr" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setReportType("eicr")}
                  className="flex-grow md:flex-grow-0"
                >
                  EICR
                </Button>
                <Button 
                  variant={reportType === "minorworks" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setReportType("minorworks")}
                  className="flex-grow md:flex-grow-0"
                >
                  Minor Works
                </Button>
                <Button 
                  variant={reportType === "nic" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setReportType("nic")}
                  className="flex-grow md:flex-grow-0"
                >
                  NIC EIC
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Enter the details for your {reportType === "eicr" ? "Electrical Installation Condition Report" : 
                  reportType === "minorworks" ? "Minor Electrical Works Certificate" : "NIC EIC Certificate"}
              </p>
              
              <Textarea
                placeholder={`e.g., ${
                  reportType === "eicr" ? "Domestic property inspection at address: 123 Main Street. Installation appears in good condition with no visible defects." : 
                  reportType === "minorworks" ? "Replaced socket outlet in kitchen. All tests completed successfully." : 
                  "New consumer unit installation at address: 123 Main Street."
                }`}
                className="min-h-[100px]"
                value={reportPrompt}
                onChange={(e) => setReportPrompt(e.target.value)}
              />
              
              <Button 
                className="w-full" 
                onClick={handleReportGeneration} 
                disabled={isReportLoading}
              >
                {isReportLoading ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" /> 
                    Generating Report...
                  </>
                ) : (
                  `Generate ${reportType.toUpperCase()} Report`
                )}
              </Button>

              {reportOutput && (
                <div className="mt-6 p-4 bg-elec-dark rounded-md">
                  <h3 className="text-lg font-semibold mb-2 text-elec-yellow">Generated Report:</h3>
                  <div className="text-sm whitespace-pre-wrap">
                    {reportOutput.split('\n').map((line, index) => (
                      <p key={index} className={line.startsWith('#') || line.startsWith('##') ? 'text-elec-yellow font-semibold mt-3' : 'my-2'}>
                        {line}
                      </p>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Download as PDF
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Regulations Tab */}
        <TabsContent value="regulations">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Book className="h-5 w-5 text-elec-yellow" />
                Regulations Assistant
              </CardTitle>
              <CardDescription>
                Get instant answers to BS 7671 regulation questions with context-aware AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Enter your question about UK electrical regulations and standards to get precise answers with regulation references.
              </p>
              
              <Textarea
                placeholder="e.g., What are the requirements for bathroom zones and IP ratings for electrical equipment in each zone?"
                className="min-h-[100px]"
                value={regulationQuery}
                onChange={(e) => setRegulationQuery(e.target.value)}
              />
              
              <Button 
                className="w-full" 
                onClick={handleRegulationQuery} 
                disabled={isRegulationLoading}
              >
                {isRegulationLoading ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" /> 
                    Searching Regulations...
                  </>
                ) : (
                  'Get Regulation Information'
                )}
              </Button>

              {regulationResponse && (
                <div className="mt-6 p-4 bg-elec-dark rounded-md">
                  <h3 className="text-lg font-semibold mb-2 text-elec-yellow">Regulations Information:</h3>
                  <div className="text-sm whitespace-pre-wrap">
                    {regulationResponse.split('\n').map((line, index) => (
                      <p key={index} className={line.startsWith('#') ? 'text-elec-yellow font-semibold mt-3' : 'my-2'}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Circuit Design Tab */}
        <TabsContent value="circuit">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Zap className="h-5 w-5 text-elec-yellow" />
                Circuit Design Adviser
              </CardTitle>
              <CardDescription>
                AI-powered assistant for electrical circuit design
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Describe your electrical circuit requirements in plain English, and our AI will suggest the optimal design, 
                including component specifications, safety measures, and efficiency considerations.
              </p>
              
              <Textarea
                placeholder="e.g., I'm designing a lighting circuit for a three-bedroom house with LED downlights throughout. I need to include emergency lighting in the hallways."
                className="min-h-[100px]"
                value={circuitPrompt}
                onChange={(e) => setCircuitPrompt(e.target.value)}
              />
              
              <Button 
                className="w-full" 
                onClick={handleCircuitDesign} 
                disabled={isCircuitLoading}
              >
                {isCircuitLoading ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" /> 
                    Designing Circuit...
                  </>
                ) : (
                  'Generate Circuit Design'
                )}
              </Button>

              {circuitResponse && (
                <div className="mt-6 p-4 bg-elec-dark rounded-md">
                  <h3 className="text-lg font-semibold mb-2 text-elec-yellow">Circuit Design:</h3>
                  <div className="text-sm whitespace-pre-wrap">
                    {circuitResponse.split('\n').map((line, index) => (
                      <p key={index} className={line.startsWith('#') ? 'text-elec-yellow font-semibold mt-3' : 'my-2'}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AITooling;
