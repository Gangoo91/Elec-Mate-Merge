import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Clock,
  Trash2,
  Edit,
  Wrench,
  HardHat,
  Zap,
  Shield,
  Ruler,
  Eye,
  Settings,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SafetyEquipment } from '@/hooks/useSafetyEquipment';
import { format, differenceInDays, isPast } from 'date-fns';

interface EquipmentCardProps {
  equipment: SafetyEquipment;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onMarkInspected: () => void;
  onMarkCalibrated: () => void;
  isDeleting?: boolean;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  ppe: HardHat,
  test_equipment: Zap,
  hand_tools: Wrench,
  power_tools: Settings,
  safety_equipment: Shield,
  measuring: Ruler,
  inspection: Eye,
  other: Wrench,
};

const STATUS_CONFIG = {
  good: {
    color: 'bg-green-500',
    textColor: 'text-green-500',
    bgColor: 'bg-green-500/10',
    icon: CheckCircle2,
    label: 'Good',
  },
  needs_attention: {
    color: 'bg-amber-500',
    textColor: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    icon: AlertTriangle,
    label: 'Needs Attention',
  },
  out_of_service: {
    color: 'bg-destructive',
    textColor: 'text-destructive',
    bgColor: 'bg-destructive/10',
    icon: XCircle,
    label: 'Out of Service',
  },
  overdue: {
    color: 'bg-destructive',
    textColor: 'text-destructive',
    bgColor: 'bg-destructive/10',
    icon: Clock,
    label: 'Overdue',
  },
};

export function EquipmentCard({
  equipment,
  isExpanded,
  onToggleExpand,
  onEdit,
  onDelete,
  onMarkInspected,
  onMarkCalibrated,
  isDeleting,
}: EquipmentCardProps) {
  const CategoryIcon = CATEGORY_ICONS[equipment.category] || Wrench;
  
  // Calculate if overdue
  const isInspectionOverdue = equipment.next_inspection && isPast(new Date(equipment.next_inspection));
  const isCalibrationOverdue = equipment.calibration_due && isPast(new Date(equipment.calibration_due));
  const effectiveStatus = (isInspectionOverdue || isCalibrationOverdue) ? 'overdue' : equipment.status;
  
  const statusConfig = STATUS_CONFIG[effectiveStatus] || STATUS_CONFIG.good;
  const StatusIcon = statusConfig.icon;

  // Calculate days until next action
  const getDaysUntil = (dateStr: string | null) => {
    if (!dateStr) return null;
    const days = differenceInDays(new Date(dateStr), new Date());
    return days;
  };

  const daysUntilInspection = getDaysUntil(equipment.next_inspection);
  const daysUntilCalibration = getDaysUntil(equipment.calibration_due);

  return (
    <motion.div
      layout
      className={`rounded-lg border overflow-hidden transition-colors ${
        effectiveStatus === 'overdue' ? 'border-destructive/50' : 'border-border'
      }`}
    >
      {/* Status indicator bar */}
      <div className={`h-1 ${statusConfig.color}`} />
      
      {/* Main content - tappable */}
      <div 
        className="p-4 cursor-pointer active:bg-muted/50 transition-colors"
        onClick={onToggleExpand}
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`p-2 rounded-lg ${statusConfig.bgColor}`}>
            <CategoryIcon className={`h-5 w-5 ${statusConfig.textColor}`} />
          </div>
          
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground truncate">
                {equipment.name}
              </h3>
              <StatusIcon className={`h-4 w-4 flex-shrink-0 ${statusConfig.textColor}`} />
            </div>
            
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{equipment.location}</span>
            </div>

            {/* Next due date */}
            {(equipment.next_inspection || equipment.calibration_due) && (
              <div className="flex items-center gap-2 mt-2">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                {equipment.next_inspection && (
                  <span className={`text-xs ${
                    isInspectionOverdue ? 'text-destructive font-medium' : 
                    (daysUntilInspection !== null && daysUntilInspection <= 7) ? 'text-amber-500' : 
                    'text-muted-foreground'
                  }`}>
                    Inspection: {isInspectionOverdue ? 'Overdue' : 
                      daysUntilInspection === 0 ? 'Today' :
                      daysUntilInspection === 1 ? 'Tomorrow' :
                      `${daysUntilInspection} days`}
                  </span>
                )}
                {equipment.calibration_due && equipment.next_inspection && (
                  <span className="text-muted-foreground">•</span>
                )}
                {equipment.calibration_due && (
                  <span className={`text-xs ${
                    isCalibrationOverdue ? 'text-destructive font-medium' : 
                    (daysUntilCalibration !== null && daysUntilCalibration <= 30) ? 'text-amber-500' : 
                    'text-muted-foreground'
                  }`}>
                    Cal: {isCalibrationOverdue ? 'Overdue' : 
                      `${daysUntilCalibration} days`}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Expand indicator */}
          <div className="p-1">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
              {/* Details grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                {equipment.serial_number && (
                  <div>
                    <span className="text-muted-foreground">Serial:</span>
                    <span className="ml-1 text-foreground">{equipment.serial_number}</span>
                  </div>
                )}
                {equipment.assigned_to && (
                  <div>
                    <span className="text-muted-foreground">Assigned to:</span>
                    <span className="ml-1 text-foreground">{equipment.assigned_to}</span>
                  </div>
                )}
                {equipment.last_inspection && (
                  <div>
                    <span className="text-muted-foreground">Last inspected:</span>
                    <span className="ml-1 text-foreground">
                      {format(new Date(equipment.last_inspection), 'd MMM yyyy')}
                    </span>
                  </div>
                )}
                {equipment.last_calibration && (
                  <div>
                    <span className="text-muted-foreground">Last calibrated:</span>
                    <span className="ml-1 text-foreground">
                      {format(new Date(equipment.last_calibration), 'd MMM yyyy')}
                    </span>
                  </div>
                )}
              </div>

              {/* Condition notes */}
              {equipment.condition_notes && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Notes:</span>
                  <p className="mt-1 text-foreground">{equipment.condition_notes}</p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2">
                {equipment.next_inspection && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkInspected();
                    }}
                    className="h-10 text-sm"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Mark Inspected
                  </Button>
                )}
                
                {equipment.requires_calibration && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkCalibrated();
                    }}
                    className="h-10 text-sm"
                  >
                    <Zap className="h-4 w-4 mr-1" />
                    Mark Calibrated
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                  }}
                  className="h-10 text-sm"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  disabled={isDeleting}
                  className="h-10 text-sm text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
