import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export const CertificateTypesQuickCheck = () => {
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
          Which certificate is used to confirm system performance after installation?
        </p>
        <p className="text-foreground text-sm">
          The <strong>Commissioning Certificate</strong> (BS 5266-1 / BS EN 50172) verifies the system's 
          operational performance after installation. It confirms that all tests have been completed 
          successfully, the system operates as intended, and is ready for handover to the client.
        </p>
      </CardContent>
    </Card>
  );
};
