import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResourceLinkProps {
  name: string;
  description: string;
  url?: string;
  phone?: string;
  className?: string;
}

const ResourceLink = ({ name, description, url, phone, className }: ResourceLinkProps) => {
  const hasLink = url || phone;
  const href = url
    ? url.startsWith('http')
      ? url
      : `https://${url}`
    : phone
      ? `tel:${phone.replace(/\s/g, '')}`
      : undefined;

  const content = (
    <div
      className={cn(
        'flex items-center justify-between p-4 rounded-xl',
        'bg-white/[0.03] border border-white/10',
        hasLink && 'hover:border-yellow-400/30 transition-colors group',
        className
      )}
    >
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            'font-semibold text-white',
            hasLink && 'group-hover:text-yellow-400 transition-colors'
          )}
        >
          {name}
        </p>
        <p className="text-sm text-white mt-1">{description}</p>
      </div>
      {phone && (
        <span className="text-base font-bold text-yellow-400 whitespace-nowrap ml-4">{phone}</span>
      )}
      {url && !phone && <ExternalLink className="h-5 w-5 text-yellow-400 flex-shrink-0 ml-4" />}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={url ? '_blank' : undefined}
        rel={url ? 'noopener noreferrer' : undefined}
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
};

export default ResourceLink;
