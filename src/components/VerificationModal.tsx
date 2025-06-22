
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
      emailDraft: isValid ? "" : `Dear Claims Review Team,

After thorough verification against our contract repository, GPO agreements, and invoice records, we contest the denial of Claim ${claim?.id}.

Our analysis reveals:
- Contract pricing supports the claimed amount of ${claim?.amount}
- GPO agreement explicitly covers NDC ${claim?.ndc}
- Invoice documentation confirms proper quantities and terms

We request immediate reversal of this denial and processing of the full claim amount.

Best regards,
Appeals Management Team`
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Verify Claim Legitimacy - {claim?.id}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Verification Status */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <RefreshCw className={`w-5 h-5 ${verificationProgress < 100 ? 'animate-spin text-blue-600' : 'text-green-600'}`} />
              <span className="font-medium">
                Running verification against Contracts, GPO, and Invoice repositories...
              </span>
            </div>
            
            <Progress value={verificationProgress} className="w-full" />
            <p className="text-sm text-gray-600">{verificationProgress}% complete</p>
          </div>

          {/* Results */}
          {verificationResult && (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <Badge 
                  className={`text-sm px-4 py-2 ${
                    verificationResult.valid 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
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
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-3">Verification Results:</h4>
                <ul className="space-y-2">
                  {verificationResult.checks.map((check, index) => (
                    <li key={index} className="text-sm">
                      {check}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Appeal Section */}
          {showAppeal && (
            <div className="space-y-4">
              <h4 className="font-medium">Appeal Draft:</h4>
              <Textarea
                value={emailDraft}
                onChange={(e) => setEmailDraft(e.target.value)}
                rows={8}
                className="w-full"
              />
              <Button 
                onClick={sendAppeal}
                className="w-full bg-green-600 hover:bg-green-700"
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
