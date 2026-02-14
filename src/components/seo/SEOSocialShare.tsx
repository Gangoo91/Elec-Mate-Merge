import { useState } from 'react';
import { Link2, Check, Mail } from 'lucide-react';

interface SEOSocialShareProps {
  url: string;
  title: string;
}

export function SEOSocialShare({ url, title }: SEOSocialShareProps) {
  const [copied, setCopied] = useState(false);
  const fullUrl = `https://elec-mate.com${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
    }
  };

  const shares = [
    {
      label: 'X',
      href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      letter: 'X',
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      letter: 'in',
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      letter: 'W',
    },
    {
      label: 'Email',
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      letter: 'E',
      icon: Mail,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-white uppercase tracking-wider mr-1">Share</span>
      <button
        onClick={copyLink}
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:border-yellow-500/30 hover:bg-yellow-500/10 text-white hover:text-yellow-400 transition-all touch-manipulation"
        aria-label="Copy link"
      >
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      </button>
      {shares.map((share) => (
        <a
          key={share.label}
          href={share.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:border-yellow-500/30 hover:bg-yellow-500/10 text-white hover:text-yellow-400 transition-all touch-manipulation"
          aria-label={`Share on ${share.label}`}
        >
          {share.icon ? (
            <share.icon className="w-4 h-4" />
          ) : (
            <span className="text-xs font-bold">{share.letter}</span>
          )}
        </a>
      ))}
    </div>
  );
}
