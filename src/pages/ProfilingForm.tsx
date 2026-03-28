
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
      </Helmet>
      <OrganizationProfilingForm />
    </>
  );
};

export default ProfilingForm;
