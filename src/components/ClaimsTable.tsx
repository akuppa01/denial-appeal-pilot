
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
      <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-4">
        <CardTitle className="text-lg font-bold">
          Pending Claim Denials Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b-2 border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
                <th className="text-left py-3 px-3 font-bold text-blue-900 text-xs w-20">Claim ID</th>
                <th className="text-left py-3 px-3 font-bold text-blue-900 text-xs w-32">Distributor</th>
                <th className="text-left py-3 px-3 font-bold text-blue-900 text-xs w-24">NDC</th>
                <th className="text-left py-3 px-3 font-bold text-blue-900 text-xs">Denial Reason</th>
                <th className="text-left py-3 px-3 font-bold text-blue-900 text-xs w-20">Amount</th>
                <th className="text-left py-3 px-3 font-bold text-blue-900 text-xs w-24">Status</th>
                <th className="text-left py-3 px-3 font-bold text-blue-900 text-xs w-16">Age</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {claims.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-500">
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
                claims.map((claim, index) => (
                  <tr 
                    key={claim.id}
                    onClick={() => onClaimClick(claim)}
                    className={`border-b border-gray-200 hover:bg-blue-50 cursor-pointer transition-all duration-200 ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <td className="py-3 px-3 font-bold text-blue-700 text-xs">{claim.id}</td>
                    <td className="py-3 px-3 font-medium text-gray-800 text-xs">{claim.distributor}</td>
                    <td className="py-3 px-3 font-mono text-blue-600 text-xs font-medium">{claim.ndc}</td>
                    <td className="py-3 px-3 text-gray-700 text-xs">{claim.reason}</td>
                    <td className="py-3 px-3 font-bold text-green-700 text-xs">{claim.amount}</td>
                    <td className="py-3 px-3">
                      <Badge className={`${getStatusColor(claim.status)} text-xs px-2 py-1 rounded-full font-medium`}>
                        {claim.status}
                      </Badge>
                    </td>
                    <td className={`py-3 px-3 text-xs font-medium ${getAgeColor(claim.age)}`}>
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
