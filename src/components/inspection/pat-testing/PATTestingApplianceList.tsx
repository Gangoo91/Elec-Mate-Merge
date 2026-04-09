/**
 * PATTestingApplianceList — Tab 2
 *
 * Clean card list of all appliances using PATApplianceCard.
 * Tap a card to open PATTestSheet. Add/scan/bulk-add buttons at top.
 * "Add Multiple" opens a number input → creates N appliances → auto-opens #1.
 */

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
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

const PATTestingApplianceList: React.FC<PATTestingApplianceListProps> = ({
  formData,
  onUpdate,
  activeApplianceId,
  onOpenAppliance,
  onCloseAppliance,
  copiedApplianceData,
  onCopyApplianceData,
}) => {
  const [recentLocations, setRecentLocations] = useState<string[]>([]);
  const [showBulkAdd, setShowBulkAdd] = useState(false);
  const [bulkCount, setBulkCount] = useState('');

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
    setRecentLocations((prev) => [location, ...prev.filter((l) => l !== location)].slice(0, 10));
  }, []);

  // Count results
  const passCount = appliances.filter((a) => a.overallResult === 'pass').length;
  const failCount = appliances.filter((a) => a.overallResult === 'fail').length;
  const untestedCount = appliances.length - passCount - failCount;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="px-4 sm:px-0">
        <div className="border-b border-white/[0.06] pb-1 mb-3">
          <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-medium text-white uppercase tracking-wider">Appliance Register</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white">{appliances.length} total</span>
              {passCount > 0 && <span className="text-xs text-green-400">{passCount} pass</span>}
              {failCount > 0 && <span className="text-xs text-red-400">{failCount} fail</span>}
              {untestedCount > 0 && (
                <span className="text-xs text-white">{untestedCount} untested</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 px-4 sm:px-0">
        <button
          type="button"
          onClick={addAndOpen}
          className="flex-1 h-11 rounded-lg text-xs font-semibold touch-manipulation active:scale-[0.98] transition-all bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow"
        >
          Add Appliance
        </button>
        <button
          type="button"
          onClick={() => setShowBulkAdd(!showBulkAdd)}
          className={cn(
            'h-11 px-4 rounded-lg text-xs font-semibold touch-manipulation active:scale-[0.98] transition-all',
            showBulkAdd
              ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
              : 'bg-white/[0.05] border border-white/[0.08] text-white'
          )}
        >
          Multiple
        </button>
        <button
          type="button"
          onClick={() => {
            const newAppliance = getDefaultAppliance();
            onUpdate('appliances', [...appliances, newAppliance]);
            setTimeout(() => onOpenAppliance(newAppliance.id), 0);
          }}
          className="h-11 px-4 rounded-lg text-xs font-semibold touch-manipulation active:scale-[0.98] transition-all bg-white/[0.05] border border-white/[0.08] text-white"
        >
          Scan
        </button>
      </div>

      {/* Bulk Add Panel */}
      {showBulkAdd && (
        <div className="px-4 sm:px-0">
          <div className="relative overflow-hidden card-surface-interactive rounded-xl">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10" />
            <div className="relative z-10 p-4 space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">Add Multiple</h4>
                  <p className="text-white text-[10px]">Select how many to add</p>
                </div>
                <button
                  type="button"
                  onClick={() => { setShowBulkAdd(false); setBulkCount(''); }}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/[0.06] hover:bg-white/10 touch-manipulation text-white text-xs active:scale-[0.98]"
                >
                  ✕
                </button>
              </div>

              {/* Quick Presets */}
              <div className="grid grid-cols-5 gap-1.5">
                {[5, 10, 25, 50, 100].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setBulkCount(String(n))}
                    className={cn(
                      'h-10 rounded-lg text-xs font-bold transition-all touch-manipulation active:scale-[0.98]',
                      bulkCount === String(n)
                        ? 'bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/40'
                        : 'bg-white/[0.04] text-white border border-white/[0.08]'
                    )}
                  >
                    {n}
                  </button>
                ))}
              </div>

              {/* Custom input + Add button in one row */}
              <div className="flex gap-2">
                <Input
                  type="text"
                  pattern="[0-9]*"
                  placeholder="Custom..."
                  value={bulkCount}
                  onChange={(e) => setBulkCount(e.target.value.replace(/[^0-9]/g, ''))}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleBulkAdd(); }}
                  className="h-10 text-sm touch-manipulation bg-white/[0.06] border-white/[0.08] text-white flex-1"
                  inputMode="numeric"
                />
                <button
                  onClick={handleBulkAdd}
                  disabled={!bulkCount || parseInt(bulkCount) < 1}
                  className="h-10 px-4 rounded-lg bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow text-xs font-bold touch-manipulation active:scale-[0.98] disabled:opacity-40 shrink-0"
                >
                  {bulkCount && parseInt(bulkCount) > 0 ? `Add ${bulkCount}` : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Appliance List */}
      <div className="px-4 sm:px-0 space-y-2">
        {appliances.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white font-medium">No appliances added yet</p>
            <p className="text-white text-sm mt-1">
              Tap "Add Appliance" for one, or "Multiple" to add a batch
            </p>
          </div>
        ) : (
          appliances.map((appliance, index) => (
            <PATApplianceCard
              key={appliance.id}
              appliance={appliance}
              index={index}
              onTap={() => onOpenAppliance(appliance.id)}
            />
          ))
        )}
      </div>

      {/* Test Sheet */}
      {activeAppliance && (
        <PATTestSheet
          open={!!activeAppliance}
          onClose={onCloseAppliance}
          appliance={activeAppliance}
          applianceIndex={activeIndex}
          totalAppliances={appliances.length}
          onUpdateAppliance={updateAppliance}
          onNavigate={handleNavigate}
          onCopyData={onCopyApplianceData}
          copiedData={copiedApplianceData}
          recentLocations={recentLocations}
          onAddRecentLocation={addRecentLocation}
        />
      )}
    </div>
  );
};

export default PATTestingApplianceList;
