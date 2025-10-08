import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, RefreshCw, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ErrorAnalysisCardProps {
  onRetry: () => void;
  possibleCauses?: string[];
}

const ErrorAnalysisCard = ({ onRetry, possibleCauses = [] }: ErrorAnalysisCardProps) => {
  
  const handleContactSupport = () => {
    navigator.clipboard.writeText("support@example.com");
    toast({
      title: "Email copied",
      description: "Support email copied to clipboard",
      variant: "success"
    });
  };

  return (
    <Card className="border-l-4 border-l-amber-500 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg sm:text-xl text-amber-900 dark:text-amber-100 mb-2">
              Analysis Needs Your Help
            </CardTitle>
            <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
              The AI couldn't process this image properly. This usually happens with complex installations or unclear photos.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Possible Causes */}
        {possibleCauses.length > 0 && (
          <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 space-y-2">
            <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-100 flex items-center gap-2">
              💡 Common Causes
            </h4>
            <ul className="space-y-1.5 text-sm text-amber-700 dark:text-amber-300">
              {possibleCauses.map((cause, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>{cause}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Helpful Tips */}
        <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/50 rounded-lg p-4 space-y-2">
          <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100">
            ⚡ Quick Tips to Improve Results
          </h4>
          <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✓</span>
              <span>Ensure good lighting - avoid shadows and glare</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✓</span>
              <span>Focus on one area at a time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✓</span>
              <span>Use Quick mode for faster processing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✓</span>
              <span>Try with fewer images first</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button 
            onClick={onRetry} 
            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white touch-manipulation"
            size="lg"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again with Quick Mode
          </Button>
          <Button 
            onClick={handleContactSupport}
            variant="outline"
            className="flex-1 border-amber-300 dark:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/30 touch-manipulation"
            size="lg"
          >
            <Mail className="h-4 w-4 mr-2" />
            Contact Support
          </Button>
        </div>

        {/* Technical Details Badge */}
        <div className="pt-2">
          <Badge variant="outline" className="text-xs text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-700">
            Error Code: PARSE_FAILED
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ErrorAnalysisCard;
