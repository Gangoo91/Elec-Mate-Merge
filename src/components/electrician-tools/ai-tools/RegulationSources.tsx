import { Book, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  if (!regulations || regulations.length === 0) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-purple-500/30">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-white">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Book className="h-4 w-4 text-purple-400" />
            </div>
            BS 7671 Sources
          </CardTitle>
          {searchMethod && (
            <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              {searchMethod === 'vector' ? 'AI Match' : 'Keyword'}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        {regulations.map((reg, index) => (
          <div 
            key={reg.id || index} 
            className="p-3 sm:p-4 bg-neutral-800/40 rounded-lg border-l-4 border-purple-500/50 hover:bg-neutral-800/60 transition-colors"
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
                className={`text-xs ${
                  reg.similarity > 0.8 
                    ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                    : reg.similarity > 0.6 
                    ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                }`}
              >
                {Math.round(reg.similarity * 100)}% match
              </Badge>
            </div>
            
            <h4 className="text-white font-medium text-sm sm:text-base mb-2">
              {reg.section}
            </h4>
            
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
              {reg.content}
            </p>
          </div>
        ))}
        
        <div className="pt-2 text-xs text-gray-500 flex items-center gap-1">
          <ExternalLink className="h-3 w-3" />
          <span>Sourced from BS 7671:2018 database</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegulationSources;