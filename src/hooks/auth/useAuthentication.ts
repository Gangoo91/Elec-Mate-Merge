
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
      
      // Success toast
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
      
      return { error: null };
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

  return {
    signIn,
    signUp,
    signOut,
  };
}
