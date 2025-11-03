import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { MethodStatementData } from '@/types/method-statement';

interface ComplianceReferencesCardProps {
  methodData: MethodStatementData;
}

export function ComplianceReferencesCard({ methodData }: ComplianceReferencesCardProps) {
  const [expandedCitation, setExpandedCitation] = useState<number | null>(null);
  
  const complianceRegulations = methodData.complianceRegulations || [];
  const complianceWarnings = methodData.complianceWarnings || [];
  const ragCitations = methodData.ragCitations || [];

  const hasAnyCompliance = complianceRegulations.length > 0 || 
                           complianceWarnings.length > 0 || 
                           ragCitations.length > 0;

  if (!hasAnyCompliance) {
    return null;
  }

  return (
    <Card className="bg-purple-500/5 border-purple-500/20 mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-purple-400" />
          Compliance & Regulations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Regulations Referenced */}
        {complianceRegulations.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-elec-light mb-2">Regulations Referenced</h4>
            <div className="flex flex-wrap gap-2">
              {complianceRegulations.map((reg, idx) => (
                <Badge 
                  key={idx} 
                  className="bg-purple-500/10 text-purple-400 border-purple-500/30"
                >
                  {reg}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Compliance Warnings */}
        {complianceWarnings.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <h4 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Compliance Warnings
            </h4>
            <ul className="space-y-2">
              {complianceWarnings.map((warning, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-elec-light/90">
                  <span className="text-red-400 mt-1">⚠️</span>
                  <span className="flex-1">{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* RAG Citations */}
        {ragCitations.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-elec-light mb-3">
              Detailed Regulation Citations
            </h4>
            <div className="space-y-2">
              {ragCitations.map((citation, idx) => (
                <div
                  key={idx}
                  className="bg-elec-gray/30 border border-purple-500/10 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedCitation(expandedCitation === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-3 hover:bg-purple-500/5 transition-colors text-left"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                          {citation.regulation}
                        </Badge>
                        {citation.linkedToStep !== undefined && citation.linkedToStep > 0 && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                            Step {citation.linkedToStep}
                          </Badge>
                        )}
                        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                          {citation.source === 'health-safety' ? 'H&S Agent' : 'Installer Agent'}
                        </Badge>
                      </div>
                    </div>
                    {expandedCitation === idx ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
                    )}
                  </button>

                  {expandedCitation === idx && (
                    <div className="px-3 pb-3 border-t border-purple-500/10 pt-2">
                      <p className="text-xs text-elec-light/80 leading-relaxed whitespace-pre-wrap">
                        {citation.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Note */}
        <p className="text-xs text-muted-foreground pt-2 border-t border-border/40">
          All work must comply with current UK regulations and industry standards. 
          Consult the latest editions of referenced documents.
        </p>
      </CardContent>
    </Card>
  );
}
