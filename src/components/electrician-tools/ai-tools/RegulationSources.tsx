import { Book, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface Regulation {
  id: string;
  regulation_number: string;
  section: string;
  content: string;
  amendment?: string;
  similarity: number;
}

interface RegulationSourcesProps {
  regulations: Regulation[];
  searchMethod?: string;
}

const RegulationSources = ({ regulations, searchMethod }: RegulationSourcesProps) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  
  if (!regulations || regulations.length === 0) {
    return null;
  }
  
  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-purple-500/30">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-foreground">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Book className="h-4 w-4 text-purple-400" />
            </div>
            BS 7671 Sources
          </CardTitle>
          {searchMethod && (
            <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              {searchMethod === 'direct' ? 'Direct match' : searchMethod === 'vector' ? 'AI Match' : 'Keyword'}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        {regulations.map((reg, index) => {
          const isExpanded = expandedIds.has(reg.id || index.toString());
          const contentLength = reg.content?.length || 0;
          const showExpandButton = contentLength > 150;
          
          return (
            <div 
              key={reg.id || index} 
              className="p-3 sm:p-4 bg-card/40 rounded-lg border-l-4 border-purple-500/50 hover:bg-card/60 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-purple-400 font-bold text-sm sm:text-base">
                    {reg.regulation_number}
                  </span>
                  {reg.amendment && (
                    <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-300 border-purple-500/20">
                      {reg.amendment}
                    </Badge>
                  )}
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs shrink-0 ${
                    searchMethod === 'direct' || reg.similarity >= 0.95
                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                      : reg.similarity > 0.8 
                      ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                      : reg.similarity > 0.6 
                      ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                  }`}
                >
                  {searchMethod === 'direct' || reg.similarity >= 0.95 ? '95%' : `${Math.round(reg.similarity * 100)}%`} match
                </Badge>
              </div>
              
              <h4 className="text-foreground font-medium text-sm sm:text-base mb-2">
                {reg.section}
              </h4>
              
              {isExpanded ? (
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                  {reg.content}
                </p>
              ) : (
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {showExpandButton ? `${reg.content.slice(0, 150)}...` : reg.content}
                </p>
              )}
              
              {showExpandButton && (
                <button 
                  onClick={() => toggleExpand(reg.id || index.toString())}
                  className="mt-2 text-purple-400 text-xs flex items-center gap-1 hover:text-purple-300 transition-colors"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="h-3 w-3" />
                      Show less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3 w-3" />
                      Show full regulation ({contentLength} chars)
                    </>
                  )}
                </button>
              )}
            </div>
          );
        })}
        
        <div className="pt-2 text-xs text-gray-500 flex items-center gap-1">
          <ExternalLink className="h-3 w-3" />
          <span>Sourced from BS 7671:2018 database</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegulationSources;