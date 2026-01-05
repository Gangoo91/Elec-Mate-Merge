import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { getElecIdProfileByNumber, ElecIdProfile } from "@/services/elecIdService";
import { 
  QrCode, 
  Scan, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Award,
  ShieldCheck,
  Calendar,
  UserPlus,
  RotateCcw,
  Search,
  Loader2
} from "lucide-react";

interface ScanElecIDDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ScanState = "input" | "scanning" | "found" | "checking" | "result" | "not_found";

type OverallStatus = "compliant" | "expiring" | "non-compliant";

const statusConfig = {
  compliant: { 
    label: "Fully Compliant", 
    color: "bg-success/20 text-success border-success/30",
    icon: CheckCircle2,
    message: "All credentials valid and verified"
  },
  expiring: { 
    label: "Expiring Soon", 
    color: "bg-warning/20 text-warning border-warning/30",
    icon: AlertTriangle,
    message: "Some credentials expiring within 30 days"
  },
  "non-compliant": { 
    label: "Non-Compliant", 
    color: "bg-destructive/20 text-destructive border-destructive/30",
    icon: XCircle,
    message: "Expired or missing credentials"
  }
};

const certStatusColors = {
  valid: "bg-success/20 text-success border-success/30",
  expiring: "bg-warning/20 text-warning border-warning/30",
  expired: "bg-destructive/20 text-destructive border-destructive/30"
};

const getCertStatus = (expiryDate: string | null): "valid" | "expiring" | "expired" => {
  if (!expiryDate) return "valid";
  const expiry = new Date(expiryDate);
  const now = new Date();
  const daysUntil = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntil < 0) return "expired";
  if (daysUntil <= 30) return "expiring";
  return "valid";
};

const calculateOverallStatus = (profile: ElecIdProfile): OverallStatus => {
  const allStatuses: ("valid" | "expiring" | "expired")[] = [];
  
  // Check training expiry dates
  profile.training?.forEach(t => {
    allStatuses.push(getCertStatus(t.expiry_date));
  });
  
  // Check ECS card expiry
  if (profile.ecs_expiry_date) {
    allStatuses.push(getCertStatus(profile.ecs_expiry_date));
  }
  
  if (allStatuses.some(s => s === "expired")) return "non-compliant";
  if (allStatuses.some(s => s === "expiring")) return "expiring";
  return "compliant";
};

