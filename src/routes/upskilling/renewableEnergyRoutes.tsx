import { lazy } from 'react';
import { Route } from 'react-router-dom';
import { withTimeout, trackImport } from '@/lib/lazy';

const RenewableEnergyCourse = lazy(() =>
  withTimeout(() =>
    trackImport('RenewableEnergyCourse', () => import('@/pages/upskilling/RenewableEnergyCourse'))
  )
);
const RenewableEnergyModule1 = lazy(() =>
  withTimeout(() =>
    trackImport('RenewableEnergyModule1', () => import('@/pages/upskilling/RenewableEnergyModule1'))
  )
);
const RenewableEnergyModule1Section1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule1Section1',
      () => import('@/pages/upskilling/RenewableEnergyModule1Section1')
    )
  )
);
const RenewableEnergyModule1Section2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule1Section2',
      () => import('@/pages/upskilling/RenewableEnergyModule1Section2')
    )
  )
);
const RenewableEnergyModule1Section3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule1Section3',
      () => import('@/pages/upskilling/RenewableEnergyModule1Section3')
    )
  )
);
const RenewableEnergyModule1Section4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule1Section4',
      () => import('@/pages/upskilling/RenewableEnergyModule1Section4')
    )
  )
);
const RenewableEnergyModule1Section5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule1Section5',
      () => import('@/pages/upskilling/RenewableEnergyModule1Section5')
    )
  )
);
const RenewableEnergyModule1Section6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule1Section6',
      () => import('@/pages/upskilling/RenewableEnergyModule1Section6')
    )
  )
);
const RenewableEnergyModule1Section7 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule1Section7',
      () => import('@/pages/upskilling/RenewableEnergyModule1Section7')
    )
  )
);
const RenewableEnergyModule1Section8 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule1Section8',
      () => import('@/pages/upskilling/RenewableEnergyModule1Section8')
    )
  )
);
const RenewableEnergyModule2 = lazy(() =>
  withTimeout(() =>
    trackImport('RenewableEnergyModule2', () => import('@/pages/upskilling/RenewableEnergyModule2'))
  )
);
const RenewableEnergyModule2Section1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule2Section1',
      () => import('@/pages/upskilling/RenewableEnergyModule2Section1')
    )
  )
);
const RenewableEnergyModule2Section2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule2Section2',
      () => import('@/pages/upskilling/RenewableEnergyModule2Section2')
    )
  )
);
const RenewableEnergyModule2Section3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule2Section3',
      () => import('@/pages/upskilling/RenewableEnergyModule2Section3')
    )
  )
);
const RenewableEnergyModule2Section4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule2Section4',
      () => import('@/pages/upskilling/RenewableEnergyModule2Section4')
    )
  )
);
const RenewableEnergyModule2Section5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule2Section5',
      () => import('@/pages/upskilling/RenewableEnergyModule2Section5')
    )
  )
);
const RenewableEnergyModule2Section6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule2Section6',
      () => import('@/pages/upskilling/RenewableEnergyModule2Section6')
    )
  )
);
const RenewableEnergyModule2Section7 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule2Section7',
      () => import('@/pages/upskilling/RenewableEnergyModule2Section7')
    )
  )
);
const RenewableEnergyModule2Section8 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule2Section8',
      () => import('@/pages/upskilling/RenewableEnergyModule2Section8')
    )
  )
);
const RenewableEnergyModule3 = lazy(() =>
  withTimeout(() =>
    trackImport('RenewableEnergyModule3', () => import('@/pages/upskilling/RenewableEnergyModule3'))
  )
);
const RenewableEnergyModule3Section1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule3Section1',
      () => import('@/pages/upskilling/RenewableEnergyModule3Section1')
    )
  )
);
const RenewableEnergyModule3Section2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule3Section2',
      () => import('@/pages/upskilling/RenewableEnergyModule3Section2')
    )
  )
);
const RenewableEnergyModule3Section3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule3Section3',
      () => import('@/pages/upskilling/RenewableEnergyModule3Section3')
    )
  )
);
const RenewableEnergyModule3Section4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule3Section4',
      () => import('@/pages/upskilling/RenewableEnergyModule3Section4')
    )
  )
);
const RenewableEnergyModule3Section5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule3Section5',
      () => import('@/pages/upskilling/RenewableEnergyModule3Section5')
    )
  )
);
const RenewableEnergyModule3Section6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule3Section6',
      () => import('@/pages/upskilling/RenewableEnergyModule3Section6')
    )
  )
);
const RenewableEnergyModule3Section7 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule3Section7',
      () => import('@/pages/upskilling/RenewableEnergyModule3Section7')
    )
  )
);
const RenewableEnergyModule3Section8 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule3Section8',
      () => import('@/pages/upskilling/RenewableEnergyModule3Section8')
    )
  )
);
const RenewableEnergyModule4 = lazy(() =>
  withTimeout(() =>
    trackImport('RenewableEnergyModule4', () => import('@/pages/upskilling/RenewableEnergyModule4'))
  )
);
const RenewableEnergyModule4Section1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule4Section1',
      () => import('@/pages/upskilling/RenewableEnergyModule4Section1')
    )
  )
);
const RenewableEnergyModule4Section2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule4Section2',
      () => import('@/pages/upskilling/RenewableEnergyModule4Section2')
    )
  )
);
const RenewableEnergyModule4Section3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule4Section3',
      () => import('@/pages/upskilling/RenewableEnergyModule4Section3')
    )
  )
);
const RenewableEnergyModule4Section4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule4Section4',
      () => import('@/pages/upskilling/RenewableEnergyModule4Section4')
    )
  )
);
const RenewableEnergyModule4Section5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule4Section5',
      () => import('@/pages/upskilling/RenewableEnergyModule4Section5')
    )
  )
);
const RenewableEnergyModule4Section6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule4Section6',
      () => import('@/pages/upskilling/RenewableEnergyModule4Section6')
    )
  )
);
const RenewableEnergyModule4Section7 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule4Section7',
      () => import('@/pages/upskilling/RenewableEnergyModule4Section7')
    )
  )
);
const RenewableEnergyModule4Section8 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule4Section8',
      () => import('@/pages/upskilling/RenewableEnergyModule4Section8')
    )
  )
);
const RenewableEnergyModule5 = lazy(() =>
  withTimeout(() =>
    trackImport('RenewableEnergyModule5', () => import('@/pages/upskilling/RenewableEnergyModule5'))
  )
);
const RenewableEnergyModule5Section1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule5Section1',
      () => import('@/pages/upskilling/RenewableEnergyModule5Section1')
    )
  )
);
const RenewableEnergyModule5Section2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule5Section2',
      () => import('@/pages/upskilling/RenewableEnergyModule5Section2')
    )
  )
);
const RenewableEnergyModule5Section3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule5Section3',
      () => import('@/pages/upskilling/RenewableEnergyModule5Section3')
    )
  )
);
const RenewableEnergyModule5Section4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule5Section4',
      () => import('@/pages/upskilling/RenewableEnergyModule5Section4')
    )
  )
);
const RenewableEnergyModule5Section5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule5Section5',
      () => import('@/pages/upskilling/RenewableEnergyModule5Section5')
    )
  )
);
const RenewableEnergyModule5Section6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule5Section6',
      () => import('@/pages/upskilling/RenewableEnergyModule5Section6')
    )
  )
);
const RenewableEnergyModule6 = lazy(() =>
  withTimeout(() =>
    trackImport('RenewableEnergyModule6', () => import('@/pages/upskilling/RenewableEnergyModule6'))
  )
);
const RenewableEnergyModule6Section1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule6Section1',
      () => import('@/pages/upskilling/RenewableEnergyModule6Section1')
    )
  )
);
const RenewableEnergyModule6Section2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule6Section2',
      () => import('@/pages/upskilling/RenewableEnergyModule6Section2')
    )
  )
);
const RenewableEnergyModule6Section3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule6Section3',
      () => import('@/pages/upskilling/RenewableEnergyModule6Section3')
    )
  )
);
const RenewableEnergyModule6Section4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule6Section4',
      () => import('@/pages/upskilling/RenewableEnergyModule6Section4')
    )
  )
);
const RenewableEnergyModule6Section5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule6Section5',
      () => import('@/pages/upskilling/RenewableEnergyModule6Section5')
    )
  )
);
const RenewableEnergyModule7 = lazy(() =>
  withTimeout(() =>
    trackImport('RenewableEnergyModule7', () => import('@/pages/upskilling/RenewableEnergyModule7'))
  )
);
const RenewableEnergyModule7Section1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule7Section1',
      () => import('@/pages/upskilling/RenewableEnergyModule7Section1')
    )
  )
);
const RenewableEnergyModule7Section2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule7Section2',
      () => import('@/pages/upskilling/RenewableEnergyModule7Section2')
    )
  )
);
const RenewableEnergyModule7Section3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule7Section3',
      () => import('@/pages/upskilling/RenewableEnergyModule7Section3')
    )
  )
);
const RenewableEnergyModule7Section4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule7Section4',
      () => import('@/pages/upskilling/RenewableEnergyModule7Section4')
    )
  )
);
const RenewableEnergyModule7Section5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule7Section5',
      () => import('@/pages/upskilling/RenewableEnergyModule7Section5')
    )
  )
);
const RenewableEnergyModule7Section6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule7Section6',
      () => import('@/pages/upskilling/RenewableEnergyModule7Section6')
    )
  )
);
const RenewableEnergyModule8 = lazy(() =>
  withTimeout(() =>
    trackImport('RenewableEnergyModule8', () => import('@/pages/upskilling/RenewableEnergyModule8'))
  )
);
const RenewableEnergyModule8Section1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule8Section1',
      () => import('@/pages/upskilling/RenewableEnergyModule8Section1')
    )
  )
);
const RenewableEnergyModule8Section2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule8Section2',
      () => import('@/pages/upskilling/RenewableEnergyModule8Section2')
    )
  )
);
const RenewableEnergyModule8Section3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule8Section3',
      () => import('@/pages/upskilling/RenewableEnergyModule8Section3')
    )
  )
);
const RenewableEnergyModule8Section4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule8Section4',
      () => import('@/pages/upskilling/RenewableEnergyModule8Section4')
    )
  )
);
const RenewableEnergyModule8Section5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule8Section5',
      () => import('@/pages/upskilling/RenewableEnergyModule8Section5')
    )
  )
);
const RenewableEnergyModule9 = lazy(() =>
  withTimeout(() =>
    trackImport('RenewableEnergyModule9', () => import('@/pages/upskilling/RenewableEnergyModule9'))
  )
);
const RenewableEnergyModule9Section1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule9Section1',
      () => import('@/pages/upskilling/RenewableEnergyModule9Section1')
    )
  )
);
const RenewableEnergyModule9Section2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule9Section2',
      () => import('@/pages/upskilling/RenewableEnergyModule9Section2')
    )
  )
);
const RenewableEnergyModule9Section3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule9Section3',
      () => import('@/pages/upskilling/RenewableEnergyModule9Section3')
    )
  )
);
const RenewableEnergyModule9Section4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule9Section4',
      () => import('@/pages/upskilling/RenewableEnergyModule9Section4')
    )
  )
);
const RenewableEnergyModule9Section5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule9Section5',
      () => import('@/pages/upskilling/RenewableEnergyModule9Section5')
    )
  )
);
const RenewableEnergyModule9Section6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule9Section6',
      () => import('@/pages/upskilling/RenewableEnergyModule9Section6')
    )
  )
);
const RenewableEnergyModule10 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyModule10',
      () => import('@/pages/upskilling/RenewableEnergyModule10')
    )
  )
);
const RenewableEnergyMockExam = lazy(() =>
  withTimeout(() =>
    trackImport(
      'RenewableEnergyMockExam',
      () => import('@/pages/upskilling/RenewableEnergyMockExam')
    )
  )
);

