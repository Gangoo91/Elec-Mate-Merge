
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, User } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ProfileForm from './ProfileForm';
import ProfileView from './ProfileView';

interface AccountTabProps {
  profile: any;
  user: any;
  isEditing: boolean;
  formData: {
    fullName: string;
    username: string;
    bio: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setIsEditing: (value: boolean) => void;
}

const AccountTab = ({
  profile,
  user,
  isEditing,
  formData,
  handleChange,
  handleSubmit,
  setIsEditing
}: AccountTabProps) => {
  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Your basic account details
              </CardDescription>
            </div>
            
            {!isEditing && (
              <Button 
                variant="outline" 
                className="border-elec-yellow/30 hover:bg-elec-yellow/10"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          {isEditing ? (
            <ProfileForm
              formData={formData}
              user={user}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <ProfileView profile={profile} user={user} />
          )}
        </CardContent>
      </Card>
      
      <Alert>
        <User className="h-4 w-4" />
        <AlertTitle>Subscription Status</AlertTitle>
        <AlertDescription>
          You are currently on the Free Trial plan. 
          <Button variant="link" className="h-auto p-0 text-elec-yellow" asChild>
            <a href="/subscriptions" className="ml-1">Upgrade Now</a>
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default AccountTab;
