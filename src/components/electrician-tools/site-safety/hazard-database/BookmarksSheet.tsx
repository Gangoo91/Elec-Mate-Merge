import { Sheet, SheetContent } from '@/components/ui/sheet';
import { RiskPill, riskTone } from './RiskBar';
import type { EnhancedRiskConsequence } from '@/data/hazards';
import { SheetShell, ListCard, ListRow, EmptyState } from '@/components/college/primitives';

interface BookmarksSheetProps {
  open: boolean;
  onClose: () => void;
  bookmarkedHazards: EnhancedRiskConsequence[];
  bookmarks: Set<string>;
  onSelectHazard: (hazard: EnhancedRiskConsequence) => void;
  onToggleBookmark: (id: string) => void;
}

export const BookmarksSheet = ({
  open,
  onClose,
  bookmarkedHazards,
  onSelectHazard,
}: BookmarksSheetProps) => {
  // Highest-risk saved hazards first.
  const sorted = [...bookmarkedHazards].sort((a, b) => b.riskRating - a.riskRating);

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="bottom"
        className="h-[80vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08]"
      >
        <SheetShell
          eyebrow="Saved"
          title="Saved hazards"
          description={`${bookmarkedHazards.length} saved`}
        >
          {sorted.length === 0 ? (
            <EmptyState
              title="No saved hazards"
              description="Open any hazard and tap Save to keep it here for quick access."
            />
          ) : (
            <ListCard>
              {sorted.map((hazard) => (
                <ListRow
                  key={hazard.id}
                  onClick={() => {
                    onSelectHazard(hazard);
                    onClose();
                  }}
                  accent={riskTone(hazard.riskRating)}
                  title={hazard.hazard}
                  subtitle={hazard.consequence}
                  trailing={<RiskPill riskRating={hazard.riskRating} />}
                />
              ))}
            </ListCard>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
};

export default BookmarksSheet;
