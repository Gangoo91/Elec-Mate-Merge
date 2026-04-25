import { memo, useCallback, useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

/**
 * SaveToJobSheet — bottom sheet listing the user's active projects so the
 * current Elec-AI answer can be saved against one of them.
 *
 * ELE-859 / ELE-861:
 *   - Lists `spark_projects` rows (NOT reports/certs) — projects are the
 *     job-level container in the app's mental model.
 *   - Joins to `customers` for a friendly client name.
 *   - Writes append-only into `spark_projects.ai_notes` (JSONB array).
 *   - User-facing copy uses "project", "saved as a note" — never internal
 *     field names like `ai_saved_notes`.
 */

interface ProjectRow {
  id: string;
  title: string;
  description: string | null;
  status: string | null;
  location: string | null;
  customer_id: string | null;
  updated_at: string | null;
  ai_notes: unknown;
  customers?: { name: string | null } | null;
}

interface SaveToJobSheetProps {
  /** Controls visibility. */
  isOpen: boolean;
  /** Close callback. */
  onClose: () => void;
  /** The AI answer to attach. */
  answer: string;
  /** Optional question that produced the answer — helps contextualise. */
  question?: string;
  /** Optional cited regulation numbers. */
  citedRegulations?: string[];
  /** Optional photos the user attached when asking the question. */
  imageUrls?: string[];
}

interface SavedNote {
  id: string;
  question: string;
  answer: string;
  cited_regulations?: string[];
  image_urls?: string[];
  source: 'elec-ai';
  saved_at: string;
}

function titleCaseStatus(status: string | null): string {
  if (!status) return 'Project';
  return status
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatUpdatedAgo(value: string | null): string {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return formatDistanceToNow(d, { addSuffix: true });
}

export const SaveToJobSheet = memo(function SaveToJobSheet({
  isOpen,
  onClose,
  answer,
  question,
  citedRegulations,
  imageUrls,
}: SaveToJobSheetProps) {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setIsLoading(true);

    (async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          if (!cancelled) {
            setProjects([]);
            setIsLoading(false);
            toast.error('Sign in required');
          }
          return;
        }

        const { data, error } = await supabase
          .from('spark_projects')
          .select(
            'id, title, description, status, location, customer_id, updated_at, ai_notes, customers ( name )'
          )
          .eq('user_id', user.id)
          .neq('status', 'completed')
          .neq('status', 'cancelled')
          .order('updated_at', { ascending: false })
          .limit(15);

        if (error) throw error;
        if (cancelled) return;
        setProjects((data ?? []) as unknown as ProjectRow[]);
      } catch (err) {
        console.error('[SaveToJobSheet] load projects failed', err);
        if (!cancelled) toast.error('Could not load projects');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  const handleSave = useCallback(
    async (project: ProjectRow) => {
      if (savingId) return;
      setSavingId(project.id);

      try {
        const note: SavedNote = {
          id:
            typeof crypto !== 'undefined' && 'randomUUID' in crypto
              ? crypto.randomUUID()
              : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
          question: question?.trim() || 'Elec-AI answer',
          answer: answer.trim(),
          cited_regulations: citedRegulations,
          image_urls:
            imageUrls && imageUrls.length > 0 ? imageUrls.slice(0, 5) : undefined,
          source: 'elec-ai',
          saved_at: new Date().toISOString(),
        };

        const existing = Array.isArray(project.ai_notes)
          ? (project.ai_notes as SavedNote[])
          : [];

        // Newest first; cap at 100 per project so we don't grow forever.
        const nextNotes = [note, ...existing].slice(0, 100);

        const { error } = await supabase
          .from('spark_projects')
          .update({ ai_notes: nextNotes, updated_at: new Date().toISOString() })
          .eq('id', project.id);

        if (error) throw error;

        const clientName = project.customers?.name?.trim();
        toast.success('Saved to project', {
          description: clientName
            ? `${project.title} · ${clientName}`
            : project.title,
        });
        onClose();
      } catch (err) {
        console.error('[SaveToJobSheet] save failed', err);
        toast.error('Could not save — try again in a moment');
      } finally {
        setSavingId(null);
      }
    },
    [answer, citedRegulations, imageUrls, onClose, question, savingId]
  );

  return (
    <Sheet open={isOpen} onOpenChange={(next) => !next && onClose()}>
      <SheetContent
        side="bottom"
        hideCloseButton
        className={cn(
          'bg-[hsl(0_0%_8%)] border-white/[0.06] text-white p-0 flex flex-col',
          'h-[75vh] rounded-t-2xl'
        )}
      >
        {/* Header */}
        <div className="shrink-0 px-5 pt-5 pb-4 border-b border-white/[0.06]">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white">
                Save to a project
              </div>
              <div className="mt-1.5 text-[15px] font-semibold text-white tracking-tight">
                Save this Elec-AI answer
              </div>
              <p className="mt-1 text-[12px] text-white leading-relaxed">
                Choose a project to save this answer to.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 h-8 px-3 rounded-full text-[12px] font-medium text-white hover:text-white bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors touch-manipulation"
              aria-label="Close"
            >
              Close ×
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2">
          {isLoading && (
            <div className="space-y-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-16 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] animate-pulse"
                />
              ))}
            </div>
          )}

          {!isLoading && projects.length === 0 && (
            <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-4 py-6 text-center">
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white">
                No active projects
              </div>
              <p className="mt-2 text-[13px] text-white leading-relaxed">
                Start a new project, then come back here to save this answer.
              </p>
            </div>
          )}

          {!isLoading &&
            projects.map((project) => {
              const saving = savingId === project.id;
              const clientName = project.customers?.name?.trim() || null;
              const subtitleParts = [clientName, project.location?.trim() || null].filter(
                (x): x is string => !!x
              );
              const subtitle = subtitleParts.length > 0 ? subtitleParts.join(' · ') : null;

              return (
                <button
                  key={project.id}
                  type="button"
                  disabled={!!savingId}
                  onClick={() => handleSave(project)}
                  className={cn(
                    'w-full text-left rounded-2xl px-4 py-3',
                    'bg-[hsl(0_0%_12%)] border border-white/[0.06]',
                    'hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation',
                    'disabled:opacity-60 disabled:cursor-not-allowed',
                    'min-h-11'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
                        {titleCaseStatus(project.status)}
                      </div>
                      <div className="mt-0.5 text-[14px] font-semibold text-white truncate">
                        {project.title || 'Untitled project'}
                      </div>
                      {subtitle ? (
                        <div className="mt-0.5 text-[12px] text-white truncate">
                          {subtitle}
                        </div>
                      ) : (
                        <div className="mt-0.5 text-[12px] text-white italic truncate">
                          No client or location
                        </div>
                      )}
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="text-[11px] text-white">
                        {formatUpdatedAgo(project.updated_at)}
                      </div>
                      <div className="mt-1 text-[11px] font-medium text-elec-yellow/90">
                        {saving ? 'Saving…' : 'Save →'}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
        </div>
      </SheetContent>
    </Sheet>
  );
});

export default SaveToJobSheet;
