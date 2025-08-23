
import { Link, LinkProps, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface SafeLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  children: ReactNode;
  fallback?: ReactNode;
}

const SafeLink = ({ to, children, fallback, ...props }: SafeLinkProps) => {
  try {
    // Test if we can access the router context
    const location = useLocation();
    
    // Additional check to ensure we have a valid router context
    if (!location) {
      console.warn('SafeLink: Router location is null, rendering fallback');
      return fallback ? <>{fallback}</> : <span className="cursor-pointer">{children}</span>;
    }
    
    return (
      <Link to={to} {...props}>
        {children}
      </Link>
    );
  } catch (error) {
    console.warn('SafeLink: Router context not available, rendering fallback', error);
    // If router context is not available, render fallback or just the children in a span
    return fallback ? <>{fallback}</> : <span className="cursor-pointer text-elec-yellow hover:text-elec-yellow/80">{children}</span>;
  }
};

export default SafeLink;
