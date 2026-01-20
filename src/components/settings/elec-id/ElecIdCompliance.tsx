import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Calendar,
  Bell,
  RefreshCw,
  Shield,
  XCircle,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { getExpiryStatus, getDaysUntilExpiry, isExpired, isExpiringWithin } from "@/utils/elecIdGenerator";
import { useElecIdProfile } from "@/hooks/useElecIdProfile";
import { getQualificationsByProfileId, getTrainingByProfileId } from "@/services/elecIdService";
import { getECSCardType } from "@/data/uk-electrician-constants";
import { toast } from "@/hooks/use-toast";

interface ComplianceItem {
  id: string;
  name: string;
  type: "qualification" | "card" | "training";
  expiryDate: string;
  renewalUrl?: string;
  notes?: string;
}

// Skeleton loading component
const ComplianceSkeleton = () => (
  <div className="space-y-5">
    {/* Hero card skeleton */}
    <Skeleton className="h-40 rounded-2xl bg-white/[0.06]" />

    {/* Quick stats skeleton */}
    <div className="grid grid-cols-4 gap-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-20 rounded-xl bg-white/[0.06]" />
      ))}
    </div>

    {/* Items skeleton */}
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-20 rounded-xl bg-white/[0.06]" />
      ))}
    </div>
  </div>
);

