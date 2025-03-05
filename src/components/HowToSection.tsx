
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How to extract text from images</h2>
          <p className="text-lg text-gray-400">
            Our AI-powered OCR tool makes it easy to extract text from images and documents in just a few simple steps.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="rounded-xl overflow-hidden border-2 border-primary/20 p-2 transition-transform duration-300 hover:scale-105">
            <img 
              src="/lovable-uploads/82b29139-f988-4210-abd5-bedf1ede28d8.png" 
              alt="Text extraction steps" 
              className="w-full h-auto rounded-lg"
            />
          </div>
          
          <div className="space-y-10">
            {[
              {
                number: 1,
                title: "Upload your document",
                description: "Select an image or document containing text you want to extract."
              },
              {
                number: 2,
                title: "Select AI Processing",
                description: "Our AI will automatically detect and extract text from your document."
              },
              {
                number: 3,
                title: "Preview the result",
                description: "Review the extracted text and make any necessary edits."
              },
              {
                number: 4,
                title: "Download",
                description: "Save the extracted text as a document or copy to clipboard."
              }
            ].map((step) => (
              <div key={step.number} className="flex gap-6 transition-transform duration-300 hover:scale-105 hover:bg-primary/5 p-4 rounded-lg">
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
