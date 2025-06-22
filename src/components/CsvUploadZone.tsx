
import React, { useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

const CsvUploadZone = ({ onUpload }) => {
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files) as File[];
    const csvFile = files.find(file => file.name.endsWith('.csv'));
    
    if (csvFile) {
      onUpload(csvFile);
    }
  }, [onUpload]);

  const handleFileInput = (e) => {
    const file = e.target.files?.[0] as File;
    if (file && file.name.endsWith('.csv')) {
      onUpload(file);
    }
  };

  return (
    <Card className="shadow-sm border-0 bg-white rounded-xl">
      <CardHeader className="bg-gradient-to-r from-green-700 to-green-600 text-white rounded-t-xl py-3">
        <CardTitle className="text-base font-semibold">
          Upload CSV of Claims
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-green-300 rounded-xl p-4 text-center hover:border-green-500 hover:bg-green-50 transition-all duration-200 cursor-pointer"
        >
          <input
            type="file"
            accept=".csv"
            onChange={handleFileInput}
            className="hidden"
            id="csv-upload"
          />
          <label htmlFor="csv-upload" className="cursor-pointer">
            <Upload className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <p className="text-xs text-gray-700 mb-1 font-medium">
              Drag and drop your CSV file here, or click to browse
            </p>
            <p className="text-xs text-gray-500">
              Accepts .csv files only
            </p>
          </label>
        </div>
      </CardContent>
    </Card>
  );
};

export default CsvUploadZone;
