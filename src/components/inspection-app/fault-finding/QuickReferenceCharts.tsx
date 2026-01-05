
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MobileTabs, MobileTabsList, MobileTabsTrigger, MobileTabsContent } from '@/components/ui/mobile-tabs';
import { BookOpen, Zap, Shield, AlertTriangle, Clock, Target } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const QuickReferenceCharts = () => {
  const isMobile = useIsMobile();

  const tabs = [
    { value: 'limits', label: 'Test Limits', icon: <Target className="h-4 w-4" /> },
    { value: 'symptoms', label: 'Fault Symptoms', icon: <AlertTriangle className="h-4 w-4" /> },
    { value: 'times', label: 'Disconnection Times', icon: <Clock className="h-4 w-4" /> },
    { value: 'equipment', label: 'Test Equipment', icon: <Zap className="h-4 w-4" /> }
  ];

  const testLimits = [
    { test: 'Insulation Resistance', circuit: 'Final Circuits', limit: '≥1.0 MΩ', notes: '0.5 MΩ acceptable with investigation' },
    { test: 'Insulation Resistance', circuit: 'Distribution Circuits', limit: '≥1.0 MΩ', notes: 'Higher values expected' },
    { test: 'Continuity R1+R2', circuit: '2.5mm² Ring Final', limit: '≤1.67 Ω', notes: 'At 20°C ambient temperature' },
    { test: 'Continuity R1+R2', circuit: '4.0mm² Ring Final', limit: '≤1.04 Ω', notes: 'At 20°C ambient temperature' },
    { test: 'RCD Operation', circuit: '30mA RCD', limit: '≤300ms @ 1×In', notes: '≤40ms @ 5×In' },
    { test: 'RCD Operation', circuit: '100mA RCD', limit: '≤300ms @ 1×In', notes: '≤200ms @ 2×In' },
    { test: 'Earth Fault Loop', circuit: 'Type B MCB', limit: 'See Table 41.3', notes: 'Depends on rating and type' },
    { test: 'Earth Fault Loop', circuit: 'Type C MCB', limit: 'See Table 41.4', notes: 'Lower limits than Type B' }
  ];

  const faultSymptoms = [
    { symptom: 'MCB trips immediately', priority: 'HIGH', likely: 'Short circuit, overload', action: 'Isolate loads, test continuity' },
    { symptom: 'RCD trips randomly', priority: 'HIGH', likely: 'Earth leakage', action: 'Test individual circuits' },
    { symptom: 'Electric shock', priority: 'CRITICAL', likely: 'Earth fault, insulation failure', action: 'Immediate isolation required' },
    { symptom: 'Burning smell', priority: 'CRITICAL', likely: 'Overheating, arcing', action: 'Immediate power isolation' },
    { symptom: 'Lights flickering', priority: 'MEDIUM', likely: 'Loose connections, voltage issues', action: 'Check connections, monitor voltage' },
    { symptom: 'No power to circuit', priority: 'LOW', likely: 'Tripped MCB/RCD, loose connection', action: 'Check consumer unit first' }
  ];

  const disconnectionTimes = [
    { voltage: '230V Final Circuits', maxTime: '0.4s', application: 'Socket outlets, fixed equipment' },
    { voltage: '230V Distribution', maxTime: '5s', application: 'Distribution circuits only' },
    { voltage: '400V Final Circuits', maxTime: '0.4s', application: 'Three-phase final circuits' },
    { voltage: '400V Distribution', maxTime: '5s', application: 'Three-phase distribution' }
  ];

  const testEquipment = [
    { equipment: 'Insulation Tester', voltage: '500V DC', use: 'Circuits up to 500V', standard: 'BS EN 61557-2' },
    { equipment: 'Insulation Tester', voltage: '1000V DC', use: 'Circuits above 500V', standard: 'BS EN 61557-2' },
    { equipment: 'Continuity Tester', voltage: '4-24V DC', use: 'Low resistance measurements', standard: 'BS EN 61557-4' },
    { equipment: 'RCD Tester', type: 'AC/A Types', use: 'Standard RCD testing', standard: 'BS EN 61557-6' },
    { equipment: 'Loop Tester', type: 'Auto/Manual', use: 'Earth fault loop impedance', standard: 'BS EN 61557-3' },
    { equipment: 'Multimeter', type: 'CAT III/IV', use: 'General measurements', standard: 'BS EN 61010' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-red-500';
      case 'HIGH': return 'bg-orange-500';
      case 'MEDIUM': return 'bg-yellow-500';
      case 'LOW': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Quick Reference Charts
          <Badge className="ml-auto bg-elec-yellow text-black">BS 7671 Standards</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <MobileTabs defaultValue="limits" className="w-full">
          <MobileTabsList className="bg-muted">
            {tabs.map((tab) => (
              <MobileTabsTrigger 
                key={tab.value}
                value={tab.value}
                className={`data-[state=active]:bg-elec-yellow data-[state=active]:text-black flex items-center gap-2 ${
                  isMobile ? 'text-xs min-w-[70px]' : ''
                }`}
              >
                {tab.icon}
                <span className={isMobile ? 'hidden sm:inline' : ''}>{tab.label}</span>
              </MobileTabsTrigger>
            ))}
          </MobileTabsList>

          <MobileTabsContent value="limits" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-green-400" />
                <h3 className="text-lg font-semibold text-foreground">Acceptable Test Limits</h3>
              </div>
              <div className="overflow-x-auto">
                <Table className="border border-border">
                  <TableHeader>
                    <TableRow className="border-elec-yellow/30 bg-muted/50">
                      <TableHead className="text-elec-yellow font-bold border-r border-border">Test Type</TableHead>
                      <TableHead className="text-elec-yellow font-bold border-r border-border">Circuit/Application</TableHead>
                      <TableHead className="text-elec-yellow font-bold border-r border-border">Limit</TableHead>
                      <TableHead className="text-elec-yellow font-bold">Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {testLimits.map((item, idx) => (
                      <TableRow key={idx} className="border-border hover:bg-muted/30">
                        <TableCell className="text-foreground font-semibold border-r border-border">{item.test}</TableCell>
                        <TableCell className="text-gray-300 border-r border-border">{item.circuit}</TableCell>
                        <TableCell className="text-center border-r border-border">
                          <Badge className="bg-green-500/20 text-green-400">{item.limit}</Badge>
                        </TableCell>
                        <TableCell className="text-gray-300 text-sm">{item.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </MobileTabsContent>

          <MobileTabsContent value="symptoms" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
                <h3 className="text-lg font-semibold text-foreground">Common Fault Symptoms</h3>
              </div>
              <div className="overflow-x-auto">
                <Table className="border border-border">
                  <TableHeader>
                    <TableRow className="border-elec-yellow/30 bg-muted/50">
                      <TableHead className="text-elec-yellow font-bold border-r border-border">Symptom</TableHead>
                      <TableHead className="text-elec-yellow font-bold text-center border-r border-border">Priority</TableHead>
                      <TableHead className="text-elec-yellow font-bold border-r border-border">Likely Cause</TableHead>
                      <TableHead className="text-elec-yellow font-bold">Immediate Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {faultSymptoms.map((item, idx) => (
                      <TableRow key={idx} className="border-border hover:bg-muted/30">
                        <TableCell className="text-foreground font-semibold border-r border-border">{item.symptom}</TableCell>
                        <TableCell className="text-center border-r border-border">
                          <Badge className={`${getPriorityColor(item.priority)} text-foreground`}>{item.priority}</Badge>
                        </TableCell>
                        <TableCell className="text-gray-300 border-r border-border">{item.likely}</TableCell>
                        <TableCell className="text-gray-300 text-sm">{item.action}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </MobileTabsContent>

          <MobileTabsContent value="times" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-foreground">Maximum Disconnection Times</h3>
              </div>
              <div className="overflow-x-auto">
                <Table className="border border-border">
                  <TableHeader>
                    <TableRow className="border-elec-yellow/30 bg-muted/50">
                      <TableHead className="text-elec-yellow font-bold border-r border-border">System Voltage</TableHead>
                      <TableHead className="text-elec-yellow font-bold text-center border-r border-border">Max Time</TableHead>
                      <TableHead className="text-elec-yellow font-bold">Application</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {disconnectionTimes.map((item, idx) => (
                      <TableRow key={idx} className="border-border hover:bg-muted/30">
                        <TableCell className="text-foreground font-semibold border-r border-border">{item.voltage}</TableCell>
                        <TableCell className="text-center border-r border-border">
                          <Badge className="bg-red-500/20 text-red-400">{item.maxTime}</Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">{item.application}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </MobileTabsContent>

          <MobileTabsContent value="equipment" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-foreground">Test Equipment Requirements</h3>
              </div>
              <div className="overflow-x-auto">
                <Table className="border border-border">
                  <TableHeader>
                    <TableRow className="border-elec-yellow/30 bg-muted/50">
                      <TableHead className="text-elec-yellow font-bold border-r border-border">Equipment</TableHead>
                      <TableHead className="text-elec-yellow font-bold text-center border-r border-border">Specification</TableHead>
                      <TableHead className="text-elec-yellow font-bold border-r border-border">Primary Use</TableHead>
                      <TableHead className="text-elec-yellow font-bold">Standard</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {testEquipment.map((item, idx) => (
                      <TableRow key={idx} className="border-border hover:bg-muted/30">
                        <TableCell className="text-foreground font-semibold border-r border-border">{item.equipment}</TableCell>
                        <TableCell className="text-center border-r border-border">
                          <Badge className="bg-blue-500/20 text-blue-400">{item.voltage || item.type}</Badge>
                        </TableCell>
                        <TableCell className="text-gray-300 border-r border-border">{item.use}</TableCell>
                        <TableCell className="text-gray-300 text-sm">{item.standard}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </MobileTabsContent>
        </MobileTabs>
      </CardContent>
    </Card>
  );
};

export default QuickReferenceCharts;
