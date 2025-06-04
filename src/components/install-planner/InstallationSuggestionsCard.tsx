
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb, TrendingUp, Shield, DollarSign, Wrench } from "lucide-react";
import { InstallationSuggestion } from "./types";

interface InstallationSuggestionsCardProps {
  suggestions: InstallationSuggestion[];
}

const InstallationSuggestionsCard = ({ suggestions }: InstallationSuggestionsCardProps) => {
  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "cable-upgrade":
        return <TrendingUp className="h-4 w-4" />;
      case "installation-method":
        return <Wrench className="h-4 w-4" />;
      case "protective-device":
        return <Shield className="h-4 w-4" />;
      case "cost-optimization":
        return <DollarSign className="h-4 w-4" />;
      case "safety":
        return <Shield className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getSuggestionColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-500/10 border-red-500/30 text-red-200";
      case "medium":
        return "bg-amber-500/10 border-amber-500/30 text-amber-200";
      case "low":
        return "bg-blue-500/10 border-blue-500/30 text-blue-200";
      default:
        return "bg-gray-500/10 border-gray-500/30 text-gray-200";
    }
  };

  if (suggestions.length === 0) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            Installation Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <p className="text-green-400 font-medium">Excellent Design!</p>
            <p className="text-sm text-muted-foreground mt-1">
              Your installation plan meets all requirements with no additional suggestions needed.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          Installation Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <Alert key={index} className={getSuggestionColor(suggestion.impact)}>
            <div className="flex items-start gap-3">
              {getSuggestionIcon(suggestion.type)}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{suggestion.title}</h4>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      suggestion.impact === "high" ? "border-red-500/50 text-red-300" :
                      suggestion.impact === "medium" ? "border-amber-500/50 text-amber-300" :
                      "border-blue-500/50 text-blue-300"
                    }`}
                  >
                    {suggestion.impact.toUpperCase()} IMPACT
                  </Badge>
                  {suggestion.cost && (
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        suggestion.cost === "high" ? "border-red-500/50 text-red-300" :
                        suggestion.cost === "medium" ? "border-amber-500/50 text-amber-300" :
                        "border-green-500/50 text-green-300"
                      }`}
                    >
                      {suggestion.cost.toUpperCase()} COST
                    </Badge>
                  )}
                </div>
                <AlertDescription className="text-sm">
                  {suggestion.description}
                </AlertDescription>
              </div>
            </div>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
};

export default InstallationSuggestionsCard;
