
import OrganizationProfilingForm from "@/components/OrganizationProfilingForm";
import { useEffect } from "react";

const ProfilingForm = () => {
  useEffect(() => {
    // גלול לראש הדף כאשר נכנסים לשאלון
    window.scrollTo(0, 0);
  }, []);

  return (
    <OrganizationProfilingForm />
  );
};

export default ProfilingForm;
