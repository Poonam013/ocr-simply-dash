
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import AuthModal from './AuthModal';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('login');

  const openLogin = () => {
    setAuthType('login');
    setAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthType('register');
    setAuthModalOpen(true);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 glass-morphism">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src="/lovable-uploads/cbd4b431-2baf-4a81-9bb2-c35448bd571a.png" alt="BilingualOCR Logo" className="w-8 h-8" />
              <span className="text-xl font-semibold tracking-tight">BilingualOCR</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <Link to="/documents" className="text-sm font-medium hover:text-primary transition-colors">
              Documents
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" onClick={openLogin}>
              Log in
            </Button>
            <Button onClick={openRegister}>
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              type="button"
              className="text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass-morphism py-4 animate-slide-down">
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              <a href="#features" className="text-sm font-medium py-2 hover:text-primary transition-colors">
                Features
              </a>
              <Link to="/documents" className="text-sm font-medium py-2 hover:text-primary transition-colors">
                Documents
              </Link>
              <div className="flex flex-col space-y-3 pt-4">
                <Button variant="ghost" onClick={openLogin}>
                  Log in
                </Button>
                <Button onClick={openRegister}>
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        initialView={authType}
      />
    </>
  );
};

export default Header;
