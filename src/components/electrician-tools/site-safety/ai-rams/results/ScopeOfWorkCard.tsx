import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, FileText, XCircle } from 'lucide-react';
import { MethodStatementData } from '@/types/method-statement';

interface ScopeOfWorkCardProps {
  methodData: MethodStatementData;
}

export function ScopeOfWorkCard({ methodData }: ScopeOfWorkCardProps) {
  const scopeOfWork = methodData.scopeOfWork;
  
  // Hide if no meaningful data
  const hasDescription = scopeOfWork?.description && scopeOfWork.description !== 'Work scope to be defined';
  const hasDeliverables = scopeOfWork?.keyDeliverables && scopeOfWork.keyDeliverables.length > 0;
  const hasExclusions = scopeOfWork?.exclusions;
  
  if (!hasDescription && !hasDeliverables && !hasExclusions) {
    return null;
  }

  return (
    <Card className="bg-blue-500/5 border-blue-500/20 mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-400" />
          Scope of Work
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Description */}
        <div>
          <h4 className="text-sm font-semibold text-elec-light mb-2">Work Description</h4>
          <p className="text-sm text-white leading-relaxed">
            {scopeOfWork?.description || methodData.description || 'Work scope to be defined'}
          </p>
        </div>

        {/* Key Deliverables */}
        {scopeOfWork?.keyDeliverables && scopeOfWork.keyDeliverables.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-elec-light mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              Key Deliverables
            </h4>
            <ul className="space-y-2">
              {scopeOfWork.keyDeliverables.map((deliverable, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-white">
                  <span className="text-green-400 mt-1 font-bold">✓</span>
                  <span className="flex-1">{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Exclusions */}
        {scopeOfWork?.exclusions && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <h4 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Work Exclusions
            </h4>
            <p className="text-sm text-white">{scopeOfWork.exclusions}</p>
          </div>
        )}

        {/* Work Type Badge */}
        {methodData.workType && (
          <div className="flex items-center gap-2 pt-2 border-t border-border/40">
            <span className="text-xs text-white">Work Type:</span>
            <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
              {methodData.workType}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
