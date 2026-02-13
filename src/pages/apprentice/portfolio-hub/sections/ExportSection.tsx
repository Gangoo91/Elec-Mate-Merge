import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
  Download,
  FileText,
  Share2,
  Link,
  Copy,
  Check,
  ExternalLink,
  Clock,
  FileSpreadsheet,
  Briefcase,
  Shield,
  Eye,
  Trash2,
  Plus,
  Loader2,
} from 'lucide-react';
import { useUltraFastPortfolio } from '@/hooks/portfolio/useUltraFastPortfolio';
import { usePortfolioSharing } from '@/hooks/portfolio/usePortfolioSharing';
import PortfolioExportDialog from '@/components/apprentice/portfolio/PortfolioExportDialog';

/**
 * ExportSection - Export portfolio and share publicly
 *
 * Creates real share links via usePortfolioSharing hook.
 * Assessors open the /view/:token URL to review and provide feedback.
 */
export function ExportSection() {
  const { entries } = useUltraFastPortfolio();
  const {
    shares,
    isLoading: sharesLoading,
    createShareLink,
    revokeShareLink,
    getShareUrl,
    copyShareLink,
  } = usePortfolioSharing();

  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [revoking, setRevoking] = useState<string | null>(null);
  const [newShareExpiry, setNewShareExpiry] = useState<'24h' | '7d' | '30d' | 'never'>('7d');

  const handleCreateShare = async () => {
    setCreating(true);
    try {
      await createShareLink({
        title: 'Portfolio for Review',
        expiresIn: newShareExpiry,
      });
    } finally {
      setCreating(false);
    }
  };

  const handleCopyLink = async (token: string) => {
    await copyShareLink(token);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const handleRevoke = async (shareId: string) => {
    setRevoking(shareId);
    try {
      await revokeShareLink(shareId);
    } finally {
      setRevoking(null);
    }
  };

  const formatExpiry = (expiresAt: string | null) => {
    if (!expiresAt) return 'Never expires';
    const date = new Date(expiresAt);
    const now = new Date();
    if (date < now) return 'Expired';
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / 86400000);
    if (diffDays <= 1) return 'Expires today';
    if (diffDays <= 7) return `${diffDays} days left`;
    return `Expires ${date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`;
  };

  const exportOptions = [
    {
      id: 'pdf',
      title: 'PDF Portfolio',
      description: 'Professional PDF for EPA submission',
      icon: FileText,
      color: 'bg-red-500',
      recommended: true,
    },
    {
      id: 'word',
      title: 'Word Document',
      description: 'Editable document format',
      icon: FileSpreadsheet,
      color: 'bg-blue-500',
      recommended: false,
    },
    {
      id: 'hours',
      title: 'OTJ Hours Report',
      description: 'Training hours summary for compliance',
      icon: Clock,
      color: 'bg-purple-500',
      recommended: false,
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Export & Share</h1>
        <p className="text-sm text-muted-foreground">Download your portfolio or share with assessors and employers</p>
      </div>

      {/* Portfolio Summary */}
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/5 to-transparent">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl bg-elec-yellow/20 flex items-center justify-center shrink-0">
              <Briefcase className="h-7 w-7 text-elec-yellow" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Your Portfolio</h3>
              <p className="text-sm text-muted-foreground">
                {entries.length} evidence items • {entries.filter(e => e.status === 'completed').length} completed
              </p>
            </div>
            <Badge
              variant="outline"
              className={cn(
                "text-xs",
                entries.length >= 10
                  ? "bg-green-500/10 text-green-500 border-green-500/20"
                  : "bg-amber-500/10 text-amber-500 border-amber-500/20"
              )}
            >
              {entries.length >= 10 ? 'Ready' : 'In Progress'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Download className="h-4 w-4 text-elec-yellow" />
            Download Portfolio
          </CardTitle>
          <CardDescription>Export your portfolio for submission or records</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {exportOptions.map((option) => (
            <div
              key={option.id}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl border transition-colors cursor-pointer touch-manipulation active:scale-[0.98]",
                "hover:border-elec-yellow/30 hover:bg-elec-yellow/5",
                option.recommended ? "border-elec-yellow/20" : "border-border"
              )}
            >
              <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center shrink-0", option.color)}>
                <option.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-medium text-foreground">{option.title}</span>
                  {option.recommended && (
                    <Badge className="bg-elec-yellow/20 text-elec-yellow text-[10px] px-1.5">
                      Recommended
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{option.description}</p>
              </div>
              <Button variant="outline" size="sm" className="border-border shrink-0">
                <Download className="h-4 w-4 mr-1.5" />
                Export
              </Button>
            </div>
          ))}

          {/* Use existing export dialog for full options */}
          <div className="pt-2">
            <PortfolioExportDialog entries={entries} />
          </div>
        </CardContent>
      </Card>

      {/* Share with Assessor */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Share2 className="h-4 w-4 text-blue-500" />
            Share with Assessor
          </CardTitle>
          <CardDescription>
            Create a link your assessor can use to review your portfolio and provide feedback
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Create new share link */}
          <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                <Eye className="h-5 w-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Create Share Link</p>
                <p className="text-xs text-muted-foreground">Your assessor can view evidence and leave feedback</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Label htmlFor="expiry-select" className="sr-only">
                Expiry
              </Label>
              <select
                id="expiry-select"
                value={newShareExpiry}
                onChange={(e) => setNewShareExpiry(e.target.value as '24h' | '7d' | '30d' | 'never')}
                className="h-11 flex-1 px-3 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-elec-yellow touch-manipulation"
              >
                <option value="24h">Expires in 24 hours</option>
                <option value="7d">Expires in 7 days</option>
                <option value="30d">Expires in 30 days</option>
                <option value="never">Never expires</option>
              </select>
              <Button
                onClick={handleCreateShare}
                disabled={creating}
                className="h-11 bg-elec-yellow text-black hover:bg-elec-yellow/80 touch-manipulation"
              >
                {creating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-1.5" />
                    Create
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Active shares */}
          {sharesLoading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
            </div>
          ) : shares.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground font-medium">
                Active Links ({shares.length})
              </p>
              {shares.map((share) => {
                const isExpired = share.expires_at && new Date(share.expires_at) < new Date();
                const isCopied = copiedToken === share.token;
                const isRevoking = revoking === share.id;

                return (
                  <div
                    key={share.id}
                    className={cn(
                      "p-4 rounded-xl border",
                      isExpired ? "border-red-500/20 bg-red-500/5" : "border-border bg-muted/30"
                    )}
                  >
                    {/* Link URL */}
                    <div className="flex gap-2 mb-3">
                      <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-background border border-border min-w-0">
                        <Link className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="text-sm text-foreground truncate">
                          {getShareUrl(share.token)}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 border-border h-11 w-11 touch-manipulation"
                        onClick={() => handleCopyLink(share.token)}
                        disabled={isExpired || false}
                      >
                        {isCopied ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 border-border h-11 w-11 touch-manipulation"
                        onClick={() => window.open(getShareUrl(share.token), '_blank')}
                        disabled={isExpired || false}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {share.view_count || 0} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatExpiry(share.expires_at)}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-9 touch-manipulation"
                        onClick={() => handleRevoke(share.id)}
                        disabled={isRevoking}
                      >
                        {isRevoking ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <>
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            Revoke
                          </>
                        )}
                      </Button>
                    </div>

                    {isExpired && (
                      <Badge className="mt-2 bg-red-500/10 text-red-400 border-red-500/20 text-xs">
                        Expired
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6">
              <Share2 className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No active share links</p>
              <p className="text-xs text-muted-foreground mt-1">Create one above to share with your assessor</p>
            </div>
          )}

          {/* Security note */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <Shield className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-500">
              Share links only show completed and approved evidence. Your assessor can leave per-item comments and submit formal reviews. Personal details are hidden.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* EPA Submission Info */}
      <Card className="border-green-500/20 bg-green-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
              <Shield className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">EPA Submission</h3>
              <p className="text-sm text-muted-foreground">
                When you're ready for End-Point Assessment, use the PDF export to create a professional portfolio. Your assessor can verify evidence via the QR codes included in the export.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ExportSection;
