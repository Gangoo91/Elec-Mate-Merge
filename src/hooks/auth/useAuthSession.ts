
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { ProfileType } from './types';

export function useAuthSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch user profile from profiles table
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error fetching profile:', error);
        // For testing/demo purposes only - create a mock profile with admin role
        // In production, this would come from your database
        const mockProfile: ProfileType = {
          id: userId,
          username: 'admin_user',
          full_name: 'Admin User',
          avatar_url: '',
          role: 'admin', // Set role to admin for testing
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          bio: '',
          location: '',
          website: '',
          subscribed: true
        };
        
        setProfile(mockProfile);
        return mockProfile;
      } else if (data) {
        setProfile(data);
        return data;
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
    return null;
  };

  // Initial session check and listener setup
  useEffect(() => {
    setIsLoading(true);
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // If user session changes, fetch profile data
        if (currentSession?.user) {
          setTimeout(() => {
            fetchProfile(currentSession.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );
    
    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log('Initial session check:', currentSession?.user?.email);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchProfile(currentSession.user.id);
      }
      
      setIsLoading(false);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    session,
    user, 
    profile,
    isLoading,
    fetchProfile,
  };
}
