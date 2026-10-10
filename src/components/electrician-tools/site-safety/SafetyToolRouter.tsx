/**
 * SafetyToolRouter — the one switch that opens a Site Safety tool.
 *
 * Extracted from the Electrical Hub's Site Safety page so the Employer Hub can
 * open the same tools (the same components, on the same rows) inside its own
 * section. The Electrical Hub keeps `?tool=` exactly as before; the Employer Hub
 * mounts this inside a firm SafetyScopeProvider.
 *
 * Renders nothing for an unknown view, as the page's inline switch always did.
 */
import { lazy } from 'react';
import type { SafetyToolLaunch } from '@/utils/safety-launch';
import { isFirmScope, useSafetyScope } from './common/SafetyScope';

// ─────────────────────────────────────────────────────────────────────────
// Lazy-loaded tool components (full-page sub-views)
// ─────────────────────────────────────────────────────────────────────────

const RAMSGenerator = lazy(
  () => import('@/components/electrician-tools/site-safety/RAMSGenerator')
);
const MethodStatementGenerator = lazy(
  () => import('@/components/electrician-tools/site-safety/MethodStatementGenerator')
);
const IntegratedRAMSGenerator = lazy(
  () => import('@/components/electrician-tools/site-safety/IntegratedRAMSGenerator')
);
const EnhancedHazardDatabase = lazy(() =>
  import('@/components/electrician-tools/site-safety/enhanced/EnhancedHazardDatabase').then(
    (m) => ({ default: m.EnhancedHazardDatabase })
  )
);
const PhotoDocumentation = lazy(
  () => import('@/components/electrician-tools/site-safety/PhotoDocumentation')
);
const TeamBriefingTemplates = lazy(
  () => import('@/components/electrician-tools/site-safety/TeamBriefingTemplates')
);
const NearMissReporting = lazy(() =>
  import('@/components/electrician-tools/site-safety/NearMissReporting').then((m) => ({
    default: m.NearMissReporting,
  }))
);
const SafetyEquipmentTracker = lazy(
  () => import('@/components/electrician-tools/site-safety/SafetyEquipmentTracker')
);
const EmergencyProcedures = lazy(
  () => import('@/components/electrician-tools/site-safety/EmergencyProcedures')
);
const AIRAMSGenerator = lazy(() =>
  import('@/components/electrician-tools/site-safety/ai-rams/AIRAMSGenerator').then((m) => ({
    default: m.AIRAMSGenerator,
  }))
);
const DocumentHub = lazy(() =>
  import('@/components/electrician-tools/site-safety/DocumentHub').then((m) => ({
    default: m.DocumentHub,
  }))
);
const PermitToWork = lazy(() =>
  import('@/components/electrician-tools/site-safety/PermitToWork').then((m) => ({
    default: m.PermitToWork,
  }))
);
const COSHHAssessmentBuilder = lazy(() =>
  import('@/components/electrician-tools/site-safety/COSHHAssessmentBuilder').then((m) => ({
    default: m.COSHHAssessmentBuilder,
  }))
);
const InspectionChecklists = lazy(() =>
  import('@/components/electrician-tools/site-safety/InspectionChecklists').then((m) => ({
    default: m.InspectionChecklists,
  }))
);
const DigitalAccidentBook = lazy(() =>
  import('@/components/electrician-tools/site-safety/DigitalAccidentBook').then((m) => ({
    default: m.DigitalAccidentBook,
  }))
);
const SafetyTemplateLibrary = lazy(() =>
  import('@/components/electrician-tools/site-safety/templates/SafetyTemplateLibrary').then(
    (m) => ({ default: m.SafetyTemplateLibrary })
  )
);
const SafeIsolationRecord = lazy(() =>
  import('@/components/electrician-tools/site-safety/safe-isolation/SafeIsolationRecord').then(
    (m) => ({ default: m.SafeIsolationRecord })
  )
);
const PreUseCheckTool = lazy(() =>
  import('@/components/electrician-tools/site-safety/pre-use-checks/PreUseCheckTool').then((m) => ({
    default: m.PreUseCheckTool,
  }))
);
const SafetyObservationCard = lazy(() =>
  import('@/components/electrician-tools/site-safety/observations/SafetyObservationCard').then(
    (m) => ({ default: m.SafetyObservationCard })
  )
);
const ElectricianSiteDiary = lazy(() =>
  import('@/components/electrician-tools/site-safety/site-diary/ElectricianSiteDiary').then(
    (m) => ({ default: m.ElectricianSiteDiary })
  )
);
const FireWatchTimer = lazy(() =>
  import('@/components/electrician-tools/site-safety/fire-watch/FireWatchTimer').then((m) => ({
    default: m.FireWatchTimer,
  }))
);
const SafetyAlertsFeed = lazy(() =>
  import('@/components/electrician-tools/site-safety/alerts/SafetyAlertsFeed').then((m) => ({
    default: m.SafetyAlertsFeed,
  }))
);
const SafetyResourceLibrary = lazy(() =>
  import('@/components/electrician-tools/site-safety/resources/SafetyResourceLibrary').then(
    (m) => ({ default: m.SafetyResourceLibrary })
  )
);

