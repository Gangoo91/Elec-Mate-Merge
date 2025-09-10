import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Mail, FileSignature, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Quote } from "@/types/quote";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface QuoteActionsStepProps {
  quote: Quote;
  onQuoteUpdate?: (updatedQuote: Quote) => void;
}

const QuoteActionsStep = ({ quote, onQuoteUpdate }: QuoteActionsStepProps) => {
  const [loading, setLoading] = useState(false);
  const [publicLink, setPublicLink] = useState<string>("");

  const createPublicLink = async () => {
    setLoading(true);
    try {
      // Create or get existing quote view
      const { data: existingView } = await supabase
        .from("quote_views")
        .select("public_token")
        .eq("quote_id", quote.id)
        .eq("is_active", true)
        .single();

      let token = existingView?.public_token;
      
      if (!token) {
        const { data: newView, error } = await supabase
          .from("quote_views")
          .insert({
            quote_id: quote.id,
            public_token: crypto.randomUUID()
          })
          .select("public_token")
          .single();

        if (error) throw error;
        token = newView.public_token;
      }

      const link = `${window.location.origin}/quote/${token}`;
      setPublicLink(link);
      
      await navigator.clipboard.writeText(link);
      toast({
        title: "Public link copied",
        description: "The shareable quote link has been copied to your clipboard",
        variant: "success"
      });
    } catch (error) {
      console.error("Error creating public link:", error);
      toast({
        title: "Error",
        description: "Failed to create public link",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const sendViaDocuSign = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("docusign-create-envelope", {
        body: {
          quoteId: quote.id,
          clientEmail: quote.client.email,
          clientName: quote.client.name
        }
      });

      if (error) throw error;

      toast({
        title: "Quote sent via DocuSign",
        description: "Your client will receive an email to review and sign the quote",
        variant: "success"
      });

      if (onQuoteUpdate) {
        onQuoteUpdate({ ...quote, status: "sent" });
      }
    } catch (error) {
      console.error("Error sending via DocuSign:", error);
      toast({
        title: "Error",
        description: "Failed to send quote via DocuSign",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getAcceptanceStatusBadge = () => {
    switch (quote.acceptance_status || "pending") {
      case "accepted":
        return <Badge className="bg-elec-green/20 text-elec-green border-elec-green/30"><CheckCircle className="h-3 w-3 mr-1" />Accepted</Badge>;
      case "pending":
        return <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Quote Actions
            {getAcceptanceStatusBadge()}
          </CardTitle>
          <CardDescription>
            Share your quote with clients and collect signatures
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <Button
              onClick={createPublicLink}
              disabled={loading}
              variant="outline"
              className="w-full justify-start"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Public Link
            </Button>

            <Button
              onClick={sendViaDocuSign}
              disabled={loading}
              className="w-full justify-start bg-elec-blue hover:bg-elec-blue/90"
            >
              <Mail className="h-4 w-4 mr-2" />
              Send via DocuSign
            </Button>

            <Button
              disabled={!publicLink}
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open(`/quote/${publicLink.split('/').pop()}`, '_blank')}
            >
              <FileSignature className="h-4 w-4 mr-2" />
              Preview Public Quote
            </Button>
          </div>

          {quote.accepted_at && (
            <div className="mt-6 p-4 border border-elec-green/30 bg-elec-green/10 rounded-lg">
              <h4 className="font-medium text-elec-green mb-2">Quote Accepted</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>Accepted by:</strong> {quote.accepted_by_name}</p>
                <p><strong>Email:</strong> {quote.accepted_by_email}</p>
                <p><strong>Date:</strong> {new Date(quote.accepted_at).toLocaleDateString()}</p>
                <p><strong>Method:</strong> {quote.acceptance_method}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuoteActionsStep;