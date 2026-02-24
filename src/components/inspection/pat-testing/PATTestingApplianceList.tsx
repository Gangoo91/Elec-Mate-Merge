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
import { Plug, Plus, ScanBarcode, Hash, X } from 'lucide-react';
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Plug className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <span className="font-semibold text-lg text-white">Appliance Register</span>
              <div className="flex items-center gap-2 mt-0.5">
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
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 px-4 sm:px-0">
        <Button
          variant="outline"
          onClick={addAndOpen}
          className="flex-1 h-11 touch-manipulation border-dashed"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Appliance
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowBulkAdd(!showBulkAdd)}
          className={cn(
            'h-11 touch-manipulation',
            showBulkAdd && 'bg-blue-500/15 border-blue-500/30 text-blue-400'
          )}
        >
          <Hash className="h-4 w-4 mr-2" />
          Multiple
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            const newAppliance = getDefaultAppliance();
            onUpdate('appliances', [...appliances, newAppliance]);
            setTimeout(() => onOpenAppliance(newAppliance.id), 0);
          }}
          className="h-11 touch-manipulation"
        >
          <ScanBarcode className="h-4 w-4" />
        </Button>
      </div>

      {/* Bulk Add Panel */}
      {showBulkAdd && (
        <div className="px-4 sm:px-0">
          <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Hash className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Add Multiple</h4>
                  <p className="text-white text-xs">Select how many to add</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowBulkAdd(false);
                  setBulkCount('');
                }}
                className="h-9 w-9 flex items-center justify-center rounded-xl bg-white/[0.06] hover:bg-white/10 touch-manipulation"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>

            {/* Quick Presets — primary interaction */}
            <div className="px-4 pt-2 pb-3">
              <div className="grid grid-cols-5 gap-2">
                {[5, 10, 25, 50, 100].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setBulkCount(String(n))}
                    className={cn(
                      'h-12 rounded-xl text-sm font-bold border-2 transition-all touch-manipulation',
                      bulkCount === String(n)
                        ? 'bg-blue-500/20 text-blue-400 border-blue-500/40 scale-[1.02]'
                        : 'bg-white/[0.04] text-white border-white/[0.08] active:scale-95'
                    )}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider with "or" */}
            <div className="flex items-center gap-3 px-4">
              <div className="flex-1 h-px bg-white/[0.08]" />
              <span className="text-xs text-white font-medium">or custom</span>
              <div className="flex-1 h-px bg-white/[0.08]" />
            </div>

            {/* Custom number input */}
            <div className="px-4 pt-3 pb-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  pattern="[0-9]*"
                  min="1"
                  max="500"
                  placeholder="Enter number..."
                  value={bulkCount}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^0-9]/g, '');
                    setBulkCount(v);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleBulkAdd();
                  }}
                  className="h-11 text-base touch-manipulation flex-1"
                  inputMode="numeric"
                />
              </div>
            </div>

            {/* Add button — full width CTA */}
            <div className="px-4 pb-4">
              <Button
                onClick={handleBulkAdd}
                disabled={!bulkCount || parseInt(bulkCount) < 1}
                className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-base rounded-xl touch-manipulation disabled:opacity-40"
              >
                <Plus className="h-4 w-4 mr-2" />
                {bulkCount && parseInt(bulkCount) > 0
                  ? `Add ${parseInt(bulkCount)} Appliance${parseInt(bulkCount) > 1 ? 's' : ''}`
                  : 'Add Appliances'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Appliance List */}
      <div className="px-4 sm:px-0 space-y-2">
        {appliances.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.06] flex items-center justify-center mx-auto mb-4">
              <Plug className="h-8 w-8 text-white" />
            </div>
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
