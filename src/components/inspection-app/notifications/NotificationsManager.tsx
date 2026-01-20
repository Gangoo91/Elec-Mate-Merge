import { useState, useEffect } from 'react';
import { NotificationsList } from './NotificationsList';
import { NotificationDetailModal } from './NotificationDetailModal';
import { BuildingControlFormGuide } from './BuildingControlFormGuide';
import { BuildingControlFinder } from './BuildingControlFinder';
import { NonRegisteredUserGuide } from './NonRegisteredUserGuide';
import { RegisteredUserGuide } from './RegisteredUserGuide';
import { useNotifications, Notification } from '@/hooks/useNotifications';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NotificationsManagerProps {
  onNavigate: (section: string, reportId?: string, reportType?: string) => void;
}

export const NotificationsManager = ({ onNavigate }: NotificationsManagerProps) => {
  const { notifications, isLoading, updateNotification, deleteNotification } = useNotifications();
  const { toast } = useToast();
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showNiceic, setShowNiceic] = useState(true);
  const [showNapit, setShowNapit] = useState(true);
  const [isFormGuideOpen, setIsFormGuideOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [showBuildingControlFinder, setShowBuildingControlFinder] = useState(false);

  // Check company profile for scheme membership
  useEffect(() => {
    const checkSchemeMembership = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsRegistered(false);
        return;
      }

      const { data: companyProfile } = await supabase
        .from('company_profiles')
        .select('niceic_number, napit_number')
        .eq('user_id', user.id)
        .single();

      if (companyProfile) {
        const hasNiceic = !!companyProfile.niceic_number;
        const hasNapit = !!companyProfile.napit_number;
        setShowNiceic(hasNiceic);
        setShowNapit(hasNapit);
        setIsRegistered(hasNiceic || hasNapit);
      } else {
        setIsRegistered(false);
      }
    };

    checkSchemeMembership();
  }, []);

  const handleViewCertificate = (reportId: string, reportType: string) => {
    // Map report_type to section names
    const sectionMap: Record<string, string> = {
      'eicr': 'eicr',
      'eic': 'eic',
      'minor-works': 'minor-works',
    };

    const section = sectionMap[reportType] || reportType;
    onNavigate(section, reportId, reportType);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      {/* User-specific guidance based on scheme membership */}
      {isRegistered === false && (
        <NonRegisteredUserGuide
          onFindBuildingControl={() => setShowBuildingControlFinder(true)}
        />
      )}

      {isRegistered === true && (
        <RegisteredUserGuide showNiceic={showNiceic} showNapit={showNapit} />
      )}

      {/* Building Control Form Guide - Collapsible (supplementary details) */}
      <Collapsible
        open={isFormGuideOpen}
        onOpenChange={setIsFormGuideOpen}
        className="mb-6"
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-card/80 hover:bg-card rounded-2xl transition-all border border-border/50 hover:border-primary/30 group">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <span className="text-base">📋</span>
            </div>
            <span className="text-sm font-semibold text-foreground">
              What to Submit to Building Control
            </span>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
              isFormGuideOpen ? 'rotate-180' : ''
            }`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ScrollArea className="h-[400px] mt-3 rounded-2xl border border-border/50 bg-card/50">
            <div className="p-4">
              <BuildingControlFormGuide />
            </div>
          </ScrollArea>
        </CollapsibleContent>
      </Collapsible>

      <NotificationsList
        notifications={notifications}
        onUpdate={updateNotification}
        onDelete={deleteNotification}
        onViewDetails={setSelectedNotification}
        onViewCertificate={handleViewCertificate}
        showNiceic={showNiceic}
        showNapit={showNapit}
      />

      <NotificationDetailModal
        notification={selectedNotification}
        open={!!selectedNotification}
        onClose={() => setSelectedNotification(null)}
        onUpdate={updateNotification}
        onViewCertificate={handleViewCertificate}
      />

      {/* Global Building Control Finder Dialog */}
      <BuildingControlFinder
        open={showBuildingControlFinder}
        onOpenChange={setShowBuildingControlFinder}
        onSelect={(authority) => {
          toast({
            title: 'Building Control Found',
            description: `${authority} - Use the contact details to submit your notification directly.`,
          });
        }}
      />
    </>
  );
};
