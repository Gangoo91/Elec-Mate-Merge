import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { CertificateSkeleton } from '@/components/ui/page-skeleton';

// Lazy load the main inspection app page
const InspectionIndex = lazyWithRetry(() => import('@/pages/inspection/InspectionIndex'));
const LegacyCertificates = lazyWithRetry(() => import('@/pages/inspection/LegacyCertificates'));
const NewCertificate = lazyWithRetry(() => import('@/pages/inspection/NewCertificate'));

// New certificate types
const FireAlarmCertificate = lazyWithRetry(() => import('@/pages/inspection/FireAlarmCertificate'));
const FireAlarmDesignCertificate = lazyWithRetry(
  () => import('@/pages/inspection/FireAlarmDesignCertificate')
);
const FireAlarmCommissioningCertificate = lazyWithRetry(
  () => import('@/pages/inspection/FireAlarmCommissioningCertificate')
);
const FireAlarmInspectionCertificate = lazyWithRetry(
  () => import('@/pages/inspection/FireAlarmInspectionCertificate')
);
const FireAlarmModificationCertificate = lazyWithRetry(
  () => import('@/pages/inspection/FireAlarmModificationCertificate')
);
const FireAlarmLogBooks = lazyWithRetry(() => import('@/pages/inspection/FireAlarmLogBooks'));
const FireAlarmLogBookDetail = lazyWithRetry(() => import('@/pages/inspection/FireAlarmLogBookDetail'));
const EVChargingCertificate = lazyWithRetry(() => import('@/pages/inspection/EVChargingCertificate'));
const EmergencyLightingCertificate = lazyWithRetry(
  () => import('@/pages/inspection/EmergencyLightingCertificate')
);
const SolarPVCertificate = lazyWithRetry(() => import('@/pages/inspection/SolarPVCertificate'));
const PATTestingCertificate = lazyWithRetry(() => import('@/pages/inspection/PATTestingCertificate'));

// BESS Certificate
const BESSCertificate = lazyWithRetry(() => import('@/pages/inspection/BESSCertificate'));
// Heat Pump Commissioning Certificate (MCS MIS 3005)
const HeatPumpCertificate = lazyWithRetry(() => import('@/pages/inspection/HeatPumpCertificate'));
// Lightning Protection Certificate
const LightningProtectionCertificate = lazyWithRetry(
  () => import('@/pages/inspection/LightningProtectionCertificate')
);
// Smoke & CO Alarm
const SmokeCOAlarmCertificate = lazyWithRetry(() => import('@/pages/inspection/SmokeCOAlarmCertificate'));
// G98/G99 Commissioning
const G98CommissioningCertificate = lazyWithRetry(
  () => import('@/pages/inspection/G98CommissioningCertificate')
);
const G99CommissioningCertificate = lazyWithRetry(
  () => import('@/pages/inspection/G99CommissioningCertificate')
);
// Testing Only
const TestingOnlyCertificate = lazyWithRetry(
  () => import('@/pages/inspection/TestingOnlyCertificate')
);
// Disconnection Certificate
const DisconnectionCertificate = lazyWithRetry(
  () => import('@/pages/inspection/DisconnectionCertificate')
);

// Labels & Warnings
const DangerNoticePage = lazyWithRetry(() => import('@/pages/inspection/DangerNoticePage'));
const IsolationCertificatePage = lazyWithRetry(() => import('@/pages/inspection/IsolationCertificatePage'));
const PermitToWorkPage = lazyWithRetry(() => import('@/pages/inspection/PermitToWorkPage'));
const WarningLabelsPage = lazyWithRetry(() => import('@/pages/inspection/WarningLabelsPage'));
const BoardSchedulePage = lazyWithRetry(() => import('@/pages/inspection/BoardSchedulePage'));
const ClientHandoutsPage = lazyWithRetry(() => import('@/pages/inspection/ClientHandoutsPage'));
const SafeIsolationPage = lazyWithRetry(() => import('@/pages/inspection/SafeIsolationPage'));
const LimitationNoticePage = lazyWithRetry(() => import('@/pages/inspection/LimitationNoticePage'));
const NonComplianceNoticePage = lazyWithRetry(() => import('@/pages/inspection/NonComplianceNoticePage'));
const CompletionNoticePage = lazyWithRetry(() => import('@/pages/inspection/CompletionNoticePage'));

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
        <Route path="fire-alarm-log-books" element={<FireAlarmLogBooks />} />
        <Route path="fire-alarm-log-books/:id" element={<FireAlarmLogBookDetail />} />
        <Route path="fire-alarm-design/new" element={<FireAlarmDesignCertificate />} />
        <Route path="fire-alarm-design/:id" element={<FireAlarmDesignCertificate />} />
        <Route
          path="fire-alarm-commissioning/new"
          element={<FireAlarmCommissioningCertificate />}
        />
        <Route
          path="fire-alarm-commissioning/:id"
          element={<FireAlarmCommissioningCertificate />}
        />
        <Route path="fire-alarm-inspection/new" element={<FireAlarmInspectionCertificate />} />
        <Route path="fire-alarm-inspection/:id" element={<FireAlarmInspectionCertificate />} />
        <Route path="fire-alarm-modification/new" element={<FireAlarmModificationCertificate />} />
        <Route path="fire-alarm-modification/:id" element={<FireAlarmModificationCertificate />} />

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
        <Route path="heat-pump/new" element={<HeatPumpCertificate />} />
        <Route path="heat-pump/:id" element={<HeatPumpCertificate />} />

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

        {/* Testing Only Certificate */}
        <Route path="testing-only/new" element={<TestingOnlyCertificate />} />
        <Route path="testing-only/:id" element={<TestingOnlyCertificate />} />

        {/* Disconnection Certificate */}
        <Route path="disconnection/new" element={<DisconnectionCertificate />} />
        <Route path="disconnection/:id" element={<DisconnectionCertificate />} />

        {/* Labels & Warnings */}
        <Route path="danger-notice" element={<DangerNoticePage />} />
        <Route path="danger-notice/:id" element={<DangerNoticePage />} />
        <Route path="isolation-certificate" element={<IsolationCertificatePage />} />
        <Route path="isolation-certificate/:id" element={<IsolationCertificatePage />} />
        <Route path="permit-to-work" element={<PermitToWorkPage />} />
        <Route path="permit-to-work/:id" element={<PermitToWorkPage />} />
        <Route path="warning-labels" element={<WarningLabelsPage />} />
        <Route path="board-schedule" element={<BoardSchedulePage />} />
        <Route path="board-schedule/:id" element={<BoardSchedulePage />} />
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
