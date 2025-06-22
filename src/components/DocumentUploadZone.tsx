
import React, { useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const DocumentUploadZone = ({ onUpload }) => {
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files) as File[];
    
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
    const files = Array.from(e.target.files || []) as File[];
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
    <Card className="shadow-sm border-0 bg-white rounded-xl">
      <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-t-xl">
        <CardTitle className="text-lg font-semibold">
          Upload Documents
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
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
            <FileText className="w-10 h-10 mx-auto mb-3 text-blue-500" />
            <p className="text-sm text-gray-700 mb-1 font-medium">
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