const RAMSResultsPage = lazy(() => import('@/pages/electrician-tools/RAMSResultsPage'));

export interface SafetyToolRouterProps {
  activeView: string | null;
  setActiveView: (view: string | null) => void;
  launch: SafetyToolLaunch;
  /** A record the view opens on (firm: the generated RAMS for `rams-result`). */
  recordId?: string | null;
}

export function SafetyToolRouter({
  activeView,
  setActiveView,
  launch,
  recordId,
}: SafetyToolRouterProps) {
  const scope = useSafetyScope();
  // Firm only: the generated RAMS opens inside the Employer Hub. In the
  // Electrical Hub it has its own route, so this view does not exist there.
  if (activeView === 'rams-result' && isFirmScope(scope)) {
    return recordId ? <RAMSResultsPage jobId={recordId} /> : null;
  }
  switch (activeView) {
    case 'ai-rams':
      return (
        <AIRAMSGenerator
          onBack={() => setActiveView(null)}
          firmLaunch={isFirmScope(scope) ? launch : undefined}
        />
      );
    case 'integrated-rams':
      return <IntegratedRAMSGenerator />;
    case 'rams':
      return <RAMSGenerator />;
    case 'method-statement':
      return <MethodStatementGenerator onBack={() => setActiveView(null)} />;
    case 'hazard-database':
      return <EnhancedHazardDatabase onBack={() => setActiveView(null)} />;
    case 'photo-docs':
      return <PhotoDocumentation onBack={() => setActiveView(null)} />;
    case 'team-briefing':
      return <TeamBriefingTemplates />;
    case 'near-miss':
      return <NearMissReporting onBack={() => setActiveView(null)} launch={launch} />;
    case 'equipment':
      return <SafetyEquipmentTracker onBack={() => setActiveView(null)} />;
    case 'emergency':
      return <EmergencyProcedures onBack={() => setActiveView(null)} />;
    case 'permit-to-work':
      return <PermitToWork onBack={() => setActiveView(null)} launch={launch} />;
    case 'coshh':
      return <COSHHAssessmentBuilder onBack={() => setActiveView(null)} launch={launch} />;
    case 'inspection-checklists':
      return <InspectionChecklists onBack={() => setActiveView(null)} launch={launch} />;
    case 'accident-book':
      return <DigitalAccidentBook onBack={() => setActiveView(null)} launch={launch} />;
    case 'safety-templates':
      return <SafetyTemplateLibrary onBack={() => setActiveView(null)} />;
    case 'safe-isolation':
      return <SafeIsolationRecord onBack={() => setActiveView(null)} launch={launch} />;
    case 'pre-use-checks':
      return <PreUseCheckTool onBack={() => setActiveView(null)} launch={launch} />;
    case 'safety-observations':
      return <SafetyObservationCard onBack={() => setActiveView(null)} launch={launch} />;
    case 'site-diary':
      return <ElectricianSiteDiary onBack={() => setActiveView(null)} launch={launch} />;
    case 'fire-watch':
      return <FireWatchTimer onBack={() => setActiveView(null)} launch={launch} />;
    case 'safety-alerts':
      return <SafetyAlertsFeed onBack={() => setActiveView(null)} />;
    case 'safety-resources':
      return <SafetyResourceLibrary onBack={() => setActiveView(null)} />;
    case 'documents':
      return <DocumentHub onBack={() => setActiveView(null)} />;
    default:
      return null;
  }
}

export default SafetyToolRouter;
