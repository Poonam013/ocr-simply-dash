
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Unblur images: Remove blur from photos
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto">
            Automatically fix blurry photos with our AI blur remover. Unblur images directly in your browser and make blurry pictures clear using our unblurring tool to enhance the quality of your photos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg h-auto">
              <Sparkles className="mr-2" />
              Unblur Image Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
