import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface SVGDiagramRendererProps {
  svgContent: string;
  title?: string;
  isLoading?: boolean;
}

export const SVGDiagramRenderer = ({ svgContent, title, isLoading }: SVGDiagramRendererProps) => {
  if (isLoading) {
    return (
      <Card className="p-4 bg-muted/30">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span>Generating circuit diagram...</span>
        </div>
      </Card>
    );
  }

  if (!svgContent || svgContent.trim() === '') {
    return (
      <Card className="p-4 bg-muted/30 border-amber-500/20">
        <div className="flex items-center gap-2 text-sm text-amber-600">
          <AlertCircle className="h-4 w-4" />
          <span>No diagram available</span>
        </div>
      </Card>
    );
  }

  const isValidSVG = svgContent.includes('<svg') && svgContent.includes('</svg>');

  if (!isValidSVG) {
    return (
      <Card className="p-4 bg-destructive/10 border-destructive/20">
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span>Invalid diagram format</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-background">
      {title && (
        <div className="flex items-center gap-2 mb-3 pb-2 border-b">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <h4 className="text-sm font-medium">{title}</h4>
        </div>
      )}
      <div 
        className="overflow-auto max-h-96"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </Card>
  );
};
