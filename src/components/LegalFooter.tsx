import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle } from "lucide-react";

const LegalFooter = () => {
  return (
    <footer dir="rtl" className="bg-navy-dark border-t border-purple-700/20">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Column 1: Logo + Description */}
          <div>
            <Link to="/" className="text-xl font-bold text-white font-heebo">
              גיא כהן | <span className="text-purple-400">AI</span>
            </Link>
            <p className="text-gray-400 font-heebo text-sm mt-3 leading-relaxed">
              ייעוץ AI לעסקים קטנים ובינוניים.
              <br />
              פתרונות מותאמים שמגדילים הכנסות, משפרים שירות וחוסכים זמן.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold font-heebo mb-4">ניווט מהיר</h4>
            <nav className="flex flex-col gap-2 text-sm font-heebo">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">דף הבית</Link>
              <Link to="/articles" className="text-gray-400 hover:text-white transition-colors">מאמרים</Link>
              <Link to="/profiling-form" className="text-gray-400 hover:text-white transition-colors">טופס איפיון</Link>
              <Link to="/#contact" className="text-gray-400 hover:text-white transition-colors">צור קשר</Link>
            </nav>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-white font-bold font-heebo mb-4">יצירת קשר</h4>
            <div className="flex flex-col gap-3 text-sm font-heebo">
              <a href="tel:0546232063" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Phone className="h-4 w-4 shrink-0" />
                054-623-2063
              </a>
              <a href="mailto:info@guycohen-ai.co.il" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Mail className="h-4 w-4 shrink-0" />
                info@guycohen-ai.co.il
              </a>
              <a href="https://wa.me/972546232063" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <MessageCircle className="h-4 w-4 shrink-0" />
                שלח הודעת וואטסאפ
              </a>
              <a href="https://www.linkedin.com/in/guycohenai/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Divider + Legal Links + Copyright */}
        <div className="border-t border-gray-700/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <nav className="flex items-center gap-3 text-xs font-heebo text-gray-500">
            <Link to="/accessibility" className="hover:underline hover:text-gray-400 transition-colors">הצהרת נגישות</Link>
            <span aria-hidden="true">·</span>
            <Link to="/privacy-policy" className="hover:underline hover:text-gray-400 transition-colors">מדיניות פרטיות</Link>
            <span aria-hidden="true">·</span>
            <Link to="/terms-of-use" className="hover:underline hover:text-gray-400 transition-colors">תנאי שימוש</Link>
          </nav>
          <p className="text-xs text-gray-600 font-heebo">
            © {new Date().getFullYear()} גיא כהן — ייעוץ AI לעסקים. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LegalFooter;