const ElecIdCompliance = () => {
  const { profile, isLoading: profileLoading } = useElecIdProfile();
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load compliance items from backend
  const loadComplianceItems = useCallback(async () => {
    if (!profile?.id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const items: ComplianceItem[] = [];

      // Add ECS Card if it has an expiry date
      if (profile.ecs_expiry_date) {
        const ecsCard = getECSCardType(profile.ecs_card_type || "gold");
        items.push({
          id: "ecs-card",
          name: ecsCard ? `ECS ${ecsCard.label}` : "ECS Card",
          type: "card",
          expiryDate: profile.ecs_expiry_date,
          renewalUrl: "https://www.ecscard.org.uk/",
        });
      }

      // Fetch qualifications with expiry dates
      const qualifications = await getQualificationsByProfileId(profile.id);
      qualifications
        .filter(q => q.expiry_date)
        .forEach(q => {
          items.push({
            id: `qual-${q.id}`,
            name: q.qualification_name,
            type: "qualification",
            expiryDate: q.expiry_date!,
            renewalUrl: q.awarding_body ? `https://www.google.com/search?q=${encodeURIComponent(q.awarding_body + ' renewal')}` : undefined,
          });
        });

      // Fetch training with expiry dates
      const training = await getTrainingByProfileId(profile.id);
      training
        .filter(t => t.expiry_date)
        .forEach(t => {
          items.push({
            id: `training-${t.id}`,
            name: t.training_name,
            type: "training",
            expiryDate: t.expiry_date!,
            renewalUrl: t.provider ? `https://www.google.com/search?q=${encodeURIComponent(t.provider + ' ' + t.training_name + ' renewal')}` : undefined,
          });
        });

      setComplianceItems(items);
    } catch (err) {
      console.error("Error loading compliance items:", err);
      setError("Failed to load compliance data");
    } finally {
      setIsLoading(false);
    }
  }, [profile?.id, profile?.ecs_expiry_date, profile?.ecs_card_type]);

  useEffect(() => {
    if (!profileLoading) {
      loadComplianceItems();
    }
  }, [profileLoading, loadComplianceItems]);

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

  const getTypeConfig = (type: ComplianceItem["type"]) => {
    switch (type) {
      case "card":
        return { label: "Card", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" };
      case "qualification":
        return { label: "Qual", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" };
      case "training":
        return { label: "Training", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" };
      default:
        return { label: type, color: "bg-white/10 text-white/60 border-white/20" };
    }
  };

  const getStatusConfig = (daysUntil: number) => {
    if (daysUntil < 0) {
      return {
        bg: "bg-red-500/10",
        border: "border-red-500/30",
        text: "text-red-400",
        icon: XCircle,
        label: `${Math.abs(daysUntil)} days overdue`,
      };
    }
    if (daysUntil <= 30) {
      return {
        bg: "bg-orange-500/10",
        border: "border-orange-500/30",
        text: "text-orange-400",
        icon: AlertTriangle,
        label: `${daysUntil} days left`,
      };
    }
    if (daysUntil <= 90) {
      return {
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/30",
        text: "text-yellow-400",
        icon: Clock,
        label: `${daysUntil} days left`,
      };
    }
    return {
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      text: "text-green-400",
      icon: CheckCircle2,
      label: `${daysUntil} days`,
    };
  };

  const renderComplianceCard = (item: ComplianceItem, index: number) => {
    const daysUntil = getDaysUntilExpiry(item.expiryDate);
    const status = getStatusConfig(daysUntil);
    const typeConfig = getTypeConfig(item.type);
    const StatusIcon = status.icon;

    return (
      <motion.button
        key={item.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        onClick={() => item.renewalUrl && window.open(item.renewalUrl, "_blank")}
        className={cn(
          "w-full p-4 rounded-2xl border text-left transition-all touch-manipulation",
          status.bg,
          status.border,
          item.renewalUrl && "active:scale-[0.99] hover:brightness-110"
        )}
      >
        <div className="flex items-center gap-3">
          {/* Status icon */}
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
            status.bg
          )}>
            <StatusIcon className={cn("w-6 h-6", status.text)} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-foreground truncate">{item.name}</h4>
              <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0", typeConfig.color)}>
                {typeConfig.label}
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-foreground/70 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(item.expiryDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span className={cn("font-medium", status.text)}>
                {status.label}
              </span>
            </div>
          </div>

          {/* Renew action */}
          {item.renewalUrl ? (
            <div className="flex items-center gap-1 text-foreground/70">
              <RefreshCw className="h-4 w-4" />
              <ChevronRight className="h-4 w-4" />
            </div>
          ) : (
            <ChevronRight className="h-5 w-5 text-foreground/70/50" />
          )}
        </div>
      </motion.button>
    );
  };

  const allClear = expiredItems.length === 0 && expiringIn30Days.length === 0;

  // Show loading skeleton
  if (isLoading || profileLoading) {
    return <ComplianceSkeleton />;
  }

  // Show error state
  if (error) {
    return (
      <div className="py-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500/10 flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-red-400" />
        </div>
        <h4 className="text-lg font-medium text-foreground mb-2">Failed to load compliance data</h4>
        <p className="text-foreground/70 mb-4">{error}</p>
        <Button onClick={loadComplianceItems} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Compliance Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.08] p-5"
      >
        {/* Background glow */}
        <div className={cn(
          "absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30",
          allClear ? "bg-green-500" : expiredItems.length > 0 ? "bg-red-500" : "bg-orange-500"
        )} />

        <div className="relative flex items-center justify-between">
          {/* Left side - Info */}
          <div className="flex items-center gap-4">
            {/* Circular Progress */}
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                {/* Background circle */}
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="3"
                />
                {/* Progress circle */}
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={allClear ? "#22c55e" : expiredItems.length > 0 ? "#ef4444" : "#f59e0b"}
                  strokeWidth="3"
                  strokeDasharray={`${compliancePercentage}, 100`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={cn(
                  "text-xl font-bold",
                  allClear ? "text-green-400" : expiredItems.length > 0 ? "text-red-400" : "text-orange-400"
                )}>
                  {compliancePercentage}%
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {allClear ? "All Clear" : expiredItems.length > 0 ? "Action Required" : "Attention Needed"}
              </h3>
              <p className="text-sm text-foreground/70">
                {compliantItems} of {totalItems} items valid
              </p>
              {!allClear && (
                <p className={cn(
                  "text-xs mt-1 font-medium",
                  expiredItems.length > 0 ? "text-red-400" : "text-orange-400"
                )}>
                  {expiredItems.length > 0
                    ? `${expiredItems.length} expired`
                    : `${expiringIn30Days.length} expiring soon`}
                </p>
              )}
            </div>
          </div>

          {/* Right side - Icon */}
          <div className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center",
            allClear
              ? "bg-green-500/20"
              : expiredItems.length > 0
              ? "bg-red-500/20"
              : "bg-orange-500/20"
          )}>
            {allClear ? (
              <Sparkles className="w-7 h-7 text-green-400" />
            ) : expiredItems.length > 0 ? (
              <XCircle className="w-7 h-7 text-red-400" />
            ) : (
              <AlertTriangle className="w-7 h-7 text-orange-400" />
            )}
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { count: expiredItems.length, label: "Expired", color: "red", icon: XCircle },
          { count: expiringIn30Days.length, label: "30 days", color: "orange", icon: AlertTriangle },
          { count: expiringIn90Days.length, label: "90 days", color: "yellow", icon: Clock },
          { count: validItems.length, label: "Valid", color: "green", icon: CheckCircle2 },
        ].map((stat, index) => {
          const colorClasses = {
            red: stat.count > 0 ? "bg-red-500/10 border-red-500/30" : "bg-white/[0.02] border-white/[0.04]",
            orange: stat.count > 0 ? "bg-orange-500/10 border-orange-500/30" : "bg-white/[0.02] border-white/[0.04]",
            yellow: stat.count > 0 ? "bg-yellow-500/10 border-yellow-500/30" : "bg-white/[0.02] border-white/[0.04]",
            green: stat.count > 0 ? "bg-green-500/10 border-green-500/30" : "bg-white/[0.02] border-white/[0.04]",
          };
          const textClasses = {
            red: stat.count > 0 ? "text-red-400" : "text-foreground/70/50",
            orange: stat.count > 0 ? "text-orange-400" : "text-foreground/70/50",
            yellow: stat.count > 0 ? "text-yellow-400" : "text-foreground/70/50",
            green: stat.count > 0 ? "text-green-400" : "text-foreground/70/50",
          };
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "text-center p-3 rounded-xl border transition-all",
                colorClasses[stat.color as keyof typeof colorClasses]
              )}
            >
              <Icon className={cn("h-5 w-5 mx-auto mb-1", textClasses[stat.color as keyof typeof textClasses])} />
              <div className={cn("text-lg font-bold", textClasses[stat.color as keyof typeof textClasses])}>
                {stat.count}
              </div>
              <div className="text-[10px] text-foreground/70 uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Items by urgency */}
      <div className="space-y-4">
        {/* Expired Items */}
        {expiredItems.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <XCircle className="h-4 w-4 text-red-400" />
              <h4 className="text-sm font-medium text-red-400">
                Expired - Action Required
              </h4>
              <Badge className="ml-auto text-xs bg-red-500/20 text-red-400 border-red-500/30">
                {expiredItems.length}
              </Badge>
            </div>
            <div className="space-y-2">
              {expiredItems.map((item, index) => renderComplianceCard(item, index))}
            </div>
          </div>
        )}

        {/* Expiring in 30 Days */}
        {expiringIn30Days.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <AlertTriangle className="h-4 w-4 text-orange-400" />
              <h4 className="text-sm font-medium text-orange-400">
                Expiring Within 30 Days
              </h4>
              <Badge className="ml-auto text-xs bg-orange-500/20 text-orange-400 border-orange-500/30">
                {expiringIn30Days.length}
              </Badge>
            </div>
            <div className="space-y-2">
              {expiringIn30Days.map((item, index) => renderComplianceCard(item, index))}
            </div>
          </div>
        )}

        {/* Expiring in 90 Days */}
        {expiringIn90Days.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <Clock className="h-4 w-4 text-yellow-400" />
              <h4 className="text-sm font-medium text-yellow-400">
                Expiring Within 90 Days
              </h4>
              <Badge className="ml-auto text-xs bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                {expiringIn90Days.length}
              </Badge>
            </div>
            <div className="space-y-2">
              {expiringIn90Days.map((item, index) => renderComplianceCard(item, index))}
            </div>
          </div>
        )}

        {/* Valid Items */}
        {validItems.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              <h4 className="text-sm font-medium text-green-400">
                All Current
              </h4>
              <Badge className="ml-auto text-xs bg-green-500/20 text-green-400 border-green-500/30">
                {validItems.length}
              </Badge>
            </div>
            <div className="space-y-2">
              {validItems.map((item, index) => renderComplianceCard(item, index))}
            </div>
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => {
          toast({
            title: "Coming Soon",
            description: "Expiry reminders will be available in a future update.",
          });
        }}
        className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-4 touch-manipulation active:bg-white/[0.06] active:scale-[0.99] transition-all"
      >
        <div className="w-12 h-12 rounded-xl bg-elec-yellow/10 flex items-center justify-center">
          <Bell className="h-6 w-6 text-elec-yellow" />
        </div>
        <div className="flex-1 text-left">
          <p className="font-medium text-foreground">Expiry Reminders</p>
          <p className="text-sm text-foreground/70">
            Get notified before qualifications expire
          </p>
        </div>
        <ChevronRight className="h-5 w-5 text-foreground/70" />
      </motion.button>

      {/* Empty State */}
      {complianceItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-12 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/[0.04] flex items-center justify-center">
            <Shield className="h-10 w-10 text-foreground/70/50" />
          </div>
          <h4 className="text-lg font-medium text-foreground mb-2">No compliance items yet</h4>
          <p className="text-foreground/70 max-w-xs mx-auto">
            Add qualifications with expiry dates to track your compliance status.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ElecIdCompliance;
