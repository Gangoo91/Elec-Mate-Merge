
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PriceMetric {
  id: number;
  name: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

interface Alert {
  id: number;
  message: string;
  date: string;
  type: "warning" | "info";
}

interface MetalPricesData {
  metalPrices: PriceMetric[];
  cablePrices: PriceMetric[];
  equipmentPrices: PriceMetric[];
  marketAlerts: Alert[];
  lastUpdated: string;
}

export const useLiveMetalPrices = () => {
  const { toast } = useToast();
  const [data, setData] = useState<MetalPricesData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: pricesData, error: pricesError } = await supabase.functions.invoke('fetch-metal-prices');

      if (pricesError) {
        throw new Error(pricesError.message);
      }

      setData(pricesData);
      return pricesData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch metal prices';
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
    const newData = await fetchPrices();
    
    if (newData) {
      toast({
        title: 'Prices Updated',
        description: 'Latest material pricing data has been loaded',
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
