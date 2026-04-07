import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { CertificateSkeleton } from '@/components/ui/page-skeleton';

// Lazy load the main inspection app page
const InspectionIndex = lazy(() => import('@/pages/inspection/InspectionIndex'));
const LegacyCertificates = lazy(() => import('@/pages/inspection/LegacyCertificates'));
const NewCertificate = lazy(() => import('@/pages/inspection/NewCertificate'));

// New certificate types
const FireAlarmCertificate = lazy(() => import('@/pages/inspection/FireAlarmCertificate'));
const FireAlarmDesignCertificate = lazy(() => import('@/pages/inspection/FireAlarmDesignCertificate'));
const FireAlarmCommissioningCertificate = lazy(() => import('@/pages/inspection/FireAlarmCommissioningCertificate'));
const EVChargingCertificate = lazy(() => import('@/pages/inspection/EVChargingCertificate'));
const EmergencyLightingCertificate = lazy(
  () => import('@/pages/inspection/EmergencyLightingCertificate')
);
const SolarPVCertificate = lazy(() => import('@/pages/inspection/SolarPVCertificate'));
const PATTestingCertificate = lazy(() => import('@/pages/inspection/PATTestingCertificate'));

// BESS Certificate
const BESSCertificate = lazy(() => import('@/pages/inspection/BESSCertificate'));
// Lightning Protection Certificate
const LightningProtectionCertificate = lazy(() => import('@/pages/inspection/LightningProtectionCertificate'));
// Smoke & CO Alarm
const SmokeCOAlarmCertificate = lazy(() => import('@/pages/inspection/SmokeCOAlarmCertificate'));
// G98/G99 Commissioning
const G98CommissioningCertificate = lazy(() => import('@/pages/inspection/G98CommissioningCertificate'));
const G99CommissioningCertificate = lazy(() => import('@/pages/inspection/G99CommissioningCertificate'));

// Labels & Warnings
const DangerNoticePage = lazy(() => import('@/pages/inspection/DangerNoticePage'));
const IsolationCertificatePage = lazy(() => import('@/pages/inspection/IsolationCertificatePage'));
const PermitToWorkPage = lazy(() => import('@/pages/inspection/PermitToWorkPage'));
const WarningLabelsPage = lazy(() => import('@/pages/inspection/WarningLabelsPage'));
const BoardSchedulePage = lazy(() => import('@/pages/inspection/BoardSchedulePage'));
const ClientHandoutsPage = lazy(() => import('@/pages/inspection/ClientHandoutsPage'));
const SafeIsolationPage = lazy(() => import('@/pages/inspection/SafeIsolationPage'));
const LimitationNoticePage = lazy(() => import('@/pages/inspection/LimitationNoticePage'));
const NonComplianceNoticePage = lazy(() => import('@/pages/inspection/NonComplianceNoticePage'));
const CompletionNoticePage = lazy(() => import('@/pages/inspection/CompletionNoticePage'));

const LoadingFallback = CertificateSkeleton;

export default function InspectionRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Legacy certificates - standalone page */}
        <Route path="legacy-certificates" element={<LegacyCertificates />} />

        {/* New certificate selector */}
        <Route path="new" element={<NewCertificate />} />

        {/* Fire Alarm Certificates (BS 5839) */}
        <Route path="fire-alarm/new" element={<FireAlarmCertificate />} />
        <Route path="fire-alarm/:id" element={<FireAlarmCertificate />} />
        <Route path="fire-alarm-design/new" element={<FireAlarmDesignCertificate />} />
        <Route path="fire-alarm-design/:id" element={<FireAlarmDesignCertificate />} />
        <Route path="fire-alarm-commissioning/new" element={<FireAlarmCommissioningCertificate />} />
        <Route path="fire-alarm-commissioning/:id" element={<FireAlarmCommissioningCertificate />} />

        {/* EV Charging Certificate (IET CoP) */}
        <Route path="ev-charging/new" element={<EVChargingCertificate />} />
        <Route path="ev-charging/:id" element={<EVChargingCertificate />} />

        {/* Emergency Lighting Certificate (BS 5266) */}
        <Route path="emergency-lighting/new" element={<EmergencyLightingCertificate />} />
        <Route path="emergency-lighting/:id" element={<EmergencyLightingCertificate />} />

        {/* Solar PV Installation Certificate (MCS Compliance) */}
        <Route path="solar-pv/new" element={<SolarPVCertificate />} />
        <Route path="solar-pv/:id" element={<SolarPVCertificate />} />

        {/* PAT Testing Certificate (IET CoP) */}
        <Route path="pat-testing/new" element={<PATTestingCertificate />} />
        <Route path="pat-testing/:id" element={<PATTestingCertificate />} />

        {/* Battery Energy Storage System (BESS) */}
        <Route path="bess/new" element={<BESSCertificate />} />
        <Route path="bess/:id" element={<BESSCertificate />} />

        {/* Lightning Protection (BS EN 62305) */}
        <Route path="lightning-protection/new" element={<LightningProtectionCertificate />} />
        <Route path="lightning-protection/:id" element={<LightningProtectionCertificate />} />

        {/* Smoke & CO Alarm */}
        <Route path="smoke-co-alarm/new" element={<SmokeCOAlarmCertificate />} />
        <Route path="smoke-co-alarm/:id" element={<SmokeCOAlarmCertificate />} />

        {/* G98 Commissioning (EREC G98) */}
        <Route path="g98-commissioning/new" element={<G98CommissioningCertificate />} />
        <Route path="g98-commissioning/:id" element={<G98CommissioningCertificate />} />

        {/* G99 Commissioning (EREC G99) */}
        <Route path="g99-commissioning/new" element={<G99CommissioningCertificate />} />
        <Route path="g99-commissioning/:id" element={<G99CommissioningCertificate />} />

        {/* Labels & Warnings */}
        <Route path="danger-notice" element={<DangerNoticePage />} />
        <Route path="danger-notice/:id" element={<DangerNoticePage />} />
        <Route path="isolation-certificate" element={<IsolationCertificatePage />} />
        <Route path="isolation-certificate/:id" element={<IsolationCertificatePage />} />
        <Route path="permit-to-work" element={<PermitToWorkPage />} />
        <Route path="permit-to-work/:id" element={<PermitToWorkPage />} />
        <Route path="warning-labels" element={<WarningLabelsPage />} />
        <Route path="board-schedule" element={<BoardSchedulePage />} />
        <Route path="client-handouts" element={<ClientHandoutsPage />} />
        <Route path="safe-isolation" element={<SafeIsolationPage />} />
        <Route path="safe-isolation/:id" element={<SafeIsolationPage />} />
        <Route path="limitation-notice" element={<LimitationNoticePage />} />
        <Route path="limitation-notice/:id" element={<LimitationNoticePage />} />
        <Route path="non-compliance-notice" element={<NonComplianceNoticePage />} />
        <Route path="non-compliance-notice/:id" element={<NonComplianceNoticePage />} />
        <Route path="completion-notice" element={<CompletionNoticePage />} />
        <Route path="completion-notice/:id" element={<CompletionNoticePage />} />

        {/* All other inspection routes handled by InspectionIndex with query params */}
        <Route path="*" element={<InspectionIndex />} />
      </Routes>
    </Suspense>
  );
}
