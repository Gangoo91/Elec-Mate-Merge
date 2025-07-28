import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SearchErrorProps {
  error: string;
  onRetry?: () => void;
}

const SearchError = ({ error, onRetry }: SearchErrorProps) => {
  const getErrorMessage = (error: string) => {
    if (error.includes('API key') || error.includes('REED_API_KEY')) {
      return {
        title: 'API Configuration Issue',
        description: 'The job search service is not properly configured. Please contact support.',
        suggestion: 'The administrator needs to configure the Reed API key in Supabase secrets.'
      };
    }
    
    if (error.includes('Network') || error.includes('fetch')) {
      return {
        title: 'Network Error',
        description: 'Unable to connect to the job search service.',
        suggestion: 'Please check your internet connection and try again.'
      };
    }
    
    if (error.includes('timeout') || error.includes('slow')) {
      return {
        title: 'Service Timeout',
        description: 'The job search is taking longer than expected.',
        suggestion: 'Please try again with different search terms.'
      };
    }
    
    return {
      title: 'Search Error',
      description: error,
      suggestion: 'Please try adjusting your search terms or try again later.'
    };
  };

  const errorInfo = getErrorMessage(error);

  return (
    <Card className="border-destructive/20 bg-destructive/5">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
          <div className="flex-1 space-y-2">
            <h3 className="font-medium text-destructive">{errorInfo.title}</h3>
            <p className="text-sm text-muted-foreground">{errorInfo.description}</p>
            <p className="text-xs text-muted-foreground italic">{errorInfo.suggestion}</p>
            {onRetry && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onRetry}
                className="mt-3"
              >
                Try Again
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchError;