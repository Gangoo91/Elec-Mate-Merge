import { useMemo, useState } from 'react';
import { Quote } from '@/types/quote';
import { buildCategoryBreakdowns } from '@/utils/quote-calculations';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Package,
  Wrench,
  Zap,
  FileText,
  Calendar,
  Clock,
  Mail,
  Phone,
  MapPin,
  Building,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  CalendarX,
  MailOpen,
  Send,
  Bell,
  AlertTriangle,
  Eye,
  GitBranch,
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { VariationDialog } from './VariationDialog';

interface QuoteDetailViewProps {
  quote: Quote;
}

export const QuoteDetailView = ({ quote }: QuoteDetailViewProps) => {
  const [variationOpen, setVariationOpen] = useState(false);

  const categoryBreakdowns = useMemo(
    () => buildCategoryBreakdowns(quote.items || [], quote.settings),
    [quote.items, quote.settings]
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'labour':
        return <Wrench className="h-4 w-4 text-blue-500" />;
      case 'materials':
        return <Package className="h-4 w-4 text-green-500" />;
      case 'equipment':
        return <Zap className="h-4 w-4 text-purple-500" />;
      default:
        return <FileText className="h-4 w-4 text-white" />;
    }
  };

  const getStatusColor = (status: Quote['status']) => {
    switch (status) {
      case 'sent':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'accepted':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'expired':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-white border-gray-500/30';
    }
  };

  const getAcceptanceStatusIcon = () => {
    switch (quote.acceptance_status) {
      case 'accepted':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const isExpired = quote.expiryDate && new Date(quote.expiryDate) < new Date();
  const categories = ['labour', 'materials', 'equipment', 'manual'];

  // Email tracking data
  const hasBeenViewed = !!quote.email_opened_at;
  const viewCount = quote.email_open_count || 0;
  const reminderCount = quote.reminder_count || 0;
  const firstSentAt = quote.first_sent_at;
  const lastReminderAt = quote.lastReminderSentAt;

  // Calculate days since sent
  const daysSinceSent = firstSentAt
    ? Math.floor((new Date().getTime() - new Date(firstSentAt).getTime()) / (1000 * 60 * 60 * 24))
    : null;

  // Calculate days until expiry
  const daysUntilExpiry = quote.expiryDate
    ? Math.ceil(
        (new Date(quote.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      )
    : null;
  const isExpiringSoon = daysUntilExpiry !== null && daysUntilExpiry <= 3 && daysUntilExpiry > 0;

  return (
    <div className="space-y-6">
      {/* Header Card - Quote Number, Status, Dates */}
      <Card className="glass-premium p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Quote {quote.quoteNumber}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={cn('border', getStatusColor(quote.status))}>{quote.status}</Badge>
              {quote.acceptance_status && (
                <Badge variant="outline" className="border-white/20">
                  <span className="mr-1">{getAcceptanceStatusIcon()}</span>
                  {quote.acceptance_status}
                </Badge>
              )}
              {isExpired && (
                <Badge variant="outline" className="border-red-500/30 text-red-400">
                  <CalendarX className="h-3 w-3 mr-1" />
                  Expired
                </Badge>
              )}
              {quote.invoice_raised && (
                <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
                  Invoice: {quote.invoice_number}
                </Badge>
              )}
            </div>
          </div>

          <div className="text-right">
            {(() => {
              // ELE-954 — show Total + Deposit paid + Balance when a deposit
              // landed on the quote, so the electrician sees what's still owed
              // before converting to an invoice.
              const depositPaidAmount = (() => {
                const q = quote as unknown as {
                  deposit_paid_at?: string | null;
                  deposit_amount_pennies?: number | null;
                };
                if (!q?.deposit_paid_at) return 0;
                const pennies = Number(q.deposit_amount_pennies || 0);
                return pennies > 0 ? pennies / 100 : 0;
              })();
              const total = Number(quote.total || 0);
              const balance = Math.max(0, total - depositPaidAmount);

              if (depositPaidAmount > 0) {
                return (
                  <>
                    <p className="text-xs text-white/60 mb-0.5">Total</p>
                    <p className="text-xl font-semibold text-white tabular-nums">
                      £{total.toFixed(2)}
                    </p>
                    <p className="mt-2 text-xs text-emerald-400 tabular-nums">
                      − £{depositPaidAmount.toFixed(2)} deposit paid
                    </p>
                    <p className="mt-1 text-sm text-white/80 mb-0.5">Balance outstanding</p>
                    <p className="text-3xl font-bold text-elec-yellow tabular-nums">
                      £{balance.toFixed(2)}
                    </p>
                  </>
                );
              }
              return (
                <>
                  <p className="text-sm text-white mb-1">Total Amount</p>
                  <p className="text-4xl font-bold text-elec-yellow">£{total.toFixed(2)}</p>
                </>
              );
            })()}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2 text-white">
            <Calendar className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-white">Created</p>
              <p className="font-medium">{format(new Date(quote.createdAt), 'dd MMM yyyy')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Clock className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-white">Valid Until</p>
              <p className={cn('font-medium', isExpired && 'text-red-400')}>
                {format(new Date(quote.expiryDate), 'dd MMM yyyy')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-white">
            <FileText className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-white">Last Updated</p>
              <p className="font-medium">{format(new Date(quote.updatedAt), 'dd MMM yyyy')}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Email Tracking Card - Only show for sent quotes awaiting response */}
      {quote.status === 'sent' && quote.acceptance_status === 'pending' && firstSentAt && (
        <Card className="glass-premium p-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-5 w-5 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">Email Tracking</h2>
            {hasBeenViewed && (
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 ml-2">
                <MailOpen className="h-3 w-3 mr-1" />
                Viewed
              </Badge>
            )}
            {isExpiringSoon && (
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 ml-2">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Expiring Soon
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Sent Date */}
            <div className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.06]">
              <div className="flex items-center gap-2 text-white text-xs mb-1">
                <Send className="h-3 w-3" />
                <span>Sent</span>
              </div>
              <p className="text-white font-medium text-sm">
                {format(new Date(firstSentAt), 'dd MMM yyyy')}
              </p>
              {daysSinceSent !== null && daysSinceSent > 0 && (
                <p className="text-white text-xs">
                  {daysSinceSent} day{daysSinceSent !== 1 ? 's' : ''} ago
                </p>
              )}
            </div>

            {/* Email Views */}
            <div className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.06]">
              <div className="flex items-center gap-2 text-white text-xs mb-1">
                <Eye className="h-3 w-3" />
                <span>Email Opens</span>
              </div>
              <p
                className={cn(
                  'font-medium text-sm',
                  hasBeenViewed ? 'text-blue-400' : 'text-white'
                )}
              >
                {hasBeenViewed ? viewCount : 'Not opened yet'}
              </p>
              {quote.email_opened_at && (
                <p className="text-white text-xs">
                  First: {format(new Date(quote.email_opened_at), 'dd MMM, HH:mm')}
                </p>
              )}
            </div>

            {/* Reminders Sent */}
            <div className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.06]">
              <div className="flex items-center gap-2 text-white text-xs mb-1">
                <Bell className="h-3 w-3" />
                <span>Reminders</span>
              </div>
              <p
                className={cn(
                  'font-medium text-sm',
                  reminderCount > 0 ? 'text-purple-400' : 'text-white'
                )}
              >
                {reminderCount} of 3 sent
              </p>
              {lastReminderAt && (
                <p className="text-white text-xs">
                  Last: {format(new Date(lastReminderAt), 'dd MMM')}
                </p>
              )}
            </div>

            {/* Expiry Countdown */}
            <div className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.06]">
              <div className="flex items-center gap-2 text-white text-xs mb-1">
                <Clock className="h-3 w-3" />
                <span>Expires In</span>
              </div>
              <p
                className={cn(
                  'font-medium text-sm',
                  isExpired ? 'text-red-400' : isExpiringSoon ? 'text-orange-400' : 'text-white'
                )}
              >
                {isExpired
                  ? 'Expired'
                  : daysUntilExpiry === 0
                    ? 'Today'
                    : daysUntilExpiry === 1
                      ? 'Tomorrow'
                      : `${daysUntilExpiry} days`}
              </p>
              <p className="text-white text-xs">
                {format(new Date(quote.expiryDate), 'dd MMM yyyy')}
              </p>
            </div>
          </div>

          {/* Engagement Status Message */}
          <div className="mt-4 pt-4 border-t border-white/10">
            {hasBeenViewed && !isExpired ? (
              <div className="flex items-center gap-2 text-blue-400">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">
                  Client has viewed your quote {viewCount > 1 ? `${viewCount} times` : ''} -
                  awaiting their decision
                </span>
              </div>
            ) : !hasBeenViewed && daysSinceSent && daysSinceSent > 2 ? (
              <div className="flex items-center gap-2 text-amber-400">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">
                  Client hasn't opened the email yet - automated reminders will be sent
                </span>
              </div>
            ) : isExpired ? (
              <div className="flex items-center gap-2 text-red-400">
                <XCircle className="h-4 w-4" />
                <span className="text-sm">
                  This quote has expired - consider sending a new quote
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-white">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Waiting for client to open the email</span>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Client Information Card */}
      <Card className="glass-premium p-6">
        <div className="flex items-center gap-2 mb-4">
          <User className="h-5 w-5 text-elec-yellow" />
          <h2 className="text-xl font-semibold text-white">Client Details</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Building className="h-4 w-4 text-white mt-1 shrink-0" />
              <div>
                <p className="text-white text-sm">Client Name</p>
                <p className="text-white font-medium">{quote.client.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-4 w-4 text-white mt-1 shrink-0" />
              <div>
                <p className="text-white text-sm">Email</p>
                <p className="text-white font-medium">{quote.client.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {quote.client.phone && (
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-white mt-1 shrink-0" />
                <div>
                  <p className="text-white text-sm">Phone</p>
                  <p className="text-white font-medium">{quote.client.phone}</p>
                </div>
              </div>
            )}

            {quote.client.address && (
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-white mt-1 shrink-0" />
                <div>
                  <p className="text-white text-sm">Address</p>
                  <p className="text-white font-medium">
                    {quote.client.address}
                    {quote.client.postcode && `, ${quote.client.postcode}`}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Job Details Card */}
      {quote.jobDetails?.title && (
        <Card className="glass-premium p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">Job Details</h2>
          </div>

          <h3 className="text-lg font-semibold text-white mb-2">{quote.jobDetails.title}</h3>
          <p className="text-white mb-4 whitespace-pre-wrap">{quote.jobDetails.description}</p>

          {quote.jobDetails.estimatedDuration && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-elec-yellow" />
              <span className="text-white">Estimated Duration:</span>
              <span className="text-white font-medium">{quote.jobDetails.estimatedDuration}</span>
            </div>
          )}
        </Card>
      )}

      {/* Line Items - Detailed Breakdown */}
      <Card className="glass-premium p-6">
        <div className="flex items-center gap-2 mb-6">
          <Package className="h-5 w-5 text-elec-yellow" />
          <h2 className="text-xl font-semibold text-white">Quote Items</h2>
        </div>

        <div className="space-y-6">
          {categories.map((category) => {
            const categoryItems = quote.items?.filter((i) => i.category === category) || [];
            if (categoryItems.length === 0) return null;

            const categoryTotal = categoryItems.reduce((sum, i) => sum + i.totalPrice, 0);

            return (
              <div key={category}>
                {/* Category Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(category)}
                    <h3 className="font-semibold text-white capitalize">{category}</h3>
                    <Badge variant="outline" className="border-white/20 text-white">
                      {categoryItems.length} {categoryItems.length === 1 ? 'item' : 'items'}
                    </Badge>
                  </div>
                  <p className="font-semibold text-elec-yellow">£{categoryTotal.toFixed(2)}</p>
                </div>

                {/* Items Table */}
                <div className="bg-white/[0.02] rounded-lg border border-white/[0.06] overflow-hidden">
                  {/* Table Header - Hidden on mobile */}
                  <div className="hidden sm:grid sm:grid-cols-12 gap-4 px-4 py-2 bg-white/[0.04] text-sm font-medium text-white">
                    <div className="col-span-5">Description</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Unit Price</div>
                    <div className="col-span-3 text-right">Total</div>
                  </div>

                  {/* Table Rows */}
                  {categoryItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={cn(
                        'grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-4 py-3 text-sm',
                        index !== categoryItems.length - 1 && 'border-b border-white/[0.06]'
                      )}
                    >
                      {/* Mobile Layout */}
                      <div className="col-span-1 sm:col-span-5">
                        <p className="text-white font-medium mb-1 sm:mb-0">{item.description}</p>
                        {/* ELE-888 — per-item adjustment chip */}
                        {typeof item.itemAdjustmentPercent === 'number' &&
                          item.itemAdjustmentPercent !== 0 && (
                            <span
                              className={cn(
                                'inline-flex items-center gap-1 mt-1 text-[10px] font-semibold px-1.5 py-0.5 rounded tabular-nums',
                                item.itemAdjustmentPercent > 0
                                  ? 'bg-amber-500/15 text-amber-300'
                                  : 'bg-emerald-500/15 text-emerald-300'
                              )}
                            >
                              {item.itemAdjustmentPercent > 0 ? '+' : ''}
                              {item.itemAdjustmentPercent}%
                              {item.itemAdjustmentLabel && (
                                <span className="text-white/60 font-normal">
                                  · {item.itemAdjustmentLabel}
                                </span>
                              )}
                            </span>
                          )}
                        {/* Mobile: Show qty and prices below description */}
                        <div className="flex items-center justify-between sm:hidden text-white text-xs">
                          <span>
                            Qty: {item.quantity} × £{item.unitPrice.toFixed(2)}
                          </span>
                          <span className="font-semibold text-elec-yellow">
                            £{item.totalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden sm:block sm:col-span-2 text-center text-white">
                        {item.quantity}
                      </div>
                      <div className="hidden sm:block sm:col-span-2 text-right text-white">
                        £{item.unitPrice.toFixed(2)}
                      </div>
                      <div className="hidden sm:block sm:col-span-3 text-right font-semibold text-white">
                        £{item.totalPrice.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Pricing Summary Card */}
      <Card className="glass-premium p-6">
        <div className="space-y-3">
          <div className="flex justify-between text-white">
            <span>Subtotal</span>
            <span className="font-medium">£{(quote.subtotal || 0).toFixed(2)}</span>
          </div>

          {/* ELE-891 / ELE-973 — per-category adjustment lines with live £ delta */}
          {categoryBreakdowns
            .filter((b) => b.categoryAdjustmentDelta !== 0)
            .map((b) => {
              const isMarkup = b.categoryAdjustmentDelta > 0;
              return (
                <div
                  key={b.category}
                  className="flex justify-between text-[12px] -mt-1"
                >
                  <span className={cn('capitalize', isMarkup ? 'text-amber-300/80' : 'text-emerald-300/80')}>
                    {b.category} {isMarkup ? 'markup' : 'discount'} (
                    {b.categoryAdjustmentPercent > 0 ? '+' : ''}
                    {b.categoryAdjustmentPercent}%)
                  </span>
                  <span className={cn('font-medium tabular-nums', isMarkup ? 'text-amber-300' : 'text-emerald-300')}>
                    {isMarkup ? '+' : '-'}£{Math.abs(b.categoryAdjustmentDelta).toFixed(2)}
                  </span>
                </div>
              );
            })}

          {quote.overhead !== undefined && quote.overhead > 0 && (
            <div className="flex justify-between text-white">
              <span>Overhead</span>
              <span className="font-medium">£{quote.overhead.toFixed(2)}</span>
            </div>
          )}

          {quote.profit !== undefined && quote.profit > 0 && (
            <div className="flex justify-between text-white">
              <span>Profit Margin</span>
              <span className="font-medium">£{quote.profit.toFixed(2)}</span>
            </div>
          )}

          {quote.settings?.vatRegistered && (
            <div className="flex justify-between text-white">
              <span>VAT ({quote.settings.vatRate}%)</span>
              <span className="font-medium">£{(quote.vatAmount || 0).toFixed(2)}</span>
            </div>
          )}

          <Separator className="bg-white/10" />

          <div className="flex justify-between text-xl font-bold">
            <span className="text-white">Total</span>
            <span className="text-elec-yellow">£{(quote.total || 0).toFixed(2)}</span>
          </div>
        </div>
      </Card>

      {/* Notes Section */}
      {quote.notes && (
        <Card className="glass-premium p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">Additional Notes</h2>
          </div>
          <p className="text-white whitespace-pre-wrap">{quote.notes}</p>
        </Card>
      )}

      {/* Acceptance Details with Signature */}
      {quote.acceptance_status === 'accepted' && quote.accepted_at && (
        <Card className="glass-premium p-6 border-green-500/30">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-6 w-6 text-green-500 shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-2">Quote Accepted</h3>
              <div className="space-y-1 text-sm text-white">
                <p>
                  <span className="text-white">Accepted by:</span>{' '}
                  <span className="font-medium">{quote.accepted_by_name || 'Client'}</span>
                </p>
                {quote.accepted_by_email && (
                  <p>
                    <span className="text-white">Email:</span>{' '}
                    <span className="font-medium">{quote.accepted_by_email}</span>
                  </p>
                )}
                <p>
                  <span className="text-white">Date:</span>{' '}
                  <span className="font-medium">
                    {format(new Date(quote.accepted_at), 'dd MMM yyyy, HH:mm')}
                  </span>
                </p>
                {quote.acceptance_method && (
                  <p>
                    <span className="text-white">Method:</span>{' '}
                    <span className="font-medium capitalize">
                      {quote.acceptance_method.replace(/_/g, ' ')}
                    </span>
                  </p>
                )}
                {quote.accepted_ip && (
                  <p>
                    <span className="text-white">IP Address:</span>{' '}
                    <span className="font-medium font-mono text-xs">{quote.accepted_ip}</span>
                  </p>
                )}
              </div>

              {/* Digital Signature */}
              {quote.signature_url && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-white text-xs uppercase tracking-wider mb-2">
                    Digital Signature
                  </p>
                  <div className="bg-white rounded-lg p-3 inline-block">
                    <img
                      src={quote.signature_url}
                      alt={`Signature of ${quote.accepted_by_name}`}
                      className="max-h-20 w-auto"
                    />
                  </div>
                  <p className="text-white text-xs mt-2">
                    Legally binding digital signature captured at time of acceptance
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* ELE-956 — Variation trigger on accepted quotes */}
      {(quote.acceptance_status === 'accepted' || quote.status === 'approved') && (
        <Card className="glass-premium p-5">
          <div className="flex items-start gap-3">
            <GitBranch className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-1">Job changed on site?</h3>
              <p className="text-sm text-white/60 mb-3">
                Create a variation — same client, new version, the diff is what they sign off.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setVariationOpen(true)}
                className="border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/10"
              >
                Create variation →
              </Button>
            </div>
          </div>
        </Card>
      )}

      <VariationDialog open={variationOpen} onOpenChange={setVariationOpen} parentQuote={quote} />
    </div>
  );
};
