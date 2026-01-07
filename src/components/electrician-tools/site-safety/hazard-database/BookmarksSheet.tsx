import React from 'react';
import { Bookmark } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HazardCardV2 } from './HazardCardV2';
import type { EnhancedRiskConsequence } from '@/data/hazards';

interface BookmarksSheetProps {
  open: boolean;
  onClose: () => void;
  bookmarkedHazards: EnhancedRiskConsequence[];
  bookmarks: Set<string>;
  onSelectHazard: (hazard: EnhancedRiskConsequence) => void;
  onToggleBookmark: (id: string) => void;
}

export const BookmarksSheet: React.FC<BookmarksSheetProps> = ({
  open,
  onClose,
  bookmarkedHazards,
  bookmarks,
  onSelectHazard,
  onToggleBookmark,
}) => {
  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="bottom"
        className="rounded-t-3xl bg-elec-dark border-white/[0.08] max-h-[80vh]"
      >
        {/* Drag Handle */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/20" />

        <SheetHeader className="text-left pt-4 pb-2">
          <SheetTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-elec-yellow fill-elec-yellow" />
            Saved Hazards
            <span className="text-sm font-normal text-white/50">
              ({bookmarkedHazards.length})
            </span>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[60vh] mt-4 -mx-6 px-6">
          {bookmarkedHazards.length === 0 ? (
            <div className="flex flex-col items-center py-16">
              <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-5">
                <Bookmark className="h-10 w-10 text-white/20" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No Saved Hazards
              </h3>
              <p className="text-sm text-white/50 text-center max-w-xs">
                Tap the bookmark icon on any hazard to save it for quick access
              </p>
            </div>
          ) : (
            <div className="space-y-3 pb-4">
              {bookmarkedHazards.map((hazard, i) => (
                <HazardCardV2
                  key={hazard.id}
                  hazard={hazard}
                  index={i}
                  isBookmarked={bookmarks.has(hazard.id)}
                  onTap={() => {
                    onSelectHazard(hazard);
                    onClose();
                  }}
                  onBookmark={() => onToggleBookmark(hazard.id)}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default BookmarksSheet;
