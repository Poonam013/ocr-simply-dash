
"use client";

import * as React from "react";
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ImageIcon, X, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export type FileWithPreview = {
  file: File;
  preview: string;
};

type ImageUploadProps = {
  onChange?: (files: File[]) => void;
  onRemove?: (index: number) => void;
  value?: FileWithPreview[];
  disabled?: boolean;
  maxFiles?: number;
  maxSize?: number; // in MB
  acceptedFileTypes?: string[];
  className?: string;
  dropzoneText?: React.ReactNode;
};

export function ImageUpload({
  onChange,
  onRemove,
  value = [],
  disabled = false,
  maxFiles = 5,
  maxSize = 5, // 5MB
  acceptedFileTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"],
  className,
  dropzoneText,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
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

  const validateFiles = useCallback(
    (files: File[]) => {
      if (value.length + files.length > maxFiles) {
        setError(`You can only upload a maximum of ${maxFiles} files.`);
        return false;
      }

      for (const file of files) {
        if (!acceptedFileTypes.includes(file.type)) {
          setError(`File type not accepted. Please upload ${acceptedFileTypes.join(", ")}.`);
          return false;
        }

        if (file.size > maxSize * 1024 * 1024) {
          setError(`File size exceeds ${maxSize}MB.`);
          return false;
        }
      }

      setError(null);
      return true;
    },
    [value.length, maxFiles, acceptedFileTypes, maxSize]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      if (files.length === 0) return;

      if (validateFiles(files)) {
        onChange?.(files);
      }
    },
    [disabled, onChange, validateFiles]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const files = e.target.files ? Array.from(e.target.files) : [];
      if (files.length === 0) return;

      if (validateFiles(files)) {
        onChange?.(files);
        // Clear the input value so the same file can be uploaded again
        e.target.value = "";
      }
    },
    [disabled, onChange, validateFiles]
  );

  const handleRemove = useCallback(
    (index: number) => {
      onRemove?.(index);
    },
    [onRemove]
  );

  return (
    <div className={cn("space-y-4", className)}>
      {/* Drop zone */}
      <div
        className={cn(
          "border-2 border-dashed rounded-xl p-8 transition-all duration-200 ease-in-out",
          isDragging 
            ? "border-primary drag-drop-highlight scale-[1.01]" 
            : "border-white/10",
          disabled && "opacity-50 cursor-not-allowed",
          "animate-fade-in bg-background/40 backdrop-blur-sm"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <ImageIcon className="h-8 w-8 text-primary" />
          </div>
          
          {dropzoneText || (
            <>
              <h3 className="text-lg font-medium mb-2">Drag & drop files here</h3>
              <p className="text-sm text-gray-400 mb-6 max-w-md">
                Support for images (PNG, JPG), PDFs, and scanned documents with text to extract
              </p>
            </>
          )}
          
          <div className="flex flex-wrap gap-3 justify-center">
            <Button 
              disabled={disabled}
              onClick={() => document.getElementById("file-upload")?.click()}
              size="lg" 
              className="px-8 py-6 text-lg h-auto"
            >
              <FileUp className="mr-2" />
              Upload Documents
            </Button>
            <input
              id="file-upload"
              type="file"
              multiple
              accept={acceptedFileTypes.join(",")}
              className="hidden"
              onChange={handleChange}
              disabled={disabled}
            />
          </div>
        </div>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-destructive text-sm p-2 rounded-md bg-destructive/10"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview */}
      {value.length > 0 && (
        <div className="mt-8 glass-morphism rounded-xl p-4 animate-scale-in">
          <h3 className="text-lg font-medium mb-4">Uploaded Documents</h3>
          <div className="space-y-3 max-h-72 overflow-y-auto minimal-scrollbar pr-2">
            {value.map((fileWithPreview, index) => (
              <div key={index} className="flex items-center p-3 bg-black/30 rounded-lg shadow-sm border border-white/5">
                <div className="relative h-14 w-14 rounded-md bg-muted mr-3 overflow-hidden">
                  {fileWithPreview.file.type.startsWith("image/") ? (
                    <img
                      src={fileWithPreview.preview}
                      alt={fileWithPreview.file.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-primary/10">
                      <ImageIcon className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{fileWithPreview.file.name}</p>
                  <p className="text-xs text-gray-400">
                    {(fileWithPreview.file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                  disabled={disabled}
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
