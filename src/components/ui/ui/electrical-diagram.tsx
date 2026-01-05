import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Maximize2, Download, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface ElectricalDiagramProps {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  className?: string;
  showZoom?: boolean;
  showDownload?: boolean;
}

export const ElectricalDiagram = ({
  src,
  alt,
  title,
  caption,
  className,
  showZoom = true,
  showDownload = false
}: ElectricalDiagramProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `${alt.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.click();
  };

  if (imageError) {
    return (
      <div className="bg-card/50 border border-border rounded-lg p-6">
        <div className="flex items-center justify-center space-x-2 text-amber-400">
          <AlertTriangle className="h-5 w-5" />
          <span className="text-sm font-medium">Diagram temporarily unavailable</span>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">{alt}</p>
      </div>
    );
  }

  return (
    <div className={cn("bg-card/50 border border-border rounded-lg overflow-hidden", className)}>
      {title && (
        <div className="px-4 py-3 border-b border-border">
          <h4 className="font-medium text-foreground">{title}</h4>
        </div>
      )}
      
      <div className="relative group">
        <img
          src={src}
          alt={alt}
          onError={handleImageError}
          onLoad={handleImageLoad}
          className={cn(
            "w-full h-auto transition-opacity duration-200",
            !imageLoaded && "opacity-0"
          )}
        />
        
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-card">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {(showZoom || showDownload) && imageLoaded && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
            {showZoom && (
              <Dialog>
                <DialogTrigger asChild>
                  <button className="p-2 bg-black/50 hover:bg-black/70 rounded-md transition-colors">
                    <Maximize2 className="h-4 w-4 text-foreground" />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl w-full">
                  <img src={src} alt={alt} className="w-full h-auto" />
                  {caption && (
                    <p className="text-sm text-muted-foreground mt-2">{caption}</p>
                  )}
                </DialogContent>
              </Dialog>
            )}
            
            {showDownload && (
              <button
                onClick={handleDownload}
                className="p-2 bg-black/50 hover:bg-black/70 rounded-md transition-colors"
              >
                <Download className="h-4 w-4 text-foreground" />
              </button>
            )}
          </div>
        )}
      </div>

      {caption && (
        <div className="px-4 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground">{caption}</p>
        </div>
      )}
    </div>
  );
};