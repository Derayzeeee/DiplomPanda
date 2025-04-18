import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
  Paper,
} from '@mui/material';
import ImageUpload from './ImageUpload';

const categories = ['платья', 'блузки', 'юбки', 'брюки', 'аксессуары'];

const ProductForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    description: '',
    price: '',
    category: '',
    images: [],
    stock: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price' || name === 'stock') {
      // Проверяем, что значение положительное
      if (value < 0) return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const PreviewSection = () => (
    <Box sx={{ mt: 4, p: 2, border: '1px dashed grey' }}>
      <Typography variant="h6">Предпросмотр товара</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          {formData.images[0]?.url && (
            <img 
              src={formData.images[0].url} 
              alt="preview"
              style={{ width: '100%', height: 'auto' }}
            />
          )}
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h5">{formData.name || 'Название товара'}</Typography>
          <Typography variant="body1">{formData.description || 'Описание товара'}</Typography>
          <Typography variant="h6">₽{formData.price || '0'}</Typography>
        </Grid>
      </Grid>
    </Box>
  );

  const handleImageUpload = (newImages) => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Информация о товаре
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Название товара"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Категория"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Описание"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Цена"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: '₽',
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Количество"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Изображения
            </Typography>
            <ImageUpload
              onUpload={handleImageUpload}
              onRemove={handleRemoveImage}
              images={formData.images}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button type="submit" variant="contained" color="primary">
                {initialData ? 'Сохранить изменения' : 'Создать товар'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ProductForm;