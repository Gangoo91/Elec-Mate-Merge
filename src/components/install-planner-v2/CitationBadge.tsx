import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Citation {
  number: string;
  title: string;
}

interface CitationBadgeProps {
  citations: Citation[];
}

export const CitationBadge = ({ citations }: CitationBadgeProps) => {
  if (!citations || citations.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {citations.map((citation, index) => (
        <Badge 
          key={index}
          variant="outline" 
          className="text-xs bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20 transition-colors"
        >
          <BookOpen className="h-3 w-3 mr-1" />
          Reg {citation.number}
        </Badge>
      ))}
    </div>
  );
};
