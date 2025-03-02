
import { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import UploadArea from '@/components/UploadArea';
import PreviewWindow from '@/components/PreviewWindow';
import Footer from '@/components/Footer';

const Index = () => {
  // Add scroll animation for sections
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        section.classList.add('opacity-0');
        observer.observe(section);
      }
    });

    return () => {
      sectionsRef.current.forEach((section) => {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <section 
          id="features" 
          className="py-24 px-6"
          ref={(el) => addToRefs(el, 0)}
        >
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                Powerful Features
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Transform images into editable text</h2>
              <p className="text-lg text-gray-600">
                Our OCR technology makes it easy to extract and edit text from any image, 
                with special optimization for both English and Gujarati languages.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Bilingual Support",
                  description: "Accurately recognizes and extracts both English and Gujarati text from your documents."
                },
                {
                  title: "High Accuracy",
                  description: "Our advanced algorithms ensure precise text extraction with up to 99.8% accuracy."
                },
                {
                  title: "Batch Processing",
                  description: "Upload and process multiple files at once to save time and increase productivity."
                },
                {
                  title: "Format Preservation",
                  description: "Maintains the original formatting of your text, including paragraphs and layouts."
                },
                {
                  title: "Edit & Download",
                  description: "Edit extracted text directly in the browser and download in various formats."
                },
                {
                  title: "Cloud Storage",
                  description: "Securely store your documents and OCR results in the cloud for easy access."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-primary font-semibold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Upload Area Section */}
        <section 
          id="try-it-out" 
          className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white"
          ref={(el) => addToRefs(el, 1)}
        >
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                Try It Yourself
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Upload your documents</h2>
              <p className="text-lg text-gray-600">
                Drag and drop your files containing English or Gujarati text, or browse your device to select them.
              </p>
            </div>
            
            <UploadArea />
          </div>
        </section>
        
        {/* Preview Section */}
        <section 
          id="preview" 
          className="py-24 px-6"
          ref={(el) => addToRefs(el, 2)}
        >
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                Preview & Results
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">See the OCR in action</h2>
              <p className="text-lg text-gray-600">
                View, edit, and download your extracted text after processing.
              </p>
            </div>
            
            <PreviewWindow />
          </div>
        </section>
        
        {/* Call to Action */}
        <section 
          className="py-24 px-6 bg-primary/5"
          ref={(el) => addToRefs(el, 3)}
        >
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Create an account today and transform the way you work with documents.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-primary text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow">
                  Create free account
                </button>
                <button className="bg-white text-primary border border-primary px-8 py-3 rounded-lg font-medium shadow-sm hover:bg-gray-50 transition-colors">
                  Contact sales
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
