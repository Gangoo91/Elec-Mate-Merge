
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Zap } from 'lucide-react';

const RcdTypesTab = () => {
  const rcdTypes = [
    { type: 'AC Type', sensitivity: '30mA', application: 'General domestic circuits', characteristics: 'AC residual current only' },
    { type: 'A Type', sensitivity: '30mA', application: 'Circuits with electronic equipment', characteristics: 'AC + pulsating DC residual current' },
    { type: 'B Type', sensitivity: '30mA', application: 'Circuits with frequency converters', characteristics: 'AC + pulsating DC + smooth DC' },
    { type: 'S Type', sensitivity: '100mA', application: 'Selective coordination', characteristics: 'Time delayed operation' },
    { type: 'G Type', sensitivity: '100mA', application: 'Fire protection', characteristics: 'Time delayed, higher sensitivity' }
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Zap className="h-6 w-6 text-elec-yellow" />
          RCD Types & Characteristics
        </CardTitle>
        <CardDescription>
          Different RCD types and their applications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="overflow-x-auto">
          <Table className="border border-border">
            <TableHeader>
              <TableRow className="border-elec-yellow/30 bg-muted/50">
                <TableHead className="text-elec-yellow font-bold border-r border-border">RCD Type</TableHead>
                <TableHead className="text-elec-yellow font-bold border-r border-border">Sensitivity</TableHead>
                <TableHead className="text-elec-yellow font-bold border-r border-border">Application</TableHead>
                <TableHead className="text-elec-yellow font-bold">Characteristics</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rcdTypes.map((type, idx) => (
                <TableRow key={idx} className="border-border hover:bg-muted/30">
                  <TableCell className="text-foreground font-semibold border-r border-border">{type.type}</TableCell>
                  <TableCell className="text-gray-200 border-r border-border">{type.sensitivity}</TableCell>
                  <TableCell className="text-gray-200 border-r border-border">{type.application}</TableCell>
                  <TableCell className="text-gray-200">{type.characteristics}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-blue-500/10 border border-blue-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-400 text-lg">30mA RCD</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">Additional protection against direct contact and fire protection</p>
            </CardContent>
          </Card>

          <Card className="bg-orange-500/10 border border-orange-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-orange-400 text-lg">100mA RCD</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">Fire protection and discrimination in larger installations</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-500/10 border border-purple-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-400 text-lg">300mA RCD</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">Large commercial installations and fire protection</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default RcdTypesTab;
