import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { offlineStorage } from '@/utils/offlineStorage';

export interface InspectorProfile {
  id: string;
  name: string;
  photoUrl?: string;
  qualifications: string[];
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  companyLogo?: string;
  companyWebsite?: string;
  companyRegistrationNumber?: string;
  vatNumber?: string;
  registrationScheme: string;
  registrationNumber: string;
  registrationExpiry?: string;
  schemeLogoDataUrl?: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  insuranceCoverage: string;
  insuranceExpiry?: string;
  signatureData?: string;
  isDefault: boolean;
  createdAt: string;
}

const STORAGE_KEY = 'inspector_profiles';

export const useInspectorProfiles = () => {
  const [profiles, setProfiles] = useState<InspectorProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadProfiles();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('inspector_profiles_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'inspector_profiles'
        },
        () => {
          loadProfiles();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadProfiles = async () => {
    try {
      // First, try to migrate localStorage data if exists
      await migrateLocalStorageData();

      // Then load from Supabase
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Fall back to IndexedDB when not authenticated
        const localProfiles = await offlineStorage.getInspectorProfiles();
        setProfiles(localProfiles);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('inspector_profiles')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedProfiles: InspectorProfile[] = (data || []).map(profile => ({
        id: profile.id,
        name: profile.name,
        photoUrl: profile.photo_url || undefined,
        qualifications: profile.qualifications || [],
        companyName: profile.company_name,
        companyAddress: profile.company_address,
        companyPhone: profile.company_phone,
        companyEmail: profile.company_email,
        companyLogo: profile.company_logo || undefined,
        companyWebsite: profile.company_website || undefined,
        companyRegistrationNumber: profile.company_registration_number || undefined,
        vatNumber: profile.vat_number || undefined,
        registrationScheme: profile.registration_scheme,
        registrationNumber: profile.registration_number,
        registrationExpiry: profile.registration_expiry || undefined,
        schemeLogoDataUrl: profile.scheme_logo_data_url || undefined,
        insuranceProvider: profile.insurance_provider,
        insurancePolicyNumber: profile.insurance_policy_number,
        insuranceCoverage: profile.insurance_coverage,
        insuranceExpiry: profile.insurance_expiry || undefined,
        signatureData: profile.signature_data || undefined,
        isDefault: profile.is_default,
        createdAt: profile.created_at,
      }));

      setProfiles(mappedProfiles);
    } catch (error) {
      // Only log to console - don't show toast for expected failures
      console.error('Failed to load inspector profiles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const migrateLocalStorageData = async () => {
    try {
      // Get profiles from IndexedDB (already migrated from localStorage via offlineStorage)
      const localProfiles = await offlineStorage.getInspectorProfiles();
      if (localProfiles.length === 0) return;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Check if user already has profiles in Supabase
      const { data: existingProfiles } = await supabase
        .from('inspector_profiles')
        .select('id')
        .eq('user_id', user.id)
        .limit(1);

      if (existingProfiles && existingProfiles.length > 0) {
        return;
      }

      // Migrate each profile from IndexedDB to Supabase
      for (const profile of localProfiles) {
        await supabase.from('inspector_profiles').insert({
          user_id: user.id,
          name: profile.name,
          photo_url: profile.photoUrl,
          qualifications: profile.qualifications,
          company_name: profile.companyName,
          company_address: profile.companyAddress,
          company_phone: profile.companyPhone,
          company_email: profile.companyEmail,
          company_logo: profile.companyLogo,
          company_website: profile.companyWebsite,
          company_registration_number: profile.companyRegistrationNumber,
          vat_number: profile.vatNumber,
          registration_scheme: profile.registrationScheme,
          registration_number: profile.registrationNumber,
          registration_expiry: profile.registrationExpiry,
          scheme_logo_data_url: profile.schemeLogoDataUrl,
          insurance_provider: profile.insuranceProvider,
          insurance_policy_number: profile.insurancePolicyNumber,
          insurance_coverage: profile.insuranceCoverage,
          insurance_expiry: profile.insuranceExpiry,
          signature_data: profile.signatureData,
          is_default: profile.isDefault,
        });
      }
      
      toast({
        title: 'Data Migrated',
        description: 'Your profiles have been migrated to the cloud',
      });
    } catch (error) {
      console.error('Failed to migrate IndexedDB data to cloud:', error);
    }
  };

  const addProfile = async (profile: Omit<InspectorProfile, 'id' | 'createdAt'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Save to IndexedDB when not authenticated
        const newProfile: InspectorProfile = {
          ...profile,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };

        await offlineStorage.saveInspectorProfile(newProfile);
        const updatedProfiles = await offlineStorage.getInspectorProfiles();
        setProfiles(updatedProfiles);
        
        toast({
          title: 'Success',
          description: 'Profile created successfully (saved locally)',
        });
        
        return newProfile;
      }

      const { data, error } = await supabase
        .from('inspector_profiles')
        .insert({
          user_id: user.id,
          name: profile.name,
          photo_url: profile.photoUrl,
          qualifications: profile.qualifications,
          company_name: profile.companyName,
          company_address: profile.companyAddress,
          company_phone: profile.companyPhone,
          company_email: profile.companyEmail,
          company_logo: profile.companyLogo,
          company_website: profile.companyWebsite,
          company_registration_number: profile.companyRegistrationNumber,
          vat_number: profile.vatNumber,
          registration_scheme: profile.registrationScheme,
          registration_number: profile.registrationNumber,
          registration_expiry: profile.registrationExpiry,
          scheme_logo_data_url: profile.schemeLogoDataUrl,
          insurance_provider: profile.insuranceProvider,
          insurance_policy_number: profile.insurancePolicyNumber,
          insurance_coverage: profile.insuranceCoverage,
          insurance_expiry: profile.insuranceExpiry,
          signature_data: profile.signatureData,
          is_default: profile.isDefault,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Profile created successfully',
      });

      return data;
    } catch (error) {
      console.error('Failed to add profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to create profile',
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateProfile = async (id: string, updates: Partial<InspectorProfile>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // Update in IndexedDB when not authenticated
        const existingProfiles = await offlineStorage.getInspectorProfiles();
        const profileToUpdate = existingProfiles.find(p => p.id === id);
        if (profileToUpdate) {
          const updatedProfile = { ...profileToUpdate, ...updates };
          await offlineStorage.saveInspectorProfile(updatedProfile);
          const updatedProfiles = await offlineStorage.getInspectorProfiles();
          setProfiles(updatedProfiles);
          
          toast({
            title: 'Success',
            description: 'Profile updated successfully (saved locally)',
          });
        }
        return;
      }

      const { error } = await supabase
        .from('inspector_profiles')
        .update({
          name: updates.name,
          photo_url: updates.photoUrl,
          qualifications: updates.qualifications,
          company_name: updates.companyName,
          company_address: updates.companyAddress,
          company_phone: updates.companyPhone,
          company_email: updates.companyEmail,
          company_logo: updates.companyLogo,
          company_website: updates.companyWebsite,
          company_registration_number: updates.companyRegistrationNumber,
          vat_number: updates.vatNumber,
          registration_scheme: updates.registrationScheme,
          registration_number: updates.registrationNumber,
          registration_expiry: updates.registrationExpiry,
          scheme_logo_data_url: updates.schemeLogoDataUrl,
          insurance_provider: updates.insuranceProvider,
          insurance_policy_number: updates.insurancePolicyNumber,
          insurance_coverage: updates.insuranceCoverage,
          insurance_expiry: updates.insuranceExpiry,
          signature_data: updates.signatureData,
          is_default: updates.isDefault,
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    }
  };

  const deleteProfile = async (id: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // Delete from IndexedDB when not authenticated
        await offlineStorage.deleteInspectorProfile(id);
        const updatedProfiles = await offlineStorage.getInspectorProfiles();
        setProfiles(updatedProfiles);
        
        toast({
          title: 'Success',
          description: 'Profile deleted successfully (saved locally)',
        });
        return;
      }

      const { error } = await supabase
        .from('inspector_profiles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Profile deleted successfully',
      });
    } catch (error) {
      console.error('Failed to delete profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete profile',
        variant: 'destructive',
      });
    }
  };

  const getDefaultProfile = (): InspectorProfile | null => {
    return profiles.find(profile => profile.isDefault) || null;
  };

  const setDefaultProfile = async (id: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Update in IndexedDB when not authenticated
        const existingProfiles = await offlineStorage.getInspectorProfiles();
        for (const profile of existingProfiles) {
          const updatedProfile = {
            ...profile,
            isDefault: profile.id === id,
          };
          await offlineStorage.saveInspectorProfile(updatedProfile);
        }
        const updatedProfiles = await offlineStorage.getInspectorProfiles();
        setProfiles(updatedProfiles);
        
        toast({
          title: 'Success',
          description: 'Default profile updated (saved locally)',
        });
        return;
      }

      // First, unset all defaults for this user
      await supabase
        .from('inspector_profiles')
        .update({ is_default: false })
        .eq('user_id', user.id);

      // Then set the new default
      const { error } = await supabase
        .from('inspector_profiles')
        .update({ is_default: true })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Default profile updated',
      });
    } catch (error) {
      console.error('Failed to set default profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to set default profile',
        variant: 'destructive',
      });
    }
  };

  return {
    profiles,
    isLoading,
    addProfile,
    updateProfile,
    deleteProfile,
    getDefaultProfile,
    setDefaultProfile,
  };
};
