import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  FileText,
  CheckCircle,
  X,
  FileSignature,
  PenTool,
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import SignaturePad from '@/components/forms/SignaturePad';

interface SignatureDocumentLine {
  description?: string;
  quantity?: number;
  unit?: string;
  unitPrice?: number;
  total?: number;
}

// Server-built summary of the document being signed. Returned by the extended
// get_signature_request_by_token RPC — absent until that migration lands, so
// every render path must degrade gracefully without it.
interface SignatureDocument {
  kind: 'quote' | 'invoice' | 'contract';
  number?: string | null;
  client?: string | null;
  description?: string | null;
  line_items?: SignatureDocumentLine[] | null;
  subtotal?: number | null;
  vat_rate?: number | null;
  vat_amount?: number | null;
  reverse_charge?: boolean | null;
  cis_amount?: number | null;
  total?: number | null;
  valid_until?: string | null;
  due_date?: string | null;
  // Contract fields
  title?: string | null;
  party_name?: string | null;
  content_excerpt?: string | null;
  start_date?: string | null;
  end_date?: string | null;
}

interface SignatureRequestData {
  id: string;
  document_title: string;
  document_type: string | null;
  signer_name: string;
  signer_email: string | null;
  message: string | null;
  status: string;
  signed_at: string | null;
  expires_at: string | null;
  // Optional extras from the extended RPC (graceful when absent)
  document?: SignatureDocument | null;
  company_name?: string | null;
  logo_url?: string | null;
}

