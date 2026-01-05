import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export const BMSModule4Section3Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Security is a major part of modern building management. Access control systems regulate who can enter and exit different areas, using devices such as keypads, card readers, or biometric scanners. A Building Management System (BMS) integrates access control with lighting, HVAC, and security systems to improve safety and efficiency.
        </p>
        
        <p>
          For electricians, access control often comes down to installing door relays, power supplies, readers, and locking mechanisms. Mistakes in wiring can leave a building insecure, or worse — cause fire doors to fail in an emergency.
        </p>
        
        <div className="bg-yellow-600/20 border border-yellow-600/40 rounded-lg p-4">
          <p className="text-yellow-100 font-medium">
            <strong>Safety Critical:</strong> Access control installation requires careful attention to fire safety regulations and emergency egress requirements.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};