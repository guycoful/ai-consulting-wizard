
import { ChevronDown } from "lucide-react";

const ScrollDownButton = () => {
  const scrollToNextSection = () => {
    // Define the sections in order
    const sections = ['hero', 'about', 'process', 'target-audience', 'testimonials', 'contact'];
    
    // Get current scroll position
    const currentScrollY = window.scrollY;
    
    // Check if we're at the very top of the hero section
    const heroSection = document.getElementById('hero');
    if (heroSection && currentScrollY < 200) {
      // First click: scroll to the button and image area in hero section
      const targetPosition = heroSection.offsetTop + (heroSection.offsetHeight * 0.6); // Scroll to about 60% down the hero section
      
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 1200;
      let start: number | null = null;
      
      const smoothScroll = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        
        // Easing function for smoother animation
        const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        const easedPercentage = easeInOutCubic(percentage);
        
        window.scrollTo(0, startPosition + distance * easedPercentage);
        
        if (progress < duration) {
          requestAnimationFrame(smoothScroll);
        }
      };
      
      requestAnimationFrame(smoothScroll);
      return;
    }
    
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
    
    // Move to next section with custom smooth scrolling
    const nextSectionIndex = currentSectionIndex + 1;
    if (nextSectionIndex < sections.length) {
      const nextSection = document.getElementById(sections[nextSectionIndex]);
      if (nextSection) {
        const targetPosition = nextSection.offsetTop;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 1200; // Increased duration for smoother effect
        let start: number | null = null;
        
        const smoothScroll = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          const percentage = Math.min(progress / duration, 1);
          
          // Easing function for smoother animation
          const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
          const easedPercentage = easeInOutCubic(percentage);
          
          window.scrollTo(0, startPosition + distance * easedPercentage);
          
          if (progress < duration) {
            requestAnimationFrame(smoothScroll);
          }
        };
        
        requestAnimationFrame(smoothScroll);
      }
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
