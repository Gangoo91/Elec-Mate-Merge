import { Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const CableShieldingIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Shield className="h-5 w-5 text-elec-yellow" />
          Introduction to Cable Shielding Types
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-gray-300">
        <p>
          Not all twisted pair cables are created equal. Beyond the basic wire twisting that provides 
          fundamental noise protection, some cables include additional metallic shielding to combat 
          electromagnetic interference in challenging environments.
        </p>
        <p>
          Understanding the differences between UTP (Unshielded), FTP (Foiled), and STP (Shielded) 
          twisted pair cables is crucial for selecting the right solution for each installation environment, 
          from quiet office spaces to industrial facilities with heavy electrical equipment.
        </p>
        <p>
          This section explores when and why you'd choose each cable type, their installation requirements, 
          and the critical importance of proper grounding for shielded systems.
        </p>
      </CardContent>
    </Card>
  );
};