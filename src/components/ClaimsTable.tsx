
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ClaimsTable = ({ claims, onClaimClick }) => {
  const getStatusColor = (status) => {
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

  const getAgeColor = (age) => {
    const days = parseInt(age);
    if (days >= 5) return 'text-red-600 font-semibold';
    if (days >= 3) return 'text-orange-600 font-medium';
    return 'text-green-600';
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Pending Claim Denials
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Claim ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Distributor</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">NDC</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Reason</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Amount (USD)</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Age</th>
              </tr>
            </thead>
            <tbody>
              {claims.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
                    No claims loaded. Generate sample data or upload a CSV file.
                  </td>
                </tr>
              ) : (
                claims.map((claim) => (
                  <tr 
                    key={claim.id}
                    onClick={() => onClaimClick(claim)}
                    className="border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-blue-600">{claim.id}</td>
                    <td className="py-3 px-4">{claim.distributor}</td>
                    <td className="py-3 px-4 font-mono text-sm">{claim.ndc}</td>
                    <td className="py-3 px-4">{claim.reason}</td>
                    <td className="py-3 px-4 font-semibold">{claim.amount}</td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(claim.status)}>
                        {claim.status}
                      </Badge>
                    </td>
                    <td className={`py-3 px-4 ${getAgeColor(claim.age)}`}>
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
