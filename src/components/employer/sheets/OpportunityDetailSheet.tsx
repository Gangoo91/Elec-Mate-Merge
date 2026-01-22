import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  MapPin,
  Clock,
  Building2,
  FileText,
  Phone,
  Mail,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Download,
  Zap,
  Calendar,
  PoundSterling,
  CheckCircle2,
  AlertCircle,
  Share2,
  Copy,
  Sparkles,
} from 'lucide-react';
import {
  type TenderOpportunity,
  formatOpportunityValue,
  formatDeadline,
  getCategoryColor,
  getSectorDisplayName,
  getComplexityBadge,
} from '@/hooks/useOpportunities';
import { toast } from 'sonner';
import { AIEstimateSheet } from './AIEstimateSheet';

interface OpportunityDetailSheetProps {
  opportunity: TenderOpportunity | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartTender?: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

export function OpportunityDetailSheet({
  opportunity,
  open,
  onOpenChange,
  onStartTender,
  isSaved,
  onToggleSave,
}: OpportunityDetailSheetProps) {
  const [showAIEstimate, setShowAIEstimate] = useState(false);

  if (!opportunity) return null;

  const deadline = formatDeadline(opportunity.deadline);
  const complexity = getComplexityBadge(opportunity.estimated_complexity);

  const handleCopyLink = () => {
    if (opportunity.source_url) {
      navigator.clipboard.writeText(opportunity.source_url);
      toast.success('Link copied to clipboard');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: opportunity.title,
          text: `${opportunity.title} - ${formatOpportunityValue(opportunity)}`,
          url: opportunity.source_url || window.location.href,
        });
      } catch (e) {
        // User cancelled
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-2xl flex flex-col">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="p-4 pb-0 flex-shrink-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className={opportunity.status === 'live' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-gray-500/20'}
                  >
                    {opportunity.status === 'live' ? 'LIVE' : opportunity.status.toUpperCase()}
                  </Badge>
                  {deadline.urgent && (
                    <Badge variant="outline" className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                      <Clock className="h-3 w-3 mr-1" />
                      {deadline.text}
                    </Badge>
                  )}
                </div>
                <SheetTitle className="text-lg leading-tight">{opportunity.title}</SheetTitle>
                <p className="text-sm text-muted-foreground mt-1">{opportunity.client_name}</p>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={onToggleSave}>
                  {isSaved ? (
                    <BookmarkCheck className="h-5 w-5 text-elec-yellow" />
                  ) : (
                    <Bookmark className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1 px-4">
            {/* Key Info Cards */}
            <div className="grid grid-cols-2 gap-3 py-4">
              <div className="p-3 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <PoundSterling className="h-4 w-4" />
                  <span className="text-xs">Value</span>
                </div>
                <p className="font-semibold text-elec-yellow">{formatOpportunityValue(opportunity)}</p>
              </div>

              <div className="p-3 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs">Deadline</span>
                </div>
                <p className={`font-semibold ${deadline.urgent ? 'text-orange-400' : ''}`}>
                  {opportunity.deadline
                    ? new Date(opportunity.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                    : 'Not specified'}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs">Location</span>
                </div>
                <p className="font-medium text-sm">
                  {opportunity.location_text || opportunity.postcode || 'Location TBC'}
                </p>
                {opportunity.distance_miles !== null && opportunity.distance_miles !== undefined && (
                  <p className="text-xs text-muted-foreground">{opportunity.distance_miles} miles away</p>
                )}
              </div>

              <div className="p-3 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Building2 className="h-4 w-4" />
                  <span className="text-xs">Sector</span>
                </div>
                <p className="font-medium text-sm">{getSectorDisplayName(opportunity.sector)}</p>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4 text-elec-yellow" />
                Categories
              </h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={complexity.color}>
                  {complexity.text}
                </Badge>
                {opportunity.categories?.map((cat) => (
                  <Badge key={cat} variant="outline" className={getCategoryColor(cat)}>
                    {cat.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Scope of Works */}
            {(opportunity.description || opportunity.scope_of_works) && (
              <>
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Scope of Works
                  </h4>
                  <div className="p-3 rounded-lg bg-card/50 border border-border">
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {opportunity.scope_of_works || opportunity.description}
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
              </>
            )}

            {/* Requirements */}
            {opportunity.requirements && Object.keys(opportunity.requirements).length > 0 && (
              <>
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Requirements
                  </h4>
                  <div className="space-y-2">
                    {opportunity.requirements.niceic && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span>NICEIC / NAPIT Approved Contractor</span>
                      </div>
                    )}
                    {opportunity.requirements.bafe && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span>BAFE Certification</span>
                      </div>
                    )}
                    {opportunity.requirements.insurance && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span>Public Liability Insurance £{(opportunity.requirements.insurance / 1000000).toFixed(0)}m+</span>
                      </div>
                    )}
                    {opportunity.requirements.asbestos_awareness && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span>Asbestos Awareness Trained</span>
                      </div>
                    )}
                    {opportunity.requirements.dbs_check && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span>DBS Checked Personnel</span>
                      </div>
                    )}
                  </div>
                  {opportunity.framework_required && (
                    <div className="mt-3 p-2 rounded bg-orange-500/10 border border-orange-500/30">
                      <p className="text-sm text-orange-400 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Framework Required: {opportunity.framework_required}
                      </p>
                    </div>
                  )}
                </div>
                <Separator className="my-4" />
              </>
            )}

            {/* Documents */}
            {opportunity.documents && opportunity.documents.length > 0 && (
              <>
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Documents ({opportunity.documents.length})
                  </h4>
                  <div className="space-y-2">
                    {opportunity.documents.map((doc, idx) => (
                      <a
                        key={idx}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border hover:bg-card transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-400" />
                          <span className="text-sm font-medium">{doc.name}</span>
                        </div>
                        <Download className="h-4 w-4 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </div>
                <Separator className="my-4" />
              </>
            )}

            {/* Contract Details */}
            {(opportunity.contract_start || opportunity.contract_duration) && (
              <>
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Contract Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    {opportunity.contract_start && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Start Date</span>
                        <span>{new Date(opportunity.contract_start).toLocaleDateString('en-GB')}</span>
                      </div>
                    )}
                    {opportunity.contract_duration && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span>{opportunity.contract_duration}</span>
                      </div>
                    )}
                  </div>
                </div>
                <Separator className="my-4" />
              </>
            )}

            {/* Contact */}
            {(opportunity.contact_name || opportunity.contact_email || opportunity.contact_phone) && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Contact
                </h4>
                <div className="space-y-2">
                  {opportunity.contact_name && (
                    <p className="text-sm font-medium">{opportunity.contact_name}</p>
                  )}
                  {opportunity.contact_email && (
                    <a
                      href={`mailto:${opportunity.contact_email}`}
                      className="flex items-center gap-2 text-sm text-blue-400 hover:underline"
                    >
                      <Mail className="h-4 w-4" />
                      {opportunity.contact_email}
                    </a>
                  )}
                  {opportunity.contact_phone && (
                    <a
                      href={`tel:${opportunity.contact_phone}`}
                      className="flex items-center gap-2 text-sm text-blue-400 hover:underline"
                    >
                      <Phone className="h-4 w-4" />
                      {opportunity.contact_phone}
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Source Link */}
            {opportunity.source_url && (
              <div className="mb-4">
                <a
                  href={opportunity.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border hover:bg-card transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    <span className="text-sm">View on {opportunity.source.replace('_', ' ')}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={(e) => { e.preventDefault(); handleCopyLink(); }}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            )}

            {/* Spacer for fixed footer */}
            <div className="h-24" />
          </ScrollArea>

          {/* Fixed Footer Actions */}
          <div className="absolute bottom-0 left-0 right-0 p-4 pb-safe bg-background/95 backdrop-blur border-t border-border">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12 touch-manipulation active:scale-[0.98] transition-transform"
                onClick={() => setShowAIEstimate(true)}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                AI Estimate
              </Button>
              <Button
                className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98] transition-transform"
                onClick={onStartTender}
              >
                <Zap className="h-4 w-4 mr-2" />
                Start Tender
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>

      {/* AI Estimate Sheet */}
      <AIEstimateSheet
        opportunity={opportunity}
        open={showAIEstimate}
        onOpenChange={setShowAIEstimate}
        onUseEstimate={(estimate) => {
          toast.success(`Estimate ready: £${estimate.total_estimate.toLocaleString()}`);
          // Could pass estimate to tender creation flow
        }}
      />
    </Sheet>
  );
}

export default OpportunityDetailSheet;
