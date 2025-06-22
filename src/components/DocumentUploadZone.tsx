
import React, { useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText } from "lucide-react";

const DocumentUploadZone = ({ onUpload }) => {
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    
    files.forEach(file => {
      if (file.name.endsWith('.pdf') || file.name.endsWith('.docx')) {
        // Determine category based on filename or could add selection UI
        let category = 'contracts'; // default
        if (file.name.toLowerCase().includes('gpo')) category = 'gpo';
        if (file.name.toLowerCase().includes('invoice')) category = 'invoices';
        
        onUpload(file, category);
      }
    });
  }, [onUpload]);

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file.name.endsWith('.pdf') || file.name.endsWith('.docx')) {
        let category = 'contracts';
        if (file.name.toLowerCase().includes('gpo')) category = 'gpo';
        if (file.name.toLowerCase().includes('invoice')) category = 'invoices';
        
        onUpload(file, category);
      }
    });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Upload Documents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer"
        >
          <input
            type="file"
            accept=".pdf,.docx"
            multiple
            onChange={handleFileInput}
            className="hidden"
            id="doc-upload"
          />
          <label htmlFor="doc-upload" className="cursor-pointer">
            <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600 mb-1">
              Upload Contracts, GPO, or Invoice documents
            </p>
            <p className="text-xs text-gray-500">
              Accepts .pdf and .docx files
            </p>
          </label>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUploadZone;
