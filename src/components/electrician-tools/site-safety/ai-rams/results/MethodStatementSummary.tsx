import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench, Package, Lightbulb, AlertTriangle } from 'lucide-react';
import { MethodStatementData } from '@/types/method-statement';

interface MethodStatementSummaryProps {
  methodData: MethodStatementData;
}

export function MethodStatementSummary({ methodData }: MethodStatementSummaryProps) {
  const hasTools = methodData.toolsRequired && methodData.toolsRequired.length > 0;
  const hasMaterials = methodData.materialsRequired && methodData.materialsRequired.length > 0;
  const hasTips = methodData.practicalTips && methodData.practicalTips.length > 0;
  const hasMistakes = methodData.commonMistakes && methodData.commonMistakes.length > 0;

  if (!hasTools && !hasMaterials && !hasTips && !hasMistakes) {
    return null;
  }

  return (
    <div className="space-y-4 mb-4">
      {/* Tools Required Section */}
      {hasTools && (
        <Card className="bg-blue-500/5 border-blue-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Wrench className="h-4 w-4 text-blue-400" />
              Tools Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {methodData.toolsRequired!.map((tool, idx) => (
                <Badge key={idx} className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                  {tool}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Materials Required Section */}
      {hasMaterials && (
        <Card className="bg-green-500/5 border-green-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Package className="h-4 w-4 text-green-400" />
              Materials Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {methodData.materialsRequired!.map((material, idx) => (
                <Badge key={idx} className="bg-green-500/10 text-green-400 border-green-500/30">
                  {material}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Practical Tips Section */}
      {hasTips && (
        <Card className="bg-amber-500/5 border-amber-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-400" />
              Practical Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {methodData.practicalTips!.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-elec-light/90">
                  <span className="text-amber-500 mt-1 font-bold">💡</span>
                  <span className="flex-1">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Common Mistakes Section */}
      {hasMistakes && (
        <Card className="bg-red-500/5 border-red-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              Common Mistakes to Avoid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {methodData.commonMistakes!.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-elec-light/90">
                  <span className="text-red-500 mt-1 font-bold">⚠️</span>
                  <span className="flex-1">{mistake}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
