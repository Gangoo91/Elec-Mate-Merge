import { Badge } from "@/components/ui/badge";
import { BookOpen, AlertTriangle, CheckCircle2 } from "lucide-react";

interface RAGQualityBadgeProps {
  gn3ProceduresFound: number;
  regulationsFound: number;
}

export function RAGQualityBadge({ gn3ProceduresFound, regulationsFound }: RAGQualityBadgeProps) {
  const totalSources = gn3ProceduresFound + regulationsFound;
  
  let quality: 'high' | 'medium' | 'low' = 'low';
  let icon = <AlertTriangle className="h-4 w-4" />;
  let message = '';
  let colorClasses = '';
  
  if (gn3ProceduresFound >= 8 && regulationsFound >= 6) {
    quality = 'high';
    icon = <CheckCircle2 className="h-4 w-4" />;
    message = 'Excellent - Using comprehensive GN3 practical procedures';
    colorClasses = 'bg-green-500/20 text-green-300 border-green-500/40';
  } else if (gn3ProceduresFound >= 3) {
    quality = 'medium';
    icon = <BookOpen className="h-4 w-4" />;
    message = 'Good - Using GN3 data with regulation backup';
    colorClasses = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
  } else {
    quality = 'low';
    icon = <AlertTriangle className="h-4 w-4" />;
    message = 'Limited - Insufficient GN3 practical data available';
    colorClasses = 'bg-red-500/20 text-red-300 border-red-500/40';
  }
  
  return (
    <div className="space-y-2 p-4 bg-elec-gray border border-elec-yellow/20 rounded-lg">
      <Badge className={`${colorClasses} flex items-center gap-2 py-2 px-3 w-full sm:w-auto justify-center sm:justify-start`}>
        {icon}
        <span className="font-semibold">RAG Quality: {quality.toUpperCase()}</span>
      </Badge>
      <p className="text-xs text-muted-foreground text-left">{message}</p>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="text-base">📘</span> GN3 Procedures: <span className="font-semibold text-elec-light">{gn3ProceduresFound}</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="text-base">📜</span> BS 7671 Regulations: <span className="font-semibold text-elec-light">{regulationsFound}</span>
        </span>
      </div>
    </div>
  );
}
