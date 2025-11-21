import { useState } from "react";
import { ZoomIn, X, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface AnalyzedImageViewerProps {
  imageUrl: string;
  timestamp?: string;
  onDownload?: () => void;
}

export const AnalyzedImageViewer = ({ imageUrl, timestamp, onDownload }: AnalyzedImageViewerProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <Card className="overflow-hidden bg-elec-card border-elec-yellow/10">
        <div className="relative group">
          <img 
            src={imageUrl} 
            alt="Analyzed installation" 
            className="w-full h-auto max-h-[300px] sm:max-h-[400px] object-contain bg-elec-dark"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-3 left-3 right-3 flex gap-2">
              <Button 
                size="sm" 
                variant="secondary"
                onClick={() => setIsZoomed(true)}
                className="flex-1 touch-target"
              >
                <ZoomIn className="h-4 w-4 mr-2" />
                View Full Size
              </Button>
              {onDownload && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={onDownload}
                  className="touch-target"
                >
                  <Download className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
        {timestamp && (
          <div className="px-4 py-2 bg-muted/20 border-t border-border/40">
            <p className="text-xs text-muted-foreground">
              Analyzed on {new Date(timestamp).toLocaleString('en-GB', { 
                dateStyle: 'medium', 
                timeStyle: 'short' 
              })}
            </p>
          </div>
        )}
      </Card>

      <Dialog open={isZoomed} onOpenChange={setIsZoomed}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-background"
              onClick={() => setIsZoomed(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <img 
              src={imageUrl} 
              alt="Analyzed installation - full size" 
              className="w-full h-auto max-h-[90vh] object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
