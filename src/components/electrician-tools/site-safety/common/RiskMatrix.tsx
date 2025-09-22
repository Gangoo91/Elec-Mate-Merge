import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Grid3x3 } from 'lucide-react';

interface RiskMatrixProps {
  selectedLikelihood?: number;
  selectedSeverity?: number;
  className?: string;
}

export const RiskMatrix: React.FC<RiskMatrixProps> = ({ 
  selectedLikelihood, 
  selectedSeverity, 
  className = "" 
}) => {
  const getRiskLevel = (likelihood: number, severity: number): number => {
    return likelihood * severity;
  };

  const getRiskColor = (rating: number): string => {
    if (rating <= 4) return 'bg-green-500';
    if (rating <= 9) return 'bg-yellow-500';
    if (rating <= 16) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getRiskText = (rating: number): string => {
    if (rating <= 4) return 'Low';
    if (rating <= 9) return 'Medium';
    if (rating <= 16) return 'High';
    return 'Very High';
  };

  const severityLabels = ['Negligible', 'Minor', 'Moderate', 'Major', 'Catastrophic'];
  const likelihoodLabels = ['Very Unlikely', 'Unlikely', 'Possible', 'Likely', 'Very Likely'];

  return (
    <Card className={`border-elec-yellow/20 bg-elec-gray/60 ${className}`}>
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Grid3x3 className="h-5 w-5" />
          Risk Assessment Matrix (5x5)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-6 gap-1 min-w-[320px] sm:min-w-[400px] lg:min-w-[500px]">
            {/* Header row */}
            <div className="bg-elec-dark/50 p-1 sm:p-2 text-center text-white text-xs font-bold border border-elec-yellow/20">
              L/S
            </div>
            {severityLabels.map((label, index) => (
              <div key={label} className="bg-elec-dark/50 p-1 sm:p-2 text-center text-white text-xs font-bold border border-elec-yellow/20">
                {index + 1}
                <br />
                <span className="text-[8px] sm:text-[10px] hidden xs:inline break-words overflow-hidden">{label}</span>
              </div>
            ))}
            
            {/* Matrix rows */}
            {[5, 4, 3, 2, 1].map((likelihood) => (
              <div key={likelihood} className="contents">
                {/* Row header */}
                <div className="bg-elec-dark/50 p-1 sm:p-2 text-center text-white text-xs font-bold border border-elec-yellow/20">
                  {likelihood}
                  <br />
                  <span className="text-[8px] sm:text-[10px] hidden xs:inline">{likelihoodLabels[likelihood - 1]}</span>
                </div>
                
                {/* Risk cells */}
                {[1, 2, 3, 4, 5].map((severity) => {
                  const riskRating = getRiskLevel(likelihood, severity);
                  const isSelected = selectedLikelihood === likelihood && selectedSeverity === severity;
                  
                  return (
                    <div
                      key={`${likelihood}-${severity}`}
                      className={`
                        p-1 sm:p-2 text-center text-white text-xs font-bold border-2 min-h-[40px] sm:min-h-[48px] flex flex-col justify-center
                        ${getRiskColor(riskRating)} 
                        ${isSelected ? 'border-white border-4 shadow-lg' : 'border-elec-yellow/20'}
                        ${isSelected ? 'animate-pulse' : ''}
                      `}
                    >
                      <div className="font-bold text-xs sm:text-sm">{riskRating}</div>
                      <div className="text-[8px] sm:text-[10px] mt-1 hidden sm:block">{getRiskText(riskRating)}</div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <Badge className="bg-green-500 text-white">1-4 Low</Badge>
          <Badge className="bg-yellow-500 text-black">5-9 Medium</Badge>
          <Badge className="bg-orange-500 text-white">10-16 High</Badge>
          <Badge className="bg-red-500 text-white">17-25 Very High</Badge>
        </div>

        {selectedLikelihood && selectedSeverity && (
          <div className="mt-4 text-center">
            <div className="text-white text-sm">
              Selected Risk Rating: <span className="font-bold">{getRiskLevel(selectedLikelihood, selectedSeverity)}</span>
            </div>
            <Badge className={`${getRiskColor(getRiskLevel(selectedLikelihood, selectedSeverity))} text-white mt-2`}>
              {getRiskText(getRiskLevel(selectedLikelihood, selectedSeverity))} Risk
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};