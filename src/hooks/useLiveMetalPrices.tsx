
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
}

export const useLiveMetalPrices = () => {
  const { toast } = useToast();
  const [data, setData] = useState<MetalPricesData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = async () => {
    setIsLoading(true);
    setError(null);
    
    logger.info('Starting to fetch metal prices and regional job pricing');

    try {
      const { data: pricesData, error: pricesError } = await supabase.functions.invoke('fetch-metal-prices');

      if (pricesError) {
        logger.error('Error from fetch-metal-prices function:', pricesError);
        throw new Error(pricesError.message);
      }

      logger.info('Raw response from fetch-metal-prices:', pricesData);
      
      // Check if we have the expected structure
      if (!pricesData) {
        logger.warn('No data returned from fetch-metal-prices function');
        throw new Error('No data returned from pricing service');
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
        isLive: pricesData.dataSource === 'live_api'
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
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const refreshPrices = async () => {
    logger.info('Refreshing prices manually');
    const newData = await fetchPrices();
    
    if (newData) {
      logger.info('Prices refreshed successfully');
      toast({
        title: 'Prices Updated',
        description: 'Latest material pricing and regional job data has been loaded',
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
