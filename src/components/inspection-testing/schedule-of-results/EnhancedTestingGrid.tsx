
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Download, FileText, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { BS7671Validator } from '../BS7671Validator';

interface CircuitResult {
  id: string;
  circuitNumber: string;
  description: string;
  r1r2: number | null;
  insulation: number | null;
  zs: number | null;
  rcd: number | null;
  pfc: number | null;
  polarity: 'pass' | 'fail' | null;
  r1r2Status: 'pass' | 'fail' | 'warning' | null;
  insulationStatus: 'pass' | 'fail' | 'warning' | null;
  zsStatus: 'pass' | 'fail' | 'warning' | null;
  rcdStatus: 'pass' | 'fail' | 'warning' | null;
  overallStatus: 'pass' | 'fail' | 'warning';
}

const EnhancedTestingGrid = () => {
  const [circuits, setCircuits] = useState<CircuitResult[]>([
    {
      id: '1',
      circuitNumber: 'C1',
      description: 'Ring Final Circuit - Sockets',
      r1r2: 0.04,
      insulation: 150,
      zs: 0.35,
      rcd: 28,
      pfc: 1200,
      polarity: 'pass',
      r1r2Status: 'pass',
      insulationStatus: 'pass',
      zsStatus: 'pass',
      rcdStatus: 'pass',
      overallStatus: 'pass'
    },
    {
      id: '2',
      circuitNumber: 'C2',
      description: 'Lighting Circuit',
      r1r2: 0.15,
      insulation: 85,
      zs: 0.95,
      rcd: 32,
      pfc: 950,
      polarity: 'pass',
      r1r2Status: 'warning',
      insulationStatus: 'pass',
      zsStatus: 'warning',
      rcdStatus: 'pass',
      overallStatus: 'warning'
    },
    {
      id: '3',
      circuitNumber: 'C3',
      description: 'Cooker Circuit',
      r1r2: 0.08,
      insulation: 0.8,
      zs: 0.22,
      rcd: null,
      pfc: 1500,
      polarity: 'pass',
      r1r2Status: 'pass',
      insulationStatus: 'fail',
      zsStatus: 'pass',
      rcdStatus: null,
      overallStatus: 'fail'
    }
  ]);

  const validateTestResult = (type: string, value: number | null, polarity?: 'pass' | 'fail' | null) => {
    if (value === null && type !== 'polarity') return null;

    const mockTestResult = {
      stepId: type,
      value,
      status: polarity === 'fail' ? 'failed' : 'completed' as const,
      timestamp: new Date()
    };

    switch (type) {
      case 'r1r2':
        return BS7671Validator.validateContinuityTest(mockTestResult);
      case 'insulation':
        return BS7671Validator.validateInsulationResistance(mockTestResult);
      case 'zs':
        return BS7671Validator.validateEarthFaultLoop(mockTestResult);
      case 'rcd':
        return BS7671Validator.validateRCDTest(mockTestResult);
      case 'polarity':
        return BS7671Validator.validatePolarity(mockTestResult);
      default:
        return { isValid: true, severity: 'info' as const, message: 'OK' };
    }
  };

  const getStatusFromValidation = (validation: any) => {
    if (!validation) return null;
    if (!validation.isValid) return 'fail';
    if (validation.severity === 'warning') return 'warning';
    return 'pass';
  };

  const updateCircuitValue = (circuitId: string, field: string, value: any) => {
    setCircuits(prev => prev.map(circuit => {
      if (circuit.id !== circuitId) return circuit;

      const updated = { ...circuit, [field]: value };

      // Recalculate validation statuses
      updated.r1r2Status = getStatusFromValidation(validateTestResult('r1r2', updated.r1r2));
      updated.insulationStatus = getStatusFromValidation(validateTestResult('insulation', updated.insulation));
      updated.zsStatus = getStatusFromValidation(validateTestResult('zs', updated.zs));
      updated.rcdStatus = getStatusFromValidation(validateTestResult('rcd', updated.rcd));

      // Calculate overall status
      const statuses = [updated.r1r2Status, updated.insulationStatus, updated.zsStatus, updated.rcdStatus, updated.polarity]
        .filter(status => status !== null);
      
      if (statuses.includes('fail')) {
        updated.overallStatus = 'fail';
      } else if (statuses.includes('warning')) {
        updated.overallStatus = 'warning';
      } else {
        updated.overallStatus = 'pass';
      }

      return updated;
    }));
  };

  const addNewCircuit = () => {
    const newCircuit: CircuitResult = {
      id: String(circuits.length + 1),
      circuitNumber: `C${circuits.length + 1}`,
      description: '',
      r1r2: null,
      insulation: null,
      zs: null,
      rcd: null,
      pfc: null,
      polarity: null,
      r1r2Status: null,
      insulationStatus: null,
      zsStatus: null,
      rcdStatus: null,
      overallStatus: 'warning'
    };
    setCircuits(prev => [...prev, newCircuit]);
  };

  const getStatusBadge = (status: 'pass' | 'fail' | 'warning' | null) => {
    if (!status) return <Badge variant="outline">-</Badge>;
    
    const variants = {
      pass: { variant: 'success' as const, icon: CheckCircle, text: 'Pass' },
      fail: { variant: 'destructive' as const, icon: XCircle, text: 'Fail' },
      warning: { variant: 'yellow' as const, icon: AlertTriangle, text: 'Warning' }
    };

    const config = variants[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const exportResults = () => {
    const csvContent = [
      'Circuit,Description,R1+R2(Ω),Status,Insulation(MΩ),Status,Zs(Ω),Status,RCD(ms),Status,PFC(A),Polarity,Overall Status',
      ...circuits.map(circuit => 
        `${circuit.circuitNumber},"${circuit.description}",${circuit.r1r2 || ''},${circuit.r1r2Status || ''},${circuit.insulation || ''},${circuit.insulationStatus || ''},${circuit.zs || ''},${circuit.zsStatus || ''},${circuit.rcd || ''},${circuit.rcdStatus || ''},${circuit.pfc || ''},${circuit.polarity || ''},${circuit.overallStatus}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'eicr-test-results.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateComplianceReport = () => {
    const totalCircuits = circuits.length;
    const passCount = circuits.filter(c => c.overallStatus === 'pass').length;
    const failCount = circuits.filter(c => c.overallStatus === 'fail').length;
    const warningCount = circuits.filter(c => c.overallStatus === 'warning').length;
    const passRate = Math.round((passCount / totalCircuits) * 100);

    return {
      totalCircuits,
      passCount,
      failCount,
      warningCount,
      passRate,
      overallCompliance: failCount === 0
    };
  };

  const complianceStats = generateComplianceReport();

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-500/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pass</p>
                <p className="text-2xl font-bold text-green-500">{complianceStats.passCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Warning</p>
                <p className="text-2xl font-bold text-yellow-500">{complianceStats.warningCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-500/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Fail</p>
                <p className="text-2xl font-bold text-red-500">{complianceStats.failCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pass Rate</p>
                <p className="text-2xl font-bold text-blue-500">{complianceStats.passRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Compliance Status */}
      <Alert className={complianceStats.overallCompliance ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"}>
        {complianceStats.overallCompliance ? (
          <CheckCircle className="h-4 w-4 text-green-400" />
        ) : (
          <XCircle className="h-4 w-4 text-red-400" />
        )}
        <AlertDescription className={complianceStats.overallCompliance ? "text-green-200" : "text-red-200"}>
          <strong>Overall Compliance:</strong> {complianceStats.overallCompliance ? 'SATISFACTORY' : 'UNSATISFACTORY'} - 
          {complianceStats.overallCompliance 
            ? ' All circuits meet BS 7671 requirements' 
            : ` ${complianceStats.failCount} circuit(s) require immediate attention`}
        </AlertDescription>
      </Alert>

      {/* Testing Grid */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-elec-yellow" />
              Enhanced Schedule of Test Results
            </CardTitle>
            <div className="flex gap-2">
              <Button onClick={addNewCircuit} size="sm" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Circuit
              </Button>
              <Button onClick={exportResults} variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Circuit</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>R1+R2 (Ω)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Insulation (MΩ)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Zs (Ω)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>RCD (ms)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>PFC (A)</TableHead>
                  <TableHead>Polarity</TableHead>
                  <TableHead>Overall</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {circuits.map((circuit) => (
                  <TableRow key={circuit.id}>
                    <TableCell className="font-medium">{circuit.circuitNumber}</TableCell>
                    <TableCell>
                      <Input
                        value={circuit.description}
                        onChange={(e) => updateCircuitValue(circuit.id, 'description', e.target.value)}
                        placeholder="Circuit description"
                        className="min-w-[200px]"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        step="0.01"
                        value={circuit.r1r2 || ''}
                        onChange={(e) => updateCircuitValue(circuit.id, 'r1r2', e.target.value ? parseFloat(e.target.value) : null)}
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell>{getStatusBadge(circuit.r1r2Status)}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        step="0.1"
                        value={circuit.insulation || ''}
                        onChange={(e) => updateCircuitValue(circuit.id, 'insulation', e.target.value ? parseFloat(e.target.value) : null)}
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell>{getStatusBadge(circuit.insulationStatus)}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        step="0.01"
                        value={circuit.zs || ''}
                        onChange={(e) => updateCircuitValue(circuit.id, 'zs', e.target.value ? parseFloat(e.target.value) : null)}
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell>{getStatusBadge(circuit.zsStatus)}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={circuit.rcd || ''}
                        onChange={(e) => updateCircuitValue(circuit.id, 'rcd', e.target.value ? parseFloat(e.target.value) : null)}
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell>{getStatusBadge(circuit.rcdStatus)}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={circuit.pfc || ''}
                        onChange={(e) => updateCircuitValue(circuit.id, 'pfc', e.target.value ? parseFloat(e.target.value) : null)}
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell>
                      <select
                        value={circuit.polarity || ''}
                        onChange={(e) => updateCircuitValue(circuit.id, 'polarity', e.target.value || null)}
                        className="border rounded px-2 py-1 bg-background"
                      >
                        <option value="">-</option>
                        <option value="pass">Pass</option>
                        <option value="fail">Fail</option>
                      </select>
                    </TableCell>
                    <TableCell>{getStatusBadge(circuit.overallStatus)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* BS 7671 Compliance Information */}
      <Card className="border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-300">BS 7671 Compliance Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p><strong>R1+R2:</strong> Continuity of protective conductors - Max 1.67Ω for most circuits</p>
          <p><strong>Insulation:</strong> Minimum 1MΩ for circuits up to 500V, >2MΩ recommended</p>
          <p><strong>Zs:</strong> Earth fault loop impedance - varies by protective device type and rating</p>
          <p><strong>RCD:</strong> Residual current device - Max 300ms at 1x rating, 40ms at 5x rating</p>
          <p><strong>PFC:</strong> Prospective fault current - Must not exceed circuit breaker capacity</p>
          <p><strong>Polarity:</strong> Single pole devices must be connected to line conductor</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedTestingGrid;
