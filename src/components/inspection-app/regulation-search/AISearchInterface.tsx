import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Sparkles, Search, Lightbulb, ArrowRight, Loader2, ChevronDown, ChevronRight, BookOpen, FileText, HelpCircle, X, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface AISearchResult {
  regulations: Array<{
    number: string;
    title: string;
    description: string;
    relevanceScore: number;
    aiExplanation?: string;
  }>;
  aiSummary: string;
  suggestedQueries: string[];
  contextualTips: string[];
}

interface AISearchInterfaceProps {
  onRegulationSelect: (regulation: string) => void;
}

const AISearchInterface = ({ onRegulationSelect }: AISearchInterfaceProps) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<AISearchResult | null>(null);
  const [expandedRegulations, setExpandedRegulations] = useState<Set<string>>(new Set());
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Load search history
  useEffect(() => {
    const history = localStorage.getItem('regulation-search-history');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // Keyboard shortcut (Cmd/Ctrl+K) removed - shortcuts disabled
  
  // Comprehensive autocomplete database
  const autocompleteTerms = useMemo(() => [
    // Regulation numbers
    '612.1', '612.2.1', '612.3', '612.6', '612.8', '612.10', '411.3.3', '415.1.1', 
    'Table 41.3', '701.411.3.3', '544.1.1', '131.8', '411.3.2', '522.6.101',
    
    // Technical terms
    'RCD protection', 'RCBO', 'MCB', 'MCCB', 'Zs values', 'earth fault loop impedance',
    'insulation resistance', 'continuity testing', 'polarity testing', 'earth electrode',
    'bonding conductor', 'main equipotential bonding', 'supplementary bonding',
    
    // Testing procedures
    'testing sequence', 'initial verification', 'periodic inspection', 'minor works',
    'cable sizing', 'current carrying capacity', 'voltage drop calculation',
    'discrimination', 'selectivity', 'fault current', 'prospective fault current',
    
    // Installation areas
    'bathroom zones', 'kitchen regulations', 'garden installation', 'swimming pool',
    'underfloor heating', 'electric vehicle charging', 'solar PV installation',
    
    // Safety requirements
    'IP rating', 'ingress protection', 'fire barrier', 'emergency lighting',
    'fire alarm system', 'SELV circuit', 'PELV circuit', 'functional earthing',
    
    // Common questions
    'What are the RCD requirements for bathrooms?',
    'How do I test earth fault loop impedance?',
    'What cable size do I need for a 32A circuit?',
    'What are the IP ratings for outdoor installations?',
    'How often should I do PAT testing?',
    'What are the bonding requirements for gas pipes?'
  ], []);

  // Filter suggestions with memoization
  const filteredSuggestions = useMemo(() => 
    query.length >= 2 
      ? autocompleteTerms.filter(term => 
          term.toLowerCase().includes(query.toLowerCase())
        ).slice(0, isMobile ? 6 : 10)
      : [],
    [query, autocompleteTerms, isMobile]
  );

  const placeholder = isMobile 
    ? "Ask about regulations..." 
    : "e.g. 'What are the RCD requirements for bathrooms?'";

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setShowSuggestions(value.length >= 2);
    setSelectedSuggestionIndex(-1);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || filteredSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        if (selectedSuggestionIndex >= 0) {
          e.preventDefault();
          handleSuggestionSelect(filteredSuggestions[selectedSuggestionIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  const toggleRegulationExpansion = (regNumber: string) => {
    const newExpanded = new Set(expandedRegulations);
    if (newExpanded.has(regNumber)) {
      newExpanded.delete(regNumber);
    } else {
      newExpanded.add(regNumber);
    }
    setExpandedRegulations(newExpanded);
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Query Required",
        description: "Please enter a question or topic to search for.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // Save to search history
    const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('regulation-search-history', JSON.stringify(newHistory));
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-regulation-search', {
        body: { 
          query: query.trim(),
          includeExplanations: true,
          maxResults: 8
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to search regulations');
      }

      // Handle both direct response and wrapped response
      const result = data?.fallback || data;
      setSearchResult(result);

      if (result.regulations?.length === 0) {
        toast({
          title: "No Specific Regulations Found",
          description: "I've provided general guidance and suggestions below.",
        });
      }

    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Search is temporarily unavailable. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleSuggestedQuery = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch();
  };


  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Screen reader announcement */}
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      >
        {isSearching && "Searching regulations..."}
        {searchResult && `Found ${searchResult.regulations?.length || 0} regulations`}
      </div>

      <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-foreground text-base sm:text-lg">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
            Intelligent Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Search History */}
          {searchHistory.length > 0 && (
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="w-full justify-start text-foreground hover:text-foreground h-auto py-1 px-2"
                >
                  <Clock className="h-3 w-3 mr-2" />
                  <span className="text-xs">Recent Searches</span>
                  <ChevronDown className="h-3 w-3 ml-auto" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-wrap gap-2 mt-2">
                  {searchHistory.map((historyQuery, idx) => (
                    <Button 
                      key={idx}
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setQuery(historyQuery);
                        searchInputRef.current?.focus();
                      }}
                      className="text-xs h-7 border-white/20 text-foreground hover:bg-white/10"
                    >
                      {historyQuery.length > 30 ? historyQuery.substring(0, 30) + '...' : historyQuery}
                    </Button>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          <div className="space-y-2 relative">
            <label className="text-xs sm:text-sm font-medium text-foreground">
              {isMobile ? "Your question:" : "Ask about electrical regulations, testing procedures, or installation requirements:"}
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50 pointer-events-none" />
              <Input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onKeyDown={(e) => {
                  handleKeyDown(e);
                  if (e.key === 'Enter' && !showSuggestions && query.trim()) {
                    handleSearch();
                  }
                }}
                onFocus={() => setShowSuggestions(query.length >= 2)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder={placeholder}
                className="bg-muted border-border text-foreground placeholder-white/60 h-12 sm:h-14 pl-10 pr-10 text-sm sm:text-base"
                disabled={isSearching}
                role="combobox"
                aria-controls="autocomplete-listbox"
                aria-expanded={showSuggestions}
                aria-autocomplete="list"
                aria-activedescendant={selectedSuggestionIndex >= 0 ? `suggestion-${selectedSuggestionIndex}` : undefined}
              />
              {query && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setQuery('');
                    searchInputRef.current?.focus();
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-foreground/70 hover:text-foreground hover:bg-transparent"
                  disabled={isSearching}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              
              {/* Enhanced Autocomplete dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div 
                  id="autocomplete-listbox"
                  role="listbox"
                  className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto"
                >
                  {filteredSuggestions.map((suggestion, index) => (
                    <button
                      key={suggestion}
                      id={`suggestion-${index}`}
                      role="option"
                      aria-selected={index === selectedSuggestionIndex}
                      onClick={() => handleSuggestionSelect(suggestion)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors min-h-[48px] border-l-2 ${
                        index === selectedSuggestionIndex 
                          ? 'bg-muted border-elec-yellow' 
                          : 'border-transparent hover:bg-muted/70'
                      }`}
                    >
                      {/* Icon based on type */}
                      {suggestion.includes('?') && <HelpCircle className="h-5 w-5 text-blue-400 flex-shrink-0" />}
                      {suggestion.match(/^\d+/) && <FileText className="h-5 w-5 text-elec-yellow flex-shrink-0" />}
                      {!suggestion.includes('?') && !suggestion.match(/^\d+/) && <Search className="h-5 w-5 text-green-400 flex-shrink-0" />}
                      
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-medium truncate ${
                          suggestion.includes('?') ? 'text-blue-300' : 
                          suggestion.match(/^\d+/) ? 'text-elec-yellow' : 
                          'text-foreground'
                        }`}>
                          {suggestion}
                        </div>
                        <div className="text-xs text-foreground/70">
                          {suggestion.includes('?') ? 'Question' : 
                           suggestion.match(/^\d+/) ? 'Regulation' : 
                           'Search term'}
                        </div>
                      </div>
                      
                      <ArrowRight className="h-4 w-4 text-foreground/50 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <Button 
            onClick={handleSearch}
            disabled={isSearching || !query.trim()}
            className="w-full bg-purple-500 hover:bg-purple-600 text-foreground h-12 sm:h-14 text-sm sm:text-base font-semibold"
          >
            {isSearching ? (
              <>
                <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Search Regulations
              </>
            )}
          </Button>

          {/* Quick examples - Collapsible on mobile */}
          <Collapsible defaultOpen={!isMobile}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start text-foreground hover:text-foreground h-auto py-1 px-2 sm:hidden"
              >
                <Sparkles className="h-3 w-3 mr-2" />
                <span className="text-xs">Quick Examples</span>
                <ChevronDown className="h-3 w-3 ml-auto" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-2">
                <span className="text-xs text-foreground/80 hidden sm:block">Try these questions:</span>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {[
                    "RCD bathroom requirements", 
                    "Cable sizing formula", 
                    "Testing sequence",
                    "Zs values for MCBs",
                    "Bonding conductor sizes", 
                    "IP rating requirements"
                  ].map((example) => (
                    <Button
                      key={example}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQueryChange(example)}
                      className="text-xs border-white/20 text-foreground hover:bg-white/10 justify-start h-auto py-2 px-2 sm:px-3 whitespace-normal text-left"
                      disabled={isSearching}
                    >
                      {example}
                    </Button>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      {/* AI Search Results */}
      {searchResult && (
        <div className="space-y-3 sm:space-y-4">
          {/* AI Summary - Enhanced Design */}
          <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-500/40">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-400 text-base sm:text-lg">
                <Lightbulb className="h-5 w-5 animate-pulse" />
                AI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 leading-relaxed text-sm sm:text-base">{searchResult.aiSummary}</p>
            </CardContent>
          </Card>

          {/* Relevant Regulations - Empty State or Results */}
          {searchResult.regulations && searchResult.regulations.length === 0 ? (
            <Card className="bg-card/50 border-border">
              <CardContent className="py-8 sm:py-12 text-center">
                <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 sm:h-12 sm:w-12 text-white/60" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">No Exact Matches Found</h3>
                <p className="text-foreground/80 text-sm sm:text-base mb-6 max-w-md mx-auto px-4">
                  Try rephrasing your question or use our suggested searches below
                </p>
                {searchResult.suggestedQueries && searchResult.suggestedQueries.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
                    {searchResult.suggestedQueries.map((suggestion, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestedQuery(suggestion)}
                        className="border-white/20 text-foreground hover:bg-white/10 text-xs sm:text-sm h-auto py-2 px-3 whitespace-normal"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : searchResult.regulations && searchResult.regulations.length > 0 && (
            <Card className="bg-white/5 border-green-500/30 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-400 text-base sm:text-lg flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                    Relevant Regulations
                  </span>
                  <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">
                    {searchResult.regulations.length} found
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3">
                {searchResult.regulations.map((reg, index) => {
                  const isExpanded = expandedRegulations.has(reg.number);
                  return (
                    <Collapsible key={index} open={isExpanded} onOpenChange={() => toggleRegulationExpansion(reg.number)}>
                      <div className="bg-card/70 rounded-lg border-l-4 border-green-500 hover:bg-card transition-all">
                        {/* Summary Section - Mobile Optimized */}
                        <div className="p-3 sm:p-4">
                          <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Badge className="bg-green-500 text-black font-bold text-xs sm:text-sm">
                                    {reg.number}
                                  </Badge>
                                  <span className="text-xs text-foreground/80">
                                    {Math.round(reg.relevanceScore * 100)}% relevant
                                  </span>
                                </div>
                              </div>
                              <h4 className="font-medium text-foreground mb-1 text-sm sm:text-base">{reg.title}</h4>
                              <p className="text-xs sm:text-sm text-foreground">{reg.description}</p>
                            </div>
                            <div className="flex items-center gap-2 sm:flex-col">
                              <CollapsibleTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="flex-1 sm:flex-none h-10 sm:h-8 sm:w-8 p-0 text-white/70 hover:text-green-400"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {isExpanded ? (
                                    <>
                                      <ChevronDown className="h-4 w-4 sm:mr-0 mr-2" />
                                      <span className="sm:hidden">Hide Details</span>
                                    </>
                                  ) : (
                                    <>
                                      <ChevronRight className="h-4 w-4 sm:mr-0 mr-2" />
                                      <span className="sm:hidden">Show Details</span>
                                    </>
                                  )}
                                </Button>
                              </CollapsibleTrigger>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 sm:flex-none h-10 sm:h-8 text-white/70 hover:text-green-400 hover:bg-green-500/20 border-green-500/30"
                                onClick={() => onRegulationSelect(reg.number)}
                              >
                                <ArrowRight className="h-4 w-4 sm:mr-0 mr-2" />
                                <span className="sm:hidden">View Full</span>
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Expanded Content - Mobile Optimized */}
                        <CollapsibleContent>
                          <div className="px-3 sm:px-4 pb-3 sm:pb-4 border-t border-border/50">
                            <div className="pt-3 space-y-2 sm:space-y-3">
                              {/* AI Explanation */}
                              {reg.aiExplanation && (
                                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                                    <span className="text-xs sm:text-sm font-medium text-blue-400">Explanation</span>
                                  </div>
                                  <p className="text-xs sm:text-sm text-blue-300 leading-relaxed">{reg.aiExplanation}</p>
                                </div>
                              )}

                              {/* Practical Notes */}
                              <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                                <div className="flex items-center gap-2 mb-2">
                                  <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-orange-400" />
                                  <span className="text-xs sm:text-sm font-medium text-orange-400">Practical Application</span>
                                </div>
                                <p className="text-xs sm:text-sm text-orange-300 leading-relaxed">
                                  This regulation applies to {reg.title.toLowerCase()}. Review the full text for specific requirements, 
                                  measurement procedures, and compliance criteria relevant to your installation.
                                </p>
                              </div>

                              {/* Action Button - Full Width on Mobile */}
                              <Button
                                size="sm"
                                onClick={() => onRegulationSelect(reg.number)}
                                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-black font-semibold"
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                View Full Regulation
                              </Button>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {/* Suggested Queries */}
          {searchResult.suggestedQueries && searchResult.suggestedQueries.length > 0 && (
            <Card className="bg-yellow-500/10 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-400">Related Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {searchResult.suggestedQueries.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handleSuggestedQuery(suggestion)}
                      className="border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/20 min-h-[44px] h-auto py-2 px-3 sm:px-4 text-xs sm:text-sm text-left justify-start whitespace-normal leading-relaxed touch-manipulation w-full"
                      disabled={isSearching}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contextual Tips */}
          {searchResult.contextualTips && searchResult.contextualTips.length > 0 && (
            <Card className="bg-orange-500/10 border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-orange-400">Practical Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {searchResult.contextualTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-foreground">
                      <Lightbulb className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default AISearchInterface;