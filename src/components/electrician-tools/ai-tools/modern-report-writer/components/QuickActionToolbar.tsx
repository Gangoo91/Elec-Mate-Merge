import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  Download, 
  Share2, 
  Eye, 
  Copy,
  RotateCcw,
  Zap,
  FileText,
  Clock
} from "lucide-react";

interface QuickActionToolbarProps {
  onSave?: () => void;
  onPreview?: () => void;
  onExport?: () => void;
  onShare?: () => void;
  onReset?: () => void;
  onCopyToClipboard?: () => void;
  showProgress?: boolean;
  progressValue?: number;
  lastSaved?: string;
  className?: string;
}

const QuickActionToolbar: React.FC<QuickActionToolbarProps> = ({
  onSave,
  onPreview,
  onExport,
  onShare,
  onReset,
  onCopyToClipboard,
  showProgress = false,
  progressValue = 0,
  lastSaved,
  className = ""
}) => {
  return (
    <div className={`sticky top-4 z-10 ${className}`}>
      <div className="bg-elec-card/95 backdrop-blur-sm border border-elec-yellow/30 rounded-lg p-4 shadow-lg">
        <div className="flex flex-col gap-4">
          {/* Primary Actions */}
          <div className="flex flex-wrap gap-2">
            {onSave && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSave}
                className="border-green-500/30 text-green-400 hover:bg-green-500/10"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
            )}
            
            {onPreview && (
              <Button
                variant="outline"
                size="sm"
                onClick={onPreview}
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            )}
            
            {onExport && (
              <Button
                size="sm"
                onClick={onExport}
                className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            )}
          </div>

          {/* Secondary Actions */}
          <div className="flex flex-wrap gap-2">
            {onShare && (
              <Button
                variant="outline"
                size="sm"
                onClick={onShare}
                className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            )}
            
            {onCopyToClipboard && (
              <Button
                variant="outline"
                size="sm"
                onClick={onCopyToClipboard}
                className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
            )}
            
            {onReset && (
              <Button
                variant="outline"
                size="sm"
                onClick={onReset}
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            )}
          </div>

          {/* Status Indicators */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              {showProgress && (
                <>
                  <Zap className="h-4 w-4 text-elec-yellow" />
                  <Badge variant="outline" className="text-elec-yellow border-elec-yellow/50">
                    {Math.round(progressValue)}% Complete
                  </Badge>
                </>
              )}
            </div>
            
            {lastSaved && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span className="text-xs">
                  Saved: {new Date(lastSaved).toLocaleTimeString()}
                </span>
              </div>
            )}
          </div>

          {/* Mobile Hint */}
          <div className="lg:hidden text-xs text-muted-foreground text-center">
            Swipe between steps or use navigation buttons
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionToolbar;