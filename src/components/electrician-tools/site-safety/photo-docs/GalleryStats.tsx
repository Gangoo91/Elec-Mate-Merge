import { PHOTO_CATEGORIES, getCategoryColor } from '@/hooks/useSafetyPhotos';

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

interface GalleryStatsProps {
  total: number;
  byCategory: Record<string, number>;
  totalBytes?: number;
}

export default function GalleryStats({ total, byCategory, totalBytes }: GalleryStatsProps) {
  if (total === 0) return null;

  const storageDisplay =
    totalBytes && totalBytes > 0
      ? formatBytes(totalBytes)
      : `~${((total * 500) / 1024).toFixed(1)} MB`;

  return (
    <div className="px-3 py-2.5 bg-white/[0.02] border-b border-white/[0.06]">
      {/* Stats row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-elec-yellow">{total}</span>
          <span className="text-xs text-white">photos</span>
        </div>
        <span className="text-[10px] text-white">{storageDisplay}</span>
      </div>

      {/* Category bar chart */}
      <div className="flex items-center gap-0.5 h-2 rounded-full overflow-hidden bg-white/[0.05]">
        {PHOTO_CATEGORIES.map((cat) => {
          const count = byCategory[cat.value] || 0;
          if (count === 0) return null;
          const percentage = (count / total) * 100;
          return (
            <div
              key={cat.value}
              className={`h-full ${cat.color} transition-all duration-300`}
              style={{ width: `${percentage}%`, minWidth: count > 0 ? '4px' : 0 }}
              title={`${cat.label}: ${count}`}
            />
          );
        })}
      </div>

      {/* Category legend - only show categories that have photos */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
        {PHOTO_CATEGORIES.filter((cat) => (byCategory[cat.value] || 0) > 0).map((cat) => (
          <div key={cat.value} className="flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${cat.color}`} />
            <span className="text-[10px] text-white">
              {cat.label.split(' ')[0]} {byCategory[cat.value]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
