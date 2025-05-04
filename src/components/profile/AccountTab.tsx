
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, User } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ProfileForm from './ProfileForm';
import ProfileView from './ProfileView';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

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
  const isMobile = useIsMobile();
  const { isTrialActive, trialEndsAt, isSubscribed, subscriptionTier } = useAuth();
  
  // Subscription status message logic
  const getSubscriptionMessage = () => {
    if (isSubscribed) {
      return `You are currently subscribed to the ${subscriptionTier || 'Standard'} plan.`;
    } else if (isTrialActive && trialEndsAt) {
      const daysRemaining = Math.max(0, Math.ceil((trialEndsAt.getTime() - new Date().getTime()) / (1000 * 3600 * 24)));
      return `You are currently on the Free Trial plan. ${daysRemaining} days remaining.`;
    } else {
      return 'Your free trial has expired. Please upgrade your subscription.';
    }
  };
  
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg sm:text-2xl">Account Information</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Your basic account details
              </CardDescription>
            </div>
            
            {!isEditing && (
              <Button 
                variant="outline" 
                className="border-elec-yellow/30 hover:bg-elec-yellow/10"
                size={isMobile ? "sm" : "default"}
                onClick={() => setIsEditing(true)}
              >
                <Edit className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">Edit</span>
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-4 sm:p-6 pt-0">
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
      
      <Alert className={isSubscribed ? "border-green-500/30 bg-green-500/10" : isTrialActive ? "border-elec-yellow/30 bg-amber-500/10" : "border-red-500/30 bg-red-500/10"}>
        <User className="h-3 w-3 sm:h-4 sm:w-4" />
        <AlertTitle className="text-xs sm:text-sm">Subscription Status</AlertTitle>
        <AlertDescription className="text-xs sm:text-sm">
          {getSubscriptionMessage()}
          {!isSubscribed && (
            <Button variant="link" className="h-auto p-0 text-elec-yellow text-xs sm:text-sm" asChild>
              <a href="/subscriptions" className="ml-1">Upgrade Now</a>
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default AccountTab;
