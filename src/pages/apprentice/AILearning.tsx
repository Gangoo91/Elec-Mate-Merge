
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BackButton from "@/components/common/BackButton";
import { Book, Bot, GraduationCap, Search, BookOpen, Lightbulb } from "lucide-react";
import StudyExamBot from "@/components/apprentice/study/StudyExamBot";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const AILearning = () => {
  const [query, setQuery] = useState("");
  const [regResult, setRegResult] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleRegulationSearch = async () => {
    if (query.trim() === "") {
      toast({
        title: "Empty Query",
        description: "Please enter a regulations question or search term.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setRegResult("");

    try {
      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant', {
        body: { 
          prompt: query,
          type: "regulations"
        },
      });
      
      if (error) {
        throw new Error(error.message || 'Error connecting to the Regulations Assistant');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }

      setRegResult(data.response || "");
      
      toast({
        title: "Regulations Information Found",
        description: "Your regulations query has been answered.",
      });
    } catch (error) {
      console.error('Regulations Search Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get regulations information",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-4">
        <h1 className="text-3xl font-bold tracking-tight mb-4">AI Learning Tools</h1>
        <BackButton customUrl="/apprentice/study" label="Back to Study Centre" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray lg:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-elec-yellow" />
              AI Learning Assistant
            </CardTitle>
            <CardDescription>
              Tools designed to help UK electrical apprentices master complex concepts and prepare for qualifications
            </CardDescription>
          </CardHeader>
        </Card>
        
        {/* BS7671 Code Companion */}
        <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5 text-elec-yellow" />
              BS7671 Code Companion
            </CardTitle>
            <CardDescription>
              Access BS 7671 IET Wiring Regulations information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground mb-4">
              Ask questions about UK electrical regulations or search for specific clauses in BS 7671. Our AI will provide accurate information with references.
            </p>
            
            <div className="flex items-center space-x-2">
              <Input
                placeholder="e.g., What are the requirements for RCD protection?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleRegulationSearch}
                disabled={isSearching}
                className="whitespace-nowrap"
              >
                {isSearching ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>

            {isSearching && (
              <div className="mt-6 p-4 bg-elec-dark rounded-md animate-pulse">
                <Skeleton className="h-6 w-40 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            )}

            {regResult && !isSearching && (
              <div className="mt-6 p-4 bg-elec-dark rounded-md">
                <h3 className="text-lg font-semibold mb-3 text-elec-yellow">Regulations Information:</h3>
                <div className="text-sm whitespace-pre-wrap">
                  {regResult.split('\n').map((line, index) => (
                    <p 
                      key={index}
                      className={
                        line.startsWith('BS 7671:') || line.startsWith('Regulation ') ? 
                        'text-elec-yellow font-medium my-2' : 
                        line.match(/^(Clause|Section|Chapter|Part|Appendix) \d+/) ? 
                        'font-semibold my-2' : 
                        'my-1'
                      }
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Concept Explainer */}
        <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-elec-yellow" />
              Concept Explainer
            </CardTitle>
            <CardDescription>
              Get clear explanations of complex electrical concepts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Ask questions about any electrical theory or practical concept and receive easy-to-understand
              explanations based on UK standards and regulations.
            </p>
            <Button className="w-full">
              Open Explainer
            </Button>
          </CardContent>
        </Card>
        
        {/* Study Planner */}
        <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-elec-yellow" />
              Study Planner
            </CardTitle>
            <CardDescription>
              Generate personalized study plans for your qualification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Input your qualification goals and timeframe to get a structured study plan
              tailored to your learning style and schedule.
            </p>
            <Button className="w-full">
              Create Study Plan
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <StudyExamBot />
    </div>
  );
};

export default AILearning;
