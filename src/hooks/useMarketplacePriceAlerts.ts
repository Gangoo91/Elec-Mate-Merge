import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PriceAlert {
  alert_id: string;
  product_id: string;
  product_name: string;
  product_brand: string | null;
  product_url: string;
  image_url: string | null;
  supplier_name: string;
  current_price: number;
  price_when_saved: number;
  price_drop_pct: number;
  savings: number;
}

/**
 * Hook to manage price alerts for marketplace products.
 * Users can watch products and get notified when prices drop.
 */
export function useMarketplacePriceAlerts() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get active alerts (products that dropped in price)
  const alertsQuery = useQuery<PriceAlert[]>({
    queryKey: ['marketplace-price-alerts'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase.rpc('fn_check_price_alerts', {
        p_user_id: user.id,
      });

      if (error) {
        console.error('Price alerts error:', error);
        return [];
      }

      return (data || []) as PriceAlert[];
    },
    staleTime: 5 * 60 * 1000,
  });

  // Get watched product IDs (for showing watch state on cards)
  const watchedQuery = useQuery<Set<string>>({
    queryKey: ['marketplace-watched-products'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return new Set<string>();

      const { data, error } = await supabase
        .from('marketplace_price_alerts')
        .select('product_id')
        .eq('user_id', user.id)
        .eq('is_active', true);

      if (error) {
        console.error('Watched products error:', error);
        return new Set<string>();
      }

      return new Set((data || []).map((d: { product_id: string }) => d.product_id));
    },
    staleTime: 5 * 60 * 1000,
  });

  // Watch a product for price drops
  const watchMutation = useMutation({
    mutationFn: async ({
      productId,
      currentPrice,
    }: {
      productId: string;
      currentPrice: number;
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('marketplace_price_alerts').upsert(
        {
          user_id: user.id,
          product_id: productId,
          price_when_saved: currentPrice,
          is_active: true,
        },
        { onConflict: 'user_id,product_id' }
      );

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketplace-watched-products'] });
      queryClient.invalidateQueries({ queryKey: ['marketplace-price-alerts'] });
      toast({
        title: 'Price watch added',
        description: "We'll alert you when this drops in price",
      });
    },
    onError: () => {
      toast({
        title: 'Failed to watch product',
        description: 'Please try again',
        variant: 'destructive',
      });
    },
  });

  // Unwatch a product
  const unwatchMutation = useMutation({
    mutationFn: async (productId: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('marketplace_price_alerts')
        .update({ is_active: false })
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketplace-watched-products'] });
      queryClient.invalidateQueries({ queryKey: ['marketplace-price-alerts'] });
    },
  });

  // Dismiss an alert (mark as alerted at current price)
  const dismissMutation = useMutation({
    mutationFn: async ({ alertId, currentPrice }: { alertId: string; currentPrice: number }) => {
      const { error } = await supabase
        .from('marketplace_price_alerts')
        .update({ last_alerted_price: currentPrice, updated_at: new Date().toISOString() })
        .eq('id', alertId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketplace-price-alerts'] });
    },
  });

  return {
    alerts: alertsQuery.data || [],
    alertCount: alertsQuery.data?.length || 0,
    watchedProducts: watchedQuery.data || new Set<string>(),
    isLoading: alertsQuery.isLoading,
    watchProduct: (productId: string, currentPrice: number) =>
      watchMutation.mutate({ productId, currentPrice }),
    unwatchProduct: (productId: string) => unwatchMutation.mutate(productId),
    dismissAlert: (alertId: string, currentPrice: number) =>
      dismissMutation.mutate({ alertId, currentPrice }),
    isWatching: watchMutation.isPending,
  };
}
