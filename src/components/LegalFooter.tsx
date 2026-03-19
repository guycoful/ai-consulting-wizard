import { Link } from "react-router-dom";

const LegalFooter = () => {
  return (
    <footer
      dir="rtl"
      className="py-4 text-center"
      style={{ backgroundColor: "#071733" }}
    >
      <nav className="flex items-center justify-center gap-1 text-xs font-heebo text-gray-500">
        <Link
          to="/accessibility"
          aria-label="הצהרת נגישות"
          className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-offset-2 transition-colors hover:text-gray-400"
        >
          הצהרת נגישות
        </Link>
        <span aria-hidden="true">·</span>
        <Link
          to="/privacy-policy"
          aria-label="מדיניות פרטיות"
          className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-offset-2 transition-colors hover:text-gray-400"
        >
          מדיניות פרטיות
        </Link>
        <span aria-hidden="true">·</span>
        <Link
          to="/terms-of-use"
          aria-label="תנאי שימוש"
          className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-offset-2 transition-colors hover:text-gray-400"
        >
          תנאי שימוש
        </Link>
      </nav>
    </footer>
  );
};

export default LegalFooter;
