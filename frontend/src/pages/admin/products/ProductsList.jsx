import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  IconButton,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEdit = (productId) => {
    navigate(`/admin/products/edit/${productId}`);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await fetch(`/api/products/${selectedProduct._id}`, {
        method: 'DELETE',
      });
      setDeleteDialogOpen(false);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Управление товарами</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => navigate('/admin/products/create')}
        >
          Добавить товар
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Изображение</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Категория</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>В наличии</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    style={{ width: 50, height: 50, objectFit: 'cover' }}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>₽{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(product._id)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(product)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          Вы уверены, что хотите удалить товар "{selectedProduct?.name}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Отмена</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductsList;