import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card 
      sx={{ 
        maxWidth: 345,
        '&:hover': {
          transform: 'translateY(-4px)',
          transition: 'transform 0.3s ease-in-out',
          boxShadow: 3,
        },
      }}
    >
      <CardMedia
        component="img"
        height="400"
        image={product.imageUrl}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Typography variant="h6" color="primary">
            ₽{product.price}
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            Подробнее
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;