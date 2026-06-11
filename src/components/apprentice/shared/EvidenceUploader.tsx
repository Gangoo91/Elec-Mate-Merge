import { useState, useRef, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { EvidenceImage } from '@/components/shared/EvidenceImage';
import { Camera as CapCamera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  X,
  File,
  Image,
  FileText,
  Video,
  Camera,
  Loader2,
  CheckCircle,
  AlertCircle,
  Trash2,
  Eye,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { PortfolioFile } from '@/types/portfolio';

interface EvidenceUploaderProps {
  files: PortfolioFile[];
  onFilesChange: (files: PortfolioFile[]) => void;
  entryId?: string;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  acceptedTypes?: string[];
  className?: string;
}

interface UploadingFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

const ACCEPTED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'video/mp4',
];

const MAX_FILE_SIZE_MB = 10;

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return <Image className="h-4 w-4 text-white/70" />;
  if (type.startsWith('video/')) return <Video className="h-4 w-4 text-white/70" />;
  if (type.includes('pdf')) return <FileText className="h-4 w-4 text-white/70" />;
  if (type.includes('word') || type.includes('document'))
    return <FileText className="h-4 w-4 text-white/70" />;
  return <File className="h-4 w-4 text-white/70" />;
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const EvidenceUploader = ({
  files,
  onFilesChange,
  entryId,
  maxFiles = 10,
  maxFileSize = MAX_FILE_SIZE_MB,
  acceptedTypes = ACCEPTED_TYPES,
  className = '',
}: EvidenceUploaderProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `File type ${file.type} is not supported`;
    }
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File size exceeds ${maxFileSize}MB limit`;
    }
    if (files.length >= maxFiles) {
      return `Maximum ${maxFiles} files allowed`;
    }
    return null;
  };

  const uploadFile = async (file: File): Promise<PortfolioFile | null> => {
    if (!user?.id) return null;

    const fileId = `${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/${entryId || 'temp'}/${fileId}.${fileExt}`;

    // Add to uploading state
    setUploadingFiles((prev) => [
      ...prev,
      {
        id: fileId,
        file,
        progress: 0,
        status: 'uploading',
      },
    ]);

    try {
      const { data, error } = await supabase.storage
        .from('portfolio-evidence')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage.from('portfolio-evidence').getPublicUrl(data.path);

      // Update uploading state to success
      setUploadingFiles((prev) =>
        prev.map((uf) => (uf.id === fileId ? { ...uf, progress: 100, status: 'success' } : uf))
      );

      // Remove from uploading after delay
      setTimeout(() => {
        setUploadingFiles((prev) => prev.filter((uf) => uf.id !== fileId));
      }, 1500);

      return {
        id: fileId,
        name: file.name,
        type: file.type,
        size: file.size,
        url: urlData.publicUrl,
        uploadDate: new Date().toISOString(),
      };
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadingFiles((prev) =>
        prev.map((uf) => (uf.id === fileId ? { ...uf, status: 'error', error: error.message } : uf))
      );

      toast({
        title: 'Upload failed',
        description: error.message || 'Failed to upload file',
        variant: 'destructive',
      });

      // Remove from uploading after delay
      setTimeout(() => {
        setUploadingFiles((prev) => prev.filter((uf) => uf.id !== fileId));
      }, 3000);

      return null;
    }
  };

  const handleFiles = async (fileList: FileList) => {
    const newFiles: PortfolioFile[] = [];

    for (const file of Array.from(fileList)) {
      const validationError = validateFile(file);
      if (validationError) {
        toast({
          title: 'Invalid file',
          description: validationError,
          variant: 'destructive',
        });
        continue;
      }

      const uploadedFile = await uploadFile(file);
      if (uploadedFile) {
        newFiles.push(uploadedFile);
      }
    }

    if (newFiles.length > 0) {
      onFilesChange([...files, ...newFiles]);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [files]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const handleCameraCapture = async () => {
    if (Capacitor.isNativePlatform()) {
      // Native: use Capacitor Camera plugin (gets permission properly on iOS/Android)
      try {
        const photo = await CapCamera.getPhoto({
          resultType: CameraResultType.Base64,
          source: CameraSource.Camera,
          quality: 85,
          correctOrientation: true,
        });
        const dataUrl = `data:image/jpeg;base64,${photo.base64String}`;
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], `evidence-${Date.now()}.jpg`, { type: 'image/jpeg' });
        await uploadFile(file);
      } catch (err: any) {
        const msg = err?.message || '';
        if (!msg.includes('cancelled') && !msg.includes('User cancelled')) {
          console.warn('[EvidenceUploader] Camera capture failed:', err);
          fileInputRef.current?.click();
        }
      }
      return;
    }

    // Web: open file picker with camera capture hint
    try {
      // Quick check — if camera is available, add capture hint
      await navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        stream.getTracks().forEach((t) => t.stop());
        if (fileInputRef.current) {
          fileInputRef.current.setAttribute('capture', 'environment');
          fileInputRef.current.click();
          fileInputRef.current.removeAttribute('capture');
        }
      });
    } catch {
      fileInputRef.current?.click();
    }
  };

  const handleDelete = async (fileToDelete: PortfolioFile) => {
    if (fileToDelete.url) {
      try {
        // Extract path from URL
        const match = fileToDelete.url.match(/portfolio-evidence\/(.+)$/);
        if (match) {
          await supabase.storage.from('portfolio-evidence').remove([match[1]]);
        }
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }

    onFilesChange(files.filter((f) => f.id !== fileToDelete.id));
    toast({
      title: 'File removed',
      description: `${fileToDelete.name} has been deleted`,
    });
  };

  const handlePreview = (file: PortfolioFile) => {
    if (file.url) {
      setPreviewUrl(file.url);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border border-dashed rounded-xl p-5 text-center transition-colors duration-200
          ${
            isDragging
              ? 'border-elec-yellow bg-elec-yellow/[0.04]'
              : 'border-white/15 bg-white/[0.02]'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="space-y-3">
          <p className="text-[14px] text-white/85 leading-relaxed">
            {isDragging ? 'Drop files here' : 'Drag and drop files, or browse'}
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
            >
              <File className="h-4 w-4 mr-2" />
              Browse files
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCameraCapture}
              className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
            >
              <Camera className="h-4 w-4 mr-2" />
              Take photo
            </Button>
          </div>

          <p className="text-[12px] text-white/55">
            Max {maxFileSize}MB per file. Supports images, PDFs, Word docs, and videos.
          </p>
        </div>
      </div>

      {/* Uploading Files */}
      {uploadingFiles.length > 0 && (
        <div className="space-y-2">
          {uploadingFiles.map((uf) => (
            <div
              key={uf.id}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
            >
              <div className="flex items-center gap-3">
                {uf.status === 'uploading' && (
                  <Loader2 className="h-4 w-4 text-white/55 animate-spin" />
                )}
                {uf.status === 'success' && <CheckCircle className="h-4 w-4 text-elec-yellow" />}
                {uf.status === 'error' && <AlertCircle className="h-4 w-4 text-red-300" />}

                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-white/85 truncate">{uf.file.name}</p>
                  {uf.status === 'uploading' && (
                    <Progress value={uf.progress} className="h-1 mt-1.5" />
                  )}
                  {uf.status === 'error' && (
                    <p className="text-[12px] text-red-300 mt-1">{uf.error}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Uploaded files
            </span>
            <span className="text-[12px] text-white/55 font-mono">
              {files.length}/{maxFiles}
            </span>
          </div>

          <div className="grid gap-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
              >
                <div className="flex items-center gap-3">
                  {file.type.startsWith('image/') && file.url ? (
                    <div className="w-10 h-10 rounded overflow-hidden bg-white/[0.03] shrink-0">
                      <EvidenceImage src={file.url} alt={file.name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded bg-white/[0.03] flex items-center justify-center shrink-0">
                      {getFileIcon(file.type)}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-white/85 truncate">{file.name}</p>
                    <p className="text-[12px] text-white/55">{formatFileSize(file.size)}</p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {file.url && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePreview(file)}
                        className="h-9 w-9 p-0 hover:bg-white/[0.05] touch-manipulation"
                      >
                        <Eye className="h-4 w-4 text-white/55" />
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(file)}
                      className="h-9 w-9 p-0 hover:bg-red-500/[0.08] touch-manipulation"
                    >
                      <Trash2 className="h-4 w-4 text-red-300" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setPreviewUrl(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewUrl(null)}
              className="absolute -top-10 right-0 text-white hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </Button>

            {previewUrl.match(/\.(jpg|jpeg|png|gif)(\?|$)/i) ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full max-h-[85vh] object-contain mx-auto rounded-lg"
              />
            ) : previewUrl.match(/\.pdf(\?|$)/i) ? (
              <iframe src={previewUrl} className="w-full h-[85vh] rounded-lg bg-white" />
            ) : previewUrl.match(/\.mp4(\?|$)/i) ? (
              <video
                src={previewUrl}
                controls
                className="max-w-full max-h-[85vh] mx-auto rounded-lg"
              />
            ) : (
              <div className="text-center text-white p-8">
                <p>Preview not available for this file type</p>
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-elec-yellow hover:underline mt-2 inline-block"
                >
                  Open in new tab
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EvidenceUploader;
