import { useState, useRef, useCallback } from 'react';
import { Upload, File, X, AlertCircle } from 'lucide-react';
import { Button } from './button';
import { Card } from './card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  uploadedAt: string;
}

interface FileUploadProps {
  onFileUpload: (files: UploadedFile[]) => void;
  accept?: string;
  maxSize?: number; // in MB
  maxFiles?: number;
  bucket?: string;
  folder?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
}

const FileUpload = ({
  onFileUpload,
  accept = "*/*",
  maxSize = 10,
  maxFiles = 5,
  bucket = "evidence-files",
  folder = "portfolio",
  multiple = true,
  disabled = false,
  className = ""
}: FileUploadProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }

    // Check file type if accept is specified and not wildcard
    if (accept !== "*/*" && !accept.includes(file.type)) {
      return `File type ${file.type} is not supported`;
    }

    return null;
  };

  const uploadFileToSupabase = async (file: File): Promise<UploadedFile> => {
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      id: data.path,
      name: file.name,
      size: file.size,
      type: file.type,
      url: publicUrl,
      uploadedAt: new Date().toISOString()
    };
  };

  const handleFiles = async (files: FileList) => {
    if (disabled) return;

    const fileArray = Array.from(files);
    
    // Check max files limit
    if (uploadedFiles.length + fileArray.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `Maximum ${maxFiles} files allowed`,
        variant: "destructive"
      });
      return;
    }

    // Validate each file
    const validationErrors: string[] = [];
    const validFiles: File[] = [];

    fileArray.forEach((file, index) => {
      const error = validateFile(file);
      if (error) {
        validationErrors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (validationErrors.length > 0) {
      toast({
        title: "File validation failed",
        description: validationErrors.join(', '),
        variant: "destructive"
      });
    }

    if (validFiles.length === 0) return;

    setIsUploading(true);

    try {
      const uploadPromises = validFiles.map(file => uploadFileToSupabase(file));
      const uploadedFileResults = await Promise.all(uploadPromises);
      
      const newUploadedFiles = [...uploadedFiles, ...uploadedFileResults];
      setUploadedFiles(newUploadedFiles);
      onFileUpload(newUploadedFiles);

      toast({
        title: "Upload successful",
        description: `${uploadedFileResults.length} file(s) uploaded successfully`,
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An error occurred during upload",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = async (fileId: string) => {
    try {
      // Remove from Supabase storage
      const { error } = await supabase.storage
        .from(bucket)
        .remove([fileId]);

      if (error) {
        console.error('Error removing file from storage:', error);
      }

      // Remove from local state
      const newFiles = uploadedFiles.filter(file => file.id !== fileId);
      setUploadedFiles(newFiles);
      onFileUpload(newFiles);

      toast({
        title: "File removed",
        description: "File has been removed successfully",
      });
    } catch (error) {
      console.error('Remove file error:', error);
      toast({
        title: "Remove failed",
        description: "Failed to remove file",
        variant: "destructive"
      });
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [uploadedFiles, disabled]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={className}>
      {/* Upload Area */}
      <Card
        className={`
          border-2 border-dashed p-6 text-center transition-colors cursor-pointer
          ${dragActive ? 'border-elec-yellow bg-elec-yellow/10' : 'border-border hover:border-elec-yellow'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
          disabled={disabled}
        />
        
        <div className="space-y-4">
          <Upload className={`h-12 w-12 mx-auto ${isUploading ? 'animate-pulse' : ''} text-muted-foreground`} />
          <div>
            <p className="text-lg font-medium">
              {isUploading ? 'Uploading files...' : 'Drop files here or click to browse'}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Max {maxFiles} files, {maxSize}MB each
            </p>
            {accept !== "*/*" && (
              <p className="text-xs text-muted-foreground mt-1">
                Accepted types: {accept}
              </p>
            )}
          </div>
          
          {!disabled && (
            <Button variant="outline" type="button" disabled={isUploading}>
              <Upload className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
          )}
        </div>
      </Card>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium">Uploaded Files ({uploadedFiles.length})</h4>
          {uploadedFiles.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <File className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(file.id)}
                className="text-destructive hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-elec-yellow" />
            <span className="text-sm">Uploading files...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;