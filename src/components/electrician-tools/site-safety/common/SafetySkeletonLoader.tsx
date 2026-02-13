import { motion } from "framer-motion";

type SkeletonVariant = "card" | "list" | "form" | "chart" | "dashboard";

interface SafetySkeletonLoaderProps {
  variant?: SkeletonVariant;
  count?: number;
}

const shimmer =
  "animate-pulse bg-white/[0.06] rounded-lg";

function SkeletonBlock({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return <div className={`${shimmer} ${className ?? ""}`} style={style} />;
}

function CardSkeleton({ count }: { count: number }) {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-white/[0.06] p-4 space-y-3"
        >
          <div className="flex items-center gap-3">
            <SkeletonBlock className="h-10 w-10 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <SkeletonBlock className="h-4 w-3/4" />
              <SkeletonBlock className="h-3 w-1/2" />
            </div>
          </div>
          <SkeletonBlock className="h-3 w-full" />
          <SkeletonBlock className="h-3 w-5/6" />
        </div>
      ))}
    </div>
  );
}

function ListSkeleton({ count }: { count: number }) {
  return (
    <div className="space-y-2 p-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.06]"
        >
          <SkeletonBlock className="h-9 w-9 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <SkeletonBlock className="h-4 w-2/3" />
            <SkeletonBlock className="h-3 w-1/3" />
          </div>
          <SkeletonBlock className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}

function FormSkeleton({ count }: { count: number }) {
  return (
    <div className="space-y-5 p-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-2">
          <SkeletonBlock className="h-4 w-28" />
          <SkeletonBlock className="h-11 w-full rounded-xl" />
        </div>
      ))}
      <SkeletonBlock className="h-11 w-full rounded-xl mt-4" />
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-2">
        <SkeletonBlock className="h-4 w-4 rounded" />
        <SkeletonBlock className="h-4 w-32" />
      </div>
      <div className="flex gap-1 items-end h-32 pt-4">
        {[65, 40, 80, 55, 90, 45, 70].map((h, i) => (
          <SkeletonBlock
            key={i}
            className="flex-1 rounded-t-md"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between">
        {Array.from({ length: 7 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-3 w-6" />
        ))}
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {/* Score ring placeholder */}
      <div className="flex items-center justify-center py-4">
        <SkeletonBlock className="h-24 w-24 rounded-full" />
      </div>
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/[0.06] p-3 space-y-2"
          >
            <SkeletonBlock className="h-3 w-16" />
            <SkeletonBlock className="h-7 w-12" />
          </div>
        ))}
      </div>
      {/* Recent items */}
      <SkeletonBlock className="h-4 w-24" />
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.06]"
          >
            <SkeletonBlock className="h-8 w-8 rounded-lg shrink-0" />
            <div className="flex-1 space-y-1.5">
              <SkeletonBlock className="h-3.5 w-2/3" />
              <SkeletonBlock className="h-3 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SafetySkeletonLoader({
  variant = "card",
  count = 3,
}: SafetySkeletonLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      {variant === "card" && <CardSkeleton count={count} />}
      {variant === "list" && <ListSkeleton count={count} />}
      {variant === "form" && <FormSkeleton count={count} />}
      {variant === "chart" && <ChartSkeleton />}
      {variant === "dashboard" && <DashboardSkeleton />}
    </motion.div>
  );
}

export default SafetySkeletonLoader;
