
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <Input 
            id="fullName" 
            name="fullName" 
            value={formData.fullName} 
            onChange={handleChange} 
          />
        </div>
        
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <Input 
            id="username" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <Input 
            id="email" 
            name="email" 
            value={user?.email || ''} 
            disabled
            className="bg-elec-gray/40"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Email cannot be changed
          </p>
        </div>
        
        <div>
          <label htmlFor="bio" className="block text-sm font-medium mb-1">
            Bio
          </label>
          <Textarea 
            id="bio" 
            name="bio" 
            value={formData.bio} 
            onChange={handleChange}
            rows={4}
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
};

export default ProfileForm;
