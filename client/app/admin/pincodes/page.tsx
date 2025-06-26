"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, MapPin, RefreshCw, Eye } from 'lucide-react';

const PincodesPage = () => {
  const [pincodes, setPincodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchPincodes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:4000/api/groupOrders/getAllPincodes');
      if (!response.ok) {
        throw new Error('Failed to fetch pincodes');
      }
      const data = await response.json();
      console.log('Fetched pincodes:', data);
      setPincodes(data.response.pincodes || []);
    } catch (error) {
      console.error('Error fetching pincodes:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePincodeClick = (pincode: string) => {
    router.push(`/admin/pincodes/${pincode}`);
  };

  // Fetch pincodes on component mount
  useEffect(() => {
    fetchPincodes();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
          <p className="text-muted-foreground">
            Manage and view all available pincodes for group orders
          </p>
        </div>
        <Button onClick={fetchPincodes} disabled={loading} variant="outline">
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="text-2xl font-bold">{pincodes.length}</span>
            </div>
            <div>
              <p className="font-medium">Total Pincodes</p>
              <p className="text-sm text-muted-foreground">Available for group orders</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Available Pincodes</span>
            {pincodes.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {pincodes.length} total
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <p className="text-red-800 font-medium">Error loading pincodes</p>
              </div>
              <p className="text-red-600 text-sm mt-1">{error}</p>
              <Button 
                onClick={fetchPincodes} 
                variant="outline" 
                size="sm" 
                className="mt-3"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center space-y-4">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
                <p className="text-muted-foreground">Loading pincodes...</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && pincodes.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No pincodes found</h3>
              <p className="text-gray-500 mb-4">
                No pincodes are currently available for group orders.
              </p>
              <Button onClick={fetchPincodes} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          )}

          {/* Pincodes Table */}
          {!loading && !error && pincodes.length > 0 && (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">#</TableHead>
                    <TableHead>Pincode</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pincodes.map((pincode, index) => (
                    <TableRow 
                      key={pincode}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handlePincodeClick(pincode)}
                    >
                      <TableCell className="font-medium text-muted-foreground">
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span className="font-mono font-medium">{pincode}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePincodeClick(pincode);
                          }}
                          className="text-blue-600 hover:text-blue-700 cursor-pointer"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination Info */}
          {!loading && !error && pincodes.length > 0 && (
            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <p>Showing {pincodes.length} pincodes</p>
              <p>Click on any row to view details</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PincodesPage;