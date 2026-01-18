import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Wrench } from 'lucide-react';
import { testEquipment, TestEquipment } from '../data/faultFindingData';

interface EquipmentGridProps {
  onSelectEquipment: (equipmentId: string) => void;
}

const EquipmentGrid = ({ onSelectEquipment }: EquipmentGridProps) => {
  return (
    <div className="space-y-4">
      {/* Intro Card */}
      <Card className="border-l-4 border-l-purple-500 bg-purple-500/5">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            Professional test equipment is essential for accurate fault diagnosis.
            Each instrument serves specific testing purposes and must be properly
            calibrated and maintained.
          </p>
        </CardContent>
      </Card>

      {/* Equipment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {testEquipment.map((equipment: TestEquipment) => (
          <Card
            key={equipment.id}
            className="border-purple-500/30 border bg-purple-500/5 cursor-pointer
              transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
              touch-manipulation"
            onClick={() => onSelectEquipment(equipment.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="text-purple-400 shrink-0">
                  <Wrench className="h-6 w-6" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base text-purple-400 mb-1">
                    {equipment.instrument}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {equipment.uses.slice(0, 2).join(', ')}
                    {equipment.uses.length > 2 && '...'}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="text-xs border-purple-500/30 text-purple-400"
                    >
                      {equipment.uses.length} uses
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-purple-400" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Standards Note */}
      <Card className="border-cyan-500/20 bg-cyan-500/5">
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm text-cyan-400 mb-2">
            Equipment Standards
          </h3>
          <p className="text-xs text-muted-foreground">
            All test equipment must comply with GS38 requirements and be regularly
            calibrated. Always verify test leads and probes are in good condition
            before use.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EquipmentGrid;
