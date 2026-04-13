import { useState, useMemo } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Mail } from 'lucide-react';
import { SavedRoom } from '@/hooks/useFloorPlanRooms';
import { symbolRegistry } from '@/components/electrician-tools/diagram-builder/symbols/symbolRegistry';

export interface ExportData {
  property: string;
  client: string;
  electrician: string;
  date: string;
  notes: string;
  rooms: SavedRoom[];
  materialsSchedule: { category: string; name: string; count: number }[];
  totalItems: number;
}

interface ExportReviewSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rooms: SavedRoom[];
  onGeneratePdf: (data: ExportData) => void;
}

export const ExportReviewSheet = ({ open, onOpenChange, rooms, onGeneratePdf }: ExportReviewSheetProps) => {
  const [property, setProperty] = useState('');
  const [client, setClient] = useState('');
  const [electrician, setElectrician] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  // Aggregate materials from all rooms
  const schedule = useMemo(() => {
    const allSymbolIds = rooms.flatMap((r) => r.symbolIds);
    const countMap = new Map<string, number>();
    allSymbolIds.forEach((id) => countMap.set(id, (countMap.get(id) || 0) + 1));

    return Array.from(countMap.entries())
      .map(([id, count]) => {
        const sym = symbolRegistry.find((s) => s.id === id);
        return {
          id,
          name: sym?.name || id,
          category: sym?.category || 'other',
          count,
        };
      })
      .sort((a, b) => a.category.localeCompare(b.category) || b.count - a.count);
  }, [rooms]);

  const totalItems = schedule.reduce((sum, s) => sum + s.count, 0);

  // Group schedule by category
  const grouped = schedule.reduce<Record<string, { name: string; count: number }[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push({ name: item.name, count: item.count });
    return acc;
  }, {});

  const categoryOrder = Object.keys(grouped).sort();

  const handleGenerate = () => {
    onGeneratePdf({
      property,
      client,
      electrician,
      date,
      notes,
      rooms,
      materialsSchedule: schedule.map(({ category, name, count }) => ({ category, name, count })),
      totalItems,
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-2xl overflow-hidden lg:left-0">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <div className="px-4 pt-4 pb-3 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white">Export Floor Plans</h2>
            <p className="text-xs text-white mt-0.5">
              {rooms.length} room{rooms.length !== 1 ? 's' : ''} &middot; {totalItems} item{totalItems !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
            {/* Project Details */}
            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                Project Details
              </h3>
              <div className="space-y-2">
                <Input
                  placeholder="Property address"
                  value={property}
                  onChange={(e) => setProperty(e.target.value)}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 text-white"
                />
                <Input
                  placeholder="Client name"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 text-white"
                />
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 text-white"
                />
                <Input
                  placeholder="Drawn by"
                  value={electrician}
                  onChange={(e) => setElectrician(e.target.value)}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 text-white"
                />
              </div>
            </section>

            {/* Rooms */}
            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Rooms
              </h3>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {rooms.map((room) => (
                  <div key={room.id} className="shrink-0 text-center">
                    <div className="w-[60px] h-[45px] rounded-lg overflow-hidden border border-white/10 bg-white">
                      {room.thumbnail ? (
                        <img
                          src={room.thumbnail}
                          alt={room.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-white/5" />
                      )}
                    </div>
                    <p className="text-[10px] text-white mt-1 truncate max-w-[60px]">{room.name}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Materials Schedule */}
            {schedule.length > 0 && (
              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Materials Schedule
                </h3>
                <div className="space-y-2">
                  {categoryOrder.map((cat, idx) => (
                    <div
                      key={cat}
                      className={idx > 0 ? 'border-t border-white/10 pt-2' : ''}
                    >
                      <p className="text-elec-yellow text-[10px] uppercase font-semibold tracking-wide mb-1">
                        {cat}
                      </p>
                      {grouped[cat].map((item) => (
                        <div key={item.name} className="flex items-center justify-between py-0.5">
                          <span className="text-white text-xs">{item.name}</span>
                          <span className="text-white text-xs font-medium tabular-nums">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  ))}

                  {/* Total */}
                  <div className="border-t border-white/10 pt-2 flex items-center justify-between">
                    <span className="text-white text-xs font-bold">Total</span>
                    <span className="text-white text-xs font-bold tabular-nums">{totalItems}</span>
                  </div>
                </div>
              </section>
            )}

            {/* Notes */}
            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Notes
              </h3>
              <Textarea
                placeholder="Additional notes for the export..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="touch-manipulation text-base min-h-[80px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500 text-white"
              />
            </section>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-white/10 flex gap-2 shrink-0 pb-safe">
            <Button
              onClick={handleGenerate}
              className="flex-1 h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold touch-manipulation"
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate PDF
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                handleGenerate();
              }}
              className="h-11 px-4 border-white/20 text-white hover:bg-white/10 touch-manipulation"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
