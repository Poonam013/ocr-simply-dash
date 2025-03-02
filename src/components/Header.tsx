
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import AuthModal from './AuthModal';

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
            <a href="/" className="text-xl font-semibold tracking-tight">
              BilingualOCR
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </a>
            <div className="relative group">
              <button className="flex items-center text-sm font-medium hover:text-primary transition-colors">
                Languages <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute right-0 mt-2 w-48 glass-morphism rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
                <a href="#" className="block px-4 py-2 text-sm hover:bg-primary/10 transition-colors">English</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-primary/10 transition-colors">ગુજરાતી (Gujarati)</a>
              </div>
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/auth">Log in</Link>
            </Button>
            <Button asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass-morphism py-4 animate-slide-down">
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              <a href="#features" className="text-sm font-medium py-2 hover:text-primary transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium py-2 hover:text-primary transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="text-sm font-medium py-2 hover:text-primary transition-colors">
                Pricing
              </a>
              <details className="group">
                <summary className="flex justify-between items-center text-sm font-medium py-2 cursor-pointer hover:text-primary transition-colors">
                  Languages <ChevronDown className="h-4 w-4 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="pl-4 space-y-2 mt-2">
                  <a href="#" className="block py-2 text-sm hover:text-primary transition-colors">English</a>
                  <a href="#" className="block py-2 text-sm hover:text-primary transition-colors">ગુજરાતી (Gujarati)</a>
                </div>
              </details>
              <div className="flex flex-col space-y-3 pt-4">
                <Button variant="ghost" asChild>
                  <Link to="/auth">Log in</Link>
                </Button>
                <Button asChild>
                  <Link to="/auth">Get Started</Link>
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
