import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
  Paper,
  Chip,
  IconButton,
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import ImageUpload from './ImageUpload';

const categories = ['платья', 'блузки', 'юбки', 'брюки', 'аксессуары'];
const sizes = ['XS', 'S', 'M', 'L', 'XL'];

const ProductForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    description: '',
    price: '',
    category: '',
    sizes: [],
    colors: [],
    images: [],
    stock: '',
    isNew: false,
    isPopular: false,
  });
  const [newColor, setNewColor] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSizeToggle = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleAddColor = () => {
    if (newColor && !formData.colors.includes(newColor)) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, newColor]
      }));
      setNewColor('');
    }
  };

  const handleRemoveColor = (colorToRemove) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(color => color !== colorToRemove)
    }));
  };

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
              Основная информация
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
              label="Количество в наличии"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Размеры
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {sizes.map((size) => (
                <Chip
                  key={size}
                  label={size}
                  onClick={() => handleSizeToggle(size)}
                  color={formData.sizes.includes(size) ? 'primary' : 'default'}
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Цвета
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                label="Добавить цвет"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                size="small"
              />
              <IconButton onClick={handleAddColor}>
                <Add />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
              {formData.colors.map((color) => (
                <Chip
                  key={color}
                  label={color}
                  onDelete={() => handleRemoveColor(color)}
                />
              ))}
            </Box>
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