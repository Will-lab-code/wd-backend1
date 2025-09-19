import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Soporte para __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class ProductManager {
  constructor(filename) {
    this.path = path.join(__dirname, '..', 'data', filename);
  }

  async #readFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async #writeFile(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2));
  }

  async getAllProducts() {
    return await this.#readFile();
  }

  async getProductById(id) {
    const products = await this.#readFile();
    return products.find((p) => p.id == id);
  }

  async addProduct(productData) {
    const requiredFields = ['title', 'description', 'code', 'price', 'status', 'stock', 'category', 'thumbnails'];
    for (const field of requiredFields) {
      if (!(field in productData)) {
        throw new Error(`Falta el campo obligatorio: ${field}`);
      }
    }

    const products = await this.#readFile();
    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const newProduct = {
      id: newId,
      ...productData,
    };

    products.push(newProduct);
    await this.#writeFile(products);

    return newProduct;
  }

  async updateProduct(id, updateData) {
    const products = await this.#readFile();
    const index = products.findIndex((p) => p.id == id);
    if (index === -1) return null;

    if ('id' in updateData) delete updateData.id;

    products[index] = {
      ...products[index],
      ...updateData,
    };

    await this.#writeFile(products);
    return products[index];
  }

  async deleteProduct(id) {
    const products = await this.#readFile();
    const newProducts = products.filter((p) => p.id != id);

    if (products.length === newProducts.length) return null;

    await this.#writeFile(newProducts);
    return true;
  }
}
