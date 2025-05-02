
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-elec-yellow/20 bg-elec-gray p-4 text-xs text-elec-light/70">
      <div className="container max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
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
    </footer>
  );
};

export default Footer;
