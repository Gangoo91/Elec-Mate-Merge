import { Quote } from "@/types/quote";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface QuoteDetailViewProps {
  quote: Quote;
}

export const QuoteDetailView = ({ quote }: QuoteDetailViewProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "labour":
        return <Wrench className="h-4 w-4 text-blue-500" />;
      case "materials":
        return <Package className="h-4 w-4 text-green-500" />;
      case "equipment":
        return <Zap className="h-4 w-4 text-purple-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
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
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
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
  const categories = ["labour", "materials", "equipment", "manual"];

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
    ? Math.ceil((new Date(quote.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;
  const isExpiringSoon = daysUntilExpiry !== null && daysUntilExpiry <= 3 && daysUntilExpiry > 0;

  return (
    <div className="space-y-6">
      {/* Header Card - Quote Number, Status, Dates */}
      <Card className="glass-premium p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Quote {quote.quoteNumber}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={cn("border", getStatusColor(quote.status))}>
                {quote.status}
              </Badge>
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
            <p className="text-sm text-white/50 mb-1">Total Amount</p>
            <p className="text-4xl font-bold text-elec-yellow">
              £{(quote.total || 0).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2 text-white/70">
            <Calendar className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-white/50">Created</p>
              <p className="font-medium">{format(new Date(quote.createdAt), 'dd MMM yyyy')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <Clock className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-white/50">Valid Until</p>
              <p className={cn("font-medium", isExpired && "text-red-400")}>
                {format(new Date(quote.expiryDate), 'dd MMM yyyy')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <FileText className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-white/50">Last Updated</p>
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
              <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                <Send className="h-3 w-3" />
                <span>Sent</span>
              </div>
              <p className="text-white font-medium text-sm">
                {format(new Date(firstSentAt), 'dd MMM yyyy')}
              </p>
              {daysSinceSent !== null && daysSinceSent > 0 && (
                <p className="text-white/40 text-xs">
                  {daysSinceSent} day{daysSinceSent !== 1 ? 's' : ''} ago
                </p>
              )}
            </div>

            {/* Email Views */}
            <div className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.06]">
              <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                <Eye className="h-3 w-3" />
                <span>Email Opens</span>
              </div>
              <p className={cn(
                "font-medium text-sm",
                hasBeenViewed ? "text-blue-400" : "text-white/40"
              )}>
                {hasBeenViewed ? viewCount : 'Not opened yet'}
              </p>
              {quote.email_opened_at && (
                <p className="text-white/40 text-xs">
                  First: {format(new Date(quote.email_opened_at), 'dd MMM, HH:mm')}
                </p>
              )}
            </div>

            {/* Reminders Sent */}
            <div className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.06]">
              <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                <Bell className="h-3 w-3" />
                <span>Reminders</span>
              </div>
              <p className={cn(
                "font-medium text-sm",
                reminderCount > 0 ? "text-purple-400" : "text-white"
              )}>
                {reminderCount} of 3 sent
              </p>
              {lastReminderAt && (
                <p className="text-white/40 text-xs">
                  Last: {format(new Date(lastReminderAt), 'dd MMM')}
                </p>
              )}
            </div>

            {/* Expiry Countdown */}
            <div className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.06]">
              <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                <Clock className="h-3 w-3" />
                <span>Expires In</span>
              </div>
              <p className={cn(
                "font-medium text-sm",
                isExpired ? "text-red-400" :
                isExpiringSoon ? "text-orange-400" :
                "text-white"
              )}>
                {isExpired
                  ? 'Expired'
                  : daysUntilExpiry === 0
                    ? 'Today'
                    : daysUntilExpiry === 1
                      ? 'Tomorrow'
                      : `${daysUntilExpiry} days`
                }
              </p>
              <p className="text-white/40 text-xs">
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
                  Client has viewed your quote {viewCount > 1 ? `${viewCount} times` : ''} - awaiting their decision
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
              <div className="flex items-center gap-2 text-white/50">
                <Clock className="h-4 w-4" />
                <span className="text-sm">
                  Waiting for client to open the email
                </span>
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
              <Building className="h-4 w-4 text-white/50 mt-1 shrink-0" />
              <div>
                <p className="text-white/50 text-sm">Client Name</p>
                <p className="text-white font-medium">{quote.client.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-4 w-4 text-white/50 mt-1 shrink-0" />
              <div>
                <p className="text-white/50 text-sm">Email</p>
                <p className="text-white font-medium">{quote.client.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {quote.client.phone && (
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-white/50 mt-1 shrink-0" />
                <div>
                  <p className="text-white/50 text-sm">Phone</p>
                  <p className="text-white font-medium">{quote.client.phone}</p>
                </div>
              </div>
            )}

            {quote.client.address && (
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-white/50 mt-1 shrink-0" />
                <div>
                  <p className="text-white/50 text-sm">Address</p>
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

          <h3 className="text-lg font-semibold text-white mb-2">
            {quote.jobDetails.title}
          </h3>
          <p className="text-white/70 mb-4 whitespace-pre-wrap">
            {quote.jobDetails.description}
          </p>

          {quote.jobDetails.estimatedDuration && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-elec-yellow" />
              <span className="text-white/50">Estimated Duration:</span>
              <span className="text-white font-medium">
                {quote.jobDetails.estimatedDuration}
              </span>
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
                    <h3 className="font-semibold text-white capitalize">
                      {category}
                    </h3>
                    <Badge variant="outline" className="border-white/20 text-white/70">
                      {categoryItems.length} {categoryItems.length === 1 ? 'item' : 'items'}
                    </Badge>
                  </div>
                  <p className="font-semibold text-elec-yellow">
                    £{categoryTotal.toFixed(2)}
                  </p>
                </div>

                {/* Items Table */}
                <div className="bg-white/[0.02] rounded-lg border border-white/[0.06] overflow-hidden">
                  {/* Table Header - Hidden on mobile */}
                  <div className="hidden sm:grid sm:grid-cols-12 gap-4 px-4 py-2 bg-white/[0.04] text-sm font-medium text-white/50">
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
                        "grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-4 py-3 text-sm",
                        index !== categoryItems.length - 1 && "border-b border-white/[0.06]"
                      )}
                    >
                      {/* Mobile Layout */}
                      <div className="col-span-1 sm:col-span-5">
                        <p className="text-white font-medium mb-1 sm:mb-0">
                          {item.description}
                        </p>
                        {/* Mobile: Show qty and prices below description */}
                        <div className="flex items-center justify-between sm:hidden text-white/70 text-xs">
                          <span>Qty: {item.quantity} × £{item.unitPrice.toFixed(2)}</span>
                          <span className="font-semibold text-elec-yellow">
                            £{item.totalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden sm:block sm:col-span-2 text-center text-white/70">
                        {item.quantity}
                      </div>
                      <div className="hidden sm:block sm:col-span-2 text-right text-white/70">
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
          <div className="flex justify-between text-white/70">
            <span>Subtotal</span>
            <span className="font-medium">£{(quote.subtotal || 0).toFixed(2)}</span>
          </div>

          {quote.overhead !== undefined && quote.overhead > 0 && (
            <div className="flex justify-between text-white/70">
              <span>Overhead</span>
              <span className="font-medium">£{quote.overhead.toFixed(2)}</span>
            </div>
          )}

          {quote.profit !== undefined && quote.profit > 0 && (
            <div className="flex justify-between text-white/70">
              <span>Profit Margin</span>
              <span className="font-medium">£{quote.profit.toFixed(2)}</span>
            </div>
          )}

          {quote.settings?.vatRegistered && (
            <div className="flex justify-between text-white/70">
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
          <p className="text-white/70 whitespace-pre-wrap">{quote.notes}</p>
        </Card>
      )}

      {/* Acceptance Details with Signature */}
      {quote.acceptance_status === 'accepted' && quote.accepted_at && (
        <Card className="glass-premium p-6 border-green-500/30">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-6 w-6 text-green-500 shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-2">Quote Accepted</h3>
              <div className="space-y-1 text-sm text-white/70">
                <p>
                  <span className="text-white/50">Accepted by:</span>{' '}
                  <span className="font-medium">{quote.accepted_by_name || 'Client'}</span>
                </p>
                {quote.accepted_by_email && (
                  <p>
                    <span className="text-white/50">Email:</span>{' '}
                    <span className="font-medium">{quote.accepted_by_email}</span>
                  </p>
                )}
                <p>
                  <span className="text-white/50">Date:</span>{' '}
                  <span className="font-medium">
                    {format(new Date(quote.accepted_at), 'dd MMM yyyy, HH:mm')}
                  </span>
                </p>
                {quote.acceptance_method && (
                  <p>
                    <span className="text-white/50">Method:</span>{' '}
                    <span className="font-medium capitalize">
                      {quote.acceptance_method.replace(/_/g, ' ')}
                    </span>
                  </p>
                )}
                {quote.accepted_ip && (
                  <p>
                    <span className="text-white/50">IP Address:</span>{' '}
                    <span className="font-medium font-mono text-xs">{quote.accepted_ip}</span>
                  </p>
                )}
              </div>

              {/* Digital Signature */}
              {quote.signature_url && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-2">
                    Digital Signature
                  </p>
                  <div className="bg-white rounded-lg p-3 inline-block">
                    <img
                      src={quote.signature_url}
                      alt={`Signature of ${quote.accepted_by_name}`}
                      className="max-h-20 w-auto"
                    />
                  </div>
                  <p className="text-white/40 text-xs mt-2">
                    Legally binding digital signature captured at time of acceptance
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
