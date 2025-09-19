const productService = require('../../src/services/productService');

describe('Product Service', () => {
  beforeEach(() => {
    // Reset products to initial state for each test
    jest.clearAllMocks();
  });

  describe('getAllProducts', () => {
    test('should return all products when no filters', async () => {
      const products = await productService.getAllProducts();
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);
    });

    test('should filter products by category', async () => {
      const products = await productService.getAllProducts({ category: 'smartphones' });
      expect(products.every(p => p.category === 'smartphones')).toBe(true);
    });

    test('should filter products by price range', async () => {
      const products = await productService.getAllProducts({ 
        minPrice: 1000, 
        maxPrice: 1500 
      });
      expect(products.every(p => p.price >= 1000 && p.price <= 1500)).toBe(true);
    });
  });

  describe('getProductById', () => {
    test('should return product when ID exists', async () => {
      const product = await productService.getProductById('1');
      expect(product).toBeTruthy();
      expect(product.id).toBe('1');
    });

    test('should return null when ID does not exist', async () => {
      const product = await productService.getProductById('999');
      expect(product).toBeNull();
    });
  });

  describe('searchProducts', () => {
    test('should find products by name', async () => {
      const products = await productService.searchProducts('Samsung');
      expect(products.length).toBeGreaterThan(0);
      expect(products[0].name.toLowerCase()).toContain('samsung');
    });

    test('should find products by description', async () => {
      const products = await productService.searchProducts('smartphone');
      expect(products.length).toBeGreaterThan(0);
    });

    test('should return empty array for non-matching search', async () => {
      const products = await productService.searchProducts('nonexistent');
      expect(products).toEqual([]);
    });
  });

  describe('createProduct', () => {
    test('should create a new product', async () => {
      const newProductData = {
        name: 'Test Product',
        price: 299.99,
        category: 'test',
        description: 'A test product'
      };

      const product = await productService.createProduct(newProductData);
      expect(product).toHaveProperty('id');
      expect(product.name).toBe(newProductData.name);
      expect(product.price).toBe(newProductData.price);
      expect(product).toHaveProperty('createdAt');
    });
  });
});