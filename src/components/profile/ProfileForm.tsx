
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from '@/hooks/use-mobile';
import { Save, X, User, AtSign, Mail, FileText } from 'lucide-react';

interface ProfileFormProps {
  formData: {
    fullName: string;
    username: string;
    bio: string;
  };
  user: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const ProfileForm = ({ 
  formData, 
  user, 
  handleChange, 
  handleSubmit, 
  onCancel 
}: ProfileFormProps) => {
  const isMobile = useIsMobile();
  
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            <label htmlFor="fullName" className="text-xs sm:text-sm font-medium">
              Full Name
            </label>
          </div>
          <Input 
            id="fullName" 
            name="fullName" 
            value={formData.fullName} 
            onChange={handleChange} 
            className="bg-elec-dark/40 border-elec-yellow/20 focus:border-elec-yellow/50 focus:ring-elec-yellow/20"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <AtSign className="h-3.5 w-3.5" />
            <label htmlFor="username" className="text-xs sm:text-sm font-medium">
              Username
            </label>
          </div>
          <Input 
            id="username" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            className="bg-elec-dark/40 border-elec-yellow/20 focus:border-elec-yellow/50 focus:ring-elec-yellow/20"
          />
        </div>
        
        <div className="space-y-2 sm:col-span-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-3.5 w-3.5" />
            <label htmlFor="email" className="text-xs sm:text-sm font-medium">
              Email
            </label>
          </div>
          <Input 
            id="email" 
            name="email" 
            value={user?.email || ''} 
            disabled
            className="bg-elec-gray/60 text-muted-foreground border-elec-yellow/10"
          />
          <p className="text-xs text-muted-foreground ml-6">
            Email cannot be changed
          </p>
        </div>
        
        <div className="space-y-2 sm:col-span-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FileText className="h-3.5 w-3.5" />
            <label htmlFor="bio" className="text-xs sm:text-sm font-medium">
              Bio
            </label>
          </div>
          <Textarea 
            id="bio" 
            name="bio" 
            value={formData.bio} 
            onChange={handleChange}
            rows={3}
            placeholder="Write a short bio about yourself"
            className="resize-none bg-elec-dark/40 border-elec-yellow/20 focus:border-elec-yellow/50 focus:ring-elec-yellow/20"
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-3 pt-2">
        <Button 
          type="button" 
          variant="outline"
          size={isMobile ? "sm" : "default"}
          onClick={onCancel}
          className="gap-1.5 border-elec-yellow/30 hover:bg-elec-yellow/10"
        >
          <X className="h-3.5 w-3.5" />
          Cancel
        </Button>
        <Button 
          type="submit"
          size={isMobile ? "sm" : "default"}
          className="gap-1.5 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
        >
          <Save className="h-3.5 w-3.5" />
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
