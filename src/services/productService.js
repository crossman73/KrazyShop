// In-memory data store (in production, this would be a database)
let products = [
  {
    id: '1',
    name: 'Samsung Galaxy S23',
    price: 999.99,
    category: 'smartphones',
    description: 'Latest Samsung flagship smartphone',
    imageUrl: 'https://example.com/images/galaxy-s23.jpg',
    externalId: 'ext_001',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'iPhone 15 Pro',
    price: 1199.99,
    category: 'smartphones',
    description: 'Apple latest iPhone Pro model',
    imageUrl: 'https://example.com/images/iphone-15-pro.jpg',
    externalId: 'ext_002',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'MacBook Air M2',
    price: 1499.99,
    category: 'laptops',
    description: 'Apple MacBook Air with M2 chip',
    imageUrl: 'https://example.com/images/macbook-air-m2.jpg',
    externalId: 'ext_003',
    createdAt: new Date().toISOString()
  }
];

let nextId = 4;

const productService = {
  async getAllProducts(filters = {}) {
    let filteredProducts = [...products];

    if (filters.category) {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice);
    }

    if (filters.maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice);
    }

    return filteredProducts;
  },

  async getProductById(id) {
    return products.find(p => p.id === id) || null;
  },

  async searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    );
  },

  async createProduct(productData) {
    const newProduct = {
      id: nextId.toString(),
      ...productData,
      createdAt: new Date().toISOString()
    };
    
    products.push(newProduct);
    nextId++;
    
    return newProduct;
  },

  async updateProduct(id, updates) {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    products[index] = {
      ...products[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    return products[index];
  },

  async deleteProduct(id) {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return false;

    products.splice(index, 1);
    return true;
  },

  // For external API integration
  async bulkCreateProducts(productList) {
    const createdProducts = [];
    
    for (const productData of productList) {
      const newProduct = {
        id: nextId.toString(),
        ...productData,
        createdAt: new Date().toISOString()
      };
      
      products.push(newProduct);
      createdProducts.push(newProduct);
      nextId++;
    }
    
    return createdProducts;
  }
};

module.exports = productService;