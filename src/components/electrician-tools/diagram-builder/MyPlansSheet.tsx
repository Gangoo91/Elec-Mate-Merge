import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Trash2, FileText, Plus, Cloud, Loader2 } from 'lucide-react';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';
import { useHaptic } from '@/hooks/useHaptic';
import { useFloorPlanCloud } from '@/hooks/useFloorPlanCloud';
import type { SavedRoom } from '@/hooks/useFloorPlanRooms';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export interface SavedFloorPlan {
  id: string;
  name: string;
  rooms: SavedRoom[];
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'floor-plan-saved-plans';

function loadPlans(): SavedFloorPlan[] {
  return storageGetJSONSync<SavedFloorPlan[]>(STORAGE_KEY, []);
}

function persistPlans(plans: SavedFloorPlan[]): void {
  storageSetJSONSync(STORAGE_KEY, plans);
}

interface MyPlansSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRooms: SavedRoom[];
  onLoadPlan: (plan: SavedFloorPlan) => void;
  onNewPlan: () => void;
}

export function MyPlansSheet({ open, onOpenChange, currentRooms, onLoadPlan, onNewPlan }: MyPlansSheetProps) {
  const [plans, setPlans] = useState<SavedFloorPlan[]>(loadPlans);
  const [saveName, setSaveName] = useState('');
  const [showSaveInput, setShowSaveInput] = useState(false);
  const [cloudSyncing, setCloudSyncing] = useState(false);
  const haptic = useHaptic();
  const { saveToCloud, loadFromCloud, deleteFromCloud } = useFloorPlanCloud();

  // Load local plans + merge cloud plans on open
  useEffect(() => {
    if (!open) return;
    setPlans(loadPlans());

    // Background cloud fetch — merge any plans not in local storage
    loadFromCloud().then((cloudPlans) => {
      if (cloudPlans.length === 0) return;
      setPlans((localPlans) => {
        const localIds = new Set(localPlans.map((p) => p.id));
        const newFromCloud = cloudPlans
          .filter((cp) => !localIds.has(cp.id))
          .map((cp) => ({
            id: cp.id,
            name: cp.name,
            rooms: cp.rooms as SavedRoom[],
            createdAt: cp.created_at,
            updatedAt: cp.updated_at,
          }));
        if (newFromCloud.length === 0) return localPlans;
        const merged = [...localPlans, ...newFromCloud];
        persistPlans(merged);
        return merged;
      });
    });
  }, [open, loadFromCloud]);

  const handleSaveCurrent = () => {
    if (!saveName.trim() || currentRooms.length === 0) return;
    haptic.success();

    const newPlan: SavedFloorPlan = {
      id: crypto.randomUUID(),
      name: saveName.trim(),
      rooms: currentRooms,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newPlan, ...plans];
    setPlans(updated);
    persistPlans(updated);
    setSaveName('');
    setShowSaveInput(false);

    // Cloud sync in background
    setCloudSyncing(true);
    saveToCloud({ id: newPlan.id, name: newPlan.name, rooms: newPlan.rooms })
      .then(() => toast.success('Saved to cloud'))
      .catch(() => {}) // Local save succeeded, cloud is bonus
      .finally(() => setCloudSyncing(false));
  };

  const handleDelete = (id: string) => {
    haptic.heavy();
    const updated = plans.filter((p) => p.id !== id);
    setPlans(updated);
    persistPlans(updated);
    deleteFromCloud(id); // Background cloud delete
  };

  const totalRooms = (plan: SavedFloorPlan) => plan.rooms.length;
  const totalItems = (plan: SavedFloorPlan) =>
    plan.rooms.reduce((sum, r) => sum + r.symbolIds.length, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[75vh] p-0 rounded-t-2xl overflow-hidden bg-background border-t border-white/10 flex flex-col lg:left-0">
        <SheetHeader className="px-4 pt-4 pb-3 border-b border-white/10 shrink-0">
          <SheetTitle className="text-white text-lg font-semibold flex items-center gap-2">
            My Floor Plans
            {cloudSyncing ? (
              <Loader2 className="h-4 w-4 text-elec-yellow animate-spin" />
            ) : (
              <Cloud className="h-4 w-4 text-white" />
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-3">
          {/* Save current work */}
          {currentRooms.length > 0 && (
            <div className="p-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
              {showSaveInput ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Plan name (e.g. 14 High Street)"
                    value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveCurrent()}
                    className="flex-1 h-11 bg-white/10 border border-white/20 rounded-lg text-white text-sm px-3 touch-manipulation focus:border-elec-yellow focus:outline-none"
                    autoFocus
                  />
                  <Button onClick={handleSaveCurrent} disabled={!saveName.trim()} className="h-11 px-4 bg-elec-yellow text-black font-semibold touch-manipulation">
                    Save
                  </Button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSaveInput(true)}
                  className="w-full text-left touch-manipulation"
                >
                  <p className="text-sm font-semibold text-elec-yellow">Save current floor plan</p>
                  <p className="text-xs text-white mt-0.5">{currentRooms.length} room{currentRooms.length !== 1 ? 's' : ''} — tap to save</p>
                </button>
              )}
            </div>
          )}

          {/* Saved plans list */}
          {plans.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-10 w-10 text-white mx-auto mb-3" />
              <p className="text-white text-sm">No saved floor plans</p>
              <p className="text-white/60 text-xs mt-1">Save your current work to access it later</p>
            </div>
          ) : (
            plans.map((plan) => (
              <div
                key={plan.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation"
              >
                {/* Thumbnail of first room */}
                <div className="w-14 h-10 rounded-lg bg-white/5 overflow-hidden shrink-0">
                  {plan.rooms[0]?.thumbnail ? (
                    <img src={plan.rooms[0].thumbnail} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <button
                  onClick={() => {
                    haptic.light();
                    onLoadPlan(plan);
                    onOpenChange(false);
                  }}
                  className="flex-1 text-left touch-manipulation"
                >
                  <p className="text-sm font-semibold text-white">{plan.name}</p>
                  <p className="text-xs text-white mt-0.5">
                    {totalRooms(plan)} room{totalRooms(plan) !== 1 ? 's' : ''} · {totalItems(plan)} items · {new Date(plan.updatedAt).toLocaleDateString('en-GB')}
                  </p>
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="h-8 w-8 rounded-lg bg-white/[0.06] flex items-center justify-center touch-manipulation active:scale-90"
                >
                  <Trash2 className="h-3.5 w-3.5 text-white/50" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-white/10 shrink-0">
          <Button
            onClick={() => { onNewPlan(); onOpenChange(false); }}
            variant="outline"
            className="w-full h-11 border-white/10 text-white touch-manipulation"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Floor Plan
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
