
import React from 'react';
import SettingsHeader from '@/components/settings/SettingsHeader';
import SettingsTabs from '@/components/settings/SettingsTabs';

const SettingsPage = () => {
  return (
    <div className="container mx-auto py-4 space-y-4 animate-fade-in px-4 md:px-6 md:py-6 md:space-y-8 max-w-3xl">
      <SettingsHeader />
      <SettingsTabs />
    </div>
  );
};

export default SettingsPage;
