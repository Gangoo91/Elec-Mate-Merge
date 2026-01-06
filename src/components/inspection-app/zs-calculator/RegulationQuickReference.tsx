
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, Clock, Zap, Shield, Info } from 'lucide-react';

export const RegulationQuickReference = () => {
  const disconnectionTimes = [
    { voltage: '230V (Single Phase)', finalCircuits: '0.4s', distribution: '5s', application: 'Most domestic and commercial' },
    { voltage: '400V (Three Phase)', finalCircuits: '0.4s', distribution: '5s', application: 'Commercial and industrial' },
    { voltage: 'SELV (≤50V)', finalCircuits: 'N/A', distribution: 'N/A', application: 'Extra low voltage systems' }
  ];

  const rcdRequirements = [
    { application: 'Socket outlets ≤20A', rating: '30mA', type: 'AC or A', requirement: 'Mandatory' },
    { application: 'Bathrooms', rating: '30mA', type: 'AC or A', requirement: 'Mandatory' },
    { application: 'Outdoor installations', rating: '30mA', type: 'AC or A', requirement: 'Mandatory' },
    { application: 'Mobile equipment', rating: '30mA', type: 'AC or A', requirement: 'Mandatory' },
    { application: 'Swimming pools', rating: '30mA', type: 'AC or A', requirement: 'Mandatory' },
    { application: 'Fire protection', rating: '100-300mA', type: 'AC', requirement: 'Where specified' }
  ];

  const testingFrequency = [
    { installation: 'Domestic dwellings', visual: 'Annual', testing: '10 years', rcd: 'Quarterly' },
    { installation: 'Commercial offices', visual: 'Annual', testing: '5 years', rcd: 'Monthly' },
    { installation: 'Industrial premises', visual: '6 months', testing: '3 years', rcd: 'Monthly' },
    { installation: 'Medical locations', visual: 'Monthly', testing: 'Annual', rcd: 'Daily' },
    { installation: 'Construction sites', visual: 'Daily', testing: '3 months', rcd: 'Daily' }
  ];

  return (
    <div className="space-y-6">
      {/* Disconnection Times */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Maximum Disconnection Times
          </CardTitle>
          <CardDescription>
            Required automatic disconnection times for different system voltages (BS 7671 Table 41.1)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="border border-border">
              <TableHeader>
                <TableRow className="border-elec-yellow/30 bg-muted/50">
                  <TableHead className="text-elec-yellow font-bold border-r border-border">System Voltage</TableHead>
                  <TableHead className="text-elec-yellow font-bold text-center border-r border-border">Final Circuits</TableHead>
                  <TableHead className="text-elec-yellow font-bold text-center border-r border-border">Distribution</TableHead>
                  <TableHead className="text-elec-yellow font-bold">Typical Application</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {disconnectionTimes.map((item, idx) => (
                  <TableRow key={idx} className="border-border hover:bg-muted/30">
                    <TableCell className="text-foreground font-semibold border-r border-border">{item.voltage}</TableCell>
                    <TableCell className="text-center border-r border-border">
                      <Badge className="bg-red-500/20 text-red-400">{item.finalCircuits}</Badge>
                    </TableCell>
                    <TableCell className="text-center border-r border-border">
                      <Badge className="bg-orange-500/20 text-orange-400">{item.distribution}</Badge>
                    </TableCell>
                    <TableCell className="text-white/80">{item.application}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <span className="text-red-400 font-semibold text-sm">Critical Note</span>
            </div>
            <p className="text-white/80 text-sm">
              These times are maximum allowable values. Faster disconnection provides better protection.
              RCD protection allows different disconnection criteria but must still meet shock protection requirements.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* RCD Requirements */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Shield className="h-5 w-5" />
            RCD Protection Requirements
          </CardTitle>
          <CardDescription>
            Mandatory RCD protection requirements under BS 7671
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="border border-border">
              <TableHeader>
                <TableRow className="border-elec-yellow/30 bg-muted/50">
                  <TableHead className="text-elec-yellow font-bold border-r border-border">Application</TableHead>
                  <TableHead className="text-elec-yellow font-bold text-center border-r border-border">Rating</TableHead>
                  <TableHead className="text-elec-yellow font-bold text-center border-r border-border">Type</TableHead>
                  <TableHead className="text-elec-yellow font-bold text-center">Requirement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rcdRequirements.map((item, idx) => (
                  <TableRow key={idx} className="border-border hover:bg-muted/30">
                    <TableCell className="text-foreground font-semibold border-r border-border">{item.application}</TableCell>
                    <TableCell className="text-center border-r border-border">
                      <Badge className="bg-blue-500/20 text-blue-400">{item.rating}</Badge>
                    </TableCell>
                    <TableCell className="text-center border-r border-border text-white/80">{item.type}</TableCell>
                    <TableCell className="text-center">
                      <Badge className={item.requirement === 'Mandatory' ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white/70'}>
                        {item.requirement}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Testing Frequency */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Inspection & Testing Frequency
          </CardTitle>
          <CardDescription>
            Recommended inspection and testing intervals for different installation types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="border border-border">
              <TableHeader>
                <TableRow className="border-elec-yellow/30 bg-muted/50">
                  <TableHead className="text-elec-yellow font-bold border-r border-border">Installation Type</TableHead>
                  <TableHead className="text-elec-yellow font-bold text-center border-r border-border">Visual Inspection</TableHead>
                  <TableHead className="text-elec-yellow font-bold text-center border-r border-border">Full Testing</TableHead>
                  <TableHead className="text-elec-yellow font-bold text-center">RCD Testing</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testingFrequency.map((item, idx) => (
                  <TableRow key={idx} className="border-border hover:bg-muted/30">
                    <TableCell className="text-foreground font-semibold border-r border-border">{item.installation}</TableCell>
                    <TableCell className="text-center border-r border-border">
                      <Badge className="bg-green-500/20 text-green-400">{item.visual}</Badge>
                    </TableCell>
                    <TableCell className="text-center border-r border-border">
                      <Badge className="bg-blue-500/20 text-blue-400">{item.testing}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className="bg-orange-500/20 text-orange-400">{item.rcd}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400 font-semibold text-sm">Testing Notes</span>
            </div>
            <ul className="text-white/80 text-sm space-y-1">
              <li>• These are typical intervals - specific circumstances may require more frequent testing</li>
              <li>• RCD testing using test button should be carried out by competent persons</li>
              <li>• Records must be kept of all inspections and tests performed</li>
              <li>• Any defects found must be rectified immediately or installation made safe</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
