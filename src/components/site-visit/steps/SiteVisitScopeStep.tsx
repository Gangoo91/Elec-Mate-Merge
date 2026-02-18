import React from 'react';
import { ScopeOfWorksEditor } from '../scope/ScopeOfWorksEditor';
import { ScopeShareButton } from '../scope/ScopeShareButton';
import type { SiteVisit } from '@/types/siteVisit';

interface SiteVisitScopeStepProps {
  visit: SiteVisit;
  assumptions: string;
  onAssumptionsChange: (assumptions: string) => void;
}

export const SiteVisitScopeStep = ({
  visit,
  assumptions,
  onAssumptionsChange,
}: SiteVisitScopeStepProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-white">Scope of Works</h2>
        <p className="text-sm text-white mt-1">Review and edit before sending to client</p>
      </div>

      <ScopeOfWorksEditor
        visit={visit}
        assumptions={assumptions}
        onAssumptionsChange={onAssumptionsChange}
      />

      <ScopeShareButton visit={visit} assumptions={assumptions} />
    </div>
  );
};
