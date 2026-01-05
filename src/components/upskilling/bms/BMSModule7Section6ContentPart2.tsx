import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Database, Settings, Book, HardDrive, ClipboardCheck } from 'lucide-react';

const BMSModule7Section6ContentPart2 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <FileText className="h-5 w-5 text-elec-yellow" />
          Documentation Requirements
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p>
          The following documents must be provided to the client to ensure proper operation, 
          maintenance, and future modifications of the BMS:
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
            <FileText className="h-6 w-6 text-elec-yellow mb-3" />
            <h4 className="font-semibold text-foreground mb-2">As-Built Schematics</h4>
            <p className="text-sm text-foreground mb-2">
              Accurate wiring diagrams reflecting the final installation
            </p>
            <ul className="text-xs space-y-1 text-foreground">
              <li>• Updated cable routes and terminations</li>
              <li>• Corrected device locations</li>
              <li>• Final power supply arrangements</li>
              <li>• Emergency circuit modifications</li>
            </ul>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <Database className="h-6 w-6 text-elec-yellow mb-3" />
            <h4 className="font-semibold text-foreground mb-2">IO Lists</h4>
            <p className="text-sm text-gray-300 mb-2">
              Final verified point list with device addresses
            </p>
            <ul className="text-xs space-y-1 text-gray-400">
              <li>• Complete input/output inventory</li>
              <li>• Device descriptions and locations</li>
              <li>• Scaling and engineering units</li>
              <li>• Alarm limits and priorities</li>
            </ul>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <Settings className="h-6 w-6 text-elec-yellow mb-3" />
            <h4 className="font-semibold text-foreground mb-2">Addressing Registers</h4>
            <p className="text-sm text-gray-300 mb-2">
              BACnet IDs, Modbus addresses, KNX physical/group addresses
            </p>
            <ul className="text-xs space-y-1 text-gray-400">
              <li>• Network topology diagrams</li>
              <li>• Device addressing schemes</li>
              <li>• Communication protocol settings</li>
              <li>• Network configuration details</li>
            </ul>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <HardDrive className="h-6 w-6 text-elec-yellow mb-3" />
            <h4 className="font-semibold text-foreground mb-2">Software Backups</h4>
            <p className="text-sm text-gray-300 mb-2">
              Copies of controller programs and server databases
            </p>
            <ul className="text-xs space-y-1 text-gray-400">
              <li>• Controller application software</li>
              <li>• Database configurations</li>
              <li>• Graphics and user interfaces</li>
              <li>• Trending and alarm configurations</li>
            </ul>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <ClipboardCheck className="h-6 w-6 text-elec-yellow mb-3" />
            <h4 className="font-semibold text-foreground mb-2">Commissioning Records</h4>
            <p className="text-sm text-gray-300 mb-2">
              Test sheets showing that all I/O and sequences were verified
            </p>
            <ul className="text-xs space-y-1 text-gray-400">
              <li>• Pre-functional test results</li>
              <li>• Functional commissioning reports</li>
              <li>• Calibration certificates</li>
              <li>• Performance verification data</li>
            </ul>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <Book className="h-6 w-6 text-elec-yellow mb-3" />
            <h4 className="font-semibold text-foreground mb-2">O&M Manuals</h4>
            <p className="text-sm text-gray-300 mb-2">
              Instructions for equipment, controls, and BMS user guides
            </p>
            <ul className="text-xs space-y-1 text-gray-400">
              <li>• Equipment operation procedures</li>
              <li>• Maintenance schedules and procedures</li>
              <li>• Troubleshooting guides</li>
              <li>• Spare parts lists and suppliers</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Inline Check</h4>
          <p className="text-foreground">
            👉 <strong>Why must IO lists and addressing registers be updated before handover?</strong>
          </p>
          <details className="mt-2">
            <summary className="cursor-pointer text-elec-yellow">Click for answer</summary>
            <p className="mt-2 text-sm text-foreground">
              Accurate IO lists and addressing registers are essential for future troubleshooting, 
              modifications, and maintenance. Without them, technicians cannot identify which 
              physical device corresponds to a system alarm or modify the system safely.
            </p>
          </details>
        </div>
      </CardContent>
    </Card>
  );
};

export { BMSModule7Section6ContentPart2 };