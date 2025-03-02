
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10"></div>
      
      {/* Animated background shapes */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-2000"></div>
      
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className={`space-y-8 max-w-xl ${isVisible ? 'animate-slide-up opacity-100' : 'opacity-0'}`}>
          <div>
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
              English & ગુજરાતી OCR
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold !leading-tight">
              Extract text from <br/>
              <span className="text-primary">images & documents</span> <br/>
              with precision
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Our powerful bilingual OCR technology converts both English and Gujarati text from images into editable format instantly. Perfect for documents, books, or any text-based image.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="group">
              Try for free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <svg className="h-4 w-4 mr-1 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>99.8% Accuracy</span>
            </div>
            <div className="flex items-center">
              <svg className="h-4 w-4 mr-1 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Instant Processing</span>
            </div>
            <div className="flex items-center">
              <svg className="h-4 w-4 mr-1 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Secure</span>
            </div>
          </div>
        </div>

        <div className={`${isVisible ? 'animate-fade-in opacity-100 delay-300' : 'opacity-0'} relative`}>
          <div className="glass-morphism rounded-2xl shadow-xl overflow-hidden">
            <div className="h-12 bg-gray-100/80 border-b flex items-center px-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
            </div>
            <div className="p-6">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative mb-5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-400 text-sm">Document preview</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-100 rounded-full w-full"></div>
                <div className="h-4 bg-gray-100 rounded-full w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded-full w-5/6"></div>
                <div className="h-4 bg-gray-100 rounded-full w-full"></div>
                <div className="h-4 bg-gray-100 rounded-full w-2/3"></div>
              </div>
              <div className="mt-6 space-y-2">
                <div className="h-8 bg-primary/10 rounded-lg w-32"></div>
                <div className="flex space-x-3">
                  <div className="h-10 bg-primary rounded-lg w-1/3"></div>
                  <div className="h-10 bg-gray-100 rounded-lg w-1/3"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -right-8 -top-8 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
          <div className="absolute -left-8 -bottom-8 w-20 h-20 bg-blue-300/20 rounded-full blur-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
