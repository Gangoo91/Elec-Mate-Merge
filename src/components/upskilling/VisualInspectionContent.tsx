
import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VisualInspectionWhatIs } from './visual-inspection/VisualInspectionWhatIs';
import { VisualInspectionSystematicApproach } from './visual-inspection/VisualInspectionSystematicApproach';
import { VisualInspectionWhen } from './visual-inspection/VisualInspectionWhen';
import { VisualInspectionCommonDefects } from './visual-inspection/VisualInspectionCommonDefects';
import { VisualInspectionChecklist } from './visual-inspection/VisualInspectionChecklist';
import { VisualInspectionSafety } from './visual-inspection/VisualInspectionSafety';
import { VisualInspectionWhy } from './visual-inspection/VisualInspectionWhy';
import { VisualInspectionRegulatory } from './visual-inspection/VisualInspectionRegulatory';
import { VisualInspectionDocumentation } from './visual-inspection/VisualInspectionDocumentation';
import { VisualInspectionTools } from './visual-inspection/VisualInspectionTools';

export const VisualInspectionContent = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Complete Guide to Visual Inspection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* What Is Visual Inspection */}
        <VisualInspectionWhatIs />

        {/* Systematic Approach */}
        <VisualInspectionSystematicApproach />

        {/* When Is It Carried Out */}
        <VisualInspectionWhen />

        {/* Common Defects by Category */}
        <VisualInspectionCommonDefects />

        {/* What Are You Checking For */}
        <VisualInspectionChecklist />

        {/* Safety During Visual Inspection */}
        <VisualInspectionSafety />

        {/* Why It's Critical */}
        <VisualInspectionWhy />

        {/* Regulatory Requirements */}
        <VisualInspectionRegulatory />

        {/* Documentation Requirements */}
        <VisualInspectionDocumentation />

        {/* Tools and Equipment */}
        <VisualInspectionTools />

      </CardContent>
    </Card>
  );
};