const PublicSignatureView = () => {
  const { token } = useParams<{ token: string }>();
  const [request, setRequest] = useState<SignatureRequestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [signerName, setSignerName] = useState('');
  const [notes, setNotes] = useState('');
  const [signatureData, setSignatureData] = useState<string>('');
  const signaturePadRef = useRef<any>(null);

  useEffect(() => {
    if (token) {
      loadRequest();
    }
  }, [token]);

  const loadRequest = async () => {
    if (!token) return;

    try {
      setLoading(true);

      // Token-keyed definer RPC (no anon table access; stamps Viewed itself)
      const { data, error } = await supabase.rpc('get_signature_request_by_token', {
        p_token: token,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const row = data as any;
      if (error || !row || row.error) {
        throw new Error('Signature request not found or expired');
      }

      setRequest(row as SignatureRequestData);
      setSignerName(row.signer_name);
    } catch (error) {
      console.error('Error loading signature request:', error);
      toast({
        title: 'Error',
        description: 'Signature request not found or has expired',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSign = async () => {
    if (!request || !signerName || !signatureData) {
      toast({
        title: 'Missing Information',
        description: 'Please enter your name and provide your signature',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      // Signature travels as a data URL inside the token-keyed RPC — anon
      // storage uploads could never pass the own-folder policy
      const baseArgs = {
        p_token: token!,
        p_signature_url: signatureData,
        p_ip: await getUserIP(),
        p_notes: notes.trim() || null,
      };
      // Cast: p_signer_name ships in a separate RPC migration and isn't in the
      // generated types yet.
      const rpc = supabase.rpc as unknown as (
        fn: string,
        args: Record<string, unknown>
      ) => Promise<{ data: unknown; error: { code?: string; message?: string } | null }>;

      // Record the typed name alongside the drawn signature; if the RPC
      // migration hasn't landed yet (unknown-parameter error), retry without.
      let { data: signed, error: updateError } = await rpc('sign_signature_request', {
        ...baseArgs,
        p_signer_name: signerName.trim(),
      });
      if (
        updateError &&
        (updateError.code === 'PGRST202' ||
          updateError.code === 'PGRST203' ||
          /p_signer_name/i.test(updateError.message || ''))
      ) {
        ({ data: signed, error: updateError } = await rpc('sign_signature_request', baseArgs));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (updateError || (signed as any)?.error) {
        throw new Error('Could not record your signature');
      }

      toast({
        title: 'Document Signed',
        description: 'Thank you. Your signature has been recorded.',
      });

      // Reload to show signed state
      loadRequest();
    } catch (error) {
      console.error('Error signing document:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit signature. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDecline = async () => {
    if (!request) return;

    setSubmitting(true);
    try {
      // Anon signers can't UPDATE signature_requests directly (RLS) — go through
      // the token-keyed SECURITY DEFINER RPC, and only report success on a real write.
      // Cast: the RPC is added by migration 01 and isn't in the generated types yet.
      const { data: declined, error } = await (
        supabase.rpc as unknown as (
          fn: string,
          args: Record<string, unknown>
        ) => Promise<{ data: { error?: string } | null; error: unknown }>
      )('decline_signature_request', {
        p_token: token,
        p_ip: await getUserIP(),
        p_notes: notes.trim() || null,
      });

      if (error) throw error;
      if (declined?.error) throw new Error(declined.error);

      toast({
        title: 'Request Declined',
      });

      loadRequest();
    } catch (error) {
      console.error('Error declining request:', error);
      toast({
        title: 'Error',
        description: 'Failed to decline. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };



  const getUserIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'unknown';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-elec-navy flex items-center justify-center">
        <div className="text-center text-elec-light">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-elec-yellow" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-elec-navy flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h1 className="text-xl font-bold mb-2">Request Not Found</h1>
            <p className="text-muted-foreground">
              This signature request may have expired or been removed.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const doc = request.document || null;
  const docLines: SignatureDocumentLine[] = Array.isArray(doc?.line_items)
    ? doc!.line_items!
    : [];
  const money = (v?: number | null) =>
    `£${Number(v || 0).toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const isSigned = request.status === 'Signed';
  const isDeclined = request.status === 'Declined';
  const isExpired =
    request.status === 'Expired' ||
    (request.expires_at && new Date(request.expires_at) < new Date());
  const canSign = !isSigned && !isDeclined && !isExpired;

  return (
    <div className="min-h-screen bg-elec-navy">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-elec-gray/95 backdrop-blur-sm rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-elec-blue to-elec-blue/80 text-foreground p-6">
            {(request.company_name || request.logo_url) && (
              <div className="flex items-center gap-3 mb-4">
                {request.logo_url && (
                  <img
                    src={request.logo_url}
                    alt={request.company_name || 'Company logo'}
                    className="h-10 w-auto max-w-[140px] object-contain rounded-md bg-white/90 p-1"
                  />
                )}
                {request.company_name && (
                  <p className="font-semibold text-sm text-blue-50">{request.company_name}</p>
                )}
              </div>
            )}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">{request.document_title}</h1>
                {request.document_type && (
                  <p className="text-blue-100 text-sm mt-1">{request.document_type}</p>
                )}
              </div>
              <div className="text-right">
                {isSigned && (
                  <Badge className="bg-green-500 hover:bg-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Signed
                  </Badge>
                )}
                {isDeclined && (
                  <Badge variant="destructive">
                    <X className="h-4 w-4 mr-1" />
                    Declined
                  </Badge>
                )}
                {isExpired && !isSigned && !isDeclined && (
                  <Badge variant="secondary">Expired</Badge>
                )}
                {canSign && (
                  <Badge variant="outline" className="border-blue-200 text-blue-100">
                    Awaiting Signature
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Document being signed — server-built summary from the extended
                token RPC. Older payloads have no `document`; skip gracefully. */}
            {doc && (doc.kind === 'quote' || doc.kind === 'invoice') && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <FileText className="h-5 w-5 mr-2" />
                    {doc.kind === 'quote' ? 'Quote' : 'Invoice'}
                    {doc.number ? ` ${doc.number}` : ''}
                  </CardTitle>
                  {doc.client && <CardDescription>Prepared for {doc.client}</CardDescription>}
                </CardHeader>
                <CardContent className="space-y-4">
                  {doc.description && (
                    <p className="text-sm text-muted-foreground">{doc.description}</p>
                  )}
                  {docLines.length > 0 && (
                    <div className="divide-y divide-border">
                      {docLines.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center py-2.5 gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">{item.description}</p>
                            {item.quantity != null && (
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {item.quantity}
                                {item.unit ? ` ${item.unit}` : ''}
                                {item.unitPrice != null ? ` × ${money(item.unitPrice)}` : ''}
                              </p>
                            )}
                          </div>
                          <span className="text-sm font-semibold tabular-nums shrink-0">
                            {money(item.total)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="rounded-lg bg-muted/50 p-3 space-y-1.5">
                    {doc.subtotal != null && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span className="tabular-nums">{money(doc.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {doc.reverse_charge
                              ? 'VAT — reverse charge'
                              : `VAT @ ${Number(doc.vat_rate ?? 20)}%`}
                          </span>
                          <span className="tabular-nums">{money(doc.vat_amount)}</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between items-center pt-1">
                      <span className="font-medium">Total</span>
                      <span className="text-lg font-bold tabular-nums">{money(doc.total)}</span>
                    </div>
                    {Number(doc.cis_amount) > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Less CIS deduction</span>
                        <span className="tabular-nums">−{money(doc.cis_amount)}</span>
                      </div>
                    )}
                  </div>
                  {(doc.valid_until || doc.due_date) && (
                    <p className="text-xs text-muted-foreground">
                      {doc.kind === 'quote' && doc.valid_until
                        ? `Valid until ${new Date(doc.valid_until).toLocaleDateString('en-GB')}`
                        : doc.due_date
                          ? `Payment due ${new Date(doc.due_date).toLocaleDateString('en-GB')}`
                          : ''}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {doc && doc.kind === 'contract' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <FileText className="h-5 w-5 mr-2" />
                    {doc.title || request.document_title}
                  </CardTitle>
                  {doc.party_name && <CardDescription>Party: {doc.party_name}</CardDescription>}
                </CardHeader>
                <CardContent className="space-y-3">
                  {doc.content_excerpt && (
                    <div className="max-h-72 overflow-y-auto rounded-lg bg-muted/50 p-4">
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">
                        {doc.content_excerpt}
                      </p>
                    </div>
                  )}
                  {(doc.start_date || doc.end_date) && (
                    <p className="text-xs text-muted-foreground">
                      {doc.start_date &&
                        `Starts ${new Date(doc.start_date).toLocaleDateString('en-GB')}`}
                      {doc.start_date && doc.end_date && ' · '}
                      {doc.end_date &&
                        `Ends ${new Date(doc.end_date).toLocaleDateString('en-GB')}`}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Message from sender */}
            {request.message && canSign && (
              <Card>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground italic">"{request.message}"</p>
                </CardContent>
              </Card>
            )}

            {/* Signature Section */}
            {canSign && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <FileSignature className="h-5 w-5 mr-2" />
                    Sign Document
                  </CardTitle>
                  <CardDescription>Please review and sign below to confirm</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="signerName">Full Name</Label>
                    <Input
                      id="signerName"
                      value={signerName}
                      onChange={(e) => setSignerName(e.target.value)}
                      placeholder="Enter your full name"
                      className="h-11 touch-manipulation"
                    />
                  </div>

                  <div>
                    <Label>Digital Signature</Label>
                    <div className="mt-2">
                      <SignaturePad
                        ref={signaturePadRef}
                        onSignatureChange={setSignatureData}
                        className="w-full"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Draw your signature above</p>
                  </div>

                  <div>
                    <Label htmlFor="notes">Notes (optional)</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any comments..."
                      className="resize-none touch-manipulation"
                      rows={2}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleSign}
                      disabled={submitting || !signerName || !signatureData}
                      className="flex-1 h-12 bg-green-600 hover:bg-green-700 touch-manipulation"
                    >
                      {submitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Sign Document
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleDecline}
                      disabled={submitting}
                      variant="destructive"
                      className="flex-1 h-12 touch-manipulation"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Decline
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Signed/Declined Status */}
            {(isSigned || isDeclined) && (
              <Card className={isSigned ? 'border-green-500' : 'border-red-500'}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    {isSigned ? (
                      <>
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-green-600 mb-2">Document Signed</h3>
                        <p className="text-sm text-muted-foreground">
                          Signed on{' '}
                          {request.signed_at
                            ? new Date(request.signed_at).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : 'N/A'}
                        </p>
                      </>
                    ) : (
                      <>
                        <X className="h-12 w-12 text-red-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-red-600 mb-2">Request Declined</h3>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Expired Status */}
            {isExpired && !isSigned && !isDeclined && (
              <Card className="border-muted">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">
                      Request Expired
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      This signature request is no longer valid.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 text-center">
            <p className="text-xs text-muted-foreground">
              Powered by Elec-Mate • Secure Digital Signatures
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicSignatureView;
