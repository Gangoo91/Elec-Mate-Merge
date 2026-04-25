import { useState, useEffect, useCallback } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import { ChevronDown, ChevronUp, Sparkles, Trash2, Bot } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

/**
 * ProjectAINotes — collapsible section in the project detail page that
 * surfaces every Elec-AI answer the user has saved to this project.
 *
 * Reads from `spark_projects.ai_notes` (JSONB array of saved notes, newest
 * first, capped at 100 by SaveToJobSheet). Each note shows the original
 * question, an excerpt of the answer, cited regs and timestamp. User can
 * expand to read the full answer or delete a note.
 *
 * Empty state points back at Elec-AI so the loop is obvious.
 */

interface AINote {
  id: string;
  question: string;
  answer: string;
  cited_regulations?: string[];
  image_urls?: string[];
  source: 'elec-ai' | string;
  saved_at: string;
}

interface ProjectAINotesProps {
  projectId: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function ProjectAINotes({ projectId, isOpen, onToggle }: ProjectAINotesProps) {
  const [notes, setNotes] = useState<AINote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchNotes = useCallback(async () => {
    if (!projectId) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('spark_projects')
        .select('ai_notes')
        .eq('id', projectId)
        .maybeSingle();
      if (error) throw error;
      const raw = (data?.ai_notes as unknown) ?? [];
      setNotes(Array.isArray(raw) ? (raw as AINote[]) : []);
    } catch (err) {
      console.error('[ProjectAINotes] fetch failed', err);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (isOpen) fetchNotes();
  }, [isOpen, fetchNotes]);

  const handleDelete = useCallback(async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const remaining = notes.filter((n) => n.id !== deleteId);
      const { error } = await supabase
        .from('spark_projects')
        .update({ ai_notes: remaining, updated_at: new Date().toISOString() })
        .eq('id', projectId);
      if (error) throw error;
      setNotes(remaining);
      toast.success('Note removed');
      setDeleteId(null);
    } catch (err) {
      console.error('[ProjectAINotes] delete failed', err);
      toast.error('Could not remove note');
    } finally {
      setIsDeleting(false);
    }
  }, [deleteId, notes, projectId]);

  const formatSavedAgo = (iso: string): string => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    return formatDistanceToNow(d, { addSuffix: true });
  };

  return (
    <>
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation h-14 active:bg-white/[0.06] transition-colors">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-elec-yellow" />
              <span className="text-[15px] font-bold text-white">Elec-AI notes</span>
            </div>
            <div className="flex items-center gap-2">
              {notes.length > 0 && (
                <span className="text-[12px] font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-full">
                  {notes.length}
                </span>
              )}
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-white" />
              ) : (
                <ChevronDown className="h-4 w-4 text-white" />
              )}
            </div>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-2">
          {isLoading && (
            <div className="space-y-2">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="h-16 rounded-xl bg-white/[0.04] border border-white/[0.08] animate-pulse"
                />
              ))}
            </div>
          )}

          {!isLoading && notes.length === 0 && (
            <div className="flex flex-col items-center py-6 text-center">
              <Bot className="h-7 w-7 text-white mb-2" />
              <p className="text-sm text-white mb-1">No saved answers yet</p>
              <p className="text-xs text-white px-6">
                Tap "Save to job" on any Elec-AI answer to attach it here.
              </p>
            </div>
          )}

          {!isLoading &&
            notes.map((note) => {
              const isExpanded = expandedId === note.id;
              const cited = note.cited_regulations ?? [];
              return (
                <div
                  key={note.id}
                  className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-3"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : note.id)}
                    className="w-full text-left touch-manipulation"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-semibold text-white leading-snug">
                          {note.question}
                        </p>
                        {/* Photo thumbnails — render the diagnostic photos so the
                            saved note carries the visual context of the question. */}
                        {note.image_urls && note.image_urls.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {note.image_urls.slice(0, 5).map((url, i) => (
                              <a
                                key={url + i}
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="block w-14 h-14 rounded-lg overflow-hidden border border-white/[0.08]"
                              >
                                <img
                                  src={url}
                                  alt={`Photo ${i + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </a>
                            ))}
                          </div>
                        )}
                        <p
                          className={cn(
                            'mt-1.5 text-[12px] text-white/80 leading-relaxed',
                            !isExpanded && 'line-clamp-3'
                          )}
                          style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                        >
                          {note.answer}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px]">
                          <span className="text-white/55 uppercase tracking-[0.18em]">
                            {formatSavedAgo(note.saved_at)}
                          </span>
                          {cited.length > 0 && (
                            <span className="text-elec-yellow/80">
                              Cited:{' '}
                              {cited
                                .slice(0, 4)
                                .map((r) => `Reg ${r}`)
                                .join(', ')}
                              {cited.length > 4 ? ` +${cited.length - 4}` : ''}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="shrink-0 mt-0.5">
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-white/50" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-white/50" />
                        )}
                      </span>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="mt-2 pt-2 border-t border-white/[0.06] flex justify-end">
                      <button
                        type="button"
                        onClick={() => setDeleteId(note.id)}
                        className="inline-flex items-center gap-1.5 text-[11px] font-medium text-red-400/85 hover:text-red-400 touch-manipulation"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Remove from project
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </CollapsibleContent>
      </Collapsible>

      <AlertDialog open={!!deleteId} onOpenChange={(next) => !next && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this Elec-AI note?</AlertDialogTitle>
            <AlertDialogDescription>
              The note is removed from this project. The original Elec-AI conversation
              history isn't affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? 'Removing…' : 'Remove'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ProjectAINotes;
