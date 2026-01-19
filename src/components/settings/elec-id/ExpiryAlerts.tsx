import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Clock,
  Calendar,
  Bell,
  BellOff,
  ChevronRight,
  RefreshCw,
  CheckCircle2,
  XCircle,
  FileText,
  CreditCard,
  GraduationCap,
  Shield,
  Car,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, differenceInDays, addDays, isPast } from "date-fns";

interface ExpiringDocument {
  id: string;
  type: "ecs_card" | "qualification" | "training" | "cscs" | "driving_licence" | "insurance";
  name: string;
  expiryDate: Date;
  renewalUrl?: string;
  notificationsEnabled: boolean;
}

interface ExpiryAlertsProps {
  documents: ExpiringDocument[];
  onRenewClick?: (documentId: string) => void;
  onToggleNotification?: (documentId: string, enabled: boolean) => void;
  className?: string;
}

const DOCUMENT_ICONS: Record<string, typeof FileText> = {
  ecs_card: CreditCard,
  qualification: GraduationCap,
  training: Shield,
  cscs: Shield,
  driving_licence: Car,
  insurance: Shield,
};

const DOCUMENT_LABELS: Record<string, string> = {
  ecs_card: "ECS Card",
  qualification: "Qualification",
  training: "Training Certificate",
  cscs: "CSCS Card",
  driving_licence: "Driving Licence",
  insurance: "Insurance",
};

function getExpiryStatus(expiryDate: Date): {
  status: "expired" | "critical" | "warning" | "ok";
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
} {
  const daysUntil = differenceInDays(expiryDate, new Date());

  if (isPast(expiryDate)) {
    return {
      status: "expired",
      label: "Expired",
      color: "text-red-500",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500/30",
    };
  }

  if (daysUntil <= 30) {
    return {
      status: "critical",
      label: `${daysUntil} days`,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
    };
  }

  if (daysUntil <= 90) {
    return {
      status: "warning",
      label: `${daysUntil} days`,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    };
  }

  return {
    status: "ok",
    label: `${daysUntil} days`,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
  };
}

export function ExpiryAlerts({
  documents,
  onRenewClick,
  onToggleNotification,
  className,
}: ExpiryAlertsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Sort documents by expiry date (soonest first)
  const sortedDocuments = [...documents].sort(
    (a, b) => a.expiryDate.getTime() - b.expiryDate.getTime()
  );

  // Filter to show only documents expiring within 6 months or already expired
  const alertDocuments = sortedDocuments.filter((doc) => {
    const daysUntil = differenceInDays(doc.expiryDate, new Date());
    return daysUntil <= 180 || isPast(doc.expiryDate);
  });

  const expiredCount = alertDocuments.filter((doc) =>
    isPast(doc.expiryDate)
  ).length;
  const criticalCount = alertDocuments.filter((doc) => {
    const days = differenceInDays(doc.expiryDate, new Date());
    return days > 0 && days <= 30;
  }).length;

  if (alertDocuments.length === 0) {
    return null; // Don't show card if no alerts
  }

  return (
    <Card className={cn("border-border", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "p-2 rounded-lg",
                expiredCount > 0
                  ? "bg-red-500/20"
                  : criticalCount > 0
                  ? "bg-amber-500/20"
                  : "bg-green-500/20"
              )}
            >
              {expiredCount > 0 ? (
                <XCircle className="h-5 w-5 text-red-500" />
              ) : criticalCount > 0 ? (
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              ) : (
                <Clock className="h-5 w-5 text-green-500" />
              )}
            </div>
            <div>
              <CardTitle className="text-lg">Document Renewals</CardTitle>
              <p className="text-xs text-foreground/70">
                {expiredCount > 0
                  ? `${expiredCount} expired document${expiredCount > 1 ? "s" : ""}`
                  : criticalCount > 0
                  ? `${criticalCount} document${criticalCount > 1 ? "s" : ""} expiring soon`
                  : "All documents valid"}
              </p>
            </div>
          </div>
          {(expiredCount > 0 || criticalCount > 0) && (
            <Badge
              variant="outline"
              className={cn(
                "border-0",
                expiredCount > 0
                  ? "bg-red-500/20 text-red-400"
                  : "bg-amber-500/20 text-amber-400"
              )}
            >
              Action Required
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {alertDocuments.map((doc) => {
          const DocIcon = DOCUMENT_ICONS[doc.type] || FileText;
          const expiry = getExpiryStatus(doc.expiryDate);
          const isExpanded = expandedId === doc.id;

          return (
            <div
              key={doc.id}
              className={cn(
                "rounded-xl border transition-all duration-200",
                expiry.bgColor,
                expiry.borderColor
              )}
            >
              {/* Main row */}
              <div
                className="flex items-center gap-3 p-3 cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : doc.id)}
              >
                <div className={cn("p-2 rounded-lg bg-white/10")}>
                  <DocIcon className={cn("h-4 w-4", expiry.color)} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{doc.name}</p>
                  <p className="text-xs text-foreground/70">
                    {DOCUMENT_LABELS[doc.type]}
                  </p>
                </div>

                {/* Countdown */}
                <div className="text-right">
                  <div className="flex items-center gap-1.5">
                    {expiry.status === "expired" ? (
                      <XCircle className={cn("h-4 w-4", expiry.color)} />
                    ) : (
                      <Clock className={cn("h-4 w-4", expiry.color)} />
                    )}
                    <span className={cn("font-bold text-sm", expiry.color)}>
                      {expiry.label}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/70">
                    {format(doc.expiryDate, "dd MMM yyyy")}
                  </p>
                </div>

                <ChevronRight
                  className={cn(
                    "h-4 w-4 text-foreground/70 transition-transform",
                    isExpanded && "rotate-90"
                  )}
                />
              </div>

              {/* Expanded actions */}
              {isExpanded && (
                <div className="px-3 pb-3 pt-0 space-y-2 border-t border-white/10">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2 text-sm text-foreground/70">
                      <Bell className="h-4 w-4" />
                      <span>Renewal reminders</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-8",
                        doc.notificationsEnabled
                          ? "text-green-500"
                          : "text-foreground/70"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleNotification?.(doc.id, !doc.notificationsEnabled);
                      }}
                    >
                      {doc.notificationsEnabled ? (
                        <>
                          <Bell className="h-4 w-4 mr-1" />
                          On
                        </>
                      ) : (
                        <>
                          <BellOff className="h-4 w-4 mr-1" />
                          Off
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-10 border-white/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRenewClick?.(doc.id);
                      }}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Update Document
                    </Button>
                    {doc.renewalUrl && (
                      <Button
                        size="sm"
                        className="flex-1 h-10 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(doc.renewalUrl, "_blank");
                        }}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Renewal
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Summary footer */}
        <div className="flex items-center justify-between pt-2 text-xs text-foreground/70">
          <span>
            {documents.length - alertDocuments.length} document
            {documents.length - alertDocuments.length !== 1 ? "s" : ""} up to date
          </span>
          <button className="text-elec-yellow hover:text-elec-yellow/80 flex items-center gap-1">
            View all <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ExpiryAlerts;
