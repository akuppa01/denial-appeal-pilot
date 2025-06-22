
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calendar, Download } from "lucide-react";

const DocumentTabs = ({ contractFiles, gpoFiles, invoiceFiles }) => {
  const FileList = ({ files, title }) => (
    <div className="space-y-3">
      {files.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="font-medium">No {title.toLowerCase()} uploaded yet</p>
          <p className="text-sm">Upload documents to get started</p>
        </div>
      ) : (
        files.map((file) => (
          <div 
            key={file.id}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-blue-50 hover:to-blue-100 transition-all duration-200 border border-gray-200"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-sm text-gray-900">{file.name}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{file.uploadDate}</span>
                  <span>•</span>
                  <span>{(file.size / 1024).toFixed(1)} KB</span>
                </div>
              </div>
            </div>
            <button className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4 text-gray-500 hover:text-gray-700" />
            </button>
          </div>
        ))
      )}
    </div>
  );

  return (
    <Card className="shadow-sm border-0 bg-white rounded-xl">
      <CardHeader className="bg-gradient-to-r from-purple-700 to-purple-600 text-white rounded-t-xl">
        <CardTitle className="text-lg font-semibold">
          Document Repository
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="contracts" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl">
            <TabsTrigger value="contracts" className="rounded-lg">Contracts</TabsTrigger>
            <TabsTrigger value="gpo" className="rounded-lg">GPO Docs</TabsTrigger>
            <TabsTrigger value="invoices" className="rounded-lg">Invoices</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contracts" className="mt-6">
            <FileList files={contractFiles} title="Contracts" />
          </TabsContent>
          
          <TabsContent value="gpo" className="mt-6">
            <FileList files={gpoFiles} title="GPO Documents" />
          </TabsContent>
          
          <TabsContent value="invoices" className="mt-6">
            <FileList files={invoiceFiles} title="Invoices" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DocumentTabs;
