/**
 * ProfileSection
 *
 * Me tab content - Profile, tutor communication, sharing, and settings.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import {
  buildPortfolioPackData,
  exportPortfolioEvidencePack,
} from '@/services/portfolioEvidenceExport';
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
import { formatDistanceToNow } from 'date-fns';
import { useQualificationACs } from '@/hooks/qualification/useQualificationACs';
import { parseEvidencedACs } from '@/utils/parseEvidencedACs';
import { KSBCoverageMap } from './KSBCoverageMap';
import { EPAGatewayStatus } from './EPAGatewayStatus';
import { DirectMessaging } from './DirectMessaging';
import { useDirectMessages } from '@/hooks/portfolio/useDirectMessages';

export function ProfileSection() {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const { comments, threads, actionRequiredCount, unreadCount } = usePortfolioComments();
  const { unreadCount: messageUnreadCount, connections } = useDirectMessages();
  const { userSelection } = useQualifications();
  const { tree: acTree } = useQualificationACs();
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
  const rawName = profile?.full_name || user?.email?.split('@')[0] || 'Apprentice';
  const fullName = rawName
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
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
    window.location.replace('/');
  };

  // Handle export to PDF — premium evidence pack (branded cover, photos
  // inline, supervisor sign-offs) rendered via the browser print engine.
  const handleExportPDF = async () => {
    setIsExportingPDF(true);
    try {
      const { data: u } = await supabase.auth.getUser();
      const uid = u.user?.id;
      if (!uid) throw new Error('You must be signed in to export.');
      const pack = await buildPortfolioPackData(uid);
      await exportPortfolioEvidencePack(pack);
      toast.success('Opening your evidence pack', {
        description: 'Choose "Save as PDF" in the print dialog.',
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
        summary += `Category: ${(typeof entry.category === 'object' ? entry.category?.name : entry.category) || 'N/A'}\n`;
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
    <div className="py-5 sm:py-6 lg:py-8 space-y-7 lg:space-y-10">
      {/* ─── Editorial profile hero ─── */}
      <header className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-5 sm:p-6">
        <div className="flex items-start gap-4 sm:gap-5">
          <Avatar className="h-14 w-14 sm:h-16 sm:w-16 border border-white/[0.06] flex-shrink-0">
            <AvatarImage src={profile?.avatar_url} />
            <AvatarFallback className="bg-white/[0.04] text-elec-yellow text-[18px] font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Apprentice · Electrical
            </span>
            <h2 className="text-[24px] sm:text-[28px] font-semibold tracking-tight text-white leading-none">
              {fullName}
            </h2>
            {user?.email && (
              <p className="text-[12px] text-white/55 font-mono truncate">{user.email}</p>
            )}
            <div className="pt-1.5">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-elec-yellow border border-elec-yellow/30 bg-elec-yellow/[0.04] px-2.5 py-1 rounded-md">
                <GraduationCap className="h-3 w-3" />
                {qualification}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="lg:grid lg:grid-cols-2 lg:gap-7 space-y-7 lg:space-y-0">
        {/* ─── Tutor communication ─── */}
        <section className="space-y-3">
          <div className="space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Tutor communication
            </span>
            <h3 className="text-[16px] sm:text-[18px] font-medium text-white">From your college</h3>
          </div>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setShowMessages(true)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] hover:bg-white/[0.04] transition-colors touch-manipulation text-left"
              >
                <AlertCircle
                  className={cn(
                    'h-4 w-4 flex-shrink-0',
                    actionRequiredCount > 0 ? 'text-red-300' : 'text-white/40'
                  )}
                />
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-[13px] font-medium text-white">Actions required</p>
                  <p className="text-[11.5px] text-white/55">
                    {actionRequiredCount > 0
                      ? `${actionRequiredCount} item${actionRequiredCount !== 1 ? 's' : ''} need a reply`
                      : 'All caught up'}
                  </p>
                </div>
                {actionRequiredCount > 0 && (
                  <span className="text-[11px] font-mono text-red-300 px-1.5 py-0 rounded-md border border-red-500/30 bg-red-500/[0.06]">
                    {actionRequiredCount}
                  </span>
                )}
                <ChevronRight className="h-4 w-4 text-white/40 flex-shrink-0" />
              </button>
            </li>
            <li>
              <button
                onClick={() => setShowMessages(true)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] hover:bg-white/[0.04] transition-colors touch-manipulation text-left"
              >
                <Bell
                  className={cn(
                    'h-4 w-4 flex-shrink-0',
                    unreadCount > 0 ? 'text-elec-yellow' : 'text-white/40'
                  )}
                />
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-[13px] font-medium text-white">Unread comments</p>
                  <p className="text-[11.5px] text-white/55">
                    {unreadCount > 0
                      ? `${unreadCount} new comment${unreadCount !== 1 ? 's' : ''}`
                      : 'No new messages'}
                  </p>
                </div>
                {unreadCount > 0 && (
                  <span className="text-[11px] font-mono text-elec-yellow px-1.5 py-0 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06]">
                    {unreadCount}
                  </span>
                )}
                <ChevronRight className="h-4 w-4 text-white/40 flex-shrink-0" />
              </button>
            </li>
            <li>
              <button
                onClick={() => setShowDirectMessages(true)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] hover:bg-white/[0.04] transition-colors touch-manipulation text-left"
              >
                <MessageSquare className="h-4 w-4 text-white/40 flex-shrink-0" />
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-[13px] font-medium text-white">Message tutor</p>
                  <p className="text-[11.5px] text-white/55">
                    {connections.length > 0
                      ? `${connections.length} conversation${connections.length !== 1 ? 's' : ''}`
                      : 'Send a message to your tutor'}
                  </p>
                </div>
                {messageUnreadCount > 0 && (
                  <span className="text-[11px] font-mono text-elec-yellow px-1.5 py-0 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06]">
                    {messageUnreadCount}
                  </span>
                )}
                <ChevronRight className="h-4 w-4 text-white/40 flex-shrink-0" />
              </button>
            </li>
          </ul>
        </section>

        {/* ─── Progress shortcuts ─── */}
        <section className="space-y-3">
          <div className="space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Progress
            </span>
            <h3 className="text-[16px] sm:text-[18px] font-medium text-white">Where you stand</h3>
          </div>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setShowKSBMap(true)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] hover:bg-white/[0.04] transition-colors touch-manipulation text-left"
              >
                <Shield className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-[13px] font-medium text-white">KSB coverage map</p>
                  <p className="text-[11.5px] text-white/55">
                    Knowledge, skills &amp; behaviours covered through your ACs
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-white/40 flex-shrink-0" />
              </button>
            </li>
            <li>
              <button
                onClick={() => setShowEPAStatus(true)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] hover:bg-white/[0.04] transition-colors touch-manipulation text-left"
              >
                <GraduationCap className="h-4 w-4 text-white/40 flex-shrink-0" />
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-[13px] font-medium text-white">EPA gateway status</p>
                  <p className="text-[11.5px] text-white/55">
                    End-point assessment readiness across the 5 gates
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-white/40 flex-shrink-0" />
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/apprentice/hub?tab=progress')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] hover:bg-white/[0.04] transition-colors touch-manipulation text-left"
              >
                <Trophy className="h-4 w-4 text-white/40 flex-shrink-0" />
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-[13px] font-medium text-white">Learning tracker</p>
                  <p className="text-[11.5px] text-white/55">
                    Quizzes, flashcards, predicted grade, achievements
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-white/40 flex-shrink-0" />
              </button>
            </li>
          </ul>
        </section>
      </div>

      {/* ─── Share & export ─── */}
      <section className="space-y-3">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Share &amp; export
          </span>
          <h3 className="text-[16px] sm:text-[18px] font-medium text-white">
            Send your portfolio out
          </h3>
          <p className="text-[12px] text-white/55 leading-relaxed">
            Generate a tutor-shareable link, export a PDF, or download every file as a zip.
          </p>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <li>
            <button
              onClick={() => setShowShare(true)}
              className="w-full h-full flex items-center gap-3 px-4 py-4 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] hover:bg-white/[0.04] transition-colors touch-manipulation text-left"
            >
              <Link2 className="h-4 w-4 text-elec-yellow flex-shrink-0" />
              <div className="flex-1 min-w-0 space-y-0.5">
                <p className="text-[13px] font-medium text-white">Share link</p>
                <p className="text-[11.5px] text-white/55">
                  {shares.length > 0
                    ? `${shares.length} active`
                    : 'Generate a private link'}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-white/40 flex-shrink-0" />
            </button>
          </li>
          <li>
            <button
              onClick={handleExportPDF}
              disabled={isExportingPDF}
              className="w-full h-full flex items-center gap-3 px-4 py-4 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] hover:bg-white/[0.04] transition-colors touch-manipulation text-left disabled:opacity-50"
            >
              {isExportingPDF ? (
                <Loader2 className="h-4 w-4 text-elec-yellow animate-spin flex-shrink-0" />
              ) : (
                <FileText className="h-4 w-4 text-white/55 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0 space-y-0.5">
                <p className="text-[13px] font-medium text-white">Export PDF</p>
                <p className="text-[11.5px] text-white/55">
                  {isExportingPDF ? 'Generating…' : 'Single document for review'}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-white/40 flex-shrink-0" />
            </button>
          </li>
          <li>
            <button
              onClick={handleDownloadAll}
              disabled={isDownloadingAll}
              className="w-full h-full flex items-center gap-3 px-4 py-4 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] hover:bg-white/[0.04] transition-colors touch-manipulation text-left disabled:opacity-50"
            >
              {isDownloadingAll ? (
                <Loader2 className="h-4 w-4 text-elec-yellow animate-spin flex-shrink-0" />
              ) : (
                <Download className="h-4 w-4 text-white/55 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0 space-y-0.5">
                <p className="text-[13px] font-medium text-white">Download all</p>
                <p className="text-[11.5px] text-white/55">
                  {isDownloadingAll ? 'Creating zip…' : 'Every evidence file as a zip'}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-white/40 flex-shrink-0" />
            </button>
          </li>
        </ul>
      </section>

      {/* ─── Account ─── */}
      <section className="space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Account
        </span>
        <ul className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] divide-y divide-white/[0.04] overflow-hidden">
          <li>
            <button
              onClick={() => navigate('/settings')}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/[0.04] transition-colors touch-manipulation text-left"
            >
              <Settings className="h-4 w-4 text-white/55 flex-shrink-0" />
              <span className="text-[13px] font-medium text-white flex-1">Settings</span>
              <ChevronRight className="h-4 w-4 text-white/40 flex-shrink-0" />
            </button>
          </li>
          <li>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-red-500/[0.04] transition-colors touch-manipulation text-left"
            >
              <LogOut className="h-4 w-4 text-red-300/85 flex-shrink-0" />
              <span className="text-[13px] font-medium text-red-300/85 flex-1">Sign out</span>
            </button>
          </li>
        </ul>
      </section>

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
                <label className="text-xs text-white">Link expires after</label>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
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
                        <div className="flex items-center gap-2 text-xs text-white flex-wrap">
                          <Clock className="h-3 w-3" />
                          <span>{formatExpiry(share.expires_at)}</span>
                          <span className="text-border">•</span>
                          <Eye className="h-3 w-3" />
                          <span>{share.view_count} views</span>
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          {(share as any).last_viewed_at && (
                            <>
                              <span className="text-border">•</span>
                              <span>
                                Last viewed{' '}
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {formatDistanceToNow(new Date((share as any).last_viewed_at), {
                                  addSuffix: true,
                                })}
                              </span>
                            </>
                          )}
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
                      <div className="flex-1 p-2 rounded-lg bg-background text-xs text-white truncate">
                        {getShareUrl(share.token)}
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyLink(share.token)}
                        className="shrink-0"
                      >
                        {copiedToken === share.token ? (
                          <Check className="h-4 w-4 text-white/85" />
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
            <p className="text-xs text-white text-center">
              Anyone with a link can view your portfolio (read-only). Tutors can leave comments if
              they sign in.
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
            <SheetDescription>Review comments and actions from your tutor</SheetDescription>
          </SheetHeader>

          <div className="mt-6 overflow-y-auto max-h-[calc(70vh-10rem)] pb-8">
            {comments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-4 rounded-full bg-muted mb-4">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <p className="text-sm font-medium text-foreground">No messages yet</p>
                <p className="text-xs text-white mt-1">Comments from your tutor will appear here</p>
              </div>
            ) : (
              <div className="space-y-3 px-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className={cn('p-3 rounded-xl border border-border bg-muted/30',
                      comment.requiresAction &&
                        !comment.isResolved &&
                        'border-l-2 border-l-orange-500'
                    )}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={cn('text-[10px]',
                            comment.authorRole === 'tutor'
                              ? 'border-white/[0.06] text-white/85'
                              : comment.authorRole === 'assessor'
                                ? 'border-white/[0.06] text-white/85'
                                : 'border-border'
                          )}
                        >
                          {comment.authorRole === 'tutor'
                            ? 'Tutor'
                            : comment.authorRole === 'assessor'
                              ? 'Assessor'
                              : comment.authorRole}
                        </Badge>
                        <span className="text-xs text-white font-medium">{comment.authorName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {comment.requiresAction && !comment.isResolved && (
                          <div className="w-2 h-2 rounded-full bg-white/[0.02]" />
                        )}
                        {comment.isResolved && <Check className="h-3.5 w-3.5 text-white/85" />}
                        <span className="text-xs text-white">
                          {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-white">{comment.content}</p>
                  </div>
                ))}
              </div>
            )}
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
