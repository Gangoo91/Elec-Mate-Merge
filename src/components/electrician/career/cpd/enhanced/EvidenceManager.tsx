import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Upload, 
  Camera, 
  FileText, 
  Image, 
  Award, 
  Video,
  Mic,
  MapPin,
  Eye,
  Download,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useEnhancedCPD } from '@/hooks/cpd/useEnhancedCPD';
import { EvidenceFile, EvidenceType } from '@/types/cpd-enhanced';

interface EvidenceManagerProps {
  entryId: string;
  evidenceFiles: EvidenceFile[];
  onEvidenceUpdate?: () => void;
}

const EvidenceManager = ({ entryId, evidenceFiles, onEvidenceUpdate }: EvidenceManagerProps) => {
  const [uploading, setUploading] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceFile | null>(null);
  const [captureMode, setCaptureMode] = useState<'file' | 'camera' | 'voice' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadEvidence } = useEnhancedCPD();

  const evidenceTypes: Array<{ type: EvidenceType; label: string; icon: React.ReactNode; color: string }> = [
    { type: 'certificate', label: 'Certificate', icon: <Award className="h-4 w-4" />, color: 'bg-green-500/10 text-green-400' },
    { type: 'attendance-record', label: 'Attendance Record', icon: <FileText className="h-4 w-4" />, color: 'bg-blue-500/10 text-blue-400' },
    { type: 'site-photo', label: 'Site Photo', icon: <Camera className="h-4 w-4" />, color: 'bg-purple-500/10 text-purple-400' },
    { type: 'reflection-notes', label: 'Reflection Notes', icon: <FileText className="h-4 w-4" />, color: 'bg-yellow-500/10 text-yellow-400' },
    { type: 'assessment-results', label: 'Assessment Results', icon: <Award className="h-4 w-4" />, color: 'bg-green-500/10 text-green-400' },
    { type: 'toolbox-talk', label: 'Toolbox Talk', icon: <Mic className="h-4 w-4" />, color: 'bg-orange-500/10 text-orange-400' },
    { type: 'technical-document', label: 'Technical Document', icon: <FileText className="h-4 w-4" />, color: 'bg-indigo-500/10 text-indigo-400' },
    { type: 'video-recording', label: 'Video Recording', icon: <Video className="h-4 w-4" />, color: 'bg-red-500/10 text-red-400' }
  ];

  const handleFileUpload = async (files: FileList | null, type: EvidenceType) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        await uploadEvidence(entryId, file, type);
      }
      onEvidenceUpdate?.();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleCameraCapture = async () => {
    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use rear camera on mobile
      });
      
      // Create video element for preview
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
      
      // This would typically open a camera interface
      // For now, we'll simulate the capture
      alert('Camera interface would open here. In a real implementation, this would capture photos with metadata including GPS location.');
      
      // Clean up stream
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Camera access failed:', error);
      alert('Camera access not available. Please use file upload instead.');
    }
  };

  const handleVoiceNote = async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // This would typically start recording
      alert('Voice recording interface would start here. In a real implementation, this would record voice notes and convert them to text.');
      
      // Clean up stream
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Microphone access failed:', error);
      alert('Microphone access not available.');
    }
  };

  const getEvidenceIcon = (type: EvidenceType) => {
    const evidenceType = evidenceTypes.find(t => t.type === type);
    return evidenceType?.icon || <FileText className="h-4 w-4" />;
  };

  const getEvidenceColor = (type: EvidenceType) => {
    const evidenceType = evidenceTypes.find(t => t.type === type);
    return evidenceType?.color || 'bg-gray-500/10 text-gray-400';
  };

  const completionPercentage = Math.min((evidenceFiles.length / 3) * 100, 100);

  return (
    <div className="space-y-4">
      {/* Evidence Progress */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-foreground">Evidence Collection Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Files uploaded</span>
              <span className="text-foreground">{evidenceFiles.length}/3 recommended</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Upload Options */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-foreground">Add Evidence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex flex-col gap-1 h-auto p-3"
            >
              <Upload className="h-4 w-4" />
              <span className="text-xs">Upload File</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleCameraCapture}
              disabled={uploading}
              className="flex flex-col gap-1 h-auto p-3"
            >
              <Camera className="h-4 w-4" />
              <span className="text-xs">Take Photo</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleVoiceNote}
              disabled={uploading}
              className="flex flex-col gap-1 h-auto p-3"
            >
              <Mic className="h-4 w-4" />
              <span className="text-xs">Voice Note</span>
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={uploading}
                  className="flex flex-col gap-1 h-auto p-3"
                >
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs">Site Log</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Site Learning Log</DialogTitle>
                </DialogHeader>
                <SiteLogForm entryId={entryId} onComplete={onEvidenceUpdate} />
              </DialogContent>
            </Dialog>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.txt"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files, 'technical-document')}
          />

          {uploading && (
            <Alert className="mt-3">
              <Clock className="h-4 w-4" />
              <AlertDescription>
                Uploading and processing files... OCR analysis in progress.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Evidence Files List */}
      {evidenceFiles.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-foreground">Uploaded Evidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {evidenceFiles.map((file) => (
                <div key={file.id} className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                  <div className={`p-2 rounded ${getEvidenceColor(file.type)}`}>
                    {getEvidenceIcon(file.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {file.fileName}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {file.type.replace('-', ' ')}
                      </Badge>
                      <span>•</span>
                      <span>{new Date(file.uploadDate).toLocaleDateString()}</span>
                      {file.verified ? (
                        <CheckCircle className="h-3 w-3 text-green-400" />
                      ) : (
                        <AlertCircle className="h-3 w-3 text-yellow-400" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedEvidence(file)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // Download file
                        const link = document.createElement('a');
                        link.href = file.fileUrl;
                        link.download = file.fileName;
                        link.click();
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Evidence Detail Dialog */}
      {selectedEvidence && (
        <Dialog open={!!selectedEvidence} onOpenChange={() => setSelectedEvidence(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedEvidence.fileName}</DialogTitle>
            </DialogHeader>
            <EvidenceDetail evidence={selectedEvidence} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

// Site Log Form Component
const SiteLogForm = ({ entryId, onComplete }: { entryId: string; onComplete?: () => void }) => {
  const [location, setLocation] = useState('');
  const [activity, setActivity] = useState('');
  const [observations, setObservations] = useState('');
  const [skillsGained, setSkillsGained] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a site log entry
    const logData = {
      location,
      activity,
      observations,
      skillsGained,
      timestamp: new Date().toISOString(),
      coordinates: await getCurrentLocation()
    };

    // In a real implementation, this would create a structured site log
    console.log('Site log created:', logData);
    
    onComplete?.();
  };

  const getCurrentLocation = (): Promise<{ lat: number; lng: number } | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => resolve(null)
      );
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Site address or description"
          className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md text-foreground"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Activity</label>
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="What did you do or observe?"
          className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md text-foreground"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Key Observations</label>
        <textarea
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          placeholder="What did you learn or notice?"
          className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md text-foreground h-20"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Skills Gained</label>
        <input
          type="text"
          value={skillsGained}
          onChange={(e) => setSkillsGained(e.target.value)}
          placeholder="New skills or knowledge acquired"
          className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md text-foreground"
        />
      </div>

      <Button type="submit" className="w-full">
        Create Site Log
      </Button>
    </form>
  );
};

// Evidence Detail Component
const EvidenceDetail = ({ evidence }: { evidence: EvidenceFile }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">Type:</span>
          <p className="font-medium text-foreground">{evidence.type.replace('-', ' ')}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Upload Date:</span>
          <p className="font-medium text-foreground">{new Date(evidence.uploadDate).toLocaleDateString()}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Verification:</span>
          <div className="flex items-center gap-2">
            {evidence.verified ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-green-400">Verified</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-yellow-400" />
                <span className="text-yellow-400">Pending</span>
              </>
            )}
          </div>
        </div>
      </div>

      {evidence.extractedData && Object.keys(evidence.extractedData).length > 0 && (
        <div>
          <h4 className="font-medium text-foreground mb-2">Extracted Information</h4>
          <div className="bg-muted/20 p-3 rounded-lg space-y-2">
            {Object.entries(evidence.extractedData).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                <span className="text-foreground">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          onClick={() => {
            const link = document.createElement('a');
            link.href = evidence.fileUrl;
            link.download = evidence.fileName;
            link.click();
          }}
          className="flex-1"
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default EvidenceManager;