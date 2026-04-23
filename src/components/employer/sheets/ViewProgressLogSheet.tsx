import { useState, useMemo } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import {
  CheckCircle,
  Calendar,
  Clock,
  Package,
  Camera,
  Phone,
  MessageSquare,
  MapPin,
  FileText,
  Hammer,
  X,
  ArrowLeft,
  Map,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PhotoCategory } from '@/data/employerMockData';
import { SignatureCapture } from '@/components/ui/signature-capture';
import { useToast } from '@/hooks/use-toast';
import { PhotoViewer } from '@/components/employer/PhotoViewer';
import { PhotoMapView } from '@/components/employer/PhotoMapView';
import {
  SheetShell,
  FormCard,
  FormGrid,
  Field,
  PrimaryButton,
  SecondaryButton,
  Pill,
  IconButton,
  Eyebrow,
  textareaClass,
  SuccessCheckmark,
} from '@/components/employer/editorial';

interface ProgressLog {
  id: string;
  employeeId: string;
  employeeName: string;
  jobId: string;
  jobTitle: string;
  date: string;
  summary: string;
  hoursWorked: number;
  workCompleted: string[];
  materialsUsed: { item: string; quantity: string; cost: number }[];
  photos: string[];
  notes?: string;
  signedOff: boolean;
}

interface Employee {
  id: string;
  name: string;
  avatar?: string;
  photo?: string;
  role?: string;
  phone?: string;
}

interface Photo {
  id: string;
  jobId: string;
  category: PhotoCategory;
  filename: string;
  notes?: string;
  location?: { lat: number; lng: number; address: string };
  progressLogId?: string;
}

const categoryColors: Record<PhotoCategory, string> = {
  Before: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  During: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  After: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Completion: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Issue: 'bg-red-500/20 text-red-400 border-red-500/30',
};

interface ViewProgressLogSheetProps {
  log: ProgressLog;
  employee?: Employee;
  photos: Photo[];
  isOpen: boolean;
  onClose: () => void;
  onSignOff: (signatureData: string, notes: string) => void;
  onMessage: () => void;
  onCall: () => void;
}

