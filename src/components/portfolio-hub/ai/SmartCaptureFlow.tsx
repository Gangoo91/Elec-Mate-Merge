import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  Camera,
  Upload,
  FileText,
  Video,
  Mic,
  X,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Loader2,
  CheckCircle2,
  Image as ImageIcon,
  Zap,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAIEvidenceTagger, AIAnalysisResult } from '@/hooks/portfolio/useAIEvidenceTagger';
import { AITagSuggestions } from './AITagSuggestions';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { ACPickerSheet } from '@/components/apprentice/portfolio/ACPickerSheet';

type CaptureStep = 'capture' | 'details' | 'analyze' | 'review';

interface SmartCaptureFlowProps {
  onComplete?: (data: CaptureData) => void;
  onCancel?: () => void;
  initialType?: 'photo' | 'document' | 'video' | 'text';
}

interface CaptureData {
  file?: File;
  fileUrl?: string;
  title: string;
  description: string;
  type: 'image' | 'document' | 'video' | 'text';
  selectedKSBs: string[];
  selectedTags: string[];
  aiAnalysis?: AIAnalysisResult;
}

export function SmartCaptureFlow({
  onComplete,
  onCancel,
  initialType = 'photo',
}: SmartCaptureFlowProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { analyze, isAnalyzing, result: aiResult } = useAIEvidenceTagger();
  const { qualificationCode } = useStudentQualification();
  const [showACPicker, setShowACPicker] = useState(false);

  const [step, setStep] = useState<CaptureStep>('capture');
  const [captureData, setCaptureData] = useState<CaptureData>({
    title: '',
    description: '',
    type: initialType === 'photo' ? 'image' : initialType === 'document' ? 'document' : initialType === 'video' ? 'video' : 'text',
    selectedKSBs: [],
    selectedTags: [],
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    if (!user?.id) return;

    // Validate file
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Maximum file size is 10MB",
        variant: "destructive"
      });
      return;
    }

    // Determine type
    let type: 'image' | 'document' | 'video' = 'document';
    if (file.type.startsWith('image/')) type = 'image';
    else if (file.type.startsWith('video/')) type = 'video';

    // Create preview
    if (type === 'image') {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target?.result as string);
      reader.readAsDataURL(file);
    }

    // Upload to storage
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const fileId = `${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/temp/${fileId}.${fileExt}`;

      setUploadProgress(30);

      const { data, error } = await supabase.storage
        .from('portfolio-evidence')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (error) throw error;

      setUploadProgress(80);

      const { data: urlData } = supabase.storage
        .from('portfolio-evidence')
        .getPublicUrl(data.path);

      setUploadProgress(100);

      setCaptureData(prev => ({
        ...prev,
        file,
        fileUrl: urlData.publicUrl,
        type,
        title: prev.title || file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
      }));

      toast({
        title: "File uploaded",
        description: "Ready for AI analysis",
      });

      // Move to details step
      setStep('details');

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload file",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  }, [user?.id, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleAnalyze = async () => {
    if (!captureData.fileUrl) return;

    setStep('analyze');

    const result = await analyze({
      evidenceUrl: captureData.fileUrl,
      evidenceType: captureData.type,
      title: captureData.title,
      description: captureData.description,
    });

    if (result) {
      setCaptureData(prev => ({
        ...prev,
        aiAnalysis: result,
        // Auto-select high-confidence suggestions
        selectedKSBs: result.ksb_suggestions
          .filter(k => k.confidence >= 80)
          .map(k => k.code),
        selectedTags: result.tag_suggestions
          .filter(t => t.confidence >= 80)
          .map(t => t.tag),
      }));
      setStep('review');
    } else {
      // On error, still move to review but without AI suggestions
      setStep('review');
    }
  };

  const handleAcceptKSB = (ksb: { code: string }) => {
    setCaptureData(prev => ({
      ...prev,
      selectedKSBs: [...prev.selectedKSBs, ksb.code],
    }));
  };

  const handleRejectKSB = (ksb: { code: string }) => {
    setCaptureData(prev => ({
      ...prev,
      selectedKSBs: prev.selectedKSBs.filter(k => k !== ksb.code),
    }));
  };

  const handleAcceptTag = (tag: { tag: string }) => {
    setCaptureData(prev => ({
      ...prev,
      selectedTags: [...prev.selectedTags, tag.tag],
    }));
  };

  const handleRejectTag = (tag: { tag: string }) => {
    setCaptureData(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.filter(t => t !== tag.tag),
    }));
  };

  const handleAcceptAll = () => {
    if (!aiResult) return;
    setCaptureData(prev => ({
      ...prev,
      selectedKSBs: aiResult.ksb_suggestions.map(k => k.code),
      selectedTags: aiResult.tag_suggestions.map(t => t.tag),
    }));
  };

  const handleComplete = () => {
    onComplete?.(captureData);
  };

  const renderCaptureStep = () => (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 text-center transition-all",
          "border-elec-yellow/30 hover:border-elec-yellow/50 bg-muted/30"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*,application/pdf,.doc,.docx"
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          className="hidden"
        />

        {isUploading ? (
          <div className="space-y-4">
            <Loader2 className="h-12 w-12 text-elec-yellow animate-spin mx-auto" />
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Uploading...</p>
              <Progress value={uploadProgress} className="h-2 max-w-xs mx-auto" />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-full bg-elec-yellow/10 w-fit mx-auto">
              <Upload className="h-10 w-10 text-elec-yellow" />
            </div>
            <div>
              <p className="text-base font-medium text-foreground">
                Drag and drop your evidence
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                or choose how to capture
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Capture Options */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Button
          variant="outline"
          className="h-20 flex-col gap-2 border-elec-yellow/30 hover:bg-elec-yellow/10 touch-manipulation active:scale-95"
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.accept = 'image/*';
              fileInputRef.current.setAttribute('capture', 'environment');
              fileInputRef.current.click();
            }
          }}
        >
          <Camera className="h-6 w-6 text-elec-yellow" />
          <span className="text-xs">Take Photo</span>
        </Button>

        <Button
          variant="outline"
          className="h-20 flex-col gap-2 border-border hover:bg-muted touch-manipulation active:scale-95"
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.accept = 'image/*';
              fileInputRef.current.removeAttribute('capture');
              fileInputRef.current.click();
            }
          }}
        >
          <ImageIcon className="h-6 w-6 text-blue-500" />
          <span className="text-xs">Gallery</span>
        </Button>

        <Button
          variant="outline"
          className="h-20 flex-col gap-2 border-border hover:bg-muted touch-manipulation active:scale-95"
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.accept = 'application/pdf,.doc,.docx';
              fileInputRef.current.removeAttribute('capture');
              fileInputRef.current.click();
            }
          }}
        >
          <FileText className="h-6 w-6 text-red-500" />
          <span className="text-xs">Document</span>
        </Button>

        <Button
          variant="outline"
          className="h-20 flex-col gap-2 border-border hover:bg-muted touch-manipulation active:scale-95"
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.accept = 'video/*';
              fileInputRef.current.setAttribute('capture', 'environment');
              fileInputRef.current.click();
            }
          }}
        >
          <Video className="h-6 w-6 text-purple-500" />
          <span className="text-xs">Video</span>
        </Button>
      </div>
    </div>
  );

  const renderDetailsStep = () => (
    <div className="space-y-4">
      {/* Preview */}
      {previewUrl && (
        <div className="relative rounded-lg overflow-hidden bg-muted aspect-video">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-contain"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 bg-background/80 hover:bg-background"
            onClick={() => {
              setPreviewUrl(null);
              setCaptureData(prev => ({ ...prev, file: undefined, fileUrl: undefined }));
              setStep('capture');
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Details Form */}
      <div className="space-y-3">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="e.g., Consumer Unit Installation"
            value={captureData.title}
            onChange={(e) => setCaptureData(prev => ({ ...prev, title: e.target.value }))}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="description">Description (helps AI analysis)</Label>
          <Textarea
            id="description"
            placeholder="Describe what this evidence shows..."
            value={captureData.description}
            onChange={(e) => setCaptureData(prev => ({ ...prev, description: e.target.value }))}
            className="mt-1 min-h-[80px]"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 h-11 touch-manipulation active:scale-95"
          onClick={() => setStep('capture')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button
          className="flex-1 h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black touch-manipulation active:scale-95"
          onClick={handleAnalyze}
          disabled={!captureData.title}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Analyze with AI
        </Button>
      </div>
    </div>
  );

  const renderAnalyzeStep = () => (
    <div className="space-y-6 text-center py-8">
      <div className="relative mx-auto w-24 h-24">
        <div className="absolute inset-0 rounded-full bg-elec-yellow/20 animate-ping" />
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-elec-yellow/10">
          <Sparkles className="h-10 w-10 text-elec-yellow animate-pulse" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground">Analyzing Evidence</h3>
        <p className="text-sm text-muted-foreground mt-1">
          AI is identifying KSB mappings and suggesting tags...
        </p>
      </div>
      <div className="max-w-xs mx-auto">
        <Progress value={isAnalyzing ? 60 : 100} className="h-2" />
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-4">
      {/* Preview with selected badges */}
      <div className="flex items-start gap-4">
        {previewUrl && (
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground truncate">{captureData.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{captureData.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {captureData.selectedKSBs.map(ksb => (
              <Badge key={ksb} variant="outline" className="text-xs">
                {ksb}
              </Badge>
            ))}
            {captureData.selectedTags.map(tag => (
              <Badge key={tag} className="text-xs bg-elec-yellow/20 text-elec-yellow">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* AI Suggestions */}
      {aiResult && (
        <AITagSuggestions
          result={aiResult}
          onAcceptKSB={handleAcceptKSB}
          onRejectKSB={handleRejectKSB}
          onAcceptTag={handleAcceptTag}
          onRejectTag={handleRejectTag}
          onAcceptAll={handleAcceptAll}
          selectedKSBs={captureData.selectedKSBs}
          selectedTags={captureData.selectedTags}
        />
      )}

      {/* Assessment Criteria Picker */}
      {qualificationCode && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Assessment Criteria
          </p>
          <Button
            variant="outline"
            className="w-full h-11 justify-between border-border touch-manipulation active:scale-[0.98]"
            onClick={() => setShowACPicker(true)}
          >
            <span className="text-sm">
              {captureData.selectedKSBs.length > 0
                ? `${captureData.selectedKSBs.length} criteria selected`
                : 'Select assessment criteria'}
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Button>
          {captureData.selectedKSBs.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {captureData.selectedKSBs.slice(0, 5).map((ac) => (
                <Badge key={ac} variant="outline" className="text-[10px]">
                  {ac}
                </Badge>
              ))}
              {captureData.selectedKSBs.length > 5 && (
                <Badge variant="outline" className="text-[10px]">
                  +{captureData.selectedKSBs.length - 5} more
                </Badge>
              )}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Button
          variant="outline"
          className="flex-1 h-11 touch-manipulation active:scale-95"
          onClick={() => setStep('details')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button
          className="flex-1 h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black touch-manipulation active:scale-95"
          onClick={handleComplete}
        >
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Save Evidence
        </Button>
      </div>

      <ACPickerSheet
        open={showACPicker}
        onOpenChange={setShowACPicker}
        qualificationCode={qualificationCode}
        selectedACs={captureData.selectedKSBs}
        onDone={(acs) =>
          setCaptureData((prev) => ({ ...prev, selectedKSBs: acs }))
        }
      />
    </div>
  );

  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="h-4 w-4 text-elec-yellow" />
            {step === 'capture' && 'Capture Evidence'}
            {step === 'details' && 'Add Details'}
            {step === 'analyze' && 'AI Analysis'}
            {step === 'review' && 'Review & Save'}
          </CardTitle>
          {onCancel && (
            <Button variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mt-3">
          {(['capture', 'details', 'analyze', 'review'] as CaptureStep[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={cn(
                  "h-2 flex-1 rounded-full transition-colors",
                  step === s
                    ? "bg-elec-yellow"
                    : ['capture', 'details', 'analyze', 'review'].indexOf(step) > i
                    ? "bg-elec-yellow/50"
                    : "bg-muted"
                )}
              />
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {step === 'capture' && renderCaptureStep()}
        {step === 'details' && renderDetailsStep()}
        {step === 'analyze' && renderAnalyzeStep()}
        {step === 'review' && renderReviewStep()}
      </CardContent>
    </Card>
  );
}

export default SmartCaptureFlow;
