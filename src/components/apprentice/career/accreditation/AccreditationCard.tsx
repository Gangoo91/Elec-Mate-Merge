import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { AccreditationOption } from './enhancedAccreditationData';
import { isValidUrl } from '@/utils/urlUtils';
import { openExternalUrl } from '@/utils/open-external-url';

interface AccreditationCardProps {
  accreditation: AccreditationOption;
  onViewDetails: (accreditation: AccreditationOption) => void;
}

const AccreditationCard = ({ accreditation, onViewDetails }: AccreditationCardProps) => {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 h-full flex flex-col gap-4">
      <div className="space-y-2">
        <div className="flex items-baseline gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          <span>{accreditation.level}</span>
          {accreditation.onlineAvailable && (
            <>
              <span className="text-white/25">·</span>
              <span>Online</span>
            </>
          )}
        </div>
        <h3 className="text-[18px] font-semibold text-white leading-tight">
          {accreditation.title}
        </h3>
        <p className="text-[14px] text-white/70">{accreditation.provider}</p>
      </div>

      <p className="text-[14px] text-white/85 leading-relaxed">{accreditation.description}</p>

      <div className="grid grid-cols-2 gap-2 text-[12px]">
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
          <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">Duration</div>
          <div className="text-white/85 truncate">{accreditation.duration}</div>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
          <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">Cost</div>
          <div className="text-white/85 truncate">{accreditation.cost}</div>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
          <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">Locations</div>
          <div className="text-white/85 truncate">
            {accreditation.locations.slice(0, 2).join(', ')}
            {accreditation.locations.length > 2 && '...'}
          </div>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
          <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">Popularity</div>
          <div className="text-white/85">{accreditation.popularity}%</div>
        </div>
      </div>

      <div className="space-y-2 flex-1 min-h-0">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Key benefits
        </span>
        <ul className="space-y-1.5">
          {accreditation.benefits.slice(0, 3).map((benefit, idx) => (
            <li
              key={idx}
              className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        {accreditation.benefits.length > 3 && (
          <p className="text-[12px] text-white/55">
            +{accreditation.benefits.length - 3} more
          </p>
        )}
      </div>

      <div className="flex gap-2 pt-3 mt-auto border-t border-white/[0.06]">
        <Button
          onClick={() => onViewDetails(accreditation)}
          className="flex-1 h-10 bg-elec-yellow text-black hover:bg-elec-yellow/90 text-[13px] font-medium touch-manipulation"
        >
          View details
        </Button>
        {isValidUrl(accreditation.website) && (
          <Button
            variant="outline"
            size="sm"
            className="h-10 border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06] px-3 touch-manipulation"
            onClick={() => openExternalUrl(accreditation.website)}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default AccreditationCard;
