/**
 * CredentialsSheet
 *
 * Bottom sheet for workers to view their Elec-ID and certifications.
 */

import {
  IdCard,
  Award,
  AlertTriangle,
  CheckCircle,
  X,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useMyCredentials } from '@/hooks/useWorkerSelfService';
import { Link } from 'react-router-dom';

interface CredentialsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CredentialsSheet({ open, onOpenChange }: CredentialsSheetProps) {
  const { data: credentials, isLoading } = useMyCredentials();

  const handleClose = () => {
    onOpenChange(false);
  };

  const getExpiryStatus = (expiryDate: string) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0) {
      return { status: 'expired', label: 'Expired', colour: 'text-red-400 bg-red-500/20' };
    } else if (daysUntilExpiry <= 30) {
      return { status: 'expiring', label: `${daysUntilExpiry}d left`, colour: 'text-amber-400 bg-amber-500/20' };
    } else if (daysUntilExpiry <= 90) {
      return { status: 'warning', label: `${daysUntilExpiry}d`, colour: 'text-yellow-400 bg-yellow-500/20' };
    }
    return { status: 'valid', label: 'Valid', colour: 'text-green-400 bg-green-500/20' };
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden sm:max-w-lg sm:mx-auto">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-white/[0.06] flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="w-10" />
              <SheetTitle className="text-lg font-semibold flex-1 text-center">
                My Credentials
              </SheetTitle>
              <SheetDescription className="sr-only">
                View your Elec-ID and certifications
              </SheetDescription>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-10 w-10 touch-manipulation"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
              </div>
            ) : (
              <>
                {/* Elec-ID Card Summary */}
                <div className="p-4 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-elec-yellow/20">
                      <IdCard className="h-5 w-5 text-elec-yellow" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Elec-ID</p>
                      <p className="text-xs text-white/60">Digital identity card</p>
                    </div>
                    <Badge className={cn(
                      'ml-auto border-0',
                      credentials?.elecId?.verified
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-amber-500/20 text-amber-400'
                    )}>
                      {credentials?.elecId?.verified ? 'Verified' : 'Pending'}
                    </Badge>
                  </div>
                  {credentials?.elecId?.cardNumber && (
                    <p className="text-sm text-white/70 font-mono">
                      ID: {credentials.elecId.cardNumber}
                    </p>
                  )}
                </div>

                {/* Certifications */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-white/80 flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Certifications
                  </h3>

                  {credentials?.certifications?.length === 0 ? (
                    <div className="text-center py-8 px-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <p className="text-white/60 text-sm">No certifications on file</p>
                    </div>
                  ) : (
                    credentials?.certifications?.map((cert) => {
                      const expiry = cert.expiry_date ? getExpiryStatus(cert.expiry_date) : null;
                      return (
                        <div
                          key={cert.id}
                          className="p-4 rounded-xl bg-white/[0.03] border border-white/10"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-white">{cert.name}</p>
                              {cert.issuer && (
                                <p className="text-sm text-white/60">{cert.issuer}</p>
                              )}
                              {cert.certificate_number && (
                                <p className="text-xs text-white/50 font-mono mt-1">
                                  #{cert.certificate_number}
                                </p>
                              )}
                            </div>
                            {expiry && (
                              <Badge className={cn('border-0 flex-shrink-0', expiry.colour)}>
                                {expiry.status === 'expired' && (
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                )}
                                {expiry.status === 'valid' && (
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                )}
                                {expiry.label}
                              </Badge>
                            )}
                          </div>
                          {cert.expiry_date && (
                            <p className="text-xs text-white/40 mt-2">
                              Expires: {new Date(cert.expiry_date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </p>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-white/[0.06] p-4 flex-shrink-0">
            <Link to="/elec-id" onClick={handleClose}>
              <Button
                className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold touch-manipulation"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                View Full Credentials
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
