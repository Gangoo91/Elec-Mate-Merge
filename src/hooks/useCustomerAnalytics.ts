import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CustomerGrowthPoint {
  month: string;
  count: number;
}

export interface RevenueByCustomer {
  name: string;
  revenue: number;
}

export interface CertTypeDistribution {
  type: string;
  count: number;
}

export interface ActivityByDay {
  day: string;
  count: number;
}

export interface CustomerAnalytics {
  totalCustomers: number;
  customersLastMonth: number;
  totalRevenue: number;
  activeCertificates: number;
  expiringSoonCount: number;
  customerGrowth: CustomerGrowthPoint[];
  revenueByCustomer: RevenueByCustomer[];
  certTypeDistribution: CertTypeDistribution[];
  activityByDay: ActivityByDay[];
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CERT_TYPE_LABELS: Record<string, string> = {
  eicr: 'EICR',
  eic: 'EIC',
  'minor-works': 'Minor Works',
  'fire-alarm': 'Fire Alarm',
  'emergency-lighting': 'Emergency Lighting',
  'ev-charging': 'EV Charging',
  'solar-pv': 'Solar PV',
};

export const useCustomerAnalytics = () => {
  return useQuery({
    queryKey: ['customer-analytics'],
    queryFn: async (): Promise<CustomerAnalytics> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const now = new Date();
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

      // Fetch all data in parallel
      const [
        customersResult,
        lastMonthCustomersResult,
        reportsResult,
        activityResult,
        expiryResult,
      ] = await Promise.all([
        // All customers
        supabase
          .from('customers')
          .select('id, name, created_at', { count: 'exact' })
          .eq('user_id', user.id),

        // Customers added last month
        supabase
          .from('customers')
          .select('id', { count: 'exact' })
          .eq('user_id', user.id)
          .gte('created_at', lastMonthStart.toISOString())
          .lte('created_at', lastMonthEnd.toISOString()),

        // Reports with customer_id set
        supabase
          .from('reports')
          .select('id, report_type, status, created_at, customer_id')
          .eq('user_id', user.id)
          .not('customer_id', 'is', null),

        // Activity log for last 6 months
        supabase
          .from('customer_activity_log')
          .select('id, created_at')
          .eq('user_id', user.id)
          .gte('created_at', sixMonthsAgo.toISOString()),

        // Expiring certificates from the dedicated expiry table
        supabase
          .from('certificate_expiry_reminders')
          .select('id, expiry_date')
          .eq('user_id', user.id)
          .gte('expiry_date', now.toISOString())
          .lte('expiry_date', thirtyDaysFromNow.toISOString()),
      ]);

      // Gracefully handle individual query errors
      if (customersResult.error) console.warn('Customer analytics: customers query failed', customersResult.error.message);
      if (reportsResult.error) console.warn('Customer analytics: reports query failed', reportsResult.error.message);
      if (activityResult.error) console.warn('Customer analytics: activity query failed', activityResult.error.message);

      const customers = customersResult.data || [];
      const totalCustomers = customersResult.count || 0;
      const customersLastMonth = lastMonthCustomersResult.count || 0;
      const reports = reportsResult.data || [];
      const activities = activityResult.data || [];
      const expiringSoonCount = expiryResult.data?.length || 0;

      // Customer growth — new customers per month over last 6 months
      const growthMap = new Map<string, number>();
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = d.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' });
        growthMap.set(key, 0);
      }
      for (const c of customers) {
        const d = new Date(c.created_at);
        if (d >= sixMonthsAgo) {
          const key = d.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' });
          if (growthMap.has(key)) {
            growthMap.set(key, (growthMap.get(key) || 0) + 1);
          }
        }
      }
      const customerGrowth: CustomerGrowthPoint[] = Array.from(growthMap.entries()).map(
        ([month, count]) => ({ month, count })
      );

      // Revenue by customer — use RPC if available, otherwise skip
      let revenueByCustomer: RevenueByCustomer[] = [];
      const customerIds = customers.map(c => c.id);
      if (customerIds.length > 0) {
        try {
          const { data: quoteData, error: rpcError } = await supabase.rpc('get_customer_quote_stats', {
            p_customer_ids: customerIds,
          });
          if (rpcError) {
            console.warn('Customer analytics: quote stats RPC failed', rpcError.message);
          } else if (quoteData && quoteData.length > 0) {
            const revenueList = quoteData
              .map((q: any) => {
                const customer = customers.find(c => c.id === q.customer_id);
                return {
                  name: customer?.name || 'Unknown',
                  revenue: Number(q.total_quoted || 0) + Number(q.total_invoiced || 0),
                };
              })
              .filter((r: RevenueByCustomer) => r.revenue > 0)
              .sort((a: RevenueByCustomer, b: RevenueByCustomer) => b.revenue - a.revenue)
              .slice(0, 5);
            revenueByCustomer = revenueList;
          }
        } catch {
          // RPC not available
        }
      }

      // Total revenue
      const totalRevenue = revenueByCustomer.reduce((sum, r) => sum + r.revenue, 0);

      // Certificate type distribution
      const certTypeMap = new Map<string, number>();
      for (const r of reports) {
        const type = r.report_type || 'other';
        certTypeMap.set(type, (certTypeMap.get(type) || 0) + 1);
      }
      const certTypeDistribution: CertTypeDistribution[] = Array.from(certTypeMap.entries())
        .map(([type, count]) => ({
          type: CERT_TYPE_LABELS[type] || type.toUpperCase(),
          count,
        }))
        .sort((a, b) => b.count - a.count);

      // Active certificates
      const activeCertificates = reports.filter(
        r => r.status === 'completed' || r.status === 'in-progress'
      ).length;

      // Activity by day of week
      const dayCountMap = new Map<number, number>();
      for (let i = 0; i < 7; i++) dayCountMap.set(i, 0);
      for (const a of activities) {
        const day = new Date(a.created_at).getDay();
        dayCountMap.set(day, (dayCountMap.get(day) || 0) + 1);
      }
      const activityByDay: ActivityByDay[] = Array.from(dayCountMap.entries())
        .sort(([a], [b]) => a - b)
        .map(([day, count]) => ({
          day: DAY_LABELS[day],
          count,
        }));

      return {
        totalCustomers,
        customersLastMonth,
        totalRevenue,
        activeCertificates,
        expiringSoonCount,
        customerGrowth,
        revenueByCustomer,
        certTypeDistribution,
        activityByDay,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
