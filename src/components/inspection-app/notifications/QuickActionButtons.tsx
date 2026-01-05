import { ExternalLink, CheckCircle2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PORTAL_LINKS, PortalType } from '@/utils/portalLinks';
import { useToast } from '@/hooks/use-toast';

interface QuickActionButtonsProps {
  notificationId: string;
  reportId: string;
  napitSubmitted: boolean;
  niceicSubmitted: boolean;
  onUpdate: (id: string, updates: any) => void;
  onViewCertificate: () => void;
  showNiceic?: boolean;
  showNapit?: boolean;
}

export const QuickActionButtons = ({
  notificationId,
  napitSubmitted,
  niceicSubmitted,
  onUpdate,
  onViewCertificate,
  showNiceic = true,
  showNapit = true,
}: QuickActionButtonsProps) => {
  const { toast } = useToast();

  const handlePortalOpen = (portalType: PortalType, submittedField: string) => {
    const portal = PORTAL_LINKS[portalType];
    window.open(portal.url, '_blank', 'noopener,noreferrer');
    
    // Update submission timestamp
    const now = new Date().toISOString();
    onUpdate(notificationId, {
      [submittedField]: true,
      notification_status: 'in-progress',
    });

    toast({
      title: 'Portal Opened',
      description: `${portal.label} opened in new tab`,
    });
  };

  const handleMarkSubmitted = () => {
    onUpdate(notificationId, {
      notification_status: 'submitted',
      submitted_at: new Date().toISOString(),
      napit_submitted: true,
      niceic_submitted: true,
      local_authority_submitted: true,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
      {showNiceic && (
        <Button
          size="sm"
          variant={niceicSubmitted ? 'outline' : 'default'}
          onClick={() => handlePortalOpen('niceic', 'niceic_submitted')}
          className="w-full sm:w-auto text-xs sm:text-xs min-h-[44px] sm:min-h-[36px] touch-manipulation"
        >
          <ExternalLink className="w-3 h-3 mr-1 flex-shrink-0" />
          {niceicSubmitted ? 'NICEIC ✓' : 'Open NICEIC'}
        </Button>
      )}
      
      {showNapit && (
        <Button
          size="sm"
          variant={napitSubmitted ? 'outline' : 'default'}
          onClick={() => handlePortalOpen('napit', 'napit_submitted')}
          className="w-full sm:w-auto text-xs sm:text-xs min-h-[44px] sm:min-h-[36px] touch-manipulation"
        >
          <ExternalLink className="w-3 h-3 mr-1 flex-shrink-0" />
          {napitSubmitted ? 'NAPIT ✓' : 'Open NAPIT'}
        </Button>
      )}

      <Button
        size="sm"
        variant="outline"
        onClick={onViewCertificate}
        className="w-full sm:w-auto text-xs sm:text-xs min-h-[44px] sm:min-h-[36px] touch-manipulation"
      >
        <FileText className="w-3 h-3 mr-1 flex-shrink-0" />
        View Certificate
      </Button>

      <Button
        size="sm"
        variant="default"
        onClick={handleMarkSubmitted}
        className="w-full sm:w-auto text-xs sm:text-xs min-h-[44px] sm:min-h-[36px] bg-green-600 hover:bg-green-700 touch-manipulation"
      >
        <CheckCircle2 className="w-3 h-3 mr-1 flex-shrink-0" />
        Mark Submitted
      </Button>
    </div>
  );
};
