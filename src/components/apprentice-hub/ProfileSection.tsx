/**
 * ProfileSection
 *
 * Me tab content - Profile, tutor communication, sharing, and settings.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import JSZip from 'jszip';
import {
  User,
  MessageSquare,
  AlertCircle,
  Bell,
  Share2,
  Download,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  GraduationCap,
  Shield,
  Trophy,
  ExternalLink,
  Copy,
  Check,
  Clock,
  Link2,
  Trash2,
  Loader2,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { usePortfolioComments } from '@/hooks/portfolio/usePortfolioComments';
import { usePortfolioSharing } from '@/hooks/portfolio/usePortfolioSharing';
import { usePortfolioData } from '@/hooks/portfolio/usePortfolioData';
import { useQualifications } from '@/hooks/qualification/useQualifications';
import { useTimeEntries } from '@/hooks/time-tracking/useTimeEntries';
import { toast } from 'sonner';
import { KSBCoverageMap } from './KSBCoverageMap';
import { EPAGatewayStatus } from './EPAGatewayStatus';
import { DirectMessaging } from './DirectMessaging';
import { useDirectMessages } from '@/hooks/portfolio/useDirectMessages';

export function ProfileSection() {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const { actionRequiredCount, unreadCount } = usePortfolioComments();
  const { unreadCount: messageUnreadCount, connections } = useDirectMessages();
  const { userSelection } = useQualifications();
  const { entries: portfolioEntries } = usePortfolioData();
  const { entries: timeEntries, totalTime } = useTimeEntries();
  const {
    shares,
    isLoading: sharesLoading,
    createShareLink,
    revokeShareLink,
    copyShareLink,
    getShareUrl,
  } = usePortfolioSharing();

  // Share sheet state
  const [showShare, setShowShare] = useState(false);
  const [shareExpiry, setShareExpiry] = useState<'24h' | '7d' | '30d' | 'never'>('7d');
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Messages sheet state
  const [showMessages, setShowMessages] = useState(false);
  const [showDirectMessages, setShowDirectMessages] = useState(false);

  // KSB and EPA sheet states
  const [showKSBMap, setShowKSBMap] = useState(false);
  const [showEPAStatus, setShowEPAStatus] = useState(false);

  // Export states
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);

  // Get user info
  const fullName = profile?.full_name || user?.email?.split('@')[0] || 'Apprentice';
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
  const initials = `${firstName[0]}${lastName[0] || ''}`.toUpperCase();
  const qualification = userSelection?.qualification?.title || 'No qualification selected';

  // Generate share link
  const handleGenerateLink = async () => {
    setIsCreatingLink(true);
    const share = await createShareLink({
      title: `${fullName}'s Portfolio`,
      expiresIn: shareExpiry,
    });
    setIsCreatingLink(false);

    if (share) {
      // Auto-copy to clipboard
      await copyShareLink(share.token);
    }
  };

  // Copy link to clipboard
  const handleCopyLink = async (token: string) => {
    await copyShareLink(token);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  // Revoke a share link
  const handleRevokeLink = async (shareId: string) => {
    await revokeShareLink(shareId);
  };

  // Handle sign out
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Handle export to PDF
  const handleExportPDF = async () => {
    setIsExportingPDF(true);
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();

      // Title
      doc.setFontSize(20);
      doc.setTextColor(40);
      doc.text('Portfolio Summary', pageWidth / 2, 20, { align: 'center' });

      // Apprentice Info
      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text(`${fullName}`, pageWidth / 2, 30, { align: 'center' });
      doc.text(`${qualification}`, pageWidth / 2, 36, { align: 'center' });
      doc.text(`Generated: ${new Date().toLocaleDateString('en-GB')}`, pageWidth / 2, 42, { align: 'center' });

      // OJT Hours Summary
      doc.setFontSize(14);
      doc.setTextColor(40);
      doc.text('Off-the-Job Training Hours', 14, 55);
      doc.setFontSize(11);
      doc.setTextColor(80);
      doc.text(`Total Hours: ${totalTime.hours}h ${totalTime.minutes}m`, 14, 62);
      doc.text(`Sessions Logged: ${timeEntries.length}`, 14, 68);

      // Evidence Table
      doc.setFontSize(14);
      doc.setTextColor(40);
      doc.text('Portfolio Evidence', 14, 82);

      if (portfolioEntries.length > 0) {
        const tableData = portfolioEntries.map((entry: any) => [
          entry.title?.slice(0, 40) || 'Untitled',
          entry.category || 'N/A',
          entry.status || 'draft',
          new Date(entry.dateCreated || entry.created_at).toLocaleDateString('en-GB'),
          entry.skills?.slice(0, 3).join(', ') || 'None',
        ]);

        (doc as any).autoTable({
          startY: 88,
          head: [['Title', 'Category', 'Status', 'Date', 'KSBs']],
          body: tableData,
          theme: 'striped',
          headStyles: { fillColor: [252, 185, 0] },
          styles: { fontSize: 9 },
        });
      } else {
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('No evidence entries found.', 14, 90);
      }

      // Save PDF
      doc.save(`${fullName.replace(/\s+/g, '_')}_Portfolio_${new Date().toISOString().split('T')[0]}.pdf`);

      toast.success('PDF exported successfully!', {
        description: 'Your portfolio has been downloaded.',
      });
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('Failed to export PDF', {
        description: 'Please try again later.',
      });
    } finally {
      setIsExportingPDF(false);
    }
  };

  // Handle download all evidence files as ZIP
  const handleDownloadAll = async () => {
    if (portfolioEntries.length === 0) {
      toast.info('No evidence files to download', {
        description: 'Add some evidence to your portfolio first.',
      });
      return;
    }

    setIsDownloadingAll(true);
    try {
      const zip = new JSZip();
      const evidenceFolder = zip.folder('portfolio-evidence');
      let fileCount = 0;

      // Add a summary text file
      let summary = `Portfolio Evidence Summary\n`;
      summary += `Generated: ${new Date().toLocaleDateString('en-GB')}\n`;
      summary += `Apprentice: ${fullName}\n`;
      summary += `Qualification: ${qualification}\n\n`;
      summary += `Evidence Entries:\n`;
      summary += '='.repeat(50) + '\n\n';

      for (const entry of portfolioEntries) {
        summary += `Title: ${entry.title || 'Untitled'}\n`;
        summary += `Category: ${entry.category || 'N/A'}\n`;
        summary += `Status: ${entry.status || 'draft'}\n`;
        summary += `Date: ${new Date(entry.dateCreated || entry.created_at).toLocaleDateString('en-GB')}\n`;
        summary += `Description: ${entry.description || 'No description'}\n`;
        summary += `KSBs: ${entry.skills?.join(', ') || 'None'}\n`;
        summary += '-'.repeat(50) + '\n\n';

        // Download evidence files
        if (entry.evidenceFiles?.length > 0) {
          for (const file of entry.evidenceFiles) {
            if (file.url && !file.url.startsWith('blob:')) {
              try {
                const response = await fetch(file.url);
                if (response.ok) {
                  const blob = await response.blob();
                  const fileName = file.name || `evidence_${fileCount + 1}`;
                  evidenceFolder?.file(fileName, blob);
                  fileCount++;
                }
              } catch (fetchError) {
                console.warn(`Failed to download: ${file.url}`);
              }
            }
          }
        }
      }

      zip.file('summary.txt', summary);

      // Generate and download ZIP
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fullName.replace(/\s+/g, '_')}_Portfolio_${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Download complete!', {
        description: `Downloaded ${fileCount} file${fileCount !== 1 ? 's' : ''} plus summary.`,
      });
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download files', {
        description: 'Please try again later.',
      });
    } finally {
      setIsDownloadingAll(false);
    }
  };

  // Format expiry date
  const formatExpiry = (expiresAt: string | null) => {
    if (!expiresAt) return 'Never expires';
    const date = new Date(expiresAt);
    const now = new Date();
    if (date < now) return 'Expired';
    return `Expires ${date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`;
  };

  return (
    <div className="px-4 py-6 space-y-6 lg:px-6">
      {/* Profile Header */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow text-xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-foreground">{fullName}</h2>
              <p className="text-sm text-muted-foreground">Apprentice Electrician</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-yellow">
                  <GraduationCap className="h-3 w-3 mr-1" />
                  {qualification}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tutor Communication */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-elec-yellow" />
            Tutor Communication
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          {/* Action Required */}
          <button
            onClick={() => setShowMessages(true)}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors active:scale-[0.98] touch-manipulation"
          >
            <div
              className={cn(
                'p-2 rounded-lg',
                actionRequiredCount > 0 ? 'bg-orange-500/10' : 'bg-green-500/10'
              )}
            >
              <AlertCircle
                className={cn(
                  'h-4 w-4',
                  actionRequiredCount > 0 ? 'text-orange-500' : 'text-green-500'
                )}
              />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">Actions Required</p>
              <p className="text-xs text-muted-foreground">
                {actionRequiredCount > 0
                  ? `${actionRequiredCount} item${actionRequiredCount !== 1 ? 's' : ''} need attention`
                  : 'All caught up!'}
              </p>
            </div>
            {actionRequiredCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {actionRequiredCount}
              </Badge>
            )}
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>

          {/* Unread Messages */}
          <button
            onClick={() => setShowMessages(true)}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors active:scale-[0.98] touch-manipulation"
          >
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Bell className="h-4 w-4 text-blue-500" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">Unread Messages</p>
              <p className="text-xs text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} new comment${unreadCount !== 1 ? 's' : ''}` : 'No new messages'}
              </p>
            </div>
            {unreadCount > 0 && (
              <Badge className="text-xs bg-blue-500">
                {unreadCount}
              </Badge>
            )}
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>

          {/* Message Tutor */}
          <button
            onClick={() => setShowDirectMessages(true)}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors active:scale-[0.98] touch-manipulation"
          >
            <div className="p-2 rounded-lg bg-purple-500/10">
              <MessageSquare className="h-4 w-4 text-purple-500" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">Message Tutor</p>
              <p className="text-xs text-muted-foreground">
                {connections.length > 0
                  ? `${connections.length} conversation${connections.length !== 1 ? 's' : ''}`
                  : 'Send a message to your tutor'}
              </p>
            </div>
            {messageUnreadCount > 0 && (
              <Badge className="bg-purple-500 text-white text-xs">
                {messageUnreadCount}
              </Badge>
            )}
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </CardContent>
      </Card>

      {/* Progress & Achievements */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Trophy className="h-4 w-4 text-elec-yellow" />
            Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          <button
            onClick={() => setShowKSBMap(true)}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors active:scale-[0.98] touch-manipulation"
          >
            <div className="p-2 rounded-lg bg-elec-yellow/10">
              <Shield className="h-4 w-4 text-elec-yellow" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">KSB Coverage Map</p>
              <p className="text-xs text-muted-foreground">View your knowledge, skills & behaviours progress</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>

          <button
            onClick={() => setShowEPAStatus(true)}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors active:scale-[0.98] touch-manipulation"
          >
            <div className="p-2 rounded-lg bg-green-500/10">
              <GraduationCap className="h-4 w-4 text-green-500" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">EPA Gateway Status</p>
              <p className="text-xs text-muted-foreground">Check your end-point assessment readiness</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </CardContent>
      </Card>

      {/* Share & Export */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Share2 className="h-4 w-4 text-elec-yellow" />
            Share & Export
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          <button
            onClick={() => setShowShare(true)}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors active:scale-[0.98] touch-manipulation"
          >
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Link2 className="h-4 w-4 text-blue-500" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">Share Portfolio Link</p>
              <p className="text-xs text-muted-foreground">
                {shares.length > 0 ? `${shares.length} active link${shares.length !== 1 ? 's' : ''}` : 'Generate a link to share with tutors'}
              </p>
            </div>
            {shares.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {shares.length}
              </Badge>
            )}
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>

          <button
            onClick={handleExportPDF}
            disabled={isExportingPDF}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors active:scale-[0.98] touch-manipulation disabled:opacity-50"
          >
            <div className="p-2 rounded-lg bg-red-500/10">
              {isExportingPDF ? (
                <Loader2 className="h-4 w-4 text-red-500 animate-spin" />
              ) : (
                <FileText className="h-4 w-4 text-red-500" />
              )}
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">Export to PDF</p>
              <p className="text-xs text-muted-foreground">
                {isExportingPDF ? 'Generating PDF...' : 'Download your portfolio as a PDF'}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>

          <button
            onClick={handleDownloadAll}
            disabled={isDownloadingAll}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors active:scale-[0.98] touch-manipulation disabled:opacity-50"
          >
            <div className="p-2 rounded-lg bg-muted">
              {isDownloadingAll ? (
                <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
              ) : (
                <Download className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">Download All Evidence</p>
              <p className="text-xs text-muted-foreground">
                {isDownloadingAll ? 'Creating zip file...' : 'Get a zip of all your files'}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <button
            onClick={() => navigate('/settings')}
            className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors active:scale-[0.98] touch-manipulation"
          >
            <div className="p-2 rounded-lg bg-muted">
              <Settings className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">Settings</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>

          <div className="border-t border-border" />

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-destructive active:scale-[0.98] touch-manipulation"
          >
            <div className="p-2 rounded-lg bg-destructive/10">
              <LogOut className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </CardContent>
      </Card>

      {/* Share Sheet */}
      <Sheet open={showShare} onOpenChange={setShowShare}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
          <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />
          <SheetHeader>
            <SheetTitle>Share Portfolio</SheetTitle>
            <SheetDescription>
              Generate links to share your portfolio with tutors or assessors
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 mt-6 overflow-y-auto max-h-[calc(80vh-10rem)] pb-8">
            {/* Create New Link */}
            <div className="space-y-4 p-4 rounded-xl bg-muted/30 border border-border">
              <h3 className="font-medium text-sm">Create New Link</h3>

              {/* Expiry Selection */}
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Link expires after</label>
                <Select value={shareExpiry} onValueChange={(v) => setShareExpiry(v as any)}>
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">24 hours</SelectItem>
                    <SelectItem value="7d">7 days</SelectItem>
                    <SelectItem value="30d">30 days</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerateLink}
                disabled={isCreatingLink}
                className="w-full h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                {isCreatingLink ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Link2 className="h-4 w-4 mr-2" />
                    Generate Share Link
                  </>
                )}
              </Button>
            </div>

            {/* Existing Links */}
            {shares.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium text-sm">Active Links</h3>
                {shares.map((share) => (
                  <div
                    key={share.id}
                    className="p-3 rounded-xl bg-muted/50 border border-border space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1 flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {share.title || 'Portfolio Link'}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{formatExpiry(share.expires_at)}</span>
                          <span className="text-border">•</span>
                          <Eye className="h-3 w-3" />
                          <span>{share.view_count} views</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRevokeLink(share.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex-1 p-2 rounded-lg bg-background text-xs text-muted-foreground truncate">
                        {getShareUrl(share.token)}
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyLink(share.token)}
                        className="shrink-0"
                      >
                        {copiedToken === share.token ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Info */}
            <p className="text-xs text-muted-foreground text-center">
              Anyone with a link can view your portfolio (read-only).
              Tutors can leave comments if they sign in.
            </p>
          </div>
        </SheetContent>
      </Sheet>

      {/* Messages Sheet */}
      <Sheet open={showMessages} onOpenChange={setShowMessages}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
          <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />
          <SheetHeader>
            <SheetTitle>Messages & Actions</SheetTitle>
            <SheetDescription>
              Review comments and actions from your tutor
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 rounded-full bg-muted mb-4">
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">No messages yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Comments from your tutor will appear here
            </p>
          </div>
        </SheetContent>
      </Sheet>

      {/* KSB Coverage Map Sheet */}
      <KSBCoverageMap open={showKSBMap} onOpenChange={setShowKSBMap} />

      {/* EPA Gateway Status Sheet */}
      <EPAGatewayStatus open={showEPAStatus} onOpenChange={setShowEPAStatus} />

      {/* Direct Messaging Sheet */}
      <DirectMessaging open={showDirectMessages} onOpenChange={setShowDirectMessages} />
    </div>
  );
}

export default ProfileSection;
