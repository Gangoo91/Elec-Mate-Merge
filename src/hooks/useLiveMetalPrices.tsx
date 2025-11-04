
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';

interface PriceMetric {
  id: number;
  name: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  subItems?: PriceMetric[];
}

interface Alert {
  id: number;
  message: string;
  date: string;
  type: "warning" | "info";
}

interface RegionalPricingData {
  id: string;
  region: string;
  county: string;
  job_type: string;
  job_category: string;
  min_price: number;
  max_price: number;
  average_price: number;
  currency: string;
  unit: string;
  complexity_level: string;
  last_updated: string;
  data_source: string;
}

interface MetalPricesData {
  metalPrices: PriceMetric[];
  cablePrices: PriceMetric[];
  equipmentPrices: PriceMetric[];
  marketAlerts: Alert[];
  regionalJobPricing: RegionalPricingData[];
  lastUpdated: string;
  dataSource?: string;
  isLive?: boolean;
  // Debug fields
  apiProvider?: string;
  apiKeySuffix?: string;
  triedLive?: boolean;
  liveAttemptError?: string | null;
}

export const useLiveMetalPrices = () => {
  const { toast } = useToast();
  const [data, setData] = useState<MetalPricesData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = async (forceLive = false) => {
    setIsLoading(true);
    setError(null);
    
    logger.info('Starting to fetch metal prices and regional job pricing', { forceLive });

    try {
      const { data: pricesData, error: pricesError } = await supabase.functions.invoke('fetch-metal-prices', {
        body: {
          forceLive,
          cacheBuster: Date.now().toString()
        }
      });

      if (pricesError) {
        logger.error('Error from fetch-metal-prices function:', pricesError);
        toast({
          title: 'Unable to Fetch Live Prices',
          description: 'Displaying cached pricing data. Please try refreshing in a moment.',
          variant: 'destructive'
        });
        // Return null to use cached/fallback data
        return null;
      }

      logger.info('Raw response from fetch-metal-prices:', {
        hasData: !!pricesData,
        dataSource: pricesData?.dataSource,
        isLive: pricesData?.isLive,
        metalCount: pricesData?.metalPrices?.length,
        regionalCount: pricesData?.regionalJobPricing?.length
      });
      
      // Check if we have the expected structure
      if (!pricesData) {
        logger.warn('No data returned from fetch-metal-prices function');
        toast({
          title: 'No Pricing Data Available',
          description: 'Unable to load pricing information. Please try again later.',
          variant: 'destructive'
        });
        return null;
      }

      // Log regional pricing data specifically
      if (pricesData.regionalJobPricing) {
        logger.info('Regional job pricing data found:', {
          count: pricesData.regionalJobPricing.length,
          data: pricesData.regionalJobPricing
        });
      } else {
        logger.warn('No regionalJobPricing in response');
      }

      // Ensure we have all required fields with fallbacks
      const processedData: MetalPricesData = {
        metalPrices: pricesData.metalPrices || [],
        cablePrices: pricesData.cablePrices || [],
        equipmentPrices: pricesData.equipmentPrices || [],
        marketAlerts: pricesData.marketAlerts || [],
        regionalJobPricing: pricesData.regionalJobPricing || [],
        lastUpdated: pricesData.lastUpdated || new Date().toLocaleString('en-GB'),
        dataSource: pricesData.dataSource || 'unknown',
        isLive: pricesData.dataSource === 'live_api',
        // Include debug info
        apiProvider: pricesData.apiProvider,
        apiKeySuffix: pricesData.apiKeySuffix,
        triedLive: pricesData.triedLive,
        liveAttemptError: pricesData.liveAttemptError
      };

      logger.info('Processed data structure:', {
        metalPricesCount: processedData.metalPrices.length,
        cablePricesCount: processedData.cablePrices.length,
        equipmentPricesCount: processedData.equipmentPrices.length,
        marketAlertsCount: processedData.marketAlerts.length,
        regionalJobPricingCount: processedData.regionalJobPricing.length,
        lastUpdated: processedData.lastUpdated,
        // Debug: Show metal prices with subItems
        metalPricesWithSubItems: processedData.metalPrices.filter(p => p.subItems).map(p => ({ 
          name: p.name, 
          subItemsCount: p.subItems?.length,
          subItems: p.subItems?.map(s => s.name)
        }))
      });

      setData(processedData);
      return processedData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch metal prices';
      logger.error('Error in fetchPrices:', errorMessage, err);
      setError(errorMessage);
      
      // Only show toast if we don't already have cached data
      if (!data) {
        toast({
          title: 'Connection Issue',
          description: 'Unable to load live pricing. Please check your connection and try again.',
          variant: 'destructive'
        });
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const refreshPrices = async (forceLive = true) => {
    logger.info('Refreshing prices manually', { forceLive });
    const newData = await fetchPrices(forceLive);
    
    if (newData) {
      logger.info('Prices refreshed successfully', {
        dataSource: newData.dataSource,
        isLive: newData.isLive
      });
      toast({
        title: 'Prices Updated',
        description: newData.isLive 
          ? 'Live scrap metal prices loaded from MetalPriceAPI'
          : 'Latest cached pricing data has been loaded',
        variant: newData.isLive ? 'default' : 'default'
      });
    } else {
      toast({
        title: 'Refresh Failed',
        description: 'Could not update prices. Displaying cached data.',
        variant: 'destructive'
      });
    }
  };

  return {
    data,
    isLoading,
    error,
    refreshPrices
  };
};
