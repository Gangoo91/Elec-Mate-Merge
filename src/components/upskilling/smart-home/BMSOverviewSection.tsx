import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Monitor, BarChart3 } from 'lucide-react';

export const BMSOverviewSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building2 className="h-5 w-5 text-elec-yellow" />
          What is a Building Management System (BMS)?
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p>
          A Building Management System (BMS) is a centralised platform for controlling HVAC, lighting, 
          security, and energy systems in larger buildings. It provides comprehensive monitoring, 
          scheduling, and efficiency reporting capabilities.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-5 w-5 text-blue-400" />
              <h4 className="font-semibold text-foreground">Centralised Platform</h4>
            </div>
            <p className="text-sm">Single interface controlling HVAC, lighting, security, and energy systems across the entire building</p>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Monitor className="h-5 w-5 text-green-400" />
              <h4 className="font-semibold text-foreground">Monitoring & Control</h4>
            </div>
            <p className="text-sm">Real-time monitoring of all building systems with automated scheduling and control capabilities</p>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="h-5 w-5 text-purple-400" />
              <h4 className="font-semibold text-foreground">Efficiency Reporting</h4>
            </div>
            <p className="text-sm">Detailed energy performance data and analytics for compliance and optimisation</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-foreground mb-3">Core BMS Functions</h4>
            <div className="space-y-3">
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground text-sm mb-1">Monitoring & Control</h5>
                <p className="text-xs text-gray-400">Real-time oversight of all building systems with centralised control capabilities</p>
              </div>
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground text-sm mb-1">Energy Management</h5>
                <p className="text-xs text-gray-400">Optimisation algorithms to reduce consumption while maintaining comfort</p>
              </div>
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground text-sm mb-1">Alarm Management</h5>
                <p className="text-xs text-gray-400">Automated alerts for equipment failures, maintenance needs, and system anomalies</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-3">System Integration</h4>
            <div className="space-y-3">
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground text-sm mb-1">HVAC Systems</h5>
                <p className="text-xs text-gray-400">Boilers, chillers, AHUs, VAV boxes, and heat pumps</p>
              </div>
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground text-sm mb-1">Lighting Control</h5>
                <p className="text-xs text-gray-400">LED drivers, occupancy sensors, daylight harvesting systems</p>
              </div>
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground text-sm mb-1">Security & Access</h5>
                <p className="text-xs text-gray-400">CCTV, access control, fire safety, and emergency systems</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">Typical Installation Sites:</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Commercial offices and business centres</li>
              <li>Schools, colleges, and universities</li>
              <li>Hospitals and healthcare facilities</li>
            </ul>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Shopping centres and retail complexes</li>
              <li>Industrial and manufacturing facilities</li>
              <li>Hotels and hospitality venues</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">Size Considerations:</h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-foreground mb-1">Small Commercial (1,000-5,000m²)</h5>
              <p className="text-xs">Basic BMS or advanced smart home systems may suffice</p>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-1">Medium Commercial (5,000-20,000m²)</h5>
              <p className="text-xs">Full BMS typically justified with 2-4 year payback</p>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-1">Large Sites (20,000m²+)</h5>
              <p className="text-xs">Complex BMS essential for efficiency and compliance</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};