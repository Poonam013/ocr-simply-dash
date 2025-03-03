
import React from 'react';
import { Sparkles, Zap, Shield } from 'lucide-react';

type FeaturesSectionProps = {
  addToRefs: (el: HTMLElement | null, index: number) => void;
};

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ addToRefs }) => {
  return (
    <section 
      id="features" 
      className="py-24 px-6 bg-gradient-to-b from-background/80 to-background"
      ref={(el) => addToRefs(el, 2)}
    >
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Transform blurry images into crystal clear photos</h2>
          <p className="text-lg text-gray-400">
            Our AI technology makes it easy to enhance and restore clarity to any blurry image
            with just a few clicks.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/5 hover:bg-white/5 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI-powered image unblurring</h3>
            <p className="text-gray-400">Upload your blurry image and let our smart AI-powered editing tools take care of the rest. It's that simple.</p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/5 hover:bg-white/5 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Effortlessly enhance blurry photos</h3>
            <p className="text-gray-400">Make blurry photos clear with our online blur remover using a single button. No technical expertise required.</p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/5 hover:bg-white/5 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Instantly restore image clarity</h3>
            <p className="text-gray-400">Remove blur and sharpen images in seconds for crisp, high-quality photos you'll be proud to share.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
