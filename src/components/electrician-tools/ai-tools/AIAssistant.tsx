import { useState, useRef } from "react";
import { Sparkles, Loader, Search, BookOpen, Clock, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const AIAssistant = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [selectedMode, setSelectedMode] = useState<"quick" | "detailed">("quick");
  const streamRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(null);
  const startTimeRef = useRef<number>(0);

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
    setResponse("");
    setResponseTime(null);
    startTimeRef.current = Date.now();
    
    try {
      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant-stream', {
        body: { 
          prompt: prompt,
          mode: selectedMode
        },
      });

      if (error) {
        throw new Error(error.message || 'Error connecting to the AI assistant');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      // Handle the response
      if (data.content) {
        setResponse(data.content);
      } else if (data.response) {
        setResponse(data.response);
      } else {
        throw new Error("No valid response received from AI");
      }

      const endTime = Date.now();
      setResponseTime(endTime - startTimeRef.current);

      toast({
        title: "Search Complete",
        description: `Response received in ${((endTime - startTimeRef.current) / 1000).toFixed(1)}s`,
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

  const exampleQueries = [
    "RCD bathroom requirements",
    "Cable sizing formula", 
    "Testing sequence",
    "Zs values for MCBs",
    "Bonding conductor sizes",
    "IP rating requirements"
  ];

  const formatResponse = (text: string) => {
    if (!text) return [];
    
    const lines = text.split('\n');
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      
      // Headers and important sections
      if (trimmedLine.match(/^(CALCULATION|SIZING|ASSESSMENT|ANALYSIS|RECOMMENDATION|Formula|Requirements?):/i)) {
        return (
          <div key={index} className="text-white font-bold text-base sm:text-lg mt-4 mb-2 border-b border-elec-yellow/30 pb-1">
            {trimmedLine}
          </div>
        );
      }
      
      // Regulation references
      if (trimmedLine.match(/^(Regulation|BS 7671|IET|Section)/i) || trimmedLine.match(/^\d{3}\.\d/)) {
        return (
          <div key={index} className="text-elec-yellow font-semibold text-sm sm:text-base mt-3 mb-1">
            {trimmedLine}
          </div>
        );
      }
      
      // Numbered steps
      if (trimmedLine.match(/^\d+\./)) {
        return (
          <div key={index} className="text-white font-medium text-sm sm:text-base mt-2 mb-1">
            {trimmedLine}
          </div>
        );
      }
      
      // Bullet points
      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
        return (
          <div key={index} className="text-gray-200 ml-4 text-sm sm:text-base my-1">
            {trimmedLine}
          </div>
        );
      }
      
      // Empty lines
      if (trimmedLine === '') {
        return <div key={index} className="my-2"></div>;
      }
      
      // Regular text
      return (
        <div key={index} className="text-gray-100 text-sm sm:text-base leading-relaxed my-1">
          {trimmedLine}
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <div className="max-w-4xl mx-auto p-3 sm:p-6 space-y-4">
        {/* Hero Section */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/30 rounded-2xl border border-elec-yellow/30">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />
          </div>
          <h1 className="text-xl sm:text-3xl font-bold text-white">
            AI Assistant
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Get instant answers about BS7671 electrical regulations
          </p>
        </div>

        {/* Search Interface */}
        <Card className="bg-elec-gray border border-elec-yellow/30">
          <CardHeader className="p-4 sm:p-6 pb-2">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-lg text-white">Ask a Question</CardTitle>
              </div>
              {responseTime && (
                <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {(responseTime / 1000).toFixed(1)}s
                </Badge>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
            {/* Mode Selection */}
            <div className="flex gap-2">
              <Button
                variant={selectedMode === "quick" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMode("quick")}
                className={selectedMode === "quick" 
                  ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 flex-1" 
                  : "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 flex-1"
                }
              >
                <Zap className="h-4 w-4 mr-1" />
                Quick
              </Button>
              <Button
                variant={selectedMode === "detailed" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMode("detailed")}
                className={selectedMode === "detailed" 
                  ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 flex-1" 
                  : "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 flex-1"
                }
              >
                <BookOpen className="h-4 w-4 mr-1" />
                Full
              </Button>
            </div>

            {/* Input Area */}
            <div className="space-y-3">
              <Textarea
                placeholder="e.g. 'What are the RCD requirements for bathrooms?' or 'How do I calculate cable sizing?'"
                className="min-h-[80px] bg-elec-dark border-elec-yellow/30 focus:border-elec-yellow text-white placeholder:text-gray-400 resize-none text-sm sm:text-base"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              
              <Button 
                className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-medium py-3 h-12" 
                onClick={handleAIQuery} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="h-5 w-5 mr-2 animate-spin" /> 
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Get Answer
                  </>
                )}
              </Button>
            </div>

            {/* Quick Examples */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-300 text-sm">Try these:</h4>
              <div className="grid grid-cols-2 gap-2">
                {exampleQueries.map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="border-elec-yellow/20 text-gray-300 hover:bg-elec-yellow/10 hover:border-elec-yellow/40 h-auto py-2 px-3 text-left justify-start text-xs leading-tight"
                    onClick={() => setPrompt(query)}
                  >
                    <span className="truncate">{query}</span>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <Card className="bg-elec-gray border border-elec-yellow/30">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-elec-yellow animate-pulse" />
                </div>
                <span className="text-white font-medium">AI is thinking...</span>
              </div>
              <div className="space-y-3">
                <div className="h-3 w-full bg-elec-yellow/20 rounded animate-pulse"></div>
                <div className="h-3 w-3/4 bg-elec-yellow/20 rounded animate-pulse"></div>
                <div className="h-3 w-5/6 bg-elec-yellow/20 rounded animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Response */}
        {response && !isLoading && (
          <Card className="bg-elec-gray border border-elec-yellow/30">
            <CardHeader className="p-4 sm:p-6 pb-3">
              <CardTitle className="text-lg flex items-center gap-3 text-white">
                <div className="w-8 h-8 bg-elec-yellow/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-elec-yellow" />
                </div>
                Answer
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="bg-elec-dark rounded-lg p-4 sm:p-6 border border-elec-yellow/20">
                <div className="space-y-2">
                  {formatResponse(response)}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
          <Card className="bg-elec-gray border border-elec-yellow/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-elec-yellow/20 rounded-lg flex items-center justify-center">
                  <Zap className="h-4 w-4 text-elec-yellow" />
                </div>
                <h3 className="font-semibold text-white">Instant Results</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Get immediate answers to electrical regulation questions using advanced AI.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-elec-gray border border-elec-yellow/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-elec-yellow/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-elec-yellow" />
                </div>
                <h3 className="font-semibold text-white">BS 7671 18th Edition</h3>
              </div>
              <p className="text-gray-300 text-sm">
                All responses based on the latest wiring regulations and best practices.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;