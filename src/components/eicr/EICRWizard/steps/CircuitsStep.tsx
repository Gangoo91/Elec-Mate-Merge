import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Zap, AlertTriangle, CheckCircle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CircuitsStepProps {
  data: Record<string, any>;
  onChange: (updates: Record<string, any>) => void;
  isMobile: boolean;
}

/**
 * Step 4: Circuits & Testing
 * Card-based circuit list with tap-to-edit
 */
export const CircuitsStep: React.FC<CircuitsStepProps> = ({
  data,
  onChange,
  isMobile,
}) => {
  const circuits = data.circuits || [];

  const handleAddCircuit = () => {
    const newCircuit = {
      id: crypto.randomUUID(),
      circuitNumber: (circuits.length + 1).toString(),
      circuitDesignation: `C${circuits.length + 1}`,
      circuitDescription: '',
      status: 'pending',
    };
    onChange({ circuits: [...circuits, newCircuit] });
  };

  const handleEditCircuit = (circuitId: string) => {
    // TODO: Open edit sheet/modal
    console.log('Edit circuit:', circuitId);
  };

  // Summary stats
  const stats = {
    total: circuits.length,
    complete: circuits.filter((c: any) => c.status === 'complete').length,
    pending: circuits.filter((c: any) => c.status === 'pending' || !c.status).length,
    failed: circuits.filter((c: any) => c.status === 'failed').length,
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-3">
        <StatCard label="Total" value={stats.total} />
        <StatCard label="Complete" value={stats.complete} variant="success" />
        <StatCard label="Pending" value={stats.pending} variant="warning" />
        <StatCard label="Failed" value={stats.failed} variant="error" />
      </div>

      {/* Circuit List */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Circuits</CardTitle>
            <Button
              size="sm"
              variant="outline"
              onClick={handleAddCircuit}
              className="gap-1"
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {circuits.length === 0 ? (
            <EmptyState onAdd={handleAddCircuit} />
          ) : (
            circuits.map((circuit: any) => (
              <CircuitCard
                key={circuit.id}
                circuit={circuit}
                onClick={() => handleEditCircuit(circuit.id)}
                isMobile={isMobile}
              />
            ))
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      {circuits.length > 0 && (
        <Card>
          <CardContent className="py-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                Bulk Edit
              </Button>
              <Button variant="outline" size="sm">
                Auto-Fill Common Values
              </Button>
              <Button variant="outline" size="sm">
                Apply RCD Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

/**
 * Individual circuit card
 */
interface CircuitCardProps {
  circuit: any;
  onClick: () => void;
  isMobile: boolean;
}

const CircuitCard: React.FC<CircuitCardProps> = ({ circuit, onClick, isMobile }) => {
  const status = circuit.status || 'pending';

  const StatusIcon = {
    complete: CheckCircle,
    pending: Zap,
    failed: AlertTriangle,
  }[status] || Zap;

  const statusColors = {
    complete: 'text-green-500 bg-green-500/10 border-green-500/20',
    pending: 'text-muted-foreground bg-muted/50 border-border',
    failed: 'text-red-500 bg-red-500/10 border-red-500/20',
  }[status] || '';

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 p-3 rounded-lg border bg-card',
        'transition-all duration-200 hover:bg-accent active:scale-[0.99]',
        statusColors
      )}
    >
      {/* Circuit badge */}
      <Badge
        variant="outline"
        className={cn(
          'h-8 w-12 justify-center font-bold shrink-0',
          'bg-primary/10 text-primary border-primary/30'
        )}
      >
        {circuit.circuitDesignation || `C${circuit.circuitNumber}`}
      </Badge>

      {/* Details */}
      <div className="flex-1 text-left min-w-0">
        <p className="font-medium text-sm truncate">
          {circuit.circuitDescription || 'Unnamed Circuit'}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{circuit.protectiveDeviceRating || '--'}A</span>
          {circuit.zs && <span>Zs: {circuit.zs}Ω</span>}
          {circuit.r1r2 && <span>R1+R2: {circuit.r1r2}Ω</span>}
        </div>
      </div>

      {/* Status icon */}
      <StatusIcon className={cn('h-4 w-4 shrink-0', statusColors.split(' ')[0])} />

      {/* Chevron */}
      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
    </button>
  );
};

/**
 * Empty state for no circuits
 */
const EmptyState: React.FC<{ onAdd: () => void }> = ({ onAdd }) => (
  <div className="text-center py-8">
    <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
      <Zap className="h-6 w-6 text-muted-foreground" />
    </div>
    <h4 className="font-medium text-foreground mb-1">No Circuits Yet</h4>
    <p className="text-sm text-muted-foreground mb-4">
      Add circuits manually or go back to scan the board
    </p>
    <Button onClick={onAdd} className="gap-2">
      <Plus className="h-4 w-4" />
      Add First Circuit
    </Button>
  </div>
);

/**
 * Stat card component
 */
interface StatCardProps {
  label: string;
  value: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, variant = 'default' }) => {
  const variantStyles = {
    default: 'bg-card border-border',
    success: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800',
    warning: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800',
    error: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800',
  };

  const textColors = {
    default: 'text-foreground',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-amber-600 dark:text-amber-400',
    error: 'text-red-600 dark:text-red-400',
  };

  return (
    <div className={cn('p-3 rounded-lg border text-center', variantStyles[variant])}>
      <p className={cn('text-2xl font-bold', textColors[variant])}>{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
};

export default CircuitsStep;
