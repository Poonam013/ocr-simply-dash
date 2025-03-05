
import { useState, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { ImageUpload, FileWithPreview } from '@/components/ui/image-upload';

const Hero = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const handleFilesChange = useCallback((newFiles: File[]) => {
    const filesWithPreviews = newFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setFiles(prev => [...prev, ...filesWithPreviews]);
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setFiles(prev => {
      // Revoke the URL to prevent memory leaks
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Text Content - Left Side */}
          <div className="md:w-1/2 text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Extract text from images & documents with precision
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-10">
              Use our powerful bilingual OCR technology to convert images and scanned documents into editable, searchable text in multiple languages.
            </p>
          </div>
          
          {/* Upload Area - Right Side */}
          <div className="md:w-1/2 w-full">
            <ImageUpload 
              value={files}
              onChange={handleFilesChange}
              onRemove={handleRemoveFile}
              maxFiles={10}
              maxSize={10}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
