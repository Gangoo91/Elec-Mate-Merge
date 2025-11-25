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
    <Card className="border-0 sm:border border-blue-500/30 rounded-none sm:rounded-xl bg-gradient-to-br from-blue-500/10 to-elec-dark/50">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-5 space-y-2 pb-3">
        <CardTitle className="text-2xl sm:text-xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-400" />
          Original Request
        </CardTitle>
        <CardDescription className="text-base sm:text-sm text-white">
          Your project description analysed by AI Cost Engineer
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6 space-y-4">
        {/* Project Context Meta */}
        {(projectContext?.projectName || projectContext?.clientInfo || projectContext?.location) && (
          <div className="flex flex-wrap gap-3 text-sm text-white pb-2 border-b border-border/50">
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
          <p className="text-base sm:text-sm text-white whitespace-pre-wrap leading-relaxed">
            {query}
          </p>
        </div>

        {/* Additional Info if present */}
        {projectContext?.additionalInfo && (
          <div className="pt-2 border-t border-border/50">
            <p className="text-base sm:text-sm font-semibold text-white mb-2">
              Additional Requirements:
            </p>
            <p className="text-base sm:text-sm text-white whitespace-pre-wrap">
              {projectContext.additionalInfo}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OriginalRequestCard;
