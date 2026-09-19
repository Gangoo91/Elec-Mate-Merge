import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from '@/components/layout/Header';
import { useState, useEffect, useRef } from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import AnnouncementBanner from '@/components/announcements/AnnouncementBanner';
import MaintenanceBanner from '@/components/layout/MaintenanceBanner';
import PushNotificationPrompt from '@/components/notifications/PushNotificationPrompt';
import { AchievementListener } from '@/components/study-centre/AchievementListener';

const Layout = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Desktop-only: persisted collapsed state, lets users reclaim the 256px for content
  const [desktopCollapsed, setDesktopCollapsed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('sidebar-collapsed') === '1';
  });
  const location = useLocation();
  const bannerStackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('sidebar-collapsed', desktopCollapsed ? '1' : '0');
  }, [desktopCollapsed]);

  /*
   * ELE-1752 — publish the banner stack's height as `--banner-height`.
   *
   * See the comment on the stack itself for why. In short: anything sized to
   * the viewport has to know how much of it these banners already took, or it
   * runs off the bottom of the screen.
   *
   * ResizeObserver rather than a resize listener, because the height changes
   * without the window changing: an announcement arrives after its fetch
   * resolves, the user dismisses it, the message reflows to two lines on a
   * narrow phone. A window listener sees none of those and would leave the var
   * stale at exactly the moments it matters.
   */
  useEffect(() => {
    const el = bannerStackRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    const publish = () => {
      document.documentElement.style.setProperty('--banner-height', `${el.offsetHeight}px`);
    };
    publish();

    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => {
      ro.disconnect();
      // Left set, the last page's banner height would keep shrinking the shell
      // after Layout unmounts.
      document.documentElement.style.removeProperty('--banner-height');
    };
  }, []);

  // Expose the live sidebar width as a CSS var on <html> so fixed/portaled
  // elements (bottom sheets, wizard footers) can align to the content column
  // without each one re-reading localStorage. lg-only consumers gate on the
  // breakpoint; below lg the sidebar overlays, so the var is 0.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.style.setProperty(
      '--sidebar-width',
      !isMobile && !desktopCollapsed ? '16rem' : '0px'
    );
  }, [isMobile, desktopCollapsed]);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setDesktopCollapsed((c) => !c);
    }
  };

  // Close mobile sidebar when switching from mobile to desktop
  useEffect(() => {
    if (!isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [isMobile, sidebarOpen]);

  // `overflow-x-clip`, not `overflow-x-hidden`.
  // `hidden` on one axis forces the other to `auto`, which makes this div a
  // scroll container — and a sticky child anchors to its nearest scrolling
  // ancestor. So the sidebar's `lg:sticky top-0` was anchored to a box that
  // never scrolls (the document scrolls instead), and it slid away with the
  // page. `clip` stops horizontal overflow without establishing a scroll
  // container, so sticky resolves against the viewport as intended.
  return (
    <div className="flex min-h-screen overflow-x-clip bg-elec-dark text-slate-50">
      {/* Global achievement checker — listens for activity events */}
      <AchievementListener />

      {/* Sidebar navigation - mobile-ready with glass morphism */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        desktopCollapsed={desktopCollapsed}
        onToggleDesktopCollapsed={() => setDesktopCollapsed((c) => !c)}
      />

      <div className="flex flex-col flex-1 relative min-w-0">
        {/* Header with glass morphism */}
        <Header toggleSidebar={toggleSidebar} sidebarCollapsed={desktopCollapsed} />

        {/* Main content area with proper spacing for fixed header */}
        {/*
          `overflow-x-clip`, not `overflow-x-hidden` — the same trap as the
          wrapper above, which `main` was missed by.

          `hidden` on one axis forces the other to `auto`, making this a scroll
          container that never actually scrolls (the document does). Every
          `sticky` child anchors to it and therefore never sticks: the admin
          panel's header and tab row slid away with the page and disappeared
          behind the fixed app header instead of parking under it.
        */}
        <main
          className="flex-1 overflow-x-clip"
          style={{ paddingTop: 'var(--header-height, 56px)' }}
        >
          {/* iOS Native: Zero gap on mobile, content sits DIRECTLY below header */}
          <div className="px-3 sm:px-4 md:px-6 lg:px-8 pt-1 sm:pt-3 md:pt-6 pb-4">
            {/*
              🔴 ELE-1752 — this stack's height is PUBLISHED, and something
              depends on it.

              These banners sit above <Outlet />, so every page is pushed down
              by however tall they are. That is harmless for a page that
              scrolls. It is not harmless for a page sized to the viewport:
              `.h-app-shell` is `100dvh - --header-height`, so a banner above
              it pushes an equal number of pixels off the BOTTOM — and on the
              Elec-AI assistant the bottom is the message composer.

              The shell is a fixed-height flex column whose transcript scrolls
              internally, so the page itself cannot be scrolled to reach it.
              The composer simply is not there, and no amount of swiping brings
              it back: "the app becomes unusable, requires a restart". Ben
              Parkin reported it as an image-upload fault because the + button
              goes with the composer, but the trigger was an announcement being
              live — "Elec-Mate X Makita" has been showing to every role since
              10 Sep with no end date.

              So the stack measures itself into `--banner-height` and
              `.h-app-shell` subtracts it. Mirrors how Header publishes
              `--header-height`, and reads 0px when there is nothing to show.
            */}
            <div ref={bannerStackRef}>
              {/* Maintenance banner — feature flag, toggled from Admin → System */}
              <MaintenanceBanner />

              {/* Announcements Banner */}
              <AnnouncementBanner />
            </div>

            {/* The push prompt used to sit HERE, above <Outlet />, which put it
                above every page's own sticky masthead — so the first thing on
                the page was a dismissible permission request rather than the
                page itself. It now renders inside HubBody, below the masthead.
                See `HubPrimitives`. */}

            <div className={cn('min-w-0')}>
              <PageTransition key={location.pathname}>
                <Outlet />
              </PageTransition>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
