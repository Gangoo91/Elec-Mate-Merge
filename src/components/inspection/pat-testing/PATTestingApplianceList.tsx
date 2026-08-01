/**
 * PATTestingApplianceList — Tab 2
 *
 * Appliance register as flattened rows inside one section card.
 * Tap a row to open PATTestSheet. Add/scan/bulk-add buttons at top.
 * "Add Multiple" opens a number input → creates N appliances → auto-opens #1.
 */

import React, { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { getDefaultAppliance, Appliance } from '@/types/pat-testing';
import { cn } from '@/lib/utils';
import PATApplianceCard from './PATApplianceCard';
import PATTestSheet from './PATTestSheet';

interface PATTestingApplianceListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: string, value: any) => void;
  activeApplianceId: string | null;
  onOpenAppliance: (id: string) => void;
  onCloseAppliance: () => void;
  copiedApplianceData: Partial<Appliance> | null;
  onCopyApplianceData: (data: Partial<Appliance>) => void;
}

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const voltCn = 'bg-elec-yellow border border-elec-yellow text-black font-semibold';
const neutralCn = 'bg-white/[0.06] border border-white/[0.12] text-white font-medium';

/** localStorage key — location suggestions survive reloads on multi-visit jobs. */
const RECENT_LOCATIONS_KEY = 'pat-testing-recent-locations';

