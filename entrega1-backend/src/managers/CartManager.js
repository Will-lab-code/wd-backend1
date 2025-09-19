import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Soporte para __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class CartManager {
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

  async createCart() {
    const carts = await this.#readFile();
    const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;

    const newCart = {
      id: newId,
      products: []
    };

    carts.push(newCart);
    await this.#writeFile(carts);
    return newCart;
  }

  async getCartById(id) {
    const carts = await this.#readFile();
    return carts.find(cart => cart.id == id);
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.#readFile();
    const cartIndex = carts.findIndex(cart => cart.id == cartId);

    if (cartIndex === -1) return null;

    const cart = carts[cartIndex];
    const existingProduct = cart.products.find(p => p.product === productId);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await this.#writeFile(carts);
    return cart;
  }
}
