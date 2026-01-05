import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, MapPin } from 'lucide-react';

export const BMSModule7Section3Intro = () => {
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
          In a Building Management System (BMS), every device — whether it's a sensor, actuator, controller, or gateway — must have a unique identity. 
          Without correct addressing and mapping, devices cannot communicate with each other or the BMS supervisor.
        </p>
        <p>
          Addressing ensures each device is uniquely recognised on the network. Mapping links each input/output (I/O) point to the correct device 
          and function in the BMS software. For electricians, this means more than just plugging things in: it's about checking addresses, labelling 
          devices, and verifying that physical connections match the software configuration.
        </p>
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold mb-2">Communication Foundation</h4>
              <p className="text-sm text-foreground">
                Proper addressing and mapping are critical for reliable BMS operation. Every device must have a unique identity and 
                every I/O point must be correctly mapped to ensure accurate control and monitoring.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};