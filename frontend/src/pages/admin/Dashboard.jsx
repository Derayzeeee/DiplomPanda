import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import AdminNavbar from '../../components/admin/AdminNavbar';
import AdminSidebar from '../../components/admin/AdminSidebar';
import ProductsList from '../../components/admin/products/ProductsList';
import ProductEdit from '../../components/admin/products/ProductEdit';
import ProductCreate from '../../components/admin/products/ProductCreate';

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <Box sx={{ flexGrow: 1 }}>
        <AdminNavbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/create" element={<ProductCreate />} />
            <Route path="/products/edit/:id" element={<ProductEdit />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;