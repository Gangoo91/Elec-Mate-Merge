import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Eye, Receipt, ArrowRight, User } from 'lucide-react';
import { Quote } from '@/types/quote';
import { format } from 'date-fns';
import { QuoteSendDropdown } from '@/components/electrician/quote-builder/QuoteSendDropdown';

interface QuoteTableViewProps {
  quotes: Quote[];
  loadingAction: string;
  handleRegeneratePDF: (quote: Quote) => void;
  handleStatusUpdate: (quoteId: string, status: Quote['status'], tags?: Quote['tags']) => void;
  onNavigate: (path: string) => void;
  hasInvoiceRaised: (quote: Quote) => boolean;
  getAcceptanceStatusBadge: (quote: Quote) => JSX.Element;
  formatCurrency: (amount: number) => string;
  canRaiseInvoice: (quote: Quote) => boolean;
  onInvoiceAction: (quote: Quote) => void;
}

const QuoteTableView: React.FC<QuoteTableViewProps> = ({
  quotes,
  loadingAction,
  handleRegeneratePDF,
  handleStatusUpdate,
  onNavigate,
  hasInvoiceRaised,
  getAcceptanceStatusBadge,
  formatCurrency,
  canRaiseInvoice,
  onInvoiceAction,
}) => {
  if (quotes.length === 0) {
    return null;
  }

  return (
    <div className="hidden lg:block overflow-hidden">
      <div className="border rounded-lg border-elec-yellow/20 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quote</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotes.map((quote) => (
              <TableRow key={quote.id}>
                {/* Quote Number */}
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Badge variant="outline" className="text-xs w-fit">
                      #{quote.quoteNumber}
                    </Badge>
                    {hasInvoiceRaised(quote) && (
                      <div className="flex items-center gap-1">
                        <ArrowRight className="h-3 w-3 text-blue-400" />
                        <Badge variant="default" className="text-xs bg-blue-600/20 text-blue-300 border-blue-600/30">
                          <Receipt className="h-3 w-3 mr-1" />
                          Invoice
                        </Badge>
                      </div>
                    )}
                  </div>
                </TableCell>

                {/* Client Name */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{quote.client.name}</span>
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell>
                  {getAcceptanceStatusBadge(quote)}
                </TableCell>

                {/* Date */}
                <TableCell className="text-sm text-muted-foreground">
                  {format(new Date(quote.createdAt), "dd MMM yyyy")}
                </TableCell>

                {/* Items Count */}
                <TableCell className="text-sm text-muted-foreground">
                  {quote.items.length} item{quote.items.length !== 1 ? 's' : ''}
                </TableCell>

                {/* Total */}
                <TableCell className="font-bold text-elec-yellow">
                  {formatCurrency(quote.total)}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {/* Download Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRegeneratePDF(quote)}
                      disabled={loadingAction === `pdf-${quote.id}`}
                      className="h-8"
                    >
                      <Download className="h-4 w-4" />
                    </Button>

                    {/* View Button */}
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onNavigate(`/electrician/quote-builder/${quote.id}`)}
                      className="h-8"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>

                    {/* Send to Invoice */}
                    {canRaiseInvoice(quote) && (
                      <Button
                        variant="gold"
                        size="sm"
                        onClick={() => onInvoiceAction(quote)}
                        disabled={loadingAction === `invoice-${quote.id}`}
                        className="h-8"
                      >
                        <Receipt className="h-4 w-4 mr-1" />
                        Invoice
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default QuoteTableView;
