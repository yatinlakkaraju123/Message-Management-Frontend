import React from 'react';
import { Container, Box, Typography, Button, TextField, Select, MenuItem, Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components using MUI's theme
const CustomContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#f0f8ff',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

const WhiteBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  marginBottom: theme.spacing(3),
}));

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#007bff',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
}));

const FlexEndBox = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
});

const Content = () => {
  return (
    <CustomContainer maxWidth="md">
      <Box mb={4}>
        <Typography variant="h4" sx={{ color: '#007bff' }}>
          Send Message
        </Typography>
      </Box>

      {/* Message Section */}
      <WhiteBox>
        <FlexEndBox mb={2}>
          <Button>All Messages</Button>
        </FlexEndBox>

        <Box mb={3}>
          <Typography variant="body1" gutterBottom>
            Message
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
        </Box>

        <Box mb={3}>
          <Typography variant="h6" sx={{ color: '#007bff' }} gutterBottom>
            Choose Suppliers
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body1" gutterBottom>
              Category
            </Typography>
            <Select variant="outlined" fullWidth>
              <MenuItem value="">Select</MenuItem>
            </Select>
            <Button>Search</Button>
          </Box>
        </Box>
      </WhiteBox>

      {/* Selected Suppliers Section */}
      <WhiteBox>
        <Typography variant="h6" sx={{ color: '#007bff' }} gutterBottom>
          Selected Suppliers
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Checkbox /></TableCell>
              <TableCell>Supplier Company</TableCell>
              <TableCell>Supplier Name</TableCell>
              <TableCell>Email Id</TableCell>
              <TableCell>Contact</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Rows will be dynamically added */}
          </TableBody>
        </Table>
      </WhiteBox>

      {/* Action Buttons */}
      <FlexEndBox>
        <Button sx={{ marginRight: 2 }}>Submit</Button>
        <Button>Close</Button>
      </FlexEndBox>
    </CustomContainer>
  );
};

export default Content;