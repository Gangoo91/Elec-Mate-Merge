import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export const CertificationPurposeQuickCheck = () => {
  return (
    <Card className="bg-blue-500/10 border-blue-500/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-blue-400 flex items-center gap-2 text-base sm:text-lg">
          <AlertCircle className="h-5 w-5" />
          ✅ Quick Check
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground font-semibold text-sm sm:text-base mb-2">
          Why is certification required even after all testing is completed?
        </p>
        <p className="text-foreground text-sm">
          Certification provides legal documentation that the system was designed, installed, and verified 
          to recognised standards. Testing proves the system works at a specific moment, but certification 
          establishes professional accountability and compliance with BS 5266 and fire safety legislation — 
          essential for insurance claims, fire authority inspections, and protecting against liability.
        </p>
      </CardContent>
    </Card>
  );
};
