import { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import UploadArea from '@/components/UploadArea';
import PreviewWindow from '@/components/PreviewWindow';
import Footer from '@/components/Footer';
import HowToSection from '@/components/HowToSection';
import FeaturesSection from '@/components/FeaturesSection';
const Index = () => {
  // Add scroll animation for sections
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    sectionsRef.current.forEach(section => {
      if (section) {
        section.classList.add('opacity-0');
        observer.observe(section);
      }
    });
    return () => {
      sectionsRef.current.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // Function to add refs to the array
  const addToRefs = (el: HTMLElement | null, index: number) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current[index] = el;
    }
  };
  return <div className="min-h-screen flex flex-col bg-background">
      {/* Background blur effects */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="floating-blur floating-blur-1"></div>
        <div className="floating-blur floating-blur-2"></div>
        <div className="floating-blur floating-blur-3"></div>
      </div>
      
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section with Upload */}
        <Hero />
        
        {/* Preview Section */}
        <section id="ocr-in-action" className="py-24 px-6 bg-black/40" ref={el => addToRefs(el, 1)}>
          <div className="container mx-auto py-[2px] my-0 px-0">
            <div className="text-center max-w-3xl mx-auto mb-16">
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">See the OCR in action</h2>
              <p className="text-lg text-gray-400">
                Our OCR technology accurately extracts text from images while preserving the original formatting.
              </p>
            </div>
            
            <PreviewWindow />
          </div>
        </section>

        {/* How To Section */}
        <HowToSection addToRefs={addToRefs} />
        
        {/* Features Section */}
        <FeaturesSection addToRefs={addToRefs} />
      </main>
      
      <Footer />
    </div>;
};
export default Index;