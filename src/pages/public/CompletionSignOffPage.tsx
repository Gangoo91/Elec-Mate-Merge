import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  Check,
  Loader2,
  AlertTriangle,
  MapPin,
  Image,
  Download,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import SignaturePad from '@/components/forms/SignaturePad';
import { downloadCompletionCertificatePDF } from '@/utils/completion-certificate-pdf';

interface CompletionData {
  id: string;
  title: string;
  scope_summary: {
    propertyAddress?: string;
    rooms?: Array<{
      roomName: string;
      items: Array<{ itemDescription: string; quantity: number; unit: string }>;
    }>;
  };
  before_photo_urls: string[];
  after_photo_urls: string[];
  company_name: string | null;
  company_logo_url: string | null;
  requires_signature: boolean;
  status: string;
  client_name: string | null;
  signature_data: string | null;
  signed_at: string | null;
}

type PageState = 'loading' | 'viewing' | 'signed' | 'error' | 'expired';

function isSignatureMeaningful(dataUrl: string): boolean {
  // A blank white canvas with just the guide line produces a known small data URL.
  // A meaningful signature has significantly more pixel data.
  // Base64 overhead for a 160px canvas with only white + guide line is ~2-4KB.
  // Any real signature produces ~8KB+ of data.
  return dataUrl.length > 6000;
}

