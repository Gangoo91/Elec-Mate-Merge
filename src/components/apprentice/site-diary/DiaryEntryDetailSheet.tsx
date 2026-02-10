/**
 * DiaryEntryDetailSheet
 *
 * 85vh bottom sheet showing a single diary entry's full details.
 * Includes edit/delete actions, "Add to Portfolio" stub, and related entries.
 */

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/ui/sheet';
import {
  MapPin,
  Calendar,
  Wrench,
  GraduationCap,
  MessageSquare,
  AlertTriangle,
  Pencil,
  Trash2,
  Briefcase,
  ChevronDown,
  User,
  ImageIcon,
  X,
  CheckCircle2,
  Circle,
  Sparkles,
  Loader2,
  Lightbulb,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import type { SiteDiaryEntry } from '@/hooks/site-diary/useSiteDiaryEntries';
import { supabase } from '@/integrations/supabase/client';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { useDiaryEntryAnalysis } from '@/hooks/site-diary/useDiaryEntryAnalysis';
import { toast } from 'sonner';

const moodEmojis: Record<number, string> = {
  1: '😢',
  2: '😔',
  3: '😐',
  4: '🙂',
  5: '😊',
};

const moodLabels: Record<number, string> = {
  1: 'Struggling',
  2: 'Low',
  3: 'Okay',
  4: 'Good',
  5: 'Great',
};

function moodColour(mood: number): string {
  if (mood >= 4) return 'text-green-400 bg-green-400/10 border-green-400/20';
  if (mood === 3) return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
  return 'text-red-400 bg-red-400/10 border-red-400/20';
}

const skillColours: Record<string, string> = {
  'Practical Skills': 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  'Health & Safety': 'bg-red-500/15 text-red-400 border-red-500/25',
  'Testing & Inspection': 'bg-purple-500/15 text-purple-400 border-purple-500/25',
  'Wiring & Containment': 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  Regulations: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
  'Tools & Equipment': 'bg-orange-500/15 text-orange-400 border-orange-500/25',
  Communication: 'bg-pink-500/15 text-pink-400 border-pink-500/25',
  'Problem Solving': 'bg-green-500/15 text-green-400 border-green-500/25',
};

interface SuggestedAC {
  unitCode: string;
  unitTitle: string;
  acText: string;
  loText: string;
  selected: boolean;
}

interface DiaryEntryDetailSheetProps {
  entry: SiteDiaryEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (entry: SiteDiaryEntry) => void;
  onDelete: (id: string) => void;
  relatedEntries: SiteDiaryEntry[];
  /** Set of AC full refs (e.g. "301.2.3") already evidenced in portfolio */
  evidencedACs?: Set<string>;
}

export function DiaryEntryDetailSheet({
  entry,
  open,
  onOpenChange,
  onEdit,
  onDelete,
  relatedEntries,
  evidencedACs,
}: DiaryEntryDetailSheetProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);

  // AI analysis hook
  const { qualificationCode } = useStudentQualification();
  const {
    analysis: entryAnalysis,
    isLoading: analysisLoading,
    refresh: refreshAnalysis,
  } = useDiaryEntryAnalysis(open ? (entry?.id ?? null) : null, entry, qualificationCode);

  // Portfolio creation state
  const [showPortfolioPicker, setShowPortfolioPicker] = useState(false);
  const [suggestedACs, setSuggestedACs] = useState<SuggestedAC[]>([]);
  const [isSearchingACs, setIsSearchingACs] = useState(false);
  const [isCreatingPortfolio, setIsCreatingPortfolio] = useState(false);

  if (!entry) return null;

  const formattedDate = new Date(entry.date + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(entry.id);
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
    }
  };

  // Search for matching assessment criteria from the qualification
  const handleAddToPortfolio = async () => {
    if (!qualificationCode) {
      // No qualification selected — create portfolio item without AC mapping
      await createPortfolioItem([]);
      return;
    }

    setShowPortfolioPicker(true);
    setIsSearchingACs(true);

    try {
      // Build keywords from diary entry
      const keywords = [
        ...entry.tasks_completed,
        ...entry.skills_practised,
        entry.what_i_learned || '',
      ]
        .join(' ')
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => w.length >= 3);
      const uniqueKeywords = Array.from(new Set(keywords)).slice(0, 15);

      const { data, error } = await supabase.rpc('search_qualification_requirements', {
        p_keywords: uniqueKeywords,
        p_qualification_code: qualificationCode,
        p_limit: 10,
      });

      if (error) throw error;

      const suggestions: SuggestedAC[] = [];
      for (const req of data || []) {
        for (const ac of req.assessment_criteria || []) {
          suggestions.push({
            unitCode: req.unit_code,
            unitTitle: req.unit_title,
            acText: ac,
            loText: req.learning_outcome,
            selected: false,
          });
        }
      }

      // Smart AC pre-selection: use AI analysis results if available
      if (entryAnalysis?.matchedCriteria?.length) {
        const aiMatches = new Set(
          entryAnalysis.matchedCriteria
            .filter((mc) => mc.confidence >= 60)
            .map((mc) => `${mc.unitCode}:${mc.acText}`)
        );
        for (const s of suggestions) {
          // Check for matching unitCode + acText (or acCode within acText)
          if (aiMatches.has(`${s.unitCode}:${s.acText}`)) {
            s.selected = true;
          }
          // Also try matching by acCode substring
          for (const mc of entryAnalysis.matchedCriteria) {
            if (mc.confidence >= 60 && mc.unitCode === s.unitCode && s.acText.includes(mc.acCode)) {
              s.selected = true;
            }
          }
        }
        // If no AI matches found in DB results, fall back to top 3
        if (!suggestions.some((s) => s.selected)) {
          for (let i = 0; i < Math.min(3, suggestions.length); i++) {
            suggestions[i].selected = true;
          }
        }
      } else {
        // No AI analysis — auto-select top 3
        for (let i = 0; i < Math.min(3, suggestions.length); i++) {
          suggestions[i].selected = true;
        }
      }

      setSuggestedACs(suggestions.slice(0, 15));
    } catch (err) {
      console.error('[DiaryEntry] AC search error:', err);
      setSuggestedACs([]);
    } finally {
      setIsSearchingACs(false);
    }
  };

  const toggleAC = (idx: number) => {
    setSuggestedACs((prev) =>
      prev.map((ac, i) => (i === idx ? { ...ac, selected: !ac.selected } : ac))
    );
  };

  const createPortfolioItem = async (selectedACs: SuggestedAC[]) => {
    setIsCreatingPortfolio(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');

      const title = `Site Diary: ${entry.site_name} — ${new Date(entry.date + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;
      const description = [
        `**Site:** ${entry.site_name}`,
        entry.supervisor ? `**Supervisor:** ${entry.supervisor}` : '',
        `**Tasks:** ${entry.tasks_completed.join(', ')}`,
        `**Skills:** ${entry.skills_practised.join(', ')}`,
        entry.what_i_learned ? `**What I Learned:** ${entry.what_i_learned}` : '',
      ]
        .filter(Boolean)
        .join('\n\n');

      const acsMet = selectedACs
        .filter((ac) => ac.selected)
        .map((ac) => `${ac.unitCode} AC ${ac.acText}`);

      const losMet = Array.from(
        new Set(selectedACs.filter((ac) => ac.selected).map((ac) => `${ac.unitCode}: ${ac.loText}`))
      );

      const { data: newItem, error } = await supabase
        .from('portfolio_items')
        .insert({
          user_id: user.id,
          title,
          description,
          category: 'site-diary-evidence',
          skills_demonstrated: entry.skills_practised,
          reflection_notes: entry.what_i_learned || '',
          assessment_criteria_met: acsMet,
          learning_outcomes_met: losMet,
          storage_urls: entry.photos?.length
            ? entry.photos.map((url, i) => ({
                id: `diary-photo-${i}`,
                name: `Site photo ${i + 1}`,
                type: 'image/jpeg',
                size: 0,
                url,
                uploadDate: entry.created_at,
              }))
            : [],
          status: 'completed',
          date_completed: new Date(entry.date + 'T12:00:00').toISOString(),
          evidence_count: (entry.photos?.length || 0) + 1,
          tags: ['site-diary', entry.site_name.toLowerCase().replace(/\s+/g, '-')],
          supervisor_feedback: entry.supervisor ? `Supervised by: ${entry.supervisor}` : null,
        })
        .select('id')
        .single();

      if (error) throw error;

      // Link the diary entry to the portfolio item's UUID
      await supabase
        .from('site_diary_entries')
        .update({ linked_portfolio_id: newItem.id })
        .eq('id', entry.id);

      const acCount = acsMet.length;
      toast.success('Added to portfolio', {
        description: acCount > 0
          ? `${acCount} assessment criteri${acCount === 1 ? 'on' : 'a'} linked — keep building your evidence!`
          : 'Evidence saved — open your portfolio to track progress',
      });
      setShowPortfolioPicker(false);
      setSuggestedACs([]);
    } catch (err) {
      console.error('[DiaryEntry] Portfolio create error:', err);
      toast.error('Failed to add to portfolio');
    } finally {
      setIsCreatingPortfolio(false);
    }
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setConfirmDelete(false);
      }}
    >
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden [&>button.absolute]:hidden sm:max-w-[640px] sm:mx-auto sm:rounded-t-2xl"
      >
        <div className="flex flex-col h-full bg-[hsl(240,5.9%,10%)]">
          {/* Header */}
          <SheetHeader className="flex-shrink-0 relative">
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="h-1 w-10 rounded-full bg-white/30" />
            </div>
            <SheetTitle className="sr-only">Diary Entry Details</SheetTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-2 top-1.5 h-11 w-11 flex items-center justify-center rounded-full active:bg-white/10 touch-manipulation z-10"
            >
              <ChevronDown className="h-5 w-5 text-white" />
            </button>
          </SheetHeader>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-5">
            {/* Date + mood header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-white" />
                <span className="text-sm font-semibold text-white">{formattedDate}</span>
              </div>
              {entry.mood_rating && (
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-sm font-medium ${moodColour(entry.mood_rating)}`}
                  >
                    <span className="text-lg">{moodEmojis[entry.mood_rating]}</span>
                    {moodLabels[entry.mood_rating]}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Site name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4 text-elec-yellow flex-shrink-0" />
              <span className="text-base font-medium text-white">{entry.site_name}</span>
            </motion.div>

            {/* Supervisor */}
            {entry.supervisor && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4 text-white flex-shrink-0" />
                <span className="text-sm text-white">Supervised by {entry.supervisor}</span>
              </motion.div>
            )}

            {/* Tasks completed */}
            {entry.tasks_completed.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <Wrench className="h-3.5 w-3.5 text-white" />
                  <span className="text-xs font-medium text-white uppercase tracking-wider">
                    Tasks Completed
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {entry.tasks_completed.map((task) => (
                    <span
                      key={task}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.08] border border-white/[0.08] text-sm text-white"
                    >
                      {task}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Skills practised */}
            {entry.skills_practised.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <GraduationCap className="h-3.5 w-3.5 text-white" />
                  <span className="text-xs font-medium text-white uppercase tracking-wider">
                    Skills Practised
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {entry.skills_practised.map((skill) => (
                    <span
                      key={skill}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                        skillColours[skill] || 'bg-white/[0.06] text-white/70 border-white/10'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* What I learned */}
            {entry.what_i_learned && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <MessageSquare className="h-3.5 w-3.5 text-white" />
                  <span className="text-xs font-medium text-white uppercase tracking-wider">
                    What I Learned
                  </span>
                </div>
                <div className="border-l-2 border-elec-yellow/30 pl-3">
                  <p className="text-sm text-white italic leading-relaxed">
                    {entry.what_i_learned}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Issues or questions */}
            {entry.issues_or_questions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-orange-400" />
                  <span className="text-xs font-medium text-white uppercase tracking-wider">
                    Issues / Questions
                  </span>
                </div>
                <p className="text-sm text-white leading-relaxed">{entry.issues_or_questions}</p>
              </motion.div>
            )}

            {/* Photos */}
            {entry.photos && entry.photos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.3 }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <ImageIcon className="h-3.5 w-3.5 text-white" />
                  <span className="text-xs font-medium text-white uppercase tracking-wider">
                    Photos ({entry.photos.length})
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {entry.photos.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setLightboxPhoto(url)}
                      className="aspect-square rounded-lg overflow-hidden border border-white/10 bg-white/[0.03] touch-manipulation active:opacity-80 transition-opacity"
                    >
                      <img
                        src={url}
                        alt={`Photo ${i + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* AI Evidence Analysis — only when NOT in portfolio */}
            {!entry.linked_portfolio_id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                {analysisLoading ? (
                  <div className="rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-500/[0.04] to-blue-500/[0.04] p-4">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 text-purple-400 animate-spin" />
                      <span className="text-xs text-white/70">Analysing evidence potential...</span>
                    </div>
                  </div>
                ) : entryAnalysis ? (
                  <div className="rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-500/[0.04] to-blue-500/[0.04] overflow-hidden">
                    <div className="h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500" />
                    <div className="p-4 space-y-3">
                      {/* Header + strength badge */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-purple-400" />
                          <h4 className="text-sm font-semibold text-white">AI Evidence Analysis</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                              entryAnalysis.evidenceStrength === 'strong'
                                ? 'bg-green-500/15 text-green-400 border border-green-500/25'
                                : entryAnalysis.evidenceStrength === 'moderate'
                                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/25'
                                  : 'bg-red-500/15 text-red-400 border border-red-500/25'
                            }`}
                          >
                            {entryAnalysis.evidenceStrength}
                          </span>
                          <button
                            onClick={refreshAnalysis}
                            className="h-11 w-11 flex items-center justify-center rounded-lg active:bg-white/10 touch-manipulation"
                          >
                            <RefreshCw className="h-4 w-4 text-white/50" />
                          </button>
                        </div>
                      </div>

                      {/* Why good evidence */}
                      <p className="text-xs text-white/80 leading-relaxed">
                        {entryAnalysis.whyGoodEvidence}
                      </p>

                      {/* Matched ACs with confidence bars */}
                      {entryAnalysis.matchedCriteria.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-[11px] text-white/60 uppercase tracking-wider font-medium">
                            Matched Assessment Criteria
                          </span>
                          {entryAnalysis.matchedCriteria.slice(0, 5).map((mc, idx) => (
                            <div
                              key={idx}
                              className="px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                            >
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="text-[11px] font-bold text-purple-400 truncate min-w-0">
                                  Unit {mc.unitCode} — AC {mc.acCode}
                                </span>
                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                  <span className="text-[11px] text-white/60">
                                    {mc.confidence}%
                                  </span>
                                  {evidencedACs && (
                                    evidencedACs.has(`${mc.unitCode}.${mc.acCode}`) ? (
                                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-green-500/15 text-green-400 border border-green-500/25">
                                        <CheckCircle2 className="h-2.5 w-2.5" />
                                        Evidenced
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/25">
                                        <Circle className="h-2.5 w-2.5" />
                                        Needed
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                              <p className="text-[11px] text-white/70 leading-snug mb-1.5">
                                {mc.acText}
                              </p>
                              {/* Confidence bar */}
                              <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-purple-500 transition-all"
                                  style={{ width: `${mc.confidence}%` }}
                                />
                              </div>
                              <p className="text-[11px] text-white/60 mt-1">{mc.reason}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Quality tips */}
                      {entryAnalysis.qualityTips.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[11px] text-white/60 uppercase tracking-wider font-medium">
                            Tips to Strengthen Evidence
                          </span>
                          {entryAnalysis.qualityTips.map((tip, idx) => (
                            <div key={idx} className="flex items-start gap-1.5">
                              <Lightbulb className="h-3.5 w-3.5 text-elec-yellow mt-0.5 flex-shrink-0" />
                              <p className="text-[11px] text-white/70 leading-snug">{tip}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={refreshAnalysis}
                    className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium touch-manipulation active:scale-[0.98] transition-all"
                  >
                    <Sparkles className="h-4 w-4" />
                    Analyse as Evidence
                  </button>
                )}
              </motion.div>
            )}

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.3 }}
              className="flex gap-2 pt-2"
            >
              <button
                onClick={() => onEdit(entry)}
                className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-elec-yellow/15 border border-elec-yellow/30 text-elec-yellow font-medium text-sm touch-manipulation active:scale-[0.98] transition-all"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border font-medium text-sm touch-manipulation active:scale-[0.98] transition-all ${
                  confirmDelete
                    ? 'bg-red-500 border-red-500 text-white'
                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}
              >
                <Trash2 className="h-4 w-4" />
                {confirmDelete ? 'Confirm Delete' : 'Delete'}
              </button>
            </motion.div>

            {/* Request Supervisor Verification */}
            {entry.linked_portfolio_id && (
              <button
                onClick={() => {
                  onOpenChange(false);
                  // Navigate to portfolio detail to trigger verification from there
                  toast.info('Open this evidence in your Portfolio to request verification');
                }}
                className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-400 text-sm font-medium touch-manipulation active:scale-[0.98] transition-all"
              >
                <ShieldCheck className="h-4 w-4" />
                Request Supervisor Verification
              </button>
            )}

            {/* Add to Portfolio */}
            {entry.linked_portfolio_id ? (
              <div className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                <CheckCircle2 className="h-4 w-4" />
                Added to Portfolio
              </div>
            ) : (
              <button
                onClick={handleAddToPortfolio}
                className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-elec-yellow/10 border border-elec-yellow/25 text-elec-yellow text-sm font-medium touch-manipulation active:scale-[0.98] transition-all"
              >
                <Briefcase className="h-4 w-4" />
                Add to Portfolio
              </button>
            )}

            {/* AC Picker Sheet */}
            {showPortfolioPicker && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/[0.04] to-transparent overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-elec-yellow" />
                    <h4 className="text-sm font-semibold text-white">Link Assessment Criteria</h4>
                  </div>
                  <p className="text-[11px] text-white/50 mt-0.5">
                    Auto-matched from your diary entry. Tap to select/deselect.
                  </p>
                </div>

                <div className="px-4 py-3 space-y-1.5 max-h-48 overflow-y-auto overscroll-contain">
                  {isSearchingACs ? (
                    <div className="flex items-center justify-center py-6">
                      <Loader2 className="h-5 w-5 text-elec-yellow animate-spin" />
                    </div>
                  ) : suggestedACs.length === 0 ? (
                    <p className="text-xs text-white/40 text-center py-4">
                      No matching criteria found
                    </p>
                  ) : (
                    suggestedACs.map((ac, idx) => (
                      <button
                        key={idx}
                        onClick={() => toggleAC(idx)}
                        className={`w-full flex items-start gap-2 px-3 py-2 rounded-lg text-left touch-manipulation transition-colors ${
                          ac.selected
                            ? 'bg-elec-yellow/10 border border-elec-yellow/25'
                            : 'bg-white/[0.02] border border-white/[0.06] active:bg-white/[0.05]'
                        }`}
                      >
                        {ac.selected ? (
                          <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-white/20 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-elec-yellow">
                              Unit {ac.unitCode}
                            </span>
                            {evidencedACs && (
                              evidencedACs.has(`${ac.unitCode}.${ac.acText.split(' ')[0]}`) ? (
                                <span className="inline-flex items-center gap-0.5 px-1 py-px rounded text-[8px] font-bold uppercase bg-green-500/15 text-green-400 border border-green-500/25">
                                  <CheckCircle2 className="h-2 w-2" />
                                  Evidenced
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-0.5 px-1 py-px rounded text-[8px] font-bold uppercase bg-amber-500/15 text-amber-400 border border-amber-500/25">
                                  Needed
                                </span>
                              )
                            )}
                          </div>
                          <p className="text-[11px] text-white/70 leading-snug">AC {ac.acText}</p>
                        </div>
                      </button>
                    ))
                  )}
                </div>

                <div className="px-4 py-3 border-t border-white/[0.06] flex gap-2">
                  <button
                    onClick={() => {
                      setShowPortfolioPicker(false);
                      setSuggestedACs([]);
                    }}
                    className="flex-1 h-11 rounded-xl bg-white/[0.06] text-white/60 text-sm font-medium touch-manipulation active:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => createPortfolioItem(suggestedACs)}
                    disabled={isCreatingPortfolio}
                    className="flex-1 h-11 rounded-xl bg-elec-yellow text-black text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {isCreatingPortfolio ? (
                      <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                    ) : (
                      `Add${suggestedACs.filter((a) => a.selected).length > 0 ? ` (${suggestedACs.filter((a) => a.selected).length} ACs)` : ''}`
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Related entries from same site */}
            {relatedEntries.length > 0 && (
              <div className="pt-2 border-t border-white/[0.06]">
                <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-3">
                  More from {entry.site_name}
                </h4>
                <div className="space-y-2">
                  {relatedEntries.map((re) => {
                    const reDate = new Date(re.date + 'T00:00:00').toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                    });
                    return (
                      <div
                        key={re.id}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.04]"
                      >
                        <span className="text-xs text-white flex-shrink-0">{reDate}</span>
                        <span className="text-xs text-white truncate">
                          {re.tasks_completed.slice(0, 2).join(', ') || 'No tasks logged'}
                        </span>
                        {re.mood_rating && (
                          <span className="text-sm flex-shrink-0 ml-auto">
                            {moodEmojis[re.mood_rating]}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>

      {/* Lightbox overlay */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxPhoto(null)}
        >
          <button
            onClick={() => setLightboxPhoto(null)}
            className="absolute top-4 right-4 h-11 w-11 flex items-center justify-center rounded-full bg-white/10 text-white touch-manipulation z-10"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={lightboxPhoto}
            alt="Full size photo"
            className="max-w-full max-h-[85vh] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </Sheet>
  );
}
