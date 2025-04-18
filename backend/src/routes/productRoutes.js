const express = require('express');
const router = express.Router();
const multer = require('multer');
const { 
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImages
} = require('../controllers/productController');

// Настройка multer для загрузки изображений
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Только изображения!'), false);
    }
  }
});

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', upload.array('images', 10), createProduct);
router.put('/:id', upload.array('images', 10), updateProduct);
router.delete('/:id', deleteProduct);
router.post('/upload', upload.array('images', 10), uploadImages);

module.exports = router;