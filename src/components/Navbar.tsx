import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "דף הבית", href: "/" },
  { label: "מאמרים", href: "/articles" },
  { label: "הרצאות", href: "/lectures" },
  { label: "טופס איפיון", href: "/profiling-form" },
  { label: "צור קשר", href: "/#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href === "/#contact") {
      if (location.pathname === "/") {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/#contact");
      }
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href === "/#contact") return false;
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-navy-dark/95 backdrop-blur-sm border-b border-purple-700/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Site name */}
          <Link to="/" className="text-xl font-bold font-heebo text-white hover:text-purple-400 transition-colors">
            גיא כהן | AI
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`px-4 py-2 rounded-lg text-sm font-heebo font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-white bg-purple-700/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-navy-dark border-purple-700/20 w-72">
                <SheetTitle className="text-white font-heebo text-right">תפריט</SheetTitle>
                <div className="flex flex-col gap-2 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className={`px-4 py-3 rounded-lg text-lg font-heebo font-medium text-right transition-colors ${
                        isActive(link.href)
                          ? "text-white bg-purple-700/30"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
