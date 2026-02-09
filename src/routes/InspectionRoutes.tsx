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

        {/* PAT Testing Certificate (IET CoP) - ARCHIVED */}
        {/* Routes preserved for existing certificates but hidden from UI */}
        {/* <Route path="pat-testing/new" element={<PATTestingCertificate />} /> */}
        {/* <Route path="pat-testing/:id" element={<PATTestingCertificate />} /> */}

        {/* All other inspection routes handled by InspectionIndex with query params */}
        <Route path="*" element={<InspectionIndex />} />
      </Routes>
    </Suspense>
  );
}
