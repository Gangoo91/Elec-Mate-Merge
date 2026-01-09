import { MessageSquare, Calendar, MapPin, User } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

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
    <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center shadow-md"
          >
            <MessageSquare className="h-5 w-5 text-blue-400" />
          </motion.div>
          <div>
            <h3 className="text-base sm:text-lg text-white font-bold">Original Request</h3>
            <p className="text-xs sm:text-sm text-white/60">Analysed by AI Cost Engineer</p>
          </div>
        </div>
      </div>

      {/* Project Context Meta */}
      {(projectContext?.projectName || projectContext?.clientInfo || projectContext?.location) && (
        <div className="px-4 py-3 bg-white/5 flex flex-wrap gap-4">
          {projectContext.projectName && (
            <div className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs text-white/70">{projectContext.projectName}</span>
            </div>
          )}
          {projectContext.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs text-white/70">{projectContext.location}</span>
            </div>
          )}
          {timestamp && (
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs text-white/70">{format(new Date(timestamp), 'dd MMM yyyy, HH:mm')}</span>
            </div>
          )}
        </div>
      )}

      {/* Original Query */}
      <div className="p-4 sm:p-5 space-y-4">
        <div className="p-4 rounded-xl bg-black/30 border border-blue-500/20">
          <p className="text-sm sm:text-base text-white whitespace-pre-wrap leading-relaxed">
            {query}
          </p>
        </div>

        {/* Additional Info if present */}
        {projectContext?.additionalInfo && (
          <div className="pt-3 border-t border-white/5">
            <p className="text-xs sm:text-sm font-semibold text-white/70 mb-2">
              Additional Requirements:
            </p>
            <p className="text-sm sm:text-base text-white whitespace-pre-wrap">
              {projectContext.additionalInfo}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OriginalRequestCard;
