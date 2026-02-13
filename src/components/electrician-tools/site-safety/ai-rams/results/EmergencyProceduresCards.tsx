import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface EmergencyProceduresCardsProps {
  procedures?: string[];
}

export const EmergencyProceduresCards: React.FC<EmergencyProceduresCardsProps> = ({ procedures }) => {
  if (!procedures || procedures.length === 0) {
    return (
      <Card className="bg-card border-elec-yellow/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-elec-light flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            Emergency Procedures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-white">No emergency procedures specified</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-elec-yellow/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-elec-light flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          Emergency Procedures
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {procedures.map((procedure, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 bg-red-500/5 border-l-4 border-red-500 rounded-lg hover:bg-red-500/10 transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center font-bold text-sm border border-red-500/40">
                {idx + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm text-elec-light leading-relaxed">
                  {procedure}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
