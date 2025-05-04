
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from '@/hooks/use-mobile';
import { User, Bell, Lock, Palette } from "lucide-react";
import AccountTab from './AccountTab';
import NotificationsTab from './NotificationsTab';
import AppearanceTab from './AppearanceTab';
import PrivacyTab from './PrivacyTab';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

const SettingsTabs = () => {
  const isMobile = useIsMobile();

  // Mobile-optimized tab style
  const tabListClass = isMobile 
    ? "w-full grid grid-cols-4 gap-1 bg-elec-gray border-b border-elec-yellow/20" 
    : "bg-elec-gray border-b border-elec-yellow/20";
    
  // Mobile-optimized tab content style
  const tabContentClass = isMobile ? "pt-4 pb-20" : "space-y-6 pt-4";
  
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className={tabListClass}>
        <TabsTrigger value="account" className="flex gap-1 items-center text-xs md:text-sm">
          {!isMobile && <User className="h-4 w-4" />}
          Account
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex gap-1 items-center text-xs md:text-sm">
          {!isMobile && <Bell className="h-4 w-4" />}
          Notifications
        </TabsTrigger>
        <TabsTrigger value="appearance" className="flex gap-1 items-center text-xs md:text-sm">
          {!isMobile && <Palette className="h-4 w-4" />}
          Appearance
        </TabsTrigger>
        <TabsTrigger value="privacy" className="flex gap-1 items-center text-xs md:text-sm">
          {!isMobile && <Lock className="h-4 w-4" />}
          Privacy
        </TabsTrigger>
      </TabsList>
        
      {/* Account Tab */}
      <TabsContent value="account" className={tabContentClass}>
        <Card className="border-elec-yellow/20 bg-elec-gray shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-elec-yellow" />
              <CardTitle>Account Settings</CardTitle>
            </div>
            <CardDescription>
              Manage your account preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AccountTab />
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Notifications Tab */}
      <TabsContent value="notifications" className={tabContentClass}>
        <Card className="border-elec-yellow/20 bg-elec-gray shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-elec-yellow" />
              <CardTitle>Notification Preferences</CardTitle>
            </div>
            <CardDescription>
              Choose what notifications you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NotificationsTab />
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Appearance Tab */}
      <TabsContent value="appearance" className={tabContentClass}>
        <Card className="border-elec-yellow/20 bg-elec-gray shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-elec-yellow" />
              <CardTitle>Appearance Settings</CardTitle>
            </div>
            <CardDescription>
              Customize how ElecMate looks for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AppearanceTab />
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Privacy Tab */}
      <TabsContent value="privacy" className={tabContentClass}>
        <PrivacyTab />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
