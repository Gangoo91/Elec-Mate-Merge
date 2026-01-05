
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

const EmergencySafetyProcedures = () => {
  return (
    <Card className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          Emergency Safety Procedures
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
            <h4 className="font-semibold text-red-400 mb-2">Electrical Fire</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Turn off power at source</li>
              <li>• Use CO2 extinguisher only</li>
              <li>• Never use water</li>
              <li>• Evacuate if necessary</li>
            </ul>
          </div>
          
          <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/30">
            <h4 className="font-semibold text-orange-400 mb-2">Electric Shock</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Switch off power immediately</li>
              <li>• Do not touch victim directly</li>
              <li>• Call emergency services</li>
              <li>• Begin first aid if trained</li>
            </ul>
          </div>
          
          <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
            <h4 className="font-semibold text-yellow-400 mb-2">Gas Escape</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Do not operate electrical switches</li>
              <li>• Ventilate area</li>
              <li>• Call National Gas Emergency</li>
              <li>• Evacuate if necessary</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencySafetyProcedures;
