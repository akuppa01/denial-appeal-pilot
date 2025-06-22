
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, ThumbsUp, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VerificationModal = ({ claim, isOpen, onClose }) => {
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [verificationResult, setVerificationResult] = useState(null);
  const [showAppeal, setShowAppeal] = useState(false);
  const [emailDraft, setEmailDraft] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && claim) {
      startVerification();
    }
  }, [isOpen, claim]);

  const startVerification = () => {
    setVerificationProgress(0);
    setVerificationResult(null);
    setShowAppeal(false);
    
    // Simulate verification process
    const interval = setInterval(() => {
      setVerificationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          completeVerification();
          return 100;
        }
        return prev + 20;
      });
    }, 800);
  };

  const generateEmailTemplate = (claim) => {
    const template = `Subject: Chargeback Reconsideration Request – Claim ID ${claim?.id} | SKU ${claim?.ndc} | ${claim?.distributor}

Dear ${claim?.distributor} Claims Team,

We are writing in response to the denial of Chargeback Claim ID ${claim?.id}, citing ${claim?.reason} for contract CON-2024-${Math.floor(Math.random() * 1000)} – Tier 1 for SKU ${claim?.ndc} (Pharmaceutical Product).

Upon further review, we verified that the customer was an active member of Premier GPO at the time of sale (Invoice INV-${Math.floor(Math.random() * 10000)} dated ${new Date().toLocaleDateString()}). Membership validation and eligibility confirmation are attached.

We kindly request reconsideration of this chargeback submission. Supporting contract clause 4.2.1 and pricing matrix snapshot are included.

Thank you for your attention, and please let us know if additional documentation is needed.

Warm regards,

Sarah Johnson
Appeals Manager
McKesson Corporation

Attachments:
- GPO Membership Verification
- Contract Pricing Matrix
- Invoice Documentation`;

    return template;
  };

  const completeVerification = () => {
    // Simulate verification results
    const isValid = Math.random() > 0.6; // 40% chance of invalid rejection
    
    const result = {
      valid: isValid,
      checks: isValid ? [
        "✓ Contract price matches claim amount ($45.00/unit)",
        "✓ GPO agreement covers this NDC", 
        "✓ Invoice quantities within contract limits",
        "✓ Payment terms properly applied"
      ] : [
        "✗ Contract price differs from claimed amount",
        "✓ GPO agreement covers this NDC",
        "✗ Invoice shows different quantity than claimed", 
        "✓ Payment terms properly applied"
      ],
      emailDraft: isValid ? "" : generateEmailTemplate(claim)
    };
    
    setVerificationResult(result);
    setEmailDraft(result.emailDraft);
    
    if (!result.valid) {
      setShowAppeal(true);
    }
  };

  const sendAppeal = () => {
    toast({
      title: "Appeal Sent",
      description: `Appeal for claim ${claim?.id} has been submitted successfully.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-white rounded-xl border-0 shadow-2xl">
        <DialogHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 -m-6 mb-6 rounded-t-xl">
          <DialogTitle className="text-xl font-semibold">
            Verify Claim Legitimacy - {claim?.id}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-2">
          {/* Verification Status */}
          <div className="text-center space-y-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
            <div className="flex items-center justify-center space-x-2">
              <RefreshCw className={`w-5 h-5 ${verificationProgress < 100 ? 'animate-spin text-blue-600' : 'text-green-600'}`} />
              <span className="font-medium text-gray-800">
                Running verification against Contracts, GPO, and Invoice repositories...
              </span>
            </div>
            
            <Progress value={verificationProgress} className="w-full h-3 bg-white" />
            <p className="text-sm text-gray-600">{verificationProgress}% complete</p>
          </div>

          {/* Results */}
          {verificationResult && (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <Badge 
                  className={`text-sm px-6 py-3 rounded-full ${
                    verificationResult.valid 
                      ? 'bg-green-100 text-green-800 border-green-200' 
                      : 'bg-red-100 text-red-800 border-red-200'
                  }`}
                >
                  {verificationResult.valid ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Valid Rejection
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 mr-2" />
                      Invalid Rejection
                    </>
                  )}
                </Badge>
              </div>

              {/* Verification Checklist */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="font-medium mb-4 text-gray-800">Verification Results:</h4>
                <ul className="space-y-3">
                  {verificationResult.checks.map((check, index) => (
                    <li key={index} className="text-sm flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${check.startsWith('✓') ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Appeal Section */}
          {showAppeal && (
            <div className="space-y-4 bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
              <h4 className="font-medium text-gray-800">Appeal Draft:</h4>
              <Textarea
                value={emailDraft}
                onChange={(e) => setEmailDraft(e.target.value)}
                rows={12}
                className="w-full bg-white border-orange-200 rounded-xl"
              />
              <Button 
                onClick={sendAppeal}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl py-3"
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                Approve & Send Appeal
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationModal;
