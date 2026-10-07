/**
 * Certificate photos on a credential (ELE-2006).
 *
 * The file lives in the PRIVATE `elec-id-documents` bucket; `document_url`
 * holds its object path. Everything here shows it through a 5-minute signed
 * URL, so a link copied out of the app stops working.
 *
 *   <CredentialPhotoView path=… />   read-only preview (worker and firm)
 *   <CredentialPhotoField value=… /> the worker's picker: take / choose /
 *                                    replace / remove (uploads on Save)
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Camera, FileText, ImagePlus, Loader2, Trash2, ExternalLink } from 'lucide-react';
import { useCredentialPhotoUrl } from '@/hooks/useCredentialStore';
import {
  isPdfPath,
  CREDENTIAL_PHOTO_MAX_BYTES,
  type PhotoDraft,
} from '@/services/credentialsService';
import { compressImageForUpload } from '@/utils/imageUploadUtils';
import { cn } from '@/lib/utils';

const openUrl = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

/** Read-only: a thumbnail (or PDF tile) that opens the full file. */
export function CredentialPhotoView({
  path,
  className,
  compact = false,
}: {
  path: string | null | undefined;
  className?: string;
  /** Just a "View photo" button, no thumbnail. */
  compact?: boolean;
}) {
  const { data: url, isLoading, isError } = useCredentialPhotoUrl(path);
  if (!path) return null;
  const pdf = isPdfPath(path);

  if (compact || pdf) {
    return (
      <button
        type="button"
        data-help="credential-photo.view"
        disabled={!url}
        onClick={() => url && openUrl(url)}
        className={cn(
          'inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 text-[13px] font-medium text-white touch-manipulation disabled:opacity-60',
          className
        )}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : pdf ? (
          <FileText className="h-4 w-4" aria-hidden />
        ) : (
          <ExternalLink className="h-4 w-4" aria-hidden />
        )}
        {isError || (!isLoading && !url)
          ? 'Photo not available'
          : pdf
            ? 'Open the certificate (PDF)'
            : 'View photo'}
      </button>
    );
  }

  return (
    <button
      type="button"
      data-help="credential-photo.view"
      disabled={!url}
      onClick={() => url && openUrl(url)}
      className={cn(
        'group relative block w-full overflow-hidden rounded-xl border border-white/[0.12] bg-white/[0.04] touch-manipulation',
        className
      )}
      aria-label="View the certificate photo"
    >
      {url ? (
        <img
          src={url}
          alt="Certificate photo"
          className="h-40 w-full object-cover sm:h-48"
          loading="lazy"
        />
      ) : (
        <div className="flex h-40 items-center justify-center text-[13px] text-white sm:h-48">
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Photo not available'}
        </div>
      )}
      {url && (
        <span className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-[12px] font-medium text-white">
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          View full size
        </span>
      )}
    </button>
  );
}

/** The worker's picker. Picking a file only stages it; the page uploads on Save. */
export function CredentialPhotoField({
  value,
  onChange,
  disabled,
}: {
  value: PhotoDraft;
  onChange: (next: PhotoDraft) => void;
  disabled?: boolean;
}) {
  const cameraRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const previewUrl = useMemo(
    () => (value.file && value.file.type.startsWith('image/') ? URL.createObjectURL(value.file) : null),
    [value.file]
  );
  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const pick = async (f: File | undefined) => {
    setError(null);
    if (!f) return;
    const isPdf = f.type === 'application/pdf' || /\.pdf$/i.test(f.name);
    const isImage = f.type.startsWith('image/') || /\.(heic|heif)$/i.test(f.name);
    if (!isPdf && !isImage) {
      setError('Use a photo or a PDF of the certificate.');
      return;
    }
    let file = f;
    if (isImage) {
      setBusy(true);
      try {
        file = await compressImageForUpload(f);
      } catch {
        file = f;
      } finally {
        setBusy(false);
      }
    }
    if (file.size > CREDENTIAL_PHOTO_MAX_BYTES) {
      setError('That file is over 10 MB. Take a photo instead, or use a smaller file.');
      return;
    }
    onChange({ ...value, file, removed: false });
  };

  const showExisting = value.existingPath && !value.file && !value.removed;
  const hasSomething = Boolean(value.file) || Boolean(showExisting);

  return (
    <div className="space-y-3" data-help="wt-credentials.photo">
      <div className="text-[13px] font-semibold text-white">Photo of the certificate or card</div>

      {value.file ? (
        previewUrl ? (
          <img
            src={previewUrl}
            alt="New certificate photo"
            className="h-40 w-full rounded-xl border border-white/[0.12] object-cover sm:h-48"
          />
        ) : (
          <div className="flex h-11 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-[13px] text-white">
            <FileText className="h-4 w-4" aria-hidden />
            {value.file.name}
          </div>
        )
      ) : showExisting ? (
        <CredentialPhotoView path={value.existingPath} />
      ) : (
        <p className="text-[12.5px] text-white leading-snug">
          Add a photo so your firm can see it without asking. Only you and the managers at firms
          you work for can open it.
        </p>
      )}

      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          void pick(e.target.files?.[0]);
          e.target.value = '';
        }}
      />
      <input
        ref={fileRef}
        type="file"
        accept="image/*,application/pdf"
        className="hidden"
        onChange={(e) => {
          void pick(e.target.files?.[0]);
          e.target.value = '';
        }}
      />

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          disabled={disabled || busy}
          onClick={() => cameraRef.current?.click()}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] text-[13px] font-medium text-white touch-manipulation disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
          {hasSomething ? 'Retake' : 'Take a photo'}
        </button>
        <button
          type="button"
          disabled={disabled || busy}
          onClick={() => fileRef.current?.click()}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] text-[13px] font-medium text-white touch-manipulation disabled:opacity-60"
        >
          <ImagePlus className="h-4 w-4" />
          {hasSomething ? 'Choose another' : 'Choose a file'}
        </button>
      </div>

      {hasSomething && (
        <button
          type="button"
          disabled={disabled || busy}
          onClick={() => onChange({ ...value, file: null, removed: Boolean(value.existingPath) })}
          className="inline-flex h-11 items-center gap-2 px-1 text-[13px] font-medium text-red-300 touch-manipulation disabled:opacity-60"
        >
          <Trash2 className="h-4 w-4" />
          {value.file && !value.existingPath ? 'Clear the photo' : 'Remove the photo'}
        </button>
      )}

      {error && <p className="text-[12.5px] text-red-300">{error}</p>}
    </div>
  );
}