export default function CompletionSignOffPage() {
  const { token } = useParams<{ token: string }>();
  const [pageState, setPageState] = useState<PageState>('loading');
  const [completion, setCompletion] = useState<CompletionData | null>(null);
  const [error, setError] = useState('');
  const [clientName, setClientName] = useState('');
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const loadCompletion = async () => {
      if (!token) {
        setError('Invalid link');
        setPageState('error');
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from('completion_signoffs')
          .select('*')
          .eq('share_token', token)
          .single();

        if (fetchError || !data) {
          setError('Completion record not found');
          setPageState('error');
          return;
        }

        if (data.status === 'expired' || data.status === 'revoked') {
          setPageState('expired');
          return;
        }

        if (data.status === 'signed') {
          setCompletion(data);
          setPageState('signed');
          return;
        }

        // Increment view count
        await supabase
          .from('completion_signoffs')
          .update({
            view_count: (data.view_count || 0) + 1,
            last_viewed_at: new Date().toISOString(),
          })
          .eq('id', data.id);

        setCompletion(data);
        setClientName(data.client_name || '');
        setPageState('viewing');
      } catch {
        setError('Failed to load completion');
        setPageState('error');
      }
    };

    loadCompletion();
  }, [token]);

  const handleSubmitSignature = useCallback(async () => {
    if (!completion || !clientName.trim() || !signatureData) return;

    if (!isSignatureMeaningful(signatureData)) {
      setError('Please provide a clear signature');
      return;
    }

    setIsSubmitting(true);

    try {
      const signedAt = new Date().toISOString();
      const { error: updateError } = await supabase
        .from('completion_signoffs')
        .update({
          client_name: clientName.trim(),
          signature_data: signatureData,
          signed_at: signedAt,
          status: 'signed',
        })
        .eq('id', completion.id);

      if (updateError) throw updateError;

      setCompletion((prev) =>
        prev
          ? {
              ...prev,
              client_name: clientName.trim(),
              signature_data: signatureData,
              signed_at: signedAt,
              status: 'signed',
            }
          : prev
      );
      setPageState('signed');
    } catch {
      setError('Failed to save signature');
    } finally {
      setIsSubmitting(false);
    }
  }, [completion, clientName, signatureData]);

  const handleDownloadCertificate = useCallback(async () => {
    if (!completion) return;
    setIsDownloading(true);
    try {
      await downloadCompletionCertificatePDF({
        companyName: completion.company_name || undefined,
        companyLogoUrl: completion.company_logo_url || undefined,
        propertyAddress: completion.scope_summary?.propertyAddress,
        clientName: completion.client_name || undefined,
        rooms: completion.scope_summary?.rooms,
        beforePhotoUrls: completion.before_photo_urls,
        afterPhotoUrls: completion.after_photo_urls,
        signatureData: completion.signature_data || undefined,
        signedAt: completion.signed_at || undefined,
        referenceId: completion.id.slice(0, 8).toUpperCase(),
      });
    } catch {
      // PDF generation failed silently — not critical
    } finally {
      setIsDownloading(false);
    }
  }, [completion]);

  if (pageState === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-elec-yellow animate-spin" />
      </div>
    );
  }

  if (pageState === 'error') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <AlertTriangle className="h-12 w-12 text-red-400 mb-4" />
        <h1 className="text-xl font-bold text-white mb-2">Not Found</h1>
        <p className="text-sm text-white">{error}</p>
      </div>
    );
  }

  if (pageState === 'expired') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <AlertTriangle className="h-12 w-12 text-amber-400 mb-4" />
        <h1 className="text-xl font-bold text-white mb-2">Link Expired</h1>
        <p className="text-sm text-white">
          This completion link has expired. Please contact your electrician.
        </p>
      </div>
    );
  }

  if (pageState === 'signed') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mb-4"
        >
          <Check className="h-8 w-8 text-white" />
        </motion.div>
        <h1 className="text-xl font-bold text-white mb-2">Work Signed Off</h1>
        <p className="text-sm text-white mb-6">
          Thank you. The completed work has been signed off and recorded.
        </p>

        <Button
          onClick={handleDownloadCertificate}
          disabled={isDownloading}
          className="h-12 px-6 text-base font-semibold touch-manipulation bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isDownloading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="h-5 w-5 mr-2" />
              Download Certificate
            </>
          )}
        </Button>

        {/* Footer */}
        <div className="mt-8 flex items-center gap-1.5">
          <Zap className="h-3 w-3 text-elec-yellow" />
          <span className="text-xs text-white">Powered by Elec-Mate</span>
        </div>
      </div>
    );
  }

  const scope = completion?.scope_summary;
  const beforePhotos = completion?.before_photo_urls || [];
  const afterPhotos = completion?.after_photo_urls || [];
  const hasPairedPhotos = beforePhotos.length > 0 && afterPhotos.length > 0;
  const pairedCount = Math.min(beforePhotos.length, afterPhotos.length);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/[0.02] backdrop-blur-xl border-b border-white/[0.06]">
        <div className="flex items-center gap-3 px-4 h-14">
          {completion?.company_logo_url ? (
            <img
              src={completion.company_logo_url}
              alt=""
              className="w-9 h-9 rounded-xl object-contain bg-white"
            />
          ) : (
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-semibold text-white truncate">
              {completion?.title || 'Work Completion'}
            </h1>
            {completion?.company_name && (
              <p className="text-[11px] text-white">{completion.company_name}</p>
            )}
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4 pb-32">
        {/* Property */}
        {scope?.propertyAddress && (
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-semibold text-white">{scope.propertyAddress}</span>
            </div>
          </div>
        )}

        {/* Scope of Works — table format */}
        {scope?.rooms && scope.rooms.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              Scope of Works
            </h3>
            <div className="rounded-xl overflow-hidden border border-white/[0.06]">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/[0.06]">
                    <th className="text-left text-xs font-semibold text-white px-3 py-2">Room</th>
                    <th className="text-left text-xs font-semibold text-white px-3 py-2">Item</th>
                    <th className="text-right text-xs font-semibold text-white px-3 py-2">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {scope.rooms.flatMap((room, i) =>
                    room.items.map((item, j) => (
                      <tr
                        key={`${i}-${j}`}
                        className={j === 0 ? 'border-t border-white/[0.06]' : ''}
                      >
                        <td className="text-xs text-white px-3 py-1.5">
                          {j === 0 ? room.roomName : ''}
                        </td>
                        <td className="text-xs text-white px-3 py-1.5">{item.itemDescription}</td>
                        <td className="text-xs text-white px-3 py-1.5 text-right">
                          {item.quantity} {item.unit}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Before/After Photos — paired comparison when possible */}
        {hasPairedPhotos ? (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Before & After Comparison
            </h3>

            {/* Paired photos */}
            {Array.from({ length: pairedCount }).map((_, i) => (
              <div key={i} className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  {i === 0 && (
                    <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider">
                      Before
                    </span>
                  )}
                  <div className="aspect-square rounded-xl overflow-hidden bg-white/[0.03] border border-blue-500/20">
                    <img
                      src={beforePhotos[i]}
                      alt={`Before ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  {i === 0 && (
                    <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                      After
                    </span>
                  )}
                  <div className="aspect-square rounded-xl overflow-hidden bg-white/[0.03] border border-emerald-500/20">
                    <img
                      src={afterPhotos[i]}
                      alt={`After ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Remaining unpaired before photos */}
            {beforePhotos.length > pairedCount && (
              <div className="space-y-1 pt-2">
                <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider">
                  Additional Before Photos
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {beforePhotos.slice(pairedCount).map((url, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl overflow-hidden bg-white/[0.03] border border-blue-500/20"
                    >
                      <img
                        src={url}
                        alt={`Before ${pairedCount + i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Remaining unpaired after photos */}
            {afterPhotos.length > pairedCount && (
              <div className="space-y-1 pt-2">
                <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                  Additional After Photos
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {afterPhotos.slice(pairedCount).map((url, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl overflow-hidden bg-white/[0.03] border border-emerald-500/20"
                    >
                      <img
                        src={url}
                        alt={`After ${pairedCount + i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Separate grids if no pairing possible */}
            {beforePhotos.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Image className="h-4 w-4 text-blue-400" />
                  Before Photos
                  <span className="ml-auto text-[10px] font-medium text-white bg-blue-500/20 px-2 py-0.5 rounded-full">
                    {beforePhotos.length}
                  </span>
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {beforePhotos.map((url, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.06]"
                    >
                      <img
                        src={url}
                        alt={`Before ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {afterPhotos.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Image className="h-4 w-4 text-emerald-400" />
                  After Photos
                  <span className="ml-auto text-[10px] font-medium text-white bg-emerald-500/20 px-2 py-0.5 rounded-full">
                    {afterPhotos.length}
                  </span>
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {afterPhotos.map((url, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.06]"
                    >
                      <img
                        src={url}
                        alt={`After ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Signature section */}
        {completion?.requires_signature && pageState === 'viewing' && (
          <div className="space-y-4 pt-4 border-t border-white/[0.06] pb-8">
            <div className="space-y-1">
              <label className="text-xs font-medium text-white">Your Name *</label>
              <Input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Enter your full name"
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-white">Signature *</label>
              <SignaturePad onSignatureChange={(data) => setSignatureData(data)} />
              {signatureData && !isSignatureMeaningful(signatureData) && (
                <p className="text-xs text-amber-400 mt-1">
                  Please draw a clear signature — a single dot or tap is not sufficient
                </p>
              )}
            </div>

            <Button
              onClick={handleSubmitSignature}
              disabled={
                !clientName.trim() ||
                !signatureData ||
                !isSignatureMeaningful(signatureData || '') ||
                isSubmitting
              }
              className="w-full h-12 text-base font-semibold touch-manipulation bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Signing...
                </>
              ) : (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  Confirm & Sign Off
                </>
              )}
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 py-2 bg-background/80 backdrop-blur-sm border-t border-white/[0.06] flex items-center justify-center gap-1.5">
        <Zap className="h-3 w-3 text-elec-yellow" />
        <span className="text-[10px] text-white">Powered by Elec-Mate</span>
      </div>
    </div>
  );
}
