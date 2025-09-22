// Enhanced Safety Management System
// Entry point that wraps the dashboard with the enhanced RAMS provider

import React from 'react';
import { RAMSProvider } from './rams/RAMSContext';
import EnhancedSafetyDashboard from './enhanced/EnhancedSafetyDashboard';

const EnhancedSafetySystem: React.FC = () => {
  return (
    <RAMSProvider>
      <EnhancedSafetyDashboard />
    </RAMSProvider>
  );
};

export default EnhancedSafetySystem;