
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calendar, Download } from "lucide-react";

const DocumentTabs = ({ contractFiles, gpoFiles, invoiceFiles }) => {
  const FileList = ({ files, title }) => (
    <div className="space-y-2">
      {files.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          <FileText className="w-8 h-8 mx-auto mb-2 text-gray-300" />
          <p className="font-medium text-sm">No {title.toLowerCase()} uploaded yet</p>
          <p className="text-xs">Upload documents to get started</p>
        </div>
      ) : (
        files.map((file) => (
          <div 
            key={file.id}
            className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-blue-50 hover:to-blue-100 transition-all duration-200 border border-gray-200"
          >
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-white rounded-lg shadow-sm">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-xs text-gray-900">{file.name}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{file.uploadDate}</span>
                  <span>•</span>
                  <span>{(file.size / 1024).toFixed(1)} KB</span>
                </div>
              </div>
            </div>
            <button className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
              <Download className="w-3 h-3 text-gray-500 hover:text-gray-700" />
            </button>
          </div>
        ))
      )}
    </div>
  );

  return (
    <Card className="shadow-sm border-0 bg-white rounded-xl">
      <CardHeader className="bg-gradient-to-r from-purple-700 to-purple-600 text-white rounded-t-xl py-3">
        <CardTitle className="text-base font-semibold">
          Document Repository
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="contracts" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-lg h-8">
            <TabsTrigger value="contracts" className="rounded-md text-xs">Contracts</TabsTrigger>
            <TabsTrigger value="gpo" className="rounded-md text-xs">GPO Docs</TabsTrigger>
            <TabsTrigger value="invoices" className="rounded-md text-xs">Invoices</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contracts" className="mt-4">
            <FileList files={contractFiles} title="Contracts" />
          </TabsContent>
          
          <TabsContent value="gpo" className="mt-4">
            <FileList files={gpoFiles} title="GPO Documents" />
          </TabsContent>
          
          <TabsContent value="invoices" className="mt-4">
            <FileList files={invoiceFiles} title="Invoices" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DocumentTabs;
