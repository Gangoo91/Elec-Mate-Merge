import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
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
} from 'lucide-react';
import { useUltraFastPortfolio } from '@/hooks/portfolio/useUltraFastPortfolio';
import PortfolioExportDialog from '@/components/apprentice/portfolio/PortfolioExportDialog';

/**
 * ExportSection - Export portfolio and share publicly
 *
 * Phase 5 will enhance with:
 * - EPA-ready portfolio export
 * - Public portfolio URL
 * - QR code generation
 * - Employer share links
 */
export function ExportSection() {
  const { entries } = useUltraFastPortfolio();
  const [copiedLink, setCopiedLink] = useState(false);
  const [publicPortfolioEnabled, setPublicPortfolioEnabled] = useState(false);

  const portfolioUrl = 'https://elec-mate.uk/portfolio/abc123'; // Placeholder

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolioUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
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
        <p className="text-sm text-muted-foreground">Download your portfolio or share with employers</p>
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

      {/* Public Portfolio Link */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Share2 className="h-4 w-4 text-blue-500" />
            Public Portfolio Link
          </CardTitle>
          <CardDescription>Share your portfolio with potential employers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Enable Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Eye className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <Label htmlFor="public-toggle" className="text-sm font-medium">
                  Enable Public Portfolio
                </Label>
                <p className="text-xs text-muted-foreground">Allow anyone with the link to view</p>
              </div>
            </div>
            <Switch
              id="public-toggle"
              checked={publicPortfolioEnabled}
              onCheckedChange={setPublicPortfolioEnabled}
            />
          </div>

          {/* Share Link */}
          {publicPortfolioEnabled && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-muted border border-border">
                  <Link className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm text-foreground truncate">{portfolioUrl}</span>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 border-border"
                  onClick={handleCopyLink}
                >
                  {copiedLink ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 border-border"
                  onClick={() => window.open(portfolioUrl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <Shield className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-600">
                  Your public portfolio only shows completed and approved evidence. Personal details and tutor feedback are hidden.
                </p>
              </div>
            </div>
          )}
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
