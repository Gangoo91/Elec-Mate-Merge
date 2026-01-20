import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Upload,
  CheckCircle,
  XCircle,
  Loader2,
  Trash2,
  ChevronDown,
  ChevronUp,
  Zap,
  Camera,
  AlertCircle,
  Edit3,
  Save,
  X,
  Sparkles,
  CircuitBoard,
  Tag,
  ImageIcon,
  Settings2,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// ============================================================================
// TYPES
// ============================================================================

interface UploadState {
  file: File;
  preview: string;
  status: 'pending' | 'compressing' | 'uploading' | 'analysing' | 'complete' | 'error';
  progress: number;
  analysis?: TrainingAnalysis;
  imageId?: string;
  analysisId?: string;
  error?: string;
  isEditing?: boolean;
  editedAnalysis?: TrainingAnalysis;
  isVerified?: boolean;
  isVerifying?: boolean;
}

interface TrainingAnalysis {
  board: {
    manufacturer: string;
    model_series: string | null;
    age_category: string;
    total_ways: number;
    populated_ways: number;
    main_switch: {
      rating_amps: number;
      position: string;
    };
  };
  phase_config: {
    is_three_phase: boolean;
    layout: string;
    busbar_labels?: string[];
  };
  structure?: {
    is_split_load: boolean;
    split_point_way: number | null;
    rcd_protected_ways?: number[];
  };
  devices: {
    mcbs: number;
    rcbos: number;
    rcds: number;
    afdds: number;
    spd: { present: boolean; status: string };
    isolators?: number;
  };
  ratings?: Record<string, number>;
  curves?: Record<string, number>;
  labels: {
    has_handwritten: boolean;
    has_printed: boolean;
    has_pictograms: boolean;
    pictogram_types: string[];
    abbreviations_found: Record<string, string>;
  };
  image_quality: {
    lighting: string;
    clarity: string;
    board_visibility: string;
    angle: string;
  };
  circuits: Array<{
    position: number;
    device_type: string;
    rating_amps: number;
    curve: string;
    label_text: string | null;
    pictogram: string | null;
    phase?: string;
    confidence?: number;
  }>;
  analysis_confidence: number;
}

// Default structure if missing from API response
const getDefaultStructure = (): NonNullable<TrainingAnalysis['structure']> => ({
  is_split_load: false,
  split_point_way: null,
  rcd_protected_ways: [],
});

// Ensure analysis has all required fields
const normaliseAnalysis = (analysis: TrainingAnalysis): TrainingAnalysis => ({
  ...analysis,
  structure: analysis.structure || getDefaultStructure(),
});

// ============================================================================
// IMAGE COMPRESSION
// ============================================================================

const MAX_DIMENSION = 1920;
const TARGET_QUALITY = 0.85;

