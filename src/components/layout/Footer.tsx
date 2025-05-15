
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-elec-yellow/20 bg-elec-gray p-4 text-xs text-elec-light/70">
      <div className="container max-w-7xl mx-auto flex flex-col gap-4">
        <div className="text-center px-4">
          <p className="mb-2 text-elec-light/90">
            <strong>Disclaimer:</strong> ElecMate is not endorsed by, directly affiliated with, maintained, 
            authorized, or sponsored by EAL or City &amp; Guilds. All product names, logos, and brands are 
            property of their respective owners.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-elec-yellow transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-elec-yellow transition-colors">
              Terms
            </Link>
            <Link to="/contact" className="hover:text-elec-yellow transition-colors">
              Contact
            </Link>
          </div>
          <div>
            &copy; {new Date().getFullYear()} ElecMate. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
