import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HighRiskDefects } from './common-defects/HighRiskDefects';
import { FrequentVisualIssues } from './common-defects/FrequentVisualIssues';
import { FocusAreas } from './common-defects/FocusAreas';
import { DefectsByLocation } from './common-defects/DefectsByLocation';
import { DefectClassification } from './common-defects/DefectClassification';

export const CommonDefectsContent = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Complete Guide to Common Visual Defects
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* High-Risk Visual Defects */}
        <HighRiskDefects />

        {/* Defect Classification System */}
        <DefectClassification />

        {/* Other Frequent Visual Issues */}
        <FrequentVisualIssues />

        {/* Common Defects by Location */}
        <DefectsByLocation />

        {/* Where to Focus Your Checks */}
        <FocusAreas />

      </CardContent>
    </Card>
  );
};
