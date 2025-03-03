
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Copy, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PreviewWindow = () => {
  const [copied, setCopied] = useState(false);
  
  const handleCopyText = () => {
    // In a real app, this would copy the actual extracted text
    navigator.clipboard.writeText("Sample extracted text would appear here. This would be the text that has been extracted from the uploaded image or document using the OCR technology.");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // In a real app, this would download the results
    alert("Download functionality would be implemented here");
  };

  return (
    <div className="w-full max-w-4xl mx-auto dark-glass rounded-xl overflow-hidden animate-fade-in">
      <div className="border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <h3 className="font-medium">OCR Results</h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleCopyText} className="bg-secondary/30 border-white/10 hover:bg-white/10">
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy Text
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload} className="bg-secondary/30 border-white/10 hover:bg-white/10">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <Tabs defaultValue="side-by-side" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="side-by-side">Side by Side</TabsTrigger>
            <TabsTrigger value="original">Original</TabsTrigger>
            <TabsTrigger value="extracted">Extracted Text</TabsTrigger>
          </TabsList>
          
          <TabsContent value="side-by-side" className="mt-0">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 relative rounded-xl overflow-hidden border border-white/10 bg-black/30">
                <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 rounded text-xs">Original</div>
                <img 
                  src="/lovable-uploads/24f0488e-4382-413c-9bff-b91a62213a9b.png" 
                  alt="Original document with text" 
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="flex-1 relative rounded-xl overflow-hidden border border-white/10 bg-black/30 p-4">
                <div className="absolute top-2 left-2 px-2 py-1 bg-primary/80 rounded text-xs">Extracted Text</div>
                <div className="font-mono text-sm h-full overflow-y-auto">
                  <p>Sample extracted text would appear here. This would be the text that has been extracted from the uploaded image or document using the OCR technology.</p>
                  <p className="mt-4">The text is fully editable and can be copied, downloaded, or further processed as needed.</p>
                  <p className="mt-4">Our OCR system can handle multiple languages and preserves the formatting of the original document as much as possible.</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="original" className="mt-0">
            <div className="rounded-xl overflow-hidden border border-white/10 bg-black/30">
              <img 
                src="/lovable-uploads/24f0488e-4382-413c-9bff-b91a62213a9b.png" 
                alt="Original document" 
                className="w-full max-h-[500px] object-contain"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="extracted" className="mt-0">
            <div className="rounded-xl overflow-hidden border border-white/10 bg-black/30 p-6">
              <div className="font-mono">
                <p>Sample extracted text would appear here. This would be the text that has been extracted from the uploaded image or document using the OCR technology.</p>
                <p className="mt-4">The text is fully editable and can be copied, downloaded, or further processed as needed.</p>
                <p className="mt-4">Our OCR system can handle multiple languages and preserves the formatting of the original document as much as possible.</p>
                <p className="mt-4">You can make edits directly to the extracted text before downloading or saving it.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PreviewWindow;
