import { useState, useCallback } from 'react';

interface CachedLocation {
  coordinates: { lat: number; lng: number };
  formattedAddress: string;
  county: string;
  region: string;
  timestamp: number;
  ttl: number;
  source: string;
}

interface LocationCacheOptions {
  ttl?: number; // Time to live in milliseconds (default: 30 days)
  forceRefresh?: boolean;
}

export function useLocationCache() {
  const [isLoading, setIsLoading] = useState(false);

  const normalizeLocation = (location: string): string => {
    return location.toLowerCase().replace(/\s+/g, '_').replace(/[^\w_]/g, '');
  };

  const getCacheKey = (location: string, type: 'forward' | 'reverse' = 'forward'): string => {
    return `geo_cache_${type}_${normalizeLocation(location)}`;
  };

  const getFromCache = (location: string, type: 'forward' | 'reverse' = 'forward'): CachedLocation | null => {
    try {
      const cacheKey = getCacheKey(location, type);
      const cached = localStorage.getItem(cacheKey);
      
      if (!cached) return null;
      
      const data: CachedLocation = JSON.parse(cached);
      const now = Date.now();
      
      // Check if cache has expired
      if (now > data.timestamp + data.ttl) {
        localStorage.removeItem(cacheKey);
        return null;
      }
      
      return data;
    } catch (error) {
      console.warn('Error reading from location cache:', error);
      return null;
    }
  };

  const setCache = (
    location: string, 
    data: Omit<CachedLocation, 'timestamp' | 'ttl'>, 
    options: LocationCacheOptions = {},
    type: 'forward' | 'reverse' = 'forward'
  ): void => {
    try {
      const cacheKey = getCacheKey(location, type);
      const ttl = options.ttl || 30 * 24 * 60 * 60 * 1000; // 30 days default
      
      const cacheEntry: CachedLocation = {
        ...data,
        timestamp: Date.now(),
        ttl
      };
      
      localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
    } catch (error) {
      console.warn('Error writing to location cache:', error);
    }
  };

  const clearCache = useCallback((pattern?: string) => {
    try {
      const keys = Object.keys(localStorage);
      const cacheKeys = keys.filter(key => {
        if (pattern) {
          return key.startsWith('geo_cache_') && key.includes(pattern);
        }
        return key.startsWith('geo_cache_');
      });
      
      cacheKeys.forEach(key => localStorage.removeItem(key));
      console.log(`Cleared ${cacheKeys.length} location cache entries`);
    } catch (error) {
      console.warn('Error clearing location cache:', error);
    }
  }, []);

  const getCacheStats = useCallback(() => {
    try {
      const keys = Object.keys(localStorage);
      const cacheKeys = keys.filter(key => key.startsWith('geo_cache_'));
      const totalSize = cacheKeys.reduce((size, key) => {
        return size + (localStorage.getItem(key)?.length || 0);
      }, 0);
      
      return {
        entryCount: cacheKeys.length,
        totalSizeBytes: totalSize,
        totalSizeKB: Math.round(totalSize / 1024 * 100) / 100
      };
    } catch (error) {
      console.warn('Error getting cache stats:', error);
      return { entryCount: 0, totalSizeBytes: 0, totalSizeKB: 0 };
    }
  }, []);

  const geocodeWithCache = useCallback(async (
    location: string, 
    options: LocationCacheOptions = {}
  ): Promise<CachedLocation> => {
    setIsLoading(true);
    
    try {
      // Check cache first unless force refresh is requested
      if (!options.forceRefresh) {
        const cached = getFromCache(location, 'forward');
        if (cached) {
          setIsLoading(false);
          return cached;
        }
      }

      // Import supabase client dynamically to avoid bundling issues
      const { supabase } = await import('@/integrations/supabase/client');
      
      // Call the geocode function
      const { data, error } = await supabase.functions.invoke('geocode-location', {
        body: { location }
      });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || 'Geocoding failed');

      const locationData = data.location;
      const result: CachedLocation = {
        coordinates: { lat: locationData.lat, lng: locationData.lng },
        formattedAddress: locationData.formattedAddress,
        county: locationData.county,
        region: locationData.region,
        timestamp: Date.now(),
        ttl: options.ttl || 30 * 24 * 60 * 60 * 1000,
        source: 'google_geocoding'
      };

      // Cache the result
      setCache(location, result, options, 'forward');
      
      setIsLoading(false);
      return result;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }, []);

  const reverseGeocodeWithCache = useCallback(async (
    lat: number,
    lng: number,
    options: LocationCacheOptions = {}
  ): Promise<string> => {
    const coordinateKey = `${lat.toFixed(6)},${lng.toFixed(6)}`;
    setIsLoading(true);
    
    try {
      // Check cache first unless force refresh is requested
      if (!options.forceRefresh) {
        const cached = getFromCache(coordinateKey, 'reverse');
        if (cached) {
          setIsLoading(false);
          return cached.formattedAddress;
        }
      }

      // Use Google Maps Geocoding API for reverse geocoding
      const google = (window as any).google;
      if (!google?.maps?.Geocoder) {
        throw new Error('Google Maps API not loaded');
      }

      const geocoder = new google.maps.Geocoder();
      const response = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
        geocoder.geocode(
          { location: { lat, lng } },
          (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
            if (status === google.maps.GeocoderStatus.OK && results?.[0]) {
              resolve(results);
            } else {
              reject(new Error(`Reverse geocoding failed: ${status}`));
            }
          }
        );
      });

      const result = response[0];
      const formattedAddress = result.formatted_address;

      // Extract county and region for consistency
      let county = '';
      let region = '';
      
      for (const component of result.address_components) {
        const types = component.types;
        if (types.includes('administrative_area_level_2')) {
          county = component.long_name;
        }
        if (types.includes('administrative_area_level_1')) {
          region = component.long_name;
        }
      }

      // Cache the result
      const cacheData = {
        coordinates: { lat, lng },
        formattedAddress,
        county,
        region,
        source: 'google_reverse_geocoding'
      };
      
      setCache(coordinateKey, cacheData, options, 'reverse');
      
      setIsLoading(false);
      return formattedAddress;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }, []);

  return {
    geocodeWithCache,
    reverseGeocodeWithCache,
    getFromCache,
    setCache,
    clearCache,
    getCacheStats,
    isLoading,
    normalizeLocation
  };
}