export const ScanElecIDDialog = ({ open, onOpenChange }: ScanElecIDDialogProps) => {
  const [scanState, setScanState] = useState<ScanState>("input");
  const [scanProgress, setScanProgress] = useState(0);
  const [result, setResult] = useState<ElecIdProfile | null>(null);
  const [elecIdInput, setElecIdInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!open) {
      setScanState("input");
      setScanProgress(0);
      setResult(null);
      setElecIdInput("");
      setIsSearching(false);
      return;
    }
  }, [open]);

  useEffect(() => {
    if (scanState === "scanning") {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setScanState("found");
            return 100;
          }
          return prev + 5;
        });
      }, 80);
      return () => clearInterval(interval);
    }

    if (scanState === "found") {
      const timeout = setTimeout(() => {
        setScanState("checking");
      }, 500);
      return () => clearTimeout(timeout);
    }

    if (scanState === "checking") {
      // Lookup the profile from the database
      const lookupProfile = async () => {
        try {
          const profile = await getElecIdProfileByNumber(elecIdInput);
          if (profile) {
            setResult(profile);
            setScanState("result");
          } else {
            setScanState("not_found");
          }
        } catch (error) {
          console.error("Error looking up profile:", error);
          setScanState("not_found");
        }
      };
      
      const timeout = setTimeout(lookupProfile, 1000);
      return () => clearTimeout(timeout);
    }
  }, [scanState, elecIdInput]);

  const handleManualSearch = async () => {
    if (!elecIdInput.trim()) {
      toast({
        title: "Enter Elec-ID",
        description: "Please enter an Elec-ID number to search.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSearching(true);
    try {
      const profile = await getElecIdProfileByNumber(elecIdInput.trim());
      if (profile) {
        setResult(profile);
        setScanState("result");
      } else {
        setScanState("not_found");
      }
    } catch (error) {
      console.error("Error searching:", error);
      setScanState("not_found");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSimulateScan = () => {
    if (!elecIdInput.trim()) {
      toast({
        title: "Enter Elec-ID",
        description: "Please enter an Elec-ID number to simulate scanning.",
        variant: "destructive",
      });
      return;
    }
    setScanState("scanning");
    setScanProgress(0);
  };

  const handleAddToTeam = () => {
    if (result) {
      toast({
        title: "Worker Added",
        description: `${result.employee?.name} has been added to your team.`,
      });
      onOpenChange(false);
    }
  };

  const handleRescan = () => {
    setScanState("input");
    setScanProgress(0);
    setResult(null);
    setElecIdInput("");
  };

  const overallStatus = result ? calculateOverallStatus(result) : "compliant";
  const StatusIcon = statusConfig[overallStatus].icon;

  // Build certifications list from training records
  const certifications = result?.training?.map(t => ({
    name: t.training_name,
    status: getCertStatus(t.expiry_date),
    expiryDate: t.expiry_date || "",
  })) || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-elec-yellow" />
            Scan Elec-ID
          </DialogTitle>
          <DialogDescription>
            Scan a worker's QR code or enter their Elec-ID number to check credentials
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Input State */}
          {scanState === "input" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="elec-id-input">Elec-ID Number</Label>
                <div className="flex gap-2">
                  <Input
                    id="elec-id-input"
                    placeholder="e.g. EID-2024-1234"
                    value={elecIdInput}
                    onChange={(e) => setElecIdInput(e.target.value)}
                    className="font-mono"
                  />
                  <Button onClick={handleManualSearch} disabled={isSearching}>
                    {isSearching ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">or</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={handleSimulateScan} 
                className="w-full gap-2"
              >
                <Scan className="h-4 w-4" />
                Simulate QR Scan
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                In production, this would activate your device camera to scan a QR code
              </p>
            </div>
          )}

          {/* Scanning State */}
          {scanState === "scanning" && (
            <div className="text-center space-y-4">
              <div className="relative w-48 h-48 mx-auto border-2 border-dashed border-elec-yellow/50 rounded-xl flex items-center justify-center bg-muted/30">
                <div className="absolute inset-4 border-2 border-elec-yellow rounded-lg animate-pulse" />
                <Scan className="h-16 w-16 text-elec-yellow animate-pulse" />
                <div 
                  className="absolute left-4 right-4 h-0.5 bg-elec-yellow"
                  style={{ 
                    top: `${16 + (scanProgress / 100) * 68}%`,
                    boxShadow: '0 0 8px hsl(var(--primary))'
                  }}
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Scanning for Elec-ID...</p>
                <Progress value={scanProgress} className="h-2 w-48 mx-auto" />
              </div>
            </div>
          )}

          {/* Found State */}
          {scanState === "found" && (
            <div className="text-center space-y-4">
              <div className="w-48 h-48 mx-auto border-2 border-success rounded-xl flex items-center justify-center bg-success/10">
                <CheckCircle2 className="h-16 w-16 text-success" />
              </div>
              <p className="text-sm text-success font-medium">Elec-ID Found!</p>
            </div>
          )}

          {/* Checking State */}
          {scanState === "checking" && (
            <div className="text-center space-y-4">
              <div className="w-48 h-48 mx-auto border-2 border-elec-yellow rounded-xl flex items-center justify-center bg-muted/30">
                <ShieldCheck className="h-16 w-16 text-elec-yellow animate-pulse" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Verifying credentials...</p>
                <div className="flex justify-center gap-1">
                  {[0, 1, 2].map(i => (
                    <div 
                      key={i}
                      className="w-2 h-2 rounded-full bg-elec-yellow animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Not Found State */}
          {scanState === "not_found" && (
            <div className="text-center space-y-4">
              <div className="w-48 h-48 mx-auto border-2 border-destructive/50 rounded-xl flex items-center justify-center bg-destructive/10">
                <XCircle className="h-16 w-16 text-destructive" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-destructive">Elec-ID Not Found</p>
                <p className="text-xs text-muted-foreground">
                  No profile found for "{elecIdInput}". Check the ID and try again.
                </p>
              </div>
              <Button variant="outline" onClick={handleRescan} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Try Again
              </Button>
            </div>
          )}

          {/* Result State */}
          {scanState === "result" && result && (
            <div className="space-y-4">
              {/* Worker Info */}
              <Card className="bg-elec-gray border-border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <img 
                      src={result.employee?.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(result.employee?.name || "Unknown")}&background=random`} 
                      alt={result.employee?.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-border"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{result.employee?.name}</h3>
                        {result.is_verified && (
                          <ShieldCheck className="h-4 w-4 text-success flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{result.employee?.role}</p>
                      <p className="text-xs font-mono text-muted-foreground mt-1">{result.elec_id_number}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Overall Status */}
              <Card className={`border ${overallStatus === 'compliant' ? 'border-success/30 bg-success/5' : overallStatus === 'expiring' ? 'border-warning/30 bg-warning/5' : 'border-destructive/30 bg-destructive/5'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${statusConfig[overallStatus].color}`}>
                      <StatusIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{statusConfig[overallStatus].label}</p>
                      <p className="text-sm text-muted-foreground">{statusConfig[overallStatus].message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              {certifications.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Award className="h-4 w-4 text-elec-yellow" />
                    Training & Certifications
                  </h4>
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 px-3 bg-muted/30 rounded-lg">
                      <span className="text-sm text-foreground">{cert.name}</span>
                      <div className="flex items-center gap-2">
                        {cert.expiryDate && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(cert.expiryDate).toLocaleDateString('en-GB')}
                          </span>
                        )}
                        <Badge className={certStatusColors[cert.status]} variant="outline">
                          {cert.status === 'valid' ? 'Valid' : cert.status === 'expiring' ? 'Expiring' : 'Expired'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={handleRescan} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Scan Another
                </Button>
                <Button onClick={handleAddToTeam} className="flex-1 gap-2">
                  <UserPlus className="h-4 w-4" />
                  Add to My Team
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
