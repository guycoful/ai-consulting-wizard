
import { Helmet } from "react-helmet-async";
import OrganizationProfilingForm from "@/components/OrganizationProfilingForm";
import { useEffect } from "react";

const ProfilingForm = () => {
  useEffect(() => {
    // גלול לראש הדף כאשר נכנסים לשאלון
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>טופס איפיון AI לעסק | גיא כהן</title>
        <meta name="description" content="טופס איפיון מפורט שיעזור לנו להבין בדיוק מה העסק שלך צריך ולהתאים פתרון AI מושלם" />
        <link rel="canonical" href="https://guycohen-ai.co.il/profiling-form" />

        {/* Open Graph meta tags */}
        <meta property="og:title" content="טופס איפיון AI לעסק | גיא כהן" />
        <meta property="og:description" content="טופס איפיון מפורט שיעזור לנו להבין בדיוק מה העסק שלך צריך ולהתאים פתרון AI מושלם" />
        <meta property="og:url" content="https://guycohen-ai.co.il/profiling-form" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://guycohen-ai.co.il/og-image.png" />
        <meta property="og:locale" content="he_IL" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="טופס איפיון AI לעסק | גיא כהן" />
        <meta name="twitter:description" content="טופס איפיון מפורט שיעזור לנו להבין בדיוק מה העסק שלך צריך ולהתאים פתרון AI מושלם" />
        <meta name="twitter:image" content="https://guycohen-ai.co.il/og-image.png" />
      </Helmet>
      <OrganizationProfilingForm />
    </>
  );
};

export default ProfilingForm;