async function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', TARGET_QUALITY);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function TrainingPhotoUpload() {
  const [uploads, setUploads] = useState<UploadState[]>([]);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const updateUpload = useCallback((index: number, updates: Partial<UploadState>) => {
    setUploads(prev => prev.map((u, i) => i === index ? { ...u, ...updates } : u));
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newUploads: UploadState[] = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      status: 'pending' as const,
      progress: 0,
    }));
    setUploads(prev => [...prev, ...newUploads]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxFiles: 20,
    maxSize: 10 * 1024 * 1024,
  });

  const removeUpload = (index: number) => {
    setUploads(prev => {
      const upload = prev[index];
      if (upload?.preview) {
        URL.revokeObjectURL(upload.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const analysePhoto = async (index: number) => {
    const upload = uploads[index];
    if (!upload || upload.status === 'analysing') return;

    try {
      updateUpload(index, { status: 'compressing', progress: 10 });
      const compressedBase64 = await compressImage(upload.file);
      updateUpload(index, { status: 'uploading', progress: 30 });

      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error('Not authenticated');
      }

      updateUpload(index, { status: 'analysing', progress: 50 });

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-training-photo`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            image_base64: compressedBase64,
            save_to_db: true,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Analysis failed: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Analysis failed');
      }

      // Normalise the analysis to ensure all fields exist
      const normalisedAnalysis = normaliseAnalysis(result.analysis);

      updateUpload(index, {
        status: 'complete',
        progress: 100,
        analysis: normalisedAnalysis,
        imageId: result.image_id,
        analysisId: result.analysis_id,
      });

      toast.success(`Analysed ${upload.file.name}`, {
        description: `${normalisedAnalysis.board.manufacturer} ${normalisedAnalysis.board.total_ways}-way board`,
      });

    } catch (error) {
      console.error('Analysis error:', error);
      updateUpload(index, {
        status: 'error',
        progress: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      toast.error(`Failed to analyse ${upload.file.name}`);
    }
  };

  const analyseAll = async () => {
    setIsAnalysing(true);

    const pendingIndexes = uploads
      .map((u, i) => u.status === 'pending' ? i : -1)
      .filter(i => i >= 0);

    for (const index of pendingIndexes) {
      await analysePhoto(index);
    }

    setIsAnalysing(false);
    toast.success(`Completed analysis of ${pendingIndexes.length} photos`);
  };

  const startEditing = (index: number) => {
    const upload = uploads[index];
    if (!upload?.analysis) return;

    updateUpload(index, {
      isEditing: true,
      editedAnalysis: JSON.parse(JSON.stringify(upload.analysis)),
    });
    // Auto-expand when editing
    setExpandedId(index);
  };

  const cancelEditing = (index: number) => {
    updateUpload(index, {
      isEditing: false,
      editedAnalysis: undefined,
    });
  };

  const saveEdits = async (index: number) => {
    const upload = uploads[index];
    if (!upload?.analysisId || !upload?.editedAnalysis) return;

    try {
      const edited = upload.editedAnalysis;
      const structure = edited.structure || getDefaultStructure();

      const { error } = await supabase
        .from('board_training_analysis')
        .update({
          manufacturer: edited.board.manufacturer,
          model_series: edited.board.model_series,
          board_age_category: edited.board.age_category,
          total_ways: edited.board.total_ways,
          populated_ways: edited.board.populated_ways,
          main_switch_rating_amps: edited.board.main_switch.rating_amps,
          main_switch_position: edited.board.main_switch.position,
          is_three_phase: edited.phase_config.is_three_phase,
          phase_layout: edited.phase_config.layout,
          is_split_load: structure.is_split_load,
          split_point_position: structure.split_point_way,
          mcb_count: edited.devices.mcbs,
          rcbo_count: edited.devices.rcbos,
          rcd_count_devices: edited.devices.rcds,
          afdd_count: edited.devices.afdds,
          spd_present: edited.devices.spd.present,
          spd_status: edited.devices.spd.status,
          has_handwritten_labels: edited.labels.has_handwritten,
          has_printed_labels: edited.labels.has_printed,
          has_pictograms: edited.labels.has_pictograms,
          pictogram_types: edited.labels.pictogram_types,
          label_abbreviations: edited.labels.abbreviations_found,
          lighting_conditions: edited.image_quality.lighting,
          image_clarity: edited.image_quality.clarity,
          board_visibility: edited.image_quality.board_visibility,
          angle_quality: edited.image_quality.angle,
          circuits: edited.circuits,
          updated_at: new Date().toISOString(),
        })
        .eq('id', upload.analysisId);

      if (error) throw error;

      updateUpload(index, {
        analysis: edited,
        isEditing: false,
        editedAnalysis: undefined,
      });

      toast.success('Changes saved');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save changes');
    }
  };

  const verifyAnalysis = async (index: number) => {
    const upload = uploads[index];

    console.log('Verify clicked for index:', index);
    console.log('Upload state:', upload);
    console.log('Analysis ID:', upload?.analysisId);

    if (!upload?.analysisId) {
      toast.error('No analysis ID found');
      return;
    }

    if (!upload?.analysis) {
      toast.error('No analysis data found');
      return;
    }

    // Set verifying state
    updateUpload(index, { isVerifying: true });

    try {
      console.log('Updating board_training_analysis with ID:', upload.analysisId);

      // Mark as verified in database
      const { data, error } = await supabase
        .from('board_training_analysis')
        .update({
          human_verified: true,
          verification_notes: 'Verified via admin upload UI',
        })
        .eq('id', upload.analysisId)
        .select();

      console.log('Database update result:', { data, error });

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      // Update local state to show verified
      updateUpload(index, { isVerified: true, isVerifying: false });

      // Trigger manufacturer knowledge update
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token && upload.analysis.board.manufacturer) {
        console.log('Calling update-manufacturer-knowledge for:', upload.analysis.board.manufacturer);

        try {
          const response = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/update-manufacturer-knowledge`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`,
              },
              body: JSON.stringify({
                manufacturer: upload.analysis.board.manufacturer,
                analysis_id: upload.analysisId,
              }),
            }
          );

          const result = await response.json();
          console.log('Knowledge update result:', result);

          if (response.ok && result.success) {
            toast.success('Verified & knowledge updated', {
              description: `${result.action === 'created' ? 'Created' : 'Updated'} knowledge for ${upload.analysis.board.manufacturer}`,
            });
            return;
          }
        } catch (knowledgeError) {
          console.warn('Knowledge update failed (non-critical):', knowledgeError);
        }
      }

      toast.success('Analysis verified successfully');
    } catch (error) {
      console.error('Verification error:', error);
      updateUpload(index, { isVerifying: false });
      toast.error('Failed to verify analysis');
    }
  };

  const stats = {
    total: uploads.length,
    pending: uploads.filter(u => u.status === 'pending').length,
    complete: uploads.filter(u => u.status === 'complete').length,
    error: uploads.filter(u => u.status === 'error').length,
    verified: uploads.filter(u => u.isVerified).length,
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Camera className="h-5 w-5 text-white" />
            </div>
            Training Photo Upload
          </h1>
          <p className="text-muted-foreground mt-1">
            Upload board photos to train the AI scanner
          </p>
        </div>
        {stats.pending > 0 && (
          <Button
            onClick={analyseAll}
            disabled={isAnalysing}
            className="h-11 touch-manipulation gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
          >
            {isAnalysing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            Analyse All ({stats.pending})
          </Button>
        )}
      </div>

      {/* Info Alert */}
      <Alert className="border-amber-500/30 bg-amber-500/10">
        <AlertCircle className="h-4 w-4 text-amber-500" />
        <AlertDescription className="text-amber-200">
          Upload photos of consumer units and distribution boards. The AI will extract all visible details.
          <strong className="text-amber-100"> Review and edit the analysis</strong> to ensure accuracy before verifying.
        </AlertDescription>
      </Alert>

      {/* Stats Cards */}
      {uploads.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <Camera className="h-4 w-4 text-slate-400" />
              </div>
              <div className="text-2xl font-bold mt-1">{stats.total}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-amber-700/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-amber-400">Pending</span>
                <Loader2 className="h-4 w-4 text-amber-500" />
              </div>
              <div className="text-2xl font-bold text-amber-500 mt-1">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-700/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-400">Analysed</span>
                <Sparkles className="h-4 w-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-blue-500 mt-1">{stats.complete}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-700/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-400">Verified</span>
                <ShieldCheck className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-500 mt-1">{stats.verified}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-900/30 to-rose-900/30 border-red-700/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-400">Errors</span>
                <XCircle className="h-4 w-4 text-red-500" />
              </div>
              <div className="text-2xl font-bold text-red-500 mt-1">{stats.error}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Upload Zone */}
      <Card className="overflow-hidden border-dashed border-2 border-slate-700 bg-slate-900/30">
        <CardContent className="p-0">
          <div
            {...getRootProps()}
            className={cn(
              "p-8 sm:p-12 text-center cursor-pointer transition-all touch-manipulation",
              isDragActive
                ? "bg-amber-500/10"
                : "hover:bg-slate-800/50 active:bg-slate-800/70"
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              <div className={cn(
                "w-20 h-20 rounded-2xl flex items-center justify-center transition-colors",
                isDragActive
                  ? "bg-amber-500/20 text-amber-500"
                  : "bg-slate-800 text-slate-400"
              )}>
                <Upload className="h-10 w-10" />
              </div>
              <div>
                <p className="text-lg font-medium text-foreground">
                  {isDragActive ? "Drop photos here" : "Tap to upload board photos"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  or drag & drop (up to 20 photos, max 10MB each)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload List */}
      {uploads.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Uploaded Photos
          </h2>

          <div className="space-y-4">
            {uploads.map((upload, index) => (
              <Card
                key={index}
                className={cn(
                  "overflow-hidden transition-all",
                  upload.isVerified && "border-green-500/50 bg-green-500/5",
                  upload.status === 'complete' && !upload.isVerified && "border-blue-500/30 bg-blue-500/5",
                  upload.status === 'error' && "border-red-500/30 bg-red-500/5"
                )}
              >
                {/* Header Row */}
                <div className="flex items-start gap-4 p-4">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-slate-800">
                    <img
                      src={upload.preview}
                      alt={upload.file.name}
                      className="w-full h-full object-cover"
                    />
                    {upload.isVerified && (
                      <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <ShieldCheck className="h-4 w-4 text-white" />
                      </div>
                    )}
                    {upload.status === 'complete' && !upload.isVerified && (
                      <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    )}
                    {upload.status === 'error' && (
                      <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                        <XCircle className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-medium truncate text-foreground">{upload.file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(upload.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {upload.status === 'pending' && (
                          <Button
                            variant="outline"
                            onClick={() => analysePhoto(index)}
                            className="h-10 touch-manipulation gap-2"
                          >
                            <Sparkles className="h-4 w-4" />
                            <span className="hidden sm:inline">Analyse</span>
                          </Button>
                        )}
                        {upload.status === 'complete' && !upload.isEditing && (
                          <>
                            <Button
                              variant="outline"
                              onClick={() => startEditing(index)}
                              className="h-10 touch-manipulation gap-2"
                            >
                              <Edit3 className="h-4 w-4" />
                              <span className="hidden sm:inline">Edit</span>
                            </Button>
                            {!upload.isVerified && (
                              <Button
                                variant="outline"
                                onClick={() => verifyAnalysis(index)}
                                disabled={upload.isVerifying}
                                className="h-10 touch-manipulation gap-2 text-green-500 border-green-500/30 hover:bg-green-500/10"
                              >
                                {upload.isVerifying ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <ShieldCheck className="h-4 w-4" />
                                )}
                                <span className="hidden sm:inline">Verify</span>
                              </Button>
                            )}
                            {upload.isVerified && (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1">
                                <ShieldCheck className="h-3 w-3" />
                                Verified
                              </Badge>
                            )}
                          </>
                        )}
                        {upload.isEditing && (
                          <>
                            <Button
                              variant="outline"
                              onClick={() => cancelEditing(index)}
                              className="h-10 touch-manipulation gap-2"
                            >
                              <X className="h-4 w-4" />
                              <span className="hidden sm:inline">Cancel</span>
                            </Button>
                            <Button
                              onClick={() => saveEdits(index)}
                              className="h-10 touch-manipulation gap-2 bg-green-600 hover:bg-green-700"
                            >
                              <Save className="h-4 w-4" />
                              <span className="hidden sm:inline">Save</span>
                            </Button>
                          </>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeUpload(index)}
                          className="h-10 w-10 touch-manipulation text-muted-foreground hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Status Badges */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {upload.status === 'pending' && (
                        <Badge variant="secondary" className="bg-slate-700">Pending analysis</Badge>
                      )}
                      {['compressing', 'uploading', 'analysing'].includes(upload.status) && (
                        <div className="w-full space-y-2">
                          <Badge variant="secondary" className="gap-1.5 bg-amber-500/20 text-amber-400">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            {upload.status === 'compressing' && 'Compressing...'}
                            {upload.status === 'uploading' && 'Uploading...'}
                            {upload.status === 'analysing' && 'Analysing with AI...'}
                          </Badge>
                          <Progress value={upload.progress} className="h-1.5" />
                        </div>
                      )}
                      {upload.status === 'complete' && upload.analysis && (
                        <>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {upload.analysis.board.manufacturer}
                          </Badge>
                          <Badge variant="secondary">
                            {upload.analysis.board.total_ways} ways
                          </Badge>
                          {upload.analysis.phase_config.is_three_phase && (
                            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                              3-Phase
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-muted-foreground">
                            {Math.round(upload.analysis.analysis_confidence * 100)}% confidence
                          </Badge>
                        </>
                      )}
                      {upload.status === 'error' && (
                        <Badge variant="destructive">{upload.error || 'Analysis failed'}</Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expandable Details */}
                {upload.status === 'complete' && upload.analysis && (
                  <Collapsible
                    open={expandedId === index}
                    onOpenChange={(open) => setExpandedId(open ? index : null)}
                  >
                    <div className="px-4 pb-2">
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full h-11 touch-manipulation justify-center gap-2 text-muted-foreground hover:text-foreground"
                        >
                          {expandedId === index ? (
                            <>
                              <ChevronUp className="h-4 w-4" />
                              Hide Details
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4" />
                              View Details
                            </>
                          )}
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                      <Separator />
                      <div className="p-4">
                        <AnalysisDetails
                          analysis={upload.isEditing ? upload.editedAnalysis! : upload.analysis}
                          isEditing={upload.isEditing || false}
                          onUpdate={(updated) => updateUpload(index, { editedAnalysis: updated })}
                        />
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// ANALYSIS DETAILS SUB-COMPONENT
// ============================================================================

interface AnalysisDetailsProps {
  analysis: TrainingAnalysis;
  isEditing: boolean;
  onUpdate: (updated: TrainingAnalysis) => void;
}

function AnalysisDetails({ analysis, isEditing, onUpdate }: AnalysisDetailsProps) {
  // Ensure structure exists
  const structure = analysis.structure || getDefaultStructure();

  const updateField = (path: string, value: any) => {
    const updated = JSON.parse(JSON.stringify(analysis));
    // Ensure structure exists in updated
    if (!updated.structure) {
      updated.structure = getDefaultStructure();
    }
    const keys = path.split('.');
    let obj = updated;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) {
        obj[keys[i]] = {};
      }
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      {/* Board Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CircuitBoard className="h-4 w-4 text-amber-500" />
          <h4 className="font-semibold text-foreground">Board Information</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">Manufacturer</Label>
            {isEditing ? (
              <Input
                value={analysis.board.manufacturer}
                onChange={(e) => updateField('board.manufacturer', e.target.value)}
                className="h-11 touch-manipulation"
              />
            ) : (
              <p className="font-medium text-foreground">{analysis.board.manufacturer}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">Model/Series</Label>
            {isEditing ? (
              <Input
                value={analysis.board.model_series || ''}
                onChange={(e) => updateField('board.model_series', e.target.value || null)}
                className="h-11 touch-manipulation"
                placeholder="e.g. Design 10"
              />
            ) : (
              <p className="font-medium text-foreground">{analysis.board.model_series || 'N/A'}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">Age Category</Label>
            {isEditing ? (
              <Select value={analysis.board.age_category} onValueChange={(v) => updateField('board.age_category', v)}>
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New (0-5 years)</SelectItem>
                  <SelectItem value="recent">Recent (5-15 years)</SelectItem>
                  <SelectItem value="aged">Aged (15-30 years)</SelectItem>
                  <SelectItem value="legacy">Legacy (30+ years)</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="font-medium text-foreground capitalize">{analysis.board.age_category}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">Total Ways</Label>
            {isEditing ? (
              <Input
                type="number"
                value={analysis.board.total_ways}
                onChange={(e) => updateField('board.total_ways', parseInt(e.target.value) || 0)}
                className="h-11 touch-manipulation"
              />
            ) : (
              <p className="font-medium text-foreground">{analysis.board.total_ways}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">Populated Ways</Label>
            {isEditing ? (
              <Input
                type="number"
                value={analysis.board.populated_ways}
                onChange={(e) => updateField('board.populated_ways', parseInt(e.target.value) || 0)}
                className="h-11 touch-manipulation"
              />
            ) : (
              <p className="font-medium text-foreground">{analysis.board.populated_ways}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">Main Switch</Label>
            {isEditing ? (
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={analysis.board.main_switch.rating_amps}
                  onChange={(e) => updateField('board.main_switch.rating_amps', parseInt(e.target.value) || 0)}
                  className="h-11 touch-manipulation w-20"
                  placeholder="100"
                />
                <Select
                  value={analysis.board.main_switch.position}
                  onValueChange={(v) => updateField('board.main_switch.position', v)}
                >
                  <SelectTrigger className="h-11 touch-manipulation flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                    <SelectItem value="center">Centre</SelectItem>
                    <SelectItem value="top">Top</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <p className="font-medium text-foreground">
                {analysis.board.main_switch.rating_amps}A ({analysis.board.main_switch.position})
              </p>
            )}
          </div>
        </div>
      </div>

      <Separator />

      {/* Phase Configuration */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Settings2 className="h-4 w-4 text-purple-500" />
          <h4 className="font-semibold text-foreground">Configuration</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">Three Phase</Label>
            {isEditing ? (
              <div className="flex items-center gap-3 h-11">
                <Switch
                  checked={analysis.phase_config.is_three_phase}
                  onCheckedChange={(v) => updateField('phase_config.is_three_phase', v)}
                />
                <span className="text-sm">{analysis.phase_config.is_three_phase ? 'Yes' : 'No'}</span>
              </div>
            ) : (
              <p className="font-medium text-foreground">{analysis.phase_config.is_three_phase ? 'Yes' : 'No'}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">Phase Layout</Label>
            {isEditing ? (
              <Select value={analysis.phase_config.layout} onValueChange={(v) => updateField('phase_config.layout', v)}>
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single Phase</SelectItem>
                  <SelectItem value="3P-vertical">3P Vertical</SelectItem>
                  <SelectItem value="3P-horizontal">3P Horizontal</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="font-medium text-foreground">{analysis.phase_config.layout}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">Split Load</Label>
            {isEditing ? (
              <div className="flex items-center gap-3 h-11">
                <Switch
                  checked={structure.is_split_load}
                  onCheckedChange={(v) => updateField('structure.is_split_load', v)}
                />
                <span className="text-sm">{structure.is_split_load ? 'Yes' : 'No'}</span>
              </div>
            ) : (
              <p className="font-medium text-foreground">{structure.is_split_load ? 'Yes' : 'No'}</p>
            )}
          </div>

          {structure.is_split_load && (
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">Split Point (Way)</Label>
              {isEditing ? (
                <Input
                  type="number"
                  value={structure.split_point_way || ''}
                  onChange={(e) => updateField('structure.split_point_way', parseInt(e.target.value) || null)}
                  className="h-11 touch-manipulation"
                  placeholder="e.g. 6"
                />
              ) : (
                <p className="font-medium text-foreground">{structure.split_point_way || 'N/A'}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Devices */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-blue-500" />
          <h4 className="font-semibold text-foreground">Devices</h4>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { key: 'mcbs', label: 'MCBs' },
            { key: 'rcbos', label: 'RCBOs' },
            { key: 'rcds', label: 'RCDs' },
            { key: 'afdds', label: 'AFDDs' },
          ].map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">{label}</Label>
              {isEditing ? (
                <Input
                  type="number"
                  value={(analysis.devices as any)[key]}
                  onChange={(e) => updateField(`devices.${key}`, parseInt(e.target.value) || 0)}
                  className="h-11 touch-manipulation"
                />
              ) : (
                <p className="font-medium text-foreground">{(analysis.devices as any)[key]}</p>
              )}
            </div>
          ))}

          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">SPD Present</Label>
            {isEditing ? (
              <div className="flex items-center gap-3 h-11">
                <Switch
                  checked={analysis.devices.spd.present}
                  onCheckedChange={(v) => updateField('devices.spd.present', v)}
                />
                <span className="text-sm">{analysis.devices.spd.present ? 'Yes' : 'No'}</span>
              </div>
            ) : (
              <p className="font-medium text-foreground">{analysis.devices.spd.present ? 'Yes' : 'No'}</p>
            )}
          </div>

          {analysis.devices.spd.present && (
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">SPD Status</Label>
              {isEditing ? (
                <Select value={analysis.devices.spd.status} onValueChange={(v) => updateField('devices.spd.status', v)}>
                  <SelectTrigger className="h-11 touch-manipulation">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="green_ok">Green (OK)</SelectItem>
                    <SelectItem value="yellow_check">Yellow (Check)</SelectItem>
                    <SelectItem value="red_replace">Red (Replace)</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge className={cn(
                  "mt-1",
                  analysis.devices.spd.status === 'green_ok' && "bg-green-500/20 text-green-400 border-green-500/30",
                  analysis.devices.spd.status === 'yellow_check' && "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
                  analysis.devices.spd.status === 'red_replace' && "bg-red-500/20 text-red-400 border-red-500/30"
                )}>
                  {analysis.devices.spd.status.replace('_', ' ')}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Labels */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-green-500" />
          <h4 className="font-semibold text-foreground">Labels & Pictograms</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">Handwritten Labels</Label>
            {isEditing ? (
              <div className="flex items-center gap-3 h-11">
                <Switch
                  checked={analysis.labels.has_handwritten}
                  onCheckedChange={(v) => updateField('labels.has_handwritten', v)}
                />
                <span className="text-sm">{analysis.labels.has_handwritten ? 'Yes' : 'No'}</span>
              </div>
            ) : (
              <p className="font-medium text-foreground">{analysis.labels.has_handwritten ? 'Yes' : 'No'}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">Printed Labels</Label>
            {isEditing ? (
              <div className="flex items-center gap-3 h-11">
                <Switch
                  checked={analysis.labels.has_printed}
                  onCheckedChange={(v) => updateField('labels.has_printed', v)}
                />
                <span className="text-sm">{analysis.labels.has_printed ? 'Yes' : 'No'}</span>
              </div>
            ) : (
              <p className="font-medium text-foreground">{analysis.labels.has_printed ? 'Yes' : 'No'}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">Has Pictograms</Label>
            {isEditing ? (
              <div className="flex items-center gap-3 h-11">
                <Switch
                  checked={analysis.labels.has_pictograms}
                  onCheckedChange={(v) => updateField('labels.has_pictograms', v)}
                />
                <span className="text-sm">{analysis.labels.has_pictograms ? 'Yes' : 'No'}</span>
              </div>
            ) : (
              <p className="font-medium text-foreground">{analysis.labels.has_pictograms ? 'Yes' : 'No'}</p>
            )}
          </div>
        </div>

        {analysis.labels.pictogram_types && analysis.labels.pictogram_types.length > 0 && (
          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">Pictogram Types</Label>
            <div className="flex flex-wrap gap-2">
              {analysis.labels.pictogram_types.map((type, i) => (
                <Badge key={i} variant="secondary" className="uppercase text-xs">
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* Image Quality */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-cyan-500" />
          <h4 className="font-semibold text-foreground">Image Quality</h4>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { key: 'lighting', label: 'Lighting', options: ['excellent', 'good', 'moderate', 'poor', 'very_poor'] },
            { key: 'clarity', label: 'Clarity', options: ['sharp', 'acceptable', 'blurry', 'very_blurry'] },
            { key: 'board_visibility', label: 'Visibility', options: ['full', 'partial', 'obscured'] },
            { key: 'angle', label: 'Angle', options: ['straight_on', 'slight_angle', 'significant_angle'] },
          ].map(({ key, label, options }) => (
            <div key={key} className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">{label}</Label>
              {isEditing ? (
                <Select
                  value={(analysis.image_quality as any)[key]}
                  onValueChange={(v) => updateField(`image_quality.${key}`, v)}
                >
                  <SelectTrigger className="h-11 touch-manipulation">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map(opt => (
                      <SelectItem key={opt} value={opt} className="capitalize">
                        {opt.replace(/_/g, ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Badge className={cn(
                  ['excellent', 'good', 'sharp', 'full', 'straight_on'].includes((analysis.image_quality as any)[key])
                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                    : ['moderate', 'acceptable', 'partial', 'slight_angle'].includes((analysis.image_quality as any)[key])
                    ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                    : "bg-red-500/20 text-red-400 border-red-500/30"
                )}>
                  {((analysis.image_quality as any)[key] as string).replace(/_/g, ' ')}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Circuits */}
      <Separator />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CircuitBoard className="h-4 w-4 text-orange-500" />
            <h4 className="font-semibold text-foreground">Circuits ({analysis.circuits?.length || 0})</h4>
          </div>
          {isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newCircuit = {
                  position: (analysis.circuits?.length || 0) + 1,
                  device_type: 'MCB',
                  rating_amps: 32,
                  curve: 'B',
                  label_text: null,
                  pictogram: null,
                };
                updateField('circuits', [...(analysis.circuits || []), newCircuit]);
              }}
              className="h-9 touch-manipulation gap-1.5 text-green-500 border-green-500/30 hover:bg-green-500/10"
            >
              <Zap className="h-3.5 w-3.5" />
              Add Circuit
            </Button>
          )}
        </div>

        {isEditing ? (
          /* Editable Circuits Grid */
          <div className="space-y-3">
            {(analysis.circuits || []).map((circuit, i) => (
              <div
                key={i}
                className="flex flex-wrap items-start gap-2 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50"
              >
                {/* Position */}
                <div className="w-16">
                  <Label className="text-xs text-muted-foreground mb-1 block">Pos</Label>
                  <Input
                    type="number"
                    value={circuit.position}
                    onChange={(e) => {
                      const updated = [...analysis.circuits];
                      updated[i] = { ...updated[i], position: parseInt(e.target.value) || 0 };
                      updateField('circuits', updated);
                    }}
                    className="h-10 touch-manipulation text-center"
                  />
                </div>

                {/* Device Type */}
                <div className="w-28">
                  <Label className="text-xs text-muted-foreground mb-1 block">Type</Label>
                  <Select
                    value={circuit.device_type}
                    onValueChange={(v) => {
                      const updated = [...analysis.circuits];
                      updated[i] = { ...updated[i], device_type: v };
                      updateField('circuits', updated);
                    }}
                  >
                    <SelectTrigger className="h-10 touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MCB">MCB</SelectItem>
                      <SelectItem value="RCBO">RCBO</SelectItem>
                      <SelectItem value="RCD">RCD</SelectItem>
                      <SelectItem value="AFDD">AFDD</SelectItem>
                      <SelectItem value="Isolator">Isolator</SelectItem>
                      <SelectItem value="Spare">Spare</SelectItem>
                      <SelectItem value="Blank">Blank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Rating */}
                <div className="w-24">
                  <Label className="text-xs text-muted-foreground mb-1 block">Rating</Label>
                  <Select
                    value={String(circuit.rating_amps)}
                    onValueChange={(v) => {
                      const updated = [...analysis.circuits];
                      updated[i] = { ...updated[i], rating_amps: parseInt(v) };
                      updateField('circuits', updated);
                    }}
                  >
                    <SelectTrigger className="h-10 touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6A</SelectItem>
                      <SelectItem value="10">10A</SelectItem>
                      <SelectItem value="16">16A</SelectItem>
                      <SelectItem value="20">20A</SelectItem>
                      <SelectItem value="25">25A</SelectItem>
                      <SelectItem value="32">32A</SelectItem>
                      <SelectItem value="40">40A</SelectItem>
                      <SelectItem value="50">50A</SelectItem>
                      <SelectItem value="63">63A</SelectItem>
                      <SelectItem value="80">80A</SelectItem>
                      <SelectItem value="100">100A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Curve */}
                <div className="w-20">
                  <Label className="text-xs text-muted-foreground mb-1 block">Curve</Label>
                  <Select
                    value={circuit.curve || 'none'}
                    onValueChange={(v) => {
                      const updated = [...analysis.circuits];
                      updated[i] = { ...updated[i], curve: v === 'none' ? '' : v };
                      updateField('circuits', updated);
                    }}
                  >
                    <SelectTrigger className="h-10 touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">-</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Label Text */}
                <div className="flex-1 min-w-[140px]">
                  <Label className="text-xs text-muted-foreground mb-1 block">Label</Label>
                  <Input
                    value={circuit.label_text || ''}
                    onChange={(e) => {
                      const updated = [...analysis.circuits];
                      updated[i] = { ...updated[i], label_text: e.target.value || null };
                      updateField('circuits', updated);
                    }}
                    className="h-10 touch-manipulation"
                    placeholder="e.g. Kitchen Sockets"
                  />
                </div>

                {/* Delete Button */}
                <div className="pt-5">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const updated = analysis.circuits.filter((_, idx) => idx !== i);
                      updateField('circuits', updated);
                    }}
                    className="h-10 w-10 touch-manipulation text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {(!analysis.circuits || analysis.circuits.length === 0) && (
              <div className="text-center py-8 text-muted-foreground">
                <CircuitBoard className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No circuits detected. Tap "Add Circuit" to add manually.</p>
              </div>
            )}
          </div>
        ) : (
          /* Read-only Circuits Display */
          <>
            {analysis.circuits && analysis.circuits.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {analysis.circuits.map((circuit, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 text-sm"
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-medium">
                      {circuit.position}
                    </span>
                    <span className="font-medium">{circuit.device_type}</span>
                    <span className="text-muted-foreground">{circuit.curve}{circuit.rating_amps}A</span>
                    {circuit.label_text && (
                      <span className="truncate text-muted-foreground text-xs ml-auto" title={circuit.label_text}>
                        {circuit.label_text}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No circuits detected</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
