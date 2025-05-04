
import React from 'react';
import { SettingsIcon } from "lucide-react";

const SettingsHeader = () => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <SettingsIcon className="h-6 w-6 text-elec-yellow" />
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
    </div>
  );
};

export default SettingsHeader;
