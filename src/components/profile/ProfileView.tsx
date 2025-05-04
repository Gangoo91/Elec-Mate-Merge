
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  User, 
  AtSign, 
  Mail, 
  FileText 
} from 'lucide-react';

interface ProfileViewProps {
  profile: any;
  user: any;
}

const ProfileView = ({ profile, user }: ProfileViewProps) => {
  const isMobile = useIsMobile();
  
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
  );
};

export default ProfileView;
