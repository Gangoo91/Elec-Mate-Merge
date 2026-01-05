
import { Eye, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const AccessibilityIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Eye className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground leading-relaxed text-base sm:text-lg">
          Before testing begins, it's essential to ensure that all parts of the installation are accessible and properly labelled. This section explains what to look for and why it directly affects safety, accuracy, and compliance.
        </p>
        <p className="text-foreground leading-relaxed text-base sm:text-lg">
          Proper accessibility and labelling are fundamental requirements that enable thorough inspection and testing whilst maintaining safety throughout the process. Without these elements, inspections become incomplete and potentially dangerous.
        </p>
        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <p className="text-blue-200 font-medium flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Remember: BS 7671 requires that equipment be "readily accessible for inspection, testing, and maintenance."
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