export function ViewProgressLogSheet({
  log,
  employee,
  photos,
  isOpen,
  onClose,
  onSignOff,
  onMessage,
  onCall,
}: ViewProgressLogSheetProps) {
  const { toast } = useToast();
  const [showSignaturePanel, setShowSignaturePanel] = useState(false);
  const [signOffNotes, setSignOffNotes] = useState('');
  const [photoViewerOpen, setPhotoViewerOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showMapView, setShowMapView] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const totalMaterialsCost = log.materialsUsed.reduce((s, m) => s + m.cost, 0);

  const photosWithLocation = useMemo(
    () => photos.filter((p) => p.location?.lat && p.location?.lng),
    [photos]
  );

  const handleSignatureCapture = (signatureData: string) => {
    onSignOff(signatureData, signOffNotes);
    setShowSignaturePanel(false);
    setSignOffNotes('');
    toast({ title: 'Log signed off successfully' });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 700);
  };

  const handleStartSignOff = () => {
    setShowSignaturePanel(true);
  };

  const handleCancelSignOff = () => {
    setShowSignaturePanel(false);
    setSignOffNotes('');
  };

  const handlePhotoClick = (index: number) => {
    setCurrentPhotoIndex(index);
    setPhotoViewerOpen(true);
  };

  return (
    <>
      <SuccessCheckmark show={showSuccess} />
      <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
        >
          {showSignaturePanel ? (
            <div className="flex flex-col h-full bg-[hsl(0_0%_8%)]">
              <div className="flex-shrink-0 border-b border-white/[0.06] px-5 py-4">
                <div className="flex items-center gap-3">
                  <IconButton aria-label="Back" onClick={handleCancelSignOff}>
                    <ArrowLeft className="h-5 w-5" />
                  </IconButton>
                  <div>
                    <Eyebrow>Sign off</Eyebrow>
                    <h2 className="text-[18px] font-semibold text-white mt-0.5">
                      {log.employeeName}
                    </h2>
                    <p className="text-[12px] text-white">{log.date}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <FormCard eyebrow="Log preview">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-elec-yellow">
                        {log.employeeName.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{log.employeeName}</p>
                      <p className="text-xs text-white">
                        {log.hoursWorked}h on {log.jobTitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-white">{log.summary}</p>
                </FormCard>

                <Field label="Approval notes" hint="Optional">
                  <Textarea
                    placeholder="Add any notes or comments for this sign-off…"
                    value={signOffNotes}
                    onChange={(e) => setSignOffNotes(e.target.value)}
                    className={cn(textareaClass, 'min-h-[96px]')}
                    rows={3}
                  />
                </Field>

                <SignatureCapture
                  onCapture={handleSignatureCapture}
                  onCancel={handleCancelSignOff}
                  height={180}
                />
              </div>
            </div>
          ) : (
            <SheetShell
              eyebrow={employee?.role || 'Team member'}
              title={log.employeeName}
              description={
                <span className="flex flex-wrap items-center gap-2">
                  {log.signedOff ? (
                    <Pill tone="emerald">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Signed off
                    </Pill>
                  ) : (
                    <Pill tone="amber">Pending review</Pill>
                  )}
                  <Pill tone="yellow">
                    <MapPin className="h-3 w-3 mr-1" />
                    {log.jobTitle}
                  </Pill>
                  <span className="flex items-center gap-1 text-[12px] text-white">
                    <Calendar className="h-3 w-3" />
                    {log.date}
                  </span>
                  <span className="flex items-center gap-1 text-[12px] text-white">
                    <Clock className="h-3 w-3" />
                    {log.hoursWorked}h
                  </span>
                </span>
              }
              footer={
                <>
                  <SecondaryButton onClick={onCall} fullWidth>
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </SecondaryButton>
                  {!log.signedOff ? (
                    <PrimaryButton onClick={handleStartSignOff} fullWidth>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Sign off
                    </PrimaryButton>
                  ) : (
                    <SecondaryButton onClick={onMessage} fullWidth>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </SecondaryButton>
                  )}
                </>
              }
            >
              <FormCard eyebrow="Summary">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-elec-yellow" />
                  <Eyebrow>Summary</Eyebrow>
                </div>
                <p className="text-white leading-relaxed text-sm">{log.summary}</p>
              </FormCard>

              <FormCard eyebrow="Work completed">
                <ul className="divide-y divide-white/[0.06] -my-1">
                  {log.workCompleted.map((work, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 py-2.5 text-sm text-white"
                    >
                      <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{work}</span>
                    </li>
                  ))}
                </ul>
              </FormCard>

              {log.materialsUsed.length > 0 && (
                <FormCard eyebrow="Materials used">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="h-4 w-4 text-elec-yellow" />
                    <Eyebrow>Materials</Eyebrow>
                  </div>
                  <div className="divide-y divide-white/[0.06] -mx-1">
                    {log.materialsUsed.map((material, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-1 py-2.5"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-white text-sm">{material.item}</p>
                          <p className="text-xs text-white">{material.quantity}</p>
                        </div>
                        <span className="font-semibold text-white tabular-nums">
                          £{material.cost}
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between px-1 py-2.5 bg-elec-yellow/5">
                      <span className="font-semibold text-white">Total</span>
                      <span className="font-bold text-elec-yellow text-lg tabular-nums">
                        £{totalMaterialsCost}
                      </span>
                    </div>
                  </div>
                </FormCard>
              )}

              {photos.length > 0 && (
                <FormCard eyebrow={`Photos · ${photos.length}`}>
                  {photosWithLocation.length > 0 && (
                    <div className="flex justify-end mb-2">
                      <SecondaryButton size="sm" onClick={() => setShowMapView(true)}>
                        <Map className="h-3.5 w-3.5 mr-1" />
                        Map view
                      </SecondaryButton>
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-3">
                    {photos.map((photo, index) => (
                      <div
                        key={photo.id}
                        className="aspect-square bg-[hsl(0_0%_9%)] rounded-xl flex flex-col items-center justify-center relative cursor-pointer hover:ring-2 ring-elec-yellow/50 transition-all border border-white/[0.06]"
                        onClick={() => handlePhotoClick(index)}
                      >
                        <Camera className="h-8 w-8 text-white/50" />
                        {photo.location && (
                          <MapPin className="absolute top-1.5 left-1.5 h-3 w-3 text-blue-400" />
                        )}
                        <span
                          className={cn(
                            'absolute -top-1.5 -right-1.5 text-[10px] px-1.5 py-0.5 rounded-full border',
                            categoryColors[photo.category]
                          )}
                        >
                          {photo.category}
                        </span>
                        <span className="text-[10px] text-white mt-1 truncate max-w-full px-1">
                          {photo.notes?.slice(0, 15) || photo.filename}
                        </span>
                      </div>
                    ))}
                  </div>
                </FormCard>
              )}

              {log.notes && (
                <FormCard eyebrow="Notes">
                  <p className="text-sm text-white">{log.notes}</p>
                </FormCard>
              )}

              <FormGrid cols={2}>
                <SecondaryButton onClick={onMessage} fullWidth>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </SecondaryButton>
                <SecondaryButton onClick={onCall} fullWidth>
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </SecondaryButton>
              </FormGrid>

              {/* Footer signoff handled in sheet footer */}
              <div className="hidden" aria-hidden />
            </SheetShell>
          )}
        </SheetContent>

        <PhotoViewer
          photos={photos.map((p) => ({
            id: p.id,
            jobId: p.jobId,
            jobTitle: log.jobTitle,
            uploadedBy: log.employeeName,
            uploadedById: log.employeeId,
            filename: p.filename,
            category: p.category,
            timestamp: log.date,
            location: p.location,
            approved: true,
            sharedWithClient: false,
            notes: p.notes || '',
            progressLogId: p.progressLogId,
          }))}
          currentIndex={currentPhotoIndex}
          isOpen={photoViewerOpen}
          onClose={() => setPhotoViewerOpen(false)}
          onNavigate={setCurrentPhotoIndex}
        />

        <Sheet open={showMapView} onOpenChange={setShowMapView}>
          <SheetContent
            side="bottom"
            className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
          >
            <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
              <h3 className="font-semibold text-white">Photo locations</h3>
              <IconButton aria-label="Close" onClick={() => setShowMapView(false)}>
                <X className="h-5 w-5" />
              </IconButton>
            </div>
            <div className="h-[calc(100%-60px)]">
              <PhotoMapView
                photos={photosWithLocation.map((p) => ({
                  id: p.id,
                  jobId: p.jobId,
                  jobTitle: log.jobTitle,
                  uploadedBy: log.employeeName,
                  category: p.category.toLowerCase() as
                    | 'before'
                    | 'during'
                    | 'after'
                    | 'issue'
                    | 'completion'
                    | 'safety',
                  timestamp: log.date,
                  location: p.location?.address,
                  lat: p.location!.lat,
                  lng: p.location!.lng,
                  isApproved: true,
                  isShared: false,
                }))}
                onPhotoClick={() => {}}
                onToggleApproval={() => {}}
                onToggleSharing={() => {}}
              />
            </div>
          </SheetContent>
        </Sheet>
      </Sheet>
    </>
  );
}
