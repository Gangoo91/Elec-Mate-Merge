import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TimeTracker from '@/components/apprentice/TimeTracker';
import DigitalLogbook from '@/components/apprentice/time-tracking/DigitalLogbook';
import WeeklyOverview from '@/components/apprentice/time-tracking/WeeklyOverview';
import CertificatesManager from '@/components/apprentice/time-tracking/CertificatesManager';
import TrainingEvidence from '@/components/apprentice/time-tracking/TrainingEvidence';
import AutomatedTrackingCard from '@/components/apprentice/time-tracking/AutomatedTrackingCard';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Clock, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface TrainingManagementCardProps {
  initialActiveTab?: string;
  className?: string;
}

const TrainingManagementCard = ({
  initialActiveTab = 'recent',
  className,
}: TrainingManagementCardProps) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const isMobile = useIsMobile();

  // Function to get tab display name
  const getTabDisplayName = (tabValue: string) => {
    switch (tabValue) {
      case 'recent':
        return 'Recent';
      case 'logbook':
        return 'Logbook';
      case 'weekly':
        return 'Weekly';
      case 'certificates':
        return 'Certificates';
      case 'evidence':
        return 'Evidence';
      case 'auto':
        return 'Auto-Track';
      default:
        return tabValue;
    }
  };

  const Legend = () => (
    <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/55">
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></div>
        <span>Automatic</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full border border-white/30"></div>
        <span>Manual</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 bg-white/55 rounded-full"></div>
        <span>Verified</span>
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        'rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4',
        className
      )}
    >
      <div
        className={`flex items-start ${isMobile ? 'flex-col gap-2' : 'justify-between gap-4'}`}
      >
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Off-the-job training logger
          </span>
          {isMobile && (
            <p className="text-[13px] text-white/70 leading-relaxed">
              Track your 20% off-the-job training time
            </p>
          )}
        </div>
        {!isMobile && <Legend />}
      </div>

      {isMobile && <Legend />}

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
        {isMobile ? (
          <div className="mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                >
                  {getTabDisplayName(activeTab)}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-full min-w-[200px] bg-background border-white/[0.06]"
              >
                <DropdownMenuItem onClick={() => setActiveTab('auto')} className="justify-center">
                  Auto-track
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setActiveTab('recent')}
                  className="justify-center"
                >
                  Recent
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setActiveTab('logbook')}
                  className="justify-center"
                >
                  Logbook
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setActiveTab('weekly')}
                  className="justify-center"
                >
                  Weekly
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setActiveTab('certificates')}
                  className="justify-center"
                >
                  Certificates
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setActiveTab('evidence')}
                  className="justify-center"
                >
                  Evidence
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <TabsList className="mb-4 bg-white/[0.02] border border-white/[0.06] w-full">
            <TabsTrigger value="auto" className="flex-1">
              Auto-track
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex-1">
              Recent
            </TabsTrigger>
            <TabsTrigger value="logbook" className="flex-1">
              Logbook
            </TabsTrigger>
            <TabsTrigger value="weekly" className="flex-1">
              Weekly
            </TabsTrigger>
            <TabsTrigger value="certificates" className="flex-1">
              Certificates
            </TabsTrigger>
            <TabsTrigger value="evidence" className="flex-1">
              Evidence
            </TabsTrigger>
          </TabsList>
        )}

        <TabsContent value="auto">
          <AutomatedTrackingCard />
        </TabsContent>

        <TabsContent value="recent">
          <TimeTracker />
        </TabsContent>

        <TabsContent value="logbook">
          <DigitalLogbook />
        </TabsContent>

        <TabsContent value="weekly">
          <WeeklyOverview />
        </TabsContent>

        <TabsContent value="certificates">
          <CertificatesManager />
        </TabsContent>

        <TabsContent value="evidence">
          <TrainingEvidence />
        </TabsContent>
      </Tabs>

      {isMobile && (
        <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-white/55" />
            <span className="text-2xl font-mono text-white">4h 3m</span>
          </div>
          <span className="text-[11px] text-white/55">Total logged time</span>
        </div>
      )}
    </div>
  );
};

export default TrainingManagementCard;
