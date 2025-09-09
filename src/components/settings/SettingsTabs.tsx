
import React, { useState } from 'react';
import { ChevronDown } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import AccountTab from './AccountTab';
import NotificationsTab from './NotificationsTab';
import AppearanceTab from './AppearanceTab';
import PrivacyTab from './PrivacyTab';
import SecurityTab from './SecurityTab';
import HelpSupportTab from './HelpSupportTab';
import { CompanyProfileSettings } from './CompanyProfileSettings';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  User, 
  Bell, 
  Palette, 
  Lock, 
  ShieldCheck,
  HelpCircle,
  Building 
} from "lucide-react";

const TABS = [
  { id: 'account', label: 'Account', icon: User, component: AccountTab, description: 'Manage your account preferences' },
  { id: 'company', label: 'Company Profile', icon: Building, component: CompanyProfileSettings, description: 'Configure your company details and branding for professional quotes' },
  { id: 'notifications', label: 'Notifications', icon: Bell, component: NotificationsTab, description: 'Choose what notifications you want to receive' },
  { id: 'appearance', label: 'Appearance', icon: Palette, component: AppearanceTab, description: 'Customize how ElecMate looks for you' },
  { id: 'privacy', label: 'Privacy', icon: Lock, component: PrivacyTab, description: 'Control what information is visible to others' },
  { id: 'security', label: 'Security', icon: ShieldCheck, component: SecurityTab, description: 'Manage your account security settings' },
  { id: 'help', label: 'Help & Support', icon: HelpCircle, component: HelpSupportTab, description: 'Find help and contact support' },
];

const SettingsTabs = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('account');
  
  const activeTabData = TABS.find(tab => tab.id === activeTab) || TABS[0];
  const TabComponent = activeTabData.component;
  const TabIcon = activeTabData.icon;

  return (
    <div className="w-full space-y-6">
      <div className="w-full">
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger className="w-full bg-elec-gray border-elec-yellow/20 text-base">
            <div className="flex items-center gap-2">
              <TabIcon className="h-5 w-5 text-elec-yellow" />
              <SelectValue placeholder="Select setting" />
            </div>
          </SelectTrigger>
          <SelectContent className="max-h-[300px] bg-elec-gray border-elec-yellow/20">
            {TABS.map(tab => (
              <SelectItem key={tab.id} value={tab.id} className="py-3 focus:bg-elec-yellow/10 focus:text-elec-yellow">
                <div className="flex items-center gap-2">
                  <tab.icon className="h-5 w-5 text-elec-yellow" />
                  <span>{tab.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <TabIcon className="h-5 w-5 text-elec-yellow" />
            <CardTitle>{activeTabData.label} Settings</CardTitle>
          </div>
          <CardDescription>
            {activeTabData.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TabComponent />
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTabs;
