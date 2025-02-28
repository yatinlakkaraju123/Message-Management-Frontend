import React from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';


export default function Dummy() {
  const lineItems = [
    {
      itemNo: 10,
      itemCode: 'B001095322',
      description: 'Sun Gear Wheel 8 Inch',
      poQty: 10,
      uom: 'NOs',
      pricePerUnit: '₹ 2,000',
      purchaseReq: '5000 Nos',
      purchaseReqItem: '5000 Nos',
      deliveryDate: '14/11/24',
      taxes: '₹ 72,000',
      otherCharges: '₹ 2,000'
    },
    {
      itemNo: 20,
      itemCode: 'B001095323',
      description: 'Star Gear Wheel 9 Inch',
      poQty: 10,
      uom: 'NOs',
      pricePerUnit: '₹ 3,000',
      purchaseReq: '5000 Nos',
      purchaseReqItem: '5000 Nos',
      deliveryDate: '14/11/24',
      taxes: '₹ 72,000',
      otherCharges: '₹ 2,000'
    },
    {
      itemNo: 30,
      itemCode: 'B001095324',
      description: 'Cast Iron Connecting rods',
      poQty: 3,
      uom: 'NOs',
      pricePerUnit: '₹ 46,000',
      purchaseReq: '5000 Nos',
      purchaseReqItem: '5000 Nos',
      deliveryDate: '14/11/24',
      taxes: '₹ 72,000',
      otherCharges: '₹ 2,000'
    },
    {
      itemNo: 40,
      itemCode: 'B001095325',
      description: 'Gear box top casing',
      poQty: 2,
      uom: 'NOs',
      pricePerUnit: '₹ 1,25,000',
      purchaseReq: '5000 Nos',
      purchaseReqItem: '5000 Nos',
      deliveryDate: '14/11/24',
      taxes: '₹ 72,000',
      otherCharges: '₹ 2,000'
    }
  ];


  return (
    <Box sx={{ padding: 2 }}>
      {/* Header: Title on left, Print button on right */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 1,
        }}
      >
     
      </Box>

      {/* Table Container */}
      <Paper sx={{ padding: 2, borderRadius: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#BFE7FE' }}>
                <TableCell>Item No.</TableCell>
                <TableCell>Item Code</TableCell>
                <TableCell>Item Description</TableCell>
                <TableCell>PO Qty</TableCell>
                <TableCell>UOM</TableCell>
                <TableCell>Price/Unit</TableCell>
                <TableCell>Purchase Requisition</TableCell>
                <TableCell>Purchase Requisition Item</TableCell>
                <TableCell>Delivery Date</TableCell>
                <TableCell>Taxes</TableCell>
                <TableCell>Other Charges</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lineItems.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.itemNo}</TableCell>
                  <TableCell>{item.itemCode}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.poQty}</TableCell>
                  <TableCell>{item.uom}</TableCell>
                  <TableCell>{item.pricePerUnit}</TableCell>
                  <TableCell>{item.purchaseReq}</TableCell>
                  <TableCell>{item.purchaseReqItem}</TableCell>
                  <TableCell>{item.deliveryDate}</TableCell>
                  <TableCell>{item.taxes}</TableCell>
                  <TableCell>{item.otherCharges}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
