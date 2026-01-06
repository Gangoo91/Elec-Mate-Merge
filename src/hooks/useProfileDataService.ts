/**
 * Hook wrapper for profileDataService
 * Provides reactive access to cascaded profile data
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  getProfileData,
  ProfileDataResult,
  DataSource,
  InspectorDetails,
} from '@/services/profileDataService';

interface UseProfileDataServiceReturn {
  profileData: ProfileDataResult | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  // Convenience getters
  dataSource: DataSource | null;
  isVerified: boolean;
  inspectorDetails: InspectorDetails | null;
  elecIdNumber: string | null;
}

export function useProfileDataService(): UseProfileDataServiceReturn {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileDataResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await getProfileData(user.id);
      setProfileData(result);
    } catch (err: any) {
      console.error('Error fetching profile data:', err);
      setError(err.message || 'Failed to load profile data');
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    profileData,
    isLoading,
    error,
    refetch: fetchData,
    // Convenience getters
    dataSource: profileData?.source || null,
    isVerified: profileData?.isVerified || false,
    inspectorDetails: profileData?.data || null,
    elecIdNumber: profileData?.elecIdNumber || null,
  };
}

export default useProfileDataService;
