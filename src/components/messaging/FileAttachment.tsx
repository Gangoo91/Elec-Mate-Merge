import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  File,
  FileText,
  Image,
  Table,
  Download,
  X,
  Loader2,
  Paperclip,
  Eye,
} from 'lucide-react';
import { formatFileSize, isImageFile, getFileIcon } from '@/services/fileUploadService';
import type { MessageAttachment } from '@/services/fileUploadService';

interface FileAttachmentProps {
  attachment: MessageAttachment;
  className?: string;
}

/**
 * Display a file attachment with preview/download
 */
export function FileAttachment({ attachment, className }: FileAttachmentProps) {
  const [imageError, setImageError] = useState(false);
  const isImage = isImageFile(attachment.file_type);
  const fileUrl = (attachment.metadata as { url?: string })?.url || '';

  const IconComponent = () => {
    const iconType = getFileIcon(attachment.file_type);
    switch (iconType) {
      case 'image': return <Image className="h-5 w-5" />;
      case 'file-text': return <FileText className="h-5 w-5" />;
      case 'table': return <Table className="h-5 w-5" />;
      default: return <File className="h-5 w-5" />;
    }
  };

  const handleDownload = () => {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    }
  };

  // Image attachment
  if (isImage && !imageError) {
    return (
      <div className={cn('relative group', className)}>
        <img
          src={fileUrl}
          alt={attachment.file_name}
          className="max-w-[300px] max-h-[200px] rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => window.open(fileUrl, '_blank')}
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Button
            variant="secondary"
            size="sm"
            className="gap-1"
            onClick={() => window.open(fileUrl, '_blank')}
          >
            <Eye className="h-4 w-4" />
            View
          </Button>
        </div>
        <span className="absolute bottom-1 right-1 text-[10px] bg-black/50 text-white px-1.5 py-0.5 rounded">
          {formatFileSize(attachment.file_size)}
        </span>
      </div>
    );
  }

  // Document/file attachment
  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border max-w-[300px]',
        'hover:bg-muted/70 transition-colors cursor-pointer group',
        className
      )}
      onClick={handleDownload}
    >
      <div className="p-2 rounded-lg bg-background border border-border text-muted-foreground group-hover:text-foreground transition-colors">
        <IconComponent />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{attachment.file_name}</p>
        <p className="text-xs text-muted-foreground">
          {formatFileSize(attachment.file_size)}
        </p>
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
}

/**
 * File upload preview before sending
 */
interface FilePreviewProps {
  file: File;
  progress?: number;
  onRemove: () => void;
  className?: string;
}

export function FilePreview({ file, progress, onRemove, className }: FilePreviewProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const isImage = isImageFile(file.type);

  // Generate preview for images
  useState(() => {
    if (isImage) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  });

  const uploading = progress !== undefined && progress < 100;

  return (
    <div className={cn('relative group', className)}>
      {isImage && preview ? (
        <div className="relative">
          <img
            src={preview}
            alt={file.name}
            className={cn(
              'w-20 h-20 rounded-lg object-cover',
              uploading && 'opacity-50'
            )}
          />
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
            </div>
          )}
        </div>
      ) : (
        <div className={cn(
          'w-20 h-20 rounded-lg bg-muted/50 border border-border flex flex-col items-center justify-center p-2',
          uploading && 'opacity-50'
        )}>
          <File className="h-6 w-6 text-muted-foreground mb-1" />
          <span className="text-[10px] text-muted-foreground truncate w-full text-center">
            {file.name.split('.').pop()?.toUpperCase()}
          </span>
        </div>
      )}

      {/* Progress bar */}
      {uploading && (
        <Progress value={progress} className="absolute bottom-1 left-1 right-1 h-1" />
      )}

      {/* Remove button */}
      {!uploading && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

/**
 * Attachment input button
 */
interface AttachmentButtonProps {
  onSelect: (files: File[]) => void;
  disabled?: boolean;
  className?: string;
}

export function AttachmentButton({ onSelect, disabled, className }: AttachmentButtonProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onSelect(files);
    }
    // Reset input
    e.target.value = '';
  };

  return (
    <label className={cn('cursor-pointer', disabled && 'cursor-not-allowed opacity-50', className)}>
      <input
        type="file"
        multiple
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.csv"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={disabled}
        className="pointer-events-none"
      >
        <Paperclip className="h-5 w-5" />
      </Button>
    </label>
  );
}

/**
 * Drop zone for file uploads
 */
interface DropZoneProps {
  isDragging: boolean;
  className?: string;
}

export function DropZone({ isDragging, className }: DropZoneProps) {
  if (!isDragging) return null;

  return (
    <div className={cn(
      'absolute inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center',
      'border-2 border-dashed border-elec-yellow rounded-lg',
      className
    )}>
      <div className="text-center">
        <Paperclip className="h-12 w-12 text-elec-yellow mx-auto mb-2" />
        <p className="text-lg font-medium">Drop files here</p>
        <p className="text-sm text-muted-foreground">Images, PDFs, and documents</p>
      </div>
    </div>
  );
}
