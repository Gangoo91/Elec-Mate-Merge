import { useState, useRef, useEffect } from "react";
import { Sparkles, Loader, Search, BookOpen, Zap, Clock, X, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchResult {
  answer: string;
  regulation_refs?: string[];
  key_points?: string[];
  calculations?: string;
  safety_notes?: string;
  practical_tips?: string;
  related_topics?: string[];
  follow_up_suggestions?: string[];
  response_time?: number;
}

interface SearchHistory {
  id: string;
  query: string;
  result: SearchResult;
  timestamp: Date;
  mode: 'quick' | 'detailed';
}

const AIAssistant = () => {
  const [prompt, setPrompt] = useState("");
  const [currentResult, setCurrentResult] = useState<SearchResult | null>(null);
  const [streamingText, setStreamingText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchMode, setSearchMode] = useState<'quick' | 'detailed'>('detailed');
  const [showResults, setShowResults] = useState(true);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const startTimeRef = useRef<number>(0);

  const quickChips = [
    "RCD bathroom requirements",
    "Zs values MCBs", 
    "Cable sizing",
    "Testing sequence",
    "Bonding sizes",
    "IP ratings"
  ];

  const detailedExamples = [
    "How do I calculate cable sizing for a 32A circuit with a 25m cable run?",
    "What are the complete testing requirements for a new bathroom installation?",
    "Explain the differences between TT, TN-S and TN-C-S earthing systems",
    "What safety measures are required when working on live electrical systems?"
  ];

  // Auto-scroll to results
  const resultsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (currentResult && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentResult]);

  const cancelSearch = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    setStreamingText("");
  };

  const handleAIQuery = async (queryText?: string, mode?: 'quick' | 'detailed') => {
    const searchText = queryText || prompt.trim();
    const searchModeToUse = mode || searchMode;
    
    if (searchText === "") {
      toast({
        title: "Empty Query",
        description: "Please enter a question first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setCurrentResult(null);
    setStreamingText("");
    setResponseTime(null);
    startTimeRef.current = Date.now();
    
    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    
    try {
      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant-stream', {
        body: { 
          prompt: searchText,
          mode: searchModeToUse
        },
      });
      
      if (error) {
        throw new Error(error.message || 'Error connecting to AI assistant');
      }

      // Handle streaming response
      if (data) {
        const reader = data.getReader();
        let fullResponse = "";
        
        try {
          while (true) {
            const { done, value } = await reader.read();
            
            if (done) break;
            
            const chunk = new TextDecoder().decode(value);
            const lines = chunk.split('\n');
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const parsed = JSON.parse(line.slice(6));
                  if (parsed.content) {
                    fullResponse += parsed.content;
                    setStreamingText(fullResponse);
                  }
                } catch (e) {
                  // Skip invalid JSON
                }
              }
            }
          }
        } catch (streamError) {
          if (streamError.name !== 'AbortError') {
            throw streamError;
          }
        }

        // Parse final JSON response
        try {
          const finalResult = JSON.parse(fullResponse) as SearchResult;
          finalResult.response_time = Date.now() - startTimeRef.current;
          setCurrentResult(finalResult);
          setResponseTime(finalResult.response_time);
          
          // Add to history
          const historyEntry: SearchHistory = {
            id: Date.now().toString(),
            query: searchText,
            result: finalResult,
            timestamp: new Date(),
            mode: searchModeToUse
          };
          setSearchHistory(prev => [historyEntry, ...prev.slice(0, 4)]);
          
          toast({
            title: "Search Complete",
            description: `Found relevant information in ${Math.round(finalResult.response_time / 1000)}s`,
            variant: "success"
          });
        } catch (parseError) {
          // Fallback for non-JSON response
          const fallbackResult: SearchResult = {
            answer: fullResponse || streamingText,
            response_time: Date.now() - startTimeRef.current
          };
          setCurrentResult(fallbackResult);
        }
      }
      
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('AI Query Error:', error);
        toast({
          title: "Search Failed",
          description: error instanceof Error ? error.message : "Failed to get response from AI assistant",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
      setStreamingText("");
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <div className="max-w-6xl mx-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500/30 to-purple-600/30 rounded-2xl border border-purple-400/30">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400" />
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            Intelligent Search
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-3xl mx-auto">
            AI-powered BS7671 regulation search with instant streaming responses
          </p>
        </div>

        {/* Sticky Search Bar */}
        <div className="sticky top-3 z-10 bg-neutral-900/95 backdrop-blur-sm border border-neutral-700 rounded-xl p-3 sm:p-4">
          {/* Mode Toggle */}
          <div className="flex gap-2 mb-3">
            <Button
              size="sm"
              variant={searchMode === 'quick' ? 'default' : 'outline'}
              className={`${
                searchMode === 'quick' 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'border-neutral-600 text-gray-300 hover:bg-neutral-700/50'
              } text-xs`}
              onClick={() => setSearchMode('quick')}
            >
              <Zap className="h-3 w-3 mr-1" />
              Quick
            </Button>
            <Button
              size="sm"
              variant={searchMode === 'detailed' ? 'default' : 'outline'}
              className={`${
                searchMode === 'detailed' 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'border-neutral-600 text-gray-300 hover:bg-neutral-700/50'
              } text-xs px-2 sm:px-3`}
              onClick={() => setSearchMode('detailed')}
            >
              <BookOpen className="h-3 w-3 sm:mr-1" />
              <span className="hidden sm:inline">Detailed</span>
              <span className="sm:hidden">Full</span>
            </Button>
            {responseTime && (
              <Badge variant="outline" className="border-neutral-600 text-gray-300 text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {Math.round(responseTime / 1000)}s
              </Badge>
            )}
          </div>

          {/* Search Input */}
          <div className="flex gap-2">
            <Textarea
              placeholder={searchMode === 'quick' 
                ? "Quick question (e.g. 'RCD bathroom requirements')"
                : "Detailed question (e.g. 'How do I calculate cable sizing for a 32A circuit?')"
              }
              className="min-h-[40px] bg-neutral-800 border-neutral-600 focus:border-purple-400 text-white placeholder:text-gray-400 resize-none text-sm"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAIQuery();
                }
              }}
            />
            
            {isLoading ? (
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white px-3 h-auto"
                onClick={cancelSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 h-auto" 
                onClick={() => handleAIQuery()}
              >
                <Search className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Quick Action Chips */}
          <div className="flex flex-wrap gap-2 mt-3">
            {(searchMode === 'quick' ? quickChips : detailedExamples.slice(0, 2)).map((query, index) => (
              <Button
                key={index}
                size="sm"
                variant="outline"
                className="border-neutral-600/50 text-gray-300 hover:bg-neutral-700/50 text-xs h-7"
                onClick={() => {
                  setPrompt(query);
                  handleAIQuery(query);
                }}
              >
                {query}
              </Button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <Card className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin text-purple-400" />
                  <span className="text-white font-medium text-sm">
                    {searchMode === 'quick' ? 'Quick search...' : 'Detailed analysis...'}
                  </span>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-red-500/50 text-red-400 hover:bg-red-500/20 text-xs"
                  onClick={cancelSearch}
                >
                  Cancel
                </Button>
              </div>
              
              {streamingText ? (
                <div className="text-sm text-gray-300 whitespace-pre-wrap">
                  {streamingText}
                  <span className="inline-block w-2 h-4 bg-purple-400 ml-1 animate-pulse" />
                </div>
              ) : (
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full bg-neutral-700/50" />
                  <Skeleton className="h-3 w-3/4 bg-neutral-700/50" />
                  <Skeleton className="h-3 w-5/6 bg-neutral-700/50" />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {currentResult && !isLoading && showResults && (
          <div ref={resultsRef} className="space-y-4">
            {/* Main Answer */}
            <Card className="bg-gradient-to-r from-neutral-800/60 to-neutral-700/60 border border-neutral-600">
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2 text-white">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Search className="h-3 w-3 text-purple-400" />
                    </div>
                    Answer
                  </CardTitle>
                  {currentResult.response_time && (
                    <Badge variant="outline" className="border-purple-500/30 text-purple-300 text-xs">
                      {Math.round(currentResult.response_time / 1000)}s
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="prose prose-invert max-w-none">
                  <div className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {currentResult.answer}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Sections Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Regulation References */}
              {currentResult.regulation_refs && currentResult.regulation_refs.length > 0 && (
                <Card className="bg-gradient-to-r from-neutral-800/60 to-neutral-700/60 border border-neutral-600">
                  <CardHeader className="p-3">
                    <CardTitle className="text-base flex items-center gap-2 text-white">
                      <BookOpen className="h-4 w-4 text-blue-400" />
                      Regulations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <div className="flex flex-wrap gap-2">
                      {currentResult.regulation_refs.map((ref, index) => (
                        <Badge key={index} variant="outline" className="border-blue-500/30 text-blue-300">
                          {ref}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Key Points */}
              {currentResult.key_points && currentResult.key_points.length > 0 && (
                <Card className="bg-gradient-to-r from-neutral-800/60 to-neutral-700/60 border border-neutral-600">
                  <CardHeader className="p-3">
                    <CardTitle className="text-base flex items-center gap-2 text-white">
                      <Zap className="h-4 w-4 text-yellow-400" />
                      Key Points
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <ul className="text-sm text-gray-300 space-y-1">
                      {currentResult.key_points.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-yellow-400 text-xs mt-1">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Safety Notes */}
              {currentResult.safety_notes && (
                <Card className="bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-500/30 lg:col-span-2">
                  <CardHeader className="p-3">
                    <CardTitle className="text-base flex items-center gap-2 text-white">
                      <div className="w-4 h-4 bg-red-500/20 rounded flex items-center justify-center">
                        ⚠️
                      </div>
                      Safety Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <div className="text-sm text-gray-300">
                      {currentResult.safety_notes}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Follow-up Suggestions */}
            {currentResult.follow_up_suggestions && currentResult.follow_up_suggestions.length > 0 && (
              <Card className="bg-gradient-to-r from-neutral-800/60 to-neutral-700/60 border border-neutral-600">
                <CardHeader className="p-3">
                  <CardTitle className="text-base flex items-center gap-2 text-white">
                    <RefreshCw className="h-4 w-4 text-green-400" />
                    Related Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {currentResult.follow_up_suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant="outline"
                        className="border-green-500/30 text-green-300 hover:bg-green-500/10 text-xs h-auto py-2"
                        onClick={() => {
                          setPrompt(suggestion);
                          handleAIQuery(suggestion);
                        }}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Search History */}
        {searchHistory.length > 0 && (
          <Card className="bg-gradient-to-r from-neutral-800/40 to-neutral-700/40 border border-neutral-600">
            <CardHeader className="p-3">
              <CardTitle className="text-base flex items-center gap-2 text-white">
                <Clock className="h-4 w-4 text-gray-400" />
                Recent Searches
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="space-y-2">
                {searchHistory.slice(0, 3).map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center justify-between p-2 bg-neutral-700/30 rounded-lg cursor-pointer hover:bg-neutral-700/50"
                    onClick={() => {
                      setPrompt(item.query);
                      handleAIQuery(item.query, item.mode);
                    }}
                  >
                    <span className="text-sm text-gray-300 truncate flex-1">{item.query}</span>
                    <div className="flex items-center gap-2 ml-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          item.mode === 'quick' 
                            ? 'border-purple-500/30 text-purple-300' 
                            : 'border-blue-500/30 text-blue-300'
                        }`}
                      >
                        {item.mode}
                      </Badge>
                      {item.result.response_time && (
                        <Badge variant="outline" className="border-gray-500/30 text-gray-400 text-xs">
                          {Math.round(item.result.response_time / 1000)}s
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Detailed Examples (when no results) */}
        {!currentResult && !isLoading && searchMode === 'detailed' && (
          <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-neutral-600">
            <CardHeader className="p-4">
              <CardTitle className="text-lg flex items-center gap-2 text-white">
                <BookOpen className="h-5 w-5 text-blue-400" />
                Example Detailed Questions
              </CardTitle>
              <CardDescription className="text-gray-300">
                Try these comprehensive electrical regulation questions:
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid gap-3">
                {detailedExamples.map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="border-neutral-600/50 text-gray-300 hover:bg-neutral-700/50 text-left justify-start h-auto py-3 px-4 text-sm"
                    onClick={() => {
                      setPrompt(example);
                      handleAIQuery(example);
                    }}
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;