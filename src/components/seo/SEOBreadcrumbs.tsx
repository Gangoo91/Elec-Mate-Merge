import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface SEOBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function SEOBreadcrumbs({ items }: SEOBreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="px-5 sm:px-6 lg:px-8 pt-6 pb-2"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <div className="max-w-6xl mx-auto">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm">
          <li
            className="flex items-center gap-1.5"
            itemScope
            itemType="https://schema.org/ListItem"
            itemProp="itemListElement"
          >
            <Link
              to="/"
              className="text-white hover:text-yellow-400 transition-colors touch-manipulation flex items-center gap-1"
              itemProp="item"
            >
              <Home className="w-3.5 h-3.5" />
              <span itemProp="name">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li
                key={item.href}
                className="flex items-center gap-1.5"
                itemScope
                itemType="https://schema.org/ListItem"
                itemProp="itemListElement"
              >
                <ChevronRight className="w-3.5 h-3.5 text-white/50" aria-hidden="true" />
                {isLast ? (
                  <span
                    className="text-yellow-400 font-medium"
                    aria-current="page"
                    itemProp="name"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.href}
                    className="text-white hover:text-yellow-400 transition-colors touch-manipulation"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.label}</span>
                  </Link>
                )}
                <meta itemProp="position" content={String(index + 2)} />
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
