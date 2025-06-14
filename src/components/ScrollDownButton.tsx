
import { ChevronDown } from "lucide-react";

const ScrollDownButton = () => {
  const scrollToNextSection = () => {
    // Define the sections in order
    const sections = ['hero', 'about', 'process', 'target-audience', 'testimonials', 'contact'];
    
    // Get current scroll position
    const currentScrollY = window.scrollY;
    
    // Find which section we're currently in or closest to
    let currentSectionIndex = 0;
    
    for (let i = 0; i < sections.length; i++) {
      const section = document.getElementById(sections[i]);
      if (section) {
        const sectionTop = section.offsetTop;
        if (currentScrollY >= sectionTop - 100) { // 100px buffer
          currentSectionIndex = i;
        }
      }
    }
    
    // Move to next section
    const nextSectionIndex = currentSectionIndex + 1;
    if (nextSectionIndex < sections.length) {
      const nextSection = document.getElementById(sections[nextSectionIndex]);
      nextSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={scrollToNextSection}
      className="fixed bottom-8 right-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110 z-50"
      aria-label="גלול למטה"
    >
      <ChevronDown className="w-6 h-6 text-white" />
    </button>
  );
};

export default ScrollDownButton;
