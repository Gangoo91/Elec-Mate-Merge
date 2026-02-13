import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, useMotionValue, animate } from "framer-motion";
import { useHaptic } from "@/hooks/useHaptic";

// ──────────────────────────────────────────────
// SwipeableListItem — swipe-to-reveal actions
// Swipe left  → reveals right-side actions (delete, archive)
// Swipe right → reveals left-side actions (edit)
// ──────────────────────────────────────────────

interface SwipeAction {
  icon: React.ElementType;
  label: string;
  color: string; // e.g. "bg-red-500" or "bg-blue-500"
  textColor?: string; // e.g. "text-white"
  onAction: () => void;
}

interface SwipeableListItemProps {
  children: ReactNode;
  leftActions?: SwipeAction[]; // revealed on swipe right (edit)
  rightActions?: SwipeAction[]; // revealed on swipe left (delete)
  className?: string;
  disabled?: boolean;
}

/** Width of each individual action button in pixels */
const ACTION_WIDTH = 72;

/** Minimum drag distance before we commit to revealing actions */
const SWIPE_THRESHOLD = 60;

/**
 * A shared swipe-to-reveal list item wrapper.
 *
 * Wraps any child content and exposes configurable left and right action
 * trays that slide into view on horizontal swipe gestures.
 * Uses framer-motion spring animations for a native-feeling bounce-back
 * and react-swipeable for cross-browser touch handling.
 *
 * Close behaviour:
 *  - Tapping an action button triggers its callback then auto-closes
 *  - Tapping elsewhere on the row (while open) closes without firing onClick
 *  - Starting a new swipe in the opposite direction closes first
 */
