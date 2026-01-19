
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

      // Check for pending onboarding data and apply ONLY if onboarding not completed
      // This prevents race conditions with ConfirmEmail which is authoritative for initial setup
      if (data?.user) {
        const onboardingData = localStorage.getItem('elec-mate-onboarding');
        if (onboardingData) {
          try {
            // First check if onboarding is already completed
            const { data: profile } = await supabase
              .from('profiles')
              .select('onboarding_completed')
              .eq('id', data.user.id)
              .single();

            // Only apply onboarding data if NOT already completed
            // ConfirmEmail.tsx is the authoritative source for initial profile setup
            if (!profile?.onboarding_completed) {
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

              console.log('Profile updated with onboarding data');
            }

            // Clear the localStorage regardless (to prevent stale data)
            localStorage.removeItem('elec-mate-onboarding');
          } catch (parseError) {
            console.error('Error applying onboarding data:', parseError);
            // Still try to clear potentially corrupted data
            localStorage.removeItem('elec-mate-onboarding');
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

      // Note: Welcome email is now sent after email confirmation
      // The confirmation email is sent from SignUp.tsx via send-confirmation-email edge function

      // Success toast - ask user to check email
      toast({
        title: 'Almost there!',
        description: 'Please check your email to confirm your account.',
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
      // Call our custom edge function that sends branded emails via Resend
      const { error } = await supabase.functions.invoke('send-password-reset', {
        body: { email },
      });

      if (error) {
        // Don't reveal if email exists or not - always show success message
        console.error('Password reset error:', error);
      }

      // Always show success to prevent user enumeration
      toast({
        title: 'Check Your Email',
        description: 'If an account exists, we\'ve sent you a password reset link.',
      });

      return { error: null };
    } catch (error: any) {
      // Even on error, show success message to prevent enumeration
      console.error('Password reset exception:', error);
      toast({
        title: 'Check Your Email',
        description: 'If an account exists, we\'ve sent you a password reset link.',
      });
      return { error: null };
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
