import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-dark">
      <Helmet>
        <title>הדף לא נמצא | גיא כהן</title>
        <meta name="description" content="הדף שחיפשת לא נמצא באתר ייעוץ AI לעסקים - גיא כהן" />
      </Helmet>
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-gray-300 font-heebo mb-6">הדף לא נמצא</p>
        <a href="/" className="text-purple-400 hover:text-purple-300 font-heebo text-lg underline transition-colors">
          חזרה לדף הבית
        </a>
      </div>
    </div>
  );
};

export default NotFound;
