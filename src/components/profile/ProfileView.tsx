
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  AtSign, 
  Mail, 
  FileText,
  Shield
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProfileViewProps {
  profile: any;
  user: any;
}

const ProfileView = ({ profile, user }: ProfileViewProps) => {
  const isMobile = useIsMobile();
  const { isSubscribed, subscriptionTier } = useAuth();
  
  const fields = [
    { 
      label: 'Full Name', 
      value: profile?.full_name || 'Not set',
      icon: User
    },
    { 
      label: 'Username', 
      value: `@${profile?.username || 'Not set'}`,
      icon: AtSign
    },
    { 
      label: 'Email', 
      value: user?.email,
      icon: Mail
    },
    { 
      label: 'Bio', 
      value: profile?.bio || 'No bio added yet.',
      icon: FileText
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {fields.map((field, index) => {
          const Icon = field.icon;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon className="h-3.5 w-3.5" />
                <span className="text-xs sm:text-sm font-medium">{field.label}</span>
              </div>
              
              <p className={`text-sm sm:text-base pl-5 ${field.value === 'Not set' || field.value === 'No bio added yet.' ? 'italic text-muted-foreground' : ''}`}>
                {field.value}
              </p>
            </div>
          );
        })}
      </div>
      
      {/* Subscription Information */}
      <div className="pt-2 border-t border-elec-yellow/20">
        <div className="flex items-center gap-2 text-muted-foreground mb-3">
          <Shield className="h-3.5 w-3.5" />
          <span className="text-xs sm:text-sm font-medium">Subscription Status</span>
        </div>
        
        <div className="pl-5 flex items-center gap-2">
          {isSubscribed ? (
            <Badge variant="gold" className="text-xs">
              {subscriptionTier || 'Standard'} Plan
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs text-amber-400 border-amber-400/30">
              Free Trial
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
