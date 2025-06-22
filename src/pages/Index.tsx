
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, FileCheck } from "lucide-react";
import ClaimsTable from "@/components/ClaimsTable";
import DocumentTabs from "@/components/DocumentTabs";
import CsvUploadZone from "@/components/CsvUploadZone";
import DocumentUploadZone from "@/components/DocumentUploadZone";
import VerificationModal from "@/components/VerificationModal";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [claimsList, setClaimsList] = useState([]);
  const [contractFiles, setContractFiles] = useState([]);
  const [gpoFiles, setGpoFiles] = useState([]);
  const [invoiceFiles, setInvoiceFiles] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const hasDocuments = contractFiles.length > 0 || gpoFiles.length > 0 || invoiceFiles.length > 0;

  const generateClaimsFromDocuments = () => {
    if (!hasDocuments) {
      toast({
        title: "No Documents Found",
        description: "Please upload contracts, GPO documents, or invoices first to generate claims.",
        variant: "destructive"
      });
      return;
    }

    const sampleClaims = [
      {
        id: "CLM001",
        distributor: "Cardinal Health",
        ndc: "0069-2587-68",
        reason: "Price Variance - Contract Dispute",
        amount: "$2,847.50",
        status: "Pending Review",
        age: "3 days"
      },
      {
        id: "CLM002", 
        distributor: "AmerisourceBergen",
        ndc: "0074-3368-13",
        reason: "GPO Pricing Mismatch",
        amount: "$1,255.00",
        status: "Pending Review",
        age: "1 day"
      },
      {
        id: "CLM003",
        distributor: "McKesson Corp",
        ndc: "0093-7663-56",
        reason: "Invoice Discrepancy",
        amount: "$892.25",
        status: "Pending Review", 
        age: "5 days"
      },
      {
        id: "CLM004",
        distributor: "Henry Schein",
        ndc: "0781-5077-95",
        reason: "Contract Term Violation",
        amount: "$3,127.80",
        status: "Pending Review",
        age: "2 days"
      },
      {
        id: "CLM005",
        distributor: "Morris & Dickson",
        ndc: "16714-063-01",
        reason: "Quantity Limit Exceeded",
        amount: "$674.15",
        status: "Pending Review",
        age: "4 days"
      }
    ];
    
    setClaimsList(sampleClaims);
    toast({
      title: "Claims Generated",
      description: `${sampleClaims.length} claims generated based on uploaded documents.`,
    });
  };

  const handleClaimClick = (claim) => {
    setSelectedClaim(claim);
    setIsModalOpen(true);
  };

  const handleCsvUpload = (file) => {
    toast({
      title: "CSV Uploaded", 
      description: `Processing ${file.name}...`,
    });
  };

  const handleDocumentUpload = (file, category) => {
    const newFile = {
      id: Date.now(),
      name: file.name,
      size: file.size,
      uploadDate: new Date().toLocaleDateString()
    };

    switch(category) {
      case 'contracts':
        setContractFiles(prev => [...prev, newFile]);
        break;
      case 'gpo':
        setGpoFiles(prev => [...prev, newFile]);
        break;
      case 'invoices':
        setInvoiceFiles(prev => [...prev, newFile]);
        break;
    }

    toast({
      title: "Document Uploaded",
      description: `${file.name} has been processed and vectorized.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 border-b border-blue-700 px-8 py-6 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-900 font-bold text-xl">M</span>
            </div>
            <h1 className="text-2xl font-bold text-white">
              McKesson | Claim-Denial Appeals POC
            </h1>
          </div>
          <Button 
            onClick={generateClaimsFromDocuments}
            disabled={!hasDocuments}
            className={`${hasDocuments 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            } rounded-xl px-6 py-3 transition-all duration-200`}
          >
            <FileCheck className="w-4 h-4 mr-2" />
            Generate Claims from Documents
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6 p-6">
        {/* Left Panel - Claims Management */}
        <div className="col-span-8 space-y-4">
          <ClaimsTable 
            claims={claimsList}
            onClaimClick={handleClaimClick}
          />
          <CsvUploadZone onUpload={handleCsvUpload} />
        </div>

        {/* Right Panel - Document Management */}
        <div className="col-span-4 space-y-4">
          <DocumentTabs 
            contractFiles={contractFiles}
            gpoFiles={gpoFiles}
            invoiceFiles={invoiceFiles}
          />
          <DocumentUploadZone onUpload={handleDocumentUpload} />
        </div>
      </div>

      {/* Verification Modal */}
      <VerificationModal 
        claim={selectedClaim}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Index;
