import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle2, Clock, ChevronRight, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  title: string;
  description?: string;
  category?: string;
  duration?: string;
  progress?: number;
  completed?: boolean;
  lessonsCount?: number;
  questionsCount?: number;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export function ModuleCard({
  title,
  description,
  category,
  duration,
  progress = 0,
  completed = false,
  lessonsCount,
  questionsCount,
  onClick,
  className,
  icon
}: ModuleCardProps) {
  const isInProgress = progress > 0 && progress < 100;

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 active:scale-[0.98] border-l-4 overflow-hidden",
        "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5",
        completed ? "border-l-success" : isInProgress ? "border-l-warning" : "border-l-border",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-4 space-y-3">
        {/* Header - Icon, Title & Category */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              {icon || <BookOpen className="h-4 w-4 text-primary/70 shrink-0" />}
              {category && (
                <Badge variant="outline" className="text-[10px]">
                  {category}
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-foreground truncate text-base leading-tight">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {completed ? (
              <CheckCircle2 className="h-5 w-5 text-success" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {/* Progress Bar (if started) */}
        {isInProgress && (
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

        {/* Footer - Metadata */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs">
          <div className="flex items-center gap-3 text-muted-foreground">
            {duration && (
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 shrink-0 text-primary/70" />
                <span>{duration}</span>
              </div>
            )}
            {lessonsCount !== undefined && (
              <div className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5 shrink-0 text-primary/70" />
                <span>{lessonsCount} lessons</span>
              </div>
            )}
          </div>

          {questionsCount !== undefined && (
            <div className="flex items-center gap-1 text-primary font-bold">
              <Award className="h-3.5 w-3.5" />
              <span>{questionsCount} Q</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
