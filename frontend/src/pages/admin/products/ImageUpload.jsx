import React, { useRef } from 'react';
import {
  Box,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import { Delete, AddPhotoAlternate } from '@mui/icons-material';

const ImageUpload = ({ images, onUpload, onRemove }) => {
  const fileInputRef = useRef();

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);
    const newImages = await Promise.all(
      files.map(async (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              url: reader.result,
              file,
              alt: file.name,
            });
          };
          reader.readAsDataURL(file);
        });
      })
    );
    onUpload(newImages);
    event.target.value = null;
  };

  return (
    <Box>
      <input
        type="file"
        multiple
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileSelect}
      />
      
      <Button
        variant="outlined"
        startIcon={<AddPhotoAlternate />}
        onClick={() => fileInputRef.current.click()}
        sx={{ mb: 2 }}
      >
        Добавить изображения
      </Button>

      <ImageList sx={{ width: '100%' }} cols={4} rowHeight={200}>
        {images.map((image, index) => (
          <ImageListItem key={index}>
            <img
              src={image.url}
              alt={image.alt}
              loading="lazy"
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <ImageListItemBar
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  onClick={() => onRemove(index)}
                >
                  <Delete />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default ImageUpload;