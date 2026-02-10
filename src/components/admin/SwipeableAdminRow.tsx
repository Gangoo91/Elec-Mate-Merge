import { useState, useRef, type ReactNode } from "react";
import { useSwipeable } from "react-swipeable";
import { useHaptic } from "@/hooks/useHaptic";

interface SwipeAction {
  icon: ReactNode;
  label: string;
  colour: string;
  onClick: () => void;
}

interface SwipeableAdminRowProps {
  children: ReactNode;
  actions: SwipeAction[];
  className?: string;
  disabled?: boolean;
}

const ACTION_WIDTH = 72;

export default function SwipeableAdminRow({
  children,
  actions,
  className = "",
  disabled = false,
}: SwipeableAdminRowProps) {
  const [offset, setOffset] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const haptic = useHaptic();
  const triggeredHaptic = useRef(false);

  const maxOffset = actions.length * ACTION_WIDTH;

  const handlers = useSwipeable({
    onSwiping: (e) => {
      if (disabled) return;
      if (e.dir === "Left") {
        const distance = Math.min(maxOffset, Math.abs(e.deltaX) * 0.8);
        setOffset(-distance);
        if (distance >= maxOffset * 0.6 && !triggeredHaptic.current) {
          haptic.light();
          triggeredHaptic.current = true;
        }
      } else if (e.dir === "Right" && isOpen) {
        const distance = Math.max(-maxOffset, offset + e.deltaX * 0.8);
        setOffset(Math.min(0, distance));
      }
    },
    onSwipedLeft: () => {
      if (disabled) return;
      triggeredHaptic.current = false;
      if (Math.abs(offset) > maxOffset * 0.4) {
        setOffset(-maxOffset);
        setIsOpen(true);
      } else {
        setOffset(0);
        setIsOpen(false);
      }
    },
    onSwipedRight: () => {
      triggeredHaptic.current = false;
      setOffset(0);
      setIsOpen(false);
    },
    onTap: () => {
      if (isOpen) {
        setOffset(0);
        setIsOpen(false);
      }
    },
    trackMouse: false,
    trackTouch: true,
    delta: 15,
    preventScrollOnSwipe: true,
  });

  return (
    <div className={`relative overflow-hidden ${className}`} {...handlers}>
      {/* Action buttons behind */}
      <div
        className="absolute inset-y-0 right-0 flex items-stretch"
        style={{ width: maxOffset }}
      >
        {actions.map((action, i) => (
          <button
            key={i}
            className={`flex flex-col items-center justify-center gap-1 touch-manipulation ${action.colour}`}
            style={{ width: ACTION_WIDTH }}
            onClick={() => {
              haptic.medium();
              action.onClick();
              setOffset(0);
              setIsOpen(false);
            }}
          >
            {action.icon}
            <span className="text-[10px] font-medium">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Main content */}
      <div
        className="relative bg-background transition-transform duration-200 ease-out"
        style={{
          transform: `translateX(${offset}px)`,
          transition: offset === 0 || offset === -maxOffset ? "transform 0.2s ease-out" : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}
