import { CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";

/**
 * Invoice Payment Success Page
 * Shown to clients after they pay an invoice via Stripe
 * No login required - this is for clients, not ElecMate users
 */
const InvoicePaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const invoiceId = searchParams.get("invoice");
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full border border-green-500/30 bg-elec-gray/70 p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-500/20 p-3">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2 text-foreground">Payment Successful</h1>

        <p className="text-muted-foreground mb-6">
          Thank you for your payment. Your invoice has been marked as paid and the electrician has been notified.
        </p>

        <div className="bg-card/50 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground">
            A confirmation email has been sent to you with the payment details.
          </p>
        </div>

        <p className="text-xs text-muted-foreground">
          You can safely close this page.
        </p>
      </Card>
    </div>
  );
};

export default InvoicePaymentSuccess;
