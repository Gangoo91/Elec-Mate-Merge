import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';
import {
  AlertTriangle,
  CheckCircle,
  Zap,
  Info,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  X,
  Edit3,
} from 'lucide-react';
import { TestResult } from '@/types/testResult';
import {
  calculatePhaseBalance,
  calculateNeutralCurrent,
  detectThreePhaseGroups,
  getPhaseBalanceColor,
  PhaseLoadData,
  ThreePhaseCircuitGroup,
} from '@/utils/threePhaseCalculations';
import { PhaseBalanceIndicator } from '@/components/testing/PhaseBalanceIndicator';
import { PhaseBalanceChart } from '@/components/charts/PhaseBalanceChart';
import { useOrientation } from '@/hooks/useOrientation';

interface ThreePhaseScheduleOfTestsProps {
  /** All test results from the schedule */
  testResults: TestResult[];
  /** Callback when a test result is updated */
  onUpdateResult: (id: string, field: keyof TestResult, value: string) => void;
  /** Show in compact mode */
  compact?: boolean;
  /** Enable auto-detection of three-phase groups */
  autoDetect?: boolean;
}

/**
 * Enhanced Schedule of Tests view for three-phase installations
 * Groups 3-pole MCBs together and calculates phase balance
 */
export const ThreePhaseScheduleOfTests: React.FC<ThreePhaseScheduleOfTestsProps> = ({
  testResults,
  onUpdateResult,
  compact = false,
  autoDetect = true,
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [showChart, setShowChart] = useState(true);
  const [editingCircuit, setEditingCircuit] = useState<TestResult | null>(null);
  const orientation = useOrientation();

  // Mobile view when in portrait mode on mobile device
  const useMobileView = orientation.isMobile && !orientation.isLandscape;

  // Detect three-phase circuit groups
  const threePhaseGroups = useMemo(() => {
    if (!autoDetect) return [];

    // Convert TestResults to format expected by detectThreePhaseGroups
    const circuits = testResults.map((r, idx) => ({
      position: parseInt(r.circuitNumber || String(idx + 1)) || idx + 1,
      rating: r.protectiveDeviceRating ? parseInt(r.protectiveDeviceRating) : null,
      device: r.protectiveDeviceType || '',
      label: r.circuitDescription || r.circuitDesignation || '',
      phase: r.phaseType as '1P' | '3P' | undefined,
    }));

    return detectThreePhaseGroups(circuits);
  }, [testResults, autoDetect]);

  // Separate single-phase and three-phase circuits
  const { singlePhaseCircuits, threePhaseCircuits } = useMemo(() => {
    const threePhasePositions = new Set(
      threePhaseGroups.flatMap(g => g.positions)
    );

    const single: TestResult[] = [];
    const threep: TestResult[] = [];

    testResults.forEach(r => {
      const pos = parseInt(r.circuitNumber || '0');
      if (r.phaseType === '3P' || threePhasePositions.has(pos)) {
        threep.push(r);
      } else {
        single.push(r);
      }
    });

    return { singlePhaseCircuits: single, threePhaseCircuits: threep };
  }, [testResults, threePhaseGroups]);

  // Calculate total phase loads from all circuits
  const totalPhaseLoads = useMemo((): PhaseLoadData => {
    let L1 = 0, L2 = 0, L3 = 0;

    testResults.forEach(r => {
      if (r.phaseType === '3P') {
        L1 += parseFloat(r.phaseBalanceL1 || '0') || 0;
        L2 += parseFloat(r.phaseBalanceL2 || '0') || 0;
        L3 += parseFloat(r.phaseBalanceL3 || '0') || 0;
      } else {
        // Single phase circuits - distribute based on circuit number for estimation
        const circuitNum = parseInt(r.circuitNumber || '0');
        const load = parseFloat(r.protectiveDeviceRating || '0') || 0;

        // Simple rotation: C1 -> L1, C2 -> L2, C3 -> L3, C4 -> L1...
        const phaseIndex = (circuitNum - 1) % 3;
        if (phaseIndex === 0) L1 += load * 0.5; // Assume 50% loading
        else if (phaseIndex === 1) L2 += load * 0.5;
        else L3 += load * 0.5;
      }
    });

    return { L1, L2, L3 };
  }, [testResults]);

  // Calculate overall balance
  const overallBalance = useMemo(() => {
    if (totalPhaseLoads.L1 === 0 && totalPhaseLoads.L2 === 0 && totalPhaseLoads.L3 === 0) {
      return null;
    }
    return calculatePhaseBalance(totalPhaseLoads);
  }, [totalPhaseLoads]);

  const neutralCurrent = useMemo(() => {
    if (totalPhaseLoads.L1 === 0 && totalPhaseLoads.L2 === 0 && totalPhaseLoads.L3 === 0) {
      return null;
    }
    return calculateNeutralCurrent(totalPhaseLoads);
  }, [totalPhaseLoads]);

  // Toggle group expansion
  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  };

  // Check if installation is three-phase
  const isThreePhaseInstallation = threePhaseCircuits.length > 0 || threePhaseGroups.length > 0;

  if (!isThreePhaseInstallation) {
    return (
      <Card className="border-dashed border-muted-foreground/50">
        <CardContent className="py-6 text-center text-muted-foreground">
          <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No three-phase circuits detected</p>
          <p className="text-xs mt-1">Mark circuits as "3P" to enable three-phase analysis</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Phase Balance Overview */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-500" />
              Three-Phase Installation Analysis
            </CardTitle>
            <div className="flex items-center gap-2">
              {overallBalance && (
                <Badge
                  variant="outline"
                  className={getPhaseBalanceColor(overallBalance.imbalancePercent)}
                >
                  {overallBalance.isCompliant ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <AlertTriangle className="h-3 w-3 mr-1" />
                  )}
                  {overallBalance.imbalancePercent}% Imbalance
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChart(!showChart)}
              >
                {showChart ? 'Hide Chart' : 'Show Chart'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <StatCard
              label="Total 3P Circuits"
              value={threePhaseCircuits.length}
              icon={<Zap className="h-4 w-4 text-purple-500" />}
            />
            <StatCard
              label="3-Pole Groups"
              value={threePhaseGroups.length}
              icon={<RefreshCw className="h-4 w-4 text-blue-500" />}
            />
            <StatCard
              label="Est. Neutral"
              value={neutralCurrent ? `${neutralCurrent.estimatedAmps}A` : '-'}
              icon={<Info className="h-4 w-4 text-green-500" />}
            />
            <StatCard
              label="Balance Status"
              value={overallBalance?.isCompliant ? 'OK' : 'Check'}
              icon={
                overallBalance?.isCompliant ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                )
              }
            />
          </div>

          {/* Phase Balance Chart */}
          {showChart && (
            <PhaseBalanceChart
              loads={totalPhaseLoads}
              title="Overall Phase Distribution"
              className="mb-4"
            />
          )}

          {/* BS7671 Compliance Warning */}
          {overallBalance && !overallBalance.isCompliant && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>BS7671 Warning:</strong> Phase imbalance exceeds 10%.{' '}
                {overallBalance.recommendation}
              </AlertDescription>
            </Alert>
          )}

          {/* Neutral Current Warning */}
          {neutralCurrent?.warning && (
            <Alert className="mb-4 border-amber-200 bg-amber-50 dark:bg-amber-950/20">
              <Info className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800 dark:text-amber-200">
                {neutralCurrent.warning}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Three-Phase Circuit Groups */}
      {threePhaseGroups.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Detected 3-Pole MCB Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {threePhaseGroups.map(group => (
                <ThreePhaseGroupRow
                  key={group.id}
                  group={group}
                  circuits={testResults.filter(r =>
                    group.positions.includes(parseInt(r.circuitNumber || '0'))
                  )}
                  isExpanded={expandedGroups.has(group.id)}
                  onToggle={() => toggleGroup(group.id)}
                  onUpdateResult={onUpdateResult}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Individual Three-Phase Circuits - Mobile Card View or Desktop Table */}
      {threePhaseCircuits.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Three-Phase Circuit Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            {useMobileView ? (
              /* Mobile Card View */
              <div className="space-y-3">
                {threePhaseCircuits.map(circuit => (
                  <MobileThreePhaseCard
                    key={circuit.id}
                    circuit={circuit}
                    onEdit={() => setEditingCircuit(circuit)}
                  />
                ))}
              </div>
            ) : (
              /* Desktop Table View */
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Circuit</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-20">Rating</TableHead>
                      <TableHead className="w-24 bg-red-50 dark:bg-red-950/20">L1 (A)</TableHead>
                      <TableHead className="w-24 bg-yellow-50 dark:bg-yellow-950/20">L2 (A)</TableHead>
                      <TableHead className="w-24 bg-blue-50 dark:bg-blue-950/20">L3 (A)</TableHead>
                      <TableHead className="w-28">Balance</TableHead>
                      <TableHead className="w-24">Rotation</TableHead>
                      <TableHead className="w-24">Zs (Ω)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {threePhaseCircuits.map(circuit => (
                      <ThreePhaseCircuitRow
                        key={circuit.id}
                        circuit={circuit}
                        onUpdate={onUpdateResult}
                      />
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Mobile Edit Bottom Sheet */}
      <MobileEditDrawer
        circuit={editingCircuit}
        onClose={() => setEditingCircuit(null)}
        onUpdate={onUpdateResult}
      />
    </div>
  );
};

/**
 * Stat card for overview section
 */
const StatCard: React.FC<{
  label: string;
  value: string | number;
  icon: React.ReactNode;
}> = ({ label, value, icon }) => (
  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border">
    <div className="p-2 rounded-md bg-background">{icon}</div>
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

/**
 * Expandable row for 3-pole MCB groups
 */
const ThreePhaseGroupRow: React.FC<{
  group: ThreePhaseCircuitGroup;
  circuits: TestResult[];
  isExpanded: boolean;
  onToggle: () => void;
  onUpdateResult: (id: string, field: keyof TestResult, value: string) => void;
}> = ({ group, circuits, isExpanded, onToggle, onUpdateResult }) => {
  // Calculate group phase balance
  const groupLoads = useMemo((): PhaseLoadData => {
    let L1 = 0, L2 = 0, L3 = 0;
    circuits.forEach(c => {
      L1 += parseFloat(c.phaseBalanceL1 || '0') || 0;
      L2 += parseFloat(c.phaseBalanceL2 || '0') || 0;
      L3 += parseFloat(c.phaseBalanceL3 || '0') || 0;
    });
    return { L1, L2, L3 };
  }, [circuits]);

  const hasLoads = groupLoads.L1 > 0 || groupLoads.L2 > 0 || groupLoads.L3 > 0;

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Group Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 bg-purple-50/50 dark:bg-purple-950/20 hover:bg-purple-100/50 dark:hover:bg-purple-950/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
            3P
          </Badge>
          <span className="font-medium">{group.label}</span>
          <span className="text-sm text-muted-foreground">
            (Ways {group.positions.join(', ')})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{group.rating}A</Badge>
          {hasLoads && (
            <PhaseBalanceIndicator loads={groupLoads} compact />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-3 border-t bg-background">
          <div className="grid grid-cols-3 gap-4 mb-3">
            {circuits.map((circuit, idx) => (
              <div key={circuit.id} className="p-2 rounded bg-muted/30">
                <div className="flex items-center gap-2 mb-1">
                  <Badge
                    variant="outline"
                    className={
                      idx === 0 ? 'bg-red-50 text-red-700 border-red-200' :
                      idx === 1 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                      'bg-blue-50 text-blue-700 border-blue-200'
                    }
                  >
                    {group.phases[idx]}
                  </Badge>
                  <span className="text-sm">Way {circuit.circuitNumber}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {circuit.circuitDescription || 'No description'}
                </p>
              </div>
            ))}
          </div>

          {hasLoads && (
            <PhaseBalanceIndicator
              loads={groupLoads}
              showNeutral
              showDetails
            />
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Individual three-phase circuit row
 */
const ThreePhaseCircuitRow: React.FC<{
  circuit: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}> = ({ circuit, onUpdate }) => {
  const loads: PhaseLoadData = {
    L1: parseFloat(circuit.phaseBalanceL1 || '0') || 0,
    L2: parseFloat(circuit.phaseBalanceL2 || '0') || 0,
    L3: parseFloat(circuit.phaseBalanceL3 || '0') || 0,
  };

  const hasLoads = loads.L1 > 0 || loads.L2 > 0 || loads.L3 > 0;
  const balance = hasLoads ? calculatePhaseBalance(loads) : null;

  return (
    <TableRow>
      <TableCell className="font-medium">{circuit.circuitDesignation || circuit.circuitNumber}</TableCell>
      <TableCell className="max-w-[200px] truncate">{circuit.circuitDescription}</TableCell>
      <TableCell>{circuit.protectiveDeviceRating}A</TableCell>
      <TableCell className="bg-red-50/50 dark:bg-red-950/10">
        <input
          type="text"
          value={circuit.phaseBalanceL1 || ''}
          onChange={(e) => onUpdate(circuit.id, 'phaseBalanceL1', e.target.value)}
          className="w-full h-8 px-2 text-sm bg-transparent border rounded focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="0"
        />
      </TableCell>
      <TableCell className="bg-yellow-50/50 dark:bg-yellow-950/10">
        <input
          type="text"
          value={circuit.phaseBalanceL2 || ''}
          onChange={(e) => onUpdate(circuit.id, 'phaseBalanceL2', e.target.value)}
          className="w-full h-8 px-2 text-sm bg-transparent border rounded focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="0"
        />
      </TableCell>
      <TableCell className="bg-blue-50/50 dark:bg-blue-950/10">
        <input
          type="text"
          value={circuit.phaseBalanceL3 || ''}
          onChange={(e) => onUpdate(circuit.id, 'phaseBalanceL3', e.target.value)}
          className="w-full h-8 px-2 text-sm bg-transparent border rounded focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="0"
        />
      </TableCell>
      <TableCell>
        {balance ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  variant="outline"
                  className={`cursor-help ${getPhaseBalanceColor(balance.imbalancePercent)}`}
                >
                  {balance.isCompliant ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <AlertTriangle className="h-3 w-3 mr-1" />
                  )}
                  {balance.imbalancePercent}%
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">
                  {balance.isCompliant ? 'Within BS7671 limits (<10%)' : 'Exceeds BS7671 limit (>10%)'}
                </p>
                {balance.recommendation && (
                  <p className="text-xs text-amber-500 mt-1">{balance.recommendation}</p>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <span className="text-xs text-muted-foreground">-</span>
        )}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="text-xs">
          {circuit.phaseRotation || '-'}
        </Badge>
      </TableCell>
      <TableCell>
        <span className="text-sm">{circuit.zs || '-'}</span>
      </TableCell>
    </TableRow>
  );
};

/**
 * Mobile-optimized card for three-phase circuits
 * Touch-friendly with large tap targets
 */
const MobileThreePhaseCard: React.FC<{
  circuit: TestResult;
  onEdit: () => void;
}> = ({ circuit, onEdit }) => {
  const loads: PhaseLoadData = {
    L1: parseFloat(circuit.phaseBalanceL1 || '0') || 0,
    L2: parseFloat(circuit.phaseBalanceL2 || '0') || 0,
    L3: parseFloat(circuit.phaseBalanceL3 || '0') || 0,
  };

  const hasLoads = loads.L1 > 0 || loads.L2 > 0 || loads.L3 > 0;
  const balance = hasLoads ? calculatePhaseBalance(loads) : null;

  return (
    <Card
      className="touch-manipulation active:scale-[0.98] transition-transform"
      onClick={onEdit}
    >
      <CardContent className="p-4">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
              {circuit.circuitDesignation || circuit.circuitNumber}
            </Badge>
            <span className="text-sm font-medium truncate max-w-[150px]">
              {circuit.circuitDescription || 'Three-Phase Circuit'}
            </span>
          </div>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Edit3 className="h-4 w-4" />
          </Button>
        </div>

        {/* Phase Values Row */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/20 text-center">
            <p className="text-xs text-red-600 dark:text-red-400 font-medium">L1</p>
            <p className="text-lg font-semibold">{loads.L1 || '-'}A</p>
          </div>
          <div className="p-2 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 text-center">
            <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">L2</p>
            <p className="text-lg font-semibold">{loads.L2 || '-'}A</p>
          </div>
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-center">
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">L3</p>
            <p className="text-lg font-semibold">{loads.L3 || '-'}A</p>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Rating:</span>
            <span className="font-medium">{circuit.protectiveDeviceRating || '-'}A</span>
          </div>
          {balance && (
            <Badge
              variant="outline"
              className={getPhaseBalanceColor(balance.imbalancePercent)}
            >
              {balance.isCompliant ? (
                <CheckCircle className="h-3 w-3 mr-1" />
              ) : (
                <AlertTriangle className="h-3 w-3 mr-1" />
              )}
              {balance.imbalancePercent}%
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * Mobile bottom sheet drawer for editing circuit values
 * Touch-friendly with large inputs
 */
const MobileEditDrawer: React.FC<{
  circuit: TestResult | null;
  onClose: () => void;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}> = ({ circuit, onClose, onUpdate }) => {
  const [localValues, setLocalValues] = useState({
    phaseBalanceL1: '',
    phaseBalanceL2: '',
    phaseBalanceL3: '',
    phaseRotation: '',
    lineToLineVoltage: '',
  });

  // Sync local values when circuit changes
  React.useEffect(() => {
    if (circuit) {
      setLocalValues({
        phaseBalanceL1: circuit.phaseBalanceL1 || '',
        phaseBalanceL2: circuit.phaseBalanceL2 || '',
        phaseBalanceL3: circuit.phaseBalanceL3 || '',
        phaseRotation: circuit.phaseRotation || '',
        lineToLineVoltage: circuit.lineToLineVoltage || '',
      });
    }
  }, [circuit]);

  const handleSave = () => {
    if (!circuit) return;
    Object.entries(localValues).forEach(([field, value]) => {
      onUpdate(circuit.id, field as keyof TestResult, value);
    });
    onClose();
  };

  const loads: PhaseLoadData = {
    L1: parseFloat(localValues.phaseBalanceL1 || '0') || 0,
    L2: parseFloat(localValues.phaseBalanceL2 || '0') || 0,
    L3: parseFloat(localValues.phaseBalanceL3 || '0') || 0,
  };

  const hasLoads = loads.L1 > 0 || loads.L2 > 0 || loads.L3 > 0;
  const balance = hasLoads ? calculatePhaseBalance(loads) : null;

  return (
    <Drawer open={!!circuit} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <DrawerTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-500" />
              {circuit?.circuitDesignation || 'Edit Circuit'}
            </DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </div>
          {circuit?.circuitDescription && (
            <p className="text-sm text-muted-foreground">{circuit.circuitDescription}</p>
          )}
        </DrawerHeader>

        <div className="p-4 space-y-4 overflow-y-auto">
          {/* Phase Load Inputs */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Phase Loads (Amps)</h4>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-medium text-red-600 dark:text-red-400">L1</label>
                <Input
                  type="number"
                  inputMode="decimal"
                  value={localValues.phaseBalanceL1}
                  onChange={(e) => setLocalValues(prev => ({ ...prev, phaseBalanceL1: e.target.value }))}
                  placeholder="0"
                  className="h-12 text-lg text-center touch-manipulation bg-red-50/50 dark:bg-red-950/20 border-red-200"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-yellow-600 dark:text-yellow-400">L2</label>
                <Input
                  type="number"
                  inputMode="decimal"
                  value={localValues.phaseBalanceL2}
                  onChange={(e) => setLocalValues(prev => ({ ...prev, phaseBalanceL2: e.target.value }))}
                  placeholder="0"
                  className="h-12 text-lg text-center touch-manipulation bg-yellow-50/50 dark:bg-yellow-950/20 border-yellow-200"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-blue-600 dark:text-blue-400">L3</label>
                <Input
                  type="number"
                  inputMode="decimal"
                  value={localValues.phaseBalanceL3}
                  onChange={(e) => setLocalValues(prev => ({ ...prev, phaseBalanceL3: e.target.value }))}
                  placeholder="0"
                  className="h-12 text-lg text-center touch-manipulation bg-blue-50/50 dark:bg-blue-950/20 border-blue-200"
                />
              </div>
            </div>
          </div>

          {/* Live Balance Indicator */}
          {balance && (
            <div className={`p-3 rounded-lg ${getPhaseBalanceColor(balance.imbalancePercent)}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Phase Balance</span>
                <div className="flex items-center gap-1">
                  {balance.isCompliant ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                  <span className="font-semibold">{balance.imbalancePercent}%</span>
                </div>
              </div>
              {balance.recommendation && (
                <p className="text-xs mt-1 opacity-80">{balance.recommendation}</p>
              )}
            </div>
          )}

          {/* Phase Rotation */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Phase Rotation</label>
            <div className="grid grid-cols-2 gap-2">
              {['✓', '✗', 'L1-L2-L3', 'N/A'].map((option) => (
                <Button
                  key={option}
                  variant={localValues.phaseRotation === option ? 'default' : 'outline'}
                  className={`h-12 touch-manipulation ${
                    option === '✓' ? 'text-green-600 border-green-300' :
                    option === '✗' ? 'text-red-600 border-red-300' : ''
                  }`}
                  onClick={() => setLocalValues(prev => ({ ...prev, phaseRotation: option }))}
                >
                  {option === '✓' ? '✓ Correct' : option === '✗' ? '✗ Incorrect' : option}
                </Button>
              ))}
            </div>
          </div>

          {/* Line-to-Line Voltage */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Line-to-Line Voltage</label>
            <div className="flex gap-2">
              <Input
                type="number"
                inputMode="decimal"
                value={localValues.lineToLineVoltage}
                onChange={(e) => setLocalValues(prev => ({ ...prev, lineToLineVoltage: e.target.value }))}
                placeholder="400"
                className="h-12 text-lg touch-manipulation flex-1"
              />
              <span className="flex items-center px-3 bg-muted rounded-md text-muted-foreground">V</span>
            </div>
            <p className="text-xs text-muted-foreground">Nominal: 400V (360-440V acceptable)</p>
          </div>
        </div>

        {/* Save Button */}
        <div className="p-4 border-t bg-background">
          <Button
            onClick={handleSave}
            className="w-full h-12 text-base touch-manipulation"
          >
            Save Changes
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ThreePhaseScheduleOfTests;
