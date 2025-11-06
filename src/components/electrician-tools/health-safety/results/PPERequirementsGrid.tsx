import { HardHat, Eye, Hand, Shirt, Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PPERequirementsGridProps {
  ppeItems: any[];
}

// Map PPE types to icons
const getPPEIcon = (ppeType: string) => {
  const type = ppeType.toLowerCase();
  if (type.includes('helmet') || type.includes('hard hat') || type.includes('head')) return HardHat;
  if (type.includes('eye') || type.includes('goggle') || type.includes('face')) return Eye;
  if (type.includes('glove') || type.includes('hand')) return Hand;
  if (type.includes('vest') || type.includes('clothing') || type.includes('overall')) return Shirt;
  return Shield;
};

export const PPERequirementsGrid = ({ ppeItems }: PPERequirementsGridProps) => {
  if (!ppeItems || ppeItems.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-500" />
          Required PPE
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {ppeItems.map((item, idx) => {
            const IconComponent = getPPEIcon(item.ppeType);
            const isMandatory = item.mandatory;

            return (
              <div
                key={idx}
                className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4 hover:bg-amber-500/10 hover:scale-[1.02] transition-all active:scale-[0.99]"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm mb-2 flex items-start gap-2">
                      <span className="flex-1">{item.ppeType}</span>
                      {isMandatory && (
                        <Badge className="bg-red-100 text-red-800 border-red-500/30 flex-shrink-0">
                          MANDATORY
                        </Badge>
                      )}
                      {!isMandatory && (
                        <Badge variant="outline" className="flex-shrink-0">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                          {item.standard}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">Purpose:</span> {item.purpose}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Safety Note */}
        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Safety Note:</span> All mandatory PPE must be worn before commencing work. Ensure all equipment meets the specified standards and is in good condition.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
