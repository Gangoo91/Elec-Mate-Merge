import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Edit, Trash2, Eye, Calendar, Clock, Star, MessageSquare } from 'lucide-react';
import { PortfolioEntry, PortfolioCategory } from '@/types/portfolio';
import PortfolioEntryForm from './PortfolioEntryForm';
import PortfolioEntryViewDialog from './PortfolioEntryViewDialog';
import { usePortfolioData } from '@/hooks/portfolio/usePortfolioData';
import { EvidenceCommentsIndicator, EvidenceComments } from '@/components/portfolio-hub/comments';

interface PortfolioEntriesListProps {
  entries: PortfolioEntry[];
  onUpdateEntry: (entryId: string, updates: Partial<PortfolioEntry>) => void;
  onDeleteEntry: (entryId: string) => void;
}

const PortfolioEntriesList = ({
  entries,
  onUpdateEntry,
  onDeleteEntry,
}: PortfolioEntriesListProps) => {
  const { categories } = usePortfolioData();
  const [editingEntry, setEditingEntry] = useState<PortfolioEntry | null>(null);
  const [viewingEntry, setViewingEntry] = useState<PortfolioEntry | null>(null);
  const [commentsEntry, setCommentsEntry] = useState<PortfolioEntry | null>(null);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In progress';
      case 'reviewed':
        return 'Reviewed';
      case 'draft':
        return 'Draft';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  if (entries.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] flex flex-col items-center justify-center py-8 px-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mb-2">
          No portfolio entries found
        </span>
        <p className="text-[14px] text-white/70 leading-relaxed text-center max-w-md">
          Start building your portfolio by adding your first entry. Document your learning journey
          and professional development.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="text-[15px] font-medium text-white leading-tight mb-2">
                {entry.title}
              </h4>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[11px] text-white/55 font-mono">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(entry.dateCreated)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {Math.floor(entry.timeSpent / 60)}h {entry.timeSpent % 60}m
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {entry.selfAssessment}/5
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-shrink-0">
              <EvidenceCommentsIndicator
                evidenceId={entry.id}
                onClick={() => setCommentsEntry(entry)}
              />
              <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                {getStatusText(entry.status)}
              </span>
              <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                {entry.category.name}
              </span>
            </div>
          </div>

          <p className="text-[13px] text-white/85 leading-relaxed line-clamp-2">
            {entry.description}
          </p>

          {entry.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {entry.skills.slice(0, 2).map((skill) => (
                <span
                  key={skill}
                  className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                >
                  {skill}
                </span>
              ))}
              {entry.skills.length > 2 && (
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                  +{entry.skills.length - 2} more
                </span>
              )}
            </div>
          )}

          {entry.evidenceFiles.length > 0 && (
            <p className="text-[11px] text-white/55 font-mono">
              {entry.evidenceFiles.length} evidence file
              {entry.evidenceFiles.length !== 1 ? 's' : ''} attached
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setViewingEntry(entry)}
              className="gap-1 flex-1 sm:flex-none h-10 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
            >
              <Eye className="h-4 w-4" />
              View
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCommentsEntry(entry)}
              className="gap-1 flex-1 sm:flex-none h-10 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
            >
              <MessageSquare className="h-4 w-4" />
              Comments
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditingEntry(entry)}
              className="gap-1 flex-1 sm:flex-none h-10 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                if (confirm('Are you sure you want to delete this portfolio entry?')) {
                  onDeleteEntry(entry.id);
                }
              }}
              className="gap-1 flex-1 sm:flex-none h-10 border-red-500/30 text-red-300 hover:bg-red-500/[0.08] touch-manipulation"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      ))}

      {/* Edit Form Dialog */}
      {editingEntry && (
        <PortfolioEntryForm
          categories={categories}
          initialData={editingEntry}
          onSubmit={(updatedData) => {
            onUpdateEntry(editingEntry.id, updatedData);
            setEditingEntry(null);
          }}
          onCancel={() => setEditingEntry(null)}
        />
      )}

      {/* View Dialog */}
      {viewingEntry && (
        <PortfolioEntryViewDialog
          entry={viewingEntry}
          onClose={() => setViewingEntry(null)}
          onEdit={() => {
            setEditingEntry(viewingEntry);
            setViewingEntry(null);
          }}
        />
      )}

      {/* Comments Sheet */}
      <Sheet open={!!commentsEntry} onOpenChange={(open) => !open && setCommentsEntry(null)}>
        <SheetContent side="right" className="w-full sm:max-w-lg">
          <SheetHeader className="sr-only">
            <SheetTitle>Evidence Comments</SheetTitle>
          </SheetHeader>
          {commentsEntry && (
            <EvidenceComments
              evidenceId={commentsEntry.id}
              evidenceTitle={commentsEntry.title}
              onClose={() => setCommentsEntry(null)}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PortfolioEntriesList;
