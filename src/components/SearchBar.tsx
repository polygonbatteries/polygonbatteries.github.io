import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onImageUpload?: (file: File) => void;
  className?: string;
}

export function SearchBar({ onSearch, onImageUpload, className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query);
      navigate(`/battery-finder?q=${encodeURIComponent(query)}`);
    } else if (uploadedFile) {
      onImageUpload?.(uploadedFile);
      navigate('/battery-finder');
    }
  };

  const handleFileUpload = (file: File) => {
    if (file.type.startsWith('image/') || file.type === 'application/pdf') {
      setUploadedFile(file);
      toast.success(`File "${file.name}" uploaded successfully`);
      onImageUpload?.(file);
    } else {
      toast.error("Please upload an image or PDF file");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const clearFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form 
      role="search" 
      aria-label="Site search"
      onSubmit={handleSubmit}
      className={`relative max-w-2xl mx-auto ${className}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className={`relative transition-all duration-200 ${isDragOver ? 'scale-105 opacity-80' : ''}`}>
        <Input
          aria-label="Search products, specs, orders"
          placeholder="Search products, specs, orders..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-14 w-full rounded-full px-6 pr-28 shadow-lg border-2 border-white/20 bg-white/90 backdrop-blur-sm text-gray-900 placeholder:text-gray-500 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 outline-none"
        />
        
        {/* File upload button */}
        <div className="absolute right-2 top-1.5 flex items-center gap-1">
          {uploadedFile && (
            <Button
              type="button"
              onClick={clearFile}
              size="sm"
              variant="ghost"
              className="h-9 w-9 rounded-full hover:bg-red-100"
            >
              <X className="h-4 w-4 text-red-600" />
            </Button>
          )}
          
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            size="sm"
            className="h-11 w-11 rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-md"
          >
            <Upload className="h-4 w-4" />
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          aria-label="Upload image or PDF"
          accept="image/*,.pdf"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>

      {uploadedFile && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-lg shadow-lg border p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4 text-brand-600" />
              <span className="text-sm font-medium text-gray-900">{uploadedFile.name}</span>
            </div>
            <Button onClick={clearFile} size="sm" variant="ghost">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {isDragOver && (
        <div className="absolute inset-0 bg-brand-600/10 border-2 border-dashed border-brand-600 rounded-full flex items-center justify-center">
          <span className="text-brand-600 font-medium">Drop file here</span>
        </div>
      )}
    </form>
  );
}