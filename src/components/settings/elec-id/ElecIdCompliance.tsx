import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Calendar,
  Bell,
  ExternalLink,
  RefreshCw,
  Shield,
  XCircle,
} from "lucide-react";
import { getExpiryStatus, getDaysUntilExpiry, isExpired, isExpiringWithin } from "@/utils/elecIdGenerator";
import { getQualificationLabel } from "@/data/uk-electrician-constants";

interface ComplianceItem {
  id: string;
  name: string;
  type: "qualification" | "card" | "training";
  expiryDate: string;
  renewalUrl?: string;
  notes?: string;
}

const ElecIdCompliance = () => {
  // Mock compliance items - will be from database
  const complianceItems: ComplianceItem[] = [
    {
      id: "1",
      name: "ECS Gold Card",
      type: "card",
      expiryDate: "2026-12-15",
      renewalUrl: "https://www.ecscard.org.uk/",
    },
    {
      id: "2",
      name: "18th Edition (BS 7671)",
      type: "qualification",
      expiryDate: "2026-02-15",
      renewalUrl: "https://www.cityandguilds.com/",
    },
    {
      id: "3",
      name: "First Aid at Work",
      type: "training",
      expiryDate: "2026-06-01",
    },
    {
      id: "4",
      name: "IPAF 3a",
      type: "training",
      expiryDate: "2026-09-20",
      renewalUrl: "https://www.ipaf.org/",
    },
    {
      id: "5",
      name: "Asbestos Awareness",
      type: "training",
      expiryDate: "2025-03-01",
    },
    {
      id: "6",
      name: "PASMA Tower Scaffold",
      type: "training",
      expiryDate: "2028-05-10",
    },
  ];

  // Sort and categorize items
  const expiredItems = complianceItems.filter((item) => isExpired(item.expiryDate));
  const expiringIn30Days = complianceItems.filter(
    (item) => !isExpired(item.expiryDate) && isExpiringWithin(item.expiryDate, 30)
  );
  const expiringIn90Days = complianceItems.filter(
    (item) =>
      !isExpired(item.expiryDate) &&
      !isExpiringWithin(item.expiryDate, 30) &&
      isExpiringWithin(item.expiryDate, 90)
  );
  const validItems = complianceItems.filter(
    (item) => !isExpired(item.expiryDate) && !isExpiringWithin(item.expiryDate, 90)
  );

  const totalItems = complianceItems.length;
  const compliantItems = validItems.length + expiringIn90Days.length;
  const compliancePercentage = totalItems > 0 ? Math.round((compliantItems / totalItems) * 100) : 100;

  const getTypeIcon = (type: ComplianceItem["type"]) => {
    switch (type) {
      case "card":
        return "Card";
      case "qualification":
        return "Qualification";
      case "training":
        return "Training";
      default:
        return type;
    }
  };

  const renderComplianceCard = (item: ComplianceItem) => {
    const expiryStatus = getExpiryStatus(item.expiryDate);
    const daysUntil = getDaysUntilExpiry(item.expiryDate);

    return (
      <div
        key={item.id}
        className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">{item.name}</span>
            <Badge variant="secondary" className="text-xs">
              {getTypeIcon(item.type)}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              Expires: {new Date(item.expiryDate).toLocaleDateString("en-GB")}
            </span>
            {daysUntil > 0 && (
              <span className={`font-medium ${
                daysUntil <= 30 ? "text-red-400" : daysUntil <= 90 ? "text-orange-400" : "text-green-400"
              }`}>
                ({daysUntil} days)
              </span>
            )}
            {daysUntil < 0 && (
              <span className="text-red-400 font-medium">
                ({Math.abs(daysUntil)} days overdue)
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {item.renewalUrl && (
            <Button
              variant="outline"
              size="sm"
              className="border-white/20"
              onClick={() => window.open(item.renewalUrl, "_blank")}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Renew
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <Card className="bg-gradient-to-br from-elec-gray/50 to-elec-dark/50 border-white/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-elec-yellow/20 flex items-center justify-center">
                <Shield className="h-6 w-6 text-elec-yellow" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Compliance Status</h3>
                <p className="text-sm text-muted-foreground">
                  {compliancePercentage}% of items are compliant
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-elec-yellow">{compliantItems}/{totalItems}</div>
              <div className="text-sm text-muted-foreground">items valid</div>
            </div>
          </div>
          <Progress value={compliancePercentage} className="h-3" />
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className={`border-red-500/30 ${expiredItems.length > 0 ? "bg-red-500/10" : "bg-elec-gray/50"}`}>
          <CardContent className="p-4 text-center">
            <XCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{expiredItems.length}</p>
            <p className="text-sm text-muted-foreground">Expired</p>
          </CardContent>
        </Card>
        <Card className={`border-orange-500/30 ${expiringIn30Days.length > 0 ? "bg-orange-500/10" : "bg-elec-gray/50"}`}>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-orange-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{expiringIn30Days.length}</p>
            <p className="text-sm text-muted-foreground">Within 30 days</p>
          </CardContent>
        </Card>
        <Card className="bg-elec-gray/50 border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{expiringIn90Days.length}</p>
            <p className="text-sm text-muted-foreground">Within 90 days</p>
          </CardContent>
        </Card>
        <Card className="bg-elec-gray/50 border-green-500/30">
          <CardContent className="p-4 text-center">
            <CheckCircle2 className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{validItems.length}</p>
            <p className="text-sm text-muted-foreground">Valid</p>
          </CardContent>
        </Card>
      </div>

      {/* Expired Items */}
      {expiredItems.length > 0 && (
        <Card className="bg-red-500/10 border-red-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-red-400 flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              Expired - Action Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {expiredItems.map(renderComplianceCard)}
          </CardContent>
        </Card>
      )}

      {/* Expiring in 30 Days */}
      {expiringIn30Days.length > 0 && (
        <Card className="bg-orange-500/10 border-orange-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-orange-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Expiring Within 30 Days
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {expiringIn30Days.map(renderComplianceCard)}
          </CardContent>
        </Card>
      )}

      {/* Expiring in 90 Days */}
      {expiringIn90Days.length > 0 && (
        <Card className="bg-yellow-500/10 border-yellow-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-yellow-400 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Expiring Within 90 Days
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {expiringIn90Days.map(renderComplianceCard)}
          </CardContent>
        </Card>
      )}

      {/* Valid Items */}
      {validItems.length > 0 && (
        <Card className="bg-elec-gray/50 border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-400 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              All Current
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {validItems.map(renderComplianceCard)}
          </CardContent>
        </Card>
      )}

      {/* Notification Settings */}
      <Card className="bg-elec-gray/50 border-white/10">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-elec-yellow" />
              <div>
                <p className="font-medium text-foreground">Expiry Reminders</p>
                <p className="text-sm text-muted-foreground">
                  Get notified before your qualifications expire
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-white/20">
              Configure
            </Button>
          </div>
        </CardContent>
      </Card>

      {complianceItems.length === 0 && (
        <Card className="bg-elec-gray/50 border-white/10">
          <CardContent className="py-12 text-center">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No compliance items yet</h4>
            <p className="text-muted-foreground mb-4">
              Add qualifications with expiry dates to track your compliance status.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ElecIdCompliance;
