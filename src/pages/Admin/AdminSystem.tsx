import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  Activity,
  Database,
  Server,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Zap,
  Users,
  HardDrive,
  Wifi,
  Shield,
  ChevronRight,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';
import PullToRefresh from '@/components/admin/PullToRefresh';

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.35, ease: 'easeOut' },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeOut' } },
};

interface HealthCheck {
  name: string;
  status: 'healthy' | 'warning' | 'error' | 'checking';
  message: string;
  lastChecked: Date;
  details?: Record<string, unknown>;
}

export default function AdminSystem() {
  const [selectedCheck, setSelectedCheck] = useState<HealthCheck | null>(null);

  // Main health check query
  const {
    data: healthChecks,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['admin-system-health'],
    queryFn: async () => {
      const checks: HealthCheck[] = [];
      const now = new Date();

      // 1. Database Connection Check
      try {
        const start = performance.now();
        const { count } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        const duration = performance.now() - start;

        checks.push({
          name: 'Database Connection',
          status: duration < 1000 ? 'healthy' : duration < 3000 ? 'warning' : 'error',
          message: `Response time: ${duration.toFixed(0)}ms`,
          lastChecked: now,
          details: { responseTime: duration, totalUsers: count },
        });
      } catch (error: unknown) {
        checks.push({
          name: 'Database Connection',
          status: 'error',
          message: error instanceof Error ? error.message : 'Unknown error',
          lastChecked: now,
        });
      }

      // 2. Auth Service Check
      try {
        const start = performance.now();
        const { data } = await supabase.auth.getSession();
        const duration = performance.now() - start;

        checks.push({
          name: 'Auth Service',
          status: duration < 500 ? 'healthy' : duration < 1500 ? 'warning' : 'error',
          message: data.session
            ? `Active session - ${duration.toFixed(0)}ms`
            : `No session - ${duration.toFixed(0)}ms`,
          lastChecked: now,
          details: { responseTime: duration, hasSession: !!data.session },
        });
      } catch (error: unknown) {
        checks.push({
          name: 'Auth Service',
          status: 'error',
          message: error instanceof Error ? error.message : 'Unknown error',
          lastChecked: now,
        });
      }

      // 3. Realtime Connection Check
      try {
        const channels = supabase.getChannels();
        checks.push({
          name: 'Realtime Service',
          status: 'healthy',
          message: `${channels.length} active channel(s)`,
          lastChecked: now,
          details: { activeChannels: channels.length },
        });
      } catch (error: unknown) {
        checks.push({
          name: 'Realtime Service',
          status: 'error',
          message: error instanceof Error ? error.message : 'Unknown error',
          lastChecked: now,
        });
      }

      // 4. Storage Check (via profiles table as proxy)
      try {
        const { count } = await supabase
          .from('profiles')
          .select('avatar_url', { count: 'exact', head: true })
          .not('avatar_url', 'is', null);

        checks.push({
          name: 'Storage Service',
          status: 'healthy',
          message: `${count || 0} files referenced`,
          lastChecked: now,
          details: { filesReferenced: count },
        });
      } catch (_error: unknown) {
        checks.push({
          name: 'Storage Service',
          status: 'warning',
          message: 'Unable to verify storage',
          lastChecked: now,
        });
      }

      // 5. Recent Activity Check
      try {
        const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000);
        const { count } = await supabase
          .from('user_presence')
          .select('*', { count: 'exact', head: true })
          .gte('last_seen', fiveMinAgo.toISOString());

        checks.push({
          name: 'User Activity',
          status: (count || 0) > 0 ? 'healthy' : 'warning',
          message: `${count || 0} active users (5 min)`,
          lastChecked: now,
          details: { activeUsers: count },
        });
      } catch (_error: unknown) {
        checks.push({
          name: 'User Activity',
          status: 'warning',
          message: 'Unable to check activity',
          lastChecked: now,
        });
      }

      // 6. Table Integrity Check
      try {
        const criticalTables = ['profiles', 'global_chat_messages', 'promo_offers'];
        const tableCounts: Record<string, number> = {};

        for (const table of criticalTables) {
          const { count } = await supabase.from(table).select('*', { count: 'exact', head: true });
          tableCounts[table] = count || 0;
        }

        checks.push({
          name: 'Critical Tables',
          status: 'healthy',
          message: `${criticalTables.length} tables accessible`,
          lastChecked: now,
          details: { tableCounts },
        });
      } catch (error: unknown) {
        checks.push({
          name: 'Critical Tables',
          status: 'error',
          message: error instanceof Error ? error.message : 'Unknown error',
          lastChecked: now,
        });
      }

      return checks;
    },
    refetchInterval: 60000, // Refresh every minute
  });

  // Get database stats
  const { data: dbStats } = useQuery({
    queryKey: ['admin-db-stats'],
    queryFn: async () => {
      const [profilesRes, messagesRes, offersRes, presenceRes] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('global_chat_messages').select('*', { count: 'exact', head: true }),
        supabase.from('promo_offers').select('*', { count: 'exact', head: true }),
        supabase.from('user_presence').select('*', { count: 'exact', head: true }),
      ]);

      return {
        profiles: profilesRes.count || 0,
        messages: messagesRes.count || 0,
        offers: offersRes.count || 0,
        presence: presenceRes.count || 0,
      };
    },
  });

  const getStatusIcon = (status: HealthCheck['status']) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-400" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-400" />;
      case 'checking':
        return <RefreshCw className="h-5 w-5 text-blue-400 animate-spin" />;
    }
  };

  const getStatusBadge = (status: HealthCheck['status']) => {
    switch (status) {
      case 'healthy':
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Healthy</Badge>
        );
      case 'warning':
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Warning</Badge>
        );
      case 'error':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Error</Badge>;
      case 'checking':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Checking</Badge>;
    }
  };

  const getCheckIcon = (name: string) => {
    switch (name) {
      case 'Database Connection':
        return <Database className="h-5 w-5" />;
      case 'Auth Service':
        return <Shield className="h-5 w-5" />;
      case 'Realtime Service':
        return <Wifi className="h-5 w-5" />;
      case 'Storage Service':
        return <HardDrive className="h-5 w-5" />;
      case 'User Activity':
        return <Users className="h-5 w-5" />;
      case 'Critical Tables':
        return <Server className="h-5 w-5" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };

  const overallStatus = healthChecks?.every((c) => c.status === 'healthy')
    ? 'healthy'
    : healthChecks?.some((c) => c.status === 'error')
      ? 'error'
      : 'warning';

  const statusAccentColor =
    overallStatus === 'healthy'
      ? 'from-green-500 to-emerald-400'
      : overallStatus === 'error'
        ? 'from-red-500 to-rose-400'
        : 'from-amber-500 to-orange-400';

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <div className="space-y-4 pb-20">
        {/* Overall Status — compact bar */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={0}>
          <div className="glass-premium rounded-2xl overflow-hidden">
            <div className={`h-1 bg-gradient-to-r ${statusAccentColor}`} />
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    overallStatus === 'healthy'
                      ? 'bg-green-500/20'
                      : overallStatus === 'error'
                        ? 'bg-red-500/20'
                        : 'bg-amber-500/20'
                  }`}
                >
                  {overallStatus === 'healthy' ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : overallStatus === 'error' ? (
                    <XCircle className="h-5 w-5 text-red-400" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                  )}
                </div>
                <div>
                  <h2 className="text-base font-semibold !text-white">
                    {overallStatus === 'healthy'
                      ? 'All Systems Operational'
                      : overallStatus === 'error'
                        ? 'System Issues Detected'
                        : 'Performance Warnings'}
                  </h2>
                  <p className="text-xs !text-white">
                    {healthChecks?.length || 0} services monitored
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11 touch-manipulation"
                onClick={() => refetch()}
                disabled={isFetching}
              >
                <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Database Stats */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={1}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-4 gap-2"
          >
            <motion.div
              variants={listItemVariants}
              whileTap={{ scale: 0.97 }}
              className="bg-white/5 rounded-xl p-3 text-center touch-manipulation"
            >
              <Users className="h-5 w-5 text-blue-400 mx-auto mb-1" />
              <p className="text-2xl sm:text-xl font-bold text-blue-400">
                <AnimatedCounter value={dbStats?.profiles || 0} />
              </p>
              <p className="text-xs text-white">Profiles</p>
            </motion.div>
            <motion.div
              variants={listItemVariants}
              whileTap={{ scale: 0.97 }}
              className="bg-white/5 rounded-xl p-3 text-center touch-manipulation"
            >
              <Zap className="h-5 w-5 text-yellow-400 mx-auto mb-1" />
              <p className="text-2xl sm:text-xl font-bold text-yellow-400">
                <AnimatedCounter value={dbStats?.messages || 0} />
              </p>
              <p className="text-xs text-white">Messages</p>
            </motion.div>
            <motion.div
              variants={listItemVariants}
              whileTap={{ scale: 0.97 }}
              className="bg-white/5 rounded-xl p-3 text-center touch-manipulation"
            >
              <Server className="h-5 w-5 text-green-400 mx-auto mb-1" />
              <p className="text-2xl sm:text-xl font-bold text-green-400">
                <AnimatedCounter value={dbStats?.offers || 0} />
              </p>
              <p className="text-xs text-white">Offers</p>
            </motion.div>
            <motion.div
              variants={listItemVariants}
              whileTap={{ scale: 0.97 }}
              className="bg-white/5 rounded-xl p-3 text-center touch-manipulation"
            >
              <Activity className="h-5 w-5 text-amber-400 mx-auto mb-1" />
              <p className="text-2xl sm:text-xl font-bold text-amber-400">
                <AnimatedCounter value={dbStats?.presence || 0} />
              </p>
              <p className="text-xs text-white">Presence</p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Health Checks List */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={2}>
          <div className="glass-premium rounded-2xl overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-purple-500 to-violet-400" />
            <div className="p-4 pb-2">
              <h3 className="text-sm font-semibold !text-white flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-400" />
                Service Health Checks
              </h3>
            </div>
            {isLoading ? (
              <div className="p-4 space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-white/[0.06] animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <motion.div variants={containerVariants} initial="hidden" animate="visible">
                {healthChecks?.map((check, i) => (
                  <motion.div
                    key={i}
                    variants={listItemVariants}
                    className={`flex items-center justify-between p-4 touch-manipulation active:bg-white/5 cursor-pointer transition-all ${i > 0 ? 'border-t border-white/[0.04]' : ''}`}
                    onClick={() => setSelectedCheck(check)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center ${
                          check.status === 'healthy'
                            ? 'text-green-400'
                            : check.status === 'error'
                              ? 'text-red-400'
                              : 'text-amber-400'
                        }`}
                      >
                        {getCheckIcon(check.name)}
                      </div>
                      <div>
                        <p className="font-medium text-sm !text-white">{check.name}</p>
                        <p className="text-xs !text-white">{check.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(check.status)}
                      <ChevronRight className="h-4 w-4 !text-white" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Check Detail Sheet */}
        <Sheet open={!!selectedCheck} onOpenChange={() => setSelectedCheck(null)}>
          <SheetContent side="bottom" className="h-[60vh] rounded-t-2xl p-0">
            <div className="flex flex-col h-full">
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-white/20 rounded-full" />
              </div>

              <SheetHeader className="px-4 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      selectedCheck?.status === 'healthy'
                        ? 'bg-green-500/20 text-green-400'
                        : selectedCheck?.status === 'error'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {selectedCheck && getCheckIcon(selectedCheck.name)}
                  </div>
                  <div>
                    <p className="text-left">{selectedCheck?.name}</p>
                    <div className="mt-1">
                      {selectedCheck && getStatusBadge(selectedCheck.status)}
                    </div>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="glass-premium rounded-2xl overflow-hidden p-4">
                  <h4 className="text-sm font-semibold !text-white mb-2">Status Message</h4>
                  <p className="text-sm !text-white">{selectedCheck?.message}</p>
                </div>

                {selectedCheck?.details && Object.keys(selectedCheck.details).length > 0 && (
                  <div className="glass-premium rounded-2xl overflow-hidden p-4 space-y-2">
                    <h4 className="text-sm font-semibold !text-white mb-2">Details</h4>
                    {Object.entries(selectedCheck.details).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm !text-white capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-sm font-mono">
                          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="glass-premium rounded-2xl overflow-hidden p-4">
                  <h4 className="text-sm font-semibold !text-white flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4" />
                    Last Checked
                  </h4>
                  <p className="text-sm !text-white">
                    {selectedCheck?.lastChecked &&
                      formatDistanceToNow(selectedCheck.lastChecked, { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </PullToRefresh>
  );
}
