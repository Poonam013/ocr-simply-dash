
import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Plus, FileText, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

type FileWithPreview = {
  file: File;
  id: string;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
};

const UploadArea = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const processFiles = useCallback((newFiles: File[]) => {
    const filesToAdd = newFiles.map(file => ({
      file,
      id: Math.random().toString(36).substring(2, 11),
      progress: 0,
      status: 'uploading' as const
    }));

    setFiles(prev => [...prev, ...filesToAdd]);

    // Simulate upload progress for each file
    filesToAdd.forEach(fileObj => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles(prev => 
            prev.map(f => 
              f.id === fileObj.id 
                ? { ...f, progress: 100, status: 'complete' as const } 
                : f
            )
          );
        } else {
          setFiles(prev => 
            prev.map(f => 
              f.id === fileObj.id 
                ? { ...f, progress } 
                : f
            )
          );
        }
      }, 300);
    });
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      processFiles(droppedFiles);
    }
  }, [processFiles]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  }, [processFiles]);

  const handleRemoveFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  }, []);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div 
        className={cn(
          "border-2 border-dashed rounded-xl p-8 transition-all duration-200 ease-in-out",
          isDragging ? "border-primary drag-drop-highlight scale-[1.01]" : "border-gray-200",
          "animate-fade-in"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Drag & drop files here</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-md">
            Support for images (PNG, JPG) and documents (PDF) containing English or Gujarati text
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={triggerFileInput}>
              <Plus className="mr-2 h-4 w-4" /> Select Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
              onChange={handleFileInputChange}
            />
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-8 glass-morphism rounded-xl p-4 animate-scale-in">
          <h3 className="text-lg font-medium mb-4">Uploaded Files</h3>
          <div className="space-y-3 max-h-72 overflow-y-auto minimal-scrollbar pr-2">
            {files.map((fileObj) => (
              <div key={fileObj.id} className="flex items-center p-3 bg-white rounded-lg shadow-sm border">
                <div className="p-2 bg-primary/10 rounded-md mr-3">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{fileObj.file.name}</p>
                  <div className="flex items-center mt-1">
                    <Progress value={fileObj.progress} className="h-1.5 flex-1 mr-2" />
                    <span className="text-xs text-gray-500 w-10 text-right">
                      {Math.round(fileObj.progress)}%
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex items-center">
                  {fileObj.status === 'complete' ? (
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleRemoveFile(fileObj.id)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadArea;
