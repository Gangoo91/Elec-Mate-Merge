import { useState, useCallback, useRef } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { saveUserUploadedRAMS } from '@/utils/rams-pdf-storage';
import {
  Upload,
  FileText,
  X,
  Check,
  Loader2,
  AlertCircle,
  Calendar,
  MapPin,
  FolderOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserRAMSUploadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadComplete?: () => void;
}

export const UserRAMSUpload = ({
  open,
  onOpenChange,
  onUploadComplete,
}: UserRAMSUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Optional metadata
  const [projectName, setProjectName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const validateFile = (file: File): string | null => {
    if (file.type !== 'application/pdf') {
      return 'Only PDF files are allowed';
    }
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      return 'File size exceeds 50MB limit';
    }
    return null;
  };

  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setSelectedFile(file);
    // Auto-fill project name from filename if not set
    if (!projectName) {
      const nameFromFile = file.name.replace('.pdf', '').replace(/_/g, ' ');
      setProjectName(nameFromFile);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [projectName]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    // Simulate progress (actual upload doesn't have progress events)
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const result = await saveUserUploadedRAMS(selectedFile, {
        projectName: projectName || undefined,
        location: location || undefined,
        date: date || undefined,
      });

      clearInterval(progressInterval);

      if (result.success) {
        setUploadProgress(100);
        toast({
          title: 'Upload Complete',
          description: 'Your RAMS document has been saved to your library',
          variant: 'success',
        });
        // Reset and close
        setTimeout(() => {
          resetForm();
          onOpenChange(false);
          onUploadComplete?.();
        }, 500);
      } else {
        setError(result.error || 'Upload failed');
        setUploadProgress(0);
      }
    } catch (err) {
      clearInterval(progressInterval);
      setError('An unexpected error occurred');
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setProjectName('');
    setLocation('');
    setDate('');
    setError(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden"
      >
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="px-4 py-4 border-b border-white/[0.06]">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-lg font-semibold text-white flex items-center gap-2">
                <Upload className="h-5 w-5 text-elec-yellow" />
                Upload RAMS Document
              </SheetTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 p-0 text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
            {/* Drop Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => !selectedFile && fileInputRef.current?.click()}
              className={cn(
                'border-2 border-dashed rounded-2xl p-6 transition-all duration-200 cursor-pointer',
                'flex flex-col items-center justify-center min-h-[180px]',
                isDragging
                  ? 'border-elec-yellow bg-elec-yellow/10'
                  : selectedFile
                  ? 'border-green-500/40 bg-green-500/5'
                  : 'border-white/20 bg-white/[0.02] hover:border-white/40 hover:bg-white/[0.04]'
              )}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {selectedFile ? (
                <div className="text-center">
                  <div className="w-14 h-14 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-3">
                    <FileText className="h-7 w-7 text-green-400" />
                  </div>
                  <p className="font-medium text-white text-base mb-1">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-white">
                    {formatFileSize(selectedFile.size)}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="mt-3 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center mb-3">
                    <Upload className="h-7 w-7 text-elec-yellow" />
                  </div>
                  <p className="font-medium text-white text-base mb-1">
                    Drop your PDF here
                  </p>
                  <p className="text-sm text-white mb-3">
                    or tap to browse files
                  </p>
                  <p className="text-xs text-white">PDF only, max 50MB</p>
                </>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white">Uploading...</span>
                  <span className="text-elec-yellow font-medium">
                    {uploadProgress}%
                  </span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {/* Optional Metadata */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-white flex items-center gap-2">
                <FolderOpen className="h-4 w-4" />
                Document Details (Optional)
              </p>

              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-white mb-1.5 block">
                    Project Name
                  </Label>
                  <Input
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g., Office Rewire - 123 High Street"
                    className="h-11 text-base touch-manipulation bg-white/[0.03] border-white/10"
                    disabled={isUploading}
                  />
                </div>

                <div>
                  <Label className="text-xs text-white mb-1.5 block flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Location
                  </Label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Manchester"
                    className="h-11 text-base touch-manipulation bg-white/[0.03] border-white/10"
                    disabled={isUploading}
                  />
                </div>

                <div>
                  <Label className="text-xs text-white mb-1.5 block flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Document Date
                  </Label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-11 text-base touch-manipulation bg-white/[0.03] border-white/10"
                    disabled={isUploading}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-4 py-4 border-t border-white/[0.06] bg-background/95 backdrop-blur-sm">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isUploading}
                className="flex-1 h-12 text-base border-white/10 hover:bg-white/5"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="flex-1 h-12 text-base bg-elec-yellow text-black hover:bg-elec-yellow/90 disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : uploadProgress === 100 ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    Done
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5 mr-2" />
                    Upload RAMS
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
