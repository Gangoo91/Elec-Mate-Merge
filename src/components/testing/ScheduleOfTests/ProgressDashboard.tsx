import React, { useMemo, useState } from 'react';
import { TestResult } from '@/types/testResult';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  Zap,
} from 'lucide-react';

interface ProgressDashboardProps {
  /** All circuits in the schedule */
  circuits: TestResult[];
  /** Called when user wants to filter to specific status */
  onFilterStatus?: (status: 'pass' | 'pending' | 'fail' | 'all') => void;
  /** Currently active filter */
  activeFilter?: 'pass' | 'pending' | 'fail' | 'all';
  /** Additional class names */
  className?: string;
}

interface ValidationIssue {
  circuitId: string;
  circuitName: string;
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

/**
 * Progress Dashboard - At-a-glance testing status
 * Shows overall completion, pass/fail counts, and issues
 */
export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  circuits,
  onFilterStatus,
  activeFilter = 'all',
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Calculate circuit status and validation
  const stats = useMemo(() => {
    let passCount = 0;
    let failCount = 0;
    let pendingCount = 0;
    const issues: ValidationIssue[] = [];

    circuits.forEach((circuit) => {
      const status = getCircuitStatus(circuit);
      const circuitName = circuit.circuitDesignation || `C${circuit.circuitNumber}`;

      if (status === 'pass') passCount++;
      else if (status === 'fail') failCount++;
      else pendingCount++;

      // Collect validation issues
      const circuitIssues = validateCircuit(circuit, circuitName);
      issues.push(...circuitIssues);
    });

    const total = circuits.length;
    const completedCount = passCount + failCount;
    const completionPercent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

    return {
      total,
      passCount,
      failCount,
      pendingCount,
      completedCount,
      completionPercent,
      issues: issues.slice(0, 5), // Show max 5 issues
      totalIssues: issues.length,
    };
  }, [circuits]);

  if (circuits.length === 0) {
    return null;
  }

  return (
    <div className={cn('bg-card border border-border rounded-xl overflow-hidden', className)}>
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-semibold text-foreground">Testing Progress</h3>
            <p className="text-xs text-muted-foreground">
              {stats.completedCount} of {stats.total} circuits tested
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Quick Progress Indicator */}
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-500',
                  stats.completionPercent === 100
                    ? 'bg-gradient-to-r from-green-500 to-green-400'
                    : stats.failCount > 0
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                    : 'bg-gradient-to-r from-primary to-primary/70'
                )}
                style={{ width: `${stats.completionPercent}%` }}
              />
            </div>
            <span className="text-sm font-bold text-foreground">{stats.completionPercent}%</span>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4">
          {/* Status Cards */}
          <div className="grid grid-cols-3 gap-2">
            <StatusCard
              label="Pass"
              count={stats.passCount}
              icon={<CheckCircle className="h-4 w-4" />}
              color="green"
              isActive={activeFilter === 'pass'}
              onClick={() => onFilterStatus?.(activeFilter === 'pass' ? 'all' : 'pass')}
            />
            <StatusCard
              label="Pending"
              count={stats.pendingCount}
              icon={<Clock className="h-4 w-4" />}
              color="gray"
              isActive={activeFilter === 'pending'}
              onClick={() => onFilterStatus?.(activeFilter === 'pending' ? 'all' : 'pending')}
            />
            <StatusCard
              label="Fail"
              count={stats.failCount}
              icon={<XCircle className="h-4 w-4" />}
              color="red"
              isActive={activeFilter === 'fail'}
              onClick={() => onFilterStatus?.(activeFilter === 'fail' ? 'all' : 'fail')}
            />
          </div>

          {/* Issues List */}
          {stats.issues.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Issues Found
                </span>
                {stats.totalIssues > 5 && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5">
                    +{stats.totalIssues - 5} more
                  </Badge>
                )}
              </div>
              <div className="space-y-1.5">
                {stats.issues.map((issue, index) => (
                  <IssueItem key={`${issue.circuitId}-${issue.field}-${index}`} issue={issue} />
                ))}
              </div>
            </div>
          )}

          {/* All Clear Message */}
          {stats.issues.length === 0 && stats.completionPercent > 0 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-400 font-medium">
                No issues detected in completed tests
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Status Card Component
 */
interface StatusCardProps {
  label: string;
  count: number;
  icon: React.ReactNode;
  color: 'green' | 'gray' | 'red';
  isActive: boolean;
  onClick: () => void;
}

const StatusCard: React.FC<StatusCardProps> = ({
  label,
  count,
  icon,
  color,
  isActive,
  onClick,
}) => {
  const colors = {
    green: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      text: 'text-green-400',
      activeBorder: 'border-green-500',
    },
    gray: {
      bg: 'bg-muted/30',
      border: 'border-border',
      text: 'text-muted-foreground',
      activeBorder: 'border-foreground',
    },
    red: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      text: 'text-red-400',
      activeBorder: 'border-red-500',
    },
  };

  const c = colors[color];

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center p-3 rounded-lg border transition-transform',
        'active:scale-95',
        c.bg,
        isActive ? c.activeBorder : c.border
      )}
    >
      <span className={cn('text-2xl font-bold', c.text)}>{count}</span>
      <div className={cn('flex items-center gap-1 mt-0.5', c.text)}>
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
    </button>
  );
};

