
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Settings, Clock, ThermometerSun } from 'lucide-react';

const RcdTestingTab = () => {
  const testingProcedures = [
    { test: 'Test Button Check', frequency: 'Monthly', procedure: 'Press test button - RCD should trip', acceptance: 'RCD trips immediately' },
    { test: '½ × In Test', frequency: 'Periodic', procedure: 'Apply half rated current', acceptance: 'Should NOT trip' },
    { test: '1 × In Test', frequency: 'Periodic', procedure: 'Apply rated current', acceptance: '≤300ms trip time' },
    { test: '5 × In Test', frequency: 'Periodic', procedure: 'Apply 5× rated current', acceptance: '≤40ms trip time' },
    { test: 'Ramp Test', frequency: 'Installation', procedure: 'Gradually increase current', acceptance: 'Trip between 50-100% In' }
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings className="h-6 w-6 text-elec-yellow" />
          RCD Testing Procedures
        </CardTitle>
        <CardDescription>
          Comprehensive testing methods and acceptance criteria
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="overflow-x-auto">
          <Table className="border border-border">
            <TableHeader>
              <TableRow className="border-elec-yellow/30 bg-muted/50">
                <TableHead className="text-elec-yellow font-bold border-r border-border">Test Type</TableHead>
                <TableHead className="text-elec-yellow font-bold border-r border-border">Frequency</TableHead>
                <TableHead className="text-elec-yellow font-bold border-r border-border">Procedure</TableHead>
                <TableHead className="text-elec-yellow font-bold">Acceptance Criteria</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testingProcedures.map((test, idx) => (
                <TableRow key={idx} className="border-border hover:bg-muted/30">
                  <TableCell className="text-foreground font-semibold border-r border-border">{test.test}</TableCell>
                  <TableCell className="text-gray-200 border-r border-border">{test.frequency}</TableCell>
                  <TableCell className="text-gray-200 border-r border-border">{test.procedure}</TableCell>
                  <TableCell className="text-elec-yellow">{test.acceptance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-muted border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-400" />
                Test Intervals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-neutral-600 rounded">
                  <span className="text-foreground text-sm">Domestic</span>
                  <span className="text-elec-yellow">Monthly</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-neutral-600 rounded">
                  <span className="text-foreground text-sm">Commercial</span>
                  <span className="text-elec-yellow">Monthly</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-neutral-600 rounded">
                  <span className="text-foreground text-sm">Industrial</span>
                  <span className="text-elec-yellow">Weekly</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-neutral-600 rounded">
                  <span className="text-foreground text-sm">Construction</span>
                  <span className="text-elec-yellow">Daily</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <ThermometerSun className="h-5 w-5 text-orange-400" />
                Environmental Factors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="p-3 bg-amber-500/10 rounded border border-amber-500/30">
                  <h4 className="font-semibold text-amber-400 text-sm">Temperature Effects</h4>
                  <p className="text-xs text-gray-300">RCD sensitivity may vary with temperature</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded border border-blue-500/30">
                  <h4 className="font-semibold text-blue-400 text-sm">Humidity Effects</h4>
                  <p className="text-xs text-gray-300">High humidity can affect insulation resistance</p>
                </div>
                <div className="p-3 bg-red-500/10 rounded border border-red-500/30">
                  <h4 className="font-semibold text-red-400 text-sm">Harmonics</h4>
                  <p className="text-xs text-gray-300">Electronic loads may cause nuisance tripping</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default RcdTestingTab;
