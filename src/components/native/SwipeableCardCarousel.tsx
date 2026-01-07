import React, { useRef, useState, useEffect, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SwipeableCardCarouselProps<T> {
  items: T[];
  renderCard: (item: T, index: number, isActive: boolean) => ReactNode;
  snapToCard?: boolean;
  showPagination?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onSwipe?: (direction: 'left' | 'right', index: number) => void;
  onCardTap?: (item: T, index: number) => void;
  onActiveIndexChange?: (index: number) => void;
  cardGap?: number;
  peekAmount?: number;
  className?: string;
  cardClassName?: string;
  paginationClassName?: string;
}

export function SwipeableCardCarousel<T>({
  items,
  renderCard,
  snapToCard = true,
  showPagination = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  onSwipe,
  onCardTap,
  onActiveIndexChange,
  cardGap = 12,
  peekAmount = 48,
  className,
  cardClassName,
  paginationClassName,
}: SwipeableCardCarouselProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate card width on mount and resize
  useEffect(() => {
    const calculateCardWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // Card width = container width - peek amount - gap
        const width = containerWidth - peekAmount - cardGap;
        setCardWidth(width);
      }
    };

    calculateCardWidth();
    window.addEventListener('resize', calculateCardWidth);
    return () => window.removeEventListener('resize', calculateCardWidth);
  }, [peekAmount, cardGap]);

  // Handle scroll to determine active index
  const handleScroll = useCallback(() => {
    if (!containerRef.current || cardWidth === 0) return;

    const scrollLeft = containerRef.current.scrollLeft;
    const newIndex = Math.round(scrollLeft / (cardWidth + cardGap));
    const clampedIndex = Math.max(0, Math.min(newIndex, items.length - 1));

    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex);
      onActiveIndexChange?.(clampedIndex);

      // Determine swipe direction
      if (clampedIndex > activeIndex) {
        onSwipe?.('left', clampedIndex);
      } else if (clampedIndex < activeIndex) {
        onSwipe?.('right', clampedIndex);
      }
    }
  }, [activeIndex, cardWidth, cardGap, items.length, onActiveIndexChange, onSwipe]);

  // Scroll to specific index
  const scrollToIndex = useCallback(
    (index: number) => {
      if (!containerRef.current || cardWidth === 0) return;

      const scrollPosition = index * (cardWidth + cardGap);
      containerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    },
    [cardWidth, cardGap]
  );

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    autoPlayRef.current = setInterval(() => {
      const nextIndex = (activeIndex + 1) % items.length;
      scrollToIndex(nextIndex);
    }, autoPlayInterval);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, activeIndex, items.length, scrollToIndex]);

  // Pause auto-play on user interaction
  const pauseAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  // Handle pagination dot click
  const handleDotClick = useCallback(
    (index: number) => {
      pauseAutoPlay();
      scrollToIndex(index);
    },
    [pauseAutoPlay, scrollToIndex]
  );

  // Handle card tap
  const handleCardClick = useCallback(
    (item: T, index: number) => {
      if (index !== activeIndex) {
        // Scroll to card if not active
        pauseAutoPlay();
        scrollToIndex(index);
      } else {
        // Trigger tap callback if active
        onCardTap?.(item, index);
      }
    },
    [activeIndex, onCardTap, pauseAutoPlay, scrollToIndex]
  );

  if (items.length === 0) return null;

  return (
    <div className={cn('relative', className)}>
      {/* Carousel container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onTouchStart={pauseAutoPlay}
        className={cn(
          'carousel-container',
          snapToCard && 'scroll-snap-type-x-mandatory',
          'scrollbar-hide'
        )}
        style={{
          gap: `${cardGap}px`,
          paddingRight: `${peekAmount}px`,
        }}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            className={cn(
              'carousel-item flex-shrink-0',
              snapToCard && 'scroll-snap-align-start',
              cardClassName
            )}
            style={{ width: cardWidth > 0 ? cardWidth : 'calc(100% - 60px)' }}
            onClick={() => handleCardClick(item, index)}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            {renderCard(item, index, index === activeIndex)}
          </motion.div>
        ))}
      </div>

      {/* Pagination dots */}
      {showPagination && items.length > 1 && (
        <div className={cn('carousel-dots', paginationClassName)}>
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={cn(
                'carousel-dot touch-target-sm transition-all duration-200',
                index === activeIndex && 'active'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Simpler version for horizontal stat cards
interface HorizontalScrollCardsProps {
  children: ReactNode;
  showFade?: boolean;
  className?: string;
}

export const HorizontalScrollCards: React.FC<HorizontalScrollCardsProps> = ({
  children,
  showFade = true,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowLeftFade(scrollLeft > 10);
    setShowRightFade(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    handleScroll();
  }, [handleScroll]);

  return (
    <div className={cn('relative', className)}>
      {/* Left fade */}
      <AnimatePresence>
        {showFade && showLeftFade && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Scrollable content */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto scrollbar-hide momentum-scroll-x py-1 px-0.5"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {children}
      </div>

      {/* Right fade */}
      <AnimatePresence>
        {showFade && showRightFade && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SwipeableCardCarousel;
