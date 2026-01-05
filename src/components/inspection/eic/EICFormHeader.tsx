import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Save, Plus, WifiOff } from 'lucide-react';
import SaveStatusIndicator from '@/components/SaveStatusIndicator';
import { SyncStatusIndicator } from '@/components/ui/sync-status-indicator';
import { SyncStatus } from '@/hooks/useCloudSync';
import { useIsMobile } from '@/hooks/use-mobile';

interface EICFormHeaderProps {
  onBack: () => void;
  isSaving?: boolean;
  hasUnsavedChanges?: boolean;
  onManualSave?: () => void;
  onStartNew?: () => void;
  formData?: any;
  syncState?: { status: SyncStatus; lastSyncTime?: number; errorMessage?: string };
  isOnline?: boolean;
  isAuthenticated?: boolean;
}

const EICFormHeader: React.FC<EICFormHeaderProps> = ({
  onBack,
  isSaving = false,
  hasUnsavedChanges = false,
  onManualSave,
  onStartNew,
  formData,
  syncState,
  isOnline = true,
  isAuthenticated = false
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" onClick={onBack} className="p-2 flex-shrink-0 hover:bg-accent/10 transition-colors duration-200">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-bold tracking-tight flex items-center gap-2 flex-wrap">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-sm">
              <FileText className="h-4 w-4 text-black flex-shrink-0" />
            </div>
            <span className="bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">EIC</span>
          </h1>
        </div>
        {onStartNew && (
          <Button 
            onClick={onStartNew} 
            variant="outline" 
            size="sm" 
            className="h-11 w-11 p-2 flex-shrink-0 border-border hover:bg-accent/10 hover:border-border transition-all duration-200 touch-manipulation"
            aria-label="Start New Report"
            title="Start New"
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
        {onManualSave && (
          <Button 
            onClick={onManualSave} 
            disabled={isSaving || syncState?.status === 'syncing'} 
            variant="outline" 
            size="sm" 
            className="h-11 w-11 p-2 flex-shrink-0 border-border hover:bg-accent/10 hover:border-border transition-all duration-200 touch-manipulation"
            aria-label="Save Now"
            title="Save Now"
          >
            <Save className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="mb-6 pb-4 border-b border-border/50">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Back Button + Title */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Button 
            variant="ghost" 
            onClick={onBack}
            size="icon"
            className="flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg elec-gradient-bg flex items-center justify-center">
              <FileText className="h-6 w-6 text-black" />
            </div>
            
            <div className="flex-1 min-w-0">
          <span className="truncate bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent text-2xl font-bold">
            EIC - Electrical Installation Certificate
          </span>
              <p className="text-sm text-muted-foreground">
                BS7671:2018 New Installation Certificate
              </p>
            </div>
          </div>
        </div>
        
        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {onStartNew && (
            <Button
              variant="outline"
              onClick={onStartNew}
              className="h-10"
            >
              Start New
            </Button>
          )}
          
          {onManualSave && (
            <Button
              onClick={onManualSave}
              disabled={isSaving || syncState?.status === 'syncing'}
              className="elec-gradient-bg hover:opacity-90 text-black font-semibold h-10 px-6"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Now
            </Button>
          )}
        </div>
      </div>
      
      {/* Save Status - Separate Row */}
      <div className="flex justify-end mt-2 items-center gap-3">
        {!isOnline && (
          <Badge variant="outline" className="text-orange-600 border-orange-600/20 bg-orange-600/5">
            <WifiOff className="h-3 w-3 mr-1" />
            Offline Mode
          </Badge>
        )}
        <SaveStatusIndicator
          hasUnsavedChanges={hasUnsavedChanges}
          isSaving={isSaving}
        />
        {syncState && (
          <SyncStatusIndicator
            status={syncState.status}
            lastSyncTime={syncState.lastSyncTime}
            isOnline={isOnline}
            isAuthenticated={isAuthenticated}
          />
        )}
      </div>
    </div>
  );
};

export default EICFormHeader;
