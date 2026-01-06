
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { HardHat, Loader2 } from 'lucide-react';

interface SafetyCasesLoadingProps {
  message?: string;
}

const SafetyCasesLoading = ({ message = "Loading safety cases..." }: SafetyCasesLoadingProps) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center animate-fade-in">
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-white/10 max-w-md w-full overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <CardHeader className="relative">
          <div className="flex items-center justify-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30 animate-pulse">
              <HardHat className="h-6 w-6 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow">Safety Cases</h2>
          </div>
        </CardHeader>

        <CardContent className="relative">
          <div className="text-center space-y-4 py-4">
            <div className="flex justify-center">
              <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                <Loader2 className="h-8 w-8 text-elec-yellow animate-spin" />
              </div>
            </div>
            <p className="text-white/70 text-sm">{message}</p>

            {/* Skeleton loading indicators */}
            <div className="space-y-3 pt-4">
              <div className="h-3 bg-white/5 rounded-full w-3/4 mx-auto animate-pulse" />
              <div className="h-3 bg-white/5 rounded-full w-1/2 mx-auto animate-pulse" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyCasesLoading;
