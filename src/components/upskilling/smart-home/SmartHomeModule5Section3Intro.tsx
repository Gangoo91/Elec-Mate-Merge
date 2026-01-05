import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Eye, Shield, Layers } from 'lucide-react';

export const SmartHomeModule5Section3Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Smart homes rely on sensors to detect intrusions or activity. <strong className="text-foreground">Door and window contact sensors</strong> protect entry points, while <strong className="text-foreground">PIR (Passive Infrared) sensors</strong> detect movement within a space. Together, they provide a layered approach to home security — from perimeter protection to internal monitoring.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-[#1a1a1a] border border-blue-600 rounded-lg">
            <Eye className="h-6 w-6 text-blue-400 mb-2" />
            <h4 className="font-semibold text-blue-200 mb-2">Perimeter Detection</h4>
            <p className="text-blue-100 text-sm">Contact sensors secure doors and windows to detect entry attempts.</p>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] border border-green-600 rounded-lg">
            <Shield className="h-6 w-6 text-green-400 mb-2" />
            <h4 className="font-semibold text-green-200 mb-2">Motion Monitoring</h4>
            <p className="text-green-100 text-sm">PIR sensors cover internal spaces to detect movement inside.</p>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] border border-purple-600 rounded-lg">
            <Layers className="h-6 w-6 text-purple-400 mb-2" />
            <h4 className="font-semibold text-purple-200 mb-2">Layered Security</h4>
            <p className="text-purple-100 text-sm">Combined systems provide comprehensive coverage and reduce blind spots.</p>
          </div>
        </div>

        <p>
          Modern sensor systems integrate with smart home hubs to trigger lighting, alarms, and notifications, creating intelligent responses to detected activity.
        </p>
      </CardContent>
    </Card>
  );
};