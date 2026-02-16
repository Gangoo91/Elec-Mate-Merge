/**
 * SharedPortfolioView
 *
 * Public page for viewing AND reviewing a shared portfolio via token-based link.
 * No login required — uses anon Supabase client + SECURITY DEFINER RPCs.
 *
 * Refactored to a tab-based shell with:
 * - Overview: progress rings, apprentice info, PDF download
 * - Units & ACs: expandable unit → LO → AC tree with coverage
 * - KSBs: K1-K8, B1-B8 with status and unit links
 * - Evidence: items list, comments, assessor review (all existing logic preserved)
 * - Hours: OTJ progress
 *
 * Reviewer identity (name + role) is set once in the shell and shared across all tabs.
 */

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Loader2,
  AlertTriangle,
  ClipboardCheck,
} from 'lucide-react';
import { useSharedPortfolioStructured } from '@/hooks/portfolio/useSharedPortfolioStructured';
import { usePortfolioExportData } from '@/hooks/portfolio/usePortfolioExportData';
import { StructuredPortfolioExportService } from '@/services/structuredPortfolioExportService';
import SharedPortfolioNav, { type SharedTab } from '@/components/shared-portfolio/SharedPortfolioNav';
import SharedOverviewTab from '@/components/shared-portfolio/tabs/SharedOverviewTab';
import SharedUnitsTab from '@/components/shared-portfolio/tabs/SharedUnitsTab';
import SharedKSBTab from '@/components/shared-portfolio/tabs/SharedKSBTab';
import SharedEvidenceTab from '@/components/shared-portfolio/tabs/SharedEvidenceTab';
import SharedHoursTab from '@/components/shared-portfolio/tabs/SharedHoursTab';

export default function SharedPortfolioView() {
  const { token } = useParams<{ token: string }>();
  const {
    data,
    isLoading,
    error,
    reloadComments,
    reloadSubmissions,
    anonClient,
  } = useSharedPortfolioStructured(token);

  const { fetchSharedExportData } = usePortfolioExportData();

  // Tab state
  const [activeTab, setActiveTab] = useState<SharedTab>('overview');

  // Shared reviewer identity (persists across tab switches)
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRole, setReviewerRole] = useState('assessor');

  // PDF download state
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    if (!token) return;
    setIsDownloading(true);
    try {
      const exportData = await fetchSharedExportData(token);
      if (exportData) {
        const service = new StructuredPortfolioExportService();
        await service.exportToPDF(exportData, { includeAppendix: true });
      }
    } catch (err) {
      console.error('PDF download failed:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const pendingCount = data?.submissions.filter((s) =>
    ['submitted', 'resubmitted', 'under_review'].includes(s.status)
  ).length || 0;

  // ─── Loading State ─────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Loader2 className="h-10 w-10 animate-spin text-yellow-400 mx-auto mb-4" />
          <p className="text-white text-lg font-medium">Loading portfolio...</p>
        </motion.div>
      </div>
    );
  }

  // ─── Error / Expired State ─────────────────────────────────

  if (error || !data) {
    const isExpired = error?.includes('expired') || error?.includes('Invalid');
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white/5 rounded-2xl p-8 text-center border border-white/10"
        >
          <AlertTriangle className="h-12 w-12 text-amber-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">
            {isExpired ? 'Link Expired' : 'Portfolio Not Found'}
          </h1>
          <p className="text-white text-sm">
            {isExpired
              ? 'This share link has expired or been revoked. Please ask the portfolio owner for a new link.'
              : 'This portfolio link is invalid. Please check the URL and try again.'}
          </p>
        </motion.div>
      </div>
    );
  }

  // ─── Main Layout ───────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#0a0f1a] flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 bg-[#0a0f1a]/95 backdrop-blur-lg border-b border-white/10"
      >
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-yellow-400/20 flex items-center justify-center shrink-0">
              <Briefcase className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-white truncate">
                {data.apprentice.share_title || `${data.apprentice.name}'s Portfolio`}
              </h1>
              <p className="text-sm text-white">
                {data.apprentice.name} &middot; {data.entries.length} evidence{' '}
                {data.entries.length === 1 ? 'item' : 'items'}
                {pendingCount > 0 && (
                  <span className="text-yellow-400">
                    {' '}
                    &middot; {pendingCount} awaiting review
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Reviewer Identity */}
          <div className="mt-3 bg-yellow-400/10 rounded-xl border border-yellow-400/20 p-3">
            <p className="text-xs text-yellow-400 font-semibold mb-2 flex items-center gap-2">
              <ClipboardCheck className="h-3.5 w-3.5" />
              Your Details (used for all feedback)
            </p>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Your name"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                className="h-11 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-yellow-400/50 touch-manipulation"
              />
              <select
                value={reviewerRole}
                onChange={(e) => setReviewerRole(e.target.value)}
                className="h-11 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-yellow-400/50 touch-manipulation"
              >
                <option value="assessor">Assessor</option>
                <option value="tutor">Tutor</option>
                <option value="admin">Admin</option>
                <option value="employer">Employer</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-3xl mx-auto">
          <SharedPortfolioNav
            activeTab={activeTab}
            onTabChange={setActiveTab}
            pendingCount={pendingCount}
          />
        </div>
      </motion.header>

      {/* Tab Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full pb-20">
        {activeTab === 'overview' && (
          <SharedOverviewTab
            data={data}
            onDownloadPDF={handleDownloadPDF}
            isDownloading={isDownloading}
          />
        )}
        {activeTab === 'units' && <SharedUnitsTab units={data.units} />}
        {activeTab === 'ksbs' && <SharedKSBTab ksbSummary={data.ksb_summary} />}
        {activeTab === 'evidence' && token && (
          <SharedEvidenceTab
            data={data}
            token={token}
            reviewerName={reviewerName}
            reviewerRole={reviewerRole}
            anonClient={anonClient}
            onCommentsReloaded={reloadComments}
            onSubmissionsReloaded={reloadSubmissions}
          />
        )}
        {activeTab === 'hours' && <SharedHoursTab otjHours={data.otj_hours} />}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 inset-x-0 bg-[#0a0f1a]/95 backdrop-blur-lg border-t border-white/10 py-3 text-center">
        <p className="text-xs text-white">
          Powered by <span className="font-semibold text-yellow-400">Elec-Mate</span>
        </p>
      </footer>
    </div>
  );
}
