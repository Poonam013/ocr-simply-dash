
import React from 'react';
import { 
  FileText, 
  Languages, 
  BookOpen, 
  FileSearch 
} from 'lucide-react';

type FeaturesSectionProps = {
  addToRefs: (el: HTMLElement | null, index: number) => void;
};

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ addToRefs }) => {
  const features = [
    {
      icon: FileText,
      title: "Text Extraction",
      description: "Extract text from images, scanned documents, and PDFs with high accuracy."
    },
    {
      icon: Languages,
      title: "Multilingual Support",
      description: "Process documents in multiple languages including English and Gujarati."
    },
    {
      icon: BookOpen,
      title: "Formatting Preservation",
      description: "Maintain the original document layout and formatting in extracted text."
    },
    {
      icon: FileSearch,
      title: "Searchable Documents",
      description: "Convert scanned images into searchable text documents."
    }
  ];

  return (
    <section 
      id="features" 
      className="py-24 px-6"
      ref={(el) => addToRefs(el, 2)}
    >
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Transform images into editable text</h2>
          <p className="text-lg text-gray-400">
            Our OCR technology gives you powerful tools to work with text extracted from any image or document.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-morphism p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-primary/5"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
