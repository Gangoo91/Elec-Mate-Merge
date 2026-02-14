import { Clock, Calendar, User } from 'lucide-react';

interface SEOReadingMetaProps {
  readingTime: number;
  dateUpdated: string;
  author?: string;
}

export function SEOReadingMeta({
  readingTime,
  dateUpdated,
  author = 'Elec-Mate Technical Team',
}: SEOReadingMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-white">
      <span className="inline-flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5 text-yellow-400" />
        {readingTime} min read
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Calendar className="w-3.5 h-3.5 text-yellow-400" />
        Updated {dateUpdated}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <User className="w-3.5 h-3.5 text-yellow-400" />
        {author}
      </span>
    </div>
  );
}
