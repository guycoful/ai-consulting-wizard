
import { ChevronDown } from "lucide-react";

const ScrollDownButton = () => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToNext}
      className="fixed bottom-8 right-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110 z-50 animate-bounce"
      aria-label="גלול למטה"
    >
      <ChevronDown className="w-6 h-6 text-white" />
    </button>
  );
};

export default ScrollDownButton;
