import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { CertificateSkeleton } from '@/components/ui/page-skeleton';

// Lazy load the main inspection app page
const InspectionIndex = lazy(() => import('@/pages/inspection/InspectionIndex'));
const LegacyCertificates = lazy(() => import('@/pages/inspection/LegacyCertificates'));
const NewCertificate = lazy(() => import('@/pages/inspection/NewCertificate'));

// New certificate types
const FireAlarmCertificate = lazy(() => import('@/pages/inspection/FireAlarmCertificate'));
const EVChargingCertificate = lazy(() => import('@/pages/inspection/EVChargingCertificate'));
const EmergencyLightingCertificate = lazy(
  () => import('@/pages/inspection/EmergencyLightingCertificate')
);
const SolarPVCertificate = lazy(() => import('@/pages/inspection/SolarPVCertificate'));
const PATTestingCertificate = lazy(() => import('@/pages/inspection/PATTestingCertificate'));

// Labels & Warnings
const DangerNoticePage = lazy(() => import('@/pages/inspection/DangerNoticePage'));
const IsolationCertificatePage = lazy(() => import('@/pages/inspection/IsolationCertificatePage'));
const PermitToWorkPage = lazy(() => import('@/pages/inspection/PermitToWorkPage'));
const WarningLabelsPage = lazy(() => import('@/pages/inspection/WarningLabelsPage'));
const BoardSchedulePage = lazy(() => import('@/pages/inspection/BoardSchedulePage'));
const ClientHandoutsPage = lazy(() => import('@/pages/inspection/ClientHandoutsPage'));
const SafeIsolationPage = lazy(() => import('@/pages/inspection/SafeIsolationPage'));

const LoadingFallback = CertificateSkeleton;

export default function InspectionRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Legacy certificates - standalone page */}
        <Route path="legacy-certificates" element={<LegacyCertificates />} />

        {/* New certificate selector */}
        <Route path="new" element={<NewCertificate />} />

        {/* Fire Alarm Certificate (BS 5839) */}
        <Route path="fire-alarm/new" element={<FireAlarmCertificate />} />
        <Route path="fire-alarm/:id" element={<FireAlarmCertificate />} />

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

        {/* All other inspection routes handled by InspectionIndex with query params */}
        <Route path="*" element={<InspectionIndex />} />
      </Routes>
    </Suspense>
  );
}
