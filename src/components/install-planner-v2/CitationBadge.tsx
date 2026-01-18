import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface Citation {
  source: string;
  section: string;
  title: string;
  content?: string;
  relevance?: number;
  type?: 'regulation' | 'knowledge';
}

interface CitationBadgeProps {
  citation: Citation;
  index?: number;
}

export const CitationBadge = ({ citation }: CitationBadgeProps) => {
  const isRegulation = citation.type === 'regulation' || citation.source.includes('BS 7671');
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge 
          variant="outline" 
          className={`text-xs cursor-pointer active:scale-[0.98] transition-all touch-manipulation ${
            isRegulation 
              ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20' 
              : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20'
          }`}
        >
          <BookOpen className="h-3 w-3 mr-1" />
          {citation.section}
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-foreground">
              {citation.source}
            </p>
            <Badge variant="outline" className="text-[10px]">
              {citation.section}
            </Badge>
          </div>
          <p className="text-sm font-medium text-foreground">
            {citation.title}
          </p>
          {citation.content && (
            <p className="text-xs text-muted-foreground leading-relaxed">
              {citation.content}
            </p>
          )}
          {citation.relevance && (
            <p className="text-xs text-muted-foreground">
              Relevance: {(citation.relevance * 100).toFixed(0)}%
            </p>
          )}
          <Button 
            variant="link" 
            size="sm" 
            className="p-0 h-auto text-xs"
            onClick={() => window.open(`https://electrical.theiet.org/bs-7671/`, '_blank')}
          >
            View Full Regulation <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
