
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { Edit, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ProfilePage = () => {
  const { user, profile, fetchProfile } = useAuth();
  const { addNotification } = useNotifications();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: profile?.full_name || '',
    username: profile?.username || '',
    bio: profile?.bio || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!user) return;
      
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.fullName,
          username: formData.username,
          bio: formData.bio,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Refetch profile
      if (fetchProfile) {
        await fetchProfile(user.id);
      }
      
      addNotification({
        title: 'Profile Updated',
        message: 'Your profile has been successfully updated.',
        type: 'success'
      });
      
      setIsEditing(false);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      addNotification({
        title: 'Update Failed',
        message: error.message || 'Failed to update profile.',
        type: 'error'
      });
    }
  };
  
  // Get initials for avatar
  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || 'U';
  };

  return (
    <div className="container max-w-5xl mx-auto py-6 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6">
        {/* Profile Summary Card */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-6 flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-6">
              <AvatarImage src={profile?.avatar_url || ''} />
              <AvatarFallback className="bg-elec-yellow text-elec-dark text-xl">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold">{profile?.full_name || 'User'}</h2>
              <p className="text-sm text-muted-foreground">@{profile?.username || 'username'}</p>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full border-elec-yellow/30 hover:bg-elec-yellow/10"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <div className="space-y-6">
          <Tabs defaultValue="account">
            <TabsList className="bg-elec-gray border-b border-elec-yellow/20">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            
            {/* Account Tab */}
            <TabsContent value="account" className="space-y-6 pt-4">
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
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                          <p>{profile?.full_name || 'Not set'}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Username</p>
                          <p>@{profile?.username || 'Not set'}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Email</p>
                          <p>{user?.email}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Bio</p>
                          <p>{profile?.bio || 'No bio added yet.'}</p>
                        </div>
                      </div>
                    </div>
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
            </TabsContent>
            
            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6 pt-4">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle>Your Achievements</CardTitle>
                  <CardDescription>
                    Track your progress and accomplishments
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Complete courses and activities to earn achievements</p>
                    <Button 
                      variant="outline" 
                      className="mt-4 border-elec-yellow/30 hover:bg-elec-yellow/10"
                      asChild
                    >
                      <a href="/apprentice/study">Start Learning</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6 pt-4">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your learning progress and platform activity
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No recent activity to display</p>
                    <Button 
                      variant="outline" 
                      className="mt-4 border-elec-yellow/30 hover:bg-elec-yellow/10"
                      asChild
                    >
                      <a href="/dashboard">Explore Dashboard</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
