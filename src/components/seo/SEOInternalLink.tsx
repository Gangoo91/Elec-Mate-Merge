import { Link } from 'react-router-dom';

interface SEOInternalLinkProps {
  href: string;
  children: React.ReactNode;
}

export function SEOInternalLink({ href, children }: SEOInternalLinkProps) {
  return (
    <Link
      to={href}
      className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 decoration-yellow-400/40 hover:decoration-yellow-300/60 transition-colors touch-manipulation"
    >
      {children}
    </Link>
  );
}
