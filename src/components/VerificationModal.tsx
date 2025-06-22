
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Send, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Claim {
  id: string;
  distributor: string;
  ndc: string;
  reason: string;
  amount: string;
  status: string;
  age: string;
}

interface VerificationModalProps {
  claim: Claim | null;
  isOpen: boolean;
  onClose: () => void;
}

const VerificationModal: React.FC<VerificationModalProps> = ({ claim, isOpen, onClose }) => {
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [showAppeal, setShowAppeal] = useState(false);
  const [emailDraft, setEmailDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
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

  const generateEmailTemplate = (claim: Claim) => {
    const template = `Subject: Chargeback Reconsideration Request – Claim ID ${claim?.id} | SKU ${claim?.ndc} | ${claim?.distributor}

Dear ${claim?.distributor} Claims Team,

We are writing in response to the denial of Chargeback Claim ID ${claim?.id}, citing ${claim?.reason} for contract CON-2024-${Math.floor(Math.random() * 1000)} – Tier 1 for SKU ${claim?.ndc} (Pharmaceutical Product).

Upon further review, we verified that the customer Premier Healthcare was an active member of Premier GPO at the time of sale (Invoice INV-${Math.floor(Math.random() * 10000)} dated ${new Date().toLocaleDateString()}). Membership validation and eligibility confirmation are attached.

We kindly request reconsideration of this chargeback submission. Supporting contract clause 4.2.1 and pricing matrix snapshot are included.

Thank you for your attention, and please let us know if additional documentation is needed.

Warm regards,

Sarah Johnson
Appeals Manager
McKesson Corporation`;

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
      emailDraft: isValid ? "" : generateEmailTemplate(claim!)
    };
    
    setVerificationResult(result);
    setEmailDraft(result.emailDraft);
    
    if (!result.valid) {
      setShowAppeal(true);
    }
  };

  const sendAppeal = async () => {
    setIsSending(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSending(false);
    
    toast({
      title: "Email Sent Successfully! 📧",
      description: `Appeal for claim ${claim?.id} has been sent to ${claim?.distributor}.`,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl bg-white rounded-2xl border-0 shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-8 -m-6 mb-8 rounded-t-2xl">
          <DialogTitle className="text-2xl font-bold">
            Verify Claim Legitimacy - {claim?.id}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8 p-4">
          {/* Verification Status */}
          <div className="text-center space-y-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200">
            <div className="flex items-center justify-center space-x-3">
              <RefreshCw className={`w-6 h-6 ${verificationProgress < 100 ? 'animate-spin text-blue-600' : 'text-green-600'}`} />
              <span className="font-semibold text-gray-800 text-lg">
                Running verification against Contracts, GPO, and Invoice repositories...
              </span>
            </div>
            
            <Progress value={verificationProgress} className="w-full h-4 bg-white" />
            <p className="text-base text-gray-600 font-medium">{verificationProgress}% complete</p>
          </div>

          {/* Results */}
          {verificationResult && (
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <Badge 
                  className={`text-base px-8 py-4 rounded-full font-bold ${
                    verificationResult.valid 
                      ? 'bg-green-100 text-green-800 border-green-200' 
                      : 'bg-red-100 text-red-800 border-red-200'
                  }`}
                >
                  {verificationResult.valid ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-3" />
                      Valid Rejection
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 mr-3" />
                      Invalid Rejection
                    </>
                  )}
                </Badge>
              </div>

              {/* Verification Checklist */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <h4 className="font-bold mb-6 text-gray-800 text-lg">Verification Results:</h4>
                <ul className="space-y-4">
                  {verificationResult.checks.map((check: string, index: number) => (
                    <li key={index} className="text-base flex items-center space-x-3">
                      <span className={`w-3 h-3 rounded-full ${check.startsWith('✓') ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className="font-medium">{check}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Appeal Section */}
          {showAppeal && (
            <div className="space-y-6 bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl border border-orange-200">
              <h4 className="font-bold text-gray-800 text-lg">Appeal Email Draft:</h4>
              <Textarea
                value={emailDraft}
                onChange={(e) => setEmailDraft(e.target.value)}
                rows={15}
                className="w-full bg-white border-orange-200 rounded-xl text-base font-mono leading-relaxed"
                style={{ whiteSpace: 'pre-wrap' }}
              />
              <Button 
                onClick={sendAppeal}
                disabled={isSending}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl py-4 text-lg font-bold"
              >
                {isSending ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-3 animate-spin" />
                    Sending Email...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-3" />
                    Send Email to Vendor
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationModal;