const loadRecentLocations = (): string[] => {
  try {
    const stored = localStorage.getItem(RECENT_LOCATIONS_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed.filter((l) => typeof l === 'string').slice(0, 10) : [];
  } catch {
    return [];
  }
};

const PATTestingApplianceList: React.FC<PATTestingApplianceListProps> = ({
  formData,
  onUpdate,
  activeApplianceId,
  onOpenAppliance,
  onCloseAppliance,
  copiedApplianceData,
  onCopyApplianceData,
}) => {
  const [recentLocations, setRecentLocations] = useState<string[]>(loadRecentLocations);
  const [showBulkAdd, setShowBulkAdd] = useState(false);
  const [bulkCount, setBulkCount] = useState('');
  // Appliance created via the Scan button — its sheet opens with the scanner active.
  const [scanRequestId, setScanRequestId] = useState<string | null>(null);

  const appliances: Appliance[] = formData.appliances || [];
  const activeIndex = appliances.findIndex((a) => a.id === activeApplianceId);
  const activeAppliance = activeIndex >= 0 ? appliances[activeIndex] : null;

  const addAndOpen = useCallback(() => {
    const newAppliance = getDefaultAppliance();
    onUpdate('appliances', [...appliances, newAppliance]);
    setTimeout(() => onOpenAppliance(newAppliance.id), 0);
  }, [appliances, onUpdate, onOpenAppliance]);

  const handleBulkAdd = useCallback(() => {
    const count = parseInt(bulkCount);
    if (!count || count < 1 || count > 500) return;

    const newAppliances = Array.from({ length: count }, () => getDefaultAppliance());
    const updated = [...appliances, ...newAppliances];
    onUpdate('appliances', updated);

    // Auto-open the first new appliance
    const firstNew = newAppliances[0];
    setTimeout(() => onOpenAppliance(firstNew.id), 0);

    setBulkCount('');
    setShowBulkAdd(false);
  }, [bulkCount, appliances, onUpdate, onOpenAppliance]);

  const updateAppliance = useCallback(
    (updated: Appliance) => {
      const updatedList = appliances.map((a) => (a.id === updated.id ? updated : a));
      onUpdate('appliances', updatedList);
    },
    [appliances, onUpdate]
  );

  const handleNavigate = useCallback(
    (direction: 'prev' | 'next') => {
      if (direction === 'prev' && activeIndex > 0) {
        onOpenAppliance(appliances[activeIndex - 1].id);
      } else if (direction === 'next' && activeIndex < appliances.length - 1) {
        onOpenAppliance(appliances[activeIndex + 1].id);
      }
    },
    [activeIndex, appliances, onOpenAppliance]
  );

  const addRecentLocation = useCallback((location: string) => {
    setRecentLocations((prev) => {
      const next = [location, ...prev.filter((l) => l !== location)].slice(0, 10);
      try {
        localStorage.setItem(RECENT_LOCATIONS_KEY, JSON.stringify(next));
      } catch {
        /* storage full/unavailable — suggestions stay session-only */
      }
      return next;
    });
  }, []);

  // Count results
  const passCount = appliances.filter((a) => a.overallResult === 'pass').length;
  const failCount = appliances.filter((a) => a.overallResult === 'fail').length;
  const untestedCount = appliances.length - passCount - failCount;

  return (
    <div className="py-4">
      <div className={cardCn}>
        {/* Heading + counts */}
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">Appliance register</h2>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-white/80">{appliances.length} total</span>
            {passCount > 0 && <span className="text-[12px] font-semibold text-green-400">{passCount} pass</span>}
            {failCount > 0 && <span className="text-[12px] font-semibold text-red-400">{failCount} fail</span>}
            {untestedCount > 0 && (
              <span className="text-[12px] text-white/80">{untestedCount} untested</span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={addAndOpen}
            className={cn('flex-1 h-11 rounded-xl text-sm touch-manipulation active:scale-[0.98] transition-all', voltCn)}
          >
            Add appliance
          </button>
          <button
            type="button"
            onClick={() => setShowBulkAdd(!showBulkAdd)}
            className={cn(
              'h-11 px-4 rounded-xl text-sm touch-manipulation active:scale-[0.98] transition-all',
              showBulkAdd ? voltCn : neutralCn
            )}
          >
            Multiple
          </button>
          <button
            type="button"
            onClick={() => {
              // Scan = add an appliance AND open its sheet with the scanner
              // active (previously identical to "Add appliance" — misleading).
              const newAppliance = getDefaultAppliance();
              onUpdate('appliances', [...appliances, newAppliance]);
              setScanRequestId(newAppliance.id);
              setTimeout(() => onOpenAppliance(newAppliance.id), 0);
            }}
            className={cn('h-11 px-4 rounded-xl text-sm touch-manipulation active:scale-[0.98] transition-all', neutralCn)}
          >
            Scan
          </button>
        </div>

        {/* Bulk add panel */}
        {showBulkAdd && (
          <div className="rounded-xl bg-white/[0.05] p-4 space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-white">Add multiple</h3>
                <p className="text-[12px] text-white/80">Select how many to add</p>
              </div>
              <button
                type="button"
                onClick={() => { setShowBulkAdd(false); setBulkCount(''); }}
                aria-label="Close bulk add"
                className="-mr-2 -mt-2 flex h-11 w-11 items-center justify-center rounded-xl text-base text-white/80 touch-manipulation active:scale-[0.98]"
              >
                &times;
              </button>
            </div>

            {/* Quick presets */}
            <div className="grid grid-cols-5 gap-1.5">
              {[5, 10, 25, 50, 100].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setBulkCount(String(n))}
                  className={cn(
                    'h-11 rounded-xl text-sm transition-all touch-manipulation active:scale-[0.98]',
                    bulkCount === String(n) ? voltCn : neutralCn
                  )}
                >
                  {n}
                </button>
              ))}
            </div>

            {/* Custom input + Add button in one row */}
            <div className="flex items-end gap-3">
              <Input
                type="text"
                pattern="[0-9]*"
                placeholder="Custom..."
                value={bulkCount}
                onChange={(e) => setBulkCount(e.target.value.replace(/[^0-9]/g, ''))}
                onKeyDown={(e) => { if (e.key === 'Enter') handleBulkAdd(); }}
                className={cn(inputCn, 'flex-1')}
                inputMode="numeric"
              />
              <button
                onClick={handleBulkAdd}
                disabled={!bulkCount || parseInt(bulkCount) < 1}
                className={cn(
                  'h-11 px-4 rounded-xl text-sm touch-manipulation active:scale-[0.98] disabled:opacity-40 shrink-0',
                  voltCn
                )}
              >
                {bulkCount && parseInt(bulkCount) > 0 ? `Add ${bulkCount}` : 'Add'}
              </button>
            </div>
          </div>
        )}

        {/* Appliance list — flattened repeating groups */}
        {appliances.length === 0 ? (
          <div className="border-t border-white/[0.08] py-10 text-center">
            <p className="font-medium text-white">No appliances added yet</p>
            <p className="mt-1 text-sm text-white/80">
              Tap "Add appliance" for one, or "Multiple" to add a batch
            </p>
          </div>
        ) : (
          <div>
            {appliances.map((appliance, index) => (
              <PATApplianceCard
                key={appliance.id}
                appliance={appliance}
                index={index}
                onTap={() => onOpenAppliance(appliance.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Test Sheet */}
      {activeAppliance && (
        <PATTestSheet
          open={!!activeAppliance}
          onClose={() => {
            setScanRequestId(null);
            onCloseAppliance();
          }}
          appliance={activeAppliance}
          applianceIndex={activeIndex}
          totalAppliances={appliances.length}
          onUpdateAppliance={updateAppliance}
          onNavigate={handleNavigate}
          onCopyData={onCopyApplianceData}
          copiedData={copiedApplianceData}
          recentLocations={recentLocations}
          onAddRecentLocation={addRecentLocation}
          openScannerOnMount={activeAppliance.id === scanRequestId}
        />
      )}
    </div>
  );
};

export default PATTestingApplianceList;
