import { useState } from "react";
import { Zap, Loader, Copy, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

const CircuitDesigner = () => {
  const [prompt, setPrompt] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(true);

  const handleCircuitAnalysis = async () => {
    if (prompt.trim() === "") {
      toast({
        title: "Empty Description",
        description: "Please enter a circuit description first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setAnalysisResult("");
    
    try {
      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant', {
        body: { 
          prompt: prompt,
          type: "circuit_summary" 
        },
      });
      
      if (error) {
        throw new Error(error.message || 'Error connecting to the circuit analyser');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setAnalysisResult(data.response || "No analysis result received");
      
      toast({
        title: "Analysis Complete",
        description: "Circuit analysis has been generated successfully.",
        variant: "success",
      });
    } catch (error) {
      console.error('Circuit Analysis Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to analyse circuit",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(analysisResult);
      toast({
        title: "Copied!",
        description: "Report copied to clipboard successfully.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard. Please select and copy manually.",
        variant: "destructive",
      });
    }
  };

  const examplePrompts = [
    "Kitchen ring circuit with induction hob and oven",
    "Garage workshop with 32A machinery supply", 
    "Bathroom with electric shower upgrade",
    "Home office with server rack and UPS",
    "Garden shed with lighting and sockets",
    "Domestic EV charging point installation",
    "Commercial kitchen extraction system",
    "Three-phase motor control panel"
  ];

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <div className="max-w-6xl mx-auto p-3 sm:p-6 space-y-4 sm:space-y-8">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6">
          <Link to="/electrician-tools/ai-tooling">
            <Button 
              variant="outline" 
              size="sm"
              className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to AI Tools
            </Button>
          </Link>
        </div>
        {/* Hero Section */}
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-500/30 to-yellow-600/30 rounded-2xl border border-yellow-400/30">
            <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
            Circuit Analyser
          </h1>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-4xl mx-auto">
            Professional circuit analysis with BS 7671 compliance guidance. Get comprehensive reports for cable sizing, 
            protection calculations, and installation recommendations.
          </p>
        </div>

        {/* Circuit Analysis Interface */}
        <Card className="bg-elec-grey border border-elec-yellow/20 max-w-5xl mx-auto">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
              <CardTitle className="text-lg sm:text-xl text-white">Circuit Analyser</CardTitle>
            </div>
            <CardDescription className="text-gray-300 text-sm sm:text-base">
              Describe your circuit requirements and get professional analysis with compliance guidance:
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-4 sm:p-6 pt-0 space-y-4 sm:space-y-6">
            {/* Input Area */}
            <div className="space-y-3 sm:space-y-4">
              <Textarea
                placeholder="e.g. 'I need to design a circuit for a 9.5kW electric shower. The cable run is 18 metres from the consumer unit through a loft space. What are my options?'"
                className="min-h-[80px] sm:min-h-[100px] bg-elec-dark border-elec-yellow/30 focus:border-elec-yellow text-white placeholder:text-gray-400 resize-none text-sm sm:text-base"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              
              <div className="flex gap-2 sm:gap-3">
                <Button 
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 sm:py-3 h-10 sm:h-12 text-sm sm:text-base" 
                  onClick={handleCircuitAnalysis} 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" /> 
                      Analyse
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Analyse Circuit
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20 px-4 sm:px-6 h-10 sm:h-12 text-sm sm:text-base"
                  onClick={() => setShowResults(!showResults)}
                >
                  {showResults ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                  <span className="hidden sm:inline ml-2">
                    {showResults ? 'Hide' : 'Show'}
                  </span>
                </Button>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="p-4 sm:p-6 bg-elec-dark rounded-lg border border-elec-yellow/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                  </div>
                  <span className="text-white font-medium text-sm sm:text-base">Circuit Analyser is working...</span>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <Skeleton className="h-3 sm:h-4 w-full bg-elec-dark" />
                  <Skeleton className="h-3 sm:h-4 w-3/4 bg-elec-dark" />
                  <Skeleton className="h-3 sm:h-4 w-5/6 bg-elec-dark" />
                </div>
              </div>
            )}

            {/* Quick Examples Section */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-medium text-gray-300 text-sm sm:text-base">Try these scenarios:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {examplePrompts.map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="border-elec-yellow/30 text-elec-light hover:bg-elec-yellow/20 hover:border-elec-yellow/50 h-auto py-2 sm:py-3 px-3 sm:px-4 text-left justify-start text-xs sm:text-sm"
                    onClick={() => setPrompt(example)}
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {analysisResult && !isLoading && showResults && (
          <div className="max-w-5xl mx-auto">
            <Card className="bg-elec-grey border border-elec-yellow/20">
              <CardHeader className="p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2 sm:gap-3 text-white">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                    </div>
                    Circuit Analysis Report
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="prose prose-invert max-w-none">
                  <div className="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {analysisResult.split('\n').map((line, index) => (
                      <p 
                        key={index}
                        className={
                          line.match(/^(OVERVIEW|RECOMMENDATION|COMPLIANCE|PRACTICAL)/i) ?
                          'text-yellow-400 font-semibold text-sm sm:text-base mt-3 sm:mt-4 mb-1 sm:mb-2 first:mt-0' :
                          line.endsWith(':') && line.length < 50 ?
                          'font-medium text-yellow-300 mt-2 sm:mt-3 mb-1' :
                          line.startsWith('•') || line.startsWith('-') ?
                          'text-gray-300 ml-3 sm:ml-4 my-1' :
                          line.trim() === '' ? 'my-1 sm:my-2' :
                          'my-1'
                        }
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-6xl mx-auto mt-8 sm:mt-12">
          <Card className="bg-elec-grey border border-elec-yellow/20">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Zap className="h-4 w-4 text-yellow-400" />
                </div>
                <h3 className="font-semibold text-white text-sm sm:text-base">Professional Analysis</h3>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm">
                Get comprehensive circuit calculations with cable sizing and protection recommendations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-elec-grey border border-elec-yellow/20">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Copy className="h-4 w-4 text-green-400" />
                </div>
                <h3 className="font-semibold text-white text-sm sm:text-base">BS 7671 Compliant</h3>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm">
                All calculations and recommendations follow the latest 18th edition regulations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-elec-grey border border-elec-yellow/20 sm:col-span-2 lg:col-span-1">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Eye className="h-4 w-4 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white text-sm sm:text-base">Practical Guidance</h3>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm">
                Real-world installation tips and best practices for safe, compliant work.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CircuitDesigner;