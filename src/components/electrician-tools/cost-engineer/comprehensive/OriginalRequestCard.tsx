import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Calendar, MapPin, User } from "lucide-react";
import { format } from "date-fns";

interface OriginalRequestCardProps {
  query: string;
  projectContext?: {
    projectName?: string;
    clientInfo?: string;
    location?: string;
    additionalInfo?: string;
  };
  timestamp?: string;
}

const OriginalRequestCard = ({ query, projectContext, timestamp }: OriginalRequestCardProps) => {
  if (!query) return null;

  return (
    <Card className="mobile-card border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-elec-dark/50">
      <CardHeader className="space-y-2 pb-3">
        <CardTitle className="mobile-heading flex items-center gap-2 text-blue-400">
          <MessageSquare className="h-5 w-5" />
          Original Request
        </CardTitle>
        <CardDescription className="mobile-text">
          Your project description analyzed by AI Cost Engineer
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Project Context Meta */}
        {(projectContext?.projectName || projectContext?.clientInfo || projectContext?.location) && (
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground pb-2 border-b border-border/50">
            {projectContext.projectName && (
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-blue-400" />
                <span>{projectContext.projectName}</span>
              </div>
            )}
            {projectContext.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-blue-400" />
                <span>{projectContext.location}</span>
              </div>
            )}
            {timestamp && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-blue-400" />
                <span>{format(new Date(timestamp), 'dd MMM yyyy, HH:mm')}</span>
              </div>
            )}
          </div>
        )}

        {/* Original Query */}
        <div className="bg-elec-dark/80 p-4 rounded-lg border border-blue-500/20">
          <p className="mobile-text text-foreground/90 whitespace-pre-wrap leading-relaxed">
            {query}
          </p>
        </div>

        {/* Additional Info if present */}
        {projectContext?.additionalInfo && (
          <div className="pt-2 border-t border-border/50">
            <p className="mobile-small-text font-semibold text-muted-foreground mb-2">
              Additional Requirements:
            </p>
            <p className="mobile-small-text text-foreground/80 whitespace-pre-wrap">
              {projectContext.additionalInfo}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OriginalRequestCard;
