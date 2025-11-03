import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, HardHat, Eye, Hand, Shirt } from 'lucide-react';
import { MethodStatementData } from '@/types/method-statement';

interface PPEDetailsGridProps {
  methodData: MethodStatementData;
}

const getPPEIcon = (ppeType: string) => {
  const type = ppeType.toLowerCase();
  if (type.includes('helmet') || type.includes('hard hat')) return HardHat;
  if (type.includes('eye') || type.includes('goggle') || type.includes('face')) return Eye;
  if (type.includes('glove') || type.includes('hand')) return Hand;
  if (type.includes('vest') || type.includes('clothing') || type.includes('high-vis')) return Shirt;
  return Shield;
};

export function PPEDetailsGrid({ methodData }: PPEDetailsGridProps) {
  const ppeDetails = methodData.ppeDetails || [];

  return (
    <Card className="bg-amber-500/5 border-amber-500/20 mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Shield className="h-5 w-5 text-amber-400" />
          Personal Protective Equipment (PPE)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {ppeDetails.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ppeDetails.map((ppe, idx) => {
              const IconComponent = getPPEIcon(ppe.ppeType);
              return (
                <div
                  key={`ppe-${idx}-${ppe.itemNumber}`}
                  className="bg-elec-gray/30 border border-amber-500/10 rounded-lg p-3 hover:border-amber-500/30 transition-all active:scale-[0.99]"
                >
                  {/* Header with icon and number */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4 text-amber-400" />
                      <span className="text-xs text-muted-foreground">#{ppe.itemNumber}</span>
                    </div>
                    {ppe.mandatory && (
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                        Mandatory
                      </Badge>
                    )}
                  </div>

                  {/* PPE Type */}
                  <h4 className="text-sm font-semibold text-elec-light mb-1">{ppe.ppeType}</h4>

                  {/* Standard */}
                  <div className="flex items-center gap-1 mb-2">
                    <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs">
                      {ppe.standard}
                    </Badge>
                  </div>

                  {/* Purpose */}
                  <p className="text-xs text-elec-light/80 leading-relaxed">{ppe.purpose}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6">
            <Shield className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              PPE requirements to be determined based on site conditions
            </p>
          </div>
        )}

        {/* Safety Note */}
        <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          <p className="text-xs text-elec-light/90">
            <strong className="text-red-400">⚠️ Important:</strong> All PPE must be inspected before use and replaced if damaged. 
            Ensure proper fit and training on correct usage.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
