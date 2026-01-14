import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, CheckCircle, X, FileSignature, PenTool, AlertTriangle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import SignaturePad from "@/components/forms/SignaturePad";

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
  user_id: string;
  access_token: string;
}

const PublicSignatureView = () => {
  const { token } = useParams<{ token: string }>();
  const [request, setRequest] = useState<SignatureRequestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [signerName, setSignerName] = useState("");
  const [notes, setNotes] = useState("");
  const [signatureData, setSignatureData] = useState<string>("");
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

      const { data, error } = await supabase
        .from("signature_requests")
        .select("*")
        .eq("access_token", token)
        .single();

      if (error || !data) {
        throw new Error("Signature request not found or expired");
      }

      setRequest(data as SignatureRequestData);
      setSignerName(data.signer_name);

      // Update status to Viewed if still Pending or Sent
      if (["Pending", "Sent"].includes(data.status)) {
        await supabase
          .from("signature_requests")
          .update({ status: "Viewed", updated_at: new Date().toISOString() })
          .eq("id", data.id);
      }

    } catch (error) {
      console.error("Error loading signature request:", error);
      toast({
        title: "Error",
        description: "Signature request not found or has expired",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSign = async () => {
    if (!request || !signerName || !signatureData) {
      toast({
        title: "Missing Information",
        description: "Please enter your name and provide your signature",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    try {
      // Upload signature to storage
      const signatureBlob = dataURLtoBlob(signatureData);
      const signatureFileName = `signatures/${request.user_id}/sig-${request.id}-${Date.now()}.png`;

      const { error: uploadError } = await supabase.storage
        .from("visual-uploads")
        .upload(signatureFileName, signatureBlob, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("visual-uploads")
        .getPublicUrl(signatureFileName);

      // Update signature request
      const { error: updateError } = await supabase
        .from("signature_requests")
        .update({
          status: "Signed",
          signed_at: new Date().toISOString(),
          signature_url: publicUrl,
          ip_address: await getUserIP(),
          message: notes.trim() || request.message,
          updated_at: new Date().toISOString()
        })
        .eq("id", request.id);

      if (updateError) throw updateError;

      toast({
        title: "Document Signed",
        description: "Thank you. Your signature has been recorded.",
      });

      // Reload to show signed state
      loadRequest();

    } catch (error) {
      console.error("Error signing document:", error);
      toast({
        title: "Error",
        description: "Failed to submit signature. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDecline = async () => {
    if (!request) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("signature_requests")
        .update({
          status: "Declined",
          ip_address: await getUserIP(),
          message: notes.trim() || null,
          updated_at: new Date().toISOString()
        })
        .eq("id", request.id);

      if (error) throw error;

      toast({
        title: "Request Declined",
      });

      loadRequest();

    } catch (error) {
      console.error("Error declining request:", error);
      toast({
        title: "Error",
        description: "Failed to decline. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const dataURLtoBlob = (dataURL: string) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
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
            <p className="text-muted-foreground">This signature request may have expired or been removed.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isSigned = request.status === "Signed";
  const isDeclined = request.status === "Declined";
  const isExpired = request.status === "Expired" ||
    (request.expires_at && new Date(request.expires_at) < new Date());
  const canSign = !isSigned && !isDeclined && !isExpired;

  return (
    <div className="min-h-screen bg-elec-navy">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-elec-gray/95 backdrop-blur-sm rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-elec-blue to-elec-blue/80 text-foreground p-6">
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
                    <CheckCircle className="h-4 w-4 mr-1" />Signed
                  </Badge>
                )}
                {isDeclined && (
                  <Badge variant="destructive">
                    <X className="h-4 w-4 mr-1" />Declined
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
                  <CardDescription>
                    Please review and sign below to confirm
                  </CardDescription>
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
                    <p className="text-xs text-muted-foreground mt-1">
                      Draw your signature above
                    </p>
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
              <Card className={isSigned ? "border-green-500" : "border-red-500"}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    {isSigned ? (
                      <>
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-green-600 mb-2">Document Signed</h3>
                        <p className="text-sm text-muted-foreground">
                          Signed on {request.signed_at ? new Date(request.signed_at).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : 'N/A'}
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
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">Request Expired</h3>
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
