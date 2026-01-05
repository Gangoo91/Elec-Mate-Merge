import React from 'react';

interface KeyboardNavigationProviderProps {
  children: React.ReactNode;
  onQuickSave?: () => void;
}

// Simplified pass-through component - keyboard shortcuts removed
const KeyboardNavigationProvider: React.FC<KeyboardNavigationProviderProps> = ({ 
  children
}) => {
  return <>{children}</>;
};

export default KeyboardNavigationProvider;
