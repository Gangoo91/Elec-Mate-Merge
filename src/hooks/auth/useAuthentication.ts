
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export function useAuthentication() {
  const { toast } = useToast();

  // Helper to make error messages user-friendly
  const getFriendlyErrorMessage = (errorMessage: string): string => {
    const lowerMessage = errorMessage.toLowerCase();
    if (lowerMessage.includes('invalid login credentials') || lowerMessage.includes('invalid credentials')) {
      return 'Incorrect email or password. Please try again.';
    }
    if (lowerMessage.includes('user already registered') || lowerMessage.includes('already been registered')) {
      return 'This email is already registered. Try signing in instead.';
    }
    if (lowerMessage.includes('password') && lowerMessage.includes('weak')) {
      return 'Password is too weak. Please use at least 6 characters.';
    }
    if (lowerMessage.includes('rate limit') || lowerMessage.includes('too many')) {
      return 'Too many attempts. Please wait a moment and try again.';
    }
    if (lowerMessage.includes('network') || lowerMessage.includes('fetch')) {
      return 'Connection error. Please check your internet and try again.';
    }
    return errorMessage;
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Login Failed',
          description: getFriendlyErrorMessage(error.message),
          variant: 'destructive',
        });
        return { error };
      }

      console.log('Sign in successful:', data?.user?.email);

      // Check for pending onboarding data and apply to profile
      if (data?.user) {
        const onboardingData = localStorage.getItem('elec-mate-onboarding');
        if (onboardingData) {
          try {
            const parsed = JSON.parse(onboardingData);
            // Update profile with onboarding data
            await supabase
              .from('profiles')
              .update({
                role: parsed.role,
                ecs_card_type: parsed.ecsCardType || null,
                elec_id_enabled: parsed.createElecId || false,
                onboarding_completed: true,
                updated_at: new Date().toISOString(),
              })
              .eq('id', data.user.id);

            // Clear the localStorage after successful sync
            localStorage.removeItem('elec-mate-onboarding');
            console.log('Profile updated with onboarding data');
          } catch (parseError) {
            console.error('Error applying onboarding data:', parseError);
          }
        }
      }

      // Success toast
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });

      return { error: null, user: data?.user };
    } catch (error: any) {
      toast({
        title: 'Login Error',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
      return { error };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        toast({
          title: 'Signup Failed',
          description: getFriendlyErrorMessage(error.message),
          variant: 'destructive',
        });
        return { error };
      }

      // Send branded welcome email in background (fire and forget - non-blocking)
      if (data?.user) {
        supabase.functions.invoke('send-welcome-email', {
          body: {
            userId: data.user.id,
            email: email,
            fullName: fullName,
          },
        }).then(() => {
          console.log('Welcome email sent');
        }).catch((emailErr) => {
          console.warn('Welcome email failed (non-critical):', emailErr);
        });
      }

      // Success toast - instant access!
      toast({
        title: 'Welcome to Elec-Mate!',
        description: 'Your account is ready. Enjoy your 7-day free trial!',
      });

      return { error: null, user: data?.user };
    } catch (error: any) {
      toast({
        title: 'Signup Error',
        description: getFriendlyErrorMessage(error.message || 'An unexpected error occurred'),
        variant: 'destructive',
      });
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        toast({
          title: 'Reset Failed',
          description: error.message,
          variant: 'destructive',
        });
        return { error };
      }

      toast({
        title: 'Check Your Email',
        description: 'We\'ve sent you a password reset link.',
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: 'Reset Error',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
      return { error };
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        toast({
          title: 'Update Failed',
          description: error.message,
          variant: 'destructive',
        });
        return { error };
      }

      toast({
        title: 'Password Updated',
        description: 'Your password has been successfully changed.',
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: 'Update Error',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
      return { error };
    }
  };

  const resendConfirmationEmail = async (email: string) => {
    try {
      // Use our branded welcome email function via Resend
      const { error } = await supabase.functions.invoke('send-welcome-email', {
        body: {
          email: email,
          fullName: '', // Will show "Hi there" if name not available
        },
      });

      if (error) {
        // Fallback to Supabase's default resend
        const { error: supabaseError } = await supabase.auth.resend({
          type: 'signup',
          email,
        });

        if (supabaseError) {
          toast({
            title: 'Failed to Resend',
            description: supabaseError.message,
            variant: 'destructive',
          });
          return { error: supabaseError };
        }
      }

      toast({
        title: 'Email Sent',
        description: 'Confirmation email has been resent. Please check your inbox.',
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
      return { error };
    }
  };

  const updateProfile = async (userId: string, profileData: {
    role?: string;
    ecs_card_type?: string;
    elec_id_enabled?: boolean;
    onboarding_completed?: boolean;
  }) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...profileData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) {
        console.error('Error updating profile:', error.message);
        return { error };
      }

      return { error: null };
    } catch (error: any) {
      console.error('Error in updateProfile:', error);
      return { error };
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    resendConfirmationEmail,
    updateProfile,
  };
}
