import { useState, useMemo } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
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
  Map
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { PhotoCategory } from "@/data/employerMockData";
import { SignatureCapture } from "@/components/ui/signature-capture";
import { useToast } from "@/hooks/use-toast";
import { PhotoViewer } from "@/components/employer/PhotoViewer";
import { PhotoMapView } from "@/components/employer/PhotoMapView";

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
  Before: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  During: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  After: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Completion: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Issue: "bg-red-500/20 text-red-400 border-red-500/30"
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
  onCall
}: ViewProgressLogSheetProps) {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [showSignaturePanel, setShowSignaturePanel] = useState(false);
  const [signOffNotes, setSignOffNotes] = useState("");
  const [photoViewerOpen, setPhotoViewerOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showMapView, setShowMapView] = useState(false);
  const totalMaterialsCost = log.materialsUsed.reduce((s, m) => s + m.cost, 0);

  // Check if any photos have location data
  const photosWithLocation = useMemo(() => 
    photos.filter(p => p.location?.lat && p.location?.lng), 
    [photos]
  );

  const handleSignatureCapture = (signatureData: string) => {
    onSignOff(signatureData, signOffNotes);
    setShowSignaturePanel(false);
    setSignOffNotes("");
    toast({ title: "Log signed off successfully" });
  };

  const handleStartSignOff = () => {
    setShowSignaturePanel(true);
  };

  const handleCancelSignOff = () => {
    setShowSignaturePanel(false);
    setSignOffNotes("");
  };

  const handlePhotoClick = (index: number) => {
    setCurrentPhotoIndex(index);
    setPhotoViewerOpen(true);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent 
        side={isMobile ? "bottom" : "right"} 
        className={cn(
          "p-0 flex flex-col",
          isMobile ? "h-[95vh] rounded-t-3xl" : "w-[500px]"
        )}
      >
        {/* Signature Panel View */}
        {showSignaturePanel ? (
          <div className="flex flex-col h-full">
            {/* Signature Header */}
            <div className="p-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10"
                  onClick={handleCancelSignOff}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Sign Off Log</h2>
                  <p className="text-sm text-foreground/60">{log.employeeName} - {log.date}</p>
                </div>
              </div>
            </div>

            {/* Signature Content */}
            <div className="flex-1 p-4 space-y-6">
              {/* Summary Preview */}
              <Card className="bg-muted/30 border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-elec-yellow">
                        {log.employeeName.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{log.employeeName}</p>
                      <p className="text-xs text-foreground/60">{log.hoursWorked}h on {log.jobTitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80">{log.summary}</p>
                </CardContent>
              </Card>

              {/* Approval Notes */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Approval Notes (Optional)
                </label>
                <Textarea
                  placeholder="Add any notes or comments for this sign-off..."
                  value={signOffNotes}
                  onChange={(e) => setSignOffNotes(e.target.value)}
                  className="resize-none bg-muted/30 border-border/50 text-foreground"
                  rows={3}
                />
              </div>

              {/* Signature Capture */}
              <SignatureCapture
                onCapture={handleSignatureCapture}
                onCancel={handleCancelSignOff}
                height={180}
              />
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <SheetHeader className="p-4 pb-0 border-b border-border/50">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  {/* Large Avatar */}
                  <div className="w-16 h-16 rounded-full bg-elec-yellow/20 flex items-center justify-center border-2 border-elec-yellow/30">
                    {employee?.photo ? (
                      <img 
                        src={employee.photo} 
                        alt={employee.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-xl font-bold text-elec-yellow">
                        {employee?.avatar || log.employeeName.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <SheetTitle className="text-xl text-foreground">{log.employeeName}</SheetTitle>
                    <p className="text-sm text-foreground/70">{employee?.role || "Team Member"}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-foreground/60">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {log.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {log.hoursWorked}h
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 -mt-1 -mr-2"
                  onClick={onClose}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Status & Job */}
              <div className="flex items-center gap-2 py-3">
                {log.signedOff ? (
                  <Badge className="bg-success/20 text-success">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Signed Off
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-warning/20 text-warning">
                    Pending Review
                  </Badge>
                )}
                <Badge variant="outline" className="text-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {log.jobTitle}
                </Badge>
              </div>
            </SheetHeader>

            {/* Scrollable Content */}
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-6 py-4">
                {/* Summary */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-elec-yellow" />
                    <h3 className="font-semibold text-foreground">Summary</h3>
                  </div>
                  <p className="text-foreground leading-relaxed">{log.summary}</p>
                </div>

                {/* Work Completed */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Hammer className="h-4 w-4 text-elec-yellow" />
                    <h3 className="font-semibold text-foreground">Work Completed</h3>
                  </div>
                  <Card className="bg-muted/30 border-border/50">
                    <CardContent className="p-0">
                      <ul className="divide-y divide-border/30">
                        {log.workCompleted.map((work, i) => (
                          <li key={i} className="flex items-start gap-3 p-3 text-foreground">
                            <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                            <span>{work}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Materials Used */}
                {log.materialsUsed.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Package className="h-4 w-4 text-elec-yellow" />
                      <h3 className="font-semibold text-foreground">Materials Used</h3>
                    </div>
                    <Card className="bg-muted/30 border-border/50">
                      <CardContent className="p-0">
                        <div className="divide-y divide-border/30">
                          {log.materialsUsed.map((material, i) => (
                            <div key={i} className="flex items-center justify-between p-3">
                              <div className="flex-1">
                                <p className="font-medium text-foreground">{material.item}</p>
                                <p className="text-sm text-foreground/60">{material.quantity}</p>
                              </div>
                              <span className="font-semibold text-foreground">£{material.cost}</span>
                            </div>
                          ))}
                          <div className="flex items-center justify-between p-3 bg-elec-yellow/5">
                            <span className="font-semibold text-foreground">Total</span>
                            <span className="font-bold text-elec-yellow text-lg">£{totalMaterialsCost}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Photos */}
                {photos.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Camera className="h-4 w-4 text-elec-yellow" />
                        <h3 className="font-semibold text-foreground">Photos ({photos.length})</h3>
                      </div>
                      {photosWithLocation.length > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-xs gap-1.5 text-elec-yellow"
                          onClick={() => setShowMapView(true)}
                        >
                          <Map className="h-3.5 w-3.5" />
                          View on Map
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {photos.map((photo, index) => (
                        <div 
                          key={photo.id} 
                          className="aspect-square bg-muted/50 rounded-xl flex flex-col items-center justify-center relative cursor-pointer hover:ring-2 ring-elec-yellow/50 transition-all border border-border/30"
                          onClick={() => handlePhotoClick(index)}
                        >
                          <Camera className="h-8 w-8 text-foreground/40" />
                          {photo.location && (
                            <MapPin className="absolute top-1.5 left-1.5 h-3 w-3 text-info" />
                          )}
                          <Badge 
                            className={cn(
                              "absolute -top-1.5 -right-1.5 text-[10px] px-1.5 py-0.5",
                              categoryColors[photo.category]
                            )}
                          >
                            {photo.category}
                          </Badge>
                          <span className="text-[10px] text-foreground/50 mt-1 truncate max-w-full px-1">{photo.notes?.slice(0, 15) || photo.filename}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {log.notes && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-elec-yellow" />
                      <h3 className="font-semibold text-foreground">Notes</h3>
                    </div>
                    <Card className="bg-muted/30 border-border/50">
                      <CardContent className="p-3">
                        <p className="text-foreground">{log.notes}</p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Footer Actions */}
            <div className="p-4 border-t border-border/50 space-y-3 pb-safe">
              {!log.signedOff && (
                <Button 
                  size="lg" 
                  className="w-full h-14 text-base font-semibold"
                  onClick={handleStartSignOff}
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Sign Off Log
                </Button>
              )}
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-12"
                  onClick={onMessage}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-12"
                  onClick={onCall}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>

      {/* Photo Viewer */}
      <PhotoViewer
        photos={photos.map(p => ({
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
          progressLogId: p.progressLogId
        }))}
        currentIndex={currentPhotoIndex}
        isOpen={photoViewerOpen}
        onClose={() => setPhotoViewerOpen(false)}
        onNavigate={setCurrentPhotoIndex}
      />

      {/* Map View Sheet */}
      <Sheet open={showMapView} onOpenChange={setShowMapView}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl p-0">
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Photo Locations</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowMapView(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="h-[calc(100%-60px)]">
            <PhotoMapView
              photos={photosWithLocation.map(p => ({
                id: p.id,
                jobId: p.jobId,
                jobTitle: log.jobTitle,
                uploadedBy: log.employeeName,
                category: p.category.toLowerCase() as 'before' | 'during' | 'after' | 'issue' | 'completion' | 'safety',
                timestamp: log.date,
                location: p.location?.address,
                lat: p.location!.lat,
                lng: p.location!.lng,
                isApproved: true,
                isShared: false
              }))}
              onPhotoClick={() => {}}
              onToggleApproval={() => {}}
              onToggleSharing={() => {}}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Sheet>
  );
}