export const renewableEnergyRoutes = (
  <>
    <Route path="renewable-energy-course" element={<RenewableEnergyCourse />} />
    <Route path="renewable-energy-module-1" element={<RenewableEnergyModule1 />} />
    <Route
      path="renewable-energy-module-1-section-1"
      element={<RenewableEnergyModule1Section1 />}
    />
    <Route
      path="renewable-energy-module-1-section-2"
      element={<RenewableEnergyModule1Section2 />}
    />
    <Route
      path="renewable-energy-module-1-section-3"
      element={<RenewableEnergyModule1Section3 />}
    />
    <Route
      path="renewable-energy-module-1-section-4"
      element={<RenewableEnergyModule1Section4 />}
    />
    <Route
      path="renewable-energy-module-1-section-5"
      element={<RenewableEnergyModule1Section5 />}
    />
    <Route
      path="renewable-energy-module-1-section-6"
      element={<RenewableEnergyModule1Section6 />}
    />
    <Route
      path="renewable-energy-module-1-section-7"
      element={<RenewableEnergyModule1Section7 />}
    />
    <Route
      path="renewable-energy-module-1-section-8"
      element={<RenewableEnergyModule1Section8 />}
    />
    <Route path="renewable-energy-module-2" element={<RenewableEnergyModule2 />} />
    <Route
      path="renewable-energy-module-2-section-1"
      element={<RenewableEnergyModule2Section1 />}
    />
    <Route
      path="renewable-energy-module-2-section-2"
      element={<RenewableEnergyModule2Section2 />}
    />
    <Route
      path="renewable-energy-module-2-section-3"
      element={<RenewableEnergyModule2Section3 />}
    />
    <Route
      path="renewable-energy-module-2-section-4"
      element={<RenewableEnergyModule2Section4 />}
    />
    <Route
      path="renewable-energy-module-2-section-5"
      element={<RenewableEnergyModule2Section5 />}
    />
    <Route
      path="renewable-energy-module-2-section-6"
      element={<RenewableEnergyModule2Section6 />}
    />
    <Route
      path="renewable-energy-module-2-section-7"
      element={<RenewableEnergyModule2Section7 />}
    />
    <Route
      path="renewable-energy-module-2-section-8"
      element={<RenewableEnergyModule2Section8 />}
    />
    <Route path="renewable-energy-module-3" element={<RenewableEnergyModule3 />} />
    <Route
      path="renewable-energy-module-3-section-1"
      element={<RenewableEnergyModule3Section1 />}
    />
    <Route
      path="renewable-energy-module-3-section-2"
      element={<RenewableEnergyModule3Section2 />}
    />
    <Route
      path="renewable-energy-module-3-section-3"
      element={<RenewableEnergyModule3Section3 />}
    />
    <Route
      path="renewable-energy-module-3-section-4"
      element={<RenewableEnergyModule3Section4 />}
    />
    <Route
      path="renewable-energy-module-3-section-5"
      element={<RenewableEnergyModule3Section5 />}
    />
    <Route
      path="renewable-energy-module-3-section-6"
      element={<RenewableEnergyModule3Section6 />}
    />
    <Route
      path="renewable-energy-module-3-section-7"
      element={<RenewableEnergyModule3Section7 />}
    />
    <Route
      path="renewable-energy-module-3-section-8"
      element={<RenewableEnergyModule3Section8 />}
    />
    <Route path="renewable-energy-module-4" element={<RenewableEnergyModule4 />} />
    <Route
      path="renewable-energy-module-4-section-1"
      element={<RenewableEnergyModule4Section1 />}
    />
    <Route
      path="renewable-energy-module-4-section-2"
      element={<RenewableEnergyModule4Section2 />}
    />
    <Route
      path="renewable-energy-module-4-section-3"
      element={<RenewableEnergyModule4Section3 />}
    />
    <Route
      path="renewable-energy-module-4-section-4"
      element={<RenewableEnergyModule4Section4 />}
    />
    <Route
      path="renewable-energy-module-4-section-5"
      element={<RenewableEnergyModule4Section5 />}
    />
    <Route
      path="renewable-energy-module-4-section-6"
      element={<RenewableEnergyModule4Section6 />}
    />
    <Route
      path="renewable-energy-module-4-section-7"
      element={<RenewableEnergyModule4Section7 />}
    />
    <Route
      path="renewable-energy-module-4-section-8"
      element={<RenewableEnergyModule4Section8 />}
    />
    <Route path="renewable-energy-module-5" element={<RenewableEnergyModule5 />} />
    <Route
      path="renewable-energy-module-5-section-1"
      element={<RenewableEnergyModule5Section1 />}
    />
    <Route
      path="renewable-energy-module-5-section-2"
      element={<RenewableEnergyModule5Section2 />}
    />
    <Route
      path="renewable-energy-module-5-section-3"
      element={<RenewableEnergyModule5Section3 />}
    />
    <Route
      path="renewable-energy-module-5-section-4"
      element={<RenewableEnergyModule5Section4 />}
    />
    <Route
      path="renewable-energy-module-5-section-5"
      element={<RenewableEnergyModule5Section5 />}
    />
    <Route
      path="renewable-energy-module-5-section-6"
      element={<RenewableEnergyModule5Section6 />}
    />
    <Route path="renewable-energy-module-6" element={<RenewableEnergyModule6 />} />
    <Route
      path="renewable-energy-module-6-section-1"
      element={<RenewableEnergyModule6Section1 />}
    />
    <Route
      path="renewable-energy-module-6-section-2"
      element={<RenewableEnergyModule6Section2 />}
    />
    <Route
      path="renewable-energy-module-6-section-3"
      element={<RenewableEnergyModule6Section3 />}
    />
    <Route
      path="renewable-energy-module-6-section-4"
      element={<RenewableEnergyModule6Section4 />}
    />
    <Route
      path="renewable-energy-module-6-section-5"
      element={<RenewableEnergyModule6Section5 />}
    />
    <Route path="renewable-energy-module-7" element={<RenewableEnergyModule7 />} />
    <Route
      path="renewable-energy-module-7-section-1"
      element={<RenewableEnergyModule7Section1 />}
    />
    <Route
      path="renewable-energy-module-7-section-2"
      element={<RenewableEnergyModule7Section2 />}
    />
    <Route
      path="renewable-energy-module-7-section-3"
      element={<RenewableEnergyModule7Section3 />}
    />
    <Route
      path="renewable-energy-module-7-section-4"
      element={<RenewableEnergyModule7Section4 />}
    />
    <Route
      path="renewable-energy-module-7-section-5"
      element={<RenewableEnergyModule7Section5 />}
    />
    <Route
      path="renewable-energy-module-7-section-6"
      element={<RenewableEnergyModule7Section6 />}
    />
    <Route path="renewable-energy-module-8" element={<RenewableEnergyModule8 />} />
    <Route
      path="renewable-energy-module-8-section-1"
      element={<RenewableEnergyModule8Section1 />}
    />
    <Route
      path="renewable-energy-module-8-section-2"
      element={<RenewableEnergyModule8Section2 />}
    />
    <Route
      path="renewable-energy-module-8-section-3"
      element={<RenewableEnergyModule8Section3 />}
    />
    <Route
      path="renewable-energy-module-8-section-4"
      element={<RenewableEnergyModule8Section4 />}
    />
    <Route
      path="renewable-energy-module-8-section-5"
      element={<RenewableEnergyModule8Section5 />}
    />
    <Route path="renewable-energy-module-9" element={<RenewableEnergyModule9 />} />
    <Route
      path="renewable-energy-module-9-section-1"
      element={<RenewableEnergyModule9Section1 />}
    />
    <Route
      path="renewable-energy-module-9-section-2"
      element={<RenewableEnergyModule9Section2 />}
    />
    <Route
      path="renewable-energy-module-9-section-3"
      element={<RenewableEnergyModule9Section3 />}
    />
    <Route
      path="renewable-energy-module-9-section-4"
      element={<RenewableEnergyModule9Section4 />}
    />
    <Route
      path="renewable-energy-module-9-section-5"
      element={<RenewableEnergyModule9Section5 />}
    />
    <Route
      path="renewable-energy-module-9-section-6"
      element={<RenewableEnergyModule9Section6 />}
    />
    <Route path="renewable-energy-module-10" element={<RenewableEnergyModule10 />} />
    <Route path="renewable-energy-mock-exam" element={<RenewableEnergyMockExam />} />
  </>
);
