import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import {
  ResponsiveFormModal,
  ResponsiveFormModalContent,
  ResponsiveFormModalHeader,
  ResponsiveFormModalTitle,
  ResponsiveFormModalBody,
} from '@/components/ui/responsive-form-modal';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import {
  getElecIdProfileByNumber,
  getElecIdProfileByShareToken,
  ElecIdProfile,
} from '@/services/elecIdService';
import { useCreateEmployee } from '@/hooks/useEmployees';
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
  Avatar,
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

type ScanState = 'input' | 'camera' | 'result' | 'not_found';

const SCANNER_ELEMENT_ID = 'elec-id-qr-scanner';

/** A shared/downloaded QR encodes a share or verify URL; a badge may carry the
 *  raw number. Accept all three. */
const parseScannedText = (
  text: string
): { kind: 'share_token' | 'elec_id_number'; value: string } => {
  const shareMatch = text.match(/\/share\/([A-Za-z0-9]+)/);
  if (shareMatch) return { kind: 'share_token', value: shareMatch[1] };
  const verifyMatch = text.match(/\/verify\/([A-Za-z0-9-]+)/);
  if (verifyMatch) return { kind: 'elec_id_number', value: verifyMatch[1] };
  return { kind: 'elec_id_number', value: text.trim() };
};

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
  const [result, setResult] = useState<ElecIdProfile | null>(null);
  const [elecIdInput, setElecIdInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const createEmployee = useCreateEmployee();

  const stopScanner = async () => {
    const scanner = scannerRef.current;
    scannerRef.current = null;
    if (scanner) {
      try {
        if (scanner.getState() === 2) {
          await scanner.stop();
        }
      } catch {
        // already stopped
      }
    }
  };

  useEffect(() => {
    if (!open) {
      void stopScanner();
      setScanState('input');
      setResult(null);
      setElecIdInput('');
      setIsSearching(false);
      setCameraError(null);
      return;
    }
  }, [open]);

  const lookupScanned = async (text: string) => {
    try {
      const parsed = parseScannedText(text);
      const profile =
        parsed.kind === 'share_token'
          ? await getElecIdProfileByShareToken(parsed.value)
          : await getElecIdProfileByNumber(parsed.value);
      if (profile) {
        setResult(profile);
        setScanState('result');
      } else {
        setScanState('not_found');
      }
    } catch (error) {
      console.error('Error looking up scanned Elec-ID:', error);
      setScanState('not_found');
    }
  };

  // Real camera scan — starts when the camera pane mounts, stops on leave
  useEffect(() => {
    if (scanState !== 'camera') return;

    let cancelled = false;
    const scanner = new Html5Qrcode(SCANNER_ELEMENT_ID, {
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
      verbose: false,
    });
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 220, height: 220 } },
        (decodedText) => {
          if (cancelled) return;
          cancelled = true;
          void stopScanner().then(() => lookupScanned(decodedText));
        },
        () => {
          // per-frame decode misses are normal — keep scanning
        }
      )
      .catch((err) => {
        console.error('Camera start failed:', err);
        if (!cancelled) {
          setCameraError(
            'Could not access the camera. Check permissions, or enter the Elec-ID number instead.'
          );
          setScanState('input');
        }
      });

    return () => {
      cancelled = true;
      void stopScanner();
    };
  }, [scanState]);

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

  const handleAddToTeam = async () => {
    if (!result) return;
    const name = result.employee?.name?.trim();
    if (!name) {
      toast({
        title: 'Cannot add worker',
        description: 'This Elec-ID has no worker name attached.',
        variant: 'destructive',
      });
      return;
    }
    const avatarInitials = name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    try {
      await createEmployee.mutateAsync({
        // Not linked to an account yet — they link via invite code later
        user_id: null,
        name,
        role: result.employee?.role || 'Electrician',
        team_role: 'Operative',
        status: 'Active',
        email: result.employee?.email ?? null,
        phone: result.employee?.phone ?? null,
        avatar_initials: avatarInitials,
        photo_url: null,
        // 0 = "no rate set" — the employer sets real pay on the roster;
        // stamping a default here would fabricate a payroll rate
        hourly_rate: 0,
        annual_salary: null,
        pay_type: 'hourly',
        join_date: new Date().toISOString().split('T')[0],
        certifications_count: 0,
        active_jobs_count: 0,
      });
      toast({
        title: 'Worker added',
        // No email is sent on add — the roster row auto-links when they sign
        // in with this email address
        description: result.employee?.email
          ? `${name} added to your team — their account links automatically when they sign in with ${result.employee.email}.`
          : `${name} added to your team. Share your invite code so they can link their account.`,
      });
      onOpenChange(false);
    } catch {
      toast({
        title: 'Could not add worker',
        description: 'Something went wrong adding this worker to your team. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleRescan = () => {
    setScanState('input');
    setResult(null);
    setElecIdInput('');
    setCameraError(null);
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
    <ResponsiveFormModal open={open} onOpenChange={onOpenChange}>
      <ResponsiveFormModalContent className="bg-[hsl(0_0%_8%)] border-white/[0.08]">
        <ResponsiveFormModalHeader>
          <ResponsiveFormModalTitle className="text-white">
            <QrCode className="h-5 w-5 text-elec-yellow" />
            Scan Elec-ID
          </ResponsiveFormModalTitle>
          <p className="text-[12.5px] text-white/70 text-left">
            Scan a worker's QR code or enter their Elec-ID number to check credentials.
          </p>
        </ResponsiveFormModalHeader>

        <ResponsiveFormModalBody className="pb-6">
        <div className="pt-2">
          {scanState === 'input' && (
            <div className="space-y-4">
              <Field label="Elec-ID number">
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g. EM-7K3P4N"
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

              <SecondaryButton onClick={() => setScanState('camera')} fullWidth>
                <Scan className="h-4 w-4 mr-1.5" />
                Scan QR code with camera
              </SecondaryButton>

              {cameraError && (
                <p className="text-[11px] text-red-400 text-center">{cameraError}</p>
              )}
            </div>
          )}

          {scanState === 'camera' && (
            <div className="text-center space-y-4">
              <div
                id={SCANNER_ELEMENT_ID}
                className="w-full max-w-[280px] mx-auto rounded-2xl overflow-hidden bg-[hsl(0_0%_9%)] border border-white/[0.06] [&_video]:rounded-2xl"
              />
              <p className="text-[12px] text-white">
                Point the camera at the worker's Elec-ID QR code.
              </p>
              <SecondaryButton onClick={handleRescan}>Cancel</SecondaryButton>
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
                <Avatar
                  size="lg"
                  photo={result.employee?.photo_url}
                  initials={(result.employee?.name || '??')
                    .trim()
                    .split(/\s+/)
                    .map((p) => p[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
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
                <PrimaryButton
                  onClick={handleAddToTeam}
                  fullWidth
                  disabled={createEmployee.isPending}
                >
                  <UserPlus className="h-4 w-4 mr-1.5" />
                  {createEmployee.isPending ? 'Adding…' : 'Add to my team'}
                </PrimaryButton>
              </div>
            </div>
          )}
        </div>
        </ResponsiveFormModalBody>
      </ResponsiveFormModalContent>
    </ResponsiveFormModal>
  );
};
