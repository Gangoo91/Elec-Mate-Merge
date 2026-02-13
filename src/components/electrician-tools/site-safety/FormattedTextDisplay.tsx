import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";

interface FormattedTextDisplayProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export const FormattedTextDisplay = ({ 
  value, 
  onChange, 
  placeholder = "Enter text...",
  label 
}: FormattedTextDisplayProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const renderFormattedContent = (text: string) => {
    if (!text) return null;

    const lines = text.split('\n');
    const elements: JSX.Element[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Empty line - add spacing
      if (!line.trim()) {
        elements.push(<div key={`space-${key++}`} className="h-2" />);
        continue;
      }

      // Detect list item with bullet (* or -)
      const bulletMatch = line.match(/^(\s*)[*-]\s+(.+)$/);
      if (bulletMatch) {
        const indent = bulletMatch[1].length;
        const content = bulletMatch[2];
        
        elements.push(
          <div 
            key={`item-${key++}`} 
            className="flex gap-2 items-start text-left"
            style={{ marginLeft: `${Math.max(indent * 0.5, 0.5)}rem` }}
          >
            <span className="text-primary mt-0.5 flex-shrink-0">•</span>
            <span className="text-sm text-foreground" dangerouslySetInnerHTML={{ 
              __html: processInlineFormatting(content) 
            }} />
          </div>
        );
        continue;
      }

      // Regular text line
      elements.push(
        <p 
          key={`line-${key++}`} 
          className="text-sm text-foreground text-left"
          dangerouslySetInnerHTML={{ __html: processInlineFormatting(line) }}
        />
      );
    }

    return elements;
  };

  const processInlineFormatting = (text: string): string => {
    // Bold **text**
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="text-elec-light font-semibold">$1</strong>');
    
    // Italic *text* (but not if it's part of **)
    text = text.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em class="text-elec-yellow/80">$1</em>');
    
    // Links [text](url)
    text = text.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g, 
      '<a href="$2" class="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    return text;
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[200px] font-mono text-sm"
        />
        <Button
          onClick={() => setIsEditing(false)}
          variant="outline"
          size="sm"
          className="w-full"
        >
          Done Editing
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Mobile edit button - always visible at top */}
      <div className="sm:hidden mb-2 flex justify-end">
        <Button
          onClick={() => setIsEditing(true)}
          variant="outline"
          size="sm"
          className="text-xs"
        >
          <Pencil className="h-3 w-3 mr-1" />
          Edit
        </Button>
      </div>
      
      <div className="bg-card border border-primary/20 rounded-lg p-4 pr-16 sm:pr-4 min-h-[100px] relative group">
        {value ? (
          <div className="space-y-2">
            {renderFormattedContent(value)}
          </div>
        ) : (
          <p className="text-sm text-white italic">{placeholder}</p>
        )}
        
        {/* Desktop hover edit button */}
        <Button
          onClick={() => setIsEditing(true)}
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 z-10 hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
        >
          <Pencil className="h-3 w-3 mr-1" />
          Edit
        </Button>
      </div>
    </div>
  );
};
