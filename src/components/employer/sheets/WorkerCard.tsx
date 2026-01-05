import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Check, Briefcase, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { Employee } from "@/services/employeeService";
import { JobAssignmentWithDetails } from "@/services/jobAssignmentService";

interface WorkerCardProps {
  employee: Employee;
  isSelected: boolean;
  onToggle: () => void;
  clashWarnings?: JobAssignmentWithDetails[];
  isCheckingClash?: boolean;
}

export function WorkerCard({ 
  employee, 
  isSelected, 
  onToggle, 
  clashWarnings = [],
  isCheckingClash = false
}: WorkerCardProps) {
  const hasClash = clashWarnings.length > 0;
  
  const getStatusIndicator = () => {
    if (employee.status !== 'Active') {
      return { color: 'bg-muted', pulse: false };
    }
    if (hasClash) {
      return { color: 'bg-warning', pulse: true };
    }
    return { color: 'bg-success', pulse: false };
  };
  
  const status = getStatusIndicator();

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 active:scale-[0.98] touch-manipulation border-2",
        isSelected 
          ? hasClash 
            ? "border-destructive bg-destructive/5 shadow-md ring-1 ring-destructive/30" 
            : "border-elec-yellow bg-elec-yellow/5 shadow-md"
          : hasClash && !isSelected
            ? "border-warning/50 bg-warning/5"
            : "border-transparent hover:border-muted-foreground/20 hover:bg-muted/50"
      )}
      onClick={onToggle}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Selection Indicator */}
          <div 
            className={cn(
              "shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200",
              isSelected 
                ? hasClash
                  ? "bg-warning border-warning"
                  : "bg-elec-yellow border-elec-yellow"
                : "border-muted-foreground/30"
            )}
          >
            {isSelected && (
              <Check className="h-4 w-4 text-elec-yellow-foreground animate-scale-in" />
            )}
          </div>

          {/* Avatar with Status Dot */}
          <div className="relative shrink-0">
            <Avatar className="h-14 w-14 border-2 border-background shadow-sm">
              {employee.photo_url ? (
                <AvatarImage src={employee.photo_url} alt={employee.name} />
              ) : null}
              <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow font-semibold text-lg">
                {employee.avatar_initials}
              </AvatarFallback>
            </Avatar>
            <span 
              className={cn(
                "absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-background",
                status.color,
                status.pulse && "animate-pulse"
              )}
            />
          </div>

          {/* Worker Info */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground truncate text-base">
              {employee.name}
            </p>
            <p className="text-sm text-muted-foreground truncate flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5" />
              {employee.role}
            </p>
            
            {/* Skills/Certifications Badges */}
            {employee.certifications_count > 0 && (
              <div className="flex items-center gap-1 mt-1.5">
                <Badge 
                  variant="secondary" 
                  className="text-xs px-1.5 py-0 h-5 gap-1 font-normal"
                >
                  <Award className="h-3 w-3" />
                  {employee.certifications_count} cert{employee.certifications_count > 1 ? 's' : ''}
                </Badge>
                {employee.active_jobs_count > 0 && (
                  <Badge 
                    variant="outline" 
                    className="text-xs px-1.5 py-0 h-5 font-normal text-muted-foreground"
                  >
                    {employee.active_jobs_count} active job{employee.active_jobs_count > 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Status Badge */}
          {employee.status !== 'Active' && (
            <Badge variant="outline" className="shrink-0 bg-muted text-muted-foreground">
              {employee.status}
            </Badge>
          )}
        </div>

        {/* Clash Warning - Always visible when clash exists and selected */}
        {hasClash && isSelected && (
          <div className="mt-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30 animate-fade-in">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-destructive text-sm">Schedule Conflict Detected</p>
                <p className="text-xs text-muted-foreground mt-0.5">This worker is already assigned during these dates:</p>
                <div className="text-xs text-foreground mt-2 space-y-1.5">
                  {clashWarnings.map(clash => (
                    <div key={clash.id} className="flex items-center gap-2 bg-background/50 rounded px-2 py-1.5">
                      <Briefcase className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium">{clash.job?.title}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{clash.start_date}{clash.end_date ? ` → ${clash.end_date}` : ' (ongoing)'}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-warning mt-2 font-medium">You can still assign, but this may cause scheduling issues.</p>
              </div>
            </div>
          </div>
        )}

        {/* Clash indicator when not selected */}
        {hasClash && !isSelected && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-warning">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Has conflicting assignment</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
