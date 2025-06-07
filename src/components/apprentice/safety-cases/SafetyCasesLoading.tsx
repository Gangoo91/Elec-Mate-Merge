
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { HardHat } from 'lucide-react';

interface SafetyCasesLoadingProps {
  message?: string;
}

const SafetyCasesLoading = ({ message = "Loading safety cases..." }: SafetyCasesLoadingProps) => {
  console.log('SafetyCasesLoading rendered with message:', message);
  
  return (
    <div className="min-h-screen bg-elec-dark p-6 flex items-center justify-center">
      <Card className="border-elec-yellow/20 bg-elec-gray max-w-md w-full">
        <CardHeader>
          <div className="flex items-center justify-center gap-3">
            <div className="animate-pulse">
              <HardHat className="h-8 w-8 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow">Safety Cases</h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow"></div>
            </div>
            <p className="text-elec-light/80">{message}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyCasesLoading;
