
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Claim {
  id: string;
  distributor: string;
  ndc: string;
  reason: string;
  amount: string;
  status: string;
  age: string;
}

interface ClaimsTableProps {
  claims: Claim[];
  onClaimClick: (claim: Claim) => void;
}

const ClaimsTable: React.FC<ClaimsTableProps> = ({ claims, onClaimClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Appeal Sent':
        return 'bg-blue-100 text-blue-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAgeColor = (age: string) => {
    const days = parseInt(age.replace(' days', ''), 10);
    if (days >= 5) return 'text-red-600 font-semibold';
    if (days >= 3) return 'text-orange-600 font-medium';
    return 'text-green-600';
  };

  return (
    <Card className="shadow-sm border-0 bg-white rounded-xl">
      <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-t-xl">
        <CardTitle className="text-lg font-semibold">
          Pending Claim Denials
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 font-medium text-gray-700">Claim ID</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Distributor</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">NDC</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Reason</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Amount (USD)</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Age</th>
              </tr>
            </thead>
            <tbody>
              {claims.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-gray-500">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-2xl">📋</span>
                      </div>
                      <p className="text-lg font-medium">No claims available</p>
                      <p className="text-sm">Upload documents first, then generate claims based on document analysis</p>
                    </div>
                  </td>
                </tr>
              ) : (
                claims.map((claim) => (
                  <tr 
                    key={claim.id}
                    onClick={() => onClaimClick(claim)}
                    className="border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-all duration-200"
                  >
                    <td className="py-4 px-6 font-medium text-blue-600">{claim.id}</td>
                    <td className="py-4 px-6">{claim.distributor}</td>
                    <td className="py-4 px-6 font-mono text-sm">{claim.ndc}</td>
                    <td className="py-4 px-6">{claim.reason}</td>
                    <td className="py-4 px-6 font-semibold">{claim.amount}</td>
                    <td className="py-4 px-6">
                      <Badge className={`${getStatusColor(claim.status)} rounded-full`}>
                        {claim.status}
                      </Badge>
                    </td>
                    <td className={`py-4 px-6 ${getAgeColor(claim.age)}`}>
                      {claim.age}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClaimsTable;
