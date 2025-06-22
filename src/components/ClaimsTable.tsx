
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
    <Card className="shadow-lg border-0 bg-white rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <CardTitle className="text-xl font-bold">
          Pending Claim Denials Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
                <th className="text-left py-6 px-6 font-bold text-blue-900 text-base min-w-[120px]">Claim ID</th>
                <th className="text-left py-6 px-6 font-bold text-blue-900 text-base min-w-[180px]">Distributor</th>
                <th className="text-left py-6 px-6 font-bold text-blue-900 text-base min-w-[140px]">NDC</th>
                <th className="text-left py-6 px-6 font-bold text-blue-900 text-base min-w-[220px]">Denial Reason</th>
                <th className="text-left py-6 px-6 font-bold text-blue-900 text-base min-w-[120px]">Amount (USD)</th>
                <th className="text-left py-6 px-6 font-bold text-blue-900 text-base min-w-[140px]">Status</th>
                <th className="text-left py-6 px-6 font-bold text-blue-900 text-base min-w-[100px]">Age</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {claims.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-gray-500">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-3xl">📋</span>
                      </div>
                      <p className="text-xl font-medium">No claims available</p>
                      <p className="text-base">Upload documents first, then generate claims based on document analysis</p>
                    </div>
                  </td>
                </tr>
              ) : (
                claims.map((claim, index) => (
                  <tr 
                    key={claim.id}
                    onClick={() => onClaimClick(claim)}
                    className={`border-b border-gray-200 hover:bg-blue-50 cursor-pointer transition-all duration-200 ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <td className="py-5 px-6 font-bold text-blue-700 text-base">{claim.id}</td>
                    <td className="py-5 px-6 font-medium text-gray-800 text-base">{claim.distributor}</td>
                    <td className="py-5 px-6 font-mono text-blue-600 text-base font-medium">{claim.ndc}</td>
                    <td className="py-5 px-6 text-gray-700 text-base">{claim.reason}</td>
                    <td className="py-5 px-6 font-bold text-green-700 text-base">{claim.amount}</td>
                    <td className="py-5 px-6">
                      <Badge className={`${getStatusColor(claim.status)} text-sm px-4 py-2 rounded-full font-medium`}>
                        {claim.status}
                      </Badge>
                    </td>
                    <td className={`py-5 px-6 text-base font-medium ${getAgeColor(claim.age)}`}>
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
