import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Image as ImageIcon, X, Upload, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Eyebrow } from '@/components/college/primitives';
import { CostAttachment } from '@/types/cost-estimate-inputs';
import { supabase } from '@/integrations/supabase/client';

const BUCKET = 'cost-engineer-attachments';

interface UploadingItem {
  fileName: string;
  progress: number;
}

interface AttachmentZoneProps {
  attachments: CostAttachment[];
  uploading: UploadingItem[];
  onAdd: (files: File[]) => void;
  onRemove: (attachment: CostAttachment) => void;
  disabled?: boolean;
}

const KIND_LABEL: Record<CostAttachment['kind'], string> = {
  'floor-plan': 'Floor plan',
  specification: 'Specification',
  photo: 'Photo',
  other: 'Document',
};

const fmtSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const AttachmentZone = ({
  attachments,
  uploading,
  onAdd,
  onRemove,
  disabled,
}: AttachmentZoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (disabled) return;
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) onAdd(files);
    },
    [disabled, onAdd]
  );

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) onAdd(files);
    e.target.value = '';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <Eyebrow>02 · ATTACHMENTS</Eyebrow>
        <span className="text-[11px] text-white/55 tabular-nums">
          {attachments.length} attached
        </span>
      </div>

      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        aria-label="Add attachments — drop files here or press to choose"
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'group relative bg-[hsl(0_0%_10%)] border-2 border-dashed rounded-2xl px-5 py-7 sm:py-9 text-center transition-colors touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50',
          isDragging
            ? 'border-elec-yellow bg-elec-yellow/[0.04]'
            : 'border-white/[0.10] hover:border-white/20 hover:bg-elec-yellow/[0.02]',
          disabled && 'opacity-50 pointer-events-none'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif,application/pdf"
          className="hidden"
          onChange={handleFilePick}
          disabled={disabled}
        />
        <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-xl bg-elec-yellow/10 border border-elec-yellow/30 mb-3">
          <Upload className="h-5 w-5 text-elec-yellow" />
        </div>
        <div className="text-[15px] font-semibold text-white">
          Drop floor plans, specs or photos
        </div>
        <div className="mt-1 text-[12.5px] text-white/65">
          PDF, JPEG, PNG, WebP, HEIC · up to 50 MB each · 10 max
        </div>
        <div className="mt-3 inline-flex items-center gap-2 h-9 px-3 rounded-xl bg-elec-yellow text-black text-[12.5px] font-semibold">
          Choose files
        </div>
      </div>

      {/* In-progress uploads */}
      {uploading.length > 0 && (
        <div className="space-y-2">
          {uploading.map((u) => (
            <div
              key={u.fileName}
              className="bg-[hsl(0_0%_10%)] border border-white/[0.10] rounded-xl p-3 flex items-center gap-3"
            >
              <Loader2 className="h-4 w-4 text-elec-yellow animate-spin flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-white truncate">{u.fileName}</div>
                <div className="text-[11px] text-white/55">Uploading…</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Attached files */}
      {attachments.length > 0 && (
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {attachments.map((att) => (
              <AttachmentRow key={att.id} attachment={att} onRemove={onRemove} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

// Wrapped in forwardRef so framer-motion's <AnimatePresence mode="popLayout">
// can attach the measurement ref to our DOM node. Without forwardRef React
// warns "Function components cannot be given refs" and the layout-shift
// animations skip a frame.
interface AttachmentRowProps {
  attachment: CostAttachment;
  onRemove: (a: CostAttachment) => void;
}

const AttachmentRow = forwardRef<HTMLDivElement, AttachmentRowProps>(function AttachmentRow(
  { attachment, onRemove },
  ref
) {
  const isImg = attachment.fileType.startsWith('image/');
  const [thumbUrl, setThumbUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isImg) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(attachment.storagePath, 600);
      if (!cancelled) setThumbUrl(data?.signedUrl ?? null);
    })();
    return () => {
      cancelled = true;
    };
  }, [attachment.storagePath, isImg]);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
      className="bg-[hsl(0_0%_10%)] border border-white/[0.10] rounded-xl p-3 flex items-center gap-3"
    >
      <div className="h-12 w-12 rounded-lg overflow-hidden bg-black/40 border border-white/[0.06] flex items-center justify-center flex-shrink-0">
        {isImg && thumbUrl ? (
          <img src={thumbUrl} alt={attachment.fileName} className="h-full w-full object-cover" />
        ) : isImg ? (
          <ImageIcon className="h-5 w-5 text-white/50" />
        ) : (
          <FileText className="h-5 w-5 text-white/60" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13.5px] font-medium text-white truncate">{attachment.fileName}</div>
        <div className="text-[11px] text-white/55 tabular-nums">
          {KIND_LABEL[attachment.kind]} · {fmtSize(attachment.fileSize)}
        </div>
      </div>
      <button
        type="button"
        onClick={() => onRemove(attachment)}
        aria-label={`Remove ${attachment.fileName}`}
        className="h-8 w-8 rounded-lg hover:bg-red-500/10 text-white/50 hover:text-red-400 transition-colors touch-manipulation flex items-center justify-center"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
});
