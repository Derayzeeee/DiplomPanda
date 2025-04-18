const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.product);
    
    // Загрузка изображений в Cloudinary
    const imagePromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'products' },
          (error, result) => {
            if (error) reject(error);
            else resolve({
              url: result.secure_url,
              public_id: result.public_id,
              alt: file.originalname
            });
          }
        );
        uploadStream.end(file.buffer);
      });
    });

    const uploadedImages = await Promise.all(imagePromises);
    productData.images = uploadedImages;

    const product = new Product(productData);
    await product.save();
    
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.product);
    const existingProduct = await Product.findById(req.params.id);
    
    if (!existingProduct) {
      return res.status(404).json({ message: 'Товар не найден' });
    }

    // Обработка новых изображений
    if (req.files && req.files.length > 0) {
      const imagePromises = req.files.map(file => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'products' },
            (error, result) => {
              if (error) reject(error);
              else resolve({
                url: result.secure_url,
                public_id: result.public_id,
                alt: file.originalname
              });
            }
          );
          uploadStream.end(file.buffer);
        });
      });

      const uploadedImages = await Promise.all(imagePromises);
      productData.images = [...existingProduct.images, ...uploadedImages];
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' });
    }

    // Удаление изображений из Cloudinary
    const deletePromises = product.images.map(image => {
      return cloudinary.uploader.destroy(image.public_id);
    });
    await Promise.all(deletePromises);

    await product.remove();
    res.json({ message: 'Товар успешно удален' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.uploadImages = async (req, res) => {
  try {
    const imagePromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'products' },
          (error, result) => {
            if (error) reject(error);
            else resolve({
              url: result.secure_url,
              public_id: result.public_id,
              alt: file.originalname
            });
          }
        );
        uploadStream.end(file.buffer);
      });
    });

    const uploadedImages = await Promise.all(imagePromises);
    res.json(uploadedImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};