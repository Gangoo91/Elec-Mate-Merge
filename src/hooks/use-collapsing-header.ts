import { useRef, useState, useEffect, RefObject } from 'react';
import { useMotionValue, useTransform, MotionValue } from 'framer-motion';

interface UseCollapsingHeaderOptions {
  maxHeight: number;
  minHeight: number;
  scrollThreshold?: number;
}

interface UseCollapsingHeaderReturn {
  headerRef: RefObject<HTMLDivElement>;
  contentRef: RefObject<HTMLDivElement>;
  scrollProgress: MotionValue<number>;
  headerHeight: MotionValue<number>;
  titleScale: MotionValue<number>;
  titleOpacity: MotionValue<number>;
  subtitleOpacity: MotionValue<number>;
  isCollapsed: boolean;
}

export const useCollapsingHeader = ({
  maxHeight,
  minHeight,
  scrollThreshold = 100,
}: UseCollapsingHeaderOptions): UseCollapsingHeaderReturn => {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Create motion values
  const scrollProgress = useMotionValue(0);
  const headerHeight = useTransform(scrollProgress, [0, 1], [maxHeight, minHeight]);
  const titleScale = useTransform(scrollProgress, [0, 1], [1, 0.75]);
  const titleOpacity = useTransform(scrollProgress, [0, 0.5, 1], [1, 1, 1]);
  const subtitleOpacity = useTransform(scrollProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const handleScroll = () => {
      const scrollY = content.scrollTop;
      const progress = Math.min(scrollY / scrollThreshold, 1);

      scrollProgress.set(progress);
      setIsCollapsed(progress > 0.5);
    };

    content.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      content.removeEventListener('scroll', handleScroll);
    };
  }, [scrollThreshold, scrollProgress]);

  return {
    headerRef,
    contentRef,
    scrollProgress,
    headerHeight,
    titleScale,
    titleOpacity,
    subtitleOpacity,
    isCollapsed,
  };
};
