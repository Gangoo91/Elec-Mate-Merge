import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { CourseSkeleton } from '@/components/ui/page-skeleton';
import { ipafRoutes } from '@/routes/study-centre/ipafRoutes';
import { pasmaRoutes } from '@/routes/study-centre/pasmaRoutes';
import { mewpRoutes } from '@/routes/study-centre/mewpRoutes';
import { firstAidRoutes } from '@/routes/study-centre/firstAidRoutes';
import { mentalHealthRoutes } from '@/routes/study-centre/mentalHealthRoutes';
import { asbestosRoutes } from '@/routes/study-centre/asbestosRoutes';
import { workingAtHeightRoutes } from '@/routes/study-centre/workingAtHeightRoutes';
import { manualHandlingRoutes } from '@/routes/study-centre/manualHandlingRoutes';
import { coshhRoutes } from '@/routes/study-centre/coshhRoutes';
import { confinedSpacesRoutes } from '@/routes/study-centre/confinedSpacesRoutes';
import { fireSafetyRoutes } from '@/routes/study-centre/fireSafetyRoutes';
import { cscsCardRoutes } from '@/routes/study-centre/cscsCardRoutes';
import { scaffoldingAwarenessRoutes } from '@/routes/study-centre/scaffoldingAwarenessRoutes';
import { environmentalSustainabilityRoutes } from '@/routes/study-centre/environmentalSustainabilityRoutes';
import { cdmRegulationsRoutes } from '@/routes/study-centre/cdmRegulationsRoutes';

const GeneralUpskillingIndex = lazyWithRetry(
  () => import('@/pages/study-centre/general-upskilling/Index')
);

const LoadingFallback = CourseSkeleton;

export default function GeneralUpskillingRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route index element={<GeneralUpskillingIndex />} />
        {ipafRoutes}
        {pasmaRoutes}
        {mewpRoutes}
        {firstAidRoutes}
        {mentalHealthRoutes}
        {asbestosRoutes}
        {workingAtHeightRoutes}
        {manualHandlingRoutes}
        {coshhRoutes}
        {confinedSpacesRoutes}
        {fireSafetyRoutes}
        {cscsCardRoutes}
        {scaffoldingAwarenessRoutes}
        {environmentalSustainabilityRoutes}
        {cdmRegulationsRoutes}
      </Routes>
    </Suspense>
  );
}
