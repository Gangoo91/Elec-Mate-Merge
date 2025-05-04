
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, User, Calendar, Mail, AtSign, FileText, Shield } from "lucide-react";
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
  
  const getSubscriptionIcon = () => {
    if (isSubscribed) return <Shield className="h-4 w-4 text-green-500" />;
    if (isTrialActive) return <Calendar className="h-4 w-4 text-amber-500" />;
    return <User className="h-4 w-4 text-red-500" />;
  };
  
  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray overflow-hidden">
        <CardHeader className="p-4 sm:p-6 bg-gradient-to-r from-elec-yellow/5 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-elec-yellow/10">
                <User className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <CardTitle className="text-lg sm:text-2xl">Account Information</CardTitle>
                <CardDescription className="text-xs sm:text-sm mt-1">
                  Your basic profile and account details
                </CardDescription>
              </div>
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
        
        <CardContent className="p-4 sm:p-6">
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
      
      {/* Account Security Card */}
      <Card className="border-elec-yellow/20 bg-elec-gray overflow-hidden">
        <CardHeader className="p-4 sm:p-6 bg-gradient-to-r from-elec-yellow/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-elec-yellow/10">
              <Shield className="h-5 w-5 text-elec-yellow" />
            </div>
            <div>
              <CardTitle className="text-lg sm:text-2xl">Account Security</CardTitle>
              <CardDescription className="text-xs sm:text-sm mt-1">
                Manage your password and security settings
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 sm:p-6">
          <Button 
            variant="outline" 
            className="border-elec-yellow/30 hover:bg-elec-yellow/10 text-sm"
          >
            Change Password
          </Button>
        </CardContent>
      </Card>
      
      {/* Subscription Status Card */}
      <Card className={`overflow-hidden border-2 ${
        isSubscribed 
          ? "border-green-500/30 bg-green-500/5" 
          : isTrialActive 
            ? "border-amber-500/30 bg-amber-500/5" 
            : "border-red-500/30 bg-red-500/5"
      }`}>
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-full ${
              isSubscribed 
                ? "bg-green-500/10 text-green-500" 
                : isTrialActive 
                  ? "bg-amber-500/10 text-amber-500" 
                  : "bg-red-500/10 text-red-500"
            }`}>
              {getSubscriptionIcon()}
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-base sm:text-lg">
                {isSubscribed ? "Active Subscription" : isTrialActive ? "Free Trial" : "Trial Expired"}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {getSubscriptionMessage()}
              </p>
              
              {!isSubscribed && (
                <Button 
                  variant="default" 
                  className="mt-4 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                  size={isMobile ? "sm" : "default"}
                  asChild
                >
                  <a href="/subscriptions">Upgrade Now</a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountTab;
