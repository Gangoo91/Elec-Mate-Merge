import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

// Test credentials - REMOVE THIS IN PRODUCTION
const TEST_EMAIL = 'test@example.com';
const TEST_PASSWORD = 'test123456';

export const useTestAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check if already signed in
        const { data: { user: existingUser } } = await supabase.auth.getUser();
        
        if (existingUser) {
          setUser(existingUser);
          setIsAuthenticating(false);
          return;
        }

        // Try to sign in with test account
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: TEST_EMAIL,
          password: TEST_PASSWORD,
        });

        if (signInError) {
          // If sign in fails, try to create the test account
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: TEST_EMAIL,
            password: TEST_PASSWORD,
            options: {
              emailRedirectTo: window.location.origin,
            },
          });

          if (!signUpError && signUpData.user) {
            setUser(signUpData.user);
          }
        } else if (signInData.user) {
          setUser(signInData.user);
        }
      } catch (error) {
        console.error('Test auth error:', error);
      } finally {
        setIsAuthenticating(false);
      }
    };

    initAuth();
  }, []);

  return { user, isAuthenticating };
};
