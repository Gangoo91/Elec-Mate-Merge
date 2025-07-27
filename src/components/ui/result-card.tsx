import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ResultCardProps {
  title?: string;
  value?: string | number;
  unit?: string;
  subtitle?: string;
  status?: "success" | "warning" | "error" | "info";
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  isEmpty?: boolean;
  emptyMessage?: string;
}

const ResultCard = React.forwardRef<HTMLDivElement, ResultCardProps>(
  ({ 
    title, 
    value, 
    unit, 
    subtitle, 
    status = "info", 
    icon, 
    className, 
    children, 
    isEmpty = false,
    emptyMessage = "Enter values to see results",
    ...props 
  }, ref) => {
    const statusColors = {
      success: "text-green-400 border-green-400/20 bg-green-400/10",
      warning: "text-amber-400 border-amber-400/20 bg-amber-400/10",
      error: "text-red-400 border-red-400/20 bg-red-400/10",
      info: "text-elec-yellow border-elec-yellow/20 bg-elec-gray",
    };

    if (isEmpty) {
      return (
        <Card ref={ref} className={cn("min-h-[200px]", className)} {...props}>
          <CardContent className="flex items-center justify-center h-full p-6">
            <div className="text-center text-muted-foreground">
              {icon && <div className="flex justify-center mb-2 opacity-50">{icon}</div>}
              <p className="text-sm">{emptyMessage}</p>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card 
        ref={ref} 
        className={cn(
          "transition-all duration-300",
          statusColors[status],
          className
        )} 
        {...props}
      >
        <CardContent className="p-6">
          {children ? (
            children
          ) : (
            <div className="space-y-4">
              {title && (
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
                  {icon && <div className="text-current">{icon}</div>}
                </div>
              )}
              
              {value !== undefined && (
                <div className="text-center">
                  <div className="text-3xl font-bold text-current">
                    {typeof value === 'number' ? value.toFixed(2) : value}
                    {unit && <span className="text-lg ml-1">{unit}</span>}
                  </div>
                  {subtitle && (
                    <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
                  )}
                </div>
              )}
              
              {status === "warning" && (
                <Badge variant="outline" className="w-full justify-center border-amber-400/50 text-amber-400">
                  Review Required
                </Badge>
              )}
              
              {status === "error" && (
                <Badge variant="outline" className="w-full justify-center border-red-400/50 text-red-400">
                  Error
                </Badge>
              )}
              
              {status === "success" && (
                <Badge variant="outline" className="w-full justify-center border-green-400/50 text-green-400">
                  Compliant
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);
ResultCard.displayName = "ResultCard";

export { ResultCard };