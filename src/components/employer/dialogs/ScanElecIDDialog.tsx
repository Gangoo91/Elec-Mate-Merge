import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { getElecIdProfileByNumber, ElecIdProfile } from '@/services/elecIdService';
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
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Field,
  Pill,
  PrimaryButton,
  SecondaryButton,
  inputClass,
} from '@/components/employer/editorial';

interface ScanElecIDDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ScanState = 'input' | 'scanning' | 'found' | 'checking' | 'result' | 'not_found';

type OverallStatus = 'compliant' | 'expiring' | 'non-compliant';

const statusConfig: Record<
  OverallStatus,
  {
    label: string;
    tone: 'emerald' | 'amber' | 'red';
    icon: typeof CheckCircle2;
    message: string;
  }
> = {
  compliant: {
    label: 'Fully compliant',
    tone: 'emerald',
    icon: CheckCircle2,
    message: 'All credentials valid and verified',
  },
  expiring: {
    label: 'Expiring soon',
    tone: 'amber',
    icon: AlertTriangle,
    message: 'Some credentials expiring within 30 days',
  },
  'non-compliant': {
    label: 'Non-compliant',
    tone: 'red',
    icon: XCircle,
    message: 'Expired or missing credentials',
  },
};

const certStatusTone: Record<'valid' | 'expiring' | 'expired', 'emerald' | 'amber' | 'red'> = {
  valid: 'emerald',
  expiring: 'amber',
  expired: 'red',
};

const getCertStatus = (expiryDate: string | null): 'valid' | 'expiring' | 'expired' => {
  if (!expiryDate) return 'valid';
  const expiry = new Date(expiryDate);
  const now = new Date();
  const daysUntil = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntil < 0) return 'expired';
  if (daysUntil <= 30) return 'expiring';
  return 'valid';
};

const calculateOverallStatus = (profile: ElecIdProfile): OverallStatus => {
  const allStatuses: ('valid' | 'expiring' | 'expired')[] = [];

  profile.training?.forEach((t) => {
    allStatuses.push(getCertStatus(t.expiry_date));
  });

  if (profile.ecs_expiry_date) {
    allStatuses.push(getCertStatus(profile.ecs_expiry_date));
  }

  if (allStatuses.some((s) => s === 'expired')) return 'non-compliant';
  if (allStatuses.some((s) => s === 'expiring')) return 'expiring';
  return 'compliant';
};

