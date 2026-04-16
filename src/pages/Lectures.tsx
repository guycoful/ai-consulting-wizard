import { useEffect } from "react";

const CONTENTPOINT_URL =
  "https://contentpoint.co.il/%d7%92%d7%99%d7%90-%d7%9b%d7%94%d7%9f-%d7%94%d7%a8%d7%a6%d7%90%d7%95%d7%aa-%d7%95%d7%a1%d7%93%d7%a0%d7%90%d7%95%d7%aa-ai-%d7%95%d7%90%d7%95%d7%98%d7%95%d7%9e%d7%a6%d7%99%d7%94-%d7%9c%d7%99%d7%99/";

const Lectures = () => {
  useEffect(() => {
    window.location.replace(CONTENTPOINT_URL);
  }, []);

  return null;
};

export default Lectures;
