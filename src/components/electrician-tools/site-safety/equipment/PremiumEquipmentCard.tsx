import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  MapPin,
  Calendar,
  Tag,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  XCircle,
  Pencil,
  Trash2,
  Check,
  Plug,
  Zap,
  ArrowUpDown,
  Wrench,
  Shield,
  Settings,
  Gauge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EquipmentStatus = "good" | "needs_attention" | "out_of_service" | "overdue";

interface Equipment {
  id: string;
  name: string;
  category: string;
  serial_number: string | null;
  location: string;
  last_inspection: string | null;
  next_inspection: string | null;
  inspection_interval_days: number;
  status: EquipmentStatus;
  condition_notes: string | null;
}

// Category icons mapping
const categoryIcons: Record<string, typeof Plug> = {
  "pat-tester": Plug,
  "test-equipment": Zap,
  "ladders": ArrowUpDown,
  "power-tools": Wrench,
  "ppe": Shield,
  "other": Settings,
};

// Status config
const statusConfig: Record<EquipmentStatus, {
  bg: string;
  text: string;
  border: string;
  icon: typeof CheckCircle;
  label: string;
}> = {
  good: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    icon: CheckCircle,
    label: "Good"
  },
  needs_attention: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
    icon: AlertTriangle,
    label: "Attention"
  },
  overdue: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/20",
    icon: AlertCircle,
    label: "Overdue"
  },
  out_of_service: {
    bg: "bg-gray-500/10",
    text: "text-gray-400",
    border: "border-gray-500/20",
    icon: XCircle,
    label: "Out of Service"
  },
};

interface PremiumEquipmentCardProps {
  equipment: Equipment;
  onEdit?: () => void;
  onDelete?: () => void;
  onMarkInspected?: () => void;
  onMarkCalibrated?: () => void;
  index?: number;
}

export function PremiumEquipmentCard({
  equipment,
  onEdit,
  onDelete,
  onMarkInspected,
  onMarkCalibrated,
  index = 0,
}: PremiumEquipmentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const status = statusConfig[equipment.status] || statusConfig.good;
  const StatusIcon = status.icon;
  const CategoryIcon = categoryIcons[equipment.category] || Settings;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatFrequency = (days: number) => {
    if (days <= 30) return `${days} days`;
    if (days <= 90) return `${Math.round(days / 30)} months`;
    if (days === 365) return "12 months";
    return `${Math.round(days / 30)} months`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, type: "spring", stiffness: 200 }}
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-white/5 border",
        status.border,
        "transition-all duration-300",
        "active:scale-[0.99]"
      )}
    >
      {/* Main Content - Clickable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-3"
      >
        {/* Header */}
        <div className="flex items-start gap-2.5">
          {/* Category Icon */}
          <div className={cn(
            "p-2 rounded-lg border flex-shrink-0",
            status.bg, status.border
          )}>
            <CategoryIcon className={cn("h-4 w-4", status.text)} />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-semibold text-white truncate">{equipment.name}</h3>
              <div className={cn(
                "flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-medium",
                status.bg, status.text
              )}>
                <StatusIcon className="h-2.5 w-2.5" />
                {status.label}
              </div>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1 text-[10px] text-white/50">
              <div className="flex items-center gap-0.5">
                <MapPin className="h-2.5 w-2.5" />
                <span>{equipment.location}</span>
              </div>
              <div className="flex items-center gap-0.5">
                <Calendar className="h-2.5 w-2.5" />
                <span>Next: {formatDate(equipment.next_inspection)}</span>
              </div>
              {equipment.serial_number && (
                <div className="flex items-center gap-0.5">
                  <Tag className="h-2.5 w-2.5" />
                  <span>{equipment.serial_number}</span>
                </div>
              )}
            </div>
          </div>

          {/* Expand icon */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 p-0.5"
          >
            <ChevronDown className="h-4 w-4 text-white/30" />
          </motion.div>
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3">
              {/* Divider */}
              <div className="h-px bg-white/[0.08] mb-3" />

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="space-y-0.5">
                  <p className="text-[10px] text-white/40">Last Tested</p>
                  <p className="text-xs text-white/80">
                    {formatDate(equipment.last_inspection)}
                  </p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] text-white/40">Test Frequency</p>
                  <p className="text-xs text-white/80">
                    {formatFrequency(equipment.inspection_interval_days)}
                  </p>
                </div>
              </div>

              {/* Notes */}
              {equipment.condition_notes && (
                <div className="mb-3 p-2.5 rounded-lg bg-white/5 border border-white/[0.08]">
                  <p className="text-[10px] text-white/40 mb-0.5">Notes</p>
                  <p className="text-xs text-white/70">{equipment.condition_notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-1.5">
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); onEdit(); }}
                    className="flex-1 h-10 text-xs text-white/70 hover:text-white hover:bg-white/10 border border-white/[0.08]"
                  >
                    <Pencil className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                )}
                {onMarkInspected && (
                  <Button
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); onMarkInspected(); }}
                    className="flex-1 h-10 text-xs bg-emerald-500 text-white hover:bg-emerald-600"
                  >
                    <Check className="h-3.5 w-3.5 mr-1" />
                    Tested
                  </Button>
                )}
                {onMarkCalibrated && (
                  <Button
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); onMarkCalibrated(); }}
                    className="flex-1 h-10 text-xs bg-blue-500 text-white hover:bg-blue-600"
                  >
                    <Gauge className="h-3.5 w-3.5 mr-1" />
                    Calibrated
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    className="h-10 w-10 p-0 text-white/40 hover:text-red-400 hover:bg-red-500/10 border border-white/[0.08]"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
