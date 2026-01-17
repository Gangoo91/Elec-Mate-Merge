import { useEffect, useState } from "react";
import { CheckCircle, Mail, Phone, FileText, Calendar, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Confetti } from "@/components/ui/confetti";
import { supabase } from "@/integrations/supabase/client";

interface InvoiceData {
  invoice_number: string;
  invoice_total: number;
  invoice_status: string;
  invoice_paid_at: string | null;
  company_name: string | null;
  company_email: string | null;
  company_phone: string | null;
  client_name: string | null;
}

/**
 * Invoice Payment Success Page
 * Shown to clients after they pay an invoice via Stripe
 * No login required - this is for clients, not ElecMate users
 */
const InvoicePaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const invoiceId = searchParams.get("invoice");
  const sessionId = searchParams.get("session_id");

  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      if (!invoiceId && !sessionId) {
        setLoading(false);
        setShowConfetti(true);
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('get-invoice-public', {
          body: { invoice_id: invoiceId, session_id: sessionId }
        });

        if (error) {
          console.error('Error fetching invoice:', error);
        } else if (data?.data) {
          setInvoiceData(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch invoice data:', err);
      } finally {
        setLoading(false);
        // Trigger confetti after data loads
        setTimeout(() => setShowConfetti(true), 300);
      }
    };

    fetchInvoiceData();
  }, [invoiceId, sessionId]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Just now';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const successIconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.1,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-500/20" />
          <div className="h-6 w-48 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden">
      <Confetti active={showConfetti} duration={4000} particleCount={60} />

      <motion.div
        className="max-w-md w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Success Icon with Glow */}
        <motion.div
          className="flex justify-center mb-6"
          variants={successIconVariants}
        >
          <div className="relative">
            {/* Pulsing glow ring */}
            <div className="absolute inset-0 rounded-full bg-green-500/30 animate-ping" />
            <div className="absolute -inset-2 rounded-full bg-green-500/20 blur-md" />
            <div className="relative rounded-full bg-green-500/20 p-4 border-2 border-green-500/50">
              <CheckCircle className="h-14 w-14 text-green-500" strokeWidth={2.5} />
            </div>
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div variants={itemVariants}>
          <Card className="border border-green-500/30 bg-card/95 backdrop-blur-lg p-6 sm:p-8">
            {/* Header */}
            <motion.div className="text-center mb-6" variants={itemVariants}>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Payment Successful
              </h1>
              {invoiceData?.client_name && (
                <p className="text-muted-foreground">
                  Thank you, {invoiceData.client_name}!
                </p>
              )}
            </motion.div>

            {/* Amount Display */}
            {invoiceData && (
              <motion.div
                className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-6 text-center"
                variants={itemVariants}
              >
                <p className="text-sm text-green-400 mb-1">Amount Paid</p>
                <p className="text-4xl sm:text-5xl font-bold text-green-400">
                  {formatCurrency(invoiceData.invoice_total)}
                </p>
              </motion.div>
            )}

            {/* Invoice Details Card */}
            {invoiceData && (
              <motion.div
                className="bg-muted/50 rounded-xl p-4 mb-6 space-y-3"
                variants={itemVariants}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">Invoice</span>
                  </div>
                  <span className="font-semibold text-foreground">
                    {invoiceData.invoice_number}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Paid</span>
                  </div>
                  <span className="text-sm text-foreground">
                    {formatDate(invoiceData.invoice_paid_at)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    Paid
                  </span>
                </div>
              </motion.div>
            )}

            {/* Company Contact Section */}
            {invoiceData?.company_name && (
              <motion.div
                className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6"
                variants={itemVariants}
              >
                <p className="text-sm text-yellow-400 mb-3 font-medium">
                  Questions? Contact:
                </p>
                <p className="font-semibold text-foreground mb-2">
                  {invoiceData.company_name}
                </p>

                <div className="space-y-2">
                  {invoiceData.company_phone && (
                    <a
                      href={`tel:${invoiceData.company_phone}`}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors touch-manipulation py-1"
                    >
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{invoiceData.company_phone}</span>
                    </a>
                  )}
                  {invoiceData.company_email && (
                    <a
                      href={`mailto:${invoiceData.company_email}`}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors touch-manipulation py-1"
                    >
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{invoiceData.company_email}</span>
                    </a>
                  )}
                </div>
              </motion.div>
            )}

            {/* Confirmation Email Note */}
            <motion.div
              className="bg-muted/30 rounded-lg p-4 text-center mb-6"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <p className="text-sm">
                  A confirmation email has been sent to you.
                </p>
              </div>
            </motion.div>

            {/* Close Message */}
            <motion.p
              className="text-xs text-center text-muted-foreground"
              variants={itemVariants}
            >
              You can safely close this page.
            </motion.p>
          </Card>
        </motion.div>

        {/* Fallback UI (no invoice data) */}
        {!invoiceData && !loading && (
          <motion.div variants={itemVariants}>
            <Card className="border border-green-500/30 bg-card/95 backdrop-blur-lg p-6 sm:p-8 text-center">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Payment Successful
              </h1>
              <p className="text-muted-foreground mb-6">
                Thank you for your payment. Your invoice has been marked as paid and the electrician has been notified.
              </p>
              <div className="bg-muted/30 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <p className="text-sm">
                    A confirmation email has been sent to you.
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                You can safely close this page.
              </p>
            </Card>
          </motion.div>
        )}

        {/* Powered by ElecMate Footer */}
        <motion.div
          className="mt-6 text-center"
          variants={itemVariants}
        >
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">
              Powered by <span className="text-yellow-500">ElecMate</span>
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InvoicePaymentSuccess;
