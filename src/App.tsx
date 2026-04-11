
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import LegalFooter from "./components/LegalFooter";

const Articles = lazy(() => import("./pages/Articles"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const ProfilingForm = lazy(() => import("./pages/ProfilingForm"));
const AdminFormSubmissions = lazy(() => import("./pages/AdminFormSubmissions"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const AdminBookings = lazy(() => import("./pages/AdminBookings"));
const AdminTestimonials = lazy(() => import("./pages/AdminTestimonials"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));

const queryClient = new QueryClient();

// Handle hash-based scrolling (e.g. navigating to /#contact from another page)
const ScrollToHash = () => {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [hash, pathname]);
  return null;
};

const PageFallback = () => (
  <div className="min-h-screen bg-navy-dark flex items-center justify-center">
    <div className="text-white font-heebo text-lg">...טוען</div>
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToHash />
          <Navbar />
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:slug" element={<ArticlePage />} />
              <Route path="/profiling-form" element={<ProfilingForm />} />
              <Route path="/admin/submissions" element={<AdminFormSubmissions />} />
              <Route path="/book" element={<BookingPage />} />
              <Route path="/admin/bookings" element={<AdminBookings />} />
              <Route path="/admin/testimonials" element={<AdminTestimonials />} />
              <Route path="/accessibility" element={<Accessibility />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-use" element={<TermsOfUse />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <LegalFooter />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