export function SwipeableListItem({
  children,
  leftActions = [],
  rightActions = [],
  className = "",
  disabled = false,
}: SwipeableListItemProps) {
  const haptic = useHaptic();

  // framer-motion value drives the translateX of the content row
  const x = useMotionValue(0);

  // Track open state: "closed" | "left" | "right"
  const [openSide, setOpenSide] = useState<"closed" | "left" | "right">("closed");

  // Whether a swipe gesture is currently in progress — used to suppress
  // accidental onClick events on children while the user is dragging
  const isSwiping = useRef(false);

  // Ref to the wrapper so we can detect outside taps
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Haptic trigger guard — fire once per gesture
  const hapticFired = useRef(false);

  // Computed max offsets for each side
  const rightMax = rightActions.length * ACTION_WIDTH; // negative x
  const leftMax = leftActions.length * ACTION_WIDTH; // positive x

  // ── Spring-animate to a target offset ──────────────────────
  const springTo = useCallback(
    (target: number) => {
      animate(x, target, {
        type: "spring",
        stiffness: 350,
        damping: 30,
        mass: 0.8,
      });
    },
    [x],
  );

  // ── Close helper ──────────────────────────────────────────
  const close = useCallback(() => {
    springTo(0);
    setOpenSide("closed");
  }, [springTo]);

  // ── Close when user taps outside this component ───────────
  useEffect(() => {
    if (openSide === "closed") return;

    function handlePointerDown(e: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", handlePointerDown, true);
  }, [openSide, close]);

  // ── react-swipeable handlers ──────────────────────────────
  const handlers = useSwipeable({
    onSwiping: (e) => {
      if (disabled) return;
      isSwiping.current = true;

      const delta = e.deltaX;

      if (delta < 0) {
        // Swiping left → reveal right actions
        if (rightActions.length === 0) return;

        // If the left tray is currently open, close it first
        if (openSide === "left") {
          close();
          return;
        }

        // Rubber-band beyond max
        const absDelta = Math.abs(delta);
        const clamped =
          absDelta <= rightMax
            ? -absDelta
            : -(rightMax + (absDelta - rightMax) * 0.2);
        x.set(clamped);

        // Haptic at threshold
        if (absDelta >= SWIPE_THRESHOLD && !hapticFired.current) {
          haptic.light();
          hapticFired.current = true;
        }
      } else if (delta > 0) {
        // Swiping right → reveal left actions
        if (leftActions.length === 0) {
          // If right tray is open, allow closing gesture
          if (openSide === "right") {
            const current = x.get();
            const next = Math.min(0, current + delta * 0.8);
            x.set(next);
          }
          return;
        }

        // If the right tray is currently open, close it first
        if (openSide === "right") {
          close();
          return;
        }

        const absDelta = Math.abs(delta);
        const clamped =
          absDelta <= leftMax
            ? absDelta
            : leftMax + (absDelta - leftMax) * 0.2;
        x.set(clamped);

        // Haptic at threshold
        if (absDelta >= SWIPE_THRESHOLD && !hapticFired.current) {
          haptic.light();
          hapticFired.current = true;
        }
      }
    },

    onSwipedLeft: () => {
      if (disabled) return;
      hapticFired.current = false;

      if (rightActions.length === 0) {
        isSwiping.current = false;
        return;
      }

      const current = Math.abs(x.get());
      if (current >= SWIPE_THRESHOLD) {
        springTo(-rightMax);
        setOpenSide("right");
      } else {
        close();
      }

      // Reset swiping flag after a tick so onClick does not fire
      requestAnimationFrame(() => {
        isSwiping.current = false;
      });
    },

    onSwipedRight: () => {
      if (disabled) return;
      hapticFired.current = false;

      // If right tray is open and there are no left actions, just close
      if (openSide === "right" && leftActions.length === 0) {
        close();
        requestAnimationFrame(() => {
          isSwiping.current = false;
        });
        return;
      }

      if (leftActions.length === 0) {
        isSwiping.current = false;
        return;
      }

      const current = x.get();
      if (current >= SWIPE_THRESHOLD) {
        springTo(leftMax);
        setOpenSide("left");
      } else {
        close();
      }

      requestAnimationFrame(() => {
        isSwiping.current = false;
      });
    },

    onTap: () => {
      // Close the tray if it's open — the tap consumes the event
      if (openSide !== "closed") {
        close();
      }
    },

    trackMouse: false,
    trackTouch: true,
    delta: 15,
    preventScrollOnSwipe: true,
  });

  // ── Merge swipeable ref with our container ref ────────────
  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      // react-swipeable attaches via a ref callback
      (handlers as any).ref(node);
    },
    [handlers],
  );

  // ── Action button handler (auto-close after tap) ──────────
  const handleAction = useCallback(
    (action: SwipeAction) => {
      haptic.medium();
      action.onAction();
      close();
    },
    [haptic, close],
  );

  // ── Render ────────────────────────────────────────────────
  return (
    <div
      ref={mergedRef}
      className={`relative overflow-hidden touch-manipulation ${className}`}
      style={{ touchAction: "pan-y" }}
    >
      {/* Left action tray — revealed on swipe right */}
      {leftActions.length > 0 && (
        <div
          className="absolute inset-y-0 left-0 flex items-stretch"
          style={{ width: leftMax }}
        >
          {leftActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <button
                key={i}
                className={`flex flex-col items-center justify-center gap-1 touch-manipulation h-full ${action.color} ${action.textColor ?? "text-white"}`}
                style={{ width: ACTION_WIDTH, minHeight: 44 }}
                onClick={() => handleAction(action)}
                aria-label={action.label}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium text-white">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Right action tray — revealed on swipe left */}
      {rightActions.length > 0 && (
        <div
          className="absolute inset-y-0 right-0 flex items-stretch"
          style={{ width: rightMax }}
        >
          {rightActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <button
                key={i}
                className={`flex flex-col items-center justify-center gap-1 touch-manipulation h-full ${action.color} ${action.textColor ?? "text-white"}`}
                style={{ width: ACTION_WIDTH, minHeight: 44 }}
                onClick={() => handleAction(action)}
                aria-label={action.label}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium text-white">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main content — slides horizontally */}
      <motion.div className="relative bg-background" style={{ x }}>
        {children}
      </motion.div>
    </div>
  );
}

export default SwipeableListItem;
