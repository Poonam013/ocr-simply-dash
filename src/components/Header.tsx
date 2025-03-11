import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";
import AuthModal from './AuthModal';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('login');

  const navigationItems = [
    {
      title: "Home",
      href: "/",
      description: "",
    },
    {
      title: "Features",
      href: "#features",
      description: "",
    },
    {
      title: "Documents",
      href: "/documents",
      description: "View and manage your processed documents",
    },
  ];

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
      <header className="w-full z-40 fixed top-0 left-0 bg-background/80 backdrop-blur-md border-b border-primary/10 shadow-sm">
        <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src="/lovable-uploads/cbd4b431-2baf-4a81-9bb2-c35448bd571a.png" alt="BilingualOCR Logo" className="w-8 h-8" />
              <span className="text-xl font-semibold tracking-tight">BilingualOCR</span>
            </Link>
          </div>
          
          <div className="justify-start items-center gap-4 lg:flex hidden flex-row ml-8">
            <NavigationMenu className="flex justify-start items-start">
              <NavigationMenuList className="flex justify-start gap-4 flex-row">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.href ? (
                      <>
                        <NavigationMenuLink asChild>
                          <a href={item.href} className="text-sm font-medium hover:text-primary transition-colors">
                            {item.title}
                          </a>
                        </NavigationMenuLink>
                      </>
                    ) : (
                      <>
                        <NavigationMenuTrigger className="font-medium text-sm">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="!w-[450px] p-4">
                          <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                            <div className="flex flex-col h-full justify-between">
                              <div className="flex flex-col">
                                <p className="text-base">{item.title}</p>
                                <p className="text-muted-foreground text-sm">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <div className="flex justify-end w-full gap-4 items-center">
            <ThemeToggle />
            <Button variant="outline" onClick={openLogin} className="hidden md:inline border-primary/20 hover:bg-primary/10">
              Log in
            </Button>
            <Button onClick={openRegister} className="bg-primary hover:bg-primary/90 text-white">Sign Up</Button>
          </div>
          
          <div className="flex w-12 shrink lg:hidden items-end justify-end">
            <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} size="icon">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            {mobileMenuOpen && (
              <div className="absolute top-20 border-t flex flex-col w-full right-0 glass-morphism py-4 container gap-8 animate-fade-in">
                {navigationItems.map((item) => (
                  <div key={item.title}>
                    <div className="flex flex-col gap-2">
                      {item.href ? (
                        <a
                          href={item.href}
                          className="flex justify-between items-center"
                        >
                          <span className="text-lg">{item.title}</span>
                          <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                        </a>
                      ) : (
                        <p className="text-lg">{item.title}</p>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex flex-col space-y-3 pt-4">
                  <Button variant="outline" onClick={openLogin}>
                    Log in
                  </Button>
                  <Button onClick={openRegister}>
                    Sign Up
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
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
