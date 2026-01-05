
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Thermometer, Users, Shield, AlertTriangle } from 'lucide-react';

const ambientTemperatureData = [
  { temp: 25, factor: 1.22, status: 'high' },
  { temp: 30, factor: 1.15, status: 'good' },
  { temp: 35, factor: 1.08, status: 'good' },
  { temp: 40, factor: 1.00, status: 'standard' },
  { temp: 45, factor: 0.91, status: 'caution' },
  { temp: 50, factor: 0.82, status: 'caution' },
  { temp: 55, factor: 0.71, status: 'critical' },
  { temp: 60, factor: 0.58, status: 'critical' }
];

const groupingData = [
  { circuits: 1, factor: 1.00, description: 'Single circuit' },
  { circuits: 2, factor: 0.80, description: 'Two circuits' },
  { circuits: 3, factor: 0.70, description: 'Three circuits' },
  { circuits: 4, factor: 0.65, description: 'Four circuits' },
  { circuits: 5, factor: 0.60, description: 'Five circuits' },
  { circuits: 6, factor: 0.57, description: 'Six circuits' },
  { circuits: 9, factor: 0.50, description: 'Nine or more circuits' }
];

const thermalInsulationData = [
  { type: 'None', factor: 1.00, description: 'No thermal insulation touching cable', status: 'good' },
  { type: 'Partial Contact', factor: 0.87, description: 'Cable touching insulation on one side', status: 'caution' },
  { type: 'Fully Surrounded', factor: 0.78, description: 'Cable completely surrounded by insulation', status: 'critical' }
];

export const EnvironmentalFactorsSection = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high': return 'bg-green-500/10 text-green-400 border-green-400';
      case 'good': return 'bg-blue-500/10 text-blue-400 border-blue-400';
      case 'standard': return 'bg-yellow-500/10 text-yellow-400 border-yellow-400';
      case 'caution': return 'bg-orange-500/10 text-orange-400 border-orange-400';
      case 'critical': return 'bg-red-500/10 text-red-400 border-red-400';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Ambient Temperature Factors */}
      <Card className="bg-muted border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-orange-400" />
            Ambient Temperature Correction Factors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-orange-500/10 rounded-lg border border-orange-500/30">
            <p className="text-sm text-gray-300">
              <strong className="text-orange-400">BS 7671 Table 4B1:</strong> Reference temperature is 30°C for cables in air, 20°C for cables in ground.
              These factors apply to the tabulated current-carrying capacities.
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground">Temperature (°C)</TableHead>
                <TableHead className="text-foreground">Correction Factor</TableHead>
                <TableHead className="text-foreground">Capacity Change</TableHead>
                <TableHead className="text-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ambientTemperatureData.map((item) => (
                <TableRow key={item.temp}>
                  <TableCell className="text-foreground font-medium">{item.temp}°C</TableCell>
                  <TableCell className="text-elec-yellow font-bold">{item.factor}</TableCell>
                  <TableCell className="text-gray-300">
                    {item.factor > 1 ? '+' : ''}{Math.round((item.factor - 1) * 100)}%
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(item.status)}>
                      {item.status === 'standard' ? 'Reference' : 
                       item.factor > 1 ? 'Increase' : 'Decrease'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Grouping Factors */}
      <Card className="bg-muted border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-400" />
            Grouping Correction Factors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
            <p className="text-sm text-gray-300">
              <strong className="text-purple-400">BS 7671 Table 4C1:</strong> Applies when cables are grouped together and 
              likely to be loaded simultaneously, causing mutual heating effects.
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground">Number of Circuits</TableHead>
                <TableHead className="text-foreground">Correction Factor</TableHead>
                <TableHead className="text-foreground">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groupingData.map((item) => (
                <TableRow key={item.circuits}>
                  <TableCell className="text-foreground font-medium">{item.circuits}</TableCell>
                  <TableCell className="text-elec-yellow font-bold">{item.factor}</TableCell>
                  <TableCell className="text-gray-300">{item.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Thermal Insulation Factors */}
      <Card className="bg-muted border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-400" />
            Thermal Insulation Correction Factors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-green-500/10 rounded-lg border border-green-500/30">
            <p className="text-sm text-gray-300">
              <strong className="text-green-400">BS 7671 Section 523:</strong> Cables in contact with or surrounded by 
              thermal insulation require derating due to reduced heat dissipation.
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground">Insulation Type</TableHead>
                <TableHead className="text-foreground">Correction Factor</TableHead>
                <TableHead className="text-foreground">Description</TableHead>
                <TableHead className="text-foreground">Impact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {thermalInsulationData.map((item) => (
                <TableRow key={item.type}>
                  <TableCell className="text-foreground font-medium">{item.type}</TableCell>
                  <TableCell className="text-elec-yellow font-bold">{item.factor}</TableCell>
                  <TableCell className="text-gray-300">{item.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(item.status)}>
                      {item.factor === 1.00 ? 'None' : `${Math.round((1 - item.factor) * 100)}% reduction`}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
