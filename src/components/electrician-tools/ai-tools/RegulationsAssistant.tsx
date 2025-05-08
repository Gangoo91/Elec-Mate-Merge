
import { useState } from "react";
import { Book, Loader, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const RegulationsAssistant = () => {
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
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Book className="h-5 w-5 text-elec-yellow" />
          UK Electrical Regulations Assistant
        </CardTitle>
        <CardDescription>
          Access BS 7671 IET Wiring Regulations information and interpretations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Ask questions about UK electrical regulations or search for specific clauses in BS 7671. Our AI will provide accurate information with references to the appropriate regulations.
        </p>
        
        <div className="flex items-center space-x-2">
          <Input
            placeholder="e.g., What are the requirements for RCD protection in domestic installations?"
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
                <Loader className="h-4 w-4 mr-2 animate-spin" />
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
  );
};

export default RegulationsAssistant;
