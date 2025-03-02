
import { useRef, useState, useEffect } from "react";

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
      className="relative min-h-[70vh] flex items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-background -z-10"></div>
      
      {/* Animated background shapes */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-500/10 rounded-full mix-blend-screen filter blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl animate-float animation-delay-2000"></div>
      
      <div className="container mx-auto text-center max-w-3xl">
        <div className={`space-y-8 ${isVisible ? 'animate-slide-up opacity-100' : 'opacity-0'}`}>
          <div>
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
              English & ગુજરાતી OCR
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold !leading-tight">
              Extract text from <br/>
              <span className="text-gradient">images & documents</span> <br/>
              with precision
            </h1>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Our powerful bilingual OCR technology converts both English and Gujarati text from images into editable format instantly. Perfect for documents, books, or any text-based image.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
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
      </div>
    </div>
  );
};

export default Hero;
