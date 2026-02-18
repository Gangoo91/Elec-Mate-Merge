import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ClipboardList,
  Camera,
  Plus,
  MapPin,
  User,
  Clock,
  FileText,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSiteVisitStorage, type EnrichedSiteVisit } from '@/hooks/useSiteVisitStorage';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const statusConfig: Record<string, { label: string; colour: string }> = {
  in_progress: { label: 'In Progress', colour: 'bg-amber-500' },
  completed: { label: 'Completed', colour: 'bg-emerald-500' },
  scope_sent: { label: 'Scope Sent', colour: 'bg-blue-500' },
  signed: { label: 'Signed', colour: 'bg-emerald-600' },
  post_job: { label: 'Post-Job', colour: 'bg-purple-500' },
};

function relativeDate(dateStr?: string): string {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return '1 day ago';
  if (days < 30) return `${days} days ago`;
  return new Date(dateStr).toLocaleDateString('en-GB');
}

const SiteVisitsHubPage = () => {
  const navigate = useNavigate();
  const { listSiteVisits, isLoading } = useSiteVisitStorage();
  const [visits, setVisits] = useState<EnrichedSiteVisit[]>([]);
  const [showPostJobSheet, setShowPostJobSheet] = useState(false);

  useEffect(() => {
    listSiteVisits().then(setVisits);
  }, [listSiteVisits]);

  const handleRefresh = useCallback(async () => {
    const data = await listSiteVisits();
    setVisits(data);
  }, [listSiteVisits]);

  // Eligible for post-job: completed/scope_sent/signed + accepted quote
  const postJobEligible = visits.filter(
    (v) =>
      ['completed', 'scope_sent', 'signed'].includes(v.status) &&
      v.quoteId &&
      v.quoteAcceptanceStatus === 'accepted'
  );

  const handleSelectPostJob = (visitId: string) => {
    setShowPostJobSheet(false);
    navigate(`/electrician/site-visit/${visitId}?tab=post-job`);
  };

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      <Helmet>
        <title>Site Visits | Elec-Mate</title>
        <meta
          name="description"
          content="Manage site visits — pre-site scope capture, post-site completion and sign-off."
        />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md">
        <div className="flex items-center h-14 px-4 gap-2">
          <button
            onClick={() => navigate('/electrician/business')}
            className="h-10 w-10 -ml-2 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.98] transition-all touch-manipulation"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">Site Visits</h1>
            <p className="text-[11px] text-white">Manage your site visits</p>
          </div>
          <button
            onClick={() => navigate('/electrician/site-visit/new')}
            className="h-10 w-10 rounded-xl bg-elec-yellow flex items-center justify-center active:scale-[0.98] touch-manipulation"
          >
            <Plus className="h-5 w-5 text-black" />
          </button>
        </div>
      </header>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-4 space-y-6"
      >
        {/* CTA Cards — Side by side */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
          {/* Pre-Site Visit */}
          <button
            onClick={() => navigate('/electrician/site-visit/new')}
            className="p-4 rounded-2xl bg-gradient-to-br from-emerald-600/30 to-emerald-500/10 border border-emerald-500/30 text-left touch-manipulation active:scale-[0.98] transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center mb-3">
              <ClipboardList className="h-5 w-5 text-white" />
            </div>
            <p className="text-[15px] font-semibold text-white">Pre-Site Visit</p>
            <p className="text-[12px] text-white mt-1 leading-relaxed">
              Capture scope, photos & generate quotes
            </p>
            <p className="text-[13px] font-semibold text-emerald-400 mt-3">Start</p>
          </button>

          {/* Post-Site Visit */}
          <button
            onClick={() => setShowPostJobSheet(true)}
            className="p-4 rounded-2xl bg-gradient-to-br from-blue-600/30 to-blue-500/10 border border-blue-500/30 text-left touch-manipulation active:scale-[0.98] transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center mb-3">
              <Camera className="h-5 w-5 text-white" />
            </div>
            <p className="text-[15px] font-semibold text-white">Post-Site Visit</p>
            <p className="text-[12px] text-white mt-1 leading-relaxed">
              After photos, client sign-off & invoice
            </p>
            <p className="text-[13px] font-semibold text-blue-400 mt-3">Start</p>
          </button>
        </motion.div>

        {/* Recent Visits List */}
        <motion.section variants={itemVariants} className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
              <h2 className="text-base font-bold text-white">Recent Visits</h2>
            </div>
            <span className="text-sm text-white">
              {visits.length} {visits.length === 1 ? 'visit' : 'visits'}
            </span>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 text-elec-yellow animate-spin" />
            </div>
          ) : visits.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
              <ClipboardList className="h-10 w-10 mx-auto text-white mb-3" />
              <p className="font-medium text-white">No site visits yet</p>
              <p className="text-sm text-white mt-1">
                Start your first site visit to capture scope and generate quotes
              </p>
              <Button
                onClick={() => navigate('/electrician/site-visit/new')}
                className="mt-4 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Site Visit
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {visits.map((visit) => {
                const sc = statusConfig[visit.status] || statusConfig.in_progress;
                return (
                  <button
                    key={visit.id}
                    onClick={() => navigate(`/electrician/site-visit/${visit.id}`)}
                    className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-left touch-manipulation active:bg-white/[0.06] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                          <p className="text-sm font-semibold text-white truncate">
                            {visit.propertyAddress || 'No address'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {visit.customerName && (
                            <>
                              <User className="h-3 w-3 text-blue-400 flex-shrink-0" />
                              <span className="text-xs text-white">{visit.customerName}</span>
                              <span className="text-white">·</span>
                            </>
                          )}
                          <Clock className="h-3 w-3 text-white flex-shrink-0" />
                          <span className="text-xs text-white">
                            {relativeDate(visit.updatedAt)}
                          </span>
                        </div>
                        {visit.quoteAcceptanceStatus && (
                          <div className="flex items-center gap-1.5 mt-1">
                            <FileText className="h-3 w-3 text-white flex-shrink-0" />
                            <span className="text-xs text-white capitalize">
                              Quote:{' '}
                              {visit.quoteAcceptanceStatus === 'accepted'
                                ? 'Accepted'
                                : visit.quoteAcceptanceStatus}
                            </span>
                          </div>
                        )}
                      </div>
                      <span
                        className={`${sc.colour} text-[10px] font-semibold text-white px-2 py-0.5 rounded-full flex-shrink-0`}
                      >
                        {sc.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </motion.section>
      </motion.main>

      {/* Post-Job Bottom Sheet */}
      <Sheet open={showPostJobSheet} onOpenChange={setShowPostJobSheet}>
        <SheetContent side="bottom" className="h-[60vh] rounded-t-2xl overflow-hidden">
          <SheetHeader className="px-4 pt-4 pb-2">
            <SheetTitle className="text-white">Select a Visit for Post-Job</SheetTitle>
          </SheetHeader>
          <div className="px-4 pb-8 overflow-y-auto flex-1">
            {postJobEligible.length === 0 ? (
              <div className="py-12 text-center">
                <ClipboardList className="h-10 w-10 mx-auto text-white mb-3" />
                <p className="font-medium text-white">No visits ready for post-job yet</p>
                <p className="text-sm text-white mt-1">
                  Complete a site visit and have the quote accepted first
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {postJobEligible.map((visit) => (
                  <button
                    key={visit.id}
                    onClick={() => handleSelectPostJob(visit.id)}
                    className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-left touch-manipulation active:bg-white/[0.06] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                      <p className="text-sm font-semibold text-white truncate">
                        {visit.propertyAddress || 'No address'}
                      </p>
                    </div>
                    {visit.customerName && (
                      <div className="flex items-center gap-2 mt-1">
                        <User className="h-3 w-3 text-blue-400 flex-shrink-0" />
                        <span className="text-xs text-white">{visit.customerName}</span>
                        <span className="text-white">·</span>
                        <span className="text-xs text-white">{relativeDate(visit.updatedAt)}</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SiteVisitsHubPage;
