
"use client";

import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FileText, UploadCloud, X, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

export type UploadedFile = {
  file: File;
  id: string;
  progress: number;
  status: "uploading" | "complete" | "error";
};

interface ImageUploadProps {
  className?: string;
  maxFiles?: number;
  maxSize?: number; // in MB
  accept?: string;
  onChange?: (files: UploadedFile[]) => void;
}

export function ImageUpload({
  className,
  maxFiles = 5,
  maxSize = 5, // 5MB
  accept = ".png,.jpg,.jpeg,.pdf",
  onChange,
}: ImageUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const processFiles = useCallback(
    (newFiles: File[]) => {
      setError(null);

      // Check if exceeding max files
      if (files.length + newFiles.length > maxFiles) {
        setError(`You can only upload up to ${maxFiles} files`);
        return;
      }

      const validFiles = newFiles.filter((file) => {
        // Check file size
        if (file.size > maxSize * 1024 * 1024) {
          setError(`File ${file.name} is too large. Max size is ${maxSize}MB`);
          return false;
        }
        return true;
      });

      const filesToAdd = validFiles.map((file) => ({
        file,
        id: Math.random().toString(36).substring(2, 11),
        progress: 0,
        status: "uploading" as const,
      }));

      const updatedFiles = [...files, ...filesToAdd];
      setFiles(updatedFiles);
      onChange?.(updatedFiles);

      // Simulate upload progress for each file
      filesToAdd.forEach((fileObj) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 10;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setFiles((prev) =>
              prev.map((f) =>
                f.id === fileObj.id
                  ? { ...f, progress: 100, status: "complete" as const }
                  : f
              )
            );
            onChange?.(
              updatedFiles.map((f) =>
                f.id === fileObj.id
                  ? { ...f, progress: 100, status: "complete" as const }
                  : f
              )
            );
          } else {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === fileObj.id ? { ...f, progress } : f
              )
            );
          }
        }, 300);
      });
    },
    [files, maxFiles, maxSize, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const droppedFiles = Array.from(e.dataTransfer.files);
        processFiles(droppedFiles);
      }
    },
    [processFiles]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const selectedFiles = Array.from(e.target.files);
        processFiles(selectedFiles);
      }
    },
    [processFiles]
  );

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = useCallback(
    (id: string) => {
      const updatedFiles = files.filter((file) => file.id !== id);
      setFiles(updatedFiles);
      onChange?.(updatedFiles);
    },
    [files, onChange]
  );

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-xl p-8 transition-all duration-200 relative overflow-hidden",
          isDragging
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-border",
          "bg-background/40 backdrop-blur-sm"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          className="hidden"
          onChange={handleFileInputChange}
        />
        <div className="flex flex-col items-center justify-center text-center relative z-10">
          <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <UploadCloud className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">
            Drag & drop files here or click to browse
          </h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-md">
            Supports JPG, PNG, PDF formats. Maximum {maxFiles} files, each up to{" "}
            {maxSize}MB.
          </p>
          <Button onClick={triggerFileInput} className="relative z-10">
            Select Files
          </Button>
        </div>

        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary/5 z-0"
            />
          )}
        </AnimatePresence>
      </div>

      {error && (
        <div className="mt-3 text-sm text-destructive">{error}</div>
      )}

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-card/40 backdrop-blur-sm rounded-xl p-4 border border-border"
          >
            <h3 className="text-lg font-medium mb-4">Uploaded Files</h3>
            <div className="space-y-3 max-h-72 overflow-y-auto minimal-scrollbar pr-2">
              {files.map((fileObj) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  key={fileObj.id}
                  className="flex items-center p-3 bg-background/50 rounded-lg border border-border/50"
                >
                  <div className="p-2 bg-primary/10 rounded-md mr-3">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {fileObj.file.name}
                    </p>
                    <div className="flex items-center mt-1">
                      <Progress
                        value={fileObj.progress}
                        className="h-1.5 flex-1 mr-2"
                      />
                      <span className="text-xs text-muted-foreground w-10 text-right">
                        {Math.round(fileObj.progress)}%
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex items-center">
                    {fileObj.status === "complete" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <button
                        onClick={() => handleRemoveFile(fileObj.id)}
                        className="p-1 hover:bg-muted/80 rounded-full transition-colors"
                      >
                        <X className="h-4 w-4 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
