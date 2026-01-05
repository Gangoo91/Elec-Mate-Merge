import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export const SignOffQuickCheck = () => {
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
          Who must sign the commissioning certificate?
        </p>
        <div className="space-y-2">
          <p className="text-foreground text-sm">
            Three qualified professionals must sign the commissioning certificate:
          </p>
          <ul className="list-disc list-inside text-foreground text-sm space-y-1 ml-2">
            <li><strong>Designer</strong> – Confirms design meets required standards</li>
            <li><strong>Installer</strong> – Confirms installation follows design and regulations</li>
            <li><strong>Verifier / Commissioning Engineer</strong> – Confirms system performance and functionality</li>
          </ul>
          <p className="text-foreground text-sm mt-2">
            This establishes clear accountability at every stage of the project.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
