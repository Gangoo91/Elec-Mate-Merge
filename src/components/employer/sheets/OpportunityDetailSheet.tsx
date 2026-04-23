import { useState } from 'react';
import { copyToClipboard } from '@/utils/clipboard';
import { Sheet, SheetContent } from '@/components/ui/sheet';
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
import {
  SheetShell,
  FormCard,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  Pill,
  Eyebrow,
} from '@/components/employer/editorial';

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

  const handleCopyLink = async () => {
    if (opportunity.source_url) {
      await copyToClipboard(opportunity.source_url);
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
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow={opportunity.client_name}
          title={opportunity.title}
          description={
            <span className="flex flex-wrap items-center gap-2">
              <Pill tone={opportunity.status === 'live' ? 'emerald' : 'amber'}>
                {opportunity.status === 'live' ? 'LIVE' : opportunity.status.toUpperCase()}
              </Pill>
              {deadline.urgent && (
                <Pill tone="orange">
                  <Clock className="h-3 w-3 mr-1" /> {deadline.text}
                </Pill>
              )}
            </span>
          }
          footer={
            <>
              <SecondaryButton onClick={() => setShowAIEstimate(true)} fullWidth>
                <Sparkles className="h-4 w-4 mr-2" />
                AI estimate
              </SecondaryButton>
              <PrimaryButton onClick={onStartTender} fullWidth>
                <Zap className="h-4 w-4 mr-2" />
                Start tender
              </PrimaryButton>
            </>
          }
        >
          <div className="flex gap-2">
            <SecondaryButton size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-1" /> Share
            </SecondaryButton>
            <SecondaryButton size="sm" onClick={onToggleSave}>
              {isSaved ? (
                <>
                  <BookmarkCheck className="h-4 w-4 mr-1 text-elec-yellow" />
                  Saved
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4 mr-1" />
                  Save
                </>
              )}
            </SecondaryButton>
          </div>

          <FormCard eyebrow="Key info">
            <FormGrid cols={2}>
              <div className="p-3 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-1">
                  <PoundSterling className="h-4 w-4 text-white" />
                  <Eyebrow>Value</Eyebrow>
                </div>
                <p className="font-semibold text-elec-yellow">
                  {formatOpportunityValue(opportunity)}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-white" />
                  <Eyebrow>Deadline</Eyebrow>
                </div>
                <p
                  className={`font-semibold text-sm ${deadline.urgent ? 'text-orange-400' : 'text-white'}`}
                >
                  {opportunity.deadline
                    ? new Date(opportunity.deadline).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'Not specified'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4 text-white" />
                  <Eyebrow>Location</Eyebrow>
                </div>
                <p className="font-medium text-sm text-white">
                  {opportunity.location_text || opportunity.postcode || 'Location TBC'}
                </p>
                {opportunity.distance_miles !== null &&
                  opportunity.distance_miles !== undefined && (
                    <p className="text-xs text-white">
                      {opportunity.distance_miles} miles away
                    </p>
                  )}
              </div>

              <div className="p-3 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="h-4 w-4 text-white" />
                  <Eyebrow>Sector</Eyebrow>
                </div>
                <p className="font-medium text-sm text-white">
                  {getSectorDisplayName(opportunity.sector)}
                </p>
              </div>
            </FormGrid>
          </FormCard>

          <FormCard eyebrow="Categories">
            <div className="flex flex-wrap gap-2">
              <span
                className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full border ${complexity.color}`}
              >
                {complexity.text}
              </span>
              {opportunity.categories?.map((cat) => (
                <span
                  key={cat}
                  className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full border ${getCategoryColor(cat)}`}
                >
                  {cat.replace('_', ' ')}
                </span>
              ))}
            </div>
          </FormCard>

          {(opportunity.description || opportunity.scope_of_works) && (
            <FormCard eyebrow="Scope of works">
              <p className="text-sm text-white whitespace-pre-wrap leading-relaxed">
                {opportunity.scope_of_works || opportunity.description}
              </p>
            </FormCard>
          )}

          {opportunity.requirements && Object.keys(opportunity.requirements).length > 0 && (
            <FormCard eyebrow="Requirements">
              <div className="space-y-2">
                {opportunity.requirements.niceic && (
                  <div className="flex items-center gap-2 text-sm text-white">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>NICEIC / NAPIT approved contractor</span>
                  </div>
                )}
                {opportunity.requirements.bafe && (
                  <div className="flex items-center gap-2 text-sm text-white">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>BAFE certification</span>
                  </div>
                )}
                {opportunity.requirements.insurance && (
                  <div className="flex items-center gap-2 text-sm text-white">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>
                      Public liability insurance £
                      {(opportunity.requirements.insurance / 1000000).toFixed(0)}m+
                    </span>
                  </div>
                )}
                {opportunity.requirements.asbestos_awareness && (
                  <div className="flex items-center gap-2 text-sm text-white">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Asbestos awareness trained</span>
                  </div>
                )}
                {opportunity.requirements.dbs_check && (
                  <div className="flex items-center gap-2 text-sm text-white">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>DBS checked personnel</span>
                  </div>
                )}
              </div>
              {opportunity.framework_required && (
                <div className="mt-3 p-2 rounded-xl bg-orange-500/10 border border-orange-500/30">
                  <p className="text-sm text-orange-400 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Framework required: {opportunity.framework_required}
                  </p>
                </div>
              )}
            </FormCard>
          )}

          {opportunity.documents && opportunity.documents.length > 0 && (
            <FormCard eyebrow={`Documents · ${opportunity.documents.length}`}>
              <div className="space-y-2">
                {opportunity.documents.map((doc, idx) => (
                  <a
                    key={idx}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06] hover:bg-white/[0.06] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-400" />
                      <span className="text-sm font-medium text-white">{doc.name}</span>
                    </div>
                    <Download className="h-4 w-4 text-white" />
                  </a>
                ))}
              </div>
            </FormCard>
          )}

          {(opportunity.contract_start || opportunity.contract_duration) && (
            <FormCard eyebrow="Contract details">
              <div className="space-y-2 text-sm text-white">
                {opportunity.contract_start && (
                  <div className="flex justify-between">
                    <span className="text-white">Start date</span>
                    <span className="text-white">
                      {new Date(opportunity.contract_start).toLocaleDateString('en-GB')}
                    </span>
                  </div>
                )}
                {opportunity.contract_duration && (
                  <div className="flex justify-between">
                    <span className="text-white">Duration</span>
                    <span className="text-white">{opportunity.contract_duration}</span>
                  </div>
                )}
              </div>
            </FormCard>
          )}

          {(opportunity.contact_name || opportunity.contact_email || opportunity.contact_phone) && (
            <FormCard eyebrow="Contact">
              <div className="space-y-2">
                {opportunity.contact_name && (
                  <p className="text-sm font-medium text-white">{opportunity.contact_name}</p>
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
            </FormCard>
          )}

          {opportunity.source_url && (
            <a
              href={opportunity.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] hover:bg-white/[0.06] transition-colors"
            >
              <div className="flex items-center gap-2 text-white">
                <ExternalLink className="h-4 w-4" />
                <span className="text-sm">
                  View on {opportunity.source.replace('_', ' ')}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleCopyLink();
                }}
                className="text-white hover:text-elec-yellow"
              >
                <Copy className="h-4 w-4" />
              </button>
            </a>
          )}

          <div className="flex items-center gap-2 text-xs text-white">
            <Calendar className="h-3.5 w-3.5" />
            Opportunity ID {opportunity.id}
          </div>
        </SheetShell>
      </SheetContent>

      <AIEstimateSheet
        opportunity={opportunity}
        open={showAIEstimate}
        onOpenChange={setShowAIEstimate}
        onUseEstimate={(estimate) => {
          toast.success(`Estimate ready: £${estimate.total_estimate.toLocaleString()}`);
        }}
      />
    </Sheet>
  );
}

export default OpportunityDetailSheet;
