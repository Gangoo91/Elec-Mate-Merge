
import { useState } from "react";
import { Book, Loader, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import RegulationSources from "./RegulationSources";

const RegulationsAssistant = () => {
  const [query, setQuery] = useState("");
  const [regResult, setRegResult] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [ragRegulations, setRagRegulations] = useState<any[]>([]);
  const [searchMethod, setSearchMethod] = useState<string>("");

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
    setRagRegulations([]);
    setSearchMethod("");

    try {
      // First, get RAG regulations
      const { data: ragData, error: ragError } = await supabase.functions.invoke('bs7671-rag-search', {
        body: {
          query,
          matchThreshold: 0.6,
          matchCount: 10
        }
      });

      if (!ragError && ragData?.regulations) {
        setRagRegulations(ragData.regulations);
        setSearchMethod(ragData.searchMethod || 'vector');
      }
      
      // Then get AI interpretation
      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant', {
        body: { 
          prompt: query,
          type: "regulations",
          use_rag: true
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
          <div className="mt-6 p-4 bg-elec-dark rounded-md border border-elec-yellow/20">
            <h3 className="text-lg font-semibold mb-4 text-elec-yellow flex items-center gap-2 border-b border-elec-yellow/20 pb-2">
              <span className="text-xl">📖</span>
              Regulations Information
            </h3>
            <div className="text-sm whitespace-pre-wrap space-y-2">
              {regResult.split('\n').map((line, index) => {
                const trimmed = line.trim();
                if (!trimmed) return null;
                
                // Enhanced formatting patterns
                const regulationNumbers = /\b(\d{3}\.\d+(?:\.\d+)?)\b/g;
                const partNumbers = /(Part|Chapter|Section|Appendix)\s*(\d+)/gi;
                const bsNumbers = /(BS\s*7671|IET)/gi;
                const technicalTerms = /\b(RCD|RCBO|MCB|MCCB|RCM|AFDD|SPD|CU|DB|EICR|PIR|EIC|PAT|Zs|Ze|Zdb|PFC|PSCC|TN-S|TN-C-S|TT|IT|IP\d{2}|CSA|CPC|PME|SWA|MICC|FP200|XLPE|PVC|LSZH)\b/gi;
                const measurements = /\b(\d+(?:\.\d+)?)\s*(A|mA|V|kV|W|kW|VA|kVA|Ω|mΩ|mm²?|m|cm|Hz|°C|lx|lm|cd)\b/g;
                
                let processedText = trimmed
                  .replace(regulationNumbers, '<span class="px-2 py-1 bg-purple-500/25 text-purple-200 rounded font-bold">$&</span>')
                  .replace(partNumbers, '<span class="px-1.5 py-0.5 bg-indigo-500/20 text-indigo-200 rounded font-semibold">$&</span>')
                  .replace(bsNumbers, '<span class="px-2 py-1 bg-blue-500/25 text-blue-200 rounded font-bold">$&</span>')
                  .replace(technicalTerms, '<span class="px-1.5 py-0.5 bg-elec-yellow/20 text-elec-yellow rounded font-medium">$&</span>')
                  .replace(measurements, '<span class="px-1 py-0.5 bg-green-500/20 text-green-200 rounded font-mono text-xs">$&</span>');
                
                // Main regulation headers
                if (trimmed.startsWith('BS 7671:') || trimmed.startsWith('Regulation ') || trimmed.match(/^(REGULATIONS?|BS\s*7671):?$/i)) {
                  return (
                    <div key={index} className="mt-4 mb-3 first:mt-0">
                      <h4 className="text-elec-yellow font-bold text-base flex items-center gap-2 p-2 bg-elec-yellow/10 rounded border border-elec-yellow/20">
                        <span>📋</span>
                        <span dangerouslySetInnerHTML={{ __html: processedText }} />
                      </h4>
                    </div>
                  );
                }
                
                // Section/Part/Chapter headers
                if (trimmed.match(/^(Clause|Section|Chapter|Part|Appendix)\s*\d+/i)) {
                  return (
                    <div key={index} className="mt-3 mb-2">
                      <h5 className="font-semibold text-blue-300 p-2 bg-blue-500/10 rounded border border-blue-500/20" dangerouslySetInnerHTML={{ __html: processedText }} />
                    </div>
                  );
                }
                
                // Standalone regulation numbers
                if (trimmed.match(/^\d{3}\.\d+(?:\.\d+)?:?\s*$/)) {
                  return (
                    <div key={index} className="mt-2 mb-1">
                      <h6 className="font-bold text-purple-300 text-sm" dangerouslySetInnerHTML={{ __html: processedText }} />
                    </div>
                  );
                }
                
                // Bullet points
                if (trimmed.match(/^[-•]\s+/)) {
                  const bulletText = processedText.replace(/^[-•]\s+/, '');
                  return (
                    <div key={index} className="ml-4 mb-2 flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <span className="text-gray-300" dangerouslySetInnerHTML={{ __html: bulletText }} />
                    </div>
                  );
                }
                
                // Compliance requirements
                if (trimmed.match(/\b(must|shall|required|mandatory|compliance)\b/gi)) {
                  return (
                    <div key={index} className="my-3 p-3 bg-amber-500/15 border border-amber-500/25 rounded-lg">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-400">⚖️</span>
                        <span className="text-amber-200 font-medium" dangerouslySetInnerHTML={{ __html: processedText }} />
                      </div>
                    </div>
                  );
                }
                
                // Safety warnings
                if (trimmed.includes('⚠️') || trimmed.match(/\b(danger|warning|caution|safety|hazard)\b/gi)) {
                  return (
                    <div key={index} className="my-3 p-3 bg-orange-500/15 border border-orange-500/25 rounded-lg">
                      <div className="flex items-start gap-2">
                        <span className="text-orange-400">⚠️</span>
                        <span className="text-orange-200 font-medium" dangerouslySetInnerHTML={{ __html: processedText }} />
                      </div>
                    </div>
                  );
                }
                
                // Regular text
                return (
                  <p key={index} className="text-gray-300 my-1" dangerouslySetInnerHTML={{ __html: processedText }} />
                );
              }).filter(Boolean)}
            </div>
          </div>
        )}

        {/* RAG Sources */}
        {ragRegulations.length > 0 && !isSearching && (
          <div className="mt-4">
            <RegulationSources regulations={ragRegulations} searchMethod={searchMethod} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RegulationsAssistant;
