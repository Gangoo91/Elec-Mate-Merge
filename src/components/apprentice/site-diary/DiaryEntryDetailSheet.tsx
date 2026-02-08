/**
 * DiaryEntryDetailSheet
 *
 * 85vh bottom sheet showing a single diary entry's full details.
 * Includes edit/delete actions, "Add to Portfolio" stub, and related entries.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/ui/sheet';
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
} from 'lucide-react';
import type { SiteDiaryEntry } from '@/hooks/site-diary/useSiteDiaryEntries';

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
  'Regulations': 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
  'Tools & Equipment': 'bg-orange-500/15 text-orange-400 border-orange-500/25',
  'Communication': 'bg-pink-500/15 text-pink-400 border-pink-500/25',
  'Problem Solving': 'bg-green-500/15 text-green-400 border-green-500/25',
};

interface DiaryEntryDetailSheetProps {
  entry: SiteDiaryEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (entry: SiteDiaryEntry) => void;
  onDelete: (id: string) => void;
  relatedEntries: SiteDiaryEntry[];
}

export function DiaryEntryDetailSheet({
  entry,
  open,
  onOpenChange,
  onEdit,
  onDelete,
  relatedEntries,
}: DiaryEntryDetailSheetProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

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

  return (
    <Sheet open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) setConfirmDelete(false); }}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden [&>button.absolute]:hidden">
        <div className="flex flex-col h-full bg-[hsl(240,5.9%,10%)]">
          {/* Header */}
          <SheetHeader className="flex-shrink-0 relative">
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="h-1 w-10 rounded-full bg-white/20" />
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
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-sm font-medium ${moodColour(entry.mood_rating)}`}>
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
                  <span className="text-xs font-medium text-white uppercase tracking-wider">Tasks Completed</span>
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
                  <span className="text-xs font-medium text-white uppercase tracking-wider">Skills Practised</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {entry.skills_practised.map((skill) => (
                    <span
                      key={skill}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                        skillColours[skill] || 'bg-white/[0.06] text-white/50 border-white/10'
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
                  <span className="text-xs font-medium text-white uppercase tracking-wider">What I Learned</span>
                </div>
                <div className="border-l-2 border-elec-yellow/30 pl-3">
                  <p className="text-sm text-white italic leading-relaxed">{entry.what_i_learned}</p>
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
                  <span className="text-xs font-medium text-white uppercase tracking-wider">Issues / Questions</span>
                </div>
                <p className="text-sm text-white leading-relaxed">{entry.issues_or_questions}</p>
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

            {/* Add to Portfolio stub */}
            <button
              disabled
              className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/25 text-sm touch-manipulation"
            >
              <Briefcase className="h-4 w-4" />
              Add to Portfolio (coming soon)
            </button>

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
                          <span className="text-sm flex-shrink-0 ml-auto">{moodEmojis[re.mood_rating]}</span>
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
    </Sheet>
  );
}
