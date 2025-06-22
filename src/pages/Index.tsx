
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
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

  const generateSampleDenials = () => {
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
      title: "Sample Data Generated",
      description: "5 sample claim denials have been loaded into the table.",
    });
  };

  const handleClaimClick = (claim) => {
    setSelectedClaim(claim);
    setIsModalOpen(true);
  };

  const handleCsvUpload = (file) => {
    // Simulate CSV parsing
    toast({
      title: "CSV Uploaded", 
      description: `Processing ${file.name}...`,
    });
    // In real implementation, would parse CSV and update claimsList
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            McKesson | Claim-Denial Appeals POC
          </h1>
          <Button 
            onClick={generateSampleDenials}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate Sample Denials
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6 p-6">
        {/* Left Panel - Claims Management */}
        <div className="col-span-7 space-y-6">
          <ClaimsTable 
            claims={claimsList}
            onClaimClick={handleClaimClick}
          />
          <CsvUploadZone onUpload={handleCsvUpload} />
        </div>

        {/* Right Panel - Document Management */}
        <div className="col-span-5 space-y-6">
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
