import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Network } from 'lucide-react';

export const BMSModule5Section1Intro = () => {
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
          A Building Management System (BMS) is only effective if its devices can communicate reliably. 
          Different subsystems — HVAC, lighting, access control, energy meters, shading, and more — often 
          come from different manufacturers. To make them work together, BMS relies on communication protocols: 
          structured rules for exchanging data.
        </p>
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Network className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold mb-2">For Electricians</h4>
              <p className="text-sm text-foreground">
                Understanding these protocols is not about programming them from scratch, but about recognising 
                how they're wired, what they connect to, and how to avoid mistakes that prevent systems from 
                "talking" to each other.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};