import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, FileText, ChevronRight, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface CertificateCardProps {
  title: string;
  type: "EICR" | "EIC" | "Minor Works";
  location?: string;
  client?: string;
  date: string;
  status: "Draft" | "Completed" | "In Progress" | "Submitted";
  progress?: number;
  reference?: string;
  onClick?: () => void;
  className?: string;
}

const getStatusColour = (status: string) => {
  switch (status) {
    case "Completed":
      return "border-l-success";
    case "In Progress":
      return "border-l-warning";
    case "Draft":
      return "border-l-muted-foreground";
    case "Submitted":
      return "border-l-info";
    default:
      return "border-l-border";
  }
};

const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "Completed":
      return "default";
    case "In Progress":
      return "secondary";
    case "Draft":
      return "outline";
    case "Submitted":
      return "default";
    default:
      return "outline";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "EICR":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
    case "EIC":
      return "bg-green-500/10 text-green-600 dark:text-green-400";
    case "Minor Works":
      return "bg-orange-500/10 text-orange-600 dark:text-orange-400";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function CertificateCard({
  title,
  type,
  location,
  client,
  date,
  status,
  progress,
  reference,
  onClick,
  className
}: CertificateCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 active:scale-[0.98] border-l-4 overflow-hidden",
        "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5",
        getStatusColour(status),
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-4 space-y-3">
        {/* Header - Title, Type & Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="h-4 w-4 text-primary/70 shrink-0" />
              <Badge className={cn("text-[10px]", getTypeColor(type))}>
                {type}
              </Badge>
            </div>
            <h3 className="font-semibold text-foreground truncate text-base leading-tight">
              {title}
            </h3>
            {client && (
              <p className="text-sm text-muted-foreground mt-0.5 truncate">{client}</p>
            )}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <Badge variant={getStatusVariant(status)} className="text-[10px]">
              {status}
            </Badge>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Location */}
        {location && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-primary/70" />
            <span className="truncate">{location}</span>
          </div>
        )}

        {/* Progress Bar (if in progress) */}
        {progress !== undefined && status === "In Progress" && (
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-bold text-foreground">{progress}%</span>
            </div>
            <div className="relative h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300 bg-warning"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Footer - Date & Reference */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 shrink-0 text-primary/70" />
            <span>{date}</span>
          </div>

          {reference && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="font-mono text-[10px]">{reference}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
