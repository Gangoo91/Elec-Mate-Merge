import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Catch-all for dead links inside the apprentice / Study Centre route trees.
 * Mounted as <Route path="*"> in ApprenticeRoutes, StudyCentreRoutes,
 * ApprenticeCourseRoutes and Level2Routes — without it a dead link renders a
 * blank page with only the tab bar (the app-level 404 can't be reached from
 * inside a nested <Routes>).
 */
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404: dead link inside study/apprentice routes:', location.pathname);
  }, [location.pathname]);

  const inStudyCentre = location.pathname.startsWith('/study-centre');

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <p className="text-[13px] font-semibold uppercase tracking-wide text-elec-yellow">404</p>
        <h1 className="mt-2 text-xl font-semibold tracking-tight text-white">
          Page not found
        </h1>
        <p className="mt-2 text-[15px] text-white">
          This page has moved or no longer exists.
        </p>
        <div className="mt-6 space-y-3">
          <Link
            to={inStudyCentre ? '/study-centre' : '/apprentice'}
            className="flex h-11 w-full items-center justify-center rounded-xl bg-elec-yellow font-semibold text-black touch-manipulation"
          >
            {inStudyCentre ? 'Back to Study Centre' : 'Back to Apprentice Hub'}
          </Link>
          <Link
            to={inStudyCentre ? '/apprentice' : '/study-centre'}
            className="flex h-11 w-full items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.06] font-medium text-white touch-manipulation"
          >
            {inStudyCentre ? 'Apprentice Hub' : 'Study Centre'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
