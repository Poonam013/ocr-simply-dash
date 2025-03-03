
import React from 'react';

type HowToSectionProps = {
  addToRefs: (el: HTMLElement | null, index: number) => void;
};

const HowToSection: React.FC<HowToSectionProps> = ({ addToRefs }) => {
  return (
    <section 
      id="how-it-works" 
      className="py-24 px-6 bg-black/40"
      ref={(el) => addToRefs(el, 3)}
    >
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            Simple Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How to unblur an image</h2>
          <p className="text-lg text-gray-400">
            Our AI-powered tool makes it easy to restore clarity to your blurry photos in just a few simple steps.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="rounded-xl overflow-hidden border-2 border-primary/20 p-2">
            <img 
              src="/lovable-uploads/24f0488e-4382-413c-9bff-b91a62213a9b.png" 
              alt="Unblur example" 
              className="w-full h-auto rounded-lg"
            />
          </div>
          
          <div className="space-y-10">
            {[
              {
                number: 1,
                title: "Upload your photo",
                description: "Select an image from your library to deblur."
              },
              {
                number: 2,
                title: "Select AI Enhance",
                description: "Our AI will automatically detect and reduce blur in your photo."
              },
              {
                number: 3,
                title: "Preview the result",
                description: "Compare the original and enhanced versions side by side."
              },
              {
                number: 4,
                title: "Download",
                description: "Save your crystal-clear image to your device."
              }
            ].map((step) => (
              <div key={step.number} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToSection;
