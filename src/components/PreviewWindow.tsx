
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Download, Copy, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PreviewWindow = () => {
  const [copied, setCopied] = useState(false);
  
  const handleCopyText = () => {
    // In a real app, this would copy the actual OCR text
    navigator.clipboard.writeText("Sample OCR extracted text would appear here.");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // In a real app, this would download the OCR results
    alert("Download functionality would be implemented here");
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-morphism rounded-xl overflow-hidden animate-fade-in">
      <div className="border-b px-6 py-4 flex justify-between items-center">
        <h3 className="font-medium">Document Preview</h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="preview">
        <div className="border-b px-4">
          <TabsList className="h-12">
            <TabsTrigger value="preview" className="data-[state=active]:bg-primary/10 rounded-none border-b-2 border-transparent data-[state=active]:border-primary transition-colors">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="text" className="data-[state=active]:bg-primary/10 rounded-none border-b-2 border-transparent data-[state=active]:border-primary transition-colors">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Extracted Text
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-6">
          <TabsContent value="preview" className="mt-0">
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Original document preview will appear here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="text" className="mt-0">
            <div className="relative">
              <div className="absolute top-2 right-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleCopyText}
                  className="h-8 w-8 p-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="bg-white border rounded-lg p-4 min-h-[300px] font-mono text-sm">
                <p className="text-gray-500">// OCR extracted text will appear here</p>
                <p className="mt-4">Sample extracted text:</p>
                <p className="mt-2">This is an example of extracted text from your document.</p>
                <p className="mt-4">ગુજરાતી ટેક્સ્ટ ઉદાહરણ:</p>
                <p className="mt-2">આ તમારા દસ્તાવેજમાંથી કાઢેલા ટેક્સ્ટનું ઉદાહરણ છે.</p>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default PreviewWindow;
