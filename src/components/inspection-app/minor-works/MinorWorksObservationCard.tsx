import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { AlertTriangle, Info, Minus, Search, Trash2, FolderPlus, Loader2, Check } from 'lucide-react';
import { useInspectionPhotos } from '@/hooks/useInspectionPhotos';
import { useSafetyPhotoUpload } from '@/hooks/useSafetyPhotoUpload';
import { useCertificatePhoto, generateProjectRef, mapDefectCodeToCategory } from '@/contexts/CertificatePhotoContext';
import { toast } from '@/hooks/use-toast';
import InspectionPhotoUpload from '@/components/inspection/InspectionPhotoUpload';
import InspectionPhotoGallery from '@/components/inspection/InspectionPhotoGallery';

export interface MinorWorksObservation {
  id: string;
  defectCode: 'C1' | 'C2' | 'C3' | 'FI' | 'N/A';
  description: string;
  recommendation: string;
}

interface MinorWorksObservationCardProps {
  observation: MinorWorksObservation;
  reportId: string;
  index: number;
  onUpdate: (id: string, field: keyof MinorWorksObservation, value: any) => void;
  onRemove: (id: string) => void;
}

const commonObservations = {
  'C1': [
    'No defects found requiring immediate attention',
    'Live parts exposed',
    'Missing earth connection',
    'Inadequate protection against electric shock',
    'Damaged protective conductor'
  ],
  'C2': [
    'No defects requiring urgent attention',
    'Loose connections observed',
    'Missing RCD protection',
    'Inadequate earthing arrangements',
    'Overloaded circuit'
  ],
  'C3': [
    'No improvements recommended',
    'Cable support could be improved',
    'Additional socket outlets recommended',
    'Consider upgrading consumer unit',
    'Improve cable management'
  ],
  'FI': [
    'No further investigation required',
    'Zs values require further investigation',
    'Bonding arrangements need verification',
    'Circuit loading requires assessment',
    'Installation age warrants further inspection'
  ],
  'N/A': [
    'Not applicable to this installation',
    'No observations for this category'
  ]
};

const getSeverityIcon = (code: string) => {
  switch (code) {
    case 'C1': return <AlertTriangle className="h-4 w-4 text-red-500" />;
    case 'C2': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    case 'C3': return <Info className="h-4 w-4 text-blue-500" />;
    case 'FI': return <Search className="h-4 w-4 text-purple-500" />;
    case 'N/A': return <Minus className="h-4 w-4 text-white/60" />;
    default: return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
  }
};

const getBorderColor = (code: string) => {
  switch (code) {
    case 'C1': return 'border-l-red-500';
    case 'C2': return 'border-l-orange-500';
    case 'C3': return 'border-l-blue-500';
    case 'FI': return 'border-l-purple-500';
    case 'N/A': return 'border-l-white/60';
    default: return 'border-l-yellow-500';
  }
};

const getDefectDescription = (code: string) => {
  switch (code) {
    case 'C1': return 'Danger Present - Immediate action required';
    case 'C2': return 'Potentially Dangerous - Urgent action required';
    case 'C3': return 'Improvement Recommended';
    case 'FI': return 'Further Investigation Required';
    case 'N/A': return 'Not Applicable';
    default: return '';
  }
};

