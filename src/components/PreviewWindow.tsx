
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Copy, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PreviewWindow = () => {
  const [copied, setCopied] = useState(false);
  
  const handleCopyText = () => {
    // In a real app, this would copy the actual extracted text
    navigator.clipboard.writeText("Sample extracted text would appear here.");
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
        <h3 className="font-medium">Enhanced Image Result</h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleDownload} className="bg-secondary/30 border-white/10 hover:bg-white/10">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <Tabs defaultValue="before-after" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="before-after">Before & After</TabsTrigger>
            <TabsTrigger value="original">Original</TabsTrigger>
            <TabsTrigger value="enhanced">Enhanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="before-after" className="mt-0">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 relative rounded-xl overflow-hidden border border-white/10 bg-black/30">
                <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 rounded text-xs">Before</div>
                <img 
                  src="/lovable-uploads/072ab457-1fb2-4bb4-b6e6-66b7d9b91d66.png" 
                  alt="Blurry image before enhancement" 
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="flex-1 relative rounded-xl overflow-hidden border border-white/10 bg-black/30">
                <div className="absolute top-2 left-2 px-2 py-1 bg-primary/80 rounded text-xs">After</div>
                <img 
                  src="/lovable-uploads/c9e6f56e-104a-4dbe-a509-5997b9a9a420.png" 
                  alt="Clear image after enhancement" 
                  className="w-full aspect-square object-cover"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="original" className="mt-0">
            <div className="rounded-xl overflow-hidden border border-white/10 bg-black/30">
              <img 
                src="/lovable-uploads/072ab457-1fb2-4bb4-b6e6-66b7d9b91d66.png" 
                alt="Original blurry image" 
                className="w-full max-h-[500px] object-contain"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="enhanced" className="mt-0">
            <div className="rounded-xl overflow-hidden border border-white/10 bg-black/30">
              <img 
                src="/lovable-uploads/c9e6f56e-104a-4dbe-a509-5997b9a9a420.png" 
                alt="Enhanced clear image" 
                className="w-full max-h-[500px] object-contain"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PreviewWindow;