/**
 * Issue Item Component
 */
interface IssueItemProps {
  issue: ValidationIssue;
}

const IssueItem: React.FC<IssueItemProps> = ({ issue }) => {
  return (
    <div
      className={cn(
        'flex items-start gap-2 p-2 rounded-lg',
        issue.severity === 'error' ? 'bg-red-500/10' : 'bg-amber-500/10'
      )}
    >
      {issue.severity === 'error' ? (
        <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
      ) : (
        <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0">
            {issue.circuitName}
          </Badge>
          <span className="text-[11px] text-muted-foreground truncate">{issue.field}</span>
        </div>
        <p className="text-xs text-foreground mt-0.5">{issue.message}</p>
      </div>
    </div>
  );
};

/**
 * Determine circuit status based on test data
 */
function getCircuitStatus(circuit: TestResult): 'pass' | 'fail' | 'pending' {
  // Check for fail conditions first
  const hasFailCondition =
    circuit.polarity === 'Incorrect' ||
    circuit.rcdTestButton === '✗' ||
    circuit.afddTest === '✗' ||
    circuit.functionalTesting === '✗';

  if (hasFailCondition) return 'fail';

  // Check if Zs exceeds max
  if (circuit.zs && circuit.maxZs) {
    const zs = parseFloat(circuit.zs);
    const maxZs = parseFloat(circuit.maxZs);
    if (!isNaN(zs) && !isNaN(maxZs) && zs > maxZs) return 'fail';
  }

  // Check for insulation failures
  if (circuit.insulationLiveEarth) {
    const ir = parseFloat(circuit.insulationLiveEarth.replace('>', ''));
    if (!isNaN(ir) && ir < 1) return 'fail';
  }

  // Check if essential fields are complete
  const hasEssentialTests =
    circuit.r1r2 || circuit.zs || circuit.insulationLiveEarth || circuit.polarity;

  if (!hasEssentialTests) return 'pending';

  return 'pass';
}

/**
 * Validate a circuit and return any issues
 */
function validateCircuit(circuit: TestResult, circuitName: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Zs validation
  if (circuit.zs && circuit.maxZs) {
    const zs = parseFloat(circuit.zs);
    const maxZs = parseFloat(circuit.maxZs);
    if (!isNaN(zs) && !isNaN(maxZs)) {
      if (zs > maxZs) {
        issues.push({
          circuitId: circuit.id,
          circuitName,
          field: 'Zs',
          message: `Zs exceeds maximum (${zs}Ω > ${maxZs}Ω)`,
          severity: 'error',
        });
      } else if (zs > maxZs * 0.8) {
        issues.push({
          circuitId: circuit.id,
          circuitName,
          field: 'Zs',
          message: `Zs close to maximum (${zs}Ω / ${maxZs}Ω)`,
          severity: 'warning',
        });
      }
    }
  }

  // RCD trip time validation
  if (circuit.rcdOneX) {
    const tripTime = parseFloat(circuit.rcdOneX);
    if (!isNaN(tripTime)) {
      if (tripTime >= 300) {
        issues.push({
          circuitId: circuit.id,
          circuitName,
          field: 'RCD',
          message: `RCD trip time too slow (${tripTime}ms ≥ 300ms)`,
          severity: 'error',
        });
      } else if (tripTime >= 200) {
        issues.push({
          circuitId: circuit.id,
          circuitName,
          field: 'RCD',
          message: `RCD trip time marginal (${tripTime}ms)`,
          severity: 'warning',
        });
      }
    }
  }

  // Insulation resistance validation
  if (circuit.insulationLiveEarth) {
    const value = circuit.insulationLiveEarth.replace('>', '').replace('<', '');
    const ir = parseFloat(value);
    if (!isNaN(ir)) {
      if (ir < 1) {
        issues.push({
          circuitId: circuit.id,
          circuitName,
          field: 'Insulation',
          message: `Insulation resistance below minimum (${ir}MΩ < 1MΩ)`,
          severity: 'error',
        });
      } else if (ir < 2 && !circuit.insulationLiveEarth.includes('>')) {
        issues.push({
          circuitId: circuit.id,
          circuitName,
          field: 'Insulation',
          message: `Insulation resistance low (${ir}MΩ)`,
          severity: 'warning',
        });
      }
    }
  }

  // Polarity validation
  if (circuit.polarity === 'Incorrect') {
    issues.push({
      circuitId: circuit.id,
      circuitName,
      field: 'Polarity',
      message: 'Polarity incorrect - immediate attention required',
      severity: 'error',
    });
  }

  // Test button validation
  if (circuit.rcdTestButton === '✗') {
    issues.push({
      circuitId: circuit.id,
      circuitName,
      field: 'RCD Test Btn',
      message: 'RCD test button did not trip device',
      severity: 'error',
    });
  }

  return issues;
}

export default ProgressDashboard;
