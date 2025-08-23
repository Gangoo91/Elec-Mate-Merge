
import { Link, LinkProps } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface SafeLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  children: ReactNode;
  fallback?: ReactNode;
}

const SafeLink = ({ to, children, fallback, ...props }: SafeLinkProps) => {
  try {
    // Test if we can access the router context
    useLocation();
    return (
      <Link to={to} {...props}>
        {children}
      </Link>
    );
  } catch (error) {
    console.warn('SafeLink: Router context not available, rendering fallback', error);
    // If router context is not available, render fallback or just the children
    return fallback ? <>{fallback}</> : <>{children}</>;
  }
};

export default SafeLink;
