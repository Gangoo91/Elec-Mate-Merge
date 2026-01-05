import { useState } from "react";
import { ChevronDown, ChevronUp, Loader, Package, TestTube, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface DrillDownSectionProps {
  type: 'installation' | 'testing' | 'design';
  query: string;
  available: boolean;
}

const DrillDownSection = ({ type, query, available }: DrillDownSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<any[]>([]);

  const config = {
    installation: {
      icon: Package,
      title: "Installation Guidance",
      color: "bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20",
      textColor: "text-blue-400",
    },
    testing: {
      icon: TestTube,
      title: "Testing Procedures",
      color: "bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20",
      textColor: "text-purple-400",
    },
    design: {
      icon: Ruler,
      title: "Design Calculations",
      color: "bg-green-500/10 border-green-500/30 hover:bg-green-500/20",
      textColor: "text-green-400",
    },
  };

  const { icon: Icon, title, color, textColor } = config[type];

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('multi-source-rag-search', {
        body: { query, matchThreshold: 0.4, matchCount: 5 }
      });

      if (error) throw error;

      // Get the appropriate content based on type
      let relevantContent: any[] = [];
      if (type === 'installation' && data.installation_content) {
        relevantContent = data.installation_content;
      } else if (type === 'testing' && data.testing_content) {
        relevantContent = data.testing_content;
      } else if (type === 'design' && data.design_content) {
        relevantContent = data.design_content;
      }

      setContent(relevantContent);
      setIsExpanded(true);
    } catch (error: any) {
      console.error(`Error fetching ${type} content:`, error);
      toast({
        title: "Error",
        description: `Failed to load ${type} content`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else if (content.length === 0) {
      fetchContent();
    } else {
      setIsExpanded(true);
    }
  };

  if (!available) return null;

  return (
    <Card className={`border ${color} transition-all duration-200`}>
      <Button
        variant="ghost"
        className="w-full p-4 flex items-center justify-between hover:bg-transparent"
        onClick={handleToggle}
        disabled={isLoading}
      >
        <div className="flex items-center gap-3">
          <Icon className={`h-5 w-5 ${textColor}`} />
          <span className={`font-semibold ${textColor}`}>{title}</span>
          {isLoading && <Loader className="h-4 w-4 animate-spin text-muted-foreground" />}
        </div>
        {!isLoading && (
          isExpanded ? 
            <ChevronUp className={`h-5 w-5 ${textColor}`} /> : 
            <ChevronDown className={`h-5 w-5 ${textColor}`} />
        )}
      </Button>

      {isExpanded && content.length > 0 && (
        <div className="px-4 pb-4 space-y-4">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />
          
          {content.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="font-semibold text-foreground text-base">{item.topic}</h4>
              <p className="text-neutral-300 leading-relaxed text-sm">
                {item.content}
              </p>
              {item.source && (
                <p className="text-xs text-neutral-500 italic">
                  Source: {item.source}
                </p>
              )}
              {idx < content.length - 1 && (
                <div className="h-px bg-white/10 mt-4" />
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default DrillDownSection;
