import { motion } from 'framer-motion';
import { Trash2, FolderPlus, Download, X, CheckSquare } from 'lucide-react';
import { SafetyPhoto } from '@/hooks/useSafetyPhotos';

interface BatchSelectBarProps {
  selectedPhotos: Set<string>;
  totalPhotos: number;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onDelete: () => void;
  onMoveToProject: () => void;
  onExport: () => void;
  isDeleting?: boolean;
}

export default function BatchSelectBar({
  selectedPhotos,
  totalPhotos,
  onSelectAll,
  onClearSelection,
  onDelete,
  onMoveToProject,
  onExport,
  isDeleting,
}: BatchSelectBarProps) {
  const count = selectedPhotos.size;
  if (count === 0) return null;

  const allSelected = count === totalPhotos;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-xl border-t border-white/10"
    >
      <div className="px-3 py-2">
        {/* Selection info */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-elec-yellow">{count}</span>
            <span className="text-xs text-white/60">selected</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={allSelected ? onClearSelection : onSelectAll}
              className="text-xs text-elec-yellow font-medium touch-manipulation px-2 py-1 rounded-lg active:bg-white/5"
            >
              {allSelected ? 'Deselect All' : 'Select All'}
            </button>
            <button
              onClick={onClearSelection}
              className="p-1.5 rounded-lg active:bg-white/10 touch-manipulation"
            >
              <X className="h-4 w-4 text-white/50" />
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onMoveToProject}
            className="flex-1 h-11 rounded-xl bg-white/10 text-white text-xs font-medium flex items-center justify-center gap-1.5 touch-manipulation active:bg-white/15 transition-colors"
          >
            <FolderPlus className="h-4 w-4" />
            Move
          </button>
          <button
            onClick={onExport}
            className="flex-1 h-11 rounded-xl bg-white/10 text-white text-xs font-medium flex items-center justify-center gap-1.5 touch-manipulation active:bg-white/15 transition-colors"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="h-11 px-4 rounded-xl bg-red-500/15 text-red-400 text-xs font-medium flex items-center justify-center gap-1.5 touch-manipulation active:bg-red-500/25 transition-colors disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </motion.div>
  );
}
