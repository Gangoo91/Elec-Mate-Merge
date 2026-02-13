import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Award, UserCheck, FileCheck } from 'lucide-react';
import { MethodStatementData } from '@/types/method-statement';

interface CompetencyMatrixCardProps {
  methodData: MethodStatementData;
}

export function CompetencyMatrixCard({ methodData }: CompetencyMatrixCardProps) {
  const competency = methodData.competencyMatrix;
  
  if (!competency) {
    return null;
  }

  const hasAnyCompetency = competency.competencyRequirements || 
                           competency.trainingRequired ||
                           competency.supervisionLevel || 
                           competency.additionalCertifications;

  if (!hasAnyCompetency) {
    return null;
  }

  return (
    <Card className="bg-purple-500/5 border-purple-500/20 mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-purple-400" />
          Competency & Training Requirements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Competency Requirements */}
        {competency.competencyRequirements && (
          <div className="bg-elec-gray/30 border border-purple-500/10 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <UserCheck className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-semibold text-elec-light">Competency Requirements</span>
            </div>
            <p className="text-sm text-white">{competency.competencyRequirements}</p>
          </div>
        )}

        {/* Training Required */}
        {competency.trainingRequired && (
          <div className="bg-elec-gray/30 border border-purple-500/10 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-semibold text-elec-light">Training Required</span>
            </div>
            <p className="text-sm text-white">{competency.trainingRequired}</p>
          </div>
        )}

        {/* Supervision Level */}
        {competency.supervisionLevel && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <UserCheck className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-semibold text-amber-400">Supervision Level</span>
            </div>
            <p className="text-sm text-white">{competency.supervisionLevel}</p>
          </div>
        )}

        {/* Additional Certifications */}
        {competency.additionalCertifications && (
          <div className="bg-elec-gray/30 border border-purple-500/10 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Award className="h-4 w-4 text-green-400" />
              <span className="text-sm font-semibold text-elec-light">Additional Certifications</span>
            </div>
            <p className="text-sm text-white">{competency.additionalCertifications}</p>
          </div>
        )}

        {/* Footer Note */}
        <div className="pt-2 border-t border-border/40">
          <p className="text-xs text-white flex items-start gap-2">
            <FileCheck className="h-3 w-3 mt-0.5 flex-shrink-0" />
            <span>All personnel must have appropriate qualifications verified before commencing work</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
