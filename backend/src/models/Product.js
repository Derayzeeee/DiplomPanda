const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Название товара обязательно'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Описание товара обязательно'],
  },
  price: {
    type: Number,
    required: [true, 'Цена товара обязательна'],
    min: [0, 'Цена не может быть отрицательной'],
  },
  category: {
    type: String,
    required: [true, 'Категория товара обязательна'],
    enum: ['платья', 'блузки', 'юбки', 'брюки', 'аксессуары'],
  },
  sizes: [{
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL'],
  }],
  colors: [{
    type: String,
  }],
  images: [{
    url: String,
    alt: String,
  }],
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  isNew: {
    type: Boolean,
    default: false,
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Индексы для улучшения производительности поиска
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ isNew: 1 });
productSchema.index({ isPopular: 1 });

module.exports = mongoose.model('Product', productSchema);