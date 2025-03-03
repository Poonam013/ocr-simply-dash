
import { Button } from "@/components/ui/button";
import { FileUp } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Extract text from images & documents with precision
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto">
            Use our powerful bilingual OCR technology to convert images and scanned documents into editable, searchable text in multiple languages.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg h-auto">
              <FileUp className="mr-2" />
              Upload Documents
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
