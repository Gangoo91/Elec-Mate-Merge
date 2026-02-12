/**
 * EICSheet
 *
 * Full EIC form with 3 tabs matching BS 7671 model forms:
 *   1. Certificate (pre-filled, read-only for training)
 *   2. Schedule of Circuit Details (columns 1-16)
 *   3. Schedule of Test Results (columns 17-31)
 *
 * Auto-filled values in green, empty in amber, failed in red.
 */

import { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, MinusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { EICScheduleState } from '@/types/am2-testing-simulator';
import { useEICSchedule, type CellStatus } from '@/hooks/am2/useEICSchedule';
import { EICCertificateTab } from './EICCertificateTab';
import { EICCircuitDetailsTab } from './EICCircuitDetailsTab';
import { EICTestResultsTab } from './EICTestResultsTab';

type TabId = 'certificate' | 'circuit-details' | 'test-results';

interface EICSheetProps {
  eic: EICScheduleState;
  onClose: () => void;
  onUpdateResult: (circuitId: number, field: string, value: string) => void;
  onFinish: () => void;
}

export function EICSheet({ eic, onClose, onUpdateResult, onFinish }: EICSheetProps) {
  const [activeTab, setActiveTab] = useState<TabId>('test-results');
  const { validations, overallCompleteness } = useEICSchedule(eic);

  const tabs: { id: TabId; label: string }[] = [
    { id: 'certificate', label: 'Certificate' },
    { id: 'circuit-details', label: 'Circuit Details' },
    { id: 'test-results', label: 'Test Results' },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-3 py-2 border-b border-white/5">
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-1 text-sm text-cyan-300 touch-manipulation h-11 px-2 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Testing
          </button>
          <div className="text-center">
            <p className="text-sm font-semibold text-white">Electrical Installation Certificate</p>
            <p className="text-[10px] text-white/70">
              BS 7671 — Schedule completeness: {overallCompleteness}%
            </p>
          </div>
          <button
            onClick={onFinish}
            className="h-11 px-3 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-semibold touch-manipulation border border-cyan-400/20"
          >
            Finish
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex mt-2 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-1 py-2 text-[11px] font-semibold rounded-lg touch-manipulation transition-all',
                activeTab === tab.id
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/20'
                  : 'text-white/40 border border-transparent'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'certificate' && <EICCertificateTab certificate={eic.certificate} />}
        {activeTab === 'circuit-details' && (
          <EICCircuitDetailsTab circuitDetails={eic.circuitDetails} />
        )}
        {activeTab === 'test-results' && (
          <EICTestResultsTab
            testResults={eic.testResults}
            headerFields={eic.headerFields}
            validations={validations}
            onUpdateResult={onUpdateResult}
          />
        )}
      </div>
    </div>
  );
}

/** Utility: colour cell based on status */
export function cellColour(status: CellStatus): string {
  switch (status) {
    case 'filled':
      return 'text-green-400 bg-green-500/10';
    case 'failed':
      return 'text-red-400 bg-red-500/10';
    case 'empty':
    default:
      return 'text-amber-400/60 bg-amber-500/5';
  }
}