const MinorWorksObservationCard: React.FC<MinorWorksObservationCardProps> = ({
  observation,
  reportId,
  index,
  onUpdate,
  onRemove
}) => {
  const [isSendingToPhotoDocs, setIsSendingToPhotoDocs] = useState(false);
  const [sentToPhotoDocs, setSentToPhotoDocs] = useState(false);

  // Get certificate context for project reference generation
  const certificateContext = useCertificatePhoto();
  const { copyFromInspection } = useSafetyPhotoUpload();

  // Initialize photo management
  const {
    photos,
    isUploading,
    isScanning,
    uploadPhoto,
    deletePhoto,
    scanPhotoWithAI,
  } = useInspectionPhotos({
    reportId: reportId || '',
    reportType: 'minor-works',
    itemId: observation.id,
    observationId: observation.id,
    observationContext: {
      classification: observation.defectCode,
      itemLocation: 'Minor Works',
      description: observation.description || 'No description provided',
      recommendation: observation.recommendation,
    },
  });

  // Handler for sending photos to Photo Docs
  const handleSendToPhotoDocs = async () => {
    if (photos.length === 0) return;

    setIsSendingToPhotoDocs(true);

    try {
      // Generate project reference from certificate context or fallback
      const projectRef = generateProjectRef({
        certificateNumber: certificateContext?.certificateNumber || reportId,
        clientName: certificateContext?.clientName,
        installationAddress: certificateContext?.installationAddress,
      });

      // Copy each photo
      let successCount = 0;
      for (const photo of photos) {
        const result = await copyFromInspection({
          sourceUrl: photo.file_url,
          projectReference: projectRef,
          description: `${observation.description || 'Observation'} - ${observation.recommendation || ''}`.trim(),
          category: mapDefectCodeToCategory(observation.defectCode),
          defectCode: observation.defectCode,
          location: certificateContext?.installationAddress,
          certificateNumber: certificateContext?.certificateNumber || reportId,
          certificateType: certificateContext?.certificateType || 'minor-works',
        });

        if (result) successCount++;
      }

      if (successCount > 0) {
        setSentToPhotoDocs(true);
        toast({
          title: "Photos sent to Photo Docs",
          description: `${successCount} photo${successCount > 1 ? 's' : ''} copied to project "${projectRef}"`,
        });
      }
    } catch (error) {
      console.error('Error sending to photo docs:', error);
      toast({
        title: "Failed to send photos",
        description: "Could not copy photos to Photo Docs",
        variant: "destructive",
      });
    } finally {
      setIsSendingToPhotoDocs(false);
    }
  };

  const borderColor = getBorderColor(observation.defectCode);
  
  const handleQuickSelect = (selectedText: string) => {
    onUpdate(observation.id, 'description', selectedText);
    
    // Auto-suggest recommendation based on defect
    if (selectedText.includes('No defects') || selectedText.includes('Not applicable')) {
      onUpdate(observation.id, 'recommendation', 'None required');
    } else if (observation.defectCode === 'C1') {
      onUpdate(observation.id, 'recommendation', 'Immediate rectification required before energising');
    } else if (observation.defectCode === 'C2') {
      onUpdate(observation.id, 'recommendation', 'Urgent remedial action required');
    } else if (observation.defectCode === 'C3') {
      onUpdate(observation.id, 'recommendation', 'Improvement recommended at next convenient opportunity');
    } else if (observation.defectCode === 'FI') {
      onUpdate(observation.id, 'recommendation', 'Further investigation and testing required');
    }
  };

  return (
    <Card className={`p-5 sm:p-6 border-l-4 ${borderColor}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h4 className="font-semibold flex items-center gap-2 text-base">
          {getSeverityIcon(observation.defectCode)}
          Observation {index + 1} - {observation.defectCode}
        </h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(observation.id)}
          className="text-red-500 hover:text-red-700 h-9 w-9 p-0 self-end sm:self-auto"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-semibold mb-1.5 block">Classification</Label>
          <MobileSelectPicker
            value={observation.defectCode}
            onValueChange={(value) =>
              onUpdate(observation.id, 'defectCode', value as 'C1' | 'C2' | 'C3' | 'FI' | 'N/A')
            }
            options={[
              { value: 'C1', label: `C1 - ${getDefectDescription('C1')}` },
              { value: 'C2', label: `C2 - ${getDefectDescription('C2')}` },
              { value: 'C3', label: `C3 - ${getDefectDescription('C3')}` },
              { value: 'FI', label: `FI - ${getDefectDescription('FI')}` },
              { value: 'N/A', label: `N/A - ${getDefectDescription('N/A')}` },
            ]}
            placeholder="Select classification"
            title="Classification"
          />
        </div>

        <div>
          <Label className="text-sm font-semibold mb-1.5 block">Quick Select Common Observations</Label>
          <MobileSelectPicker
            value=""
            onValueChange={handleQuickSelect}
            options={commonObservations[observation.defectCode].map((text) => ({
              value: text,
              label: text,
            }))}
            placeholder="Select a common observation or type custom below"
            title="Common Observations"
          />
        </div>

        <div>
          <Label className="text-sm font-semibold mb-1.5 block">Description</Label>
          <Textarea
            placeholder="Describe the observation or defect found..."
            value={observation.description}
            onChange={(e) => onUpdate(observation.id, 'description', e.target.value)}
            rows={5}
            className="resize-none text-base"
          />
        </div>

        <div>
          <Label className="text-sm font-semibold mb-1.5 block">Recommendation</Label>
          <Textarea
            placeholder="Recommended action to address this observation..."
            value={observation.recommendation}
            onChange={(e) => onUpdate(observation.id, 'recommendation', e.target.value)}
            rows={3}
            className="resize-none text-base"
          />
        </div>

        {/* Photo Evidence Section */}
        <div className="space-y-3 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Photo Evidence</Label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {photos.length} photo{photos.length !== 1 ? 's' : ''}
              </span>
              {photos.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSendToPhotoDocs}
                  disabled={isSendingToPhotoDocs || sentToPhotoDocs}
                  className="h-7 px-2 text-xs text-emerald-400/80 hover:text-emerald-400 hover:bg-emerald-400/10"
                >
                  {isSendingToPhotoDocs ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />
                      Sending...
                    </>
                  ) : sentToPhotoDocs ? (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1" />
                      Sent
                    </>
                  ) : (
                    <>
                      <FolderPlus className="h-3.5 w-3.5 mr-1" />
                      Send to Photo Docs
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          <InspectionPhotoUpload
            onPhotoCapture={async (file) => {
              await uploadPhoto(
                file,
                observation.defectCode,
                observation.description
              );
            }}
            isUploading={isUploading}
          />

          <InspectionPhotoGallery
            photos={photos}
            onDeletePhoto={deletePhoto}
            onScanPhoto={scanPhotoWithAI}
            isScanning={isScanning}
            inspectorContext={{
              classification: observation.defectCode,
              itemLocation: 'Minor Works',
              description: observation.description || 'No description provided',
              recommendation: observation.recommendation,
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default MinorWorksObservationCard;