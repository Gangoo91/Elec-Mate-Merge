import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench, Target, Search, Shield, Calendar, BookOpen } from 'lucide-react';
import { testEquipment, TestEquipment } from '../data/faultFindingData';

interface EquipmentDetailProps {
  equipmentId: string;
}

const EquipmentDetail = ({ equipmentId }: EquipmentDetailProps) => {
  const equipment = testEquipment.find(e => e.id === equipmentId);

  if (!equipment) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Equipment not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <Card className="border-l-4 border-l-purple-500 bg-purple-500/10">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="text-purple-400">
              <Wrench className="h-8 w-8" />
            </div>
            <CardTitle className="text-lg sm:text-xl text-purple-400">
              {equipment.instrument}
            </CardTitle>
          </div>
        </CardHeader>
      </Card>

      {/* Primary Uses */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-purple-400" />
            Primary Uses
          </h3>
          <div className="grid gap-2">
            {equipment.uses.map((use, index) => (
              <div key={index} className="flex items-start gap-2">
                <Badge
                  variant="outline"
                  className="text-xs min-w-[24px] h-5 flex items-center justify-center shrink-0 border-purple-500/30 text-purple-400"
                >
                  {index + 1}
                </Badge>
                <span className="text-sm text-foreground">{use}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fault Types Detected */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Search className="h-4 w-4 text-blue-400" />
            Fault Types Detected
          </h3>
          <div className="grid gap-2">
            {equipment.faultTypes.map((faultType, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-blue-400 shrink-0">•</span>
                <span className="text-sm text-foreground">{faultType}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Standards & Calibration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Card className="border-cyan-500/20 bg-cyan-500/5">
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm text-cyan-400 mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Standards
            </h3>
            <Badge variant="outline" className="text-xs border-cyan-500/30 text-cyan-400">
              {equipment.standards}
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/20 bg-yellow-500/5">
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm text-yellow-400 mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calibration
            </h3>
            <Badge variant="outline" className="text-xs border-yellow-500/30 text-yellow-400">
              {equipment.calibration}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Safety Requirements */}
      <Card className="border-red-500/20 bg-red-500/5">
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm text-red-400 mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Safety Requirements
          </h3>
          <p className="text-sm text-foreground">
            {equipment.safety}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EquipmentDetail;
