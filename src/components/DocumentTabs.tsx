
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calendar, Download } from "lucide-react";

const DocumentTabs = ({ contractFiles, gpoFiles, invoiceFiles }) => {
  const FileList = ({ files, title }) => (
    <div className="space-y-2">
      {files.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p>No {title.toLowerCase()} uploaded yet</p>
        </div>
      ) : (
        files.map((file) => (
          <div 
            key={file.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <FileText className="w-4 h-4 text-blue-600" />
              <div>
                <p className="font-medium text-sm">{file.name}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{file.uploadDate}</span>
                  <span>•</span>
                  <span>{(file.size / 1024).toFixed(1)} KB</span>
                </div>
              </div>
            </div>
            <Download className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
        ))
      )}
    </div>
  );

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Document Repository
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="contracts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="gpo">GPO Docs</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
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
