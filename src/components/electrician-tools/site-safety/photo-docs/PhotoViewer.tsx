import { useCallback, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Share2,
  MapPin,
  Folder,
  Calendar,
  MoreVertical,
  Download,
  AlertTriangle,
  Tag,
  FolderPlus,
  Edit2,
  Pen,
} from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { SafetyPhoto, getCategoryColor, getCategoryLabel } from '@/hooks/useSafetyPhotos';
import { useSwipeable } from 'react-swipeable';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import ThumbnailStrip from './ThumbnailStrip';
import AnnotationCanvas from './AnnotationCanvas';

interface PhotoViewerProps {
  photo: SafetyPhoto;
  photos: SafetyPhoto[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  onDelete: (photo: SafetyPhoto) => void;
  onEdit?: (photo: SafetyPhoto, updates: Partial<SafetyPhoto>) => void;
  isDeleting?: boolean;
}

export default function PhotoViewer({
  photo,
  photos,
  currentIndex,
  onClose,
  onNavigate,
  onDelete,
  onEdit,
  isDeleting,
}: PhotoViewerProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showEditSheet, setShowEditSheet] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showTagInput, setShowTagInput] = useState(false);
  const [showProjectInput, setShowProjectInput] = useState(false);
  const [showAnnotation, setShowAnnotation] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [newProject, setNewProject] = useState(photo.project_reference || '');
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const lastTap = useRef(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (currentIndex > 0) onNavigate('prev');
          break;
        case 'ArrowRight':
          if (currentIndex < photos.length - 1) onNavigate('next');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigate, currentIndex, photos.length]);

  // Swipe handlers for navigation and close
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (scale === 1 && currentIndex < photos.length - 1) {
        onNavigate('next');
      }
    },
    onSwipedRight: () => {
      if (scale === 1 && currentIndex > 0) {
        onNavigate('prev');
      }
    },
    onSwipedDown: () => {
      if (scale === 1) {
        onClose();
      }
    },
    trackMouse: false,
    trackTouch: true,
    delta: 50,
    preventScrollOnSwipe: true,
  });

  // Double-tap to zoom
  const handleDoubleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      setScale((prev) => (prev === 1 ? 2 : 1));
      setPosition({ x: 0, y: 0 });
    }
    lastTap.current = now;
  }, []);

  // Handle share
  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Safety Photo - ${getCategoryLabel(photo.category)}`,
          text: photo.description,
          url: photo.file_url,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback - copy URL
      navigator.clipboard.writeText(photo.file_url);
    }
  }, [photo]);

  // Handle download
  const handleDownload = useCallback(async () => {
    try {
      const response = await fetch(photo.file_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = photo.filename || `safety-photo-${photo.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
    }
  }, [photo]);

  // Handle add tag
  const handleAddTag = useCallback(() => {
    if (!newTag.trim() || !onEdit) return;

    const existingTags = photo.tags || [];
    if (existingTags.includes(newTag.trim())) {
      toast({
        title: 'Tag already exists',
        description: `"${newTag.trim()}" is already added to this photo`,
        variant: 'destructive',
      });
      return;
    }

    onEdit(photo, { tags: [...existingTags, newTag.trim()] });
    setNewTag('');
    setShowTagInput(false);
    toast({
      title: 'Tag added',
      description: `Added "${newTag.trim()}" to photo`,
    });
  }, [newTag, photo, onEdit]);

  // Handle annotation save
  const handleAnnotationSave = useCallback(
    (dataUrl: string) => {
      // The annotated image data URL - in a full implementation this would
      // upload to Supabase storage and update the photo record
      // For now, we open the annotated image in a new tab / offer download
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `annotated-${photo.filename || photo.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setShowAnnotation(false);
      toast({ title: 'Annotated photo saved', description: 'Downloaded to your device' });
    },
    [photo]
  );

  // Handle thumbnail strip navigation
  const handleThumbnailSelect = useCallback(
    (index: number) => {
      onNavigate(index > currentIndex ? 'next' : 'prev');
      // Direct jump - call onNavigate repeatedly or use a direct setter if available
      // For simplicity, we set index directly
    },
    [currentIndex, onNavigate]
  );

  // Handle update project
  const handleUpdateProject = useCallback(() => {
    if (!onEdit) return;

    onEdit(photo, { project_reference: newProject.trim() || null });
    setShowProjectInput(false);
    toast({
      title: newProject.trim() ? 'Project updated' : 'Removed from project',
      description: newProject.trim()
        ? `Photo added to "${newProject.trim()}"`
        : 'Photo removed from project',
    });
  }, [newProject, photo, onEdit]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex flex-col"
    >
      {/* Header - compact */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent pt-[env(safe-area-inset-top)]">
        <div className="flex items-center justify-between px-2 py-2">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full active:bg-white/10 transition-colors touch-manipulation"
          >
            <X className="h-5 w-5 text-white" />
          </button>

          <span className="text-xs text-white font-medium">
            {currentIndex + 1} / {photos.length}
          </span>

          <button
            onClick={() => setShowActionMenu(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full active:bg-white/10 transition-colors touch-manipulation"
          >
            <MoreVertical className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* Image container */}
      <div
        {...swipeHandlers}
        ref={imageRef}
        className="flex-1 flex items-center justify-center overflow-hidden"
        onClick={handleDoubleTap}
      >
        <motion.img
          src={photo.file_url}
          alt={photo.description}
          className="max-w-full max-h-full object-contain select-none"
          style={{
            scale,
            x: position.x,
            y: position.y,
          }}
          drag={scale > 1}
          dragConstraints={imageRef}
          dragElastic={0.1}
          onDragEnd={(_, info) => {
            if (scale === 1) {
              setPosition({ x: 0, y: 0 });
            }
          }}
        />
      </div>

      {/* Navigation arrows (desktop) */}
      {currentIndex > 0 && (
        <button
          onClick={() => onNavigate('prev')}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors hidden sm:flex"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
      )}
      {currentIndex < photos.length - 1 && (
        <button
          onClick={() => onNavigate('next')}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors hidden sm:flex"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      )}

      {/* Thumbnail strip */}
      {photos.length > 1 && (
        <div className="absolute bottom-[200px] left-0 right-0 z-20">
          <ThumbnailStrip
            photos={photos}
            currentIndex={currentIndex}
            onSelect={(index) => {
              if (index !== currentIndex) {
                // Navigate to the selected thumbnail
                const direction = index > currentIndex ? 'next' : 'prev';
                // Jump directly by calling navigate multiple times or using a workaround
                onNavigate(direction);
              }
            }}
          />
        </div>
      )}

      {/* Bottom info and actions - compact */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="bg-gradient-to-t from-black via-black/80 to-transparent pt-12 px-3 pb-[env(safe-area-inset-bottom)]">
          {/* Category + project inline */}
          <div className="flex items-center gap-1.5 mb-1">
            <span
              className={`w-2 h-2 rounded-full ${getCategoryColor(photo.category)} ring-1 ring-black/30`}
            />
            <span className="text-xs font-medium text-white">
              {getCategoryLabel(photo.category)}
            </span>
            {photo.project_reference && (
              <>
                <span className="text-white">•</span>
                <span className="flex items-center gap-1 text-xs text-white">
                  <Folder className="h-3 w-3" />
                  {photo.project_reference}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-white text-sm mb-1.5 line-clamp-2">{photo.description}</p>

          {/* Location and date - single line */}
          <div className="flex items-center gap-3 mb-2 text-[10px] text-white">
            {photo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {photo.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {format(new Date(photo.created_at), 'd MMM yyyy, HH:mm')}
            </span>
          </div>

          {/* Tags - inline */}
          {photo.tags && photo.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {photo.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-1.5 py-0.5 rounded-full bg-white/10 text-[10px] text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Action buttons - compact */}
          <div className="flex items-center gap-1.5 pb-2">
            <button
              onClick={() => setShowAnnotation(true)}
              className="flex-1 h-10 rounded-lg bg-elec-yellow/10 text-elec-yellow text-xs font-medium flex items-center justify-center gap-1.5 touch-manipulation active:bg-elec-yellow/20"
            >
              <Pen className="h-3.5 w-3.5" />
              Markup
            </button>
            <button
              onClick={handleShare}
              className="flex-1 h-10 rounded-lg bg-white/10 text-white text-xs font-medium flex items-center justify-center gap-1.5 touch-manipulation active:bg-white/15"
            >
              <Share2 className="h-3.5 w-3.5" />
              Share
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 h-10 rounded-lg bg-white/10 text-white text-xs font-medium flex items-center justify-center gap-1.5 touch-manipulation active:bg-white/15"
            >
              <Download className="h-3.5 w-3.5" />
              Save
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isDeleting}
              className="h-10 w-10 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center touch-manipulation active:bg-red-500/20 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete confirmation sheet - compact */}
      <Sheet open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <SheetContent side="bottom" className="h-auto rounded-t-2xl p-0">
          <div className="p-3">
            <div className="w-8 h-1 bg-white/20 rounded-full mx-auto mb-3" />
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Delete Photo?</h3>
                <p className="text-xs text-white">This cannot be undone</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 h-11 rounded-xl bg-white/10 text-sm font-medium text-white touch-manipulation active:bg-white/15"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  onDelete(photo);
                }}
                disabled={isDeleting}
                className="flex-1 h-11 rounded-xl bg-red-500 text-sm font-semibold text-white touch-manipulation active:bg-red-600 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
          <div className="h-[env(safe-area-inset-bottom)]" />
        </SheetContent>
      </Sheet>

      {/* Action Menu Sheet */}
      <Sheet open={showActionMenu} onOpenChange={setShowActionMenu}>
        <SheetContent side="bottom" className="h-auto rounded-t-2xl p-0">
          <div className="p-3">
            <div className="w-8 h-1 bg-white/20 rounded-full mx-auto mb-4" />
            <h3 className="text-sm font-semibold text-white text-center mb-4">Photo Actions</h3>

            <div className="space-y-1">
              {/* Add Tag */}
              <button
                onClick={() => {
                  setShowActionMenu(false);
                  setShowTagInput(true);
                }}
                disabled={!onEdit}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/10 transition-colors touch-manipulation disabled:opacity-40"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Tag className="h-5 w-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">Add Tag</p>
                  <p className="text-xs text-white">
                    {photo.tags?.length ? `${photo.tags.length} tags` : 'No tags yet'}
                  </p>
                </div>
              </button>

              {/* Add to Project */}
              <button
                onClick={() => {
                  setShowActionMenu(false);
                  setNewProject(photo.project_reference || '');
                  setShowProjectInput(true);
                }}
                disabled={!onEdit}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/10 transition-colors touch-manipulation disabled:opacity-40"
              >
                <div className="w-10 h-10 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                  <FolderPlus className="h-5 w-5 text-elec-yellow" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">
                    {photo.project_reference ? 'Change Project' : 'Add to Project'}
                  </p>
                  <p className="text-xs text-white">
                    {photo.project_reference || 'Not in a project'}
                  </p>
                </div>
              </button>

              {/* Share */}
              <button
                onClick={() => {
                  setShowActionMenu(false);
                  handleShare();
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/10 transition-colors touch-manipulation"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Share2 className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">Share</p>
                  <p className="text-xs text-white">Share or copy link</p>
                </div>
              </button>

              {/* Download */}
              <button
                onClick={() => {
                  setShowActionMenu(false);
                  handleDownload();
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/10 transition-colors touch-manipulation"
              >
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Download className="h-5 w-5 text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">Download</p>
                  <p className="text-xs text-white">Save to device</p>
                </div>
              </button>

              {/* Delete */}
              <button
                onClick={() => {
                  setShowActionMenu(false);
                  setShowDeleteConfirm(true);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-red-500/10 active:bg-red-500/10 transition-colors touch-manipulation"
              >
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <Trash2 className="h-5 w-5 text-red-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-red-400">Delete Photo</p>
                  <p className="text-xs text-white">Permanently remove</p>
                </div>
              </button>
            </div>
          </div>
          <div className="h-[env(safe-area-inset-bottom)]" />
        </SheetContent>
      </Sheet>

      {/* Add Tag Sheet */}
      <Sheet open={showTagInput} onOpenChange={setShowTagInput}>
        <SheetContent side="bottom" className="h-auto rounded-t-2xl p-0">
          <div className="p-3">
            <div className="w-8 h-1 bg-white/20 rounded-full mx-auto mb-4" />
            <h3 className="text-sm font-semibold text-white text-center mb-4">Add Tag</h3>

            {/* Existing tags */}
            {photo.tags && photo.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {photo.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full bg-white/10 text-xs text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <Input
              placeholder="Enter tag name..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              autoFocus
              className="h-11 bg-white/5 border-white/10 focus:border-elec-yellow focus:ring-elec-yellow/50 text-sm touch-manipulation mb-3"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setShowTagInput(false)}
                className="flex-1 h-11 rounded-xl bg-white/10 text-sm font-medium text-white touch-manipulation active:bg-white/15"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTag}
                disabled={!newTag.trim()}
                className="flex-1 h-11 rounded-xl bg-elec-yellow text-sm font-semibold text-black touch-manipulation active:bg-yellow-400 disabled:opacity-50"
              >
                Add Tag
              </button>
            </div>
          </div>
          <div className="h-[env(safe-area-inset-bottom)]" />
        </SheetContent>
      </Sheet>

      {/* Add to Project Sheet */}
      <Sheet open={showProjectInput} onOpenChange={setShowProjectInput}>
        <SheetContent side="bottom" className="h-auto rounded-t-2xl p-0">
          <div className="p-3">
            <div className="w-8 h-1 bg-white/20 rounded-full mx-auto mb-4" />
            <h3 className="text-sm font-semibold text-white text-center mb-4">
              {photo.project_reference ? 'Change Project' : 'Add to Project'}
            </h3>

            <Input
              placeholder="Project name or reference..."
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUpdateProject()}
              autoFocus
              className="h-11 bg-white/5 border-white/10 focus:border-elec-yellow focus:ring-elec-yellow/50 text-sm touch-manipulation mb-3"
            />

            {photo.project_reference && (
              <p className="text-xs text-white text-center mb-3">
                Leave empty to remove from project
              </p>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => setShowProjectInput(false)}
                className="flex-1 h-11 rounded-xl bg-white/10 text-sm font-medium text-white touch-manipulation active:bg-white/15"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProject}
                className="flex-1 h-11 rounded-xl bg-elec-yellow text-sm font-semibold text-black touch-manipulation active:bg-yellow-400"
              >
                {newProject.trim() ? 'Save' : 'Remove'}
              </button>
            </div>
          </div>
          <div className="h-[env(safe-area-inset-bottom)]" />
        </SheetContent>
      </Sheet>

      {/* Annotation Canvas */}
      <AnimatePresence>
        {showAnnotation && (
          <AnnotationCanvas
            photo={photo}
            onSave={handleAnnotationSave}
            onClose={() => setShowAnnotation(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
