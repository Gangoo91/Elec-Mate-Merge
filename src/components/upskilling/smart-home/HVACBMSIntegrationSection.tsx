import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, Gauge, Activity, FileText } from 'lucide-react';

export const HVACBMSIntegrationSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-elec-yellow" />
          HVAC Integration in BMS
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p>
          BMS provides comprehensive monitoring and control of HVAC equipment, from individual room 
          controls to large-scale plant equipment. This integration ensures optimal performance, 
          energy efficiency, and compliance reporting.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Thermometer className="h-5 w-5 text-blue-400" />
              <h4 className="font-semibold text-foreground">Equipment Control</h4>
            </div>
            <ul className="text-sm space-y-1">
              <li>• Boilers and chillers</li>
              <li>• Air handling units (AHUs)</li>
              <li>• Variable air volume (VAV) boxes</li>
              <li>• Heat pumps and fan coil units</li>
            </ul>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Gauge className="h-5 w-5 text-green-400" />
              <h4 className="font-semibold text-foreground">Sensor Monitoring</h4>
            </div>
            <ul className="text-sm space-y-1">
              <li>• Temperature and humidity sensors</li>
              <li>• CO₂ and air quality monitoring</li>
              <li>• Pressure and flow sensors</li>
              <li>• Energy consumption meters</li>
            </ul>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="h-5 w-5 text-purple-400" />
              <h4 className="font-semibold text-foreground">Interlocks & Safety</h4>
            </div>
            <ul className="text-sm space-y-1">
              <li>• Prevents heating and cooling conflicts</li>
              <li>• Zone-based control coordination</li>
              <li>• Emergency shutdown procedures</li>
              <li>• Equipment protection protocols</li>
            </ul>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-orange-400" />
              <h4 className="font-semibold text-foreground">Performance Data</h4>
            </div>
            <ul className="text-sm space-y-1">
              <li>• Energy consumption reporting</li>
              <li>• System efficiency metrics</li>
              <li>• Compliance documentation</li>
              <li>• Maintenance scheduling</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">Key Benefits:</h4>
          <p className="text-sm">
            BMS integration allows facilities managers to monitor entire HVAC systems from a single interface, 
            optimise energy consumption across multiple zones, and maintain detailed records for regulatory compliance.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};