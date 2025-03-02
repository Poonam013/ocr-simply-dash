
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Copy, Check } from 'lucide-react';

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
    <div className="w-full max-w-4xl mx-auto dark-glass rounded-xl overflow-hidden animate-fade-in">
      <div className="border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <h3 className="font-medium">Extracted Text</h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleDownload} className="bg-secondary/30 border-white/10 hover:bg-white/10">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="relative">
          <div className="absolute top-2 right-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCopyText}
              className="h-8 w-8 p-0 hover:bg-white/10"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="bg-background/30 border border-white/10 rounded-lg p-4 min-h-[300px] font-mono text-sm">
            <p className="text-gray-400">// OCR extracted text will appear here</p>
            <p className="mt-4">Sample extracted text:</p>
            <p className="mt-2">This is an example of extracted text from your document.</p>
            <p className="mt-4">ગુજરાતી ટેક્સ્ટ ઉદાહરણ:</p>
            <p className="mt-2">આ તમારા દસ્તાવેજમાંથી કાઢેલા ટેક્સ્ટનું ઉદાહરણ છે.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewWindow;
