
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle, FileCheck, Info } from 'lucide-react';

interface ComplianceItem {
  id: string;
  regulation: string;
  description: string;
  requirement: string;
  status: 'compliant' | 'warning' | 'non-compliant' | 'unchecked';
  critical: boolean;
}

const complianceItems: ComplianceItem[] = [
  {
    id: 'overload_protection',
    regulation: 'BS 7671 Section 433.1',
    description: 'Overload Protection',
    requirement: 'Ib ≤ In ≤ Iz (Design current ≤ Nominal current ≤ Cable capacity)',
    status: 'unchecked',
    critical: true
  },
  {
    id: 'operating_current',
    regulation: 'BS 7671 Section 433.1.1',
    description: 'Operating Current',
    requirement: 'I2 ≤ 1.45 × Iz (Operating current ≤ 1.45 × Cable capacity)',
    status: 'unchecked',
    critical: true
  },
  {
    id: 'voltage_drop',
    regulation: 'BS 7671 Section 525',
    description: 'Voltage Drop Limits',
    requirement: 'Lighting: 3% (6.9V), Power: 5% (11.5V), Motors: 2.5% (5.75V)',
    status: 'unchecked',
    critical: true
  },
  {
    id: 'correction_factors',
    regulation: 'BS 7671 Section 523',
    description: 'Environmental Correction Factors',
    requirement: 'Apply ambient temperature, grouping, and thermal insulation factors',
    status: 'unchecked',
    critical: true
  },
  {
    id: 'fault_protection',
    regulation: 'BS 7671 Section 434',
    description: 'Fault Current Protection',
    requirement: 'Cable must withstand fault current until protective device operates',
    status: 'unchecked',
    critical: true
  },
  {
    id: 'installation_method',
    regulation: 'BS 7671 Table 4A2',
    description: 'Installation Method Classification',
    requirement: 'Correct reference method selection and derating factors applied',
    status: 'unchecked',
    critical: false
  },
  {
    id: 'conductor_material',
    regulation: 'BS 7671 Section 521',
    description: 'Conductor Material Selection',
    requirement: 'Appropriate conductor material for application and environment',
    status: 'unchecked',
    critical: false
  },
  {
    id: 'insulation_type',
    regulation: 'BS 7671 Section 522',
    description: 'Insulation Type and Temperature Rating',
    requirement: 'Suitable insulation type for operating temperature and environment',
    status: 'unchecked',
    critical: false
  }
];

export const RegulationComplianceChecklist = () => {
  const [items, setItems] = useState<ComplianceItem[]>(complianceItems);

  const updateItemStatus = (id: string, status: ComplianceItem['status']) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, status } : item
    ));
  };

  const getStatusIcon = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'non-compliant':
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-white/70" />;
    }
  };

  const getStatusBadge = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'compliant':
        return <Badge className="bg-green-500 text-foreground">Compliant</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500 text-black">Warning</Badge>;
      case 'non-compliant':
        return <Badge className="bg-red-500 text-foreground">Non-Compliant</Badge>;
      default:
        return <Badge variant="outline" className="text-white/70 border-white/70">Unchecked</Badge>;
    }
  };

  const criticalItems = items.filter(item => item.critical);
  const nonCriticalItems = items.filter(item => !item.critical);
  
  const overallCompliance = criticalItems.every(item => item.status === 'compliant') && 
                           !items.some(item => item.status === 'non-compliant');

  const complianceStats = {
    compliant: items.filter(item => item.status === 'compliant').length,
    warning: items.filter(item => item.status === 'warning').length,
    nonCompliant: items.filter(item => item.status === 'non-compliant').length,
    unchecked: items.filter(item => item.status === 'unchecked').length
  };

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <Card className={`border-2 ${
        overallCompliance ? 'bg-green-500/10 border-green-500/50' : 'bg-red-500/10 border-red-500/50'
      }`}>
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-elec-yellow" />
            BS 7671 Compliance Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{complianceStats.compliant}</div>
              <div className="text-sm text-white/80">Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{complianceStats.warning}</div>
              <div className="text-sm text-white/80">Warnings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">{complianceStats.nonCompliant}</div>
              <div className="text-sm text-white/80">Non-Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white/70">{complianceStats.unchecked}</div>
              <div className="text-sm text-white/80">Unchecked</div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${
            overallCompliance ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
          }`}>
            <div className="flex items-center gap-2">
              {overallCompliance ? (
                <CheckCircle className="h-6 w-6 text-green-400" />
              ) : (
                <XCircle className="h-6 w-6 text-red-400" />
              )}
              <span className="text-lg font-semibold text-foreground">
                {overallCompliance ? 'Design Compliant with BS 7671' : 'Design Requires Attention'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Critical Requirements */}
      <Card className="bg-muted border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            Critical Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {criticalItems.map((item) => (
            <div key={item.id} className="p-4 bg-card rounded-lg border border-border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(item.status)}
                  <div>
                    <h4 className="font-semibold text-foreground">{item.description}</h4>
                    <p className="text-sm text-blue-400">{item.regulation}</p>
                  </div>
                </div>
                {getStatusBadge(item.status)}
              </div>
              
              <p className="text-sm text-white/80 mb-3">{item.requirement}</p>
              
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => updateItemStatus(item.id, 'compliant')}
                  className="bg-green-600 hover:bg-green-700 text-foreground"
                >
                  Compliant
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => updateItemStatus(item.id, 'warning')}
                  className="bg-yellow-600 hover:bg-yellow-700 text-foreground"
                >
                  Warning
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => updateItemStatus(item.id, 'non-compliant')}
                  className="bg-red-600 hover:bg-red-700 text-foreground"
                >
                  Non-Compliant
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Additional Requirements */}
      <Card className="bg-muted border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-400" />
            Additional Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {nonCriticalItems.map((item) => (
            <div key={item.id} className="p-4 bg-card rounded-lg border border-border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(item.status)}
                  <div>
                    <h4 className="font-semibold text-foreground">{item.description}</h4>
                    <p className="text-sm text-blue-400">{item.regulation}</p>
                  </div>
                </div>
                {getStatusBadge(item.status)}
              </div>
              
              <p className="text-sm text-white/80 mb-3">{item.requirement}</p>
              
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => updateItemStatus(item.id, 'compliant')}
                  className="bg-green-600 hover:bg-green-700 text-foreground"
                >
                  Compliant
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => updateItemStatus(item.id, 'warning')}
                  className="bg-yellow-600 hover:bg-yellow-700 text-foreground"
                >
                  Warning
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => updateItemStatus(item.id, 'non-compliant')}
                  className="bg-red-600 hover:bg-red-700 text-foreground"
                >
                  Non-Compliant
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
