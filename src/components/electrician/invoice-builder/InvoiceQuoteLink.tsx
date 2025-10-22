import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle, FileText, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { Quote } from "@/types/quote";
import { Link } from "react-router-dom";

interface InvoiceQuoteLinkProps {
  quote: Quote;
  className?: string;
}

export const InvoiceQuoteLink = ({ quote, className }: InvoiceQuoteLinkProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount);
  };

  const isAccepted = quote.acceptance_status === 'accepted';
  const isDigitalSignature = quote.acceptance_method === 'in_app_signature' || quote.acceptance_method === 'docusign';

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Original Quote
          </CardTitle>
          <Link to={`/electrician/quotes/${quote.id}`}>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Quote
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quote Reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Quote Number</p>
            <p className="font-semibold text-foreground">{quote.quoteNumber}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Quote Date</p>
            <p className="font-medium text-foreground">
              {format(quote.createdAt, 'dd MMM yyyy')}
            </p>
          </div>
        </div>

        {/* Client Acceptance Timeline */}
        {isAccepted && (
          <div className="space-y-3 pb-4 border-b">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <h4 className="font-semibold text-success">Client Accepted Quote</h4>
              {isDigitalSignature && (
                <Badge variant="success" className="ml-auto">
                  Digital Signature
                </Badge>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-7">
              {quote.accepted_at && (
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Accepted On</p>
                    <p className="text-sm font-medium">
                      {format(quote.accepted_at, 'dd MMM yyyy, HH:mm')}
                    </p>
                  </div>
                </div>
              )}
              
              {quote.accepted_by_name && (
                <div className="flex items-start gap-2">
                  <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Accepted By</p>
                    <p className="text-sm font-medium">{quote.accepted_by_name}</p>
                    {quote.accepted_by_email && (
                      <p className="text-xs text-muted-foreground">{quote.accepted_by_email}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {quote.signature_url && (
              <div className="pl-7">
                <p className="text-xs text-muted-foreground mb-2">Client Signature</p>
                <img 
                  src={quote.signature_url} 
                  alt="Client signature" 
                  className="border rounded-lg p-2 bg-background max-w-[200px] h-auto"
                />
              </div>
            )}
          </div>
        )}

        {/* Quote Journey Timeline */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-muted-foreground">Quote Journey</h4>
          <div className="space-y-2 pl-4 border-l-2 border-muted">
            <div className="relative pl-4">
              <div className="absolute left-[-9px] top-1 h-4 w-4 rounded-full bg-primary border-2 border-background" />
              <div>
                <p className="text-sm font-medium">Quote Created</p>
                <p className="text-xs text-muted-foreground">
                  {format(quote.createdAt, 'dd MMM yyyy, HH:mm')}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Total: {formatCurrency(quote.total)}
                </p>
              </div>
            </div>

            {isAccepted && quote.accepted_at && (
              <div className="relative pl-4 pt-3">
                <div className="absolute left-[-9px] top-4 h-4 w-4 rounded-full bg-success border-2 border-background" />
                <div>
                  <p className="text-sm font-medium text-success">Client Accepted</p>
                  <p className="text-xs text-muted-foreground">
                    {format(quote.accepted_at, 'dd MMM yyyy, HH:mm')}
                  </p>
                  {isDigitalSignature && (
                    <Badge variant="success" className="mt-1 text-xs">
                      Digitally Signed
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {quote.work_completion_date && (
              <div className="relative pl-4 pt-3">
                <div className="absolute left-[-9px] top-4 h-4 w-4 rounded-full bg-primary border-2 border-background" />
                <div>
                  <p className="text-sm font-medium">Work Completed</p>
                  <p className="text-xs text-muted-foreground">
                    {format(quote.work_completion_date, 'dd MMM yyyy')}
                  </p>
                </div>
              </div>
            )}

            <div className="relative pl-4 pt-3">
              <div className="absolute left-[-9px] top-4 h-4 w-4 rounded-full bg-primary border-2 border-background" />
              <div>
                <p className="text-sm font-medium text-primary">Invoice Raised</p>
                <p className="text-xs text-muted-foreground">
                  {quote.invoice_date ? format(quote.invoice_date, 'dd MMM yyyy, HH:mm') : 'Today'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Job Details if available */}
        {quote.jobDetails && (
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-2">Job Details</p>
            <div className="space-y-1">
              {quote.jobDetails.title && (
                <p className="text-sm font-medium">{quote.jobDetails.title}</p>
              )}
              {quote.jobDetails.description && (
                <p className="text-sm text-muted-foreground">{quote.jobDetails.description}</p>
              )}
              {quote.jobDetails.location && (
                <p className="text-xs text-muted-foreground">Location: {quote.jobDetails.location}</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
