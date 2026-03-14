import { useEffect, useRef, useState } from 'react';
import { Drawer } from 'vaul';
import { X, Camera, Images, Upload, FileText, Loader2, Trash2 } from 'lucide-react';
import { Camera as CapCamera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  useProjectDocuments,
  type ProjectDocument,
  type DocType,
} from '@/hooks/useProjectDocuments';

interface ProjectDocumentSheetProps {
  isOpen: boolean;
  onClose: () => void;
  docType: DocType;
  projectId: string;
  projectName?: string;
}

// Convert a base64 data URL to a File object
function base64ToFile(base64: string, filename: string, mimeType: string): File {
  const byteString = atob(base64.replace(/^data:.+;base64,/, ''));
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
  return new File([ab], filename, { type: mimeType });
}

export function ProjectDocumentSheet({
  isOpen,
  onClose,
  docType,
  projectId,
  projectName,
}: ProjectDocumentSheetProps) {
  const {
    photos,
    drawings,
    documents,
    isLoading,
    isUploading,
    fetchDocuments,
    uploadDocument,
    deleteDocument,
  } = useProjectDocuments(projectId);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<ProjectDocument | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const items = docType === 'photo' ? photos : docType === 'drawing' ? drawings : documents;

  useEffect(() => {
    if (isOpen && projectId) fetchDocuments();
  }, [isOpen, projectId]);

  // ── Camera / gallery (Capacitor) ─────────────────────────────────────────
  async function handleCapacitorPhoto(source: CameraSource) {
    setUploadError(null);
    try {
      const photo = await CapCamera.getPhoto({
        quality: 85,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source,
      });
      if (!photo.base64String) return;
      const mimeType = `image/${photo.format || 'jpeg'}`;
      const file = base64ToFile(
        `data:${mimeType};base64,${photo.base64String}`,
        `photo-${Date.now()}.${photo.format || 'jpg'}`,
        mimeType
      );
      await uploadDocument(file, 'photo');
    } catch (err: unknown) {
      // User cancelled — no error needed
      const msg = err instanceof Error ? err.message : String(err);
      if (!msg.toLowerCase().includes('cancel') && !msg.toLowerCase().includes('denied')) {
        // Fallback to file input for web
        fileInputRef.current?.click();
      }
    }
  }

  // ── File input fallback ───────────────────────────────────────────────────
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await uploadDocument(file, docType);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed. Please try again.';
      setUploadError(msg);
      console.error(err);
    }
    // Reset so same file can be re-selected
    e.target.value = '';
  }

  // ── Delete confirm ────────────────────────────────────────────────────────
  async function handleDeleteConfirm() {
    if (!confirmDelete) return;
    await deleteDocument(confirmDelete);
    setConfirmDelete(null);
  }

  // ── Format file size ──────────────────────────────────────────────────────
  function formatSize(bytes: number | null) {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  const title = docType === 'photo' ? 'Photos' : docType === 'drawing' ? 'Drawings' : 'Documents';
  const accept =
    docType === 'photo'
      ? 'image/*'
      : '.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.rtf,.jpg,.jpeg,.png,.heic,.heif,.dwg,.dxf,.svg,.zip';

  return (
    <>
      <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-3xl bg-background max-h-[85dvh] outline-none">
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-3 border-b border-white/10 flex-shrink-0">
              <div>
                <h2 className="text-lg font-bold text-white">{title}</h2>
                {projectName && (
                  <p className="text-xs text-white mt-0.5 truncate max-w-[220px]">{projectName}</p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/10 touch-manipulation"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 pb-8">
              {/* Action buttons */}
              {docType === 'photo' ? (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={() => handleCapacitorPhoto(CameraSource.Camera)}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] touch-manipulation active:bg-white/[0.08] transition-colors disabled:opacity-50"
                  >
                    <Camera className="h-6 w-6 text-elec-yellow" />
                    <span className="text-sm font-medium text-white">Take Photo</span>
                  </button>
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={() => handleCapacitorPhoto(CameraSource.Photos)}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] touch-manipulation active:bg-white/[0.08] transition-colors disabled:opacity-50"
                  >
                    <Images className="h-6 w-6 text-elec-yellow" />
                    <span className="text-sm font-medium text-white">Gallery</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/30 touch-manipulation active:bg-elec-yellow/20 transition-colors disabled:opacity-50"
                >
                  {isUploading ? (
                    <Loader2 className="h-5 w-5 text-elec-yellow animate-spin flex-shrink-0" />
                  ) : (
                    <Upload className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                  )}
                  <span className="text-sm font-semibold text-elec-yellow">
                    {isUploading
                      ? 'Uploading...'
                      : docType === 'drawing'
                        ? 'Upload Drawing / Document'
                        : 'Upload File'}
                  </span>
                </button>
              )}

              {/* Upload progress indicator (photos) */}
              {isUploading && docType === 'photo' && (
                <div className="flex items-center justify-center gap-2 py-2">
                  <Loader2 className="h-4 w-4 text-elec-yellow animate-spin" />
                  <span className="text-sm text-white">Uploading...</span>
                </div>
              )}

              {uploadError && <p className="text-sm text-red-400 text-center">{uploadError}</p>}

              {/* List / grid */}
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                </div>
              ) : items.length === 0 ? (
                <div className="flex flex-col items-center py-8 text-center">
                  {docType === 'photo' ? (
                    <Camera className="h-8 w-8 text-white/20 mb-3" />
                  ) : (
                    <FileText className="h-8 w-8 text-white/20 mb-3" />
                  )}
                  <p className="text-sm text-white">No {title.toLowerCase()} yet.</p>
                  <p className="text-xs text-white mt-1">
                    {docType === 'photo'
                      ? 'Take a photo or upload from your gallery.'
                      : docType === 'drawing'
                        ? 'Upload drawings, PDFs or any site documents.'
                        : 'Upload works orders, specs, PDFs or any project files.'}
                  </p>
                </div>
              ) : docType === 'photo' ? (
                // Photo grid
                <div className="grid grid-cols-3 gap-1.5">
                  {items.map((photo) => (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => setLightboxUrl(photo.signedUrl || null)}
                      className="relative aspect-square rounded-xl overflow-hidden bg-white/[0.04] touch-manipulation group"
                    >
                      {photo.signedUrl && (
                        <img
                          src={photo.signedUrl}
                          alt={photo.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}
                      {/* Delete overlay */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmDelete(photo);
                        }}
                        className="absolute top-1 right-1 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity touch-manipulation"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-white" />
                      </button>
                    </button>
                  ))}
                </div>
              ) : (
                // Drawings / documents list
                <div className="space-y-2">
                  {items.map((drawing) => (
                    <div
                      key={drawing.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]"
                    >
                      <FileText
                        className={`h-5 w-5 flex-shrink-0 ${docType === 'document' ? 'text-amber-400' : 'text-purple-400'}`}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-white font-medium truncate">{drawing.name}</p>
                        {drawing.file_size != null && (
                          <p className="text-xs text-white">{formatSize(drawing.file_size)}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {drawing.signedUrl && (
                          <a
                            href={drawing.signedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-elec-yellow font-medium touch-manipulation"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Open
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => setConfirmDelete(drawing)}
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 touch-manipulation"
                        >
                          <Trash2 className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Lightbox */}
      {lightboxUrl && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxUrl(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxUrl(null)}
            className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 touch-manipulation"
          >
            <X className="h-5 w-5 text-white" />
          </button>
          <img
            src={lightboxUrl}
            alt="Full size"
            className="max-w-full max-h-full object-contain p-4"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Delete confirm dialog */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-end justify-center px-4 pb-8">
          <div className="w-full max-w-sm bg-[#1A1A1A] rounded-3xl p-5 space-y-4">
            <h3 className="text-base font-bold text-white">Delete {docType}?</h3>
            <p className="text-sm text-white truncate">
              "{confirmDelete.name}" will be permanently deleted.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                className="h-11 rounded-xl bg-white/[0.06] text-white text-sm font-medium touch-manipulation"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="h-11 rounded-xl bg-red-500/80 text-white text-sm font-semibold touch-manipulation"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
