
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, Image, FileText, MessageSquare, Code, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

const AITooling = () => {
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
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

      {/* AI Assistant Interface */}
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

      <h2 className="text-2xl font-semibold mt-4">Specialised AI Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Image className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Visual Fault Analyser</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Upload an image of electrical components to identify potential faults and solutions.
            </p>
            <Button variant="outline" className="w-full">Open Tool</Button>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Report Writer</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              AI-powered tool to generate professional electrical inspection reports in minutes.
            </p>
            <Button variant="outline" className="w-full">Create Report</Button>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Regulations Assistant</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Get instant answers to BS 7671 regulation questions with context-aware AI.
            </p>
            <Button variant="outline" className="w-full">Ask About Regulations</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-elec-yellow" />
            Circuit Design Adviser
          </CardTitle>
          <CardDescription>
            AI-powered assistant for electrical circuit design
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Describe your electrical circuit requirements in plain English, and our AI will suggest the optimal design, 
            including component specifications, safety measures, and efficiency considerations.
          </p>
          <div className="bg-elec-dark p-4 rounded-md">
            <p className="text-muted-foreground text-sm italic">
              "I'm designing a lighting circuit for a three-bedroom house with LED downlights throughout. 
              I need to include emergency lighting in the hallways."
            </p>
            <div className="mt-4 border-t border-elec-yellow/20 pt-4">
              <p className="text-sm font-medium">AI would provide:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Circuit layout recommendations</li>
                <li>Cable specifications and load calculations</li>
                <li>Emergency lighting compliance details</li>
                <li>Material quantities estimate</li>
              </ul>
            </div>
          </div>
          <Button className="w-full mt-4">Try Circuit Design Adviser</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AITooling;
