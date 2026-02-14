import { useState, useCallback, useRef, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { SafetyPhoto, useSafetyPhotos } from '@/hooks/useSafetyPhotos';
import {
  PHOTO_TYPES,
  getPhotoTypeColour,
  getPhotoTypeLabel,
  usePhotoProjects,
} from '@/hooks/usePhotoProjects';
import { format } from 'date-fns';
import { MapPin, Trash2, Share2, Pin, Calendar, AlertTriangle, X } from 'lucide-react';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';

interface Annotation {
  x: number;
  y: number;
  text: string;
}

interface PhotoDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  photo: SafetyPhoto | null;
  photos: SafetyPhoto[]; // for swipe navigation
  onNavigate?: (photo: SafetyPhoto) => void;
  onDeleted?: () => void;
}

export default function PhotoDetailSheet({
  open,
  onOpenChange,
  photo,
  photos,
  onNavigate,
  onDeleted,
}: PhotoDetailSheetProps) {
  const { updatePhoto, deletePhoto, isDeleting } = useSafetyPhotos();
  const { projects } = usePhotoProjects();

  // --- Local state ---
  const [notes, setNotes] = useState(photo?.notes || '');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isAnnotating, setIsAnnotating] = useState(false);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [pendingPin, setPendingPin] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [pinText, setPinText] = useState('');
  const [selectedPinIndex, setSelectedPinIndex] = useState<number | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedPhotoType, setSelectedPhotoType] = useState<string | null>(null);

  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const photoContainerRef = useRef<HTMLDivElement>(null);

  // --- Sync state when photo changes ---
   
  useEffect(() => {
    if (photo) {
      setNotes(photo.notes || '');
      setSelectedProjectId(photo.project_id || null);
      setSelectedPhotoType(photo.photo_type || null);
      setShowDeleteConfirm(false);
      setIsAnnotating(false);
      setPendingPin(null);
      setSelectedPinIndex(null);

      // Parse annotations from JSONB field
      const parsed: Annotation[] = [];
      if (Array.isArray(photo.annotations)) {
        photo.annotations.forEach((a) => {
          if (typeof a === 'object' && a !== null && 'x' in a && 'y' in a && 'text' in a) {
            parsed.push({
              x: a.x as number,
              y: a.y as number,
              text: a.text as string,
            });
          }
        });
      }
      setAnnotations(parsed);
    }
  }, [photo?.id]);

  // --- Auto-save notes with 2s debounce ---
   
  useEffect(() => {
    if (!photo) return;
    if (notes !== (photo.notes || '')) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        updatePhoto({ id: photo.id, updates: { notes } });
      }, 2000);
    }
    return () => clearTimeout(saveTimeoutRef.current);
  }, [notes]);

  // --- Handlers ---

  const handleShare = useCallback(async () => {
    if (!photo) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Photo - ${getPhotoTypeLabel(photo.photo_type || 'general')}`,
          text: photo.description,
          url: photo.file_url,
        });
      } catch {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(photo.file_url);
    }
  }, [photo]);

  const handleDelete = useCallback(() => {
    if (!photo) return;
    deletePhoto(photo);
    setShowDeleteConfirm(false);
    onOpenChange(false);
    onDeleted?.();
  }, [photo, deletePhoto, onOpenChange, onDeleted]);

  const handlePhotoTapForAnnotation = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (!isAnnotating || !photoContainerRef.current) return;

      const rect = photoContainerRef.current.getBoundingClientRect();
      let clientX: number;
      let clientY: number;

      if ('touches' in e) {
        clientX = e.touches[0]?.clientX ?? e.changedTouches[0]?.clientX;
        clientY = e.touches[0]?.clientY ?? e.changedTouches[0]?.clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;

      setPendingPin({ x, y });
      setPinText('');
      setSelectedPinIndex(null);
    },
    [isAnnotating]
  );

  const handleConfirmPin = useCallback(() => {
    if (!pendingPin || !pinText.trim() || !photo) return;

    const newAnnotation: Annotation = {
      x: pendingPin.x,
      y: pendingPin.y,
      text: pinText.trim(),
    };
    const updated = [...annotations, newAnnotation];
    setAnnotations(updated);
    setPendingPin(null);
    setPinText('');

    // Save to DB
    updatePhoto({
      id: photo.id,
      updates: {
        annotations: updated as unknown as Record<string, unknown>[],
      },
    });
  }, [pendingPin, pinText, photo, annotations, updatePhoto]);

  const handleCancelPin = useCallback(() => {
    setPendingPin(null);
    setPinText('');
  }, []);

  const handleProjectChange = useCallback(
    (projectId: string) => {
      if (!photo) return;
      const newProjectId = projectId === '' ? null : projectId;
      setSelectedProjectId(newProjectId);
      updatePhoto({ id: photo.id, updates: { project_id: newProjectId } });
    },
    [photo, updatePhoto]
  );

  const handlePhotoTypeChange = useCallback(
    (photoType: string) => {
      if (!photo) return;
      const newType = photoType === '' ? null : photoType;
      setSelectedPhotoType(newType);
      updatePhoto({ id: photo.id, updates: { photo_type: newType } });
    },
    [photo, updatePhoto]
  );

  // Find project name for display
  const currentProject = projects.find((p) => p.id === photo?.project_id);

  if (!photo) return null;

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="h-[90vh] p-0 rounded-t-2xl overflow-hidden bg-elec-dark border-white/10"
        >
          <div className="flex flex-col h-full">
            {/* Drag handle */}
            <div className="flex-shrink-0 pt-3 px-4">
              <div className="w-10 h-1 bg-white/20 rounded-full mx-auto" />
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto momentum-scroll-y scrollbar-hide">
              {/* Photo with annotation overlay */}
              <div className="px-4 pt-3">
                <div
                  ref={photoContainerRef}
                  className="relative rounded-xl overflow-hidden"
                  style={{ touchAction: 'pinch-zoom' }}
                  onClick={handlePhotoTapForAnnotation}
                  onTouchEnd={isAnnotating ? handlePhotoTapForAnnotation : undefined}
                >
                  <img
                    src={photo.file_url}
                    alt={photo.description}
                    className="w-full aspect-auto rounded-xl object-cover"
                    draggable={false}
                  />

                  {/* Annotation pins overlay */}
                  {annotations.map((ann, i) => (
                    <button
                      key={i}
                      className="absolute touch-manipulation"
                      style={{
                        left: `${ann.x}%`,
                        top: `${ann.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPinIndex(selectedPinIndex === i ? null : i);
                      }}
                    >
                      {/* Pulsing ring */}
                      <span className="absolute inset-0 w-6 h-6 rounded-full bg-elec-yellow/30 animate-ping" />
                      {/* Pin circle */}
                      <span className="relative block w-6 h-6 rounded-full bg-elec-yellow border-2 border-black/30 shadow-lg" />

                      {/* Tooltip when selected */}
                      {selectedPinIndex === i && (
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 bg-black/90 border border-white/10 rounded-lg px-3 py-2 min-w-[120px] max-w-[200px] z-10">
                          <p className="text-xs text-white text-center whitespace-pre-wrap">
                            {ann.text}
                          </p>
                        </div>
                      )}
                    </button>
                  ))}

                  {/* Pending pin (being placed) */}
                  {pendingPin && (
                    <div
                      className="absolute"
                      style={{
                        left: `${pendingPin.x}%`,
                        top: `${pendingPin.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <span className="absolute inset-0 w-6 h-6 rounded-full bg-elec-yellow/30 animate-ping" />
                      <span className="relative block w-6 h-6 rounded-full bg-elec-yellow border-2 border-white shadow-lg" />
                    </div>
                  )}

                  {/* Annotating mode indicator */}
                  {isAnnotating && (
                    <div className="absolute top-2 left-2 right-2 flex items-center justify-center">
                      <span className="bg-elec-yellow text-black text-xs font-semibold px-3 py-1.5 rounded-full">
                        Tap to place a pin
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Pin text input popup */}
              {pendingPin && (
                <div className="px-4 pt-3">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <label className="text-xs font-medium text-white uppercase tracking-wide">
                      Pin Label
                    </label>
                    <input
                      autoFocus
                      value={pinText}
                      onChange={(e) => setPinText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleConfirmPin()}
                      placeholder="Describe this point..."
                      className="w-full h-11 mt-1.5 bg-white/5 border border-white/10 rounded-lg px-3 text-sm text-white focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 touch-manipulation placeholder:text-white/40"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={handleCancelPin}
                        className="flex-1 h-11 rounded-xl bg-white/10 text-sm font-medium text-white touch-manipulation active:bg-white/15"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirmPin}
                        disabled={!pinText.trim()}
                        className="flex-1 h-11 rounded-xl bg-elec-yellow text-sm font-semibold text-black touch-manipulation active:bg-yellow-400 disabled:opacity-50"
                      >
                        Place Pin
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Action bar */}
              <div className="flex items-center gap-2 px-4 pt-3">
                <button
                  onClick={() => {
                    setIsAnnotating(!isAnnotating);
                    setPendingPin(null);
                    setSelectedPinIndex(null);
                  }}
                  className={`flex-1 h-11 rounded-xl text-sm font-medium flex items-center justify-center gap-2 touch-manipulation transition-all ${
                    isAnnotating
                      ? 'bg-elec-yellow text-black'
                      : 'bg-white/5 border border-white/10 text-white active:bg-white/10'
                  }`}
                >
                  <Pin className="h-4 w-4" />
                  {isAnnotating ? 'Done' : 'Annotate'}
                </button>

                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isDeleting}
                  className="h-11 w-11 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center touch-manipulation active:bg-red-500/20 disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <button
                  onClick={handleShare}
                  className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center touch-manipulation active:bg-white/10"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>

              {/* Details section */}
              <div className="px-4 pt-4">
                <div className="flex items-center gap-2 mb-2">
                  {/* Photo type badge */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-white ${getPhotoTypeColour(
                      photo.photo_type || 'general'
                    )}`}
                  >
                    {getPhotoTypeLabel(photo.photo_type || 'general')}
                  </span>
                  {/* Project name */}
                  {currentProject && (
                    <span className="text-xs text-white font-medium">{currentProject.name}</span>
                  )}
                </div>

                {/* Date + location */}
                <div className="flex items-center gap-3 text-xs text-white">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {format(new Date(photo.created_at), 'd MMM yyyy, HH:mm')}
                  </span>
                  {photo.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {photo.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Notes section */}
              <div className="px-4 pt-4">
                <label className="text-xs font-medium text-white uppercase tracking-wide">
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this photo..."
                  rows={3}
                  className="w-full mt-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 touch-manipulation resize-none placeholder:text-white/40"
                />
              </div>

              {/* Move section */}
              <div className="px-4 pt-4 pb-6 space-y-3">
                {/* Project picker (MobileSelectPicker) */}
                <div>
                  <label className="text-xs font-medium text-white uppercase tracking-wide">
                    Project
                  </label>
                  <div className="mt-1.5">
                    <MobileSelectPicker
                      value={selectedProjectId || ''}
                      onValueChange={handleProjectChange}
                      title="Select Project"
                      placeholder="No project"
                      options={[
                        { value: '', label: 'No Project' },
                        ...projects.map((p) => ({
                          value: p.id,
                          label: p.name,
                          description: p.customer_name || undefined,
                        })),
                      ]}
                      triggerClassName="bg-white/5 border-white/10"
                    />
                  </div>
                </div>

                {/* Photo type pill grid */}
                <div>
                  <label className="text-xs font-medium text-white uppercase tracking-wide">
                    Photo Type
                  </label>
                  <div className="grid grid-cols-4 gap-1.5 mt-1.5">
                    {PHOTO_TYPES.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => handlePhotoTypeChange(type.value)}
                        className={`flex flex-col items-center gap-1 p-2.5 rounded-xl transition-all touch-manipulation ${
                          selectedPhotoType === type.value
                            ? 'bg-elec-yellow/20 ring-1 ring-elec-yellow'
                            : 'bg-white/5 active:bg-white/10'
                        }`}
                      >
                        <span className={`w-2.5 h-2.5 rounded-full ${type.dotColour}`} />
                        <span className="text-[10px] text-white text-center leading-tight">
                          {type.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Safe area bottom spacer */}
            <div className="h-[env(safe-area-inset-bottom)]" />
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete confirmation bottom sheet */}
      <Sheet open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <SheetContent
          side="bottom"
          className="h-auto rounded-t-2xl p-0 bg-elec-dark border-white/10"
        >
          <div className="p-4">
            <div className="w-8 h-1 bg-white/20 rounded-full mx-auto mb-4" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Are you sure?</h3>
                <p className="text-xs text-white">This photo will be permanently deleted</p>
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
                onClick={handleDelete}
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
    </>
  );
}