export const ScanElecIDDialog = ({ open, onOpenChange }: ScanElecIDDialogProps) => {
  const [scanState, setScanState] = useState<ScanState>('input');
  const [scanProgress, setScanProgress] = useState(0);
  const [result, setResult] = useState<ElecIdProfile | null>(null);
  const [elecIdInput, setElecIdInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!open) {
      setScanState('input');
      setScanProgress(0);
      setResult(null);
      setElecIdInput('');
      setIsSearching(false);
      return;
    }
  }, [open]);

  useEffect(() => {
    if (scanState === 'scanning') {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setScanState('found');
            return 100;
          }
          return prev + 5;
        });
      }, 80);
      return () => clearInterval(interval);
    }

    if (scanState === 'found') {
      const timeout = setTimeout(() => {
        setScanState('checking');
      }, 500);
      return () => clearTimeout(timeout);
    }

    if (scanState === 'checking') {
      const lookupProfile = async () => {
        try {
          const profile = await getElecIdProfileByNumber(elecIdInput);
          if (profile) {
            setResult(profile);
            setScanState('result');
          } else {
            setScanState('not_found');
          }
        } catch (error) {
          console.error('Error looking up profile:', error);
          setScanState('not_found');
        }
      };

      const timeout = setTimeout(lookupProfile, 1000);
      return () => clearTimeout(timeout);
    }
  }, [scanState, elecIdInput]);

  const handleManualSearch = async () => {
    if (!elecIdInput.trim()) {
      toast({
        title: 'Enter Elec-ID',
        description: 'Please enter an Elec-ID number to search.',
        variant: 'destructive',
      });
      return;
    }

    setIsSearching(true);
    try {
      const profile = await getElecIdProfileByNumber(elecIdInput.trim());
      if (profile) {
        setResult(profile);
        setScanState('result');
      } else {
        setScanState('not_found');
      }
    } catch (error) {
      console.error('Error searching:', error);
      setScanState('not_found');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSimulateScan = () => {
    if (!elecIdInput.trim()) {
      toast({
        title: 'Enter Elec-ID',
        description: 'Please enter an Elec-ID number to simulate scanning.',
        variant: 'destructive',
      });
      return;
    }
    setScanState('scanning');
    setScanProgress(0);
  };

  const handleAddToTeam = () => {
    if (result) {
      toast({
        title: 'Worker Added',
        description: `${result.employee?.name} has been added to your team.`,
      });
      onOpenChange(false);
    }
  };

  const handleRescan = () => {
    setScanState('input');
    setScanProgress(0);
    setResult(null);
    setElecIdInput('');
  };

  const overallStatus = result ? calculateOverallStatus(result) : 'compliant';
  const StatusIcon = statusConfig[overallStatus].icon;

  const certifications =
    result?.training?.map((t) => ({
      name: t.training_name,
      status: getCertStatus(t.expiry_date),
      expiryDate: t.expiry_date || '',
    })) || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] p-6 bg-[hsl(0_0%_8%)] border-white/[0.08]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <QrCode className="h-5 w-5 text-elec-yellow" />
            Scan Elec-ID
          </DialogTitle>
          <DialogDescription className="text-white">
            Scan a worker's QR code or enter their Elec-ID number to check credentials.
          </DialogDescription>
        </DialogHeader>

        <div className="pt-2">
          {scanState === 'input' && (
            <div className="space-y-4">
              <Field label="Elec-ID number">
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g. EID-2024-1234"
                    value={elecIdInput}
                    onChange={(e) => setElecIdInput(e.target.value)}
                    className={`${inputClass} font-mono`}
                  />
                  <PrimaryButton onClick={handleManualSearch} disabled={isSearching}>
                    {isSearching ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </PrimaryButton>
                </div>
              </Field>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/[0.06]" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-[0.18em]">
                  <span className="bg-[hsl(0_0%_8%)] px-2 text-white">or</span>
                </div>
              </div>

              <SecondaryButton onClick={handleSimulateScan} fullWidth>
                <Scan className="h-4 w-4 mr-1.5" />
                Simulate QR scan
              </SecondaryButton>

              <p className="text-[11px] text-white text-center">
                In production, this would activate your device camera to scan a QR code.
              </p>
            </div>
          )}

          {scanState === 'scanning' && (
            <div className="text-center space-y-4">
              <div className="relative w-48 h-48 mx-auto border-2 border-dashed border-elec-yellow/50 rounded-2xl flex items-center justify-center bg-[hsl(0_0%_9%)]">
                <div className="absolute inset-4 border-2 border-elec-yellow rounded-xl animate-pulse" />
                <Scan className="h-16 w-16 text-elec-yellow animate-pulse" />
                <div
                  className="absolute left-4 right-4 h-0.5 bg-elec-yellow"
                  style={{
                    top: `${16 + (scanProgress / 100) * 68}%`,
                    boxShadow: '0 0 8px hsl(var(--primary))',
                  }}
                />
              </div>
              <p className="text-[12px] text-white">Scanning for Elec-ID...</p>
              <Progress value={scanProgress} className="h-2 w-48 mx-auto" />
            </div>
          )}

          {scanState === 'found' && (
            <div className="text-center space-y-4">
              <div className="w-48 h-48 mx-auto border-2 border-emerald-400 rounded-2xl flex items-center justify-center bg-emerald-500/10">
                <CheckCircle2 className="h-16 w-16 text-emerald-400" />
              </div>
              <p className="text-[13px] text-emerald-400 font-medium">Elec-ID found</p>
            </div>
          )}

          {scanState === 'checking' && (
            <div className="text-center space-y-4">
              <div className="w-48 h-48 mx-auto border-2 border-elec-yellow rounded-2xl flex items-center justify-center bg-[hsl(0_0%_9%)]">
                <ShieldCheck className="h-16 w-16 text-elec-yellow animate-pulse" />
              </div>
              <p className="text-[12px] text-white">Verifying credentials...</p>
              <div className="flex justify-center gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-elec-yellow animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          {scanState === 'not_found' && (
            <div className="text-center space-y-4">
              <div className="w-48 h-48 mx-auto border-2 border-red-500/40 rounded-2xl flex items-center justify-center bg-red-500/10">
                <XCircle className="h-16 w-16 text-red-400" />
              </div>
              <p className="text-[13px] font-medium text-red-400">Elec-ID not found</p>
              <p className="text-[11px] text-white">
                No profile found for "{elecIdInput}". Check the ID and try again.
              </p>
              <SecondaryButton onClick={handleRescan}>
                <RotateCcw className="h-4 w-4 mr-1.5" />
                Try again
              </SecondaryButton>
            </div>
          )}

          {scanState === 'result' && result && (
            <div className="space-y-3">
              <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-4 flex items-start gap-4">
                <img
                  src={
                    result.employee?.photo_url ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(result.employee?.name || 'Unknown')}&background=random`
                  }
                  alt={result.employee?.name}
                  className="w-16 h-16 rounded-xl object-cover border border-white/[0.08]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[15px] font-semibold text-white truncate">
                      {result.employee?.name}
                    </h3>
                    {result.is_verified && (
                      <ShieldCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-[12px] text-white">{result.employee?.role}</p>
                  <p className="mt-1 text-[11px] font-mono text-white">{result.elec_id_number}</p>
                </div>
              </div>

              <div
                className={cn(
                  'rounded-2xl p-4 border',
                  overallStatus === 'compliant'
                    ? 'border-emerald-500/25 bg-emerald-500/5'
                    : overallStatus === 'expiring'
                      ? 'border-amber-500/25 bg-amber-500/5'
                      : 'border-red-500/25 bg-red-500/5'
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'h-10 w-10 rounded-full flex items-center justify-center border',
                      overallStatus === 'compliant'
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : overallStatus === 'expiring'
                          ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                          : 'bg-red-500/15 text-red-400 border-red-500/30'
                    )}
                  >
                    <StatusIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-white">
                      {statusConfig[overallStatus].label}
                    </p>
                    <p className="text-[11.5px] text-white">{statusConfig[overallStatus].message}</p>
                  </div>
                </div>
              </div>

              {certifications.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="text-[12px] font-semibold text-white flex items-center gap-2 uppercase tracking-[0.14em]">
                    <Award className="h-4 w-4 text-elec-yellow" />
                    Training & certifications
                  </h4>
                  {certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-2 px-3 bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl"
                    >
                      <span className="text-[12.5px] text-white">{cert.name}</span>
                      <div className="flex items-center gap-2">
                        {cert.expiryDate && (
                          <span className="text-[11px] text-white flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(cert.expiryDate).toLocaleDateString('en-GB')}
                          </span>
                        )}
                        <Pill tone={certStatusTone[cert.status]}>
                          {cert.status === 'valid'
                            ? 'Valid'
                            : cert.status === 'expiring'
                              ? 'Expiring'
                              : 'Expired'}
                        </Pill>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <SecondaryButton onClick={handleRescan}>
                  <RotateCcw className="h-4 w-4 mr-1.5" />
                  Scan another
                </SecondaryButton>
                <PrimaryButton onClick={handleAddToTeam} fullWidth>
                  <UserPlus className="h-4 w-4 mr-1.5" />
                  Add to my team
                </PrimaryButton>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
