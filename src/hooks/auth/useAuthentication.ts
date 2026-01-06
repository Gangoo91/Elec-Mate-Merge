
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export function useAuthentication() {
  const { toast } = useToast();

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Login Failed',
          description: error.message,
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
          description: error.message,
          variant: 'destructive',
        });
        return { error };
      }
      
      // Success toast
      toast({
        title: 'Signup Successful',
        description: 'Your account has been created successfully. You now have a 7-day free trial!',
      });
      
      return { error: null };
    } catch (error: any) {
      toast({
        title: 'Signup Error',
        description: error.message || 'An unexpected error occurred',
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
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });

      if (error) {
        toast({
          title: 'Failed to Resend',
          description: error.message,
          variant: 'destructive',
        });
        return { error };
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
