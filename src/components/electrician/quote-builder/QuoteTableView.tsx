import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Eye, Receipt, ArrowRight, User, MoreVertical, Mail, MessageCircle } from 'lucide-react';
import { Quote } from '@/types/quote';
import { format } from 'date-fns';
import { QuoteSendDropdown } from '@/components/electrician/quote-builder/QuoteSendDropdown';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

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
  onShareWhatsApp: (quote: Quote) => void;
  onShareEmail: (quote: Quote) => void;
  onViewInvoice?: (quote: Quote) => void;
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
  onShareWhatsApp,
  onShareEmail,
  onViewInvoice,
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
                    {hasInvoiceRaised(quote) && onViewInvoice && (
                      <button 
                        onClick={() => onViewInvoice(quote)}
                        className="flex items-center gap-1 hover:opacity-80 transition-opacity"
                      >
                        <ArrowRight className="h-3 w-3 text-blue-400" />
                        <Badge variant="default" className="text-xs bg-blue-600/20 text-blue-300 border-blue-600/30 hover:bg-blue-600/30 cursor-pointer">
                          <Receipt className="h-3 w-3 mr-1" />
                          Invoice #{quote.invoice_number}
                        </Badge>
                      </button>
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => onNavigate(`/electrician/quote-builder/${quote.id}`)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Quote
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem onClick={() => handleRegeneratePDF(quote)} disabled={loadingAction === `pdf-${quote.id}`}>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem onClick={() => onShareWhatsApp(quote)}>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Send via WhatsApp
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem onClick={() => onShareEmail(quote)}>
                        <Mail className="h-4 w-4 mr-2" />
                        Send via Email
                      </DropdownMenuItem>
                      
                      {hasInvoiceRaised(quote) && onViewInvoice && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onViewInvoice(quote)}>
                            <Receipt className="h-4 w-4 mr-2" />
                            View Invoice #{quote.invoice_number}
                          </DropdownMenuItem>
                        </>
                      )}
                      
                      {canRaiseInvoice(quote) && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => onInvoiceAction(quote)} 
                            disabled={loadingAction === `invoice-${quote.id}`}
                          >
                            <Receipt className="h-4 w-4 mr-2" />
                            Raise Invoice
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
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
