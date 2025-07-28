
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PortfolioManager from "@/components/portfolio/UltraFastPortfolioManager";
import { queryClient } from '@/lib/queryClient';
import { useAutoPortfolioIntegration } from '@/hooks/portfolio/useAutoPortfolioIntegration';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Zap, Clock } from 'lucide-react';

const PortfolioSyncSettings = () => {
  const {
    autoSyncEnabled,
    setAutoSyncEnabled,
    lastSyncTimestamp
  } = useAutoPortfolioIntegration();

  return (
    <Card className="bg-elec-gray border-elec-yellow/20 mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-elec-light flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          Auto-Sync Time Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="auto-sync" className="text-elec-light">
              Automatically add time entries to portfolio
            </Label>
            <p className="text-sm text-elec-light/70">
              New time tracking sessions will be automatically added to your portfolio
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="auto-sync"
              checked={autoSyncEnabled}
              onCheckedChange={setAutoSyncEnabled}
              className="data-[state=checked]:bg-elec-yellow"
            />
          </div>
        </div>
        {lastSyncTimestamp && (
          <div className="mt-3 text-xs text-elec-light/60 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Last sync: {new Date(lastSyncTimestamp).toLocaleString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const PortfolioBuildingTab = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="space-y-6">
        <PortfolioSyncSettings />
        <PortfolioManager />
      </div>
    </QueryClientProvider>
  );
};

export default PortfolioBuildingTab;
